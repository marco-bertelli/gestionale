'use strict';
import { __decorate, __metadata, __param } from "tslib";
import { Directive, ElementRef, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { computedStyle } from './computed.style';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
var MdbStickyDirective = /** @class */ (function () {
    function MdbStickyDirective(el, platformId) {
        var _this = this;
        this.isBrowser = false;
        this.stickyOffsetTop = 0;
        this.scrollHandler = function () {
            var parentRect = _this.el.parentElement.getBoundingClientRect();
            var bodyRect = document.body.getBoundingClientRect();
            var dynProps;
            if (_this.original.float === 'right') {
                var right = bodyRect.right - parentRect.right + _this.original.marginRight;
                dynProps = { right: right + 'px' };
            }
            else if (_this.original.float === 'left') {
                var left = parentRect.left - bodyRect.left + _this.original.marginLeft;
                dynProps = { left: left + 'px' };
            }
            else {
                dynProps = { width: parentRect.width + 'px' };
            }
            if (_this.original.marginTop +
                _this.original.marginBottom +
                _this.original.boundingClientRect.height +
                _this.stickyOffsetTop >=
                parentRect.bottom) {
                /**
                 * stikcy element reached to the bottom of the container
                 */
                var floatAdjustment = _this.original.float === 'right'
                    ? { right: 0 }
                    : _this.original.float === 'left'
                        ? { left: 0 }
                        : {};
                Object.assign(_this.el.style, {
                    position: 'absolute',
                    float: 'none',
                    top: 'inherit',
                    bottom: 0,
                }, dynProps, floatAdjustment);
            }
            else if (parentRect.top * -1 + _this.original.marginTop + _this.stickyOffsetTop >
                _this.original.offsetTop) {
                /**
                 * stikcy element is in the middle of container
                 */
                // if not floating, add an empty filler element, since the original elements becames 'fixed'
                if (_this.original.float !== 'left' && _this.original.float !== 'right' && !_this.fillerEl) {
                    _this.fillerEl = document.createElement('div');
                    _this.fillerEl.style.height = _this.el.offsetHeight + 'px';
                    _this.parentEl.insertBefore(_this.fillerEl, _this.el);
                }
                Object.assign(_this.el.style, {
                    position: 'fixed',
                    float: 'none',
                    top: _this.stickyOffsetTop + 'px',
                    bottom: 'inherit',
                }, dynProps);
            }
            else {
                /**
                 * stikcy element is in the original position
                 */
                if (_this.fillerEl) {
                    _this.parentEl.removeChild(_this.fillerEl); // IE11 does not work with el.remove()
                    _this.fillerEl = undefined;
                }
                Object.assign(_this.el.style, {
                    position: _this.original.position,
                    float: _this.original.float,
                    top: _this.original.top,
                    bottom: _this.original.bottom,
                    width: _this.original.width,
                    left: _this.original.left,
                }, dynProps);
            }
        };
        this.el = this.el = el.nativeElement;
        this.parentEl = this.el.parentElement;
        this.isBrowser = isPlatformBrowser(platformId);
    }
    MdbStickyDirective.prototype.ngAfterViewInit = function () {
        this.el.style.boxSizing = 'border-box';
        if (this.stickyAfter) {
            var cetStickyAfterEl = document.querySelector(this.stickyAfter);
            if (cetStickyAfterEl) {
                this.stickyOffsetTop = cetStickyAfterEl.getBoundingClientRect().bottom;
            }
        }
        if (this.stickyAfterAlias) {
            var cetStickyAfterEl = document.querySelector(this.stickyAfterAlias);
            if (cetStickyAfterEl) {
                this.stickyOffsetTop = cetStickyAfterEl.getBoundingClientRect().bottom;
            }
        }
        // set the parent relatively positioned
        var allowedPositions = ['absolute', 'fixed', 'relative'];
        var parentElPosition = computedStyle(this.parentEl, 'position');
        if (allowedPositions.indexOf(parentElPosition) === -1) {
            // inherit, initial, unset
            this.parentEl.style.position = 'relative';
        }
        this.diff = {
            top: this.el.offsetTop - this.parentEl.offsetTop,
            left: this.el.offsetLeft - this.parentEl.offsetLeft,
        };
        if (this.isBrowser) {
            var elRect = this.el.getBoundingClientRect();
            this.el.getBoundingClientRect();
            this.original = {
                boundingClientRect: elRect,
                position: computedStyle(this.el, 'position'),
                float: computedStyle(this.el, 'float'),
                top: computedStyle(this.el, 'top'),
                bottom: computedStyle(this.el, 'bottom'),
                width: computedStyle(this.el, 'width'),
                left: '',
                offsetTop: this.el.offsetTop,
                offsetLeft: this.el.offsetLeft,
                marginTop: parseInt(computedStyle(this.el, 'marginTop'), 10),
                marginBottom: parseInt(computedStyle(this.el, 'marginBottom'), 10),
                marginLeft: parseInt(computedStyle(this.el, 'marginLeft'), 10),
                marginRight: parseInt(computedStyle(this.el, 'marginLeft'), 10),
            };
        }
        this.attach();
    };
    MdbStickyDirective.prototype.ngOnDestroy = function () {
        this.detach();
    };
    MdbStickyDirective.prototype.attach = function () {
        window.addEventListener('scroll', this.scrollHandler);
        window.addEventListener('resize', this.scrollHandler);
    };
    MdbStickyDirective.prototype.detach = function () {
        window.removeEventListener('scroll', this.scrollHandler);
        window.removeEventListener('resize', this.scrollHandler);
    };
    MdbStickyDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbStickyDirective.prototype, "stickyAfter", void 0);
    __decorate([
        Input('sticky-after'),
        __metadata("design:type", String)
    ], MdbStickyDirective.prototype, "stickyAfterAlias", void 0);
    MdbStickyDirective = __decorate([
        Directive({
            selector: '[mdbSticky]',
        }),
        __param(1, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [ElementRef, String])
    ], MdbStickyDirective);
    return MdbStickyDirective;
}());
export { MdbStickyDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5LWNvbnRlbnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9zdGlja3ktY29udGVudC9zdGlja3ktY29udGVudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOztBQUViLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUtwRDtJQWNFLDRCQUFZLEVBQWMsRUFBdUIsVUFBa0I7UUFBbkUsaUJBSUM7UUFkRCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBS2xCLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBOEVwQixrQkFBYSxHQUFHO1lBQ2QsSUFBTSxVQUFVLEdBQWUsS0FBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM3RSxJQUFNLFFBQVEsR0FBZSxRQUFRLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDbkUsSUFBSSxRQUFRLENBQUM7WUFFYixJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtnQkFDbkMsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO2dCQUM1RSxRQUFRLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDO2FBQ3BDO2lCQUFNLElBQUksS0FBSSxD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Qzs7Z0JBdkVlLFVBQVU7NkNBQUcsTUFBTSxTQUFDLFdBQVc7O0lBYnRDO1FBQVIsS0FBSyxFQUFFOzsyREFBcUI7SUFFTjtRQUF0QixLQUFLLENBQUMsY0FBYyxDQUFDOztnRUFBMEI7SUFIckMsa0JBQWtCO1FBSDlCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxhQUFhO1NBQ3hCLENBQUM7UUFlNkIsV0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7eUNBQWhDLFVBQVU7T0FkZixrQkFBa0IsQ0FnTDlCO0lBQUQseUJBQUM7Q0FBQSxBQWhMRCxJQWdMQztTQWhMWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29tcHV0ZWRTdHlsZSB9IGZyb20gJy4vY29tcHV0ZWQuc3R5bGUnO1xuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQTEFURk9STV9JRCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZGJTdGlja3ldJyxcbn0pXG5leHBvcnQgY2xhc3MgTWRiU3RpY2t5RGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgc3RpY2t5QWZ0ZXI6IHN0cmluZzsgLy8gY3NzIHNlbGVjdG9yIHRvIGJlIHN0aWNreSBhZnRlclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgnc3RpY2t5LWFmdGVyJykgc3RpY2t5QWZ0ZXJBbGlhczogc3RyaW5nOyAvLyBjc3Mgc2VsZWN0b3IgdG8gYmUgc3RpY2t5IGFmdGVyXG4gIGlzQnJvd3NlciA9IGZhbHNlO1xuXG4gIGVsOiBIVE1MRWxlbWVudCB8IGFueTtcbiAgcGFyZW50RWw6IEhUTUxFbGVtZW50IHwgYW55O1xuICBmaWxsZXJFbDogSFRNTEVsZW1lbnQgfCBhbnk7XG4gIHN0aWNreU9mZnNldFRvcCA9IDA7XG5cbiAgZGlmZjogYW55O1xuICBvcmlnaW5hbDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmLCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmVsID0gdGhpcy5lbCA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5wYXJlbnRFbCA9IHRoaXMuZWwucGFyZW50RWxlbWVudDtcbiAgICB0aGlzLmlzQnJvd3NlciA9IGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZWwuc3R5bGUuYm94U2l6aW5nID0gJ2JvcmRlci1ib3gnO1xuXG4gICAgaWYgKHRoaXMuc3RpY2t5QWZ0ZXIpIHtcbiAgICAgIGNvbnN0IGNldFN0aWNreUFmdGVyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc3RpY2t5QWZ0ZXIpO1xuICAgICAgaWYgKGNldFN0aWNreUFmdGVyRWwpIHtcbiAgICAgICAgdGhpcy5zdGlja3lPZmZzZXRUb3AgPSBjZXRTdGlja3lBZnRlckVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdGlja3lBZnRlckFsaWFzKSB7XG4gICAgICBjb25zdCBjZXRTdGlja3lBZnRlckVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnN0aWNreUFmdGVyQWxpYXMpO1xuICAgICAgaWYgKGNldFN0aWNreUFmdGVyRWwpIHtcbiAgICAgICAgdGhpcy5zdGlja3lPZmZzZXRUb3AgPSBjZXRTdGlja3lBZnRlckVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzZXQgdGhlIHBhcmVudCByZWxhdGl2ZWx5IHBvc2l0aW9uZWRcbiAgICBjb25zdCBhbGxvd2VkUG9zaXRpb25zID0gWydhYnNvbHV0ZScsICdmaXhlZCcsICdyZWxhdGl2ZSddO1xuICAgIGNvbnN0IHBhcmVudEVsUG9zaXRpb24gPSBjb21wdXRlZFN0eWxlKHRoaXMucGFyZW50RWwsICdwb3NpdGlvbicpO1xuICAgIGlmIChhbGxvd2VkUG9zaXRpb25zLmluZGV4T2YocGFyZW50RWxQb3NpdGlvbikgPT09IC0xKSB7XG4gICAgICAvLyBpbmhlcml0LCBpbml0aWFsLCB1bnNldFxuICAgICAgdGhpcy5wYXJlbnRFbC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgfVxuXG4gICAgdGhpcy5kaWZmID0ge1xuICAgICAgdG9wOiB0aGlzLmVsLm9mZnNldFRvcCAtIHRoaXMucGFyZW50RWwub2Zmc2V0VG9wLFxuICAgICAgbGVmdDogdGhpcy5lbC5vZmZzZXRMZWZ0IC0gdGhpcy5wYXJlbnRFbC5vZmZzZXRMZWZ0LFxuICAgIH07XG5cbiAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgIGNvbnN0IGVsUmVjdCA9IHRoaXMuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB0aGlzLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdGhpcy5vcmlnaW5hbCA9IHtcbiAgICAgICAgYm91bmRpbmdDbGllbnRSZWN0OiBlbFJlY3QsXG4gICAgICAgIHBvc2l0aW9uOiBjb21wdXRlZFN0eWxlKHRoaXMuZWwsICdwb3NpdGlvbicpLFxuICAgICAgICBmbG9hdDogY29tcHV0ZWRTdHlsZSh0aGlzLmVsLCAnZmxvYXQnKSxcbiAgICAgICAgdG9wOiBjb21wdXRlZFN0eWxlKHRoaXMuZWwsICd0b3AnKSxcbiAgICAgICAgYm90dG9tOiBjb21wdXRlZFN0eWxlKHRoaXMuZWwsICdib3R0b20nKSxcbiAgICAgICAgd2lkdGg6IGNvbXB1dGVkU3R5bGUodGhpcy5lbCwgJ3dpZHRoJyksXG4gICAgICAgIGxlZnQ6ICcnLFxuICAgICAgICBvZmZzZXRUb3A6IHRoaXMuZWwub2Zmc2V0VG9wLFxuICAgICAgICBvZmZzZXRMZWZ0OiB0aGlzLmVsLm9mZnNldExlZnQsXG4gICAgICAgIG1hcmdpblRvcDogcGFyc2VJbnQoY29tcHV0ZWRTdHlsZSh0aGlzLmVsLCAnbWFyZ2luVG9wJyksIDEwKSxcbiAgICAgICAgbWFyZ2luQm90dG9tOiBwYXJzZUludChjb21wdXRlZFN0eWxlKHRoaXMuZWwsICdtYXJnaW5Cb3R0b20nKSwgMTApLFxuICAgICAgICBtYXJnaW5MZWZ0OiBwYXJzZUludChjb21wdXRlZFN0eWxlKHRoaXMuZWwsICdtYXJnaW5MZWZ0JyksIDEwKSxcbiAgICAgICAgbWFyZ2luUmlnaHQ6IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUodGhpcy5lbCwgJ21hcmdpbkxlZnQnKSwgMTApLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLmF0dGFjaCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXRhY2goKTtcbiAgfVxuXG4gIGF0dGFjaCgpOiB2b2lkIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5zY3JvbGxIYW5kbGVyKTtcbiAgfVxuXG4gIGRldGFjaCgpOiB2b2lkIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5zY3JvbGxIYW5kbGVyKTtcbiAgfVxuXG4gIHNjcm9sbEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgcGFyZW50UmVjdDogQ2xpZW50UmVjdCA9IHRoaXMuZWwucGFyZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBib2R5UmVjdDogQ2xpZW50UmVjdCA9IGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IGR5blByb3BzO1xuXG4gICAgaWYgKHRoaXMub3JpZ2luYWwuZmxvYXQgPT09ICdyaWdodCcpIHtcbiAgICAgIGNvbnN0IHJpZ2h0ID0gYm9keVJlY3QucmlnaHQgLSBwYXJlbnRSZWN0LnJpZ2h0ICsgdGhpcy5vcmlnaW5hbC5tYXJnaW5SaWdodDtcbiAgICAgIGR5blByb3BzID0geyByaWdodDogcmlnaHQgKyAncHgnIH07XG4gICAgfSBlbHNlIGlmICh0aGlzLm9yaWdpbmFsLmZsb2F0ID09PSAnbGVmdCcpIHtcbiAgICAgIGNvbnN0IGxlZnQgPSBwYXJlbnRSZWN0LmxlZnQgLSBib2R5UmVjdC5sZWZ0ICsgdGhpcy5vcmlnaW5hbC5tYXJnaW5MZWZ0O1xuICAgICAgZHluUHJvcHMgPSB7IGxlZnQ6IGxlZnQgKyAncHgnIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGR5blByb3BzID0geyB3aWR0aDogcGFyZW50UmVjdC53aWR0aCArICdweCcgfTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLm9yaWdpbmFsLm1hcmdpblRvcCArXG4gICAgICAgIHRoaXMub3JpZ2luYWwubWFyZ2luQm90dG9tICtcbiAgICAgICAgdGhpcy5vcmlnaW5hbC5ib3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0ICtcbiAgICAgICAgdGhpcy5zdGlja3lPZmZzZXRUb3AgPj1cbiAgICAgIHBhcmVudFJlY3QuYm90dG9tXG4gICAgKSB7XG4gICAgICAvKipcbiAgICAgICAqIHN0aWtjeSBlbGVtZW50IHJlYWNoZWQgdG8gdGhlIGJvdHRvbSBvZiB0aGUgY29udGFpbmVyXG4gICAgICAgKi9cbiAgICAgIGNvbnN0IGZsb2F0QWRqdXN0bWVudCA9XG4gICAgICAgIHRoaXMub3JpZ2luYWwuZmxvYXQgPT09ICdyaWdodCdcbiAgICAgICAgICA/IHsgcmlnaHQ6IDAgfVxuICAgICAgICAgIDogdGhpcy5vcmlnaW5hbC5mbG9hdCA9PT0gJ2xlZnQnXG4gICAgICAgICAgPyB7IGxlZnQ6IDAgfVxuICAgICAgICAgIDoge307XG4gICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICB0aGlzLmVsLnN0eWxlLFxuICAgICAgICB7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgZmxvYXQ6ICdub25lJyxcbiAgICAgICAgICB0b3A6ICdpbmhlcml0JyxcbiAgICAgICAgICBib3R0b206IDAsXG4gICAgICAgIH0sXG4gICAgICAgIGR5blByb3BzLFxuICAgICAgICBmbG9hdEFkanVzdG1lbnRcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHBhcmVudFJlY3QudG9wICogLTEgKyB0aGlzLm9yaWdpbmFsLm1hcmdpblRvcCArIHRoaXMuc3RpY2t5T2Zmc2V0VG9wID5cbiAgICAgIHRoaXMub3JpZ2luYWwub2Zmc2V0VG9wXG4gICAgKSB7XG4gICAgICAvKipcbiAgICAgICAqIHN0aWtjeSBlbGVtZW50IGlzIGluIHRoZSBtaWRkbGUgb2YgY29udGFpbmVyXG4gICAgICAgKi9cblxuICAgICAgLy8gaWYgbm90IGZsb2F0aW5nLCBhZGQgYW4gZW1wdHkgZmlsbGVyIGVsZW1lbnQsIHNpbmNlIHRoZSBvcmlnaW5hbCBlbGVtZW50cyBiZWNhbWVzICdmaXhlZCdcbiAgICAgIGlmICh0aGlzLm9yaWdpbmFsLmZsb2F0ICE9PSAnbGVmdCcgJiYgdGhpcy5vcmlnaW5hbC5mbG9hdCAhPT0gJ3JpZ2h0JyAmJiAhdGhpcy5maWxsZXJFbCkge1xuICAgICAgICB0aGlzLmZpbGxlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuZmlsbGVyRWwuc3R5bGUuaGVpZ2h0ID0gdGhpcy5lbC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgICB0aGlzLnBhcmVudEVsLmluc2VydEJlZm9yZSh0aGlzLmZpbGxlckVsLCB0aGlzLmVsKTtcbiAgICAgIH1cblxuICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgdGhpcy5lbC5zdHlsZSxcbiAgICAgICAge1xuICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLCAvLyBmaXhlZCBpcyBhIGxvdCBzbW9vdGhlciB0aGFuIGFic29sdXRlXG4gICAgICAgICAgZmxvYXQ6ICdub25lJyxcbiAgICAgICAgICB0b3A6IHRoaXMuc3RpY2t5T2Zmc2V0VG9wICsgJ3B4JyxcbiAgICAgICAgICBib3R0b206ICdpbmhlcml0JyxcbiAgICAgICAgfSxcbiAgICAgICAgZHluUHJvcHNcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qKlxuICAgICAgICogc3Rpa2N5IGVsZW1lbnQgaXMgaW4gdGhlIG9yaWdpbmFsIHBvc2l0aW9uXG4gICAgICAgKi9cbiAgICAgIGlmICh0aGlzLmZpbGxlckVsKSB7XG4gICAgICAgIHRoaXMucGFyZW50RWwucmVtb3ZlQ2hpbGQodGhpcy5maWxsZXJFbCk7IC8vIElFMTEgZG9lcyBub3Qgd29yayB3aXRoIGVsLnJlbW92ZSgpXG4gICAgICAgIHRoaXMuZmlsbGVyRWwgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICB0aGlzLmVsLnN0eWxlLFxuICAgICAgICB7XG4gICAgICAgICAgcG9zaXRpb246IHRoaXMub3JpZ2luYWwucG9zaXRpb24sXG4gICAgICAgICAgZmxvYXQ6IHRoaXMub3JpZ2luYWwuZmxvYXQsXG4gICAgICAgICAgdG9wOiB0aGlzLm9yaWdpbmFsLnRvcCxcbiAgICAgICAgICBib3R0b206IHRoaXMub3JpZ2luYWwuYm90dG9tLFxuICAgICAgICAgIHdpZHRoOiB0aGlzLm9yaWdpbmFsLndpZHRoLFxuICAgICAgICAgIGxlZnQ6IHRoaXMub3JpZ2luYWwubGVmdCxcbiAgICAgICAgfSxcbiAgICAgICAgZHluUHJvcHNcbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuIl19