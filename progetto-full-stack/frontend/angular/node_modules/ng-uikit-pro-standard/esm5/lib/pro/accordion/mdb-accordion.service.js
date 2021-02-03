import { __decorate, __read, __spread } from "tslib";
import { Injectable } from '@angular/core';
var MdbAccordionService = /** @class */ (function () {
    function MdbAccordionService() {
        this._items = [];
        this._multiple = false;
    }
    MdbAccordionService.prototype.addItem = function (item) {
        this._items.push(item);
    };
    MdbAccordionService.prototype.updateItemsArray = function (items) {
        this._items = __spread(items);
    };
    MdbAccordionService.prototype.updateMultipleState = function (value) {
        this._multiple = value;
    };
    MdbAccordionService.prototype.didItemToggled = function (item) {
        // on not multiple, it will collpase the rest of items
        if (!this._multiple) {
            this._items.forEach(function (el) {
                if (el !== item) {
                    el.applyToggle(true);
                }
                if (el === item) {
                    var collapsed_1 = el.collapsed ? true : false;
                    setTimeout(function () {
                        el.applyToggle(collapsed_1);
                    }, 0);
                }
            });
        }
    };
    MdbAccordionService = __decorate([
        Injectable()
    ], MdbAccordionService);
    return MdbAccordionService;
}());
export { MdbAccordionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLWFjY29yZGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9hY2NvcmRpb24vbWRiLWFjY29yZGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSXpDO0lBQUE7UUFDVSxXQUFNLEdBQXNCLEVBQUUsQ0FBQztRQUMvQixjQUFTLEdBQUcsS0FBSyxDQUFDO0lBK0I1QixDQUFDO0lBN0JDLHFDQUFPLEdBQVAsVUFBUSxJQUFxQjtRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsOENBQWdCLEdBQWhCLFVBQWlCLEtBQXdCO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLFlBQU8sS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELGlEQUFtQixHQUFuQixVQUFvQixLQUFjO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCw0Q0FBYyxHQUFkLFVBQWUsSUFBcUI7UUFDbEMsc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBTztnQkFDMUIsSUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO29CQUNmLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3RCO2dCQUNELElBQUksRUFBRSxLQUFLLElBQUksRUFBRTtvQkFDZixJQUFNLFdBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDOUMsVUFBVSxDQUFDO3dCQUNULEVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBUyxDQUFDLENBQUM7b0JBQzVCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDUDtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBL0JVLG1CQUFtQjtRQUQvQixVQUFVLEVBQUU7T0FDQSxtQkFBbUIsQ0FpQy9CO0lBQUQsMEJBQUM7Q0FBQSxBQWpDRCxJQWlDQztTQWpDWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU0JJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3NiLWl0ZW0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWRiQWNjb3JkaW9uU2VydmljZSB7XG4gIHByaXZhdGUgX2l0ZW1zOiBTQkl0ZW1Db21wb25lbnRbXSA9IFtdO1xuICBwcml2YXRlIF9tdWx0aXBsZSA9IGZhbHNlO1xuXG4gIGFkZEl0ZW0oaXRlbTogU0JJdGVtQ29tcG9uZW50KSB7XG4gICAgdGhpcy5faXRlbXMucHVzaChpdGVtKTtcbiAgfVxuXG4gIHVwZGF0ZUl0ZW1zQXJyYXkoaXRlbXM6IFNCSXRlbUNvbXBvbmVudFtdKSB7XG4gICAgdGhpcy5faXRlbXMgPSBbLi4uaXRlbXNdO1xuICB9XG5cbiAgdXBkYXRlTXVsdGlwbGVTdGF0ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX211bHRpcGxlID0gdmFsdWU7XG4gIH1cblxuICBkaWRJdGVtVG9nZ2xlZChpdGVtOiBTQkl0ZW1Db21wb25lbnQpIHtcbiAgICAvLyBvbiBub3QgbXVsdGlwbGUsIGl0IHdpbGwgY29sbHBhc2UgdGhlIHJlc3Qgb2YgaXRlbXNcbiAgICBpZiAoIXRoaXMuX211bHRpcGxlKSB7XG4gICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKChlbDogYW55KSA9PiB7XG4gICAgICAgIGlmIChlbCAhPT0gaXRlbSkge1xuICAgICAgICAgIGVsLmFwcGx5VG9nZ2xlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbCA9PT0gaXRlbSkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGVsLmNvbGxhcHNlZCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGVsLmFwcGx5VG9nZ2xlKGNvbGxhcHNlZCk7XG4gICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=