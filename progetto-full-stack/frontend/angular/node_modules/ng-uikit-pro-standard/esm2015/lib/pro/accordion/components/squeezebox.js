import { Component, ContentChildren, Input, QueryList, ViewEncapsulation, ChangeDetectionStrategy, } from '@angular/core';
import { SBItemComponent } from './sb-item';
import { MdbAccordionService } from '../mdb-accordion.service';
export class SqueezeBoxComponent {
    constructor(accordionService) {
        this.accordionService = accordionService;
        this.autoExpand = true;
        this._multiple = true;
    }
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = value;
        this.accordionService.updateMultipleState(value);
    }
    ngOnInit() {
        this.accordionService.updateMultipleState(this.multiple);
    }
    ngAfterContentInit() {
        if (!this.multiple) {
            this.items.forEach((el) => {
                const collapsed = el.collapsed ? true : false;
                el.applyToggle(collapsed);
                el.autoExpand = this.autoExpand;
            });
        }
        this.itemsChanges = this.items.changes.subscribe((accordionItems) => {
            this.items = accordionItems;
            const accordionItemsArray = accordionItems.toArray();
            this.accordionService.updateItemsArray(accordionItemsArray);
        });
        this.items.forEach((item) => this.accordionService.addItem(item));
    }
    ngOnDestroy() {
        if (this.itemsChanges) {
            this.itemsChanges.unsubscribe();
        }
    }
}
SqueezeBoxComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'squeezebox',
                selector: 'mdb-squeezebox, mdb-accordion',
                template: "<div class=\"accordion md-accordion\">\n  <ng-content></ng-content>\n</div>",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [MdbAccordionService],
                styles: [".md-accordion .card{border-radius:0;box-shadow:none;overflow:visible}.md-accordion .card,.md-accordion .card:first-of-type,.md-accordion .card:not(:first-of-type):not(:last-of-type){border-bottom:1px solid #e0e0e0}.md-accordion .card .card-header{background:transparent;border-bottom:0;padding:1rem 1.5rem}.md-accordion .card .card-header .card-title{font-weight:400}.md-accordion .card .card-header a{transition:.3s ease-in-out}.md-accordion .card .card-header a:not(.collapsed) .rotate-icon{transform:rotate(180deg)}.md-accordion .card .fa-angle-down{float:right}.md-accordion .card .card-body{color:#626262;font-size:.9rem;font-weight:300;line-height:1.7}.md-accordion .card .card-body .md-form{line-height:1.5}.accordion-gradient-bcg{background:linear-gradient(45deg,rgba(234,21,129,.6),rgba(10,23,187,.6) 100%)}.accordion.md-accordion.accordion-1 p,.accordion.md-accordion.accordion-2 p,.accordion.md-accordion.accordion-3 p,.accordion.md-accordion.accordion-4 p,.accordion.md-accordion.accordion-5 p{font-size:1rem}.accordion.md-accordion.accordion-1 .card,.accordion.md-accordion.accordion-1 .card .card-header,.accordion.md-accordion.accordion-2 .card,.accordion.md-accordion.accordion-2 .card .card-header,.accordion.md-accordion.accordion-4 .card,.accordion.md-accordion.accordion-4 .card .card-header,.accordion.md-accordion.accordion-5 .card,.accordion.md-accordion.accordion-5 .card .card-header{border:0}.accordion.md-accordion.accordion-1 .card .card-body{line-height:1.4}.accordion.md-accordion.accordion-2 .card{background-color:transparent}.accordion.md-accordion.accordion-2 .card .card-body{border:0;border-radius:3px}.accordion.md-accordion.accordion-3{border-radius:3px}.accordion.md-accordion.accordion-3 .fab.fa-angle-down,.accordion.md-accordion.accordion-3 .far.fa-angle-down,.accordion.md-accordion.accordion-3 .fas.fa-angle-down{margin-top:-10px}.accordion.md-accordion.accordion-4 .card:last-of-type .card-body{border-bottom-left-radius:3px;border-bottom-right-radius:3px}.accordion.md-accordion.accordion-5 .card{background-color:transparent}.accordion.md-accordion.accordion-5 .card .card-header{background-color:#f44336;transition:.3s}.accordion.md-accordion.accordion-5 .card .card-header:hover{background-color:#455a64;transition:.3s}.accordion.md-accordion.accordion-5 .card .card-header .fab,.accordion.md-accordion.accordion-5 .card .card-header .far,.accordion.md-accordion.accordion-5 .card .card-header .fas{background-color:#fff;border-top-left-radius:3px}.accordion.md-accordion.accordion-5 .card .card-body{border-bottom-left-radius:3px;border-bottom-right-radius:3px}.accordion.md-accordion.accordion-blocks .card{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);margin-bottom:1.2rem}.accordion.md-accordion.accordion-blocks .card .card-body{border-top:1px solid #eee}.accordion .waves-effect,.accordion .waves-light{z-index:unset}.accordion .sb-item-body{overflow:hidden;transition:.5s}.accordion .card{border-bottom:1px solid #eee;box-shadow:none}.accordion .card .card-header{background:transparent;border-bottom:0;color:#0275d8;cursor:pointer;padding:1rem 1.5rem}.accordion .card .card-header a .rotate-icon{transform:rotate(180deg)}.accordion .card .fa-angle-down{float:right}.accordion .card .card-body{padding-top:.25rem}.accordion .card.is-collapsed .card-header a .rotate-icon{transform:rotate(0deg)}.collapsible-body{display:none}.card{position:relative}.card .card-body{flex:1 1 auto;padding:1.25rem}mdb-accordion-item>.card,mdb-item>.card{border:0}.mdb-accordion-indicator.rotate-icon{transition:all .15s ease-in 0s}.item-disabled,.item-disabled a>h5{color:#bdbdbd!important;cursor:default!important}mdb-accordion-item-head{outline:none!important}mdb-accordion-item-head .card-header a{color:inherit}.mdb-accordion-indicator{margin-right:24px;position:absolute;right:0;top:22px;transform-origin:50% 65%}.mdb-accordion-indicator:after{border-style:solid;border-width:0 3px 3px 0;content:\"\";display:block;padding:3.5px;transform:rotate(45deg)}mdb-side-nav .mdb-accordion-indicator{margin-right:1.25rem;margin-top:.25rem;top:.8rem}mdb-side-nav .mdb-accordion-indicator:after{border-width:0 2.2px 2.2px 0;padding:2px}"]
            },] }
];
SqueezeBoxComponent.ctorParameters = () => [
    { type: MdbAccordionService }
];
SqueezeBoxComponent.propDecorators = {
    multiple: [{ type: Input }],
    autoExpand: [{ type: Input }],
    items: [{ type: ContentChildren, args: [SBItemComponent,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3F1ZWV6ZWJveC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXVpa2l0LXByby1zdGFuZGFyZC9zcmMvbGliL3Byby9hY2NvcmRpb24vY29tcG9uZW50cy9zcXVlZXplYm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsZUFBZSxFQUNmLEtBQUssRUFHTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLHVCQUF1QixHQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBWS9ELE1BQU0sT0FBTyxtQkFBbUI7SUFpQjlCLFlBQW9CLGdCQUFxQztRQUFyQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXFCO1FBTGhELGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbkIsY0FBUyxHQUFHLElBQUksQ0FBQztJQUltQyxDQUFDO0lBZDdELElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQVNELFFBQVE7UUFDTixJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRTtnQkFDN0IsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQzlDLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzFCLEVBQUUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxjQUFtQixFQUFFLEVBQUU7WUFDdkUsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7WUFDNUIsTUFBTSxtQkFBbUIsR0FBRyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakM7SUFDSCxDQUFDOzs7WUF0REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUUsK0JBQStCO2dCQUN6Qyx1RkFBOEI7Z0JBRTlCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUM7O2FBQ2pDOzs7WUFYUSxtQkFBbUI7Ozt1QkFlekIsS0FBSzt5QkFTTCxLQUFLO29CQUdMLGVBQWUsU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU0JJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9zYi1pdGVtJztcbmltcG9ydCB7IE1kYkFjY29yZGlvblNlcnZpY2UgfSBmcm9tICcuLi9tZGItYWNjb3JkaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBleHBvcnRBczogJ3NxdWVlemVib3gnLFxuICBzZWxlY3RvcjogJ21kYi1zcXVlZXplYm94LCBtZGItYWNjb3JkaW9uJyxcbiAgdGVtcGxhdGVVcmw6ICdzcXVlZXplYm94Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi8uLi9hY2NvcmRpb24tbW9kdWxlLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW01kYkFjY29yZGlvblNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBTcXVlZXplQm94Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGl0ZW1zQ2hhbmdlczogU3Vic2NyaXB0aW9uO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBtdWx0aXBsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGU7XG4gIH1cbiAgc2V0IG11bHRpcGxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbXVsdGlwbGUgPSB2YWx1ZTtcbiAgICB0aGlzLmFjY29yZGlvblNlcnZpY2UudXBkYXRlTXVsdGlwbGVTdGF0ZSh2YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoKSBhdXRvRXhwYW5kID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfbXVsdGlwbGUgPSB0cnVlO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oU0JJdGVtQ29tcG9uZW50KSBpdGVtczogUXVlcnlMaXN0PFNCSXRlbUNvbXBvbmVudD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhY2NvcmRpb25TZXJ2aWNlOiBNZGJBY2NvcmRpb25TZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWNjb3JkaW9uU2VydmljZS51cGRhdGVNdWx0aXBsZVN0YXRlKHRoaXMubXVsdGlwbGUpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKChlbDogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGVsLmNvbGxhcHNlZCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgZWwuYXBwbHlUb2dnbGUoY29sbGFwc2VkKTtcbiAgICAgICAgZWwuYXV0b0V4cGFuZCA9IHRoaXMuYXV0b0V4cGFuZDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuaXRlbXNDaGFuZ2VzID0gdGhpcy5pdGVtcy5jaGFuZ2VzLnN1YnNjcmliZSgoYWNjb3JkaW9uSXRlbXM6IGFueSkgPT4ge1xuICAgICAgdGhpcy5pdGVtcyA9IGFjY29yZGlvbkl0ZW1zO1xuICAgICAgY29uc3QgYWNjb3JkaW9uSXRlbXNBcnJheSA9IGFjY29yZGlvbkl0ZW1zLnRvQXJyYXkoKTtcbiAgICAgIHRoaXMuYWNjb3JkaW9uU2VydmljZS51cGRhdGVJdGVtc0FycmF5KGFjY29yZGlvbkl0ZW1zQXJyYXkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pdGVtcy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHRoaXMuYWNjb3JkaW9uU2VydmljZS5hZGRJdGVtKGl0ZW0pKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLml0ZW1zQ2hhbmdlcykge1xuICAgICAgdGhpcy5pdGVtc0NoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==