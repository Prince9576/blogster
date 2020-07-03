import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Constants } from 'src/providers/constants.services';
import { SharedModule } from './shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from 'src/components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HomeComponent } from 'src/components/home/home.component';
import { AuthComponent } from '../components/auth/auth.component';
import { ContactComponent } from '../components/contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    FooterComponent, 
    HomeComponent,
    AuthComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [ Constants ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
