import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';

import {GenericDialogComponent} from './components/generic-dialog/generic-dialog.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoadingBarComponent} from './components/loading-bar/loading-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeMenuComponent} from './components/home-menu/home-menu.component';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AuthenticationInterceptor} from '../core/interceptors/authentication.interceptor';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatDatepickerModule,
        MatRadioModule,
        MatSliderModule,
        MatSelectModule,
        MatNativeDateModule,
        MatBadgeModule,
        MatDividerModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatChipsModule,
        MatTooltipModule
    ],
    exports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatDatepickerModule,
        LoadingBarComponent,
        HomeMenuComponent,
        MatRadioModule,
        MatSliderModule,
        MatSelectModule,
        MatBadgeModule,
        MatDividerModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatChipsModule,
        MatTooltipModule,
    ],
    declarations: [
        GenericDialogComponent,
        LoadingBarComponent,
        HomeMenuComponent,
    ],
    entryComponents: [GenericDialogComponent],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}
    ]
})
export class SharedModule {
}
