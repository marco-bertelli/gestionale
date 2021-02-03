import { __decorate } from "tslib";
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { ButtonsModule } from '../../free/buttons/buttons.module';
import { WavesModule } from '../../free/waves/waves.module';
import { MdbTimepickerToggleComponent } from './timepicker-toggle.component';
import { MdbTimePickerDirective } from './timepicker.directive';
import { MdbTimePickerComponent } from './timepicker.component';
import { MdbTimePickerContentComponent } from './timepicker.content';
var MdbTimePickerModule = /** @class */ (function () {
    function MdbTimePickerModule() {
    }
    MdbTimePickerModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                OverlayModule,
                A11yModule,
                ButtonsModule.forRoot(),
                WavesModule.forRoot(),
            ],
            declarations: [
                MdbTimePickerComponent,
                MdbTimepickerToggleComponent,
                MdbTimePickerDirective,
                MdbTimePickerContentComponent,
            ],
            exports: [MdbTimePickerComponent, MdbTimepickerToggleComponent, MdbTimePickerDirective],
            bootstrap: [MdbTimePickerContentComponent],
            entryComponents: [MdbTimePickerContentComponent],
        })
    ], MdbTimePickerModule);
    return MdbTimePickerModule;
}());
export { MdbTimePickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL3RpbWVwaWNrZXIvdGltZXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQW9CckU7SUFBQTtJQUFrQyxDQUFDO0lBQXRCLG1CQUFtQjtRQWxCL0IsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLFlBQVk7Z0JBQ1osYUFBYTtnQkFDYixVQUFVO2dCQUNWLGFBQWEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZCLFdBQVcsQ0FBQyxPQUFPLEVBQUU7YUFDdEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osc0JBQXNCO2dCQUN0Qiw0QkFBNEI7Z0JBQzVCLHNCQUFzQjtnQkFDdEIsNkJBQTZCO2FBQzlCO1lBQ0QsT0FBTyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsNEJBQTRCLEVBQUUsc0JBQXNCLENBQUM7WUFDdkYsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7WUFDMUMsZUFBZSxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDakQsQ0FBQztPQUNXLG1CQUFtQixDQUFHO0lBQUQsMEJBQUM7Q0FBQSxBQUFuQyxJQUFtQztTQUF0QixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQnV0dG9uc01vZHVsZSB9IGZyb20gJy4uLy4uL2ZyZWUvYnV0dG9ucy9idXR0b25zLm1vZHVsZSc7XG5pbXBvcnQgeyBXYXZlc01vZHVsZSB9IGZyb20gJy4uLy4uL2ZyZWUvd2F2ZXMvd2F2ZXMubW9kdWxlJztcbmltcG9ydCB7IE1kYlRpbWVwaWNrZXJUb2dnbGVDb21wb25lbnQgfSBmcm9tICcuL3RpbWVwaWNrZXItdG9nZ2xlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZGJUaW1lUGlja2VyRGlyZWN0aXZlIH0gZnJvbSAnLi90aW1lcGlja2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZGJUaW1lUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZGJUaW1lUGlja2VyQ29udGVudENvbXBvbmVudCB9IGZyb20gJy4vdGltZXBpY2tlci5jb250ZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBPdmVybGF5TW9kdWxlLFxuICAgIEExMXlNb2R1bGUsXG4gICAgQnV0dG9uc01vZHVsZS5mb3JSb290KCksXG4gICAgV2F2ZXNNb2R1bGUuZm9yUm9vdCgpLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNZGJUaW1lUGlja2VyQ29tcG9uZW50LFxuICAgIE1kYlRpbWVwaWNrZXJUb2dnbGVDb21wb25lbnQsXG4gICAgTWRiVGltZVBpY2tlckRpcmVjdGl2ZSxcbiAgICBNZGJUaW1lUGlja2VyQ29udGVudENvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW01kYlRpbWVQaWNrZXJDb21wb25lbnQsIE1kYlRpbWVwaWNrZXJUb2dnbGVDb21wb25lbnQsIE1kYlRpbWVQaWNrZXJEaXJlY3RpdmVdLFxuICBib290c3RyYXA6IFtNZGJUaW1lUGlja2VyQ29udGVudENvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW01kYlRpbWVQaWNrZXJDb250ZW50Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTWRiVGltZVBpY2tlck1vZHVsZSB7fVxuIl19