import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
export class NgTranscludeDirective {
    constructor(viewRef) {
        this.viewRef = viewRef;
    }
    set mdbNgTransclude(templateRef) {
        this._ngTransclude = templateRef;
        if (templateRef) {
            this.viewRef.createEmbeddedView(templateRef);
        }
    }
    get mdbNgTransclude() {
        return this._ngTransclude;
    }
}
NgTranscludeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mdbNgTransclude]'
            },] }
];
NgTranscludeDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
NgTranscludeDirective.propDecorators = {
    mdbNgTransclude: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNjbHVkZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy11aWtpdC1wcm8tc3RhbmRhcmQvc3JjL2xpYi9wcm8vdGFicy1waWxscy90cmFuc2NsdWRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLaEYsTUFBTSxPQUFPLHFCQUFxQjtJQWtCaEMsWUFBbUIsT0FBeUI7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQWRELElBQ1csZUFBZSxDQUFDLFdBQTZCO1FBQ3RELElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDO1FBQ2pDLElBQUksV0FBVyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7SUFFRCxJQUFXLGVBQWU7UUFDeEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7OztZQW5CRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjthQUM5Qjs7O1lBSnVDLGdCQUFnQjs7OzhCQVdyRCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21kYk5nVHJhbnNjbHVkZV0nXG59KVxuZXhwb3J0IGNsYXNzIE5nVHJhbnNjbHVkZURpcmVjdGl2ZSB7XG4gIHB1YmxpYyB2aWV3UmVmOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIHByb3RlY3RlZCBfdmlld1JlZjogVmlld0NvbnRhaW5lclJlZjtcbiAgcHJvdGVjdGVkIF9uZ1RyYW5zY2x1ZGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBtZGJOZ1RyYW5zY2x1ZGUodGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICB0aGlzLl9uZ1RyYW5zY2x1ZGUgPSB0ZW1wbGF0ZVJlZjtcbiAgICBpZiAodGVtcGxhdGVSZWYpIHtcbiAgICAgIHRoaXMudmlld1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGVtcGxhdGVSZWYpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWRiTmdUcmFuc2NsdWRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9uZ1RyYW5zY2x1ZGU7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3Iodmlld1JlZjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHRoaXMudmlld1JlZiA9IHZpZXdSZWY7XG4gIH1cbn1cbiJdfQ==