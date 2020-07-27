import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/providers/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor( private auithService: AuthService, private router: Router ) {}
    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
       const isAuthenticated =  this.auithService.isAuthenticated;
       if ( isAuthenticated ) {
         const userId = localStorage.getItem('_userId');
         console.log("User ID", userId);
         this.router.navigate(['profile', userId]);
         return false;
       } else {
         return true;
       }
    }
}