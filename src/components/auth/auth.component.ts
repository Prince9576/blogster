import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Constants } from 'src/providers/constants.service';
import { Router } from '@angular/router';
import { UserContextProvider } from 'src/providers/user-context.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
  signupForm: any;
  loginForm: any;
  hide: boolean = true;
  ICON_BASE = Constants.ICON_BASE;
  constructor( private router: Router,
               private userContextProvider: UserContextProvider,
               ) { }

  ngOnInit(): void {
    this.createSignupForm();
    this.createLoginForm();
  }

  createSignupForm() {
    this.signupForm = new FormGroup({
      name: new FormControl('', [ Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
      email: new FormControl('', [ Validators.required, Validators.email, Validators.maxLength(250)] ),
      password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(100) ]),
      phone: new FormControl('', [ Validators.minLength(10), Validators.maxLength(10) ])
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

}
