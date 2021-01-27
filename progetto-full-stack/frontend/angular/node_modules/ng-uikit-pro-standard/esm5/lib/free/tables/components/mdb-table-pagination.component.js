import { __decorate, __metadata } from "tslib";
import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef, OnChanges, SimpleChanges, AfterViewInit, OnDestroy, } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MdbTableDirective } from '../directives/mdb-table.directive';
import { takeUntil } from 'rxjs/operators';
var MdbTablePaginationComponent = /** @class */ (function () {
    function MdbTablePaginationComponent(cdRef) {
        this.cdRef = cdRef;
        this.searchPagination = false;
        this.searchDataSource = null;
        this.ofKeyword = 'of';
        this.dashKeyword = '-';
        this.paginationAlign = '';
        this.hideDescription = false;
        this._destroy$ = new Subject();
        this.maxVisibleItems = 10;
        this.firstItemIndex = 0;
        this.lastItemIndex = this.maxVisibleItems;
        this.lastVisibleItemIndex = 5;
        this.activePageNumber = 1;
        this.allItemsLength = 0;
        this.nextShouldBeDisabled = false;
        this.previousShouldBeDisabled = true;
        this.searchText = '';
        this.pagination = new Subject();
        this.nextPageClick = new EventEmitter();
        this.previousPageClick = new EventEmitter();
        this.firstPageClick = new EventEmitter();
        this.lastPageClick = new EventEmitter();
    }
    MdbTablePaginationComponent.prototype.ngOnInit = function () {
        if (this.tableEl) {
            this.allItemsLength = this.tableEl.getDataSource().length;
        }
    };
    MdbTablePaginationComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.tableEl) {
            this.tableEl
                .dataSourceChange()
                .pipe(takeUntil(this._destroy$))
                .subscribe(function (data) {
                _this.allItemsLength = data.length;
                _this.lastVisibleItemIndex = data.length;
                _this.calculateFirstItemIndex();
                _this.calculateLastItemIndex();
                _this.disableNextButton(data);
                if (_this.searchDataSource) {
                    setTimeout(function () {
                        if (_this.searchDataSource.length !== data.length) {
                            _this.activePageNumber = 1;
                            _this.firstItemIndex = 1;
                        }
                    }, 0);
                }
            });
        }
        this.paginationChange()
            .pipe(takeUntil(this._destroy$))
            .subscribe(function (data) {
            _this.firstItemIndex = data.first;
            _this.lastVisibleItemIndex = data.last;
        });
    };
    MdbTablePaginationComponent.prototype.ngOnChanges = function (changes) {
        var searchDataSource = changes['searchDataSource'];
        if (searchDataSource.currentValue.length !== 0) {
            this.allItemsLength = searchDataSource.currentValue.length;
        }
        if (this.lastVisibleItemIndex > this.allItemsLength) {
            this.lastVisibleItemIndex = this.allItemsLength;
        }
        if (searchDataSource.currentValue.length === 0) {
            this.firstItemIndex = 0;
            this.lastItemIndex = 0;
            this.lastVisibleItemIndex = 0;
            this.allItemsLength = 0;
        }
        if (!searchDataSource.isFirstChange() &&
            searchDataSource.currentValue.length <= this.maxVisibleItems) {
            this.nextShouldBeDisabled = true;
            this.lastVisibleItemIndex = searchDataSource.currentValue.length;
        }
        else {
            this.nextShouldBeDisabled = false;
        }
    };
    MdbTablePaginationComponent.prototype.setMaxVisibleItemsNumberTo = function (value) {
        this.lastItemIndex = value;
        this.lastVisibleItemIndex = value;
        this.maxVisibleItems = value;
        this.cdRef.detectChanges();
    };
    MdbTablePaginationComponent.prototype.searchTextObs = function () {
        var _this = this;
        var observable = new Observable(function (observer) {
            observer.next(_this.searchText);
        });
        return observable;
    };
    MdbTablePaginationComponent.prototype.disableNextButton = function (data) {
        if (data.length <= this.maxVisibleItems) {
            this.nextShouldBeDisabled = true;
        }
        else {
            this.nextShouldBeDisabled = false;
        }
    };
    MdbTablePaginationComponent.prototype.calculateFirstItemIndex = function () {
        this.firstItemIndex = this.activePageNumber * this.maxVisibleItems - this.maxVisibleItems + 1;
        this.pagination.next({ first: this.firstItemIndex, last: this.lastItemIndex });
    };
    MdbTablePaginationComponent.prototype.calculateLastItemIndex = function () {
        this.lastItemIndex = this.activePageNumber * this.maxVisibleItems;
        this.lastVisibleItemIndex = this.lastItemIndex;
        if (this.searchDataSource && this.lastItemIndex > this.searchDataSource.length) {
            this.lastVisibleItemIndex = this.searchDataSource.length;
        }
        else if (!this.searchDataSource) {
            this.lastVisibleItemIndex = this.lastItemIndex;
        }
        if (this.lastItemIndex > this.tableEl.getDataSource().length) {
            this.lastItemIndex = this.tableEl.getDataSource().length;
            this.lastVisibleItemIndex = this.tableEl.getDataSource().length;
        }
        this.pagination.next({ first: this.firstItemIndex, last: this.lastItemIndex });
    };
    MdbTablePaginationComponent.prototype.paginationChange = function () {
        return this.pagination;
    };
    MdbTablePaginationComponent.prototype.calculateHowManyPagesShouldBe = function () {
        return Math.ceil(this.tableEl.getDataSource().length / this.maxVisibleItems);
    };
    MdbTablePaginationComponent.prototype.previousPage = function () {
        this.activePageNumber--;
        this.calculateFirstItemIndex();
        this.calculateLastItemIndex();
        this.previousPageClick.emit({ first: this.firstItemIndex, last: this.lastItemIndex });
    };
    MdbTablePaginationComponent.prototype.nextPage = function () {
        this.activePageNumber++;
        this.calculateFirstItemIndex();
        this.calculateLastItemIndex();
        if (this.lastItemIndex > this.tableEl.getDataSource().length) {
            this.lastItemIndex = this.tableEl.getDataSource().length;
        }
        if (this.lastVisibleItemIndex > this.allItemsLength) {
            this.lastVisibleItemIndex = this.allItemsLength;
        }
        this.nextPageClick.emit({ first: this.firstItemIndex, last: this.lastItemIndex });
    };
    MdbTablePaginationComponent.prototype.firstPage = function () {
        this.activePageNumber = 1;
        this.calculateFirstItemIndex();
        this.calculateLastItemIndex();
        this.firstPageClick.emit({ first: this.firstItemIndex, last: this.lastItemIndex });
    };
    MdbTablePaginationComponent.prototype.lastPage = function () {
        var lastPage = Math.ceil(this.allItemsLength / this.maxVisibleItems);
        this.activePageNumber = lastPage;
        this.calculateFirstItemIndex();
        this.calculateLastItemIndex();
        this.lastPageClick.emit({ first: this.firstItemIndex, last: this.lastItemIndex });
    };
    MdbTablePaginationComponent.prototype.nextPageObservable = function () {
        var _this = this;
        var obs = new Observable(function (observer) {
            observer.next(_this.firstItemIndex);
        });
        return obs;
    };
    MdbTablePaginationComponent.prototype.previousPageObservable = function () {
        var _this = this;
        var obs = new Observable(function (observer) {
            observer.next(_this.lastVisibleItemIndex);
        });
        return obs;
    };
    MdbTablePaginationComponent.prototype.checkIfNextShouldBeDisabled = function () {
        if (this.searchDataSource && this.lastVisibleItemIndex === this.searchDataSource.length) {
            return true;
        }
        if (this.activePageNumber >= this.calculateHowManyPagesShouldBe()) {
            return true;
        }
        if (this.nextShouldBeDisabled) {
            return this.nextShouldBeDisabled;
        }
    };
    MdbTablePaginationComponent.prototype.checkIfPreviousShouldBeDisabled = function () {
        if (this.activePageNumber === 1) {
            return true;
        }
    };
    MdbTablePaginationComponent.prototype.ngOnDestroy = function () {
        this._destroy$.next();
        this._destroy$.complete();
    };
    MdbTablePaginationComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", MdbTableDirective)
    ], MdbTablePaginationComponent.prototype, "tableEl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTablePaginationComponent.prototype, "searchPagination", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTablePaginationComponent.prototype, "searchDataSource", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTablePaginationComponent.prototype, "ofKeyword", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTablePaginationComponent.prototype, "dashKeyword", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTablePaginationComponent.prototype, "paginationAlign", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTablePaginationComponent.prototype, "hideDescription", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MdbTablePaginationComponent.prototype, "nextPageClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MdbTablePaginationComponent.prototype, "previousPageClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MdbTablePaginationComponent.prototype, "firstPageClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MdbTablePaginationComponent.prototype, "lastPageClick", void 0);
    MdbTablePaginationComponent = __decorate([
        Component({
            selector: 'mdb-table-pagination',
            template: "<!--Pagination -->\n<nav>\n  <ul\n    class=\"pagination pagination-circle pg-blue d-flex flex-center\"\n    [ngClass]=\"{\n      'justify-content-end': paginationAlign == 'end',\n      'justify-content-start': paginationAlign == 'start'\n    }\"\n  >\n    <li *ngIf=\"!hideDescription\">\n      {{ firstItemIndex }} {{ dashKeyword }} {{ lastVisibleItemIndex }} {{ ofKeyword }}\n      {{ allItemsLength }}\n    </li>\n    <!--Arrow left-->\n    <li class=\"page-item\" [ngClass]=\"{ disabled: checkIfPreviousShouldBeDisabled() }\">\n      <a class=\"page-link\" mdbWavesEffect aria-label=\"Previous\" (click)=\"firstPage()\">\n        <span aria-hidden=\"true\">\u00AB</span>\n      </a>\n    </li>\n\n    <li class=\"page-item\" [ngClass]=\"{ disabled: checkIfPreviousShouldBeDisabled() }\">\n      <a class=\"page-link\" mdbWavesEffect aria-label=\"Previous\" (click)=\"previousPage()\">\n        <span aria-hidden=\"true\">&#8249;</span>\n      </a>\n    </li>\n\n    <li class=\"page-item\" [ngClass]=\"{ disabled: checkIfNextShouldBeDisabled() }\">\n      <a class=\"page-link\" mdbWavesEffect aria-label=\"Previous\" (click)=\"nextPage()\">\n        <span aria-hidden=\"true\">&#8250;</span>\n      </a>\n    </li>\n\n    <!--Arrow right-->\n    <li class=\"page-item\" [ngClass]=\"{ disabled: checkIfNextShouldBeDisabled() }\">\n      <a class=\"page-link\" mdbWavesEffect aria-label=\"Next\" (click)=\"lastPage()\">\n        <span aria-hidden=\"true\">\u00BB</span>\n      </a>\n    </li>\n  </ul>\n</nav>\n<!--/Pagination -->\n"
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], MdbTablePaginationComponent);
    return MdbTablePaginationComponent;
}());
export { MdbTablePaginationComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXRhYmxlLXBhZ2luYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvdGFibGVzL2NvbXBvbmVudHMvbWRiLXRhYmxlLXBhZ2luYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixNQUFNLEVBQ04sWUFBWSxFQUNaLEtBQUssRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULGFBQWEsRUFDYixhQUFhLEVBQ2IsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVczQztJQWdDRSxxQ0FBb0IsS0FBd0I7UUFBeEIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUE5Qm5DLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixxQkFBZ0IsR0FBUSxJQUFJLENBQUM7UUFDN0IsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixnQkFBVyxHQUFHLEdBQUcsQ0FBQztRQUNsQixvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUNyQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUV6QixjQUFTLEdBQWtCLElBQUksT0FBTyxFQUFFLENBQUM7UUFFakQsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFFckIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsa0JBQWEsR0FBVyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzdDLHlCQUFvQixHQUFHLENBQUMsQ0FBQztRQUV6QixxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFFckIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFF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Q2hDLDRnREFBb0Q7U0FDckQsQ0FBQzt5Q0FpQzJCLGlCQUFpQjtPQWhDakMsMkJBQTJCLENBc092QztJQUFELGtDQUFDO0NBQUEsQUF0T0QsSUFzT0M7U0F0T1ksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1kYlRhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi4vZGlyZWN0aXZlcy9tZGItdGFibGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBNZGJQYWdpbmF0aW9uSW5kZXgge1xuICBmaXJzdDogbnVtYmVyO1xuICBsYXN0OiBudW1iZXI7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi10YWJsZS1wYWdpbmF0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21kYi10YWJsZS1wYWdpbmF0aW9uLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgTWRiVGFibGVQYWdpbmF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHRhYmxlRWw6IE1kYlRhYmxlRGlyZWN0aXZlO1xuICBASW5wdXQoKSBzZWFyY2hQYWdpbmF0aW9uID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNlYXJjaERhdGFTb3VyY2U6IGFueSA9IG51bGw7XG4gIEBJbnB1dCgpIG9mS2V5d29yZCA9ICdvZic7XG4gIEBJbnB1dCgpIGRhc2hLZXl3b3JkID0gJy0nO1xuICBASW5wdXQoKSBwYWdpbmF0aW9uQWxpZ24gPSAnJztcbiAgQElucHV0KCkgaGlkZURlc2NyaXB0aW9uID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIG1heFZpc2libGVJdGVtcyA9IDEwO1xuXG4gIGZpcnN0SXRlbUluZGV4ID0gMDtcbiAgbGFzdEl0ZW1JbmRleDogbnVtYmVyID0gdGhpcy5tYXhWaXNpYmxlSXRlbXM7XG4gIGxhc3RWaXNpYmxlSXRlbUluZGV4ID0gNTtcblxuICBhY3RpdmVQYWdlTnVtYmVyID0gMTtcblxuICBhbGxJdGVtc0xlbmd0aCA9IDA7XG5cbiAgbmV4dFNob3VsZEJlRGlzYWJsZWQgPSBmYWxzZTtcbiAgcHJldmlvdXNTaG91bGRCZURpc2FibGVkID0gdHJ1ZTtcblxuICBzZWFyY2hUZXh0ID0gJyc7XG5cbiAgcGFnaW5hdGlvbjogU3ViamVjdDxNZGJQYWdpbmF0aW9uSW5kZXg+ID0gbmV3IFN1YmplY3Q8TWRiUGFnaW5hdGlvbkluZGV4PigpO1xuXG4gIEBPdXRwdXQoKSBuZXh0UGFnZUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxNZGJQYWdpbmF0aW9uSW5kZXg+KCk7XG4gIEBPdXRwdXQoKSBwcmV2aW91c1BhZ2VDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TWRiUGFnaW5hdGlvbkluZGV4PigpO1xuICBAT3V0cHV0KCkgZmlyc3RQYWdlQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1kYlBhZ2luYXRpb25JbmRleD4oKTtcbiAgQE91dHB1dCgpIGxhc3RQYWdlQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1kYlBhZ2luYXRpb25JbmRleD4oKTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMudGFibGVFbCkge1xuICAgICAgdGhpcy5hbGxJdGVtc0xlbmd0aCA9IHRoaXMudGFibGVFbC5nZXREYXRhU291cmNlKCkubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAodGhpcy50YWJsZUVsKSB7XG4gICAgICB0aGlzLnRhYmxlRWxcbiAgICAgICAgLmRhdGFTb3VyY2VDaGFuZ2UoKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLmFsbEl0ZW1zTGVuZ3RoID0gZGF0YS5sZW5ndGg7XG4gICAgICAgICAgdGhpcy5sYXN0VmlzaWJsZUl0ZW1JbmRleCA9IGRhdGEubGVuZ3RoO1xuICAgICAgICAgIHRoaXMuY2FsY3VsYXRlRmlyc3RJdGVtSW5kZXgoKTtcbiAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUxhc3RJdGVtSW5kZXgoKTtcbiAgICAgICAgICB0aGlzLmRpc2FibGVOZXh0QnV0dG9uKGRhdGEpO1xuXG4gICAgICAgICAgaWYgKHRoaXMuc2VhcmNoRGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaERhdGFTb3VyY2UubGVuZ3RoICE9PSBkYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlUGFnZU51bWJlciA9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdEl0ZW1JbmRleCA9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5wYWdpbmF0aW9uQ2hhbmdlKClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5maXJzdEl0ZW1JbmRleCA9IGRhdGEuZmlyc3Q7XG4gICAgICAgIHRoaXMubGFzdFZpc2libGVJdGVtSW5kZXggPSBkYXRhLmxhc3Q7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCBzZWFyY2hEYXRhU291cmNlID0gY2hhbmdlc1snc2VhcmNoRGF0YVNvdXJjZSddO1xuICAgIGlmIChzZWFyY2hEYXRhU291cmNlLmN1cnJlbnRWYWx1ZS5sZW5ndGggIT09IDApIHtcbiAgICAgIHRoaXMuYWxsSXRlbXNMZW5ndGggPSBzZWFyY2hEYXRhU291cmNlLmN1cnJlbnRWYWx1ZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGFzdFZpc2libGVJdGVtSW5kZXggPiB0aGlzLmFsbEl0ZW1zTGVuZ3RoKSB7XG4gICAgICB0aGlzLmxhc3RWaXNpYmxlSXRlbUluZGV4ID0gdGhpcy5hbGxJdGVtc0xlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoRGF0YVNvdXJjZS5jdXJyZW50VmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLmZpcnN0SXRlbUluZGV4ID0gMDtcbiAgICAgIHRoaXMubGFzdEl0ZW1JbmRleCA9IDA7XG4gICAgICB0aGlzLmxhc3RWaXNpYmxlSXRlbUluZGV4ID0gMDtcbiAgICAgIHRoaXMuYWxsSXRlbXNMZW5ndGggPSAwO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICFzZWFyY2hEYXRhU291cmNlLmlzRmlyc3RDaGFuZ2UoKSAmJlxuICAgICAgc2VhcmNoRGF0YVNvdXJjZS5jdXJyZW50VmFsdWUubGVuZ3RoIDw9IHRoaXMubWF4VmlzaWJsZUl0ZW1zXG4gICAgKSB7XG4gICAgICB0aGlzLm5leHRTaG91bGRCZURpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMubGFzdFZpc2libGVJdGVtSW5kZXggPSBzZWFyY2hEYXRhU291cmNlLmN1cnJlbnRWYWx1ZS5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubmV4dFNob3VsZEJlRGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBzZXRNYXhWaXNpYmxlSXRlbXNOdW1iZXJUbyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5sYXN0SXRlbUluZGV4ID0gdmFsdWU7XG4gICAgdGhpcy5sYXN0VmlzaWJsZUl0ZW1JbmRleCA9IHZhbHVlO1xuICAgIHRoaXMubWF4VmlzaWJsZUl0ZW1zID0gdmFsdWU7XG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBzZWFyY2hUZXh0T2JzKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3Qgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogYW55KSA9PiB7XG4gICAgICBvYnNlcnZlci5uZXh0KHRoaXMuc2VhcmNoVGV4dCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG9ic2VydmFibGU7XG4gIH1cblxuICBkaXNhYmxlTmV4dEJ1dHRvbihkYXRhOiBhbnkpIHtcbiAgICBpZiAoZGF0YS5sZW5ndGggPD0gdGhpcy5tYXhWaXNpYmxlSXRlbXMpIHtcbiAgICAgIHRoaXMubmV4dFNob3VsZEJlRGlzYWJsZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5leHRTaG91bGRCZURpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY2FsY3VsYXRlRmlyc3RJdGVtSW5kZXgoKSB7XG4gICAgdGhpcy5maXJzdEl0ZW1JbmRleCA9IHRoaXMuYWN0aXZlUGFnZU51bWJlciAqIHRoaXMubWF4VmlzaWJsZUl0ZW1zIC0gdGhpcy5tYXhWaXNpYmxlSXRlbXMgKyAxO1xuICAgIHRoaXMucGFnaW5hdGlvbi5uZXh0KHsgZmlyc3Q6IHRoaXMuZmlyc3RJdGVtSW5kZXgsIGxhc3Q6IHRoaXMubGFzdEl0ZW1JbmRleCB9KTtcbiAgfVxuXG4gIGNhbGN1bGF0ZUxhc3RJdGVtSW5kZXgoKSB7XG4gICAgdGhpcy5sYXN0SXRlbUluZGV4ID0gdGhpcy5hY3RpdmVQYWdlTnVtYmVyICogdGhpcy5tYXhWaXNpYmxlSXRlbXM7XG4gICAgdGhpcy5sYXN0VmlzaWJsZUl0ZW1JbmRleCA9IHRoaXMubGFzdEl0ZW1JbmRleDtcblxuICAgIGlmICh0aGlzLnNlYXJjaERhdGFTb3VyY2UgJiYgdGhpcy5sYXN0SXRlbUluZGV4ID4gdGhpcy5zZWFyY2hEYXRhU291cmNlLmxlbmd0aCkge1xuICAgICAgdGhpcy5sYXN0VmlzaWJsZUl0ZW1JbmRleCA9IHRoaXMuc2VhcmNoRGF0YVNvdXJjZS5sZW5ndGg7XG4gICAgfSBlbHNlIGlmICghdGhpcy5zZWFyY2hEYXRhU291cmNlKSB7XG4gICAgICB0aGlzLmxhc3RWaXNpYmxlSXRlbUluZGV4ID0gdGhpcy5sYXN0SXRlbUluZGV4O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxhc3RJdGVtSW5kZXggPiB0aGlzLnRhYmxlRWwuZ2V0RGF0YVNvdXJjZSgpLmxlbmd0aCkge1xuICAgICAgdGhpcy5sYXN0SXRlbUluZGV4ID0gdGhpcy50YWJsZUVsLmdldERhdGFTb3VyY2UoKS5sZW5ndGg7XG4gICAgICB0aGlzLmxhc3RWaXNpYmxlSXRlbUluZGV4ID0gdGhpcy50YWJsZUVsLmdldERhdGFTb3VyY2UoKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgdGhpcy5wYWdpbmF0aW9uLm5leHQoeyBmaXJzdDogdGhpcy5maXJzdEl0ZW1JbmRleCwgbGFzdDogdGhpcy5sYXN0SXRlbUluZGV4IH0pO1xuICB9XG5cbiAgcGFnaW5hdGlvbkNoYW5nZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnBhZ2luYXRpb247XG4gIH1cblxuICBjYWxjdWxhdGVIb3dNYW55UGFnZXNTaG91bGRCZSgpIHtcbiAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMudGFibGVFbC5nZXREYXRhU291cmNlKCkubGVuZ3RoIC8gdGhpcy5tYXhWaXNpYmxlSXRlbXMpO1xuICB9XG5cbiAgcHJldmlvdXNQYWdlKCkge1xuICAgIHRoaXMuYWN0aXZlUGFnZU51bWJlci0tO1xuICAgIHRoaXMuY2FsY3VsYXRlRmlyc3RJdGVtSW5kZXgoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUxhc3RJdGVtSW5kZXgoKTtcbiAgICB0aGlzLnByZXZpb3VzUGFnZUNsaWNrLmVtaXQoeyBmaXJzdDogdGhpcy5maXJzdEl0ZW1JbmRleCwgbGFzdDogdGhpcy5sYXN0SXRlbUluZGV4IH0pO1xuICB9XG5cbiAgbmV4dFBhZ2UoKSB7XG4gICAgdGhpcy5hY3RpdmVQYWdlTnVtYmVyKys7XG4gICAgdGhpcy5jYWxjdWxhdGVGaXJzdEl0ZW1JbmRleCgpO1xuICAgIHRoaXMuY2FsY3VsYXRlTGFzdEl0ZW1JbmRleCgpO1xuXG4gICAgaWYgKHRoaXMubGFzdEl0ZW1JbmRleCA+IHRoaXMudGFibGVFbC5nZXREYXRhU291cmNlKCkubGVuZ3RoKSB7XG4gICAgICB0aGlzLmxhc3RJdGVtSW5kZXggPSB0aGlzLnRhYmxlRWwuZ2V0RGF0YVNvdXJjZSgpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IHRoaXMuYWxsSXRlbXNMZW5ndGgpIHtcbiAgICAgIHRoaXMubGFzdFZpc2libGVJdGVtSW5kZXggPSB0aGlzLmFsbEl0ZW1zTGVuZ3RoO1xuICAgIH1cblxuICAgIHRoaXMubmV4dFBhZ2VDbGljay5lbWl0KHsgZmlyc3Q6IHRoaXMuZmlyc3RJdGVtSW5kZXgsIGxhc3Q6IHRoaXMubGFzdEl0ZW1JbmRleCB9KTtcbiAgfVxuXG4gIGZpcnN0UGFnZSgpIHtcbiAgICB0aGlzLmFjdGl2ZVBhZ2VOdW1iZXIgPSAxO1xuICAgIHRoaXMuY2FsY3VsYXRlRmlyc3RJdGVtSW5kZXgoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUxhc3RJdGVtSW5kZXgoKTtcblxuICAgIHRoaXMuZmlyc3RQYWdlQ2xpY2suZW1pdCh7IGZpcnN0OiB0aGlzLmZpcnN0SXRlbUluZGV4LCBsYXN0OiB0aGlzLmxhc3RJdGVtSW5kZXggfSk7XG4gIH1cblxuICBsYXN0UGFnZSgpIHtcbiAgICBjb25zdCBsYXN0UGFnZSA9IE1hdGguY2VpbCh0aGlzLmFsbEl0ZW1zTGVuZ3RoIC8gdGhpcy5tYXhWaXNpYmxlSXRlbXMpO1xuICAgIHRoaXMuYWN0aXZlUGFnZU51bWJlciA9IGxhc3RQYWdlO1xuICAgIHRoaXMuY2FsY3VsYXRlRmlyc3RJdGVtSW5kZXgoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUxhc3RJdGVtSW5kZXgoKTtcblxuICAgIHRoaXMubGFzdFBhZ2VDbGljay5lbWl0KHsgZmlyc3Q6IHRoaXMuZmlyc3RJdGVtSW5kZXgsIGxhc3Q6IHRoaXMubGFzdEl0ZW1JbmRleCB9KTtcbiAgfVxuXG4gIG5leHRQYWdlT2JzZXJ2YWJsZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IG9icyA9IG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogYW55KSA9PiB7XG4gICAgICBvYnNlcnZlci5uZXh0KHRoaXMuZmlyc3RJdGVtSW5kZXgpO1xuICAgIH0pO1xuICAgIHJldHVybiBvYnM7XG4gIH1cblxuICBwcmV2aW91c1BhZ2VPYnNlcnZhYmxlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3Qgb2JzID0gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgIG9ic2VydmVyLm5leHQodGhpcy5sYXN0VmlzaWJsZUl0ZW1JbmRleCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG9icztcbiAgfVxuXG4gIGNoZWNrSWZOZXh0U2hvdWxkQmVEaXNhYmxlZCgpIHtcbiAgICBpZiAodGhpcy5zZWFyY2hEYXRhU291cmNlICYmIHRoaXMubGFzdFZpc2libGVJdGVtSW5kZXggPT09IHRoaXMuc2VhcmNoRGF0YVNvdXJjZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGl2ZVBhZ2VOdW1iZXIgPj0gdGhpcy5jYWxjdWxhdGVIb3dNYW55UGFnZXNTaG91bGRCZSgpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5uZXh0U2hvdWxkQmVEaXNhYmxlZCkge1xuICAgICAgcmV0dXJuIHRoaXMubmV4dFNob3VsZEJlRGlzYWJsZWQ7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tJZlByZXZpb3VzU2hvdWxkQmVEaXNhYmxlZCgpIHtcbiAgICBpZiAodGhpcy5hY3RpdmVQYWdlTnVtYmVyID09PSAxKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19