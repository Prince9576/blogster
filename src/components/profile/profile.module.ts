import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared.module';
import { ProfileComponent } from './profile.component';

import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BlogsComponent } from './blogs/blogs.component';
import { PostComponent } from './post/post.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', component: ProfileComponent }
];

@NgModule({
    declarations: [
        ProfileComponent,
        AboutComponent,
        BlogsComponent,
        PostComponent,
    ],
    imports: [ 
               CommonModule,
               SharedModule, 
               RouterModule.forChild(routes) ],
    exports: []
})

export class ProfileModule {}