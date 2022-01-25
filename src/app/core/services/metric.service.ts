import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Metric} from '@models/metric.model';
import {AppConfigService} from '@services/app-config.service';

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

    create(metric: Metric): Observable<any> {
        return this.http.post<any>(this.API_BASE_URL + this.API_PATH, metric);
    }

    getAll(): Observable<Metric[]> {
        return this.http.get<Metric[]>(this.API_BASE_URL + this.API_PATH);
    }

    get(metricId: string): Observable<Metric> {
        return this.http.get<Metric>(this.API_BASE_URL + this.API_PATH + metricId);
    }

    update(metric: Metric): Observable<any> {
        return this.http.put<any>(this.API_BASE_URL + this.API_PATH + metric.id, metric);
    }

    delete(metricId: string): Observable<any> {
        return this.http.delete<any>(this.API_BASE_URL + this.API_PATH + metricId);
    }
}
