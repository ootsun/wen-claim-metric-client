import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs/internal/Observable';
import {Subject} from 'rxjs/internal/Subject';
import {
    GenericDialogComponent,
    GenericDialogData,
} from './generic-dialog.component';

@Injectable()
export class DialogService {
    constructor(public dialog: MatDialog) {
    }

    confirm(message: string): Observable<boolean> {
        const response = new Subject<boolean>();
        this.dialog.open(GenericDialogComponent, {
            width: '400px',
            disableClose: true,
            data: new GenericDialogData('CONFIRM', null, message, response, null),
        });
        return response.asObservable();
    }

    info(message: string, title?: string) {
        this.dialog.open(GenericDialogComponent, {
            data: new GenericDialogData('INFO', title, message, null, null),
        });
    }

    error(message: any, redirect?: string) {
        if (!message) {
            return;
        }
        if (message.status && message.status === 500) {
            message = 'Une erreur est survenue... Veuillez contacter le support';
        } else if (typeof message !== 'string') {
            if (message.error?.message) {
                message = message.error.message;
            } else {
                message = message.message;
            }
        }
        this.dialog.open(GenericDialogComponent, {
            width: '400px',
            data: new GenericDialogData('ERROR', null, message, null, redirect),
        });
    }
}
