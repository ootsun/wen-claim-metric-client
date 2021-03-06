import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {LoginComponent} from './login/login.component';
import {LoginRoutingModule} from './login-routes.module';

@NgModule({
    imports: [
        SharedModule,
        LoginRoutingModule
    ],
    declarations: [
        LoginComponent,
    ]
})
export class LoginModule {
}
