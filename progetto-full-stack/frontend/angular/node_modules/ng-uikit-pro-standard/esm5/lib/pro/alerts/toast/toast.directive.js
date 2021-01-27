import { __decorate, __metadata } from "tslib";
import { NgModule, ModuleWithProviders, Directive, ElementRef } from '@angular/core';
var ToastContainerDirective = /** @class */ (function () {
    function ToastContainerDirective(el) {
        this.el = el;
    }
    ToastContainerDirective.prototype.getContainerElement = function () {
        return this.el.nativeElement;
    };
    ToastContainerDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ToastContainerDirective = __decorate([
        Directive({
            selector: '[mdbToastContainer]',
            exportAs: 'mdb-toast-container',
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], ToastContainerDirective);
    return ToastContainerDirective;
}());
export { ToastContainerDirective };
var ToastContainerModule = /** @class */ (function () {
    function ToastContainerModule() {
    }
    ToastContainerModule_1 = ToastContainerModule;
    ToastContainerModule.forRoot = function () {
        return {
            ngModule: ToastContainerModule_1,
            providers: [],
        };
    };
    var ToastContainerModule_1;
    ToastContainerModule = ToastContainerModule_1 = __decorate([
        NgModule({
            exports: [ToastContainerDirective],
            declarations: [ToastContainerDirective],
        })
    ], ToastContainerModule);
    return ToastContainerModule;
}());
export { ToastContainerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9hbGVydHMvdG9hc3QvdG9hc3QuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNckY7SUFDRSxpQ0FBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7SUFBRyxDQUFDO0lBQ3RDLHFEQUFtQixHQUFuQjtRQUNFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7SUFDL0IsQ0FBQzs7Z0JBSHVCLFVBQVU7O0lBRHZCLHVCQUF1QjtRQUpuQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFFBQVEsRUFBRSxxQkFBcUI7U0FDaEMsQ0FBQzt5Q0FFd0IsVUFBVTtPQUR2Qix1QkFBdUIsQ0FLbkM7SUFBRCw4QkFBQztDQUFBLEFBTEQsSUFLQztTQUxZLHVCQUF1QjtBQVdwQztJQUFBO0lBT0EsQ0FBQzs2QkFQWSxvQkFBb0I7SUFDeEIsNEJBQU8sR0FBZDtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsc0JBQW9CO1lBQzlCLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQztJQUNKLENBQUM7O0lBTlUsb0JBQW9CO1FBSmhDLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLHVCQUF1QixDQUFDO1lBQ2xDLFlBQVksRUFBRSxDQUFDLHVCQUF1QixDQUFDO1NBQ3hDLENBQUM7T0FDVyxvQkFBb0IsQ0FPaEM7SUFBRCwyQkFBQztDQUFBLEFBUEQsSUFPQztTQVBZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21kYlRvYXN0Q29udGFpbmVyXScsXG4gIGV4cG9ydEFzOiAnbWRiLXRvYXN0LWNvbnRhaW5lcicsXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cbiAgZ2V0Q29udGFpbmVyRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbVG9hc3RDb250YWluZXJEaXJlY3RpdmVdLFxuICBkZWNsYXJhdGlvbnM6IFtUb2FzdENvbnRhaW5lckRpcmVjdGl2ZV0sXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0Q29udGFpbmVyTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxUb2FzdENvbnRhaW5lck1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVG9hc3RDb250YWluZXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==