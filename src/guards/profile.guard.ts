import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/providers/auth.service';

@Injectable()
export class ProfileGuard implements CanActivate {
    constructor( private auithService: AuthService, private router: Router ) {}
    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
       const isAuthenticated =  this.auithService.isAuthenticated;
       if ( !isAuthenticated ) {
         this.router.navigate(['']);
         return false;
       } else {
         return true;
       }
    }
}