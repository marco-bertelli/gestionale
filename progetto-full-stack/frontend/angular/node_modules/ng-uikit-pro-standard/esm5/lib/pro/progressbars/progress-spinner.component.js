import { __decorate, __metadata, __param } from "tslib";
import { AfterViewInit, Component, ElementRef, Inject, Input, PLATFORM_ID, ViewEncapsulation, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
var ProgressSpinnerComponent = /** @class */ (function () {
    function ProgressSpinnerComponent(el, platformId) {
        this.el = el;
        this.addClass = 'spinner-blue-only';
        this.isBrowser = false;
        this.spinnerType = '';
        this.spinnerColor = 'rainbow';
        this.isBrowser = isPlatformBrowser(platformId);
    }
    ProgressSpinnerComponent.prototype.ngAfterViewInit = function () {
        var hostElem = this.el.nativeElement;
        var colorClass = this.spinnerColor;
        this.addClass = 'spinner-rainbow';
        switch (colorClass) {
            case 'green':
                this.addClass = 'spinner-green-only';
                break;
            case 'blue':
                this.addClass = 'spinner-blue-only';
                break;
            case 'yellow':
                this.addClass = 'spinner-yellow-only';
                break;
            case 'red':
                this.addClass = 'spinner-red-only';
                break;
            case 'rainbow':
                this.addClass = 'spinner-rainbow spinner-blue-only mat-progress-spinner';
                this.spinerRun();
                break;
        }
        hostElem.children[0].children[0].className += ' ' + this.addClass;
    };
    ProgressSpinnerComponent.prototype.spinerRun = function () {
        var _this = this;
        var counter = 0;
        var hostElem = this.el.nativeElement;
        if (this.isBrowser) {
            setInterval(function () {
                switch (counter) {
                    case 0:
                        _this.addClass = 'spinner-red-only mat-progress-spinner ';
                        break;
                    case 1:
                        _this.addClass = 'spinner-yellow-only mat-progress-spinner';
                        break;
                    case 2:
                        _this.addClass = 'spinner-blue-only mat-progress-spinner';
                        break;
                    case 3:
                        _this.addClass = 'spinner-green-only mat-progress-spinner';
                        break;
                }
                hostElem.children[0].children[0].className = ' ' + _this.addClass;
                if (counter < 3) {
                    counter++;
                }
                else {
                    counter = 0;
                }
            }, 1333);
        }
    };
    ProgressSpinnerComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ProgressSpinnerComponent.prototype, "spinnerType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ProgressSpinnerComponent.prototype, "spinnerColor", void 0);
    ProgressSpinnerComponent = __decorate([
        Component({
            selector: 'mdb-spinner',
            template: "<div class=\"preloader-wrapper active  {{spinnerType}}\">\n    <mdb-Spinners mdbSpinners mode=\"indeterminate\"></mdb-Spinners>\n</div>",
            encapsulation: ViewEncapsulation.None,
            styles: [""]
        }),
        __param(1, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [ElementRef, String])
    ], ProgressSpinnerComponent);
    return ProgressSpinnerComponent;
}());
export { ProgressSpinnerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3Mtc3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL3Byb2dyZXNzYmFycy9wcm9ncmVzcy1zcGlubmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGFBQWEsRUFDYixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsV0FBVyxFQUNYLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVFwRDtJQU1FLGtDQUFtQixFQUFjLEVBQXVCLFVBQWtCO1FBQXZELE9BQUUsR0FBRixFQUFFLENBQVk7UUFMakMsYUFBUSxHQUFXLG1CQUFtQixDQUFDO1FBQ3ZDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDVCxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixpQkFBWSxHQUFHLFNBQVMsQ0FBQztRQUdoQyxJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxrREFBZSxHQUFmO1FBQ0UsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDdkMsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDO1FBRWxDLFFBQVEsVUFBVSxFQUFFO1lBQ2xCLEtBQUssT0FBTztnQkFDVixJQUFJLENBQUMsUUFBUSxHQUFHLG9CQUFvQixDQUFDO2dCQUNyQyxNQUFNO1lBQ1IsS0FBSyxNQUFNO2dCQUNULElBQUksQ0FBQyxRQUFRLEdBQUcsbUJBQW1CLENBQUM7Z0JBQ3BDLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQztnQkFDdEMsTUFBTTtZQUNSLEtBQUssS0FBSztnQkFDUixJQUFJLENBQUMsUUFBUSxHQUFHLGtCQUFrQixDQUFDO2dCQUNuQyxNQUFNO1lBQ1IsS0FBSyxTQUFTO2dCQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsd0RBQXdELENBQUM7Z0JBQ3pFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDakIsTUFBTTtTQUNUO1FBQ0QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3BFLENBQUM7SUFFRCw0Q0FBUyxHQUFUO1FBQUEsaUJBNEJDO1FBM0JDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUN2QyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsV0FBVyxDQUFDO2dCQUNWLFFBQVEsT0FBTyxFQUFFO29CQUNmLEtBQUssQ0FBQzt3QkFDSixLQUFJLENBQUMsUUFBUSxHQUFHLHdDQUF3QyxDQUFDO3dCQUN6RCxNQUFNO29CQUNSLEtBQUssQ0FBQzt3QkFDSixLQUFJLENBQUMsUUFBUSxHQUFHLDBDQUEwQyxDQUFDO3dCQUMzRCxNQUFNO29CQUNSLEtBQUssQ0FBQzt3QkFDSixLQUFJLENBQUMsUUFBUSxHQUFHLHdDQUF3QyxDQUFDO3dCQUN6RCxNQUFNO29CQUNSLEtBQUssQ0FBQzt3QkFDSixLQUFJLENBQUMsUUFBUSxHQUFHLHlDQUF5QyxDQUFDO3dCQUMxRCxNQUFNO2lCQUNUO2dCQUVELFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQztnQkFDakUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFO29CQUNmLE9BQU8sRUFBRSxDQUFDO2lCQUNYO3FCQUFNO29CQUNMLE9BQU8sR0FBRyxDQUFDLENBQUM7aUJBQ2I7WUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDVjtJQUNILENBQUM7O2dCQTFEc0IsVUFBVTs2Q0FBRyxNQUFNLFNBQUMsV0FBVzs7SUFIN0M7UUFBUixLQUFLLEVBQUU7O2lFQUFrQjtJQUNqQjtRQUFSLEtBQUssRUFBRTs7a0VBQTBCO0lBSnZCLHdCQUF3QjtRQU5wQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsYUFBYTtZQUN2QixtSkFBOEM7WUFFOUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O1NBQ3RDLENBQUM7UUFPb0MsV0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7eUNBQWhDLFVBQVU7T0FOdEIsd0JBQXdCLENBaUVwQztJQUFELCtCQUFDO0NBQUEsQUFqRUQsSUFpRUM7U0FqRVksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBQTEFURk9STV9JRCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItc3Bpbm5lcicsXG4gIHRlbXBsYXRlVXJsOiAncHJvZ3Jlc3Mtc3Bpbm5lci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3Byb2dyZXNzYmFycy1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc1NwaW5uZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgYWRkQ2xhc3M6IFN0cmluZyA9ICdzcGlubmVyLWJsdWUtb25seSc7XG4gIGlzQnJvd3NlciA9IGZhbHNlO1xuICBASW5wdXQoKSBzcGlubmVyVHlwZSA9ICcnO1xuICBASW5wdXQoKSBzcGlubmVyQ29sb3IgPSAncmFpbmJvdyc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmlzQnJvd3NlciA9IGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IGhvc3RFbGVtID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGNvbG9yQ2xhc3MgPSB0aGlzLnNwaW5uZXJDb2xvcjtcbiAgICB0aGlzLmFkZENsYXNzID0gJ3NwaW5uZXItcmFpbmJvdyc7XG5cbiAgICBzd2l0Y2ggKGNvbG9yQ2xhc3MpIHtcbiAgICAgIGNhc2UgJ2dyZWVuJzpcbiAgICAgICAgdGhpcy5hZGRDbGFzcyA9ICdzcGlubmVyLWdyZWVuLW9ubHknO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JsdWUnOlxuICAgICAgICB0aGlzLmFkZENsYXNzID0gJ3NwaW5uZXItYmx1ZS1vbmx5JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd5ZWxsb3cnOlxuICAgICAgICB0aGlzLmFkZENsYXNzID0gJ3NwaW5uZXIteWVsbG93LW9ubHknO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JlZCc6XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MgPSAnc3Bpbm5lci1yZWQtb25seSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmFpbmJvdyc6XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MgPSAnc3Bpbm5lci1yYWluYm93IHNwaW5uZXItYmx1ZS1vbmx5IG1hdC1wcm9ncmVzcy1zcGlubmVyJztcbiAgICAgICAgdGhpcy5zcGluZXJSdW4oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGhvc3RFbGVtLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmNsYXNzTmFtZSArPSAnICcgKyB0aGlzLmFkZENsYXNzO1xuICB9XG5cbiAgc3BpbmVyUnVuKCkge1xuICAgIGxldCBjb3VudGVyID0gMDtcbiAgICBjb25zdCBob3N0RWxlbSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgc3dpdGNoIChjb3VudGVyKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgdGhpcy5hZGRDbGFzcyA9ICdzcGlubmVyLXJlZC1vbmx5IG1hdC1wcm9ncmVzcy1zcGlubmVyICc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzID0gJ3NwaW5uZXIteWVsbG93LW9ubHkgbWF0LXByb2dyZXNzLXNwaW5uZXInO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgdGhpcy5hZGRDbGFzcyA9ICdzcGlubmVyLWJsdWUtb25seSBtYXQtcHJvZ3Jlc3Mtc3Bpbm5lcic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzID0gJ3NwaW5uZXItZ3JlZW4tb25seSBtYXQtcHJvZ3Jlc3Mtc3Bpbm5lcic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGhvc3RFbGVtLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmNsYXNzTmFtZSA9ICcgJyArIHRoaXMuYWRkQ2xhc3M7XG4gICAgICAgIGlmIChjb3VudGVyIDwgMykge1xuICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgICAgfVxuICAgICAgfSwgMTMzMyk7XG4gICAgfVxuICB9XG59XG4iXX0=