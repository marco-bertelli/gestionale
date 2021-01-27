import { __decorate, __metadata, __param } from "tslib";
import { AfterContentChecked, AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, OnInit, Output, PLATFORM_ID, Renderer2, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, HostListener, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
export var TIME_PIRCKER_VALUE_ACCESSOT = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(function () { return ClockPickerComponent; }),
    multi: true,
};
var ClockPickerComponent = /** @class */ (function () {
    function ClockPickerComponent(elem, renderer, _cdRef, _ngZone, _document, platformId) {
        var _this = this;
        this.elem = elem;
        this.renderer = renderer;
        this._cdRef = _cdRef;
        this._ngZone = _ngZone;
        this._document = _document;
        this.twelvehour = false;
        this.darktheme = false;
        this.placeholder = '';
        this.label = '';
        this.duration = 300;
        this.showClock = false;
        this.buttonLabel = 'Done';
        this.buttonClear = true;
        this.buttonClose = false;
        this.buttonClearLabel = 'Clear';
        this.buttonCloseLabel = 'Close';
        this.disabled = false;
        this.outlineInput = false;
        this.openOnFocus = true;
        this.readonly = false;
        this.ampmClass = '';
        this.footerClass = '';
        this.timeChanged = new EventEmitter();
        this.isOpen = false;
        this.isMobile = null;
        this.touchDevice = 'ontouchstart' in document.documentElement;
        this.showHours = false;
        this.elements = document.getElementsByClassName('clockpicker');
        this.dialRadius = 135;
        this.outerRadius = 110;
        this.innerRadius = 80;
        this.tickRadius = 20;
        this.diameter = this.dialRadius * 2;
        this.isBrowser = false;
        this.hoursTicks = [];
        this.minutesTicks = [];
        this.selectedHours = { h: '12', m: '00', ampm: 'AM' };
        this.endHours = '';
        this.touchSupported = 'ontouchstart' in window;
        this.mousedownEvent = 'mousedown' + (this.touchSupported ? ' touchstart' : '');
        this.mousemoveEvent = 'mousemove' + (this.touchSupported ? ' touchmove' : '');
        this.mouseupEvent = 'mouseup' + (this.touchSupported ? ' touchend' : '');
        this.isMouseDown = false;
        this.onChangeCb = function () { };
        this.onTouchedCb = function () { };
        this.isBrowser = isPlatformBrowser(platformId);
        renderer.listen(this.elem.nativeElement, 'click', function (event) {
            if (_this.showClock &&
                event.target &&
                _this.elem.nativeElement !== event.target &&
                !_this.elem.nativeElement.contains(event.target)) {
                _this.showClock = false;
            }
            if (event.target.classList.contains('picker__holder')) {
                _this.showClock = false;
            }
        });
    }
    ClockPickerComponent.prototype.ontouchmove = function (event) {
        this.mousedown(event);
    };
    ClockPickerComponent.prototype.ngOnInit = function () {
        this.generateTick();
        if (this.isBrowser) {
            this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        }
        this.isOpen = this.showClock;
        this._handleOutsideClick();
    };
    ClockPickerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        ['mousedown', 'mouseup'].forEach(function (event) {
            _this.renderer.listen(_this.elem.nativeElement.querySelector('.clockpicker-plate'), event, function (ev) {
                if (event === 'mousedown') {
                    _this.mousedown(ev, false);
                    _this.isMouseDown = true;
                }
                else {
                    _this.isMouseDown = false;
                }
            });
        });
    };
    ClockPickerComponent.prototype.ngAfterContentChecked = function () {
        var _this = this;
        if (this.isBrowser) {
            // Fix for visible date / time picker input when picker plate is visible.
            try {
                var openedPicker = document.querySelector('.picker--opened');
                var allPickers = document.querySelectorAll('.picker');
                allPickers.forEach(function (element) {
                    _this.renderer.setStyle(element, 'z-index', '0');
                });
                this.renderer.setStyle(openedPicker, 'z-index', '1000');
            }
            catch (error) { }
        }
    };
    ClockPickerComponent.prototype.checkDraw = function () {
        var value;
        var isHours = this.showHours;
        if (isHours) {
            value = parseInt(this.selectedHours.h, 0);
        }
        else {
            value = parseInt(this.selectedHours.m, 0);
        }
        var unit = Math.PI / (isHours ? 6 : 30), radian = value * unit, radius = isHours && value > 0 && value < 13 ? this.innerRadius : this.outerRadius, xd = Math.sin(radian) * radius, yd = -Math.cos(radian) * radius;
        this.setHand(xd, yd, false);
    };
    ClockPickerComponent.prototype.mousedown = function (e, space) {
        var _this = this;
        var offset = this.plate.nativeElement.getBoundingClientRect(), isTouch = /^touch/.test(e.type), x0 = offset.left + this.dialRadius, y0 = offset.top + this.dialRadius, dx = (isTouch ? e.touches[0] : e).clientX - x0, dy = (isTouch ? e.touches[0] : e).clientY - y0, z = Math.sqrt(dx * dx + dy * dy);
        var moved = false;
        if (space &&
            (z < this.outerRadius - this.tickRadius || z > this.outerRadius + this.tickRadius)) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (this.showHours) {
            this.setHand(dx, dy, true);
        }
        else {
            this.setHand(dx, dy, false);
        }
        var mousemoveEventMethod = function (event) {
            event.preventDefault();
            event.stopPropagation();
            var x = event.clientX - x0, y = event.clientY - y0;
            if (!moved && x === dx && y === dy) {
                return;
            }
            moved = true;
            _this._ngZone.run(function () {
                _this.setHand(x, y, false);
            });
        };
        var mouseupEventMethod = function (event) {
            _this._document.removeEventListener(_this.mousemoveEvent, mousemoveEventMethod);
            e.preventDefault();
            var x = event.clientX - x0, y = event.clientX - y0;
            if ((space || moved) && x === dx && y === dy) {
                _this.setHand(x, y, false);
            }
            _this.showMinutesClock();
            _this._document.removeEventListener(_this.mouseupEvent, mouseupEventMethod);
        };
        this._ngZone.runOutsideAngular(function () {
            _this._document.addEventListener(_this.mousemoveEvent, mousemoveEventMethod);
            _this._document.addEventListener(_this.mouseupEvent, mouseupEventMethod);
        });
    };
    ClockPickerComponent.prototype.hideKeyboard = function () {
        var _this = this;
        // this set timeout needed for case when hideKeyborad
        // is called inside of 'onfocus' event handler
        try {
            setTimeout(function () {
                // creating temp field
                var field = _this.renderer.createElement('input');
                _this.renderer.appendChild(_this.elem.nativeElement, field);
                var inputReference = _this.elem.nativeElement.lastElementChild;
                _this.renderer.setAttribute(inputReference, 'type', 'text');
                _this.renderer.setAttribute(inputReference, 'type', 'text');
                _this.renderer.setStyle(inputReference, 'opacity', '0');
                _this.renderer.setStyle(inputReference, '-webkit-user-modify', 'read-write-plaintext-only');
                // // hiding temp field from peoples eyes
                // // -webkit-user-modify is nessesary for Android 4.x
                // adding onfocus event handler for out temp field
                field.onfocus = function () {
                    // this timeout of 200ms is nessasary for Android 2.3.x
                    setTimeout(function () {
                        _this.renderer.setStyle(field, 'display', 'none');
                        setTimeout(function () {
                            _this.renderer.removeChild(_this.elem.nativeElement, field);
                            document.body.focus();
                        }, 0);
                    }, 0);
                };
                // focusing it
                field.focus();
            }, 0);
        }
        catch (error) { }
    };
    ClockPickerComponent.prototype.onFocusInput = function () {
        if (this.openOnFocus && !this.isOpen) {
            this.openBtnClicked();
        }
    };
    ClockPickerComponent.prototype.openBtnClicked = function () {
        this.isOpen = true;
        this.showClock = true;
        this.showHours = true;
        this.checkDraw();
        if (this.isMobile) {
            this.hideKeyboard();
        }
        this._handleOutsideClick();
        this._cdRef.markForCheck();
    };
    ClockPickerComponent.prototype._handleOutsideClick = function () {
        var _this = this;
        var pickerHolder = this.elem.nativeElement.querySelector('.picker__holder');
        this.documentClickFun = this.renderer.listen(pickerHolder, 'click', function (event) {
            var wrapper = _this.elem.nativeElement.querySelector('.picker__wrap');
            if (_this.isOpen && !wrapper.contains(event.target)) {
                _this.close();
            }
        });
    };
    ClockPickerComponent.prototype.closeBtnClicked = function () {
        this.isOpen = false;
        var h = this.selectedHours.h;
        var m = this.selectedHours.m;
        var ampm = this.selectedHours.ampm;
        if (this.twelvehour) {
            this.endHours = h + ':' + m + ampm;
        }
        else {
            this.endHours = h + ':' + m;
        }
        this.onChangeCb(this.endHours);
        this.onTouchedCb();
        this.timeChanged.emit(this.endHours);
        this.showClock = false;
        if (this.documentClickFun) {
            this.documentClickFun();
        }
        this._cdRef.markForCheck();
    };
    ClockPickerComponent.prototype.close = function () {
        this.isOpen = false;
        this.showClock = false;
        this.onTouchedCb();
        if (this.documentClickFun) {
            this.documentClickFun();
        }
        this._cdRef.markForCheck();
    };
    ClockPickerComponent.prototype.clearTimeInput = function () {
        this.selectedHours = { h: '12', m: '00', ampm: 'AM' };
        this.endHours = '';
        this._cdRef.markForCheck();
        this.onChangeCb(this.endHours);
        this.onTouchedCb();
        this.timeChanged.emit(this.endHours);
    };
    ClockPickerComponent.prototype.setHour = function (hour) {
        this.selectedHours.h = hour;
    };
    ClockPickerComponent.prototype.setMinute = function (min) {
        this.selectedHours.m = min;
    };
    ClockPickerComponent.prototype.setAmPm = function (ampm) {
        this.selectedHours.ampm = ampm;
    };
    ClockPickerComponent.prototype.showHoursClock = function () {
        this.showHours = true;
        this.checkDraw();
    };
    ClockPickerComponent.prototype.showMinutesClock = function () {
        this.showHours = false;
        this.checkDraw();
    };
    ClockPickerComponent.prototype.generateTick = function () {
        if (this.twelvehour) {
            for (var i = 1; i < 13; i++) {
                var radian = (i / 6) * Math.PI;
                var radius = this.outerRadius;
                var tick = {
                    hour: i,
                    left: this.dialRadius + Math.sin(radian) * radius - this.tickRadius,
                    top: this.dialRadius - Math.cos(radian) * radius - this.tickRadius,
                };
                this.hoursTicks.push(tick);
            }
        }
        else {
            for (var i = 0; i < 24; i++) {
                var radian = (i / 6) * Math.PI;
                var inner = i > 0 && i < 13;
                var radius = inner ? this.innerRadius : this.outerRadius;
                var h = void 0;
                if (i === 0) {
                    h = '0' + i.toString();
                }
                else {
                    h = i;
                }
                var tick = {
                    hour: h,
                    left: this.dialRadius + Math.sin(radian) * radius - this.tickRadius,
                    top: this.dialRadius - Math.cos(radian) * radius - this.tickRadius,
                };
                this.hoursTicks.push(tick);
            }
        }
        for (var i = 0; i < 60; i += 5) {
            var radian = (i / 30) * Math.PI;
            var min = i.toString();
            if (i < 10) {
                min = '0' + i.toString();
            }
            var tick = {
                min: min,
                left: this.dialRadius + Math.sin(radian) * this.outerRadius - this.tickRadius,
                top: this.dialRadius - Math.cos(radian) * this.outerRadius - this.tickRadius,
            };
            this.minutesTicks.push(tick);
        }
    };
    ClockPickerComponent.prototype.setHand = function (x, y, roundBy5) {
        var radian = Math.atan2(x, -y);
        var isHours = this.showHours;
        var unit = Math.PI / (isHours || roundBy5 ? 6 : 30);
        var z = Math.sqrt(x * x + y * y);
        var inner = isHours && z < (this.outerRadius + this.innerRadius) / 2;
        var radius = inner ? this.innerRadius : this.outerRadius;
        var value;
        if (this.showHours) {
            value = parseInt(this.selectedHours.h, 0);
        }
        else {
            value = parseInt(this.selectedHours.m, 0);
        }
        if (this.twelvehour) {
            radius = this.outerRadius;
        }
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        value = Math.round(radian / unit);
        radian = value * unit;
        if (this.twelvehour) {
            if (isHours) {
                if (value === 0) {
                    value = 12;
                }
            }
            else {
                if (roundBy5) {
                    value *= 5;
                }
                if (value === 60) {
                    value = 0;
                }
            }
        }
        else {
            if (isHours) {
                value = !inner ? value + 12 : value;
                value = value === 24 ? 0 : value;
                value = inner && value === 0 ? 12 : value;
                value = !inner && value === 12 ? 0 : value;
            }
            else {
                if (roundBy5) {
                    value *= 5;
                }
                if (value === 60) {
                    value = 0;
                }
            }
        }
        if (isHours) {
            this.fg.nativeElement.setAttribute('class', 'clockpicker-canvas-fg');
        }
        else {
            if (value % 5 === 0) {
                this.fg.nativeElement.setAttribute('class', 'clockpicker-canvas-fg');
            }
            else {
                this.fg.nativeElement.setAttribute('class', 'clockpicker-canvas-fg active');
            }
        }
        var cx1 = Math.sin(radian) * (radius - this.tickRadius), cy1 = -Math.cos(radian) * (radius - this.tickRadius), cx2 = Math.sin(radian) * radius, cy2 = -Math.cos(radian) * radius;
        this.hand.nativeElement.setAttribute('x2', cx1);
        this.hand.nativeElement.setAttribute('y2', cy1);
        this.bg.nativeElement.setAttribute('cx', cx2);
        this.bg.nativeElement.setAttribute('cy', cy2);
        this.fg.nativeElement.setAttribute('cx', cx2);
        this.fg.nativeElement.setAttribute('cy', cy2);
        if (this.showHours) {
            if (value < 10) {
                this.setHour('0' + value.toString());
            }
            else {
                this.setHour(value.toString());
            }
        }
        else {
            if (value < 10) {
                this.setMinute('0' + value.toString());
            }
            else {
                this.setMinute(value.toString());
            }
        }
        this._cdRef.markForCheck();
    };
    ClockPickerComponent.prototype.offset = function (obj) {
        var left = 0, top = 0;
        if (obj.offsetParent) {
            do {
                left += obj.offsetLeft;
                top += obj.offsetTop;
            } while ((obj = obj.offsetParent));
        }
        return { left: left, top: top };
    };
    ClockPickerComponent.prototype._getFormattedTime = function (value) {
        var timeArr = value.split(':');
        var minutesVal = timeArr[1];
        var h = timeArr[0];
        var m = minutesVal.slice(0, 2);
        var ampm = minutesVal.length > 2 ? minutesVal.slice(-2) : '';
        return { h: h, m: m, ampm: ampm };
    };
    ClockPickerComponent.prototype.writeValue = function (value) {
        if (value) {
            this.showHours = true;
            var time = this._getFormattedTime(value);
            this.setHour(time.h);
            this.setMinute(time.m);
            this.setAmPm(time.ampm);
            this.endHours = value;
        }
        else {
            this.clearTimeInput();
        }
        this._cdRef.markForCheck();
    };
    ClockPickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCb = fn;
    };
    ClockPickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCb = fn;
    };
    ClockPickerComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    __decorate([
        ViewChild('hoursPlate', { static: true }),
        __metadata("design:type", ElementRef)
    ], ClockPickerComponent.prototype, "hoursPlate", void 0);
    __decorate([
        ViewChild('minutesPlate', { static: true }),
        __metadata("design:type", ElementRef)
    ], ClockPickerComponent.prototype, "minutesPlate", void 0);
    __decorate([
        ViewChild('plate', { static: true }),
        __metadata("design:type", ElementRef)
    ], ClockPickerComponent.prototype, "plate", void 0);
    __decorate([
        ViewChild('svg', { static: true }),
        __metadata("design:type", ElementRef)
    ], ClockPickerComponent.prototype, "svg", void 0);
    __decorate([
        ViewChild('g', { static: true }),
        __metadata("design:type", ElementRef)
    ], ClockPickerComponent.prototype, "g", void 0);
    __decorate([
        ViewChild('hand', { static: true }),
        __metadata("design:type", ElementRef)
    ], ClockPickerComponent.prototype, "hand", void 0);
    __decorate([
        ViewChild('fg', { static: true }),
        __metadata("design:type", ElementRef)
    ], ClockPickerComponent.prototype, "fg", void 0);
    __decorate([
        ViewChild('bg', { static: true }),
        __metadata("design:type", ElementRef)
    ], ClockPickerComponent.prototype, "bg", void 0);
    __decorate([
        ViewChild('bearing', { static: true }),
        __metadata("design:type", ElementRef)
    ], ClockPickerComponent.prototype, "bearing", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ClockPickerComponent.prototype, "twelvehour", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ClockPickerComponent.prototype, "darktheme", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ClockPickerComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ClockPickerComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ClockPickerComponent.prototype, "duration", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ClockPickerComponent.prototype, "showClock", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ClockPickerComponent.prototype, "buttonLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ClockPickerComponent.prototype, "buttonClear", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ClockPickerComponent.prototype, "buttonClose", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ClockPickerComponent.prototype, "buttonClearLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ClockPickerComponent.prototype, "buttonCloseLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ClockPickerComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ClockPickerComponent.prototype, "tabIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ClockPickerComponent.prototype, "outlineInput", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ClockPickerComponent.prototype, "openOnFocus", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ClockPickerComponent.prototype, "readonly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ClockPickerComponent.prototype, "ampmClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ClockPickerComponent.prototype, "footerClass", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ClockPickerComponent.prototype, "timeChanged", void 0);
    __decorate([
        HostListener('touchmove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ClockPickerComponent.prototype, "ontouchmove", null);
    ClockPickerComponent = __decorate([
        Component({
            selector: 'mdb-time-picker',
            template: "<div class=\"tp\">\n  <div class=\"md-form\" [ngClass]=\"{ 'md-outline': outlineInput }\">\n    <input\n      (focus)=\"onFocusInput()\"\n      [disabled]=\"disabled\"\n      [tabindex]=\"tabIndex\"\n      [placeholder]=\"placeholder\"\n      [value]=\"endHours\"\n      type=\"text\"\n      class=\"form-control timepicker\"\n      (mousedown)=\"openBtnClicked()\"\n      [(ngModel)]=\"endHours\"\n      [readonly]=\"readonly\"\n    />\n    <label class=\"active\">{{ label }}</label>\n  </div>\n  <div\n    class=\"clockpicker picker\"\n    [hidden]=\"!showClock\"\n    [ngClass]=\"{ 'picker--opened': showClock, darktheme: darktheme }\"\n  >\n    <div class=\"picker__holder\">\n      <div class=\"picker__frame\">\n        <div class=\"picker__wrap\">\n          <div class=\"picker__box\">\n            <div class=\"picker__date-display\">\n              <div class=\"clockpicker-display\">\n                <div class=\"clockpicker-display-column\">\n                  <span\n                    class=\"clockpicker-span-hours text-primary\"\n                    [ngClass]=\"{ 'text-primary': showHours }\"\n                    (click)=\"showHoursClock()\"\n                  >\n                    {{ selectedHours.h }}</span\n                  >:<span\n                    class=\"clockpicker-span-minutes\"\n                    [ngClass]=\"{ 'text-primary': !showHours }\"\n                    (click)=\"showMinutesClock()\"\n                    >{{ selectedHours.m }}</span\n                  >\n                </div>\n                <div\n                  class=\"clockpicker-display-column clockpicker-display-am-pm\"\n                  *ngIf=\"twelvehour\"\n                >\n                  <div class=\"clockpicker-span-am-pm\">{{ selectedHours.ampm }}</div>\n                </div>\n              </div>\n            </div>\n            <div class=\"picker__calendar-container\">\n              <div class=\"clockpicker-plate\" #plate>\n                <div class=\"clockpicker-canvas\">\n                  <svg class=\"clockpicker-svg\" width=\"270\" height=\"270\" #svg>\n                    <g transform=\"translate(135,135)\" #g>\n                      <line\n                        x1=\"0\"\n                        y1=\"0\"\n                        x2=\"77.94228634059948\"\n                        y2=\"-45.00000000000001\"\n                        #hand\n                      ></line>\n                      <circle\n                        class=\"clockpicker-canvas-fg\"\n                        r=\"5\"\n                        cx=\"95.26279441628824\"\n                        cy=\"-55.000000000000014\"\n                        #fg\n                      ></circle>\n                      <circle\n                        class=\"clockpicker-canvas-bg\"\n                        r=\"20\"\n                        cx=\"95.26279441628824\"\n                        cy=\"-55.000000000000014\"\n                        #bg\n                      ></circle>\n                      <circle\n                        class=\"clockpicker-canvas-bearing\"\n                        cx=\"0\"\n                        cy=\"0\"\n                        r=\"2\"\n                        #bearing\n                      ></circle>\n                    </g>\n                  </svg>\n                </div>\n                <div\n                  class=\"clockpicker-dial clockpicker-hours\"\n                  #hoursPlate\n                  [ngClass]=\"{ 'clockpicker-dial-out': !showHours }\"\n                  [ngStyle]=\"{ visibility: !showHours ? 'hidden' : 'visible' }\"\n                >\n                  <div\n                    *ngFor=\"let tick of hoursTicks\"\n                    class=\"clockpicker-tick\"\n                    style=\"font-size: 140%;\"\n                    [ngStyle]=\"{ left: tick.left + 'px', top: tick.top + 'px' }\"\n                    id=\"{{ tick.hour }}\"\n                  >\n                    {{ tick.hour }}\n                  </div>\n                </div>\n                <div\n                  class=\"clockpicker-dial clockpicker-minutes\"\n                  #minutesPlate\n                  [ngClass]=\"{ 'clockpicker-dial-out': showHours }\"\n                  [ngStyle]=\"{ visibility: showHours ? 'hidden' : 'visible' }\"\n                >\n                  <div\n                    *ngFor=\"let tick of minutesTicks\"\n                    class=\"clockpicker-tick\"\n                    style=\"font-size: 120%;\"\n                    [ngStyle]=\"{ left: tick.left + 'px', top: tick.top + 'px' }\"\n                  >\n                    {{ tick.min }}\n                  </div>\n                </div>\n              </div>\n              <div class=\"clockpicker-am-pm-block\" [ngClass]=\"ampmClass\" *ngIf=\"twelvehour\">\n                <button\n                  type=\"button\"\n                  mdbBtn\n                  floating=\"true\"\n                  flat=\"true\"\n                  mdbWavesEffect\n                  class=\"clockpicker-button am-button\"\n                  [ngClass]=\"{ active: selectedHours.ampm == 'AM' }\"\n                  (click)=\"setAmPm('AM')\"\n                >\n                  AM\n                </button>\n\n                <button\n                  type=\"button\"\n                  mdbBtn\n                  floating=\"true\"\n                  flat=\"true\"\n                  mdbWavesEffect\n                  class=\"clockpicker-button pm-button white-text\"\n                  [ngClass]=\"{ active: selectedHours.ampm == 'PM' }\"\n                  (click)=\"setAmPm('PM')\"\n                >\n                  PM\n                </button>\n              </div>\n            </div>\n            <div class=\"picker__footer\" [ngClass]=\"footerClass\">\n              <button\n                type=\"button\"\n                *ngIf=\"buttonLabel\"\n                mdbBtn\n                flat=\"true\"\n                mdbWavesEffect\n                class=\"clockpicker-button\"\n                (click)=\"closeBtnClicked()\"\n              >\n                {{ buttonLabel }}\n              </button>\n              <button\n                *ngIf=\"buttonClear\"\n                type=\"button\"\n                mdbBtn\n                flat=\"true\"\n                mdbWavesEffect\n                class=\"clockpicker-button\"\n                (click)=\"clearTimeInput(); close()\"\n              >\n                {{ buttonClearLabel }}\n              </button>\n              <button\n                *ngIf=\"buttonClose\"\n                type=\"button\"\n                mdbBtn\n                flat=\"true\"\n                mdbWavesEffect\n                class=\"clockpicker-button\"\n                (click)=\"close()\"\n              >\n                {{ buttonCloseLabel }}\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [TIME_PIRCKER_VALUE_ACCESSOT],
            styles: [".picker__input{cursor:default}.picker__input.picker__input--active{border-color:#0089ec}.picker{font-size:1rem;text-align:center;line-height:1.2;color:#000;position:absolute;z-index:10000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none/*!\n   * Default mobile-first, responsive styling for pickadate.js\n   * Demo: http://amsul.github.io/pickadate.js\n   */}.picker .picker__holder{width:100%;overflow-scrolling:touch;position:fixed;transition:background .15s ease-out,top .15s;-webkit-backface-visibility:hidden;backface-visibility:hidden;overflow-y:visible}.picker .picker__frame,.picker .picker__holder{bottom:0;left:0;right:0;top:100%}.picker .picker__frame{position:absolute;margin:0 auto;min-width:16rem;max-width:20.3125rem;width:18.75rem;max-height:21.875rem;opacity:0;transition:.15s ease-out}@media (min-height:40.125em){.picker .picker__frame{margin-bottom:7.5%}}.picker .picker__frame .picker__wrap{display:table;width:100%;height:100%}.picker .picker__box{background:#fff;display:table-cell;vertical-align:middle}@media (min-height:28.875em){.picker .picker__frame{overflow:visible;top:auto;bottom:-100%;max-height:80%}.picker .picker__frame .picker__wrap{display:block}.picker .picker__box{display:block;border:1px solid #777;border-top-color:#898989;border-bottom-width:0;border-radius:5px 5px 0 0;box-shadow:0 .75rem 2.25rem 1rem rgba(0,0,0,.24)}}.picker--opened .picker__holder{top:0;background:rgba(0,0,0,.32);zoom:1;transition:background .15s ease-out}.picker--opened .picker__frame{top:0;opacity:1}@media (min-height:35.875em){.picker--opened .picker__frame{top:10%;bottom:auto}}.datepicker.picker__input.picker__input--active,.timepicker.picker__input.picker__input--active{border-bottom:1px solid #e3f2fd}.picker__list{list-style:none;padding:.75em 0 4.2em;margin:0}.picker__list-item{border-bottom:1px solid #ddd;border-top:1px solid #ddd;margin-bottom:-1px;position:relative;background-color:#fff;padding:.75em 1.25em}@media (min-height:46.75em){.picker__list-item{padding:.5em 1em}}.picker__list-item:hover{cursor:pointer;background:#b1dcfb;border-color:#0089ec;z-index:10}.picker__list-item--highlighted{border-color:#0089ec;z-index:10}.picker--focused .picker__list-item--highlighted,.picker__list-item--highlighted:hover{cursor:pointer;color:#000;background:#b1dcfb}.picker--focused .picker__list-item--selected,.picker__list-item--selected,.picker__list-item--selected:hover{background:#0089ec;color:#fff;z-index:10}.picker--focused .picker__list-item--disabled,.picker__list-item--disabled,.picker__list-item--disabled:hover{background:#f5f5f5;border-color:#ddd;color:#ddd;cursor:default;z-index:auto}.picker--time .picker__button--clear{display:block;width:80%;margin:1em auto 0;padding:1em 1.25em;background:0 0;border:0;font-weight:500;font-size:.67em;text-align:center;text-transform:uppercase;color:#666}.picker--time .picker__button--clear:focus,.picker--time .picker__button--clear:hover{background:#b1dcfb;border-color:#e20;cursor:pointer;color:#fff;outline:0}.picker--time .picker__button--clear:focus:before,.picker--time .picker__button--clear:hover:before{color:#fff}.picker--time .picker__button--clear:before{top:-.25em;color:#666;font-size:1.25em;font-weight:700}.picker--time .picker__frame{min-width:16rem;max-width:20rem}.picker--time .picker__box{font-size:1em;background:#f2f2f2;padding:0}@media (min-height:40.125em){.picker--time .picker__box{margin-bottom:5em}}/*!\n * ClockPicker v0.0.7 for jQuery (http://weareoutman.github.io/clockpicker/)\n * Copyright 2014 Wang Shenwei.\n * Licensed under MIT (https://github.com/weareoutman/clockpicker/blob/gh-pages/LICENSE)\n *\n * Further modified\n * Copyright 2015 Ching Yaw Hao.\n *\n * Bootstrap v3.1.1 (http://getbootstrap.com)\n * Copyright 2011-2014 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */.picker__date-display{text-align:center;background-color:#4285f4;color:#fff;padding-bottom:.9375rem;font-weight:300;margin-bottom:1rem}.picker__date-display .clockpicker-display{vertical-align:middle;display:inline-block;margin:auto;height:5.3125rem;font-size:4.375rem;padding:.625rem .625rem 0;color:rgba(255,255,255,.65)}.picker__date-display .clockpicker-display .clockpicker-display-column{float:left}.picker__date-display .clockpicker-display .clockpicker-display-column #click-am.text-primary,.picker__date-display .clockpicker-display .clockpicker-display-column #click-pm.text-primary,.picker__date-display .clockpicker-display .clockpicker-display-column .clockpicker-span-hours.text-primary,.picker__date-display .clockpicker-display .clockpicker-display-column .clockpicker-span-minutes.text-primary{-webkit-animation-name:pulse;animation-name:pulse;color:#fff!important}.picker__date-display .clockpicker-display .clockpicker-display-column #click-am,.picker__date-display .clockpicker-display .clockpicker-display-column #click-pm{cursor:pointer}.picker__date-display .clockpicker-display .clockpicker-display-am-pm{padding-left:.3125rem;vertical-align:bottom;height:5.3125rem}.picker__date-display .clockpicker-display .clockpicker-display-am-pm .clockpicker-span-am-pm{display:inline-block;font-size:1.4375rem;line-height:1.5625rem;color:rgba(255,255,255,.65)}.picker__date-display .clockpicker-display .clockpicker-span-hours,.picker__date-display .clockpicker-display .clockpicker-span-minutes{-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-fill-mode:both;animation-fill-mode:both;transition:color .5s;cursor:pointer}.clockpicker-display{text-align:center;vertical-align:middle;display:inline-block;margin:auto;height:5.3125rem;font-size:4.375rem;padding:.625rem .625rem 0;color:rgba(255,255,255,.65)}.clockpicker-display .clockpicker-display-column{float:left}.clockpicker-display .clockpicker-display-column #click-am.text-primary,.clockpicker-display .clockpicker-display-column #click-pm.text-primary,.clockpicker-display .clockpicker-display-column .clockpicker-span-hours.text-primary,.clockpicker-display .clockpicker-display-column .clockpicker-span-minutes.text-primary{-webkit-animation-name:pulse;animation-name:pulse;color:#fff}.clockpicker-display .clockpicker-display-column #click-am,.clockpicker-display .clockpicker-display-column #click-pm{cursor:pointer}.clockpicker-display .clockpicker-display-am-pm{padding-left:.3125rem;vertical-align:bottom;height:5.3125rem}.clockpicker-display .clockpicker-display-am-pm .clockpicker-span-am-pm{display:inline-block;font-size:1.4375rem;line-height:1.5625rem;color:rgba(255,255,255,.65)}.clockpicker-display .clockpicker-span-hours,.clockpicker-display .clockpicker-span-minutes{-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-fill-mode:both;animation-fill-mode:both;cursor:pointer;transition:color .5s}@-webkit-keyframes pulse{from,to{transform:scale3d(1,1,1)}50%{transform:scale3d(1.1,1.1,1.1)}}@keyframes pulse{from,to{transform:scale3d(1,1,1)}50%{transform:scale3d(1.1,1.1,1.1)}}.clockpicker-moving{cursor:move}.clockpicker-plate{background-color:#eee;border-radius:50%;width:16.875rem;height:16.875rem;overflow:visible;position:relative;margin:1.25rem auto auto;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.clockpicker-plate .clockpicker-canvas,.clockpicker-plate .clockpicker-dial{width:16.875rem;height:16.875rem;position:absolute;left:-1px;top:-1px}.clockpicker-plate .clockpicker-dial{transition:transform 350ms,opacity 350ms}.clockpicker-plate .clockpicker-dial .clockpicker-tick{border-radius:50%;color:#666;line-height:2.5rem;text-align:center;width:2.5rem;height:2.5rem;position:absolute;cursor:pointer;transition:background-color .3s;background-color:rgba(0,150,136,0)}.clockpicker-plate .clockpicker-dial .clockpicker-tick.active,.clockpicker-plate .clockpicker-dial .clockpicker-tick:hover{background-color:rgba(0,150,136,.25)}.clockpicker-plate .clockpicker-minutes{visibility:hidden}.clockpicker-plate .clockpicker-dial-out{opacity:0}.clockpicker-plate .clockpicker-hours.clockpicker-dial-out{transform:scale(1.2,1.2)}.clockpicker-plate .clockpicker-minutes.clockpicker-dial-out{transform:scale(.8,.8)}.clockpicker-canvas{transition:opacity .3s}.clockpicker-canvas line{stroke:rgba(0,150,136,.25);stroke-width:1}.clockpicker-canvas-out{opacity:.25}.clockpicker-canvas-bearing{stroke:none;fill:rgba(0,77,64,.75)}.clockpicker-canvas-fg{stroke:none;fill:rgba(0,77,64,0)}.clockpicker-canvas-fg.active{fill:rgba(0,77,64,.5)}.clockpicker-canvas-bg{stroke:none;fill:rgba(0,150,136,.25)}.clockpicker-canvas-bg-trans{fill:rgba(0,150,136,.25)}.clockpicker-am-pm-block{margin-top:-.625rem;width:100%;height:3.125rem}.clockpicker-am-pm-block .clockpicker-button.am-button{height:2.8125rem;width:2.8125rem;float:left;border:0}.clockpicker-am-pm-block .clockpicker-button.pm-button{height:2.8125rem;width:2.8125rem;float:right;border:0}.btn-floating.btn-flat{color:#fff;padding:0;background:#4285f4}.btn-floating.btn-flat:hover{box-shadow:none}.btn-floating.btn-flat:focus,.btn-floating.btn-flat:hover{background-color:#5a95f5!important}.btn-floating.btn-flat.active{background-color:#0b51c5!important;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)}.picker__footer{width:100%}.picker__footer .clockpicker-button{margin:.9375rem auto auto;background-color:transparent;text-transform:uppercase}.picker__footer .clockpicker-button:focus{background-color:transparent}.picker__footer .clockpicker-button:active{background-color:rgba(0,150,136,.25)}.darktheme .picker__box{background-color:#212121}.darktheme .picker__box .picker__date-display{background-color:transparent}.darktheme .picker__box .picker__date-display .clockpicker-display,.darktheme .picker__box .picker__date-display .clockpicker-display .clockpicker-span-am-pm{color:#fff}.darktheme .picker__box .picker__calendar-container .clockpicker-plate{background-color:transparent}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-tick{color:#fff;background-color:rgba(255,64,129,0)}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-tick.active,.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-tick:hover{background-color:rgba(255,64,129,.25)}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-canvas line{stroke:rgba(255,64,129,.25)}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-canvas-bearing{fill:#fff}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-canvas-fg{fill:rgba(255,64,129,0)}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-canvas-fg.active{fill:rgba(255,64,129,.5)}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-canvas-bg{fill:rgba(255,64,129,.25)}.darktheme .picker__box .picker__calendar-container .clockpicker-plate .clockpicker-canvas-bg-trans{fill:rgba(255,64,129,.5)}.darktheme .picker__box .picker__footer button{color:#fff!important}.darktheme .picker__box .picker__footer .clockpicker-button:active{background-color:rgba(255,64,129,.25)}.hand-move .clockpicker-tick{cursor:all-scroll!important}.clockpicker-button{cursor:pointer;transition:.3s}.clockpicker-button:hover{background-color:rgba(0,150,136,.25)}.darktheme .clockpicker-button:hover{background-color:rgba(255,64,129,.25)}.validate-success.ng-valid .timepicker{border-bottom:1px solid #00c851!important;box-shadow:0 1px 0 0 #00c851!important}.validate-success.ng-valid .md-outline .timepicker{border:1px solid #00c851!important;box-shadow:inset 0 0 0 1px #00c851!important}.validate-success.ng-valid .tp label{color:#00c851!important}.validate-success.ng-valid .tp .md-outline label{color:inherit!important;font-weight:400!important}.form-submitted .validate-error.ng-invalid .timepicker,.validate-error.ng-invalid.ng-touched .timepicker{border-bottom:1px solid #f44336!important;box-shadow:0 1px 0 0 #f44336!important}.form-submitted .validate-error.ng-invalid .md-outline .timepicker,.validate-error.ng-invalid.ng-touched .md-outline .timepicker{border:1px solid #f44336!important;box-shadow:inset 0 0 0 1px #f44336!important}.form-submitted .validate-error.ng-invalid .tp label,.validate-error.ng-invalid.ng-touched .tp label{color:#f44336!important}.form-submitted .validate-error.ng-invalid .tp .md-outline label,.validate-error.ng-invalid.ng-touched .tp .md-outline label{color:inherit!important;font-weight:400!important}.md-outline input:focus>label.active{color:#4285f4}.md-outline .timepicker{height:36px!important}.clockpicker-button.am-button,.clockpicker-button.pm-button{color:#fff!important}"]
        }),
        __param(4, Inject(DOCUMENT)),
        __param(5, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [ElementRef,
            Renderer2,
            ChangeDetectorRef,
            NgZone, Object, String])
    ], ClockPickerComponent);
    return ClockPickerComponent;
}());
export { ClockPickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL3RpbWUtcGlja2VyL3RpbWVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLGFBQWEsRUFDYixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU5RCxNQUFNLENBQUMsSUFBTSwyQkFBMkIsR0FBUTtJQUM5QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLGtEQUFrRDtJQUNsRCxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxvQkFBb0IsRUFBcEIsQ0FBb0IsQ0FBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFVRjtJQTRERSw4QkFDUyxJQUFnQixFQUNoQixRQUFtQixFQUNsQixNQUF5QixFQUN6QixPQUFlLEVBQ0csU0FBYyxFQUNuQixVQUFrQjtRQU56QyxpQkFzQkM7UUFyQlEsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3pCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDRyxjQUFTLEdBQVQsU0FBUyxDQUFLO1FBcERqQyxlQUFVLEdBQUcsS0FBSyxD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Q25CO1FBQVIsS0FBSyxFQUFFOzs2REFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7O2tFQUE0QjtJQUMzQjtRQUFSLEtBQUssRUFBRTs7a0VBQTRCO0lBQzNCO1FBQVIsS0FBSyxFQUFFOzswREFBa0I7SUFDakI7UUFBUixLQUFLLEVBQUU7OzBEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7OzhEQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTs7NkRBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFOzswREFBa0I7SUFDakI7UUFBUixLQUFLLEVBQUU7OzJEQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFOzs2REFBa0I7SUFDaEI7UUFBVCxNQUFNLEVBQUU7a0NBQWMsWUFBWTs2REFBc0M7SUFxRGxDO1FBQXRDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OzsyREFFckM7SUF0RlUsb0JBQW9CO1FBUmhDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsbTBOQUEwQztZQUUxQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUMvQyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQzs7U0FDekMsQ0FBQztRQWtFRyxXQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNoQixXQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTt5Q0FMUCxVQUFVO1lBQ04sU0FBUztZQUNWLGlCQUFpQjtZQUNoQixNQUFNO09BaEVkLG9CQUFvQixDQTRnQmhDO0lBQUQsMkJBQUM7Q0FBQSxBQTVnQkQsSUE0Z0JDO1NBNWdCWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyQ29udGVudENoZWNrZWQsXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgZm9yd2FyZFJlZixcclxuICBJbmplY3QsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBQTEFURk9STV9JRCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIE5nWm9uZSxcclxuICBIb3N0TGlzdGVuZXIsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIsIERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmV4cG9ydCBjb25zdCBUSU1FX1BJUkNLRVJfVkFMVUVfQUNDRVNTT1Q6IGFueSA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVzZS1iZWZvcmUtZGVjbGFyZVxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENsb2NrUGlja2VyQ29tcG9uZW50KSxcclxuICBtdWx0aTogdHJ1ZSxcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWRiLXRpbWUtcGlja2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdGltZXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGltZS1waWNrZXItbW9kdWxlLnNjc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHByb3ZpZGVyczogW1RJTUVfUElSQ0tFUl9WQUxVRV9BQ0NFU1NPVF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDbG9ja1BpY2tlckNvbXBvbmVudFxyXG4gIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XHJcbiAgQFZpZXdDaGlsZCgnaG91cnNQbGF0ZScsIHsgc3RhdGljOiB0cnVlIH0pIHB1YmxpYyBob3Vyc1BsYXRlOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ21pbnV0ZXNQbGF0ZScsIHsgc3RhdGljOiB0cnVlIH0pIHB1YmxpYyBtaW51dGVzUGxhdGU6IEVsZW1lbnRSZWY7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ3BsYXRlJywgeyBzdGF0aWM6IHRydWUgfSkgcHVibGljIHBsYXRlOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ3N2ZycsIHsgc3RhdGljOiB0cnVlIH0pIHB1YmxpYyBzdmc6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnZycsIHsgc3RhdGljOiB0cnVlIH0pIHB1YmxpYyBnOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2hhbmQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwdWJsaWMgaGFuZDogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdmZycsIHsgc3RhdGljOiB0cnVlIH0pIHB1YmxpYyBmZzogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdiZycsIHsgc3RhdGljOiB0cnVlIH0pIHB1YmxpYyBiZzogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdiZWFyaW5nJywgeyBzdGF0aWM6IHRydWUgfSkgcHVibGljIGJlYXJpbmc6IEVsZW1lbnRSZWY7XHJcblxyXG4gIEBJbnB1dCgpIHR3ZWx2ZWhvdXIgPSBmYWxzZTtcclxuICBASW5wdXQoKSBkYXJrdGhlbWUgPSBmYWxzZTtcclxuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogU3RyaW5nID0gJyc7XHJcbiAgQElucHV0KCkgbGFiZWwgPSAnJztcclxuICBASW5wdXQoKSBkdXJhdGlvbiA9IDMwMDtcclxuICBASW5wdXQoKSBzaG93Q2xvY2sgPSBmYWxzZTtcclxuICBASW5wdXQoKSBidXR0b25MYWJlbCA9ICdEb25lJztcclxuICBASW5wdXQoKSBidXR0b25DbGVhciA9IHRydWU7XHJcbiAgQElucHV0KCkgYnV0dG9uQ2xvc2UgPSBmYWxzZTtcclxuICBASW5wdXQoKSBidXR0b25DbGVhckxhYmVsID0gJ0NsZWFyJztcclxuICBASW5wdXQoKSBidXR0b25DbG9zZUxhYmVsID0gJ0Nsb3NlJztcclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHRhYkluZGV4OiBhbnk7XHJcbiAgQElucHV0KCkgb3V0bGluZUlucHV0ID0gZmFsc2U7XHJcbiAgQElucHV0KCkgb3Blbk9uRm9jdXMgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHJlYWRvbmx5ID0gZmFsc2U7XHJcbiAgQElucHV0KCkgYW1wbUNsYXNzID0gJyc7XHJcbiAgQElucHV0KCkgZm9vdGVyQ2xhc3MgPSAnJztcclxuICBAT3V0cHV0KCkgdGltZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgaXNPcGVuID0gZmFsc2U7XHJcbiAgaXNNb2JpbGU6IGFueSA9IG51bGw7XHJcbiAgdG91Y2hEZXZpY2UgPSAnb250b3VjaHN0YXJ0JyBpbiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IGFzIGFueSk7XHJcbiAgc2hvd0hvdXJzID0gZmFsc2U7XHJcbiAgbW92ZUV2ZW50OiBzdHJpbmc7XHJcbiAgdGFwRXZlbnQ6IHN0cmluZztcclxuXHJcbiAgcHVibGljIGVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY2xvY2twaWNrZXInKTtcclxuICBwdWJsaWMgZWxlbWVudE51bWJlcjogYW55O1xyXG5cclxuICBkaWFsUmFkaXVzID0gMTM1O1xyXG4gIG91dGVyUmFkaXVzID0gMTEwO1xyXG4gIGlubmVyUmFkaXVzID0gODA7XHJcbiAgdGlja1JhZGl1cyA9IDIwO1xyXG4gIGRpYW1ldGVyID0gdGhpcy5kaWFsUmFkaXVzICogMjtcclxuICBpc0Jyb3dzZXI6IGFueSA9IGZhbHNlO1xyXG5cclxuICBob3Vyc1RpY2tzOiBhbnkgPSBbXTtcclxuICBtaW51dGVzVGlja3M6IGFueSA9IFtdO1xyXG4gIHNlbGVjdGVkSG91cnM6IGFueSA9IHsgaDogJzEyJywgbTogJzAwJywgYW1wbTogJ0FNJyB9O1xyXG4gIGVuZEhvdXJzID0gJyc7XHJcblxyXG4gIHRvdWNoU3VwcG9ydGVkOiBhbnkgPSAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3c7XHJcbiAgbW91c2Vkb3duRXZlbnQ6IGFueSA9ICdtb3VzZWRvd24nICsgKHRoaXMudG91Y2hTdXBwb3J0ZWQgPyAnIHRvdWNoc3RhcnQnIDogJycpO1xyXG4gIG1vdXNlbW92ZUV2ZW50OiBhbnkgPSAnbW91c2Vtb3ZlJyArICh0aGlzLnRvdWNoU3VwcG9ydGVkID8gJyB0b3VjaG1vdmUnIDogJycpO1xyXG4gIG1vdXNldXBFdmVudDogYW55ID0gJ21vdXNldXAnICsgKHRoaXMudG91Y2hTdXBwb3J0ZWQgPyAnIHRvdWNoZW5kJyA6ICcnKTtcclxuICBpc01vdXNlRG93biA9IGZhbHNlO1xyXG4gIGRvY3VtZW50Q2xpY2tGdW46IEZ1bmN0aW9uO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGVsZW06IEVsZW1lbnRSZWYsXHJcbiAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxyXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcclxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IHN0cmluZ1xyXG4gICkge1xyXG4gICAgdGhpcy5pc0Jyb3dzZXIgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKTtcclxuICAgIHJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCwgJ2NsaWNrJywgKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuc2hvd0Nsb2NrICYmXHJcbiAgICAgICAgZXZlbnQudGFyZ2V0ICYmXHJcbiAgICAgICAgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQgIT09IGV2ZW50LnRhcmdldCAmJlxyXG4gICAgICAgICF0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMuc2hvd0Nsb2NrID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BpY2tlcl9faG9sZGVyJykpIHtcclxuICAgICAgICB0aGlzLnNob3dDbG9jayA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3RvdWNobW92ZScsIFsnJGV2ZW50J10pIG9udG91Y2htb3ZlKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMubW91c2Vkb3duKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5nZW5lcmF0ZVRpY2soKTtcclxuICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xyXG4gICAgICB0aGlzLmlzTW9iaWxlID0gL2lQaG9uZXxpUGFkfGlQb2R8QW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pc09wZW4gPSB0aGlzLnNob3dDbG9jaztcclxuICAgIHRoaXMuX2hhbmRsZU91dHNpZGVDbGljaygpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgWydtb3VzZWRvd24nLCAnbW91c2V1cCddLmZvckVhY2goKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oXHJcbiAgICAgICAgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNsb2NrcGlja2VyLXBsYXRlJyksXHJcbiAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgKGV2OiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmIChldmVudCA9PT0gJ21vdXNlZG93bicpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZWRvd24oZXYsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5pc01vdXNlRG93biA9IHRydWU7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmlzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XHJcbiAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcclxuICAgICAgLy8gRml4IGZvciB2aXNpYmxlIGRhdGUgLyB0aW1lIHBpY2tlciBpbnB1dCB3aGVuIHBpY2tlciBwbGF0ZSBpcyB2aXNpYmxlLlxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IG9wZW5lZFBpY2tlcjogYW55ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBpY2tlci0tb3BlbmVkJyk7XHJcbiAgICAgICAgY29uc3QgYWxsUGlja2VyczogYW55ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBpY2tlcicpO1xyXG4gICAgICAgIGFsbFBpY2tlcnMuZm9yRWFjaCgoZWxlbWVudDogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGVsZW1lbnQsICd6LWluZGV4JywgJzAnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKG9wZW5lZFBpY2tlciwgJ3otaW5kZXgnLCAnMTAwMCcpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge31cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoZWNrRHJhdygpIHtcclxuICAgIGxldCB2YWx1ZTtcclxuICAgIGNvbnN0IGlzSG91cnMgPSB0aGlzLnNob3dIb3VycztcclxuICAgIGlmIChpc0hvdXJzKSB7XHJcbiAgICAgIHZhbHVlID0gcGFyc2VJbnQodGhpcy5zZWxlY3RlZEhvdXJzLmgsIDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsdWUgPSBwYXJzZUludCh0aGlzLnNlbGVjdGVkSG91cnMubSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdW5pdCA9IE1hdGguUEkgLyAoaXNIb3VycyA/IDYgOiAzMCksXHJcbiAgICAgIHJhZGlhbiA9IHZhbHVlICogdW5pdCxcclxuICAgICAgcmFkaXVzID0gaXNIb3VycyAmJiB2YWx1ZSA+IDAgJiYgdmFsdWUgPCAxMyA/IHRoaXMuaW5uZXJSYWRpdXMgOiB0aGlzLm91dGVyUmFkaXVzLFxyXG4gICAgICB4ZCA9IE1hdGguc2luKHJhZGlhbikgKiByYWRpdXMsXHJcbiAgICAgIHlkID0gLU1hdGguY29zKHJhZGlhbikgKiByYWRpdXM7XHJcbiAgICB0aGlzLnNldEhhbmQoeGQsIHlkLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBtb3VzZWRvd24oZTogYW55LCBzcGFjZT86IGFueSkge1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5wbGF0ZS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICBpc1RvdWNoID0gL150b3VjaC8udGVzdChlLnR5cGUpLFxyXG4gICAgICB4MCA9IG9mZnNldC5sZWZ0ICsgdGhpcy5kaWFsUmFkaXVzLFxyXG4gICAgICB5MCA9IG9mZnNldC50b3AgKyB0aGlzLmRpYWxSYWRpdXMsXHJcbiAgICAgIGR4ID0gKGlzVG91Y2ggPyBlLnRvdWNoZXNbMF0gOiBlKS5jbGllbnRYIC0geDAsXHJcbiAgICAgIGR5ID0gKGlzVG91Y2ggPyBlLnRvdWNoZXNbMF0gOiBlKS5jbGllbnRZIC0geTAsXHJcbiAgICAgIHogPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG4gICAgbGV0IG1vdmVkID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBzcGFjZSAmJlxyXG4gICAgICAoeiA8IHRoaXMub3V0ZXJSYWRpdXMgLSB0aGlzLnRpY2tSYWRpdXMgfHwgeiA+IHRoaXMub3V0ZXJSYWRpdXMgKyB0aGlzLnRpY2tSYWRpdXMpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICBpZiAodGhpcy5zaG93SG91cnMpIHtcclxuICAgICAgdGhpcy5zZXRIYW5kKGR4LCBkeSwgdHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNldEhhbmQoZHgsIGR5LCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbW91c2Vtb3ZlRXZlbnRNZXRob2QgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgY29uc3QgeCA9IGV2ZW50LmNsaWVudFggLSB4MCxcclxuICAgICAgICB5ID0gZXZlbnQuY2xpZW50WSAtIHkwO1xyXG4gICAgICBpZiAoIW1vdmVkICYmIHggPT09IGR4ICYmIHkgPT09IGR5KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIG1vdmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0SGFuZCh4LCB5LCBmYWxzZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBtb3VzZXVwRXZlbnRNZXRob2QgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLl9kb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMubW91c2Vtb3ZlRXZlbnQsIG1vdXNlbW92ZUV2ZW50TWV0aG9kKTtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zdCB4ID0gZXZlbnQuY2xpZW50WCAtIHgwLFxyXG4gICAgICAgIHkgPSBldmVudC5jbGllbnRYIC0geTA7XHJcbiAgICAgIGlmICgoc3BhY2UgfHwgbW92ZWQpICYmIHggPT09IGR4ICYmIHkgPT09IGR5KSB7XHJcbiAgICAgICAgdGhpcy5zZXRIYW5kKHgsIHksIGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNob3dNaW51dGVzQ2xvY2soKTtcclxuICAgICAgdGhpcy5fZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLm1vdXNldXBFdmVudCwgbW91c2V1cEV2ZW50TWV0aG9kKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5fZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLm1vdXNlbW92ZUV2ZW50LCBtb3VzZW1vdmVFdmVudE1ldGhvZCk7XHJcbiAgICAgIHRoaXMuX2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodGhpcy5tb3VzZXVwRXZlbnQsIG1vdXNldXBFdmVudE1ldGhvZCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGhpZGVLZXlib2FyZCgpIHtcclxuICAgIC8vIHRoaXMgc2V0IHRpbWVvdXQgbmVlZGVkIGZvciBjYXNlIHdoZW4gaGlkZUtleWJvcmFkXHJcbiAgICAvLyBpcyBjYWxsZWQgaW5zaWRlIG9mICdvbmZvY3VzJyBldmVudCBoYW5kbGVyXHJcbiAgICB0cnkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAvLyBjcmVhdGluZyB0ZW1wIGZpZWxkXHJcbiAgICAgICAgY29uc3QgZmllbGQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCwgZmllbGQpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0UmVmZXJlbmNlID0gdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShpbnB1dFJlZmVyZW5jZSwgJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGlucHV0UmVmZXJlbmNlLCAndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShpbnB1dFJlZmVyZW5jZSwgJ29wYWNpdHknLCAnMCcpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoaW5wdXRSZWZlcmVuY2UsICctd2Via2l0LXVzZXItbW9kaWZ5JywgJ3JlYWQtd3JpdGUtcGxhaW50ZXh0LW9ubHknKTtcclxuICAgICAgICAvLyAvLyBoaWRpbmcgdGVtcCBmaWVsZCBmcm9tIHBlb3BsZXMgZXllc1xyXG4gICAgICAgIC8vIC8vIC13ZWJraXQtdXNlci1tb2RpZnkgaXMgbmVzc2VzYXJ5IGZvciBBbmRyb2lkIDQueFxyXG4gICAgICAgIC8vIGFkZGluZyBvbmZvY3VzIGV2ZW50IGhhbmRsZXIgZm9yIG91dCB0ZW1wIGZpZWxkXHJcbiAgICAgICAgZmllbGQub25mb2N1cyA9ICgpID0+IHtcclxuICAgICAgICAgIC8vIHRoaXMgdGltZW91dCBvZiAyMDBtcyBpcyBuZXNzYXNhcnkgZm9yIEFuZHJvaWQgMi4zLnhcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGZpZWxkLCAnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQsIGZpZWxkKTtcclxuICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBmb2N1c2luZyBpdFxyXG4gICAgICAgIGZpZWxkLmZvY3VzKCk7XHJcbiAgICAgIH0sIDApO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHt9XHJcbiAgfVxyXG5cclxuICBvbkZvY3VzSW5wdXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5vcGVuT25Gb2N1cyAmJiAhdGhpcy5pc09wZW4pIHtcclxuICAgICAgdGhpcy5vcGVuQnRuQ2xpY2tlZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb3BlbkJ0bkNsaWNrZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcbiAgICB0aGlzLnNob3dDbG9jayA9IHRydWU7XHJcbiAgICB0aGlzLnNob3dIb3VycyA9IHRydWU7XHJcbiAgICB0aGlzLmNoZWNrRHJhdygpO1xyXG4gICAgaWYgKHRoaXMuaXNNb2JpbGUpIHtcclxuICAgICAgdGhpcy5oaWRlS2V5Ym9hcmQoKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2hhbmRsZU91dHNpZGVDbGljaygpO1xyXG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9oYW5kbGVPdXRzaWRlQ2xpY2soKSB7XHJcbiAgICBjb25zdCBwaWNrZXJIb2xkZXIgPSB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucGlja2VyX19ob2xkZXInKTtcclxuICAgIHRoaXMuZG9jdW1lbnRDbGlja0Z1biA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHBpY2tlckhvbGRlciwgJ2NsaWNrJywgKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5waWNrZXJfX3dyYXAnKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmlzT3BlbiAmJiAhd3JhcHBlci5jb250YWlucyhldmVudC50YXJnZXQpKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNsb3NlQnRuQ2xpY2tlZCgpIHtcclxuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcbiAgICBjb25zdCBoID0gdGhpcy5zZWxlY3RlZEhvdXJzLmg7XHJcbiAgICBjb25zdCBtID0gdGhpcy5zZWxlY3RlZEhvdXJzLm07XHJcbiAgICBjb25zdCBhbXBtID0gdGhpcy5zZWxlY3RlZEhvdXJzLmFtcG07XHJcblxyXG4gICAgaWYgKHRoaXMudHdlbHZlaG91cikge1xyXG4gICAgICB0aGlzLmVuZEhvdXJzID0gaCArICc6JyArIG0gKyBhbXBtO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbmRIb3VycyA9IGggKyAnOicgKyBtO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vbkNoYW5nZUNiKHRoaXMuZW5kSG91cnMpO1xyXG4gICAgdGhpcy5vblRvdWNoZWRDYigpO1xyXG4gICAgdGhpcy50aW1lQ2hhbmdlZC5lbWl0KHRoaXMuZW5kSG91cnMpO1xyXG4gICAgdGhpcy5zaG93Q2xvY2sgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrRnVuKSB7XHJcbiAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0Z1bigpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpIHtcclxuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3dDbG9jayA9IGZhbHNlO1xyXG4gICAgdGhpcy5vblRvdWNoZWRDYigpO1xyXG5cclxuICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tGdW4pIHtcclxuICAgICAgdGhpcy5kb2N1bWVudENsaWNrRnVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBjbGVhclRpbWVJbnB1dCgpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRIb3VycyA9IHsgaDogJzEyJywgbTogJzAwJywgYW1wbTogJ0FNJyB9O1xyXG4gICAgdGhpcy5lbmRIb3VycyA9ICcnO1xyXG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB0aGlzLm9uQ2hhbmdlQ2IodGhpcy5lbmRIb3Vycyk7XHJcbiAgICB0aGlzLm9uVG91Y2hlZENiKCk7XHJcbiAgICB0aGlzLnRpbWVDaGFuZ2VkLmVtaXQodGhpcy5lbmRIb3Vycyk7XHJcbiAgfVxyXG5cclxuICBzZXRIb3VyKGhvdXI6IFN0cmluZykge1xyXG4gICAgdGhpcy5zZWxlY3RlZEhvdXJzLmggPSBob3VyO1xyXG4gIH1cclxuXHJcbiAgc2V0TWludXRlKG1pbjogU3RyaW5nKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkSG91cnMubSA9IG1pbjtcclxuICB9XHJcblxyXG4gIHNldEFtUG0oYW1wbTogU3RyaW5nKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkSG91cnMuYW1wbSA9IGFtcG07XHJcbiAgfVxyXG5cclxuICBzaG93SG91cnNDbG9jaygpIHtcclxuICAgIHRoaXMuc2hvd0hvdXJzID0gdHJ1ZTtcclxuICAgIHRoaXMuY2hlY2tEcmF3KCk7XHJcbiAgfVxyXG5cclxuICBzaG93TWludXRlc0Nsb2NrKCkge1xyXG4gICAgdGhpcy5zaG93SG91cnMgPSBmYWxzZTtcclxuICAgIHRoaXMuY2hlY2tEcmF3KCk7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZVRpY2soKSB7XHJcbiAgICBpZiAodGhpcy50d2VsdmVob3VyKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMTM7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHJhZGlhbiA9IChpIC8gNikgKiBNYXRoLlBJO1xyXG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMub3V0ZXJSYWRpdXM7XHJcblxyXG4gICAgICAgIGNvbnN0IHRpY2sgPSB7XHJcbiAgICAgICAgICBob3VyOiBpLFxyXG4gICAgICAgICAgbGVmdDogdGhpcy5kaWFsUmFkaXVzICsgTWF0aC5zaW4ocmFkaWFuKSAqIHJhZGl1cyAtIHRoaXMudGlja1JhZGl1cyxcclxuICAgICAgICAgIHRvcDogdGhpcy5kaWFsUmFkaXVzIC0gTWF0aC5jb3MocmFkaWFuKSAqIHJhZGl1cyAtIHRoaXMudGlja1JhZGl1cyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaG91cnNUaWNrcy5wdXNoKHRpY2spO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI0OyBpKyspIHtcclxuICAgICAgICBjb25zdCByYWRpYW4gPSAoaSAvIDYpICogTWF0aC5QSTtcclxuICAgICAgICBjb25zdCBpbm5lciA9IGkgPiAwICYmIGkgPCAxMztcclxuICAgICAgICBjb25zdCByYWRpdXMgPSBpbm5lciA/IHRoaXMuaW5uZXJSYWRpdXMgOiB0aGlzLm91dGVyUmFkaXVzO1xyXG4gICAgICAgIGxldCBoO1xyXG5cclxuICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgaCA9ICcwJyArIGkudG9TdHJpbmcoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaCA9IGk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0aWNrID0ge1xyXG4gICAgICAgICAgaG91cjogaCxcclxuICAgICAgICAgIGxlZnQ6IHRoaXMuZGlhbFJhZGl1cyArIE1hdGguc2luKHJhZGlhbikgKiByYWRpdXMgLSB0aGlzLnRpY2tSYWRpdXMsXHJcbiAgICAgICAgICB0b3A6IHRoaXMuZGlhbFJhZGl1cyAtIE1hdGguY29zKHJhZGlhbikgKiByYWRpdXMgLSB0aGlzLnRpY2tSYWRpdXMsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmhvdXJzVGlja3MucHVzaCh0aWNrKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjA7IGkgKz0gNSkge1xyXG4gICAgICBjb25zdCByYWRpYW4gPSAoaSAvIDMwKSAqIE1hdGguUEk7XHJcbiAgICAgIGxldCBtaW4gPSBpLnRvU3RyaW5nKCk7XHJcbiAgICAgIGlmIChpIDwgMTApIHtcclxuICAgICAgICBtaW4gPSAnMCcgKyBpLnRvU3RyaW5nKCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdGljayA9IHtcclxuICAgICAgICBtaW46IG1pbixcclxuICAgICAgICBsZWZ0OiB0aGlzLmRpYWxSYWRpdXMgKyBNYXRoLnNpbihyYWRpYW4pICogdGhpcy5vdXRlclJhZGl1cyAtIHRoaXMudGlja1JhZGl1cyxcclxuICAgICAgICB0b3A6IHRoaXMuZGlhbFJhZGl1cyAtIE1hdGguY29zKHJhZGlhbikgKiB0aGlzLm91dGVyUmFkaXVzIC0gdGhpcy50aWNrUmFkaXVzLFxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLm1pbnV0ZXNUaWNrcy5wdXNoKHRpY2spO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0SGFuZCh4OiBhbnksIHk6IGFueSwgcm91bmRCeTU6IGFueSkge1xyXG4gICAgbGV0IHJhZGlhbiA9IE1hdGguYXRhbjIoeCwgLXkpO1xyXG4gICAgY29uc3QgaXNIb3VycyA9IHRoaXMuc2hvd0hvdXJzO1xyXG4gICAgY29uc3QgdW5pdCA9IE1hdGguUEkgLyAoaXNIb3VycyB8fCByb3VuZEJ5NSA/IDYgOiAzMCk7XHJcbiAgICBjb25zdCB6ID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xyXG4gICAgY29uc3QgaW5uZXIgPSBpc0hvdXJzICYmIHogPCAodGhpcy5vdXRlclJhZGl1cyArIHRoaXMuaW5uZXJSYWRpdXMpIC8gMjtcclxuICAgIGxldCByYWRpdXMgPSBpbm5lciA/IHRoaXMuaW5uZXJSYWRpdXMgOiB0aGlzLm91dGVyUmFkaXVzO1xyXG4gICAgbGV0IHZhbHVlO1xyXG5cclxuICAgIGlmICh0aGlzLnNob3dIb3Vycykge1xyXG4gICAgICB2YWx1ZSA9IHBhcnNlSW50KHRoaXMuc2VsZWN0ZWRIb3Vycy5oLCAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbHVlID0gcGFyc2VJbnQodGhpcy5zZWxlY3RlZEhvdXJzLm0sIDApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnR3ZWx2ZWhvdXIpIHtcclxuICAgICAgcmFkaXVzID0gdGhpcy5vdXRlclJhZGl1cztcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmFkaWFuIDwgMCkge1xyXG4gICAgICByYWRpYW4gPSBNYXRoLlBJICogMiArIHJhZGlhbjtcclxuICAgIH1cclxuXHJcbiAgICB2YWx1ZSA9IE1hdGgucm91bmQocmFkaWFuIC8gdW5pdCk7XHJcbiAgICByYWRpYW4gPSB2YWx1ZSAqIHVuaXQ7XHJcblxyXG4gICAgaWYgKHRoaXMudHdlbHZlaG91cikge1xyXG4gICAgICBpZiAoaXNIb3Vycykge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gMCkge1xyXG4gICAgICAgICAgdmFsdWUgPSAxMjtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHJvdW5kQnk1KSB7XHJcbiAgICAgICAgICB2YWx1ZSAqPSA1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmFsdWUgPT09IDYwKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoaXNIb3Vycykge1xyXG4gICAgICAgIHZhbHVlID0gIWlubmVyID8gdmFsdWUgKyAxMiA6IHZhbHVlO1xyXG4gICAgICAgIHZhbHVlID0gdmFsdWUgPT09IDI0ID8gMCA6IHZhbHVlO1xyXG4gICAgICAgIHZhbHVlID0gaW5uZXIgJiYgdmFsdWUgPT09IDAgPyAxMiA6IHZhbHVlO1xyXG4gICAgICAgIHZhbHVlID0gIWlubmVyICYmIHZhbHVlID09PSAxMiA/IDAgOiB2YWx1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAocm91bmRCeTUpIHtcclxuICAgICAgICAgIHZhbHVlICo9IDU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gNjApIHtcclxuICAgICAgICAgIHZhbHVlID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNIb3Vycykge1xyXG4gICAgICB0aGlzLmZnLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjbG9ja3BpY2tlci1jYW52YXMtZmcnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh2YWx1ZSAlIDUgPT09IDApIHtcclxuICAgICAgICB0aGlzLmZnLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjbG9ja3BpY2tlci1jYW52YXMtZmcnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZnLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjbG9ja3BpY2tlci1jYW52YXMtZmcgYWN0aXZlJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjeDEgPSBNYXRoLnNpbihyYWRpYW4pICogKHJhZGl1cyAtIHRoaXMudGlja1JhZGl1cyksXHJcbiAgICAgIGN5MSA9IC1NYXRoLmNvcyhyYWRpYW4pICogKHJhZGl1cyAtIHRoaXMudGlja1JhZGl1cyksXHJcbiAgICAgIGN4MiA9IE1hdGguc2luKHJhZGlhbikgKiByYWRpdXMsXHJcbiAgICAgIGN5MiA9IC1NYXRoLmNvcyhyYWRpYW4pICogcmFkaXVzO1xyXG5cclxuICAgIHRoaXMuaGFuZC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgneDInLCBjeDEpO1xyXG4gICAgdGhpcy5oYW5kLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd5MicsIGN5MSk7XHJcbiAgICB0aGlzLmJnLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjeCcsIGN4Mik7XHJcbiAgICB0aGlzLmJnLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjeScsIGN5Mik7XHJcbiAgICB0aGlzLmZnLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjeCcsIGN4Mik7XHJcbiAgICB0aGlzLmZnLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjeScsIGN5Mik7XHJcblxyXG4gICAgaWYgKHRoaXMuc2hvd0hvdXJzKSB7XHJcbiAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XHJcbiAgICAgICAgdGhpcy5zZXRIb3VyKCcwJyArIHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2V0SG91cih2YWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHZhbHVlIDwgMTApIHtcclxuICAgICAgICB0aGlzLnNldE1pbnV0ZSgnMCcgKyB2YWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNldE1pbnV0ZSh2YWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgb2Zmc2V0KG9iajogYW55KSB7XHJcbiAgICBsZXQgbGVmdCA9IDAsXHJcbiAgICAgIHRvcCA9IDA7XHJcblxyXG4gICAgaWYgKG9iai5vZmZzZXRQYXJlbnQpIHtcclxuICAgICAgZG8ge1xyXG4gICAgICAgIGxlZnQgKz0gb2JqLm9mZnNldExlZnQ7XHJcbiAgICAgICAgdG9wICs9IG9iai5vZmZzZXRUb3A7XHJcbiAgICAgIH0gd2hpbGUgKChvYmogPSBvYmoub2Zmc2V0UGFyZW50KSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyBsZWZ0LCB0b3AgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldEZvcm1hdHRlZFRpbWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgY29uc3QgdGltZUFyciA9IHZhbHVlLnNwbGl0KCc6Jyk7XHJcbiAgICBjb25zdCBtaW51dGVzVmFsID0gdGltZUFyclsxXTtcclxuXHJcbiAgICBjb25zdCBoID0gdGltZUFyclswXTtcclxuICAgIGNvbnN0IG0gPSBtaW51dGVzVmFsLnNsaWNlKDAsIDIpO1xyXG4gICAgY29uc3QgYW1wbSA9IG1pbnV0ZXNWYWwubGVuZ3RoID4gMiA/IG1pbnV0ZXNWYWwuc2xpY2UoLTIpIDogJyc7XHJcblxyXG4gICAgcmV0dXJuIHsgaCwgbSwgYW1wbSB9O1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2VDYjogKF86IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xyXG4gIG9uVG91Y2hlZENiOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuc2hvd0hvdXJzID0gdHJ1ZTtcclxuICAgICAgY29uc3QgdGltZSA9IHRoaXMuX2dldEZvcm1hdHRlZFRpbWUodmFsdWUpO1xyXG4gICAgICB0aGlzLnNldEhvdXIodGltZS5oKTtcclxuICAgICAgdGhpcy5zZXRNaW51dGUodGltZS5tKTtcclxuICAgICAgdGhpcy5zZXRBbVBtKHRpbWUuYW1wbSk7XHJcblxyXG4gICAgICB0aGlzLmVuZEhvdXJzID0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNsZWFyVGltZUlucHV0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25DaGFuZ2VDYiA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vblRvdWNoZWRDYiA9IGZuO1xyXG4gIH1cclxufVxyXG4iXX0=