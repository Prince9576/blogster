import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileInfoProvider {
    BASE_URL: string = environment.BASE_URL;
    constructor( private http: HttpClient, private authService: AuthService ) {}

    getProfileInfo(userId: string): Observable<any> {
        console.log("User ID in profile info", userId)
        return this.http.get(this.BASE_URL + "users/" + userId);
    }
}