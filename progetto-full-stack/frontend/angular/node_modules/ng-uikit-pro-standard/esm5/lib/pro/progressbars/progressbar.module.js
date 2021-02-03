import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarComponent } from './bar.component';
import { ProgressDirective } from './progress.directive';
import { ProgressbarComponent } from './progressbar.component';
import { ProgressbarConfigComponent } from './progressbar.config.component';
var ProgressbarModule = /** @class */ (function () {
    function ProgressbarModule() {
    }
    ProgressbarModule_1 = ProgressbarModule;
    ProgressbarModule.forRoot = function () {
        return { ngModule: ProgressbarModule_1, providers: [ProgressbarConfigComponent] };
    };
    var ProgressbarModule_1;
    ProgressbarModule = ProgressbarModule_1 = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [ProgressDirective, BarComponent, ProgressbarComponent],
            exports: [ProgressDirective, BarComponent, ProgressbarComponent],
        })
    ], ProgressbarModule);
    return ProgressbarModule;
}());
export { ProgressbarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9wcm9ncmVzc2JhcnMvcHJvZ3Jlc3NiYXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBTzVFO0lBQUE7SUFJQSxDQUFDOzBCQUpZLGlCQUFpQjtJQUNkLHlCQUFPLEdBQXJCO1FBQ0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxtQkFBaUIsRUFBRSxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLENBQUM7SUFDbEYsQ0FBQzs7SUFIVSxpQkFBaUI7UUFMN0IsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLFlBQVksRUFBRSxvQkFBb0IsQ0FBQztZQUNyRSxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsb0JBQW9CLENBQUM7U0FDakUsQ0FBQztPQUNXLGlCQUFpQixDQUk3QjtJQUFELHdCQUFDO0NBQUEsQUFKRCxJQUlDO1NBSlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEJhckNvbXBvbmVudCB9IGZyb20gJy4vYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9ncmVzc0RpcmVjdGl2ZSB9IGZyb20gJy4vcHJvZ3Jlc3MuZGlyZWN0aXZlJztcbmltcG9ydCB7IFByb2dyZXNzYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9ncmVzc2Jhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvZ3Jlc3NiYXJDb25maWdDb21wb25lbnQgfSBmcm9tICcuL3Byb2dyZXNzYmFyLmNvbmZpZy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbUHJvZ3Jlc3NEaXJlY3RpdmUsIEJhckNvbXBvbmVudCwgUHJvZ3Jlc3NiYXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHJvZ3Jlc3NEaXJlY3RpdmUsIEJhckNvbXBvbmVudCwgUHJvZ3Jlc3NiYXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc2Jhck1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFByb2dyZXNzYmFyTW9kdWxlPiB7XG4gICAgcmV0dXJuIHsgbmdNb2R1bGU6IFByb2dyZXNzYmFyTW9kdWxlLCBwcm92aWRlcnM6IFtQcm9ncmVzc2JhckNvbmZpZ0NvbXBvbmVudF0gfTtcbiAgfVxufVxuIl19