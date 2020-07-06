import { Component } from '@angular/core';
import { Constants } from 'src/providers/constants.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    ICON_BASE = Constants.ICON_BASE;

    constructor( private router: Router ) {}

}