import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared.module';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreloginRoutingModule } from './prelogin-routing.module';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
    declarations: [
      HomeComponent,
      AuthComponent,
      ContactComponent,
    ],
    imports: [ 
               CommonModule,
               SharedModule, 
               FormsModule,
               ReactiveFormsModule,
               PreloginRoutingModule,
             ],
    exports: []
})

export class PreloginModule {}