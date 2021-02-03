'use strict';
import { Directive, ElementRef, Input } from '@angular/core';
import { computedStyle } from './computed.style';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
export class MdbStickyDirective {
    constructor(el, platformId) {
        this.isBrowser = false;
        this.stickyOffsetTop = 0;
        this.scrollHandler = () => {
            const parentRect = this.el.parentElement.getBoundingClientRect();
            const bodyRect = document.body.getBoundingClientRect();
            let dynProps;
            if (this.original.float === 'right') {
                const right = bodyRect.right - parentRect.right + this.original.marginRight;
                dynProps = { right: right + 'px' };
            }
            else if (this.original.float === 'left') {
                const left = parentRect.left - bodyRect.left + this.original.marginLeft;
                dynProps = { left: left + 'px' };
            }
            else {
                dynProps = { width: parentRect.width + 'px' };
            }
            if (this.original.marginTop +
                this.original.marginBottom +
                this.original.boundingClientRect.height +
                this.stickyOffsetTop >=
                parentRect.bottom) {
                /**
                 * stikcy element reached to the bottom of the container
                 */
                const floatAdjustment = this.original.float === 'right'
                    ? { right: 0 }
                    : this.original.float === 'left'
                        ? { left: 0 }
                        : {};
                Object.assign(this.el.style, {
                    position: 'absolute',
                    float: 'none',
                    top: 'inherit',
                    bottom: 0,
                }, dynProps, floatAdjustment);
            }
            else if (parentRect.top * -1 + this.original.marginTop + this.stickyOffsetTop >
                this.original.offsetTop) {
                /**
                 * stikcy element is in the middle of container
                 */
                // if not floating, add an empty filler element, since the original elements becames 'fixed'
                if (this.original.float !== 'left' && this.original.float !== 'right' && !this.fillerEl) {
                    this.fillerEl = document.createElement('div');
                    this.fillerEl.style.height = this.el.offsetHeight + 'px';
                    this.parentEl.insertBefore(this.fillerEl, this.el);
                }
                Object.assign(this.el.style, {
                    position: 'fixed',
                    float: 'none',
                    top: this.stickyOffsetTop + 'px',
                    bottom: 'inherit',
                }, dynProps);
            }
            else {
                /**
                 * stikcy element is in the original position
                 */
                if (this.fillerEl) {
                    this.parentEl.removeChild(this.fillerEl); // IE11 does not work with el.remove()
                    this.fillerEl = undefined;
                }
                Object.assign(this.el.style, {
                    position: this.original.position,
                    float: this.original.float,
                    top: this.original.top,
                    bottom: this.original.bottom,
                    width: this.original.width,
                    left: this.original.left,
                }, dynProps);
            }
        };
        this.el = this.el = el.nativeElement;
        this.parentEl = this.el.parentElement;
        this.isBrowser = isPlatformBrowser(platformId);
    }
    ngAfterViewInit() {
        this.el.style.boxSizing = 'border-box';
        if (this.stickyAfter) {
            const cetStickyAfterEl = document.querySelector(this.stickyAfter);
            if (cetStickyAfterEl) {
                this.stickyOffsetTop = cetStickyAfterEl.getBoundingClientRect().bottom;
            }
        }
        if (this.stickyAfterAlias) {
            const cetStickyAfterEl = document.querySelector(this.stickyAfterAlias);
            if (cetStickyAfterEl) {
                this.stickyOffsetTop = cetStickyAfterEl.getBoundingClientRect().bottom;
            }
        }
        // set the parent relatively positioned
        const allowedPositions = ['absolute', 'fixed', 'relative'];
        const parentElPosition = computedStyle(this.parentEl, 'position');
        if (allowedPositions.indexOf(parentElPosition) === -1) {
            // inherit, initial, unset
            this.parentEl.style.position = 'relative';
        }
        this.diff = {
            top: this.el.offsetTop - this.parentEl.offsetTop,
            left: this.el.offsetLeft - this.parentEl.offsetLeft,
        };
        if (this.isBrowser) {
            const elRect = this.el.getBoundingClientRect();
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
    }
    ngOnDestroy() {
        this.detach();
    }
    attach() {
        window.addEventListener('scroll', this.scrollHandler);
        window.addEventListener('resize', this.scrollHandler);
    }
    detach() {
        window.removeEventListener('scroll', this.scrollHandler);
        window.removeEventListener('resize', this.scrollHandler);
    }
}
MdbStickyDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mdbSticky]',
            },] }
];
MdbStickyDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
MdbStickyDirective.propDecorators = {
    stickyAfter: [{ type: Input }],
    stickyAfterAlias: [{ type: Input, args: ['sticky-after',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5LWNvbnRlbnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctdWlraXQtcHJvLXN0YW5kYXJkL3NyYy9saWIvcHJvL3N0aWNreS1jb250ZW50L3N0aWNreS1jb250ZW50LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUtwRCxNQUFNLE9BQU8sa0JBQWtCO0lBYzdCLFlBQVksRUFBYyxFQUF1QixVQUFrQjtRQVZuRSxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBS2xCLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBOEVwQixrQkFBYSxHQUFHLEdBQUcsRUFBRTtZQUNuQixNQUFNLFVBQVUsR0FBZSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzdFLE1BQU0sUUFBUSxHQUFlLFFBQVEsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUNuRSxJQUFJLFFBQVEsQ0FBQztZQUViLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFO2dCQUNuQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7Z0JBQzVFLFFBQVEsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLENBQUM7YUFDcEM7aUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxNQUFNLEVBQUU7Z0JBQ3pDLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztnQkFDeEUsUUFBUSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQzthQUNsQztpQkFBTTtnQkFDTCxRQUFRLEdBQUcsRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQzthQUMvQztZQUVELElBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTO2dCQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVk7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsTUFBTTtnQkFDdkMsSUFBSSxDQUFDLGVBQWU7Z0JBQ3RCLFVBQVUsQ0FBQyxNQUFNLEVBQ2pCO2dCQUNBOzttQkFFRztnQkFDSCxNQUFNLGVBQWUsR0FDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssT0FBTztvQkFDN0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtvQkFDZCxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssTUFBTTt3QkFDaEMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTt3QkFDYixDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNULE1BQU0sQ0FBQyxNQUFNLENBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQ2I7b0JBQ0UsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLEtBQUssRUFBRSxNQUFNO29CQUNiLEdBQUcsRUFBRSxTQUFTO29CQUNkLE1BQU0sRUFBRSxDQUFDO2lCQUNWLEVBQ0QsUUFBUSxFQUNSLGVBQWUsQ0FDaEIsQ0FBQzthQUNIO2lCQUFNLElBQ0wsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZTtnQkFDcEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQ3ZCO2dCQUNBOzttQkFFRztnQkFFSCw0RkFBNEY7Z0JBQzVGLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFLLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ3ZGLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztvQkFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3BEO2dCQUVELE1BQU0sQ0FBQyxNQUFNLENBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQ2I7b0JBQ0UsUUFBUSxFQUFFLE9BQU87b0JBQ2pCLEtBQUssRUFBRSxNQUFNO29CQUNiLEdBQUcsRUFBRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUk7b0JBQ2hDLE1BQU0sRUFBRSxTQUFTO2lCQUNsQixFQUNELFFBQVEsQ0FDVCxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0w7O21CQUVHO2dCQUNILElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsc0NBQXNDO29CQUNoRixJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztpQkFDM0I7Z0JBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FDWCxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFDYjtvQkFDRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRO29CQUNoQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO29CQUMxQixHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHO29CQUN0QixNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNO29CQUM1QixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO29CQUMxQixJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJO2lCQUN6QixFQUNELFFBQVEsQ0FDVCxDQUFDO2FBQ0g7UUFDSCxDQUFDLENBQUM7UUFoS0EsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztRQUV2QyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNsRSxJQUFJLGdCQUFnQixFQUFFO2dCQUNwQixJQUFJLENBQUMsZUFBZSxHQUFHLGdCQUFnQixDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDO2FBQ3hFO1NBQ0Y7UUFFRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDdkUsSUFBSSxnQkFBZ0IsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLE1BQU0sQ0FBQzthQUN4RTtTQUNGO1FBRUQsdUNBQXVDO1FBQ3ZDLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzNELE1BQU0sZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDbEUsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNyRCwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztTQUMzQztRQUVELElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDVixHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTO1lBQ2hELElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVU7U0FDcEQsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDL0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUc7Z0JBQ2Qsa0JBQWtCLEVBQUUsTUFBTTtnQkFDMUIsUUFBUSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQztnQkFDNUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQztnQkFDdEMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQztnQkFDbEMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQztnQkFDeEMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQztnQkFDdEMsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUztnQkFDNUIsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVTtnQkFDOUIsU0FBUyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzVELFlBQVksRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsY0FBYyxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNsRSxVQUFVLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDOUQsV0FBVyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUM7YUFDaEUsQ0FBQztTQUNIO1FBRUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELE1BQU07UUFDSixNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7WUF4RkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2FBQ3hCOzs7WUFSbUIsVUFBVTt5Q0F1QkMsTUFBTSxTQUFDLFdBQVc7OzswQkFiOUMsS0FBSzsrQkFFTCxLQUFLLFNBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb21wdXRlZFN0eWxlIH0gZnJvbSAnLi9jb21wdXRlZC5zdHlsZSc7XG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBMQVRGT1JNX0lELCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21kYlN0aWNreV0nLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJTdGlja3lEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBzdGlja3lBZnRlcjogc3RyaW5nOyAvLyBjc3Mgc2VsZWN0b3IgdG8gYmUgc3RpY2t5IGFmdGVyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCdzdGlja3ktYWZ0ZXInKSBzdGlja3lBZnRlckFsaWFzOiBzdHJpbmc7IC8vIGNzcyBzZWxlY3RvciB0byBiZSBzdGlja3kgYWZ0ZXJcbiAgaXNCcm93c2VyID0gZmFsc2U7XG5cbiAgZWw6IEhUTUxFbGVtZW50IHwgYW55O1xuICBwYXJlbnRFbDogSFRNTEVsZW1lbnQgfCBhbnk7XG4gIGZpbGxlckVsOiBIVE1MRWxlbWVudCB8IGFueTtcbiAgc3RpY2t5T2Zmc2V0VG9wID0gMDtcblxuICBkaWZmOiBhbnk7XG4gIG9yaWdpbmFsOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWYsIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IHN0cmluZykge1xuICAgIHRoaXMuZWwgPSB0aGlzLmVsID0gZWwubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLnBhcmVudEVsID0gdGhpcy5lbC5wYXJlbnRFbGVtZW50O1xuICAgIHRoaXMuaXNCcm93c2VyID0gaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5lbC5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG5cbiAgICBpZiAodGhpcy5zdGlja3lBZnRlcikge1xuICAgICAgY29uc3QgY2V0U3RpY2t5QWZ0ZXJFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zdGlja3lBZnRlcik7XG4gICAgICBpZiAoY2V0U3RpY2t5QWZ0ZXJFbCkge1xuICAgICAgICB0aGlzLnN0aWNreU9mZnNldFRvcCA9IGNldFN0aWNreUFmdGVyRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnN0aWNreUFmdGVyQWxpYXMpIHtcbiAgICAgIGNvbnN0IGNldFN0aWNreUFmdGVyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc3RpY2t5QWZ0ZXJBbGlhcyk7XG4gICAgICBpZiAoY2V0U3RpY2t5QWZ0ZXJFbCkge1xuICAgICAgICB0aGlzLnN0aWNreU9mZnNldFRvcCA9IGNldFN0aWNreUFmdGVyRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNldCB0aGUgcGFyZW50IHJlbGF0aXZlbHkgcG9zaXRpb25lZFxuICAgIGNvbnN0IGFsbG93ZWRQb3NpdGlvbnMgPSBbJ2Fic29sdXRlJywgJ2ZpeGVkJywgJ3JlbGF0aXZlJ107XG4gICAgY29uc3QgcGFyZW50RWxQb3NpdGlvbiA9IGNvbXB1dGVkU3R5bGUodGhpcy5wYXJlbnRFbCwgJ3Bvc2l0aW9uJyk7XG4gICAgaWYgKGFsbG93ZWRQb3NpdGlvbnMuaW5kZXhPZihwYXJlbnRFbFBvc2l0aW9uKSA9PT0gLTEpIHtcbiAgICAgIC8vIGluaGVyaXQsIGluaXRpYWwsIHVuc2V0XG4gICAgICB0aGlzLnBhcmVudEVsLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICB9XG5cbiAgICB0aGlzLmRpZmYgPSB7XG4gICAgICB0b3A6IHRoaXMuZWwub2Zmc2V0VG9wIC0gdGhpcy5wYXJlbnRFbC5vZmZzZXRUb3AsXG4gICAgICBsZWZ0OiB0aGlzLmVsLm9mZnNldExlZnQgLSB0aGlzLnBhcmVudEVsLm9mZnNldExlZnQsXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgY29uc3QgZWxSZWN0ID0gdGhpcy5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHRoaXMuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB0aGlzLm9yaWdpbmFsID0ge1xuICAgICAgICBib3VuZGluZ0NsaWVudFJlY3Q6IGVsUmVjdCxcbiAgICAgICAgcG9zaXRpb246IGNvbXB1dGVkU3R5bGUodGhpcy5lbCwgJ3Bvc2l0aW9uJyksXG4gICAgICAgIGZsb2F0OiBjb21wdXRlZFN0eWxlKHRoaXMuZWwsICdmbG9hdCcpLFxuICAgICAgICB0b3A6IGNvbXB1dGVkU3R5bGUodGhpcy5lbCwgJ3RvcCcpLFxuICAgICAgICBib3R0b206IGNvbXB1dGVkU3R5bGUodGhpcy5lbCwgJ2JvdHRvbScpLFxuICAgICAgICB3aWR0aDogY29tcHV0ZWRTdHlsZSh0aGlzLmVsLCAnd2lkdGgnKSxcbiAgICAgICAgbGVmdDogJycsXG4gICAgICAgIG9mZnNldFRvcDogdGhpcy5lbC5vZmZzZXRUb3AsXG4gICAgICAgIG9mZnNldExlZnQ6IHRoaXMuZWwub2Zmc2V0TGVmdCxcbiAgICAgICAgbWFyZ2luVG9wOiBwYXJzZUludChjb21wdXRlZFN0eWxlKHRoaXMuZWwsICdtYXJnaW5Ub3AnKSwgMTApLFxuICAgICAgICBtYXJnaW5Cb3R0b206IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUodGhpcy5lbCwgJ21hcmdpbkJvdHRvbScpLCAxMCksXG4gICAgICAgIG1hcmdpbkxlZnQ6IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUodGhpcy5lbCwgJ21hcmdpbkxlZnQnKSwgMTApLFxuICAgICAgICBtYXJnaW5SaWdodDogcGFyc2VJbnQoY29tcHV0ZWRTdHlsZSh0aGlzLmVsLCAnbWFyZ2luTGVmdCcpLCAxMCksXG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMuYXR0YWNoKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRldGFjaCgpO1xuICB9XG5cbiAgYXR0YWNoKCk6IHZvaWQge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xuICB9XG5cbiAgZGV0YWNoKCk6IHZvaWQge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xuICB9XG5cbiAgc2Nyb2xsSGFuZGxlciA9ICgpID0+IHtcbiAgICBjb25zdCBwYXJlbnRSZWN0OiBDbGllbnRSZWN0ID0gdGhpcy5lbC5wYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGJvZHlSZWN0OiBDbGllbnRSZWN0ID0gZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgZHluUHJvcHM7XG5cbiAgICBpZiAodGhpcy5vcmlnaW5hbC5mbG9hdCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgY29uc3QgcmlnaHQgPSBib2R5UmVjdC5yaWdodCAtIHBhcmVudFJlY3QucmlnaHQgKyB0aGlzLm9yaWdpbmFsLm1hcmdpblJpZ2h0O1xuICAgICAgZHluUHJvcHMgPSB7IHJpZ2h0OiByaWdodCArICdweCcgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3JpZ2luYWwuZmxvYXQgPT09ICdsZWZ0Jykge1xuICAgICAgY29uc3QgbGVmdCA9IHBhcmVudFJlY3QubGVmdCAtIGJvZHlSZWN0LmxlZnQgKyB0aGlzLm9yaWdpbmFsLm1hcmdpbkxlZnQ7XG4gICAgICBkeW5Qcm9wcyA9IHsgbGVmdDogbGVmdCArICdweCcgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgZHluUHJvcHMgPSB7IHdpZHRoOiBwYXJlbnRSZWN0LndpZHRoICsgJ3B4JyB9O1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHRoaXMub3JpZ2luYWwubWFyZ2luVG9wICtcbiAgICAgICAgdGhpcy5vcmlnaW5hbC5tYXJnaW5Cb3R0b20gK1xuICAgICAgICB0aGlzLm9yaWdpbmFsLmJvdW5kaW5nQ2xpZW50UmVjdC5oZWlnaHQgK1xuICAgICAgICB0aGlzLnN0aWNreU9mZnNldFRvcCA+PVxuICAgICAgcGFyZW50UmVjdC5ib3R0b21cbiAgICApIHtcbiAgICAgIC8qKlxuICAgICAgICogc3Rpa2N5IGVsZW1lbnQgcmVhY2hlZCB0byB0aGUgYm90dG9tIG9mIHRoZSBjb250YWluZXJcbiAgICAgICAqL1xuICAgICAgY29uc3QgZmxvYXRBZGp1c3RtZW50ID1cbiAgICAgICAgdGhpcy5vcmlnaW5hbC5mbG9hdCA9PT0gJ3JpZ2h0J1xuICAgICAgICAgID8geyByaWdodDogMCB9XG4gICAgICAgICAgOiB0aGlzLm9yaWdpbmFsLmZsb2F0ID09PSAnbGVmdCdcbiAgICAgICAgICA/IHsgbGVmdDogMCB9XG4gICAgICAgICAgOiB7fTtcbiAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHRoaXMuZWwuc3R5bGUsXG4gICAgICAgIHtcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBmbG9hdDogJ25vbmUnLFxuICAgICAgICAgIHRvcDogJ2luaGVyaXQnLFxuICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgfSxcbiAgICAgICAgZHluUHJvcHMsXG4gICAgICAgIGZsb2F0QWRqdXN0bWVudFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgcGFyZW50UmVjdC50b3AgKiAtMSArIHRoaXMub3JpZ2luYWwubWFyZ2luVG9wICsgdGhpcy5zdGlja3lPZmZzZXRUb3AgPlxuICAgICAgdGhpcy5vcmlnaW5hbC5vZmZzZXRUb3BcbiAgICApIHtcbiAgICAgIC8qKlxuICAgICAgICogc3Rpa2N5IGVsZW1lbnQgaXMgaW4gdGhlIG1pZGRsZSBvZiBjb250YWluZXJcbiAgICAgICAqL1xuXG4gICAgICAvLyBpZiBub3QgZmxvYXRpbmcsIGFkZCBhbiBlbXB0eSBmaWxsZXIgZWxlbWVudCwgc2luY2UgdGhlIG9yaWdpbmFsIGVsZW1lbnRzIGJlY2FtZXMgJ2ZpeGVkJ1xuICAgICAgaWYgKHRoaXMub3JpZ2luYWwuZmxvYXQgIT09ICdsZWZ0JyAmJiB0aGlzLm9yaWdpbmFsLmZsb2F0ICE9PSAncmlnaHQnICYmICF0aGlzLmZpbGxlckVsKSB7XG4gICAgICAgIHRoaXMuZmlsbGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5maWxsZXJFbC5zdHlsZS5oZWlnaHQgPSB0aGlzLmVsLm9mZnNldEhlaWdodCArICdweCc7XG4gICAgICAgIHRoaXMucGFyZW50RWwuaW5zZXJ0QmVmb3JlKHRoaXMuZmlsbGVyRWwsIHRoaXMuZWwpO1xuICAgICAgfVxuXG4gICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICB0aGlzLmVsLnN0eWxlLFxuICAgICAgICB7XG4gICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsIC8vIGZpeGVkIGlzIGEgbG90IHNtb290aGVyIHRoYW4gYWJzb2x1dGVcbiAgICAgICAgICBmbG9hdDogJ25vbmUnLFxuICAgICAgICAgIHRvcDogdGhpcy5zdGlja3lPZmZzZXRUb3AgKyAncHgnLFxuICAgICAgICAgIGJvdHRvbTogJ2luaGVyaXQnLFxuICAgICAgICB9LFxuICAgICAgICBkeW5Qcm9wc1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLyoqXG4gICAgICAgKiBzdGlrY3kgZWxlbWVudCBpcyBpbiB0aGUgb3JpZ2luYWwgcG9zaXRpb25cbiAgICAgICAqL1xuICAgICAgaWYgKHRoaXMuZmlsbGVyRWwpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRFbC5yZW1vdmVDaGlsZCh0aGlzLmZpbGxlckVsKTsgLy8gSUUxMSBkb2VzIG5vdCB3b3JrIHdpdGggZWwucmVtb3ZlKClcbiAgICAgICAgdGhpcy5maWxsZXJFbCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHRoaXMuZWwuc3R5bGUsXG4gICAgICAgIHtcbiAgICAgICAgICBwb3NpdGlvbjogdGhpcy5vcmlnaW5hbC5wb3NpdGlvbixcbiAgICAgICAgICBmbG9hdDogdGhpcy5vcmlnaW5hbC5mbG9hdCxcbiAgICAgICAgICB0b3A6IHRoaXMub3JpZ2luYWwudG9wLFxuICAgICAgICAgIGJvdHRvbTogdGhpcy5vcmlnaW5hbC5ib3R0b20sXG4gICAgICAgICAgd2lkdGg6IHRoaXMub3JpZ2luYWwud2lkdGgsXG4gICAgICAgICAgbGVmdDogdGhpcy5vcmlnaW5hbC5sZWZ0LFxuICAgICAgICB9LFxuICAgICAgICBkeW5Qcm9wc1xuICAgICAgKTtcbiAgICB9XG4gIH07XG59XG4iXX0=