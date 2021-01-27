import { __decorate, __metadata } from "tslib";
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewEncapsulation, } from '@angular/core';
import { ScrollSpyLinkDirective } from './scroll-spy-link.directive';
import { ScrollSpyService } from './scroll-spy.service';
import { distinctUntilChanged } from 'rxjs/operators';
var ScrollSpyDirective = /** @class */ (function () {
    function ScrollSpyDirective(scrollSpyService) {
        this.scrollSpyService = scrollSpyService;
        this.activeLinkChange = new EventEmitter();
    }
    Object.defineProperty(ScrollSpyDirective.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (newId) {
            if (newId) {
                this._id = newId;
            }
        },
        enumerable: true,
        configurable: true
    });
    ScrollSpyDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.activeSub = this.scrollSpyService.active$
            .pipe(distinctUntilChanged())
            .subscribe(function (activeLink) {
            _this.activeLinkChange.emit(activeLink);
        });
    };
    ScrollSpyDirective.prototype.ngAfterContentInit = function () {
        this.scrollSpyService.addScrollSpy({ id: this.id, links: this.links });
    };
    ScrollSpyDirective.prototype.ngOnDestroy = function () {
        this.scrollSpyService.removeScrollSpy(this.id);
        this.activeSub.unsubscribe();
    };
    ScrollSpyDirective.ctorParameters = function () { return [
        { type: ScrollSpyService }
    ]; };
    __decorate([
        ContentChildren(ScrollSpyLinkDirective, { descendants: true }),
        __metadata("design:type", QueryList)
    ], ScrollSpyDirective.prototype, "links", void 0);
    __decorate([
        Input('mdbScrollSpy'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ScrollSpyDirective.prototype, "id", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ScrollSpyDirective.prototype, "activeLinkChange", void 0);
    ScrollSpyDirective = __decorate([
        Component({
            // tslint:disable-next-line:component-selector
            selector: '[mdbScrollSpy]',
            template: '<ng-content></ng-content>',
            encapsulation: ViewEncapsulation.None,
            styles: [".nav-pills.default-pills .nav-item a{text-align:left;color:#666;border-radius:0}.nav-pills.default-pills .nav-item a:hover{background-color:transparent;color:#45526e;border-left:.0625rem solid #45526e;font-weight:500}.nav-pills.default-pills .nav-item a.active{background-color:transparent;color:#45526e;border-left:.125rem solid #45526e;box-shadow:none;font-weight:500}.nav-pills.default-pills .nav-item a.active:active,.nav-pills.default-pills .nav-item a.active:focus,.nav-pills.default-pills .nav-item a.active:hover{background-color:transparent;color:#45526e;font-weight:500}.nav-pills .nav-item+.nav-item{margin-left:0}@media only screen and (max-width:991px){.sticky,.sticky-placeholder{display:none}}#scrollspy{width:100%}@media only screen and (max-width:992px){.col-lg-4 .sticky,.col-md-4 .sticky,.col-xl-4 .sticky{width:12.5rem}}@media only screen and (min-width:992px){.col-md-4 .sticky .col-lg-4 .sticky,.col-xl-4 .sticky{width:25rem}}@media only screen and (min-width:1200px){.col-md-4 .sticky{width:18.75rem}}@media only screen and (min-width:1440px){.col-md-4 .sticky{width:21.875rem}}.dotted-scrollspy{display:block;position:fixed;top:50%;right:0;transform:translateY(-50%);background:rgba(0,0,0,.55);border-radius:.125rem 0 0 .125rem}.dotted-scrollspy li{display:block;padding:0 1rem}.dotted-scrollspy li:first-child{padding-top:.625rem}.dotted-scrollspy li:last-child{padding-bottom:.625rem}.dotted-scrollspy li a{padding:.5rem}.dotted-scrollspy li a span{display:block;background-color:rgba(255,255,255,.54);width:.5rem;height:.5rem;border-radius:50%}.dotted-scrollspy li a.active span{background:#fff}.scrollspy-example{overflow-y:scroll;position:relative;height:12.5rem;padding:1rem}.flex-column .nav-link{padding:.5rem 1rem!important}"]
        })
        // tslint:disable-next-line:component-class-suffix
        ,
        __metadata("design:paramtypes", [ScrollSpyService])
    ], ScrollSpyDirective);
    return ScrollSpyDirective;
}());
export { ScrollSpyDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXNweS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL3Njcm9sbC1zcHkvc2Nyb2xsLXNweS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDckUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFXdEQ7SUFxQkUsNEJBQW9CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBSjVDLHFCQUFnQixHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO0lBSWYsQ0FBQztJQWhCMUQsc0JBQUksa0NBQUU7YUFBTjtZQUNFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNsQixDQUFDO2FBRUQsVUFBTyxLQUFhO1lBQ2xCLElBQUksS0FBSyxFQUFFO2dCQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO2FBQ2xCO1FBQ0gsQ0FBQzs7O09BTkE7SUFnQkQscUNBQVEsR0FBUjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTzthQUMzQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzthQUM1QixTQUFTLENBQUMsVUFBQSxVQUFVO1lBQ25CLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsK0NBQWtCLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsd0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7Z0JBakJxQyxnQkFBZ0I7O0lBbkJ0RDtRQURDLGVBQWUsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztrQ0FDeEQsU0FBUztxREFBeUI7SUFHekM7UUFEQyxLQUFLLENBQUMsY0FBYyxDQUFDOzs7Z0RBR3JCO0lBVVM7UUFBVCxNQUFNLEVBQUU7a0NBQW1CLFlBQVk7Z0VBQWdDO0lBakI3RCxrQkFBa0I7UUFSOUIsU0FBUyxDQUFDO1lBQ1QsOENBQThDO1lBQzlDLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsUUFBUSxFQUFFLDJCQUEyQjtZQUVyQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7U0FDdEMsQ0FBQztRQUNGLGtEQUFrRDs7eUNBc0JWLGdCQUFnQjtPQXJCM0Msa0JBQWtCLENBdUM5QjtJQUFELHlCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7U0F2Q1ksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2Nyb2xsU3B5TGlua0RpcmVjdGl2ZSB9IGZyb20gJy4vc2Nyb2xsLXNweS1saW5rLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTY3JvbGxTcHlTZXJ2aWNlIH0gZnJvbSAnLi9zY3JvbGwtc3B5LnNlcnZpY2UnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbbWRiU2Nyb2xsU3B5XScsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIHN0eWxlVXJsczogWycuL3Njcm9sbC1zcHktbW9kdWxlLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIFNjcm9sbFNweURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQENvbnRlbnRDaGlsZHJlbihTY3JvbGxTcHlMaW5rRGlyZWN0aXZlLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIGxpbmtzOiBRdWVyeUxpc3Q8U2Nyb2xsU3B5TGlua0RpcmVjdGl2ZT47XG5cbiAgQElucHV0KCdtZGJTY3JvbGxTcHknKVxuICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICBzZXQgaWQobmV3SWQ6IHN0cmluZykge1xuICAgIGlmIChuZXdJZCkge1xuICAgICAgdGhpcy5faWQgPSBuZXdJZDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pZDogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBhY3RpdmVMaW5rQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGFjdGl2ZVN1YjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2Nyb2xsU3B5U2VydmljZTogU2Nyb2xsU3B5U2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFjdGl2ZVN1YiA9IHRoaXMuc2Nyb2xsU3B5U2VydmljZS5hY3RpdmUkXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxuICAgICAgLnN1YnNjcmliZShhY3RpdmVMaW5rID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmVMaW5rQ2hhbmdlLmVtaXQoYWN0aXZlTGluayk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLnNjcm9sbFNweVNlcnZpY2UuYWRkU2Nyb2xsU3B5KHsgaWQ6IHRoaXMuaWQsIGxpbmtzOiB0aGlzLmxpbmtzIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zY3JvbGxTcHlTZXJ2aWNlLnJlbW92ZVNjcm9sbFNweSh0aGlzLmlkKTtcbiAgICB0aGlzLmFjdGl2ZVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=