import { NgModule } from '@angular/core';
import { MDBFileDropDirective } from '../directives/mdb-file-drop.directive';
import { MDBFileSelectDirective } from '../directives/mdb-file-select.directive';
export class FileInputModule {
}
FileInputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    MDBFileSelectDirective,
                    MDBFileDropDirective
                ],
                exports: [
                    MDBFileSelectDirective,
                    MDBFileDropDirective
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXVwbG9hZGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXVpa2l0LXByby1zdGFuZGFyZC9zcmMvbGliL3Byby9maWxlLWlucHV0L21vZHVsZS9tZGItdXBsb2FkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFZakYsTUFBTSxPQUFPLGVBQWU7OztZQVYzQixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNkLHNCQUFzQjtvQkFDdEIsb0JBQW9CO2lCQUNuQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Qsc0JBQXNCO29CQUN0QixvQkFBb0I7aUJBQ25CO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTURCRmlsZURyb3BEaXJlY3RpdmUgfSBmcm9tICcuLi9kaXJlY3RpdmVzL21kYi1maWxlLWRyb3AuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1EQkZpbGVTZWxlY3REaXJlY3RpdmUgfSBmcm9tICcuLi9kaXJlY3RpdmVzL21kYi1maWxlLXNlbGVjdC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgTURCRmlsZVNlbGVjdERpcmVjdGl2ZSxcbiAgTURCRmlsZURyb3BEaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW1xuICBNREJGaWxlU2VsZWN0RGlyZWN0aXZlLFxuICBNREJGaWxlRHJvcERpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVJbnB1dE1vZHVsZSB7fVxuIl19