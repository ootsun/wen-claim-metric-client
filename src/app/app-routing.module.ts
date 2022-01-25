import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationBasedPreloader} from '@services/authentication-based.preloader';
import {AuthenticationGuard} from '@services/authentication.gard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthenticationGuard],
    loadChildren: () =>
      import('./components/login/login.module').then(
        (m) => m.LoginModule,
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./components/main/main.module').then(
        (m) => m.MainModule,
      ),
    data: {shouldBeAuthenticated: true},
  },
  {
    path: '*',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: AuthenticationBasedPreloader})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
