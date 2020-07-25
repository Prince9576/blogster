import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  profileInfo: any = {
    name: "Prine Kumar",
    dob: Date.now(),
    hometown: "Jharkhand",
    residence: "Bangalore",
    graduation: "Btech",
    occupation: "Software developer",
    company: "Openstream",
    martialStatus: "Single",
  };
  constructor(  ) { }

  ngOnInit(): void {
    console.log("Profile Info", this.profileInfo);
  }

}
