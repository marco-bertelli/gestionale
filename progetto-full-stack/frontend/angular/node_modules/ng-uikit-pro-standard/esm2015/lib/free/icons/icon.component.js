import { Component, Input, ElementRef, Renderer2, ChangeDetectionStrategy, } from '@angular/core';
import { Utils } from '../utils';
export class MdbIconComponent {
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this.fab = false;
        this.far = false;
        this.fal = false;
        this.fad = false;
        this.fas = true;
        this.sizeClass = '';
        this.utils = new Utils();
    }
    ngOnInit() {
        if (this.size) {
            this.sizeClass = `fa-${this.size}`;
        }
        const classList = this._el.nativeElement.classList;
        this.fab = classList.contains('fab');
        this.far = classList.contains('far');
        this.fas = classList.contains('fas');
        this.fal = classList.contains('fal');
        this.fad = classList.contains('fad');
        const formWrapper = this.utils.getClosestEl(this._el.nativeElement, '.md-form') ||
            this.utils.getClosestEl(this._el.nativeElement, '.md-outline');
        if (formWrapper) {
            formWrapper.childNodes.forEach((el) => {
                if (el.tagName === 'INPUT' || 'TEXTAREA') {
                    this._renderer.listen(el, 'focus', () => {
                        this._renderer.addClass(this._el.nativeElement, 'active');
                    });
                    this._renderer.listen(el, 'blur', () => {
                        this._renderer.removeClass(this._el.nativeElement, 'active');
                    });
                }
            });
        }
    }
}
MdbIconComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-icon',
                template: "<i\n  [ngClass]=\"{ fas: fas, far: far, fab: fab, fal: fal, fad: fad }\"\n  class=\"fa-{{ icon }} {{ class }} {{ classInside }} {{ sizeClass }}\"\n></i>\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
MdbIconComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
MdbIconComponent.propDecorators = {
    icon: [{ type: Input }],
    size: [{ type: Input }],
    class: [{ type: Input }],
    classInside: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy11aWtpdC1wcm8tc3RhbmRhcmQvc3JjL2xpYi9mcmVlL2ljb25zL2ljb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFVBQVUsRUFFVixTQUFTLEVBQ1QsdUJBQXVCLEdBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFPakMsTUFBTSxPQUFPLGdCQUFnQjtJQWdCM0IsWUFBb0IsR0FBZSxFQUFVLFNBQW9CO1FBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBVmpFLFFBQUcsR0FBRyxLQUFLLENBQUM7UUFDWixRQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ1osUUFBRyxHQUFHLEtBQUssQ0FBQztRQUNaLFFBQUcsR0FBRyxLQUFLLENBQUM7UUFDWixRQUFHLEdBQUcsSUFBSSxDQUFDO1FBRVgsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVmLFVBQUssR0FBVSxJQUFJLEtBQUssRUFBRSxDQUFDO0lBRXlDLENBQUM7SUFFckUsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDcEM7UUFFRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDbkQsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyQyxNQUFNLFdBQVcsR0FDZixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUM7WUFDM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFakUsSUFBSSxXQUFXLEVBQUU7WUFDZixXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQU8sRUFBRSxFQUFFO2dCQUN6QyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEtBQUssT0FBTyxJQUFJLFVBQVUsRUFBRTtvQkFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUU7d0JBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUM1RCxDQUFDLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTt3QkFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQy9ELENBQUMsQ0FBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7OztZQW5ERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLHNLQUFvQztnQkFDcEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztZQVhDLFVBQVU7WUFFVixTQUFTOzs7bUJBV1IsS0FBSzttQkFDTCxLQUFLO29CQUNMLEtBQUs7MEJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLWljb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vaWNvbi5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJJY29uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuICBASW5wdXQoKSBzaXplOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNsYXNzSW5zaWRlOiBzdHJpbmc7XG5cbiAgZmFiID0gZmFsc2U7XG4gIGZhciA9IGZhbHNlO1xuICBmYWwgPSBmYWxzZTtcbiAgZmFkID0gZmFsc2U7XG4gIGZhcyA9IHRydWU7XG5cbiAgc2l6ZUNsYXNzID0gJyc7XG5cbiAgdXRpbHM6IFV0aWxzID0gbmV3IFV0aWxzKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSkge1xuICAgICAgdGhpcy5zaXplQ2xhc3MgPSBgZmEtJHt0aGlzLnNpemV9YDtcbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc0xpc3QgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdDtcbiAgICB0aGlzLmZhYiA9IGNsYXNzTGlzdC5jb250YWlucygnZmFiJyk7XG4gICAgdGhpcy5mYXIgPSBjbGFzc0xpc3QuY29udGFpbnMoJ2ZhcicpO1xuICAgIHRoaXMuZmFzID0gY2xhc3NMaXN0LmNvbnRhaW5zKCdmYXMnKTtcbiAgICB0aGlzLmZhbCA9IGNsYXNzTGlzdC5jb250YWlucygnZmFsJyk7XG4gICAgdGhpcy5mYWQgPSBjbGFzc0xpc3QuY29udGFpbnMoJ2ZhZCcpO1xuXG4gICAgY29uc3QgZm9ybVdyYXBwZXIgPVxuICAgICAgdGhpcy51dGlscy5nZXRDbG9zZXN0RWwodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJy5tZC1mb3JtJykgfHxcbiAgICAgIHRoaXMudXRpbHMuZ2V0Q2xvc2VzdEVsKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICcubWQtb3V0bGluZScpO1xuXG4gICAgaWYgKGZvcm1XcmFwcGVyKSB7XG4gICAgICBmb3JtV3JhcHBlci5jaGlsZE5vZGVzLmZvckVhY2goKGVsOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGVsLnRhZ05hbWUgPT09ICdJTlBVVCcgfHwgJ1RFWFRBUkVBJykge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmxpc3RlbihlbCwgJ2ZvY3VzJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2FjdGl2ZScpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmxpc3RlbihlbCwgJ2JsdXInLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnYWN0aXZlJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19