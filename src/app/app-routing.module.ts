import  { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileGuard } from 'src/guards/profile.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { NotFoundComponent } from 'src/components/not-found/not-found.component';

export const routes: Routes = [
    { path: '', loadChildren: () => import("../components/prelogin/prelogin.module").then((m) => m.PreloginModule)},
    { path: 'profile/:id', 
      loadChildren: () => import("../components/profile/profile.module").then((m) => m.ProfileModule),
      canActivate: [ ProfileGuard ],
    },
    {path: '**', component: NotFoundComponent}
]

@NgModule({
    imports: [ RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }) ],
    exports: [ RouterModule ],
    providers: [ ProfileGuard, AuthGuard ]
})

export class AppRoutingModule {}