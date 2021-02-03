import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { MdProgressSpinnerComponent, MdSpinnerComponent, MdProgressSpinnerCssMatStylerDirective, } from './progress-spinner.component';
import { ProgressSpinnerComponent } from '../progress-spinner.component';
var MdProgressSpinnerModule = /** @class */ (function () {
    function MdProgressSpinnerModule() {
    }
    MdProgressSpinnerModule_1 = MdProgressSpinnerModule;
    MdProgressSpinnerModule.forRoot = function () {
        return {
            ngModule: MdProgressSpinnerModule_1,
            providers: [],
        };
    };
    var MdProgressSpinnerModule_1;
    MdProgressSpinnerModule = MdProgressSpinnerModule_1 = __decorate([
        NgModule({
            exports: [
                MdProgressSpinnerComponent,
                MdSpinnerComponent,
                MdProgressSpinnerCssMatStylerDirective,
                ProgressSpinnerComponent,
            ],
            declarations: [
                MdProgressSpinnerComponent,
                MdSpinnerComponent,
                MdProgressSpinnerCssMatStylerDirective,
                ProgressSpinnerComponent,
            ],
        })
    ], MdProgressSpinnerModule);
    return MdProgressSpinnerModule;
}());
export { MdProgressSpinnerModule };
export { MdProgressSpinnerCssMatStylerDirective, MdProgressSpinnerComponent, MdSpinnerComponent, } from './progress-spinner.component';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL3Byb2dyZXNzYmFycy9wcm9ncmVzcy1zcGlubmVyLW1vZHVsZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUNMLDBCQUEwQixFQUMxQixrQkFBa0IsRUFDbEIsc0NBQXNDLEdBQ3ZDLE1BQU0sOEJBQThCLENBQUM7QUFFdEMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFnQnpFO0lBQUE7SUFPQSxDQUFDO2dDQVBLLHVCQUF1QjtJQUNwQiwrQkFBTyxHQUFkO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSx5QkFBdUI7WUFDakMsU0FBUyxFQUFFLEVBQUU7U0FDZCxDQUFDO0lBQ0osQ0FBQzs7SUFORyx1QkFBdUI7UUFkNUIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLDBCQUEwQjtnQkFDMUIsa0JBQWtCO2dCQUNsQixzQ0FBc0M7Z0JBQ3RDLHdCQUF3QjthQUN6QjtZQUNELFlBQVksRUFBRTtnQkFDWiwwQkFBMEI7Z0JBQzFCLGtCQUFrQjtnQkFDbEIsc0NBQXNDO2dCQUN0Qyx3QkFBd0I7YUFDekI7U0FDRixDQUFDO09BQ0ksdUJBQXVCLENBTzVCO0lBQUQsOEJBQUM7Q0FBQSxBQVBELElBT0M7QUFFRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQztBQUNuQyxPQUFPLEVBRUwsc0NBQXNDLEVBQ3RDLDBCQUEwQixFQUMxQixrQkFBa0IsR0FDbkIsTUFBTSw4QkFBOEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNZFByb2dyZXNzU3Bpbm5lckNvbXBvbmVudCxcbiAgTWRTcGlubmVyQ29tcG9uZW50LFxuICBNZFByb2dyZXNzU3Bpbm5lckNzc01hdFN0eWxlckRpcmVjdGl2ZSxcbn0gZnJvbSAnLi9wcm9ncmVzcy1zcGlubmVyLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IFByb2dyZXNzU3Bpbm5lckNvbXBvbmVudCB9IGZyb20gJy4uL3Byb2dyZXNzLXNwaW5uZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW1xuICAgIE1kUHJvZ3Jlc3NTcGlubmVyQ29tcG9uZW50LFxuICAgIE1kU3Bpbm5lckNvbXBvbmVudCxcbiAgICBNZFByb2dyZXNzU3Bpbm5lckNzc01hdFN0eWxlckRpcmVjdGl2ZSxcbiAgICBQcm9ncmVzc1NwaW5uZXJDb21wb25lbnQsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1kUHJvZ3Jlc3NTcGlubmVyQ29tcG9uZW50LFxuICAgIE1kU3Bpbm5lckNvbXBvbmVudCxcbiAgICBNZFByb2dyZXNzU3Bpbm5lckNzc01hdFN0eWxlckRpcmVjdGl2ZSxcbiAgICBQcm9ncmVzc1NwaW5uZXJDb21wb25lbnQsXG4gIF0sXG59KVxuY2xhc3MgTWRQcm9ncmVzc1NwaW5uZXJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE1kUHJvZ3Jlc3NTcGlubmVyTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNZFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW10sXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgeyBNZFByb2dyZXNzU3Bpbm5lck1vZHVsZSB9O1xuZXhwb3J0IHtcbiAgUHJvZ3Jlc3NTcGlubmVyTW9kZSxcbiAgTWRQcm9ncmVzc1NwaW5uZXJDc3NNYXRTdHlsZXJEaXJlY3RpdmUsXG4gIE1kUHJvZ3Jlc3NTcGlubmVyQ29tcG9uZW50LFxuICBNZFNwaW5uZXJDb21wb25lbnQsXG59IGZyb20gJy4vcHJvZ3Jlc3Mtc3Bpbm5lci5jb21wb25lbnQnO1xuIl19