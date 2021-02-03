import { __decorate, __metadata, __param } from "tslib";
import { Directive, EventEmitter, HostBinding, Input, Output, TemplateRef, ElementRef, OnInit, Inject, PLATFORM_ID, OnDestroy, Renderer2, } from '@angular/core';
import { TabsetComponent } from './tabset.component';
import { isPlatformBrowser } from '@angular/common';
var TabDirective = /** @class */ (function () {
    function TabDirective(platformId, tabset, el, renderer) {
        this.tabset = tabset;
        this.el = el;
        this.renderer = renderer;
        this._disabled = false;
        /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
        this.select = new EventEmitter();
        /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
        this.deselect = new EventEmitter();
        /** fired before tab will be removed */
        this.removed = new EventEmitter();
        this.addClass = true;
        this.test = true;
        this._active = false;
        this.isBrowser = null;
        this.isBrowser = isPlatformBrowser(platformId);
        this.tabset = tabset;
    }
    Object.defineProperty(TabDirective.prototype, "disabled", {
        /** if true tab can not be activated */
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = value;
            if (this._disabled && this._active) {
                this.tabset.initActiveTab();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabDirective.prototype, "active", {
        /** tab active state toggle */
        get: function () {
            return this._active;
        },
        set: function (active) {
            var _this = this;
            if ((this.disabled && active) || !active) {
                if (this._active && !active) {
                    this.renderer.removeClass(this.el.nativeElement, 'show');
                    this.renderer.removeClass(this.el.nativeElement, 'active');
                    this._active = active;
                    this.deselect.emit(this);
                }
                return;
            }
            this.renderer.addClass(this.el.nativeElement, 'show');
            this.renderer.addClass(this.el.nativeElement, 'active');
            this._active = active;
            this.select.emit(this);
            this.tabset.tabs.forEach(function (mdbTab) {
                if (mdbTab !== _this) {
                    mdbTab.active = false;
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    TabDirective.prototype.ngOnInit = function () {
        this.removable = this.removable;
        this.tabset.addTab(this);
        this.tabset.initActiveTab();
    };
    TabDirective.prototype.ngOnDestroy = function () {
        this.tabset.removeTab(this);
    };
    TabDirective.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: TabsetComponent },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TabDirective.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TabDirective.prototype, "heading", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TabDirective.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TabDirective.prototype, "removable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TabDirective.prototype, "customClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TabDirective.prototype, "tabOrder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TabDirective.prototype, "active", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TabDirective.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TabDirective.prototype, "deselect", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TabDirective.prototype, "removed", void 0);
    __decorate([
        HostBinding('class.tab-pane'),
        __metadata("design:type", Object)
    ], TabDirective.prototype, "addClass", void 0);
    __decorate([
        HostBinding('class.fade'),
        __metadata("design:type", Object)
    ], TabDirective.prototype, "test", void 0);
    TabDirective = __decorate([
        Directive({ selector: 'mdb-tab, [mdbTab]' }),
        __param(0, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [String, TabsetComponent,
            ElementRef,
            Renderer2])
    ], TabDirective);
    return TabDirective;
}());
export { TabDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vdGFicy1waWxscy90YWIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sRUFDTixXQUFXLEVBQ1gsVUFBVSxFQUNWLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR3BEO0lBbUVFLHNCQUN1QixVQUFrQixFQUNoQyxNQUF1QixFQUN2QixFQUFjLEVBQ2IsUUFBbUI7UUFGcEIsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFDdkIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNiLGFBQVEsR0FBUixRQUFRLENBQVc7UUF2RHJCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFvQzFCLDRGQUE0RjtRQUMzRSxXQUFNLEdBQStCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDekUsZ0dBQWdHO1FBQy9FLGFBQVEsR0FBK0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMzRSx1Q0FBdUM7UUFDdEIsWUFBTyxHQUErQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXBDLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDcEIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUd0QyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXhCLGNBQVMsR0FBUSxJQUFJLENBQUM7UUFRcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FB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O1FBQTlCLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQzs7a0RBQXdCO0lBQzNCO1FBQTFCLFdBQVcsQ0FBQyxZQUFZLENBQUM7OzhDQUFvQjtJQTVEbkMsWUFBWTtRQUR4QixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztRQXFFeEMsV0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7aURBQ0wsZUFBZTtZQUNuQixVQUFVO1lBQ0gsU0FBUztPQXZFbEIsWUFBWSxDQXNGeEI7SUFBRCxtQkFBQztDQUFBLEFBdEZELElBc0ZDO1NBdEZZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBFbGVtZW50UmVmLFxuICBPbkluaXQsXG4gIEluamVjdCxcbiAgUExBVEZPUk1fSUQsXG4gIE9uRGVzdHJveSxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhYnNldENvbXBvbmVudCB9IGZyb20gJy4vdGFic2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ21kYi10YWIsIFttZGJUYWJdJyB9KVxuZXhwb3J0IGNsYXNzIFRhYkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIHR5cGU6IHN0cmluZztcbiAgLyoqIHRhYiBoZWFkZXIgdGV4dCAqL1xuICBASW5wdXQoKSBwdWJsaWMgaGVhZGluZzogc3RyaW5nO1xuICAvKiogaWYgdHJ1ZSB0YWIgY2FuIG5vdCBiZSBhY3RpdmF0ZWQgKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xuXG4gICAgaWYgKHRoaXMuX2Rpc2FibGVkICYmIHRoaXMuX2FjdGl2ZSkge1xuICAgICAgdGhpcy50YWJzZXQuaW5pdEFjdGl2ZVRhYigpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuICAvKiogaWYgdHJ1ZSB0YWIgY2FuIGJlIHJlbW92YWJsZSwgYWRkaXRpb25hbCBidXR0b24gd2lsbCBhcHBlYXIgKi9cbiAgQElucHV0KCkgcHVibGljIHJlbW92YWJsZTogYm9vbGVhbjtcbiAgLyoqIGlmIHNldCwgd2lsbCBiZSBhZGRlZCB0byB0aGUgdGFiJ3MgY2xhc3MgYXRyaWJ1dGUgKi9cbiAgQElucHV0KCkgcHVibGljIGN1c3RvbUNsYXNzOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgdGFiT3JkZXI6IG51bWJlcjtcblxuICAvKiogdGFiIGFjdGl2ZSBzdGF0ZSB0b2dnbGUgKi9cbiAgQElucHV0KClcbiAgcHVibGljIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgYWN0aXZlKGFjdGl2ZTogYm9vbGVhbikge1xuICAgIGlmICgodGhpcy5kaXNhYmxlZCAmJiBhY3RpdmUpIHx8ICFhY3RpdmUpIHtcbiAgICAgIGlmICh0aGlzLl9hY3RpdmUgJiYgIWFjdGl2ZSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3Nob3cnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdhY3RpdmUnKTtcbiAgICAgICAgdGhpcy5fYWN0aXZlID0gYWN0aXZlO1xuICAgICAgICB0aGlzLmRlc2VsZWN0LmVtaXQodGhpcyk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnc2hvdycpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnYWN0aXZlJyk7XG4gICAgdGhpcy5fYWN0aXZlID0gYWN0aXZlO1xuICAgIHRoaXMuc2VsZWN0LmVtaXQodGhpcyk7XG5cbiAgICB0aGlzLnRhYnNldC50YWJzLmZvckVhY2goKG1kYlRhYjogVGFiRGlyZWN0aXZlKSA9PiB7XG4gICAgICBpZiAobWRiVGFiICE9PSB0aGlzKSB7XG4gICAgICAgIG1kYlRhYi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBmaXJlZCB3aGVuIHRhYiBiZWNhbWUgYWN0aXZlLCAkZXZlbnQ6VGFiIGVxdWFscyB0byBzZWxlY3RlZCBpbnN0YW5jZSBvZiBUYWIgY29tcG9uZW50ICovXG4gIEBPdXRwdXQoKSBwdWJsaWMgc2VsZWN0OiBFdmVudEVtaXR0ZXI8VGFiRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyoqIGZpcmVkIHdoZW4gdGFiIGJlY2FtZSBpbmFjdGl2ZSwgJGV2ZW50OlRhYiBlcXVhbHMgdG8gZGVzZWxlY3RlZCBpbnN0YW5jZSBvZiBUYWIgY29tcG9uZW50ICovXG4gIEBPdXRwdXQoKSBwdWJsaWMgZGVzZWxlY3Q6IEV2ZW50RW1pdHRlcjxUYWJEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvKiogZmlyZWQgYmVmb3JlIHRhYiB3aWxsIGJlIHJlbW92ZWQgKi9cbiAgQE91dHB1dCgpIHB1YmxpYyByZW1vdmVkOiBFdmVudEVtaXR0ZXI8VGFiRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRhYi1wYW5lJykgcHVibGljIGFkZENsYXNzID0gdHJ1ZTtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mYWRlJykgcHVibGljIHRlc3QgPSB0cnVlO1xuXG4gIHB1YmxpYyBoZWFkaW5nUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBwcml2YXRlIF9hY3RpdmUgPSBmYWxzZTtcblxuICBpc0Jyb3dzZXI6IGFueSA9IG51bGw7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IHN0cmluZyxcbiAgICBwdWJsaWMgdGFic2V0OiBUYWJzZXRDb21wb25lbnQsXG4gICAgcHVibGljIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHtcbiAgICB0aGlzLmlzQnJvd3NlciA9IGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpO1xuICAgIHRoaXMudGFic2V0ID0gdGFic2V0O1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZhYmxlID0gdGhpcy5yZW1vdmFibGU7XG4gICAgdGhpcy50YWJzZXQuYWRkVGFiKHRoaXMpO1xuICAgIHRoaXMudGFic2V0LmluaXRBY3RpdmVUYWIoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudGFic2V0LnJlbW92ZVRhYih0aGlzKTtcbiAgfVxufVxuIl19