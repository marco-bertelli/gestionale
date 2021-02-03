import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgTranscludeDirective } from './transclude.directive';
import { TabHeadingDirective } from './tab-heading.directive';
import { TabDirective } from './tab.directive';
import { TabsetComponent } from './tabset.component';
import { TabsetConfig } from './tabset.config';
var TabsModule = /** @class */ (function () {
    function TabsModule() {
    }
    TabsModule_1 = TabsModule;
    TabsModule.forRoot = function () {
        return {
            ngModule: TabsModule_1,
            providers: [TabsetConfig],
        };
    };
    var TabsModule_1;
    TabsModule = TabsModule_1 = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [NgTranscludeDirective, TabDirective, TabsetComponent, TabHeadingDirective],
            exports: [TabDirective, TabsetComponent, TabHeadingDirective, NgTranscludeDirective],
        })
    ], TabsModule);
    return TabsModule;
}());
export { TabsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vdGFicy1waWxscy90YWJzZXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFPL0M7SUFBQTtJQU9BLENBQUM7bUJBUFksVUFBVTtJQUNQLGtCQUFPLEdBQXJCO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFVO1lBQ3BCLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQztTQUMxQixDQUFDO0lBQ0osQ0FBQzs7SUFOVSxVQUFVO1FBTHRCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLG1CQUFtQixDQUFDO1lBQ3pGLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsbUJBQW1CLEVBQUUscUJBQXFCLENBQUM7U0FDckYsQ0FBQztPQUNXLFVBQVUsQ0FPdEI7SUFBRCxpQkFBQztDQUFBLEFBUEQsSUFPQztTQVBZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmdUcmFuc2NsdWRlRGlyZWN0aXZlIH0gZnJvbSAnLi90cmFuc2NsdWRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUYWJIZWFkaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi90YWItaGVhZGluZy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGFiRGlyZWN0aXZlIH0gZnJvbSAnLi90YWIuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRhYnNldENvbXBvbmVudCB9IGZyb20gJy4vdGFic2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYWJzZXRDb25maWcgfSBmcm9tICcuL3RhYnNldC5jb25maWcnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTmdUcmFuc2NsdWRlRGlyZWN0aXZlLCBUYWJEaXJlY3RpdmUsIFRhYnNldENvbXBvbmVudCwgVGFiSGVhZGluZ0RpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtUYWJEaXJlY3RpdmUsIFRhYnNldENvbXBvbmVudCwgVGFiSGVhZGluZ0RpcmVjdGl2ZSwgTmdUcmFuc2NsdWRlRGlyZWN0aXZlXSxcbn0pXG5leHBvcnQgY2xhc3MgVGFic01vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFRhYnNNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFRhYnNNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtUYWJzZXRDb25maWddLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==