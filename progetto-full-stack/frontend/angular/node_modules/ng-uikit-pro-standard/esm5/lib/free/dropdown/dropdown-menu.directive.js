import { __decorate, __metadata } from "tslib";
import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { BsDropdownState } from './dropdown.state';
var BsDropdownMenuDirective = /** @class */ (function () {
    function BsDropdownMenuDirective(_state, _viewContainer, _templateRef) {
        _state.resolveDropdownMenu({
            templateRef: _templateRef,
            viewContainer: _viewContainer
        });
    }
    BsDropdownMenuDirective.ctorParameters = function () { return [
        { type: BsDropdownState },
        { type: ViewContainerRef },
        { type: TemplateRef }
    ]; };
    BsDropdownMenuDirective = __decorate([
        Directive({
            selector: '[mdbDropdownMenu],[dropdownMenu]',
            exportAs: 'bs-dropdown-menu'
        }),
        __metadata("design:paramtypes", [BsDropdownState,
            ViewContainerRef,
            TemplateRef])
    ], BsDropdownMenuDirective);
    return BsDropdownMenuDirective;
}());
export { BsDropdownMenuDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tbWVudS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvZnJlZS9kcm9wZG93bi9kcm9wZG93bi1tZW51LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBTW5EO0lBQ0UsaUNBQVksTUFBdUIsRUFDakMsY0FBZ0MsRUFDaEMsWUFBOEI7UUFDOUIsTUFBTSxDQUFDLG1CQUFtQixDQUFDO1lBQ3pCLFdBQVcsRUFBRSxZQUFZO1lBQ3pCLGFBQWEsRUFBRSxjQUFjO1NBQzlCLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQVBtQixlQUFlO2dCQUNqQixnQkFBZ0I7Z0JBQ2xCLFdBQVc7O0lBSGhCLHVCQUF1QjtRQUpuQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsa0NBQWtDO1lBQzVDLFFBQVEsRUFBRSxrQkFBa0I7U0FDN0IsQ0FBQzt5Q0FFb0IsZUFBZTtZQUNqQixnQkFBZ0I7WUFDbEIsV0FBVztPQUhoQix1QkFBdUIsQ0FTbkM7SUFBRCw4QkFBQztDQUFBLEFBVEQsSUFTQztTQVRZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJzRHJvcGRvd25TdGF0ZSB9IGZyb20gJy4vZHJvcGRvd24uc3RhdGUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWRiRHJvcGRvd25NZW51XSxbZHJvcGRvd25NZW51XScsXG4gIGV4cG9ydEFzOiAnYnMtZHJvcGRvd24tbWVudSdcbn0pXG5leHBvcnQgY2xhc3MgQnNEcm9wZG93bk1lbnVEaXJlY3RpdmUge1xuICBjb25zdHJ1Y3Rvcihfc3RhdGU6IEJzRHJvcGRvd25TdGF0ZSxcbiAgICBfdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBfdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICBfc3RhdGUucmVzb2x2ZURyb3Bkb3duTWVudSh7XG4gICAgICB0ZW1wbGF0ZVJlZjogX3RlbXBsYXRlUmVmLFxuICAgICAgdmlld0NvbnRhaW5lcjogX3ZpZXdDb250YWluZXJcbiAgICB9KTtcbiAgfVxufVxuIl19