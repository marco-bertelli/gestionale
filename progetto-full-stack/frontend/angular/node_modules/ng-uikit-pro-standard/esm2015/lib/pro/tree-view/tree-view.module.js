import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbTreeComponent } from './tree-view.component';
import { CheckboxModule } from '../../free/checkbox/checkbox.module';
export class MdbTreeModule {
}
MdbTreeModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, CheckboxModule],
                declarations: [MdbTreeComponent],
                exports: [MdbTreeComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aWV3Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXVpa2l0LXByby1zdGFuZGFyZC9zcmMvbGliL3Byby90cmVlLXZpZXcvdHJlZS12aWV3Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFPckUsTUFBTSxPQUFPLGFBQWE7OztZQUx6QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQztnQkFDdkMsWUFBWSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ2hDLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO2FBQzVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgTWRiVHJlZUNvbXBvbmVudCB9IGZyb20gJy4vdHJlZS12aWV3LmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IENoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vLi4vZnJlZS9jaGVja2JveC9jaGVja2JveC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDaGVja2JveE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW01kYlRyZWVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTWRiVHJlZUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE1kYlRyZWVNb2R1bGUge31cbiJdfQ==