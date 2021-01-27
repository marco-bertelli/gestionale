import { __decorate, __metadata } from "tslib";
import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ProgressbarConfigComponent } from './progressbar.config.component';
var ProgressbarComponent = /** @class */ (function () {
    function ProgressbarComponent(config) {
        Object.assign(this, config);
    }
    ProgressbarComponent.ctorParameters = function () { return [
        { type: ProgressbarConfigComponent }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ProgressbarComponent.prototype, "animate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ProgressbarComponent.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ProgressbarComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ProgressbarComponent.prototype, "value", void 0);
    ProgressbarComponent = __decorate([
        Component({
            selector: 'mdb-progressbar, mdb-progress',
            template: "<div mdbProgress [animate]=\"animate\" [max]=\"max\">\n  <mdb-bar [type]=\"type\" [value]=\"value\">\n    <ng-content></ng-content>\n  </mdb-bar>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [""]
        }),
        __metadata("design:paramtypes", [ProgressbarConfigComponent])
    ], ProgressbarComponent);
    return ProgressbarComponent;
}());
export { ProgressbarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9wcm9ncmVzc2JhcnMvcHJvZ3Jlc3NiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQVM1RTtJQVVFLDhCQUFtQixNQUFrQztRQUNuRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDOztnQkFGMEIsMEJBQTBCOztJQVI1QztRQUFSLEtBQUssRUFBRTs7eURBQXlCO0lBRXhCO1FBQVIsS0FBSyxFQUFFOztxREFBb0I7SUFFbkI7UUFBUixLQUFLLEVBQUU7O3NEQUFxQjtJQUVwQjtRQUFSLEtBQUssRUFBRTs7dURBQXNCO0lBUm5CLG9CQUFvQjtRQVBoQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsK0JBQStCO1lBQ3pDLHVLQUEyQztZQUUzQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDaEQsQ0FBQzt5Q0FXMkIsMEJBQTBCO09BVjFDLG9CQUFvQixDQWFoQztJQUFELDJCQUFDO0NBQUEsQUFiRCxJQWFDO1NBYlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9ncmVzc2JhckNvbmZpZ0NvbXBvbmVudCB9IGZyb20gJy4vcHJvZ3Jlc3NiYXIuY29uZmlnLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1wcm9ncmVzc2JhciwgbWRiLXByb2dyZXNzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Byb2dyZXNzYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHJvZ3Jlc3NiYXJzLW1vZHVsZS5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc2JhckNvbXBvbmVudCB7XG4gIC8qKiBpZiBgdHJ1ZWAgY2hhbmdpbmcgdmFsdWUgb2YgcHJvZ3Jlc3MgYmFyIHdpbGwgYmUgYW5pbWF0ZWQgKG5vdGU6IG5vdCBzdXBwb3J0ZWQgYnkgQm9vdHN0cmFwIDQpICovXG4gIEBJbnB1dCgpIHB1YmxpYyBhbmltYXRlOiBib29sZWFuO1xuICAvKiogbWF4aW11bSB0b3RhbCB2YWx1ZSBvZiBwcm9ncmVzcyBlbGVtZW50ICovXG4gIEBJbnB1dCgpIHB1YmxpYyBtYXg6IG51bWJlcjtcbiAgLyoqIHByb3ZpZGUgb25lIG9mIHRoZSBmb3VyIHN1cHBvcnRlZCBjb250ZXh0dWFsIGNsYXNzZXM6IGBzdWNjZXNzYCwgYGluZm9gLCBgd2FybmluZ2AsIGBkYW5nZXJgICovXG4gIEBJbnB1dCgpIHB1YmxpYyB0eXBlOiBzdHJpbmc7XG4gIC8qKiBjdXJyZW50IHZhbHVlIG9mIHByb2dyZXNzIGJhciAqL1xuICBASW5wdXQoKSBwdWJsaWMgdmFsdWU6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBQcm9ncmVzc2JhckNvbmZpZ0NvbXBvbmVudCkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29uZmlnKTtcbiAgfVxufVxuIl19