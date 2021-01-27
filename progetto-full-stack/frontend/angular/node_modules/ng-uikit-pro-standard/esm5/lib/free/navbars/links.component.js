import { __decorate, __metadata } from "tslib";
import { NavbarService } from './navbar.service';
import { AfterContentInit, Component, ContentChildren, ElementRef, QueryList, EventEmitter, Output, Renderer2, } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
var LinksComponent = /** @class */ (function () {
    function LinksComponent(_navbarService, renderer) {
        this._navbarService = _navbarService;
        this.renderer = renderer;
        this.linkClick = new EventEmitter();
    }
    LinksComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.links.forEach(function (link) {
                _this.renderer.listen(link.nativeElement, 'click', function () {
                    _this._navbarService.setNavbarLinkClicks();
                });
            });
        }, 0);
    };
    LinksComponent.ctorParameters = function () { return [
        { type: NavbarService },
        { type: Renderer2 }
    ]; };
    __decorate([
        ContentChildren(RouterLinkWithHref, { read: ElementRef, descendants: true }),
        __metadata("design:type", QueryList)
    ], LinksComponent.prototype, "links", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], LinksComponent.prototype, "linkClick", void 0);
    LinksComponent = __decorate([
        Component({
            // tslint:disable-next-line:component-selector
            selector: 'links',
            template: "\n    <ng-content></ng-content>\n  "
        }),
        __metadata("design:paramtypes", [NavbarService, Renderer2])
    ], LinksComponent);
    return LinksComponent;
}());
export { LinksComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvbmF2YmFycy9saW5rcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVNyRDtJQU1FLHdCQUFvQixjQUE2QixFQUFVLFFBQW1CO1FBQTFELG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUZwRSxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUVtQyxDQUFDO0lBRWxGLDJDQUFrQixHQUFsQjtRQUFBLGlCQVFDO1FBUEMsVUFBVSxDQUFDO1lBQ1QsS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUE2QjtnQkFDL0MsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUU7b0JBQ2hELEtBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDNUMsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7O2dCQVZtQyxhQUFhO2dCQUFvQixTQUFTOztJQUo5RTtRQURDLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO2tDQUN0RSxTQUFTO2lEQUFhO0lBRW5CO1FBQVQsTUFBTSxFQUFFOztxREFBcUM7SUFKbkMsY0FBYztRQVAxQixTQUFTLENBQUM7WUFDVCw4Q0FBOEM7WUFDOUMsUUFBUSxFQUFFLE9BQU87WUFDakIsUUFBUSxFQUFFLHFDQUVUO1NBQ0YsQ0FBQzt5Q0FPb0MsYUFBYSxFQUFvQixTQUFTO09BTm5FLGNBQWMsQ0FpQjFCO0lBQUQscUJBQUM7Q0FBQSxBQWpCRCxJQWlCQztTQWpCWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmF2YmFyU2VydmljZSB9IGZyb20gJy4vbmF2YmFyLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIFF1ZXJ5TGlzdCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJMaW5rV2l0aEhyZWYgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2xpbmtzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIExpbmtzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oUm91dGVyTGlua1dpdGhIcmVmLCB7IHJlYWQ6IEVsZW1lbnRSZWYsIGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIGxpbmtzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgQE91dHB1dCgpIGxpbmtDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX25hdmJhclNlcnZpY2U6IE5hdmJhclNlcnZpY2UsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmxpbmtzLmZvckVhY2goKGxpbms6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGxpbmsubmF0aXZlRWxlbWVudCwgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX25hdmJhclNlcnZpY2Uuc2V0TmF2YmFyTGlua0NsaWNrcygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sIDApO1xuICB9XG59XG4iXX0=