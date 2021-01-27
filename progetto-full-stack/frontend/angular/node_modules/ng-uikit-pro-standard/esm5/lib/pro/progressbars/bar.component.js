import { __decorate, __metadata, __param } from "tslib";
import { Component, Host, Input } from '@angular/core';
import { ProgressDirective } from './progress.directive';
var BarComponent = /** @class */ (function () {
    function BarComponent(progress) {
        this.percent = 0;
        this.progress = progress;
    }
    Object.defineProperty(BarComponent.prototype, "value", {
        /** current value of progress bar */
        get: function () {
            return this._value;
        },
        set: function (v) {
            if (!v && v !== 0) {
                return;
            }
            this._value = v;
            this.recalculatePercentage();
        },
        enumerable: true,
        configurable: true
    });
    BarComponent.prototype.ngOnInit = function () {
        this.progress.addBar(this);
    };
    BarComponent.prototype.ngOnDestroy = function () {
        this.progress.removeBar(this);
    };
    BarComponent.prototype.recalculatePercentage = function () {
        this.percent = +((100 * this.value) / this.progress.max).toFixed(2);
        var totalPercentage = this.progress.bars.reduce(function (total, bar) {
            return total + bar.percent;
        }, 0);
        if (totalPercentage > 100) {
            this.percent -= totalPercentage - 100;
        }
    };
    BarComponent.ctorParameters = function () { return [
        { type: ProgressDirective, decorators: [{ type: Host }] }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BarComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], BarComponent.prototype, "value", null);
    BarComponent = __decorate([
        Component({
            selector: 'mdb-bar',
            template: "<div class=\"progress-bar\"\nstyle=\"min-width: 0;\"\nrole=\"progressbar\"\n[ngClass]=\"type && 'progress-bar-' + type\"\n[ngStyle]=\"{width: (percent < 100 ? percent : 100) + '%', transition: transition}\"\naria-valuemin=\"0\"\n[attr.aria-valuenow]=\"value\"\n[attr.aria-valuetext]=\"percent.toFixed(0) + '%'\"\n[attr.aria-valuemax]=\"max\">\n  <ng-content></ng-content>\n</div>\n"
        }),
        __param(0, Host()),
        __metadata("design:paramtypes", [ProgressDirective])
    ], BarComponent);
    return BarComponent;
}());
export { BarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vcHJvZ3Jlc3NiYXJzL2Jhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFNekQ7SUF5QkUsc0JBQTJCLFFBQTJCO1FBTi9DLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFPakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQXBCRCxzQkFBVywrQkFBSztRQUZoQixvQ0FBb0M7YUFFcEM7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzthQUVELFVBQWlCLENBQVM7WUFDeEIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNqQixPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUMvQixDQUFDOzs7T0FSQTtJQW9CTSwrQkFBUSxHQUFmO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVNLGtDQUFXLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLDRDQUFxQixHQUE1QjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwRSxJQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFDaEQsS0FBYSxFQUNiLEdBQWlCO1lBRWpCLE9BQU8sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDN0IsQ0FBQyxFQUNELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxlQUFlLEdBQUcsR0FBRyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxPQUFPLElBQUksZUFBZSxHQUFHLEdBQUcsQ0FBQztTQUN2QztJQUNILENBQUM7O2dCQTFCb0MsaUJBQWlCLHVCQUFsQyxJQUFJOztJQXJCZjtRQUFSLEtBQUssRUFBRTs7OENBQXFCO0lBRzdCO1FBREMsS0FBSyxFQUFFOzs7NkNBR1A7SUFUVSxZQUFZO1FBSnhCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxTQUFTO1lBQ25CLHlZQUFtQztTQUNwQyxDQUFDO1FBMEJvQixXQUFBLElBQUksRUFBRSxDQUFBO3lDQUFXLGlCQUFpQjtPQXpCM0MsWUFBWSxDQW9EeEI7SUFBRCxtQkFBQztDQUFBLEFBcERELElBb0RDO1NBcERZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQcm9ncmVzc0RpcmVjdGl2ZSB9IGZyb20gJy4vcHJvZ3Jlc3MuZGlyZWN0aXZlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLWJhcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9iYXIuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBCYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHB1YmxpYyBtYXg6IG51bWJlcjtcblxuICAvKiogcHJvdmlkZSBvbmUgb2YgdGhlIGZvdXIgc3VwcG9ydGVkIGNvbnRleHR1YWwgY2xhc3NlczogYHN1Y2Nlc3NgLCBgaW5mb2AsIGB3YXJuaW5nYCwgYGRhbmdlcmAgKi9cbiAgQElucHV0KCkgcHVibGljIHR5cGU6IHN0cmluZztcbiAgLyoqIGN1cnJlbnQgdmFsdWUgb2YgcHJvZ3Jlc3MgYmFyICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgdmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgc2V0IHZhbHVlKHY6IG51bWJlcikge1xuICAgIGlmICghdiAmJiB2ICE9PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3ZhbHVlID0gdjtcbiAgICB0aGlzLnJlY2FsY3VsYXRlUGVyY2VudGFnZSgpO1xuICB9XG5cbiAgcHVibGljIHBlcmNlbnQgPSAwO1xuICBwdWJsaWMgdHJhbnNpdGlvbjogc3RyaW5nO1xuICBwdWJsaWMgcHJvZ3Jlc3M6IFByb2dyZXNzRGlyZWN0aXZlO1xuXG4gIHByb3RlY3RlZCBfdmFsdWU6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoQEhvc3QoKSBwcm9ncmVzczogUHJvZ3Jlc3NEaXJlY3RpdmUpIHtcbiAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5wcm9ncmVzcy5hZGRCYXIodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5wcm9ncmVzcy5yZW1vdmVCYXIodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcmVjYWxjdWxhdGVQZXJjZW50YWdlKCk6IHZvaWQge1xuICAgIHRoaXMucGVyY2VudCA9ICsoKDEwMCAqIHRoaXMudmFsdWUpIC8gdGhpcy5wcm9ncmVzcy5tYXgpLnRvRml4ZWQoMik7XG5cbiAgICBjb25zdCB0b3RhbFBlcmNlbnRhZ2UgPSB0aGlzLnByb2dyZXNzLmJhcnMucmVkdWNlKGZ1bmN0aW9uKFxuICAgICAgdG90YWw6IG51bWJlcixcbiAgICAgIGJhcjogQmFyQ29tcG9uZW50XG4gICAgKTogbnVtYmVyIHtcbiAgICAgIHJldHVybiB0b3RhbCArIGJhci5wZXJjZW50O1xuICAgIH0sXG4gICAgMCk7XG5cbiAgICBpZiAodG90YWxQZXJjZW50YWdlID4gMTAwKSB7XG4gICAgICB0aGlzLnBlcmNlbnQgLT0gdG90YWxQZXJjZW50YWdlIC0gMTAwO1xuICAgIH1cbiAgfVxufVxuIl19