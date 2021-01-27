import { __decorate, __metadata, __param } from "tslib";
import { Component, ElementRef, Input, HostListener, InjectionToken, Optional, Inject, OnInit, HostBinding, ViewEncapsulation, ChangeDetectorRef, EventEmitter, Output, } from '@angular/core';
import { Subject } from 'rxjs';
export var MDB_OPTION_PARENT = new InjectionToken('MDB_OPTION_PARENT');
export var MDB_OPTION_GROUP = new InjectionToken('MDB_OPTION_GROUP');
var OptionComponent = /** @class */ (function () {
    function OptionComponent(_el, _cdRef, _parent, group) {
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
    Object.defineProperty(OptionComponent.prototype, "active", {
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptionComponent.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptionComponent.prototype, "optionHeight", {
        get: function () {
            return this._optionHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptionComponent.prototype, "role", {
        get: function () {
            return 'option';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptionComponent.prototype, "isDisabled", {
        get: function () {
            return this.disabled ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptionComponent.prototype, "isSelected", {
        get: function () {
            return this.selected;
        },
        enumerable: true,
        configurable: true
    });
    OptionComponent.prototype.onClick = function () {
        this.clickSource.next(this);
    };
    Object.defineProperty(OptionComponent.prototype, "label", {
        get: function () {
            return this._el.nativeElement.textContent;
        },
        enumerable: true,
        configurable: true
    });
    OptionComponent.prototype.getLabel = function () {
        return this._el.nativeElement.textContent;
    };
    Object.defineProperty(OptionComponent.prototype, "offsetHeight", {
        get: function () {
            return this._el.nativeElement.offsetHeight;
        },
        enumerable: true,
        configurable: true
    });
    OptionComponent.prototype.ngOnInit = function () {
        if (this._parent && this._parent.visibleOptions && this._parent.optionHeight) {
            this._optionHeight = this._parent.optionHeight;
        }
        if (this._parent && this._parent.multiple) {
            this._multiple = true;
        }
    };
    OptionComponent.prototype.select = function () {
        if (!this._selected) {
            this._selected = this._multiple ? !this._selected : true;
            this.selectionChange.emit(this);
            this._cdRef.markForCheck();
        }
    };
    OptionComponent.prototype.deselect = function () {
        if (this._selected) {
            this._selected = false;
            this.selectionChange.emit(this);
            this._cdRef.markForCheck();
        }
    };
    OptionComponent.prototype.setActiveStyles = function () {
        if (!this._active) {
            this._active = true;
            this._cdRef.markForCheck();
        }
    };
    OptionComponent.prototype.setInactiveStyles = function () {
        if (this._active) {
            this._active = false;
            this._cdRef.markForCheck();
        }
    };
    OptionComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MDB_OPTION_PARENT,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MDB_OPTION_GROUP,] }] }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], OptionComponent.prototype, "value", void 0);
    __decorate([
        HostBinding('class.disabled'),
        Input(),
        __metadata("design:type", Object)
    ], OptionComponent.prototype, "disabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], OptionComponent.prototype, "selectionChange", void 0);
    __decorate([
        HostBinding('class.mdb-option'),
        __metadata("design:type", Object)
    ], OptionComponent.prototype, "option", void 0);
    __decorate([
        HostBinding('class.active'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], OptionComponent.prototype, "active", null);
    __decorate([
        HostBinding('class.selected'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], OptionComponent.prototype, "selected", null);
    __decorate([
        HostBinding('style.height.px'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [])
    ], OptionComponent.prototype, "optionHeight", null);
    __decorate([
        HostBinding('attr.role'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], OptionComponent.prototype, "role", null);
    __decorate([
        HostBinding('attr.aria-disabled'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], OptionComponent.prototype, "isDisabled", null);
    __decorate([
        HostBinding('attr.aria-selected'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], OptionComponent.prototype, "isSelected", null);
    __decorate([
        HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], OptionComponent.prototype, "onClick", null);
    OptionComponent = __decorate([
        Component({
            selector: 'mdb-select-option',
            template: "<span class=\"mdb-option-checkbox-wrapper\" *ngIf=\"_multiple\">\n  <input type=\"checkbox\" [checked]=\"selected\" class=\"form-check-input mdb-option-checkbox\" />\n  <label class=\"mdb-option-checkbox-label\"></label>\n</span>\n<span class=\"mdb-option-text\" ngClass=\"{'active', active}\">\n  <ng-content></ng-content>\n</span>\n",
            encapsulation: ViewEncapsulation.None,
            styles: [".mdb-option{width:100%;height:48px;white-space:nowrap;text-overflow:ellipsis;cursor:pointer;display:flex;flex-direction:row;align-items:center;color:rgba(0,0,0,.87);padding-left:16px;padding-right:16px;font-size:1rem;font-weight:400;background-color:transparent}.mdb-option.active,.mdb-option.selected.active,.mdb-option:hover{background-color:#ddd}.mdb-option.selected.disabled{cursor:default;color:#9e9e9e;background-color:transparent}.mdb-option.selected{background-color:#eee}.mdb-option.disabled{cursor:default;color:#9e9e9e}.mdb-option.mdb-select-all-option.selected.active{background-color:#ddd}.mdb-option.mdb-select-all-option.selected{background-color:#fff}.mdb-option-label{display:flex;align-items:center;justify-content:space-between;width:100%;height:37px;line-height:37px}.mdb-option-checkbox-label{height:10px!important;top:0!important;margin-top:-2px!important}.mdb-option-text{width:100%}.mdb-option-text.active{background-color:#00f}.mdb-option-icon{height:34px;width:34px}[type=checkbox]:checked,[type=checkbox]:not(:checked){position:absolute;opacity:0;pointer-events:none}.form-check-input[type=checkbox]+label,label.btn input[type=checkbox]+label{position:relative;padding-left:35px;cursor:pointer;display:inline-block;height:1.5625rem;line-height:1.5625rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.form-check-input[type=checkbox]+label:before,.form-check-input[type=checkbox]:not(.filled-in)+label:after,label.btn input[type=checkbox]+label:before,label.btn input[type=checkbox]:not(.filled-in)+label:after{content:\"\";position:absolute;top:0;left:0;width:18px;height:18px;z-index:0;border:2px solid #8a8a8a;border-radius:1px;margin-top:3px;transition:.2s}.form-check-input[type=checkbox]:not(.filled-in)+label:after,label.btn input[type=checkbox]:not(.filled-in)+label:after{border:0;transform:scale(0)}.form-check-input[type=checkbox]:not(:checked):disabled+label:before,label.btn input[type=checkbox]:not(:checked):disabled+label:before{border:none;background-color:#bdbdbd}.form-check-input[type=checkbox]:checked+label:before,label.btn input[type=checkbox]:checked+label:before{top:-4px;left:-5px;width:12px;height:1.375rem;border-top:2px solid transparent;border-left:2px solid transparent;border-right:2px solid #4285f4;border-bottom:2px solid #4285f4;transform:rotate(40deg);-webkit-backface-visibility:hidden;backface-visibility:hidden;transform-origin:100% 100%}.form-check-input[type=checkbox]:checked:disabled+label:before,label.btn input[type=checkbox]:checked:disabled+label:before{border-right:2px solid #bdbdbd;border-bottom:2px solid #bdbdbd}.form-check-input[type=checkbox]:indeterminate+label:before,label.btn input[type=checkbox]:indeterminate+label:before{top:-11px;left:-12px;width:10px;height:1.375rem;border-top:none;border-left:none;border-right:2px solid #4285f4;border-bottom:none;transform:rotate(90deg);-webkit-backface-visibility:hidden;backface-visibility:hidden;transform-origin:100% 100%}.form-check-input[type=checkbox]:indeterminate:disabled+label:before,label.btn input[type=checkbox]:indeterminate:disabled+label:before{border-right:2px solid rgba(0,0,0,.46);background-color:transparent}.form-check-input[type=checkbox].filled-in+label:after,label.btn input[type=checkbox].filled-in+label:after{border-radius:.125rem}.form-check-input[type=checkbox].filled-in+label:after,.form-check-input[type=checkbox].filled-in+label:before,label.btn input[type=checkbox].filled-in+label:after,label.btn input[type=checkbox].filled-in+label:before{content:\"\";left:0;position:absolute;transition:border .25s,background-color .25s,width .2s .1s,height .2s .1s,top .2s .1s,left .2s .1s;z-index:1}.form-check-input[type=checkbox].filled-in:not(:checked)+label:before,label.btn input[type=checkbox].filled-in:not(:checked)+label:before{width:0;height:0;border:3px solid transparent;left:6px;top:10px;transform:rotateZ(37deg);transform-origin:100% 100%}.form-check-input[type=checkbox].filled-in:not(:checked)+label:after,label.btn input[type=checkbox].filled-in:not(:checked)+label:after{height:20px;width:20px;background-color:transparent;border:2px solid #5a5a5a;top:0;z-index:0}.form-check-input[type=checkbox].filled-in:checked+label:before,label.btn input[type=checkbox].filled-in:checked+label:before{top:0;left:1px;width:8px;height:13px;border-top:2px solid transparent;border-left:2px solid transparent;border-right:2px solid #fff;border-bottom:2px solid #fff;transform:rotateZ(37deg);transform-origin:100% 100%}.form-check-input[type=checkbox].filled-in:checked+label:after,label.btn input[type=checkbox].filled-in:checked+label:after{top:0;width:20px;height:20px;border:2px solid #a6c;background-color:#a6c;z-index:0}.form-check-input[type=checkbox].filled-in.filled-in-danger:checked+label:after,label.btn input[type=checkbox].filled-in.filled-in-danger:checked+label:after{background-color:#f44336;border-color:#f44336}.form-check-input[type=checkbox]:disabled:not(:checked)+label:before,label.btn input[type=checkbox]:disabled:not(:checked)+label:before{background-color:#bdbdbd;border-color:#bdbdbd}.form-check-input[type=checkbox]:disabled:not(:checked)+label:after,label.btn input[type=checkbox]:disabled:not(:checked)+label:after{border-color:#bdbdbd;background-color:#bdbdbd}.form-check-input[type=checkbox]:disabled:checked+label:before,label.btn input[type=checkbox]:disabled:checked+label:before{background-color:transparent}.form-check-input[type=checkbox]:disabled:checked+label:after,label.btn input[type=checkbox]:disabled:checked+label:after{background-color:#bdbdbd;border-color:#bdbdbd}"]
        }),
        __param(2, Optional()), __param(2, Inject(MDB_OPTION_PARENT)),
        __param(3, Optional()), __param(3, Inject(MDB_OPTION_GROUP)),
        __metadata("design:paramtypes", [ElementRef,
            ChangeDetectorRef, Object, Object])
    ], OptionComponent);
    return OptionComponent;
}());
export { OptionComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vb3B0aW9uL29wdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxZQUFZLEVBQ1osY0FBYyxFQUNkLFFBQVEsRUFDUixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLE1BQU0sQ0FBQztBQWEzQyxNQUFNLENBQUMsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBa0IsbUJBQW1CLENBQUMsQ0FBQztBQUUxRixNQUFNLENBQUMsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FBdUIsa0JBQWtCLENBQUMsQ0FBQztBQVE3RjtJQW9CRSx5QkFDVSxHQUFlLEVBQ2YsTUFBeUIsRUFDYyxPQUF3QixFQUMxQixLQUFxQjtRQUgxRCxRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQ2YsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDYyxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUMxQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQW5CcEUsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVFLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFJakUsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFbEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVoQixnQkFBVyxHQUE2QixJQUFJLE9BQU8sRUFBbUIsQ0FBQztRQUN2RSxXQUFNLEdBQWdDLElBQUksQ0FBQyxXQUFXLENB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QUFELHNCQUFDO0NBQUEsQUF0SEQsSUFzSEM7U0F0SFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIE9wdGlvbmFsLFxuICBJbmplY3QsXG4gIE9uSW5pdCxcbiAgSG9zdEJpbmRpbmcsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT3B0aW9uR3JvdXBDb21wb25lbnQgfSBmcm9tICcuL29wdGlvbi1ncm91cC5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1kYk9wdGlvblBhcmVudCB7XG4gIG9wdGlvbkhlaWdodDogbnVtYmVyO1xuICB2aXNpYmxlT3B0aW9uczogbnVtYmVyO1xuICBtdWx0aXBsZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZGJPcHRpb25Hcm91cCB7XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IE1EQl9PUFRJT05fUEFSRU5UID0gbmV3IEluamVjdGlvblRva2VuPE1kYk9wdGlvblBhcmVudD4oJ01EQl9PUFRJT05fUEFSRU5UJyk7XG5cbmV4cG9ydCBjb25zdCBNREJfT1BUSU9OX0dST1VQID0gbmV3IEluamVjdGlvblRva2VuPE9wdGlvbkdyb3VwQ29tcG9uZW50PignTURCX09QVElPTl9HUk9VUCcpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItc2VsZWN0LW9wdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnb3B0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vb3B0aW9uLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE9wdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXNhYmxlZCcpXG4gIEBJbnB1dCgpXG4gIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8T3B0aW9uQ29tcG9uZW50PigpO1xuXG4gIF9vcHRpb25IZWlnaHQ6IG51bWJlcjtcblxuICBwcml2YXRlIF9zZWxlY3RlZCA9IGZhbHNlO1xuICBwcml2YXRlIF9hY3RpdmUgPSBmYWxzZTtcbiAgX211bHRpcGxlID0gZmFsc2U7XG5cbiAgY2xpY2tlZCA9IGZhbHNlO1xuXG4gIGNsaWNrU291cmNlOiBTdWJqZWN0PE9wdGlvbkNvbXBvbmVudD4gPSBuZXcgU3ViamVjdDxPcHRpb25Db21wb25lbnQ+KCk7XG4gIGNsaWNrJDogT2JzZXJ2YWJsZTxPcHRpb25Db21wb25lbnQ+ID0gdGhpcy5jbGlja1NvdXJjZS5hc09ic2VydmFibGUoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNREJfT1BUSU9OX1BBUkVOVCkgcHJpdmF0ZSBfcGFyZW50OiBNZGJPcHRpb25QYXJlbnQsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNREJfT1BUSU9OX0dST1VQKSBwdWJsaWMgZ3JvdXA6IE1kYk9wdGlvbkdyb3VwXG4gICkge1xuICAgIHRoaXMuY2xpY2tlZCA9IGZhbHNlO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tZGItb3B0aW9uJylcbiAgb3B0aW9uID0gdHJ1ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjdGl2ZScpXG4gIGdldCBhY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2VsZWN0ZWQnKVxuICBnZXQgc2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQucHgnKVxuICBnZXQgb3B0aW9uSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbkhlaWdodDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgZ2V0IHJvbGUoKSB7XG4gICAgcmV0dXJuICdvcHRpb24nO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtZGlzYWJsZWQnKVxuICBnZXQgaXNEaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXNlbGVjdGVkJylcbiAgZ2V0IGlzU2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQ7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgdGhpcy5jbGlja1NvdXJjZS5uZXh0KHRoaXMpO1xuICB9XG5cbiAgZ2V0IGxhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50O1xuICB9XG5cbiAgZ2V0TGFiZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gIH1cblxuICBnZXQgb2Zmc2V0SGVpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLl9lbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLl9wYXJlbnQgJiYgdGhpcy5fcGFyZW50LnZpc2libGVPcHRpb25zICYmIHRoaXMuX3BhcmVudC5vcHRpb25IZWlnaHQpIHtcbiAgICAgIHRoaXMuX29wdGlvbkhlaWdodCA9IHRoaXMuX3BhcmVudC5vcHRpb25IZWlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3BhcmVudCAmJiB0aGlzLl9wYXJlbnQubXVsdGlwbGUpIHtcbiAgICAgIHRoaXMuX211bHRpcGxlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3QoKSB7XG4gICAgaWYgKCF0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLl9tdWx0aXBsZSA/ICF0aGlzLl9zZWxlY3RlZCA6IHRydWU7XG4gICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMpO1xuICAgICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgZGVzZWxlY3QoKSB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzKTtcbiAgICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHNldEFjdGl2ZVN0eWxlcygpIHtcbiAgICBpZiAoIXRoaXMuX2FjdGl2ZSkge1xuICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHNldEluYWN0aXZlU3R5bGVzKCkge1xuICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG59XG4iXX0=