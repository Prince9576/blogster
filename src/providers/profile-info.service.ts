import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/models/user.model';

@Injectable()
export class ProfileInfoProvider {
    BASE_URL: string = environment.BASE_URL;
    profileInfo: User;
    pictureUpdated: Subject<User> = new Subject();
    constructor( private http: HttpClient, private authService: AuthService ) {}

    getProfileInfo(userId: string): Observable<any> {
        console.log("User ID in profile info", userId)
        return this.http.get(this.BASE_URL + "users/" + userId);
    }

    uploadProfilePicture(file: File, userId: string, mode: string) {
        const fData = new FormData();
        fData.append("image", file);
        this.http.post(this.BASE_URL + "users/picture/" + userId + "?mode=" + mode, fData).subscribe((data: { status: string, user: User }) => {
            this.profileInfo = data.user;
            this.pictureUpdated.next(this.profileInfo);
        })
    }
}