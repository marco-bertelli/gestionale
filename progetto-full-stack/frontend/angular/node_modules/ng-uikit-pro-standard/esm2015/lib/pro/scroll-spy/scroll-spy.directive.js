import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewEncapsulation, } from '@angular/core';
import { ScrollSpyLinkDirective } from './scroll-spy-link.directive';
import { ScrollSpyService } from './scroll-spy.service';
import { distinctUntilChanged } from 'rxjs/operators';
// tslint:disable-next-line:component-class-suffix
export class ScrollSpyDirective {
    constructor(scrollSpyService) {
        this.scrollSpyService = scrollSpyService;
        this.activeLinkChange = new EventEmitter();
    }
    get id() {
        return this._id;
    }
    set id(newId) {
        if (newId) {
            this._id = newId;
        }
    }
    ngOnInit() {
        this.activeSub = this.scrollSpyService.active$
            .pipe(distinctUntilChanged())
            .subscribe(activeLink => {
            this.activeLinkChange.emit(activeLink);
        });
    }
    ngAfterContentInit() {
        this.scrollSpyService.addScrollSpy({ id: this.id, links: this.links });
    }
    ngOnDestroy() {
        this.scrollSpyService.removeScrollSpy(this.id);
        this.activeSub.unsubscribe();
    }
}
ScrollSpyDirective.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[mdbScrollSpy]',
                template: '<ng-content></ng-content>',
                encapsulation: ViewEncapsulation.None,
                styles: [".nav-pills.default-pills .nav-item a{border-radius:0;color:#666;text-align:left}.nav-pills.default-pills .nav-item a:hover{background-color:transparent;border-left:.0625rem solid #45526e;color:#45526e;font-weight:500}.nav-pills.default-pills .nav-item a.active{border-left:.125rem solid #45526e;box-shadow:none}.nav-pills.default-pills .nav-item a.active,.nav-pills.default-pills .nav-item a.active:active,.nav-pills.default-pills .nav-item a.active:focus,.nav-pills.default-pills .nav-item a.active:hover{background-color:transparent;color:#45526e;font-weight:500}.nav-pills .nav-item+.nav-item{margin-left:0}@media only screen and (max-width:991px){.sticky,.sticky-placeholder{display:none}}#scrollspy{width:100%}@media only screen and (max-width:992px){.col-lg-4 .sticky,.col-md-4 .sticky,.col-xl-4 .sticky{width:12.5rem}}@media only screen and (min-width:992px){.col-md-4 .sticky .col-lg-4 .sticky,.col-xl-4 .sticky{width:25rem}}@media only screen and (min-width:1200px){.col-md-4 .sticky{width:18.75rem}}@media only screen and (min-width:1440px){.col-md-4 .sticky{width:21.875rem}}.dotted-scrollspy{background:rgba(0,0,0,.55);border-radius:.125rem 0 0 .125rem;display:block;position:fixed;right:0;top:50%;transform:translateY(-50%)}.dotted-scrollspy li{display:block;padding:0 1rem}.dotted-scrollspy li:first-child{padding-top:.625rem}.dotted-scrollspy li:last-child{padding-bottom:.625rem}.dotted-scrollspy li a{padding:.5rem}.dotted-scrollspy li a span{background-color:hsla(0,0%,100%,.54);border-radius:50%;display:block;height:.5rem;width:.5rem}.dotted-scrollspy li a.active span{background:#fff}.scrollspy-example{height:12.5rem;overflow-y:scroll;padding:1rem;position:relative}.flex-column .nav-link{padding:.5rem 1rem!important}"]
            },] }
];
ScrollSpyDirective.ctorParameters = () => [
    { type: ScrollSpyService }
];
ScrollSpyDirective.propDecorators = {
    links: [{ type: ContentChildren, args: [ScrollSpyLinkDirective, { descendants: true },] }],
    id: [{ type: Input, args: ['mdbScrollSpy',] }],
    activeLinkChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXNweS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy11aWtpdC1wcm8tc3RhbmRhcmQvc3JjL2xpYi9wcm8vc2Nyb2xsLXNweS9zY3JvbGwtc3B5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULGVBQWUsRUFDZixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBVXRELGtEQUFrRDtBQUNsRCxNQUFNLE9BQU8sa0JBQWtCO0lBcUI3QixZQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUo1QyxxQkFBZ0IsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUlmLENBQUM7SUFqQjFELElBQ0ksRUFBRTtRQUNKLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxFQUFFLENBQUMsS0FBYTtRQUNsQixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQVVELFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPO2FBQzNDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQzVCLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQixDQUFDOzs7WUE5Q0YsU0FBUyxTQUFDO2dCQUNULDhDQUE4QztnQkFDOUMsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLDJCQUEyQjtnQkFFckMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7WUFWUSxnQkFBZ0I7OztvQkFhdEIsZUFBZSxTQUFDLHNCQUFzQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtpQkFHN0QsS0FBSyxTQUFDLGNBQWM7K0JBYXBCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTY3JvbGxTcHlMaW5rRGlyZWN0aXZlIH0gZnJvbSAnLi9zY3JvbGwtc3B5LWxpbmsuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjcm9sbFNweVNlcnZpY2UgfSBmcm9tICcuL3Njcm9sbC1zcHkuc2VydmljZSc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1ttZGJTY3JvbGxTcHldJyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgc3R5bGVVcmxzOiBbJy4vc2Nyb2xsLXNweS1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgU2Nyb2xsU3B5RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBAQ29udGVudENoaWxkcmVuKFNjcm9sbFNweUxpbmtEaXJlY3RpdmUsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgbGlua3M6IFF1ZXJ5TGlzdDxTY3JvbGxTcHlMaW5rRGlyZWN0aXZlPjtcblxuICBASW5wdXQoJ21kYlNjcm9sbFNweScpXG4gIGdldCBpZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuXG4gIHNldCBpZChuZXdJZDogc3RyaW5nKSB7XG4gICAgaWYgKG5ld0lkKSB7XG4gICAgICB0aGlzLl9pZCA9IG5ld0lkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2lkOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGFjdGl2ZUxpbmtDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgYWN0aXZlU3ViOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzY3JvbGxTcHlTZXJ2aWNlOiBTY3JvbGxTcHlTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWN0aXZlU3ViID0gdGhpcy5zY3JvbGxTcHlTZXJ2aWNlLmFjdGl2ZSRcbiAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gICAgICAuc3Vic2NyaWJlKGFjdGl2ZUxpbmsgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2ZUxpbmtDaGFuZ2UuZW1pdChhY3RpdmVMaW5rKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuc2Nyb2xsU3B5U2VydmljZS5hZGRTY3JvbGxTcHkoeyBpZDogdGhpcy5pZCwgbGlua3M6IHRoaXMubGlua3MgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnNjcm9sbFNweVNlcnZpY2UucmVtb3ZlU2Nyb2xsU3B5KHRoaXMuaWQpO1xuICAgIHRoaXMuYWN0aXZlU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==