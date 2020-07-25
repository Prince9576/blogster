import  { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from 'src/components/home/home.component';
import { NgModule } from '@angular/core';
import { AuthComponent } from 'src/components/auth/auth.component';
import { ContactComponent } from 'src/components/contact/contact.component';
import { ProfileGuard } from 'src/guards/profile.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { NotFoundComponent } from 'src/components/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent, data: { animation: 'HomePage' }, canActivate: [ AuthGuard] },
    { path: 'auth', component: AuthComponent, data: { animation: 'AuthPage' }, canActivate: [ AuthGuard ] },
    { path: 'contact', component: ContactComponent, canActivate: [ AuthGuard ] },
    { path: 'profile', 
      loadChildren: () => import("../components/profile/profile.module").then((m) => m.ProfileModule),
      canActivate: [ ProfileGuard ]
    },
    {path: '**', component: NotFoundComponent}
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [ ProfileGuard, AuthGuard ]
})

export class AppRoutingModule {}