import { Injectable } from '@angular/core';
export class LocaleService {
    constructor() {
        this.locales = {
            'en': {
                dayLabelsFull: { su: 'Sunday', mo: 'Monday', tu: 'Tuesday', we: 'Wednesday', th: 'Thursday', fr: 'Friday', sa: 'Saturday' },
                dayLabels: { su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat' },
                monthLabelsFull: {
                    1: 'January',
                    2: 'February',
                    3: 'March',
                    4: 'April',
                    5: 'May',
                    6: 'June',
                    7: 'July',
                    8: 'August',
                    9: 'September',
                    10: 'October',
                    11: 'November',
                    12: 'December'
                },
                monthLabels: {
                    1: 'Jan',
                    2: 'Feb',
                    3: 'Mar',
                    4: 'Apr',
                    5: 'May',
                    6: 'Jun',
                    7: 'Jul',
                    8: 'Aug',
                    9: 'Sep',
                    10: 'Oct',
                    11: 'Nov',
                    12: 'Dec'
                },
                dateFormat: 'yyyy-mm-dd',
                todayBtnTxt: 'Today',
                clearBtnTxt: 'Clear',
                closeBtnTxt: 'Close',
                firstDayOfWeek: 'mo',
                sunHighlight: false,
            }
        };
    }
    setLocaleOptions(locale) {
        Object.entries(locale).forEach((loc) => {
            const localeIdentifier = loc[0];
            this.locales[localeIdentifier] = loc[1];
        });
    }
    getLocaleOptions(locale) {
        if (locale && this.locales.hasOwnProperty(locale)) {
            // User given locale
            return this.locales[locale];
        }
        // Default: en
        return this.locales['en'];
    }
}
LocaleService.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlckxvY2FsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctdWlraXQtcHJvLXN0YW5kYXJkL3NyYy9saWIvcHJvL2RhdGUtcGlja2VyL3NlcnZpY2VzL2RhdGVwaWNrZXJMb2NhbGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE1BQU0sT0FBTyxhQUFhO0lBRDFCO1FBRVMsWUFBTyxHQUFlO1lBQzNCLElBQUksRUFBRTtnQkFDSixhQUFhLEVBQUUsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFO2dCQUMzSCxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFO2dCQUMxRixlQUFlLEVBQUU7b0JBQ2YsQ0FBQyxFQUFFLFNBQVM7b0JBQ1osQ0FBQyxFQUFFLFVBQVU7b0JBQ2IsQ0FBQyxFQUFFLE9BQU87b0JBQ1YsQ0FBQyxFQUFFLE9BQU87b0JBQ1YsQ0FBQyxFQUFFLEtBQUs7b0JBQ1IsQ0FBQyxFQUFFLE1BQU07b0JBQ1QsQ0FBQyxFQUFFLE1BQU07b0JBQ1QsQ0FBQyxFQUFFLFFBQVE7b0JBQ1gsQ0FBQyxFQUFFLFdBQVc7b0JBQ2QsRUFBRSxFQUFFLFNBQVM7b0JBQ2IsRUFBRSxFQUFFLFVBQVU7b0JBQ2QsRUFBRSxFQUFFLFVBQVU7aUJBQUU7Z0JBQ2xCLFdBQVcsRUFBRTtvQkFDWCxDQUFDLEVBQUUsS0FBSztvQkFDUixDQUFDLEVBQUUsS0FBSztvQkFDUixDQUFDLEVBQUUsS0FBSztvQkFDUixDQUFDLEVBQUUsS0FBSztvQkFDUixDQUFDLEVBQUUsS0FBSztvQkFDUixDQUFDLEVBQUUsS0FBSztvQkFDUixDQUFDLEVBQUUsS0FBSztvQkFDUixDQUFDLEVBQUUsS0FBSztvQkFDUixDQUFDLEVBQUUsS0FBSztvQkFDUixFQUFFLEVBQUUsS0FBSztvQkFDVCxFQUFFLEVBQUUsS0FBSztvQkFDVCxFQUFFLEVBQUUsS0FBSztpQkFBRTtnQkFDYixVQUFVLEVBQUUsWUFBWTtnQkFDeEIsV0FBVyxFQUFFLE9BQU87Z0JBQ3BCLFdBQVcsRUFBRSxPQUFPO2dCQUNwQixXQUFXLEVBQUUsT0FBTztnQkFDcEIsY0FBYyxFQUFFLElBQUk7Z0JBQ3BCLFlBQVksRUFBRSxLQUFLO2FBQ3BCO1NBQ0YsQ0FBQztJQWlCSixDQUFDO0lBZkMsZ0JBQWdCLENBQUMsTUFBa0I7UUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtZQUMxQyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdCQUFnQixDQUFDLE1BQWM7UUFDN0IsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDakQsb0JBQW9CO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM3QjtRQUNELGNBQWM7UUFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7O1lBdkRGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElNeUxvY2FsZXMsIElNeU9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2luZGV4JztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExvY2FsZVNlcnZpY2Uge1xyXG4gIHB1YmxpYyBsb2NhbGVzOiBJTXlMb2NhbGVzID0ge1xyXG4gICAgJ2VuJzoge1xyXG4gICAgICBkYXlMYWJlbHNGdWxsOiB7IHN1OiAnU3VuZGF5JywgbW86ICdNb25kYXknLCB0dTogJ1R1ZXNkYXknLCB3ZTogJ1dlZG5lc2RheScsIHRoOiAnVGh1cnNkYXknLCBmcjogJ0ZyaWRheScsIHNhOiAnU2F0dXJkYXknIH0sXHJcbiAgICAgIGRheUxhYmVsczogeyBzdTogJ1N1bicsIG1vOiAnTW9uJywgdHU6ICdUdWUnLCB3ZTogJ1dlZCcsIHRoOiAnVGh1JywgZnI6ICdGcmknLCBzYTogJ1NhdCcgfSxcclxuICAgICAgbW9udGhMYWJlbHNGdWxsOiB7XHJcbiAgICAgICAgMTogJ0phbnVhcnknLFxyXG4gICAgICAgIDI6ICdGZWJydWFyeScsXHJcbiAgICAgICAgMzogJ01hcmNoJyxcclxuICAgICAgICA0OiAnQXByaWwnLFxyXG4gICAgICAgIDU6ICdNYXknLFxyXG4gICAgICAgIDY6ICdKdW5lJyxcclxuICAgICAgICA3OiAnSnVseScsXHJcbiAgICAgICAgODogJ0F1Z3VzdCcsXHJcbiAgICAgICAgOTogJ1NlcHRlbWJlcicsXHJcbiAgICAgICAgMTA6ICdPY3RvYmVyJyxcclxuICAgICAgICAxMTogJ05vdmVtYmVyJyxcclxuICAgICAgICAxMjogJ0RlY2VtYmVyJyB9LFxyXG4gICAgICBtb250aExhYmVsczoge1xyXG4gICAgICAgIDE6ICdKYW4nLFxyXG4gICAgICAgIDI6ICdGZWInLFxyXG4gICAgICAgIDM6ICdNYXInLFxyXG4gICAgICAgIDQ6ICdBcHInLFxyXG4gICAgICAgIDU6ICdNYXknLFxyXG4gICAgICAgIDY6ICdKdW4nLFxyXG4gICAgICAgIDc6ICdKdWwnLFxyXG4gICAgICAgIDg6ICdBdWcnLFxyXG4gICAgICAgIDk6ICdTZXAnLFxyXG4gICAgICAgIDEwOiAnT2N0JyxcclxuICAgICAgICAxMTogJ05vdicsXHJcbiAgICAgICAgMTI6ICdEZWMnIH0sXHJcbiAgICAgIGRhdGVGb3JtYXQ6ICd5eXl5LW1tLWRkJyxcclxuICAgICAgdG9kYXlCdG5UeHQ6ICdUb2RheScsXHJcbiAgICAgIGNsZWFyQnRuVHh0OiAnQ2xlYXInLFxyXG4gICAgICBjbG9zZUJ0blR4dDogJ0Nsb3NlJyxcclxuICAgICAgZmlyc3REYXlPZldlZWs6ICdtbycsXHJcbiAgICAgIHN1bkhpZ2hsaWdodDogZmFsc2UsXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc2V0TG9jYWxlT3B0aW9ucyhsb2NhbGU6IElNeUxvY2FsZXMpIHtcclxuICAgIE9iamVjdC5lbnRyaWVzKGxvY2FsZSkuZm9yRWFjaCgobG9jOiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgbG9jYWxlSWRlbnRpZmllciA9IGxvY1swXTtcclxuICAgICAgdGhpcy5sb2NhbGVzW2xvY2FsZUlkZW50aWZpZXJdID0gbG9jWzFdO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRMb2NhbGVPcHRpb25zKGxvY2FsZTogc3RyaW5nKTogSU15T3B0aW9ucyB7XHJcbiAgICBpZiAobG9jYWxlICYmIHRoaXMubG9jYWxlcy5oYXNPd25Qcm9wZXJ0eShsb2NhbGUpKSB7XHJcbiAgICAgIC8vIFVzZXIgZ2l2ZW4gbG9jYWxlXHJcbiAgICAgIHJldHVybiB0aGlzLmxvY2FsZXNbbG9jYWxlXTtcclxuICAgIH1cclxuICAgIC8vIERlZmF1bHQ6IGVuXHJcbiAgICByZXR1cm4gdGhpcy5sb2NhbGVzWydlbiddO1xyXG4gIH1cclxufVxyXG4iXX0=