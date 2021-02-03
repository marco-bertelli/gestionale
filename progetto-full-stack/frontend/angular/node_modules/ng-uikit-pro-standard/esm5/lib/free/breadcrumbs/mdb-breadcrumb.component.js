import { __decorate, __metadata } from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
var MdbBreadcrumbComponent = /** @class */ (function () {
    function MdbBreadcrumbComponent() {
    }
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbBreadcrumbComponent.prototype, "customClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbBreadcrumbComponent.prototype, "textTransform", void 0);
    MdbBreadcrumbComponent = __decorate([
        Component({
            selector: 'mdb-breadcrumb',
            template: "<ol class=\"breadcrumb list-inline list-unstyled {{customClass}} text-{{textTransform}}\">\n  <ng-content></ng-content>\n</ol>\n",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], MdbBreadcrumbComponent);
    return MdbBreadcrumbComponent;
}());
export { MdbBreadcrumbComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLWJyZWFkY3J1bWIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvYnJlYWRjcnVtYnMvbWRiLWJyZWFkY3J1bWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU8xRTtJQUFBO0lBR0EsQ0FBQztJQUZVO1FBQVIsS0FBSyxFQUFFOzsrREFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7O2lFQUF1QjtJQUZwQixzQkFBc0I7UUFMbEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQiw0SUFBOEM7WUFDOUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUNXLHNCQUFzQixDQUdsQztJQUFELDZCQUFDO0NBQUEsQUFIRCxJQUdDO1NBSFksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLWJyZWFkY3J1bWInLFxuICB0ZW1wbGF0ZVVybDogJy4vbWRiLWJyZWFkY3J1bWIuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWRiQnJlYWRjcnVtYkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRleHRUcmFuc2Zvcm06IHN0cmluZztcbn1cbiJdfQ==