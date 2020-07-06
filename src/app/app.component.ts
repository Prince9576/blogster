import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from 'src/providers/constants.service';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { UserContextProvider } from 'src/providers/user-context.service';
import { Subscription } from 'rxjs';

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
  loginSubscription: Subscription;
  isLoggedIn: boolean = false;

  constructor( private userContextProvider: UserContextProvider ) {
  }

  ngOnInit(): void {
    this.loginSubscription = this.userContextProvider.loginStatus.subscribe((data: { status: boolean }) => {
      console.log("Logined", data);
      this.isLoggedIn = data.status;
    })
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
