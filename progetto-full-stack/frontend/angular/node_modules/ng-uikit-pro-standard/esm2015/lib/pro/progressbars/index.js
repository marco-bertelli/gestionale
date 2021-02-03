import { NgModule } from '@angular/core';
export { BarComponent } from './bar.component';
export { ProgressDirective } from './progress.directive';
export { ProgressbarComponent } from './progressbar.component';
export { ProgressbarModule } from './progressbar.module';
export { ProgressbarConfigComponent } from './progressbar.config.component';
export { ProgressSpinnerComponent } from './progress-spinner.component';
import { ProgressbarModule } from './progressbar.module';
import { MdProgressSpinnerModule } from './progress-spinner-module/index';
import { MdProgressBarModule } from './progress-bars-module/index';
const MATERIAL_MODULES = [MdProgressBarModule, MdProgressSpinnerModule, ProgressbarModule];
export class PreloadersModule {
}
PreloadersModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MdProgressBarModule.forRoot(),
                    MdProgressSpinnerModule.forRoot(),
                    ProgressbarModule.forRoot(),
                ],
                exports: MATERIAL_MODULES,
            },] }
];
export class ProgressBars {
    static forRoot() {
        return { ngModule: PreloadersModule };
    }
}
ProgressBars.decorators = [
    { type: NgModule, args: [{
                imports: MATERIAL_MODULES,
                exports: MATERIAL_MODULES,
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy11aWtpdC1wcm8tc3RhbmRhcmQvc3JjL2xpYi9wcm8vcHJvZ3Jlc3NiYXJzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBRTlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV6RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVuRSxNQUFNLGdCQUFnQixHQUFHLENBQUMsbUJBQW1CLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQVUzRixNQUFNLE9BQU8sZ0JBQWdCOzs7WUFSNUIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxtQkFBbUIsQ0FBQyxPQUFPLEVBQUU7b0JBQzdCLHVCQUF1QixDQUFDLE9BQU8sRUFBRTtvQkFDakMsaUJBQWlCLENBQUMsT0FBTyxFQUFFO2lCQUM1QjtnQkFDRCxPQUFPLEVBQUUsZ0JBQWdCO2FBQzFCOztBQU9ELE1BQU0sT0FBTyxZQUFZO0lBQ3ZCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3hDLENBQUM7OztZQVBGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsZ0JBQWdCO2dCQUN6QixPQUFPLEVBQUUsZ0JBQWdCO2FBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IHsgQmFyQ29tcG9uZW50IH0gZnJvbSAnLi9iYXIuY29tcG9uZW50JztcbmV4cG9ydCB7IFByb2dyZXNzRGlyZWN0aXZlIH0gZnJvbSAnLi9wcm9ncmVzcy5kaXJlY3RpdmUnO1xuZXhwb3J0IHsgUHJvZ3Jlc3NiYXJDb21wb25lbnQgfSBmcm9tICcuL3Byb2dyZXNzYmFyLmNvbXBvbmVudCc7XG5leHBvcnQgeyBQcm9ncmVzc2Jhck1vZHVsZSB9IGZyb20gJy4vcHJvZ3Jlc3NiYXIubW9kdWxlJztcbmV4cG9ydCB7IFByb2dyZXNzYmFyQ29uZmlnQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9ncmVzc2Jhci5jb25maWcuY29tcG9uZW50JztcbmV4cG9ydCB7IFByb2dyZXNzU3Bpbm5lckNvbXBvbmVudCB9IGZyb20gJy4vcHJvZ3Jlc3Mtc3Bpbm5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvZ3Jlc3NiYXJNb2R1bGUgfSBmcm9tICcuL3Byb2dyZXNzYmFyLm1vZHVsZSc7XG5cbmltcG9ydCB7IE1kUHJvZ3Jlc3NTcGlubmVyTW9kdWxlIH0gZnJvbSAnLi9wcm9ncmVzcy1zcGlubmVyLW1vZHVsZS9pbmRleCc7XG5pbXBvcnQgeyBNZFByb2dyZXNzQmFyTW9kdWxlIH0gZnJvbSAnLi9wcm9ncmVzcy1iYXJzLW1vZHVsZS9pbmRleCc7XG5cbmNvbnN0IE1BVEVSSUFMX01PRFVMRVMgPSBbTWRQcm9ncmVzc0Jhck1vZHVsZSwgTWRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsIFByb2dyZXNzYmFyTW9kdWxlXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE1kUHJvZ3Jlc3NCYXJNb2R1bGUuZm9yUm9vdCgpLFxuICAgIE1kUHJvZ3Jlc3NTcGlubmVyTW9kdWxlLmZvclJvb3QoKSxcbiAgICBQcm9ncmVzc2Jhck1vZHVsZS5mb3JSb290KCksXG4gIF0sXG4gIGV4cG9ydHM6IE1BVEVSSUFMX01PRFVMRVMsXG59KVxuZXhwb3J0IGNsYXNzIFByZWxvYWRlcnNNb2R1bGUge31cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogTUFURVJJQUxfTU9EVUxFUyxcbiAgZXhwb3J0czogTUFURVJJQUxfTU9EVUxFUyxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NCYXJzIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxQcmVsb2FkZXJzTW9kdWxlPiB7XG4gICAgcmV0dXJuIHsgbmdNb2R1bGU6IFByZWxvYWRlcnNNb2R1bGUgfTtcbiAgfVxufVxuIl19