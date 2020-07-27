import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from 'src/providers/constants.service';
import { AuthService } from 'src/providers/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Blogster';
  ICON_BASE = Constants.ICON_BASE;

  constructor( private authService: AuthService ) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
