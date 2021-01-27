import { __decorate, __metadata } from "tslib";
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, Renderer2, ViewChild, ViewEncapsulation, OnInit, AfterViewInit, ChangeDetectionStrategy, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var RANGE_VALUE_ACCESOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(function () { return MdbMultiRangeInputComponent; }),
    multi: true,
};
var MdbMultiRangeInputComponent = /** @class */ (function () {
    function MdbMultiRangeInputComponent(renderer) {
        this.renderer = renderer;
        this.value = { first: 0, second: 0 };
        this.min = 0;
        this.max = 100;
        this.rangeValueChange = new EventEmitter();
        this.firstVisibility = false;
        this.secondVisibility = false;
        this.cloudRange = 0;
        // Control Value Accessor Methods
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    MdbMultiRangeInputComponent.prototype.ngOnInit = function () {
        this.range = this.value;
    };
    MdbMultiRangeInputComponent.prototype.ngAfterViewInit = function () {
        this.steps = this.max - this.min;
        // fix(slider): resolve problem with not moving slider cloud when setting value with [value] or reactive forms
        // Manual call the moveValueCloud method to move range value cloud to proper position based on the `value` variable
        if (this.value) {
            this.moveValueCloud(new Event('input'), 'first', Number(this.value.first));
            this.moveValueCloud(new Event('input'), 'second', Number(this.value.second));
        }
    };
    MdbMultiRangeInputComponent.prototype.firstRangeInput = function (event) {
        this.rangeValueChange.emit(this.range);
        if (typeof this.range === 'object' && this.range.first === 0) {
            return this.range;
        }
        this.focusRangeInput('first');
        this.moveValueCloud(event, 'first');
    };
    MdbMultiRangeInputComponent.prototype.secondRangeInput = function (event) {
        this.rangeValueChange.emit(this.range);
        if (typeof this.range === 'object' && this.range.second === 0) {
            return this.range;
        }
        this.focusRangeInput('second');
        this.moveValueCloud(event, 'second');
    };
    MdbMultiRangeInputComponent.prototype.moveValueCloud = function (event, element, value) {
        // if `moveValueCloud()` is called by (input) event take value as event.target.value.
        // If it's called manually, take value from parameter.
        // This is needed in situation, when slider value is set by default or ReactiveForms,
        // and value clound is not moved to proper position
        var newValue = event.target ? event.target.value : value;
        var newRelativeGain = newValue - this.min;
        var inputWidth = element === 'first'
            ? this.firstInput.nativeElement.offsetWidth
            : this.secondInput.nativeElement.offsetWidth;
        var thumbOffset = 0;
        var offsetAmmount = 15;
        var distanceFromMiddle = newRelativeGain - this.steps / 2;
        this.stepLength = inputWidth / this.steps;
        thumbOffset = (distanceFromMiddle / this.steps) * offsetAmmount;
        this.cloudRange = this.stepLength * newRelativeGain - thumbOffset;
        this.renderer.setStyle(element === 'first'
            ? this.firstRangeCloud.nativeElement
            : this.secondRangeCloud.nativeElement, 'left', this.cloudRange + 'px');
    };
    MdbMultiRangeInputComponent.prototype.focusRangeInput = function (element) {
        if (this.checkIfSafari()) {
            element === 'first'
                ? this.firstInput.nativeElement.focus()
                : this.secondInput.nativeElement.focus();
        }
        element === 'first' ? (this.firstVisibility = true) : (this.secondVisibility = true);
    };
    MdbMultiRangeInputComponent.prototype.blurRangeInput = function (element) {
        if (this.checkIfSafari()) {
            element === 'first'
                ? this.firstInput.nativeElement.blur()
                : this.secondInput.nativeElement.blur();
        }
        element === 'first' ? (this.firstVisibility = false) : (this.secondVisibility = false);
    };
    MdbMultiRangeInputComponent.prototype.checkIfSafari = function () {
        var isSafari = navigator.userAgent.indexOf('Safari') > -1;
        var isChrome = navigator.userAgent.indexOf('Chrome') > -1;
        var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
        var isOpera = navigator.userAgent.indexOf('Opera') > -1;
        if (isSafari && !isChrome && !isFirefox && !isOpera) {
            return true;
        }
        else {
            return false;
        }
    };
    MdbMultiRangeInputComponent.prototype.writeValue = function (value) {
        var _this = this;
        this.value = value;
        this.range = value;
        // fix(slider): resolve problem with not moving slider cloud when setting value with [value] or reactive forms
        // Manual call the moveValueCloud method to move range value cloud to proper position based on the `value` variable
        if (value) {
            setTimeout(function () {
                _this.moveValueCloud(new Event('input'), 'first', Number(value.first));
                _this.moveValueCloud(new Event('input'), 'second', Number(value.second));
            }, 0);
        }
    };
    MdbMultiRangeInputComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    MdbMultiRangeInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    MdbMultiRangeInputComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    MdbMultiRangeInputComponent.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbMultiRangeInputComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MdbMultiRangeInputComponent.prototype, "required", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbMultiRangeInputComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbMultiRangeInputComponent.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MdbMultiRangeInputComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbMultiRangeInputComponent.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbMultiRangeInputComponent.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MdbMultiRangeInputComponent.prototype, "step", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MdbMultiRangeInputComponent.prototype, "rangeValueChange", void 0);
    __decorate([
        ViewChild('firstInput', { static: true }),
        __metadata("design:type", ElementRef)
    ], MdbMultiRangeInputComponent.prototype, "firstInput", void 0);
    __decorate([
        ViewChild('secondInput', { static: true }),
        __metadata("design:type", ElementRef)
    ], MdbMultiRangeInputComponent.prototype, "secondInput", void 0);
    __decorate([
        ViewChild('firstRangeCloud', { static: true }),
        __metadata("design:type", ElementRef)
    ], MdbMultiRangeInputComponent.prototype, "firstRangeCloud", void 0);
    __decorate([
        ViewChild('secondRangeCloud', { static: true }),
        __metadata("design:type", ElementRef)
    ], MdbMultiRangeInputComponent.prototype, "secondRangeCloud", void 0);
    __decorate([
        ViewChild('rangeField', { static: true }),
        __metadata("design:type", ElementRef)
    ], MdbMultiRangeInputComponent.prototype, "rangeField", void 0);
    MdbMultiRangeInputComponent = __decorate([
        Component({
            selector: 'mdb-multi-range-input',
            template: "<div class=\"multi-range-field my-5 pb-5\">\n  <div class=\"range-field\" #rangeField>\n    <div class=\"track\">\n      <div #firstRangeCloud class=\"range-cloud\" title=\"range\"\n           [ngClass]=\"{'visible': this.firstVisibility, 'hidden': !this.firstVisibility}\">\n        <span class=\"text-transform\">{{range.first}}</span>\n      </div>\n    </div>\n    <input #firstInput\n           [value]=\"value.first\"\n           [attr.value]=\"value.first\"\n           [name]=\"name\"\n           [id]=\"id\"\n           [min]=\"min\"\n           [max]=\"max\"\n           [step]=\"step\"\n           [disabled]=\"disabled\"\n           type=\"range\"\n           class=\"mdbMultiRange original active\"\n           (input)=\"firstRangeInput($event)\"\n           [(ngModel)]=\"range.first\"\n           (focus)=\"this.firstVisibility = true\"\n           (blur)=\"this.firstVisibility = false; blurRangeInput('first')\"\n           (touchend)=\"blurRangeInput('first')\"\n           (click)=\"focusRangeInput('first')\">\n\n\n    <div class=\"track\">\n      <div #secondRangeCloud class=\"range-cloud\" title=\"range\"\n           [ngClass]=\"{'visible': this.secondVisibility, 'hidden': !this.secondVisibility}\">\n        <span class=\"text-transform\">{{range.second}}</span>\n      </div>\n    </div>\n    <input #secondInput\n           [value]=\"value.second\"\n           [attr.value]=\"value.second\"\n           [name]=\"name\"\n           [id]=\"id\"\n           [min]=\"min\"\n           [max]=\"max\"\n           [step]=\"step\"\n           [disabled]=\"disabled\"\n           type=\"range\"\n           class=\"mdbMultiRange original ghost active\"\n           (input)=\"secondRangeInput($event)\"\n           [(ngModel)]=\"range.second\"\n           (focus)=\"this.secondVisibility = true\"\n           (blur)=\"this.secondVisibility = false; blurRangeInput('second')\"\n           (touchend)=\"blurRangeInput('second')\"\n           (click)=\"focusRangeInput('second')\">\n  </div>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            providers: [RANGE_VALUE_ACCESOR],
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".range-field input[type=range]{cursor:pointer;position:relative;background-color:transparent;border:1px solid #fff;outline:0;width:100%;margin:15px 0;padding:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}.range-field input[type=range]:focus{outline:0}.range-field input[type=range]+.thumb{position:absolute;border:none;height:0;width:0;border-radius:50%;background-color:#4285f4;top:10px;margin-left:-6px;transform-origin:50% 50%;transform:rotate(-45deg)}.range-field input[type=range]+.thumb .value{display:block;width:30px;text-align:center;color:#4285f4;font-size:0;transform:rotate(45deg)}.range-field input[type=range]+.thumb.active{border-radius:50% 50% 50% 0}.range-field input[type=range]+.thumb.active .value{color:#fff;margin-left:-1px;margin-top:8px;font-size:10px}.range-field input[type=range]::-webkit-slider-runnable-track{height:3px;background:#c2c0c2;border:none}.range-field input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;border:none;height:14px;width:14px;border-radius:50%;background-color:#4285f4;transform-origin:50% 50%;margin:-5px 0 0;-webkit-transition:.3s;transition:.3s}.range-field input[type=range]:focus::-webkit-slider-runnable-track{background:#ccc}.range-field input[type=range]::-moz-range-track{height:3px;background:#c2c0c2;border:none}.range-field input[type=range]::-moz-range-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#4285f4;margin-top:-5px}.range-field input[type=range]:-moz-focusring{outline:#fff solid 1px;outline-offset:-1px}.range-field input[type=range]:focus::-moz-range-track{background:#c2c0c2}.range-field input[type=range]::-ms-track{height:3px;background:0 0;border-color:transparent;border-width:6px 0;color:transparent}.range-field input[type=range]::-ms-fill-lower{background:#c2c0c2}.range-field input[type=range]::-ms-fill-upper{background:#c2c0c2}.range-field input[type=range]::-ms-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#4285f4}.range-field input[type=range]:focus::-ms-fill-lower{background:#c2c0c2}.range-field input[type=range]:focus::-ms-fill-upper{background:#c2c0c2}@supports (--css:variables){input[type=range].mdbMultiRange{padding:0;margin:0;display:inline-block;vertical-align:top}input[type=range].mdbMultiRange.original{position:absolute}input[type=range].mdbMultiRange.original::-webkit-slider-thumb{position:relative;z-index:2}input[type=range].mdbMultiRange.original::-moz-range-thumb{transform:scale(1);z-index:1}input[type=range].mdbMultiRange::-moz-range-track{border-color:transparent}input[type=range].mdbMultiRange.ghost{position:relative}input[type=range].mdbMultiRange.ghost:nth-of-type(n+1){position:absolute}}.multi-range-field{position:relative}.multi-range-field input[type=range]{cursor:pointer;position:relative;background-color:transparent;border:1px solid #fff;outline:0;width:100%;margin:15px 0;padding:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}.multi-range-field input[type=range]:focus{outline:0}.multi-range-field input[type=range]+.thumb{position:absolute;border:none;height:0;width:0;border-radius:50%;background-color:#4285f4;top:10px;margin-left:-6px;transform-origin:50% 50%;transform:rotate(-45deg)}.multi-range-field input[type=range]+.thumb .value{display:block;width:30px;text-align:center;color:#4285f4;font-size:0;transform:rotate(45deg)}.multi-range-field input[type=range]+.thumb.active{border-radius:50% 50% 50% 0}.multi-range-field input[type=range]+.thumb.active .value{color:#fff;margin-left:-1px;margin-top:8px;font-size:10px}.multi-range-field input[type=range]::-webkit-slider-runnable-track{height:3px;background:#c2c0c2;border:none}.multi-range-field input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;border:none;height:14px;width:14px;border-radius:50%;background-color:#4285f4;transform-origin:50% 50%;margin:-5px 0 0;-webkit-transition:.3s;transition:.3s}.multi-range-field input[type=range]:focus::-webkit-slider-runnable-track{background:#ccc}.multi-range-field input[type=range]::-moz-range-track{height:3px;background:#c2c0c2;border:none}.multi-range-field input[type=range]::-moz-range-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#4285f4;margin-top:-5px}.multi-range-field input[type=range]:-moz-focusring{outline:#fff solid 1px;outline-offset:-1px}.multi-range-field input[type=range]:focus::-moz-range-track{background:#c2c0c2}.multi-range-field input[type=range]::-ms-track{height:3px;background:0 0;border-color:transparent;border-width:6px 0;color:transparent}.multi-range-field input[type=range]::-ms-fill-lower{background:#c2c0c2}.multi-range-field input[type=range]::-ms-fill-upper{background:#c2c0c2}.multi-range-field input[type=range]::-ms-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#4285f4}.multi-range-field input[type=range]:focus::-ms-fill-lower{background:#c2c0c2}.multi-range-field input[type=range]:focus::-ms-fill-upper{background:#c2c0c2}.thumb-horizontal-wrapper{position:relative;transform:rotate(-270deg);top:500px}.multi-range-field input[type=range]+.thumb-horizontal .value{transform:rotate(315deg)!important}.range-field{position:relative}.range-field .track{position:absolute;right:8px;left:8px;margin-left:-7.5px}.range-field .track .range-cloud{height:30px;width:30px;top:-25px;background-color:#4285f4;position:absolute;color:#fff;border-radius:50%;font-size:12px;transform:translateX(-50%)}.range-field .track .range-cloud:after{content:\"\";position:absolute;bottom:0;left:50%;transform:translate(-50%,70%);width:0;height:0;border-style:solid;border-width:7px 7px 0;border-color:#4285f4 transparent transparent}.range-field .track .range-cloud.hidden{display:none}.range-field .track .range-cloud.visible{display:block}.range-field .track .range-cloud .text-transform{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}"]
        }),
        __metadata("design:paramtypes", [Renderer2])
    ], MdbMultiRangeInputComponent);
    return MdbMultiRangeInputComponent;
}());
export { MdbMultiRangeInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLW11bHRpLXJhbmdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vcmFuZ2UvbXVsdGktcmFuZ2UvbWRiLW11bHRpLXJhbmdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixhQUFhLEVBQ2IsdUJBQXVCLEdBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxNQUFNLENBQUMsSUFBTSxtQkFBbUIsR0FBUTtJQUN0QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLGtEQUFrRDtJQUNsRCxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSwyQkFBMkIsRUFBM0IsQ0FBMkIsQ0FBQztJQUMxRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFVRjtJQTBCRSxxQ0FBb0IsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXRCOUIsVUFBSyxHQUF3RCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBRXJGLFFBQUcsR0FBRyxDQUFDLENBQUM7UUFDUixRQUFHLEdBQUcsR0FBRyxDQUFDO1FBR1QscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQXFDLENBQUM7UUFZbkYsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLGVBQVUsR0FBRyxDQUFDLENBQUM7UUF1R2YsaUNBQWlDO1FBQ2pDLGFBQVEsR0FBRyxVQUFDLENBQU0sSUFBTSxDQUFDLENBQUM7UUFDMUIsY0FB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RSxDQUFDO2tDQUFhLFVBQVU7bUVBQUM7SUFoQnZELDJCQUEyQjtRQVJ2QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLDQrREFBNkM7WUFFN0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7WUFDaEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7eUNBMkI4QixTQUFTO09BMUI1QiwyQkFBMkIsQ0E0SnZDO0lBQUQsa0NBQUM7Q0FBQSxBQTVKRCxJQTRKQztTQTVKWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBPbkluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IFJBTkdFX1ZBTFVFX0FDQ0VTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdXNlLWJlZm9yZS1kZWNsYXJlXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1kYk11bHRpUmFuZ2VJbnB1dENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLW11bHRpLXJhbmdlLWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICdtZGItbXVsdGktcmFuZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi8uLi9yYW5nZS1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFtSQU5HRV9WQUxVRV9BQ0NFU09SXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kYk11bHRpUmFuZ2VJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSB2YWx1ZTogeyBmaXJzdDogbnVtYmVyIHwgc3RyaW5nOyBzZWNvbmQ6IG51bWJlciB8IHN0cmluZyB9ID0geyBmaXJzdDogMCwgc2Vjb25kOiAwIH07XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBtaW4gPSAwO1xuICBASW5wdXQoKSBtYXggPSAxMDA7XG4gIEBJbnB1dCgpIHN0ZXA6IG51bWJlcjtcblxuICBAT3V0cHV0KCkgcmFuZ2VWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBmaXJzdDogbnVtYmVyOyBzZWNvbmQ6IG51bWJlciB9PigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2ZpcnN0SW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBmaXJzdElucHV0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzZWNvbmRJbnB1dCcsIHsgc3RhdGljOiB0cnVlIH0pIHNlY29uZElucHV0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdmaXJzdFJhbmdlQ2xvdWQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBmaXJzdFJhbmdlQ2xvdWQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3NlY29uZFJhbmdlQ2xvdWQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZWNvbmRSYW5nZUNsb3VkOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdyYW5nZUZpZWxkJywgeyBzdGF0aWM6IHRydWUgfSkgcmFuZ2VGaWVsZDogRWxlbWVudFJlZjtcblxuICByYW5nZTogYW55O1xuXG4gIHN0ZXBzOiBudW1iZXI7XG4gIHN0ZXBMZW5ndGg6IG51bWJlcjtcbiAgZmlyc3RWaXNpYmlsaXR5ID0gZmFsc2U7XG4gIHNlY29uZFZpc2liaWxpdHkgPSBmYWxzZTtcbiAgY2xvdWRSYW5nZSA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucmFuZ2UgPSB0aGlzLnZhbHVlO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc3RlcHMgPSB0aGlzLm1heCAtIHRoaXMubWluO1xuXG4gICAgLy8gZml4KHNsaWRlcik6IHJlc29sdmUgcHJvYmxlbSB3aXRoIG5vdCBtb3Zpbmcgc2xpZGVyIGNsb3VkIHdoZW4gc2V0dGluZyB2YWx1ZSB3aXRoIFt2YWx1ZV0gb3IgcmVhY3RpdmUgZm9ybXNcbiAgICAvLyBNYW51YWwgY2FsbCB0aGUgbW92ZVZhbHVlQ2xvdWQgbWV0aG9kIHRvIG1vdmUgcmFuZ2UgdmFsdWUgY2xvdWQgdG8gcHJvcGVyIHBvc2l0aW9uIGJhc2VkIG9uIHRoZSBgdmFsdWVgIHZhcmlhYmxlXG4gICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMubW92ZVZhbHVlQ2xvdWQobmV3IEV2ZW50KCdpbnB1dCcpLCAnZmlyc3QnLCBOdW1iZXIodGhpcy52YWx1ZS5maXJzdCkpO1xuICAgICAgdGhpcy5tb3ZlVmFsdWVDbG91ZChuZXcgRXZlbnQoJ2lucHV0JyksICdzZWNvbmQnLCBOdW1iZXIodGhpcy52YWx1ZS5zZWNvbmQpKTtcbiAgICB9XG4gIH1cblxuICBmaXJzdFJhbmdlSW5wdXQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMucmFuZ2VWYWx1ZUNoYW5nZS5lbWl0KHRoaXMucmFuZ2UpO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnJhbmdlID09PSAnb2JqZWN0JyAmJiB0aGlzLnJhbmdlLmZpcnN0ID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5yYW5nZTtcbiAgICB9XG5cbiAgICB0aGlzLmZvY3VzUmFuZ2VJbnB1dCgnZmlyc3QnKTtcbiAgICB0aGlzLm1vdmVWYWx1ZUNsb3VkKGV2ZW50LCAnZmlyc3QnKTtcbiAgfVxuXG4gIHNlY29uZFJhbmdlSW5wdXQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMucmFuZ2VWYWx1ZUNoYW5nZS5lbWl0KHRoaXMucmFuZ2UpO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnJhbmdlID09PSAnb2JqZWN0JyAmJiB0aGlzLnJhbmdlLnNlY29uZCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMucmFuZ2U7XG4gICAgfVxuXG4gICAgdGhpcy5mb2N1c1JhbmdlSW5wdXQoJ3NlY29uZCcpO1xuICAgIHRoaXMubW92ZVZhbHVlQ2xvdWQoZXZlbnQsICdzZWNvbmQnKTtcbiAgfVxuXG4gIHByaXZhdGUgbW92ZVZhbHVlQ2xvdWQoZXZlbnQ6IGFueSwgZWxlbWVudDogc3RyaW5nLCB2YWx1ZT86IG51bWJlcikge1xuICAgIC8vIGlmIGBtb3ZlVmFsdWVDbG91ZCgpYCBpcyBjYWxsZWQgYnkgKGlucHV0KSBldmVudCB0YWtlIHZhbHVlIGFzIGV2ZW50LnRhcmdldC52YWx1ZS5cbiAgICAvLyBJZiBpdCdzIGNhbGxlZCBtYW51YWxseSwgdGFrZSB2YWx1ZSBmcm9tIHBhcmFtZXRlci5cblxuICAgIC8vIFRoaXMgaXMgbmVlZGVkIGluIHNpdHVhdGlvbiwgd2hlbiBzbGlkZXIgdmFsdWUgaXMgc2V0IGJ5IGRlZmF1bHQgb3IgUmVhY3RpdmVGb3JtcyxcbiAgICAvLyBhbmQgdmFsdWUgY2xvdW5kIGlzIG5vdCBtb3ZlZCB0byBwcm9wZXIgcG9zaXRpb25cbiAgICBjb25zdCBuZXdWYWx1ZSA9IGV2ZW50LnRhcmdldCA/IGV2ZW50LnRhcmdldC52YWx1ZSA6IHZhbHVlO1xuICAgIGNvbnN0IG5ld1JlbGF0aXZlR2FpbiA9IG5ld1ZhbHVlIC0gdGhpcy5taW47XG4gICAgY29uc3QgaW5wdXRXaWR0aCA9XG4gICAgICBlbGVtZW50ID09PSAnZmlyc3QnXG4gICAgICAgID8gdGhpcy5maXJzdElucHV0Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGhcbiAgICAgICAgOiB0aGlzLnNlY29uZElucHV0Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICBsZXQgdGh1bWJPZmZzZXQgPSAwO1xuICAgIGNvbnN0IG9mZnNldEFtbW91bnQgPSAxNTtcbiAgICBjb25zdCBkaXN0YW5jZUZyb21NaWRkbGUgPSBuZXdSZWxhdGl2ZUdhaW4gLSB0aGlzLnN0ZXBzIC8gMjtcblxuICAgIHRoaXMuc3RlcExlbmd0aCA9IGlucHV0V2lkdGggLyB0aGlzLnN0ZXBzO1xuXG4gICAgdGh1bWJPZmZzZXQgPSAoZGlzdGFuY2VGcm9tTWlkZGxlIC8gdGhpcy5zdGVwcykgKiBvZmZzZXRBbW1vdW50O1xuICAgIHRoaXMuY2xvdWRSYW5nZSA9IHRoaXMuc3RlcExlbmd0aCAqIG5ld1JlbGF0aXZlR2FpbiAtIHRodW1iT2Zmc2V0O1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgIGVsZW1lbnQgPT09ICdmaXJzdCdcbiAgICAgICAgPyB0aGlzLmZpcnN0UmFuZ2VDbG91ZC5uYXRpdmVFbGVtZW50XG4gICAgICAgIDogdGhpcy5zZWNvbmRSYW5nZUNsb3VkLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAnbGVmdCcsXG4gICAgICB0aGlzLmNsb3VkUmFuZ2UgKyAncHgnXG4gICAgKTtcbiAgfVxuXG4gIGZvY3VzUmFuZ2VJbnB1dChlbGVtZW50OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5jaGVja0lmU2FmYXJpKCkpIHtcbiAgICAgIGVsZW1lbnQgPT09ICdmaXJzdCdcbiAgICAgICAgPyB0aGlzLmZpcnN0SW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpXG4gICAgICAgIDogdGhpcy5zZWNvbmRJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICAgIGVsZW1lbnQgPT09ICdmaXJzdCcgPyAodGhpcy5maXJzdFZpc2liaWxpdHkgPSB0cnVlKSA6ICh0aGlzLnNlY29uZFZpc2liaWxpdHkgPSB0cnVlKTtcbiAgfVxuXG4gIGJsdXJSYW5nZUlucHV0KGVsZW1lbnQ6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmNoZWNrSWZTYWZhcmkoKSkge1xuICAgICAgZWxlbWVudCA9PT0gJ2ZpcnN0J1xuICAgICAgICA/IHRoaXMuZmlyc3RJbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKVxuICAgICAgICA6IHRoaXMuc2Vjb25kSW5wdXQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgfVxuICAgIGVsZW1lbnQgPT09ICdmaXJzdCcgPyAodGhpcy5maXJzdFZpc2liaWxpdHkgPSBmYWxzZSkgOiAodGhpcy5zZWNvbmRWaXNpYmlsaXR5ID0gZmFsc2UpO1xuICB9XG5cbiAgY2hlY2tJZlNhZmFyaSgpIHtcbiAgICBjb25zdCBpc1NhZmFyaSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgPiAtMTtcbiAgICBjb25zdCBpc0Nocm9tZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgPiAtMTtcbiAgICBjb25zdCBpc0ZpcmVmb3ggPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0ZpcmVmb3gnKSA+IC0xO1xuICAgIGNvbnN0IGlzT3BlcmEgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09wZXJhJykgPiAtMTtcblxuICAgIGlmIChpc1NhZmFyaSAmJiAhaXNDaHJvbWUgJiYgIWlzRmlyZWZveCAmJiAhaXNPcGVyYSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyBDb250cm9sIFZhbHVlIEFjY2Vzc29yIE1ldGhvZHNcbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMucmFuZ2UgPSB2YWx1ZTtcblxuICAgIC8vIGZpeChzbGlkZXIpOiByZXNvbHZlIHByb2JsZW0gd2l0aCBub3QgbW92aW5nIHNsaWRlciBjbG91ZCB3aGVuIHNldHRpbmcgdmFsdWUgd2l0aCBbdmFsdWVdIG9yIHJlYWN0aXZlIGZvcm1zXG4gICAgLy8gTWFudWFsIGNhbGwgdGhlIG1vdmVWYWx1ZUNsb3VkIG1ldGhvZCB0byBtb3ZlIHJhbmdlIHZhbHVlIGNsb3VkIHRvIHByb3BlciBwb3NpdGlvbiBiYXNlZCBvbiB0aGUgYHZhbHVlYCB2YXJpYWJsZVxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMubW92ZVZhbHVlQ2xvdWQobmV3IEV2ZW50KCdpbnB1dCcpLCAnZmlyc3QnLCBOdW1iZXIodmFsdWUuZmlyc3QpKTtcbiAgICAgICAgdGhpcy5tb3ZlVmFsdWVDbG91ZChuZXcgRXZlbnQoJ2lucHV0JyksICdzZWNvbmQnLCBOdW1iZXIodmFsdWUuc2Vjb25kKSk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cbn1cbiJdfQ==