import { __decorate, __metadata } from "tslib";
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
var NgTranscludeDirective = /** @class */ (function () {
    function NgTranscludeDirective(viewRef) {
        this.viewRef = viewRef;
    }
    Object.defineProperty(NgTranscludeDirective.prototype, "mdbNgTransclude", {
        get: function () {
            return this._ngTransclude;
        },
        set: function (templateRef) {
            this._ngTransclude = templateRef;
            if (templateRef) {
                this.viewRef.createEmbeddedView(templateRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    NgTranscludeDirective.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef),
        __metadata("design:paramtypes", [TemplateRef])
    ], NgTranscludeDirective.prototype, "mdbNgTransclude", null);
    NgTranscludeDirective = __decorate([
        Directive({
            selector: '[mdbNgTransclude]'
        }),
        __metadata("design:paramtypes", [ViewContainerRef])
    ], NgTranscludeDirective);
    return NgTranscludeDirective;
}());
export { NgTranscludeDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNjbHVkZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL3RhYnMtcGlsbHMvdHJhbnNjbHVkZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUtoRjtJQWtCRSwrQkFBbUIsT0FBeUI7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQWJELHNCQUFXLGtEQUFlO2FBTzFCO1lBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzVCLENBQUM7YUFURCxVQUEyQixXQUE2QjtZQUN0RCxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztZQUNqQyxJQUFJLFdBQVcsRUFBRTtnQkFDZixJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzlDO1FBQ0gsQ0FBQzs7O09BQUE7O2dCQU0yQixnQkFBZ0I7O0lBWDVDO1FBREMsS0FBSyxFQUFFO2tDQUNnQyxXQUFXO3lDQUFYLFdBQVc7Z0VBS2xEO0lBWlUscUJBQXFCO1FBSGpDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7U0FDOUIsQ0FBQzt5Q0FtQjRCLGdCQUFnQjtPQWxCakMscUJBQXFCLENBcUJqQztJQUFELDRCQUFDO0NBQUEsQUFyQkQsSUFxQkM7U0FyQlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21kYk5nVHJhbnNjbHVkZV0nXG59KVxuZXhwb3J0IGNsYXNzIE5nVHJhbnNjbHVkZURpcmVjdGl2ZSB7XG4gIHB1YmxpYyB2aWV3UmVmOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIHByb3RlY3RlZCBfdmlld1JlZjogVmlld0NvbnRhaW5lclJlZjtcbiAgcHJvdGVjdGVkIF9uZ1RyYW5zY2x1ZGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBtZGJOZ1RyYW5zY2x1ZGUodGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICB0aGlzLl9uZ1RyYW5zY2x1ZGUgPSB0ZW1wbGF0ZVJlZjtcbiAgICBpZiAodGVtcGxhdGVSZWYpIHtcbiAgICAgIHRoaXMudmlld1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGVtcGxhdGVSZWYpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWRiTmdUcmFuc2NsdWRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9uZ1RyYW5zY2x1ZGU7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3Iodmlld1JlZjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHRoaXMudmlld1JlZiA9IHZpZXdSZWY7XG4gIH1cbn1cbiJdfQ==