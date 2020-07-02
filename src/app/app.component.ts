import { Component } from '@angular/core';
import { Constants } from 'src/providers/constants.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Blogster';
  ICON_BASE = Constants.ICON_BASE;
}
