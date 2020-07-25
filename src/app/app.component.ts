import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from 'src/providers/constants.service';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { UserContextProvider } from 'src/providers/user-context.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/providers/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Blogster';
  ICON_BASE = Constants.ICON_BASE;
  loginSub: Subscription;
  isAuthenticated: boolean = false;

  constructor( private authService: AuthService ) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.isAuthenticated = this.authService.isAuthenticated;
    this.loginSub = this.authService.loginStatusEmitter.subscribe((data: { status: boolean, response: any }) => {
      console.log("Logined", data);
      this.isAuthenticated = data.status;
    })
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
