import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/providers/constants.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private ICON_BASE = Constants.ICON_BASE;
  constructor() { }

  ngOnInit(): void {
  }

}
