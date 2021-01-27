import { __decorate, __metadata, __read } from "tslib";
import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output, Renderer2, OnDestroy, } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { window } from '../utils/facade/browser';
import { distinctUntilChanged, filter, map, pairwise, share, skip, throttleTime, takeUntil, } from 'rxjs/operators';
var Direction;
(function (Direction) {
    Direction["Up"] = "Up";
    Direction["Down"] = "Down";
})(Direction || (Direction = {}));
var StickyHeaderDirective = /** @class */ (function () {
    function StickyHeaderDirective(_renderer, _el) {
        this._renderer = _renderer;
        this._el = _el;
        this.animationDuration = 200;
        this.transitionEnd = new EventEmitter();
        this._destroy$ = new Subject();
    }
    StickyHeaderDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        var scroll$ = fromEvent(window, 'scroll').pipe(throttleTime(10), map(function () { return window.pageYOffset; }), pairwise(), map(function (_a) {
            var _b = __read(_a, 2), y1 = _b[0], y2 = _b[1];
            return (y2 < y1 ? Direction.Up : Direction.Down);
        }), distinctUntilChanged(), share());
        this.scrollUp$ = scroll$.pipe(filter(function (direction) { return direction === Direction.Up; }));
        this.scrollDown$ = scroll$.pipe(filter(function (direction) { return direction === Direction.Down; }));
        this._renderer.setStyle(this._el.nativeElement, 'position', 'fixed');
        this._renderer.setStyle(this._el.nativeElement, 'top', '0');
        this._renderer.setStyle(this._el.nativeElement, 'width', '100%');
        this._renderer.setStyle(this._el.nativeElement, 'z-index', '1030');
        setTimeout(function () {
            _this.scrollUp$
                .pipe(skip(0), takeUntil(_this._destroy$))
                .subscribe(function () {
                _this._renderer.setStyle(_this._el.nativeElement, 'transition', "all " + _this.animationDuration + "ms ease-in");
                _this._renderer.setStyle(_this._el.nativeElement, 'transform', 'translateY(0%)');
                _this.transitionEnd.emit({ state: 'Visible' });
            });
            _this.scrollDown$
                .pipe(skip(0), takeUntil(_this._destroy$))
                .subscribe(function () {
                _this._renderer.setStyle(_this._el.nativeElement, 'transition', "all " + _this.animationDuration + "ms ease-in");
                _this._renderer.setStyle(_this._el.nativeElement, 'transform', 'translateY(-100%)');
                _this.transitionEnd.emit({ state: 'Hidden' });
            });
        }, 0);
    };
    StickyHeaderDirective.prototype.ngOnDestroy = function () {
        this._destroy$.next();
        this._destroy$.complete();
    };
    StickyHeaderDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], StickyHeaderDirective.prototype, "animationDuration", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], StickyHeaderDirective.prototype, "transitionEnd", void 0);
    StickyHeaderDirective = __decorate([
        Directive({
            selector: '[mdbStickyHeader]',
            exportAs: 'mdbStickyHeader',
        }),
        __metadata("design:paramtypes", [Renderer2, ElementRef])
    ], StickyHeaderDirective);
    return StickyHeaderDirective;
}());
export { StickyHeaderDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5LWhlYWRlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvZnJlZS9zdGlja3ktaGVhZGVyL3N0aWNreS1oZWFkZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixNQUFNLEVBQ04sR0FBRyxFQUNILFFBQVEsRUFDUixLQUFLLEVBQ0wsSUFBSSxFQUNKLFlBQVksRUFDWixTQUFTLEdBQ1YsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixJQUFLLFNBR0o7QUFIRCxXQUFLLFNBQVM7SUFDWixzQkFBUyxDQUFBO0lBQ1QsMEJBQWEsQ0FBQTtBQUNmLENBQUMsRUFISSxTQUFTLEtBQVQsU0FBUyxRQUdiO0FBTUQ7SUFTRSwrQkFBb0IsU0FBb0IsRUFBVSxHQUFlO1FBQTdDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFZO1FBUnhELHNCQUFpQixHQUFHLEdBQUcsQ0FBQztRQUN2QixrQkFBYSxHQUFvQyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUV6RixjQUFTLEdBQWtCLElBQUksT0FBTyxFQUFFLENBQUM7SUFLbUIsQ0FBQztJQUVyRSwrQ0FBZSxHQUFmO1FBQUEsaUJBZ0RDO1FBL0NDLElBQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUM5QyxZQUFZLENB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LENBQUM7SUFFRCwyQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzVCLENBQUM7O2dCQXZEOEIsU0FBUztnQkFBZSxVQUFVOztJQVJ4RDtRQUFSLEtBQUssRUFBRTs7b0VBQXlCO0lBQ3ZCO1FBQVQsTUFBTSxFQUFFO2tDQUFnQixZQUFZO2dFQUE0RDtJQUZ0RixxQkFBcUI7UUFKakMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixRQUFRLEVBQUUsaUJBQWlCO1NBQzVCLENBQUM7eUNBVStCLFNBQVMsRUFBZSxVQUFVO09BVHRELHFCQUFxQixDQWlFakM7SUFBRCw0QkFBQztDQUFBLEFBakVELElBaUVDO1NBakVZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHdpbmRvdyB9IGZyb20gJy4uL3V0aWxzL2ZhY2FkZS9icm93c2VyJztcbmltcG9ydCB7XG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgcGFpcndpc2UsXG4gIHNoYXJlLFxuICBza2lwLFxuICB0aHJvdHRsZVRpbWUsXG4gIHRha2VVbnRpbCxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5lbnVtIERpcmVjdGlvbiB7XG4gIFVwID0gJ1VwJyxcbiAgRG93biA9ICdEb3duJyxcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21kYlN0aWNreUhlYWRlcl0nLFxuICBleHBvcnRBczogJ21kYlN0aWNreUhlYWRlcicsXG59KVxuZXhwb3J0IGNsYXNzIFN0aWNreUhlYWRlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGFuaW1hdGlvbkR1cmF0aW9uID0gMjAwO1xuICBAT3V0cHV0KCkgdHJhbnNpdGlvbkVuZDogRXZlbnRFbWl0dGVyPHsgc3RhdGU6IHN0cmluZyB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8eyBzdGF0ZTogc3RyaW5nIH0+KCk7XG5cbiAgcHJpdmF0ZSBfZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIHByaXZhdGUgc2Nyb2xsRG93biQ6IGFueTtcbiAgcHJpdmF0ZSBzY3JvbGxVcCQ6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIF9lbDogRWxlbWVudFJlZikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3Qgc2Nyb2xsJCA9IGZyb21FdmVudCh3aW5kb3csICdzY3JvbGwnKS5waXBlKFxuICAgICAgdGhyb3R0bGVUaW1lKDEwKSxcbiAgICAgIG1hcCgoKSA9PiB3aW5kb3cucGFnZVlPZmZzZXQpLFxuICAgICAgcGFpcndpc2UoKSxcbiAgICAgIG1hcCgoW3kxLCB5Ml0pOiBEaXJlY3Rpb24gPT4gKHkyIDwgeTEgPyBEaXJlY3Rpb24uVXAgOiBEaXJlY3Rpb24uRG93bikpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgIHNoYXJlKClcbiAgICApO1xuXG4gICAgdGhpcy5zY3JvbGxVcCQgPSBzY3JvbGwkLnBpcGUoZmlsdGVyKGRpcmVjdGlvbiA9PiBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5VcCkpO1xuICAgIHRoaXMuc2Nyb2xsRG93biQgPSBzY3JvbGwkLnBpcGUoZmlsdGVyKGRpcmVjdGlvbiA9PiBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5Eb3duKSk7XG5cbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAncG9zaXRpb24nLCAnZml4ZWQnKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAndG9wJywgJzAnKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAnMTAwJScpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICd6LWluZGV4JywgJzEwMzAnKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zY3JvbGxVcCRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgc2tpcCgwKSxcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgJ3RyYW5zaXRpb24nLFxuICAgICAgICAgICAgYGFsbCAke3RoaXMuYW5pbWF0aW9uRHVyYXRpb259bXMgZWFzZS1pbmBcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWSgwJSknKTtcbiAgICAgICAgICB0aGlzLnRyYW5zaXRpb25FbmQuZW1pdCh7IHN0YXRlOiAnVmlzaWJsZScgfSk7XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5zY3JvbGxEb3duJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICBza2lwKDApLFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAndHJhbnNpdGlvbicsXG4gICAgICAgICAgICBgYWxsICR7dGhpcy5hbmltYXRpb25EdXJhdGlvbn1tcyBlYXNlLWluYFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVZKC0xMDAlKScpO1xuICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkVuZC5lbWl0KHsgc3RhdGU6ICdIaWRkZW4nIH0pO1xuICAgICAgICB9KTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2Rlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=