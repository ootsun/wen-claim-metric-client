import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HelperService {
    constructor() {
    }

    normalizeString(s: string) {
        return s
            .normalize('NFD')
            .trim()
            .toLowerCase()
            .replace(/[\u0300-\u036f]/g, '');
    }
}
