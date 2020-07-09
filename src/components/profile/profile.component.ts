import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from 'src/providers/constants.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  ICON_BASE = Constants.ICON_BASE;
  constructor(  ) { }

  ngOnInit(): void {
  
  }

  ngOnDestroy() {
    
  }

}
