import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewEncapsulation, } from '@angular/core';
var MdbCardComponent = /** @class */ (function () {
    function MdbCardComponent(_el, _r) {
        this._el = _el;
        this._r = _r;
    }
    Object.defineProperty(MdbCardComponent.prototype, "narrower", {
        set: function (narrower) {
            if (narrower) {
                this._r.addClass(this._el.nativeElement, 'narrower');
            }
            else if (!narrower && this._el.nativeElement.classList.contains('narrower')) {
                this._r.removeClass(this._el.nativeElement, 'narrower');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdbCardComponent.prototype, "reverse", {
        set: function (reverse) {
            if (reverse) {
                this._r.addClass(this._el.nativeElement, 'reverse');
            }
            else if (!reverse && this._el.nativeElement.classList.contains('reserse')) {
                this._r.removeClass(this._el.nativeElement, 'reverse');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdbCardComponent.prototype, "dark", {
        set: function (dark) {
            if (dark) {
                this._r.addClass(this._el.nativeElement, 'card-dark');
            }
            else if (!dark && this._el.nativeElement.classList.contains('card-dark')) {
                this._r.removeClass(this._el.nativeElement, 'card-dark');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdbCardComponent.prototype, "bgColor", {
        set: function (color) {
            if (color) {
                this._r.addClass(this._el.nativeElement, color);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdbCardComponent.prototype, "borderColor", {
        set: function (color) {
            if (color) {
                this._r.addClass(this._el.nativeElement, color);
            }
        },
        enumerable: true,
        configurable: true
    });
    MdbCardComponent.prototype.ngOnInit = function () {
        var _this = this;
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
            this.class.split(' ').forEach(function (element) {
                _this._r.addClass(_this._el.nativeElement, element);
            });
        }
    };
    MdbCardComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbCardComponent.prototype, "class", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MdbCardComponent.prototype, "cascade", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MdbCardComponent.prototype, "wider", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbCardComponent.prototype, "imageBackground", void 0);
    __decorate([
        ViewChild('card', { static: true }),
        __metadata("design:type", ElementRef)
    ], MdbCardComponent.prototype, "card", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], MdbCardComponent.prototype, "narrower", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], MdbCardComponent.prototype, "reverse", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], MdbCardComponent.prototype, "dark", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], MdbCardComponent.prototype, "bgColor", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], MdbCardComponent.prototype, "borderColor", null);
    MdbCardComponent = __decorate([
        Component({
            selector: 'mdb-card',
            template: "<ng-content></ng-content>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: [".card{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);border:0;font-weight:400}.card[class*=border]{border:1px solid #9e9e9e;box-shadow:none}.card .card-body h1,.card .card-body h2,.card .card-body h3,.card .card-body h4,.card .card-body h5,.card .card-body h6{font-weight:400}.card .card-body .card-title a,.card .card-body .card-title a:hover{transition:.2s ease-in-out}.card .card-body .card-text{color:#747373;font-size:.9rem;font-weight:400}.card .md-form label{font-weight:300}.card-text:last-child{margin-bottom:1rem!important}mdb-card-img img.img-fluid{width:100%}.card.card-image{background-size:cover;background-position:center;width:100%}.card.card-image [class*=rgba-]{border-radius:.25rem}.card.card-cascade .view.view-cascade{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);border-radius:.25rem}.card.card-cascade .view.view-cascade.gradient-card-header{color:#fff;padding:1.6rem 1rem;text-align:center}.card.card-cascade .view.view-cascade.gradient-card-header .card-header-title{font-weight:500}.card.card-cascade .view.view-cascade.gradient-card-header .btn-floating{background-color:rgba(255,255,255,.2)}.card.card-cascade.wider{box-shadow:none;background-color:transparent}.card.card-cascade.wider .view.view-cascade{z-index:2}.card.card-cascade.wider .card-body.card-body-cascade{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);margin-left:4%;margin-right:4%;background:#fff;z-index:1;border-radius:0 0 .25rem .25rem}.card.card-cascade.wider .card-body.card-body-cascade .card-footer{margin-left:-1.25rem;margin-right:-1.25rem}.card.card-cascade.wider.reverse .card-body.card-body-cascade{z-index:3;margin-top:-1rem;border-radius:.25rem;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)}.card.card-cascade.narrower{margin-top:1.25rem}.card.card-cascade.narrower .view.view-cascade{margin-left:4%;margin-right:4%;margin-top:-1.25rem}.card.card-cascade.panel-cascade .view{text-align:center;color:#fff}.card.card-cascade.panel-cascade .list-group .list-group-item{margin-bottom:0;border:0;border-bottom:1px solid #eee;color:#495057}.card.card-cascade.panel-cascade .list-group .list-group-item:hover{background-color:#eee}.card .btn-action{margin-top:-1.44rem;margin-bottom:-1.44rem}.card .activator{position:absolute;right:0;font-size:1.2rem}.card .card-reveal{position:absolute;width:100%;overflow-y:auto;top:100%;height:100%;z-index:1;display:none}.card .card-reveal .content{position:relative}.card.ovf-hidden{overflow:hidden}.card .card-share{position:relative}.card .card-share .social-reveal{position:absolute;top:-1.44rem;right:1.88rem;visibility:hidden;width:auto;transform:translateZ(0);transform:translateX(0);transition:transform .35s}.card .card-share .social-reveal-active{z-index:11;visibility:visible;transform:translateZ(0);transform:translateX(-48px);transition:transform .35s}.card .card-reveal .card-title,.card-wrapper .card-rotating .card-title{cursor:pointer}.card .card-reveal .card-title i,.card-wrapper .card-rotating .card-title i{color:#9e9e9e;position:absolute;right:.63rem}.card-wrapper{perspective:800px;position:relative;margin:0;width:100%}.card-wrapper .card-up{height:200px;overflow:hidden}.card-wrapper .card-up img{vertical-align:middle}.card-wrapper .avatar{display:block;margin-top:-60px;overflow:hidden;width:120px}.card-wrapper .avatar img{border:5px solid #fff;background:#fff;width:100%}.card-wrapper .card-rotating{height:100%;transform-style:preserve-3d;transition:.5s}.card-wrapper .card-rotating .face{width:100%;position:absolute;background:#fff;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:2}.card-wrapper .card-rotating.flipped{transform:rotateY(180deg)}.card-wrapper .card-rotating .front{z-index:1}.card-wrapper .card-rotating .back,.card-wrapper .card-rotating .front{transition:1s}.testimonial-card .card-up{overflow:hidden;height:120px;border-top-left-radius:.25rem;border-top-right-radius:.25rem}.testimonial-card .avatar{border-radius:50%;width:120px;margin-top:-60px;overflow:hidden;border:5px solid #fff}.testimonial-card .avatar img{width:100%}.testimonial-card .card-body{text-align:center}"]
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer2])
    ], MdbCardComponent);
    return MdbCardComponent;
}());
export { MdbCardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvY2FyZHMvbWRiLWNhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQVN2QjtJQTRDRSwwQkFBb0IsR0FBZSxFQUFVLEVBQWE7UUFBdEMsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLE9BQUUsR0FBRixFQUFFLENBQVc7SUFBRyxDQUFDO0lBcENyRCxzQkFBSSxzQ0FBUTthQUFaLFVBQWEsUUFBaUI7WUFDckMsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDdEQ7aUJBQU0sSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM3RSxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUN6RDtRQUNILENBQUM7OztPQUFBO0lBRVEsc0JBQUkscUNBQU87YUFBWCxVQUFZLE9BQWdCO1lBQ25DLElBQUksT0FBTyxFQUFFO2dCQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3JEO2lCQUFNLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxh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OzttREFJUDtJQUVRO1FBQVIsS0FBSyxFQUFFOzs7dURBSVA7SUExQ1UsZ0JBQWdCO1FBUDVCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxVQUFVO1lBQ3BCLHVDQUF3QztZQUV4QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7U0FDdEMsQ0FBQzt5Q0E2Q3lCLFVBQVUsRUFBYyxTQUFTO09BNUMvQyxnQkFBZ0IsQ0ErRDVCO0lBQUQsdUJBQUM7Q0FBQSxBQS9ERCxJQStEQztTQS9EWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItY2FyZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9tZGItY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NhcmRzLW1vZHVsZS5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgY2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgY2FzY2FkZTogYm9vbGVhbjtcbiAgQElucHV0KCkgd2lkZXI6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGltYWdlQmFja2dyb3VuZDogc3RyaW5nO1xuXG4gIEBWaWV3Q2hpbGQoJ2NhcmQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBjYXJkOiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpIHNldCBuYXJyb3dlcihuYXJyb3dlcjogYm9vbGVhbikge1xuICAgIGlmIChuYXJyb3dlcikge1xuICAgICAgdGhpcy5fci5hZGRDbGFzcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnbmFycm93ZXInKTtcbiAgICB9IGVsc2UgaWYgKCFuYXJyb3dlciAmJiB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbmFycm93ZXInKSkge1xuICAgICAgdGhpcy5fci5yZW1vdmVDbGFzcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnbmFycm93ZXInKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBzZXQgcmV2ZXJzZShyZXZlcnNlOiBib29sZWFuKSB7XG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIHRoaXMuX3IuYWRkQ2xhc3ModGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ3JldmVyc2UnKTtcbiAgICB9IGVsc2UgaWYgKCFyZXZlcnNlICYmIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdyZXNlcnNlJykpIHtcbiAgICAgIHRoaXMuX3IucmVtb3ZlQ2xhc3ModGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ3JldmVyc2UnKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBzZXQgZGFyayhkYXJrOiBib29sZWFuKSB7XG4gICAgaWYgKGRhcmspIHtcbiAgICAgIHRoaXMuX3IuYWRkQ2xhc3ModGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2NhcmQtZGFyaycpO1xuICAgIH0gZWxzZSBpZiAoIWRhcmsgJiYgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcmQtZGFyaycpKSB7XG4gICAgICB0aGlzLl9yLnJlbW92ZUNsYXNzKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdjYXJkLWRhcmsnKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBzZXQgYmdDb2xvcihjb2xvcjogc3RyaW5nKSB7XG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICB0aGlzLl9yLmFkZENsYXNzKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsIGNvbG9yKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBzZXQgYm9yZGVyQ29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIGlmIChjb2xvcikge1xuICAgICAgdGhpcy5fci5hZGRDbGFzcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCBjb2xvcik7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3I6IFJlbmRlcmVyMikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9yLmFkZENsYXNzKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdjYXJkJyk7XG4gICAgaWYgKHRoaXMuY2FzY2FkZSkge1xuICAgICAgdGhpcy5fci5hZGRDbGFzcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnY2FyZC1jYXNjYWRlJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLndpZGVyKSB7XG4gICAgICB0aGlzLl9yLmFkZENsYXNzKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICd3aWRlcicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5uYXJyb3dlcikge1xuICAgICAgdGhpcy5fci5hZGRDbGFzcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnbmFycm93ZXInKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2xhc3MpIHtcbiAgICAgIHRoaXMuY2xhc3Muc3BsaXQoJyAnKS5mb3JFYWNoKChlbGVtZW50OiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5fci5hZGRDbGFzcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCBlbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19