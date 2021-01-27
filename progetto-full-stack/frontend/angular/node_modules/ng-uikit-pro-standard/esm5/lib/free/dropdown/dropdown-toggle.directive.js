import { __decorate, __metadata, __values } from "tslib";
import { Directive, ElementRef, HostBinding, HostListener, OnDestroy, Renderer2, ChangeDetectorRef, } from '@angular/core';
import { BsDropdownState } from './dropdown.state';
var BsDropdownToggleDirective = /** @class */ (function () {
    function BsDropdownToggleDirective(_state, _element, _renderer, _cdRef) {
        var _this = this;
        this._state = _state;
        this._element = _element;
        this._renderer = _renderer;
        this._cdRef = _cdRef;
        this._subscriptions = [];
        this.ariaHaspopup = true;
        this.isDisabled = null;
        // sync is open value with state
        this._state.isOpenChange.subscribe(function (value) {
            _this.isOpen = value;
            if (value) {
                _this._documentClickListener = _this._renderer.listen('document', 'click', function (event) {
                    if (_this._state.autoClose &&
                        event.button !== 2 &&
                        !_this._element.nativeElement.contains(event.target)) {
                        _this._state.toggleClick.emit(false);
                        _this._cdRef.detectChanges();
                    }
                });
                _this._escKeyUpListener = _this._renderer.listen(_this._element.nativeElement, 'keyup.esc', function () {
                    if (_this._state.autoClose) {
                        _this._state.toggleClick.emit(false);
                        _this._cdRef.detectChanges();
                    }
                });
            }
            else {
                _this._documentClickListener();
                _this._escKeyUpListener();
            }
        });
        // populate disabled state
        this._subscriptions.push(this._state.isDisabledChange.subscribe(function (value) { return (_this.isDisabled = value || null); }));
    }
    BsDropdownToggleDirective.prototype.onClick = function () {
        if (this.isDisabled) {
            return;
        }
        this._state.toggleClick.emit();
    };
    BsDropdownToggleDirective.prototype.ngOnDestroy = function () {
        var e_1, _a;
        if (this._documentClickListener) {
            this._documentClickListener();
        }
        if (this._escKeyUpListener) {
            this._escKeyUpListener();
        }
        try {
            for (var _b = __values(this._subscriptions), _c = _b.next(); !_c.done; _c = _b.next()) {
                var sub = _c.value;
                sub.unsubscribe();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    BsDropdownToggleDirective.ctorParameters = function () { return [
        { type: BsDropdownState },
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        HostBinding('attr.aria-haspopup'),
        __metadata("design:type", Object)
    ], BsDropdownToggleDirective.prototype, "ariaHaspopup", void 0);
    __decorate([
        HostBinding('attr.disabled'),
        __metadata("design:type", Object)
    ], BsDropdownToggleDirective.prototype, "isDisabled", void 0);
    __decorate([
        HostBinding('attr.aria-expanded'),
        __metadata("design:type", Boolean)
    ], BsDropdownToggleDirective.prototype, "isOpen", void 0);
    __decorate([
        HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BsDropdownToggleDirective.prototype, "onClick", null);
    BsDropdownToggleDirective = __decorate([
        Directive({
            selector: '[mdbDropdownToggle],[dropdownToggle]',
            exportAs: 'bs-dropdown-toggle',
        }),
        __metadata("design:paramtypes", [BsDropdownState,
            ElementRef,
            Renderer2,
            ChangeDetectorRef])
    ], BsDropdownToggleDirective);
    return BsDropdownToggleDirective;
}());
export { BsDropdownToggleDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tdG9nZ2xlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9mcmVlL2Ryb3Bkb3duL2Ryb3Bkb3duLXRvZ2dsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLEVBQ1osU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBTW5EO0lBaUJFLG1DQUNVLE1BQXVCLEVBQ3ZCLFFBQW9CLEVBQ3BCLFNBQW9CLEVBQ3BCLE1BQXlCO1FBSm5DLGlCQTJDQztRQTFDUyxXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUN2QixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFwQjNCLG1CQUFjLEdBQW1CLEVBQUUsQ0FBQztRQUlULGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLGVBQVUsR0FBa0IsSUFBSSxDQUFDO1FBaUI3RCxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBYztZQUNoRCxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUVwQixJQUFJLEtBQUssRUFBRTtnQkFDVCxLQUFJLENBQUMsc0JBQXNCLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFDLEtBQVU7b0JBQ2xGLElBQ0UsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTO3dCQUNyQixLQUFLLENBQUMsTUFBTSxLQUFLLENBQUM7d0JBQ2xCLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFDbkQ7d0JBQ0EsS0FBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNwQyxLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO3FCQUM3QjtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFFSCxLQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQzVDLEtBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMzQixXQUFXLEVBQ1g7b0JBQ0UsSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTt3QkFDekIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNwQyxLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO3FCQUM3QjtnQkFDSCxDQUFDLENBQ0YsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2dCQUM5QixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUMxQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FDcEMsVUFBQyxLQUFvQixJQUFLLE9BQUEsQ0FBQyxLQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsRUFBakMsQ0FBaUMsQ0FDNUQsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQWxERCwyQ0FBTyxHQUFQO1FBQ0UsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUErQ0QsK0NBQVcsR0FBWDs7UUFDRSxJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUMvQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUMvQjtRQUVELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFCOztZQUVELEtBQWtCLElBQUEsS0FBQSxTQUFBLElBQUksQ0FBQyxjQUFjLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQWxDLElBQU0sR0FBRyxXQUFBO2dCQUNaLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNuQjs7Ozs7Ozs7O0lBQ0gsQ0FBQzs7Z0JBeERpQixlQUFlO2dCQUNiLFVBQVU7Z0JBQ1QsU0FBUztnQkFDWixpQkFBaUI7O0lBaEJBO1FBQWxDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQzs7bUVBQXFCO0lBQ3pCO1FBQTdCLFdBQVcsQ0FBQyxlQUFlLENBQUM7O2lFQUFrQztJQUM1QjtRQUFsQyxXQUFXLENBQUMsb0JBQW9CLENBQUM7OzZEQUFpQjtJQUduRDtRQURDLFlBQVksQ0FBQyxPQUFPLENBQUM7Ozs7NERBTXJCO0lBZlUseUJBQXlCO1FBSnJDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxzQ0FBc0M7WUFDaEQsUUFBUSxFQUFFLG9CQUFvQjtTQUMvQixDQUFDO3lDQW1Ca0IsZUFBZTtZQUNiLFVBQVU7WUFDVCxTQUFTO1lBQ1osaUJBQWlCO09BckJ4Qix5QkFBeUIsQ0EyRXJDO0lBQUQsZ0NBQUM7Q0FBQSxBQTNFRCxJQTJFQztTQTNFWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIE9uRGVzdHJveSxcbiAgUmVuZGVyZXIyLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQnNEcm9wZG93blN0YXRlIH0gZnJvbSAnLi9kcm9wZG93bi5zdGF0ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZGJEcm9wZG93blRvZ2dsZV0sW2Ryb3Bkb3duVG9nZ2xlXScsXG4gIGV4cG9ydEFzOiAnYnMtZHJvcGRvd24tdG9nZ2xlJyxcbn0pXG5leHBvcnQgY2xhc3MgQnNEcm9wZG93blRvZ2dsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHByaXZhdGUgX2RvY3VtZW50Q2xpY2tMaXN0ZW5lcjogRnVuY3Rpb247XG4gIHByaXZhdGUgX2VzY0tleVVwTGlzdGVuZXI6IEZ1bmN0aW9uO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWhhc3BvcHVwJykgYXJpYUhhc3BvcHVwID0gdHJ1ZTtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmRpc2FibGVkJykgaXNEaXNhYmxlZDogYm9vbGVhbiB8IGFueSA9IG51bGw7XG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWV4cGFuZGVkJykgaXNPcGVuOiBib29sZWFuO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3N0YXRlLnRvZ2dsZUNsaWNrLmVtaXQoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3N0YXRlOiBCc0Ryb3Bkb3duU3RhdGUsXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICAvLyBzeW5jIGlzIG9wZW4gdmFsdWUgd2l0aCBzdGF0ZVxuICAgIHRoaXMuX3N0YXRlLmlzT3BlbkNoYW5nZS5zdWJzY3JpYmUoKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgICB0aGlzLmlzT3BlbiA9IHZhbHVlO1xuXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdGhpcy5fcmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdjbGljaycsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fc3RhdGUuYXV0b0Nsb3NlICYmXG4gICAgICAgICAgICBldmVudC5idXR0b24gIT09IDIgJiZcbiAgICAgICAgICAgICF0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUudG9nZ2xlQ2xpY2suZW1pdChmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLl9jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9lc2NLZXlVcExpc3RlbmVyID0gdGhpcy5fcmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAna2V5dXAuZXNjJyxcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc3RhdGUuYXV0b0Nsb3NlKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3N0YXRlLnRvZ2dsZUNsaWNrLmVtaXQoZmFsc2UpO1xuICAgICAgICAgICAgICB0aGlzLl9jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuX2VzY0tleVVwTGlzdGVuZXIoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBwb3B1bGF0ZSBkaXNhYmxlZCBzdGF0ZVxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuX3N0YXRlLmlzRGlzYWJsZWRDaGFuZ2Uuc3Vic2NyaWJlKFxuICAgICAgICAodmFsdWU6IGJvb2xlYW4gfCBhbnkpID0+ICh0aGlzLmlzRGlzYWJsZWQgPSB2YWx1ZSB8fCBudWxsKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICB0aGlzLl9kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXNjS2V5VXBMaXN0ZW5lcikge1xuICAgICAgdGhpcy5fZXNjS2V5VXBMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgc3ViIG9mIHRoaXMuX3N1YnNjcmlwdGlvbnMpIHtcbiAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19