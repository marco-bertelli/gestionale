import { Component, ElementRef, Input, HostListener, InjectionToken, Optional, Inject, HostBinding, ViewEncapsulation, ChangeDetectorRef, EventEmitter, Output, } from '@angular/core';
import { Subject } from 'rxjs';
export const MDB_OPTION_PARENT = new InjectionToken('MDB_OPTION_PARENT');
export const MDB_OPTION_GROUP = new InjectionToken('MDB_OPTION_GROUP');
export class OptionComponent {
    constructor(_el, _cdRef, _parent, group) {
        this._el = _el;
        this._cdRef = _cdRef;
        this._parent = _parent;
        this.group = group;
        this.disabled = false;
        this.selectionChange = new EventEmitter();
        this._selected = false;
        this._active = false;
        this._multiple = false;
        this.clicked = false;
        this.clickSource = new Subject();
        this.click$ = this.clickSource.asObservable();
        this.option = true;
        this.clicked = false;
    }
    get label() {
        return this._label || this._el.nativeElement.textContent;
    }
    set label(newValue) {
        this._label = newValue;
    }
    get active() {
        return this._active;
    }
    get selected() {
        return this._selected;
    }
    get optionHeight() {
        return this._optionHeight;
    }
    get role() {
        return 'option';
    }
    get isDisabled() {
        return this.disabled ? true : false;
    }
    get isSelected() {
        return this.selected;
    }
    onClick() {
        this.clickSource.next(this);
    }
    getLabel() {
        return this._el.nativeElement.textContent;
    }
    get offsetHeight() {
        return this._el.nativeElement.offsetHeight;
    }
    ngOnInit() {
        if (this._parent && this._parent.visibleOptions && this._parent.optionHeight) {
            this._optionHeight = this._parent.optionHeight;
        }
        if (this._parent && this._parent.multiple) {
            this._multiple = true;
        }
    }
    select() {
        if (!this._selected) {
            this._selected = this._multiple ? !this._selected : true;
            this.selectionChange.emit(this);
            this._cdRef.markForCheck();
        }
    }
    deselect() {
        if (this._selected) {
            this._selected = false;
            this.selectionChange.emit(this);
            this._cdRef.markForCheck();
        }
    }
    setActiveStyles() {
        if (!this._active) {
            this._active = true;
            this._cdRef.markForCheck();
        }
    }
    setInactiveStyles() {
        if (this._active) {
            this._active = false;
            this._cdRef.markForCheck();
        }
    }
}
OptionComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-select-option',
                template: "<span class=\"mdb-option-checkbox-wrapper\" *ngIf=\"_multiple\">\n  <input type=\"checkbox\" [checked]=\"selected\" class=\"form-check-input mdb-option-checkbox\" />\n  <label class=\"mdb-option-checkbox-label\"></label>\n</span>\n<span class=\"mdb-option-text\" ngClass=\"{'active', active}\">\n  <ng-content></ng-content>\n</span>\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".mdb-option{align-items:center;background-color:transparent;color:rgba(0,0,0,.87);cursor:pointer;display:flex;flex-direction:row;font-size:1rem;font-weight:400;height:48px;padding-left:16px;padding-right:16px;text-overflow:ellipsis;white-space:nowrap;width:100%}.mdb-option.active,.mdb-option.selected.active,.mdb-option:hover{background-color:#ddd}.mdb-option.selected.disabled{background-color:transparent;color:#9e9e9e;cursor:default}.mdb-option.selected{background-color:#eee}.mdb-option.disabled{color:#9e9e9e;cursor:default}.mdb-option.mdb-select-all-option.selected.active{background-color:#ddd}.mdb-option.mdb-select-all-option.selected{background-color:#fff}.mdb-option-label{align-items:center;display:flex;height:37px;justify-content:space-between;line-height:37px;width:100%}.mdb-option-checkbox-label{height:10px!important;margin-top:-2px!important;top:0!important}.mdb-option-text{width:100%}.mdb-option-text.active{background-color:#00f}.mdb-option-icon{height:34px;width:34px}[type=checkbox]:checked,[type=checkbox]:not(:checked){opacity:0;pointer-events:none;position:absolute}.form-check-input[type=checkbox]+label,label.btn input[type=checkbox]+label{-moz-user-select:none;-webkit-user-select:none;cursor:pointer;display:inline-block;height:1.5625rem;line-height:1.5625rem;padding-left:35px;position:relative;user-select:none}.form-check-input[type=checkbox]+label:before,.form-check-input[type=checkbox]:not(.filled-in)+label:after,label.btn input[type=checkbox]+label:before,label.btn input[type=checkbox]:not(.filled-in)+label:after{border:2px solid #8a8a8a;border-radius:1px;content:\"\";height:18px;left:0;margin-top:3px;position:absolute;top:0;transition:.2s;width:18px;z-index:0}.form-check-input[type=checkbox]:not(.filled-in)+label:after,label.btn input[type=checkbox]:not(.filled-in)+label:after{border:0;transform:scale(0)}.form-check-input[type=checkbox]:not(:checked):disabled+label:before,label.btn input[type=checkbox]:not(:checked):disabled+label:before{background-color:#bdbdbd;border:none}.form-check-input[type=checkbox]:checked+label:before,label.btn input[type=checkbox]:checked+label:before{-webkit-backface-visibility:hidden;backface-visibility:hidden;border-color:transparent #4285f4 #4285f4 transparent;border-style:solid;border-width:2px;height:1.375rem;left:-5px;top:-4px;transform:rotate(40deg);transform-origin:100% 100%;width:12px}.form-check-input[type=checkbox]:checked:disabled+label:before,label.btn input[type=checkbox]:checked:disabled+label:before{border-bottom:2px solid #bdbdbd;border-right:2px solid #bdbdbd}.form-check-input[type=checkbox]:indeterminate+label:before,label.btn input[type=checkbox]:indeterminate+label:before{-webkit-backface-visibility:hidden;backface-visibility:hidden;border:none;border-right:2px solid #4285f4;height:1.375rem;left:-12px;top:-11px;transform:rotate(90deg);transform-origin:100% 100%;width:10px}.form-check-input[type=checkbox]:indeterminate:disabled+label:before,label.btn input[type=checkbox]:indeterminate:disabled+label:before{background-color:transparent;border-right:2px solid rgba(0,0,0,.46)}.form-check-input[type=checkbox].filled-in+label:after,label.btn input[type=checkbox].filled-in+label:after{border-radius:.125rem}.form-check-input[type=checkbox].filled-in+label:after,.form-check-input[type=checkbox].filled-in+label:before,label.btn input[type=checkbox].filled-in+label:after,label.btn input[type=checkbox].filled-in+label:before{content:\"\";left:0;position:absolute;transition:border .25s,background-color .25s,width .2s .1s,height .2s .1s,top .2s .1s,left .2s .1s;z-index:1}.form-check-input[type=checkbox].filled-in:not(:checked)+label:before,label.btn input[type=checkbox].filled-in:not(:checked)+label:before{border:3px solid transparent;height:0;left:6px;top:10px;transform:rotate(37deg);transform-origin:100% 100%;width:0}.form-check-input[type=checkbox].filled-in:not(:checked)+label:after,label.btn input[type=checkbox].filled-in:not(:checked)+label:after{background-color:transparent;border:2px solid #5a5a5a;height:20px;top:0;width:20px;z-index:0}.form-check-input[type=checkbox].filled-in:checked+label:before,label.btn input[type=checkbox].filled-in:checked+label:before{border-color:transparent #fff #fff transparent;border-style:solid;border-width:2px;height:13px;left:1px;top:0;transform:rotate(37deg);transform-origin:100% 100%;width:8px}.form-check-input[type=checkbox].filled-in:checked+label:after,label.btn input[type=checkbox].filled-in:checked+label:after{background-color:#a6c;border:2px solid #a6c;height:20px;top:0;width:20px;z-index:0}.form-check-input[type=checkbox].filled-in.filled-in-danger:checked+label:after,label.btn input[type=checkbox].filled-in.filled-in-danger:checked+label:after{background-color:#f44336;border-color:#f44336}.form-check-input[type=checkbox]:disabled:not(:checked)+label:after,.form-check-input[type=checkbox]:disabled:not(:checked)+label:before,label.btn input[type=checkbox]:disabled:not(:checked)+label:after,label.btn input[type=checkbox]:disabled:not(:checked)+label:before{background-color:#bdbdbd;border-color:#bdbdbd}.form-check-input[type=checkbox]:disabled:checked+label:before,label.btn input[type=checkbox]:disabled:checked+label:before{background-color:transparent}.form-check-input[type=checkbox]:disabled:checked+label:after,label.btn input[type=checkbox]:disabled:checked+label:after{background-color:#bdbdbd;border-color:#bdbdbd}"]
            },] }
];
OptionComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MDB_OPTION_PARENT,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MDB_OPTION_GROUP,] }] }
];
OptionComponent.propDecorators = {
    value: [{ type: Input }],
    label: [{ type: Input }],
    disabled: [{ type: HostBinding, args: ['class.disabled',] }, { type: Input }],
    selectionChange: [{ type: Output }],
    option: [{ type: HostBinding, args: ['class.mdb-option',] }],
    active: [{ type: HostBinding, args: ['class.active',] }],
    selected: [{ type: HostBinding, args: ['class.selected',] }],
    optionHeight: [{ type: HostBinding, args: ['style.height.px',] }],
    role: [{ type: HostBinding, args: ['attr.role',] }],
    isDisabled: [{ type: HostBinding, args: ['attr.aria-disabled',] }],
    isSelected: [{ type: HostBinding, args: ['attr.aria-selected',] }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXVpa2l0LXByby1zdGFuZGFyZC9zcmMvbGliL3Byby9vcHRpb24vb3B0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsWUFBWSxFQUNaLGNBQWMsRUFDZCxRQUFRLEVBQ1IsTUFBTSxFQUVOLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLE1BQU0sQ0FBQztBQWEzQyxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBa0IsbUJBQW1CLENBQUMsQ0FBQztBQUUxRixNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FBdUIsa0JBQWtCLENBQUMsQ0FBQztBQVE3RixNQUFNLE9BQU8sZUFBZTtJQTZCMUIsWUFDVSxHQUFlLEVBQ2YsTUFBeUIsRUFDYyxPQUF3QixFQUMxQixLQUFxQjtRQUgxRCxRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQ2YsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDYyxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUMxQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQW5CcEUsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVFLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFJakUsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFbEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVoQixnQkFBVyxHQUE2QixJQUFJLE9BQU8sRUFBbUIsQ0FBQztRQUN2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QUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7OztZQWhJRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsMFZBQW9DO2dCQUVwQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7OztZQW5DQyxVQUFVO1lBU1YsaUJBQWlCOzRDQTJEZCxRQUFRLFlBQUksTUFBTSxTQUFDLGlCQUFpQjs0Q0FDcEMsUUFBUSxZQUFJLE1BQU0sU0FBQyxnQkFBZ0I7OztvQkFoQ3JDLEtBQUs7b0JBRUwsS0FBSzt1QkFTTCxXQUFXLFNBQUMsZ0JBQWdCLGNBQzVCLEtBQUs7OEJBR0wsTUFBTTtxQkFzQk4sV0FBVyxTQUFDLGtCQUFrQjtxQkFHOUIsV0FBVyxTQUFDLGNBQWM7dUJBSzFCLFdBQVcsU0FBQyxnQkFBZ0I7MkJBSzVCLFdBQVcsU0FBQyxpQkFBaUI7bUJBSzdCLFdBQVcsU0FBQyxXQUFXO3lCQUt2QixXQUFXLFNBQUMsb0JBQW9CO3lCQUtoQyxXQUFXLFNBQUMsb0JBQW9CO3NCQUtoQyxZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIE9wdGlvbmFsLFxuICBJbmplY3QsXG4gIE9uSW5pdCxcbiAgSG9zdEJpbmRpbmcsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT3B0aW9uR3JvdXBDb21wb25lbnQgfSBmcm9tICcuL29wdGlvbi1ncm91cC5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1kYk9wdGlvblBhcmVudCB7XG4gIG9wdGlvbkhlaWdodDogbnVtYmVyO1xuICB2aXNpYmxlT3B0aW9uczogbnVtYmVyO1xuICBtdWx0aXBsZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZGJPcHRpb25Hcm91cCB7XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IE1EQl9PUFRJT05fUEFSRU5UID0gbmV3IEluamVjdGlvblRva2VuPE1kYk9wdGlvblBhcmVudD4oJ01EQl9PUFRJT05fUEFSRU5UJyk7XG5cbmV4cG9ydCBjb25zdCBNREJfT1BUSU9OX0dST1VQID0gbmV3IEluamVjdGlvblRva2VuPE9wdGlvbkdyb3VwQ29tcG9uZW50PignTURCX09QVElPTl9HUk9VUCcpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItc2VsZWN0LW9wdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnb3B0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vb3B0aW9uLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE9wdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG5cbiAgQElucHV0KClcbiAgZ2V0IGxhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLl9sYWJlbCB8fCB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50O1xuICB9XG4gIHNldCBsYWJlbChuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbGFiZWwgPSBuZXdWYWx1ZTtcbiAgfVxuICBwcml2YXRlIF9sYWJlbDogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxuICBASW5wdXQoKVxuICBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE9wdGlvbkNvbXBvbmVudD4oKTtcblxuICBfb3B0aW9uSGVpZ2h0OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBfc2VsZWN0ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfYWN0aXZlID0gZmFsc2U7XG4gIF9tdWx0aXBsZSA9IGZhbHNlO1xuXG4gIGNsaWNrZWQgPSBmYWxzZTtcblxuICBjbGlja1NvdXJjZTogU3ViamVjdDxPcHRpb25Db21wb25lbnQ+ID0gbmV3IFN1YmplY3Q8T3B0aW9uQ29tcG9uZW50PigpO1xuICBjbGljayQ6IE9ic2VydmFibGU8T3B0aW9uQ29tcG9uZW50PiA9IHRoaXMuY2xpY2tTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTURCX09QVElPTl9QQVJFTlQpIHByaXZhdGUgX3BhcmVudDogTWRiT3B0aW9uUGFyZW50LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTURCX09QVElPTl9HUk9VUCkgcHVibGljIGdyb3VwOiBNZGJPcHRpb25Hcm91cFxuICApIHtcbiAgICB0aGlzLmNsaWNrZWQgPSBmYWxzZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubWRiLW9wdGlvbicpXG4gIG9wdGlvbiA9IHRydWU7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKVxuICBnZXQgYWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNlbGVjdGVkJylcbiAgZ2V0IHNlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0LnB4JylcbiAgZ2V0IG9wdGlvbkhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25IZWlnaHQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpXG4gIGdldCByb2xlKCkge1xuICAgIHJldHVybiAnb3B0aW9uJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWRpc2FibGVkJylcbiAgZ2V0IGlzRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1zZWxlY3RlZCcpXG4gIGdldCBpc1NlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIHRoaXMuY2xpY2tTb3VyY2UubmV4dCh0aGlzKTtcbiAgfVxuXG4gIGdldExhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50O1xuICB9XG5cbiAgZ2V0IG9mZnNldEhlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZWwubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5fcGFyZW50ICYmIHRoaXMuX3BhcmVudC52aXNpYmxlT3B0aW9ucyAmJiB0aGlzLl9wYXJlbnQub3B0aW9uSGVpZ2h0KSB7XG4gICAgICB0aGlzLl9vcHRpb25IZWlnaHQgPSB0aGlzLl9wYXJlbnQub3B0aW9uSGVpZ2h0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wYXJlbnQgJiYgdGhpcy5fcGFyZW50Lm11bHRpcGxlKSB7XG4gICAgICB0aGlzLl9tdWx0aXBsZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0KCkge1xuICAgIGlmICghdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5fbXVsdGlwbGUgPyAhdGhpcy5fc2VsZWN0ZWQgOiB0cnVlO1xuICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzKTtcbiAgICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIGRlc2VsZWN0KCkge1xuICAgIGlmICh0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcyk7XG4gICAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBzZXRBY3RpdmVTdHlsZXMoKSB7XG4gICAgaWYgKCF0aGlzLl9hY3RpdmUpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBzZXRJbmFjdGl2ZVN0eWxlcygpIHtcbiAgICBpZiAodGhpcy5fYWN0aXZlKSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxufVxuIl19