import { __decorate, __metadata, __param } from "tslib";
import { Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, Output, PLATFORM_ID, Renderer2, ViewChild, ViewEncapsulation, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { window } from '../../free/utils/facade/browser';
var ImageModalComponent = /** @class */ (function () {
    function ImageModalComponent(platformId, element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.opened = false;
        this.loading = false;
        this.showRepeat = false;
        this.isMobile = null;
        this.clicked = false;
        this.isBrowser = false;
        this.zoomed = 'inactive';
        this.SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
        this.smooth = true;
        this.cancelEvent = new EventEmitter();
        this.isBrowser = isPlatformBrowser(platformId);
        this._element = this.element.nativeElement;
        if (this.isBrowser) {
            this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        }
    }
    ImageModalComponent.prototype.toggleZoomed = function () {
        if (!this.clicked) {
            this.renderer.setStyle(this.galleryImg.nativeElement, 'transform', 'scale(1.0, 1.0)');
            this.renderer.setStyle(this.galleryImg.nativeElement, 'animate', '300ms ease-out');
            this.renderer.setStyle(this.galleryImg.nativeElement, 'cursor', 'zoom-out');
            this.clicked = true;
        }
        else if (this.clicked) {
            this.renderer.setStyle(this.galleryImg.nativeElement, 'transform', 'scale(0.9, 0.9)');
            this.renderer.setStyle(this.galleryImg.nativeElement, 'animate', '300ms ease-in');
            this.renderer.setStyle(this.galleryImg.nativeElement, 'cursor', 'zoom-in');
            this.clicked = false;
        }
    };
    ImageModalComponent.prototype.toggleRestart = function () {
        this.zoomed = this.zoomed === 'inactive' ? 'active' : 'inactive';
    };
    ImageModalComponent.prototype.ngOnInit = function () {
        this.loading = true;
        if (this.imagePointer >= 0) {
            this.showRepeat = false;
            this.openGallery(this.imagePointer);
        }
        else {
            this.showRepeat = true;
        }
    };
    ImageModalComponent.prototype.closeGallery = function () {
        this.zoom = false;
        if (screenfull.enabled) {
            screenfull.exit();
        }
        this.opened = false;
        this.cancelEvent.emit(null);
    };
    ImageModalComponent.prototype.prevImage = function () {
        this.loading = true;
        this.currentImageIndex--;
        if (this.currentImageIndex < 0) {
            this.currentImageIndex = this.modalImages.length - 1;
        }
        this.openGallery(this.currentImageIndex);
    };
    ImageModalComponent.prototype.nextImage = function () {
        this.loading = true;
        this.currentImageIndex++;
        if (this.modalImages.length === this.currentImageIndex) {
            this.currentImageIndex = 0;
        }
        this.openGallery(this.currentImageIndex);
    };
    ImageModalComponent.prototype.openGallery = function (index) {
        var _this = this;
        // There was a problem, that with opened lightbox, if user have pressed the back button
        // (both physical device button and browser button)
        // the lightbox was not closed, but the whole application was closed (because of changing the URL).
        if (typeof history.pushState === 'function') {
            history.pushState('newstate', '', null);
            window.onpopstate = function () {
                if (_this.opened) {
                    _this.closeGallery();
                }
            };
        }
        if (!index) {
            this.currentImageIndex = 1;
        }
        this.currentImageIndex = index;
        this.opened = true;
        for (var i = 0; i < this.modalImages.length; i++) {
            if (i === this.currentImageIndex) {
                this.imgSrc = this.modalImages[i].img;
                this.caption = this.modalImages[i].caption;
                this.loading = false;
                break;
            }
        }
        setTimeout(function () {
            if (_this.galleryDescription) {
                var descriptionHeight = _this.galleryDescription.nativeElement.clientHeight;
                _this.renderer.setStyle(_this.galleryImg.nativeElement, 'max-height', "calc(100% - " + (descriptionHeight + 25) + "px)");
            }
        }, 0);
    };
    ImageModalComponent.prototype.fullScreen = function () {
        if (screenfull.enabled) {
            screenfull.toggle();
        }
    };
    Object.defineProperty(ImageModalComponent.prototype, "is_iPhone_or_iPod", {
        get: function () {
            if (this.isBrowser) {
                if (navigator && navigator.userAgent && navigator.userAgent != null) {
                    var strUserAgent = navigator.userAgent.toLowerCase();
                    var arrMatches = strUserAgent.match(/ipad/);
                    if (arrMatches != null) {
                        return true;
                    }
                }
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    ImageModalComponent.prototype.keyboardControl = function (event) {
        if (this.opened) {
            // tslint:disable-next-line: deprecation
            if (event.keyCode === 39) {
                this.nextImage();
            }
            // tslint:disable-next-line: deprecation
            if (event.keyCode === 37) {
                this.prevImage();
            }
            // tslint:disable-next-line: deprecation
            if (event.keyCode === 27) {
                this.closeGallery();
            }
        }
    };
    ImageModalComponent.prototype.swipe = function (action) {
        if (action === void 0) { action = this.SWIPE_ACTION.RIGHT; }
        if (action === this.SWIPE_ACTION.RIGHT) {
            this.prevImage();
        }
        if (action === this.SWIPE_ACTION.LEFT) {
            this.nextImage();
        }
    };
    ImageModalComponent.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ImageModalComponent.prototype, "modalImages", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ImageModalComponent.prototype, "imagePointer", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ImageModalComponent.prototype, "fullscreen", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ImageModalComponent.prototype, "zoom", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ImageModalComponent.prototype, "smooth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ImageModalComponent.prototype, "type", void 0);
    __decorate([
        ViewChild('galleryImg'),
        __metadata("design:type", ElementRef)
    ], ImageModalComponent.prototype, "galleryImg", void 0);
    __decorate([
        ViewChild('galleryDescription'),
        __metadata("design:type", ElementRef)
    ], ImageModalComponent.prototype, "galleryDescription", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ImageModalComponent.prototype, "cancelEvent", void 0);
    __decorate([
        HostListener('document:keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ImageModalComponent.prototype, "keyboardControl", null);
    ImageModalComponent = __decorate([
        Component({
            selector: 'mdb-image-modal',
            template: "<div class=\"ng-gallery mdb-lightbox {{ type }}\" *ngIf=\"modalImages && showRepeat\">\n  <figure class=\"col-md-4\" *ngFor=\"let i of modalImages; let index = index\">\n    <img\n      src=\"{{ !i.thumb ? i.img : i.thumb }}\"\n      class=\"ng-thumb\"\n      (click)=\"openGallery(index)\"\n      alt=\"Image {{ index + 1 }}\"\n    />\n  </figure>\n</div>\n<div tabindex=\"0\" class=\"ng-overlay\" [class.hide_lightbox]=\"opened == false\">\n  <div class=\"top-bar\" style=\"z-index: 100000\">\n    <span *ngIf=\"modalImages\" class=\"info-text\"\n      >{{ currentImageIndex + 1 }}/{{ modalImages.length }}</span\n    >\n    <a class=\"close-popup\" (click)=\"closeGallery()\" (click)=\"toggleRestart()\"></a>\n    <a\n      *ngIf=\"!is_iPhone_or_iPod\"\n      class=\"fullscreen-toogle\"\n      [class.toggled]=\"fullscreen\"\n      (click)=\"fullScreen()\"\n    ></a>\n    <a class=\"zoom-toogle\" [class.zoom]=\"zoom\" (click)=\"toggleZoomed()\" *ngIf=\"!isMobile\"></a>\n  </div>\n  <div class=\"ng-gallery-content\">\n    <img\n      #galleryImg\n      *ngIf=\"!loading\"\n      src=\"{{ imgSrc }}\"\n      [class.smooth]=\"smooth\"\n      class=\"effect\"\n      (swipeleft)=\"swipe($event.type)\"\n      (swiperight)=\"swipe($event.type)\"\n      (click)=\"toggleZoomed()\"\n      style=\"\"\n    />\n\n    <div class=\"uil-ring-css\" *ngIf=\"loading\">\n      <div></div>\n    </div>\n    <a\n      class=\"nav-left\"\n      *ngIf=\"modalImages && modalImages.length > 1 && !isMobile\"\n      (click)=\"prevImage()\"\n    >\n      <span></span>\n    </a>\n    <a\n      class=\"nav-right\"\n      *ngIf=\"modalImages && modalImages.length > 1 && !isMobile\"\n      (click)=\"nextImage()\"\n    >\n      <span></span>\n    </a>\n  </div>\n  <div class=\"row\" *ngIf=\"caption\">\n    <div class=\"col-md-12 mx-auto bottom-bar text-center\">\n      <figcaption #galleryDescription class=\"text-white lightbox-caption\">{{ caption }}</figcaption>\n    </div>\n  </div>\n</div>\n<div *ngIf=\"openModalWindow\">\n  <mdb-image-modal [imagePointer]=\"imagePointer\"></mdb-image-modal>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            styles: [".bottom-bar{z-index:100000;position:absolute;left:0;right:0;width:100%;bottom:0!important}mdb-image-modal{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none}mdb-image-modal .no-margin [class*=col-]{padding:0;margin:0}mdb-image-modal .hide_lightbox{display:none}mdb-image-modal .ng-gallery{display:flex;width:auto;flex-wrap:wrap}mdb-image-modal img.ng-thumb{width:100%;height:100%;float:none;display:block;cursor:zoom-in;transition:.3s ease-in-out}mdb-image-modal img.ng-thumb:hover{opacity:.85}mdb-image-modal .ng-overlay{outline:0;position:fixed;top:0;left:0;width:100%;height:100%;background:#000;opacity:1;z-index:9999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none}mdb-image-modal .ng-overlay .ng-gallery-content{position:fixed;top:0;left:0;width:100%;height:100%;z-index:10000;text-align:center;overflow:hidden}mdb-image-modal .ng-overlay .ng-gallery-content>a.close-popup{font-size:42px;float:right;color:#fff;text-decoration:none;margin:0 30px 0 0;cursor:pointer;position:absolute;top:20px;right:0}mdb-image-modal .ng-overlay .ng-gallery-content>a.download-image{font-size:42px;float:right;color:#fff;text-decoration:none;margin:0 30px 0 0;cursor:pointer;position:absolute;top:20px;right:63px}mdb-image-modal .ng-overlay .ng-gallery-content .nav-left span{display:block;background-color:transparent}mdb-image-modal .ng-overlay .ng-gallery-content .nav-left span:before{content:\" \";display:block;width:32px;height:30px;background-position:-138px -44px;opacity:.75;transition:opacity .2s;background-color:transparent}mdb-image-modal .ng-overlay .ng-gallery-content .nav-left:hover span:before{opacity:1}mdb-image-modal .ng-overlay .ng-gallery-content .nav-right span{display:block;background-color:transparent}mdb-image-modal .ng-overlay .ng-gallery-content .nav-right span:before{content:\" \";display:block;width:32px;height:30px;background-position:-94px -44px;opacity:.75;transition:opacity .2s;background-color:transparent}mdb-image-modal .ng-overlay .ng-gallery-content .nav-right:hover span:before{opacity:1}mdb-image-modal .ng-overlay .ng-gallery-content>img{max-width:100%!important;max-width:1600px;max-height:1067px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none;position:absolute;margin:auto;top:0;left:0;right:0;bottom:0}mdb-image-modal .ng-overlay .ng-gallery-content>img.smooth{transition:.2s}mdb-image-modal .ng-overlay .ng-gallery-content>a.nav-left,mdb-image-modal .ng-overlay .ng-gallery-content>a.nav-right{color:#fff;text-decoration:none;font-size:60px;cursor:pointer;outline:0}mdb-image-modal .ng-overlay .ng-gallery-content>a.nav-left{position:fixed;left:10px;top:50%;transform:translateY(-50%)}mdb-image-modal .ng-overlay .ng-gallery-content>a.nav-right{position:fixed;right:10px;top:50%;transform:translateY(-50%)}mdb-image-modal .ng-overlay .ng-gallery-content>img.effect{-webkit-animation:.5s fadeIn;animation:.5s fadeIn}mdb-image-modal .ng-overlay .ng-gallery-content>span.info-text{color:#fff;display:inline-block;width:100%;height:20px;font-weight:700;text-align:center;position:fixed;left:0;right:0;bottom:100px;font-size:16px}mdb-image-modal .ng-overlay .ng-gallery-content>.ng-thumbnails-wrapper{width:400px;height:70px;text-align:center;position:fixed;bottom:20px;left:0;right:0;margin-left:auto;margin-right:auto;overflow-x:hidden}mdb-image-modal .ng-overlay .ng-gallery-content>.ng-thumbnails-wrapper>.ng-thumbnails{width:4000px;height:70px}mdb-image-modal .ng-overlay .ng-gallery-content>.ng-thumbnails-wrapper>.ng-thumbnails>div>img{width:auto;height:70px;float:left;margin-right:10px;cursor:pointer;opacity:.6}mdb-image-modal .ng-overlay .ng-gallery-content>.ng-thumbnails-wrapper>.ng-thumbnails>div>img.active,mdb-image-modal .ng-overlay .ng-gallery-content>.ng-thumbnails-wrapper>.ng-thumbnails>div>img:hover{transition:opacity .25s;opacity:.6}@-webkit-keyframes fadeIn{from{opacity:.3}to{opacity:1}}@keyframes fadeIn{from{opacity:.3}to{opacity:1}}.lightbox-caption{font-size:13px;max-height:50px}.effect{transform:scale(.9,.9)}.top-bar{position:absolute;top:0;left:0;right:0;height:44px;width:100%;z-index:10001}.top-bar .info-text{position:absolute;height:44px;top:0;left:0;font-size:16px;line-height:44px;color:#fff;opacity:.75;padding:0 10px}.top-bar .close-popup{position:relative;float:right;background-size:264px 88px;display:block;width:44px;height:44px;background-position:0 -44px;opacity:.75;transition:opacity .2s}.top-bar .close-popup:hover{opacity:1}.top-bar .fullscreen-toogle{position:relative;float:right;background-size:264px 88px;display:block;width:44px;height:44px;opacity:.75;transition:opacity .2s}.top-bar .fullscreen-toogle.toggled{background-position:-44px 0}.top-bar .fullscreen-toogle:hover{opacity:1}.top-bar .zoom-toogle{position:relative;float:right;background-size:264px 88px;display:block;width:44px;height:44px;background-position:-88px 0;opacity:.75;transition:opacity .2s}.top-bar .zoom-toogle.zoom{background-position:-132px 0}.top-bar .zoom-toogle:hover{opacity:1}"]
        }),
        __param(0, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [String, ElementRef,
            Renderer2])
    ], ImageModalComponent);
    return ImageModalComponent;
}());
export { ImageModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtcG9wdXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL2xpZ2h0Ym94L2ltYWdlLXBvcHVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBVXpEO0lBNkJFLDZCQUN1QixVQUFrQixFQUNoQyxPQUFtQixFQUNuQixRQUFtQjtRQURuQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVc7UUE5QnJCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFHZixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFJMUIsYUFBUSxHQUFRLElBQUksQ0FBQztRQUNyQixZQUFPLEdBQVEsS0FBSyxDQUFDO1FBQ3JCLGNBQVMsR0FBUSxLQUFLLENBQUM7UUFDdkIsV0FBTSxHQUFHLFVBQVUsQ0FBQztRQUVwQixpQkFBWSxHQUFHLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUM7UUFNakQsV0FBTSxHQUFHLElBQUksQ0FBQztRQU1iLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQU85QyxJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FB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LENBQUM7WUFDVCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLDZqRUFBK0I7WUFFL0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O1NBQ3RDLENBQUM7UUErQkcsV0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7aURBQ0osVUFBVTtZQUNULFNBQVM7T0FoQ2pCLG1CQUFtQixDQW9ML0I7SUFBRCwwQkFBQztDQUFBLEFBcExELElBb0xDO1NBcExZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgd2luZG93IH0gZnJvbSAnLi4vLi4vZnJlZS91dGlscy9mYWNhZGUvYnJvd3Nlcic7XG5cbmRlY2xhcmUgdmFyIHNjcmVlbmZ1bGw6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLWltYWdlLW1vZGFsJyxcbiAgdGVtcGxhdGVVcmw6ICdpbWFnZS1wb3B1cC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbGlnaHRib3gtbW9kdWxlLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2VNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBfZWxlbWVudDogYW55O1xuICBwdWJsaWMgb3BlbmVkID0gZmFsc2U7XG4gIHB1YmxpYyBpbWdTcmM6IHN0cmluZztcbiAgcHVibGljIGN1cnJlbnRJbWFnZUluZGV4OiBudW1iZXI7XG4gIHB1YmxpYyBsb2FkaW5nID0gZmFsc2U7XG4gIHB1YmxpYyBzaG93UmVwZWF0ID0gZmFsc2U7XG4gIHB1YmxpYyBvcGVuTW9kYWxXaW5kb3c6IGFueTtcbiAgcHVibGljIGNhcHRpb246IHN0cmluZztcblxuICBpc01vYmlsZTogYW55ID0gbnVsbDtcbiAgY2xpY2tlZDogYW55ID0gZmFsc2U7XG4gIGlzQnJvd3NlcjogYW55ID0gZmFsc2U7XG4gIHpvb21lZCA9ICdpbmFjdGl2ZSc7XG5cbiAgU1dJUEVfQUNUSU9OID0geyBMRUZUOiAnc3dpcGVsZWZ0JywgUklHSFQ6ICdzd2lwZXJpZ2h0JyB9O1xuXG4gIEBJbnB1dCgpIG1vZGFsSW1hZ2VzOiBhbnk7XG4gIEBJbnB1dCgpIGltYWdlUG9pbnRlcjogbnVtYmVyO1xuICBASW5wdXQoKSBmdWxsc2NyZWVuOiBib29sZWFuO1xuICBASW5wdXQoKSB6b29tOiBib29sZWFuO1xuICBASW5wdXQoKSBzbW9vdGggPSB0cnVlO1xuICBASW5wdXQoKSB0eXBlOiBTdHJpbmc7XG5cbiAgQFZpZXdDaGlsZCgnZ2FsbGVyeUltZycpIGdhbGxlcnlJbWc6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2dhbGxlcnlEZXNjcmlwdGlvbicpIGdhbGxlcnlEZXNjcmlwdGlvbjogRWxlbWVudFJlZjtcblxuICBAT3V0cHV0KCkgY2FuY2VsRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBzdHJpbmcsXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7XG4gICAgdGhpcy5pc0Jyb3dzZXIgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKTtcbiAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICB0aGlzLmlzTW9iaWxlID0gL2lQaG9uZXxpUGFkfGlQb2R8QW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlWm9vbWVkKCkge1xuICAgIGlmICghdGhpcy5jbGlja2VkKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZ2FsbGVyeUltZy5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3NjYWxlKDEuMCwgMS4wKScpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmdhbGxlcnlJbWcubmF0aXZlRWxlbWVudCwgJ2FuaW1hdGUnLCAnMzAwbXMgZWFzZS1vdXQnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5nYWxsZXJ5SW1nLm5hdGl2ZUVsZW1lbnQsICdjdXJzb3InLCAnem9vbS1vdXQnKTtcbiAgICAgIHRoaXMuY2xpY2tlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNsaWNrZWQpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5nYWxsZXJ5SW1nLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAnc2NhbGUoMC45LCAwLjkpJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZ2FsbGVyeUltZy5uYXRpdmVFbGVtZW50LCAnYW5pbWF0ZScsICczMDBtcyBlYXNlLWluJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZ2FsbGVyeUltZy5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgJ3pvb20taW4nKTtcbiAgICAgIHRoaXMuY2xpY2tlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVJlc3RhcnQoKSB7XG4gICAgdGhpcy56b29tZWQgPSB0aGlzLnpvb21lZCA9PT0gJ2luYWN0aXZlJyA/ICdhY3RpdmUnIDogJ2luYWN0aXZlJztcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgaWYgKHRoaXMuaW1hZ2VQb2ludGVyID49IDApIHtcbiAgICAgIHRoaXMuc2hvd1JlcGVhdCA9IGZhbHNlO1xuICAgICAgdGhpcy5vcGVuR2FsbGVyeSh0aGlzLmltYWdlUG9pbnRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvd1JlcGVhdCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgY2xvc2VHYWxsZXJ5KCkge1xuICAgIHRoaXMuem9vbSA9IGZhbHNlO1xuICAgIGlmIChzY3JlZW5mdWxsLmVuYWJsZWQpIHtcbiAgICAgIHNjcmVlbmZ1bGwuZXhpdCgpO1xuICAgIH1cbiAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgIHRoaXMuY2FuY2VsRXZlbnQuZW1pdChudWxsKTtcbiAgfVxuXG4gIHByZXZJbWFnZSgpIHtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuY3VycmVudEltYWdlSW5kZXgtLTtcbiAgICBpZiAodGhpcy5jdXJyZW50SW1hZ2VJbmRleCA8IDApIHtcbiAgICAgIHRoaXMuY3VycmVudEltYWdlSW5kZXggPSB0aGlzLm1vZGFsSW1hZ2VzLmxlbmd0aCAtIDE7XG4gICAgfVxuICAgIHRoaXMub3BlbkdhbGxlcnkodGhpcy5jdXJyZW50SW1hZ2VJbmRleCk7XG4gIH1cblxuICBuZXh0SW1hZ2UoKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmN1cnJlbnRJbWFnZUluZGV4Kys7XG4gICAgaWYgKHRoaXMubW9kYWxJbWFnZXMubGVuZ3RoID09PSB0aGlzLmN1cnJlbnRJbWFnZUluZGV4KSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbWFnZUluZGV4ID0gMDtcbiAgICB9XG4gICAgdGhpcy5vcGVuR2FsbGVyeSh0aGlzLmN1cnJlbnRJbWFnZUluZGV4KTtcbiAgfVxuXG4gIG9wZW5HYWxsZXJ5KGluZGV4OiBhbnkpIHtcbiAgICAvLyBUaGVyZSB3YXMgYSBwcm9ibGVtLCB0aGF0IHdpdGggb3BlbmVkIGxpZ2h0Ym94LCBpZiB1c2VyIGhhdmUgcHJlc3NlZCB0aGUgYmFjayBidXR0b25cbiAgICAvLyAoYm90aCBwaHlzaWNhbCBkZXZpY2UgYnV0dG9uIGFuZCBicm93c2VyIGJ1dHRvbilcbiAgICAvLyB0aGUgbGlnaHRib3ggd2FzIG5vdCBjbG9zZWQsIGJ1dCB0aGUgd2hvbGUgYXBwbGljYXRpb24gd2FzIGNsb3NlZCAoYmVjYXVzZSBvZiBjaGFuZ2luZyB0aGUgVVJMKS5cbiAgICBpZiAodHlwZW9mIGhpc3RvcnkucHVzaFN0YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBoaXN0b3J5LnB1c2hTdGF0ZSgnbmV3c3RhdGUnLCAnJywgbnVsbCk7XG4gICAgICB3aW5kb3cub25wb3BzdGF0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMub3BlbmVkKSB7XG4gICAgICAgICAgdGhpcy5jbG9zZUdhbGxlcnkoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCFpbmRleCkge1xuICAgICAgdGhpcy5jdXJyZW50SW1hZ2VJbmRleCA9IDE7XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50SW1hZ2VJbmRleCA9IGluZGV4O1xuICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubW9kYWxJbWFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpID09PSB0aGlzLmN1cnJlbnRJbWFnZUluZGV4KSB7XG4gICAgICAgIHRoaXMuaW1nU3JjID0gdGhpcy5tb2RhbEltYWdlc1tpXS5pbWc7XG4gICAgICAgIHRoaXMuY2FwdGlvbiA9IHRoaXMubW9kYWxJbWFnZXNbaV0uY2FwdGlvbjtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmdhbGxlcnlEZXNjcmlwdGlvbikge1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkhlaWdodCA9IHRoaXMuZ2FsbGVyeURlc2NyaXB0aW9uLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgIHRoaXMuZ2FsbGVyeUltZy5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICdtYXgtaGVpZ2h0JyxcbiAgICAgICAgICBgY2FsYygxMDAlIC0gJHtkZXNjcmlwdGlvbkhlaWdodCArIDI1fXB4KWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LCAwKTtcbiAgfVxuXG4gIGZ1bGxTY3JlZW4oKTogYW55IHtcbiAgICBpZiAoc2NyZWVuZnVsbC5lbmFibGVkKSB7XG4gICAgICBzY3JlZW5mdWxsLnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpc19pUGhvbmVfb3JfaVBvZCgpIHtcbiAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgIGlmIChuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICE9IG51bGwpIHtcbiAgICAgICAgY29uc3Qgc3RyVXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBhcnJNYXRjaGVzID0gc3RyVXNlckFnZW50Lm1hdGNoKC9pcGFkLyk7XG4gICAgICAgIGlmIChhcnJNYXRjaGVzICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleXVwJywgWyckZXZlbnQnXSlcbiAga2V5Ym9hcmRDb250cm9sKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAodGhpcy5vcGVuZWQpIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzOSkge1xuICAgICAgICB0aGlzLm5leHRJbWFnZSgpO1xuICAgICAgfVxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3KSB7XG4gICAgICAgIHRoaXMucHJldkltYWdlKCk7XG4gICAgICB9XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgdGhpcy5jbG9zZUdhbGxlcnkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzd2lwZShhY3Rpb246IFN0cmluZyA9IHRoaXMuU1dJUEVfQUNUSU9OLlJJR0hUKSB7XG4gICAgaWYgKGFjdGlvbiA9PT0gdGhpcy5TV0lQRV9BQ1RJT04uUklHSFQpIHtcbiAgICAgIHRoaXMucHJldkltYWdlKCk7XG4gICAgfVxuXG4gICAgaWYgKGFjdGlvbiA9PT0gdGhpcy5TV0lQRV9BQ1RJT04uTEVGVCkge1xuICAgICAgdGhpcy5uZXh0SW1hZ2UoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==