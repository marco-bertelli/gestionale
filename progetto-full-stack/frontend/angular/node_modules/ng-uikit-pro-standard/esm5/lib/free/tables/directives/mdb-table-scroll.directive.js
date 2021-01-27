import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';
var MdbTableScrollDirective = /** @class */ (function () {
    function MdbTableScrollDirective(renderer, el) {
        this.renderer = renderer;
        this.el = el;
        this.scrollY = false;
        this.maxHeight = null;
        this.scrollX = false;
        this.maxWidth = null;
    }
    MdbTableScrollDirective.prototype.wrapTableWithVerticalScrollingWrapper = function (tableWrapper) {
        this.renderer.setStyle(tableWrapper, 'max-height', this.maxHeight + 'px');
        this.renderer.setStyle(tableWrapper, 'overflow-y', 'auto');
        this.renderer.setStyle(tableWrapper, 'display', 'block');
    };
    MdbTableScrollDirective.prototype.wrapTableWithHorizontalScrollingWrapper = function (tableWrapper) {
        this.renderer.setStyle(tableWrapper, 'max-width', this.maxWidth + 'px');
        this.renderer.setStyle(tableWrapper, 'overflow-x', 'auto');
        this.renderer.setStyle(tableWrapper, 'display', 'block');
    };
    MdbTableScrollDirective.prototype.wrapTableWithHorizontalAndVerticalScrollingWrapper = function (tableWrapper) {
        this.renderer.setStyle(tableWrapper, 'max-height', this.maxHeight + 'px');
        this.renderer.setStyle(tableWrapper, 'max-width', this.maxWidth + 'px');
        this.renderer.setStyle(tableWrapper, 'overflow-x', 'auto');
        this.renderer.setStyle(tableWrapper, 'display', 'block');
    };
    MdbTableScrollDirective.prototype.ngOnInit = function () {
        var parent = this.el.nativeElement.parentNode;
        var tableWrapper = this.renderer.createElement('div');
        if (this.scrollY && this.scrollX && this.maxHeight && this.maxWidth) {
            this.wrapTableWithHorizontalAndVerticalScrollingWrapper(tableWrapper);
        }
        if (this.scrollY && this.maxHeight) {
            this.wrapTableWithVerticalScrollingWrapper(tableWrapper);
        }
        if (this.scrollX && this.maxWidth) {
            this.wrapTableWithHorizontalScrollingWrapper(tableWrapper);
        }
        this.renderer.insertBefore(parent, tableWrapper, this.el.nativeElement);
        this.renderer.removeChild(parent, this.el.nativeElement);
        this.renderer.appendChild(tableWrapper, this.el.nativeElement);
    };
    MdbTableScrollDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTableScrollDirective.prototype, "scrollY", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTableScrollDirective.prototype, "maxHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTableScrollDirective.prototype, "scrollX", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTableScrollDirective.prototype, "maxWidth", void 0);
    MdbTableScrollDirective = __decorate([
        Directive({
            selector: '[mdbTableScroll]',
        }),
        __metadata("design:paramtypes", [Renderer2, ElementRef])
    ], MdbTableScrollDirective);
    return MdbTableScrollDirective;
}());
export { MdbTableScrollDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXRhYmxlLXNjcm9sbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvZnJlZS90YWJsZXMvZGlyZWN0aXZlcy9tZGItdGFibGUtc2Nyb2xsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLaEY7SUFPRSxpQ0FBb0IsUUFBbUIsRUFBVSxFQUFjO1FBQTNDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBTnRELFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsY0FBUyxHQUFRLElBQUksQ0FBQztRQUV0QixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGFBQVEsR0FBUSxJQUFJLENBQUM7SUFFb0MsQ0FBQztJQUVuRSx1RUFBcUMsR0FBckMsVUFBc0MsWUFBd0I7UUFDNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQseUVBQXVDLEdBQXZDLFVBQXdDLFlBQXdCO1FBQzlELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELG9GQUFrRCxHQUFsRCxVQUFtRCxZQUF3QjtRQUN6RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsMENBQVEsR0FBUjtRQUNFLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztRQUNoRCxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4RCxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbkUsSUFBSSxDQUFDLGtEQUFrRCxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3ZFO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzFEO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakMsSUFBSSxDQUFDLHVDQUF1QyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzVEO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7O2dCQXhDNkIsU0FBUztnQkFBYyxVQUFVOztJQU50RDtRQUFSLEtBQUssRUFBRTs7NERBQWlCO0lBQ2hCO1FBQVIsS0FBSyxFQUFFOzs4REFBdUI7SUFFdEI7UUFBUixLQUFLLEVBQUU7OzREQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTs7NkRBQXNCO0lBTG5CLHVCQUF1QjtRQUhuQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsa0JBQWtCO1NBQzdCLENBQUM7eUNBUThCLFNBQVMsRUFBYyxVQUFVO09BUHBELHVCQUF1QixDQWdEbkM7SUFBRCw4QkFBQztDQUFBLEFBaERELElBZ0RDO1NBaERZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZGJUYWJsZVNjcm9sbF0nLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJUYWJsZVNjcm9sbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHNjcm9sbFkgPSBmYWxzZTtcbiAgQElucHV0KCkgbWF4SGVpZ2h0OiBhbnkgPSBudWxsO1xuXG4gIEBJbnB1dCgpIHNjcm9sbFggPSBmYWxzZTtcbiAgQElucHV0KCkgbWF4V2lkdGg6IGFueSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gIHdyYXBUYWJsZVdpdGhWZXJ0aWNhbFNjcm9sbGluZ1dyYXBwZXIodGFibGVXcmFwcGVyOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0YWJsZVdyYXBwZXIsICdtYXgtaGVpZ2h0JywgdGhpcy5tYXhIZWlnaHQgKyAncHgnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRhYmxlV3JhcHBlciwgJ292ZXJmbG93LXknLCAnYXV0bycpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGFibGVXcmFwcGVyLCAnZGlzcGxheScsICdibG9jaycpO1xuICB9XG5cbiAgd3JhcFRhYmxlV2l0aEhvcml6b250YWxTY3JvbGxpbmdXcmFwcGVyKHRhYmxlV3JhcHBlcjogRWxlbWVudFJlZikge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGFibGVXcmFwcGVyLCAnbWF4LXdpZHRoJywgdGhpcy5tYXhXaWR0aCArICdweCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGFibGVXcmFwcGVyLCAnb3ZlcmZsb3cteCcsICdhdXRvJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0YWJsZVdyYXBwZXIsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gIH1cblxuICB3cmFwVGFibGVXaXRoSG9yaXpvbnRhbEFuZFZlcnRpY2FsU2Nyb2xsaW5nV3JhcHBlcih0YWJsZVdyYXBwZXI6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRhYmxlV3JhcHBlciwgJ21heC1oZWlnaHQnLCB0aGlzLm1heEhlaWdodCArICdweCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGFibGVXcmFwcGVyLCAnbWF4LXdpZHRoJywgdGhpcy5tYXhXaWR0aCArICdweCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGFibGVXcmFwcGVyLCAnb3ZlcmZsb3cteCcsICdhdXRvJyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0YWJsZVdyYXBwZXIsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICBjb25zdCB0YWJsZVdyYXBwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgaWYgKHRoaXMuc2Nyb2xsWSAmJiB0aGlzLnNjcm9sbFggJiYgdGhpcy5tYXhIZWlnaHQgJiYgdGhpcy5tYXhXaWR0aCkge1xuICAgICAgdGhpcy53cmFwVGFibGVXaXRoSG9yaXpvbnRhbEFuZFZlcnRpY2FsU2Nyb2xsaW5nV3JhcHBlcih0YWJsZVdyYXBwZXIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNjcm9sbFkgJiYgdGhpcy5tYXhIZWlnaHQpIHtcbiAgICAgIHRoaXMud3JhcFRhYmxlV2l0aFZlcnRpY2FsU2Nyb2xsaW5nV3JhcHBlcih0YWJsZVdyYXBwZXIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNjcm9sbFggJiYgdGhpcy5tYXhXaWR0aCkge1xuICAgICAgdGhpcy53cmFwVGFibGVXaXRoSG9yaXpvbnRhbFNjcm9sbGluZ1dyYXBwZXIodGFibGVXcmFwcGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLmluc2VydEJlZm9yZShwYXJlbnQsIHRhYmxlV3JhcHBlciwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHBhcmVudCwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRhYmxlV3JhcHBlciwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgfVxufVxuIl19