import {Injectable} from '@angular/core';
import {LocalStorageService} from '@services/local-storage.service';
import {BehaviorSubject, Observable} from 'rxjs';
import jwt_decode from 'jwt-decode';
import {AuthenticationService} from '@services/authentication.service';
import {DialogService} from '../../shared/components/generic-dialog/dialog.service';

@Injectable({
    providedIn: 'root',
})
export class SecurityService {

    private authStatusListener: BehaviorSubject<boolean>;
    private userInteracted: boolean;
    private refreshTokenTimer: any;

    constructor(
        private localStorageService: LocalStorageService,
        private authenticationService: AuthenticationService,
        private dialogService: DialogService) {
        this.authStatusListener = new BehaviorSubject<boolean>(false);
        this.isAuthenticated();
        this.initRefreshTokenTimeout();
    }

    storeToken(token: string) {
        if (token) {
            this.userInteracted = false;
            this.localStorageService.set('jwtToken', token);
            this.initRefreshTokenTimeout();
        } else {
            this.localStorageService.remove('jwtToken');
        }
        this.authStatusListener.next(!!token);
    }

    removeToken() {
        this.localStorageService.remove('jwtToken');
        this.authStatusListener.next(false);
        clearTimeout(this.refreshTokenTimer);
    }

    getToken(): string {
        return this.localStorageService.get('jwtToken');
    }

    isAuthenticatedObs(): Observable<boolean> {
        return this.authStatusListener.asObservable();
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        const isAuthenticated = token && !this.isTokenExpired(token);
        this.authStatusListener.next(isAuthenticated);
        return isAuthenticated;
    }

    onClick() {
        this.userInteracted = true;
    }

    private initRefreshTokenTimeout() {
        let refreshTokenTime = this.tokenExpiresIn() - 5000;
        if (refreshTokenTime < 0) {
            refreshTokenTime = 0;
        }
        this.refreshTokenTimer = setTimeout(() => {
            if (this.userInteracted) {
                this.authenticationService.refreshToken()
                    .subscribe((data) => {
                            if (data?.token && data.token !== this.getToken()) {
                                this.storeToken(data?.token);
                            }
                        },
                        (error) => {
                            this.dialogService.error(error);
                        }
                    );
            }
        }, refreshTokenTime);
    }

    private isTokenExpired(token: string): boolean {
        const decodedToken: { [key: string]: string } = jwt_decode(token);
        const expiryTime: number = Number.parseInt(decodedToken?.exp, 10);
        if (expiryTime) {
            return ((1000 * expiryTime) - (new Date()).getTime()) <= 5000;
        }
        return true;
    }

    private tokenExpiresIn(): number {
        const token = this.getToken();
        if (token) {
            const decodedToken: { [key: string]: string } = jwt_decode(token);
            const expiryTime: number = Number.parseInt(decodedToken?.exp, 10);
            return expiryTime * 1000 - new Date().getTime();
        }
        return 0;
    }
}
