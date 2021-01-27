import { __decorate, __metadata } from "tslib";
import { OnInit, Directive, ElementRef, Renderer2, Input, HostListener } from '@angular/core';
var CharCounterDirective = /** @class */ (function () {
    function CharCounterDirective(_elRef, _renderer) {
        this._elRef = _elRef;
        this._renderer = _renderer;
        this.length = 20;
    }
    CharCounterDirective.prototype.ngOnInit = function () {
        // Inititalise a new <span> element for the count display and render it below the host component.
        this.textContainer = this._renderer.createElement('p');
        this._renderer.appendChild(this._elRef.nativeElement.parentElement, this.textContainer);
        this._renderer.addClass(this.textContainer, 'chars');
        this.textContainer.innerHTML = '0/' + this.length;
        this._renderer.setStyle(this.textContainer, 'display', 'none');
    };
    CharCounterDirective.prototype.onKeyUp = function () {
        this.textContainer.innerHTML = this._elRef.nativeElement.value.length + '/' + this.length;
        if (this._elRef.nativeElement.value.length > this.length) {
            this._renderer.addClass(this._elRef.nativeElement, 'invalid');
        }
        else {
            this._renderer.removeClass(this._elRef.nativeElement, 'invalid');
        }
    };
    CharCounterDirective.prototype.hide = function () {
        this._renderer.setStyle(this.textContainer, 'display', 'none');
    };
    CharCounterDirective.prototype.show = function () {
        this.onKeyUp();
        this._renderer.setStyle(this.textContainer, 'display', 'block');
    };
    CharCounterDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CharCounterDirective.prototype, "length", void 0);
    __decorate([
        HostListener('input'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CharCounterDirective.prototype, "onKeyUp", null);
    __decorate([
        HostListener('blur'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CharCounterDirective.prototype, "hide", null);
    __decorate([
        HostListener('focus'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CharCounterDirective.prototype, "show", null);
    CharCounterDirective = __decorate([
        Directive({
            selector: '[mdbCharCounter]',
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer2])
    ], CharCounterDirective);
    return CharCounterDirective;
}());
export { CharCounterDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhci1jb3VudGVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vaW5wdXRzL2NoYXItY291bnRlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUs5RjtJQUlFLDhCQUFvQixNQUFrQixFQUFVLFNBQW9CO1FBQWhELFdBQU0sR0FBTixNQUFNLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBSHBELFdBQU0sR0FBRyxFQUFFLENBQUM7SUFHMkMsQ0FBQztJQUV4RSx1Q0FBUSxHQUFSO1FBQ0UsaUdBQWlHO1FBQ2pHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFc0Isc0NBQU8sR0FBUDtRQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRTFGLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3hELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQy9EO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUM7SUFFcUIsbUNBQUksR0FBSjtRQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRXNCLG1DQUFJLEdBQUo7UUFDckIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7Z0JBNUIyQixVQUFVO2dCQUFxQixTQUFTOztJQUgzRDtRQUFSLEtBQUssRUFBRTs7d0RBQW9CO0lBY0w7UUFBdEIsWUFBWSxDQUFDLE9BQU8sQ0FBQzs7Ozt1REFRckI7SUFFcUI7UUFBckIsWUFBWSxDQUFDLE1BQU0sQ0FBQzs7OztvREFFcEI7SUFFc0I7UUFBdEIsWUFBWSxDQUFDLE9BQU8sQ0FBQzs7OztvREFHckI7SUFoQ1Usb0JBQW9CO1FBSGhDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7U0FDN0IsQ0FBQzt5Q0FLNEIsVUFBVSxFQUFxQixTQUFTO09BSnpELG9CQUFvQixDQWlDaEM7SUFBRCwyQkFBQztDQUFBLEFBakNELElBaUNDO1NBakNZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9uSW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21kYkNoYXJDb3VudGVyXScsXG59KVxuZXhwb3J0IGNsYXNzIENoYXJDb3VudGVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcHVibGljIGxlbmd0aCA9IDIwO1xuICBwdWJsaWMgdGV4dENvbnRhaW5lcjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIEluaXRpdGFsaXNlIGEgbmV3IDxzcGFuPiBlbGVtZW50IGZvciB0aGUgY291bnQgZGlzcGxheSBhbmQgcmVuZGVyIGl0IGJlbG93IHRoZSBob3N0IGNvbXBvbmVudC5cbiAgICB0aGlzLnRleHRDb250YWluZXIgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LCB0aGlzLnRleHRDb250YWluZXIpO1xuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMudGV4dENvbnRhaW5lciwgJ2NoYXJzJyk7XG4gICAgdGhpcy50ZXh0Q29udGFpbmVyLmlubmVySFRNTCA9ICcwLycgKyB0aGlzLmxlbmd0aDtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRleHRDb250YWluZXIsICdkaXNwbGF5JywgJ25vbmUnKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0Jykgb25LZXlVcCgpIHtcbiAgICB0aGlzLnRleHRDb250YWluZXIuaW5uZXJIVE1MID0gdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudC52YWx1ZS5sZW5ndGggKyAnLycgKyB0aGlzLmxlbmd0aDtcblxuICAgIGlmICh0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlLmxlbmd0aCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LCAnaW52YWxpZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LCAnaW52YWxpZCcpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKSBoaWRlKCkge1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMudGV4dENvbnRhaW5lciwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKSBzaG93KCkge1xuICAgIHRoaXMub25LZXlVcCgpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMudGV4dENvbnRhaW5lciwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgfVxufVxuIl19