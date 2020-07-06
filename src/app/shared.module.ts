import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@NgModule({
    declarations: [
                  ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatTabsModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule
    ],
    exports: [ 
               MatButtonModule,
               MatFormFieldModule,
               MatTabsModule,
               MatIconModule,
               MatInputModule,
               MatSlideToggleModule
             ],
})
export class SharedModule {}