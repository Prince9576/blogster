import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/providers/constants.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/providers/auth.service';
import { DeviceInfoProvider } from 'src/providers/device-info.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  ICON_BASE= Constants.ICON_BASE;
  isMobile: boolean;
  constructor( private router: Router, private authService: AuthService, private getDeviceInfo: DeviceInfoProvider ) { }

  ngOnInit(): void {
    console.log(this.getDeviceInfo.isMobileDevice())
    this.isMobile = this.getDeviceInfo.isMobileDevice();
  }

  returnHome() {
    const isAuth = this.authService.isAuthenticated;
    if ( isAuth ) {
      this.router.navigate(['profile']);
    } else {
      this.router.navigate(['']);
    }
  }

}
