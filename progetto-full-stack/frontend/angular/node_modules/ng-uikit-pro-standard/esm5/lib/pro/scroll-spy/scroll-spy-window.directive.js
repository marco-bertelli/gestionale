import { __decorate, __metadata, __param } from "tslib";
import { Directive, ElementRef, OnInit, Inject, Renderer2, NgZone, Input, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ScrollSpyService } from './scroll-spy.service';
var ScrollSpyWindowDirective = /** @class */ (function () {
    function ScrollSpyWindowDirective(document, el, renderer, ngZone, scrollSpyService) {
        this.document = document;
        this.el = el;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.scrollSpyService = scrollSpyService;
        this.offset = 0;
    }
    Object.defineProperty(ScrollSpyWindowDirective.prototype, "scrollSpyId", {
        get: function () { return this._scrollSpyId; },
        set: function (newId) {
            if (newId) {
                this._scrollSpyId = newId;
            }
        },
        enumerable: true,
        configurable: true
    });
    ScrollSpyWindowDirective.prototype.isElementInViewport = function () {
        var scrollTop = this.document.documentElement.scrollTop || this.document.body.scrollTop;
        var elHeight = this.el.nativeElement.offsetHeight;
        var elTop = this.el.nativeElement.offsetTop - this.offset;
        var elBottom = elTop + elHeight;
        return (scrollTop >= elTop && scrollTop <= elBottom);
    };
    ScrollSpyWindowDirective.prototype.updateActiveState = function (scrollSpyId, id) {
        if (this.isElementInViewport()) {
            this.scrollSpyService.updateActiveState(scrollSpyId, id);
        }
        else {
            this.scrollSpyService.removeActiveState(scrollSpyId, id);
        }
    };
    ScrollSpyWindowDirective.prototype.onScroll = function () {
        this.updateActiveState(this.scrollSpyId, this.id);
    };
    ScrollSpyWindowDirective.prototype.listenToScroll = function () {
        var _this = this;
        this.renderer.listen(window, 'scroll', function () {
            _this.onScroll();
        });
    };
    ScrollSpyWindowDirective.prototype.ngOnInit = function () {
        this.id = this.el.nativeElement.id;
        this.ngZone.runOutsideAngular(this.listenToScroll.bind(this));
    };
    ScrollSpyWindowDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.updateActiveState(_this.scrollSpyId, _this.id);
        }, 0);
    };
    ScrollSpyWindowDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone },
        { type: ScrollSpyService }
    ]; };
    __decorate([
        Input('mdbScrollSpyWindow'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ScrollSpyWindowDirective.prototype, "scrollSpyId", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ScrollSpyWindowDirective.prototype, "offset", void 0);
    ScrollSpyWindowDirective = __decorate([
        Directive({
            selector: '[mdbScrollSpyWindow]'
        }),
        __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object, ElementRef,
            Renderer2,
            NgZone,
            ScrollSpyService])
    ], ScrollSpyWindowDirective);
    return ScrollSpyWindowDirective;
}());
export { ScrollSpyWindowDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXNweS13aW5kb3cuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9zY3JvbGwtc3B5L3Njcm9sbC1zcHktd2luZG93LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLE1BQU0sRUFDTixTQUFTLEVBQ1QsTUFBTSxFQUNOLEtBQUssRUFDTCxhQUFhLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBS3hEO0lBY0Usa0NBQzRCLFFBQWEsRUFDL0IsRUFBYyxFQUNkLFFBQW1CLEVBQ25CLE1BQWMsRUFDZCxnQkFBa0M7UUFKaEIsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUMvQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVBuQyxXQUFNLEdBQUcsQ0FBQyxDQUFDO0lBUWpCLENBQUM7SUFoQkosc0JBQUksaURBQVc7YUFBZixjQUE0QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2FBQ3ZELFVBQWdCLEtBQWE7WUFDM0IsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7YUFDM0I7UUFDSCxDQUFDOzs7T0FMc0Q7SUFrQnZELHNEQUFtQixHQUFuQjtRQUNFLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUYsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO1FBQ3BELElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzVELElBQU0sUUFBUSxHQUFHLEtBQUssR0FBRyxRQUFRLENBQUM7UUFFbEMsT0FBTyxDQUFDLFNBQVMsSUFBSSxLQUFLLElBQUksU0FBUyxJQUFJLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxvREFBaUIsR0FBakIsVUFBa0IsV0FBbUIsRUFBRSxFQUFVO1FBQy9DLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMxRDthQUFNO1lBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMxRDtJQUNILENBQUM7SUFFRCwyQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxpREFBYyxHQUFkO1FBQUEsaUJBSUM7UUFIQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFO1lBQ3JDLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwyQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7UUFFbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxrREFBZSxHQUFmO1FBQUEsaUJBSUM7UUFIQyxVQUFVLENBQUM7WUFDVCxLQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSSxDQUFDLFdBQVcsRUFBRSxLQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEQsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQzs7Z0RBNUNFLE1BQU0sU0FBQyxRQUFRO2dCQUNKLFVBQVU7Z0JBQ0osU0FBUztnQkFDWCxNQUFNO2dCQUNJLGdCQUFnQjs7SUFmNUM7UUFEQyxLQUFLLENBQUMsb0JBQW9CLENBQUM7OzsrREFDMkI7SUFROUM7UUFBUixLQUFLLEVBQUU7OzREQUFZO0lBWlQsd0JBQXdCO1FBSHBDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxzQkFBc0I7U0FDakMsQ0FBQztRQWdCRyxXQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtpREFDTCxVQUFVO1lBQ0osU0FBUztZQUNYLE1BQU07WUFDSSxnQkFBZ0I7T0FuQmpDLHdCQUF3QixDQTREcEM7SUFBRCwrQkFBQztDQUFBLEFBNURELElBNERDO1NBNURZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgT25Jbml0LFxuICBJbmplY3QsXG4gIFJlbmRlcmVyMixcbiAgTmdab25lLFxuICBJbnB1dCxcbiAgQWZ0ZXJWaWV3SW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFNjcm9sbFNweVNlcnZpY2UgfSBmcm9tICcuL3Njcm9sbC1zcHkuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZGJTY3JvbGxTcHlXaW5kb3ddJ1xufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxTcHlXaW5kb3dEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBwcml2YXRlIGlkOiBzdHJpbmc7XG5cbiAgQElucHV0KCdtZGJTY3JvbGxTcHlXaW5kb3cnKVxuICBnZXQgc2Nyb2xsU3B5SWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3Njcm9sbFNweUlkOyB9XG4gIHNldCBzY3JvbGxTcHlJZChuZXdJZDogc3RyaW5nKSB7XG4gICAgaWYgKG5ld0lkKSB7XG4gICAgICB0aGlzLl9zY3JvbGxTcHlJZCA9IG5ld0lkO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9zY3JvbGxTcHlJZDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIG9mZnNldCA9IDA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBzY3JvbGxTcHlTZXJ2aWNlOiBTY3JvbGxTcHlTZXJ2aWNlXG4gICkge31cblxuICBpc0VsZW1lbnRJblZpZXdwb3J0KCkge1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCB0aGlzLmRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgIGNvbnN0IGVsSGVpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBlbFRvcCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRUb3AgLSB0aGlzLm9mZnNldDtcbiAgICBjb25zdCBlbEJvdHRvbSA9IGVsVG9wICsgZWxIZWlnaHQ7XG5cbiAgICByZXR1cm4gKHNjcm9sbFRvcCA+PSBlbFRvcCAmJiBzY3JvbGxUb3AgPD0gZWxCb3R0b20pO1xuICB9XG5cbiAgdXBkYXRlQWN0aXZlU3RhdGUoc2Nyb2xsU3B5SWQ6IHN0cmluZywgaWQ6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmlzRWxlbWVudEluVmlld3BvcnQoKSkge1xuICAgICAgdGhpcy5zY3JvbGxTcHlTZXJ2aWNlLnVwZGF0ZUFjdGl2ZVN0YXRlKHNjcm9sbFNweUlkLCBpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2Nyb2xsU3B5U2VydmljZS5yZW1vdmVBY3RpdmVTdGF0ZShzY3JvbGxTcHlJZCwgaWQpO1xuICAgIH1cbiAgfVxuXG4gIG9uU2Nyb2xsKCkge1xuICAgIHRoaXMudXBkYXRlQWN0aXZlU3RhdGUodGhpcy5zY3JvbGxTcHlJZCwgdGhpcy5pZCk7XG4gIH1cblxuICBsaXN0ZW5Ub1Njcm9sbCgpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbih3aW5kb3csICdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICB0aGlzLm9uU2Nyb2xsKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmlkID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlkO1xuXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIodGhpcy5saXN0ZW5Ub1Njcm9sbC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlQWN0aXZlU3RhdGUodGhpcy5zY3JvbGxTcHlJZCwgdGhpcy5pZCk7XG4gICAgfSwgMCk7XG4gIH1cbn1cbiJdfQ==