import { MdbCardFooterComponent } from './mdb-card-footer.component';
import { MdbCardTitleComponent } from './mdb-card-title.component';
import { MdbCardTextComponent } from './mdb-card-text.component';
import { MdbCardBodyComponent } from './mdb-card-body.component';
import { MdbCardComponent } from './mdb-card.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdbCardImageComponent } from './mdb-card-image.component';
import { MdbCardHeaderComponent } from './mdb-card-header.component';
export class CardsModule {
    static forRoot() {
        return { ngModule: CardsModule, providers: [] };
    }
}
CardsModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctdWlraXQtcHJvLXN0YW5kYXJkL3NyYy9saWIvZnJlZS9jYXJkcy9jYXJkcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBdUJyRSxNQUFNLE9BQU8sV0FBVztJQUNmLE1BQU0sQ0FBQyxPQUFPO1FBQ25CLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNsRCxDQUFDOzs7WUF4QkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsWUFBWSxFQUFFO29CQUNaLGdCQUFnQjtvQkFDaEIsb0JBQW9CO29CQUNwQixxQkFBcUI7b0JBQ3JCLG9CQUFvQjtvQkFDcEIscUJBQXFCO29CQUNyQixzQkFBc0I7b0JBQ3RCLHNCQUFzQjtpQkFDdkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGdCQUFnQjtvQkFDaEIsb0JBQW9CO29CQUNwQixxQkFBcUI7b0JBQ3JCLG9CQUFvQjtvQkFDcEIscUJBQXFCO29CQUNyQixzQkFBc0I7b0JBQ3RCLHNCQUFzQjtpQkFDdkI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1kYkNhcmRGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL21kYi1jYXJkLWZvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWRiQ2FyZFRpdGxlQ29tcG9uZW50IH0gZnJvbSAnLi9tZGItY2FyZC10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWRiQ2FyZFRleHRDb21wb25lbnQgfSBmcm9tICcuL21kYi1jYXJkLXRleHQuY29tcG9uZW50JztcbmltcG9ydCB7IE1kYkNhcmRCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi9tZGItY2FyZC1ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZGJDYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9tZGItY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZGJDYXJkSW1hZ2VDb21wb25lbnQgfSBmcm9tICcuL21kYi1jYXJkLWltYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZGJDYXJkSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9tZGItY2FyZC1oZWFkZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1kYkNhcmRDb21wb25lbnQsXG4gICAgTWRiQ2FyZEJvZHlDb21wb25lbnQsXG4gICAgTWRiQ2FyZEltYWdlQ29tcG9uZW50LFxuICAgIE1kYkNhcmRUZXh0Q29tcG9uZW50LFxuICAgIE1kYkNhcmRUaXRsZUNvbXBvbmVudCxcbiAgICBNZGJDYXJkRm9vdGVyQ29tcG9uZW50LFxuICAgIE1kYkNhcmRIZWFkZXJDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNZGJDYXJkQ29tcG9uZW50LFxuICAgIE1kYkNhcmRCb2R5Q29tcG9uZW50LFxuICAgIE1kYkNhcmRJbWFnZUNvbXBvbmVudCxcbiAgICBNZGJDYXJkVGV4dENvbXBvbmVudCxcbiAgICBNZGJDYXJkVGl0bGVDb21wb25lbnQsXG4gICAgTWRiQ2FyZEZvb3RlckNvbXBvbmVudCxcbiAgICBNZGJDYXJkSGVhZGVyQ29tcG9uZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJkc01vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPENhcmRzTW9kdWxlPiB7XG4gICAgcmV0dXJuIHsgbmdNb2R1bGU6IENhcmRzTW9kdWxlLCBwcm92aWRlcnM6IFtdIH07XG4gIH1cbn1cbiJdfQ==