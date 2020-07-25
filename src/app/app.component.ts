import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from 'src/providers/constants.service';
import { RouterOutlet, Router, NavigationStart } from '@angular/router';
import { slideInAnimation } from './animations';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/providers/auth.service';
import { filter } from 'rxjs/operators';
import { routes } from './app-routing.module';

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
  pageNotFound: boolean;

  constructor( private authService: AuthService, private router: Router ) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.isAuthenticated = this.authService.isAuthenticated;
    this.loginSub = this.authService.loginStatusEmitter.subscribe((data: { status: boolean, response: any }) => {
      console.log("Logined", data);
      this.isAuthenticated = data.status;
    })

    console.log(routes);
    this.router.events.pipe(
      filter((data) => data instanceof NavigationStart )
    ).subscribe((data: NavigationStart) => {
     this.pageNotFound = false;
     if ( data.url === "**") {
       this.pageNotFound = true;
     } else {
       let count = 0;
       routes.forEach((route: any) => {
        console.log(data.url.substring(1), "   ", route.path);
        if ( data.url.substring(1) === route.path ) {
          count++;
        }
       })
       console.log("Count ",count);
       if ( count === 0 ) {
         this.pageNotFound = true;
       }
     }
     console.log("Page not found", this.pageNotFound);
    })
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
