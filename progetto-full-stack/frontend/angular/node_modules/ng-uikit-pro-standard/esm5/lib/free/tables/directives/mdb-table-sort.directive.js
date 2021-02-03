import { __decorate, __metadata } from "tslib";
import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, } from '@angular/core';
var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "ascending";
    SortDirection["DESC"] = "descending";
    SortDirection["CONST"] = "constant";
})(SortDirection || (SortDirection = {}));
var MdbTableSortDirective = /** @class */ (function () {
    function MdbTableSortDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.data = [];
        this.sortedInto = true;
        this.order = SortDirection.CONST;
        this.dataSource = [];
        this.sortIcon = false;
        this.resetSortDirection = false;
        this.sortEnd = new EventEmitter();
        this.sorted = new EventEmitter();
    }
    MdbTableSortDirective.prototype.onclick = function () {
        this.sortDataBy(this.trimWhiteSigns(this.sortBy.toString()));
        this.sortEnd.emit(this.dataSource);
        this.sorted.emit({
            data: this.dataSource,
            sortOrder: this.order,
            sortBy: this.sortBy,
        });
        this.removeSort();
    };
    MdbTableSortDirective.prototype.trimWhiteSigns = function (headElement) {
        return headElement.replace(/ /g, '');
    };
    MdbTableSortDirective.prototype.moveArrayItem = function (arr, oldIndex, newIndex) {
        while (oldIndex < 0) {
            oldIndex += arr.length;
        }
        while (newIndex < 0) {
            newIndex += arr.length;
        }
        if (newIndex >= arr.length) {
            var k = newIndex - arr.length;
            while (k-- + 1) {
                arr.push(null);
            }
        }
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
        return arr;
    };
    MdbTableSortDirective.prototype.sortDataBy = function (key) {
        var _this = this;
        var ariaPass = true;
        var setAria = function (sort, id) {
            if (ariaPass) {
                var nextSortType = '';
                if (_this.resetSortDirection) {
                    if (sort === SortDirection.CONST) {
                        nextSortType = SortDirection.DESC;
                    }
                    else if (sort === SortDirection.DESC) {
                        nextSortType = SortDirection.ASC;
                    }
                    else if (sort === SortDirection.ASC) {
                        nextSortType = SortDirection.CONST;
                    }
                }
                else {
                    if (sort === SortDirection.DESC) {
                        nextSortType = SortDirection.ASC;
                    }
                    else if (sort === SortDirection.ASC) {
                        nextSortType = SortDirection.DESC;
                    }
                }
                _this.renderer.setAttribute(_this.el.nativeElement, 'aria-sort', sort);
                _this.renderer.setAttribute(_this.el.nativeElement, 'aria-label', id + ": activate to sort column " + nextSortType);
                ariaPass = false;
            }
        };
        key = key.split('.');
        if (this.resetSortDirection) {
            var sortFn = function (a, b) {
                a = a[key];
                b = b[key];
                return a > b ? -1 : 1;
            };
            if (this.order === SortDirection.CONST) {
                setAria(SortDirection.DESC, key);
                this.order = SortDirection.DESC;
                this.dataSource.sort(sortFn);
            }
            else if (this.order === SortDirection.DESC) {
                setAria(SortDirection.ASC, key);
                this.order = SortDirection.ASC;
                this.dataSource.sort(sortFn).reverse();
            }
            else if (this.order === SortDirection.ASC) {
                setAria(SortDirection.CONST, key);
                this.order = SortDirection.CONST;
                this.data.map(function (el, index) {
                    _this.dataSource[index] = el;
                });
            }
        }
        else {
            this.dataSource.sort(function (a, b) {
                var i = 0;
                while (i < key.length) {
                    a = a[key[i]];
                    b = b[key[i]];
                    i++;
                }
                if (a < b) {
                    setAria(SortDirection.ASC, key);
                    _this.order = SortDirection.ASC;
                    return _this.sortedInto ? 1 : -1;
                }
                else if (a > b) {
                    setAria(SortDirection.DESC, key);
                    _this.order = SortDirection.DESC;
                    return _this.sortedInto ? -1 : 1;
                }
                else if (a == null || b == null) {
                    _this.order = SortDirection.CONST;
                    return 1;
                }
                else {
                    _this.order = SortDirection.CONST;
                    return 0;
                }
            });
            this.sortedInto = !this.sortedInto;
        }
    };
    MdbTableSortDirective.prototype.ngOnInit = function () {
        var key = this.trimWhiteSigns(this.sortBy.toString()).split('.');
        this.renderer.setAttribute(this.el.nativeElement, 'aria-label', key + ": activate to sort column descending");
        if (this.data.length === 0) {
            // this.dataSource.map((element: any) => {
            //   this.data.push(element);
            // })
            this.data = Array.from(this.dataSource);
        }
    };
    MdbTableSortDirective.prototype.ngAfterViewInit = function () {
        if (this.sortIcon) {
            this.createIcon();
        }
    };
    MdbTableSortDirective.prototype.createIcon = function () {
        // tslint:disable-next-line:max-line-length
        var iconUp = "<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"arrow-up\" class=\"svg-inline--fa fa-arrow-up fa-w-14 ascending\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><path fill=\"currentColor\" d=\"M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z\"></path></svg>";
        // tslint:disable-next-line:max-line-length
        var iconDown = "<svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"arrow-down\" class=\"svg-inline--fa fa-arrow-down fa-w-14 descending\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><path fill=\"currentColor\" d=\"M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z\"></path></svg>";
        var title = this.el.nativeElement.innerHTML;
        this.el.nativeElement.innerHTML = title + " " + iconUp + " " + iconDown;
    };
    MdbTableSortDirective.prototype.removeSort = function () {
        var _this = this;
        var nodes = this.el.nativeElement.parentElement.childNodes;
        if (nodes) {
            Array.from(nodes).map(function (node) {
                if (node !== _this.el.nativeElement && node.nodeName !== '#comment') {
                    _this.renderer.removeAttribute(node, 'aria-sort');
                }
            });
        }
    };
    MdbTableSortDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input('mdbTableSort'),
        __metadata("design:type", Array)
    ], MdbTableSortDirective.prototype, "dataSource", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbTableSortDirective.prototype, "sortBy", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTableSortDirective.prototype, "sortIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTableSortDirective.prototype, "resetSortDirection", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MdbTableSortDirective.prototype, "sortEnd", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MdbTableSortDirective.prototype, "sorted", void 0);
    __decorate([
        HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MdbTableSortDirective.prototype, "onclick", null);
    MdbTableSortDirective = __decorate([
        Directive({
            selector: '[mdbTableSort]',
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer2])
    ], MdbTableSortDirective);
    return MdbTableSortDirective;
}());
export { MdbTableSortDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXRhYmxlLXNvcnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvdGFibGVzL2RpcmVjdGl2ZXMvbWRiLXRhYmxlLXNvcnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsSUFBSyxhQUlKO0FBSkQsV0FBSyxhQUFhO0lBQ2hCLGtDQUFpQixDQUFBO0lBQ2pCLG9DQUFtQixDQUFBO0lBQ25CLG1DQUFrQixDQUFBO0FBQ3BCLENBQUMsRUFKSSxhQUFhLEtBQWIsYUFBYSxRQUlqQjtBQVdEO0lBWUUsK0JBQW9CLEVBQWMsRUFBVSxRQUFtQjtRQUEzQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQVgvRCxTQUFJLEdBQVUsRUFBRSxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsVUFBSyxHQUFpRSxhQUFhLENBQUMsS0FBSyxDQUFDO1FBRW5FLGVBQVUsR0FBZSxFQUFFLENBQUM7UUFFMUMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQix1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDMUIsWUFBTyxHQUF3QixJQUFJLFlBQVksRUFBUyxDQUFDO1FBQ3pELFdBQU0sR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztJQUVWLENBQUM7SUFFNUMsdUNBQU8sR0FBUDtRQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJ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QztRQVJDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7UUFDN0QsSUFBSSxLQUFLLEVBQUU7WUFDVCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQWlCO2dCQUN0QyxJQUFJLElBQUksS0FBSyxLQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRTtvQkFDbEUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUNsRDtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOztnQkEzS3VCLFVBQVU7Z0JBQW9CLFNBQVM7O0lBUHhDO1FBQXRCLEtBQUssQ0FBQyxjQUFjLENBQUM7a0NBQWEsS0FBSzs2REFBVztJQUMxQztRQUFSLEtBQUssRUFBRTs7eURBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7OzJEQUFrQjtJQUNqQjtRQUFSLEtBQUssRUFBRTs7cUVBQTRCO0lBQzFCO1FBQVQsTUFBTSxFQUFFO2tDQUFVLFlBQVk7MERBQW9DO0lBQ3pEO1FBQVQsTUFBTSxFQUFFO2tDQUFTLFlBQVk7eURBQThDO0lBSXJEO1FBQXRCLFlBQVksQ0FBQyxPQUFPLENBQUM7Ozs7d0RBVXJCO0lBeEJVLHFCQUFxQjtRQUhqQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZ0JBQWdCO1NBQzNCLENBQUM7eUNBYXdCLFVBQVUsRUFBb0IsU0FBUztPQVpwRCxxQkFBcUIsQ0F3TGpDO0lBQUQsNEJBQUM7Q0FBQSxBQXhMRCxJQXdMQztTQXhMWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmVudW0gU29ydERpcmVjdGlvbiB7XG4gIEFTQyA9ICdhc2NlbmRpbmcnLFxuICBERVNDID0gJ2Rlc2NlbmRpbmcnLFxuICBDT05TVCA9ICdjb25zdGFudCcsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU29ydGVkRGF0YSB7XG4gIGRhdGE6IGFueVtdO1xuICBzb3J0T3JkZXI6IHN0cmluZztcbiAgc29ydEJ5OiBzdHJpbmc7XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZGJUYWJsZVNvcnRdJyxcbn0pXG5leHBvcnQgY2xhc3MgTWRiVGFibGVTb3J0RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgZGF0YTogYW55W10gPSBbXTtcbiAgc29ydGVkSW50byA9IHRydWU7XG4gIG9yZGVyOiBTb3J0RGlyZWN0aW9uLkFTQyB8IFNvcnREaXJlY3Rpb24uREVTQyB8IFNvcnREaXJlY3Rpb24uQ09OU1QgPSBTb3J0RGlyZWN0aW9uLkNPTlNUO1xuXG4gIEBJbnB1dCgnbWRiVGFibGVTb3J0JykgZGF0YVNvdXJjZTogQXJyYXk8YW55PiA9IFtdO1xuICBASW5wdXQoKSBzb3J0Qnk6IHN0cmluZztcbiAgQElucHV0KCkgc29ydEljb24gPSBmYWxzZTtcbiAgQElucHV0KCkgcmVzZXRTb3J0RGlyZWN0aW9uID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBzb3J0RW5kOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcbiAgQE91dHB1dCgpIHNvcnRlZDogRXZlbnRFbWl0dGVyPFNvcnRlZERhdGE+ID0gbmV3IEV2ZW50RW1pdHRlcjxTb3J0ZWREYXRhPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpIG9uY2xpY2soKSB7XG4gICAgdGhpcy5zb3J0RGF0YUJ5KHRoaXMudHJpbVdoaXRlU2lnbnModGhpcy5zb3J0QnkudG9TdHJpbmcoKSkpO1xuICAgIHRoaXMuc29ydEVuZC5lbWl0KHRoaXMuZGF0YVNvdXJjZSk7XG4gICAgdGhpcy5zb3J0ZWQuZW1pdCh7XG4gICAgICBkYXRhOiB0aGlzLmRhdGFTb3VyY2UsXG4gICAgICBzb3J0T3JkZXI6IHRoaXMub3JkZXIsXG4gICAgICBzb3J0Qnk6IHRoaXMuc29ydEJ5LFxuICAgIH0pO1xuXG4gICAgdGhpcy5yZW1vdmVTb3J0KCk7XG4gIH1cblxuICB0cmltV2hpdGVTaWducyhoZWFkRWxlbWVudDogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gaGVhZEVsZW1lbnQucmVwbGFjZSgvIC9nLCAnJyk7XG4gIH1cblxuICBwdWJsaWMgbW92ZUFycmF5SXRlbShhcnI6IGFueSwgb2xkSW5kZXg6IG51bWJlciwgbmV3SW5kZXg6IG51bWJlcikge1xuICAgIHdoaWxlIChvbGRJbmRleCA8IDApIHtcbiAgICAgIG9sZEluZGV4ICs9IGFyci5sZW5ndGg7XG4gICAgfVxuICAgIHdoaWxlIChuZXdJbmRleCA8IDApIHtcbiAgICAgIG5ld0luZGV4ICs9IGFyci5sZW5ndGg7XG4gICAgfVxuICAgIGlmIChuZXdJbmRleCA+PSBhcnIubGVuZ3RoKSB7XG4gICAgICBsZXQgayA9IG5ld0luZGV4IC0gYXJyLmxlbmd0aDtcbiAgICAgIHdoaWxlIChrLS0gKyAxKSB7XG4gICAgICAgIGFyci5wdXNoKG51bGwpO1xuICAgICAgfVxuICAgIH1cbiAgICBhcnIuc3BsaWNlKG5ld0luZGV4LCAwLCBhcnIuc3BsaWNlKG9sZEluZGV4LCAxKVswXSk7XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIHNvcnREYXRhQnkoa2V5OiBzdHJpbmcgfCBhbnkpIHtcbiAgICBsZXQgYXJpYVBhc3MgPSB0cnVlO1xuXG4gICAgY29uc3Qgc2V0QXJpYSA9IChcbiAgICAgIHNvcnQ6IFNvcnREaXJlY3Rpb24uQVNDIHwgU29ydERpcmVjdGlvbi5DT05TVCB8IFNvcnREaXJlY3Rpb24uREVTQyxcbiAgICAgIGlkOiBhbnlcbiAgICApID0+IHtcbiAgICAgIGlmIChhcmlhUGFzcykge1xuICAgICAgICBsZXQgbmV4dFNvcnRUeXBlID0gJyc7XG5cbiAgICAgICAgaWYgKHRoaXMucmVzZXRTb3J0RGlyZWN0aW9uKSB7XG4gICAgICAgICAgaWYgKHNvcnQgPT09IFNvcnREaXJlY3Rpb24uQ09OU1QpIHtcbiAgICAgICAgICAgIG5leHRTb3J0VHlwZSA9IFNvcnREaXJlY3Rpb24uREVTQztcbiAgICAgICAgICB9IGVsc2UgaWYgKHNvcnQgPT09IFNvcnREaXJlY3Rpb24uREVTQykge1xuICAgICAgICAgICAgbmV4dFNvcnRUeXBlID0gU29ydERpcmVjdGlvbi5BU0M7XG4gICAgICAgICAgfSBlbHNlIGlmIChzb3J0ID09PSBTb3J0RGlyZWN0aW9uLkFTQykge1xuICAgICAgICAgICAgbmV4dFNvcnRUeXBlID0gU29ydERpcmVjdGlvbi5DT05TVDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNvcnQgPT09IFNvcnREaXJlY3Rpb24uREVTQykge1xuICAgICAgICAgICAgbmV4dFNvcnRUeXBlID0gU29ydERpcmVjdGlvbi5BU0M7XG4gICAgICAgICAgfSBlbHNlIGlmIChzb3J0ID09PSBTb3J0RGlyZWN0aW9uLkFTQykge1xuICAgICAgICAgICAgbmV4dFNvcnRUeXBlID0gU29ydERpcmVjdGlvbi5ERVNDO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2FyaWEtc29ydCcsIHNvcnQpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgJ2FyaWEtbGFiZWwnLFxuICAgICAgICAgIGAke2lkfTogYWN0aXZhdGUgdG8gc29ydCBjb2x1bW4gJHtuZXh0U29ydFR5cGV9YFxuICAgICAgICApO1xuICAgICAgICBhcmlhUGFzcyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBrZXkgPSBrZXkuc3BsaXQoJy4nKTtcblxuICAgIGlmICh0aGlzLnJlc2V0U29ydERpcmVjdGlvbikge1xuICAgICAgY29uc3Qgc29ydEZuID0gKGE6IGFueSwgYjogYW55KSA9PiB7XG4gICAgICAgIGEgPSBhW2tleV07XG4gICAgICAgIGIgPSBiW2tleV07XG5cbiAgICAgICAgcmV0dXJuIGEgPiBiID8gLTEgOiAxO1xuICAgICAgfTtcbiAgICAgIGlmICh0aGlzLm9yZGVyID09PSBTb3J0RGlyZWN0aW9uLkNPTlNUKSB7XG4gICAgICAgIHNldEFyaWEoU29ydERpcmVjdGlvbi5ERVNDLCBrZXkpO1xuICAgICAgICB0aGlzLm9yZGVyID0gU29ydERpcmVjdGlvbi5ERVNDO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydChzb3J0Rm4pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9yZGVyID09PSBTb3J0RGlyZWN0aW9uLkRFU0MpIHtcbiAgICAgICAgc2V0QXJpYShTb3J0RGlyZWN0aW9uLkFTQywga2V5KTtcbiAgICAgICAgdGhpcy5vcmRlciA9IFNvcnREaXJlY3Rpb24uQVNDO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydChzb3J0Rm4pLnJldmVyc2UoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmRlciA9PT0gU29ydERpcmVjdGlvbi5BU0MpIHtcbiAgICAgICAgc2V0QXJpYShTb3J0RGlyZWN0aW9uLkNPTlNULCBrZXkpO1xuICAgICAgICB0aGlzLm9yZGVyID0gU29ydERpcmVjdGlvbi5DT05TVDtcbiAgICAgICAgdGhpcy5kYXRhLm1hcCgoZWw6IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZVtpbmRleF0gPSBlbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0KChhOiBhbnksIGI6IGFueSkgPT4ge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwga2V5Lmxlbmd0aCkge1xuICAgICAgICAgIGEgPSBhW2tleVtpXV07XG4gICAgICAgICAgYiA9IGJba2V5W2ldXTtcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgICBzZXRBcmlhKFNvcnREaXJlY3Rpb24uQVNDLCBrZXkpO1xuICAgICAgICAgIHRoaXMub3JkZXIgPSBTb3J0RGlyZWN0aW9uLkFTQztcblxuICAgICAgICAgIHJldHVybiB0aGlzLnNvcnRlZEludG8gPyAxIDogLTE7XG4gICAgICAgIH0gZWxzZSBpZiAoYSA+IGIpIHtcbiAgICAgICAgICBzZXRBcmlhKFNvcnREaXJlY3Rpb24uREVTQywga2V5KTtcbiAgICAgICAgICB0aGlzLm9yZGVyID0gU29ydERpcmVjdGlvbi5ERVNDO1xuXG4gICAgICAgICAgcmV0dXJuIHRoaXMuc29ydGVkSW50byA/IC0xIDogMTtcbiAgICAgICAgfSBlbHNlIGlmIChhID09IG51bGwgfHwgYiA9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5vcmRlciA9IFNvcnREaXJlY3Rpb24uQ09OU1Q7XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vcmRlciA9IFNvcnREaXJlY3Rpb24uQ09OU1Q7XG4gICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvcnRlZEludG8gPSAhdGhpcy5zb3J0ZWRJbnRvO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IGtleSA9IHRoaXMudHJpbVdoaXRlU2lnbnModGhpcy5zb3J0QnkudG9TdHJpbmcoKSkuc3BsaXQoJy4nKTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKFxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LFxuICAgICAgJ2FyaWEtbGFiZWwnLFxuICAgICAgYCR7a2V5fTogYWN0aXZhdGUgdG8gc29ydCBjb2x1bW4gZGVzY2VuZGluZ2BcbiAgICApO1xuXG4gICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIHRoaXMuZGF0YVNvdXJjZS5tYXAoKGVsZW1lbnQ6IGFueSkgPT4ge1xuICAgICAgLy8gICB0aGlzLmRhdGEucHVzaChlbGVtZW50KTtcbiAgICAgIC8vIH0pXG5cbiAgICAgIHRoaXMuZGF0YSA9IEFycmF5LmZyb20odGhpcy5kYXRhU291cmNlKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuc29ydEljb24pIHtcbiAgICAgIHRoaXMuY3JlYXRlSWNvbigpO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUljb24oKSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgIGNvbnN0IGljb25VcCA9IGA8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJhcnJvdy11cFwiIGNsYXNzPVwic3ZnLWlubGluZS0tZmEgZmEtYXJyb3ctdXAgZmEtdy0xNCBhc2NlbmRpbmdcIiByb2xlPVwiaW1nXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDQ4IDUxMlwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTM0LjkgMjg5LjVsLTIyLjItMjIuMmMtOS40LTkuNC05LjQtMjQuNiAwLTMzLjlMMjA3IDM5YzkuNC05LjQgMjQuNi05LjQgMzMuOSAwbDE5NC4zIDE5NC4zYzkuNCA5LjQgOS40IDI0LjYgMCAzMy45TDQxMyAyODkuNGMtOS41IDkuNS0yNSA5LjMtMzQuMy0uNEwyNjQgMTY4LjZWNDU2YzAgMTMuMy0xMC43IDI0LTI0IDI0aC0zMmMtMTMuMyAwLTI0LTEwLjctMjQtMjRWMTY4LjZMNjkuMiAyODkuMWMtOS4zIDkuOC0yNC44IDEwLTM0LjMuNHpcIj48L3BhdGg+PC9zdmc+YDtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICBjb25zdCBpY29uRG93biA9IGA8c3ZnIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgZGF0YS1wcmVmaXg9XCJmYXNcIiBkYXRhLWljb249XCJhcnJvdy1kb3duXCIgY2xhc3M9XCJzdmctaW5saW5lLS1mYSBmYS1hcnJvdy1kb3duIGZhLXctMTQgZGVzY2VuZGluZ1wiIHJvbGU9XCJpbWdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0NDggNTEyXCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNNDEzLjEgMjIyLjVsMjIuMiAyMi4yYzkuNCA5LjQgOS40IDI0LjYgMCAzMy45TDI0MSA0NzNjLTkuNCA5LjQtMjQuNiA5LjQtMzMuOSAwTDEyLjcgMjc4LjZjLTkuNC05LjQtOS40LTI0LjYgMC0zMy45bDIyLjItMjIuMmM5LjUtOS41IDI1LTkuMyAzNC4zLjRMMTg0IDM0My40VjU2YzAtMTMuMyAxMC43LTI0IDI0LTI0aDMyYzEzLjMgMCAyNCAxMC43IDI0IDI0djI4Ny40bDExNC44LTEyMC41YzkuMy05LjggMjQuOC0xMCAzNC4zLS40elwiPjwvcGF0aD48L3N2Zz5gO1xuXG4gICAgY29uc3QgdGl0bGUgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MO1xuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBgJHt0aXRsZX0gJHtpY29uVXB9ICR7aWNvbkRvd259YDtcbiAgfVxuXG4gIHJlbW92ZVNvcnQoKSB7XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZE5vZGVzO1xuICAgIGlmIChub2Rlcykge1xuICAgICAgQXJyYXkuZnJvbShub2RlcykubWFwKChub2RlOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAobm9kZSAhPT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50ICYmIG5vZGUubm9kZU5hbWUgIT09ICcjY29tbWVudCcpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZShub2RlLCAnYXJpYS1zb3J0Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19