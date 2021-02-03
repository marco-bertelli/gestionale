import { Directive, HostListener, HostBinding } from '@angular/core';
export class MdbCvvDirective {
    constructor() {
        this.maxLength = '4';
    }
    onInput(event) {
        this.formatInput(event);
    }
    formatInput(event) {
        const input = event.target.value;
        const newValue = this.getFormattedValue(input);
        event.target.value = newValue;
    }
    getFormattedValue(value) {
        value = this.removeNonDigits(value);
        return value;
    }
    removeNonDigits(value) {
        return value.replace(/\D/g, '');
    }
}
MdbCvvDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mdbCvv]',
            },] }
];
MdbCvvDirective.propDecorators = {
    maxLength: [{ type: HostBinding, args: ['attr.maxLength',] }],
    onInput: [{ type: HostListener, args: ['input', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLWN2di5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy11aWtpdC1wcm8tc3RhbmRhcmQvc3JjL2xpYi9wcm8vYXV0by1mb3JtYXQvbWRiLWN2di5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS3JFLE1BQU0sT0FBTyxlQUFlO0lBSDVCO1FBS2lDLGNBQVMsR0FBRyxHQUFHLENBQUM7SUFxQmpELENBQUM7SUFsQkMsT0FBTyxDQUFDLEtBQVU7UUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQVU7UUFDcEIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztJQUNoQyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBYTtRQUM3QixLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxlQUFlLENBQUMsS0FBYTtRQUMzQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7OztZQXpCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7YUFDckI7Ozt3QkFHRSxXQUFXLFNBQUMsZ0JBQWdCO3NCQUU1QixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZGJDdnZdJyxcbn0pXG5leHBvcnQgY2xhc3MgTWRiQ3Z2RGlyZWN0aXZlIHtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIubWF4TGVuZ3RoJykgbWF4TGVuZ3RoID0gJzQnO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgb25JbnB1dChldmVudDogYW55KSB7XG4gICAgdGhpcy5mb3JtYXRJbnB1dChldmVudCk7XG4gIH1cblxuICBmb3JtYXRJbnB1dChldmVudDogYW55KSB7XG4gICAgY29uc3QgaW5wdXQgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLmdldEZvcm1hdHRlZFZhbHVlKGlucHV0KTtcbiAgICBldmVudC50YXJnZXQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgfVxuXG4gIGdldEZvcm1hdHRlZFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB2YWx1ZSA9IHRoaXMucmVtb3ZlTm9uRGlnaXRzKHZhbHVlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZW1vdmVOb25EaWdpdHModmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICB9XG59XG4iXX0=