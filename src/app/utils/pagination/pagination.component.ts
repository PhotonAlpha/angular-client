import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';


@Component({
    selector: 'app-pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['pagination.component.css']
})

export class PaginationComponent implements OnChanges {
    constructor() {
    }

    // the current page
    @Input() currPage: number;
    // the total pages
    @Input() totalCount: number;
    // how many items we want to show per page
    @Input() pageSize: number;
    // how many pages between next/prev
    @Input() pagesToShow: number;
    // check if content is being loaded
    @Input() loading: boolean;


    @Output() goPrev = new EventEmitter<boolean>();
    @Output() goNext = new EventEmitter<boolean>();
    @Output() goPage = new EventEmitter<number>();

    items: number[];

    getMin(): number {
        return ((this.pageSize * this.currPage) - this.pageSize) + 1;
    }
    getMax(): number {
        let max = this.pageSize * this.currPage;
        if (max > this.totalCount) {
            max = this.totalCount;
        }
        return max;
    }

    onPage(n: number): void {
        this.goPage.emit(n);
    }
    onPrev(): void {
        this.goPrev.emit(true);
    }
    onNext(next: boolean): void {
        this.goNext.emit(next);
    }

    totalPages(): number {
        return Math.ceil(this.totalCount / this.pageSize) || 0;
    }
    lastPage(): boolean {
        return this.pageSize * this.currPage > this.totalCount;
    }

    getPages(): void {
        console.log('getPage');
        // total page
        const c = Math.ceil(this.totalCount / this.pageSize);
        const p = this.currPage || 1;
        const pagesToShow = this.pagesToShow || 5;
        const pages: number[] = [];
        pages.push(p);
        const times = pagesToShow - 1;
        console.log(this.totalCount, this.pageSize, `totalpage${c}`, `curr` + this.currPage + 'pagestoshow' + times);
        console.log(pages);
        for (let i = 0; i < times; i++) {
            if (pages.length < pagesToShow) {
                if (Math.min.apply(null, pages) > 1) {
                    console.log(Math.min.apply(null, pages) - 1);
                    pages.push(Math.min.apply(null, pages) - 1 );
                }
            }
            if (pages.length < pagesToShow) {
                if (Math.max.apply(null, pages) < c) {
                    console.log(Math.max.apply(null, pages) + 1);
                    pages.push(Math.max.apply(null, pages) + 1 );
                }
            }
        }
        pages.sort((a, b) => a - b);
        console.log(pages);
        this.items = pages;
    }

    ngOnChanges() {
        console.log('ngOnChanges');
        this.getPages();
    }
}
