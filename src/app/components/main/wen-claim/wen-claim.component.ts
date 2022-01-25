import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Metric} from '@models/metric.model';
import {MetricService} from '@services/metric.service';
import {Router} from '@angular/router';
import {DialogService} from '../../../shared/components/generic-dialog/dialog.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DatePipe} from '@angular/common';
import {HelperService} from '@services/helper.service';

@Component({
  templateUrl: './wen-claim.component.html',
  styleUrls: ['./wen-claim.component.scss'],
})
export class WenClaimComponent implements OnInit {
  displayedColumns: string[] = ['date', 'sessionId', 'amount', 'apr', 'cost'];
  dataSource: MatTableDataSource<Metric>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  metrics: Metric[];
  loading = true;

  constructor(
    private metricService: MetricService,
    private router: Router,
    private dialogService: DialogService,
    private datePipe: DatePipe,
    private helperService: HelperService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.metricService.getAll().subscribe(
      (data) => {
        this.metrics = data;
        this.initDataSource();
      },
      (error) => {
        this.dialogService.error(error);
        this.loading = false;
      }
    );
  }

  private initDataSource() {
    this.dataSource = new MatTableDataSource(this.metrics);
    this.dataSource.filterPredicate = (data: Metric, filter: string) => {
      return this.helperService
          .normalizeString(
            'Le ' +
            this.datePipe.transform(
              data.date,
              'EEEE dd LLLL yyyy',
              '',
              'fr-BE'
            )
          )
          .indexOf(filter) !== -1 ||
        ('' + data.sessionId).indexOf(filter) !== -1
        || ('' + data.amount).indexOf(filter) !== -1
        || ('' + data.apr).indexOf(filter) !== -1
        || ('' + data.cost).indexOf(filter) !== -1;
    };
    // https://stackoverflow.com/questions/48785965/angular-matpaginator-doesnt-get-initialized
    this.loading = false;
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue
      ? this.helperService.normalizeString(filterValue)
      : '';

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
