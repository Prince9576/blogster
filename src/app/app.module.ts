import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { Constants } from 'src/providers/constants.services';
import { HeaderComponent } from 'src/components/header/header.component';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    SharedModule
  ],
  providers: [ Constants ],
  bootstrap: [AppComponent]
})
export class AppModule { }
