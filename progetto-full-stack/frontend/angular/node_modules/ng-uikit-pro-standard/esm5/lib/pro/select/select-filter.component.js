import { __decorate, __metadata } from "tslib";
import { Component, OnInit, ElementRef, ViewChild, forwardRef, HostListener, EventEmitter, Output, Input, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var MDB_SELECT_FILTER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(function () { return MdbSelectFilterComponent; }),
    multi: true,
};
var MdbSelectFilterComponent = /** @class */ (function () {
    function MdbSelectFilterComponent(_el) {
        this._el = _el;
        this.placeholder = '';
        this.autocomplete = true;
        this.inputChange = new EventEmitter();
        this._onChange = function () { };
        this._onTouched = function () { };
    }
    MdbSelectFilterComponent.prototype._handleInput = function (event) {
        var valueChanged = this.value !== event.target.value;
        if (valueChanged) {
            this._onChange(event.target.value);
            this.inputChange.emit(event.target.value);
            this.value = event.target.value;
        }
    };
    MdbSelectFilterComponent.prototype.ngOnInit = function () { };
    MdbSelectFilterComponent.prototype.focus = function () {
        this.input.nativeElement.focus();
    };
    /** Control value accessor methods */
    MdbSelectFilterComponent.prototype.setDisabledState = function (isDisabled) {
        this._el.nativeElement.disabled = isDisabled;
    };
    MdbSelectFilterComponent.prototype.writeValue = function (value) {
        var _this = this;
        Promise.resolve(null).then(function () {
            _this._el.nativeElement.value = value;
        });
    };
    MdbSelectFilterComponent.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    MdbSelectFilterComponent.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    MdbSelectFilterComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        ViewChild('input'),
        __metadata("design:type", ElementRef)
    ], MdbSelectFilterComponent.prototype, "input", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbSelectFilterComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbSelectFilterComponent.prototype, "autocomplete", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MdbSelectFilterComponent.prototype, "inputChange", void 0);
    __decorate([
        HostListener('input', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MdbSelectFilterComponent.prototype, "_handleInput", null);
    MdbSelectFilterComponent = __decorate([
        Component({
            selector: 'mdb-select-filter',
            template: "<div #filter class=\"mdb-select-filter md-form px-2\">\n  <input\n    #input\n    [placeholder]=\"placeholder\"\n    [attr.autocomplete]=\"autocomplete\"\n    [attr.role]=\"'searchbox'\"\n    type=\"text\"\n    class=\"mdb-select-filter-input search form-control w-100 d-block\"\n  />\n</div>\n",
            providers: [MDB_SELECT_FILTER_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], MdbSelectFilterComponent);
    return MdbSelectFilterComponent;
}());
export { MdbSelectFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL3NlbGVjdC9zZWxlY3QtZmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQ04sVUFBVSxFQUNWLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxHQUNOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5ELE1BQU0sQ0FBQyxJQUFNLGdDQUFnQyxHQUFRO0lBQ25ELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsa0RBQWtEO0lBQ2xELFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHdCQUF3QixFQUF4QixDQUF3QixDQUFDO0lBQ3ZELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQU9GO0lBb0JFLGtDQUFvQixHQUFlO1FBQWYsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQWhCMUIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFFVixnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBMkI1RSxjQUFTLEdBQXlCLGNBQU8sQ0FBQyxDQUFDO1FBRTNDLGVBQVUsR0FBRyxjQUFPLENBQUMsQ0FBQztJQWhCZ0IsQ0FBQztJQVZ2QywrQ0FBWSxHQUFaLFVBQWEsS0FBVTtRQUNyQixJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRXZELElBQUksWUFBWSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBSUQsMkNBQVEsR0FBUixjQUFZLENBQUM7SUFFYix3Q0FBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELHFDQUFxQztJQUVyQyxtREFBZ0IsR0FBaEIsVUFBaUIsVUFBbUI7UUFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUMvQyxDQUFDO0lBTUQsNkNBQVUsR0FBVixVQUFXLEtBQVU7UUFBckIsaUJBSUM7UUFIQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN6QixLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG1EQUFnQixHQUFoQixVQUFpQixFQUFzQjtRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsb0RBQWlCLEdBQWpCLFVBQWtCLEVBQVk7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Z0JBOUJ3QixVQUFVOztJQWxCZjtRQUFuQixTQUFTLENBQUMsT0FBTyxDQUFDO2tDQUFRLFVBQVU7MkRBQUM7SUFFN0I7UUFBUixLQUFLLEVBQUU7O2lFQUFrQjtJQUNqQjtRQUFSLEtBQUssRUFBRTs7a0VBQXFCO0lBRW5CO1FBQVQsTUFBTSxFQUFFO2tDQUF1QixZQUFZO2lFQUFnQztJQUc1RTtRQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OztnRUFTakM7SUFsQlUsd0JBQXdCO1FBTHBDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7WUFDN0Isa1RBQTZDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO1NBQzlDLENBQUM7eUNBcUJ5QixVQUFVO09BcEJ4Qix3QkFBd0IsQ0FtRHBDO0lBQUQsK0JBQUM7Q0FBQSxBQW5ERCxJQW1EQztTQW5EWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgRWxlbWVudFJlZixcbiAgVmlld0NoaWxkLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0LFxuICBJbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IE1EQl9TRUxFQ1RfRklMVEVSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVzZS1iZWZvcmUtZGVjbGFyZVxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNZGJTZWxlY3RGaWx0ZXJDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1zZWxlY3QtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC1maWx0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtNREJfU0VMRUNUX0ZJTFRFUl9WQUxVRV9BQ0NFU1NPUl0sXG59KVxuZXhwb3J0IGNsYXNzIE1kYlNlbGVjdEZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHZhbHVlOiBhbnk7XG4gIEBWaWV3Q2hpbGQoJ2lucHV0JykgaW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnJztcbiAgQElucHV0KCkgYXV0b2NvbXBsZXRlID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgaW5wdXRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKVxuICBfaGFuZGxlSW5wdXQoZXZlbnQ6IGFueSkge1xuICAgIGNvbnN0IHZhbHVlQ2hhbmdlZCA9IHRoaXMudmFsdWUgIT09IGV2ZW50LnRhcmdldC52YWx1ZTtcblxuICAgIGlmICh2YWx1ZUNoYW5nZWQpIHtcbiAgICAgIHRoaXMuX29uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICB0aGlzLmlucHV0Q2hhbmdlLmVtaXQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgIHRoaXMudmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdPbkluaXQoKSB7fVxuXG4gIGZvY3VzKCkge1xuICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqIENvbnRyb2wgdmFsdWUgYWNjZXNzb3IgbWV0aG9kcyAqL1xuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgX29uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4ge30pOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cbn1cbiJdfQ==