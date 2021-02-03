import { __decorate } from "tslib";
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { EqualValidatorDirective } from './equal-validator.directive';
import { MdbInputDirective } from './mdb-input.directive';
import { MdbInput } from './input.directive';
var InputsModule = /** @class */ (function () {
    function InputsModule() {
    }
    InputsModule_1 = InputsModule;
    InputsModule.forRoot = function () {
        return { ngModule: InputsModule_1, providers: [] };
    };
    var InputsModule_1;
    InputsModule = InputsModule_1 = __decorate([
        NgModule({
            declarations: [MdbInput, MdbInputDirective, EqualValidatorDirective],
            exports: [MdbInput, MdbInputDirective, EqualValidatorDirective],
            schemas: [NO_ERRORS_SCHEMA],
        })
    ], InputsModule);
    return InputsModule;
}());
export { InputsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9mcmVlL2lucHV0cy9pbnB1dHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFPN0M7SUFBQTtJQUlBLENBQUM7cUJBSlksWUFBWTtJQUNULG9CQUFPLEdBQXJCO1FBQ0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxjQUFZLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ25ELENBQUM7O0lBSFUsWUFBWTtRQUx4QixRQUFRLENBQUM7WUFDUixZQUFZLEVBQUUsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLENBQUM7WUFDcEUsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixDQUFDO1lBQy9ELE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxZQUFZLENBSXhCO0lBQUQsbUJBQUM7Q0FBQSxBQUpELElBSUM7U0FKWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVxdWFsVmFsaWRhdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9lcXVhbC12YWxpZGF0b3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1kYklucHV0RGlyZWN0aXZlIH0gZnJvbSAnLi9tZGItaW5wdXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1kYklucHV0IH0gZnJvbSAnLi9pbnB1dC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtNZGJJbnB1dCwgTWRiSW5wdXREaXJlY3RpdmUsIEVxdWFsVmFsaWRhdG9yRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW01kYklucHV0LCBNZGJJbnB1dERpcmVjdGl2ZSwgRXF1YWxWYWxpZGF0b3JEaXJlY3RpdmVdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV0sXG59KVxuZXhwb3J0IGNsYXNzIElucHV0c01vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPElucHV0c01vZHVsZT4ge1xuICAgIHJldHVybiB7IG5nTW9kdWxlOiBJbnB1dHNNb2R1bGUsIHByb3ZpZGVyczogW10gfTtcbiAgfVxufVxuIl19