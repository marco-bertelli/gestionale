import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, HostBinding, Optional, Inject, } from '@angular/core';
import { MDB_OPTION_GROUP, MDB_OPTION_PARENT } from './option.component';
export class OptionGroupComponent {
    constructor(_parent) {
        this._parent = _parent;
        this.optionGroup = true;
        this._optionHeight = 48;
        this._disabled = false;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
    }
    ngOnInit() {
        if (this._parent && this._parent.visibleOptions && this._parent.optionHeight) {
            this._optionHeight = this._parent.optionHeight;
        }
    }
    ngAfterContentInit() { }
}
OptionGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-option-group',
                template: "<label\n  class=\"mdb-option-group-label\"\n  [style.height.px]=\"_optionHeight\"\n  [style.line-height.px]=\"_optionHeight\"\n  >{{ label }}</label\n>\n<ng-content select=\"mdb-select-option\"></ng-content>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [{ provide: MDB_OPTION_GROUP, useExisting: OptionGroupComponent }],
                styles: [".mdb-option-group{display:flex;flex-direction:column}.mdb-option-group-label{border-top:1px solid #eee;color:#9e9e9e;margin:0;padding-left:16px;padding-right:16px;text-overflow:ellipsis;white-space:nowrap}.mdb-option-group:first-child .mdb-option-group-label{border-top:0}"]
            },] }
];
OptionGroupComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MDB_OPTION_PARENT,] }] }
];
OptionGroupComponent.propDecorators = {
    optionGroup: [{ type: HostBinding, args: ['class.mdb-option-group',] }],
    label: [{ type: Input }],
    disabled: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXVpa2l0LXByby1zdGFuZGFyZC9zcmMvbGliL3Byby9vcHRpb24vb3B0aW9uLWdyb3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULGlCQUFpQixFQUNqQix1QkFBdUIsRUFFdkIsS0FBSyxFQUNMLFdBQVcsRUFDWCxRQUFRLEVBQ1IsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBbUIsTUFBTSxvQkFBb0IsQ0FBQztBQVUxRixNQUFNLE9BQU8sb0JBQW9CO0lBZ0IvQixZQUEyRCxPQUF3QjtRQUF4QixZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQWRuRixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQVdYLGNBQVMsR0FBRyxLQUFLLENBQUM7SUFFNEQsQ0FBQztJQVR2RixJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUtELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDNUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztTQUNoRDtJQUNILENBQUM7SUFFRCxrQkFBa0IsS0FBSSxDQUFDOzs7WUFoQ3hCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1Qiw2TkFBMEM7Z0JBRTFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFLENBQUM7O2FBQzlFOzs7NENBaUJjLFFBQVEsWUFBSSxNQUFNLFNBQUMsaUJBQWlCOzs7MEJBZmhELFdBQVcsU0FBQyx3QkFBd0I7b0JBSXBDLEtBQUs7dUJBRUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIElucHV0LFxuICBIb3N0QmluZGluZyxcbiAgT3B0aW9uYWwsXG4gIEluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNREJfT1BUSU9OX0dST1VQLCBNREJfT1BUSU9OX1BBUkVOVCwgTWRiT3B0aW9uUGFyZW50IH0gZnJvbSAnLi9vcHRpb24uY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLW9wdGlvbi1ncm91cCcsXG4gIHRlbXBsYXRlVXJsOiAnb3B0aW9uLWdyb3VwLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vb3B0aW9uLWdyb3VwLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE1EQl9PUFRJT05fR1JPVVAsIHVzZUV4aXN0aW5nOiBPcHRpb25Hcm91cENvbXBvbmVudCB9XSxcbn0pXG5leHBvcnQgY2xhc3MgT3B0aW9uR3JvdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1kYi1vcHRpb24tZ3JvdXAnKVxuICBvcHRpb25Hcm91cCA9IHRydWU7XG4gIF9vcHRpb25IZWlnaHQgPSA0ODtcblxuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoTURCX09QVElPTl9QQVJFTlQpIHByaXZhdGUgX3BhcmVudDogTWRiT3B0aW9uUGFyZW50KSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLl9wYXJlbnQgJiYgdGhpcy5fcGFyZW50LnZpc2libGVPcHRpb25zICYmIHRoaXMuX3BhcmVudC5vcHRpb25IZWlnaHQpIHtcbiAgICAgIHRoaXMuX29wdGlvbkhlaWdodCA9IHRoaXMuX3BhcmVudC5vcHRpb25IZWlnaHQ7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge31cbn1cbiJdfQ==