import { NgModule } from '@angular/core';
import { MdbDateFormatDirective } from './mdb-date-format.directive';
import { MdbCreditCardDirective } from './mdb-credit-card.directive';
import { MdbCvvDirective } from './mdb-cvv.directive';
export class AutoFormatModule {
}
AutoFormatModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    MdbDateFormatDirective,
                    MdbCreditCardDirective,
                    MdbCvvDirective
                ],
                exports: [
                    MdbDateFormatDirective,
                    MdbCreditCardDirective,
                    MdbCvvDirective
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1mb3JtYXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctdWlraXQtcHJvLXN0YW5kYXJkL3NyYy9saWIvcHJvL2F1dG8tZm9ybWF0L2F1dG8tZm9ybWF0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQWN0RCxNQUFNLE9BQU8sZ0JBQWdCOzs7WUFaNUIsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixzQkFBc0I7b0JBQ3RCLHNCQUFzQjtvQkFDdEIsZUFBZTtpQkFDaEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHNCQUFzQjtvQkFDdEIsc0JBQXNCO29CQUN0QixlQUFlO2lCQUNoQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1kYkRhdGVGb3JtYXREaXJlY3RpdmUgfSBmcm9tICcuL21kYi1kYXRlLWZvcm1hdC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWRiQ3JlZGl0Q2FyZERpcmVjdGl2ZSB9IGZyb20gJy4vbWRiLWNyZWRpdC1jYXJkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZGJDdnZEaXJlY3RpdmUgfSBmcm9tICcuL21kYi1jdnYuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWRiRGF0ZUZvcm1hdERpcmVjdGl2ZSxcbiAgICBNZGJDcmVkaXRDYXJkRGlyZWN0aXZlLFxuICAgIE1kYkN2dkRpcmVjdGl2ZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWRiRGF0ZUZvcm1hdERpcmVjdGl2ZSxcbiAgICBNZGJDcmVkaXRDYXJkRGlyZWN0aXZlLFxuICAgIE1kYkN2dkRpcmVjdGl2ZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9Gb3JtYXRNb2R1bGUge1xufVxuIl19