import { __decorate, __metadata } from "tslib";
import { Directive, HostBinding, HostListener, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var CHECKBOX_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(function () { return ButtonCheckboxDirective; }),
    multi: true,
};
/**
 * Add checkbox functionality to any element
 */
var ButtonCheckboxDirective = /** @class */ (function () {
    function ButtonCheckboxDirective() {
        /** Truthy value, will be set to ngModel */
        this.btnCheckboxTrue = true;
        /** Falsy value, will be set to ngModel */
        this.btnCheckboxFalse = false;
        this.state = false;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
    }
    // view -> model
    ButtonCheckboxDirective.prototype.onClick = function () {
        if (this.isDisabled) {
            return;
        }
        this.toggle(!this.state);
        this.onChange(this.value);
    };
    ButtonCheckboxDirective.prototype.ngOnInit = function () {
        this.toggle(this.trueValue === this.value);
    };
    Object.defineProperty(ButtonCheckboxDirective.prototype, "trueValue", {
        get: function () {
            return typeof this.btnCheckboxTrue !== 'undefined' ? this.btnCheckboxTrue : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonCheckboxDirective.prototype, "falseValue", {
        get: function () {
            return typeof this.btnCheckboxFalse !== 'undefined' ? this.btnCheckboxFalse : false;
        },
        enumerable: true,
        configurable: true
    });
    ButtonCheckboxDirective.prototype.toggle = function (state) {
        this.state = state;
        this.value = this.state ? this.trueValue : this.falseValue;
    };
    // ControlValueAccessor
    // model -> view
    ButtonCheckboxDirective.prototype.writeValue = function (value) {
        this.state = this.trueValue === value;
        this.value = value ? this.trueValue : this.falseValue;
    };
    ButtonCheckboxDirective.prototype.setDisabledState = function (isDisabled) {
        this.isDisabled = isDisabled;
    };
    ButtonCheckboxDirective.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    ButtonCheckboxDirective.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ButtonCheckboxDirective.prototype, "btnCheckboxTrue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ButtonCheckboxDirective.prototype, "btnCheckboxFalse", void 0);
    __decorate([
        HostBinding('class.active'),
        __metadata("design:type", Object)
    ], ButtonCheckboxDirective.prototype, "state", void 0);
    __decorate([
        HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ButtonCheckboxDirective.prototype, "onClick", null);
    ButtonCheckboxDirective = __decorate([
        Directive({ selector: '[mdbCheckbox]', providers: [CHECKBOX_CONTROL_VALUE_ACCESSOR] })
    ], ButtonCheckboxDirective);
    return ButtonCheckboxDirective;
}());
export { ButtonCheckboxDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvYnV0dG9ucy9jaGVja2JveC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxNQUFNLENBQUMsSUFBTSwrQkFBK0IsR0FBUTtJQUNsRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLGtEQUFrRDtJQUNsRCxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSx1QkFBdUIsRUFBdkIsQ0FBdUIsQ0FBQztJQUN0RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRjs7R0FFRztBQUVIO0lBQUE7UUFDRSwyQ0FBMkM7UUFDM0Isb0JBQWUsR0FBUSxJQUFJLENBQUM7UUFDNUMsMENBQTBDO1FBQzFCLHFCQUFnQixHQUFRLEtBQUssQ0FBQztRQUVWLFVBQUssR0FBRyxLQUFLLENBQUM7UUFLeEMsYUFBUSxHQUFRLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDbkMsY0FBUyxHQUFRLFFBQVEsQ0FBQyxTQUFTLENBQUM7SUFnRGhELENBQUM7SUE5Q0MsZ0JBQWdCO0lBRVQseUNBQU8sR0FBZDtRQUNFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFTSwwQ0FBUSxHQUFmO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsc0JBQWMsOENBQVM7YUFBdkI7WUFDRSxPQUFPLE9BQU8sSUFBSSxDQUFDLGVBQWUsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNuRixDQUFDOzs7T0FBQTtJQUVELHNCQUFjLCtDQUFVO2FBQXhCO1lBQ0UsT0FBTyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RGLENBQUM7OztPQUFBO0lBRU0sd0NBQU0sR0FBYixVQUFjLEtBQWM7UUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzdELENBQUM7SUFFRCx1QkFBdUI7SUFDdkIsZ0JBQWdCO0lBQ1QsNENBQVUsR0FBakIsVUFBa0IsS0FBVTtRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3hELENBQUM7SUFFTSxrREFBZ0IsR0FBdkIsVUFBd0IsVUFBbUI7UUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVNLGtEQUFnQixHQUF2QixVQUF3QixFQUFrQjtRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sbURBQWlCLEdBQXhCLFVBQXlCLEVBQVk7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQXpEUTtRQUFSLEtBQUssRUFBRTs7b0VBQW9DO0lBRW5DO1FBQVIsS0FBSyxFQUFFOztxRUFBc0M7SUFFakI7UUFBNUIsV0FBVyxDQUFDLGNBQWMsQ0FBQzs7MERBQXNCO0lBVWxEO1FBREMsWUFBWSxDQUFDLE9BQU8sQ0FBQzs7OzswREFRckI7SUF2QlUsdUJBQXVCO1FBRG5DLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUMsRUFBRSxDQUFDO09BQzFFLHVCQUF1QixDQTREbkM7SUFBRCw4QkFBQztDQUFBLEFBNURELElBNERDO1NBNURZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uSW5pdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgQ0hFQ0tCT1hfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11c2UtYmVmb3JlLWRlY2xhcmVcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQnV0dG9uQ2hlY2tib3hEaXJlY3RpdmUpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbi8qKlxuICogQWRkIGNoZWNrYm94IGZ1bmN0aW9uYWxpdHkgdG8gYW55IGVsZW1lbnRcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW21kYkNoZWNrYm94XScsIHByb3ZpZGVyczogW0NIRUNLQk9YX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdIH0pXG5leHBvcnQgY2xhc3MgQnV0dG9uQ2hlY2tib3hEaXJlY3RpdmUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgLyoqIFRydXRoeSB2YWx1ZSwgd2lsbCBiZSBzZXQgdG8gbmdNb2RlbCAqL1xuICBASW5wdXQoKSBwdWJsaWMgYnRuQ2hlY2tib3hUcnVlOiBhbnkgPSB0cnVlO1xuICAvKiogRmFsc3kgdmFsdWUsIHdpbGwgYmUgc2V0IHRvIG5nTW9kZWwgKi9cbiAgQElucHV0KCkgcHVibGljIGJ0bkNoZWNrYm94RmFsc2U6IGFueSA9IGZhbHNlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJykgcHVibGljIHN0YXRlID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIHZhbHVlOiBhbnk7XG4gIHByb3RlY3RlZCBpc0Rpc2FibGVkOiBib29sZWFuO1xuXG4gIHByb3RlY3RlZCBvbkNoYW5nZTogYW55ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICBwcm90ZWN0ZWQgb25Ub3VjaGVkOiBhbnkgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbiAgLy8gdmlldyAtPiBtb2RlbFxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIHB1YmxpYyBvbkNsaWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnRvZ2dsZSghdGhpcy5zdGF0ZSk7XG4gICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiBhbnkge1xuICAgIHRoaXMudG9nZ2xlKHRoaXMudHJ1ZVZhbHVlID09PSB0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgdHJ1ZVZhbHVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy5idG5DaGVja2JveFRydWUgIT09ICd1bmRlZmluZWQnID8gdGhpcy5idG5DaGVja2JveFRydWUgOiB0cnVlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBmYWxzZVZhbHVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy5idG5DaGVja2JveEZhbHNlICE9PSAndW5kZWZpbmVkJyA/IHRoaXMuYnRuQ2hlY2tib3hGYWxzZSA6IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZShzdGF0ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5zdGF0ZSA/IHRoaXMudHJ1ZVZhbHVlIDogdGhpcy5mYWxzZVZhbHVlO1xuICB9XG5cbiAgLy8gQ29udHJvbFZhbHVlQWNjZXNzb3JcbiAgLy8gbW9kZWwgLT4gdmlld1xuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMudHJ1ZVZhbHVlID09PSB2YWx1ZTtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWUgPyB0aGlzLnRydWVWYWx1ZSA6IHRoaXMuZmFsc2VWYWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmlzRGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHt9KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cbn1cbiJdfQ==