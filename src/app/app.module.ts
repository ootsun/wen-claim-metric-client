import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {DialogService} from './shared/components/generic-dialog/dialog.service';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';

registerLocaleData(localeFr, 'fr-BE', localeFrExtra);
import {DatePipe} from '@angular/common';
import {HelperService} from '@services/helper.service';
import {AuthenticationService} from '@services/authentication.service';
import {SecurityService} from '@services/security.service';
import {LocalStorageService} from '@services/local-storage.service';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {PaginatorIntl} from '@services/paginator.intl';
import {MetricService} from '@services/metric.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-BE'},
    DialogService,
    DatePipe,
    HelperService,
    AuthenticationService,
    SecurityService,
    LocalStorageService,
    MetricService,
    {provide: MatPaginatorIntl, useClass: PaginatorIntl}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
