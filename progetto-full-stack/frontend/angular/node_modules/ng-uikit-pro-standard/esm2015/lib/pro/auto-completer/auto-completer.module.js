import { NgModule } from '@angular/core';
import { MdbAutoCompleterComponent } from './components/mdb-auto-completer.component';
import { MdbOptionComponent } from './components/mdb-option.component';
import { MdbAutoCompleterDirective } from './directives/mdb-auto-completer.directive';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MdbAutoCompleterOptionDirective } from './directives/mdb-auto-completer-option.directive';
export class AutoCompleterModule {
}
AutoCompleterModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, HttpClientModule, FormsModule],
                declarations: [
                    MdbAutoCompleterComponent,
                    MdbOptionComponent,
                    MdbAutoCompleterDirective,
                    MdbAutoCompleterOptionDirective,
                ],
                exports: [
                    MdbAutoCompleterComponent,
                    MdbOptionComponent,
                    MdbAutoCompleterDirective,
                    MdbAutoCompleterOptionDirective,
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1jb21wbGV0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctdWlraXQtcHJvLXN0YW5kYXJkL3NyYy9saWIvcHJvL2F1dG8tY29tcGxldGVyL2F1dG8tY29tcGxldGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFpQm5HLE1BQU0sT0FBTyxtQkFBbUI7OztZQWYvQixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFdBQVcsQ0FBQztnQkFDdEQsWUFBWSxFQUFFO29CQUNaLHlCQUF5QjtvQkFDekIsa0JBQWtCO29CQUNsQix5QkFBeUI7b0JBQ3pCLCtCQUErQjtpQkFDaEM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHlCQUF5QjtvQkFDekIsa0JBQWtCO29CQUNsQix5QkFBeUI7b0JBQ3pCLCtCQUErQjtpQkFDaEM7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1kYkF1dG9Db21wbGV0ZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWRiLWF1dG8tY29tcGxldGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZGJPcHRpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWRiLW9wdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWRiQXV0b0NvbXBsZXRlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9tZGItYXV0by1jb21wbGV0ZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNZGJBdXRvQ29tcGxldGVyT3B0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21kYi1hdXRvLWNvbXBsZXRlci1vcHRpb24uZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSHR0cENsaWVudE1vZHVsZSwgRm9ybXNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNZGJBdXRvQ29tcGxldGVyQ29tcG9uZW50LFxuICAgIE1kYk9wdGlvbkNvbXBvbmVudCxcbiAgICBNZGJBdXRvQ29tcGxldGVyRGlyZWN0aXZlLFxuICAgIE1kYkF1dG9Db21wbGV0ZXJPcHRpb25EaXJlY3RpdmUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNZGJBdXRvQ29tcGxldGVyQ29tcG9uZW50LFxuICAgIE1kYk9wdGlvbkNvbXBvbmVudCxcbiAgICBNZGJBdXRvQ29tcGxldGVyRGlyZWN0aXZlLFxuICAgIE1kYkF1dG9Db21wbGV0ZXJPcHRpb25EaXJlY3RpdmUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9Db21wbGV0ZXJNb2R1bGUge31cbiJdfQ==