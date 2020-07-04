import { Component, OnInit } from '@angular/core';
import { DeviceInfoProvider } from 'src/providers/device-info.services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isMobile: boolean;
  constructor( private deviceInfoProvider: DeviceInfoProvider ) { }

  ngOnInit(): void {
    this.isMobile = this.deviceInfoProvider.isMobileDevice();
    console.log("Is mobile", this.isMobile);
  }

}
