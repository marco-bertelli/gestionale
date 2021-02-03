import { Component, ElementRef, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID, Renderer2, ViewChild, ViewEncapsulation, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { window } from '../../free/utils/facade/browser';
export class ImageModalComponent {
    constructor(platformId, element, renderer) {
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
    toggleZoomed() {
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
    }
    toggleRestart() {
        this.zoomed = this.zoomed === 'inactive' ? 'active' : 'inactive';
    }
    ngOnInit() {
        this.loading = true;
        if (this.imagePointer >= 0) {
            this.showRepeat = false;
            this.openGallery(this.imagePointer);
        }
        else {
            this.showRepeat = true;
        }
    }
    closeGallery() {
        this.zoom = false;
        if (screenfull.enabled) {
            screenfull.exit();
        }
        this.opened = false;
        this.cancelEvent.emit(null);
    }
    prevImage() {
        this.loading = true;
        this.currentImageIndex--;
        if (this.currentImageIndex < 0) {
            this.currentImageIndex = this.modalImages.length - 1;
        }
        this.openGallery(this.currentImageIndex);
    }
    nextImage() {
        this.loading = true;
        this.currentImageIndex++;
        if (this.modalImages.length === this.currentImageIndex) {
            this.currentImageIndex = 0;
        }
        this.openGallery(this.currentImageIndex);
    }
    openGallery(index) {
        // There was a problem, that with opened lightbox, if user have pressed the back button
        // (both physical device button and browser button)
        // the lightbox was not closed, but the whole application was closed (because of changing the URL).
        if (typeof history.pushState === 'function') {
            history.pushState('newstate', '', null);
            window.onpopstate = () => {
                if (this.opened) {
                    this.closeGallery();
                }
            };
        }
        if (!index) {
            this.currentImageIndex = 1;
        }
        this.currentImageIndex = index;
        this.opened = true;
        for (let i = 0; i < this.modalImages.length; i++) {
            if (i === this.currentImageIndex) {
                this.imgSrc = this.modalImages[i].img;
                this.caption = this.modalImages[i].caption;
                this.loading = false;
                break;
            }
        }
        setTimeout(() => {
            if (this.galleryDescription) {
                const descriptionHeight = this.galleryDescription.nativeElement.clientHeight;
                this.renderer.setStyle(this.galleryImg.nativeElement, 'max-height', `calc(100% - ${descriptionHeight + 25}px)`);
            }
        }, 0);
    }
    fullScreen() {
        if (screenfull.enabled) {
            screenfull.toggle();
        }
    }
    get is_iPhone_or_iPod() {
        if (this.isBrowser) {
            if (navigator && navigator.userAgent && navigator.userAgent != null) {
                const strUserAgent = navigator.userAgent.toLowerCase();
                const arrMatches = strUserAgent.match(/ipad/);
                if (arrMatches != null) {
                    return true;
                }
            }
            return false;
        }
    }
    keyboardControl(event) {
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
    }
    swipe(action = this.SWIPE_ACTION.RIGHT) {
        if (action === this.SWIPE_ACTION.RIGHT) {
            this.prevImage();
        }
        if (action === this.SWIPE_ACTION.LEFT) {
            this.nextImage();
        }
    }
}
ImageModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-image-modal',
                template: "<div class=\"ng-gallery mdb-lightbox {{ type }}\" *ngIf=\"modalImages && showRepeat\">\n  <figure class=\"col-md-4\" *ngFor=\"let i of modalImages; let index = index\">\n    <img\n      src=\"{{ !i.thumb ? i.img : i.thumb }}\"\n      class=\"ng-thumb\"\n      (click)=\"openGallery(index)\"\n      alt=\"Image {{ index + 1 }}\"\n    />\n  </figure>\n</div>\n<div tabindex=\"0\" class=\"ng-overlay\" [class.hide_lightbox]=\"opened == false\">\n  <div class=\"top-bar\" style=\"z-index: 100000\">\n    <span *ngIf=\"modalImages\" class=\"info-text\"\n      >{{ currentImageIndex + 1 }}/{{ modalImages.length }}</span\n    >\n    <a class=\"close-popup\" (click)=\"closeGallery()\" (click)=\"toggleRestart()\"></a>\n    <a\n      *ngIf=\"!is_iPhone_or_iPod\"\n      class=\"fullscreen-toogle\"\n      [class.toggled]=\"fullscreen\"\n      (click)=\"fullScreen()\"\n    ></a>\n    <a class=\"zoom-toogle\" [class.zoom]=\"zoom\" (click)=\"toggleZoomed()\" *ngIf=\"!isMobile\"></a>\n  </div>\n  <div class=\"ng-gallery-content\">\n    <img\n      #galleryImg\n      *ngIf=\"!loading\"\n      src=\"{{ imgSrc }}\"\n      [class.smooth]=\"smooth\"\n      class=\"effect\"\n      (swipeleft)=\"swipe($event.type)\"\n      (swiperight)=\"swipe($event.type)\"\n      (click)=\"toggleZoomed()\"\n      style=\"\"\n    />\n\n    <div class=\"uil-ring-css\" *ngIf=\"loading\">\n      <div></div>\n    </div>\n    <a\n      class=\"nav-left\"\n      *ngIf=\"modalImages && modalImages.length > 1 && !isMobile\"\n      (click)=\"prevImage()\"\n    >\n      <span></span>\n    </a>\n    <a\n      class=\"nav-right\"\n      *ngIf=\"modalImages && modalImages.length > 1 && !isMobile\"\n      (click)=\"nextImage()\"\n    >\n      <span></span>\n    </a>\n  </div>\n  <div class=\"row\" *ngIf=\"caption\">\n    <div class=\"col-md-12 mx-auto bottom-bar text-center\">\n      <figcaption #galleryDescription class=\"text-white lightbox-caption\">{{ caption }}</figcaption>\n    </div>\n  </div>\n</div>\n<div *ngIf=\"openModalWindow\">\n  <mdb-image-modal [imagePointer]=\"imagePointer\"></mdb-image-modal>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".bottom-bar{bottom:2rem;left:0;position:absolute;right:0;width:100%;z-index:100000}mdb-image-modal{-moz-user-select:none;-webkit-user-drag:none;-webkit-user-select:none;user-select:none}mdb-image-modal .no-margin [class*=col-]{margin:0;padding:0}mdb-image-modal .hide_lightbox{display:none}mdb-image-modal .ng-gallery{display:flex;flex-wrap:wrap;width:auto}mdb-image-modal img.ng-thumb{cursor:zoom-in;display:block;float:none;height:100%;transition:.3s ease-in-out;width:100%}mdb-image-modal img.ng-thumb:hover{opacity:.85}mdb-image-modal .ng-overlay{-moz-user-select:none;-webkit-user-drag:none;-webkit-user-select:none;background:#000;height:100%;left:0;opacity:1;outline:none;position:fixed;top:0;user-select:none;width:100%;z-index:9999}mdb-image-modal .ng-overlay .ng-gallery-content{height:100%;left:0;overflow:hidden;position:fixed;text-align:center;top:0;width:100%;z-index:10000}mdb-image-modal .ng-overlay .ng-gallery-content>a.close-popup{color:#fff;cursor:pointer;float:right;font-size:42px;margin:0 30px 0 0;position:absolute;right:0;text-decoration:none;top:20px}mdb-image-modal .ng-overlay .ng-gallery-content>a.download-image{color:#fff;cursor:pointer;float:right;font-size:42px;margin:0 30px 0 0;position:absolute;right:63px;text-decoration:none;top:20px}mdb-image-modal .ng-overlay .ng-gallery-content .nav-left span{background-color:transparent;display:block}mdb-image-modal .ng-overlay .ng-gallery-content .nav-left span:before{background-color:transparent;background-position:-138px -44px;content:\" \";display:block;height:30px;opacity:.75;transition:opacity .2s;width:32px}mdb-image-modal .ng-overlay .ng-gallery-content .nav-left:hover span:before{opacity:1}mdb-image-modal .ng-overlay .ng-gallery-content .nav-right span{background-color:transparent;display:block}mdb-image-modal .ng-overlay .ng-gallery-content .nav-right span:before{background-color:transparent;background-position:-94px -44px;content:\" \";display:block;height:30px;opacity:.75;transition:opacity .2s;width:32px}mdb-image-modal .ng-overlay .ng-gallery-content .nav-right:hover span:before{opacity:1}mdb-image-modal .ng-overlay .ng-gallery-content>img{max-width:100%!important}mdb-image-modal .ng-overlay .ng-gallery-content>img.smooth{transition:.2s}mdb-image-modal .ng-overlay .ng-gallery-content>a.nav-left,mdb-image-modal .ng-overlay .ng-gallery-content>a.nav-right{color:#fff;cursor:pointer;font-size:60px;outline:none;text-decoration:none}mdb-image-modal .ng-overlay .ng-gallery-content>a.nav-left{left:10px;position:fixed;top:50%;transform:translateY(-50%)}mdb-image-modal .ng-overlay .ng-gallery-content>a.nav-right{position:fixed;right:10px;top:50%;transform:translateY(-50%)}mdb-image-modal .ng-overlay .ng-gallery-content>img{-moz-user-select:none;-webkit-user-drag:none;-webkit-user-select:none;bottom:0;left:0;margin:auto;max-height:1067px;max-width:1600px;position:absolute;right:0;top:0;user-select:none}mdb-image-modal .ng-overlay .ng-gallery-content>img.effect{-webkit-animation:fadeIn .5s;animation:fadeIn .5s}mdb-image-modal .ng-overlay .ng-gallery-content>span.info-text{bottom:100px;color:#fff;display:inline-block;font-size:16px;font-weight:700;height:20px;left:0;position:fixed;right:0;text-align:center;width:100%}mdb-image-modal .ng-overlay .ng-gallery-content>.ng-thumbnails-wrapper{bottom:20px;height:70px;left:0;margin-left:auto;margin-right:auto;overflow-x:hidden;position:fixed;right:0;text-align:center;width:400px}mdb-image-modal .ng-overlay .ng-gallery-content>.ng-thumbnails-wrapper>.ng-thumbnails{height:70px;width:4000px}mdb-image-modal .ng-overlay .ng-gallery-content>.ng-thumbnails-wrapper>.ng-thumbnails>div>img{cursor:pointer;float:left;height:70px;margin-right:10px;opacity:.6;width:auto}mdb-image-modal .ng-overlay .ng-gallery-content>.ng-thumbnails-wrapper>.ng-thumbnails>div>img.active,mdb-image-modal .ng-overlay .ng-gallery-content>.ng-thumbnails-wrapper>.ng-thumbnails>div>img:hover{opacity:.6;transition:opacity .25s ease}@-webkit-keyframes fadeIn{0%{opacity:.3}to{opacity:1}}@keyframes fadeIn{0%{opacity:.3}to{opacity:1}}.bottom-bar{bottom:0!important}.lightbox-caption{font-size:13px;max-height:50px}.effect{transform:scale(.9)}.top-bar{right:0;width:100%;z-index:10001}.top-bar,.top-bar .info-text{height:44px;left:0;position:absolute;top:0}.top-bar .info-text{color:#fff;font-size:16px;line-height:44px;opacity:.75;padding:0 10px}.top-bar .close-popup{background-position:0 -44px;background-size:264px 88px;display:block;float:right;height:44px;opacity:.75;position:relative;transition:opacity .2s;width:44px}.top-bar .close-popup:hover{opacity:1}.top-bar .fullscreen-toogle{background-size:264px 88px;display:block;float:right;height:44px;opacity:.75;position:relative;transition:opacity .2s;width:44px}.top-bar .fullscreen-toogle.toggled{background-position:-44px 0}.top-bar .fullscreen-toogle:hover{opacity:1}.top-bar .zoom-toogle{background-position:-88px 0;background-size:264px 88px;display:block;float:right;height:44px;opacity:.75;position:relative;transition:opacity .2s;width:44px}.top-bar .zoom-toogle.zoom{background-position:-132px 0}.top-bar .zoom-toogle:hover{opacity:1}"]
            },] }
];
ImageModalComponent.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ElementRef },
    { type: Renderer2 }
];
ImageModalComponent.propDecorators = {
    modalImages: [{ type: Input }],
    imagePointer: [{ type: Input }],
    fullscreen: [{ type: Input }],
    zoom: [{ type: Input }],
    smooth: [{ type: Input }],
    type: [{ type: Input }],
    galleryImg: [{ type: ViewChild, args: ['galleryImg',] }],
    galleryDescription: [{ type: ViewChild, args: ['galleryDescription',] }],
    cancelEvent: [{ type: Output }],
    keyboardControl: [{ type: HostListener, args: ['document:keyup', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtcG9wdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy11aWtpdC1wcm8tc3RhbmRhcmQvc3JjL2xpYi9wcm8vbGlnaHRib3gvaW1hZ2UtcG9wdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBVXpELE1BQU0sT0FBTyxtQkFBbUI7SUE2QjlCLFlBQ3VCLFVBQWtCLEVBQ2hDLE9BQW1CLEVBQ25CLFFBQW1CO1FBRG5CLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQTlCckIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUdmLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUkxQixhQUFRLEdBQVEsSUFBSSxDQUFDO1FBQ3JCLFlBQU8sR0FBUSxLQUFLLENBQUM7UUFDckIsY0FBUyxHQUFRLEtBQUssQ0FBQztRQUN2QixXQUFNLEdBQUcsVUFBVSxDQUFDO1FBRXBCLGlCQUFZLEdBQUcsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsQ0FBQztRQU1qRCxXQUFNLEdBQUcsSUFBSSxDQUFDO1FBTWIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBTzlDLElBQUksQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsSUFBSSxD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QyxPQUFPLEtBQUssRUFBRSxFQUFFO2dCQUN4QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEI7WUFDRCx3Q0FBd0M7WUFDeEMsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3JCO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLFNBQWlCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztRQUM1QyxJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTtZQUN0QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7UUFFRCxJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRTtZQUNyQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7SUFDSCxDQUFDOzs7WUF6TEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLDZqRUFBK0I7Z0JBRS9CLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7O3lDQStCSSxNQUFNLFNBQUMsV0FBVztZQXREckIsVUFBVTtZQVFWLFNBQVM7OzswQkFpQ1IsS0FBSzsyQkFDTCxLQUFLO3lCQUNMLEtBQUs7bUJBQ0wsS0FBSztxQkFDTCxLQUFLO21CQUNMLEtBQUs7eUJBRUwsU0FBUyxTQUFDLFlBQVk7aUNBQ3RCLFNBQVMsU0FBQyxvQkFBb0I7MEJBRTlCLE1BQU07OEJBOEhOLFlBQVksU0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgd2luZG93IH0gZnJvbSAnLi4vLi4vZnJlZS91dGlscy9mYWNhZGUvYnJvd3Nlcic7XG5cbmRlY2xhcmUgdmFyIHNjcmVlbmZ1bGw6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLWltYWdlLW1vZGFsJyxcbiAgdGVtcGxhdGVVcmw6ICdpbWFnZS1wb3B1cC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbGlnaHRib3gtbW9kdWxlLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2VNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBfZWxlbWVudDogYW55O1xuICBwdWJsaWMgb3BlbmVkID0gZmFsc2U7XG4gIHB1YmxpYyBpbWdTcmM6IHN0cmluZztcbiAgcHVibGljIGN1cnJlbnRJbWFnZUluZGV4OiBudW1iZXI7XG4gIHB1YmxpYyBsb2FkaW5nID0gZmFsc2U7XG4gIHB1YmxpYyBzaG93UmVwZWF0ID0gZmFsc2U7XG4gIHB1YmxpYyBvcGVuTW9kYWxXaW5kb3c6IGFueTtcbiAgcHVibGljIGNhcHRpb246IHN0cmluZztcblxuICBpc01vYmlsZTogYW55ID0gbnVsbDtcbiAgY2xpY2tlZDogYW55ID0gZmFsc2U7XG4gIGlzQnJvd3NlcjogYW55ID0gZmFsc2U7XG4gIHpvb21lZCA9ICdpbmFjdGl2ZSc7XG5cbiAgU1dJUEVfQUNUSU9OID0geyBMRUZUOiAnc3dpcGVsZWZ0JywgUklHSFQ6ICdzd2lwZXJpZ2h0JyB9O1xuXG4gIEBJbnB1dCgpIG1vZGFsSW1hZ2VzOiBhbnk7XG4gIEBJbnB1dCgpIGltYWdlUG9pbnRlcjogbnVtYmVyO1xuICBASW5wdXQoKSBmdWxsc2NyZWVuOiBib29sZWFuO1xuICBASW5wdXQoKSB6b29tOiBib29sZWFuO1xuICBASW5wdXQoKSBzbW9vdGggPSB0cnVlO1xuICBASW5wdXQoKSB0eXBlOiBTdHJpbmc7XG5cbiAgQFZpZXdDaGlsZCgnZ2FsbGVyeUltZycpIGdhbGxlcnlJbWc6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2dhbGxlcnlEZXNjcmlwdGlvbicpIGdhbGxlcnlEZXNjcmlwdGlvbjogRWxlbWVudFJlZjtcblxuICBAT3V0cHV0KCkgY2FuY2VsRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBzdHJpbmcsXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7XG4gICAgdGhpcy5pc0Jyb3dzZXIgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKTtcbiAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICB0aGlzLmlzTW9iaWxlID0gL2lQaG9uZXxpUGFkfGlQb2R8QW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlWm9vbWVkKCkge1xuICAgIGlmICghdGhpcy5jbGlja2VkKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZ2FsbGVyeUltZy5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3NjYWxlKDEuMCwgMS4wKScpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmdhbGxlcnlJbWcubmF0aXZlRWxlbWVudCwgJ2FuaW1hdGUnLCAnMzAwbXMgZWFzZS1vdXQnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5nYWxsZXJ5SW1nLm5hdGl2ZUVsZW1lbnQsICdjdXJzb3InLCAnem9vbS1vdXQnKTtcbiAgICAgIHRoaXMuY2xpY2tlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNsaWNrZWQpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5nYWxsZXJ5SW1nLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAnc2NhbGUoMC45LCAwLjkpJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZ2FsbGVyeUltZy5uYXRpdmVFbGVtZW50LCAnYW5pbWF0ZScsICczMDBtcyBlYXNlLWluJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZ2FsbGVyeUltZy5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgJ3pvb20taW4nKTtcbiAgICAgIHRoaXMuY2xpY2tlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZVJlc3RhcnQoKSB7XG4gICAgdGhpcy56b29tZWQgPSB0aGlzLnpvb21lZCA9PT0gJ2luYWN0aXZlJyA/ICdhY3RpdmUnIDogJ2luYWN0aXZlJztcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgaWYgKHRoaXMuaW1hZ2VQb2ludGVyID49IDApIHtcbiAgICAgIHRoaXMuc2hvd1JlcGVhdCA9IGZhbHNlO1xuICAgICAgdGhpcy5vcGVuR2FsbGVyeSh0aGlzLmltYWdlUG9pbnRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvd1JlcGVhdCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgY2xvc2VHYWxsZXJ5KCkge1xuICAgIHRoaXMuem9vbSA9IGZhbHNlO1xuICAgIGlmIChzY3JlZW5mdWxsLmVuYWJsZWQpIHtcbiAgICAgIHNjcmVlbmZ1bGwuZXhpdCgpO1xuICAgIH1cbiAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgIHRoaXMuY2FuY2VsRXZlbnQuZW1pdChudWxsKTtcbiAgfVxuXG4gIHByZXZJbWFnZSgpIHtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuY3VycmVudEltYWdlSW5kZXgtLTtcbiAgICBpZiAodGhpcy5jdXJyZW50SW1hZ2VJbmRleCA8IDApIHtcbiAgICAgIHRoaXMuY3VycmVudEltYWdlSW5kZXggPSB0aGlzLm1vZGFsSW1hZ2VzLmxlbmd0aCAtIDE7XG4gICAgfVxuICAgIHRoaXMub3BlbkdhbGxlcnkodGhpcy5jdXJyZW50SW1hZ2VJbmRleCk7XG4gIH1cblxuICBuZXh0SW1hZ2UoKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmN1cnJlbnRJbWFnZUluZGV4Kys7XG4gICAgaWYgKHRoaXMubW9kYWxJbWFnZXMubGVuZ3RoID09PSB0aGlzLmN1cnJlbnRJbWFnZUluZGV4KSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbWFnZUluZGV4ID0gMDtcbiAgICB9XG4gICAgdGhpcy5vcGVuR2FsbGVyeSh0aGlzLmN1cnJlbnRJbWFnZUluZGV4KTtcbiAgfVxuXG4gIG9wZW5HYWxsZXJ5KGluZGV4OiBhbnkpIHtcbiAgICAvLyBUaGVyZSB3YXMgYSBwcm9ibGVtLCB0aGF0IHdpdGggb3BlbmVkIGxpZ2h0Ym94LCBpZiB1c2VyIGhhdmUgcHJlc3NlZCB0aGUgYmFjayBidXR0b25cbiAgICAvLyAoYm90aCBwaHlzaWNhbCBkZXZpY2UgYnV0dG9uIGFuZCBicm93c2VyIGJ1dHRvbilcbiAgICAvLyB0aGUgbGlnaHRib3ggd2FzIG5vdCBjbG9zZWQsIGJ1dCB0aGUgd2hvbGUgYXBwbGljYXRpb24gd2FzIGNsb3NlZCAoYmVjYXVzZSBvZiBjaGFuZ2luZyB0aGUgVVJMKS5cbiAgICBpZiAodHlwZW9mIGhpc3RvcnkucHVzaFN0YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBoaXN0b3J5LnB1c2hTdGF0ZSgnbmV3c3RhdGUnLCAnJywgbnVsbCk7XG4gICAgICB3aW5kb3cub25wb3BzdGF0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMub3BlbmVkKSB7XG4gICAgICAgICAgdGhpcy5jbG9zZUdhbGxlcnkoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCFpbmRleCkge1xuICAgICAgdGhpcy5jdXJyZW50SW1hZ2VJbmRleCA9IDE7XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50SW1hZ2VJbmRleCA9IGluZGV4O1xuICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubW9kYWxJbWFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpID09PSB0aGlzLmN1cnJlbnRJbWFnZUluZGV4KSB7XG4gICAgICAgIHRoaXMuaW1nU3JjID0gdGhpcy5tb2RhbEltYWdlc1tpXS5pbWc7XG4gICAgICAgIHRoaXMuY2FwdGlvbiA9IHRoaXMubW9kYWxJbWFnZXNbaV0uY2FwdGlvbjtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmdhbGxlcnlEZXNjcmlwdGlvbikge1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkhlaWdodCA9IHRoaXMuZ2FsbGVyeURlc2NyaXB0aW9uLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgIHRoaXMuZ2FsbGVyeUltZy5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICdtYXgtaGVpZ2h0JyxcbiAgICAgICAgICBgY2FsYygxMDAlIC0gJHtkZXNjcmlwdGlvbkhlaWdodCArIDI1fXB4KWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LCAwKTtcbiAgfVxuXG4gIGZ1bGxTY3JlZW4oKTogYW55IHtcbiAgICBpZiAoc2NyZWVuZnVsbC5lbmFibGVkKSB7XG4gICAgICBzY3JlZW5mdWxsLnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpc19pUGhvbmVfb3JfaVBvZCgpIHtcbiAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgIGlmIChuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICE9IG51bGwpIHtcbiAgICAgICAgY29uc3Qgc3RyVXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBhcnJNYXRjaGVzID0gc3RyVXNlckFnZW50Lm1hdGNoKC9pcGFkLyk7XG4gICAgICAgIGlmIChhcnJNYXRjaGVzICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleXVwJywgWyckZXZlbnQnXSlcbiAga2V5Ym9hcmRDb250cm9sKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAodGhpcy5vcGVuZWQpIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzOSkge1xuICAgICAgICB0aGlzLm5leHRJbWFnZSgpO1xuICAgICAgfVxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3KSB7XG4gICAgICAgIHRoaXMucHJldkltYWdlKCk7XG4gICAgICB9XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgdGhpcy5jbG9zZUdhbGxlcnkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzd2lwZShhY3Rpb246IFN0cmluZyA9IHRoaXMuU1dJUEVfQUNUSU9OLlJJR0hUKSB7XG4gICAgaWYgKGFjdGlvbiA9PT0gdGhpcy5TV0lQRV9BQ1RJT04uUklHSFQpIHtcbiAgICAgIHRoaXMucHJldkltYWdlKCk7XG4gICAgfVxuXG4gICAgaWYgKGFjdGlvbiA9PT0gdGhpcy5TV0lQRV9BQ1RJT04uTEVGVCkge1xuICAgICAgdGhpcy5uZXh0SW1hZ2UoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==