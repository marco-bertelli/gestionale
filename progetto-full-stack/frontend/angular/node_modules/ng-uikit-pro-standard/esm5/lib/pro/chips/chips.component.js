import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BACKSPACE, DELETE } from '../../free/utils/keyboard-navigation';
export var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(function () { return MaterialChipsComponent; }),
    multi: true,
};
var MaterialChipsComponent = /** @class */ (function () {
    function MaterialChipsComponent(_cdRef) {
        this._cdRef = _cdRef;
        this.placeholder = '';
        this.isTagsFocused = false;
        this.keyCodes = {
            backspace: BACKSPACE,
            delete: DELETE,
        };
        this.tagsfocusedChange = new EventEmitter();
        this.labelsChange = new EventEmitter();
        this.onTouchedCallback = this.noop;
        this.onChangeCallback = this.noop;
        this.onTouchedCallback =
            this.onTouchedCallback === undefined ? this.noop : this.onTouchedCallback;
        this.onChangeCallback = this.onChangeCallback === undefined ? this.noop : this.onChangeCallback;
    }
    Object.defineProperty(MaterialChipsComponent.prototype, "tagsfocused", {
        get: function () {
            return this.isTagsFocused;
        },
        enumerable: true,
        configurable: true
    });
    MaterialChipsComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    MaterialChipsComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    MaterialChipsComponent.prototype.removeValue = function (value) {
        var index = this.values.indexOf(value, 0);
        if (index !== undefined) {
            this.values.splice(index, 1);
            this.labelsChange.emit(this.values);
        }
    };
    MaterialChipsComponent.prototype.handleKeydown = function (event) {
        if (event.keyCode === this.keyCodes.backspace || event.keyCode === this.keyCodes.delete) {
            if (event.target.value === '') {
                this._removeLast();
                event.preventDefault();
            }
        }
    };
    MaterialChipsComponent.prototype._removeLast = function () {
        var _this = this;
        var lastChip = this.values[this.values.length];
        var index = this.values.indexOf(lastChip);
        this.values.splice(index, 1);
        this.labelsChange.emit(this.values);
        if (this.values.length === 0) {
            setTimeout(function () {
                _this.initialInput.nativeElement.focus();
            }, 0);
        }
    };
    MaterialChipsComponent.prototype.addValue = function (value, event) {
        var _this = this;
        event.preventDefault();
        if (!value || value.trim() === '') {
            return;
        }
        this.values.push(value);
        this.labelsChange.emit(this.values);
        this.labelToAdd = '';
        if (this.values.length === 1) {
            setTimeout(function () {
                _this.chipsInput.nativeElement.focus();
            }, 0);
        }
    };
    MaterialChipsComponent.prototype.writeValue = function (value) {
        if (value !== this.values) {
            this.values = value;
        }
        this._cdRef.markForCheck();
    };
    MaterialChipsComponent.prototype.onFocus = function () {
        this.focused = 'md-focused';
        this.isTagsFocused = true;
        this.tagsfocusedChange.emit(this.isTagsFocused);
    };
    MaterialChipsComponent.prototype.focusOutFunction = function () {
        this.focused = '';
        this.isTagsFocused = false;
        this.tagsfocusedChange.emit(this.isTagsFocused);
    };
    MaterialChipsComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        ViewChild('box'),
        __metadata("design:type", ElementRef)
    ], MaterialChipsComponent.prototype, "chipsInput", void 0);
    __decorate([
        ViewChild('tbox'),
        __metadata("design:type", ElementRef)
    ], MaterialChipsComponent.prototype, "initialInput", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MaterialChipsComponent.prototype, "placeholder", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MaterialChipsComponent.prototype, "tagsfocusedChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MaterialChipsComponent.prototype, "labelsChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], MaterialChipsComponent.prototype, "tagsfocused", null);
    MaterialChipsComponent = __decorate([
        Component({
            selector: 'mdb-material-chips',
            template: "<div *ngIf=\"values && values.length\" class=\"md-chip-list\" [ngClass]=\"focused\" #chipComponent>\n  <span *ngFor=\"let value of values\" class=\"md-chip\" selected>\n    {{ value }} <i class=\"close fas fa-times\" aria-hidden=\"true\" (click)=\"removeValue(value)\"></i>\n  </span>\n\n  <span>\n    <input\n      (blur)=\"addValue(box.value, $event)\"\n      [(ngModel)]=\"labelToAdd\"\n      (keyup.enter)=\"addValue(box.value, $event)\"\n      (focus)=\"onFocus()\"\n      (focusout)=\"focusOutFunction()\"\n      (keydown)=\"handleKeydown($event)\"\n      #box\n    />\n  </span>\n</div>\n<div *ngIf=\"!values || !values.length\">\n  <input\n    (blur)=\"addValue(tbox.value, $event)\"\n    class=\"md-chips-input\"\n    placeholder=\"{{ placeholder }}\"\n    #tbox\n    (keyup.enter)=\"addValue(tbox.value, $event)\"\n  />\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], MaterialChipsComponent);
    return MaterialChipsComponent;
}());
export { MaterialChipsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9jaGlwcy9jaGlwcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEdBQ1gsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUV6RSxNQUFNLENBQUMsSUFBTSxtQ0FBbUMsR0FBUTtJQUN0RCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLGtEQUFrRDtJQUNsRCxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxzQkFBc0IsRUFBdEIsQ0FBc0IsQ0FBQztJQUNyRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFTRjtJQWtDRSxnQ0FBb0IsTUFBeUI7UUFBekIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUEvQnBDLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBRzFCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBT3RCLGFBQVEsR0FBRztZQUNULFNBQVMsRUFBRSxTQUFTO1lBQ3BCLE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQztRQUVRLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkMsaUJBQVksR0FBMkIsSUFBSSxZQUFZLEVBQVksQ0FBQztRQU90RSxzQkFBaUIsR0FBZSxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzFDLHFCQUFnQixHQUFxQixJQUFJLENBQUMsSUFBSSxDQUFDO1FBUXJELElBQUksQ0FBQyxpQkFBaUI7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QjtZQUM5QixtMUJBQW1DO1lBQ25DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO1lBQ2hELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7eUNBbUM0QixpQkFBaUI7T0FsQ2xDLHNCQUFzQixDQXlHbEM7SUFBRCw2QkFBQztDQUFBLEFBekdELElBeUdDO1NBekdZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJBQ0tTUEFDRSwgREVMRVRFIH0gZnJvbSAnLi4vLi4vZnJlZS91dGlscy9rZXlib2FyZC1uYXZpZ2F0aW9uJztcblxuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVzZS1iZWZvcmUtZGVjbGFyZVxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXRlcmlhbENoaXBzQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWUsXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItbWF0ZXJpYWwtY2hpcHMnLFxuICB0ZW1wbGF0ZVVybDogJ2NoaXBzLmNvbXBvbmVudC5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJvdmlkZXJzOiBbQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxDaGlwc0NvbXBvbmVudCB7XG4gIEBWaWV3Q2hpbGQoJ2JveCcpIGNoaXBzSW5wdXQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3Rib3gnKSBpbml0aWFsSW5wdXQ6IEVsZW1lbnRSZWY7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XG5cbiAgYWRkQXJlYURpc3BsYXllZDogYm9vbGVhbjtcbiAgaXNUYWdzRm9jdXNlZCA9IGZhbHNlO1xuICB2YWx1ZXM6IHN0cmluZ1tdO1xuICBsYWJlbFRvQWRkOiBzdHJpbmc7XG4gIGZvY3VzZWQ6IHN0cmluZztcbiAgc2VsZWN0ZWQ6IHN0cmluZztcbiAgbm9vcDogYW55O1xuXG4gIGtleUNvZGVzID0ge1xuICAgIGJhY2tzcGFjZTogQkFDS1NQQUNFLFxuICAgIGRlbGV0ZTogREVMRVRFLFxuICB9O1xuXG4gIEBPdXRwdXQoKSB0YWdzZm9jdXNlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGxhYmVsc0NoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZ1tdPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nW10+KCk7XG5cbiAgQElucHV0KClcbiAgZ2V0IHRhZ3Nmb2N1c2VkKCkge1xuICAgIHJldHVybiB0aGlzLmlzVGFnc0ZvY3VzZWQ7XG4gIH1cblxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gdGhpcy5ub29wO1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSB0aGlzLm5vb3A7XG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9XG4gICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID09PSB1bmRlZmluZWQgPyB0aGlzLm5vb3AgOiB0aGlzLm9uVG91Y2hlZENhbGxiYWNrO1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IHRoaXMub25DaGFuZ2VDYWxsYmFjayA9PT0gdW5kZWZpbmVkID8gdGhpcy5ub29wIDogdGhpcy5vbkNoYW5nZUNhbGxiYWNrO1xuICB9XG5cbiAgcmVtb3ZlVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy52YWx1ZXMuaW5kZXhPZih2YWx1ZSwgMCk7XG4gICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudmFsdWVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB0aGlzLmxhYmVsc0NoYW5nZS5lbWl0KHRoaXMudmFsdWVzKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVLZXlkb3duKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gdGhpcy5rZXlDb2Rlcy5iYWNrc3BhY2UgfHwgZXZlbnQua2V5Q29kZSA9PT0gdGhpcy5rZXlDb2Rlcy5kZWxldGUpIHtcbiAgICAgIGlmIChldmVudC50YXJnZXQudmFsdWUgPT09ICcnKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUxhc3QoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVMYXN0KCkge1xuICAgIGNvbnN0IGxhc3RDaGlwID0gdGhpcy52YWx1ZXNbdGhpcy52YWx1ZXMubGVuZ3RoXTtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudmFsdWVzLmluZGV4T2YobGFzdENoaXApO1xuXG4gICAgdGhpcy52YWx1ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLmxhYmVsc0NoYW5nZS5lbWl0KHRoaXMudmFsdWVzKTtcblxuICAgIGlmICh0aGlzLnZhbHVlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmluaXRpYWxJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cblxuICBhZGRWYWx1ZSh2YWx1ZTogc3RyaW5nLCBldmVudDogYW55KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIXZhbHVlIHx8IHZhbHVlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgdGhpcy5sYWJlbHNDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlcyk7XG4gICAgdGhpcy5sYWJlbFRvQWRkID0gJyc7XG5cbiAgICBpZiAodGhpcy52YWx1ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jaGlwc0lucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZ1tdKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlcykge1xuICAgICAgdGhpcy52YWx1ZXMgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG9uRm9jdXMoKSB7XG4gICAgdGhpcy5mb2N1c2VkID0gJ21kLWZvY3VzZWQnO1xuICAgIHRoaXMuaXNUYWdzRm9jdXNlZCA9IHRydWU7XG4gICAgdGhpcy50YWdzZm9jdXNlZENoYW5nZS5lbWl0KHRoaXMuaXNUYWdzRm9jdXNlZCk7XG4gIH1cbiAgZm9jdXNPdXRGdW5jdGlvbigpIHtcbiAgICB0aGlzLmZvY3VzZWQgPSAnJztcbiAgICB0aGlzLmlzVGFnc0ZvY3VzZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRhZ3Nmb2N1c2VkQ2hhbmdlLmVtaXQodGhpcy5pc1RhZ3NGb2N1c2VkKTtcbiAgfVxufVxuIl19