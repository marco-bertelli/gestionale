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
export class MdbTimePickerModule {
}
MdbTimePickerModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy11aWtpdC1wcm8tc3RhbmRhcmQvc3JjL2xpYi9wcm8vdGltZXBpY2tlci90aW1lcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDaEUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFvQnJFLE1BQU0sT0FBTyxtQkFBbUI7OztZQWxCL0IsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGFBQWE7b0JBQ2IsVUFBVTtvQkFDVixhQUFhLENBQUMsT0FBTyxFQUFFO29CQUN2QixXQUFXLENBQUMsT0FBTyxFQUFFO2lCQUN0QjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osc0JBQXNCO29CQUN0Qiw0QkFBNEI7b0JBQzVCLHNCQUFzQjtvQkFDdEIsNkJBQTZCO2lCQUM5QjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSw0QkFBNEIsRUFBRSxzQkFBc0IsQ0FBQztnQkFDdkYsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7Z0JBQzFDLGVBQWUsRUFBRSxDQUFDLDZCQUE2QixDQUFDO2FBQ2pEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEJ1dHRvbnNNb2R1bGUgfSBmcm9tICcuLi8uLi9mcmVlL2J1dHRvbnMvYnV0dG9ucy5tb2R1bGUnO1xuaW1wb3J0IHsgV2F2ZXNNb2R1bGUgfSBmcm9tICcuLi8uLi9mcmVlL3dhdmVzL3dhdmVzLm1vZHVsZSc7XG5pbXBvcnQgeyBNZGJUaW1lcGlja2VyVG9nZ2xlQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lcGlja2VyLXRvZ2dsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWRiVGltZVBpY2tlckRpcmVjdGl2ZSB9IGZyb20gJy4vdGltZXBpY2tlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWRiVGltZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vdGltZXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWRiVGltZVBpY2tlckNvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL3RpbWVwaWNrZXIuY29udGVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgT3ZlcmxheU1vZHVsZSxcbiAgICBBMTF5TW9kdWxlLFxuICAgIEJ1dHRvbnNNb2R1bGUuZm9yUm9vdCgpLFxuICAgIFdhdmVzTW9kdWxlLmZvclJvb3QoKSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWRiVGltZVBpY2tlckNvbXBvbmVudCxcbiAgICBNZGJUaW1lcGlja2VyVG9nZ2xlQ29tcG9uZW50LFxuICAgIE1kYlRpbWVQaWNrZXJEaXJlY3RpdmUsXG4gICAgTWRiVGltZVBpY2tlckNvbnRlbnRDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtNZGJUaW1lUGlja2VyQ29tcG9uZW50LCBNZGJUaW1lcGlja2VyVG9nZ2xlQ29tcG9uZW50LCBNZGJUaW1lUGlja2VyRGlyZWN0aXZlXSxcbiAgYm9vdHN0cmFwOiBbTWRiVGltZVBpY2tlckNvbnRlbnRDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtNZGJUaW1lUGlja2VyQ29udGVudENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE1kYlRpbWVQaWNrZXJNb2R1bGUge31cbiJdfQ==