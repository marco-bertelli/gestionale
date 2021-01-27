import { Directive, EventEmitter, HostBinding, Input, Output, ElementRef, Inject, PLATFORM_ID, Renderer2, } from '@angular/core';
import { TabsetComponent } from './tabset.component';
import { isPlatformBrowser } from '@angular/common';
export class TabDirective {
    constructor(platformId, tabset, el, renderer) {
        this.tabset = tabset;
        this.el = el;
        this.renderer = renderer;
        this._disabled = false;
        /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
        this.select = new EventEmitter();
        /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
        this.deselect = new EventEmitter();
        /** fired before tab will be removed */
        this.removed = new EventEmitter();
        this.addClass = true;
        this.test = true;
        this._active = false;
        this.isBrowser = null;
        this.isBrowser = isPlatformBrowser(platformId);
        this.tabset = tabset;
    }
    /** if true tab can not be activated */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
        if (this._disabled && this._active) {
            this.tabset.initActiveTab();
        }
    }
    /** tab active state toggle */
    get active() {
        return this._active;
    }
    set active(active) {
        if ((this.disabled && active) || !active) {
            if (this._active && !active) {
                this.renderer.removeClass(this.el.nativeElement, 'show');
                this.renderer.removeClass(this.el.nativeElement, 'active');
                this._active = active;
                this.deselect.emit(this);
            }
            return;
        }
        this.renderer.addClass(this.el.nativeElement, 'show');
        this.renderer.addClass(this.el.nativeElement, 'active');
        this._active = active;
        this.select.emit(this);
        this.tabset.tabs.forEach((mdbTab) => {
            if (mdbTab !== this) {
                mdbTab.active = false;
            }
        });
    }
    ngOnInit() {
        this.removable = this.removable;
        this.tabset.addTab(this);
        this.tabset.initActiveTab();
    }
    ngOnDestroy() {
        this.tabset.removeTab(this);
    }
}
TabDirective.decorators = [
    { type: Directive, args: [{ selector: 'mdb-tab, [mdbTab]' },] }
];
TabDirective.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: TabsetComponent },
    { type: ElementRef },
    { type: Renderer2 }
];
TabDirective.propDecorators = {
    type: [{ type: Input }],
    heading: [{ type: Input }],
    disabled: [{ type: Input }],
    removable: [{ type: Input }],
    customClass: [{ type: Input }],
    tabOrder: [{ type: Input }],
    active: [{ type: Input }],
    select: [{ type: Output }],
    deselect: [{ type: Output }],
    removed: [{ type: Output }],
    addClass: [{ type: HostBinding, args: ['class.tab-pane',] }],
    test: [{ type: HostBinding, args: ['class.fade',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXVpa2l0LXByby1zdGFuZGFyZC9zcmMvbGliL3Byby90YWJzLXBpbGxzL3RhYi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLEtBQUssRUFDTCxNQUFNLEVBRU4sVUFBVSxFQUVWLE1BQU0sRUFDTixXQUFXLEVBRVgsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUdwRCxNQUFNLE9BQU8sWUFBWTtJQW1FdkIsWUFDdUIsVUFBa0IsRUFDaEMsTUFBdUIsRUFDdkIsRUFBYyxFQUNiLFFBQW1CO1FBRnBCLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBQ3ZCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDYixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBdkRyQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBb0MxQiw0RkFBNEY7UUFDM0UsV0FBTSxHQUErQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pFLGdHQUFnRztRQUMvRSxhQUFRLEdBQStCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDM0UsdUNBQXVDO1FBQ3RCLFlBQU8sR0FBK0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVwQyxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLFNBQUksR0FBRyxJQUFJLENBQUM7UUFHdEMsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUV4QixjQUFTLEdBQVEsSUFBSSxDQUFDO1FBUXBCLElBQUksQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQXZFRCx1Q0FBdUM7SUFDdkMsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBRXZCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBU0QsOEJBQThCO0lBQzlCLElBQ1csTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBVyxNQUFNLENBQUMsTUFBZTtRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN4QyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzFCO1lBQ0QsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBb0IsRUFBRSxFQUFFO1lBQ2hELElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtnQkFDbkIsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDdkI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUEyQk0sUUFBUTtRQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7O1lBdEZGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTs7O3lDQXFFdkMsTUFBTSxTQUFDLFdBQVc7WUF4RWQsZUFBZTtZQVB0QixVQUFVO1lBS1YsU0FBUzs7O21CQU9SLEtBQUs7c0JBRUwsS0FBSzt1QkFFTCxLQUFLO3dCQWFMLEtBQUs7MEJBRUwsS0FBSzt1QkFFTCxLQUFLO3FCQUdMLEtBQUs7cUJBNEJMLE1BQU07dUJBRU4sTUFBTTtzQkFFTixNQUFNO3VCQUVOLFdBQVcsU0FBQyxnQkFBZ0I7bUJBQzVCLFdBQVcsU0FBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgRWxlbWVudFJlZixcbiAgT25Jbml0LFxuICBJbmplY3QsXG4gIFBMQVRGT1JNX0lELFxuICBPbkRlc3Ryb3ksXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUYWJzZXRDb21wb25lbnQgfSBmcm9tICcuL3RhYnNldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdtZGItdGFiLCBbbWRiVGFiXScgfSlcbmV4cG9ydCBjbGFzcyBUYWJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHB1YmxpYyB0eXBlOiBzdHJpbmc7XG4gIC8qKiB0YWIgaGVhZGVyIHRleHQgKi9cbiAgQElucHV0KCkgcHVibGljIGhlYWRpbmc6IHN0cmluZztcbiAgLyoqIGlmIHRydWUgdGFiIGNhbiBub3QgYmUgYWN0aXZhdGVkICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB2YWx1ZTtcblxuICAgIGlmICh0aGlzLl9kaXNhYmxlZCAmJiB0aGlzLl9hY3RpdmUpIHtcbiAgICAgIHRoaXMudGFic2V0LmluaXRBY3RpdmVUYWIoKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcbiAgLyoqIGlmIHRydWUgdGFiIGNhbiBiZSByZW1vdmFibGUsIGFkZGl0aW9uYWwgYnV0dG9uIHdpbGwgYXBwZWFyICovXG4gIEBJbnB1dCgpIHB1YmxpYyByZW1vdmFibGU6IGJvb2xlYW47XG4gIC8qKiBpZiBzZXQsIHdpbGwgYmUgYWRkZWQgdG8gdGhlIHRhYidzIGNsYXNzIGF0cmlidXRlICovXG4gIEBJbnB1dCgpIHB1YmxpYyBjdXN0b21DbGFzczogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHRhYk9yZGVyOiBudW1iZXI7XG5cbiAgLyoqIHRhYiBhY3RpdmUgc3RhdGUgdG9nZ2xlICovXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gIH1cblxuICBwdWJsaWMgc2V0IGFjdGl2ZShhY3RpdmU6IGJvb2xlYW4pIHtcbiAgICBpZiAoKHRoaXMuZGlzYWJsZWQgJiYgYWN0aXZlKSB8fCAhYWN0aXZlKSB7XG4gICAgICBpZiAodGhpcy5fYWN0aXZlICYmICFhY3RpdmUpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdzaG93Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnYWN0aXZlJyk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGFjdGl2ZTtcbiAgICAgICAgdGhpcy5kZXNlbGVjdC5lbWl0KHRoaXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3Nob3cnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2FjdGl2ZScpO1xuICAgIHRoaXMuX2FjdGl2ZSA9IGFjdGl2ZTtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KHRoaXMpO1xuXG4gICAgdGhpcy50YWJzZXQudGFicy5mb3JFYWNoKChtZGJUYWI6IFRhYkRpcmVjdGl2ZSkgPT4ge1xuICAgICAgaWYgKG1kYlRhYiAhPT0gdGhpcykge1xuICAgICAgICBtZGJUYWIuYWN0aXZlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogZmlyZWQgd2hlbiB0YWIgYmVjYW1lIGFjdGl2ZSwgJGV2ZW50OlRhYiBlcXVhbHMgdG8gc2VsZWN0ZWQgaW5zdGFuY2Ugb2YgVGFiIGNvbXBvbmVudCAqL1xuICBAT3V0cHV0KCkgcHVibGljIHNlbGVjdDogRXZlbnRFbWl0dGVyPFRhYkRpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8qKiBmaXJlZCB3aGVuIHRhYiBiZWNhbWUgaW5hY3RpdmUsICRldmVudDpUYWIgZXF1YWxzIHRvIGRlc2VsZWN0ZWQgaW5zdGFuY2Ugb2YgVGFiIGNvbXBvbmVudCAqL1xuICBAT3V0cHV0KCkgcHVibGljIGRlc2VsZWN0OiBFdmVudEVtaXR0ZXI8VGFiRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyoqIGZpcmVkIGJlZm9yZSB0YWIgd2lsbCBiZSByZW1vdmVkICovXG4gIEBPdXRwdXQoKSBwdWJsaWMgcmVtb3ZlZDogRXZlbnRFbWl0dGVyPFRhYkRpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50YWItcGFuZScpIHB1YmxpYyBhZGRDbGFzcyA9IHRydWU7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuZmFkZScpIHB1YmxpYyB0ZXN0ID0gdHJ1ZTtcblxuICBwdWJsaWMgaGVhZGluZ1JlZjogVGVtcGxhdGVSZWY8YW55PjtcbiAgcHJpdmF0ZSBfYWN0aXZlID0gZmFsc2U7XG5cbiAgaXNCcm93c2VyOiBhbnkgPSBudWxsO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBzdHJpbmcsXG4gICAgcHVibGljIHRhYnNldDogVGFic2V0Q29tcG9uZW50LFxuICAgIHB1YmxpYyBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7XG4gICAgdGhpcy5pc0Jyb3dzZXIgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKTtcbiAgICB0aGlzLnRhYnNldCA9IHRhYnNldDtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92YWJsZSA9IHRoaXMucmVtb3ZhYmxlO1xuICAgIHRoaXMudGFic2V0LmFkZFRhYih0aGlzKTtcbiAgICB0aGlzLnRhYnNldC5pbml0QWN0aXZlVGFiKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnRhYnNldC5yZW1vdmVUYWIodGhpcyk7XG4gIH1cbn1cbiJdfQ==