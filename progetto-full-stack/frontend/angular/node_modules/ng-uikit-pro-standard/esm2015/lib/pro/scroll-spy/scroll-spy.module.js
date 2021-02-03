import { NgModule } from '@angular/core';
import { ScrollSpyDirective } from './scroll-spy.directive';
import { ScrollSpyLinkDirective } from './scroll-spy-link.directive';
import { ScrollSpyWindowDirective } from './scroll-spy-window.directive';
import { ScrollSpyElementDirective } from './scroll-spy-element.directive';
import { ScrollSpyService } from './scroll-spy.service';
export class ScrollSpyModule {
}
ScrollSpyModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXNweS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy11aWtpdC1wcm8tc3RhbmRhcmQvc3JjL2xpYi9wcm8vc2Nyb2xsLXNweS9zY3JvbGwtc3B5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBa0J4RCxNQUFNLE9BQU8sZUFBZTs7O1lBZjNCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osa0JBQWtCO29CQUNsQixzQkFBc0I7b0JBQ3RCLHdCQUF3QjtvQkFDeEIseUJBQXlCO2lCQUMxQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asa0JBQWtCO29CQUNsQixzQkFBc0I7b0JBQ3RCLHdCQUF3QjtvQkFDeEIseUJBQXlCO2lCQUMxQjtnQkFDRCxTQUFTLEVBQUUsQ0FBRSxnQkFBZ0IsQ0FBRTthQUNoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNjcm9sbFNweURpcmVjdGl2ZSB9IGZyb20gJy4vc2Nyb2xsLXNweS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2Nyb2xsU3B5TGlua0RpcmVjdGl2ZSB9IGZyb20gJy4vc2Nyb2xsLXNweS1saW5rLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY3JvbGxTcHlXaW5kb3dEaXJlY3RpdmUgfSBmcm9tICcuL3Njcm9sbC1zcHktd2luZG93LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY3JvbGxTcHlFbGVtZW50RGlyZWN0aXZlIH0gZnJvbSAnLi9zY3JvbGwtc3B5LWVsZW1lbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjcm9sbFNweVNlcnZpY2UgfSBmcm9tICcuL3Njcm9sbC1zcHkuc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU2Nyb2xsU3B5RGlyZWN0aXZlLFxuICAgIFNjcm9sbFNweUxpbmtEaXJlY3RpdmUsXG4gICAgU2Nyb2xsU3B5V2luZG93RGlyZWN0aXZlLFxuICAgIFNjcm9sbFNweUVsZW1lbnREaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFNjcm9sbFNweURpcmVjdGl2ZSxcbiAgICBTY3JvbGxTcHlMaW5rRGlyZWN0aXZlLFxuICAgIFNjcm9sbFNweVdpbmRvd0RpcmVjdGl2ZSxcbiAgICBTY3JvbGxTcHlFbGVtZW50RGlyZWN0aXZlXG4gIF0sXG4gIHByb3ZpZGVyczogWyBTY3JvbGxTcHlTZXJ2aWNlIF1cbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsU3B5TW9kdWxlIHsgfVxuIl19