import { __decorate, __metadata } from "tslib";
import { Directive, Output, EventEmitter, OnInit, OnDestroy, ElementRef } from '@angular/core';
var MdbTableRowDirective = /** @class */ (function () {
    function MdbTableRowDirective(el) {
        this.el = el;
        this.rowCreated = new EventEmitter();
        this.rowRemoved = new EventEmitter();
    }
    MdbTableRowDirective.prototype.ngOnInit = function () {
        this.rowCreated.emit({ created: true, el: this.el.nativeElement });
    };
    MdbTableRowDirective.prototype.ngOnDestroy = function () {
        this.rowRemoved.emit({ removed: true });
    };
    MdbTableRowDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MdbTableRowDirective.prototype, "rowCreated", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MdbTableRowDirective.prototype, "rowRemoved", void 0);
    MdbTableRowDirective = __decorate([
        Directive({
            selector: '[mdbTableRow]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], MdbTableRowDirective);
    return MdbTableRowDirective;
}());
export { MdbTableRowDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXRhYmxlLXJvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvZnJlZS90YWJsZXMvZGlyZWN0aXZlcy9tZGItdGFibGUtcm93LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSy9GO0lBS0UsOEJBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBSHhCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3JDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0lBRy9DLENBQUM7SUFFRCx1Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELDBDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7O2dCQVR1QixVQUFVOztJQUh4QjtRQUFULE1BQU0sRUFBRTs7NERBQXNDO0lBQ3JDO1FBQVQsTUFBTSxFQUFFOzs0REFBc0M7SUFIcEMsb0JBQW9CO1FBSGhDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxlQUFlO1NBQzFCLENBQUM7eUNBTXdCLFVBQVU7T0FMdkIsb0JBQW9CLENBZ0JoQztJQUFELDJCQUFDO0NBQUEsQUFoQkQsSUFnQkM7U0FoQlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0LCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21kYlRhYmxlUm93XSdcbn0pXG5leHBvcnQgY2xhc3MgTWRiVGFibGVSb3dEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgQE91dHB1dCgpIHJvd0NyZWF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHJvd1JlbW92ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJvd0NyZWF0ZWQuZW1pdCh7IGNyZWF0ZWQ6IHRydWUsIGVsOiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnJvd1JlbW92ZWQuZW1pdCh7IHJlbW92ZWQ6IHRydWUgfSk7XG4gIH1cblxufVxuIl19