import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {SecurityService} from '@services/security.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(
        private securityService: SecurityService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.securityService.getToken();
        if (token) {
            const authRequest = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token)
            });
            return next.handle(authRequest);
        }
        return next.handle(req);
    }

}
