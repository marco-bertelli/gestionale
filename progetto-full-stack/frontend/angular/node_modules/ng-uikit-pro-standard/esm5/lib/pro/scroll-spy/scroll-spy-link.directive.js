import { __decorate, __metadata, __param } from "tslib";
import { Directive, OnInit, Input, HostListener, HostBinding, ChangeDetectorRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
var ScrollSpyLinkDirective = /** @class */ (function () {
    function ScrollSpyLinkDirective(cdRef, document) {
        this.cdRef = cdRef;
        this.document = document;
        this._scrollIntoView = true;
        this.active = false;
    }
    Object.defineProperty(ScrollSpyLinkDirective.prototype, "scrollIntoView", {
        get: function () { return this._scrollIntoView; },
        set: function (value) {
            this._scrollIntoView = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollSpyLinkDirective.prototype, "section", {
        get: function () { return this._section; },
        set: function (value) {
            if (value) {
                this._section = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollSpyLinkDirective.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (newId) {
            if (newId) {
                this._id = newId;
            }
        },
        enumerable: true,
        configurable: true
    });
    ScrollSpyLinkDirective.prototype.onClick = function () {
        if (this.section && this.scrollIntoView === true) {
            this.section.scrollIntoView();
        }
    };
    ScrollSpyLinkDirective.prototype.detectChanges = function () {
        this.cdRef.detectChanges();
    };
    ScrollSpyLinkDirective.prototype.assignSectionToId = function () {
        this.section = this.document.documentElement.querySelector("#" + this.id);
    };
    ScrollSpyLinkDirective.prototype.ngOnInit = function () {
        this.assignSectionToId();
    };
    ScrollSpyLinkDirective.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], ScrollSpyLinkDirective.prototype, "scrollIntoView", null);
    __decorate([
        Input('mdbScrollSpyLink'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ScrollSpyLinkDirective.prototype, "id", null);
    __decorate([
        HostBinding('class.active'),
        __metadata("design:type", Object)
    ], ScrollSpyLinkDirective.prototype, "active", void 0);
    __decorate([
        HostListener('click', []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ScrollSpyLinkDirective.prototype, "onClick", null);
    ScrollSpyLinkDirective = __decorate([
        Directive({
            selector: '[mdbScrollSpyLink]'
        }),
        __param(1, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [ChangeDetectorRef, Object])
    ], ScrollSpyLinkDirective);
    return ScrollSpyLinkDirective;
}());
export { ScrollSpyLinkDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXNweS1saW5rLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vc2Nyb2xsLXNweS9zY3JvbGwtc3B5LWxpbmsuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixLQUFLLEVBQ0wsWUFBWSxFQUNaLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUszQztJQWlCRSxnQ0FDVSxLQUF3QixFQUNOLFFBQWE7UUFEL0IsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDTixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBYmpDLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBMkIvQixXQUFNLEdBQUcsS0FBSyxDQUFDO0lBYlosQ0FBQztJQWxCSixzQkFBSSxrREFBYzthQUFsQixjQUF1QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2FBQ3JELFVBQW1CLEtBQWM7WUFDL0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQzs7O09BSG9EO0lBTXJELHNCQUFJLDJDQUFPO2FBQVgsY0FBZ0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUN2QyxVQUFZLEtBQWtCO1lBQzVCLElBQUksS0FBSyxFQUFFO2dCQUNULElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2FBQ3ZCO1FBQ0gsQ0FBQzs7O09BTHNDO0lBZXZDLHNCQUFJLHNDQUFFO2FBQU47WUFDRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbEIsQ0FBQzthQUNELFVBQU8sS0FBYTtZQUNsQixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQzthQUNsQjtRQUNILENBQUM7OztPQUxBO0lBV0Qsd0NBQU8sR0FBUDtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksRUFBRTtZQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztJQUVELDhDQUFhLEdBQWI7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxrREFBaUIsR0FBakI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxNQUFJLElBQUksQ0FBQyxFQUFJLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQseUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7O2dCQWxDZ0IsaUJBQWlCO2dEQUMvQixNQUFNLFNBQUMsUUFBUTs7SUFqQmxCO1FBREMsS0FBSyxFQUFFOzs7Z0VBQzZDO0lBcUJyRDtRQURDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQzs7O29EQUd6QjtJQVFEO1FBREMsV0FBVyxDQUFDLGNBQWMsQ0FBQzs7MERBQ2I7SUFHZjtRQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDOzs7O3lEQUt6QjtJQXhDVSxzQkFBc0I7UUFIbEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG9CQUFvQjtTQUMvQixDQUFDO1FBb0JHLFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO3lDQURGLGlCQUFpQjtPQWxCdkIsc0JBQXNCLENBcURsQztJQUFELDZCQUFDO0NBQUEsQUFyREQsSUFxREM7U0FyRFksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBPbkluaXQsXG4gIElucHV0LFxuICBIb3N0TGlzdGVuZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWRiU2Nyb2xsU3B5TGlua10nXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbFNweUxpbmtEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBnZXQgc2Nyb2xsSW50b1ZpZXcoKSB7IHJldHVybiB0aGlzLl9zY3JvbGxJbnRvVmlldzsgfVxuICBzZXQgc2Nyb2xsSW50b1ZpZXcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zY3JvbGxJbnRvVmlldyA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX3Njcm9sbEludG9WaWV3ID0gdHJ1ZTtcblxuICBnZXQgc2VjdGlvbigpIHsgcmV0dXJuIHRoaXMuX3NlY3Rpb247IH1cbiAgc2V0IHNlY3Rpb24odmFsdWU6IEhUTUxFbGVtZW50KSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9zZWN0aW9uID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX3NlY3Rpb246IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9pZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueVxuICApIHt9XG5cbiAgQElucHV0KCdtZGJTY3JvbGxTcHlMaW5rJylcbiAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG4gIHNldCBpZChuZXdJZDogc3RyaW5nKSB7XG4gICAgaWYgKG5ld0lkKSB7XG4gICAgICB0aGlzLl9pZCA9IG5ld0lkO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJylcbiAgYWN0aXZlID0gZmFsc2U7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbXSlcbiAgb25DbGljaygpIHtcbiAgICBpZiAodGhpcy5zZWN0aW9uICYmIHRoaXMuc2Nyb2xsSW50b1ZpZXcgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuc2VjdGlvbi5zY3JvbGxJbnRvVmlldygpO1xuICAgIH1cbiAgfVxuXG4gIGRldGVjdENoYW5nZXMoKSB7XG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBhc3NpZ25TZWN0aW9uVG9JZCgpIHtcbiAgICB0aGlzLnNlY3Rpb24gPSB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0aGlzLmlkfWApO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hc3NpZ25TZWN0aW9uVG9JZCgpO1xuICB9XG59XG4iXX0=