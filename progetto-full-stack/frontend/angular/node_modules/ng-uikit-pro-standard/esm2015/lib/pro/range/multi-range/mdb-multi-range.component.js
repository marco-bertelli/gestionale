import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, Renderer2, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const RANGE_VALUE_ACCESOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => MdbMultiRangeInputComponent),
    multi: true,
};
export class MdbMultiRangeInputComponent {
    constructor(renderer) {
        this.renderer = renderer;
        this.value = { first: 0, second: 0 };
        this.min = 0;
        this.max = 100;
        this.rangeValueChange = new EventEmitter();
        this.firstVisibility = false;
        this.secondVisibility = false;
        this.cloudRange = 0;
        // Control Value Accessor Methods
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    ngOnInit() {
        this.range = this.value;
    }
    ngAfterViewInit() {
        this.steps = this.max - this.min;
        // fix(slider): resolve problem with not moving slider cloud when setting value with [value] or reactive forms
        // Manual call the moveValueCloud method to move range value cloud to proper position based on the `value` variable
        if (this.value) {
            this.moveValueCloud(new Event('input'), 'first', Number(this.value.first));
            this.moveValueCloud(new Event('input'), 'second', Number(this.value.second));
        }
    }
    firstRangeInput(event) {
        this.rangeValueChange.emit(this.range);
        if (typeof this.range === 'object' && this.range.first === 0) {
            return this.range;
        }
        this.focusRangeInput('first');
        this.moveValueCloud(event, 'first');
    }
    secondRangeInput(event) {
        this.rangeValueChange.emit(this.range);
        if (typeof this.range === 'object' && this.range.second === 0) {
            return this.range;
        }
        this.focusRangeInput('second');
        this.moveValueCloud(event, 'second');
    }
    moveValueCloud(event, element, value) {
        // if `moveValueCloud()` is called by (input) event take value as event.target.value.
        // If it's called manually, take value from parameter.
        // This is needed in situation, when slider value is set by default or ReactiveForms,
        // and value clound is not moved to proper position
        const newValue = event.target ? event.target.value : value;
        const newRelativeGain = newValue - this.min;
        const inputWidth = element === 'first'
            ? this.firstInput.nativeElement.offsetWidth
            : this.secondInput.nativeElement.offsetWidth;
        let thumbOffset = 0;
        const offsetAmmount = 15;
        const distanceFromMiddle = newRelativeGain - this.steps / 2;
        this.stepLength = inputWidth / this.steps;
        thumbOffset = (distanceFromMiddle / this.steps) * offsetAmmount;
        this.cloudRange = this.stepLength * newRelativeGain - thumbOffset;
        this.renderer.setStyle(element === 'first'
            ? this.firstRangeCloud.nativeElement
            : this.secondRangeCloud.nativeElement, 'left', this.cloudRange + 'px');
    }
    focusRangeInput(element) {
        if (this.checkIfSafari()) {
            element === 'first'
                ? this.firstInput.nativeElement.focus()
                : this.secondInput.nativeElement.focus();
        }
        element === 'first' ? (this.firstVisibility = true) : (this.secondVisibility = true);
    }
    blurRangeInput(element) {
        if (this.checkIfSafari()) {
            element === 'first'
                ? this.firstInput.nativeElement.blur()
                : this.secondInput.nativeElement.blur();
        }
        element === 'first' ? (this.firstVisibility = false) : (this.secondVisibility = false);
    }
    checkIfSafari() {
        const isSafari = navigator.userAgent.indexOf('Safari') > -1;
        const isChrome = navigator.userAgent.indexOf('Chrome') > -1;
        const isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
        const isOpera = navigator.userAgent.indexOf('Opera') > -1;
        if (isSafari && !isChrome && !isFirefox && !isOpera) {
            return true;
        }
        else {
            return false;
        }
    }
    writeValue(value) {
        this.value = value;
        this.range = value;
        // fix(slider): resolve problem with not moving slider cloud when setting value with [value] or reactive forms
        // Manual call the moveValueCloud method to move range value cloud to proper position based on the `value` variable
        if (value) {
            setTimeout(() => {
                this.moveValueCloud(new Event('input'), 'first', Number(value.first));
                this.moveValueCloud(new Event('input'), 'second', Number(value.second));
            }, 0);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
MdbMultiRangeInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-multi-range-input',
                template: "<div class=\"multi-range-field my-5 pb-5\">\n  <div class=\"range-field\" #rangeField>\n    <div class=\"track\">\n      <div #firstRangeCloud class=\"range-cloud\" title=\"range\"\n           [ngClass]=\"{'visible': this.firstVisibility, 'hidden': !this.firstVisibility}\">\n        <span class=\"text-transform\">{{range.first}}</span>\n      </div>\n    </div>\n    <input #firstInput\n           [value]=\"value.first\"\n           [attr.value]=\"value.first\"\n           [name]=\"name\"\n           [id]=\"id\"\n           [min]=\"min\"\n           [max]=\"max\"\n           [step]=\"step\"\n           [disabled]=\"disabled\"\n           type=\"range\"\n           class=\"mdbMultiRange original active\"\n           (input)=\"firstRangeInput($event)\"\n           [(ngModel)]=\"range.first\"\n           (focus)=\"this.firstVisibility = true\"\n           (blur)=\"this.firstVisibility = false; blurRangeInput('first')\"\n           (touchend)=\"blurRangeInput('first')\"\n           (click)=\"focusRangeInput('first')\">\n\n\n    <div class=\"track\">\n      <div #secondRangeCloud class=\"range-cloud\" title=\"range\"\n           [ngClass]=\"{'visible': this.secondVisibility, 'hidden': !this.secondVisibility}\">\n        <span class=\"text-transform\">{{range.second}}</span>\n      </div>\n    </div>\n    <input #secondInput\n           [value]=\"value.second\"\n           [attr.value]=\"value.second\"\n           [name]=\"name\"\n           [id]=\"id\"\n           [min]=\"min\"\n           [max]=\"max\"\n           [step]=\"step\"\n           [disabled]=\"disabled\"\n           type=\"range\"\n           class=\"mdbMultiRange original ghost active\"\n           (input)=\"secondRangeInput($event)\"\n           [(ngModel)]=\"range.second\"\n           (focus)=\"this.secondVisibility = true\"\n           (blur)=\"this.secondVisibility = false; blurRangeInput('second')\"\n           (touchend)=\"blurRangeInput('second')\"\n           (click)=\"focusRangeInput('second')\">\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                providers: [RANGE_VALUE_ACCESOR],
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".range-field input[type=range]{-moz-appearance:none;-webkit-appearance:none;appearance:none;background-color:transparent;border:1px solid #fff;cursor:pointer;margin:15px 0;outline:none;padding:0;position:relative;width:100%}.range-field input[type=range]:focus{outline:none}.range-field input[type=range]+.thumb{background-color:#4285f4;border:none;border-radius:50%;height:0;margin-left:-6px;position:absolute;top:10px;transform:rotate(-45deg);transform-origin:50% 50%;width:0}.range-field input[type=range]+.thumb .value{color:#4285f4;display:block;font-size:0;text-align:center;transform:rotate(45deg);width:30px}.range-field input[type=range]+.thumb.active{border-radius:50% 50% 50% 0}.range-field input[type=range]+.thumb.active .value{color:#fff;font-size:10px;margin-left:-1px;margin-top:8px}.range-field input[type=range]::-webkit-slider-runnable-track{background:#c2c0c2;border:none;height:3px}.range-field input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;-webkit-transition:.3s;appearance:none;background-color:#4285f4;border:none;border-radius:50%;height:14px;margin:-5px 0 0;transform-origin:50% 50%;transition:.3s;width:14px}.range-field input[type=range]:focus::-webkit-slider-runnable-track{background:#ccc}.range-field input[type=range]::-moz-range-track{background:#c2c0c2;border:none;height:3px}.range-field input[type=range]::-moz-range-thumb{background:#4285f4;border:none;border-radius:50%;height:14px;margin-top:-5px;width:14px}.range-field input[type=range]:-moz-focusring{outline:1px solid #fff;outline-offset:-1px}.range-field input[type=range]:focus::-moz-range-track{background:#c2c0c2}.range-field input[type=range]::-ms-track{background:transparent;border-color:transparent;border-width:6px 0;color:transparent;height:3px}.range-field input[type=range]::-ms-fill-lower,.range-field input[type=range]::-ms-fill-upper{background:#c2c0c2}.range-field input[type=range]::-ms-thumb{background:#4285f4;border:none;border-radius:50%;height:14px;width:14px}.range-field input[type=range]:focus::-ms-fill-lower,.range-field input[type=range]:focus::-ms-fill-upper{background:#c2c0c2}@supports (--css:variables){input[type=range].mdbMultiRange{display:inline-block;margin:0;padding:0;vertical-align:top}input[type=range].mdbMultiRange.original{position:absolute}input[type=range].mdbMultiRange.original::-webkit-slider-thumb{position:relative;z-index:2}input[type=range].mdbMultiRange.original::-moz-range-thumb{transform:scale(1);z-index:1}input[type=range].mdbMultiRange::-moz-range-track{border-color:transparent}input[type=range].mdbMultiRange.ghost{position:relative}input[type=range].mdbMultiRange.ghost:nth-of-type(n+1){position:absolute}}.multi-range-field{position:relative}.multi-range-field input[type=range]{-moz-appearance:none;-webkit-appearance:none;appearance:none;background-color:transparent;border:1px solid #fff;cursor:pointer;margin:15px 0;outline:none;padding:0;position:relative;width:100%}.multi-range-field input[type=range]:focus{outline:none}.multi-range-field input[type=range]+.thumb{background-color:#4285f4;border:none;border-radius:50%;height:0;margin-left:-6px;position:absolute;top:10px;transform:rotate(-45deg);transform-origin:50% 50%;width:0}.multi-range-field input[type=range]+.thumb .value{color:#4285f4;display:block;font-size:0;text-align:center;transform:rotate(45deg);width:30px}.multi-range-field input[type=range]+.thumb.active{border-radius:50% 50% 50% 0}.multi-range-field input[type=range]+.thumb.active .value{color:#fff;font-size:10px;margin-left:-1px;margin-top:8px}.multi-range-field input[type=range]::-webkit-slider-runnable-track{background:#c2c0c2;border:none;height:3px}.multi-range-field input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;-webkit-transition:.3s;appearance:none;background-color:#4285f4;border:none;border-radius:50%;height:14px;margin:-5px 0 0;transform-origin:50% 50%;transition:.3s;width:14px}.multi-range-field input[type=range]:focus::-webkit-slider-runnable-track{background:#ccc}.multi-range-field input[type=range]::-moz-range-track{background:#c2c0c2;border:none;height:3px}.multi-range-field input[type=range]::-moz-range-thumb{background:#4285f4;border:none;border-radius:50%;height:14px;margin-top:-5px;width:14px}.multi-range-field input[type=range]:-moz-focusring{outline:1px solid #fff;outline-offset:-1px}.multi-range-field input[type=range]:focus::-moz-range-track{background:#c2c0c2}.multi-range-field input[type=range]::-ms-track{background:transparent;border-color:transparent;border-width:6px 0;color:transparent;height:3px}.multi-range-field input[type=range]::-ms-fill-lower,.multi-range-field input[type=range]::-ms-fill-upper{background:#c2c0c2}.multi-range-field input[type=range]::-ms-thumb{background:#4285f4;border:none;border-radius:50%;height:14px;width:14px}.multi-range-field input[type=range]:focus::-ms-fill-lower,.multi-range-field input[type=range]:focus::-ms-fill-upper{background:#c2c0c2}.thumb-horizontal-wrapper{position:relative;top:500px;transform:rotate(-270deg)}.multi-range-field input[type=range]+.thumb-horizontal .value{transform:rotate(315deg)!important}.range-field{position:relative}.range-field .track{left:8px;margin-left:-7.5px;position:absolute;right:8px}.range-field .track .range-cloud{background-color:#4285f4;border-radius:50%;color:#fff;font-size:12px;height:30px;position:absolute;top:-25px;transform:translateX(-50%);width:30px}.range-field .track .range-cloud:after{border-color:#4285f4 transparent transparent;border-style:solid;border-width:7px 7px 0;bottom:0;content:\"\";height:0;left:50%;position:absolute;transform:translate(-50%,70%);width:0}.range-field .track .range-cloud.hidden{display:none}.range-field .track .range-cloud.visible{display:block}.range-field .track .range-cloud .text-transform{left:50%;position:absolute;top:50%;transform:translate(-50%,-50%)}"]
            },] }
];
MdbMultiRangeInputComponent.ctorParameters = () => [
    { type: Renderer2 }
];
MdbMultiRangeInputComponent.propDecorators = {
    id: [{ type: Input }],
    required: [{ type: Input }],
    name: [{ type: Input }],
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    step: [{ type: Input }],
    rangeValueChange: [{ type: Output }],
    firstInput: [{ type: ViewChild, args: ['firstInput', { static: true },] }],
    secondInput: [{ type: ViewChild, args: ['secondInput', { static: true },] }],
    firstRangeCloud: [{ type: ViewChild, args: ['firstRangeCloud', { static: true },] }],
    secondRangeCloud: [{ type: ViewChild, args: ['secondRangeCloud', { static: true },] }],
    rangeField: [{ type: ViewChild, args: ['rangeField', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLW11bHRpLXJhbmdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXVpa2l0LXByby1zdGFuZGFyZC9zcmMvbGliL3Byby9yYW5nZS9tdWx0aS1yYW5nZS9tZGItbXVsdGktcmFuZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUdqQix1QkFBdUIsR0FDeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFRO0lBQ3RDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsa0RBQWtEO0lBQ2xELFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsMkJBQTJCLENBQUM7SUFDMUQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBVUYsTUFBTSxPQUFPLDJCQUEyQjtJQTBCdEMsWUFBb0IsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXRCOUIsVUFBSyxHQUF3RCxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBRXJGLFFBQUcsR0FBRyxDQUFDLENBQUM7UUFDUixRQUFHLEdBQUcsR0FBRyxDQUFDO1FBR1QscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQXFDLENBQUM7UUFZbkYsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLGVBQVUsR0FBRyxDQUFDLENBQUM7UUF1R2YsaUNBQWlDO1FBQ2pDLGFBQVEsR0FBRyxDQUFDLENBQU0sRUFBRSxF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QUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBb0I7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQWM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQzdCLENBQUM7OztZQW5LRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsNCtEQUE2QztnQkFFN0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2dCQUNoQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7OztZQXZCQyxTQUFTOzs7aUJBeUJSLEtBQUs7dUJBQ0wsS0FBSzttQkFDTCxLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSztrQkFDTCxLQUFLO2tCQUNMLEtBQUs7bUJBQ0wsS0FBSzsrQkFFTCxNQUFNO3lCQUVOLFNBQVMsU0FBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzBCQUN4QyxTQUFTLFNBQUMsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs4QkFDekMsU0FBUyxTQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTsrQkFDN0MsU0FBUyxTQUFDLGtCQUFrQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTt5QkFDOUMsU0FBUyxTQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBPbkluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IFJBTkdFX1ZBTFVFX0FDQ0VTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdXNlLWJlZm9yZS1kZWNsYXJlXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1kYk11bHRpUmFuZ2VJbnB1dENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLW11bHRpLXJhbmdlLWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICdtZGItbXVsdGktcmFuZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi8uLi9yYW5nZS1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFtSQU5HRV9WQUxVRV9BQ0NFU09SXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kYk11bHRpUmFuZ2VJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSB2YWx1ZTogeyBmaXJzdDogbnVtYmVyIHwgc3RyaW5nOyBzZWNvbmQ6IG51bWJlciB8IHN0cmluZyB9ID0geyBmaXJzdDogMCwgc2Vjb25kOiAwIH07XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBtaW4gPSAwO1xuICBASW5wdXQoKSBtYXggPSAxMDA7XG4gIEBJbnB1dCgpIHN0ZXA6IG51bWJlcjtcblxuICBAT3V0cHV0KCkgcmFuZ2VWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBmaXJzdDogbnVtYmVyOyBzZWNvbmQ6IG51bWJlciB9PigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2ZpcnN0SW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBmaXJzdElucHV0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzZWNvbmRJbnB1dCcsIHsgc3RhdGljOiB0cnVlIH0pIHNlY29uZElucHV0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdmaXJzdFJhbmdlQ2xvdWQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBmaXJzdFJhbmdlQ2xvdWQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3NlY29uZFJhbmdlQ2xvdWQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBzZWNvbmRSYW5nZUNsb3VkOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdyYW5nZUZpZWxkJywgeyBzdGF0aWM6IHRydWUgfSkgcmFuZ2VGaWVsZDogRWxlbWVudFJlZjtcblxuICByYW5nZTogYW55O1xuXG4gIHN0ZXBzOiBudW1iZXI7XG4gIHN0ZXBMZW5ndGg6IG51bWJlcjtcbiAgZmlyc3RWaXNpYmlsaXR5ID0gZmFsc2U7XG4gIHNlY29uZFZpc2liaWxpdHkgPSBmYWxzZTtcbiAgY2xvdWRSYW5nZSA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucmFuZ2UgPSB0aGlzLnZhbHVlO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc3RlcHMgPSB0aGlzLm1heCAtIHRoaXMubWluO1xuXG4gICAgLy8gZml4KHNsaWRlcik6IHJlc29sdmUgcHJvYmxlbSB3aXRoIG5vdCBtb3Zpbmcgc2xpZGVyIGNsb3VkIHdoZW4gc2V0dGluZyB2YWx1ZSB3aXRoIFt2YWx1ZV0gb3IgcmVhY3RpdmUgZm9ybXNcbiAgICAvLyBNYW51YWwgY2FsbCB0aGUgbW92ZVZhbHVlQ2xvdWQgbWV0aG9kIHRvIG1vdmUgcmFuZ2UgdmFsdWUgY2xvdWQgdG8gcHJvcGVyIHBvc2l0aW9uIGJhc2VkIG9uIHRoZSBgdmFsdWVgIHZhcmlhYmxlXG4gICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMubW92ZVZhbHVlQ2xvdWQobmV3IEV2ZW50KCdpbnB1dCcpLCAnZmlyc3QnLCBOdW1iZXIodGhpcy52YWx1ZS5maXJzdCkpO1xuICAgICAgdGhpcy5tb3ZlVmFsdWVDbG91ZChuZXcgRXZlbnQoJ2lucHV0JyksICdzZWNvbmQnLCBOdW1iZXIodGhpcy52YWx1ZS5zZWNvbmQpKTtcbiAgICB9XG4gIH1cblxuICBmaXJzdFJhbmdlSW5wdXQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMucmFuZ2VWYWx1ZUNoYW5nZS5lbWl0KHRoaXMucmFuZ2UpO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnJhbmdlID09PSAnb2JqZWN0JyAmJiB0aGlzLnJhbmdlLmZpcnN0ID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5yYW5nZTtcbiAgICB9XG5cbiAgICB0aGlzLmZvY3VzUmFuZ2VJbnB1dCgnZmlyc3QnKTtcbiAgICB0aGlzLm1vdmVWYWx1ZUNsb3VkKGV2ZW50LCAnZmlyc3QnKTtcbiAgfVxuXG4gIHNlY29uZFJhbmdlSW5wdXQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMucmFuZ2VWYWx1ZUNoYW5nZS5lbWl0KHRoaXMucmFuZ2UpO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnJhbmdlID09PSAnb2JqZWN0JyAmJiB0aGlzLnJhbmdlLnNlY29uZCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMucmFuZ2U7XG4gICAgfVxuXG4gICAgdGhpcy5mb2N1c1JhbmdlSW5wdXQoJ3NlY29uZCcpO1xuICAgIHRoaXMubW92ZVZhbHVlQ2xvdWQoZXZlbnQsICdzZWNvbmQnKTtcbiAgfVxuXG4gIHByaXZhdGUgbW92ZVZhbHVlQ2xvdWQoZXZlbnQ6IGFueSwgZWxlbWVudDogc3RyaW5nLCB2YWx1ZT86IG51bWJlcikge1xuICAgIC8vIGlmIGBtb3ZlVmFsdWVDbG91ZCgpYCBpcyBjYWxsZWQgYnkgKGlucHV0KSBldmVudCB0YWtlIHZhbHVlIGFzIGV2ZW50LnRhcmdldC52YWx1ZS5cbiAgICAvLyBJZiBpdCdzIGNhbGxlZCBtYW51YWxseSwgdGFrZSB2YWx1ZSBmcm9tIHBhcmFtZXRlci5cblxuICAgIC8vIFRoaXMgaXMgbmVlZGVkIGluIHNpdHVhdGlvbiwgd2hlbiBzbGlkZXIgdmFsdWUgaXMgc2V0IGJ5IGRlZmF1bHQgb3IgUmVhY3RpdmVGb3JtcyxcbiAgICAvLyBhbmQgdmFsdWUgY2xvdW5kIGlzIG5vdCBtb3ZlZCB0byBwcm9wZXIgcG9zaXRpb25cbiAgICBjb25zdCBuZXdWYWx1ZSA9IGV2ZW50LnRhcmdldCA/IGV2ZW50LnRhcmdldC52YWx1ZSA6IHZhbHVlO1xuICAgIGNvbnN0IG5ld1JlbGF0aXZlR2FpbiA9IG5ld1ZhbHVlIC0gdGhpcy5taW47XG4gICAgY29uc3QgaW5wdXRXaWR0aCA9XG4gICAgICBlbGVtZW50ID09PSAnZmlyc3QnXG4gICAgICAgID8gdGhpcy5maXJzdElucHV0Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGhcbiAgICAgICAgOiB0aGlzLnNlY29uZElucHV0Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICBsZXQgdGh1bWJPZmZzZXQgPSAwO1xuICAgIGNvbnN0IG9mZnNldEFtbW91bnQgPSAxNTtcbiAgICBjb25zdCBkaXN0YW5jZUZyb21NaWRkbGUgPSBuZXdSZWxhdGl2ZUdhaW4gLSB0aGlzLnN0ZXBzIC8gMjtcblxuICAgIHRoaXMuc3RlcExlbmd0aCA9IGlucHV0V2lkdGggLyB0aGlzLnN0ZXBzO1xuXG4gICAgdGh1bWJPZmZzZXQgPSAoZGlzdGFuY2VGcm9tTWlkZGxlIC8gdGhpcy5zdGVwcykgKiBvZmZzZXRBbW1vdW50O1xuICAgIHRoaXMuY2xvdWRSYW5nZSA9IHRoaXMuc3RlcExlbmd0aCAqIG5ld1JlbGF0aXZlR2FpbiAtIHRodW1iT2Zmc2V0O1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgIGVsZW1lbnQgPT09ICdmaXJzdCdcbiAgICAgICAgPyB0aGlzLmZpcnN0UmFuZ2VDbG91ZC5uYXRpdmVFbGVtZW50XG4gICAgICAgIDogdGhpcy5zZWNvbmRSYW5nZUNsb3VkLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAnbGVmdCcsXG4gICAgICB0aGlzLmNsb3VkUmFuZ2UgKyAncHgnXG4gICAgKTtcbiAgfVxuXG4gIGZvY3VzUmFuZ2VJbnB1dChlbGVtZW50OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5jaGVja0lmU2FmYXJpKCkpIHtcbiAgICAgIGVsZW1lbnQgPT09ICdmaXJzdCdcbiAgICAgICAgPyB0aGlzLmZpcnN0SW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpXG4gICAgICAgIDogdGhpcy5zZWNvbmRJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICAgIGVsZW1lbnQgPT09ICdmaXJzdCcgPyAodGhpcy5maXJzdFZpc2liaWxpdHkgPSB0cnVlKSA6ICh0aGlzLnNlY29uZFZpc2liaWxpdHkgPSB0cnVlKTtcbiAgfVxuXG4gIGJsdXJSYW5nZUlucHV0KGVsZW1lbnQ6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmNoZWNrSWZTYWZhcmkoKSkge1xuICAgICAgZWxlbWVudCA9PT0gJ2ZpcnN0J1xuICAgICAgICA/IHRoaXMuZmlyc3RJbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKVxuICAgICAgICA6IHRoaXMuc2Vjb25kSW5wdXQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgfVxuICAgIGVsZW1lbnQgPT09ICdmaXJzdCcgPyAodGhpcy5maXJzdFZpc2liaWxpdHkgPSBmYWxzZSkgOiAodGhpcy5zZWNvbmRWaXNpYmlsaXR5ID0gZmFsc2UpO1xuICB9XG5cbiAgY2hlY2tJZlNhZmFyaSgpIHtcbiAgICBjb25zdCBpc1NhZmFyaSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgPiAtMTtcbiAgICBjb25zdCBpc0Nocm9tZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgPiAtMTtcbiAgICBjb25zdCBpc0ZpcmVmb3ggPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0ZpcmVmb3gnKSA+IC0xO1xuICAgIGNvbnN0IGlzT3BlcmEgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09wZXJhJykgPiAtMTtcblxuICAgIGlmIChpc1NhZmFyaSAmJiAhaXNDaHJvbWUgJiYgIWlzRmlyZWZveCAmJiAhaXNPcGVyYSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyBDb250cm9sIFZhbHVlIEFjY2Vzc29yIE1ldGhvZHNcbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMucmFuZ2UgPSB2YWx1ZTtcblxuICAgIC8vIGZpeChzbGlkZXIpOiByZXNvbHZlIHByb2JsZW0gd2l0aCBub3QgbW92aW5nIHNsaWRlciBjbG91ZCB3aGVuIHNldHRpbmcgdmFsdWUgd2l0aCBbdmFsdWVdIG9yIHJlYWN0aXZlIGZvcm1zXG4gICAgLy8gTWFudWFsIGNhbGwgdGhlIG1vdmVWYWx1ZUNsb3VkIG1ldGhvZCB0byBtb3ZlIHJhbmdlIHZhbHVlIGNsb3VkIHRvIHByb3BlciBwb3NpdGlvbiBiYXNlZCBvbiB0aGUgYHZhbHVlYCB2YXJpYWJsZVxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMubW92ZVZhbHVlQ2xvdWQobmV3IEV2ZW50KCdpbnB1dCcpLCAnZmlyc3QnLCBOdW1iZXIodmFsdWUuZmlyc3QpKTtcbiAgICAgICAgdGhpcy5tb3ZlVmFsdWVDbG91ZChuZXcgRXZlbnQoJ2lucHV0JyksICdzZWNvbmQnLCBOdW1iZXIodmFsdWUuc2Vjb25kKSk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cbn1cbiJdfQ==