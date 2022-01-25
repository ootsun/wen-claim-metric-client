import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {WenClaimComponent} from './wen-claim/wen-claim.component';
import {AuthenticationGuard} from '@services/authentication.gard';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'wen-claim',
                canActivate: [AuthenticationGuard]
            },
            {
                path: 'wen-claim',
                component: WenClaimComponent,
                canActivate: [AuthenticationGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        AuthenticationGuard
    ]
})
export class MainRoutingModule {

}
