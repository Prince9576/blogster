import  { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/components/home/home.component';
import { NgModule } from '@angular/core';
import { AuthComponent } from 'src/components/auth/auth.component';
import { ContactComponent } from 'src/components/contact/contact.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent, data: { animation: 'HomePage' } },
    { path: 'auth', component: AuthComponent, data: { animation: 'AuthPage' } },
    { path: 'contact', component: ContactComponent },
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}