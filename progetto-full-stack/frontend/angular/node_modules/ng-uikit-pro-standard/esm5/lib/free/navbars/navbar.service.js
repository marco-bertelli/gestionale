import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var NavbarService = /** @class */ (function () {
    function NavbarService() {
        this.navbarLinkClicks = new Subject();
    }
    NavbarService.prototype.getNavbarLinkClicks = function () {
        return this.navbarLinkClicks.asObservable();
    };
    NavbarService.prototype.setNavbarLinkClicks = function () {
        this.navbarLinkClicks.next();
    };
    NavbarService = __decorate([
        Injectable()
    ], NavbarService);
    return NavbarService;
}());
export { NavbarService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvZnJlZS9uYXZiYXJzL25hdmJhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFHM0M7SUFBQTtRQUNVLHFCQUFnQixHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7SUFTaEQsQ0FBQztJQVBDLDJDQUFtQixHQUFuQjtRQUNFLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRCwyQ0FBbUIsR0FBbkI7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQVRVLGFBQWE7UUFEekIsVUFBVSxFQUFFO09BQ0EsYUFBYSxDQVV6QjtJQUFELG9CQUFDO0NBQUEsQUFWRCxJQVVDO1NBVlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5hdmJhclNlcnZpY2Uge1xuICBwcml2YXRlIG5hdmJhckxpbmtDbGlja3MgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgZ2V0TmF2YmFyTGlua0NsaWNrcygpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLm5hdmJhckxpbmtDbGlja3MuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBzZXROYXZiYXJMaW5rQ2xpY2tzKCkge1xuICAgIHRoaXMubmF2YmFyTGlua0NsaWNrcy5uZXh0KCk7XG4gIH1cbn1cbiJdfQ==