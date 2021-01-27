import { Directive, Input, Output, EventEmitter, Inject, Optional, HostListener, } from '@angular/core';
import { Router, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { PageScrollService } from './mdb-page-scroll.service';
import { PageScrollInstance } from './mdb-page-scroll.instance';
import { PageScrollUtilService as Util } from './mdb-page-scroll-util.service';
export class PageScrollDirective {
    constructor(pageScrollService, router, document) {
        this.pageScrollService = pageScrollService;
        this.router = router;
        this.pageScrollHorizontal = null;
        this.pageScrollOffset = null;
        this.pageScrollDuration = null;
        this.pageScrollSpeed = null;
        this.pageScrollEasing = null;
        this.pageScrollAdjustHash = false;
        this.pageScroll = null;
        this.pageScrollFinish = new EventEmitter();
        this.document = document;
    }
    ngOnChanges() {
        // Some inputs changed, reset the pageScrollInstance
        this.pageScrollInstance = undefined;
    }
    ngOnDestroy() {
        if (this.pageScrollInstance) {
            this.pageScrollService.stop(this.pageScrollInstance);
        }
        return undefined;
    }
    generatePageScrollInstance() {
        if (Util.isUndefinedOrNull(this.pageScrollInstance)) {
            this.pageScrollInstance = PageScrollInstance.newInstance({
                document: this.document,
                scrollTarget: this.href,
                scrollingViews: null,
                namespace: this.pageScroll,
                verticalScrolling: !this.pageScrollHorizontal,
                pageScrollOffset: this.pageScrollOffset,
                pageScrollInterruptible: this.pageScrollInterruptible,
                pageScrollEasingLogic: this.pageScrollEasing,
                pageScrollDuration: this.pageScrollDuration,
                pageScrollSpeed: this.pageScrollSpeed,
                pageScrollFinishListener: this.pageScrollFinish,
            });
        }
        return this.pageScrollInstance;
    }
    pushRouterState() {
        if (this.pageScrollAdjustHash &&
            typeof this.pageScrollInstance.scrollTarget === 'string' &&
            this.pageScrollInstance.scrollTarget.substr(0, 1) === '#') {
            // "Navigate" to the current route again and this time set the fragment/hash
            this.router.navigate([], {
                fragment: this.pageScrollInstance.scrollTarget.substr(1),
                queryParamsHandling: 'preserve',
            });
        }
    }
    scroll() {
        const pageScrollInstance = this.generatePageScrollInstance();
        this.pushRouterState();
        this.pageScrollService.start(pageScrollInstance);
    }
    handleClick() {
        if (this.routerLink && this.router !== null && this.router !== undefined) {
            let urlTree;
            if (typeof this.routerLink === 'string') {
                urlTree = this.router.parseUrl(this.routerLink);
            }
            else {
                urlTree = this.router.createUrlTree(this.routerLink);
            }
            if (!this.router.isActive(urlTree, true)) {
                // We need to navigate their first.
                // Navigation is handled by the routerLink directive
                // so we only need to listen for route change
                const subscription = this.router.events.subscribe(routerEvent => {
                    if (routerEvent instanceof NavigationEnd) {
                        subscription.unsubscribe();
                        this.scroll();
                    }
                    else if (routerEvent instanceof NavigationError ||
                        routerEvent instanceof NavigationCancel) {
                        subscription.unsubscribe();
                    }
                });
                return false; // to preventDefault()
            }
        }
        this.scroll();
        return false; // to preventDefault()
    }
}
PageScrollDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mdbPageScroll]',
            },] }
];
PageScrollDirective.ctorParameters = () => [
    { type: PageScrollService },
    { type: Router, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
PageScrollDirective.propDecorators = {
    routerLink: [{ type: Input }],
    href: [{ type: Input }],
    pageScrollHorizontal: [{ type: Input }],
    pageScrollOffset: [{ type: Input }],
    pageScrollDuration: [{ type: Input }],
    pageScrollSpeed: [{ type: Input }],
    pageScrollEasing: [{ type: Input }],
    pageScrollInterruptible: [{ type: Input }],
    pageScrollAdjustHash: [{ type: Input }],
    pageScroll: [{ type: Input }],
    pageScrollFinish: [{ type: Output }],
    handleClick: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXBhZ2Utc2Nyb2xsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXVpa2l0LXByby1zdGFuZGFyZC9zcmMvbGliL3Byby9zbW9vdGhzY3JvbGwvbWRiLXBhZ2Utc2Nyb2xsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUVaLE1BQU0sRUFDTixRQUFRLEVBRVIsWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBVyxNQUFNLGlCQUFpQixDQUFDO0FBQ3BHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUkzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUscUJBQXFCLElBQUksSUFBSSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFNL0UsTUFBTSxPQUFPLG1CQUFtQjtJQWlCOUIsWUFDVSxpQkFBb0MsRUFDeEIsTUFBYyxFQUNoQixRQUFhO1FBRnZCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQWhCcEIseUJBQW9CLEdBQWtCLElBQUksQ0FBQztRQUMzQyxxQkFBZ0IsR0FBaUIsSUFBSSxDQUFDO1FBQ3RDLHVCQUFrQixHQUFpQixJQUFJLENBQUM7UUFDeEMsb0JBQWUsR0FBaUIsSUFBSSxDQUFDO1FBQ3JDLHFCQUFnQixHQUFzQixJQUFJLENBQUM7UUFFM0MseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLGVBQVUsR0FBaUIsSUFBSSxDQUFDO1FBRXRDLHFC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Z0JBQzdDLE1BQU0sWUFBWSxHQUErQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQzNFLFdBQVcsQ0FBQyxFQUFFO29CQUNaLElBQUksV0FBVyxZQUFZLGFBQWEsRUFBRTt3QkFDeEMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ2Y7eUJBQU0sSUFDTCxXQUFXLFlBQVksZUFBZTt3QkFDdEMsV0FBVyxZQUFZLGdCQUFnQixFQUN2Qzt3QkFDQSxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBQzVCO2dCQUNILENBQUMsQ0FDRixDQUFDO2dCQUNGLE9BQU8sS0FBSyxDQUFDLENBQUMsc0JBQXNCO2FBQ3JDO1NBQ0Y7UUFDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxPQUFPLEtBQUssQ0FBQyxDQUFDLHNCQUFzQjtJQUN0QyxDQUFDOzs7WUE5R0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7YUFDNUI7OztZQVBRLGlCQUFpQjtZQUxqQixNQUFNLHVCQWdDVixRQUFROzRDQUNSLE1BQU0sU0FBQyxRQUFROzs7eUJBbkJqQixLQUFLO21CQUNMLEtBQUs7bUNBQ0wsS0FBSzsrQkFDTCxLQUFLO2lDQUNMLEtBQUs7OEJBQ0wsS0FBSzsrQkFDTCxLQUFLO3NDQUNMLEtBQUs7bUNBQ0wsS0FBSzt5QkFDTCxLQUFLOytCQUVMLE1BQU07MEJBZ0VOLFlBQVksU0FBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uRGVzdHJveSxcbiAgSW5qZWN0LFxuICBPcHRpb25hbCxcbiAgT25DaGFuZ2VzLFxuICBIb3N0TGlzdGVuZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kLCBOYXZpZ2F0aW9uRXJyb3IsIE5hdmlnYXRpb25DYW5jZWwsIFVybFRyZWUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUGFnZVNjcm9sbFNlcnZpY2UgfSBmcm9tICcuL21kYi1wYWdlLXNjcm9sbC5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2VTY3JvbGxJbnN0YW5jZSB9IGZyb20gJy4vbWRiLXBhZ2Utc2Nyb2xsLmluc3RhbmNlJztcbmltcG9ydCB7IFBhZ2VTY3JvbGxVdGlsU2VydmljZSBhcyBVdGlsIH0gZnJvbSAnLi9tZGItcGFnZS1zY3JvbGwtdXRpbC5zZXJ2aWNlJztcbmltcG9ydCB7IEVhc2luZ0xvZ2ljIH0gZnJvbSAnLi9tZGItcGFnZS1zY3JvbGwuY29uZmlnJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21kYlBhZ2VTY3JvbGxdJyxcbn0pXG5leHBvcnQgY2xhc3MgUGFnZVNjcm9sbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIHJvdXRlckxpbms6IGFueTtcbiAgQElucHV0KCkgcHVibGljIGhyZWY6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHBhZ2VTY3JvbGxIb3Jpem9udGFsOiBib29sZWFuIHwgYW55ID0gbnVsbDtcbiAgQElucHV0KCkgcHVibGljIHBhZ2VTY3JvbGxPZmZzZXQ6IG51bWJlciB8IGFueSA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBwYWdlU2Nyb2xsRHVyYXRpb246IG51bWJlciB8IGFueSA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBwYWdlU2Nyb2xsU3BlZWQ6IG51bWJlciB8IGFueSA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBwYWdlU2Nyb2xsRWFzaW5nOiBFYXNpbmdMb2dpYyB8IGFueSA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBwYWdlU2Nyb2xsSW50ZXJydXB0aWJsZTogYm9vbGVhbjtcbiAgQElucHV0KCkgcHVibGljIHBhZ2VTY3JvbGxBZGp1c3RIYXNoID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBwYWdlU2Nyb2xsOiBzdHJpbmcgfCBhbnkgPSBudWxsO1xuXG4gIEBPdXRwdXQoKSBwYWdlU2Nyb2xsRmluaXNoOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgcHJpdmF0ZSBwYWdlU2Nyb2xsSW5zdGFuY2U6IFBhZ2VTY3JvbGxJbnN0YW5jZSB8IGFueTtcbiAgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYWdlU2Nyb2xsU2VydmljZTogUGFnZVNjcm9sbFNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogYW55XG4gICkge1xuICAgIHRoaXMuZG9jdW1lbnQgPSA8RG9jdW1lbnQ+ZG9jdW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICAvLyBTb21lIGlucHV0cyBjaGFuZ2VkLCByZXNldCB0aGUgcGFnZVNjcm9sbEluc3RhbmNlXG4gICAgdGhpcy5wYWdlU2Nyb2xsSW5zdGFuY2UgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wYWdlU2Nyb2xsSW5zdGFuY2UpIHtcbiAgICAgIHRoaXMucGFnZVNjcm9sbFNlcnZpY2Uuc3RvcCh0aGlzLnBhZ2VTY3JvbGxJbnN0YW5jZSk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlUGFnZVNjcm9sbEluc3RhbmNlKCk6IFBhZ2VTY3JvbGxJbnN0YW5jZSB8IGFueSB7XG4gICAgaWYgKFV0aWwuaXNVbmRlZmluZWRPck51bGwodGhpcy5wYWdlU2Nyb2xsSW5zdGFuY2UpKSB7XG4gICAgICB0aGlzLnBhZ2VTY3JvbGxJbnN0YW5jZSA9IFBhZ2VTY3JvbGxJbnN0YW5jZS5uZXdJbnN0YW5jZSh7XG4gICAgICAgIGRvY3VtZW50OiB0aGlzLmRvY3VtZW50LFxuICAgICAgICBzY3JvbGxUYXJnZXQ6IHRoaXMuaHJlZixcbiAgICAgICAgc2Nyb2xsaW5nVmlld3M6IG51bGwsXG4gICAgICAgIG5hbWVzcGFjZTogdGhpcy5wYWdlU2Nyb2xsLFxuICAgICAgICB2ZXJ0aWNhbFNjcm9sbGluZzogIXRoaXMucGFnZVNjcm9sbEhvcml6b250YWwsXG4gICAgICAgIHBhZ2VTY3JvbGxPZmZzZXQ6IHRoaXMucGFnZVNjcm9sbE9mZnNldCxcbiAgICAgICAgcGFnZVNjcm9sbEludGVycnVwdGlibGU6IHRoaXMucGFnZVNjcm9sbEludGVycnVwdGlibGUsXG4gICAgICAgIHBhZ2VTY3JvbGxFYXNpbmdMb2dpYzogdGhpcy5wYWdlU2Nyb2xsRWFzaW5nLFxuICAgICAgICBwYWdlU2Nyb2xsRHVyYXRpb246IHRoaXMucGFnZVNjcm9sbER1cmF0aW9uLFxuICAgICAgICBwYWdlU2Nyb2xsU3BlZWQ6IHRoaXMucGFnZVNjcm9sbFNwZWVkLFxuICAgICAgICBwYWdlU2Nyb2xsRmluaXNoTGlzdGVuZXI6IHRoaXMucGFnZVNjcm9sbEZpbmlzaCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wYWdlU2Nyb2xsSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIHB1c2hSb3V0ZXJTdGF0ZSgpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnBhZ2VTY3JvbGxBZGp1c3RIYXNoICYmXG4gICAgICB0eXBlb2YgdGhpcy5wYWdlU2Nyb2xsSW5zdGFuY2Uuc2Nyb2xsVGFyZ2V0ID09PSAnc3RyaW5nJyAmJlxuICAgICAgdGhpcy5wYWdlU2Nyb2xsSW5zdGFuY2Uuc2Nyb2xsVGFyZ2V0LnN1YnN0cigwLCAxKSA9PT0gJyMnXG4gICAgKSB7XG4gICAgICAvLyBcIk5hdmlnYXRlXCIgdG8gdGhlIGN1cnJlbnQgcm91dGUgYWdhaW4gYW5kIHRoaXMgdGltZSBzZXQgdGhlIGZyYWdtZW50L2hhc2hcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtdLCB7XG4gICAgICAgIGZyYWdtZW50OiA8c3RyaW5nPnRoaXMucGFnZVNjcm9sbEluc3RhbmNlLnNjcm9sbFRhcmdldC5zdWJzdHIoMSksXG4gICAgICAgIHF1ZXJ5UGFyYW1zSGFuZGxpbmc6ICdwcmVzZXJ2ZScsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbCgpOiB2b2lkIHtcbiAgICBjb25zdCBwYWdlU2Nyb2xsSW5zdGFuY2UgPSB0aGlzLmdlbmVyYXRlUGFnZVNjcm9sbEluc3RhbmNlKCk7XG4gICAgdGhpcy5wdXNoUm91dGVyU3RhdGUoKTtcbiAgICB0aGlzLnBhZ2VTY3JvbGxTZXJ2aWNlLnN0YXJ0KHBhZ2VTY3JvbGxJbnN0YW5jZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIHB1YmxpYyBoYW5kbGVDbGljaygpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5yb3V0ZXJMaW5rICYmIHRoaXMucm91dGVyICE9PSBudWxsICYmIHRoaXMucm91dGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCB1cmxUcmVlOiBVcmxUcmVlO1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnJvdXRlckxpbmsgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHVybFRyZWUgPSB0aGlzLnJvdXRlci5wYXJzZVVybCh0aGlzLnJvdXRlckxpbmspO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXJsVHJlZSA9IHRoaXMucm91dGVyLmNyZWF0ZVVybFRyZWUodGhpcy5yb3V0ZXJMaW5rKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5yb3V0ZXIuaXNBY3RpdmUodXJsVHJlZSwgdHJ1ZSkpIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBuYXZpZ2F0ZSB0aGVpciBmaXJzdC5cbiAgICAgICAgLy8gTmF2aWdhdGlvbiBpcyBoYW5kbGVkIGJ5IHRoZSByb3V0ZXJMaW5rIGRpcmVjdGl2ZVxuICAgICAgICAvLyBzbyB3ZSBvbmx5IG5lZWQgdG8gbGlzdGVuIGZvciByb3V0ZSBjaGFuZ2VcbiAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSA8U3Vic2NyaXB0aW9uPnRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoXG4gICAgICAgICAgcm91dGVyRXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKHJvdXRlckV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgdGhpcy5zY3JvbGwoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgIHJvdXRlckV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yIHx8XG4gICAgICAgICAgICAgIHJvdXRlckV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkNhbmNlbFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0byBwcmV2ZW50RGVmYXVsdCgpXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2Nyb2xsKCk7XG4gICAgcmV0dXJuIGZhbHNlOyAvLyB0byBwcmV2ZW50RGVmYXVsdCgpXG4gIH1cbn1cbiJdfQ==