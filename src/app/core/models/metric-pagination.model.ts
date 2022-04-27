import {Metric} from '@models/metric.model';

export class MetricPagination {

    constructor(
        public metrics: Metric[],
        public totalNbItems: number) {
    }

}
