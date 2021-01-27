import { __decorate, __metadata } from "tslib";
import { Directive, HostBinding, Input } from '@angular/core';
var ProgressDirective = /** @class */ (function () {
    function ProgressDirective() {
        this.addClass = true;
        this.bars = [];
        this._max = 100;
    }
    Object.defineProperty(ProgressDirective.prototype, "max", {
        /** maximum total value of progress element */
        get: function () {
            return this._max;
        },
        set: function (v) {
            this._max = v;
            this.bars.forEach(function (bar) {
                bar.recalculatePercentage();
            });
        },
        enumerable: true,
        configurable: true
    });
    ProgressDirective.prototype.addBar = function (bar) {
        if (!this.animate) {
            bar.transition = 'none';
        }
        this.bars.push(bar);
    };
    ProgressDirective.prototype.removeBar = function (bar) {
        this.bars.splice(this.bars.indexOf(bar), 1);
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ProgressDirective.prototype, "animate", void 0);
    __decorate([
        HostBinding('attr.max'),
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], ProgressDirective.prototype, "max", null);
    __decorate([
        HostBinding('class.progress'),
        __metadata("design:type", Object)
    ], ProgressDirective.prototype, "addClass", void 0);
    ProgressDirective = __decorate([
        Directive({ selector: 'mdbProgress, [mdbProgress]' })
    ], ProgressDirective);
    return ProgressDirective;
}());
export { ProgressDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9wcm9ncmVzc2JhcnMvcHJvZ3Jlc3MuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLOUQ7SUFBQTtRQWtCd0MsYUFBUSxHQUFHLElBQUksQ0FBQztRQUUvQyxTQUFJLEdBQVUsRUFBRSxDQUFDO1FBRWQsU0FBSSxHQUFHLEdBQUcsQ0FBQztJQVl2QixDQUFDO0lBM0JDLHNCQUFXLGtDQUFHO1FBSGQsOENBQThDO2FBRzlDO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7YUFFRCxVQUFlLENBQVM7WUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQWlCO2dCQUNsQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBZU0sa0NBQU0sR0FBYixVQUFjLEdBQWlCO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLEdBQUcsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVNLHFDQUFTLEdBQWhCLFVBQWlCLEdBQWlCO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUEvQlE7UUFBUixLQUFLLEVBQUU7O3NEQUF5QjtJQUtqQztRQUZDLFdBQVcsQ0FBQyxVQUFVLENBQUM7UUFDdkIsS0FBSyxFQUFFOzs7Z0RBR1A7SUFTOEI7UUFBOUIsV0FBVyxDQUFDLGdCQUFnQixDQUFDOzt1REFBd0I7SUFsQjNDLGlCQUFpQjtRQUQ3QixTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsNEJBQTRCLEVBQUUsQ0FBQztPQUN6QyxpQkFBaUIsQ0FrQzdCO0lBQUQsd0JBQUM7Q0FBQSxBQWxDRCxJQWtDQztTQWxDWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBCYXJDb21wb25lbnQgfSBmcm9tICcuL2Jhci5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdtZGJQcm9ncmVzcywgW21kYlByb2dyZXNzXScgfSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc0RpcmVjdGl2ZSB7XG4gIC8qKiBpZiBgdHJ1ZWAgY2hhbmdpbmcgdmFsdWUgb2YgcHJvZ3Jlc3MgYmFyIHdpbGwgYmUgYW5pbWF0ZWQgKG5vdGU6IG5vdCBzdXBwb3J0ZWQgYnkgQm9vdHN0cmFwIDQpICovXG4gIEBJbnB1dCgpIHB1YmxpYyBhbmltYXRlOiBib29sZWFuO1xuXG4gIC8qKiBtYXhpbXVtIHRvdGFsIHZhbHVlIG9mIHByb2dyZXNzIGVsZW1lbnQgKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLm1heCcpXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgbWF4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21heDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgbWF4KHY6IG51bWJlcikge1xuICAgIHRoaXMuX21heCA9IHY7XG4gICAgdGhpcy5iYXJzLmZvckVhY2goKGJhcjogQmFyQ29tcG9uZW50KSA9PiB7XG4gICAgICBiYXIucmVjYWxjdWxhdGVQZXJjZW50YWdlKCk7XG4gICAgfSk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnByb2dyZXNzJykgcHVibGljIGFkZENsYXNzID0gdHJ1ZTtcblxuICBwdWJsaWMgYmFyczogYW55W10gPSBbXTtcblxuICBwcm90ZWN0ZWQgX21heCA9IDEwMDtcblxuICBwdWJsaWMgYWRkQmFyKGJhcjogQmFyQ29tcG9uZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmFuaW1hdGUpIHtcbiAgICAgIGJhci50cmFuc2l0aW9uID0gJ25vbmUnO1xuICAgIH1cbiAgICB0aGlzLmJhcnMucHVzaChiYXIpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUJhcihiYXI6IEJhckNvbXBvbmVudCk6IHZvaWQge1xuICAgIHRoaXMuYmFycy5zcGxpY2UodGhpcy5iYXJzLmluZGV4T2YoYmFyKSwgMSk7XG4gIH1cbn1cbiJdfQ==