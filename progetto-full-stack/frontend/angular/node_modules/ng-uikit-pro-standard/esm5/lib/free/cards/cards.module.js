import { __decorate } from "tslib";
import { MdbCardFooterComponent } from './mdb-card-footer.component';
import { MdbCardTitleComponent } from './mdb-card-title.component';
import { MdbCardTextComponent } from './mdb-card-text.component';
import { MdbCardBodyComponent } from './mdb-card-body.component';
import { MdbCardComponent } from './mdb-card.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdbCardImageComponent } from './mdb-card-image.component';
import { MdbCardHeaderComponent } from './mdb-card-header.component';
var CardsModule = /** @class */ (function () {
    function CardsModule() {
    }
    CardsModule_1 = CardsModule;
    CardsModule.forRoot = function () {
        return { ngModule: CardsModule_1, providers: [] };
    };
    var CardsModule_1;
    CardsModule = CardsModule_1 = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [
                MdbCardComponent,
                MdbCardBodyComponent,
                MdbCardImageComponent,
                MdbCardTextComponent,
                MdbCardTitleComponent,
                MdbCardFooterComponent,
                MdbCardHeaderComponent,
            ],
            exports: [
                MdbCardComponent,
                MdbCardBodyComponent,
                MdbCardImageComponent,
                MdbCardTextComponent,
                MdbCardTitleComponent,
                MdbCardFooterComponent,
                MdbCardHeaderComponent,
            ],
        })
    ], CardsModule);
    return CardsModule;
}());
export { CardsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvY2FyZHMvY2FyZHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbkUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUF1QnJFO0lBQUE7SUFJQSxDQUFDO29CQUpZLFdBQVc7SUFDUixtQkFBTyxHQUFyQjtRQUNFLE9BQU8sRUFBRSxRQUFRLEVBQUUsYUFBVyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNsRCxDQUFDOztJQUhVLFdBQVc7UUFyQnZCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixZQUFZLEVBQUU7Z0JBQ1osZ0JBQWdCO2dCQUNoQixvQkFBb0I7Z0JBQ3BCLHFCQUFxQjtnQkFDckIsb0JBQW9CO2dCQUNwQixxQkFBcUI7Z0JBQ3JCLHNCQUFzQjtnQkFDdEIsc0JBQXNCO2FBQ3ZCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGdCQUFnQjtnQkFDaEIsb0JBQW9CO2dCQUNwQixxQkFBcUI7Z0JBQ3JCLG9CQUFvQjtnQkFDcEIscUJBQXFCO2dCQUNyQixzQkFBc0I7Z0JBQ3RCLHNCQUFzQjthQUN2QjtTQUNGLENBQUM7T0FDVyxXQUFXLENBSXZCO0lBQUQsa0JBQUM7Q0FBQSxBQUpELElBSUM7U0FKWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWRiQ2FyZEZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4vbWRiLWNhcmQtZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZGJDYXJkVGl0bGVDb21wb25lbnQgfSBmcm9tICcuL21kYi1jYXJkLXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZGJDYXJkVGV4dENvbXBvbmVudCB9IGZyb20gJy4vbWRiLWNhcmQtdGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWRiQ2FyZEJvZHlDb21wb25lbnQgfSBmcm9tICcuL21kYi1jYXJkLWJvZHkuY29tcG9uZW50JztcbmltcG9ydCB7IE1kYkNhcmRDb21wb25lbnQgfSBmcm9tICcuL21kYi1jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1kYkNhcmRJbWFnZUNvbXBvbmVudCB9IGZyb20gJy4vbWRiLWNhcmQtaW1hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IE1kYkNhcmRIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL21kYi1jYXJkLWhlYWRlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWRiQ2FyZENvbXBvbmVudCxcbiAgICBNZGJDYXJkQm9keUNvbXBvbmVudCxcbiAgICBNZGJDYXJkSW1hZ2VDb21wb25lbnQsXG4gICAgTWRiQ2FyZFRleHRDb21wb25lbnQsXG4gICAgTWRiQ2FyZFRpdGxlQ29tcG9uZW50LFxuICAgIE1kYkNhcmRGb290ZXJDb21wb25lbnQsXG4gICAgTWRiQ2FyZEhlYWRlckNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE1kYkNhcmRDb21wb25lbnQsXG4gICAgTWRiQ2FyZEJvZHlDb21wb25lbnQsXG4gICAgTWRiQ2FyZEltYWdlQ29tcG9uZW50LFxuICAgIE1kYkNhcmRUZXh0Q29tcG9uZW50LFxuICAgIE1kYkNhcmRUaXRsZUNvbXBvbmVudCxcbiAgICBNZGJDYXJkRm9vdGVyQ29tcG9uZW50LFxuICAgIE1kYkNhcmRIZWFkZXJDb21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENhcmRzTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q2FyZHNNb2R1bGU+IHtcbiAgICByZXR1cm4geyBuZ01vZHVsZTogQ2FyZHNNb2R1bGUsIHByb3ZpZGVyczogW10gfTtcbiAgfVxufVxuIl19