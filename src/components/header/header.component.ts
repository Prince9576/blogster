import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from 'src/providers/constants.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/providers/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    ICON_BASE = Constants.ICON_BASE;
    isAuthenticated: boolean;
    loginSub: Subscription;
    constructor( private router: Router, private authService: AuthService ) {}

    ngOnInit(): void {
        this.isAuthenticated = this.authService.isAuthenticated;
        this.loginSub = this.authService.loginStatusEmitter.subscribe((response: { status: boolean, respnse: any}) => {
            this.isAuthenticated = response.status;
        })
    }

    ngOnDestroy() {
        this.loginSub.unsubscribe();
    }

    logout() {
        this.authService.logout();
    }
}