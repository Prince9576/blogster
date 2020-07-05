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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceInfoProvider } from 'src/providers/device-info.services';
import { SocialLinksComponent } from '../components/social-links/social-links.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    FooterComponent, 
    HomeComponent,
    AuthComponent,
    ContactComponent,
    SocialLinksComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [ Constants, DeviceInfoProvider ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
