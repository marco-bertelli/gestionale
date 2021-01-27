import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ScrollSpyDirective } from './scroll-spy.directive';
import { ScrollSpyLinkDirective } from './scroll-spy-link.directive';
import { ScrollSpyWindowDirective } from './scroll-spy-window.directive';
import { ScrollSpyElementDirective } from './scroll-spy-element.directive';
import { ScrollSpyService } from './scroll-spy.service';
var ScrollSpyModule = /** @class */ (function () {
    function ScrollSpyModule() {
    }
    ScrollSpyModule = __decorate([
        NgModule({
            declarations: [
                ScrollSpyDirective,
                ScrollSpyLinkDirective,
                ScrollSpyWindowDirective,
                ScrollSpyElementDirective
            ],
            exports: [
                ScrollSpyDirective,
                ScrollSpyLinkDirective,
                ScrollSpyWindowDirective,
                ScrollSpyElementDirective
            ],
            providers: [ScrollSpyService]
        })
    ], ScrollSpyModule);
    return ScrollSpyModule;
}());
export { ScrollSpyModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXNweS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL3Njcm9sbC1zcHkvc2Nyb2xsLXNweS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDckUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFrQnhEO0lBQUE7SUFBK0IsQ0FBQztJQUFuQixlQUFlO1FBZjNCLFFBQVEsQ0FBQztZQUNSLFlBQVksRUFBRTtnQkFDWixrQkFBa0I7Z0JBQ2xCLHNCQUFzQjtnQkFDdEIsd0JBQXdCO2dCQUN4Qix5QkFBeUI7YUFDMUI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1Asa0JBQWtCO2dCQUNsQixzQkFBc0I7Z0JBQ3RCLHdCQUF3QjtnQkFDeEIseUJBQXlCO2FBQzFCO1lBQ0QsU0FBUyxFQUFFLENBQUUsZ0JBQWdCLENBQUU7U0FDaEMsQ0FBQztPQUNXLGVBQWUsQ0FBSTtJQUFELHNCQUFDO0NBQUEsQUFBaEMsSUFBZ0M7U0FBbkIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNjcm9sbFNweURpcmVjdGl2ZSB9IGZyb20gJy4vc2Nyb2xsLXNweS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2Nyb2xsU3B5TGlua0RpcmVjdGl2ZSB9IGZyb20gJy4vc2Nyb2xsLXNweS1saW5rLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY3JvbGxTcHlXaW5kb3dEaXJlY3RpdmUgfSBmcm9tICcuL3Njcm9sbC1zcHktd2luZG93LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY3JvbGxTcHlFbGVtZW50RGlyZWN0aXZlIH0gZnJvbSAnLi9zY3JvbGwtc3B5LWVsZW1lbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjcm9sbFNweVNlcnZpY2UgfSBmcm9tICcuL3Njcm9sbC1zcHkuc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU2Nyb2xsU3B5RGlyZWN0aXZlLFxuICAgIFNjcm9sbFNweUxpbmtEaXJlY3RpdmUsXG4gICAgU2Nyb2xsU3B5V2luZG93RGlyZWN0aXZlLFxuICAgIFNjcm9sbFNweUVsZW1lbnREaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFNjcm9sbFNweURpcmVjdGl2ZSxcbiAgICBTY3JvbGxTcHlMaW5rRGlyZWN0aXZlLFxuICAgIFNjcm9sbFNweVdpbmRvd0RpcmVjdGl2ZSxcbiAgICBTY3JvbGxTcHlFbGVtZW50RGlyZWN0aXZlXG4gIF0sXG4gIHByb3ZpZGVyczogWyBTY3JvbGxTcHlTZXJ2aWNlIF1cbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsU3B5TW9kdWxlIHsgfVxuIl19