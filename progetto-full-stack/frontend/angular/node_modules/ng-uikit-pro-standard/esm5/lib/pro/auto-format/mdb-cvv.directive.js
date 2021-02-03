import { __decorate, __metadata } from "tslib";
import { Directive, HostListener, HostBinding } from '@angular/core';
var MdbCvvDirective = /** @class */ (function () {
    function MdbCvvDirective() {
        this.maxLength = '4';
    }
    MdbCvvDirective.prototype.onInput = function (event) {
        this.formatInput(event);
    };
    MdbCvvDirective.prototype.formatInput = function (event) {
        var input = event.target.value;
        var newValue = this.getFormattedValue(input);
        event.target.value = newValue;
    };
    MdbCvvDirective.prototype.getFormattedValue = function (value) {
        value = this.removeNonDigits(value);
        return value;
    };
    MdbCvvDirective.prototype.removeNonDigits = function (value) {
        return value.replace(/\D/g, '');
    };
    __decorate([
        HostBinding('attr.maxLength'),
        __metadata("design:type", Object)
    ], MdbCvvDirective.prototype, "maxLength", void 0);
    __decorate([
        HostListener('input', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MdbCvvDirective.prototype, "onInput", null);
    MdbCvvDirective = __decorate([
        Directive({
            selector: '[mdbCvv]',
        })
    ], MdbCvvDirective);
    return MdbCvvDirective;
}());
export { MdbCvvDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLWN2di5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL2F1dG8tZm9ybWF0L21kYi1jdnYuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLckU7SUFBQTtRQUVpQyxjQUFTLEdBQUcsR0FBRyxDQUFDO0lBcUJqRCxDQUFDO0lBbEJDLGlDQUFPLEdBQVAsVUFBUSxLQUFVO1FBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELHFDQUFXLEdBQVgsVUFBWSxLQUFVO1FBQ3BCLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7SUFDaEMsQ0FBQztJQUVELDJDQUFpQixHQUFqQixVQUFrQixLQUFhO1FBQzdCLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELHlDQUFlLEdBQWYsVUFBZ0IsS0FBYTtRQUMzQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFwQjhCO1FBQTlCLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQzs7c0RBQWlCO0lBRy9DO1FBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O2tEQUdqQztJQVBVLGVBQWU7UUFIM0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFVBQVU7U0FDckIsQ0FBQztPQUNXLGVBQWUsQ0F1QjNCO0lBQUQsc0JBQUM7Q0FBQSxBQXZCRCxJQXVCQztTQXZCWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZGJDdnZdJyxcbn0pXG5leHBvcnQgY2xhc3MgTWRiQ3Z2RGlyZWN0aXZlIHtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIubWF4TGVuZ3RoJykgbWF4TGVuZ3RoID0gJzQnO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgb25JbnB1dChldmVudDogYW55KSB7XG4gICAgdGhpcy5mb3JtYXRJbnB1dChldmVudCk7XG4gIH1cblxuICBmb3JtYXRJbnB1dChldmVudDogYW55KSB7XG4gICAgY29uc3QgaW5wdXQgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLmdldEZvcm1hdHRlZFZhbHVlKGlucHV0KTtcbiAgICBldmVudC50YXJnZXQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgfVxuXG4gIGdldEZvcm1hdHRlZFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB2YWx1ZSA9IHRoaXMucmVtb3ZlTm9uRGlnaXRzKHZhbHVlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZW1vdmVOb25EaWdpdHModmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICB9XG59XG4iXX0=