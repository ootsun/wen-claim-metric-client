import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of} from 'rxjs';
import {SecurityService} from '@services/security.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationBasedPreloader implements PreloadingStrategy {

    constructor(private securityService: SecurityService) {
    }

    preload(route: Route, load: () => Observable<any>): Observable<any> {
        const shouldBeAuthenticated: boolean = route.data && route.data['shouldBeAuthenticated'];

        if (!shouldBeAuthenticated || this.securityService.isAuthenticated()) {
            return load();
        }
        return of(null);
    }
}
