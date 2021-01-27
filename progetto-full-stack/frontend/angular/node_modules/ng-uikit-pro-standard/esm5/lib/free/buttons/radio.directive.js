import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, HostBinding, forwardRef, HostListener, Input, OnInit, Renderer2, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var RADIO_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(function () { return ButtonRadioDirective; }),
    multi: true,
};
/**
 * Create radio buttons or groups of buttons.
 * A value of a selected button is bound to a variable specified via ngModel.
 */
var ButtonRadioDirective = /** @class */ (function () {
    function ButtonRadioDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.radioElementsArray = [];
    }
    Object.defineProperty(ButtonRadioDirective.prototype, "isActive", {
        get: function () {
            return this.mdbRadio === this.value;
        },
        enumerable: true,
        configurable: true
    });
    ButtonRadioDirective.prototype.onClick = function (event) {
        var _this = this;
        try {
            this.el.nativeElement.parentElement.childNodes.forEach(function (element) {
                _this.radioElementsArray.push(element);
            });
            this.radioElementsArray.forEach(function (element) {
                _this.renderer.removeClass(element, 'active');
            });
            this.renderer.addClass(event.target, 'active');
        }
        catch (error) { }
        if (this.el.nativeElement.attributes.disabled) {
            return;
        }
        if (this.uncheckable && this.mdbRadio === this.value) {
            this.value = undefined;
        }
        else {
            this.value = this.mdbRadio;
        }
        this.onTouched();
        this.onChange(this.value);
    };
    ButtonRadioDirective.prototype.ngOnInit = function () {
        this.uncheckable = typeof this.uncheckable !== 'undefined';
    };
    ButtonRadioDirective.prototype.onBlur = function () {
        this.onTouched();
    };
    // ControlValueAccessor
    // model -> view
    ButtonRadioDirective.prototype.writeValue = function (value) {
        this.value = value;
    };
    ButtonRadioDirective.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    ButtonRadioDirective.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    ButtonRadioDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ButtonRadioDirective.prototype, "mdbRadio", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ButtonRadioDirective.prototype, "uncheckable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ButtonRadioDirective.prototype, "value", void 0);
    __decorate([
        HostBinding('class.active'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], ButtonRadioDirective.prototype, "isActive", null);
    __decorate([
        HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ButtonRadioDirective.prototype, "onClick", null);
    ButtonRadioDirective = __decorate([
        Directive({ selector: '[mdbRadio]', providers: [RADIO_CONTROL_VALUE_ACCESSOR] }),
        __metadata("design:paramtypes", [ElementRef, Renderer2])
    ], ButtonRadioDirective);
    return ButtonRadioDirective;
}());
export { ButtonRadioDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvYnV0dG9ucy9yYWRpby5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxNQUFNLENBQUMsSUFBTSw0QkFBNEIsR0FBUTtJQUMvQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLGtEQUFrRDtJQUNsRCxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxvQkFBb0IsRUFBcEIsQ0FBb0IsQ0FBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRjs7O0dBR0c7QUFFSDtJQTBDRSw4QkFBNkIsRUFBYyxFQUFVLFFBQW1CO1FBQTNDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBekNqRSxhQUFRLEdBQVEsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUNuQyxjQUFTLEdBQVEsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUUzQyx1QkFBa0IsR0FBZSxFQUFFLENBQUM7SUFzQ3VDLENBQUM7SUE3QjVFLHNCQUFXLDBDQUFRO2FBQW5CO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFHTSxzQ0FBTyxHQUFkLFVBQWUsS0FBVztRQUQxQixpQkF1QkM7UUFyQkMsSUFBSTtZQUNGLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBWTtnQkFDbEUsS0FBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO2dCQUNyQyxLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDL0MsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ2hEO1FBQUMsT0FBTyxLQUFLLEVBQUUsR0FBRTtRQUNsQixJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDN0MsT0FBTztTQUNSO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNwRCxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztTQUN4QjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQzVCO1FBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFJTSx1Q0FBUSxHQUFmO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssV0FBVyxDQUFDO0lBQzdELENBQUM7SUFFTSxxQ0FBTSxHQUFiO1FBQ0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCx1QkFBdUI7SUFDdkIsZ0JBQWdCO0lBQ1QseUNBQVUsR0FBakIsVUFBa0IsS0FBVTtRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRU0sK0NBQWdCLEdBQXZCLFVBQXdCLEVBQU87UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVNLGdEQUFpQixHQUF4QixVQUF5QixFQUFPO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7O2dCQXRCZ0MsVUFBVTtnQkFBb0IsU0FBUzs7SUFwQy9EO1FBQVIsS0FBSyxFQUFFOzswREFBc0I7SUFFckI7UUFBUixLQUFLLEVBQUU7OzZEQUE2QjtJQUU1QjtRQUFSLEtBQUssRUFBRTs7dURBQW1CO0lBRzNCO1FBREMsV0FBVyxDQUFDLGNBQWMsQ0FBQzs7O3dEQUczQjtJQUdEO1FBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O3VEQXVCakM7SUF4Q1Usb0JBQW9CO1FBRGhDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUMsRUFBRSxDQUFDO3lDQTJDOUMsVUFBVSxFQUFvQixTQUFTO09BMUM3RCxvQkFBb0IsQ0FpRWhDO0lBQUQsMkJBQUM7Q0FBQSxBQWpFRCxJQWlFQztTQWpFWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBSQURJT19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVzZS1iZWZvcmUtZGVjbGFyZVxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBCdXR0b25SYWRpb0RpcmVjdGl2ZSksXG4gIG11bHRpOiB0cnVlLFxufTtcblxuLyoqXG4gKiBDcmVhdGUgcmFkaW8gYnV0dG9ucyBvciBncm91cHMgb2YgYnV0dG9ucy5cbiAqIEEgdmFsdWUgb2YgYSBzZWxlY3RlZCBidXR0b24gaXMgYm91bmQgdG8gYSB2YXJpYWJsZSBzcGVjaWZpZWQgdmlhIG5nTW9kZWwuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1ttZGJSYWRpb10nLCBwcm92aWRlcnM6IFtSQURJT19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXSB9KVxuZXhwb3J0IGNsYXNzIEJ1dHRvblJhZGlvRGlyZWN0aXZlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIHB1YmxpYyBvbkNoYW5nZTogYW55ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICBwdWJsaWMgb25Ub3VjaGVkOiBhbnkgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbiAgcmFkaW9FbGVtZW50c0FycmF5OiBBcnJheTxhbnk+ID0gW107XG4gIC8qKiBSYWRpbyBidXR0b24gdmFsdWUsIHdpbGwgYmUgc2V0IHRvIGBuZ01vZGVsYCAqL1xuICBASW5wdXQoKSBwdWJsaWMgbWRiUmFkaW86IGFueTtcbiAgLyoqIElmIGB0cnVlYCDigJQgcmFkaW8gYnV0dG9uIGNhbiBiZSB1bmNoZWNrZWQgKi9cbiAgQElucHV0KCkgcHVibGljIHVuY2hlY2thYmxlOiBib29sZWFuO1xuICAvKiogQ3VycmVudCB2YWx1ZSBvZiByYWRpbyBjb21wb25lbnQgb3IgZ3JvdXAgKi9cbiAgQElucHV0KCkgcHVibGljIHZhbHVlOiBhbnk7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKVxuICBwdWJsaWMgZ2V0IGlzQWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1kYlJhZGlvID09PSB0aGlzLnZhbHVlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25DbGljayhldmVudD86IGFueSk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZE5vZGVzLmZvckVhY2goKGVsZW1lbnQ6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLnJhZGlvRWxlbWVudHNBcnJheS5wdXNoKGVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnJhZGlvRWxlbWVudHNBcnJheS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGVsZW1lbnQsICdhY3RpdmUnKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhldmVudC50YXJnZXQsICdhY3RpdmUnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge31cbiAgICBpZiAodGhpcy5lbC5uYXRpdmVFbGVtZW50LmF0dHJpYnV0ZXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy51bmNoZWNrYWJsZSAmJiB0aGlzLm1kYlJhZGlvID09PSB0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5tZGJSYWRpbztcbiAgICB9XG5cbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudW5jaGVja2FibGUgPSB0eXBlb2YgdGhpcy51bmNoZWNrYWJsZSAhPT0gJ3VuZGVmaW5lZCc7XG4gIH1cblxuICBwdWJsaWMgb25CbHVyKCk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gIH1cblxuICAvLyBDb250cm9sVmFsdWVBY2Nlc3NvclxuICAvLyBtb2RlbCAtPiB2aWV3XG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG59XG4iXX0=