import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Constants } from 'src/providers/constants.service';
import { SharedModule } from './shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from 'src/components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceInfoProvider } from 'src/providers/device-info.service';
import { ProfileModule } from 'src/components/profile/profile.module';
import { UserContextProvider } from 'src/providers/user-context.service';
import { DataService } from 'src/providers/data.service';
import { GenericMessageComponent } from '../components/generic-message/generic-message.component';
import { AuthService } from 'src/providers/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { ProfileInfoProvider } from 'src/providers/profile-info.service';
import { PreloginComponent } from '../components/prelogin/prelogin.component';
import { BlogService } from 'src/providers/blog.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    FooterComponent, 
    GenericMessageComponent,
    NotFoundComponent,
    PreloginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ProfileModule,
  ],
  providers: [ Constants, 
               DeviceInfoProvider, 
               UserContextProvider,
               DataService,
               AuthService,
               ProfileInfoProvider,
               BlogService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
