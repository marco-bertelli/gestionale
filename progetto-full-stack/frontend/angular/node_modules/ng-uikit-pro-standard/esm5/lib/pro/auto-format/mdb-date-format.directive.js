import { __decorate, __metadata } from "tslib";
import { Directive, HostListener, Input } from '@angular/core';
var MdbDateFormatDirective = /** @class */ (function () {
    function MdbDateFormatDirective() {
        this.separator = '/';
        this.format = ['dd', 'mm', 'yyyy'];
    }
    MdbDateFormatDirective.prototype.onInput = function (event) {
        var currentValue = event.target.value;
        var newValue = this.getFormattedDate(currentValue);
        event.target.value = newValue;
    };
    MdbDateFormatDirective.prototype.ngOnInit = function () {
        this.setSeparatorsNumber();
        this.setResultLength();
    };
    MdbDateFormatDirective.prototype.setSeparatorsNumber = function () {
        this.separatorsNumber = this.format.length - 1;
    };
    MdbDateFormatDirective.prototype.setResultLength = function () {
        var resLength = 0;
        this.format.forEach(function (value) {
            resLength += value.length;
        });
        this.resultLength = resLength + this.separatorsNumber;
    };
    MdbDateFormatDirective.prototype.getFormattedDate = function (date) {
        var _this = this;
        var dateParts = this.getDateParts(date);
        var result = dateParts.map(function (part, index) {
            return _this.formatDateParts(part, index);
        });
        return result.join(this.separator).slice(0, this.resultLength);
    };
    MdbDateFormatDirective.prototype.getDateParts = function (date) {
        date = this.getDigits(date).slice(0, this.resultLength - this.separatorsNumber);
        var parts = [];
        var partsIndex = {
            first: this.format[0].length,
            mid: this.format[0].length + this.format[1].length,
            last: this.resultLength,
        };
        parts[0] = date.slice(0, partsIndex.first);
        if (date.length > partsIndex.first) {
            parts[1] = date.slice(partsIndex.first, partsIndex.mid);
        }
        if (date.length > partsIndex.mid) {
            parts[2] = date.slice(partsIndex.mid, partsIndex.last);
        }
        return parts;
    };
    MdbDateFormatDirective.prototype.getDigits = function (value) {
        return value.replace(/\D/g, '');
    };
    MdbDateFormatDirective.prototype.formatDateParts = function (datePart, index) {
        switch (this.format[index]) {
            case 'dd':
                datePart = this.getFormattedDay(datePart);
                break;
            case 'mm':
                datePart = this.getFormattedMonth(datePart);
                break;
        }
        return datePart;
    };
    MdbDateFormatDirective.prototype.getFormattedDay = function (value) {
        var dayFirstNum = parseInt(value.charAt(0), 10);
        if (value) {
            if (dayFirstNum > 3 && dayFirstNum !== 0) {
                return '0' + value.charAt(0);
            }
            else {
                return value;
            }
        }
    };
    MdbDateFormatDirective.prototype.getFormattedMonth = function (value) {
        var monthFirstNum = parseInt(value.charAt(0), 10);
        var monthNum = parseInt(value, 10);
        if (value) {
            if (monthFirstNum > 1 && monthFirstNum !== 0) {
                return '0' + value.charAt(0);
            }
            else if (monthNum > 12) {
                return '12';
            }
            else {
                return value;
            }
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbDateFormatDirective.prototype, "separator", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbDateFormatDirective.prototype, "format", void 0);
    __decorate([
        HostListener('input', ['$event']),
        HostListener('paste', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MdbDateFormatDirective.prototype, "onInput", null);
    MdbDateFormatDirective = __decorate([
        Directive({
            selector: '[mdbDateFormat]',
        })
    ], MdbDateFormatDirective);
    return MdbDateFormatDirective;
}());
export { MdbDateFormatDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLWRhdGUtZm9ybWF0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vYXV0by1mb3JtYXQvbWRiLWRhdGUtZm9ybWF0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBS3ZFO0lBQUE7UUFJVyxjQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFzR3pDLENBQUM7SUFsR0Msd0NBQU8sR0FBUCxVQUFRLEtBQVU7UUFDaEIsSUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDeEMsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JELEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztJQUNoQyxDQUFDO0lBRUQseUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsb0RBQW1CLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsZ0RBQWUsR0FBZjtRQUNFLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7WUFDdkIsU0FBUyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDeEQsQ0FBQztJQUVELGlEQUFnQixHQUFoQixVQUFpQixJQUFZO1FBQTdCLGlCQVFDO1FBUEMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUxQyxJQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUs7WUFDdkMsT0FBTyxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELDZDQUFZLEdBQVosVUFBYSxJQUFZO1FBQ3ZCLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNoRixJQUFNLEtBQUssR0FBYSxFQUFFLENBQUM7UUFDM0IsSUFBTSxVQUFVLEdBQUc7WUFDakIsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUM1QixHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO1lBQ2xELElBQUksRUFBRSxJQUFJLENBQUMsWUFBWTtTQUN4QixDQUFDO1FBRUYsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRTtZQUNsQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN6RDtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2hDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsMENBQVMsR0FBVCxVQUFVLEtBQWE7UUFDckIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsZ0RBQWUsR0FBZixVQUFnQixRQUFhLEVBQUUsS0FBYTtRQUMxQyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUIsS0FBSyxJQUFJO2dCQUNQLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMxQyxNQUFNO1lBRVIsS0FBSyxJQUFJO2dCQUNQLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzVDLE1BQU07U0FDVDtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxnREFBZSxHQUFmLFVBQWdCLEtBQWE7UUFDM0IsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEQsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLFdBQVcsR0FBRyxDQUFDLElBQUksV0FBVyxLQUFLLENBQUMsRUFBRTtnQkFDeEMsT0FBTyxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QjtpQkFBTTtnQkFDTCxPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsa0RBQWlCLEdBQWpCLFVBQWtCLEtBQWE7UUFDN0IsSUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEQsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVyQyxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksYUFBYSxHQUFHLENBQUMsSUFBSSxhQUFhLEtBQUssQ0FBQyxFQUFFO2dCQUM1QyxPQUFPLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzlCO2lCQUFNLElBQUksUUFBUSxHQUFHLEVBQUUsRUFBRTtnQkFDeEIsT0FBTyxJQUFJLENBQUM7YUFDYjtpQkFBTTtnQkFDTCxPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7SUFDSCxDQUFDO0lBdEdRO1FBQVIsS0FBSyxFQUFFOzs2REFBaUI7SUFDaEI7UUFBUixLQUFLLEVBQUU7OzBEQUErQjtJQUl2QztRQUZDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7eURBS2pDO0lBYlUsc0JBQXNCO1FBSGxDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxpQkFBaUI7U0FDNUIsQ0FBQztPQUNXLHNCQUFzQixDQTJHbEM7SUFBRCw2QkFBQztDQUFBLEFBM0dELElBMkdDO1NBM0dZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZGJEYXRlRm9ybWF0XScsXG59KVxuZXhwb3J0IGNsYXNzIE1kYkRhdGVGb3JtYXREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICByZXN1bHRMZW5ndGg6IG51bWJlcjtcbiAgc2VwYXJhdG9yc051bWJlcjogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHNlcGFyYXRvciA9ICcvJztcbiAgQElucHV0KCkgZm9ybWF0ID0gWydkZCcsICdtbScsICd5eXl5J107XG5cbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKVxuICBASG9zdExpc3RlbmVyKCdwYXN0ZScsIFsnJGV2ZW50J10pXG4gIG9uSW5wdXQoZXZlbnQ6IGFueSkge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuZ2V0Rm9ybWF0dGVkRGF0ZShjdXJyZW50VmFsdWUpO1xuICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9IG5ld1ZhbHVlO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZXRTZXBhcmF0b3JzTnVtYmVyKCk7XG4gICAgdGhpcy5zZXRSZXN1bHRMZW5ndGgoKTtcbiAgfVxuXG4gIHNldFNlcGFyYXRvcnNOdW1iZXIoKSB7XG4gICAgdGhpcy5zZXBhcmF0b3JzTnVtYmVyID0gdGhpcy5mb3JtYXQubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIHNldFJlc3VsdExlbmd0aCgpIHtcbiAgICBsZXQgcmVzTGVuZ3RoID0gMDtcbiAgICB0aGlzLmZvcm1hdC5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIHJlc0xlbmd0aCArPSB2YWx1ZS5sZW5ndGg7XG4gICAgfSk7XG4gICAgdGhpcy5yZXN1bHRMZW5ndGggPSByZXNMZW5ndGggKyB0aGlzLnNlcGFyYXRvcnNOdW1iZXI7XG4gIH1cblxuICBnZXRGb3JtYXR0ZWREYXRlKGRhdGU6IHN0cmluZykge1xuICAgIGNvbnN0IGRhdGVQYXJ0cyA9IHRoaXMuZ2V0RGF0ZVBhcnRzKGRhdGUpO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gZGF0ZVBhcnRzLm1hcCgocGFydCwgaW5kZXgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdERhdGVQYXJ0cyhwYXJ0LCBpbmRleCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0LmpvaW4odGhpcy5zZXBhcmF0b3IpLnNsaWNlKDAsIHRoaXMucmVzdWx0TGVuZ3RoKTtcbiAgfVxuXG4gIGdldERhdGVQYXJ0cyhkYXRlOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgZGF0ZSA9IHRoaXMuZ2V0RGlnaXRzKGRhdGUpLnNsaWNlKDAsIHRoaXMucmVzdWx0TGVuZ3RoIC0gdGhpcy5zZXBhcmF0b3JzTnVtYmVyKTtcbiAgICBjb25zdCBwYXJ0czogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCBwYXJ0c0luZGV4ID0ge1xuICAgICAgZmlyc3Q6IHRoaXMuZm9ybWF0WzBdLmxlbmd0aCxcbiAgICAgIG1pZDogdGhpcy5mb3JtYXRbMF0ubGVuZ3RoICsgdGhpcy5mb3JtYXRbMV0ubGVuZ3RoLFxuICAgICAgbGFzdDogdGhpcy5yZXN1bHRMZW5ndGgsXG4gICAgfTtcblxuICAgIHBhcnRzWzBdID0gZGF0ZS5zbGljZSgwLCBwYXJ0c0luZGV4LmZpcnN0KTtcblxuICAgIGlmIChkYXRlLmxlbmd0aCA+IHBhcnRzSW5kZXguZmlyc3QpIHtcbiAgICAgIHBhcnRzWzFdID0gZGF0ZS5zbGljZShwYXJ0c0luZGV4LmZpcnN0LCBwYXJ0c0luZGV4Lm1pZCk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGUubGVuZ3RoID4gcGFydHNJbmRleC5taWQpIHtcbiAgICAgIHBhcnRzWzJdID0gZGF0ZS5zbGljZShwYXJ0c0luZGV4Lm1pZCwgcGFydHNJbmRleC5sYXN0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFydHM7XG4gIH1cblxuICBnZXREaWdpdHModmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICB9XG5cbiAgZm9ybWF0RGF0ZVBhcnRzKGRhdGVQYXJ0OiBhbnksIGluZGV4OiBudW1iZXIpIHtcbiAgICBzd2l0Y2ggKHRoaXMuZm9ybWF0W2luZGV4XSkge1xuICAgICAgY2FzZSAnZGQnOlxuICAgICAgICBkYXRlUGFydCA9IHRoaXMuZ2V0Rm9ybWF0dGVkRGF5KGRhdGVQYXJ0KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ21tJzpcbiAgICAgICAgZGF0ZVBhcnQgPSB0aGlzLmdldEZvcm1hdHRlZE1vbnRoKGRhdGVQYXJ0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGVQYXJ0O1xuICB9XG5cbiAgZ2V0Rm9ybWF0dGVkRGF5KHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBkYXlGaXJzdE51bSA9IHBhcnNlSW50KHZhbHVlLmNoYXJBdCgwKSwgMTApO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgaWYgKGRheUZpcnN0TnVtID4gMyAmJiBkYXlGaXJzdE51bSAhPT0gMCkge1xuICAgICAgICByZXR1cm4gJzAnICsgdmFsdWUuY2hhckF0KDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldEZvcm1hdHRlZE1vbnRoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBtb250aEZpcnN0TnVtID0gcGFyc2VJbnQodmFsdWUuY2hhckF0KDApLCAxMCk7XG4gICAgY29uc3QgbW9udGhOdW0gPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBpZiAobW9udGhGaXJzdE51bSA+IDEgJiYgbW9udGhGaXJzdE51bSAhPT0gMCkge1xuICAgICAgICByZXR1cm4gJzAnICsgdmFsdWUuY2hhckF0KDApO1xuICAgICAgfSBlbHNlIGlmIChtb250aE51bSA+IDEyKSB7XG4gICAgICAgIHJldHVybiAnMTInO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19