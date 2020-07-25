import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
    BASE_URL: string = environment.BASE_URL;
    signupStatus: Subject<any> = new Subject();
    constructor( private http: HttpClient ) {}

    signup(signupData: { name: string, email: string, password: string }) {
        this.http.post<any>(this.BASE_URL + "users/signup", signupData)
        .subscribe((response: any) => {
            console.log("Signup Response", response);
            this.signupStatus.next({
                status: true,
                response,
            });
        }, (error: any) => {
            console.log("Error Response", error);
        })
    }
}