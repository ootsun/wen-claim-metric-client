import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    constructor() {
    }

    get apiBaseUrl(): string {
        if (environment.apiBaseUrl && environment.apiBaseUrl.endsWith('/')) {
            return environment.apiBaseUrl.slice(0, environment.apiBaseUrl.length - 1);
        }
        return environment.apiBaseUrl;
    }
}
