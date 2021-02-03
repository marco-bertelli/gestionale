/**
 * Created by sebastianfuss on 03.09.16.
 */
import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageScrollService } from './mdb-page-scroll.service';
import { PageScrollDirective } from './mdb-page-scroll.directive';
var SmoothscrollModule = /** @class */ (function () {
    function SmoothscrollModule() {
    }
    SmoothscrollModule_1 = SmoothscrollModule;
    SmoothscrollModule.forRoot = function () {
        return {
            ngModule: SmoothscrollModule_1,
            providers: [{ provide: PageScrollService, useClass: PageScrollService }],
        };
    };
    var SmoothscrollModule_1;
    SmoothscrollModule = SmoothscrollModule_1 = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [PageScrollDirective],
            exports: [PageScrollDirective],
        })
    ], SmoothscrollModule);
    return SmoothscrollModule;
}());
export { SmoothscrollModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXBhZ2Utc2Nyb2xsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vc21vb3Roc2Nyb2xsL21kYi1wYWdlLXNjcm9sbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7O0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBRTlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBT2xFO0lBQUE7SUFPQSxDQUFDOzJCQVBZLGtCQUFrQjtJQUN0QiwwQkFBTyxHQUFkO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxvQkFBa0I7WUFDNUIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLENBQUM7U0FDekUsQ0FBQztJQUNKLENBQUM7O0lBTlUsa0JBQWtCO1FBTDlCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztZQUNuQyxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztTQUMvQixDQUFDO09BQ1csa0JBQWtCLENBTzlCO0lBQUQseUJBQUM7Q0FBQSxBQVBELElBT0M7U0FQWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgc2ViYXN0aWFuZnVzcyBvbiAwMy4wOS4xNi5cbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGFnZVNjcm9sbFNlcnZpY2UgfSBmcm9tICcuL21kYi1wYWdlLXNjcm9sbC5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2VTY3JvbGxEaXJlY3RpdmUgfSBmcm9tICcuL21kYi1wYWdlLXNjcm9sbC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbUGFnZVNjcm9sbERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtQYWdlU2Nyb2xsRGlyZWN0aXZlXSxcbn0pXG5leHBvcnQgY2xhc3MgU21vb3Roc2Nyb2xsTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTbW9vdGhzY3JvbGxNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNtb290aHNjcm9sbE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogUGFnZVNjcm9sbFNlcnZpY2UsIHVzZUNsYXNzOiBQYWdlU2Nyb2xsU2VydmljZSB9XSxcbiAgICB9O1xuICB9XG59XG4iXX0=