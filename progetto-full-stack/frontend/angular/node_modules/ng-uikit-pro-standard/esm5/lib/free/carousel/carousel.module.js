import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselComponent } from './carousel.component';
import { SlideComponent } from './slide.component';
import { CarouselConfig } from './carousel.config';
import { ButtonsModule } from '../buttons/buttons.module';
var CarouselModule = /** @class */ (function () {
    function CarouselModule() {
    }
    CarouselModule_1 = CarouselModule;
    CarouselModule.forRoot = function () {
        return { ngModule: CarouselModule_1, providers: [] };
    };
    var CarouselModule_1;
    CarouselModule = CarouselModule_1 = __decorate([
        NgModule({
            imports: [CommonModule, ButtonsModule],
            declarations: [SlideComponent, CarouselComponent],
            exports: [SlideComponent, CarouselComponent],
            providers: [CarouselConfig],
        })
    ], CarouselModule);
    return CarouselModule;
}());
export { CarouselModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvY2Fyb3VzZWwvY2Fyb3VzZWwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFRMUQ7SUFBQTtJQUlBLENBQUM7dUJBSlksY0FBYztJQUNYLHNCQUFPLEdBQXJCO1FBQ0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxnQkFBYyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNyRCxDQUFDOztJQUhVLGNBQWM7UUFOMUIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQztZQUN0QyxZQUFZLEVBQUUsQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUM7WUFDakQsT0FBTyxFQUFFLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDO1lBQzVDLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQztTQUM1QixDQUFDO09BQ1csY0FBYyxDQUkxQjtJQUFELHFCQUFDO0NBQUEsQUFKRCxJQUlDO1NBSlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDYXJvdXNlbENvbXBvbmVudCB9IGZyb20gJy4vY2Fyb3VzZWwuY29tcG9uZW50JztcbmltcG9ydCB7IFNsaWRlQ29tcG9uZW50IH0gZnJvbSAnLi9zbGlkZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxDb25maWcgfSBmcm9tICcuL2Nhcm91c2VsLmNvbmZpZyc7XG5pbXBvcnQgeyBCdXR0b25zTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9ucy9idXR0b25zLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEJ1dHRvbnNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtTbGlkZUNvbXBvbmVudCwgQ2Fyb3VzZWxDb21wb25lbnRdLFxuICBleHBvcnRzOiBbU2xpZGVDb21wb25lbnQsIENhcm91c2VsQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbQ2Fyb3VzZWxDb25maWddLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbE1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPENhcm91c2VsTW9kdWxlPiB7XG4gICAgcmV0dXJuIHsgbmdNb2R1bGU6IENhcm91c2VsTW9kdWxlLCBwcm92aWRlcnM6IFtdIH07XG4gIH1cbn1cbiJdfQ==