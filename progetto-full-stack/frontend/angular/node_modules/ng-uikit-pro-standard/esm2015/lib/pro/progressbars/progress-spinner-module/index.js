import { NgModule } from '@angular/core';
import { MdProgressSpinnerComponent, MdSpinnerComponent, MdProgressSpinnerCssMatStylerDirective, } from './progress-spinner.component';
import { ProgressSpinnerComponent } from '../progress-spinner.component';
class MdProgressSpinnerModule {
    static forRoot() {
        return {
            ngModule: MdProgressSpinnerModule,
            providers: [],
        };
    }
}
MdProgressSpinnerModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
export { MdProgressSpinnerModule };
export { MdProgressSpinnerCssMatStylerDirective, MdProgressSpinnerComponent, MdSpinnerComponent, } from './progress-spinner.component';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy11aWtpdC1wcm8tc3RhbmRhcmQvc3JjL2xpYi9wcm8vcHJvZ3Jlc3NiYXJzL3Byb2dyZXNzLXNwaW5uZXItbW9kdWxlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFDTCwwQkFBMEIsRUFDMUIsa0JBQWtCLEVBQ2xCLHNDQUFzQyxHQUN2QyxNQUFNLDhCQUE4QixDQUFDO0FBRXRDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRXpFLE1BY00sdUJBQXVCO0lBQzNCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsU0FBUyxFQUFFLEVBQUU7U0FDZCxDQUFDO0lBQ0osQ0FBQzs7O1lBcEJGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsMEJBQTBCO29CQUMxQixrQkFBa0I7b0JBQ2xCLHNDQUFzQztvQkFDdEMsd0JBQXdCO2lCQUN6QjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osMEJBQTBCO29CQUMxQixrQkFBa0I7b0JBQ2xCLHNDQUFzQztvQkFDdEMsd0JBQXdCO2lCQUN6QjthQUNGOztBQVVELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDO0FBQ25DLE9BQU8sRUFFTCxzQ0FBc0MsRUFDdEMsMEJBQTBCLEVBQzFCLGtCQUFrQixHQUNuQixNQUFNLDhCQUE4QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE1kUHJvZ3Jlc3NTcGlubmVyQ29tcG9uZW50LFxuICBNZFNwaW5uZXJDb21wb25lbnQsXG4gIE1kUHJvZ3Jlc3NTcGlubmVyQ3NzTWF0U3R5bGVyRGlyZWN0aXZlLFxufSBmcm9tICcuL3Byb2dyZXNzLXNwaW5uZXIuY29tcG9uZW50JztcblxuaW1wb3J0IHsgUHJvZ3Jlc3NTcGlubmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vcHJvZ3Jlc3Mtc3Bpbm5lci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbXG4gICAgTWRQcm9ncmVzc1NwaW5uZXJDb21wb25lbnQsXG4gICAgTWRTcGlubmVyQ29tcG9uZW50LFxuICAgIE1kUHJvZ3Jlc3NTcGlubmVyQ3NzTWF0U3R5bGVyRGlyZWN0aXZlLFxuICAgIFByb2dyZXNzU3Bpbm5lckNvbXBvbmVudCxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWRQcm9ncmVzc1NwaW5uZXJDb21wb25lbnQsXG4gICAgTWRTcGlubmVyQ29tcG9uZW50LFxuICAgIE1kUHJvZ3Jlc3NTcGlubmVyQ3NzTWF0U3R5bGVyRGlyZWN0aXZlLFxuICAgIFByb2dyZXNzU3Bpbm5lckNvbXBvbmVudCxcbiAgXSxcbn0pXG5jbGFzcyBNZFByb2dyZXNzU3Bpbm5lck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8TWRQcm9ncmVzc1NwaW5uZXJNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE1kUHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXSxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCB7IE1kUHJvZ3Jlc3NTcGlubmVyTW9kdWxlIH07XG5leHBvcnQge1xuICBQcm9ncmVzc1NwaW5uZXJNb2RlLFxuICBNZFByb2dyZXNzU3Bpbm5lckNzc01hdFN0eWxlckRpcmVjdGl2ZSxcbiAgTWRQcm9ncmVzc1NwaW5uZXJDb21wb25lbnQsXG4gIE1kU3Bpbm5lckNvbXBvbmVudCxcbn0gZnJvbSAnLi9wcm9ncmVzcy1zcGlubmVyLmNvbXBvbmVudCc7XG4iXX0=