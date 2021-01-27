import { __decorate, __metadata } from "tslib";
import { Component, OnInit, HostBinding, Input, Output, EventEmitter, HostListener, ContentChildren, QueryList, ChangeDetectionStrategy, ChangeDetectorRef, } from '@angular/core';
import { state, style, trigger, transition, animate } from '@angular/animations';
import { FixedButtonCaptionDirective } from '../buttons/fixed-caption.directive';
var CollapseComponent = /** @class */ (function () {
    function CollapseComponent(_cdRef) {
        this._cdRef = _cdRef;
        this.isCollapsed = true;
        this.showBsCollapse = new EventEmitter();
        this.shownBsCollapse = new EventEmitter();
        this.hideBsCollapse = new EventEmitter();
        this.hiddenBsCollapse = new EventEmitter();
        this.collapsed = new EventEmitter();
        this.expanded = new EventEmitter();
        this.overflow = 'hidden';
    }
    CollapseComponent.prototype.onExpandBodyDone = function (event) {
        var _this = this;
        setTimeout(function () {
            if (event.toState === 'expanded') {
                _this.shownBsCollapse.emit(_this);
                _this.expanded.emit(_this);
                _this.overflow = 'visible';
                _this.showCaptions();
            }
            else {
                _this.hiddenBsCollapse.emit(_this);
                _this.collapsed.emit(_this);
            }
        }, 0);
    };
    CollapseComponent.prototype.showCaptions = function () {
        this.captions.forEach(function (caption) { return caption.showCaption(); });
    };
    CollapseComponent.prototype.toggle = function () {
        this.isCollapsed ? this.show() : this.hide();
    };
    CollapseComponent.prototype.show = function () {
        this.expandAnimationState = 'expanded';
        this.isCollapsed = false;
        this.showBsCollapse.emit(this);
        this._cdRef.markForCheck();
    };
    CollapseComponent.prototype.hide = function () {
        this.overflow = 'hidden';
        this.expandAnimationState = 'collapsed';
        this.isCollapsed = true;
        this.hideBsCollapse.emit(this);
        this._cdRef.markForCheck();
    };
    CollapseComponent.prototype.initializeCollapseState = function () {
        this.isCollapsed ? this.hide() : this.show();
    };
    CollapseComponent.prototype.ngOnInit = function () {
        this.initializeCollapseState();
    };
    CollapseComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        ContentChildren(FixedButtonCaptionDirective),
        __metadata("design:type", QueryList)
    ], CollapseComponent.prototype, "captions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CollapseComponent.prototype, "isCollapsed", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CollapseComponent.prototype, "showBsCollapse", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CollapseComponent.prototype, "shownBsCollapse", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CollapseComponent.prototype, "hideBsCollapse", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CollapseComponent.prototype, "hiddenBsCollapse", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CollapseComponent.prototype, "collapsed", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CollapseComponent.prototype, "expanded", void 0);
    __decorate([
        HostBinding('@expandBody'),
        __metadata("design:type", String)
    ], CollapseComponent.prototype, "expandAnimationState", void 0);
    __decorate([
        HostBinding('style.overflow'),
        __metadata("design:type", Object)
    ], CollapseComponent.prototype, "overflow", void 0);
    __decorate([
        HostListener('@expandBody.done', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], CollapseComponent.prototype, "onExpandBodyDone", null);
    CollapseComponent = __decorate([
        Component({
            // tslint:disable-next-line:component-selector
            selector: '[mdbCollapse]',
            exportAs: 'bs-collapse',
            template: '<ng-content></ng-content>',
            animations: [
                trigger('expandBody', [
                    state('collapsed', style({ height: '0px' })),
                    state('expanded', style({ height: '*' })),
                    transition('expanded <=> collapsed', animate('500ms ease')),
                ]),
            ],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], CollapseComponent);
    return CollapseComponent;
}());
export { CollapseComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvY29sbGFwc2UvY29sbGFwc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxFQUNaLGVBQWUsRUFDZixTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBZ0JqRjtJQVdFLDJCQUFvQixNQUF5QjtRQUF6QixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQVRwQyxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUVsQixtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZELG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEQsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RCxxQkFBZ0IsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN6RCxjQUFTLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbEQsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSzVCLGFBQVEsR0FBRyxRQUFRLENBQUM7SUFISCxDQUFDO0lBTWpELDRDQUFnQixHQUFoQixVQUFpQixLQUFVO1FBRDNCLGlCQWFDO1FBWEMsVUFBVSxDQUFDO1lBQ1QsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtnQkFDaEMsS0FBSSxDQUFDLGVBQWUs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QUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO29CQUM1QyxLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUN6QyxVQUFVLENBQUMsd0JBQXdCLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUM1RCxDQUFDO2FBQ0g7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQVk0QixpQkFBaUI7T0FYbEMsaUJBQWlCLENBK0Q3QjtJQUFELHdCQUFDO0NBQUEsQUEvREQsSUErREM7U0EvRFksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzdGF0ZSwgc3R5bGUsIHRyaWdnZXIsIHRyYW5zaXRpb24sIGFuaW1hdGUgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEZpeGVkQnV0dG9uQ2FwdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4uL2J1dHRvbnMvZml4ZWQtY2FwdGlvbi5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1ttZGJDb2xsYXBzZV0nLFxuICBleHBvcnRBczogJ2JzLWNvbGxhcHNlJyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2V4cGFuZEJvZHknLCBbXG4gICAgICBzdGF0ZSgnY29sbGFwc2VkJywgc3R5bGUoeyBoZWlnaHQ6ICcwcHgnIH0pKSxcbiAgICAgIHN0YXRlKCdleHBhbmRlZCcsIHN0eWxlKHsgaGVpZ2h0OiAnKicgfSkpLFxuICAgICAgdHJhbnNpdGlvbignZXhwYW5kZWQgPD0+IGNvbGxhcHNlZCcsIGFuaW1hdGUoJzUwMG1zIGVhc2UnKSksXG4gICAgXSksXG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb2xsYXBzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oRml4ZWRCdXR0b25DYXB0aW9uRGlyZWN0aXZlKSBjYXB0aW9uczogUXVlcnlMaXN0PEZpeGVkQnV0dG9uQ2FwdGlvbkRpcmVjdGl2ZT47XG4gIEBJbnB1dCgpIGlzQ29sbGFwc2VkID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2hvd0JzQ29sbGFwc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc2hvd25Cc0NvbGxhcHNlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGhpZGVCc0NvbGxhcHNlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGhpZGRlbkJzQ29sbGFwc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY29sbGFwc2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGV4cGFuZGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgQEhvc3RCaW5kaW5nKCdAZXhwYW5kQm9keScpIGV4cGFuZEFuaW1hdGlvblN0YXRlOiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnc3R5bGUub3ZlcmZsb3cnKSBvdmVyZmxvdyA9ICdoaWRkZW4nO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ0BleHBhbmRCb2R5LmRvbmUnLCBbJyRldmVudCddKVxuICBvbkV4cGFuZEJvZHlEb25lKGV2ZW50OiBhbnkpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChldmVudC50b1N0YXRlID09PSAnZXhwYW5kZWQnKSB7XG4gICAgICAgIHRoaXMuc2hvd25Cc0NvbGxhcHNlLmVtaXQodGhpcyk7XG4gICAgICAgIHRoaXMuZXhwYW5kZWQuZW1pdCh0aGlzKTtcbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9ICd2aXNpYmxlJztcbiAgICAgICAgdGhpcy5zaG93Q2FwdGlvbnMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGlkZGVuQnNDb2xsYXBzZS5lbWl0KHRoaXMpO1xuICAgICAgICB0aGlzLmNvbGxhcHNlZC5lbWl0KHRoaXMpO1xuICAgICAgfVxuICAgIH0sIDApO1xuICB9XG5cbiAgc2hvd0NhcHRpb25zKCkge1xuICAgIHRoaXMuY2FwdGlvbnMuZm9yRWFjaCgoY2FwdGlvbjogRml4ZWRCdXR0b25DYXB0aW9uRGlyZWN0aXZlKSA9PiBjYXB0aW9uLnNob3dDYXB0aW9uKCkpO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuaXNDb2xsYXBzZWQgPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpO1xuICB9XG5cbiAgc2hvdygpIHtcbiAgICB0aGlzLmV4cGFuZEFuaW1hdGlvblN0YXRlID0gJ2V4cGFuZGVkJztcbiAgICB0aGlzLmlzQ29sbGFwc2VkID0gZmFsc2U7XG5cbiAgICB0aGlzLnNob3dCc0NvbGxhcHNlLmVtaXQodGhpcyk7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIHRoaXMub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICB0aGlzLmV4cGFuZEFuaW1hdGlvblN0YXRlID0gJ2NvbGxhcHNlZCc7XG4gICAgdGhpcy5pc0NvbGxhcHNlZCA9IHRydWU7XG5cbiAgICB0aGlzLmhpZGVCc0NvbGxhcHNlLmVtaXQodGhpcyk7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBpbml0aWFsaXplQ29sbGFwc2VTdGF0ZSgpIHtcbiAgICB0aGlzLmlzQ29sbGFwc2VkID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZUNvbGxhcHNlU3RhdGUoKTtcbiAgfVxufVxuIl19