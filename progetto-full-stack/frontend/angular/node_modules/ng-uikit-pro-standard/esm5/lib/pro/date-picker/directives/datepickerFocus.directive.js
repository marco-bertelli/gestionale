import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';
var FocusDirective = /** @class */ (function () {
    function FocusDirective(el) {
        this.el = el;
    }
    FocusDirective.prototype.ngAfterViewInit = function () {
        this.el.nativeElement.focus();
    };
    FocusDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FocusDirective.prototype, "value", void 0);
    FocusDirective = __decorate([
        Directive({
            selector: '[mdbDpFocus]',
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], FocusDirective);
    return FocusDirective;
}());
export { FocusDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlckZvY3VzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vZGF0ZS1waWNrZXIvZGlyZWN0aXZlcy9kYXRlcGlja2VyRm9jdXMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzVFO0lBR0Usd0JBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0lBQUcsQ0FBQztJQUV0Qyx3Q0FBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7Z0JBSnVCLFVBQVU7O0lBRnpCO1FBQVIsS0FBSyxFQUFFOztpREFBZTtJQURaLGNBQWM7UUFIMUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGNBQWM7U0FDekIsQ0FBQzt5Q0FJd0IsVUFBVTtPQUh2QixjQUFjLENBUTFCO0lBQUQscUJBQUM7Q0FBQSxBQVJELElBUUM7U0FSWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbWRiRHBGb2N1c10nLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9jdXNEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICB9XHJcbn1cclxuIl19