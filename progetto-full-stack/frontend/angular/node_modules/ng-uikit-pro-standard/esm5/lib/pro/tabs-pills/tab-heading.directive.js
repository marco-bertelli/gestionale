import { __decorate, __metadata } from "tslib";
import { Directive, TemplateRef } from '@angular/core';
import { TabDirective } from './tab.directive';
/** Should be used to mark <template> element as a template for tab heading */
var TabHeadingDirective = /** @class */ (function () {
    function TabHeadingDirective(templateRef, tab) {
        tab.headingRef = templateRef;
    }
    TabHeadingDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: TabDirective }
    ]; };
    TabHeadingDirective = __decorate([
        Directive({ selector: '[mdbTabHeading]' }),
        __metadata("design:paramtypes", [TemplateRef, TabDirective])
    ], TabHeadingDirective);
    return TabHeadingDirective;
}());
export { TabHeadingDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWhlYWRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby90YWJzLXBpbGxzL3RhYi1oZWFkaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLDhFQUE4RTtBQUU5RTtJQUdFLDZCQUFtQixXQUE2QixFQUFFLEdBQWlCO1FBQ2pFLEdBQUcsQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO0lBQy9CLENBQUM7O2dCQUYrQixXQUFXO2dCQUFZLFlBQVk7O0lBSHhELG1CQUFtQjtRQUQvQixTQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsQ0FBQzt5Q0FJUCxXQUFXLEVBQVksWUFBWTtPQUh4RCxtQkFBbUIsQ0FNL0I7SUFBRCwwQkFBQztDQUFBLEFBTkQsSUFNQztTQU5ZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVGFiRGlyZWN0aXZlIH0gZnJvbSAnLi90YWIuZGlyZWN0aXZlJztcblxuLyoqIFNob3VsZCBiZSB1c2VkIHRvIG1hcmsgPHRlbXBsYXRlPiBlbGVtZW50IGFzIGEgdGVtcGxhdGUgZm9yIHRhYiBoZWFkaW5nICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1ttZGJUYWJIZWFkaW5nXSd9KVxuZXhwb3J0IGNsYXNzIFRhYkhlYWRpbmdEaXJlY3RpdmUge1xuICBwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LCB0YWI6IFRhYkRpcmVjdGl2ZSkge1xuICAgIHRhYi5oZWFkaW5nUmVmID0gdGVtcGxhdGVSZWY7XG4gIH1cbn1cbiJdfQ==