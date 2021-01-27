import { Directive, Input, HostListener, HostBinding, ChangeDetectorRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
export class ScrollSpyLinkDirective {
    constructor(cdRef, document) {
        this.cdRef = cdRef;
        this.document = document;
        this._scrollIntoView = true;
        this.active = false;
    }
    get scrollIntoView() { return this._scrollIntoView; }
    set scrollIntoView(value) {
        this._scrollIntoView = value;
    }
    get section() { return this._section; }
    set section(value) {
        if (value) {
            this._section = value;
        }
    }
    get id() {
        return this._id;
    }
    set id(newId) {
        if (newId) {
            this._id = newId;
        }
    }
    onClick() {
        if (this.section && this.scrollIntoView === true) {
            this.section.scrollIntoView();
        }
    }
    detectChanges() {
        this.cdRef.detectChanges();
    }
    assignSectionToId() {
        this.section = this.document.documentElement.querySelector(`#${this.id}`);
    }
    ngOnInit() {
        this.assignSectionToId();
    }
}
ScrollSpyLinkDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mdbScrollSpyLink]'
            },] }
];
ScrollSpyLinkDirective.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
ScrollSpyLinkDirective.propDecorators = {
    scrollIntoView: [{ type: Input }],
    id: [{ type: Input, args: ['mdbScrollSpyLink',] }],
    active: [{ type: HostBinding, args: ['class.active',] }],
    onClick: [{ type: HostListener, args: ['click', [],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXNweS1saW5rLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXVpa2l0LXByby1zdGFuZGFyZC9zcmMvbGliL3Byby9zY3JvbGwtc3B5L3Njcm9sbC1zcHktbGluay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsWUFBWSxFQUNaLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUszQyxNQUFNLE9BQU8sc0JBQXNCO0lBaUJqQyxZQUNVLEtBQXdCLEVBQ04sUUFBYTtRQUQvQixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUNOLGFBQVEsR0FBUixRQUFRLENBQUs7UUFiakMsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUEyQi9CLFdBQU0sR0FBRyxLQUFLLENBQUM7SUFiWixDQUFDO0lBbkJKLElBQ0ksY0FBYyxLQUFLLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDckQsSUFBSSxjQUFjLENBQUMsS0FBYztRQUMvQixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDO0lBR0QsSUFBSSxPQUFPLEtBQUssT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUN2QyxJQUFJLE9BQU8sQ0FBQyxLQUFrQjtRQUM1QixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQVNELElBQ0ksRUFBRTtRQUNKLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBQ0QsSUFBSSxFQUFFLENBQUMsS0FBYTtRQUNsQixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQU1ELE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLEVBQUU7WUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMvQjtJQUNILENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQXZERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjthQUMvQjs7O1lBUEMsaUJBQWlCOzRDQTJCZCxNQUFNLFNBQUMsUUFBUTs7OzZCQWxCakIsS0FBSztpQkFxQkwsS0FBSyxTQUFDLGtCQUFrQjtxQkFVeEIsV0FBVyxTQUFDLGNBQWM7c0JBRzFCLFlBQVksU0FBQyxPQUFPLEVBQUUsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgSG9zdExpc3RlbmVyLFxuICBIb3N0QmluZGluZyxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEluamVjdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21kYlNjcm9sbFNweUxpbmtdJ1xufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxTcHlMaW5rRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgZ2V0IHNjcm9sbEludG9WaWV3KCkgeyByZXR1cm4gdGhpcy5fc2Nyb2xsSW50b1ZpZXc7IH1cbiAgc2V0IHNjcm9sbEludG9WaWV3KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2Nyb2xsSW50b1ZpZXcgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9zY3JvbGxJbnRvVmlldyA9IHRydWU7XG5cbiAgZ2V0IHNlY3Rpb24oKSB7IHJldHVybiB0aGlzLl9zZWN0aW9uOyB9XG4gIHNldCBzZWN0aW9uKHZhbHVlOiBIVE1MRWxlbWVudCkge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fc2VjdGlvbiA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9zZWN0aW9uOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnlcbiAgKSB7fVxuXG4gIEBJbnB1dCgnbWRiU2Nyb2xsU3B5TGluaycpXG4gIGdldCBpZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuICBzZXQgaWQobmV3SWQ6IHN0cmluZykge1xuICAgIGlmIChuZXdJZCkge1xuICAgICAgdGhpcy5faWQgPSBuZXdJZDtcbiAgICB9XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjdGl2ZScpXG4gIGFjdGl2ZSA9IGZhbHNlO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgW10pXG4gIG9uQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuc2VjdGlvbiAmJiB0aGlzLnNjcm9sbEludG9WaWV3ID09PSB0cnVlKSB7XG4gICAgICB0aGlzLnNlY3Rpb24uc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICB9XG4gIH1cblxuICBkZXRlY3RDaGFuZ2VzKCkge1xuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgYXNzaWduU2VjdGlvblRvSWQoKSB7XG4gICAgdGhpcy5zZWN0aW9uID0gdGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dGhpcy5pZH1gKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXNzaWduU2VjdGlvblRvSWQoKTtcbiAgfVxufVxuIl19