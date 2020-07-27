import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from 'src/models/user.model';
import { ProfileInfoProvider } from './profile-info.service';

@Injectable()
export class ProfileResolver implements Resolve<User> {
    constructor( private profileInfoProvider: ProfileInfoProvider ) {}
    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
        return this.profileInfoProvider.getProfileInfo(route.params.id);
    }
}