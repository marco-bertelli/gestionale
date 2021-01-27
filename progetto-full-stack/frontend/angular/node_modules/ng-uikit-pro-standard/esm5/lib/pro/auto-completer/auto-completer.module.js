import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { MdbAutoCompleterComponent } from './components/mdb-auto-completer.component';
import { MdbOptionComponent } from './components/mdb-option.component';
import { MdbAutoCompleterDirective } from './directives/mdb-auto-completer.directive';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MdbAutoCompleterOptionDirective } from './directives/mdb-auto-completer-option.directive';
var AutoCompleterModule = /** @class */ (function () {
    function AutoCompleterModule() {
    }
    AutoCompleterModule = __decorate([
        NgModule({
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
        })
    ], AutoCompleterModule);
    return AutoCompleterModule;
}());
export { AutoCompleterModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1jb21wbGV0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9hdXRvLWNvbXBsZXRlci9hdXRvLWNvbXBsZXRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQWlCbkc7SUFBQTtJQUFrQyxDQUFDO0lBQXRCLG1CQUFtQjtRQWYvQixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDO1lBQ3RELFlBQVksRUFBRTtnQkFDWix5QkFBeUI7Z0JBQ3pCLGtCQUFrQjtnQkFDbEIseUJBQXlCO2dCQUN6QiwrQkFBK0I7YUFDaEM7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AseUJBQXlCO2dCQUN6QixrQkFBa0I7Z0JBQ2xCLHlCQUF5QjtnQkFDekIsK0JBQStCO2FBQ2hDO1NBQ0YsQ0FBQztPQUNXLG1CQUFtQixDQUFHO0lBQUQsMEJBQUM7Q0FBQSxBQUFuQyxJQUFtQztTQUF0QixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNZGJBdXRvQ29tcGxldGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL21kYi1hdXRvLWNvbXBsZXRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWRiT3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL21kYi1vcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IE1kYkF1dG9Db21wbGV0ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbWRiLWF1dG8tY29tcGxldGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWRiQXV0b0NvbXBsZXRlck9wdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9tZGItYXV0by1jb21wbGV0ZXItb3B0aW9uLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEh0dHBDbGllbnRNb2R1bGUsIEZvcm1zTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWRiQXV0b0NvbXBsZXRlckNvbXBvbmVudCxcbiAgICBNZGJPcHRpb25Db21wb25lbnQsXG4gICAgTWRiQXV0b0NvbXBsZXRlckRpcmVjdGl2ZSxcbiAgICBNZGJBdXRvQ29tcGxldGVyT3B0aW9uRGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWRiQXV0b0NvbXBsZXRlckNvbXBvbmVudCxcbiAgICBNZGJPcHRpb25Db21wb25lbnQsXG4gICAgTWRiQXV0b0NvbXBsZXRlckRpcmVjdGl2ZSxcbiAgICBNZGJBdXRvQ29tcGxldGVyT3B0aW9uRGlyZWN0aXZlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBdXRvQ29tcGxldGVyTW9kdWxlIHt9XG4iXX0=