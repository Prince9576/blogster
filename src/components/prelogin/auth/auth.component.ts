import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, AbstractControl } from '@angular/forms';
import { Constants } from 'src/providers/constants.service';
import { Router } from '@angular/router';
import { UserContextProvider } from 'src/providers/user-context.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AuthService } from 'src/providers/auth.service';
import { Subscription } from 'rxjs';
import { GenericMessageComponent } from '../../generic-message/generic-message.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tab') tab: any;
  @ViewChild('signupFormRef', { static: false }) signupFormRef: NgForm;
  @ViewChild('loginFormRef', { static: false }) loginFormRef: NgForm;
  signupForm: FormGroup;
  loginForm: FormGroup;
  hide: boolean = true;
  ICON_BASE: string = Constants.ICON_BASE;
  activeTabIndex: number = 0;
  signupSub: Subscription;
  loginSub: Subscription;
  signupLoader: boolean;
  loginLoader: boolean;
  minDate: Date;
  maxDate: Date;
  constructor( private router: Router,
               private userContextProvider: UserContextProvider,
               private authService: AuthService,
               private dialog: MatDialog
               ) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 70, 0, 1); 
    this.maxDate = new Date(currentYear - 15, 11, 31); 
    this.createSignupForm();
    this.createLoginForm();
    this.signupSub = this.authService.signupStatusEmitter.subscribe((resp: { status: boolean, response: any} ) => {
      console.log("Resp", resp);
      if ( resp.status ) {
        this.completePostSignupRituals(resp);
      }
    });

    this.loginSub = this.authService.loginStatusEmitter.subscribe((resp: { status: boolean, response: any}) => {
      console.log("In login sub", resp)
      this.completePostLoginRituals(resp);
    })
  }

  ngAfterViewInit(): void {
    console.log("Mat tab", this.tab);
    console.log("Selected Index", this.tab.selectedIndex);
  }

  ngOnDestroy() {
    this.signupSub.unsubscribe();
  }

  createSignupForm() {
    this.signupForm = new FormGroup({
      name: new FormControl('', [ Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
      email: new FormControl('', [ Validators.required, Validators.email, Validators.maxLength(250)] ),
      password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(100) ]),
      dob: new FormControl('', [ Validators.required ]),
      gender: new FormControl('', [ Validators.required ])
    })
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [ Validators.required, Validators.email, Validators.maxLength(250)] ),
      password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(100) ]),
    })
  }

  testProfile() {
    console.log("Testing profile")
    this.userContextProvider.setLoginStatus(true);
    this.userContextProvider.loginStatus.next({ status: true });
    this.router.navigate(['profile']);
  }

  getErrorMessage(formField: string) {
    const control = this.activeTabIndex === 0 ? this.loginForm.controls[formField] : this.signupForm.controls[formField] as FormControl;
    if ( control ) {
      if (control.hasError('required')) {
        return formField.toUpperCase() + " is required.";
      } else if ( control.hasError('email')) {
        return "Must be a email (xxx@xxx.com)";
      } else if ( control.hasError('maxlength')) {
        return `Exceeded the maximum limit (${control.errors.maxlength.requiredLength}), Remove at least ${control.errors.maxlength.actualLength - control.errors.maxlength.requiredLength} characters`;
      } else if ( control.hasError('minlength')) {
        return `Minimum characters must be ${control.errors.minlength.requiredLength}, Enter ${control.errors.minlength.requiredLength - control.errors.minlength.actualLength} more characters`;
      }
    }
  }

  tabChanged(event: MatTabChangeEvent) {
    console.log(this.signupForm);
    this.activeTabIndex = event.index;
  }

  submitSignupForm() {
    this.signupLoader = true;
    this.authService.signup(this.signupForm.value);
  }

  submitLoginForm() {
    this.loginLoader = true;
    this.authService.login(this.loginForm.value);
  }

  completePostSignupRituals(resp: any) {
    this.signupLoader = false;
    this.signupForm.reset();
    this.signupFormRef.resetForm();
    const dialogRef = this.dialog.open(GenericMessageComponent, {
      width: window.innerWidth > 500 ? '20%' : '80%',
      height: window.innerWidth > 500 ? '40%' : '35%',
      data: {
        type: "Success",
        body: resp.response.message,
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.tab.selectedIndex = 0;
    })
  }

  completePostLoginRituals(resp: any) {
    this.loginLoader = false;
    this.loginForm.reset();
    this.loginFormRef.resetForm();
      if ( resp.status ) {
        console.log("User id before navigating", this.authService.userId);
        this.router.navigate(['profile', this.authService.userId], { state: { mode: 'Owner'}} );
      } else {
        const dialogRef = this.dialog.open(GenericMessageComponent, {
          width: window.innerWidth > 500 ? '20%' : '80%',
          height: window.innerWidth > 500 ? '40%' : '35%',
          data: {
            type: "Error",
            body: resp.error.error.message,
          }
        });
      }
  }

}
