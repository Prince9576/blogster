import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  profileInfo: any;
  constructor(  ) { }

  ngOnInit(): void {
    console.log("Profile Info", this.profileInfo);
  }

}
