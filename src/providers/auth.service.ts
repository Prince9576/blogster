import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
    BASE_URL: string = environment.BASE_URL;
    signupStatusEmitter: Subject<any> = new Subject();
    loginStatusEmitter: Subject<any> = new Subject();
    logoutStatusEmitter: Subject<boolean> = new Subject();
    token: string;
    userId: string;
    isAuthenticated: boolean;
    expireTimeout: any;
    constructor( private http: HttpClient ) {}

    signup(signupData: { name: string, email: string, password: string }) {
        this.http.post<any>(this.BASE_URL + "users/signup", signupData)
        .subscribe((response: any) => {
            console.log("Signup Response", response);
            this.signupStatusEmitter.next({
                status: true,
                response,
            });
        }, (error: any) => {
            console.log("Error Response", error);
            this.signupStatusEmitter.next({
                status: false,
                error: error
            })
        })
    }

    login(loginData: { email: string, password: string }) {
        this.http.post<any>(this.BASE_URL + "users/login", loginData)
        .subscribe((response: any) => {
            console.log("Login Response", response);
            this.loginStatusEmitter.next({
                status: true,
                response
            })
            this.isAuthenticated = true;
            this.token = response.token;
            this.userId = response.userId;
            this.cacheLoginData(response.token, response.userId);
            this.expireTimeout = setTimeout(() => {
                this.logout();
            }, response.expiresIn * 3600)
        }, (error) => {
            console.log("Login Error Response", error);
            this.loginStatusEmitter.next({
                status: false,
                error: error
            })
        })
    }

    logout() {
        this.token = null;
        localStorage.clear();
        this.isAuthenticated = false;
        this.userId = null;
        this.loginStatusEmitter.next({
            status: false,
            reponse: null,
        });
        this.logoutStatusEmitter.next(true);
        clearTimeout(this.expireTimeout);
    }

    autoLogin() {
        const token = localStorage.getItem('_token');
        const userId = localStorage.getItem('_userId');
        if ( token && userId ) {
            this.isAuthenticated = true;
            this.token = token;
            this.userId = userId;
            this.loginStatusEmitter.next({
                status: true,
                response: "Auto Logined Successfully"
            })
        }
    }

    cacheLoginData(token: string, userId: string) {
        if ( token && userId) {
            localStorage.setItem('_token', token);
            localStorage.setItem('_userId', userId);
        }
    }


}