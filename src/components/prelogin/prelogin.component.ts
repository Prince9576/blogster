import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Constants } from 'src/providers/constants.service';
import { slideInAnimation } from 'src/app/animations';

@Component({
  selector: 'app-prelogin',
  templateUrl: './prelogin.component.html',
  styleUrls: ['./prelogin.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class PreloginComponent implements OnInit {
  ICON_BASE = Constants.ICON_BASE;
  
  constructor() { }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
