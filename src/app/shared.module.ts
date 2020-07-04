import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
    declarations: [
                  ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatTabsModule,
        MatIconModule,
        MatInputModule,
    ],
    exports: [ 
               MatButtonModule,
               MatFormFieldModule,
               MatTabsModule,
               MatIconModule,
               MatInputModule
             ],
})
export class SharedModule {}