import { __decorate, __metadata } from "tslib";
import { Component, ContentChildren, Input, QueryList, ViewEncapsulation, ChangeDetectionStrategy, } from '@angular/core';
import { SBItemComponent } from './sb-item';
import { MdbAccordionService } from '../mdb-accordion.service';
var SqueezeBoxComponent = /** @class */ (function () {
    function SqueezeBoxComponent(accordionService) {
        this.accordionService = accordionService;
        this.autoExpand = true;
        this._multiple = true;
    }
    Object.defineProperty(SqueezeBoxComponent.prototype, "multiple", {
        get: function () {
            return this._multiple;
        },
        set: function (value) {
            this._multiple = value;
            this.accordionService.updateMultipleState(value);
        },
        enumerable: true,
        configurable: true
    });
    SqueezeBoxComponent.prototype.ngOnInit = function () {
        this.accordionService.updateMultipleState(this.multiple);
    };
    SqueezeBoxComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (!this.multiple) {
            this.items.forEach(function (el) {
                var collapsed = el.collapsed ? true : false;
                el.applyToggle(collapsed);
                el.autoExpand = _this.autoExpand;
            });
        }
        this.itemsChanges = this.items.changes.subscribe(function (accordionItems) {
            _this.items = accordionItems;
            var accordionItemsArray = accordionItems.toArray();
            _this.accordionService.updateItemsArray(accordionItemsArray);
        });
        this.items.forEach(function (item) { return _this.accordionService.addItem(item); });
    };
    SqueezeBoxComponent.prototype.ngOnDestroy = function () {
        if (this.itemsChanges) {
            this.itemsChanges.unsubscribe();
        }
    };
    SqueezeBoxComponent.ctorParameters = function () { return [
        { type: MdbAccordionService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SqueezeBoxComponent.prototype, "multiple", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SqueezeBoxComponent.prototype, "autoExpand", void 0);
    __decorate([
        ContentChildren(SBItemComponent),
        __metadata("design:type", QueryList)
    ], SqueezeBoxComponent.prototype, "items", void 0);
    SqueezeBoxComponent = __decorate([
        Component({
            exportAs: 'squeezebox',
            selector: 'mdb-squeezebox, mdb-accordion',
            template: "<div class=\"accordion md-accordion\">\n  <ng-content></ng-content>\n</div>",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [MdbAccordionService],
            styles: [".md-accordion .card{overflow:visible;box-shadow:none;border-bottom:1px solid #e0e0e0;border-radius:0}.md-accordion .card:first-of-type,.md-accordion .card:not(:first-of-type):not(:last-of-type){border-bottom:1px solid #e0e0e0}.md-accordion .card .card-header{border-bottom:0;padding:1rem 1.5rem;background:0 0}.md-accordion .card .card-header .card-title{font-weight:400}.md-accordion .card .card-header a{transition:.3s ease-in-out}.md-accordion .card .card-header a:not(.collapsed) .rotate-icon{transform:rotate(180deg)}.md-accordion .card .fa-angle-down{float:right}.md-accordion .card .card-body{font-size:.9rem;line-height:1.7;font-weight:300;color:#626262}.accordion-gradient-bcg{background:linear-gradient(45deg,rgba(234,21,129,.6),rgba(10,23,187,.6) 100%)}.accordion.md-accordion.accordion-1 p,.accordion.md-accordion.accordion-2 p,.accordion.md-accordion.accordion-3 p,.accordion.md-accordion.accordion-4 p,.accordion.md-accordion.accordion-5 p{font-size:1rem}.accordion.md-accordion.accordion-1 .card,.accordion.md-accordion.accordion-1 .card .card-header,.accordion.md-accordion.accordion-2 .card,.accordion.md-accordion.accordion-2 .card .card-header,.accordion.md-accordion.accordion-4 .card,.accordion.md-accordion.accordion-4 .card .card-header,.accordion.md-accordion.accordion-5 .card,.accordion.md-accordion.accordion-5 .card .card-header{border:0}.accordion.md-accordion.accordion-1 .card .card-body{line-height:1.4}.accordion.md-accordion.accordion-2 .card{background-color:transparent}.accordion.md-accordion.accordion-2 .card .card-body{border:0;border-radius:3px}.accordion.md-accordion.accordion-3{border-radius:3px}.accordion.md-accordion.accordion-3 .fab.fa-angle-down,.accordion.md-accordion.accordion-3 .far.fa-angle-down,.accordion.md-accordion.accordion-3 .fas.fa-angle-down{margin-top:-10px}.accordion.md-accordion.accordion-4 .card:last-of-type .card-body{border-bottom-right-radius:3px;border-bottom-left-radius:3px}.accordion.md-accordion.accordion-5 .card{background-color:transparent}.accordion.md-accordion.accordion-5 .card .card-header{background-color:#f44336;transition:.3s}.accordion.md-accordion.accordion-5 .card .card-header:hover{transition:.3s;background-color:#455a64}.accordion.md-accordion.accordion-5 .card .card-header .fab,.accordion.md-accordion.accordion-5 .card .card-header .far,.accordion.md-accordion.accordion-5 .card .card-header .fas{background-color:#fff;border-top-left-radius:3px}.accordion.md-accordion.accordion-5 .card .card-body{border-bottom-right-radius:3px;border-bottom-left-radius:3px}.accordion.md-accordion.accordion-blocks .card{margin-bottom:1.2rem;box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}.accordion.md-accordion.accordion-blocks .card .card-body{border-top:1px solid #eee}.accordion .waves-effect,.accordion .waves-light{z-index:unset}.accordion .sb-item-body{transition:.5s;overflow:hidden}.accordion .card{border-bottom:1px solid #eee;box-shadow:none}.accordion .card .card-header{color:#0275d8;padding:1rem 1.5rem;background:0 0;border-bottom:0;cursor:pointer}.accordion .card .card-header a .rotate-icon{transform:rotate(180deg)}.accordion .card .fa-angle-down{float:right}.accordion .card .card-body{padding-top:.25rem}.accordion .card.is-collapsed .card-header a .rotate-icon{transform:rotate(0)}.collapsible-body{display:none}.card{position:relative}.card .card-body{flex:1 1 auto;padding:1.25rem}mdb-accordion-item>.card,mdb-item>.card{border:0}.mdb-accordion-indicator.rotate-icon{transition:150ms ease-in}.item-disabled,.item-disabled a>h5{color:#bdbdbd!important;cursor:default!important}mdb-accordion-item-head{outline:0!important}mdb-accordion-item-head .card-header a{color:inherit}.mdb-accordion-indicator{position:absolute;right:0;transform-origin:50% 65%;margin-right:24px;top:22px}.mdb-accordion-indicator::after{content:\"\";display:block;border-style:solid;border-width:0 3px 3px 0;padding:3.5px;transform:rotate(45deg)}mdb-side-nav .mdb-accordion-indicator{margin-right:1.25rem;margin-top:.25rem;top:.8rem}mdb-side-nav .mdb-accordion-indicator::after{border-width:0 2.2px 2.2px 0;padding:2px}"]
        }),
        __metadata("design:paramtypes", [MdbAccordionService])
    ], SqueezeBoxComponent);
    return SqueezeBoxComponent;
}());
export { SqueezeBoxComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3F1ZWV6ZWJveC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vYWNjb3JkaW9uL2NvbXBvbmVudHMvc3F1ZWV6ZWJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsS0FBSyxFQUdMLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsdUJBQXVCLEdBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDNUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFZL0Q7SUFpQkUsNkJBQW9CLGdCQUFxQztRQUFyQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXFCO1FBTGhELGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbkIsY0FBUyxHQUFHLElBQUksQ0FBQztJQUltQyxDQUFDO0lBYjdELHNCQUFJLHlDQUFRO2FBQVo7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzthQUNELFVBQWEsS0FBYztZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkQsQ0FBQzs7O09BSkE7SUFhRCxzQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsZ0RBQWtCLEdBQWxCO1FBQUEsaUJBZ0JDO1FBZkMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFPO2dCQUN6QixJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDOUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDMUIsRUFBRSxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFDLGNBQW1CO1lBQ25FLEtBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO1lBQzVCLElBQU0sbUJBQW1CLEdBQUcsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3JELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFTLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFuQyxDQUFtQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELHlDQUFXLEdBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqQztJQUNILENBQUM7O2dCQTVCcUMsbUJBQW1COztJQWJ6RDtRQURDLEtBQUssRUFBRTs7O3VEQUdQO0lBTVE7UUFBUixLQUFLLEVBQUU7OzJEQUFtQjtJQUdPO1FBQWpDLGVBQWUsQ0FBQyxlQUFlLENBQUM7a0NBQVEsU0FBUztzREFBa0I7SUFmekQsbUJBQW1CO1FBVC9CLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSwrQkFBK0I7WUFDekMsdUZBQThCO1lBRTlCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDOztTQUNqQyxDQUFDO3lDQWtCc0MsbUJBQW1CO09BakI5QyxtQkFBbUIsQ0E4Qy9CO0lBQUQsMEJBQUM7Q0FBQSxBQTlDRCxJQThDQztTQTlDWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTQkl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3NiLWl0ZW0nO1xuaW1wb3J0IHsgTWRiQWNjb3JkaW9uU2VydmljZSB9IGZyb20gJy4uL21kYi1hY2NvcmRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIGV4cG9ydEFzOiAnc3F1ZWV6ZWJveCcsXG4gIHNlbGVjdG9yOiAnbWRiLXNxdWVlemVib3gsIG1kYi1hY2NvcmRpb24nLFxuICB0ZW1wbGF0ZVVybDogJ3NxdWVlemVib3guaHRtbCcsXG4gIHN0eWxlVXJsczogWycuLy4uL2FjY29yZGlvbi1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbTWRiQWNjb3JkaW9uU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIFNxdWVlemVCb3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgaXRlbXNDaGFuZ2VzOiBTdWJzY3JpcHRpb247XG5cbiAgQElucHV0KClcbiAgZ2V0IG11bHRpcGxlKCkge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgfVxuICBzZXQgbXVsdGlwbGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tdWx0aXBsZSA9IHZhbHVlO1xuICAgIHRoaXMuYWNjb3JkaW9uU2VydmljZS51cGRhdGVNdWx0aXBsZVN0YXRlKHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIGF1dG9FeHBhbmQgPSB0cnVlO1xuICBwcml2YXRlIF9tdWx0aXBsZSA9IHRydWU7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihTQkl0ZW1Db21wb25lbnQpIGl0ZW1zOiBRdWVyeUxpc3Q8U0JJdGVtQ29tcG9uZW50PjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjY29yZGlvblNlcnZpY2U6IE1kYkFjY29yZGlvblNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hY2NvcmRpb25TZXJ2aWNlLnVwZGF0ZU11bHRpcGxlU3RhdGUodGhpcy5tdWx0aXBsZSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICB0aGlzLml0ZW1zLmZvckVhY2goKGVsOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgY29sbGFwc2VkID0gZWwuY29sbGFwc2VkID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICBlbC5hcHBseVRvZ2dsZShjb2xsYXBzZWQpO1xuICAgICAgICBlbC5hdXRvRXhwYW5kID0gdGhpcy5hdXRvRXhwYW5kO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5pdGVtc0NoYW5nZXMgPSB0aGlzLml0ZW1zLmNoYW5nZXMuc3Vic2NyaWJlKChhY2NvcmRpb25JdGVtczogYW55KSA9PiB7XG4gICAgICB0aGlzLml0ZW1zID0gYWNjb3JkaW9uSXRlbXM7XG4gICAgICBjb25zdCBhY2NvcmRpb25JdGVtc0FycmF5ID0gYWNjb3JkaW9uSXRlbXMudG9BcnJheSgpO1xuICAgICAgdGhpcy5hY2NvcmRpb25TZXJ2aWNlLnVwZGF0ZUl0ZW1zQXJyYXkoYWNjb3JkaW9uSXRlbXNBcnJheSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLml0ZW1zLmZvckVhY2goKGl0ZW06IGFueSkgPT4gdGhpcy5hY2NvcmRpb25TZXJ2aWNlLmFkZEl0ZW0oaXRlbSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuaXRlbXNDaGFuZ2VzKSB7XG4gICAgICB0aGlzLml0ZW1zQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19