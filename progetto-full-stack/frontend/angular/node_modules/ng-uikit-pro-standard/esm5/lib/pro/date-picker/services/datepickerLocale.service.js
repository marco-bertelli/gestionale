import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
var LocaleService = /** @class */ (function () {
    function LocaleService() {
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
    LocaleService.prototype.setLocaleOptions = function (locale) {
        var _this = this;
        Object.entries(locale).forEach(function (loc) {
            var localeIdentifier = loc[0];
            _this.locales[localeIdentifier] = loc[1];
        });
    };
    LocaleService.prototype.getLocaleOptions = function (locale) {
        if (locale && this.locales.hasOwnProperty(locale)) {
            // User given locale
            return this.locales[locale];
        }
        // Default: en
        return this.locales['en'];
    };
    LocaleService = __decorate([
        Injectable()
    ], LocaleService);
    return LocaleService;
}());
export { LocaleService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlckxvY2FsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9kYXRlLXBpY2tlci9zZXJ2aWNlcy9kYXRlcGlja2VyTG9jYWxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0M7SUFBQTtRQUNTLFlBQU8sR0FBZTtZQUMzQixJQUFJLEVBQUU7Z0JBQ0osYUFBYSxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRTtnQkFDM0gsU0FBUyxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRTtnQkFDMUYsZUFBZSxFQUFFO29CQUNmLENBQUMsRUFBRSxTQUFTO29CQUNaLENBQUMsRUFBRSxVQUFVO29CQUNiLENBQUMsRUFBRSxPQUFPO29CQUNWLENBQUMsRUFBRSxPQUFPO29CQUNWLENBQUMsRUFBRSxLQUFLO29CQUNSLENBQUMsRUFBRSxNQUFNO29CQUNULENBQUMsRUFBRSxNQUFNO29CQUNULENBQUMsRUFBRSxRQUFRO29CQUNYLENBQUMsRUFBRSxXQUFXO29CQUNkLEVBQUUsRUFBRSxTQUFTO29CQUNiLEVBQUUsRUFBRSxVQUFVO29CQUNkLEVBQUUsRUFBRSxVQUFVO2lCQUFFO2dCQUNsQixXQUFXLEVBQUU7b0JBQ1gsQ0FBQyxFQUFFLEtBQUs7b0JBQ1IsQ0FBQyxFQUFFLEtBQUs7b0JBQ1IsQ0FBQyxFQUFFLEtBQUs7b0JBQ1IsQ0FBQyxFQUFFLEtBQUs7b0JBQ1IsQ0FBQyxFQUFFLEtBQUs7b0JBQ1IsQ0FBQyxFQUFFLEtBQUs7b0JBQ1IsQ0FBQyxFQUFFLEtBQUs7b0JBQ1IsQ0FBQyxFQUFFLEtBQUs7b0JBQ1IsQ0FBQyxFQUFFLEtBQUs7b0JBQ1IsRUFBRSxFQUFFLEtBQUs7b0JBQ1QsRUFBRSxFQUFFLEtBQUs7b0JBQ1QsRUFBRSxFQUFFLEtBQUs7aUJBQUU7Z0JBQ2IsVUFBVSxFQUFFLFlBQVk7Z0JBQ3hCLFdBQVcsRUFBRSxPQUFPO2dCQUNwQixXQUFXLEVBQUUsT0FBTztnQkFDcEIsV0FBVyxFQUFFLE9BQU87Z0JBQ3BCLGNBQWMsRUFBRSxJQUFJO2dCQUNwQixZQUFZLEVBQUUsS0FBSzthQUNwQjtTQUNGLENBQUM7SUFpQkosQ0FBQztJQWZDLHdDQUFnQixHQUFoQixVQUFpQixNQUFrQjtRQUFuQyxpQkFLQztRQUpDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBUTtZQUN0QyxJQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxLQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHdDQUFnQixHQUFoQixVQUFpQixNQUFjO1FBQzdCLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2pELG9CQUFvQjtZQUNwQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0I7UUFDRCxjQUFjO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUF0RFUsYUFBYTtRQUR6QixVQUFVLEVBQUU7T0FDQSxhQUFhLENBdUR6QjtJQUFELG9CQUFDO0NBQUEsQUF2REQsSUF1REM7U0F2RFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSU15TG9jYWxlcywgSU15T3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW5kZXgnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTG9jYWxlU2VydmljZSB7XHJcbiAgcHVibGljIGxvY2FsZXM6IElNeUxvY2FsZXMgPSB7XHJcbiAgICAnZW4nOiB7XHJcbiAgICAgIGRheUxhYmVsc0Z1bGw6IHsgc3U6ICdTdW5kYXknLCBtbzogJ01vbmRheScsIHR1OiAnVHVlc2RheScsIHdlOiAnV2VkbmVzZGF5JywgdGg6ICdUaHVyc2RheScsIGZyOiAnRnJpZGF5Jywgc2E6ICdTYXR1cmRheScgfSxcclxuICAgICAgZGF5TGFiZWxzOiB7IHN1OiAnU3VuJywgbW86ICdNb24nLCB0dTogJ1R1ZScsIHdlOiAnV2VkJywgdGg6ICdUaHUnLCBmcjogJ0ZyaScsIHNhOiAnU2F0JyB9LFxyXG4gICAgICBtb250aExhYmVsc0Z1bGw6IHtcclxuICAgICAgICAxOiAnSmFudWFyeScsXHJcbiAgICAgICAgMjogJ0ZlYnJ1YXJ5JyxcclxuICAgICAgICAzOiAnTWFyY2gnLFxyXG4gICAgICAgIDQ6ICdBcHJpbCcsXHJcbiAgICAgICAgNTogJ01heScsXHJcbiAgICAgICAgNjogJ0p1bmUnLFxyXG4gICAgICAgIDc6ICdKdWx5JyxcclxuICAgICAgICA4OiAnQXVndXN0JyxcclxuICAgICAgICA5OiAnU2VwdGVtYmVyJyxcclxuICAgICAgICAxMDogJ09jdG9iZXInLFxyXG4gICAgICAgIDExOiAnTm92ZW1iZXInLFxyXG4gICAgICAgIDEyOiAnRGVjZW1iZXInIH0sXHJcbiAgICAgIG1vbnRoTGFiZWxzOiB7XHJcbiAgICAgICAgMTogJ0phbicsXHJcbiAgICAgICAgMjogJ0ZlYicsXHJcbiAgICAgICAgMzogJ01hcicsXHJcbiAgICAgICAgNDogJ0FwcicsXHJcbiAgICAgICAgNTogJ01heScsXHJcbiAgICAgICAgNjogJ0p1bicsXHJcbiAgICAgICAgNzogJ0p1bCcsXHJcbiAgICAgICAgODogJ0F1ZycsXHJcbiAgICAgICAgOTogJ1NlcCcsXHJcbiAgICAgICAgMTA6ICdPY3QnLFxyXG4gICAgICAgIDExOiAnTm92JyxcclxuICAgICAgICAxMjogJ0RlYycgfSxcclxuICAgICAgZGF0ZUZvcm1hdDogJ3l5eXktbW0tZGQnLFxyXG4gICAgICB0b2RheUJ0blR4dDogJ1RvZGF5JyxcclxuICAgICAgY2xlYXJCdG5UeHQ6ICdDbGVhcicsXHJcbiAgICAgIGNsb3NlQnRuVHh0OiAnQ2xvc2UnLFxyXG4gICAgICBmaXJzdERheU9mV2VlazogJ21vJyxcclxuICAgICAgc3VuSGlnaGxpZ2h0OiBmYWxzZSxcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzZXRMb2NhbGVPcHRpb25zKGxvY2FsZTogSU15TG9jYWxlcykge1xyXG4gICAgT2JqZWN0LmVudHJpZXMobG9jYWxlKS5mb3JFYWNoKChsb2M6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBsb2NhbGVJZGVudGlmaWVyID0gbG9jWzBdO1xyXG4gICAgICB0aGlzLmxvY2FsZXNbbG9jYWxlSWRlbnRpZmllcl0gPSBsb2NbMV07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldExvY2FsZU9wdGlvbnMobG9jYWxlOiBzdHJpbmcpOiBJTXlPcHRpb25zIHtcclxuICAgIGlmIChsb2NhbGUgJiYgdGhpcy5sb2NhbGVzLmhhc093blByb3BlcnR5KGxvY2FsZSkpIHtcclxuICAgICAgLy8gVXNlciBnaXZlbiBsb2NhbGVcclxuICAgICAgcmV0dXJuIHRoaXMubG9jYWxlc1tsb2NhbGVdO1xyXG4gICAgfVxyXG4gICAgLy8gRGVmYXVsdDogZW5cclxuICAgIHJldHVybiB0aGlzLmxvY2FsZXNbJ2VuJ107XHJcbiAgfVxyXG59XHJcbiJdfQ==