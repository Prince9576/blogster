import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared.module';
import { ProfileComponent } from './profile.component';

import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BlogsComponent } from './blogs/blogs.component';
import { PostComponent } from './post/post.component';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from 'src/pipes/shorten.pipe';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
    { path: '', component: ProfileComponent }
];

@NgModule({
    declarations: [
        ProfileComponent,
        AboutComponent,
        BlogsComponent,
        PostComponent,
        ShortenPipe,
        BlogComponent
    ],
    imports: [ 
               CommonModule,
               SharedModule, 
               RouterModule.forChild(routes),
               CKEditorModule,
               FormsModule,
               ReactiveFormsModule
             ],
    exports: []
})

export class ProfileModule {}