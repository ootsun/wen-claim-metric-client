export class PaginationCommand {

    constructor(
        public pageNumber: number,
        public pageSize: number,
        public sortedColumn: string,
        public sortDirection: string
    ) {
    }
}
