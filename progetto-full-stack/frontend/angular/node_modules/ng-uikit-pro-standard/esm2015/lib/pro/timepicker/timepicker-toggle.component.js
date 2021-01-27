import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, HostListener, } from '@angular/core';
import { MdbTimePickerComponent } from './timepicker.component';
export class MdbTimepickerToggleComponent {
    constructor() { }
    handleClick() {
        this.mdbTimePickerToggle.open();
    }
    ngOnInit() { }
}
MdbTimepickerToggleComponent.decorators = [
    { type: Component, args: [{
                template: "<button class=\"mdb-timepicker-toggle\">\n  <svg\n    aria-hidden=\"true\"\n    focusable=\"false\"\n    data-prefix=\"fas\"\n    data-icon=\"clock\"\n    class=\"svg-inline--fa fa-clock fa-w-16\"\n    role=\"img\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 512 512\"\n  >\n    <path\n      fill=\"currentColor\"\n      d=\"M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z\"\n    ></path>\n  </svg>\n</button>\n",
                selector: 'mdb-timepicker-toggle',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mdb-timepicker-toggle{background-color:transparent;border-color:transparent;position:absolute;right:0;top:50%;transform:translateY(-50%)}.mdb-timepicker-toggle svg{height:1em}"]
            },] }
];
MdbTimepickerToggleComponent.ctorParameters = () => [];
MdbTimepickerToggleComponent.propDecorators = {
    mdbTimePickerToggle: [{ type: Input }],
    handleClick: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci10b2dnbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctdWlraXQtcHJvLXN0YW5kYXJkL3NyYy9saWIvcHJvL3RpbWVwaWNrZXIvdGltZXBpY2tlci10b2dnbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUV2QixLQUFLLEVBQ0wsWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBU2hFLE1BQU0sT0FBTyw0QkFBNEI7SUFRdkMsZ0JBQWUsQ0FBQztJQUpoQixXQUFXO1FBQ1QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFJRCxRQUFRLEtBQUksQ0FBQzs7O1lBakJkLFNBQVMsU0FBQztnQkFDVCx1bUJBQWlEO2dCQUNqRCxRQUFRLEVBQUUsdUJBQXVCO2dCQUVqQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O2tDQUVFLEtBQUs7MEJBRUwsWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgSG9zdExpc3RlbmVyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1kYlRpbWVQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL3RpbWVwaWNrZXIuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lcGlja2VyLXRvZ2dsZS5jb21wb25lbnQuaHRtbCcsXG4gIHNlbGVjdG9yOiAnbWRiLXRpbWVwaWNrZXItdG9nZ2xlJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGltZXBpY2tlci10b2dnbGUuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kYlRpbWVwaWNrZXJUb2dnbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBtZGJUaW1lUGlja2VyVG9nZ2xlOiBNZGJUaW1lUGlja2VyQ29tcG9uZW50O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgaGFuZGxlQ2xpY2soKSB7XG4gICAgdGhpcy5tZGJUaW1lUGlja2VyVG9nZ2xlLm9wZW4oKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHt9XG59XG4iXX0=