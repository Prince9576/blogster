import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()

export class UserContextProvider {
    private isLoggedIn: boolean = false;
    public loginStatus: Subject<{ status: boolean }> = new Subject();

    constructor() {}

    getLoginStatus() {
        return this.isLoggedIn;
    }

    setLoginStatus(loginStatus: boolean) {
        this.isLoggedIn = loginStatus;
    }
}