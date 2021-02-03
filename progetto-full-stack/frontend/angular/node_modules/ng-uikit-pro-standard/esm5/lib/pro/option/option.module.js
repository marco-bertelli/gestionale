import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionComponent } from './option.component';
import { OptionGroupComponent } from './option-group.component';
import { CheckboxModule } from './../../free/checkbox/checkbox.module';
import { SelectAllOptionComponent } from './select-all-option';
var MdbOptionModule = /** @class */ (function () {
    function MdbOptionModule() {
    }
    MdbOptionModule = __decorate([
        NgModule({
            imports: [CommonModule, CheckboxModule],
            declarations: [OptionComponent, SelectAllOptionComponent, OptionGroupComponent],
            exports: [OptionComponent, OptionGroupComponent, SelectAllOptionComponent],
        })
    ], MdbOptionModule);
    return MdbOptionModule;
}());
export { MdbOptionModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vb3B0aW9uL29wdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDdkUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFPL0Q7SUFBQTtJQUE4QixDQUFDO0lBQWxCLGVBQWU7UUFMM0IsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQztZQUN2QyxZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUUsd0JBQXdCLEVBQUUsb0JBQW9CLENBQUM7WUFDL0UsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLG9CQUFvQixFQUFFLHdCQUF3QixDQUFDO1NBQzNFLENBQUM7T0FDVyxlQUFlLENBQUc7SUFBRCxzQkFBQztDQUFBLEFBQS9CLElBQStCO1NBQWxCLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vb3B0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcHRpb25Hcm91cENvbXBvbmVudCB9IGZyb20gJy4vb3B0aW9uLWdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaGVja2JveE1vZHVsZSB9IGZyb20gJy4vLi4vLi4vZnJlZS9jaGVja2JveC9jaGVja2JveC5tb2R1bGUnO1xuaW1wb3J0IHsgU2VsZWN0QWxsT3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3QtYWxsLW9wdGlvbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIENoZWNrYm94TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbT3B0aW9uQ29tcG9uZW50LCBTZWxlY3RBbGxPcHRpb25Db21wb25lbnQsIE9wdGlvbkdyb3VwQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW09wdGlvbkNvbXBvbmVudCwgT3B0aW9uR3JvdXBDb21wb25lbnQsIFNlbGVjdEFsbE9wdGlvbkNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE1kYk9wdGlvbk1vZHVsZSB7fVxuIl19