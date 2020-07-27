import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloginComponent } from './prelogin.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
    { path: '', component: PreloginComponent, children:
        [
            { path: '', component: HomeComponent, data: { animation: 'HomePage' }, canActivate: [ AuthGuard] },
            { path: 'auth', component: AuthComponent, data: { animation: 'AuthPage' }, canActivate: [ AuthGuard ] },
            { path: 'contact', component: ContactComponent, canActivate: [ AuthGuard ] },
        ] 
    },
]

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule],
})
export class PreloginRoutingModule {

}