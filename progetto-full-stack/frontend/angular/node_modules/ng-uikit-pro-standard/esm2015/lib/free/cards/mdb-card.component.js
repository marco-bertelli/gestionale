import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewChild, ViewEncapsulation, } from '@angular/core';
export class MdbCardComponent {
    constructor(_el, _r) {
        this._el = _el;
        this._r = _r;
    }
    set narrower(narrower) {
        if (narrower) {
            this._r.addClass(this._el.nativeElement, 'narrower');
        }
        else if (!narrower && this._el.nativeElement.classList.contains('narrower')) {
            this._r.removeClass(this._el.nativeElement, 'narrower');
        }
    }
    set reverse(reverse) {
        if (reverse) {
            this._r.addClass(this._el.nativeElement, 'reverse');
        }
        else if (!reverse && this._el.nativeElement.classList.contains('reserse')) {
            this._r.removeClass(this._el.nativeElement, 'reverse');
        }
    }
    set dark(dark) {
        if (dark) {
            this._r.addClass(this._el.nativeElement, 'card-dark');
        }
        else if (!dark && this._el.nativeElement.classList.contains('card-dark')) {
            this._r.removeClass(this._el.nativeElement, 'card-dark');
        }
    }
    set bgColor(color) {
        if (color) {
            this._r.addClass(this._el.nativeElement, color);
        }
    }
    set borderColor(color) {
        if (color) {
            this._r.addClass(this._el.nativeElement, color);
        }
    }
    ngOnInit() {
        this._r.addClass(this._el.nativeElement, 'card');
        if (this.cascade) {
            this._r.addClass(this._el.nativeElement, 'card-cascade');
        }
        if (this.wider) {
            this._r.addClass(this._el.nativeElement, 'wider');
        }
        if (this.narrower) {
            this._r.addClass(this._el.nativeElement, 'narrower');
        }
        if (this.class) {
            this.class.split(' ').forEach((element) => {
                this._r.addClass(this._el.nativeElement, element);
            });
        }
    }
}
MdbCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-card',
                template: "<ng-content></ng-content>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".card{border:0;box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);font-weight:400}.card[class*=border]{border:1px solid #9e9e9e;box-shadow:none}.card .card-body h1,.card .card-body h2,.card .card-body h3,.card .card-body h4,.card .card-body h5,.card .card-body h6{font-weight:400}.card .card-body .card-title a,.card .card-body .card-title a:hover{transition:.2s ease-in-out}.card .card-body .card-text{color:#747373;font-size:.9rem;font-weight:400}.card .md-form label{font-weight:300}.card-text:last-child{margin-bottom:1rem!important}mdb-card-img img.img-fluid{width:100%}.card.card-image{background-position:50%;background-size:cover;width:100%}.card.card-image [class*=rgba-]{border-radius:.25rem}.card.card-cascade .view.view-cascade{border-radius:.25rem;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)}.card.card-cascade .view.view-cascade.gradient-card-header{color:#fff;padding:1.6rem 1rem;text-align:center}.card.card-cascade .view.view-cascade.gradient-card-header .card-header-title{font-weight:500}.card.card-cascade .view.view-cascade.gradient-card-header .btn-floating{background-color:hsla(0,0%,100%,.2)}.card.card-cascade.wider{background-color:transparent;box-shadow:none}.card.card-cascade.wider .view.view-cascade{z-index:2}.card.card-cascade.wider .card-body.card-body-cascade{background:#fff;border-radius:0 0 .25rem .25rem;box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);margin-left:4%;margin-right:4%;z-index:1}.card.card-cascade.wider .card-body.card-body-cascade .card-footer{margin-left:-1.25rem;margin-right:-1.25rem}.card.card-cascade.wider.reverse .card-body.card-body-cascade{border-radius:.25rem;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);margin-top:-1rem;z-index:3}.card.card-cascade.narrower{margin-top:1.25rem}.card.card-cascade.narrower .view.view-cascade{margin-left:4%;margin-right:4%;margin-top:-1.25rem}.card.card-cascade.panel-cascade .view{color:#fff;text-align:center}.card.card-cascade.panel-cascade .list-group .list-group-item{border:0;border-bottom:1px solid #eee;color:#495057;margin-bottom:0}.card.card-cascade.panel-cascade .list-group .list-group-item:hover{background-color:#eee}.card .btn-action{margin-bottom:-1.44rem;margin-top:-1.44rem}.card .activator{font-size:1.2rem;position:absolute;right:0}.card .card-reveal{display:none;height:100%;overflow-y:auto;position:absolute;top:100%;width:100%;z-index:1}.card .card-reveal .content{position:relative}.card.ovf-hidden{overflow:hidden}.card .card-share{position:relative}.card .card-share .social-reveal{position:absolute;right:1.88rem;top:-1.44rem;transform:translateZ(0);transform:translateX(0);transition:transform .35s ease;visibility:hidden;width:auto}.card .card-share .social-reveal-active{transform:translateZ(0);transform:translateX(-48px);transition:transform .35s ease;visibility:visible;z-index:11}.card-wrapper .card-rotating .card-title,.card .card-reveal .card-title{cursor:pointer}.card-wrapper .card-rotating .card-title i,.card .card-reveal .card-title i{color:#9e9e9e;position:absolute;right:.63rem}.card-wrapper{margin:0;perspective:800px;position:relative;width:100%}.card-wrapper .card-up{height:200px;overflow:hidden}.card-wrapper .card-up img{vertical-align:middle}.card-wrapper .avatar{display:block;margin-top:-60px;overflow:hidden;width:120px}.card-wrapper .avatar img{background:none repeat scroll 0 0 #fff;border:5px solid #fff;width:100%}.card-wrapper .card-rotating{height:100%;transform-style:preserve-3d;transition:.5s}.card-wrapper .card-rotating .face{-webkit-backface-visibility:hidden;backface-visibility:hidden;background:#fff;position:absolute;width:100%;z-index:2}.card-wrapper .card-rotating.flipped{transform:rotateY(180deg)}.card-wrapper .card-rotating .front{z-index:1}.card-wrapper .card-rotating .back,.card-wrapper .card-rotating .front{transition:1s}.testimonial-card .card-up{border-top-left-radius:.25rem;border-top-right-radius:.25rem;height:120px;overflow:hidden}.testimonial-card .avatar{border:5px solid #fff;border-radius:50%;margin-top:-60px;overflow:hidden;width:120px}.testimonial-card .avatar img{width:100%}.testimonial-card .card-body{text-align:center}"]
            },] }
];
MdbCardComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
MdbCardComponent.propDecorators = {
    class: [{ type: Input }],
    cascade: [{ type: Input }],
    wider: [{ type: Input }],
    imageBackground: [{ type: Input }],
    card: [{ type: ViewChild, args: ['card', { static: true },] }],
    narrower: [{ type: Input }],
    reverse: [{ type: Input }],
    dark: [{ type: Input }],
    bgColor: [{ type: Input }],
    borderColor: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctdWlraXQtcHJvLXN0YW5kYXJkL3NyYy9saWIvZnJlZS9jYXJkcy9tZGItY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQVN2QixNQUFNLE9BQU8sZ0JBQWdCO0lBNEMzQixZQUFvQixHQUFlLEVBQVUsRUFBYTtRQUF0QyxRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBVztJQUFHLENBQUM7SUFwQzlELElBQWEsUUFBUSxDQUFDLFFBQWlCO1FBQ3JDLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDdEQ7YUFBTSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDN0UsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDekQ7SUFDSCxDQUFDO0lBRUQsSUFBYSxPQUFPLENBQUMsT0FBZ0I7UUFDbkMsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNyRDthQUFNLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUMzRSxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7SUFFRCxJQUFhLElBQUksQ0FBQyxJQUFhO1FBQzdCLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDdkQ7YUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDMUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDMUQ7SUFDSCxDQUFDO0lBRUQsSUFBYSxPQUFPLENBQUMsS0FBYTtRQUNoQyxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQztJQUVELElBQWEsV0FBVyxDQUFDLEtBQWE7UUFDcEMsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNqRDtJQUNILENBQUM7SUFJRCxRQUFRO1FBQ04sSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDakQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDbkQ7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDdEQ7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtnQkFDN0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDcEQsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7OztZQXJFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLHVDQUF3QztnQkFFeEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7O1lBZEMsVUFBVTtZQUdWLFNBQVM7OztvQkFhUixLQUFLO3NCQUNMLEtBQUs7b0JBQ0wsS0FBSzs4QkFDTCxLQUFLO21CQUVMLFNBQVMsU0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO3VCQUVsQyxLQUFLO3NCQVFMLEtBQUs7bUJBUUwsS0FBSztzQkFRTCxLQUFLOzBCQU1MLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItY2FyZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9tZGItY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NhcmRzLW1vZHVsZS5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgY2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgY2FzY2FkZTogYm9vbGVhbjtcbiAgQElucHV0KCkgd2lkZXI6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGltYWdlQmFja2dyb3VuZDogc3RyaW5nO1xuXG4gIEBWaWV3Q2hpbGQoJ2NhcmQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBjYXJkOiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpIHNldCBuYXJyb3dlcihuYXJyb3dlcjogYm9vbGVhbikge1xuICAgIGlmIChuYXJyb3dlcikge1xuICAgICAgdGhpcy5fci5hZGRDbGFzcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnbmFycm93ZXInKTtcbiAgICB9IGVsc2UgaWYgKCFuYXJyb3dlciAmJiB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbmFycm93ZXInKSkge1xuICAgICAgdGhpcy5fci5yZW1vdmVDbGFzcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnbmFycm93ZXInKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBzZXQgcmV2ZXJzZShyZXZlcnNlOiBib29sZWFuKSB7XG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIHRoaXMuX3IuYWRkQ2xhc3ModGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ3JldmVyc2UnKTtcbiAgICB9IGVsc2UgaWYgKCFyZXZlcnNlICYmIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdyZXNlcnNlJykpIHtcbiAgICAgIHRoaXMuX3IucmVtb3ZlQ2xhc3ModGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ3JldmVyc2UnKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBzZXQgZGFyayhkYXJrOiBib29sZWFuKSB7XG4gICAgaWYgKGRhcmspIHtcbiAgICAgIHRoaXMuX3IuYWRkQ2xhc3ModGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2NhcmQtZGFyaycpO1xuICAgIH0gZWxzZSBpZiAoIWRhcmsgJiYgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcmQtZGFyaycpKSB7XG4gICAgICB0aGlzLl9yLnJlbW92ZUNsYXNzKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdjYXJkLWRhcmsnKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBzZXQgYmdDb2xvcihjb2xvcjogc3RyaW5nKSB7XG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICB0aGlzLl9yLmFkZENsYXNzKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsIGNvbG9yKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBzZXQgYm9yZGVyQ29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIGlmIChjb2xvcikge1xuICAgICAgdGhpcy5fci5hZGRDbGFzcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCBjb2xvcik7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3I6IFJlbmRlcmVyMikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9yLmFkZENsYXNzKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdjYXJkJyk7XG4gICAgaWYgKHRoaXMuY2FzY2FkZSkge1xuICAgICAgdGhpcy5fci5hZGRDbGFzcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnY2FyZC1jYXNjYWRlJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLndpZGVyKSB7XG4gICAgICB0aGlzLl9yLmFkZENsYXNzKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICd3aWRlcicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5uYXJyb3dlcikge1xuICAgICAgdGhpcy5fci5hZGRDbGFzcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnbmFycm93ZXInKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2xhc3MpIHtcbiAgICAgIHRoaXMuY2xhc3Muc3BsaXQoJyAnKS5mb3JFYWNoKChlbGVtZW50OiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5fci5hZGRDbGFzcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCBlbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19