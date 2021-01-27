import { Component, ElementRef, ViewChild, Input, ContentChildren, QueryList, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Optional, } from '@angular/core';
import { state, style, trigger, transition, animate } from '@angular/animations';
import { RouterLinkWithHref, Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
export class SBItemBodyComponent {
    constructor(el, _cdRef, router) {
        this.el = el;
        this._cdRef = _cdRef;
        this.router = router;
        this.animationStateChange = new EventEmitter();
        this.id = `mdb-accordion-`;
        this.height = '0';
        this._destroy$ = new Subject();
        this.expandAnimationState = 'collapsed';
        this.ariaLabelledBy = '';
    }
    toggle(collapsed) {
        setTimeout(() => {
            collapsed
                ? (this.expandAnimationState = 'collapsed')
                : (this.expandAnimationState = 'expanded');
            this._cdRef.markForCheck();
        }, 0);
    }
    animationCallback() {
        this.animationStateChange.emit({
            state: this.expandAnimationState,
            accordionEl: this.el.nativeElement.parentElement.parentElement,
        });
    }
    openSidenavOnActiveLink() {
        if (typeof window !== 'undefined' && window) {
            const pathStrategyUrl = window.location.pathname;
            const hashStrategyUrl = window.location.hash;
            const activeLink = this.routerLinks.find((link) => {
                const params = link.href.split('?')[1];
                if (params) {
                    return (link.href.split('?')[0] === pathStrategyUrl ||
                        link.href.split('?')[0] === hashStrategyUrl);
                }
                else {
                    return link.href === pathStrategyUrl || link.href === hashStrategyUrl;
                }
            });
            const sbItem = this.el.nativeElement.parentNode;
            if (activeLink) {
                setTimeout(() => {
                    this.expandAnimationState = 'expanded';
                    if (sbItem) {
                        sbItem.classList.add('active');
                        sbItem.classList.remove('is-collapsed');
                    }
                    this._cdRef.markForCheck();
                }, 10);
            }
            else if (this.expandAnimationState !== 'collapsed' && activeLink) {
                setTimeout(() => {
                    this.expandAnimationState = 'collapsed';
                    if (sbItem) {
                        sbItem.classList.remove('active');
                        sbItem.classList.add('is-collapsed');
                    }
                    this._cdRef.markForCheck();
                }, 10);
            }
        }
    }
    ngAfterContentInit() {
        setTimeout(() => {
            this.collapsed
                ? (this.expandAnimationState = 'collapsed')
                : (this.expandAnimationState = 'expanded');
            if (this.router && this.autoExpand) {
                this.router.events
                    .pipe(takeUntil(this._destroy$), filter(event => event instanceof NavigationEnd))
                    .subscribe(() => {
                    this.openSidenavOnActiveLink();
                });
            }
        }, 0);
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.unsubscribe();
    }
}
SBItemBodyComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'sbItemBody',
                selector: 'mdb-item-body, mdb-accordion-item-body',
                template: "<div #body class=\"sb-item-body\"\n     [style.height]=\"height\"\n     (@expandBody.done)=\"animationCallback()\"\n     [@expandBody]=\"expandAnimationState\"\n     [id]=\"id\"\n     role=\"region\"\n     [attr.aria-labelledby]=\"ariaLabelledBy\">\n    <div class=\"card-body {{ customClass }}\">\n    \t<ng-content></ng-content>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('expandBody', [
                        state('collapsed', style({ height: '0px', visibility: 'hidden' })),
                        state('expanded', style({ height: '*', visibility: 'visible' })),
                        transition('expanded <=> collapsed', animate('500ms ease')),
                    ]),
                ]
            },] }
];
SBItemBodyComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Router, decorators: [{ type: Optional }] }
];
SBItemBodyComponent.propDecorators = {
    customClass: [{ type: Input }],
    animationStateChange: [{ type: Output }],
    routerLinks: [{ type: ContentChildren, args: [RouterLinkWithHref, { descendants: true },] }],
    bodyEl: [{ type: ViewChild, args: ['body', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ItaXRlbS5ib2R5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctdWlraXQtcHJvLXN0YW5kYXJkL3NyYy9saWIvcHJvL2FjY29yZGlvbi9jb21wb25lbnRzL3NiLWl0ZW0uYm9keS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixTQUFTLEVBQ1QsS0FBSyxFQUNMLGVBQWUsRUFDZixTQUFTLEVBQ1QsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBRWpCLFFBQVEsR0FFVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBb0IvQixNQUFNLE9BQU8sbUJBQW1CO0lBc0I5QixZQUNTLEVBQWMsRUFDYixNQUF5QixFQUNiLE1BQWM7UUFGM0IsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNiLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ2IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQXRCMUIseUJBQW9CLEdBQTJDLElBQUksWUFBWSxFQUV0RixDQUFDO1FBU0csT0FBRSxHQUFHLGdCQUFnQixDQUFDO1FBQ3RCLFdBQU0sR0FBRyxHQUFHLENBQUM7UUFFWixjQUFTLEdBQWtCLElBQUksT0FBTyxFQUFFLENBQUM7UUFFakQseUJBQW9CLEdBQUcsV0FBVyxDQUFDO1FBQ25DLG1CQUFjLEdBQUcsRUFBRSxD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QU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztxQkFDNUQsQ0FBQztpQkFDSDthQUNGOzs7WUFuQ0MsVUFBVTtZQVFWLGlCQUFpQjtZQU1VLE1BQU0sdUJBK0M5QixRQUFROzs7MEJBeEJWLEtBQUs7bUNBRUwsTUFBTTswQkFHTixlQUFlLFNBQUMsa0JBQWtCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO3FCQUl6RCxTQUFTLFNBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgVmlld0NoaWxkLFxuICBJbnB1dCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIE9wdGlvbmFsLFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc3RhdGUsIHN0eWxlLCB0cmlnZ2VyLCB0cmFuc2l0aW9uLCBhbmltYXRlIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBSb3V0ZXJMaW5rV2l0aEhyZWYsIFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBJQWNjb3JkaW9uQW5pbWF0aW9uU3RhdGUge1xuICBzdGF0ZTogc3RyaW5nO1xuICBhY2NvcmRpb25FbDogRWxlbWVudFJlZjtcbn1cblxuQENvbXBvbmVudCh7XG4gIGV4cG9ydEFzOiAnc2JJdGVtQm9keScsXG4gIHNlbGVjdG9yOiAnbWRiLWl0ZW0tYm9keSwgbWRiLWFjY29yZGlvbi1pdGVtLWJvZHknLFxuICB0ZW1wbGF0ZVVybDogJ3NiLWl0ZW0uYm9keS5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdleHBhbmRCb2R5JywgW1xuICAgICAgc3RhdGUoJ2NvbGxhcHNlZCcsIHN0eWxlKHsgaGVpZ2h0OiAnMHB4JywgdmlzaWJpbGl0eTogJ2hpZGRlbicgfSkpLFxuICAgICAgc3RhdGUoJ2V4cGFuZGVkJywgc3R5bGUoeyBoZWlnaHQ6ICcqJywgdmlzaWJpbGl0eTogJ3Zpc2libGUnIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJ2V4cGFuZGVkIDw9PiBjb2xsYXBzZWQnLCBhbmltYXRlKCc1MDBtcyBlYXNlJykpLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBTQkl0ZW1Cb2R5Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZztcblxuICBAT3V0cHV0KCkgYW5pbWF0aW9uU3RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxJQWNjb3JkaW9uQW5pbWF0aW9uU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBJQWNjb3JkaW9uQW5pbWF0aW9uU3RhdGVcbiAgPigpO1xuICBAQ29udGVudENoaWxkcmVuKFJvdXRlckxpbmtXaXRoSHJlZiwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSByb3V0ZXJMaW5rczogUXVlcnlMaXN0PFxuICAgIFJvdXRlckxpbmtXaXRoSHJlZlxuICA+O1xuXG4gIEBWaWV3Q2hpbGQoJ2JvZHknLCB7IHN0YXRpYzogdHJ1ZSB9KSBib2R5RWw6IEVsZW1lbnRSZWY7XG5cbiAgcHVibGljIGF1dG9FeHBhbmQ6IGJvb2xlYW47XG4gIHB1YmxpYyBjb2xsYXBzZWQ6IGJvb2xlYW47XG4gIHB1YmxpYyBpZCA9IGBtZGItYWNjb3JkaW9uLWA7XG4gIHB1YmxpYyBoZWlnaHQgPSAnMCc7XG5cbiAgcHJpdmF0ZSBfZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIGV4cGFuZEFuaW1hdGlvblN0YXRlID0gJ2NvbGxhcHNlZCc7XG4gIGFyaWFMYWJlbGxlZEJ5ID0gJyc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkge31cblxuICB0b2dnbGUoY29sbGFwc2VkOiBib29sZWFuKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb2xsYXBzZWRcbiAgICAgICAgPyAodGhpcy5leHBhbmRBbmltYXRpb25TdGF0ZSA9ICdjb2xsYXBzZWQnKVxuICAgICAgICA6ICh0aGlzLmV4cGFuZEFuaW1hdGlvblN0YXRlID0gJ2V4cGFuZGVkJyk7XG5cbiAgICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgYW5pbWF0aW9uQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5hbmltYXRpb25TdGF0ZUNoYW5nZS5lbWl0KHtcbiAgICAgIHN0YXRlOiB0aGlzLmV4cGFuZEFuaW1hdGlvblN0YXRlLFxuICAgICAgYWNjb3JkaW9uRWw6IHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQsXG4gICAgfSk7XG4gIH1cblxuICBvcGVuU2lkZW5hdk9uQWN0aXZlTGluaygpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93KSB7XG4gICAgICBjb25zdCBwYXRoU3RyYXRlZ3lVcmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICBjb25zdCBoYXNoU3RyYXRlZ3lVcmwgPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICAgIGNvbnN0IGFjdGl2ZUxpbmsgPSB0aGlzLnJvdXRlckxpbmtzLmZpbmQoKGxpbms6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBsaW5rLmhyZWYuc3BsaXQoJz8nKVsxXTtcblxuICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGxpbmsuaHJlZi5zcGxpdCgnPycpWzBdID09PSBwYXRoU3RyYXRlZ3lVcmwgfHxcbiAgICAgICAgICAgIGxpbmsuaHJlZi5zcGxpdCgnPycpWzBdID09PSBoYXNoU3RyYXRlZ3lVcmxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBsaW5rLmhyZWYgPT09IHBhdGhTdHJhdGVneVVybCB8fCBsaW5rLmhyZWYgPT09IGhhc2hTdHJhdGVneVVybDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjb25zdCBzYkl0ZW0gPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgIGlmIChhY3RpdmVMaW5rKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZXhwYW5kQW5pbWF0aW9uU3RhdGUgPSAnZXhwYW5kZWQnO1xuICAgICAgICAgIGlmIChzYkl0ZW0pIHtcbiAgICAgICAgICAgIHNiSXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHNiSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1jb2xsYXBzZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0sIDEwKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5leHBhbmRBbmltYXRpb25TdGF0ZSAhPT0gJ2NvbGxhcHNlZCcgJiYgYWN0aXZlTGluaykge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmV4cGFuZEFuaW1hdGlvblN0YXRlID0gJ2NvbGxhcHNlZCc7XG4gICAgICAgICAgaWYgKHNiSXRlbSkge1xuICAgICAgICAgICAgc2JJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgc2JJdGVtLmNsYXNzTGlzdC5hZGQoJ2lzLWNvbGxhcHNlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSwgMTApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY29sbGFwc2VkXG4gICAgICAgID8gKHRoaXMuZXhwYW5kQW5pbWF0aW9uU3RhdGUgPSAnY29sbGFwc2VkJylcbiAgICAgICAgOiAodGhpcy5leHBhbmRBbmltYXRpb25TdGF0ZSA9ICdleHBhbmRlZCcpO1xuXG4gICAgICBpZiAodGhpcy5yb3V0ZXIgJiYgdGhpcy5hdXRvRXhwYW5kKSB7XG4gICAgICAgIHRoaXMucm91dGVyLmV2ZW50c1xuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKSxcbiAgICAgICAgICAgIGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vcGVuU2lkZW5hdk9uQWN0aXZlTGluaygpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIDApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kkLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==