import { __decorate, __metadata } from "tslib";
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, HostListener, } from '@angular/core';
import { MdbTimePickerComponent } from './timepicker.component';
var MdbTimepickerToggleComponent = /** @class */ (function () {
    function MdbTimepickerToggleComponent() {
    }
    MdbTimepickerToggleComponent.prototype.handleClick = function () {
        this.mdbTimePickerToggle.open();
    };
    MdbTimepickerToggleComponent.prototype.ngOnInit = function () { };
    __decorate([
        Input(),
        __metadata("design:type", MdbTimePickerComponent)
    ], MdbTimepickerToggleComponent.prototype, "mdbTimePickerToggle", void 0);
    __decorate([
        HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MdbTimepickerToggleComponent.prototype, "handleClick", null);
    MdbTimepickerToggleComponent = __decorate([
        Component({
            template: "<button class=\"mdb-timepicker-toggle\">\n  <svg\n    aria-hidden=\"true\"\n    focusable=\"false\"\n    data-prefix=\"fas\"\n    data-icon=\"clock\"\n    class=\"svg-inline--fa fa-clock fa-w-16\"\n    role=\"img\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 512 512\"\n  >\n    <path\n      fill=\"currentColor\"\n      d=\"M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z\"\n    ></path>\n  </svg>\n</button>\n",
            selector: 'mdb-timepicker-toggle',
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".mdb-timepicker-toggle{position:absolute;right:0;top:50%;transform:translateY(-50%);border-color:transparent;background-color:transparent}.mdb-timepicker-toggle svg{height:1em}"]
        }),
        __metadata("design:paramtypes", [])
    ], MdbTimepickerToggleComponent);
    return MdbTimepickerToggleComponent;
}());
export { MdbTimepickerToggleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci10b2dnbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby90aW1lcGlja2VyL3RpbWVwaWNrZXItdG9nZ2xlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBRXZCLEtBQUssRUFDTCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFTaEU7SUFRRTtJQUFlLENBQUM7SUFKaEIsa0RBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBSUQsK0NBQVEsR0FBUixjQUFZLENBQUM7SUFUSjtRQUFSLEtBQUssRUFBRTtrQ0FBc0Isc0JBQXNCOzZFQUFDO0lBR3JEO1FBREMsWUFBWSxDQUFDLE9BQU8sQ0FBQzs7OzttRUFHckI7SUFOVSw0QkFBNEI7UUFQeEMsU0FBUyxDQUFDO1lBQ1QsdW1CQUFpRDtZQUNqRCxRQUFRLEVBQUUsdUJBQXVCO1lBRWpDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDOztPQUNXLDRCQUE0QixDQVd4QztJQUFELG1DQUFDO0NBQUEsQUFYRCxJQVdDO1NBWFksNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIE9uSW5pdCxcbiAgSW5wdXQsXG4gIEhvc3RMaXN0ZW5lcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZGJUaW1lUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lcGlja2VyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJy4vdGltZXBpY2tlci10b2dnbGUuY29tcG9uZW50Lmh0bWwnLFxuICBzZWxlY3RvcjogJ21kYi10aW1lcGlja2VyLXRvZ2dsZScsXG4gIHN0eWxlVXJsczogWycuL3RpbWVwaWNrZXItdG9nZ2xlLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJUaW1lcGlja2VyVG9nZ2xlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgbWRiVGltZVBpY2tlclRvZ2dsZTogTWRiVGltZVBpY2tlckNvbXBvbmVudDtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIGhhbmRsZUNsaWNrKCkge1xuICAgIHRoaXMubWRiVGltZVBpY2tlclRvZ2dsZS5vcGVuKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7fVxufVxuIl19