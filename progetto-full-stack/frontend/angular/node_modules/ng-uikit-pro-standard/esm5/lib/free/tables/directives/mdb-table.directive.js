import { __decorate, __metadata, __values } from "tslib";
import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit, Renderer2, ViewEncapsulation, } from '@angular/core';
import { Observable, Subject } from 'rxjs';
var MdbTableDirective = /** @class */ (function () {
    function MdbTableDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.stickyHeader = false;
        this.stickyHeaderBgColor = '#f2f2f2';
        this.stickyHeaderTextColor = '#000000';
        this.stickyFooter = false;
        this.stickyFooterBgColor = '#f2f2f2';
        this.stickyFooterTextColor = '#000000';
        this._dataSource = [];
        this._dataSourceChanged = new Subject();
    }
    MdbTableDirective.prototype.addRow = function (newRow) {
        this.getDataSource().push(newRow);
    };
    MdbTableDirective.prototype.addRowAfter = function (index, row) {
        this.getDataSource().splice(index, 0, row);
    };
    MdbTableDirective.prototype.removeRow = function (index) {
        this.getDataSource().splice(index, 1);
    };
    MdbTableDirective.prototype.rowRemoved = function () {
        return new Observable(function (observer) {
            observer.next(true);
        });
    };
    MdbTableDirective.prototype.removeLastRow = function () {
        this.getDataSource().pop();
    };
    MdbTableDirective.prototype.getDataSource = function () {
        return this._dataSource;
    };
    MdbTableDirective.prototype.setDataSource = function (data) {
        this._dataSource = data;
        this._dataSourceChanged.next(this.getDataSource());
    };
    MdbTableDirective.prototype.dataSourceChange = function () {
        return this._dataSourceChanged;
    };
    MdbTableDirective.prototype.filterLocalDataBy = function (searchKey) {
        return this.getDataSource().filter(function (obj) {
            return Object.keys(obj).some(function (key) {
                if (obj[key]) {
                    // Fix(tableSearch): table search will now able to filter through nested data
                    return JSON.stringify(obj)
                        .toLowerCase()
                        .includes(searchKey);
                }
            });
        });
    };
    MdbTableDirective.prototype.filterLocalDataByFields = function (searchKey, keys) {
        return this.getDataSource().filter(function (obj) {
            return Object.keys(obj).some(function (key) {
                if (obj[key]) {
                    if (keys.includes(key)) {
                        if (obj[key].toLowerCase().includes(searchKey)) {
                            return obj[key];
                        }
                    }
                }
            });
        });
    };
    MdbTableDirective.prototype.filterLocalDataByMultipleFields = function (searchKey, keys) {
        var items = searchKey.split(' ').map(function (x) { return x.toLowerCase(); });
        return this.getDataSource().filter(function (x) {
            var e_1, _a;
            try {
                for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                    var item = items_1_1.value;
                    var flag = false;
                    if (keys !== undefined) {
                        for (var prop in x) {
                            if (x[prop] && x.hasOwnProperty(prop)) {
                                if (keys.includes(prop)) {
                                    if (x[prop].toLowerCase().indexOf(item) !== -1) {
                                        flag = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if (keys === undefined) {
                        for (var prop in x) {
                            if (x.hasOwnProperty(prop) && x[prop].toLowerCase().indexOf(item) !== -1) {
                                flag = true;
                                break;
                            }
                        }
                    }
                    if (!flag) {
                        return false;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return true;
        });
    };
    MdbTableDirective.prototype.searchLocalDataBy = function (searchKey) {
        if (!searchKey) {
            return this.getDataSource();
        }
        if (searchKey) {
            return this.filterLocalDataBy(searchKey.toLowerCase());
        }
    };
    MdbTableDirective.prototype.searchLocalDataByFields = function (searchKey, keys) {
        if (!searchKey) {
            return this.getDataSource();
        }
        if (searchKey && keys.length > 0) {
            return this.filterLocalDataByFields(searchKey.toLowerCase(), keys);
        }
        if (!keys || keys.length === 0) {
            return this.filterLocalDataBy(searchKey.toLowerCase());
        }
    };
    MdbTableDirective.prototype.searchLocalDataByMultipleFields = function (searchKey, keys) {
        if (!searchKey) {
            return this.getDataSource();
        }
        if (searchKey && keys !== undefined) {
            return this.filterLocalDataByMultipleFields(searchKey.toLowerCase(), keys);
        }
    };
    MdbTableDirective.prototype.searchDataObservable = function (searchKey) {
        var _this = this;
        return new Observable(function (observer) {
            observer.next(_this.searchLocalDataBy(searchKey));
        });
    };
    MdbTableDirective.prototype.ngOnInit = function () {
        this.renderer.addClass(this.el.nativeElement, 'table');
    };
    MdbTableDirective.prototype.ngAfterViewInit = function () {
        // Fix(stickyHeader): resolved problem with not working stickyHeader="true" on Chrome
        if (this.stickyHeader) {
            this.makeSticky('thead', 'sticky-top', this.stickyHeaderBgColor, this.stickyHeaderTextColor);
        }
        if (this.stickyFooter) {
            this.makeSticky('tfoot', 'sticky-bottom', this.stickyFooterBgColor, this.stickyFooterTextColor);
        }
    };
    MdbTableDirective.prototype.makeSticky = function (query, elementClass, bgColor, color) {
        var _this = this;
        var tableHead = this.el.nativeElement.querySelector(query);
        Array.from(tableHead.firstElementChild.children).forEach(function (child) {
            _this.renderer.addClass(child, elementClass);
            if (bgColor) {
                _this.renderer.setStyle(child, 'background-color', bgColor);
            }
            if (color) {
                _this.renderer.setStyle(child, 'color', color);
            }
        });
    };
    MdbTableDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input(),
        HostBinding('class.table-striped'),
        __metadata("design:type", Boolean)
    ], MdbTableDirective.prototype, "striped", void 0);
    __decorate([
        Input(),
        HostBinding('class.table-bordered'),
        __metadata("design:type", Boolean)
    ], MdbTableDirective.prototype, "bordered", void 0);
    __decorate([
        Input(),
        HostBinding('class.table-borderless'),
        __metadata("design:type", Boolean)
    ], MdbTableDirective.prototype, "borderless", void 0);
    __decorate([
        Input(),
        HostBinding('class.table-hover'),
        __metadata("design:type", Boolean)
    ], MdbTableDirective.prototype, "hover", void 0);
    __decorate([
        Input(),
        HostBinding('class.table-sm'),
        __metadata("design:type", Boolean)
    ], MdbTableDirective.prototype, "small", void 0);
    __decorate([
        Input(),
        HostBinding('class.table-responsive'),
        __metadata("design:type", Boolean)
    ], MdbTableDirective.prototype, "responsive", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTableDirective.prototype, "stickyHeader", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTableDirective.prototype, "stickyHeaderBgColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTableDirective.prototype, "stickyHeaderTextColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTableDirective.prototype, "stickyFooter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTableDirective.prototype, "stickyFooterBgColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTableDirective.prototype, "stickyFooterTextColor", void 0);
    MdbTableDirective = __decorate([
        Component({
            // tslint:disable-next-line:component-selector
            selector: '[mdbTable]',
            exportAs: 'mdbTable',
            template: '<ng-content></ng-content>',
            encapsulation: ViewEncapsulation.None,
            styles: ["table th{font-size:.9rem;font-weight:400}table td{font-size:.9rem;font-weight:300}table thead td svg.ascending,table thead td svg.descending,table thead th svg.ascending,table thead th svg.descending{display:none;max-height:.9rem;max-width:.9rem}table thead td[aria-sort=ascending] svg.ascending,table thead td[aria-sort=descending] svg.descending,table thead th[aria-sort=ascending] svg.ascending,table thead th[aria-sort=descending] svg.descending{display:unset}table thead td:not([aria-sort]):hover svg.descending,table thead td[aria-sort=constant]:hover svg.descending,table thead th:not([aria-sort]):hover svg.descending,table thead th[aria-sort=constant]:hover svg.descending{display:unset;opacity:.5}table tfoot .sticky-bottom{position:-webkit-sticky;position:sticky;bottom:0}table.table{margin-bottom:0}table.table thead th{border-top:none;border-bottom-width:1px}table.table td,table.table th{padding:1.1rem 16px 1rem}table.table .label-table{margin:0;padding:0;line-height:.94rem;height:.94rem}table.table.btn-table td{vertical-align:middle}table.table-hover tbody tr:hover{transition:.5s;background-color:rgba(0,0,0,.075)}table .th-lg{min-width:9rem}table .th-sm{min-width:6rem}table.table-sm td,table.table-sm th{padding-top:.6rem;padding-bottom:.6rem}.table-scroll-vertical{max-height:300px;overflow-y:auto}.table-fixed{table-layout:fixed}.table-responsive-lg>.table-bordered,.table-responsive-md>.table-bordered,.table-responsive-sm>.table-bordered,.table-responsive-xl>.table-bordered,.table-responsive>.table-bordered{border-top:1px solid #dee2e6}"]
        })
        // tslint:disable-next-line:component-class-suffix
        ,
        __metadata("design:paramtypes", [ElementRef, Renderer2])
    ], MdbTableDirective);
    return MdbTableDirective;
}());
export { MdbTableDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXRhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9mcmVlL3RhYmxlcy9kaXJlY3RpdmVzL21kYi10YWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxhQUFhLEVBQ2IsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBVzNDO0lBaUNFLDJCQUFvQixFQUFjLEVBQVUsUUFBbUI7UUFBM0MsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFSdEQsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsd0JBQW1CLEdBQUcsU0FBUyxDQUFDO1FBQ2hDLDBCQUFxQixHQUFHLFNBQVMsQ0FBQztRQUVsQyxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQix3QkFBbUIsR0FBRyxTQUFTLENBQUM7UUFDaEMsMEJBQXFCLEdBQUcsU0FBUyxDQUFDO1FBSW5DLGdCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLHVCQUFrQixHQUFpQixJQUFJLE9BQU8sRUFBTyxDQUFDO0lBSEksQ0FBQztJQUtuRSxrQ0FBTSxHQUFOLFVBQU8sTUFBVztRQUNoQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCx1Q0FBVyxHQUFYLFVBQVksS0FBYSxFQUFFLEdBQVE7UUFDakMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxxQ0FBUyxHQUFU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QkFBbUIsQ0FBQzs7b0RBQ2xCO0lBSWY7UUFGQyxLQUFLLEVBQUU7UUFDUCxXQUFXLENBQUMsZ0JBQWdCLENBQUM7O29EQUNmO0lBSWY7UUFGQyxLQUFLLEVBQUU7UUFDUCxXQUFXLENBQUMsd0JBQXdCLENBQUM7O3lEQUNsQjtJQUVYO1FBQVIsS0FBSyxFQUFFOzsyREFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7O2tFQUFpQztJQUNoQztRQUFSLEtBQUssRUFBRTs7b0VBQW1DO0lBRWxDO1FBQVIsS0FBSyxFQUFFOzsyREFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7O2tFQUFpQztJQUNoQztRQUFSLEtBQUssRUFBRTs7b0VBQW1DO0lBL0JoQyxpQkFBaUI7UUFUN0IsU0FBUyxDQUFDO1lBQ1QsOENBQThDO1lBQzlDLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSwyQkFBMkI7WUFFckMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O1NBQ3RDLENBQUM7UUFDRixrREFBa0Q7O3lDQWtDeEIsVUFBVSxFQUFvQixTQUFTO09BakNwRCxpQkFBaUIsQ0E2TTdCO0lBQUQsd0JBQUM7Q0FBQSxBQTdNRCxJQTZNQztTQTdNWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbbWRiVGFibGVdJyxcbiAgZXhwb3J0QXM6ICdtZGJUYWJsZScsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIHN0eWxlVXJsczogWycuLy4uL3RhYmxlcy1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgTWRiVGFibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRhYmxlLXN0cmlwZWQnKVxuICBzdHJpcGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGFibGUtYm9yZGVyZWQnKVxuICBib3JkZXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRhYmxlLWJvcmRlcmxlc3MnKVxuICBib3JkZXJsZXNzOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGFibGUtaG92ZXInKVxuICBob3ZlcjogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRhYmxlLXNtJylcbiAgc21hbGw6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50YWJsZS1yZXNwb25zaXZlJylcbiAgcmVzcG9uc2l2ZTogYm9vbGVhbjtcblxuICBASW5wdXQoKSBzdGlja3lIZWFkZXIgPSBmYWxzZTtcbiAgQElucHV0KCkgc3RpY2t5SGVhZGVyQmdDb2xvciA9ICcjZjJmMmYyJztcbiAgQElucHV0KCkgc3RpY2t5SGVhZGVyVGV4dENvbG9yID0gJyMwMDAwMDAnO1xuXG4gIEBJbnB1dCgpIHN0aWNreUZvb3RlciA9IGZhbHNlO1xuICBASW5wdXQoKSBzdGlja3lGb290ZXJCZ0NvbG9yID0gJyNmMmYyZjInO1xuICBASW5wdXQoKSBzdGlja3lGb290ZXJUZXh0Q29sb3IgPSAnIzAwMDAwMCc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIHByaXZhdGUgX2RhdGFTb3VyY2U6IGFueSA9IFtdO1xuICBwcml2YXRlIF9kYXRhU291cmNlQ2hhbmdlZDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIGFkZFJvdyhuZXdSb3c6IGFueSkge1xuICAgIHRoaXMuZ2V0RGF0YVNvdXJjZSgpLnB1c2gobmV3Um93KTtcbiAgfVxuXG4gIGFkZFJvd0FmdGVyKGluZGV4OiBudW1iZXIsIHJvdzogYW55KSB7XG4gICAgdGhpcy5nZXREYXRhU291cmNlKCkuc3BsaWNlKGluZGV4LCAwLCByb3cpO1xuICB9XG5cbiAgcmVtb3ZlUm93KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmdldERhdGFTb3VyY2UoKS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgcm93UmVtb3ZlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8Ym9vbGVhbj4oKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgIG9ic2VydmVyLm5leHQodHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVMYXN0Um93KCkge1xuICAgIHRoaXMuZ2V0RGF0YVNvdXJjZSgpLnBvcCgpO1xuICB9XG5cbiAgZ2V0RGF0YVNvdXJjZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTtcbiAgfVxuXG4gIHNldERhdGFTb3VyY2UoZGF0YTogYW55KSB7XG4gICAgdGhpcy5fZGF0YVNvdXJjZSA9IGRhdGE7XG4gICAgdGhpcy5fZGF0YVNvdXJjZUNoYW5nZWQubmV4dCh0aGlzLmdldERhdGFTb3VyY2UoKSk7XG4gIH1cblxuICBkYXRhU291cmNlQ2hhbmdlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VDaGFuZ2VkO1xuICB9XG5cbiAgZmlsdGVyTG9jYWxEYXRhQnkoc2VhcmNoS2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5nZXREYXRhU291cmNlKCkuZmlsdGVyKChvYmo6IEFycmF5PGFueT4pID0+IHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnNvbWUoKGtleTogYW55KSA9PiB7XG4gICAgICAgIGlmIChvYmpba2V5XSkge1xuICAgICAgICAgIC8vIEZpeCh0YWJsZVNlYXJjaCk6IHRhYmxlIHNlYXJjaCB3aWxsIG5vdyBhYmxlIHRvIGZpbHRlciB0aHJvdWdoIG5lc3RlZCBkYXRhXG5cbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKVxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgIC5pbmNsdWRlcyhzZWFyY2hLZXkpIGFzIGFueTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmaWx0ZXJMb2NhbERhdGFCeUZpZWxkcyhzZWFyY2hLZXk6IHN0cmluZywga2V5czogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gdGhpcy5nZXREYXRhU291cmNlKCkuZmlsdGVyKChvYmo6IEFycmF5PGFueT4pID0+IHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnNvbWUoKGtleTogYW55KSA9PiB7XG4gICAgICAgIGlmIChvYmpba2V5XSkge1xuICAgICAgICAgIGlmIChrZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICAgIGlmIChvYmpba2V5XS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaEtleSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmaWx0ZXJMb2NhbERhdGFCeU11bHRpcGxlRmllbGRzKHNlYXJjaEtleTogc3RyaW5nLCBrZXlzPzogc3RyaW5nW10pIHtcbiAgICBjb25zdCBpdGVtcyA9IHNlYXJjaEtleS5zcGxpdCgnICcpLm1hcCgoeDogeyB0b0xvd2VyQ2FzZTogKCkgPT4gdm9pZCB9KSA9PiB4LnRvTG93ZXJDYXNlKCkpO1xuICAgIHJldHVybiB0aGlzLmdldERhdGFTb3VyY2UoKS5maWx0ZXIoKHg6IEFycmF5PGFueT4pID0+IHtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICBsZXQgZmxhZyA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChrZXlzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4geCkge1xuICAgICAgICAgICAgaWYgKHhbcHJvcF0gJiYgeC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICBpZiAoa2V5cy5pbmNsdWRlcyhwcm9wKSkge1xuICAgICAgICAgICAgICAgIGlmICh4W3Byb3BdLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihpdGVtKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChrZXlzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4geCkge1xuICAgICAgICAgICAgaWYgKHguaGFzT3duUHJvcGVydHkocHJvcCkgJiYgeFtwcm9wXS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoaXRlbSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmbGFnKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHNlYXJjaExvY2FsRGF0YUJ5KHNlYXJjaEtleTogc3RyaW5nKSB7XG4gICAgaWYgKCFzZWFyY2hLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERhdGFTb3VyY2UoKTtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoS2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXJMb2NhbERhdGFCeShzZWFyY2hLZXkudG9Mb3dlckNhc2UoKSk7XG4gICAgfVxuICB9XG5cbiAgc2VhcmNoTG9jYWxEYXRhQnlGaWVsZHMoc2VhcmNoS2V5OiBzdHJpbmcsIGtleXM6IHN0cmluZ1tdKSB7XG4gICAgaWYgKCFzZWFyY2hLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERhdGFTb3VyY2UoKTtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoS2V5ICYmIGtleXMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyTG9jYWxEYXRhQnlGaWVsZHMoc2VhcmNoS2V5LnRvTG93ZXJDYXNlKCksIGtleXMpO1xuICAgIH1cbiAgICBpZiAoIWtleXMgfHwga2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlckxvY2FsRGF0YUJ5KHNlYXJjaEtleS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9XG4gIH1cblxuICBzZWFyY2hMb2NhbERhdGFCeU11bHRpcGxlRmllbGRzKHNlYXJjaEtleTogc3RyaW5nLCBrZXlzPzogc3RyaW5nW10pIHtcbiAgICBpZiAoIXNlYXJjaEtleSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0YVNvdXJjZSgpO1xuICAgIH1cbiAgICBpZiAoc2VhcmNoS2V5ICYmIGtleXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyTG9jYWxEYXRhQnlNdWx0aXBsZUZpZWxkcyhzZWFyY2hLZXkudG9Mb3dlckNhc2UoKSwga2V5cyk7XG4gICAgfVxuICB9XG5cbiAgc2VhcmNoRGF0YU9ic2VydmFibGUoc2VhcmNoS2V5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IGFueSkgPT4ge1xuICAgICAgb2JzZXJ2ZXIubmV4dCh0aGlzLnNlYXJjaExvY2FsRGF0YUJ5KHNlYXJjaEtleSkpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd0YWJsZScpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIEZpeChzdGlja3lIZWFkZXIpOiByZXNvbHZlZCBwcm9ibGVtIHdpdGggbm90IHdvcmtpbmcgc3RpY2t5SGVhZGVyPVwidHJ1ZVwiIG9uIENocm9tZVxuICAgIGlmICh0aGlzLnN0aWNreUhlYWRlcikge1xuICAgICAgdGhpcy5tYWtlU3RpY2t5KCd0aGVhZCcsICdzdGlja3ktdG9wJywgdGhpcy5zdGlja3lIZWFkZXJCZ0NvbG9yLCB0aGlzLnN0aWNreUhlYWRlclRleHRDb2xvcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RpY2t5Rm9vdGVyKSB7XG4gICAgICB0aGlzLm1ha2VTdGlja3koXG4gICAgICAgICd0Zm9vdCcsXG4gICAgICAgICdzdGlja3ktYm90dG9tJyxcbiAgICAgICAgdGhpcy5zdGlja3lGb290ZXJCZ0NvbG9yLFxuICAgICAgICB0aGlzLnN0aWNreUZvb3RlclRleHRDb2xvclxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1ha2VTdGlja3kocXVlcnk6IHN0cmluZywgZWxlbWVudENsYXNzOiBzdHJpbmcsIGJnQ29sb3I6IHN0cmluZywgY29sb3I6IHN0cmluZykge1xuICAgIGNvbnN0IHRhYmxlSGVhZCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcbiAgICBBcnJheS5mcm9tKHRhYmxlSGVhZC5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZHJlbikuZm9yRWFjaCgoY2hpbGQ6IGFueSkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhjaGlsZCwgZWxlbWVudENsYXNzKTtcbiAgICAgIGlmIChiZ0NvbG9yKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY2hpbGQsICdiYWNrZ3JvdW5kLWNvbG9yJywgYmdDb2xvcik7XG4gICAgICB9XG4gICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjaGlsZCwgJ2NvbG9yJywgY29sb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=