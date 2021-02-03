import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { BsDropdownState } from './dropdown.state';
export class BsDropdownMenuDirective {
    constructor(_state, _viewContainer, _templateRef) {
        _state.resolveDropdownMenu({
            templateRef: _templateRef,
            viewContainer: _viewContainer
        });
    }
}
BsDropdownMenuDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mdbDropdownMenu],[dropdownMenu]',
                exportAs: 'bs-dropdown-menu'
            },] }
];
BsDropdownMenuDirective.ctorParameters = () => [
    { type: BsDropdownState },
    { type: ViewContainerRef },
    { type: TemplateRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tbWVudS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy11aWtpdC1wcm8tc3RhbmRhcmQvc3JjL2xpYi9mcmVlL2Ryb3Bkb3duL2Ryb3Bkb3duLW1lbnUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQU1uRCxNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDLFlBQVksTUFBdUIsRUFDakMsY0FBZ0MsRUFDaEMsWUFBOEI7UUFDOUIsTUFBTSxDQUFDLG1CQUFtQixDQUFDO1lBQ3pCLFdBQVcsRUFBRSxZQUFZO1lBQ3pCLGFBQWEsRUFBRSxjQUFjO1NBQzlCLENBQUMsQ0FBQztJQUNMLENBQUM7OztZQVpGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0NBQWtDO2dCQUM1QyxRQUFRLEVBQUUsa0JBQWtCO2FBQzdCOzs7WUFMUSxlQUFlO1lBRFMsZ0JBQWdCO1lBQTdCLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCc0Ryb3Bkb3duU3RhdGUgfSBmcm9tICcuL2Ryb3Bkb3duLnN0YXRlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21kYkRyb3Bkb3duTWVudV0sW2Ryb3Bkb3duTWVudV0nLFxuICBleHBvcnRBczogJ2JzLWRyb3Bkb3duLW1lbnUnXG59KVxuZXhwb3J0IGNsYXNzIEJzRHJvcGRvd25NZW51RGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IoX3N0YXRlOiBCc0Ryb3Bkb3duU3RhdGUsXG4gICAgX3ZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgX3RlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgX3N0YXRlLnJlc29sdmVEcm9wZG93bk1lbnUoe1xuICAgICAgdGVtcGxhdGVSZWY6IF90ZW1wbGF0ZVJlZixcbiAgICAgIHZpZXdDb250YWluZXI6IF92aWV3Q29udGFpbmVyXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==