import { __decorate } from "tslib";
import { MdbBtnDirective } from './buttons.directive';
import { NgModule } from '@angular/core';
import { ButtonCheckboxDirective } from './checkbox.directive';
import { ButtonRadioDirective } from './radio.directive';
import { FixedButtonCaptionDirective } from './fixed-caption.directive';
var ButtonsModule = /** @class */ (function () {
    function ButtonsModule() {
    }
    ButtonsModule_1 = ButtonsModule;
    ButtonsModule.forRoot = function () {
        return { ngModule: ButtonsModule_1, providers: [] };
    };
    var ButtonsModule_1;
    ButtonsModule = ButtonsModule_1 = __decorate([
        NgModule({
            declarations: [
                ButtonCheckboxDirective,
                ButtonRadioDirective,
                MdbBtnDirective,
                FixedButtonCaptionDirective,
            ],
            exports: [
                ButtonCheckboxDirective,
                ButtonRadioDirective,
                MdbBtnDirective,
                FixedButtonCaptionDirective,
            ],
        })
    ], ButtonsModule);
    return ButtonsModule;
}());
export { ButtonsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9ucy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvZnJlZS9idXR0b25zL2J1dHRvbnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFnQnhFO0lBQUE7SUFJQSxDQUFDO3NCQUpZLGFBQWE7SUFDVixxQkFBTyxHQUFyQjtRQUNFLE9BQU8sRUFBRSxRQUFRLEVBQUUsZUFBYSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwRCxDQUFDOztJQUhVLGFBQWE7UUFkekIsUUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFO2dCQUNaLHVCQUF1QjtnQkFDdkIsb0JBQW9CO2dCQUNwQixlQUFlO2dCQUNmLDJCQUEyQjthQUM1QjtZQUNELE9BQU8sRUFBRTtnQkFDUCx1QkFBdUI7Z0JBQ3ZCLG9CQUFvQjtnQkFDcEIsZUFBZTtnQkFDZiwyQkFBMkI7YUFDNUI7U0FDRixDQUFDO09BQ1csYUFBYSxDQUl6QjtJQUFELG9CQUFDO0NBQUEsQUFKRCxJQUlDO1NBSlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1kYkJ0bkRpcmVjdGl2ZSB9IGZyb20gJy4vYnV0dG9ucy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQnV0dG9uQ2hlY2tib3hEaXJlY3RpdmUgfSBmcm9tICcuL2NoZWNrYm94LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBCdXR0b25SYWRpb0RpcmVjdGl2ZSB9IGZyb20gJy4vcmFkaW8uZGlyZWN0aXZlJztcbmltcG9ydCB7IEZpeGVkQnV0dG9uQ2FwdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZml4ZWQtY2FwdGlvbi5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBCdXR0b25DaGVja2JveERpcmVjdGl2ZSxcbiAgICBCdXR0b25SYWRpb0RpcmVjdGl2ZSxcbiAgICBNZGJCdG5EaXJlY3RpdmUsXG4gICAgRml4ZWRCdXR0b25DYXB0aW9uRGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQnV0dG9uQ2hlY2tib3hEaXJlY3RpdmUsXG4gICAgQnV0dG9uUmFkaW9EaXJlY3RpdmUsXG4gICAgTWRiQnRuRGlyZWN0aXZlLFxuICAgIEZpeGVkQnV0dG9uQ2FwdGlvbkRpcmVjdGl2ZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uc01vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEJ1dHRvbnNNb2R1bGU+IHtcbiAgICByZXR1cm4geyBuZ01vZHVsZTogQnV0dG9uc01vZHVsZSwgcHJvdmlkZXJzOiBbXSB9O1xuICB9XG59XG4iXX0=