import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbSelectComponent } from './select.component';
import { MdbOptionModule } from './../option/option.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { MdbSelectFilterComponent } from './select-filter.component';
var MdbSelectModule = /** @class */ (function () {
    function MdbSelectModule() {
    }
    MdbSelectModule = __decorate([
        NgModule({
            declarations: [MdbSelectComponent, MdbSelectFilterComponent],
            imports: [CommonModule, MdbOptionModule, OverlayModule],
            exports: [MdbSelectComponent, MdbSelectFilterComponent, MdbOptionModule],
        })
    ], MdbSelectModule);
    return MdbSelectModule;
}());
export { MdbSelectModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vc2VsZWN0L3NlbGVjdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFPckU7SUFBQTtJQUE4QixDQUFDO0lBQWxCLGVBQWU7UUFMM0IsUUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsd0JBQXdCLENBQUM7WUFDNUQsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxhQUFhLENBQUM7WUFDdkQsT0FBTyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsd0JBQXdCLEVBQUUsZUFBZSxDQUFDO1NBQ3pFLENBQUM7T0FDVyxlQUFlLENBQUc7SUFBRCxzQkFBQztDQUFBLEFBQS9CLElBQStCO1NBQWxCLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgTWRiU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IE1kYk9wdGlvbk1vZHVsZSB9IGZyb20gJy4vLi4vb3B0aW9uL29wdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IE1kYlNlbGVjdEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LWZpbHRlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtNZGJTZWxlY3RDb21wb25lbnQsIE1kYlNlbGVjdEZpbHRlckNvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1kYk9wdGlvbk1vZHVsZSwgT3ZlcmxheU1vZHVsZV0sXG4gIGV4cG9ydHM6IFtNZGJTZWxlY3RDb21wb25lbnQsIE1kYlNlbGVjdEZpbHRlckNvbXBvbmVudCwgTWRiT3B0aW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTWRiU2VsZWN0TW9kdWxlIHt9XG4iXX0=