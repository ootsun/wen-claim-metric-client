import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {AppConfigService} from '@services/app-config.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    API_BASE_URL;
    API_PATH = '/users/';

    constructor(
        private http: HttpClient,
        private appConfigService: AppConfigService) {
        this.API_BASE_URL = this.appConfigService.apiBaseUrl;
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(this.API_BASE_URL + this.API_PATH + 'login', {
            email: email,
            password: password
        });
    }

    refreshToken(): Observable<any> {
        return this.http.get<any>(this.API_BASE_URL + this.API_PATH + 'refresh-token');
    }
}
