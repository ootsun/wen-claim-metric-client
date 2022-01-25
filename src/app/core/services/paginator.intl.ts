import {Injectable} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {Subject} from 'rxjs/internal/Subject';

@Injectable()
export class PaginatorIntl implements MatPaginatorIntl {
    changes = new Subject<void>();

    firstPageLabel = 'Première page';
    itemsPerPageLabel = 'Éléments par page';
    lastPageLabel = 'Dernière page';
    nextPageLabel = 'Page suivante';
    previousPageLabel = 'Page précédente';

    getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return 'Page 1 sur 1';
        }
        const amountPages = Math.ceil(length / pageSize);
        return `Page ${page + 1} sur ${amountPages}`;
    }
}