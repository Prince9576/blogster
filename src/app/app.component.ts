import { Component } from '@angular/core';
import { Constants } from 'src/providers/constants.services';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'Blogster';
  ICON_BASE = Constants.ICON_BASE;

  prepareRoute(outlet: RouterOutlet) {
    console.log("Outlet", outlet); 
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
