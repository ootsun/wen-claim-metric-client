import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {HomeComponent} from './home/home.component';
import {MainRoutingModule} from './main-routes.module';
import {WenClaimComponent} from './wen-claim/wen-claim.component';
import {GenericDialogComponent} from '../../shared/components/generic-dialog/generic-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    MainRoutingModule
  ],
  declarations: [
    HomeComponent,
    WenClaimComponent,
  ],
  entryComponents: [GenericDialogComponent]
})
export class MainModule {
}
