import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, ViewChild, ElementRef, Renderer2, Input, HostListener, forwardRef, Output, EventEmitter, ChangeDetectorRef, ViewEncapsulation, ChangeDetectionStrategy, } from '@angular/core';
export const RANGE_VALUE_ACCESOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => MdbRangeInputComponent),
    multi: true,
};
export class MdbRangeInputComponent {
    constructor(renderer, cdRef) {
        this.renderer = renderer;
        this.cdRef = cdRef;
        this.min = 0;
        this.max = 100;
        this.rangeValueChange = new EventEmitter();
        this.range = 0;
        this.cloudRange = 0;
        this.visibility = false;
        // Control Value Accessor Methods
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    onchange(event) {
        this.onChange(event.target.value);
    }
    oninput(event) {
        const value = +event.target.value;
        this.rangeValueChange.emit({ value: value });
        if (this.checkIfSafari()) {
            this.focusRangeInput();
        }
    }
    onclick() {
        this.focusRangeInput();
    }
    onTouchStart() {
        this.focusRangeInput();
    }
    onmouseleave() {
        if (this.checkIfSafari()) {
            this.blurRangeInput();
        }
    }
    focusRangeInput() {
        this.input.nativeElement.focus();
        this.visibility = true;
    }
    blurRangeInput() {
        this.input.nativeElement.blur();
        this.visibility = false;
    }
    coverage(event, value) {
        if (typeof this.range === 'string' && this.range.length !== 0) {
            return this.range;
        }
        if (!this.default) {
            // if `coverage()` is called by (input) event take value as event.target.value. If it's called manually, take value from parameter.
            // This is needed in situation, when slider value is set by default or ReactiveForms, and value clound is not moved to proper position
            const newValue = event.target ? event.target.value : value;
            const newRelativeGain = newValue - this.min;
            const inputWidth = this.input.nativeElement.offsetWidth;
            let thumbOffset;
            const offsetAmmount = 15;
            const distanceFromMiddle = newRelativeGain - this.steps / 2;
            this.stepLength = inputWidth / this.steps;
            thumbOffset = (distanceFromMiddle / this.steps) * offsetAmmount;
            this.cloudRange = this.stepLength * newRelativeGain - thumbOffset;
            this.renderer.setStyle(this.rangeCloud.nativeElement, 'left', this.cloudRange + 'px');
        }
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
    ngAfterViewInit() {
        this.steps = this.max - this.min;
        if (this.value) {
            this.range = Number(this.value);
            // fix(slider): resolve problem with not moving slider cloud when setting value with [value] or reactive forms
            // Manual call the coverage method to move range value cloud to proper position based on the `value` variable
            this.coverage(new Event('input'), this.value);
            this.cdRef.detectChanges();
        }
    }
    writeValue(value) {
        this.value = value;
        this.range = Number(this.value);
        this.cdRef.markForCheck();
        // fix(slider): resolve problem with not moving slider cloud when setting value with [value] or reactive forms
        // Manual call the coverage method to move range value cloud to proper position based on the `value` variable
        setTimeout(() => {
            this.coverage(new Event('input'), value);
        }, 0);
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
MdbRangeInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-range-input',
                template: "<div *ngIf=\"!default\" class=\"range-field\" #rangeField>\n  <div class=\"track\">\n    <div\n      #rangeCloud\n      class=\"range-cloud\"\n      title=\"range\"\n      [ngClass]=\"{ visible: this.visibility, hidden: !this.visibility }\"\n    >\n      <span class=\"text-transform\">{{ range }}</span>\n    </div>\n  </div>\n  <input\n    #input\n    [name]=\"name\"\n    type=\"range\"\n    [disabled]=\"disabled\"\n    [id]=\"id\"\n    [min]=\"min\"\n    [max]=\"max\"\n    [step]=\"step\"\n    [value]=\"value\"\n    [(ngModel)]=\"range\"\n    (focus)=\"this.visibility = true\"\n    (blur)=\"this.visibility = false\"\n    (input)=\"coverage($event)\"\n  />\n</div>\n\n<div *ngIf=\"default\">\n  <input\n    #input\n    class=\"custom-range\"\n    [name]=\"name\"\n    type=\"range\"\n    [id]=\"id\"\n    [min]=\"min\"\n    [max]=\"max\"\n    [step]=\"step\"\n    [attr.value]=\"value\"\n    [value]=\"value\"\n    [(ngModel)]=\"range\"\n    (focus)=\"this.visibility = true\"\n    (blur)=\"this.visibility = false\"\n    (input)=\"coverage($event)\"\n    (touchend)=\"blurRangeInput()\"\n  />\n  <span class=\"{{ defaultRangeCounterClass }}\">{{ range }}</span>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [RANGE_VALUE_ACCESOR],
                styles: [".range-field input[type=range]{-moz-appearance:none;-webkit-appearance:none;appearance:none;background-color:transparent;border:1px solid #fff;cursor:pointer;margin:15px 0;outline:none;padding:0;position:relative;width:100%}.range-field input[type=range]:focus{outline:none}.range-field input[type=range]+.thumb{background-color:#4285f4;border:none;border-radius:50%;height:0;margin-left:-6px;position:absolute;top:10px;transform:rotate(-45deg);transform-origin:50% 50%;width:0}.range-field input[type=range]+.thumb .value{color:#4285f4;display:block;font-size:0;text-align:center;transform:rotate(45deg);width:30px}.range-field input[type=range]+.thumb.active{border-radius:50% 50% 50% 0}.range-field input[type=range]+.thumb.active .value{color:#fff;font-size:10px;margin-left:-1px;margin-top:8px}.range-field input[type=range]::-webkit-slider-runnable-track{background:#c2c0c2;border:none;height:3px}.range-field input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;-webkit-transition:.3s;appearance:none;background-color:#4285f4;border:none;border-radius:50%;height:14px;margin:-5px 0 0;transform-origin:50% 50%;transition:.3s;width:14px}.range-field input[type=range]:focus::-webkit-slider-runnable-track{background:#ccc}.range-field input[type=range]::-moz-range-track{background:#c2c0c2;border:none;height:3px}.range-field input[type=range]::-moz-range-thumb{background:#4285f4;border:none;border-radius:50%;height:14px;margin-top:-5px;width:14px}.range-field input[type=range]:-moz-focusring{outline:1px solid #fff;outline-offset:-1px}.range-field input[type=range]:focus::-moz-range-track{background:#c2c0c2}.range-field input[type=range]::-ms-track{background:transparent;border-color:transparent;border-width:6px 0;color:transparent;height:3px}.range-field input[type=range]::-ms-fill-lower,.range-field input[type=range]::-ms-fill-upper{background:#c2c0c2}.range-field input[type=range]::-ms-thumb{background:#4285f4;border:none;border-radius:50%;height:14px;width:14px}.range-field input[type=range]:focus::-ms-fill-lower,.range-field input[type=range]:focus::-ms-fill-upper{background:#c2c0c2}@supports (--css:variables){input[type=range].mdbMultiRange{display:inline-block;margin:0;padding:0;vertical-align:top}input[type=range].mdbMultiRange.original{position:absolute}input[type=range].mdbMultiRange.original::-webkit-slider-thumb{position:relative;z-index:2}input[type=range].mdbMultiRange.original::-moz-range-thumb{transform:scale(1);z-index:1}input[type=range].mdbMultiRange::-moz-range-track{border-color:transparent}input[type=range].mdbMultiRange.ghost{position:relative}input[type=range].mdbMultiRange.ghost:nth-of-type(n+1){position:absolute}}.multi-range-field{position:relative}.multi-range-field input[type=range]{-moz-appearance:none;-webkit-appearance:none;appearance:none;background-color:transparent;border:1px solid #fff;cursor:pointer;margin:15px 0;outline:none;padding:0;position:relative;width:100%}.multi-range-field input[type=range]:focus{outline:none}.multi-range-field input[type=range]+.thumb{background-color:#4285f4;border:none;border-radius:50%;height:0;margin-left:-6px;position:absolute;top:10px;transform:rotate(-45deg);transform-origin:50% 50%;width:0}.multi-range-field input[type=range]+.thumb .value{color:#4285f4;display:block;font-size:0;text-align:center;transform:rotate(45deg);width:30px}.multi-range-field input[type=range]+.thumb.active{border-radius:50% 50% 50% 0}.multi-range-field input[type=range]+.thumb.active .value{color:#fff;font-size:10px;margin-left:-1px;margin-top:8px}.multi-range-field input[type=range]::-webkit-slider-runnable-track{background:#c2c0c2;border:none;height:3px}.multi-range-field input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;-webkit-transition:.3s;appearance:none;background-color:#4285f4;border:none;border-radius:50%;height:14px;margin:-5px 0 0;transform-origin:50% 50%;transition:.3s;width:14px}.multi-range-field input[type=range]:focus::-webkit-slider-runnable-track{background:#ccc}.multi-range-field input[type=range]::-moz-range-track{background:#c2c0c2;border:none;height:3px}.multi-range-field input[type=range]::-moz-range-thumb{background:#4285f4;border:none;border-radius:50%;height:14px;margin-top:-5px;width:14px}.multi-range-field input[type=range]:-moz-focusring{outline:1px solid #fff;outline-offset:-1px}.multi-range-field input[type=range]:focus::-moz-range-track{background:#c2c0c2}.multi-range-field input[type=range]::-ms-track{background:transparent;border-color:transparent;border-width:6px 0;color:transparent;height:3px}.multi-range-field input[type=range]::-ms-fill-lower,.multi-range-field input[type=range]::-ms-fill-upper{background:#c2c0c2}.multi-range-field input[type=range]::-ms-thumb{background:#4285f4;border:none;border-radius:50%;height:14px;width:14px}.multi-range-field input[type=range]:focus::-ms-fill-lower,.multi-range-field input[type=range]:focus::-ms-fill-upper{background:#c2c0c2}.thumb-horizontal-wrapper{position:relative;top:500px;transform:rotate(-270deg)}.multi-range-field input[type=range]+.thumb-horizontal .value{transform:rotate(315deg)!important}.range-field{position:relative}.range-field .track{left:8px;margin-left:-7.5px;position:absolute;right:8px}.range-field .track .range-cloud{background-color:#4285f4;border-radius:50%;color:#fff;font-size:12px;height:30px;position:absolute;top:-25px;transform:translateX(-50%);width:30px}.range-field .track .range-cloud:after{border-color:#4285f4 transparent transparent;border-style:solid;border-width:7px 7px 0;bottom:0;content:\"\";height:0;left:50%;position:absolute;transform:translate(-50%,70%);width:0}.range-field .track .range-cloud.hidden{display:none}.range-field .track .range-cloud.visible{display:block}.range-field .track .range-cloud .text-transform{left:50%;position:absolute;top:50%;transform:translate(-50%,-50%)}"]
            },] }
];
MdbRangeInputComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
MdbRangeInputComponent.propDecorators = {
    input: [{ type: ViewChild, args: ['input',] }],
    rangeCloud: [{ type: ViewChild, args: ['rangeCloud',] }],
    rangeField: [{ type: ViewChild, args: ['rangeField',] }],
    id: [{ type: Input }],
    required: [{ type: Input }],
    name: [{ type: Input }],
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    step: [{ type: Input }],
    default: [{ type: Input }],
    defaultRangeCounterClass: [{ type: Input }],
    rangeValueChange: [{ type: Output }],
    onchange: [{ type: HostListener, args: ['change', ['$event'],] }],
    oninput: [{ type: HostListener, args: ['input', ['$event'],] }],
    onclick: [{ type: HostListener, args: ['click',] }],
    onTouchStart: [{ type: HostListener, args: ['touchstart',] }],
    onmouseleave: [{ type: HostListener, args: ['mouseleave',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXJhbmdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXVpa2l0LXByby1zdGFuZGFyZC9zcmMvbGliL3Byby9yYW5nZS9tZGItcmFuZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsU0FBUyxFQUNULEtBQUssRUFDTCxZQUFZLEVBQ1osVUFBVSxFQUVWLE1BQU0sRUFDTixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQix1QkFBdUIsR0FDeEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQVE7SUFDdEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixrREFBa0Q7SUFDbEQsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztJQUNyRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFVRixNQUFNLE9BQU8sc0JBQXNCO0lBbURqQyxZQUFvQixRQUFtQixFQUFVLEtBQXdCO1FBQXJELGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQXpDaEUsUUFBRyxHQUFHLENBQUMsQ0FBQztRQUNSLFFBQUcsR0FBRyxHQUFHLENBQUM7UUFLVCxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBRXJELFVBQUssR0FBUSxDQUFDLENBQUM7UUFHZixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsZUFBVSxHQUFHLEtBQUssQ0FBQztRQTZGbkIsaUNBQWlDO1FBQ2pDLGFBQVEsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQzFCLGNBQVMsR0FBRyxHQUFH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QUFDLENBQUM7UUFDM0MsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQW9CO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFjO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUM3QixDQUFDOzs7WUFySkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLHdxQ0FBeUM7Z0JBRXpDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7O2FBQ2pDOzs7WUExQkMsU0FBUztZQU9ULGlCQUFpQjs7O29CQXFCaEIsU0FBUyxTQUFDLE9BQU87eUJBQ2pCLFNBQVMsU0FBQyxZQUFZO3lCQUN0QixTQUFTLFNBQUMsWUFBWTtpQkFFdEIsS0FBSzt1QkFDTCxLQUFLO21CQUNMLEtBQUs7b0JBQ0wsS0FBSzt1QkFDTCxLQUFLO2tCQUNMLEtBQUs7a0JBQ0wsS0FBSzttQkFDTCxLQUFLO3NCQUNMLEtBQUs7dUNBQ0wsS0FBSzsrQkFFTCxNQUFNO3VCQVFOLFlBQVksU0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUM7c0JBSWpDLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7c0JBU2hDLFlBQVksU0FBQyxPQUFPOzJCQUlwQixZQUFZLFNBQUMsWUFBWTsyQkFJekIsWUFBWSxTQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgUmVuZGVyZXIyLFxuICBJbnB1dCxcbiAgSG9zdExpc3RlbmVyLFxuICBmb3J3YXJkUmVmLFxuICBBZnRlclZpZXdJbml0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjb25zdCBSQU5HRV9WQUxVRV9BQ0NFU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVzZS1iZWZvcmUtZGVjbGFyZVxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNZGJSYW5nZUlucHV0Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItcmFuZ2UtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWRiLXJhbmdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcmFuZ2UtbW9kdWxlLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1JBTkdFX1ZBTFVFX0FDQ0VTT1JdLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJSYW5nZUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdpbnB1dCcpIGlucHV0OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdyYW5nZUNsb3VkJykgcmFuZ2VDbG91ZDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgncmFuZ2VGaWVsZCcpIHJhbmdlRmllbGQ6IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZztcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG1pbiA9IDA7XG4gIEBJbnB1dCgpIG1heCA9IDEwMDtcbiAgQElucHV0KCkgc3RlcDogbnVtYmVyO1xuICBASW5wdXQoKSBkZWZhdWx0OiBib29sZWFuO1xuICBASW5wdXQoKSBkZWZhdWx0UmFuZ2VDb3VudGVyQ2xhc3M6IHN0cmluZztcblxuICBAT3V0cHV0KCkgcmFuZ2VWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHJhbmdlOiBhbnkgPSAwO1xuICBzdGVwTGVuZ3RoOiBudW1iZXI7XG4gIHN0ZXBzOiBudW1iZXI7XG4gIGNsb3VkUmFuZ2UgPSAwO1xuICB2aXNpYmlsaXR5ID0gZmFsc2U7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2hhbmdlJywgWyckZXZlbnQnXSkgb25jaGFuZ2UoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSkgb25pbnB1dChldmVudDogYW55KSB7XG4gICAgY29uc3QgdmFsdWU6IG51bWJlciA9ICtldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5yYW5nZVZhbHVlQ2hhbmdlLmVtaXQoeyB2YWx1ZTogdmFsdWUgfSk7XG5cbiAgICBpZiAodGhpcy5jaGVja0lmU2FmYXJpKCkpIHtcbiAgICAgIHRoaXMuZm9jdXNSYW5nZUlucHV0KCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKSBvbmNsaWNrKCkge1xuICAgIHRoaXMuZm9jdXNSYW5nZUlucHV0KCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd0b3VjaHN0YXJ0Jykgb25Ub3VjaFN0YXJ0KCkge1xuICAgIHRoaXMuZm9jdXNSYW5nZUlucHV0KCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJykgb25tb3VzZWxlYXZlKCkge1xuICAgIGlmICh0aGlzLmNoZWNrSWZTYWZhcmkoKSkge1xuICAgICAgdGhpcy5ibHVyUmFuZ2VJbnB1dCgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgZm9jdXNSYW5nZUlucHV0KCkge1xuICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIHRoaXMudmlzaWJpbGl0eSA9IHRydWU7XG4gIH1cblxuICBibHVyUmFuZ2VJbnB1dCgpIHtcbiAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgIHRoaXMudmlzaWJpbGl0eSA9IGZhbHNlO1xuICB9XG5cbiAgY292ZXJhZ2UoZXZlbnQ6IGFueSwgdmFsdWU/OiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMucmFuZ2UgPT09ICdzdHJpbmcnICYmIHRoaXMucmFuZ2UubGVuZ3RoICE9PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5yYW5nZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZGVmYXVsdCkge1xuICAgICAgLy8gaWYgYGNvdmVyYWdlKClgIGlzIGNhbGxlZCBieSAoaW5wdXQpIGV2ZW50IHRha2UgdmFsdWUgYXMgZXZlbnQudGFyZ2V0LnZhbHVlLiBJZiBpdCdzIGNhbGxlZCBtYW51YWxseSwgdGFrZSB2YWx1ZSBmcm9tIHBhcmFtZXRlci5cbiAgICAgIC8vIFRoaXMgaXMgbmVlZGVkIGluIHNpdHVhdGlvbiwgd2hlbiBzbGlkZXIgdmFsdWUgaXMgc2V0IGJ5IGRlZmF1bHQgb3IgUmVhY3RpdmVGb3JtcywgYW5kIHZhbHVlIGNsb3VuZCBpcyBub3QgbW92ZWQgdG8gcHJvcGVyIHBvc2l0aW9uXG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IGV2ZW50LnRhcmdldCA/IGV2ZW50LnRhcmdldC52YWx1ZSA6IHZhbHVlO1xuICAgICAgY29uc3QgbmV3UmVsYXRpdmVHYWluID0gbmV3VmFsdWUgLSB0aGlzLm1pbjtcbiAgICAgIGNvbnN0IGlucHV0V2lkdGggPSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICAgIGxldCB0aHVtYk9mZnNldDogbnVtYmVyO1xuICAgICAgY29uc3Qgb2Zmc2V0QW1tb3VudCA9IDE1O1xuICAgICAgY29uc3QgZGlzdGFuY2VGcm9tTWlkZGxlID0gbmV3UmVsYXRpdmVHYWluIC0gdGhpcy5zdGVwcyAvIDI7XG5cbiAgICAgIHRoaXMuc3RlcExlbmd0aCA9IGlucHV0V2lkdGggLyB0aGlzLnN0ZXBzO1xuXG4gICAgICB0aHVtYk9mZnNldCA9IChkaXN0YW5jZUZyb21NaWRkbGUgLyB0aGlzLnN0ZXBzKSAqIG9mZnNldEFtbW91bnQ7XG4gICAgICB0aGlzLmNsb3VkUmFuZ2UgPSB0aGlzLnN0ZXBMZW5ndGggKiBuZXdSZWxhdGl2ZUdhaW4gLSB0aHVtYk9mZnNldDtcblxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnJhbmdlQ2xvdWQubmF0aXZlRWxlbWVudCwgJ2xlZnQnLCB0aGlzLmNsb3VkUmFuZ2UgKyAncHgnKTtcbiAgICB9XG4gIH1cblxuICBjaGVja0lmU2FmYXJpKCkge1xuICAgIGNvbnN0IGlzU2FmYXJpID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdTYWZhcmknKSA+IC0xO1xuICAgIGNvbnN0IGlzQ2hyb21lID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdDaHJvbWUnKSA+IC0xO1xuICAgIGNvbnN0IGlzRmlyZWZveCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRmlyZWZveCcpID4gLTE7XG4gICAgY29uc3QgaXNPcGVyYSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignT3BlcmEnKSA+IC0xO1xuXG4gICAgaWYgKGlzU2FmYXJpICYmICFpc0Nocm9tZSAmJiAhaXNGaXJlZm94ICYmICFpc09wZXJhKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnN0ZXBzID0gdGhpcy5tYXggLSB0aGlzLm1pbjtcblxuICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLnJhbmdlID0gTnVtYmVyKHRoaXMudmFsdWUpO1xuXG4gICAgICAvLyBmaXgoc2xpZGVyKTogcmVzb2x2ZSBwcm9ibGVtIHdpdGggbm90IG1vdmluZyBzbGlkZXIgY2xvdWQgd2hlbiBzZXR0aW5nIHZhbHVlIHdpdGggW3ZhbHVlXSBvciByZWFjdGl2ZSBmb3Jtc1xuICAgICAgLy8gTWFudWFsIGNhbGwgdGhlIGNvdmVyYWdlIG1ldGhvZCB0byBtb3ZlIHJhbmdlIHZhbHVlIGNsb3VkIHRvIHByb3BlciBwb3NpdGlvbiBiYXNlZCBvbiB0aGUgYHZhbHVlYCB2YXJpYWJsZVxuICAgICAgdGhpcy5jb3ZlcmFnZShuZXcgRXZlbnQoJ2lucHV0JyksIHRoaXMudmFsdWUpO1xuXG4gICAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICAvLyBDb250cm9sIFZhbHVlIEFjY2Vzc29yIE1ldGhvZHNcbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMucmFuZ2UgPSBOdW1iZXIodGhpcy52YWx1ZSk7XG4gICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgIC8vIGZpeChzbGlkZXIpOiByZXNvbHZlIHByb2JsZW0gd2l0aCBub3QgbW92aW5nIHNsaWRlciBjbG91ZCB3aGVuIHNldHRpbmcgdmFsdWUgd2l0aCBbdmFsdWVdIG9yIHJlYWN0aXZlIGZvcm1zXG4gICAgLy8gTWFudWFsIGNhbGwgdGhlIGNvdmVyYWdlIG1ldGhvZCB0byBtb3ZlIHJhbmdlIHZhbHVlIGNsb3VkIHRvIHByb3BlciBwb3NpdGlvbiBiYXNlZCBvbiB0aGUgYHZhbHVlYCB2YXJpYWJsZVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jb3ZlcmFnZShuZXcgRXZlbnQoJ2lucHV0JyksIHZhbHVlKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxufVxuIl19