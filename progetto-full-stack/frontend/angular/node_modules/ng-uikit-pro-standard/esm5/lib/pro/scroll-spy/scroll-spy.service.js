import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var ScrollSpyService = /** @class */ (function () {
    function ScrollSpyService() {
        this.scrollSpys = [];
        this.activeSubject = new Subject();
        this.active$ = this.activeSubject;
    }
    ScrollSpyService.prototype.addScrollSpy = function (scrollSpy) {
        this.scrollSpys.push(scrollSpy);
    };
    ScrollSpyService.prototype.removeScrollSpy = function (scrollSpyId) {
        var scrollSpyIndex = this.scrollSpys.findIndex(function (spy) {
            return spy.id === scrollSpyId;
        });
        this.scrollSpys.splice(scrollSpyIndex, 1);
    };
    ScrollSpyService.prototype.updateActiveState = function (scrollSpyId, activeLinkId) {
        var scrollSpy = this.scrollSpys.find(function (spy) {
            return spy.id === scrollSpyId;
        });
        if (!scrollSpy) {
            return;
        }
        var activeLink = scrollSpy.links.find(function (link) {
            return link.id === activeLinkId;
        });
        this.setActiveLink(activeLink);
    };
    ScrollSpyService.prototype.removeActiveState = function (scrollSpyId, activeLinkId) {
        var scrollSpy = this.scrollSpys.find(function (spy) {
            return spy.id === scrollSpyId;
        });
        if (!scrollSpy) {
            return;
        }
        var activeLink = scrollSpy.links.find(function (link) {
            return link.id === activeLinkId;
        });
        if (!activeLink) {
            return;
        }
        activeLink.active = false;
        activeLink.detectChanges();
    };
    ScrollSpyService.prototype.setActiveLink = function (activeLink) {
        if (activeLink) {
            activeLink.active = true;
            activeLink.detectChanges();
            this.activeSubject.next(activeLink);
        }
    };
    ScrollSpyService.prototype.removeActiveLinks = function (scrollSpyId) {
        var scrollSpy = this.scrollSpys.find(function (spy) {
            return spy.id === scrollSpyId;
        });
        if (!scrollSpy) {
            return;
        }
        scrollSpy.links.forEach(function (link) {
            link.active = false;
            link.detectChanges();
        });
    };
    ScrollSpyService = __decorate([
        Injectable()
    ], ScrollSpyService);
    return ScrollSpyService;
}());
export { ScrollSpyService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXNweS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9zY3JvbGwtc3B5L3Njcm9sbC1zcHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUV0RCxPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBUTNDO0lBQUE7UUFDVSxlQUFVLEdBQWdCLEVBQUUsQ0FBQztRQUU3QixrQkFBYSxHQUFHLElBQUksT0FBTyxFQUEwQixDQUFDO1FBQzlELFlBQU8sR0FBb0IsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQXdFaEQsQ0FBQztJQXRFQyx1Q0FBWSxHQUFaLFVBQWEsU0FBb0I7UUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELDBDQUFlLEdBQWYsVUFBZ0IsV0FBbUI7UUFDakMsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUUsVUFBQyxHQUFHO1lBQ3BELE9BQU8sR0FBRyxDQUFDLEVBQUUsS0FBSyxXQUFXLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELDRDQUFpQixHQUFqQixVQUFrQixXQUFtQixFQUFFLFlBQW9CO1FBQ3pELElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUN4QyxPQUFPLEdBQUcsQ0FBQyxFQUFFLEtBQUssV0FBVyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLE9BQU87U0FDUjtRQUVELElBQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTtZQUMxQyxPQUFPLElBQUksQ0FBQyxFQUFFLEtBQUssWUFBWSxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsNENBQWlCLEdBQWpCLFVBQWtCLFdBQW1CLEVBQUUsWUFBb0I7UUFDekQsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO1lBQ3hDLE9BQU8sR0FBRyxDQUFDLEVBQUUsS0FBSyxXQUFXLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsT0FBTztTQUNSO1FBRUQsSUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO1lBQzFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsS0FBSyxZQUFZLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsT0FBTztTQUNSO1FBRUQsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDMUIsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCx3Q0FBYSxHQUFiLFVBQWMsVUFBd0M7UUFDcEQsSUFBSSxVQUFVLEVBQUU7WUFDZCxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN6QixVQUFVLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBRUQsNENBQWlCLEdBQWpCLFVBQWtCLFdBQW1CO1FBQ25DLElBQU0sU0FBUyxHQUEwQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDL0QsT0FBTyxHQUFHLENBQUMsRUFBRSxLQUFLLFdBQVcsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZCxPQUFPO1NBQ1I7UUFFRCxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQTNFVSxnQkFBZ0I7UUFENUIsVUFBVSxFQUFFO09BQ0EsZ0JBQWdCLENBNEU1QjtJQUFELHVCQUFDO0NBQUEsQUE1RUQsSUE0RUM7U0E1RVksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTY3JvbGxTcHlMaW5rRGlyZWN0aXZlIH0gZnJvbSAnLi9zY3JvbGwtc3B5LWxpbmsuZGlyZWN0aXZlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBTY3JvbGxTcHkge1xuICBpZDogc3RyaW5nO1xuICBsaW5rczogUXVlcnlMaXN0PFNjcm9sbFNweUxpbmtEaXJlY3RpdmU+O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2Nyb2xsU3B5U2VydmljZSB7XG4gIHByaXZhdGUgc2Nyb2xsU3B5czogU2Nyb2xsU3B5W10gPSBbXTtcblxuICBwcml2YXRlIGFjdGl2ZVN1YmplY3QgPSBuZXcgU3ViamVjdDxTY3JvbGxTcHlMaW5rRGlyZWN0aXZlPigpO1xuICBhY3RpdmUkOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmFjdGl2ZVN1YmplY3Q7XG5cbiAgYWRkU2Nyb2xsU3B5KHNjcm9sbFNweTogU2Nyb2xsU3B5KSB7XG4gICAgdGhpcy5zY3JvbGxTcHlzLnB1c2goc2Nyb2xsU3B5KTtcbiAgfVxuXG4gIHJlbW92ZVNjcm9sbFNweShzY3JvbGxTcHlJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Nyb2xsU3B5SW5kZXggPSB0aGlzLnNjcm9sbFNweXMuZmluZEluZGV4KCAoc3B5KSA9PiB7XG4gICAgICByZXR1cm4gc3B5LmlkID09PSBzY3JvbGxTcHlJZDtcbiAgICB9KTtcbiAgICB0aGlzLnNjcm9sbFNweXMuc3BsaWNlKHNjcm9sbFNweUluZGV4LCAxKTtcbiAgfVxuXG4gIHVwZGF0ZUFjdGl2ZVN0YXRlKHNjcm9sbFNweUlkOiBzdHJpbmcsIGFjdGl2ZUxpbmtJZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Nyb2xsU3B5ID0gdGhpcy5zY3JvbGxTcHlzLmZpbmQoc3B5ID0+IHtcbiAgICAgIHJldHVybiBzcHkuaWQgPT09IHNjcm9sbFNweUlkO1xuICAgIH0pO1xuXG4gICAgaWYgKCFzY3JvbGxTcHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmVMaW5rID0gc2Nyb2xsU3B5LmxpbmtzLmZpbmQobGluayA9PiB7XG4gICAgICByZXR1cm4gbGluay5pZCA9PT0gYWN0aXZlTGlua0lkO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZXRBY3RpdmVMaW5rKGFjdGl2ZUxpbmspO1xuICB9XG5cbiAgcmVtb3ZlQWN0aXZlU3RhdGUoc2Nyb2xsU3B5SWQ6IHN0cmluZywgYWN0aXZlTGlua0lkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzY3JvbGxTcHkgPSB0aGlzLnNjcm9sbFNweXMuZmluZChzcHkgPT4ge1xuICAgICAgcmV0dXJuIHNweS5pZCA9PT0gc2Nyb2xsU3B5SWQ7XG4gICAgfSk7XG5cbiAgICBpZiAoIXNjcm9sbFNweSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2ZUxpbmsgPSBzY3JvbGxTcHkubGlua3MuZmluZChsaW5rID0+IHtcbiAgICAgIHJldHVybiBsaW5rLmlkID09PSBhY3RpdmVMaW5rSWQ7XG4gICAgfSk7XG5cbiAgICBpZiAoIWFjdGl2ZUxpbmspIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhY3RpdmVMaW5rLmFjdGl2ZSA9IGZhbHNlO1xuICAgIGFjdGl2ZUxpbmsuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgc2V0QWN0aXZlTGluayhhY3RpdmVMaW5rOiBTY3JvbGxTcHlMaW5rRGlyZWN0aXZlIHwgYW55KSB7XG4gICAgaWYgKGFjdGl2ZUxpbmspIHtcbiAgICAgIGFjdGl2ZUxpbmsuYWN0aXZlID0gdHJ1ZTtcbiAgICAgIGFjdGl2ZUxpbmsuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5hY3RpdmVTdWJqZWN0Lm5leHQoYWN0aXZlTGluayk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQWN0aXZlTGlua3Moc2Nyb2xsU3B5SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNjcm9sbFNweTogU2Nyb2xsU3B5IHwgdW5kZWZpbmVkID0gdGhpcy5zY3JvbGxTcHlzLmZpbmQoc3B5ID0+IHtcbiAgICAgIHJldHVybiBzcHkuaWQgPT09IHNjcm9sbFNweUlkO1xuICAgIH0pO1xuXG4gICAgaWYgKCFzY3JvbGxTcHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzY3JvbGxTcHkubGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgIGxpbmsuYWN0aXZlID0gZmFsc2U7XG4gICAgICBsaW5rLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgfVxufVxuIl19