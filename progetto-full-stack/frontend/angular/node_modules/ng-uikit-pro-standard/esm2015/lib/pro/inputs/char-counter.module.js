import { NgModule } from '@angular/core';
import { CharCounterDirective } from './char-counter.directive';
export class CharCounterModule {
    static forRoot() {
        return { ngModule: CharCounterModule, providers: [] };
    }
}
CharCounterModule.decorators = [
    { type: NgModule, args: [{
                declarations: [CharCounterDirective],
                exports: [CharCounterDirective],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhci1jb3VudGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXVpa2l0LXByby1zdGFuZGFyZC9zcmMvbGliL3Byby9pbnB1dHMvY2hhci1jb3VudGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU1oRSxNQUFNLE9BQU8saUJBQWlCO0lBQ3JCLE1BQU0sQ0FBQyxPQUFPO1FBQ25CLE9BQU8sRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3hELENBQUM7OztZQVBGLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDcEMsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7YUFDaEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hhckNvdW50ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2NoYXItY291bnRlci5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtDaGFyQ291bnRlckRpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtDaGFyQ291bnRlckRpcmVjdGl2ZV0sXG59KVxuZXhwb3J0IGNsYXNzIENoYXJDb3VudGVyTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q2hhckNvdW50ZXJNb2R1bGU+IHtcbiAgICByZXR1cm4geyBuZ01vZHVsZTogQ2hhckNvdW50ZXJNb2R1bGUsIHByb3ZpZGVyczogW10gfTtcbiAgfVxufVxuIl19