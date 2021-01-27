import { __decorate, __metadata } from "tslib";
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, ViewChild, ElementRef, Renderer2, Input, HostListener, forwardRef, AfterViewInit, Output, EventEmitter, ChangeDetectorRef, ViewEncapsulation, ChangeDetectionStrategy, } from '@angular/core';
export var RANGE_VALUE_ACCESOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(function () { return MdbRangeInputComponent; }),
    multi: true,
};
var MdbRangeInputComponent = /** @class */ (function () {
    function MdbRangeInputComponent(renderer, cdRef) {
        this.renderer = renderer;
        this.cdRef = cdRef;
        this.min = 0;
        this.max = 100;
        this.rangeValueChange = new EventEmitter();
        this.range = 0;
        this.cloudRange = 0;
        this.visibility = false;
        // Control Value Accessor Methods
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    MdbRangeInputComponent.prototype.onchange = function (event) {
        this.onChange(event.target.value);
    };
    MdbRangeInputComponent.prototype.oninput = function (event) {
        var value = +event.target.value;
        this.rangeValueChange.emit({ value: value });
        if (this.checkIfSafari()) {
            this.focusRangeInput();
        }
    };
    MdbRangeInputComponent.prototype.onclick = function () {
        this.focusRangeInput();
    };
    MdbRangeInputComponent.prototype.onTouchStart = function () {
        this.focusRangeInput();
    };
    MdbRangeInputComponent.prototype.onmouseleave = function () {
        if (this.checkIfSafari()) {
            this.blurRangeInput();
        }
    };
    MdbRangeInputComponent.prototype.focusRangeInput = function () {
        this.input.nativeElement.focus();
        this.visibility = true;
    };
    MdbRangeInputComponent.prototype.blurRangeInput = function () {
        this.input.nativeElement.blur();
        this.visibility = false;
    };
    MdbRangeInputComponent.prototype.coverage = function (event, value) {
        if (typeof this.range === 'string' && this.range.length !== 0) {
            return this.range;
        }
        if (!this.default) {
            // if `coverage()` is called by (input) event take value as event.target.value. If it's called manually, take value from parameter.
            // This is needed in situation, when slider value is set by default or ReactiveForms, and value clound is not moved to proper position
            var newValue = event.target ? event.target.value : value;
            var newRelativeGain = newValue - this.min;
            var inputWidth = this.input.nativeElement.offsetWidth;
            var thumbOffset = void 0;
            var offsetAmmount = 15;
            var distanceFromMiddle = newRelativeGain - this.steps / 2;
            this.stepLength = inputWidth / this.steps;
            thumbOffset = (distanceFromMiddle / this.steps) * offsetAmmount;
            this.cloudRange = this.stepLength * newRelativeGain - thumbOffset;
            this.renderer.setStyle(this.rangeCloud.nativeElement, 'left', this.cloudRange + 'px');
        }
    };
    MdbRangeInputComponent.prototype.checkIfSafari = function () {
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
    MdbRangeInputComponent.prototype.ngAfterViewInit = function () {
        this.steps = this.max - this.min;
        if (this.value) {
            this.range = Number(this.value);
            // fix(slider): resolve problem with not moving slider cloud when setting value with [value] or reactive forms
            // Manual call the coverage method to move range value cloud to proper position based on the `value` variable
            this.coverage(new Event('input'), this.value);
            this.cdRef.detectChanges();
        }
    };
    MdbRangeInputComponent.prototype.writeValue = function (value) {
        var _this = this;
        this.value = value;
        // fix(slider): resolve problem with not moving slider cloud when setting value with [value] or reactive forms
        // Manual call the coverage method to move range value cloud to proper position based on the `value` variable
        setTimeout(function () {
            _this.coverage(new Event('input'), value);
        }, 0);
    };
    MdbRangeInputComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    MdbRangeInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    MdbRangeInputComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    MdbRangeInputComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        ViewChild('input'),
        __metadata("design:type", ElementRef)
    ], MdbRangeInputComponent.prototype, "input", void 0);
    __decorate([
        ViewChild('rangeCloud'),
        __metadata("design:type", ElementRef)
    ], MdbRangeInputComponent.prototype, "rangeCloud", void 0);
    __decorate([
        ViewChild('rangeField'),
        __metadata("design:type", ElementRef)
    ], MdbRangeInputComponent.prototype, "rangeField", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbRangeInputComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MdbRangeInputComponent.prototype, "required", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbRangeInputComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbRangeInputComponent.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MdbRangeInputComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbRangeInputComponent.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbRangeInputComponent.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MdbRangeInputComponent.prototype, "step", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MdbRangeInputComponent.prototype, "default", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbRangeInputComponent.prototype, "defaultRangeCounterClass", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MdbRangeInputComponent.prototype, "rangeValueChange", void 0);
    __decorate([
        HostListener('change', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MdbRangeInputComponent.prototype, "onchange", null);
    __decorate([
        HostListener('input', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MdbRangeInputComponent.prototype, "oninput", null);
    __decorate([
        HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MdbRangeInputComponent.prototype, "onclick", null);
    __decorate([
        HostListener('touchstart'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MdbRangeInputComponent.prototype, "onTouchStart", null);
    __decorate([
        HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MdbRangeInputComponent.prototype, "onmouseleave", null);
    MdbRangeInputComponent = __decorate([
        Component({
            selector: 'mdb-range-input',
            template: "<div *ngIf=\"!default\" class=\"range-field\" #rangeField>\n  <div class=\"track\">\n    <div\n      #rangeCloud\n      class=\"range-cloud\"\n      title=\"range\"\n      [ngClass]=\"{ visible: this.visibility, hidden: !this.visibility }\"\n    >\n      <span class=\"text-transform\">{{ range }}</span>\n    </div>\n  </div>\n  <input\n    #input\n    [name]=\"name\"\n    type=\"range\"\n    [disabled]=\"disabled\"\n    [id]=\"id\"\n    [min]=\"min\"\n    [max]=\"max\"\n    [step]=\"step\"\n    [value]=\"value\"\n    [(ngModel)]=\"range\"\n    (focus)=\"this.visibility = true\"\n    (blur)=\"this.visibility = false\"\n    (input)=\"coverage($event)\"\n  />\n</div>\n\n<div *ngIf=\"default\">\n  <input\n    #input\n    class=\"custom-range\"\n    [name]=\"name\"\n    type=\"range\"\n    [id]=\"id\"\n    [min]=\"min\"\n    [max]=\"max\"\n    [step]=\"step\"\n    [attr.value]=\"value\"\n    [value]=\"value\"\n    [(ngModel)]=\"range\"\n    (focus)=\"this.visibility = true\"\n    (blur)=\"this.visibility = false\"\n    (input)=\"coverage($event)\"\n    (touchend)=\"blurRangeInput()\"\n  />\n  <span class=\"{{ defaultRangeCounterClass }}\">{{ range }}</span>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [RANGE_VALUE_ACCESOR],
            styles: [".range-field input[type=range]{cursor:pointer;position:relative;background-color:transparent;border:1px solid #fff;outline:0;width:100%;margin:15px 0;padding:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}.range-field input[type=range]:focus{outline:0}.range-field input[type=range]+.thumb{position:absolute;border:none;height:0;width:0;border-radius:50%;background-color:#4285f4;top:10px;margin-left:-6px;transform-origin:50% 50%;transform:rotate(-45deg)}.range-field input[type=range]+.thumb .value{display:block;width:30px;text-align:center;color:#4285f4;font-size:0;transform:rotate(45deg)}.range-field input[type=range]+.thumb.active{border-radius:50% 50% 50% 0}.range-field input[type=range]+.thumb.active .value{color:#fff;margin-left:-1px;margin-top:8px;font-size:10px}.range-field input[type=range]::-webkit-slider-runnable-track{height:3px;background:#c2c0c2;border:none}.range-field input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;border:none;height:14px;width:14px;border-radius:50%;background-color:#4285f4;transform-origin:50% 50%;margin:-5px 0 0;-webkit-transition:.3s;transition:.3s}.range-field input[type=range]:focus::-webkit-slider-runnable-track{background:#ccc}.range-field input[type=range]::-moz-range-track{height:3px;background:#c2c0c2;border:none}.range-field input[type=range]::-moz-range-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#4285f4;margin-top:-5px}.range-field input[type=range]:-moz-focusring{outline:#fff solid 1px;outline-offset:-1px}.range-field input[type=range]:focus::-moz-range-track{background:#c2c0c2}.range-field input[type=range]::-ms-track{height:3px;background:0 0;border-color:transparent;border-width:6px 0;color:transparent}.range-field input[type=range]::-ms-fill-lower{background:#c2c0c2}.range-field input[type=range]::-ms-fill-upper{background:#c2c0c2}.range-field input[type=range]::-ms-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#4285f4}.range-field input[type=range]:focus::-ms-fill-lower{background:#c2c0c2}.range-field input[type=range]:focus::-ms-fill-upper{background:#c2c0c2}@supports (--css:variables){input[type=range].mdbMultiRange{padding:0;margin:0;display:inline-block;vertical-align:top}input[type=range].mdbMultiRange.original{position:absolute}input[type=range].mdbMultiRange.original::-webkit-slider-thumb{position:relative;z-index:2}input[type=range].mdbMultiRange.original::-moz-range-thumb{transform:scale(1);z-index:1}input[type=range].mdbMultiRange::-moz-range-track{border-color:transparent}input[type=range].mdbMultiRange.ghost{position:relative}input[type=range].mdbMultiRange.ghost:nth-of-type(n+1){position:absolute}}.multi-range-field{position:relative}.multi-range-field input[type=range]{cursor:pointer;position:relative;background-color:transparent;border:1px solid #fff;outline:0;width:100%;margin:15px 0;padding:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}.multi-range-field input[type=range]:focus{outline:0}.multi-range-field input[type=range]+.thumb{position:absolute;border:none;height:0;width:0;border-radius:50%;background-color:#4285f4;top:10px;margin-left:-6px;transform-origin:50% 50%;transform:rotate(-45deg)}.multi-range-field input[type=range]+.thumb .value{display:block;width:30px;text-align:center;color:#4285f4;font-size:0;transform:rotate(45deg)}.multi-range-field input[type=range]+.thumb.active{border-radius:50% 50% 50% 0}.multi-range-field input[type=range]+.thumb.active .value{color:#fff;margin-left:-1px;margin-top:8px;font-size:10px}.multi-range-field input[type=range]::-webkit-slider-runnable-track{height:3px;background:#c2c0c2;border:none}.multi-range-field input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;border:none;height:14px;width:14px;border-radius:50%;background-color:#4285f4;transform-origin:50% 50%;margin:-5px 0 0;-webkit-transition:.3s;transition:.3s}.multi-range-field input[type=range]:focus::-webkit-slider-runnable-track{background:#ccc}.multi-range-field input[type=range]::-moz-range-track{height:3px;background:#c2c0c2;border:none}.multi-range-field input[type=range]::-moz-range-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#4285f4;margin-top:-5px}.multi-range-field input[type=range]:-moz-focusring{outline:#fff solid 1px;outline-offset:-1px}.multi-range-field input[type=range]:focus::-moz-range-track{background:#c2c0c2}.multi-range-field input[type=range]::-ms-track{height:3px;background:0 0;border-color:transparent;border-width:6px 0;color:transparent}.multi-range-field input[type=range]::-ms-fill-lower{background:#c2c0c2}.multi-range-field input[type=range]::-ms-fill-upper{background:#c2c0c2}.multi-range-field input[type=range]::-ms-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#4285f4}.multi-range-field input[type=range]:focus::-ms-fill-lower{background:#c2c0c2}.multi-range-field input[type=range]:focus::-ms-fill-upper{background:#c2c0c2}.thumb-horizontal-wrapper{position:relative;transform:rotate(-270deg);top:500px}.multi-range-field input[type=range]+.thumb-horizontal .value{transform:rotate(315deg)!important}.range-field{position:relative}.range-field .track{position:absolute;right:8px;left:8px;margin-left:-7.5px}.range-field .track .range-cloud{height:30px;width:30px;top:-25px;background-color:#4285f4;position:absolute;color:#fff;border-radius:50%;font-size:12px;transform:translateX(-50%)}.range-field .track .range-cloud:after{content:\"\";position:absolute;bottom:0;left:50%;transform:translate(-50%,70%);width:0;height:0;border-style:solid;border-width:7px 7px 0;border-color:#4285f4 transparent transparent}.range-field .track .range-cloud.hidden{display:none}.range-field .track .range-cloud.visible{display:block}.range-field .track .range-cloud .text-transform{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}"]
        }),
        __metadata("design:paramtypes", [Renderer2, ChangeDetectorRef])
    ], MdbRangeInputComponent);
    return MdbRangeInputComponent;
}());
export { MdbRangeInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXJhbmdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vcmFuZ2UvbWRiLXJhbmdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixTQUFTLEVBQ1QsS0FBSyxFQUNMLFlBQVksRUFDWixVQUFVLEVBQ1YsYUFBYSxFQUNiLE1BQU0sRUFDTixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQix1QkFBdUIsR0FDeEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsTUFBTSxDQUFDLElBQU0sbUJBQW1CLEdBQVE7SUFDdEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixrREFBa0Q7SUFDbEQsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsc0JBQXNCLEVBQXRCLENBQXNCLENBQUM7SUFDckQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBVUY7SUFtREUsZ0NBQW9CLFFBQW1CLEVBQVUsS0FBd0I7UUFBckQsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBekNoRSxRQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1IsUUFBRyxHQUFHLEdBQUcsQ0FBQztRQUtULHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFckQsVUFBSyxHQUFRLENBQUMsQ0FBQztRQUdmLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBNkZuQixpQ0FBaUM7UUFDakMsYUFBUSxHQUFHLFVBQUMsQ0FBTSxJQUFNLENBQUMsQ0FBQztRQUMxQixjQUFTLEdBQUcsY0FBTyxDQUFDLENBQUM7SUFsRXVELENBQUM7SUEzQnpDLHlDQUFR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O1FBQTNCLFlBQVksQ0FBQyxZQUFZLENBQUM7Ozs7OERBSTFCO0lBakRVLHNCQUFzQjtRQVJsQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLHdxQ0FBeUM7WUFFekMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07WUFDL0MsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7O1NBQ2pDLENBQUM7eUNBb0Q4QixTQUFTLEVBQWlCLGlCQUFpQjtPQW5EOUQsc0JBQXNCLENBNElsQztJQUFELDZCQUFDO0NBQUEsQUE1SUQsSUE0SUM7U0E1SVksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIFJlbmRlcmVyMixcbiAgSW5wdXQsXG4gIEhvc3RMaXN0ZW5lcixcbiAgZm9yd2FyZFJlZixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgUkFOR0VfVkFMVUVfQUNDRVNPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11c2UtYmVmb3JlLWRlY2xhcmVcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWRiUmFuZ2VJbnB1dENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLXJhbmdlLWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL21kYi1yYW5nZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3JhbmdlLW1vZHVsZS5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtSQU5HRV9WQUxVRV9BQ0NFU09SXSxcbn0pXG5leHBvcnQgY2xhc3MgTWRiUmFuZ2VJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnaW5wdXQnKSBpbnB1dDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgncmFuZ2VDbG91ZCcpIHJhbmdlQ2xvdWQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3JhbmdlRmllbGQnKSByYW5nZUZpZWxkOiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHZhbHVlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBtaW4gPSAwO1xuICBASW5wdXQoKSBtYXggPSAxMDA7XG4gIEBJbnB1dCgpIHN0ZXA6IG51bWJlcjtcbiAgQElucHV0KCkgZGVmYXVsdDogYm9vbGVhbjtcbiAgQElucHV0KCkgZGVmYXVsdFJhbmdlQ291bnRlckNsYXNzOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIHJhbmdlVmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICByYW5nZTogYW55ID0gMDtcbiAgc3RlcExlbmd0aDogbnVtYmVyO1xuICBzdGVwczogbnVtYmVyO1xuICBjbG91ZFJhbmdlID0gMDtcbiAgdmlzaWJpbGl0eSA9IGZhbHNlO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScsIFsnJGV2ZW50J10pIG9uY2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pIG9uaW5wdXQoZXZlbnQ6IGFueSkge1xuICAgIGNvbnN0IHZhbHVlOiBudW1iZXIgPSArZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMucmFuZ2VWYWx1ZUNoYW5nZS5lbWl0KHsgdmFsdWU6IHZhbHVlIH0pO1xuXG4gICAgaWYgKHRoaXMuY2hlY2tJZlNhZmFyaSgpKSB7XG4gICAgICB0aGlzLmZvY3VzUmFuZ2VJbnB1dCgpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgb25jbGljaygpIHtcbiAgICB0aGlzLmZvY3VzUmFuZ2VJbnB1dCgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigndG91Y2hzdGFydCcpIG9uVG91Y2hTdGFydCgpIHtcbiAgICB0aGlzLmZvY3VzUmFuZ2VJbnB1dCgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpIG9ubW91c2VsZWF2ZSgpIHtcbiAgICBpZiAodGhpcy5jaGVja0lmU2FmYXJpKCkpIHtcbiAgICAgIHRoaXMuYmx1clJhbmdlSW5wdXQoKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIGZvY3VzUmFuZ2VJbnB1dCgpIHtcbiAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB0aGlzLnZpc2liaWxpdHkgPSB0cnVlO1xuICB9XG5cbiAgYmx1clJhbmdlSW5wdXQoKSB7XG4gICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgICB0aGlzLnZpc2liaWxpdHkgPSBmYWxzZTtcbiAgfVxuXG4gIGNvdmVyYWdlKGV2ZW50OiBhbnksIHZhbHVlPzogYW55KSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnJhbmdlID09PSAnc3RyaW5nJyAmJiB0aGlzLnJhbmdlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMucmFuZ2U7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmRlZmF1bHQpIHtcbiAgICAgIC8vIGlmIGBjb3ZlcmFnZSgpYCBpcyBjYWxsZWQgYnkgKGlucHV0KSBldmVudCB0YWtlIHZhbHVlIGFzIGV2ZW50LnRhcmdldC52YWx1ZS4gSWYgaXQncyBjYWxsZWQgbWFudWFsbHksIHRha2UgdmFsdWUgZnJvbSBwYXJhbWV0ZXIuXG4gICAgICAvLyBUaGlzIGlzIG5lZWRlZCBpbiBzaXR1YXRpb24sIHdoZW4gc2xpZGVyIHZhbHVlIGlzIHNldCBieSBkZWZhdWx0IG9yIFJlYWN0aXZlRm9ybXMsIGFuZCB2YWx1ZSBjbG91bmQgaXMgbm90IG1vdmVkIHRvIHByb3BlciBwb3NpdGlvblxuICAgICAgY29uc3QgbmV3VmFsdWUgPSBldmVudC50YXJnZXQgPyBldmVudC50YXJnZXQudmFsdWUgOiB2YWx1ZTtcbiAgICAgIGNvbnN0IG5ld1JlbGF0aXZlR2FpbiA9IG5ld1ZhbHVlIC0gdGhpcy5taW47XG4gICAgICBjb25zdCBpbnB1dFdpZHRoID0gdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuXG4gICAgICBsZXQgdGh1bWJPZmZzZXQ6IG51bWJlcjtcbiAgICAgIGNvbnN0IG9mZnNldEFtbW91bnQgPSAxNTtcbiAgICAgIGNvbnN0IGRpc3RhbmNlRnJvbU1pZGRsZSA9IG5ld1JlbGF0aXZlR2FpbiAtIHRoaXMuc3RlcHMgLyAyO1xuXG4gICAgICB0aGlzLnN0ZXBMZW5ndGggPSBpbnB1dFdpZHRoIC8gdGhpcy5zdGVwcztcblxuICAgICAgdGh1bWJPZmZzZXQgPSAoZGlzdGFuY2VGcm9tTWlkZGxlIC8gdGhpcy5zdGVwcykgKiBvZmZzZXRBbW1vdW50O1xuICAgICAgdGhpcy5jbG91ZFJhbmdlID0gdGhpcy5zdGVwTGVuZ3RoICogbmV3UmVsYXRpdmVHYWluIC0gdGh1bWJPZmZzZXQ7XG5cbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5yYW5nZUNsb3VkLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgdGhpcy5jbG91ZFJhbmdlICsgJ3B4Jyk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tJZlNhZmFyaSgpIHtcbiAgICBjb25zdCBpc1NhZmFyaSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgPiAtMTtcbiAgICBjb25zdCBpc0Nocm9tZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgPiAtMTtcbiAgICBjb25zdCBpc0ZpcmVmb3ggPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0ZpcmVmb3gnKSA+IC0xO1xuICAgIGNvbnN0IGlzT3BlcmEgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09wZXJhJykgPiAtMTtcblxuICAgIGlmIChpc1NhZmFyaSAmJiAhaXNDaHJvbWUgJiYgIWlzRmlyZWZveCAmJiAhaXNPcGVyYSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zdGVwcyA9IHRoaXMubWF4IC0gdGhpcy5taW47XG5cbiAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy5yYW5nZSA9IE51bWJlcih0aGlzLnZhbHVlKTtcblxuICAgICAgLy8gZml4KHNsaWRlcik6IHJlc29sdmUgcHJvYmxlbSB3aXRoIG5vdCBtb3Zpbmcgc2xpZGVyIGNsb3VkIHdoZW4gc2V0dGluZyB2YWx1ZSB3aXRoIFt2YWx1ZV0gb3IgcmVhY3RpdmUgZm9ybXNcbiAgICAgIC8vIE1hbnVhbCBjYWxsIHRoZSBjb3ZlcmFnZSBtZXRob2QgdG8gbW92ZSByYW5nZSB2YWx1ZSBjbG91ZCB0byBwcm9wZXIgcG9zaXRpb24gYmFzZWQgb24gdGhlIGB2YWx1ZWAgdmFyaWFibGVcbiAgICAgIHRoaXMuY292ZXJhZ2UobmV3IEV2ZW50KCdpbnB1dCcpLCB0aGlzLnZhbHVlKTtcblxuICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ29udHJvbCBWYWx1ZSBBY2Nlc3NvciBNZXRob2RzXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgIC8vIGZpeChzbGlkZXIpOiByZXNvbHZlIHByb2JsZW0gd2l0aCBub3QgbW92aW5nIHNsaWRlciBjbG91ZCB3aGVuIHNldHRpbmcgdmFsdWUgd2l0aCBbdmFsdWVdIG9yIHJlYWN0aXZlIGZvcm1zXG4gICAgLy8gTWFudWFsIGNhbGwgdGhlIGNvdmVyYWdlIG1ldGhvZCB0byBtb3ZlIHJhbmdlIHZhbHVlIGNsb3VkIHRvIHByb3BlciBwb3NpdGlvbiBiYXNlZCBvbiB0aGUgYHZhbHVlYCB2YXJpYWJsZVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jb3ZlcmFnZShuZXcgRXZlbnQoJ2lucHV0JyksIHZhbHVlKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxufVxuIl19