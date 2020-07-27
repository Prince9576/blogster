import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  @Input() profileInfo: User;
  constructor(  ) { }

  ngOnInit(): void {
    console.log("Profile Info", this.profileInfo);
  }

}
