import { __assign, __decorate, __metadata, __param } from "tslib";
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnInit, Renderer2, ViewChild, ViewEncapsulation, } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
var MdbTimePickerContentComponent = /** @class */ (function () {
    function MdbTimePickerContentComponent(_cdRef, _ngZone, focusMonitor, elem, renderer, _document) {
        var _this = this;
        this._cdRef = _cdRef;
        this._ngZone = _ngZone;
        this.focusMonitor = focusMonitor;
        this.elem = elem;
        this.renderer = renderer;
        this._document = _document;
        this._disabledHours = [];
        this._disabledMinutes = [];
        this._isMouseDown = false;
        this._hoursTicks = [];
        this._minuteDigitalDisabled = false;
        this._minutesTicks = [];
        this._okButtonDisabled = false;
        this._showHours = true;
        this._radius = {
            dial: 135,
            inner: 80,
            outer: 110,
            tick: 20,
        };
        this._denominator = {
            1: 30,
            5: 6,
            10: 3,
            15: 2,
            20: 1.5,
        };
        this.touchSupported = 'ontouchstart' in window;
        this._setOkBtnDisabled = function () {
            var hour = Number(_this._to24(_this._selectedTime).h);
            _this._okButtonDisabled = _this._disabledHours[hour];
            if (!_this._okButtonDisabled) {
                if (_this._min &&
                    _this._selectedTime.h === _this._min.h &&
                    _this._selectedTime.ampm === _this._min.ampm) {
                    _this._okButtonDisabled = _this._selectedTime.m < _this._min.m;
                }
                if (_this._max &&
                    _this._selectedTime.h === _this._max.h &&
                    _this._selectedTime.ampm === _this._max.ampm) {
                    _this._okButtonDisabled = _this._selectedTime.m > _this._max.m;
                }
            }
        };
    }
    MdbTimePickerContentComponent.prototype.ngOnInit = function () {
        this._max = this.max;
        this._min = this.min;
        this._selectedTime = this.value;
        var ampm = this._selectedTime.ampm;
        // Add disabled hours to array for PM and AM Hours
        if (this.twelveHour) {
            this._selectedTime.ampm = ampm === 'PM' ? 'AM' : 'PM';
            this._generateTick();
            this._selectedTime.ampm = this._selectedTime.ampm === 'PM' ? 'AM' : 'PM';
        }
        this._generateTick();
        this._setOkBtnDisabled();
        this._setMinuteDigitalDisabled();
    };
    MdbTimePickerContentComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        ['mousedown', 'mouseup', 'touchend', 'touchstart'].forEach(function (event) {
            _this.renderer.listen(_this.plate.nativeElement, event, function (ev) {
                if (event === 'mousedown' || event === 'touchstart') {
                    _this._mousedown(ev, false);
                }
            });
        });
        this._checkDraw();
        setTimeout(function () {
            _this.focusMonitor.focusVia(_this.focus, 'keyboard');
        }, 0);
    };
    MdbTimePickerContentComponent.prototype._checkDraw = function () {
        var _a = this._selectedTime, h = _a.h, m = _a.m;
        var value = this._showHours ? parseInt(h, 0) : parseInt(m, 0);
        var unit = Math.PI / (this._showHours ? 6 : 30), radian = value * unit, radius = this._showHours && value > 0 && value < 13 ? this._radius.inner : this._radius.outer, xd = Math.sin(radian) * radius, yd = -Math.cos(radian) * radius;
        this.setClockHand(xd, yd);
    };
    MdbTimePickerContentComponent.prototype._mousedown = function (e, space) {
        var _this = this;
        this._isMouseDown = true;
        var offset = this.plate.nativeElement.getBoundingClientRect(), isTouch = /^touch/.test(e.type), x0 = offset.left + this._radius.dial, y0 = offset.top + this._radius.dial, dx = (isTouch ? e.touches[0] : e).clientX - x0, dy = (isTouch ? e.touches[0] : e).clientY - y0, z = Math.sqrt(dx * dx + dy * dy);
        var moved = false;
        if (space &&
            (z < this._radius.outer - this._radius.tick || z > this._radius.outer + this._radius.tick)) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (this._showHours) {
            this.setClockHand(dx, dy);
        }
        else {
            this.setClockHand(dx, dy, this.rounding);
        }
        var mousemoveEventMethod = function (event) {
            if (!_this.touchSupported) {
                event.preventDefault();
            }
            event.stopPropagation();
            // tslint:disable-next-line:no-shadowed-variable
            var isTouch = /^touch/.test(event.type), x = (isTouch ? event.touches[0] : event).clientX - x0, y = (isTouch ? event.touches[0] : event).clientY - y0;
            if (!moved && x === dx && y === dy) {
                return;
            }
            moved = true;
            _this._ngZone.run(function () {
                _this.setClockHand(x, y, _this.rounding);
            });
        };
        var mouseupEventMethod = function (event) {
            _this._document.removeEventListener('mousemove', mousemoveEventMethod);
            if (_this.touchSupported) {
                _this._document.removeEventListener('touchmove', mousemoveEventMethod);
            }
            if (!_this.touchSupported) {
                event.preventDefault();
            }
            var x = event.clientX - x0, y = event.clientY - y0;
            if ((space || moved) && x === dx && y === dy) {
                _this.setClockHand(x, y);
            }
            _this._ngZone.run(function () {
                if (_this.autoClose && !_this._showHours) {
                    _this._okBtnClicked();
                }
            });
            _this._showMinutesClock();
            _this.digitalMinute.nativeElement.focus();
            _this._isMouseDown = false;
            _this._document.removeEventListener('mouseup', mouseupEventMethod);
            if (_this.touchSupported) {
                _this._document.removeEventListener('touchend', mouseupEventMethod);
            }
            _this.picker._emitTimeChangeEvent(_this._selectedTime);
        };
        this._document.addEventListener('mousemove', mousemoveEventMethod);
        if (this.touchSupported) {
            this._document.addEventListener('touchmove', mousemoveEventMethod);
        }
        this._document.addEventListener('mouseup', mouseupEventMethod);
        if (this.touchSupported) {
            this._document.addEventListener('touchend', mouseupEventMethod);
        }
    };
    MdbTimePickerContentComponent.prototype._closeBtnClicked = function () {
        // todo this.isOpen = false;
        var _a = this._selectedTime, ampm = _a.ampm, h = _a.h, m = _a.m;
        this._returnHours = this.twelveHour ? h + ":" + m + ampm : h + ":" + m + ampm;
        this.picker.close(false);
    };
    MdbTimePickerContentComponent.prototype._clearBtnClicked = function () {
        this._setAmPm('AM');
        this._setHour(12);
        this._setMinute(0);
        this._generateTick();
        this._showHoursClock();
        this.picker._setValue('');
        this.picker._selectionChange$.next('');
    };
    MdbTimePickerContentComponent.prototype._okBtnClicked = function () {
        if (!this._okButtonDisabled) {
            var _a = this._selectedTime, ampm = _a.ampm, h = _a.h, m = _a.m;
            this._returnHours = this.twelveHour ? h + ":" + m + ampm : h + ":" + m + ampm;
            this.picker._setValue(this._returnHours);
            this.picker._emitTimeDoneEvent(this._selectedTime);
            this.picker.onChangeCb(this._returnHours);
            this.picker.close(true);
        }
    };
    MdbTimePickerContentComponent.prototype._arrowChangeHour = function (key) {
        var _a = this._to24(this._selectedTime), h = _a.h, ampm = _a.ampm;
        var selectedHour = Number(h);
        var availableHours = [];
        this._disabledHours.map(function (hour, index) { return !hour && availableHours.push(index); });
        var toChange;
        var value = key === 'ArrowUp'
            ? availableHours.indexOf(selectedHour) + 1
            : availableHours.indexOf(selectedHour) - 1;
        value = value < 0 ? availableHours.length - 1 : value;
        value = value > availableHours.length - 1 ? 0 : value;
        toChange = availableHours[value];
        if (this.twelveHour) {
            if (toChange >= 12) {
                toChange = toChange - 12;
                if (ampm === 'AM') {
                    this._setAmPm('PM');
                }
            }
            else if (toChange <= 0 || toChange < 12) {
                if (ampm === 'PM') {
                    this._setAmPm('AM');
                }
            }
        }
        this._showHoursClock();
        this._setHour(toChange);
        this._checkDraw();
    };
    MdbTimePickerContentComponent.prototype._arrowChangeMinute = function (key) {
        if (!this._minuteDigitalDisabled) {
            if (this._showHours) {
                this._showMinutesClock();
            }
            var m = this._selectedTime.m;
            var availableMinutes_1 = [];
            this._generateMinutesDisable();
            this._disabledMinutes.map(function (disabled, i) {
                if (!disabled) {
                    availableMinutes_1.push(i);
                }
            });
            var toChange = void 0;
            var value = key === 'ArrowUp'
                ? availableMinutes_1.indexOf(Number(m)) + 1
                : availableMinutes_1.indexOf(Number(m)) - 1;
            value = value < 0 ? availableMinutes_1.length - 1 : value;
            value = value > availableMinutes_1.length - 1 ? 0 : value;
            toChange = availableMinutes_1[value];
            this._setMinute(toChange);
            this._checkDraw();
        }
    };
    MdbTimePickerContentComponent.prototype._generateMinutesDisable = function () {
        for (var i = 0; i < 60; i++) {
            var disableByRounding = this.rounding > 1 && i % this.rounding !== 0;
            var disabled = this._rangeMinute(i, 'min') || this._rangeMinute(i, 'max') || disableByRounding;
            this._disabledMinutes[i] = disabled;
        }
    };
    MdbTimePickerContentComponent.prototype._setHour = function (hour) {
        if (Number(this._selectedTime.h) !== hour) {
            if (this.twelveHour) {
                hour = hour <= 0 ? 12 : hour;
                hour = hour > 12 ? 1 : hour;
            }
            else {
                hour = hour >= 24 ? 0 : hour;
                hour = hour <= -1 ? 23 : hour;
            }
            this._selectedTime.h = hour >= 10 ? "" + hour : "0" + hour;
            this._setMinuteDigitalDisabled();
        }
    };
    MdbTimePickerContentComponent.prototype._setMinute = function (min) {
        if (Number(this._selectedTime.m) !== min) {
            min = min >= 60 ? 0 : min;
            min = min <= -1 ? 59 : min;
            this._selectedTime.m = min >= 10 ? "" + min : "0" + min;
            this._setOkBtnDisabled();
        }
    };
    MdbTimePickerContentComponent.prototype._setAmPm = function (ampm) {
        this._selectedTime.ampm = ampm;
        this._generateTick();
        this._setOkBtnDisabled();
        this._setMinuteDigitalDisabled();
        this._checkDraw();
        this.picker._emitTimeChangeEvent(this._selectedTime);
    };
    MdbTimePickerContentComponent.prototype._showHoursClock = function () {
        this._generateTick();
        this._showHours = true;
        this._setOkBtnDisabled();
        this._checkDraw();
    };
    MdbTimePickerContentComponent.prototype._showMinutesClock = function () {
        if (!this._minuteDigitalDisabled) {
            this._showHours = false;
            this._generateTick();
            this._setOkBtnDisabled();
            this._generateMinutesDisable();
            if (this._disabledMinutes[Number(this._selectedTime.m)] === true) {
                this._setMinute(this._disabledMinutes.indexOf(false));
            }
            this._checkDraw();
        }
    };
    MdbTimePickerContentComponent.prototype._generateTick = function () {
        if (this.twelveHour) {
            this._hoursTicks = [];
            for (var i = 1; i < 13; i++) {
                var radian = (i / 6) * Math.PI;
                var tick = {
                    hour: i.toString(),
                    left: this._radius.dial + Math.sin(radian) * this._radius.outer - this._radius.tick,
                    top: this._radius.dial - Math.cos(radian) * this._radius.outer - this._radius.tick,
                    disabled: this._rangeHour(i, 'min') || this._rangeHour(i, 'max'),
                };
                this._hoursTicks.push(tick);
            }
        }
        else {
            this._hoursTicks = [];
            for (var i = 0; i < 24; i++) {
                var radian = (i / 6) * Math.PI;
                var inner = i > 0 && i < 13;
                var radius = inner ? this._radius.inner : this._radius.outer;
                var hour = i === 0 ? '0' + i.toString() : i.toString();
                var tick = {
                    hour: hour,
                    left: this._radius.dial + Math.sin(radian) * radius - this._radius.tick,
                    top: this._radius.dial - Math.cos(radian) * radius - this._radius.tick,
                    disabled: this._rangeHour(i, 'min') || this._rangeHour(i, 'max'),
                };
                this._hoursTicks.push(tick);
            }
        }
        this._minutesTicks = [];
        for (var i = 0; i < 60; i += 5) {
            var radian = (i / 30) * Math.PI;
            var disableByRounding = this.rounding > 1 && i % this.rounding !== 0;
            var min = i < 10 ? '0' + i.toString() : i.toString();
            var tick = {
                min: min,
                left: this._radius.dial + Math.sin(radian) * this._radius.outer - this._radius.tick,
                top: this._radius.dial - Math.cos(radian) * this._radius.outer - this._radius.tick,
                disabled: this._rangeMinute(i, 'min') || this._rangeMinute(i, 'max') || disableByRounding,
            };
            this._minutesTicks.push(tick);
        }
    };
    MdbTimePickerContentComponent.prototype.setClockHand = function (x, y, roundBy) {
        var radian = Math.atan2(x, -y);
        var isHours = this._showHours;
        var unit = Math.PI / (isHours ? 6 : roundBy ? this._denominator[roundBy] : 30);
        var z = Math.sqrt(x * x + y * y);
        var inner = isHours && z < (this._radius.outer + this._radius.inner) / 2;
        var value = this._showHours
            ? parseInt(this._selectedTime.h, 0)
            : parseInt(this._selectedTime.m, 0);
        var radius = inner && !this.twelveHour ? this._radius.inner : this._radius.outer;
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        value = Math.round(radian / unit);
        radian = value * unit;
        if (this.twelveHour && isHours) {
            if (value === 0) {
                value = 12;
            }
            if (this._isMouseDown) {
                if (isHours && (this._rangeHour(value, 'min') || this._rangeHour(value, 'max'))) {
                    return;
                }
            }
        }
        else if (!this.twelveHour && isHours) {
            value = !inner ? value + 12 : value;
            value = value === 24 ? 0 : value;
            value = inner && value === 0 ? 12 : value;
            value = !inner && value === 12 ? 0 : value;
            if (this._isMouseDown) {
                if (isHours && (this._rangeHour(value, 'min') || this._rangeHour(value, 'max'))) {
                    return;
                }
            }
        }
        else {
            if (roundBy) {
                value *= roundBy;
            }
            if (value === 60) {
                value = 0;
            }
        }
        if (isHours) {
            this.fg.nativeElement.setAttribute('class', 'mdb-timepicker-canvas-fg');
        }
        else {
            if (this._rangeMinute(value, 'min') || this._rangeMinute(value, 'max')) {
                this._cdRef.markForCheck();
                return;
            }
            if (value % 5 === 0) {
                this.fg.nativeElement.setAttribute('class', 'mdb-timepicker-canvas-fg');
            }
            else {
                this.fg.nativeElement.setAttribute('class', 'mdb-timepicker-canvas-fg active');
            }
        }
        var cx1 = Math.sin(radian) * (radius - this._radius.tick), cy1 = -Math.cos(radian) * (radius - this._radius.tick), cx2 = Math.sin(radian) * radius, cy2 = -Math.cos(radian) * radius;
        this.hand.nativeElement.setAttribute('x2', cx1);
        this.hand.nativeElement.setAttribute('y2', cy1);
        this.bg.nativeElement.setAttribute('cx', cx2);
        this.bg.nativeElement.setAttribute('cy', cy2);
        this.fg.nativeElement.setAttribute('cx', cx2);
        this.fg.nativeElement.setAttribute('cy', cy2);
        if (this._showHours) {
            if (value !== Number(this._selectedTime.h)) {
                this._setHour(value);
                this._setMinuteDigitalDisabled();
            }
        }
        else {
            if (value !== Number(this._selectedTime.m)) {
                this._setMinute(value);
            }
        }
        this._cdRef.markForCheck();
    };
    MdbTimePickerContentComponent.prototype._to24 = function (time) {
        var hour = time.ampm === 'PM' ? Number(time.h) + 12 : Number(time.h);
        hour = hour === 12 ? 0 : hour;
        hour = hour === 24 ? 12 : hour;
        return __assign(__assign({}, time), { h: "" + hour });
    };
    MdbTimePickerContentComponent.prototype._rangeHour = function (index, range) {
        var status = false;
        var i = Number(this._to24(__assign(__assign({}, this._selectedTime), { h: "" + index })).h);
        if (!this.twelveHour) {
            var minH = this.min && Number(this._min.h);
            var maxH = this.max && Number(this._max.h);
            if (range === 'min' && this.min) {
                status = index < minH;
                if (status && this._max && this._max.h < this._min.h) {
                    status = false;
                }
            }
            else if (range === 'max' && this.max) {
                status = index > maxH;
                if (status && this._min && this._min.h > this._max.h && minH <= index) {
                    status = false;
                }
            }
        }
        else {
            var min = this._min && Number(this._to24(this._min).h);
            var max = this._max && Number(this._to24(this._max).h);
            if (range === 'min' && this.min) {
                status = i < min;
            }
            if (range === 'max' && this.max) {
                status = i > max;
            }
            if (min > max) {
                status = false;
                status = min > i && i > max;
            }
        }
        this._disabledHours[i] = status;
        return status;
    };
    MdbTimePickerContentComponent.prototype._rangeMinute = function (index, range) {
        var status = false;
        if (!this._showHours) {
            if (range === 'min' && this.min) {
                var isSameHour = this._min.h === this._selectedTime.h;
                var value = index < Number(this._min.m);
                status = value && isSameHour;
            }
            else if (range === 'max' && this.max) {
                var isSameHour = this._max.h === this._selectedTime.h;
                var value = index > Number(this._max.m);
                status = value && isSameHour;
            }
        }
        if (this.twelveHour) {
            var min = this._min && Number(this._to24(this._min).h);
            var max = this._max && Number(this._to24(this._max).h);
            var i = Number(this._to24(this._selectedTime).h);
            if (range === 'min' && min) {
                status = i === min && index < Number(this._min.m);
            }
            else if (range === 'max' && max) {
                status = i === max && index > Number(this._max.m);
            }
            status = status || this._disabledHours[i];
        }
        return status;
    };
    MdbTimePickerContentComponent.prototype._setMinuteDigitalDisabled = function () {
        var h = this._to24(this._selectedTime).h;
        this._minuteDigitalDisabled = this._disabledHours[Number(h)];
    };
    MdbTimePickerContentComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: FocusMonitor },
        { type: ElementRef },
        { type: Renderer2 },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    __decorate([
        ViewChild('plate', { static: false }),
        __metadata("design:type", ElementRef)
    ], MdbTimePickerContentComponent.prototype, "plate", void 0);
    __decorate([
        ViewChild('hand', { static: false }),
        __metadata("design:type", ElementRef)
    ], MdbTimePickerContentComponent.prototype, "hand", void 0);
    __decorate([
        ViewChild('fg', { static: false }),
        __metadata("design:type", ElementRef)
    ], MdbTimePickerContentComponent.prototype, "fg", void 0);
    __decorate([
        ViewChild('bg', { static: false }),
        __metadata("design:type", ElementRef)
    ], MdbTimePickerContentComponent.prototype, "bg", void 0);
    __decorate([
        ViewChild('focus', { static: false }),
        __metadata("design:type", ElementRef)
    ], MdbTimePickerContentComponent.prototype, "focus", void 0);
    __decorate([
        ViewChild('digitalMinute', { static: false }),
        __metadata("design:type", ElementRef)
    ], MdbTimePickerContentComponent.prototype, "digitalMinute", void 0);
    MdbTimePickerContentComponent = __decorate([
        Component({
            selector: 'mdb-timepicker-content',
            template: "<div class=\"mdb-timepicker-modal\" cdkTrapFocus>\n  <!-- HEADER -->\n  <div class=\"mdb-timepicker-header\">\n    <!-- TIME -->\n    <div class=\"mdb-timepicker-time\">\n      <span\n        (click)=\"_showHoursClock()\"\n        (keydown.arrowdown)=\"_arrowChangeHour($event.key)\"\n        (keydown.arrowup)=\"_arrowChangeHour($event.key)\"\n        (keydown.enter)=\"_showHoursClock()\"\n        [ngClass]=\"{ active: _showHours }\"\n        class=\"hour-digital\"\n        #focus\n        tabindex=\"0\"\n      >\n        {{ _selectedTime.h }}</span\n      >:<span\n        (click)=\"_showMinutesClock()\"\n        (keydown.arrowdown)=\"_arrowChangeMinute($event.key)\"\n        (keydown.arrowup)=\"_arrowChangeMinute($event.key)\"\n        (keydown.enter)=\"_showMinutesClock()\"\n        [ngClass]=\"{ 'active': !_showHours, 'disabled': _minuteDigitalDisabled }\"\n        class=\"minute-digital\"\n        #digitalMinute\n        tabindex=\"0\"\n        >{{ _selectedTime.m }}</span\n      >\n    </div>\n    <div class=\"mdb-timepicker-ampm\" *ngIf=\"twelveHour\">\n      <span\n        (click)=\"_setAmPm('AM')\"\n        (keydown.enter)=\"_setAmPm('AM')\"\n        [ngClass]=\"{ active: _selectedTime.ampm == 'AM' }\"\n        tabindex=\"0\"\n        >AM</span\n      >\n      <span\n        (click)=\"_setAmPm('PM')\"\n        (keydown.enter)=\"_setAmPm('PM')\"\n        [ngClass]=\"{ active: _selectedTime.ampm == 'PM' }\"\n        tabindex=\"0\"\n        >PM</span\n      >\n    </div>\n  </div>\n  <!-- /Header -->\n  <!-- Body -->\n  <div class=\"mdb-timepicker-body\">\n    <div class=\"mdb-timepicker-plate\" #plate>\n      <div class=\"mdb-timepicker-canvas\">\n        <svg class=\"mdb-timepicker-svg\" width=\"270\" height=\"270\" #svg>\n          <g transform=\"translate(135,135)\" #g>\n            <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"-90\" #hand></line>\n            <circle class=\"mdb-timepicker-canvas-fg\" r=\"5\" cx=\"0\" cy=\"-110\" #fg></circle>\n            <circle class=\"mdb-timepicker-canvas-bg\" r=\"20\" cx=\"0\" cy=\"-110\" #bg></circle>\n            <circle class=\"mdb-timepicker-canvas-bearing\" cx=\"0\" cy=\"0\" r=\"2\" #bearing></circle>\n          </g>\n        </svg>\n      </div>\n\n      <div\n        [ngClass]=\"{ 'mdb-timepicker-dial-out': !_showHours }\"\n        [ngStyle]=\"{ visibility: !_showHours ? 'hidden' : 'visible' }\"\n        #hoursPlate\n        class=\"mdb-timepicker-dial mdb-timepicker-hours\"\n      >\n        <div\n          [ngClass]=\"{ disabled: tick.disabled }\"\n          [ngStyle]=\"{ left: tick.left + 'px', top: tick.top + 'px' }\"\n          *ngFor=\"let tick of _hoursTicks\"\n          class=\"mdb-timepicker-tick\"\n          id=\"{{ tick.hour }}\"\n          style=\"font-size: 140%;\"\n        >\n          {{ tick.hour }}\n        </div>\n      </div>\n      <div\n        [ngClass]=\"{ 'mdb-timepicker-dial-out': _showHours }\"\n        [ngStyle]=\"{ visibility: _showHours ? 'hidden' : 'visible' }\"\n        #minutesPlate\n        class=\"mdb-timepicker-dial mdb-timepicker-minutes\"\n      >\n        <div\n          [ngClass]=\"{ disabled: tick.disabled }\"\n          [ngStyle]=\"{ left: tick.left + 'px', top: tick.top + 'px' }\"\n          *ngFor=\"let tick of _minutesTicks\"\n          class=\"mdb-timepicker-tick\"\n          style=\"font-size: 120%;\"\n        >\n          {{ tick.min }}\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- /Boody -->\n  <!-- Footer -->\n  <div class=\"mdb-timepicker-footer\">\n    <button\n      (click)=\"_clearBtnClicked()\"\n      *ngIf=\"clearButton\"\n      class=\"mdb-timepicker-btn mdb-timepicker-clear\"\n      mdbWavesEffect\n      type=\"button\"\n    >\n      {{ clearButton }}\n    </button>\n    <button\n      (click)=\"_closeBtnClicked()\"\n      *ngIf=\"closeButton\"\n      class=\"mdb-timepicker-btn mdb-timepicker-close\"\n      mdbWavesEffect\n      type=\"button\"\n    >\n      {{ closeButton }}\n    </button>\n    <button\n      (click)=\"_okBtnClicked()\"\n      [ngClass]=\"{ disabled: _okButtonDisabled }\"\n      class=\"mdb-timepicker-btn mdb-timepicker-ok\"\n      mdbWavesEffect\n      type=\"button\"\n    >\n      {{ okButton }}\n    </button>\n  </div>\n  <!-- /Footer -->\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["@-webkit-keyframes pulse{from,to{transform:scale3d(1,1,1)}50%{transform:scale3d(1.1,1.1,1.1)}}@keyframes pulse{from,to{transform:scale3d(1,1,1)}50%{transform:scale3d(1.1,1.1,1.1)}}.disabled{cursor:default;opacity:.5}.mdb-timepicker-modal{min-width:328px;box-shadow:rgba(0,0,0,.2) 0 11px 15px -7px,rgba(0,0,0,.14) 0 24px 38px 3px,rgba(0,0,0,.12) 0 9px 46px 8px;background:#fff;display:table-cell;vertical-align:middle}@media (min-height:28.875em){.mdb-timepicker-modal{display:block;border:1px solid #777;border-top-color:#898989;border-bottom-width:0;border-radius:5px 5px 0 0;box-shadow:0 .75rem 2.25rem 1rem rgba(0,0,0,.24)}}.mdb-timepicker-header{height:120px;box-sizing:border-box;background-color:#4285f4;padding:24px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.55)}.mdb-timepicker-time{font-size:4.375rem;color:rgba(255,255,255,.65)}.mdb-timepicker-ampm{margin-left:15px;font-size:18px;display:flex;flex-direction:column;justify-content:space-around;height:100%}span{cursor:pointer}span.active{color:#fff}.mdb-timepicker-tick{border-radius:50%;color:#666;line-height:2.5rem;text-align:center;width:2.5rem;height:2.5rem;position:absolute;cursor:pointer;transition:.3s;background-color:rgba(0,150,136,0)}.mdb-timepicker-tick:hover{background-color:rgba(0,150,136,.25)}.mdb-timepicker-footer{display:flex;justify-content:flex-end;width:100%;padding:12px}.mdb-timepicker-btn{padding:6px 8px;text-transform:uppercase;background:0 0;border:0;border-radius:4px;min-width:64px;transition:.3s}.mdb-timepicker-btn:not(.mdb-timepicker-btn.mdb-timepicker-clear){margin-left:8px}.mdb-timepicker-btn.mdb-timepicker-clear{margin-right:auto}.mdb-timepicker-btn:hover{background-color:rgba(0,150,136,.25)}.mdb-timepicker-plate{background-color:#eee;border-radius:50%;width:16.875rem;height:16.875rem;overflow:visible;position:relative;margin:1.25rem auto auto;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mdb-timepicker-plate .mdb-timepicker-minutes{visibility:hidden}.mdb-timepicker-plate .mdb-timepicker-dial-out{opacity:0}.mdb-timepicker-plate .mdb-timepicker-hours.mdb-timepicker-dial-out{transform:scale(1.2,1.2)}.mdb-timepicker-plate .mdb-timepicker-minutes.mdb-timepicker-dial-out{transform:scale(.8,.8)}.mdb-timepicker-canvas,.mdb-timepicker-dial{width:16.875rem;height:16.875rem;position:absolute;left:-1px;top:-1px}.mdb-timepicker-dial{transition:transform 350ms,opacity 350ms}.mdb-timepicker-dial .mdb-timepicker-tick{border-radius:50%;color:#666;line-height:2.5rem;text-align:center;width:2.5rem;height:2.5rem;position:absolute;cursor:pointer;transition:background-color .3s;background-color:rgba(0,150,136,0)}.mdb-timepicker-dial .mdb-timepicker-tick.active,.mdb-timepicker-dial .mdb-timepicker-tick:hover{background-color:rgba(0,150,136,.25)}.mdb-timepicker-canvas{transition:opacity .3s}.mdb-timepicker-canvas line{stroke:rgba(0,150,136,.25);stroke-width:1}.mdb-timepicker-canvas-out{opacity:.25}.mdb-timepicker-canvas-bearing{stroke:none;fill:rgba(0,77,64,.75)}.mdb-timepicker-canvas-fg{stroke:none;fill:rgba(0,77,64,0)}.mdb-timepicker-canvas-fg.active{fill:rgba(0,77,64,.5)}.mdb-timepicker-canvas-bg{stroke:none;fill:rgba(0,150,136,.25)}.mdb-timepicker-canvas-bg-trans{fill:rgba(0,150,136,.25)}"]
        }),
        __param(5, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            NgZone,
            FocusMonitor,
            ElementRef,
            Renderer2, Object])
    ], MdbTimePickerContentComponent);
    return MdbTimePickerContentComponent;
}());
export { MdbTimePickerContentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb250ZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby90aW1lcGlja2VyL3RpbWVwaWNrZXIuY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDTCxhQUFhLEVBQ2IsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQW9CakQ7SUFvREUsdUNBQ1UsTUFBeUIsRUFDekIsT0FBZSxFQUNoQixZQUEwQixFQUMxQixJQUFnQixFQUNoQixRQUFtQixFQUNBLFNBQWM7UUFOMUMsaUJBT0k7UUFOTSxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUN6QixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNBLGNBQVMsR0FBVCxTQUFTLENBQUs7UUFuQ2xDLG1CQUFjLEdBQWMsRUFBRSxDQUFDO1FBQy9CLHFCQUFnQixHQUFjLEVBQUUsQ0FBQztRQUNqQyxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUN0QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QiwyQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFDL0Isa0JBQWEsR0FBYSxFQUFFLENBQUM7UUFDN0Isc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBRTFCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFFakIsWUFBTyxHQUFXO1lBQ3hCLElBQUksRUFB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b3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgTmdab25lLFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1xuICBBbVBtLFxuICBDbGVhckJ1dHRvbixcbiAgQ2xvc2VCdXR0b24sXG4gIEhvdXIsXG4gIE1pbnV0ZSxcbiAgUmFkaXVzLFxuICBSb3VuZGluZyxcbiAgU2VsZWN0ZWRUaW1lLFxufSBmcm9tICcuL3RpbWVwaWNrZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IE1kYlRpbWVQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL3RpbWVwaWNrZXIuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLXRpbWVwaWNrZXItY29udGVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lcGlja2VyLmNvbnRlbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RpbWUtcGlja2VyLW1vZHVsZS5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJUaW1lUGlja2VyQ29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ3BsYXRlJywgeyBzdGF0aWM6IGZhbHNlIH0pIHBsYXRlOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdoYW5kJywgeyBzdGF0aWM6IGZhbHNlIH0pIGhhbmQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2ZnJywgeyBzdGF0aWM6IGZhbHNlIH0pIGZnOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdiZycsIHsgc3RhdGljOiBmYWxzZSB9KSBiZzogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnZm9jdXMnLCB7IHN0YXRpYzogZmFsc2UgfSkgZm9jdXM6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2RpZ2l0YWxNaW51dGUnLCB7IHN0YXRpYzogZmFsc2UgfSkgZGlnaXRhbE1pbnV0ZTogRWxlbWVudFJlZjtcblxuICBhdXRvQ2xvc2U6IGJvb2xlYW47XG4gIGNsZWFyQnV0dG9uOiBDbGVhckJ1dHRvbjtcbiAgY2xvc2VCdXR0b246IENsb3NlQnV0dG9uO1xuICBtYXg6IFNlbGVjdGVkVGltZTtcbiAgbWluOiBTZWxlY3RlZFRpbWU7XG4gIG9rQnV0dG9uOiBzdHJpbmc7XG4gIHBpY2tlcjogTWRiVGltZVBpY2tlckNvbXBvbmVudDtcbiAgcm91bmRpbmc6IFJvdW5kaW5nO1xuICB0d2VsdmVIb3VyOiBib29sZWFuO1xuICB2YWx1ZTogU2VsZWN0ZWRUaW1lO1xuXG4gIHByaXZhdGUgX21heDogU2VsZWN0ZWRUaW1lO1xuICBwcml2YXRlIF9taW46IFNlbGVjdGVkVGltZTtcbiAgcHJpdmF0ZSBfcmV0dXJuSG91cnM6IHN0cmluZztcblxuICBwcml2YXRlIF9kaXNhYmxlZEhvdXJzOiBib29sZWFuW10gPSBbXTtcbiAgcHJpdmF0ZSBfZGlzYWJsZWRNaW51dGVzOiBib29sZWFuW10gPSBbXTtcbiAgcHJpdmF0ZSBfaXNNb3VzZURvd24gPSBmYWxzZTtcbiAgcHVibGljIF9ob3Vyc1RpY2tzOiBIb3VyW10gPSBbXTtcbiAgcHVibGljIF9taW51dGVEaWdpdGFsRGlzYWJsZWQgPSBmYWxzZTtcbiAgcHVibGljIF9taW51dGVzVGlja3M6IE1pbnV0ZVtdID0gW107XG4gIHB1YmxpYyBfb2tCdXR0b25EaXNhYmxlZCA9IGZhbHNlO1xuICBwdWJsaWMgX3NlbGVjdGVkVGltZTogU2VsZWN0ZWRUaW1lO1xuICBwdWJsaWMgX3Nob3dIb3VycyA9IHRydWU7XG5cbiAgcHJpdmF0ZSBfcmFkaXVzOiBSYWRpdXMgPSB7XG4gICAgZGlhbDogMTM1LFxuICAgIGlubmVyOiA4MCxcbiAgICBvdXRlcjogMTEwLFxuICAgIHRpY2s6IDIwLFxuICB9O1xuXG4gIHByaXZhdGUgX2Rlbm9taW5hdG9yOiB7IFtrZXk6IG51bWJlcl06IG51bWJlciB9ID0ge1xuICAgIDE6IDMwLFxuICAgIDU6IDYsXG4gICAgMTA6IDMsXG4gICAgMTU6IDIsXG4gICAgMjA6IDEuNSxcbiAgICAvLyAzMDogMSxcbiAgICAvLyA2MDogMC41XG4gIH07XG5cbiAgcHJpdmF0ZSB0b3VjaFN1cHBvcnRlZDogYm9vbGVhbiA9ICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgcHVibGljIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgIHB1YmxpYyBlbGVtOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnlcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX21heCA9IHRoaXMubWF4O1xuICAgIHRoaXMuX21pbiA9IHRoaXMubWluO1xuICAgIHRoaXMuX3NlbGVjdGVkVGltZSA9IHRoaXMudmFsdWU7XG4gICAgY29uc3QgeyBhbXBtIH0gPSB0aGlzLl9zZWxlY3RlZFRpbWU7XG5cbiAgICAvLyBBZGQgZGlzYWJsZWQgaG91cnMgdG8gYXJyYXkgZm9yIFBNIGFuZCBBTSBIb3Vyc1xuICAgIGlmICh0aGlzLnR3ZWx2ZUhvdXIpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkVGltZS5hbXBtID0gYW1wbSA9PT0gJ1BNJyA/ICdBTScgOiAnUE0nO1xuICAgICAgdGhpcy5fZ2VuZXJhdGVUaWNrKCk7XG4gICAgICB0aGlzLl9zZWxlY3RlZFRpbWUuYW1wbSA9IHRoaXMuX3NlbGVjdGVkVGltZS5hbXBtID09PSAnUE0nID8gJ0FNJyA6ICdQTSc7XG4gICAgfVxuICAgIHRoaXMuX2dlbmVyYXRlVGljaygpO1xuICAgIHRoaXMuX3NldE9rQnRuRGlzYWJsZWQoKTtcbiAgICB0aGlzLl9zZXRNaW51dGVEaWdpdGFsRGlzYWJsZWQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBbJ21vdXNlZG93bicsICdtb3VzZXVwJywgJ3RvdWNoZW5kJywgJ3RvdWNoc3RhcnQnXS5mb3JFYWNoKChldmVudDogYW55KSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLnBsYXRlLm5hdGl2ZUVsZW1lbnQsIGV2ZW50LCAoZXY6IGFueSkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQgPT09ICdtb3VzZWRvd24nIHx8IGV2ZW50ID09PSAndG91Y2hzdGFydCcpIHtcbiAgICAgICAgICB0aGlzLl9tb3VzZWRvd24oZXYsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5fY2hlY2tEcmF3KCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLmZvY3VzLCAna2V5Ym9hcmQnKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NoZWNrRHJhdygpIHtcbiAgICBjb25zdCB7IGgsIG0gfSA9IHRoaXMuX3NlbGVjdGVkVGltZTtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX3Nob3dIb3VycyA/IHBhcnNlSW50KGgsIDApIDogcGFyc2VJbnQobSwgMCk7XG5cbiAgICBjb25zdCB1bml0ID0gTWF0aC5QSSAvICh0aGlzLl9zaG93SG91cnMgPyA2IDogMzApLFxuICAgICAgcmFkaWFuID0gdmFsdWUgKiB1bml0LFxuICAgICAgcmFkaXVzID0gdGhpcy5fc2hvd0hvdXJzICYmIHZhbHVlID4gMCAmJiB2YWx1ZSA8IDEzID8gdGhpcy5fcmFkaXVzLmlubmVyIDogdGhpcy5fcmFkaXVzLm91dGVyLFxuICAgICAgeGQgPSBNYXRoLnNpbihyYWRpYW4pICogcmFkaXVzLFxuICAgICAgeWQgPSAtTWF0aC5jb3MocmFkaWFuKSAqIHJhZGl1cztcblxuICAgIHRoaXMuc2V0Q2xvY2tIYW5kKHhkLCB5ZCk7XG4gIH1cblxuICBwcml2YXRlIF9tb3VzZWRvd24oZTogYW55LCBzcGFjZT86IGFueSkge1xuICAgIHRoaXMuX2lzTW91c2VEb3duID0gdHJ1ZTtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLnBsYXRlLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICBpc1RvdWNoID0gL150b3VjaC8udGVzdChlLnR5cGUpLFxuICAgICAgeDAgPSBvZmZzZXQubGVmdCArIHRoaXMuX3JhZGl1cy5kaWFsLFxuICAgICAgeTAgPSBvZmZzZXQudG9wICsgdGhpcy5fcmFkaXVzLmRpYWwsXG4gICAgICBkeCA9IChpc1RvdWNoID8gZS50b3VjaGVzWzBdIDogZSkuY2xpZW50WCAtIHgwLFxuICAgICAgZHkgPSAoaXNUb3VjaCA/IGUudG91Y2hlc1swXSA6IGUpLmNsaWVudFkgLSB5MCxcbiAgICAgIHogPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgIGxldCBtb3ZlZCA9IGZhbHNlO1xuXG4gICAgaWYgKFxuICAgICAgc3BhY2UgJiZcbiAgICAgICh6IDwgdGhpcy5fcmFkaXVzLm91dGVyIC0gdGhpcy5fcmFkaXVzLnRpY2sgfHwgeiA+IHRoaXMuX3JhZGl1cy5vdXRlciArIHRoaXMuX3JhZGl1cy50aWNrKVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGlmICh0aGlzLl9zaG93SG91cnMpIHtcbiAgICAgIHRoaXMuc2V0Q2xvY2tIYW5kKGR4LCBkeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0Q2xvY2tIYW5kKGR4LCBkeSwgdGhpcy5yb3VuZGluZyk7XG4gICAgfVxuXG4gICAgY29uc3QgbW91c2Vtb3ZlRXZlbnRNZXRob2QgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnRvdWNoU3VwcG9ydGVkKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zaGFkb3dlZC12YXJpYWJsZVxuICAgICAgY29uc3QgaXNUb3VjaCA9IC9edG91Y2gvLnRlc3QoZXZlbnQudHlwZSksXG4gICAgICAgIHggPSAoaXNUb3VjaCA/IGV2ZW50LnRvdWNoZXNbMF0gOiBldmVudCkuY2xpZW50WCAtIHgwLFxuICAgICAgICB5ID0gKGlzVG91Y2ggPyBldmVudC50b3VjaGVzWzBdIDogZXZlbnQpLmNsaWVudFkgLSB5MDtcbiAgICAgIGlmICghbW92ZWQgJiYgeCA9PT0gZHggJiYgeSA9PT0gZHkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbW92ZWQgPSB0cnVlO1xuXG4gICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRDbG9ja0hhbmQoeCwgeSwgdGhpcy5yb3VuZGluZyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgbW91c2V1cEV2ZW50TWV0aG9kID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgIHRoaXMuX2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlbW92ZUV2ZW50TWV0aG9kKTtcbiAgICAgIGlmICh0aGlzLnRvdWNoU3VwcG9ydGVkKSB7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG1vdXNlbW92ZUV2ZW50TWV0aG9kKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy50b3VjaFN1cHBvcnRlZCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgY29uc3QgeCA9IGV2ZW50LmNsaWVudFggLSB4MCxcbiAgICAgICAgeSA9IGV2ZW50LmNsaWVudFkgLSB5MDtcblxuICAgICAgaWYgKChzcGFjZSB8fCBtb3ZlZCkgJiYgeCA9PT0gZHggJiYgeSA9PT0gZHkpIHtcbiAgICAgICAgdGhpcy5zZXRDbG9ja0hhbmQoeCwgeSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5hdXRvQ2xvc2UgJiYgIXRoaXMuX3Nob3dIb3Vycykge1xuICAgICAgICAgIHRoaXMuX29rQnRuQ2xpY2tlZCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fc2hvd01pbnV0ZXNDbG9jaygpO1xuICAgICAgdGhpcy5kaWdpdGFsTWludXRlLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgdGhpcy5faXNNb3VzZURvd24gPSBmYWxzZTtcblxuICAgICAgdGhpcy5fZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXBFdmVudE1ldGhvZCk7XG4gICAgICBpZiAodGhpcy50b3VjaFN1cHBvcnRlZCkge1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG1vdXNldXBFdmVudE1ldGhvZCk7XG4gICAgICB9XG4gICAgICB0aGlzLnBpY2tlci5fZW1pdFRpbWVDaGFuZ2VFdmVudCh0aGlzLl9zZWxlY3RlZFRpbWUpO1xuICAgIH07XG5cbiAgICB0aGlzLl9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmVFdmVudE1ldGhvZCk7XG4gICAgaWYgKHRoaXMudG91Y2hTdXBwb3J0ZWQpIHtcbiAgICAgIHRoaXMuX2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG1vdXNlbW92ZUV2ZW50TWV0aG9kKTtcbiAgICB9XG4gICAgdGhpcy5fZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXBFdmVudE1ldGhvZCk7XG4gICAgaWYgKHRoaXMudG91Y2hTdXBwb3J0ZWQpIHtcbiAgICAgIHRoaXMuX2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgbW91c2V1cEV2ZW50TWV0aG9kKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgX2Nsb3NlQnRuQ2xpY2tlZCgpIHtcbiAgICAvLyB0b2RvIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgY29uc3QgeyBhbXBtLCBoLCBtIH0gPSB0aGlzLl9zZWxlY3RlZFRpbWU7XG4gICAgdGhpcy5fcmV0dXJuSG91cnMgPSB0aGlzLnR3ZWx2ZUhvdXIgPyBgJHtofToke219JHthbXBtfWAgOiBgJHtofToke219JHthbXBtfWA7XG5cbiAgICB0aGlzLnBpY2tlci5jbG9zZShmYWxzZSk7XG4gIH1cblxuICBwdWJsaWMgX2NsZWFyQnRuQ2xpY2tlZCgpIHtcbiAgICB0aGlzLl9zZXRBbVBtKCdBTScpO1xuICAgIHRoaXMuX3NldEhvdXIoMTIpO1xuICAgIHRoaXMuX3NldE1pbnV0ZSgwKTtcbiAgICB0aGlzLl9nZW5lcmF0ZVRpY2soKTtcbiAgICB0aGlzLl9zaG93SG91cnNDbG9jaygpO1xuICAgIHRoaXMucGlja2VyLl9zZXRWYWx1ZSgnJyk7XG4gICAgdGhpcy5waWNrZXIuX3NlbGVjdGlvbkNoYW5nZSQubmV4dCgnJyk7XG4gIH1cblxuICBwdWJsaWMgX29rQnRuQ2xpY2tlZCgpIHtcbiAgICBpZiAoIXRoaXMuX29rQnV0dG9uRGlzYWJsZWQpIHtcbiAgICAgIGNvbnN0IHsgYW1wbSwgaCwgbSB9ID0gdGhpcy5fc2VsZWN0ZWRUaW1lO1xuICAgICAgdGhpcy5fcmV0dXJuSG91cnMgPSB0aGlzLnR3ZWx2ZUhvdXIgPyBgJHtofToke219JHthbXBtfWAgOiBgJHtofToke219JHthbXBtfWA7XG5cbiAgICAgIHRoaXMucGlja2VyLl9zZXRWYWx1ZSh0aGlzLl9yZXR1cm5Ib3Vycyk7XG4gICAgICB0aGlzLnBpY2tlci5fZW1pdFRpbWVEb25lRXZlbnQodGhpcy5fc2VsZWN0ZWRUaW1lKTtcbiAgICAgIHRoaXMucGlja2VyLm9uQ2hhbmdlQ2IodGhpcy5fcmV0dXJuSG91cnMpO1xuICAgICAgdGhpcy5waWNrZXIuY2xvc2UodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIF9hcnJvd0NoYW5nZUhvdXIoa2V5OiBzdHJpbmcpIHtcbiAgICBjb25zdCB7IGgsIGFtcG0gfSA9IHRoaXMuX3RvMjQodGhpcy5fc2VsZWN0ZWRUaW1lKTtcbiAgICBjb25zdCBzZWxlY3RlZEhvdXIgPSBOdW1iZXIoaCk7XG4gICAgY29uc3QgYXZhaWxhYmxlSG91cnM6IG51bWJlcltdID0gW107XG4gICAgdGhpcy5fZGlzYWJsZWRIb3Vycy5tYXAoKGhvdXIsIGluZGV4KSA9PiAhaG91ciAmJiBhdmFpbGFibGVIb3Vycy5wdXNoKGluZGV4KSk7XG5cbiAgICBsZXQgdG9DaGFuZ2U7XG4gICAgbGV0IHZhbHVlID1cbiAgICAgIGtleSA9PT0gJ0Fycm93VXAnXG4gICAgICAgID8gYXZhaWxhYmxlSG91cnMuaW5kZXhPZihzZWxlY3RlZEhvdXIpICsgMVxuICAgICAgICA6IGF2YWlsYWJsZUhvdXJzLmluZGV4T2Yoc2VsZWN0ZWRIb3VyKSAtIDE7XG5cbiAgICB2YWx1ZSA9IHZhbHVlIDwgMCA/IGF2YWlsYWJsZUhvdXJzLmxlbmd0aCAtIDEgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IHZhbHVlID4gYXZhaWxhYmxlSG91cnMubGVuZ3RoIC0gMSA/IDAgOiB2YWx1ZTtcbiAgICB0b0NoYW5nZSA9IGF2YWlsYWJsZUhvdXJzW3ZhbHVlXTtcbiAgICBpZiAodGhpcy50d2VsdmVIb3VyKSB7XG4gICAgICBpZiAodG9DaGFuZ2UgPj0gMTIpIHtcbiAgICAgICAgdG9DaGFuZ2UgPSB0b0NoYW5nZSAtIDEyO1xuICAgICAgICBpZiAoYW1wbSA9PT0gJ0FNJykge1xuICAgICAgICAgIHRoaXMuX3NldEFtUG0oJ1BNJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodG9DaGFuZ2UgPD0gMCB8fCB0b0NoYW5nZSA8IDEyKSB7XG4gICAgICAgIGlmIChhbXBtID09PSAnUE0nKSB7XG4gICAgICAgICAgdGhpcy5fc2V0QW1QbSgnQU0nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9zaG93SG91cnNDbG9jaygpO1xuICAgIHRoaXMuX3NldEhvdXIodG9DaGFuZ2UpO1xuICAgIHRoaXMuX2NoZWNrRHJhdygpO1xuICB9XG5cbiAgcHVibGljIF9hcnJvd0NoYW5nZU1pbnV0ZShrZXk6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5fbWludXRlRGlnaXRhbERpc2FibGVkKSB7XG4gICAgICBpZiAodGhpcy5fc2hvd0hvdXJzKSB7XG4gICAgICAgIHRoaXMuX3Nob3dNaW51dGVzQ2xvY2soKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgbSB9ID0gdGhpcy5fc2VsZWN0ZWRUaW1lO1xuICAgICAgY29uc3QgYXZhaWxhYmxlTWludXRlczogbnVtYmVyW10gPSBbXTtcblxuICAgICAgdGhpcy5fZ2VuZXJhdGVNaW51dGVzRGlzYWJsZSgpO1xuICAgICAgdGhpcy5fZGlzYWJsZWRNaW51dGVzLm1hcCgoZGlzYWJsZWQsIGkpID0+IHtcbiAgICAgICAgaWYgKCFkaXNhYmxlZCkge1xuICAgICAgICAgIGF2YWlsYWJsZU1pbnV0ZXMucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGxldCB0b0NoYW5nZTtcbiAgICAgIGxldCB2YWx1ZSA9XG4gICAgICAgIGtleSA9PT0gJ0Fycm93VXAnXG4gICAgICAgICAgPyBhdmFpbGFibGVNaW51dGVzLmluZGV4T2YoTnVtYmVyKG0pKSArIDFcbiAgICAgICAgICA6IGF2YWlsYWJsZU1pbnV0ZXMuaW5kZXhPZihOdW1iZXIobSkpIC0gMTtcblxuICAgICAgdmFsdWUgPSB2YWx1ZSA8IDAgPyBhdmFpbGFibGVNaW51dGVzLmxlbmd0aCAtIDEgOiB2YWx1ZTtcbiAgICAgIHZhbHVlID0gdmFsdWUgPiBhdmFpbGFibGVNaW51dGVzLmxlbmd0aCAtIDEgPyAwIDogdmFsdWU7XG4gICAgICB0b0NoYW5nZSA9IGF2YWlsYWJsZU1pbnV0ZXNbdmFsdWVdO1xuICAgICAgdGhpcy5fc2V0TWludXRlKHRvQ2hhbmdlKTtcbiAgICAgIHRoaXMuX2NoZWNrRHJhdygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dlbmVyYXRlTWludXRlc0Rpc2FibGUoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2MDsgaSsrKSB7XG4gICAgICBjb25zdCBkaXNhYmxlQnlSb3VuZGluZyA9IHRoaXMucm91bmRpbmcgPiAxICYmIGkgJSB0aGlzLnJvdW5kaW5nICE9PSAwO1xuICAgICAgY29uc3QgZGlzYWJsZWQgPVxuICAgICAgICB0aGlzLl9yYW5nZU1pbnV0ZShpLCAnbWluJykgfHwgdGhpcy5fcmFuZ2VNaW51dGUoaSwgJ21heCcpIHx8IGRpc2FibGVCeVJvdW5kaW5nO1xuICAgICAgdGhpcy5fZGlzYWJsZWRNaW51dGVzW2ldID0gZGlzYWJsZWQ7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIF9zZXRIb3VyKGhvdXI6IG51bWJlcikge1xuICAgIGlmIChOdW1iZXIodGhpcy5fc2VsZWN0ZWRUaW1lLmgpICE9PSBob3VyKSB7XG4gICAgICBpZiAodGhpcy50d2VsdmVIb3VyKSB7XG4gICAgICAgIGhvdXIgPSBob3VyIDw9IDAgPyAxMiA6IGhvdXI7XG4gICAgICAgIGhvdXIgPSBob3VyID4gMTIgPyAxIDogaG91cjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhvdXIgPSBob3VyID49IDI0ID8gMCA6IGhvdXI7XG4gICAgICAgIGhvdXIgPSBob3VyIDw9IC0xID8gMjMgOiBob3VyO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9zZWxlY3RlZFRpbWUuaCA9IGhvdXIgPj0gMTAgPyBgJHtob3VyfWAgOiBgMCR7aG91cn1gO1xuICAgICAgdGhpcy5fc2V0TWludXRlRGlnaXRhbERpc2FibGVkKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0TWludXRlKG1pbjogbnVtYmVyKSB7XG4gICAgaWYgKE51bWJlcih0aGlzLl9zZWxlY3RlZFRpbWUubSkgIT09IG1pbikge1xuICAgICAgbWluID0gbWluID49IDYwID8gMCA6IG1pbjtcbiAgICAgIG1pbiA9IG1pbiA8PSAtMSA/IDU5IDogbWluO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRUaW1lLm0gPSBtaW4gPj0gMTAgPyBgJHttaW59YCA6IGAwJHttaW59YDtcbiAgICAgIHRoaXMuX3NldE9rQnRuRGlzYWJsZWQoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgX3NldEFtUG0oYW1wbTogQW1QbSkge1xuICAgIHRoaXMuX3NlbGVjdGVkVGltZS5hbXBtID0gYW1wbTtcbiAgICB0aGlzLl9nZW5lcmF0ZVRpY2soKTtcbiAgICB0aGlzLl9zZXRPa0J0bkRpc2FibGVkKCk7XG4gICAgdGhpcy5fc2V0TWludXRlRGlnaXRhbERpc2FibGVkKCk7XG4gICAgdGhpcy5fY2hlY2tEcmF3KCk7XG4gICAgdGhpcy5waWNrZXIuX2VtaXRUaW1lQ2hhbmdlRXZlbnQodGhpcy5fc2VsZWN0ZWRUaW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBfc2hvd0hvdXJzQ2xvY2soKSB7XG4gICAgdGhpcy5fZ2VuZXJhdGVUaWNrKCk7XG4gICAgdGhpcy5fc2hvd0hvdXJzID0gdHJ1ZTtcbiAgICB0aGlzLl9zZXRPa0J0bkRpc2FibGVkKCk7XG4gICAgdGhpcy5fY2hlY2tEcmF3KCk7XG4gIH1cblxuICBwdWJsaWMgX3Nob3dNaW51dGVzQ2xvY2soKSB7XG4gICAgaWYgKCF0aGlzLl9taW51dGVEaWdpdGFsRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX3Nob3dIb3VycyA9IGZhbHNlO1xuICAgICAgdGhpcy5fZ2VuZXJhdGVUaWNrKCk7XG4gICAgICB0aGlzLl9zZXRPa0J0bkRpc2FibGVkKCk7XG5cbiAgICAgIHRoaXMuX2dlbmVyYXRlTWludXRlc0Rpc2FibGUoKTtcbiAgICAgIGlmICh0aGlzLl9kaXNhYmxlZE1pbnV0ZXNbTnVtYmVyKHRoaXMuX3NlbGVjdGVkVGltZS5tKV0gPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5fc2V0TWludXRlKHRoaXMuX2Rpc2FibGVkTWludXRlcy5pbmRleE9mKGZhbHNlKSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2NoZWNrRHJhdygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dlbmVyYXRlVGljaygpIHtcbiAgICBpZiAodGhpcy50d2VsdmVIb3VyKSB7XG4gICAgICB0aGlzLl9ob3Vyc1RpY2tzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDEzOyBpKyspIHtcbiAgICAgICAgY29uc3QgcmFkaWFuID0gKGkgLyA2KSAqIE1hdGguUEk7XG5cbiAgICAgICAgY29uc3QgdGljayA9IHtcbiAgICAgICAgICBob3VyOiBpLnRvU3RyaW5nKCksXG4gICAgICAgICAgbGVmdDogdGhpcy5fcmFkaXVzLmRpYWwgKyBNYXRoLnNpbihyYWRpYW4pICogdGhpcy5fcmFkaXVzLm91dGVyIC0gdGhpcy5fcmFkaXVzLnRpY2ssXG4gICAgICAgICAgdG9wOiB0aGlzLl9yYWRpdXMuZGlhbCAtIE1hdGguY29zKHJhZGlhbikgKiB0aGlzLl9yYWRpdXMub3V0ZXIgLSB0aGlzLl9yYWRpdXMudGljayxcbiAgICAgICAgICBkaXNhYmxlZDogdGhpcy5fcmFuZ2VIb3VyKGksICdtaW4nKSB8fCB0aGlzLl9yYW5nZUhvdXIoaSwgJ21heCcpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9ob3Vyc1RpY2tzLnB1c2godGljayk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hvdXJzVGlja3MgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjQ7IGkrKykge1xuICAgICAgICBjb25zdCByYWRpYW4gPSAoaSAvIDYpICogTWF0aC5QSTtcbiAgICAgICAgY29uc3QgaW5uZXIgPSBpID4gMCAmJiBpIDwgMTM7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IGlubmVyID8gdGhpcy5fcmFkaXVzLmlubmVyIDogdGhpcy5fcmFkaXVzLm91dGVyO1xuICAgICAgICBjb25zdCBob3VyID0gaSA9PT0gMCA/ICcwJyArIGkudG9TdHJpbmcoKSA6IGkudG9TdHJpbmcoKTtcblxuICAgICAgICBjb25zdCB0aWNrID0ge1xuICAgICAgICAgIGhvdXIsXG4gICAgICAgICAgbGVmdDogdGhpcy5fcmFkaXVzLmRpYWwgKyBNYXRoLnNpbihyYWRpYW4pICogcmFkaXVzIC0gdGhpcy5fcmFkaXVzLnRpY2ssXG4gICAgICAgICAgdG9wOiB0aGlzLl9yYWRpdXMuZGlhbCAtIE1hdGguY29zKHJhZGlhbikgKiByYWRpdXMgLSB0aGlzLl9yYWRpdXMudGljayxcbiAgICAgICAgICBkaXNhYmxlZDogdGhpcy5fcmFuZ2VIb3VyKGksICdtaW4nKSB8fCB0aGlzLl9yYW5nZUhvdXIoaSwgJ21heCcpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9ob3Vyc1RpY2tzLnB1c2godGljayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fbWludXRlc1RpY2tzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2MDsgaSArPSA1KSB7XG4gICAgICBjb25zdCByYWRpYW4gPSAoaSAvIDMwKSAqIE1hdGguUEk7XG4gICAgICBjb25zdCBkaXNhYmxlQnlSb3VuZGluZyA9IHRoaXMucm91bmRpbmcgPiAxICYmIGkgJSB0aGlzLnJvdW5kaW5nICE9PSAwO1xuICAgICAgY29uc3QgbWluID0gaSA8IDEwID8gJzAnICsgaS50b1N0cmluZygpIDogaS50b1N0cmluZygpO1xuXG4gICAgICBjb25zdCB0aWNrID0ge1xuICAgICAgICBtaW4sXG4gICAgICAgIGxlZnQ6IHRoaXMuX3JhZGl1cy5kaWFsICsgTWF0aC5zaW4ocmFkaWFuKSAqIHRoaXMuX3JhZGl1cy5vdXRlciAtIHRoaXMuX3JhZGl1cy50aWNrLFxuICAgICAgICB0b3A6IHRoaXMuX3JhZGl1cy5kaWFsIC0gTWF0aC5jb3MocmFkaWFuKSAqIHRoaXMuX3JhZGl1cy5vdXRlciAtIHRoaXMuX3JhZGl1cy50aWNrLFxuICAgICAgICBkaXNhYmxlZDogdGhpcy5fcmFuZ2VNaW51dGUoaSwgJ21pbicpIHx8IHRoaXMuX3JhbmdlTWludXRlKGksICdtYXgnKSB8fCBkaXNhYmxlQnlSb3VuZGluZyxcbiAgICAgIH07XG4gICAgICB0aGlzLl9taW51dGVzVGlja3MucHVzaCh0aWNrKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldENsb2NrSGFuZCh4OiBhbnksIHk6IGFueSwgcm91bmRCeT86IG51bWJlcikge1xuICAgIGxldCByYWRpYW4gPSBNYXRoLmF0YW4yKHgsIC15KTtcbiAgICBjb25zdCBpc0hvdXJzID0gdGhpcy5fc2hvd0hvdXJzO1xuICAgIGNvbnN0IHVuaXQgPSBNYXRoLlBJIC8gKGlzSG91cnMgPyA2IDogcm91bmRCeSA/IHRoaXMuX2Rlbm9taW5hdG9yW3JvdW5kQnldIDogMzApO1xuICAgIGNvbnN0IHogPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG4gICAgY29uc3QgaW5uZXIgPSBpc0hvdXJzICYmIHogPCAodGhpcy5fcmFkaXVzLm91dGVyICsgdGhpcy5fcmFkaXVzLmlubmVyKSAvIDI7XG4gICAgbGV0IHZhbHVlID0gdGhpcy5fc2hvd0hvdXJzXG4gICAgICA/IHBhcnNlSW50KHRoaXMuX3NlbGVjdGVkVGltZS5oLCAwKVxuICAgICAgOiBwYXJzZUludCh0aGlzLl9zZWxlY3RlZFRpbWUubSwgMCk7XG4gICAgY29uc3QgcmFkaXVzID0gaW5uZXIgJiYgIXRoaXMudHdlbHZlSG91ciA/IHRoaXMuX3JhZGl1cy5pbm5lciA6IHRoaXMuX3JhZGl1cy5vdXRlcjtcblxuICAgIGlmIChyYWRpYW4gPCAwKSB7XG4gICAgICByYWRpYW4gPSBNYXRoLlBJICogMiArIHJhZGlhbjtcbiAgICB9XG5cbiAgICB2YWx1ZSA9IE1hdGgucm91bmQocmFkaWFuIC8gdW5pdCk7XG4gICAgcmFkaWFuID0gdmFsdWUgKiB1bml0O1xuXG4gICAgaWYgKHRoaXMudHdlbHZlSG91ciAmJiBpc0hvdXJzKSB7XG4gICAgICBpZiAodmFsdWUgPT09IDApIHtcbiAgICAgICAgdmFsdWUgPSAxMjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2lzTW91c2VEb3duKSB7XG4gICAgICAgIGlmIChpc0hvdXJzICYmICh0aGlzLl9yYW5nZUhvdXIodmFsdWUsICdtaW4nKSB8fCB0aGlzLl9yYW5nZUhvdXIodmFsdWUsICdtYXgnKSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCF0aGlzLnR3ZWx2ZUhvdXIgJiYgaXNIb3Vycykge1xuICAgICAgdmFsdWUgPSAhaW5uZXIgPyB2YWx1ZSArIDEyIDogdmFsdWU7XG4gICAgICB2YWx1ZSA9IHZhbHVlID09PSAyNCA/IDAgOiB2YWx1ZTtcbiAgICAgIHZhbHVlID0gaW5uZXIgJiYgdmFsdWUgPT09IDAgPyAxMiA6IHZhbHVlO1xuICAgICAgdmFsdWUgPSAhaW5uZXIgJiYgdmFsdWUgPT09IDEyID8gMCA6IHZhbHVlO1xuXG4gICAgICBpZiAodGhpcy5faXNNb3VzZURvd24pIHtcbiAgICAgICAgaWYgKGlzSG91cnMgJiYgKHRoaXMuX3JhbmdlSG91cih2YWx1ZSwgJ21pbicpIHx8IHRoaXMuX3JhbmdlSG91cih2YWx1ZSwgJ21heCcpKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocm91bmRCeSkge1xuICAgICAgICB2YWx1ZSAqPSByb3VuZEJ5O1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlID09PSA2MCkge1xuICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzSG91cnMpIHtcbiAgICAgIHRoaXMuZmcubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21kYi10aW1lcGlja2VyLWNhbnZhcy1mZycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fcmFuZ2VNaW51dGUodmFsdWUsICdtaW4nKSB8fCB0aGlzLl9yYW5nZU1pbnV0ZSh2YWx1ZSwgJ21heCcpKSB7XG4gICAgICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh2YWx1ZSAlIDUgPT09IDApIHtcbiAgICAgICAgdGhpcy5mZy5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWRiLXRpbWVwaWNrZXItY2FudmFzLWZnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZnLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtZGItdGltZXBpY2tlci1jYW52YXMtZmcgYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY3gxID0gTWF0aC5zaW4ocmFkaWFuKSAqIChyYWRpdXMgLSB0aGlzLl9yYWRpdXMudGljayksXG4gICAgICBjeTEgPSAtTWF0aC5jb3MocmFkaWFuKSAqIChyYWRpdXMgLSB0aGlzLl9yYWRpdXMudGljayksXG4gICAgICBjeDIgPSBNYXRoLnNpbihyYWRpYW4pICogcmFkaXVzLFxuICAgICAgY3kyID0gLU1hdGguY29zKHJhZGlhbikgKiByYWRpdXM7XG5cbiAgICB0aGlzLmhhbmQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3gyJywgY3gxKTtcbiAgICB0aGlzLmhhbmQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3kyJywgY3kxKTtcbiAgICB0aGlzLmJnLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjeCcsIGN4Mik7XG4gICAgdGhpcy5iZy5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnY3knLCBjeTIpO1xuICAgIHRoaXMuZmcubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2N4JywgY3gyKTtcbiAgICB0aGlzLmZnLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjeScsIGN5Mik7XG5cbiAgICBpZiAodGhpcy5fc2hvd0hvdXJzKSB7XG4gICAgICBpZiAodmFsdWUgIT09IE51bWJlcih0aGlzLl9zZWxlY3RlZFRpbWUuaCkpIHtcbiAgICAgICAgdGhpcy5fc2V0SG91cih2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3NldE1pbnV0ZURpZ2l0YWxEaXNhYmxlZCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodmFsdWUgIT09IE51bWJlcih0aGlzLl9zZWxlY3RlZFRpbWUubSkpIHtcbiAgICAgICAgdGhpcy5fc2V0TWludXRlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF90bzI0KHRpbWU6IFNlbGVjdGVkVGltZSk6IFNlbGVjdGVkVGltZSB7XG4gICAgbGV0IGhvdXIgPSB0aW1lLmFtcG0gPT09ICdQTScgPyBOdW1iZXIodGltZS5oKSArIDEyIDogTnVtYmVyKHRpbWUuaCk7XG4gICAgaG91ciA9IGhvdXIgPT09IDEyID8gMCA6IGhvdXI7XG4gICAgaG91ciA9IGhvdXIgPT09IDI0ID8gMTIgOiBob3VyO1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aW1lLFxuICAgICAgaDogYCR7aG91cn1gLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9yYW5nZUhvdXIoaW5kZXg6IG51bWJlciwgcmFuZ2U6ICdtaW4nIHwgJ21heCcpIHtcbiAgICBsZXQgc3RhdHVzID0gZmFsc2U7XG4gICAgY29uc3QgaSA9IE51bWJlcih0aGlzLl90bzI0KHsgLi4udGhpcy5fc2VsZWN0ZWRUaW1lLCBoOiBgJHtpbmRleH1gIH0pLmgpO1xuXG4gICAgaWYgKCF0aGlzLnR3ZWx2ZUhvdXIpIHtcbiAgICAgIGNvbnN0IG1pbkggPSB0aGlzLm1pbiAmJiBOdW1iZXIodGhpcy5fbWluLmgpO1xuICAgICAgY29uc3QgbWF4SCA9IHRoaXMubWF4ICYmIE51bWJlcih0aGlzLl9tYXguaCk7XG5cbiAgICAgIGlmIChyYW5nZSA9PT0gJ21pbicgJiYgdGhpcy5taW4pIHtcbiAgICAgICAgc3RhdHVzID0gaW5kZXggPCBtaW5IO1xuXG4gICAgICAgIGlmIChzdGF0dXMgJiYgdGhpcy5fbWF4ICYmIHRoaXMuX21heC5oIDwgdGhpcy5fbWluLmgpIHtcbiAgICAgICAgICBzdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChyYW5nZSA9PT0gJ21heCcgJiYgdGhpcy5tYXgpIHtcbiAgICAgICAgc3RhdHVzID0gaW5kZXggPiBtYXhIO1xuXG4gICAgICAgIGlmIChzdGF0dXMgJiYgdGhpcy5fbWluICYmIHRoaXMuX21pbi5oID4gdGhpcy5fbWF4LmggJiYgbWluSCA8PSBpbmRleCkge1xuICAgICAgICAgIHN0YXR1cyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1pbiA9IHRoaXMuX21pbiAmJiBOdW1iZXIodGhpcy5fdG8yNCh0aGlzLl9taW4pLmgpO1xuICAgICAgY29uc3QgbWF4ID0gdGhpcy5fbWF4ICYmIE51bWJlcih0aGlzLl90bzI0KHRoaXMuX21heCkuaCk7XG4gICAgICBpZiAocmFuZ2UgPT09ICdtaW4nICYmIHRoaXMubWluKSB7XG4gICAgICAgIHN0YXR1cyA9IGkgPCBtaW47XG4gICAgICB9XG5cbiAgICAgIGlmIChyYW5nZSA9PT0gJ21heCcgJiYgdGhpcy5tYXgpIHtcbiAgICAgICAgc3RhdHVzID0gaSA+IG1heDtcbiAgICAgIH1cblxuICAgICAgaWYgKG1pbiA+IG1heCkge1xuICAgICAgICBzdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgc3RhdHVzID0gbWluID4gaSAmJiBpID4gbWF4O1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2Rpc2FibGVkSG91cnNbaV0gPSBzdGF0dXM7XG5cbiAgICByZXR1cm4gc3RhdHVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmFuZ2VNaW51dGUoaW5kZXg6IG51bWJlciwgcmFuZ2U6ICdtaW4nIHwgJ21heCcpIHtcbiAgICBsZXQgc3RhdHVzID0gZmFsc2U7XG4gICAgaWYgKCF0aGlzLl9zaG93SG91cnMpIHtcbiAgICAgIGlmIChyYW5nZSA9PT0gJ21pbicgJiYgdGhpcy5taW4pIHtcbiAgICAgICAgY29uc3QgaXNTYW1lSG91ciA9IHRoaXMuX21pbi5oID09PSB0aGlzLl9zZWxlY3RlZFRpbWUuaDtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBpbmRleCA8IE51bWJlcih0aGlzLl9taW4ubSk7XG4gICAgICAgIHN0YXR1cyA9IHZhbHVlICYmIGlzU2FtZUhvdXI7XG4gICAgICB9IGVsc2UgaWYgKHJhbmdlID09PSAnbWF4JyAmJiB0aGlzLm1heCkge1xuICAgICAgICBjb25zdCBpc1NhbWVIb3VyID0gdGhpcy5fbWF4LmggPT09IHRoaXMuX3NlbGVjdGVkVGltZS5oO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGluZGV4ID4gTnVtYmVyKHRoaXMuX21heC5tKTtcbiAgICAgICAgc3RhdHVzID0gdmFsdWUgJiYgaXNTYW1lSG91cjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy50d2VsdmVIb3VyKSB7XG4gICAgICBjb25zdCBtaW4gPSB0aGlzLl9taW4gJiYgTnVtYmVyKHRoaXMuX3RvMjQodGhpcy5fbWluKS5oKTtcbiAgICAgIGNvbnN0IG1heCA9IHRoaXMuX21heCAmJiBOdW1iZXIodGhpcy5fdG8yNCh0aGlzLl9tYXgpLmgpO1xuICAgICAgY29uc3QgaSA9IE51bWJlcih0aGlzLl90bzI0KHRoaXMuX3NlbGVjdGVkVGltZSkuaCk7XG5cbiAgICAgIGlmIChyYW5nZSA9PT0gJ21pbicgJiYgbWluKSB7XG4gICAgICAgIHN0YXR1cyA9IGkgPT09IG1pbiAmJiBpbmRleCA8IE51bWJlcih0aGlzLl9taW4ubSk7XG4gICAgICB9IGVsc2UgaWYgKHJhbmdlID09PSAnbWF4JyAmJiBtYXgpIHtcbiAgICAgICAgc3RhdHVzID0gaSA9PT0gbWF4ICYmIGluZGV4ID4gTnVtYmVyKHRoaXMuX21heC5tKTtcbiAgICAgIH1cbiAgICAgIHN0YXR1cyA9IHN0YXR1cyB8fCB0aGlzLl9kaXNhYmxlZEhvdXJzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBzdGF0dXM7XG4gIH1cblxuICBwcml2YXRlIF9zZXRPa0J0bkRpc2FibGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IGhvdXIgPSBOdW1iZXIodGhpcy5fdG8yNCh0aGlzLl9zZWxlY3RlZFRpbWUpLmgpO1xuICAgIHRoaXMuX29rQnV0dG9uRGlzYWJsZWQgPSB0aGlzLl9kaXNhYmxlZEhvdXJzW2hvdXJdO1xuXG4gICAgaWYgKCF0aGlzLl9va0J1dHRvbkRpc2FibGVkKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuX21pbiAmJlxuICAgICAgICB0aGlzLl9zZWxlY3RlZFRpbWUuaCA9PT0gdGhpcy5fbWluLmggJiZcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRUaW1lLmFtcG0gPT09IHRoaXMuX21pbi5hbXBtXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fb2tCdXR0b25EaXNhYmxlZCA9IHRoaXMuX3NlbGVjdGVkVGltZS5tIDwgdGhpcy5fbWluLm07XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5fbWF4ICYmXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkVGltZS5oID09PSB0aGlzLl9tYXguaCAmJlxuICAgICAgICB0aGlzLl9zZWxlY3RlZFRpbWUuYW1wbSA9PT0gdGhpcy5fbWF4LmFtcG1cbiAgICAgICkge1xuICAgICAgICB0aGlzLl9va0J1dHRvbkRpc2FibGVkID0gdGhpcy5fc2VsZWN0ZWRUaW1lLm0gPiB0aGlzLl9tYXgubTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcHJpdmF0ZSBfc2V0TWludXRlRGlnaXRhbERpc2FibGVkKCkge1xuICAgIGNvbnN0IHsgaCB9ID0gdGhpcy5fdG8yNCh0aGlzLl9zZWxlY3RlZFRpbWUpO1xuICAgIHRoaXMuX21pbnV0ZURpZ2l0YWxEaXNhYmxlZCA9IHRoaXMuX2Rpc2FibGVkSG91cnNbTnVtYmVyKGgpXTtcbiAgfVxufVxuIl19