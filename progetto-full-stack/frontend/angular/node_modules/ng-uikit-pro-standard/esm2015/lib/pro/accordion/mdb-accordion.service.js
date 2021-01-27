import { Injectable } from '@angular/core';
export class MdbAccordionService {
    constructor() {
        this._items = [];
        this._multiple = false;
    }
    addItem(item) {
        this._items.push(item);
    }
    updateItemsArray(items) {
        this._items = [...items];
    }
    updateMultipleState(value) {
        this._multiple = value;
    }
    didItemToggled(item) {
        // on not multiple, it will collpase the rest of items
        if (!this._multiple) {
            this._items.forEach((el) => {
                if (el !== item) {
                    el.applyToggle(true);
                }
                if (el === item) {
                    const collapsed = el.collapsed ? true : false;
                    setTimeout(() => {
                        el.applyToggle(collapsed);
                    }, 0);
                }
            });
        }
    }
}
MdbAccordionService.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLWFjY29yZGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctdWlraXQtcHJvLXN0YW5kYXJkL3NyYy9saWIvcHJvL2FjY29yZGlvbi9tZGItYWNjb3JkaW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUl6QyxNQUFNLE9BQU8sbUJBQW1CO0lBRGhDO1FBRVUsV0FBTSxHQUFzQixFQUFFLENBQUM7UUFDL0IsY0FBUyxHQUFHLEtBQUssQ0FBQztJQStCNUIsQ0FBQztJQTdCQyxPQUFPLENBQUMsSUFBcUI7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELGdCQUFnQixDQUFDLEtBQXdCO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxLQUFjO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxjQUFjLENBQUMsSUFBcUI7UUFDbEMsc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBTyxFQUFFLEVBQUU7Z0JBQzlCLElBQUksRUFBRSxLQUFLLElBQUksRUFBRTtvQkFDZixFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN0QjtnQkFDRCxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7b0JBQ2YsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQzlDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7d0JBQ2QsRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDNUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNQO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7OztZQWhDRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNCSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zYi1pdGVtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1kYkFjY29yZGlvblNlcnZpY2Uge1xuICBwcml2YXRlIF9pdGVtczogU0JJdGVtQ29tcG9uZW50W10gPSBbXTtcbiAgcHJpdmF0ZSBfbXVsdGlwbGUgPSBmYWxzZTtcblxuICBhZGRJdGVtKGl0ZW06IFNCSXRlbUNvbXBvbmVudCkge1xuICAgIHRoaXMuX2l0ZW1zLnB1c2goaXRlbSk7XG4gIH1cblxuICB1cGRhdGVJdGVtc0FycmF5KGl0ZW1zOiBTQkl0ZW1Db21wb25lbnRbXSkge1xuICAgIHRoaXMuX2l0ZW1zID0gWy4uLml0ZW1zXTtcbiAgfVxuXG4gIHVwZGF0ZU11bHRpcGxlU3RhdGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tdWx0aXBsZSA9IHZhbHVlO1xuICB9XG5cbiAgZGlkSXRlbVRvZ2dsZWQoaXRlbTogU0JJdGVtQ29tcG9uZW50KSB7XG4gICAgLy8gb24gbm90IG11bHRpcGxlLCBpdCB3aWxsIGNvbGxwYXNlIHRoZSByZXN0IG9mIGl0ZW1zXG4gICAgaWYgKCF0aGlzLl9tdWx0aXBsZSkge1xuICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoZWw6IGFueSkgPT4ge1xuICAgICAgICBpZiAoZWwgIT09IGl0ZW0pIHtcbiAgICAgICAgICBlbC5hcHBseVRvZ2dsZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWwgPT09IGl0ZW0pIHtcbiAgICAgICAgICBjb25zdCBjb2xsYXBzZWQgPSBlbC5jb2xsYXBzZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBlbC5hcHBseVRvZ2dsZShjb2xsYXBzZWQpO1xuICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxufVxuIl19