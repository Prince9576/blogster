import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Constants } from 'src/providers/constants.service';
import { Router } from '@angular/router';
import { UserContextProvider } from 'src/providers/user-context.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AuthService } from 'src/providers/auth.service';
import { Subscription } from 'rxjs';
import { GenericMessageComponent } from '../generic-message/generic-message.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tab') tab: any;
  @ViewChild('signupFormRef', { static: false }) signupFormRef: NgForm;
  signupForm: FormGroup;
  loginForm: FormGroup;
  hide: boolean = true;
  ICON_BASE: string = Constants.ICON_BASE;
  activeTabIndex: number = 0;
  signupSub: Subscription;
  signupLoader: boolean;
  loginLoader: boolean;
  constructor( private router: Router,
               private userContextProvider: UserContextProvider,
               private authService: AuthService,
               private dialog: MatDialog
               ) { }

  ngOnInit(): void {
    this.createSignupForm();
    this.createLoginForm();
    this.signupSub = this.authService.signupStatus.subscribe((resp: { status: boolean, response: any} ) => {
      console.log("Resp", resp);
      if ( resp.status ) {
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
    })
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [ Validators.required, Validators.email, Validators.maxLength(250)] ),
      password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(100) ]),
    })
  }

  submitLoginForm() {
    console.log(this.loginForm);
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
    this.activeTabIndex = event.index;
  }

  submitSignupForm() {
    this.signupLoader = true;
    this.authService.signup(this.signupForm.value);
  }

}
