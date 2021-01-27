import { __decorate, __metadata, __param } from "tslib";
import { AfterViewInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Inject, Input, OnDestroy, Output, PLATFORM_ID, QueryList, Renderer2, ViewEncapsulation, ChangeDetectionStrategy, } from '@angular/core';
import { isBs3 } from '../utils/ng2-bootstrap-config';
import { SlideComponent } from './slide.component';
import { CarouselConfig } from './carousel.config';
import { isPlatformBrowser } from '@angular/common';
import { LEFT_ARROW, RIGHT_ARROW } from '../utils/keyboard-navigation';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
export var Direction;
(function (Direction) {
    Direction[Direction["UNKNOWN"] = 0] = "UNKNOWN";
    Direction[Direction["NEXT"] = 1] = "NEXT";
    Direction[Direction["PREV"] = 2] = "PREV";
})(Direction || (Direction = {}));
/**
 * Base element to create carousel
 */
var CarouselComponent = /** @class */ (function () {
    function CarouselComponent(config, el, platformId, cdRef, renderer) {
        this.el = el;
        this.cdRef = cdRef;
        this.renderer = renderer;
        this.SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
        this._destroy$ = new Subject();
        this.destroyed = false;
        this.animationEnd = true;
        this.isBrowser = false;
        this.isControls = true;
        this.class = '';
        this.type = '';
        this.animation = '';
        this.allowSwipe = true;
        this.activeSlideChange = new EventEmitter(false);
        this.isBrowser = isPlatformBrowser(platformId);
        Object.assign(this, config);
    }
    Object.defineProperty(CarouselComponent.prototype, "slides", {
        get: function () {
            return this._slidesList.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselComponent.prototype, "activeSlide", {
        get: function () {
            return this._currentActiveSlide;
        },
        set: function (index) {
            if (this._slidesList && index !== this._currentActiveSlide) {
                this._select(index);
            }
        },
        enumerable: true,
        configurable: true
    });
    CarouselComponent.prototype.checkNavigation = function () {
        if (this.type === 'carousel-multi-item') {
            return false;
        }
        return true;
    };
    CarouselComponent.prototype.checkDots = function () {
        if (this.type === 'carousel-thumbnails') {
            return false;
        }
        return true;
    };
    CarouselComponent.prototype.getImg = function (slide) {
        return slide.el.nativeElement.querySelector('img').src;
    };
    Object.defineProperty(CarouselComponent.prototype, "interval", {
        get: function () {
            return this._interval;
        },
        set: function (value) {
            this._interval = value;
            this.restartTimer();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselComponent.prototype, "isBs4", {
        get: function () {
            return !isBs3();
        },
        enumerable: true,
        configurable: true
    });
    CarouselComponent.prototype.ngOnDestroy = function () {
        this.destroyed = true;
        this._destroy$.next();
        this._destroy$.complete();
    };
    CarouselComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.play();
        this._slidesList.changes
            .pipe(takeUntil(this._destroy$))
            .subscribe(function (slidesList) {
            _this._slidesList = slidesList;
            setTimeout(function () {
                _this._select(0);
            }, 0);
        });
        if (this.activeSlideIndex) {
            setTimeout(function () {
                _this._select(_this.activeSlideIndex);
                _this.activeSlideChange.emit({ relatedTarget: _this.activeSlide });
            }, 0);
        }
        else {
            setTimeout(function () {
                _this._select(0);
            }, 0);
        }
        if (this.isControls) {
            this.carouselIndicators = this.el.nativeElement.querySelectorAll('.carousel-indicators > li');
            if (this.carouselIndicators.length && this.activeSlideIndex) {
                this.renderer.addClass(this.carouselIndicators[this.activeSlideIndex], 'active');
            }
            else if (this.carouselIndicators.length) {
                this.renderer.addClass(this.carouselIndicators[0], 'active');
            }
        }
    };
    CarouselComponent.prototype.swipe = function (action) {
        if (action === void 0) { action = this.SWIPE_ACTION.RIGHT; }
        if (this.allowSwipe) {
            if (action === this.SWIPE_ACTION.RIGHT) {
                this.previousSlide();
                this.cdRef.markForCheck();
            }
            if (action === this.SWIPE_ACTION.LEFT) {
                this.nextSlide();
                this.cdRef.markForCheck();
            }
        }
    };
    CarouselComponent.prototype.nextSlide = function (force) {
        if (force === void 0) { force = false; }
        this.restartTimer();
        // Start next slide, pause actual slide
        var videoList = this.el.nativeElement.getElementsByTagName('video');
        var direction = Direction.NEXT;
        var indexEl = this.findNextSlideIndex(direction, force);
        if (videoList.length > 0) {
            // Check for video carousel
            for (var i = 0; i < videoList.length; i++) {
                if (i === indexEl) {
                    videoList[i].play();
                }
                else {
                    videoList[i].pause();
                }
            }
        }
        if (this.animation === 'slide') {
            this.pause();
            this.slideAnimation(this.findNextSlideIndex(Direction.NEXT, force), Direction.NEXT);
            this.cdRef.markForCheck();
        }
        else if (this.animation === 'fade') {
            this.pause();
            this.fadeAnimation(this.findNextSlideIndex(Direction.NEXT, force), Direction.NEXT);
            this.cdRef.markForCheck();
        }
        else {
            this.activeSlide = this.findNextSlideIndex(Direction.NEXT, force);
            this.cdRef.markForCheck();
        }
        if (!this.animation) {
            this.activeSlideChange.emit({ direction: 'Next', relatedTarget: this.activeSlide });
        }
    };
    CarouselComponent.prototype.previousSlide = function (force) {
        if (force === void 0) { force = false; }
        this.restartTimer();
        // Start previous slide, pause actual slide
        var videoList = this.el.nativeElement.getElementsByTagName('video');
        var direction = Direction.PREV;
        var indexel = this.findNextSlideIndex(direction, force);
        if (videoList.length > 0) {
            // Check for video carousel
            for (var i = 0; i < videoList.length; i++) {
                if (i === indexel) {
                    videoList[i].play();
                }
                else {
                    videoList[i].pause();
                }
            }
        }
        if (this.animation === 'slide') {
            this.pause();
            this.slideAnimation(this.findNextSlideIndex(direction, force), direction);
            this.cdRef.markForCheck();
        }
        else if (this.animation === 'fade') {
            this.pause();
            this.fadeAnimation(this.findNextSlideIndex(Direction.PREV, force), Direction.PREV);
            this.cdRef.markForCheck();
        }
        else {
            this.activeSlide = this.findNextSlideIndex(Direction.PREV, force);
            this.cdRef.markForCheck();
        }
        if (!this.animation) {
            this.activeSlideChange.emit({ direction: 'Prev', relatedTarget: this.activeSlide });
        }
    };
    CarouselComponent.prototype.fadeAnimation = function (goToIndex, direction) {
        var _this = this;
        var goToSlide = this.slides[goToIndex];
        if (this.animationEnd) {
            this.animationEnd = false;
            goToSlide.directionNext = true;
            if (this.isBrowser) {
                setTimeout(function () {
                    var previous = _this.slides[_this._currentActiveSlide].el.nativeElement;
                    _this.renderer.setStyle(previous, 'opacity', '0');
                    _this.renderer.setStyle(previous, 'transition', 'all 600ms');
                    _this.renderer.setStyle(previous, 'display', 'block');
                    _this.renderer.setStyle(goToSlide.el.nativeElement, 'display', 'block');
                    _this.renderer.setStyle(goToSlide.el.nativeElement, 'opacity', '1');
                    _this.renderer.setStyle(goToSlide.el.nativeElement, 'transition', 'all 600ms');
                    if (direction === 1) {
                        _this.activeSlideChange.emit({ direction: 'Next', relatedTarget: _this.activeSlide });
                    }
                    else if (direction === 2) {
                        _this.activeSlideChange.emit({ direction: 'Prev', relatedTarget: _this.activeSlide });
                    }
                    goToSlide.directionNext = false;
                    _this.animationEnd = true;
                    _this.activeSlide = goToIndex;
                    _this.activeSlideChange.emit({ direction: 'Next', relatedTarget: _this.activeSlide });
                    _this.play();
                    _this.cdRef.markForCheck();
                }, 0);
            }
        }
    };
    CarouselComponent.prototype.slideAnimation = function (goToIndex, direction) {
        var _this = this;
        var currentSlide = this.slides[this._currentActiveSlide];
        var goToSlide = this.slides[goToIndex];
        if (this.animationEnd) {
            if (direction === Direction.NEXT) {
                this.animationEnd = false;
                goToSlide.directionNext = true;
                if (this.isBrowser) {
                    setTimeout(function () {
                        goToSlide.directionLeft = true;
                        currentSlide.directionLeft = true;
                        _this.cdRef.markForCheck();
                    }, 100);
                }
            }
            if (direction === Direction.PREV) {
                this.animationEnd = false;
                goToSlide.directionPrev = true;
                if (this.isBrowser) {
                    setTimeout(function () {
                        goToSlide.directionRight = true;
                        currentSlide.directionRight = true;
                        _this.cdRef.markForCheck();
                    }, 100);
                }
            }
            if (this.isBrowser) {
                setTimeout(function () {
                    goToSlide.directionLeft = false;
                    goToSlide.directionNext = false;
                    currentSlide.directionLeft = false;
                    currentSlide.directionNext = false;
                    goToSlide.directionRight = false;
                    goToSlide.directionPrev = false;
                    currentSlide.directionRight = false;
                    currentSlide.directionPrev = false;
                    _this.animationEnd = true;
                    _this.activeSlide = goToIndex;
                    var directionName;
                    if (direction === Direction.NEXT) {
                        directionName = 'Next';
                    }
                    else if (direction === Direction.PREV) {
                        directionName = 'Prev';
                    }
                    _this.activeSlideChange.emit({
                        direction: directionName,
                        relatedTarget: _this.activeSlide,
                    });
                    _this.play();
                    _this.cdRef.markForCheck();
                }, 700);
            }
        }
    };
    CarouselComponent.prototype.selectSlide = function (index) {
        var _this = this;
        this.pause();
        if (this.animation === 'slide') {
            if (this.activeSlide < index) {
                this.slideAnimation(index, Direction.NEXT);
            }
            else if (this.activeSlide > index) {
                this.slideAnimation(index, Direction.PREV);
            }
        }
        else if (this.animation === 'fade') {
            if (index !== this.activeSlide) {
                this.fadeAnimation(index);
            }
        }
        else if (!this.animation) {
            setTimeout(function () {
                var direction = index < _this.activeSlide ? 'Prev' : 'Next';
                _this._select(index);
                _this.activeSlideChange.emit({
                    direction: direction,
                    relatedTarget: _this.activeSlide,
                });
            }, 0);
        }
        this.play();
    };
    CarouselComponent.prototype.play = function () {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.restartTimer();
            this.cdRef.markForCheck();
        }
    };
    CarouselComponent.prototype.pause = function () {
        if (!this.noPause) {
            this.isPlaying = false;
            this.resetTimer();
            this.cdRef.markForCheck();
        }
    };
    CarouselComponent.prototype.getCurrentSlideIndex = function () {
        return this.slides.findIndex(function (slide) { return slide.active; });
    };
    CarouselComponent.prototype.isLast = function (index) {
        return index + 1 >= this.slides.length;
    };
    CarouselComponent.prototype.findNextSlideIndex = function (direction, force) {
        var nextSlideIndex = 0;
        if (!force && (this.isLast(this.activeSlide) && direction !== Direction.PREV && this.noWrap)) {
            return void 0;
        }
        switch (direction) {
            case Direction.NEXT:
                nextSlideIndex = !this.isLast(this._currentActiveSlide)
                    ? this._currentActiveSlide + 1
                    : !force && this.noWrap
                        ? this._currentActiveSlide
                        : 0;
                break;
            case Direction.PREV:
                nextSlideIndex =
                    this._currentActiveSlide > 0
                        ? this._currentActiveSlide - 1
                        : !force && this.noWrap
                            ? this._currentActiveSlide
                            : this.slides.length - 1;
                break;
            default:
                throw new Error('Unknown direction');
        }
        return nextSlideIndex;
    };
    CarouselComponent.prototype._select = function (index) {
        if (isNaN(index)) {
            this.pause();
            return;
        }
        var currentSlide = this.slides[this._currentActiveSlide];
        if (currentSlide) {
            currentSlide.active = false;
        }
        var nextSlide = this.slides[index];
        if (nextSlide) {
            this._currentActiveSlide = index;
            nextSlide.active = true;
            this.activeSlide = index;
        }
        this.cdRef.markForCheck();
    };
    CarouselComponent.prototype.restartTimer = function () {
        var _this = this;
        this.resetTimer();
        if (this.isBrowser) {
            var interval = +this.interval;
            if (!isNaN(interval) && interval > 0) {
                this.currentInterval = setInterval(function () {
                    var nInterval = +_this.interval;
                    if (_this.isPlaying && !isNaN(_this.interval) && nInterval > 0 && _this.slides.length) {
                        _this.nextSlide();
                    }
                    else {
                        _this.pause();
                    }
                }, interval);
            }
        }
    };
    CarouselComponent.prototype.resetTimer = function () {
        if (this.isBrowser) {
            if (this.currentInterval) {
                clearInterval(this.currentInterval);
                this.currentInterval = void 0;
            }
        }
    };
    CarouselComponent.prototype.hasClass = function (el, className) {
        if (el.classList) {
            return el.classList.contains(className);
        }
        else {
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
    };
    CarouselComponent.prototype.classAdd = function (el, className) {
        if (el.classList) {
            el.classList.add(className);
        }
        else if (!this.hasClass(el, className)) {
            el.className += ' ' + className;
        }
    };
    CarouselComponent.prototype.removeClass = function (el, className) {
        if (el.classList) {
            el.classList.remove(className);
        }
        else if (this.hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    };
    CarouselComponent.prototype.keyboardControl = function (event) {
        if (this.keyboard) {
            // tslint:disable-next-line: deprecation
            if (event.keyCode === RIGHT_ARROW) {
                this.nextSlide();
            }
            // tslint:disable-next-line: deprecation
            if (event.keyCode === LEFT_ARROW) {
                this.previousSlide();
            }
        }
    };
    CarouselComponent.prototype.focus = function () {
        this.el.nativeElement.focus();
    };
    CarouselComponent.ctorParameters = function () { return [
        { type: CarouselConfig },
        { type: ElementRef },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        ContentChildren(SlideComponent),
        __metadata("design:type", QueryList)
    ], CarouselComponent.prototype, "_slidesList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CarouselComponent.prototype, "noWrap", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CarouselComponent.prototype, "noPause", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CarouselComponent.prototype, "isControls", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CarouselComponent.prototype, "keyboard", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CarouselComponent.prototype, "class", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CarouselComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CarouselComponent.prototype, "animation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CarouselComponent.prototype, "activeSlideIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CarouselComponent.prototype, "allowSwipe", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CarouselComponent.prototype, "activeSlideChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], CarouselComponent.prototype, "activeSlide", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], CarouselComponent.prototype, "interval", null);
    __decorate([
        HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CarouselComponent.prototype, "play", null);
    __decorate([
        HostListener('mouseenter'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CarouselComponent.prototype, "pause", null);
    __decorate([
        HostListener('keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], CarouselComponent.prototype, "keyboardControl", null);
    __decorate([
        HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CarouselComponent.prototype, "focus", null);
    CarouselComponent = __decorate([
        Component({
            selector: 'mdb-carousel',
            template: "<div\n  tabindex=\"0\"\n  (swipeleft)=\"swipe($event.type)\"\n  (swiperight)=\"swipe($event.type)\"\n  (mouseenter)=\"pause()\"\n  (mouseleave)=\"play()\"\n  (mouseup)=\"play()\"\n  class=\"carousel {{ class }} {{ type }}\"\n>\n  <div class=\"controls-top\" *ngIf=\"slides.length > 1 && !checkNavigation() && isControls\">\n    <a\n      mdbBtn\n      floating=\"true\"\n      [class.disabled]=\"activeSlide === 0 && noWrap\"\n      (click)=\"previousSlide()\"\n      ><i class=\"fas fa-chevron-left\"></i\n    ></a>\n    <a mdbBtn floating=\"true\" (click)=\"nextSlide()\" [class.disabled]=\"isLast(activeSlide) && noWrap\"\n      ><i class=\"fas fa-chevron-right\"></i\n    ></a>\n  </div>\n  <ol class=\"carousel-indicators\" *ngIf=\"slides.length > 1 && checkDots() && isControls\">\n    <li\n      *ngFor=\"let slidez of slides; let i = index\"\n      [class.active]=\"slidez.active === true\"\n      (click)=\"selectSlide(i)\"\n    ></li>\n  </ol>\n  <ol class=\"carousel-indicators\" *ngIf=\"slides.length > 1 && !checkDots() && isControls\">\n    <li\n      *ngFor=\"let slidez of slides; let i = index\"\n      [class.active]=\"slidez.active === true\"\n      (click)=\"selectSlide(i)\"\n    >\n      <img class=\"d-block w-100 img-fluid\" src=\"{{ getImg(slidez) }}\" />\n    </li>\n  </ol>\n  <div class=\"carousel-inner\"><ng-content></ng-content></div>\n  <a\n    class=\"carousel-control-prev\"\n    [class.disabled]=\"activeSlide === 0 && noWrap\"\n    (click)=\"previousSlide()\"\n    *ngIf=\"slides.length > 1 && checkNavigation() && isControls\"\n  >\n    <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n    <span class=\"sr-only\">Previous</span>\n  </a>\n  <a\n    class=\"carousel-control-next\"\n    (click)=\"nextSlide()\"\n    [class.disabled]=\"isLast(activeSlide) && noWrap\"\n    *ngIf=\"slides.length > 1 && checkNavigation() && isControls\"\n  >\n    <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n    <span class=\"sr-only\">Next</span>\n  </a>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".carousel .carousel-control-next-icon,.carousel .carousel-control-prev-icon{width:2.25rem;height:2.25rem}.carousel .carousel-indicators li{width:.625rem;height:.625rem;border-radius:50%;cursor:pointer}.carousel-fade .carousel-item{opacity:0;transition-duration:.6s;transition-property:opacity}.carousel-fade .carousel-item-next.carousel-item-left,.carousel-fade .carousel-item-prev.carousel-item-right,.carousel-fade .carousel-item.active{opacity:1}.carousel-fade .carousel-item-left.active,.carousel-fade .carousel-item-right.active{opacity:0}.carousel-fade .carousel-item-left.active,.carousel-fade .carousel-item-next,.carousel-fade .carousel-item-prev,.carousel-fade .carousel-item-prev.active,.carousel-fade .carousel-item.active{transform:translateX(0)}@supports (transform-style:preserve-3d){.carousel-fade .carousel-item-left.active,.carousel-fade .carousel-item-next,.carousel-fade .carousel-item-prev,.carousel-fade .carousel-item-prev.active,.carousel-fade .carousel-item.active{transform:translate3d(0,0,0)}}.carousel-control-next,.carousel-control-prev,.carousel-item-next,.carousel-item-prev,.carousel-item.active{display:flex;overflow:hidden}.carousel,.carousel-multi-item,.carousel-thumbnails{outline:0}.carousel-fade .carousel-inner .carousel-item{opacity:0;transition-property:opacity}.carousel-fade .carousel-inner .active{opacity:1;transition:.6s}.carousel-fade .carousel-inner>.carousel-item.active,.carousel-fade .carousel-inner>.carousel-item.next.left,.carousel-fade .carousel-inner>.carousel-item.prev.right{opacity:1;transition:.6s;transform:translate3d(0,0,0)}.carousel-multi-item{margin-bottom:5rem}.carousel-multi-item .carousel-inner .carousel-item.active,.carousel-multi-item .carousel-item-next,.carousel-multi-item .carousel-item-prev{display:block}.carousel-multi-item .carousel-inner.v-2 .carousel-item-next,.carousel-multi-item .carousel-inner.v-2 .carousel-item-prev,.carousel-multi-item .carousel-inner.v-2 .carousel-item.active{display:flex}.carousel-multi-item .carousel-inner.v-2 .carousel-item-next,.carousel-multi-item .carousel-inner.v-2 .carousel-item-right.active{transform:translateX(33%)}.carousel-multi-item .carousel-inner.v-2 .carousel-item-left.active,.carousel-multi-item .carousel-inner.v-2 .carousel-item-prev{transform:translateX(-33%)}.carousel-multi-item .carousel-inner.v-2 .carousel-item-left,.carousel-multi-item .carousel-inner.v-2 .carousel-item-right{transform:translateX(0)}.carousel-multi-item .carousel-indicators li{height:1.25rem;width:1.25rem;max-width:1.25rem;background-color:#4285f4;margin-bottom:-3.75rem}.carousel-multi-item .carousel-indicators .active{height:1.56rem;width:1.56rem;max-width:1.56rem;background-color:#4285f4;border-radius:50%}.carousel-multi-item .controls-top{text-align:center;margin-bottom:1.88rem}.carousel-multi-item .controls-top .btn-floating{background:#4285f4}.carousel-multi-item .carousel-indicators{margin-bottom:-2em}.carousel-multi-item .card-cascade.narrower{margin-top:1.25rem;margin-bottom:.3rem}@media (min-width:768px){.carousel-multi-item .col-md-4{float:left;width:33.333333%;max-width:100%}}@media only screen and (max-width:992px){.carousel-multi-item .carousel-indicators li{margin-bottom:-1.88rem}}.carousel-thumbnails .carousel-indicators{white-space:nowrap;overflow-x:auto;width:initial;margin-left:initial;margin-right:initial;margin-bottom:-4.69rem;position:absolute;left:0}.carousel-thumbnails .carousel-indicators>li{width:initial;height:initial;text-indent:initial}.carousel-thumbnails .carousel-indicators>li .active img{opacity:1}.wrapper-carousel-fix .carousel-fade .active.carousel-item-left,.wrapper-carousel-fix .carousel-fade .active.carousel-item-right{transition:opacity .6s}.carousel-thumbnails{margin-bottom:5rem}.carousel-thumbnails .carousel-indicators li{height:auto;width:6.25rem;max-width:6.25rem;border:none}.carousel-thumbnails .carousel-indicators .active{background-color:#fff;height:auto;width:auto;opacity:1}.carousel-thumbnails .carousel-indicators img{max-width:6.25rem;height:auto;overflow:hidden;display:block}"]
        }),
        __param(2, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [CarouselConfig,
            ElementRef, String, ChangeDetectorRef,
            Renderer2])
    ], CarouselComponent);
    return CarouselComponent;
}());
export { CarouselComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvY2Fyb3VzZWwvY2Fyb3VzZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsdUJBQXVCLEdBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsTUFBTSxDQUFOLElBQVksU0FJWDtBQUpELFdBQVksU0FBUztJQUNuQiwrQ0FBTyxDQUFBO0lBQ1AseUNBQUksQ0FBQTtJQUNKLHlDQUFJLENBQUE7QUFDTixDQUFDLEVBSlcsU0FBUyxLQUFULFNBQVMsUUFJcEI7QUFFRDs7R0FFRztBQVFIO0lBOEVFLDJCQUNFLE1BQXNCLEVBQ1osRUFBYyxFQUNILFVBQWtCLEVBQy9CLEtBQXdCLEVBQ3hCLFFBQW1CO1FBSGpCLE9BQUUsR0FBRixFQUFF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aW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgaXNCczMgfSBmcm9tICcuLi91dGlscy9uZzItYm9vdHN0cmFwLWNvbmZpZyc7XG5pbXBvcnQgeyBTbGlkZUNvbXBvbmVudCB9IGZyb20gJy4vc2xpZGUuY29tcG9uZW50JztcbmltcG9ydCB7IENhcm91c2VsQ29uZmlnIH0gZnJvbSAnLi9jYXJvdXNlbC5jb25maWcnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTEVGVF9BUlJPVywgUklHSFRfQVJST1cgfSBmcm9tICcuLi91dGlscy9rZXlib2FyZC1uYXZpZ2F0aW9uJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGVudW0gRGlyZWN0aW9uIHtcbiAgVU5LTk9XTixcbiAgTkVYVCxcbiAgUFJFVixcbn1cblxuLyoqXG4gKiBCYXNlIGVsZW1lbnQgdG8gY3JlYXRlIGNhcm91c2VsXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1jYXJvdXNlbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJvdXNlbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Nhcm91c2VsLW1vZHVsZS5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gIFNXSVBFX0FDVElPTiA9IHsgTEVGVDogJ3N3aXBlbGVmdCcsIFJJR0hUOiAnc3dpcGVyaWdodCcgfTtcblxuICBAQ29udGVudENoaWxkcmVuKFNsaWRlQ29tcG9uZW50KSBfc2xpZGVzTGlzdDogUXVlcnlMaXN0PFNsaWRlQ29tcG9uZW50PjtcbiAgcHVibGljIGdldCBzbGlkZXMoKTogU2xpZGVDb21wb25lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NsaWRlc0xpc3QudG9BcnJheSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIHByb3RlY3RlZCBjdXJyZW50SW50ZXJ2YWw6IGFueTtcbiAgcHJvdGVjdGVkIGlzUGxheWluZzogYm9vbGVhbjtcbiAgcHJvdGVjdGVkIGRlc3Ryb3llZCA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBhbmltYXRpb25FbmQgPSB0cnVlO1xuICBwcm90ZWN0ZWQgX2N1cnJlbnRBY3RpdmVTbGlkZTogbnVtYmVyO1xuICBwcm90ZWN0ZWQgY2Fyb3VzZWxJbmRpY2F0b3JzOiBhbnk7XG5cbiAgaXNCcm93c2VyOiBhbnkgPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIG5vV3JhcDogYm9vbGVhbjtcbiAgQElucHV0KCkgcHVibGljIG5vUGF1c2U6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcHVibGljIGlzQ29udHJvbHMgPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMga2V5Ym9hcmQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcHVibGljIGNsYXNzOiBTdHJpbmcgPSAnJztcbiAgQElucHV0KCkgcHVibGljIHR5cGU6IFN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBwdWJsaWMgYW5pbWF0aW9uOiBTdHJpbmcgPSAnJztcbiAgQElucHV0KCkgYWN0aXZlU2xpZGVJbmRleDogbnVtYmVyO1xuICBASW5wdXQoKSBhbGxvd1N3aXBlID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgcHVibGljIGFjdGl2ZVNsaWRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PihmYWxzZSk7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBhY3RpdmVTbGlkZShpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3NsaWRlc0xpc3QgJiYgaW5kZXggIT09IHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSkge1xuICAgICAgdGhpcy5fc2VsZWN0KGluZGV4KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFjdGl2ZVNsaWRlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaW50ZXJ2YWw6IG51bWJlcjtcblxuICBwdWJsaWMgY2hlY2tOYXZpZ2F0aW9uKCkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICdjYXJvdXNlbC1tdWx0aS1pdGVtJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjaGVja0RvdHMoKSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2Nhcm91c2VsLXRodW1ibmFpbHMnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0SW1nKHNsaWRlOiBhbnkpIHtcbiAgICByZXR1cm4gc2xpZGUuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbWcnKS5zcmM7XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IGludGVydmFsKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2ludGVydmFsO1xuICB9XG5cbiAgcHVibGljIHNldCBpbnRlcnZhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSB2YWx1ZTtcbiAgICB0aGlzLnJlc3RhcnRUaW1lcigpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc0JzNCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIWlzQnMzKCk7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgY29uZmlnOiBDYXJvdXNlbENvbmZpZyxcbiAgICBwcm90ZWN0ZWQgZWw6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogc3RyaW5nLFxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHtcbiAgICB0aGlzLmlzQnJvd3NlciA9IGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29uZmlnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgdGhpcy5fZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5wbGF5KCk7XG4gICAgdGhpcy5fc2xpZGVzTGlzdC5jaGFuZ2VzXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoc2xpZGVzTGlzdDogUXVlcnlMaXN0PFNsaWRlQ29tcG9uZW50PikgPT4ge1xuICAgICAgICB0aGlzLl9zbGlkZXNMaXN0ID0gc2xpZGVzTGlzdDtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fc2VsZWN0KDApO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYWN0aXZlU2xpZGVJbmRleCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3NlbGVjdCh0aGlzLmFjdGl2ZVNsaWRlSW5kZXgpO1xuICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlQ2hhbmdlLmVtaXQoeyByZWxhdGVkVGFyZ2V0OiB0aGlzLmFjdGl2ZVNsaWRlIH0pO1xuICAgICAgfSwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9zZWxlY3QoMCk7XG4gICAgICB9LCAwKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0NvbnRyb2xzKSB7XG4gICAgICB0aGlzLmNhcm91c2VsSW5kaWNhdG9ycyA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2Fyb3VzZWwtaW5kaWNhdG9ycyA+IGxpJyk7XG4gICAgICBpZiAodGhpcy5jYXJvdXNlbEluZGljYXRvcnMubGVuZ3RoICYmIHRoaXMuYWN0aXZlU2xpZGVJbmRleCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuY2Fyb3VzZWxJbmRpY2F0b3JzW3RoaXMuYWN0aXZlU2xpZGVJbmRleF0sICdhY3RpdmUnKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jYXJvdXNlbEluZGljYXRvcnMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5jYXJvdXNlbEluZGljYXRvcnNbMF0sICdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzd2lwZShhY3Rpb24gPSB0aGlzLlNXSVBFX0FDVElPTi5SSUdIVCkge1xuICAgIGlmICh0aGlzLmFsbG93U3dpcGUpIHtcbiAgICAgIGlmIChhY3Rpb24gPT09IHRoaXMuU1dJUEVfQUNUSU9OLlJJR0hUKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXNTbGlkZSgpO1xuICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aW9uID09PSB0aGlzLlNXSVBFX0FDVElPTi5MRUZUKSB7XG4gICAgICAgIHRoaXMubmV4dFNsaWRlKCk7XG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5leHRTbGlkZShmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgdGhpcy5yZXN0YXJ0VGltZXIoKTtcbiAgICAvLyBTdGFydCBuZXh0IHNsaWRlLCBwYXVzZSBhY3R1YWwgc2xpZGVcbiAgICBjb25zdCB2aWRlb0xpc3QgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3ZpZGVvJyk7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gRGlyZWN0aW9uLk5FWFQ7XG4gICAgY29uc3QgaW5kZXhFbCA9IHRoaXMuZmluZE5leHRTbGlkZUluZGV4KGRpcmVjdGlvbiwgZm9yY2UpO1xuICAgIGlmICh2aWRlb0xpc3QubGVuZ3RoID4gMCkge1xuICAgICAgLy8gQ2hlY2sgZm9yIHZpZGVvIGNhcm91c2VsXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpZGVvTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaSA9PT0gaW5kZXhFbCkge1xuICAgICAgICAgIHZpZGVvTGlzdFtpXS5wbGF5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmlkZW9MaXN0W2ldLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uID09PSAnc2xpZGUnKSB7XG4gICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICB0aGlzLnNsaWRlQW5pbWF0aW9uKHRoaXMuZmluZE5leHRTbGlkZUluZGV4KERpcmVjdGlvbi5ORVhULCBmb3JjZSksIERpcmVjdGlvbi5ORVhUKTtcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFuaW1hdGlvbiA9PT0gJ2ZhZGUnKSB7XG4gICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICB0aGlzLmZhZGVBbmltYXRpb24odGhpcy5maW5kTmV4dFNsaWRlSW5kZXgoRGlyZWN0aW9uLk5FWFQsIGZvcmNlKSwgRGlyZWN0aW9uLk5FWFQpO1xuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmVTbGlkZSA9IHRoaXMuZmluZE5leHRTbGlkZUluZGV4KERpcmVjdGlvbi5ORVhULCBmb3JjZSk7XG4gICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuYW5pbWF0aW9uKSB7XG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlQ2hhbmdlLmVtaXQoeyBkaXJlY3Rpb246ICdOZXh0JywgcmVsYXRlZFRhcmdldDogdGhpcy5hY3RpdmVTbGlkZSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcHJldmlvdXNTbGlkZShmb3JjZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgdGhpcy5yZXN0YXJ0VGltZXIoKTtcbiAgICAvLyBTdGFydCBwcmV2aW91cyBzbGlkZSwgcGF1c2UgYWN0dWFsIHNsaWRlXG4gICAgY29uc3QgdmlkZW9MaXN0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd2aWRlbycpO1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IERpcmVjdGlvbi5QUkVWO1xuICAgIGNvbnN0IGluZGV4ZWwgPSB0aGlzLmZpbmROZXh0U2xpZGVJbmRleChkaXJlY3Rpb24sIGZvcmNlKTtcbiAgICBpZiAodmlkZW9MaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIENoZWNrIGZvciB2aWRlbyBjYXJvdXNlbFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2aWRlb0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGkgPT09IGluZGV4ZWwpIHtcbiAgICAgICAgICB2aWRlb0xpc3RbaV0ucGxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZpZGVvTGlzdFtpXS5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uID09PSAnc2xpZGUnKSB7XG4gICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICB0aGlzLnNsaWRlQW5pbWF0aW9uKHRoaXMuZmluZE5leHRTbGlkZUluZGV4KGRpcmVjdGlvbiwgZm9yY2UpLCBkaXJlY3Rpb24pO1xuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYW5pbWF0aW9uID09PSAnZmFkZScpIHtcbiAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgIHRoaXMuZmFkZUFuaW1hdGlvbih0aGlzLmZpbmROZXh0U2xpZGVJbmRleChEaXJlY3Rpb24uUFJFViwgZm9yY2UpLCBEaXJlY3Rpb24uUFJFVik7XG4gICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gdGhpcy5maW5kTmV4dFNsaWRlSW5kZXgoRGlyZWN0aW9uLlBSRVYsIGZvcmNlKTtcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5hbmltYXRpb24pIHtcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGVDaGFuZ2UuZW1pdCh7IGRpcmVjdGlvbjogJ1ByZXYnLCByZWxhdGVkVGFyZ2V0OiB0aGlzLmFjdGl2ZVNsaWRlIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBmYWRlQW5pbWF0aW9uKGdvVG9JbmRleDogbnVtYmVyLCBkaXJlY3Rpb24/OiBhbnkpIHtcbiAgICBjb25zdCBnb1RvU2xpZGUgPSB0aGlzLnNsaWRlc1tnb1RvSW5kZXhdO1xuXG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uRW5kKSB7XG4gICAgICB0aGlzLmFuaW1hdGlvbkVuZCA9IGZhbHNlO1xuXG4gICAgICBnb1RvU2xpZGUuZGlyZWN0aW9uTmV4dCA9IHRydWU7XG4gICAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcHJldmlvdXMgPSB0aGlzLnNsaWRlc1t0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGVdLmVsLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHByZXZpb3VzLCAnb3BhY2l0eScsICcwJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShwcmV2aW91cywgJ3RyYW5zaXRpb24nLCAnYWxsIDYwMG1zJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShwcmV2aW91cywgJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ29Ub1NsaWRlLmVsLm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShnb1RvU2xpZGUuZWwubmF0aXZlRWxlbWVudCwgJ29wYWNpdHknLCAnMScpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZ29Ub1NsaWRlLmVsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uJywgJ2FsbCA2MDBtcycpO1xuXG4gICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVTbGlkZUNoYW5nZS5lbWl0KHsgZGlyZWN0aW9uOiAnTmV4dCcsIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuYWN0aXZlU2xpZGUgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IDIpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlU2xpZGVDaGFuZ2UuZW1pdCh7IGRpcmVjdGlvbjogJ1ByZXYnLCByZWxhdGVkVGFyZ2V0OiB0aGlzLmFjdGl2ZVNsaWRlIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGdvVG9TbGlkZS5kaXJlY3Rpb25OZXh0ID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5hbmltYXRpb25FbmQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSBnb1RvSW5kZXg7XG4gICAgICAgICAgdGhpcy5hY3RpdmVTbGlkZUNoYW5nZS5lbWl0KHsgZGlyZWN0aW9uOiAnTmV4dCcsIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuYWN0aXZlU2xpZGUgfSk7XG4gICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHNsaWRlQW5pbWF0aW9uKGdvVG9JbmRleDogbnVtYmVyLCBkaXJlY3Rpb246IGFueSkge1xuICAgIGNvbnN0IGN1cnJlbnRTbGlkZSA9IHRoaXMuc2xpZGVzW3RoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZV07XG4gICAgY29uc3QgZ29Ub1NsaWRlID0gdGhpcy5zbGlkZXNbZ29Ub0luZGV4XTtcblxuICAgIGlmICh0aGlzLmFuaW1hdGlvbkVuZCkge1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLk5FWFQpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25FbmQgPSBmYWxzZTtcbiAgICAgICAgZ29Ub1NsaWRlLmRpcmVjdGlvbk5leHQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGdvVG9TbGlkZS5kaXJlY3Rpb25MZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5kaXJlY3Rpb25MZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uUFJFVikge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbkVuZCA9IGZhbHNlO1xuXG4gICAgICAgIGdvVG9TbGlkZS5kaXJlY3Rpb25QcmV2ID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBnb1RvU2xpZGUuZGlyZWN0aW9uUmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgY3VycmVudFNsaWRlLmRpcmVjdGlvblJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZ29Ub1NsaWRlLmRpcmVjdGlvbkxlZnQgPSBmYWxzZTtcbiAgICAgICAgICBnb1RvU2xpZGUuZGlyZWN0aW9uTmV4dCA9IGZhbHNlO1xuICAgICAgICAgIGN1cnJlbnRTbGlkZS5kaXJlY3Rpb25MZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgY3VycmVudFNsaWRlLmRpcmVjdGlvbk5leHQgPSBmYWxzZTtcbiAgICAgICAgICBnb1RvU2xpZGUuZGlyZWN0aW9uUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICBnb1RvU2xpZGUuZGlyZWN0aW9uUHJldiA9IGZhbHNlO1xuICAgICAgICAgIGN1cnJlbnRTbGlkZS5kaXJlY3Rpb25SaWdodCA9IGZhbHNlO1xuICAgICAgICAgIGN1cnJlbnRTbGlkZS5kaXJlY3Rpb25QcmV2ID0gZmFsc2U7XG5cbiAgICAgICAgICB0aGlzLmFuaW1hdGlvbkVuZCA9IHRydWU7XG5cbiAgICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gZ29Ub0luZGV4O1xuXG4gICAgICAgICAgbGV0IGRpcmVjdGlvbk5hbWU7XG4gICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLk5FWFQpIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbk5hbWUgPSAnTmV4dCc7XG4gICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5QUkVWKSB7XG4gICAgICAgICAgICBkaXJlY3Rpb25OYW1lID0gJ1ByZXYnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuYWN0aXZlU2xpZGVDaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvbk5hbWUsXG4gICAgICAgICAgICByZWxhdGVkVGFyZ2V0OiB0aGlzLmFjdGl2ZVNsaWRlLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0sIDcwMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNlbGVjdFNsaWRlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnBhdXNlKCk7XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uID09PSAnc2xpZGUnKSB7XG4gICAgICBpZiAodGhpcy5hY3RpdmVTbGlkZSA8IGluZGV4KSB7XG4gICAgICAgIHRoaXMuc2xpZGVBbmltYXRpb24oaW5kZXgsIERpcmVjdGlvbi5ORVhUKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hY3RpdmVTbGlkZSA+IGluZGV4KSB7XG4gICAgICAgIHRoaXMuc2xpZGVBbmltYXRpb24oaW5kZXgsIERpcmVjdGlvbi5QUkVWKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuYW5pbWF0aW9uID09PSAnZmFkZScpIHtcbiAgICAgIGlmIChpbmRleCAhPT0gdGhpcy5hY3RpdmVTbGlkZSkge1xuICAgICAgICB0aGlzLmZhZGVBbmltYXRpb24oaW5kZXgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMuYW5pbWF0aW9uKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gaW5kZXggPCB0aGlzLmFjdGl2ZVNsaWRlID8gJ1ByZXYnIDogJ05leHQnO1xuICAgICAgICB0aGlzLl9zZWxlY3QoaW5kZXgpO1xuICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgIGRpcmVjdGlvbixcbiAgICAgICAgICByZWxhdGVkVGFyZ2V0OiB0aGlzLmFjdGl2ZVNsaWRlLFxuICAgICAgICB9KTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgICB0aGlzLnBsYXkoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKSBwbGF5KCkge1xuICAgIGlmICghdGhpcy5pc1BsYXlpbmcpIHtcbiAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMucmVzdGFydFRpbWVyKCk7XG4gICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKSBwYXVzZSgpIHtcbiAgICBpZiAoIXRoaXMubm9QYXVzZSkge1xuICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVzZXRUaW1lcigpO1xuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0Q3VycmVudFNsaWRlSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zbGlkZXMuZmluZEluZGV4KChzbGlkZTogU2xpZGVDb21wb25lbnQpID0+IHNsaWRlLmFjdGl2ZSk7XG4gIH1cblxuICBwdWJsaWMgaXNMYXN0KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaW5kZXggKyAxID49IHRoaXMuc2xpZGVzLmxlbmd0aDtcbiAgfVxuXG4gIHByaXZhdGUgZmluZE5leHRTbGlkZUluZGV4KGRpcmVjdGlvbjogRGlyZWN0aW9uLCBmb3JjZTogYm9vbGVhbik6IGFueSB7XG4gICAgbGV0IG5leHRTbGlkZUluZGV4ID0gMDtcblxuICAgIGlmICghZm9yY2UgJiYgKHRoaXMuaXNMYXN0KHRoaXMuYWN0aXZlU2xpZGUpICYmIGRpcmVjdGlvbiAhPT0gRGlyZWN0aW9uLlBSRVYgJiYgdGhpcy5ub1dyYXApKSB7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICBjYXNlIERpcmVjdGlvbi5ORVhUOlxuICAgICAgICBuZXh0U2xpZGVJbmRleCA9ICF0aGlzLmlzTGFzdCh0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUpXG4gICAgICAgICAgPyB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUgKyAxXG4gICAgICAgICAgOiAhZm9yY2UgJiYgdGhpcy5ub1dyYXBcbiAgICAgICAgICA/IHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZVxuICAgICAgICAgIDogMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERpcmVjdGlvbi5QUkVWOlxuICAgICAgICBuZXh0U2xpZGVJbmRleCA9XG4gICAgICAgICAgdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlID4gMFxuICAgICAgICAgICAgPyB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUgLSAxXG4gICAgICAgICAgICA6ICFmb3JjZSAmJiB0aGlzLm5vV3JhcFxuICAgICAgICAgICAgPyB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGVcbiAgICAgICAgICAgIDogdGhpcy5zbGlkZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZGlyZWN0aW9uJyk7XG4gICAgfVxuICAgIHJldHVybiBuZXh0U2xpZGVJbmRleDtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlzTmFOKGluZGV4KSkge1xuICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjdXJyZW50U2xpZGUgPSB0aGlzLnNsaWRlc1t0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGVdO1xuICAgIGlmIChjdXJyZW50U2xpZGUpIHtcbiAgICAgIGN1cnJlbnRTbGlkZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgbmV4dFNsaWRlID0gdGhpcy5zbGlkZXNbaW5kZXhdO1xuICAgIGlmIChuZXh0U2xpZGUpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA9IGluZGV4O1xuICAgICAgbmV4dFNsaWRlLmFjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gaW5kZXg7XG4gICAgfVxuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIHJlc3RhcnRUaW1lcigpOiBhbnkge1xuICAgIHRoaXMucmVzZXRUaW1lcigpO1xuICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSArdGhpcy5pbnRlcnZhbDtcbiAgICAgIGlmICghaXNOYU4oaW50ZXJ2YWwpICYmIGludGVydmFsID4gMCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBuSW50ZXJ2YWwgPSArdGhpcy5pbnRlcnZhbDtcbiAgICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcgJiYgIWlzTmFOKHRoaXMuaW50ZXJ2YWwpICYmIG5JbnRlcnZhbCA+IDAgJiYgdGhpcy5zbGlkZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRTbGlkZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBpbnRlcnZhbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNldFRpbWVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgaWYgKHRoaXMuY3VycmVudEludGVydmFsKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5jdXJyZW50SW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLmN1cnJlbnRJbnRlcnZhbCA9IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFzQ2xhc3MoZWw6IGFueSwgY2xhc3NOYW1lOiBhbnkpIHtcbiAgICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAhIWVsLmNsYXNzTmFtZS5tYXRjaChuZXcgUmVnRXhwKCcoXFxcXHN8XiknICsgY2xhc3NOYW1lICsgJyhcXFxcc3wkKScpKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgY2xhc3NBZGQoZWw6IGFueSwgY2xhc3NOYW1lOiBhbnkpIHtcbiAgICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5oYXNDbGFzcyhlbCwgY2xhc3NOYW1lKSkge1xuICAgICAgZWwuY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzTmFtZTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgY2xhc3NOYW1lOiBhbnkpIHtcbiAgICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhhc0NsYXNzKGVsLCBjbGFzc05hbWUpKSB7XG4gICAgICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKCcoXFxcXHN8XiknICsgY2xhc3NOYW1lICsgJyhcXFxcc3wkKScpO1xuICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UocmVnLCAnICcpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleXVwJywgWyckZXZlbnQnXSkga2V5Ym9hcmRDb250cm9sKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAodGhpcy5rZXlib2FyZCkge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IFJJR0hUX0FSUk9XKSB7XG4gICAgICAgIHRoaXMubmV4dFNsaWRlKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBMRUZUX0FSUk9XKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXNTbGlkZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgZm9jdXMoKSB7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cbn1cbiJdfQ==