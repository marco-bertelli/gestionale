import { __decorate, __metadata, __param } from "tslib";
import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Renderer2, Input, AfterViewInit, HostListener, PLATFORM_ID, Inject, AfterViewChecked, } from '@angular/core';
import { DOWN_ARROW, UP_ARROW } from '../utils/keyboard-navigation';
var MdbInput = /** @class */ (function () {
    function MdbInput(el, _renderer, platformId) {
        this.el = el;
        this._renderer = _renderer;
        this.elLabel = null;
        this.elIcon = null;
        this.focusCheckbox = true;
        this.focusRadio = true;
        this.isBrowser = false;
        this.isClicked = false;
        this.element = null;
        this.isBrowser = isPlatformBrowser(platformId);
    }
    MdbInput.prototype.onfocus = function () {
        try {
            this._renderer.addClass(this.elLabel, 'active');
            this.isClicked = true;
        }
        catch (error) { }
    };
    MdbInput.prototype.onblur = function () {
        try {
            if (this.el.nativeElement.value === '') {
                this._renderer.removeClass(this.elLabel, 'active');
            }
            this.isClicked = false;
        }
        catch (error) { }
    };
    MdbInput.prototype.onchange = function () {
        try {
            this.checkValue();
        }
        catch (error) { }
    };
    MdbInput.prototype.onkeydown = function (event) {
        try {
            if (event.target.type === 'number') {
                if (event.shiftKey) {
                    switch (event.keyCode) {
                        case UP_ARROW:
                            event.target.value = +event.target.value + 10;
                            break;
                        case DOWN_ARROW:
                            event.target.value = +event.target.value - 10;
                            break;
                    }
                }
                if (event.altKey) {
                    switch (event.keyCode) {
                        case UP_ARROW:
                            event.target.value = +event.target.value + 0.1;
                            break;
                        case DOWN_ARROW:
                            event.target.value = +event.target.value - 0.1;
                            break;
                    }
                }
            }
        }
        catch (error) { }
        this.delayedResize();
    };
    MdbInput.prototype.oncut = function () {
        var _this = this;
        try {
            setTimeout(function () {
                _this.delayedResize();
            }, 0);
        }
        catch (error) { }
    };
    MdbInput.prototype.onpaste = function () {
        var _this = this;
        try {
            setTimeout(function () {
                _this.delayedResize();
            }, 0);
        }
        catch (error) { }
    };
    MdbInput.prototype.ondrop = function () {
        var _this = this;
        try {
            setTimeout(function () {
                _this.delayedResize();
            }, 0);
        }
        catch (error) { }
    };
    MdbInput.prototype.ngAfterViewInit = function () {
        if (this.isBrowser) {
            try {
                this.element = document.querySelector('.md-textarea-auto');
                if (this.element) {
                    this.delayedResize();
                }
            }
            catch (error) { }
        }
        var type = this.el.nativeElement.type;
        if (this.focusCheckbox && type === 'checkbox') {
            this._renderer.addClass(this.el.nativeElement, 'onFocusSelect');
        }
        if (this.focusRadio && type === 'radio') {
            this._renderer.addClass(this.el.nativeElement, 'onFocusSelect');
        }
    };
    MdbInput.prototype.ngAfterViewChecked = function () {
        this.initComponent();
        this.checkValue();
    };
    MdbInput.prototype.resize = function () {
        if (this.el.nativeElement.classList.contains('md-textarea-auto')) {
            this._renderer.setStyle(this.el.nativeElement, 'height', 'auto');
            if (this.el.nativeElement.scrollHeight) {
                this._renderer.setStyle(this.el.nativeElement, 'height', this.el.nativeElement.scrollHeight + 'px');
            }
        }
    };
    MdbInput.prototype.delayedResize = function () {
        var _this = this;
        setTimeout(function () {
            _this.resize();
        }, 0);
    };
    MdbInput.prototype.initComponent = function () {
        var inputId;
        var inputP;
        if (this.isBrowser) {
            try {
                inputId = this.el.nativeElement.id;
            }
            catch (err) { }
            try {
                inputP = this.el.nativeElement.parentNode;
            }
            catch (err) { }
            this.elLabel =
                inputP.querySelector('label[for="' + inputId + '"]') || inputP.querySelector('label');
            if (this.elLabel && this.el.nativeElement.value !== '') {
                this._renderer.addClass(this.elLabel, 'active');
            }
            this.elIcon = inputP.querySelector('i') || false;
        }
    };
    MdbInput.prototype.checkValue = function () {
        var value = '';
        if (this.elLabel != null) {
            value = this.el.nativeElement.value || '';
            if (value === '') {
                this._renderer.removeClass(this.elLabel, 'active');
                if (this.elIcon) {
                    this._renderer.removeClass(this.elIcon, 'active');
                }
            }
            if ((value === '' && this.isClicked) ||
                (value === '' && this.el.nativeElement.placeholder) ||
                (value === '' && this.el.nativeElement.attributes.placeholder)) {
                this._renderer.addClass(this.elLabel, 'active');
            }
        }
    };
    MdbInput.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbInput.prototype, "focusCheckbox", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbInput.prototype, "focusRadio", void 0);
    __decorate([
        HostListener('focus'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MdbInput.prototype, "onfocus", null);
    __decorate([
        HostListener('blur'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MdbInput.prototype, "onblur", null);
    __decorate([
        HostListener('change'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MdbInput.prototype, "onchange", null);
    __decorate([
        HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MdbInput.prototype, "onkeydown", null);
    __decorate([
        HostListener('cut'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MdbInput.prototype, "oncut", null);
    __decorate([
        HostListener('paste'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MdbInput.prototype, "onpaste", null);
    __decorate([
        HostListener('drop'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MdbInput.prototype, "ondrop", null);
    MdbInput = __decorate([
        Directive({
            selector: '[mdbInput]',
        })
        // tslint:disable-next-line:directive-class-suffix
        ,
        __param(2, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [ElementRef,
            Renderer2, String])
    ], MdbInput);
    return MdbInput;
}());
export { MdbInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvaW5wdXRzL2lucHV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsU0FBUyxFQUNULEtBQUssRUFDTCxhQUFhLEVBQ2IsWUFBWSxFQUNaLFdBQVcsRUFDWCxNQUFNLEVBQ04sZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFNcEU7SUFXRSxrQkFDVSxFQUFjLEVBQ2QsU0FBb0IsRUFDUCxVQUFrQjtRQUYvQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsY0FBUyxHQUFULFNBQVMsQ0FBVztRQVp2QixZQUFPLEdBQXFCLElBQUksQ0FBQztRQUNqQyxXQUFNLEdBQWtCLElBQUksQ0FBQztRQUUzQixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBRTNCLGNBQVMsR0FBUSxLQUFLLENBQUM7UUFDdkIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixZQUFPLEdBQVEsSUFBSSxDQUFDO1FBT2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVzQiwwQkFBTyxHQUFQO1FBQ3JCLElBQUk7WUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO1FBQUMsT0FBTyxLQUFLLEVBQUUsR0FBRTtJQUNwQixDQUFDO0lB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QUNULFFBQVEsRUFBRSxZQUFZO1NBQ3ZCLENBQUM7UUFDRixrREFBa0Q7O1FBZTdDLFdBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO3lDQUZSLFVBQVU7WUFDSCxTQUFTO09BYm5CLFFBQVEsQ0E2S3BCO0lBQUQsZUFBQztDQUFBLEFBN0tELElBNktDO1NBN0tZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIFJlbmRlcmVyMixcbiAgSW5wdXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIEhvc3RMaXN0ZW5lcixcbiAgUExBVEZPUk1fSUQsXG4gIEluamVjdCxcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET1dOX0FSUk9XLCBVUF9BUlJPVyB9IGZyb20gJy4uL3V0aWxzL2tleWJvYXJkLW5hdmlnYXRpb24nO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWRiSW5wdXRdJyxcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE1kYklucHV0IGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIHB1YmxpYyBlbExhYmVsOiBFbGVtZW50UmVmIHwgYW55ID0gbnVsbDtcbiAgcHVibGljIGVsSWNvbjogRWxlbWVudCB8IGFueSA9IG51bGw7XG5cbiAgQElucHV0KCkgZm9jdXNDaGVja2JveCA9IHRydWU7XG4gIEBJbnB1dCgpIGZvY3VzUmFkaW8gPSB0cnVlO1xuXG4gIGlzQnJvd3NlcjogYW55ID0gZmFsc2U7XG4gIGlzQ2xpY2tlZCA9IGZhbHNlO1xuICBlbGVtZW50OiBhbnkgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy5pc0Jyb3dzZXIgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJykgb25mb2N1cygpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbExhYmVsLCAnYWN0aXZlJyk7XG4gICAgICB0aGlzLmlzQ2xpY2tlZCA9IHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJykgb25ibHVyKCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlID09PSAnJykge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsTGFiZWwsICdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNDbGlja2VkID0gZmFsc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjaGFuZ2UnKSBvbmNoYW5nZSgpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jaGVja1ZhbHVlKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSkgb25rZXlkb3duKGV2ZW50OiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldC50eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9ICtldmVudC50YXJnZXQudmFsdWUgKyAxMDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9ICtldmVudC50YXJnZXQudmFsdWUgLSAxMDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5hbHRLZXkpIHtcbiAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9ICtldmVudC50YXJnZXQudmFsdWUgKyAwLjE7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICAgICAgICBldmVudC50YXJnZXQudmFsdWUgPSArZXZlbnQudGFyZ2V0LnZhbHVlIC0gMC4xO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge31cbiAgICB0aGlzLmRlbGF5ZWRSZXNpemUoKTtcbiAgfVxuICBASG9zdExpc3RlbmVyKCdjdXQnKSBvbmN1dCgpIHtcbiAgICB0cnkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZGVsYXllZFJlc2l6ZSgpO1xuICAgICAgfSwgMCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gIH1cbiAgQEhvc3RMaXN0ZW5lcigncGFzdGUnKSBvbnBhc3RlKCkge1xuICAgIHRyeSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5kZWxheWVkUmVzaXplKCk7XG4gICAgICB9LCAwKTtcbiAgICB9IGNhdGNoIChlcnJvcikge31cbiAgfVxuICBASG9zdExpc3RlbmVyKCdkcm9wJykgb25kcm9wKCkge1xuICAgIHRyeSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5kZWxheWVkUmVzaXplKCk7XG4gICAgICB9LCAwKTtcbiAgICB9IGNhdGNoIChlcnJvcikge31cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZC10ZXh0YXJlYS1hdXRvJyk7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLmRlbGF5ZWRSZXNpemUoKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgfVxuICAgIGNvbnN0IHR5cGUgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudHlwZTtcbiAgICBpZiAodGhpcy5mb2N1c0NoZWNrYm94ICYmIHR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ29uRm9jdXNTZWxlY3QnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZm9jdXNSYWRpbyAmJiB0eXBlID09PSAncmFkaW8nKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdvbkZvY3VzU2VsZWN0Jyk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIHRoaXMuaW5pdENvbXBvbmVudCgpO1xuICAgIHRoaXMuY2hlY2tWYWx1ZSgpO1xuICB9XG5cbiAgcmVzaXplKCkge1xuICAgIGlmICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZC10ZXh0YXJlYS1hdXRvJykpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsICdhdXRvJyk7XG5cbiAgICAgIGlmICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAnaGVpZ2h0JyxcbiAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0ICsgJ3B4J1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlbGF5ZWRSZXNpemUoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgcHVibGljIGluaXRDb21wb25lbnQoKTogdm9pZCB7XG4gICAgbGV0IGlucHV0SWQ7XG4gICAgbGV0IGlucHV0UDtcbiAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlucHV0SWQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaWQ7XG4gICAgICB9IGNhdGNoIChlcnIpIHt9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlucHV0UCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuXG4gICAgICB0aGlzLmVsTGFiZWwgPVxuICAgICAgICBpbnB1dFAucXVlcnlTZWxlY3RvcignbGFiZWxbZm9yPVwiJyArIGlucHV0SWQgKyAnXCJdJykgfHwgaW5wdXRQLnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsJyk7XG4gICAgICBpZiAodGhpcy5lbExhYmVsICYmIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbExhYmVsLCAnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmVsSWNvbiA9IGlucHV0UC5xdWVyeVNlbGVjdG9yKCdpJykgfHwgZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja1ZhbHVlKCk6IHZvaWQge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIGlmICh0aGlzLmVsTGFiZWwgIT0gbnVsbCkge1xuICAgICAgdmFsdWUgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgfHwgJyc7XG4gICAgICBpZiAodmFsdWUgPT09ICcnKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxMYWJlbCwgJ2FjdGl2ZScpO1xuICAgICAgICBpZiAodGhpcy5lbEljb24pIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsSWNvbiwgJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgICh2YWx1ZSA9PT0gJycgJiYgdGhpcy5pc0NsaWNrZWQpIHx8XG4gICAgICAgICh2YWx1ZSA9PT0gJycgJiYgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnBsYWNlaG9sZGVyKSB8fFxuICAgICAgICAodmFsdWUgPT09ICcnICYmIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hdHRyaWJ1dGVzLnBsYWNlaG9sZGVyKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxMYWJlbCwgJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19