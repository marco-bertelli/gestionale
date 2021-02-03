import { __decorate, __metadata } from "tslib";
import { Directive, Input, forwardRef, ElementRef, EventEmitter, HostListener, OnInit, } from '@angular/core';
import { MdbTimePickerComponent } from './timepicker.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var MDB_TIMEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(function () { return MdbTimePickerDirective; }),
    multi: true,
};
var MdbTimePickerDirective = /** @class */ (function () {
    function MdbTimePickerDirective(el) {
        this.el = el;
        this._valueChange = new EventEmitter();
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    Object.defineProperty(MdbTimePickerDirective.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
            this._valueChange.emit(this._value);
            this.el.nativeElement.value = value;
        },
        enumerable: true,
        configurable: true
    });
    MdbTimePickerDirective.prototype.handleInput = function (event) {
        this.onChange(event.target.value);
        this._valueChange.emit(event.target.value);
    };
    MdbTimePickerDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.mdbTimePicker.setInput(this);
        this.mdbTimePicker._selectionChange$.subscribe(function (selectedValue) {
            _this.value = selectedValue;
            _this.onChange(selectedValue);
            _this.onTouched();
        });
    };
    MdbTimePickerDirective.prototype.writeValue = function (value) {
        if (value || value === '') {
            this.el.nativeElement.value = value;
            this.mdbTimePicker._selectionChange$.next(this._value);
        }
    };
    MdbTimePickerDirective.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    MdbTimePickerDirective.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    MdbTimePickerDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", MdbTimePickerComponent)
    ], MdbTimePickerDirective.prototype, "mdbTimePicker", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], MdbTimePickerDirective.prototype, "value", null);
    __decorate([
        HostListener('input', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MdbTimePickerDirective.prototype, "handleInput", null);
    MdbTimePickerDirective = __decorate([
        Directive({
            selector: '[mdbTimePicker]',
            // tslint:disable-next-line: no-host-metadata-property
            host: { '(blur)': 'onTouched($event)', '(change)': 'onChange($event.target.value)' },
            providers: [MDB_TIMEPICKER_VALUE_ACCESSOR],
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], MdbTimePickerDirective);
    return MdbTimePickerDirective;
}());
export { MdbTimePickerDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL3RpbWVwaWNrZXIvdGltZXBpY2tlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFVBQVUsRUFDVixVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDaEUsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE1BQU0sQ0FBQyxJQUFNLDZCQUE2QixHQUFRO0lBQ2hELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsa0RBQWtEO0lBQ2xELFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHNCQUFzQixFQUF0QixDQUFzQixDQUFDO0lBQ3JELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQVFGO0lBZ0JFLGdDQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUZsQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFtQjFDLGFBQVEsR0FBeUIsY0FBTyxDQUFDLENBQUM7UUFFMUMsY0FBUyxHQUFHLGNBQU8sQ0FBQyxDQUFDO0lBbkJnQixDQUFDO0lBWnRDLHNCQUFJLHlDQUFLO2FBTVQ7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzthQVJELFVBQVUsS0FBYTtZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQVdELDRDQUFXLEdBQVgsVUFBWSxLQUFVO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCx5Q0FBUSxHQUFSO1FBQUEsaUJBT0M7UUFOQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxVQUFBLGFBQWE7WUFDMUQsS0FBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7WUFDM0IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM3QixLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBTUQsMkNBQVUsR0FBVixVQUFXLEtBQVU7UUFDbkIsSUFBSSxLQUFLLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUN6QixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7SUFFRCxpREFBZ0IsR0FBaEIsVUFBaUIsRUFBTztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsa0RBQWlCLEdBQWpCLFVBQWtCLEVBQU87UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Z0JBbEN1QixVQUFVOztJQWZ6QjtRQUFSLEtBQUssRUFBRTtrQ0FBZ0Isc0JBQXNCO2lFQUFDO0lBRy9DO1FBREMsS0FBSyxFQUFFOzs7dURBS1A7SUFXRDtRQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs2REFJakM7SUF0QlUsc0JBQXNCO1FBTmxDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxpQkFBaUI7WUFDM0Isc0RBQXNEO1lBQ3RELElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxVQUFVLEVBQUUsK0JBQStCLEVBQUU7WUFDcEYsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDM0MsQ0FBQzt5Q0FpQndCLFVBQVU7T0FoQnZCLHNCQUFzQixDQW1EbEM7SUFBRCw2QkFBQztDQUFBLEFBbkRELElBbURDO1NBbkRZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIGZvcndhcmRSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWRiVGltZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vdGltZXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgTURCX1RJTUVQSUNLRVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdXNlLWJlZm9yZS1kZWNsYXJlXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1kYlRpbWVQaWNrZXJEaXJlY3RpdmUpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZGJUaW1lUGlja2VyXScsXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxuICBob3N0OiB7ICcoYmx1ciknOiAnb25Ub3VjaGVkKCRldmVudCknLCAnKGNoYW5nZSknOiAnb25DaGFuZ2UoJGV2ZW50LnRhcmdldC52YWx1ZSknIH0sXG4gIHByb3ZpZGVyczogW01EQl9USU1FUElDS0VSX1ZBTFVFX0FDQ0VTU09SXSxcbn0pXG5leHBvcnQgY2xhc3MgTWRiVGltZVBpY2tlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICBASW5wdXQoKSBtZGJUaW1lUGlja2VyOiBNZGJUaW1lUGlja2VyQ29tcG9uZW50O1xuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl92YWx1ZUNoYW5nZS5lbWl0KHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBwcml2YXRlIF92YWx1ZTogc3RyaW5nO1xuICBfdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgaGFuZGxlSW5wdXQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICB0aGlzLl92YWx1ZUNoYW5nZS5lbWl0KGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm1kYlRpbWVQaWNrZXIuc2V0SW5wdXQodGhpcyk7XG4gICAgdGhpcy5tZGJUaW1lUGlja2VyLl9zZWxlY3Rpb25DaGFuZ2UkLnN1YnNjcmliZShzZWxlY3RlZFZhbHVlID0+IHtcbiAgICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZFZhbHVlO1xuICAgICAgdGhpcy5vbkNoYW5nZShzZWxlY3RlZFZhbHVlKTtcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfSk7XG4gIH1cblxuICBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgfHwgdmFsdWUgPT09ICcnKSB7XG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMubWRiVGltZVBpY2tlci5fc2VsZWN0aW9uQ2hhbmdlJC5uZXh0KHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxufVxuIl19