import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Metric} from '@models/metric.model';
import {MetricService} from '@services/metric.service';
import {Router} from '@angular/router';
import {DialogService} from '../../../shared/components/generic-dialog/dialog.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DatePipe} from '@angular/common';
import {HelperService} from '@services/helper.service';
import {catchError, map, merge, of as observableOf, startWith, switchMap} from 'rxjs';
import {PaginationCommand} from '@models/pagination.command';

@Component({
  templateUrl: './wen-claim.component.html',
  styleUrls: ['./wen-claim.component.scss'],
})
export class WenClaimComponent implements AfterViewInit {
  displayedColumns: string[] = ['date', 'sessionId', 'amount', 'apr', 'cost'];
  dataSource: MatTableDataSource<Metric>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  metrics: Metric[];
  totalNbItems = 0;
  loading = true;
  nbCurrentMonth = 0;
  nbPreviousMonth = 0;
  monthlyAverage = 0;
  nbCurrentMonthDistinct = 0;
  nbPreviousMonthDistinct = 0;
  monthlyAverageDistinct = 0;

  constructor(
    private metricService: MetricService,
    private router: Router,
    private dialogService: DialogService,
    private datePipe: DatePipe,
    private helperService: HelperService
  ) {
  }

  ngAfterViewInit() {
    this.initDataSource();
  }

  private initDataSource() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          return this.metricService.getAllPaginated(new PaginationCommand(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize,
            this.sort.active,
            this.sort.direction)
          ).pipe(catchError((error) => {
            this.dialogService.error(error);
            return observableOf(null);
          }));
        }),
        map(data => {
          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of
          // errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.totalNbItems = data.totalNbItems;
          return data.metrics;
        }),
      )
      .subscribe(data => {
        this.computeStats();
        this.metrics = data;
        this.dataSource = new MatTableDataSource(this.metrics);
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
        this.loading = false;
      });
  }

  private computeStats() {
    this.metricService.getAll().subscribe((data) => {
      this.nbCurrentMonth = 0;
      this.nbPreviousMonth = 0;
      this.monthlyAverage = 0;
      this.nbCurrentMonthDistinct = 0;
      this.nbPreviousMonthDistinct = 0;
      this.monthlyAverageDistinct = 0;
      const currentMonth = new Date().getUTCMonth();
      const temp = new Date();
      temp.setUTCMonth(temp.getUTCMonth() - 1);
      const previousMonth = temp.getMonth();
      let minDate = new Date();
      const sessionMap = new Map<string, Metric>();

      for (const metric of data) {
        sessionMap.set(metric.sessionId, metric);
        const metricDate = new Date(metric.date);
        if (metricDate.getUTCMonth() === currentMonth) {
          this.nbCurrentMonth++;
        } else {
          if (metricDate.getUTCMonth() === previousMonth) {
            this.nbPreviousMonth++;
          }
        }
        if (metricDate.getTime() < minDate.getTime()) {
          minDate = metricDate;
        }
      }
      const today = new Date();
      let diffMonth = (today.getUTCFullYear() - minDate.getUTCFullYear()) * 12 + (today.getUTCMonth() - minDate.getUTCMonth()) + 1;
      this.monthlyAverage = data.length / diffMonth;

      minDate = new Date();
      for (const metric of sessionMap.values()) {
        const metricDate = new Date(metric.date);
        if (metricDate.getUTCMonth() === currentMonth) {
          this.nbCurrentMonthDistinct++;
        } else {
          if (metricDate.getUTCMonth() === previousMonth) {
            this.nbPreviousMonthDistinct++;
          }
        }
        if (metricDate.getTime() < minDate.getTime()) {
          minDate = metricDate;
        }
      }
      diffMonth = (today.getUTCFullYear() - minDate.getUTCFullYear()) * 12 + (today.getUTCMonth() - minDate.getUTCMonth()) + 1;
      this.monthlyAverageDistinct = sessionMap.size / diffMonth;
    });
  }
}
