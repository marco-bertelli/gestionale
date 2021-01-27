import { __decorate } from "tslib";
import { LinksComponent } from './links.component';
import { LogoComponent } from './logo.component';
import { NavbarService } from './navbar.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { NavlinksComponent } from './navlinks.component';
var NavbarModule = /** @class */ (function () {
    function NavbarModule() {
    }
    NavbarModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [NavbarComponent, LinksComponent, LogoComponent, NavlinksComponent],
            exports: [NavbarComponent, LinksComponent, LogoComponent, NavlinksComponent],
            providers: [NavbarService]
        })
    ], NavbarModule);
    return NavbarModule;
}());
export { NavbarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9mcmVlL25hdmJhcnMvbmF2YmFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBT3pEO0lBQUE7SUFBMkIsQ0FBQztJQUFmLFlBQVk7UUFOeEIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixDQUFDO1lBQ2pGLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUcsYUFBYSxFQUFFLGlCQUFpQixDQUFDO1lBQzdFLFNBQVMsRUFBRSxDQUFDLGFBQWEsQ0FBQztTQUMzQixDQUFDO09BQ1csWUFBWSxDQUFHO0lBQUQsbUJBQUM7Q0FBQSxBQUE1QixJQUE0QjtTQUFmLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaW5rc0NvbXBvbmVudCB9IGZyb20gJy4vbGlua3MuY29tcG9uZW50JztcbmltcG9ydCB7IExvZ29Db21wb25lbnQgfSBmcm9tICcuL2xvZ28uY29tcG9uZW50JztcbmltcG9ydCB7IE5hdmJhclNlcnZpY2UgfSBmcm9tICcuL25hdmJhci5zZXJ2aWNlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05hdmJhckNvbXBvbmVudH0gZnJvbSAnLi9uYXZiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5hdmxpbmtzQ29tcG9uZW50IH0gZnJvbSAnLi9uYXZsaW5rcy5jb21wb25lbnQnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05hdmJhckNvbXBvbmVudCwgTGlua3NDb21wb25lbnQsIExvZ29Db21wb25lbnQsIE5hdmxpbmtzQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW05hdmJhckNvbXBvbmVudCwgTGlua3NDb21wb25lbnQgLCBMb2dvQ29tcG9uZW50LCBOYXZsaW5rc0NvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW05hdmJhclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE5hdmJhck1vZHVsZSB7fVxuIl19