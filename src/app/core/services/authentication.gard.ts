import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {SecurityService} from '@services/security.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    constructor(
        private securityService: SecurityService,
        private router: Router,
        private _snackBar: MatSnackBar) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isAuthenticated = this.securityService.isAuthenticated();
        if (!isAuthenticated) {
            this.router.navigate(['/login']);
            if (this.securityService.getToken()) {
                this.displayInactivityLogout();
            }
        }
        return isAuthenticated;
    }

    private displayInactivityLogout() {
        this._snackBar.open('Vous avez été déconnecté(e) pour cause d\'inactivité',
            null,
            {
                duration: 3000,
            });
    }
}
