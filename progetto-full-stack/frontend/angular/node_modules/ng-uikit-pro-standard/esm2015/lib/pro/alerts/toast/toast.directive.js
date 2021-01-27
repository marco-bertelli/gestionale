import { NgModule, Directive, ElementRef } from '@angular/core';
export class ToastContainerDirective {
    constructor(el) {
        this.el = el;
    }
    getContainerElement() {
        return this.el.nativeElement;
    }
}
ToastContainerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mdbToastContainer]',
                exportAs: 'mdb-toast-container',
            },] }
];
ToastContainerDirective.ctorParameters = () => [
    { type: ElementRef }
];
export class ToastContainerModule {
    static forRoot() {
        return {
            ngModule: ToastContainerModule,
            providers: [],
        };
    }
}
ToastContainerModule.decorators = [
    { type: NgModule, args: [{
                exports: [ToastContainerDirective],
                declarations: [ToastContainerDirective],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctdWlraXQtcHJvLXN0YW5kYXJkL3NyYy9saWIvcHJvL2FsZXJ0cy90b2FzdC90b2FzdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU1yRixNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDLFlBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0lBQUcsQ0FBQztJQUN0QyxtQkFBbUI7UUFDakIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUMvQixDQUFDOzs7WUFSRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFLHFCQUFxQjthQUNoQzs7O1lBTGtELFVBQVU7O0FBaUI3RCxNQUFNLE9BQU8sb0JBQW9CO0lBQy9CLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsU0FBUyxFQUFFLEVBQUU7U0FDZCxDQUFDO0lBQ0osQ0FBQzs7O1lBVkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLHVCQUF1QixDQUFDO2dCQUNsQyxZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQzthQUN4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21kYlRvYXN0Q29udGFpbmVyXScsXG4gIGV4cG9ydEFzOiAnbWRiLXRvYXN0LWNvbnRhaW5lcicsXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cbiAgZ2V0Q29udGFpbmVyRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbVG9hc3RDb250YWluZXJEaXJlY3RpdmVdLFxuICBkZWNsYXJhdGlvbnM6IFtUb2FzdENvbnRhaW5lckRpcmVjdGl2ZV0sXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0Q29udGFpbmVyTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxUb2FzdENvbnRhaW5lck1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVG9hc3RDb250YWluZXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==