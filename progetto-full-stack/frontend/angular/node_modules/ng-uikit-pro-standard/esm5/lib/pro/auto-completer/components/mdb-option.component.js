import { __decorate, __metadata, __param } from "tslib";
import { Component, ElementRef, Input, HostListener, InjectionToken, Optional, Inject, OnInit, } from '@angular/core';
import { Subject } from 'rxjs';
export var MDB_OPTION_PARENT = new InjectionToken('MDB_OPTION_PARENT');
var MdbOptionComponent = /** @class */ (function () {
    function MdbOptionComponent(el, _parent) {
        this.el = el;
        this._parent = _parent;
        this.clicked = false;
        this.clickSource = new Subject();
        this.click$ = this.clickSource.asObservable();
        this.clicked = false;
    }
    Object.defineProperty(MdbOptionComponent.prototype, "optionHeight", {
        get: function () {
            return this._optionHeight;
        },
        enumerable: true,
        configurable: true
    });
    MdbOptionComponent.prototype.onClick = function () {
        this.clickSource.next(this);
    };
    Object.defineProperty(MdbOptionComponent.prototype, "label", {
        get: function () {
            return this.el.nativeElement.textContent;
        },
        enumerable: true,
        configurable: true
    });
    MdbOptionComponent.prototype.ngOnInit = function () {
        if (this._parent.visibleOptions && this._parent.optionHeight) {
            this._optionHeight = this._parent.optionHeight;
        }
    };
    MdbOptionComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MDB_OPTION_PARENT,] }] }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbOptionComponent.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MdbOptionComponent.prototype, "disabled", void 0);
    __decorate([
        HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MdbOptionComponent.prototype, "onClick", null);
    MdbOptionComponent = __decorate([
        Component({
            selector: 'mdb-option',
            template: "<div\n  tabindex=\"0\"\n  class=\"completer-row\"\n  [ngStyle]=\"{\n    'height.px': _optionHeight ? _optionHeight : 'auto'\n  }\"\n  mdbAutoCompleterOption\n>\n  <ng-content></ng-content>\n</div>\n"
        }),
        __param(1, Optional()), __param(1, Inject(MDB_OPTION_PARENT)),
        __metadata("design:paramtypes", [ElementRef, Object])
    ], MdbOptionComponent);
    return MdbOptionComponent;
}());
export { MdbOptionComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLW9wdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL2F1dG8tY29tcGxldGVyL2NvbXBvbmVudHMvbWRiLW9wdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxZQUFZLEVBQ1osY0FBYyxFQUNkLFFBQVEsRUFDUixNQUFNLEVBQ04sTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxPQUFPLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFPM0MsTUFBTSxDQUFDLElBQU0saUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQWtCLG1CQUFtQixDQUFDLENBQUM7QUFNMUY7SUFjRSw0QkFDUyxFQUFjLEVBQzBCLE9BQXdCO1FBRGhFLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDMEIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFSekUsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUdoQixnQkFBVyxHQUFnQyxJQUFJLE9BQU8sRUFBc0IsQ0FBQztRQUM3RSxXQUFNLEdBQW1DLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7UUFNdkUsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQWZELHNCQUFJLDRDQUFZO2FBQWhCO1lBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBZ0JELG9DQUFPLEdBQVA7UUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0Qsc0JBQUkscUNBQUs7YUFBVDtZQUNFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO1FBQzNDLENBQUM7OztPQUFBO0lBQ0QscUNBQVEsR0FBUjtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDNUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztTQUNoRDtJQUNILENBQUM7O2dCQWpCWSxVQUFVO2dEQUNwQixRQUFRLFlBQUksTUFBTSxTQUFDLGlCQUFpQjs7SUFmOUI7UUFBUixLQUFLLEVBQUU7O3FEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7O3dEQUFtQjtJQW9CM0I7UUFEQyxZQUFZLENBQUMsT0FBTyxDQUFDOzs7O3FEQUdyQjtJQXhCVSxrQkFBa0I7UUFKOUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFlBQVk7WUFDdEIsa05BQXdDO1NBQ3pDLENBQUM7UUFpQkcsV0FBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUE7eUNBRDNCLFVBQVU7T0FmWixrQkFBa0IsQ0FpQzlCO0lBQUQseUJBQUM7Q0FBQSxBQWpDRCxJQWlDQztTQWpDWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdGlvblRva2VuLFxuICBPcHRpb25hbCxcbiAgSW5qZWN0LFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSVNlbGVjdGVkT3B0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zZWxlY3RlZC1vcHRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBNZGJPcHRpb25QYXJlbnQge1xuICBvcHRpb25IZWlnaHQ6IG51bWJlcjtcbiAgdmlzaWJsZU9wdGlvbnM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IE1EQl9PUFRJT05fUEFSRU5UID0gbmV3IEluamVjdGlvblRva2VuPE1kYk9wdGlvblBhcmVudD4oJ01EQl9PUFRJT05fUEFSRU5UJyk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1vcHRpb24nLFxuICB0ZW1wbGF0ZVVybDogJ21kYi1vcHRpb24uY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJPcHRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSB2YWx1ZTogc3RyaW5nO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgX29wdGlvbkhlaWdodDogYW55O1xuICBnZXQgb3B0aW9uSGVpZ2h0KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbkhlaWdodDtcbiAgfVxuXG4gIGNsaWNrZWQgPSBmYWxzZTtcbiAgc2VsZWN0ZWRJdGVtOiBJU2VsZWN0ZWRPcHRpb247XG5cbiAgY2xpY2tTb3VyY2U6IFN1YmplY3Q8TWRiT3B0aW9uQ29tcG9uZW50PiA9IG5ldyBTdWJqZWN0PE1kYk9wdGlvbkNvbXBvbmVudD4oKTtcbiAgY2xpY2skOiBPYnNlcnZhYmxlPE1kYk9wdGlvbkNvbXBvbmVudD4gPSB0aGlzLmNsaWNrU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbDogRWxlbWVudFJlZixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1EQl9PUFRJT05fUEFSRU5UKSBwcml2YXRlIF9wYXJlbnQ6IE1kYk9wdGlvblBhcmVudFxuICApIHtcbiAgICB0aGlzLmNsaWNrZWQgPSBmYWxzZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICB0aGlzLmNsaWNrU291cmNlLm5leHQodGhpcyk7XG4gIH1cbiAgZ2V0IGxhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuX3BhcmVudC52aXNpYmxlT3B0aW9ucyAmJiB0aGlzLl9wYXJlbnQub3B0aW9uSGVpZ2h0KSB7XG4gICAgICB0aGlzLl9vcHRpb25IZWlnaHQgPSB0aGlzLl9wYXJlbnQub3B0aW9uSGVpZ2h0O1xuICAgIH1cbiAgfVxufVxuIl19