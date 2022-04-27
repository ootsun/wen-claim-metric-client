import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {AppConfigService} from '@services/app-config.service';
import {PaginationCommand} from '@models/pagination.command';
import {MetricPagination} from '@models/metric-pagination.model';
import {Metric} from '@models/metric.model';

@Injectable({
    providedIn: 'root'
})
export class MetricService {

    API_BASE_URL;
    API_PATH = '/metrics/';

    constructor(
        private http: HttpClient,
        private appConfigService: AppConfigService) {
        this.API_BASE_URL = this.appConfigService.apiBaseUrl;
    }

    getAll(): Observable<Metric[]> {
      return this.http.get<Metric[]>(this.API_BASE_URL + this.API_PATH);
    }

    getAllPaginated(pagination: PaginationCommand): Observable<MetricPagination> {
        return this.http.post<MetricPagination>(this.API_BASE_URL + this.API_PATH + 'pagination', pagination);
    }
}
