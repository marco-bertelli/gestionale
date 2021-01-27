import { __decorate, __metadata, __param } from "tslib";
import { Component, ElementRef, ViewChild, Input, ContentChildren, QueryList, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, AfterContentInit, Optional, OnDestroy, } from '@angular/core';
import { state, style, trigger, transition, animate } from '@angular/animations';
import { RouterLinkWithHref, Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
var SBItemBodyComponent = /** @class */ (function () {
    function SBItemBodyComponent(el, _cdRef, router) {
        this.el = el;
        this._cdRef = _cdRef;
        this.router = router;
        this.animationStateChange = new EventEmitter();
        this.id = "mdb-accordion-";
        this.height = '0';
        this._destroy$ = new Subject();
        this.expandAnimationState = 'collapsed';
        this.ariaLabelledBy = '';
    }
    SBItemBodyComponent.prototype.toggle = function (collapsed) {
        var _this = this;
        setTimeout(function () {
            collapsed
                ? (_this.expandAnimationState = 'collapsed')
                : (_this.expandAnimationState = 'expanded');
            _this._cdRef.markForCheck();
        }, 0);
    };
    SBItemBodyComponent.prototype.animationCallback = function () {
        this.animationStateChange.emit({
            state: this.expandAnimationState,
            accordionEl: this.el.nativeElement.parentElement.parentElement,
        });
    };
    SBItemBodyComponent.prototype.openSidenavOnActiveLink = function () {
        var _this = this;
        if (typeof window !== 'undefined' && window) {
            var pathStrategyUrl_1 = window.location.pathname;
            var hashStrategyUrl_1 = window.location.hash;
            var activeLink = this.routerLinks.find(function (link) {
                var params = link.href.split('?')[1];
                if (params) {
                    return (link.href.split('?')[0] === pathStrategyUrl_1 ||
                        link.href.split('?')[0] === hashStrategyUrl_1);
                }
                else {
                    return link.href === pathStrategyUrl_1 || link.href === hashStrategyUrl_1;
                }
            });
            var sbItem_1 = this.el.nativeElement.parentNode;
            if (activeLink) {
                setTimeout(function () {
                    _this.expandAnimationState = 'expanded';
                    if (sbItem_1) {
                        sbItem_1.classList.add('active');
                        sbItem_1.classList.remove('is-collapsed');
                    }
                    _this._cdRef.markForCheck();
                }, 10);
            }
            else if (this.expandAnimationState !== 'collapsed' && activeLink) {
                setTimeout(function () {
                    _this.expandAnimationState = 'collapsed';
                    if (sbItem_1) {
                        sbItem_1.classList.remove('active');
                        sbItem_1.classList.add('is-collapsed');
                    }
                    _this._cdRef.markForCheck();
                }, 10);
            }
        }
    };
    SBItemBodyComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.collapsed
                ? (_this.expandAnimationState = 'collapsed')
                : (_this.expandAnimationState = 'expanded');
            if (_this.router && _this.autoExpand) {
                _this.router.events
                    .pipe(takeUntil(_this._destroy$), filter(function (event) { return event instanceof NavigationEnd; }))
                    .subscribe(function () {
                    _this.openSidenavOnActiveLink();
                });
            }
        }, 0);
    };
    SBItemBodyComponent.prototype.ngOnDestroy = function () {
        this._destroy$.next();
        this._destroy$.unsubscribe();
    };
    SBItemBodyComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Router, decorators: [{ type: Optional }] }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SBItemBodyComponent.prototype, "customClass", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SBItemBodyComponent.prototype, "animationStateChange", void 0);
    __decorate([
        ContentChildren(RouterLinkWithHref),
        __metadata("design:type", QueryList)
    ], SBItemBodyComponent.prototype, "routerLinks", void 0);
    __decorate([
        ViewChild('body', { static: true }),
        __metadata("design:type", ElementRef)
    ], SBItemBodyComponent.prototype, "bodyEl", void 0);
    SBItemBodyComponent = __decorate([
        Component({
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
        }),
        __param(2, Optional()),
        __metadata("design:paramtypes", [ElementRef,
            ChangeDetectorRef,
            Router])
    ], SBItemBodyComponent);
    return SBItemBodyComponent;
}());
export { SBItemBodyComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ItaXRlbS5ib2R5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9hY2NvcmRpb24vY29tcG9uZW50cy9zYi1pdGVtLmJvZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFNBQVMsRUFDVCxLQUFLLEVBQ0wsZUFBZSxFQUNmLFNBQVMsRUFDVCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLFFBQVEsRUFDUixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQW9CL0I7SUFvQkUsNkJBQ1MsRUFBYyxFQUNiLE1BQXlCLEVBQ2IsTUFBYztRQUYzQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2IsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDYixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBcEIxQix5QkFBb0IsR0FBMkMsSUFBSSxZQUFZLEVBRXRGLENBQUM7UUFPRyxPQUFFLEdBQUcsZ0JBQWdCLENBQUM7UUFDdEIsV0FBTSxHQUFHLEdBQUcsQ0FBQztRQUVaLGNBQVMsR0FBa0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUVqRCx5QkFBb0IsR0FBRyxXQUFXLENBQUM7UUFDbkMsbUJBQWMsR0FBRyxFQUFFLENBQUM7SUFNakIsQ0FBQztJQUVKLG9D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WUFDL0MsVUFBVSxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxZQUFZLEVBQUU7b0JBQ3BCLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDbEUsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO29CQUNoRSxVQUFVLENBQUMsd0JBQXdCLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUM1RCxDQUFDO2FBQ0g7U0FDRixDQUFDO1FBd0JHLFdBQUEsUUFBUSxFQUFFLENBQUE7eUNBRkEsVUFBVTtZQUNMLGlCQUFpQjtZQUNMLE1BQU07T0F2QnpCLG1CQUFtQixDQXlHL0I7SUFBRCwwQkFBQztDQUFBLEFBekdELElBeUdDO1NBekdZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgVmlld0NoaWxkLFxuICBJbnB1dCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIE9wdGlvbmFsLFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc3RhdGUsIHN0eWxlLCB0cmlnZ2VyLCB0cmFuc2l0aW9uLCBhbmltYXRlIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBSb3V0ZXJMaW5rV2l0aEhyZWYsIFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBJQWNjb3JkaW9uQW5pbWF0aW9uU3RhdGUge1xuICBzdGF0ZTogc3RyaW5nO1xuICBhY2NvcmRpb25FbDogRWxlbWVudFJlZjtcbn1cblxuQENvbXBvbmVudCh7XG4gIGV4cG9ydEFzOiAnc2JJdGVtQm9keScsXG4gIHNlbGVjdG9yOiAnbWRiLWl0ZW0tYm9keSwgbWRiLWFjY29yZGlvbi1pdGVtLWJvZHknLFxuICB0ZW1wbGF0ZVVybDogJ3NiLWl0ZW0uYm9keS5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdleHBhbmRCb2R5JywgW1xuICAgICAgc3RhdGUoJ2NvbGxhcHNlZCcsIHN0eWxlKHsgaGVpZ2h0OiAnMHB4JywgdmlzaWJpbGl0eTogJ2hpZGRlbicgfSkpLFxuICAgICAgc3RhdGUoJ2V4cGFuZGVkJywgc3R5bGUoeyBoZWlnaHQ6ICcqJywgdmlzaWJpbGl0eTogJ3Zpc2libGUnIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJ2V4cGFuZGVkIDw9PiBjb2xsYXBzZWQnLCBhbmltYXRlKCc1MDBtcyBlYXNlJykpLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBTQkl0ZW1Cb2R5Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3M6IHN0cmluZztcblxuICBAT3V0cHV0KCkgYW5pbWF0aW9uU3RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxJQWNjb3JkaW9uQW5pbWF0aW9uU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBJQWNjb3JkaW9uQW5pbWF0aW9uU3RhdGVcbiAgPigpO1xuICBAQ29udGVudENoaWxkcmVuKFJvdXRlckxpbmtXaXRoSHJlZikgcm91dGVyTGlua3M6IFF1ZXJ5TGlzdDxSb3V0ZXJMaW5rV2l0aEhyZWY+O1xuXG4gIEBWaWV3Q2hpbGQoJ2JvZHknLCB7IHN0YXRpYzogdHJ1ZSB9KSBib2R5RWw6IEVsZW1lbnRSZWY7XG5cbiAgcHVibGljIGF1dG9FeHBhbmQ6IGJvb2xlYW47XG4gIHB1YmxpYyBjb2xsYXBzZWQ6IGJvb2xlYW47XG4gIHB1YmxpYyBpZCA9IGBtZGItYWNjb3JkaW9uLWA7XG4gIHB1YmxpYyBoZWlnaHQgPSAnMCc7XG5cbiAgcHJpdmF0ZSBfZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIGV4cGFuZEFuaW1hdGlvblN0YXRlID0gJ2NvbGxhcHNlZCc7XG4gIGFyaWFMYWJlbGxlZEJ5ID0gJyc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlcjogUm91dGVyXG4gICkge31cblxuICB0b2dnbGUoY29sbGFwc2VkOiBib29sZWFuKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb2xsYXBzZWRcbiAgICAgICAgPyAodGhpcy5leHBhbmRBbmltYXRpb25TdGF0ZSA9ICdjb2xsYXBzZWQnKVxuICAgICAgICA6ICh0aGlzLmV4cGFuZEFuaW1hdGlvblN0YXRlID0gJ2V4cGFuZGVkJyk7XG5cbiAgICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgYW5pbWF0aW9uQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5hbmltYXRpb25TdGF0ZUNoYW5nZS5lbWl0KHtcbiAgICAgIHN0YXRlOiB0aGlzLmV4cGFuZEFuaW1hdGlvblN0YXRlLFxuICAgICAgYWNjb3JkaW9uRWw6IHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQsXG4gICAgfSk7XG4gIH1cblxuICBvcGVuU2lkZW5hdk9uQWN0aXZlTGluaygpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93KSB7XG4gICAgICBjb25zdCBwYXRoU3RyYXRlZ3lVcmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICBjb25zdCBoYXNoU3RyYXRlZ3lVcmwgPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICAgIGNvbnN0IGFjdGl2ZUxpbmsgPSB0aGlzLnJvdXRlckxpbmtzLmZpbmQoKGxpbms6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBsaW5rLmhyZWYuc3BsaXQoJz8nKVsxXTtcblxuICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGxpbmsuaHJlZi5zcGxpdCgnPycpWzBdID09PSBwYXRoU3RyYXRlZ3lVcmwgfHxcbiAgICAgICAgICAgIGxpbmsuaHJlZi5zcGxpdCgnPycpWzBdID09PSBoYXNoU3RyYXRlZ3lVcmxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBsaW5rLmhyZWYgPT09IHBhdGhTdHJhdGVneVVybCB8fCBsaW5rLmhyZWYgPT09IGhhc2hTdHJhdGVneVVybDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjb25zdCBzYkl0ZW0gPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgIGlmIChhY3RpdmVMaW5rKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZXhwYW5kQW5pbWF0aW9uU3RhdGUgPSAnZXhwYW5kZWQnO1xuICAgICAgICAgIGlmIChzYkl0ZW0pIHtcbiAgICAgICAgICAgIHNiSXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHNiSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1jb2xsYXBzZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0sIDEwKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5leHBhbmRBbmltYXRpb25TdGF0ZSAhPT0gJ2NvbGxhcHNlZCcgJiYgYWN0aXZlTGluaykge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmV4cGFuZEFuaW1hdGlvblN0YXRlID0gJ2NvbGxhcHNlZCc7XG4gICAgICAgICAgaWYgKHNiSXRlbSkge1xuICAgICAgICAgICAgc2JJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgc2JJdGVtLmNsYXNzTGlzdC5hZGQoJ2lzLWNvbGxhcHNlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSwgMTApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY29sbGFwc2VkXG4gICAgICAgID8gKHRoaXMuZXhwYW5kQW5pbWF0aW9uU3RhdGUgPSAnY29sbGFwc2VkJylcbiAgICAgICAgOiAodGhpcy5leHBhbmRBbmltYXRpb25TdGF0ZSA9ICdleHBhbmRlZCcpO1xuXG4gICAgICBpZiAodGhpcy5yb3V0ZXIgJiYgdGhpcy5hdXRvRXhwYW5kKSB7XG4gICAgICAgIHRoaXMucm91dGVyLmV2ZW50c1xuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKSxcbiAgICAgICAgICAgIGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vcGVuU2lkZW5hdk9uQWN0aXZlTGluaygpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIDApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kkLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==