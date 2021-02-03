import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, NgZone, Renderer2, ViewChild, ViewEncapsulation, } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
export class MdbTimePickerContentComponent {
    constructor(_cdRef, _ngZone, focusMonitor, elem, renderer, _document) {
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
        this._setOkBtnDisabled = () => {
            const hour = Number(this._to24(this._selectedTime).h);
            this._okButtonDisabled = this._disabledHours[hour];
            if (!this._okButtonDisabled) {
                if (this._min &&
                    this._selectedTime.h === this._min.h &&
                    this._selectedTime.ampm === this._min.ampm) {
                    this._okButtonDisabled = this._selectedTime.m < this._min.m;
                }
                if (this._max &&
                    this._selectedTime.h === this._max.h &&
                    this._selectedTime.ampm === this._max.ampm) {
                    this._okButtonDisabled = this._selectedTime.m > this._max.m;
                }
            }
        };
    }
    ngOnInit() {
        this._max = this.max;
        this._min = this.min;
        this._selectedTime = this.value;
        const { ampm } = this._selectedTime;
        // Add disabled hours to array for PM and AM Hours
        if (this.twelveHour) {
            this._selectedTime.ampm = ampm === 'PM' ? 'AM' : 'PM';
            this._generateTick();
            this._selectedTime.ampm = this._selectedTime.ampm === 'PM' ? 'AM' : 'PM';
        }
        this._generateTick();
        this._setOkBtnDisabled();
        this._setMinuteDigitalDisabled();
    }
    ngAfterViewInit() {
        ['mousedown', 'mouseup', 'touchend', 'touchstart'].forEach((event) => {
            this.renderer.listen(this.plate.nativeElement, event, (ev) => {
                if (event === 'mousedown' || event === 'touchstart') {
                    this._mousedown(ev, false);
                }
            });
        });
        this._checkDraw();
        setTimeout(() => {
            this.focusMonitor.focusVia(this.focus, 'keyboard');
        }, 0);
    }
    _checkDraw() {
        const { h, m } = this._selectedTime;
        const value = this._showHours ? parseInt(h, 0) : parseInt(m, 0);
        const unit = Math.PI / (this._showHours ? 6 : 30), radian = value * unit, radius = this._showHours && value > 0 && value < 13 ? this._radius.inner : this._radius.outer, xd = Math.sin(radian) * radius, yd = -Math.cos(radian) * radius;
        this.setClockHand(xd, yd);
    }
    _mousedown(e, space) {
        this._isMouseDown = true;
        const offset = this.plate.nativeElement.getBoundingClientRect(), isTouch = /^touch/.test(e.type), x0 = offset.left + this._radius.dial, y0 = offset.top + this._radius.dial, dx = (isTouch ? e.touches[0] : e).clientX - x0, dy = (isTouch ? e.touches[0] : e).clientY - y0, z = Math.sqrt(dx * dx + dy * dy);
        let moved = false;
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
        const mousemoveEventMethod = (event) => {
            if (!this.touchSupported) {
                event.preventDefault();
            }
            event.stopPropagation();
            // tslint:disable-next-line:no-shadowed-variable
            const isTouch = /^touch/.test(event.type), x = (isTouch ? event.touches[0] : event).clientX - x0, y = (isTouch ? event.touches[0] : event).clientY - y0;
            if (!moved && x === dx && y === dy) {
                return;
            }
            moved = true;
            this._ngZone.run(() => {
                this.setClockHand(x, y, this.rounding);
            });
        };
        const mouseupEventMethod = (event) => {
            this._document.removeEventListener('mousemove', mousemoveEventMethod);
            if (this.touchSupported) {
                this._document.removeEventListener('touchmove', mousemoveEventMethod);
            }
            if (!this.touchSupported) {
                event.preventDefault();
            }
            const x = event.clientX - x0, y = event.clientY - y0;
            if ((space || moved) && x === dx && y === dy) {
                this.setClockHand(x, y);
            }
            this._ngZone.run(() => {
                if (this.autoClose && !this._showHours) {
                    this._okBtnClicked();
                }
            });
            this._showMinutesClock();
            this.digitalMinute.nativeElement.focus();
            this._isMouseDown = false;
            this._document.removeEventListener('mouseup', mouseupEventMethod);
            if (this.touchSupported) {
                this._document.removeEventListener('touchend', mouseupEventMethod);
            }
            this.picker._emitTimeChangeEvent(this._selectedTime);
        };
        this._document.addEventListener('mousemove', mousemoveEventMethod);
        if (this.touchSupported) {
            this._document.addEventListener('touchmove', mousemoveEventMethod);
        }
        this._document.addEventListener('mouseup', mouseupEventMethod);
        if (this.touchSupported) {
            this._document.addEventListener('touchend', mouseupEventMethod);
        }
    }
    _closeBtnClicked() {
        // todo this.isOpen = false;
        const { ampm, h, m } = this._selectedTime;
        this._returnHours = this.twelveHour ? `${h}:${m}${ampm}` : `${h}:${m}${ampm}`;
        this.picker.close(false);
    }
    _clearBtnClicked() {
        this._setAmPm('AM');
        this._setHour(12);
        this._setMinute(0);
        this._generateTick();
        this._showHoursClock();
        this.picker._setValue('');
        this.picker._selectionChange$.next('');
    }
    _okBtnClicked() {
        if (!this._okButtonDisabled) {
            const { ampm, h, m } = this._selectedTime;
            this._returnHours = this.twelveHour ? `${h}:${m}${ampm}` : `${h}:${m}${ampm}`;
            this.picker._setValue(this._returnHours);
            this.picker._emitTimeDoneEvent(this._selectedTime);
            this.picker.onChangeCb(this._returnHours);
            this.picker.close(true);
        }
    }
    _arrowChangeHour(key) {
        const { h, ampm } = this._to24(this._selectedTime);
        const selectedHour = Number(h);
        const availableHours = [];
        this._disabledHours.map((hour, index) => !hour && availableHours.push(index));
        let toChange;
        let value = key === 'ArrowUp'
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
    }
    _arrowChangeMinute(key) {
        if (!this._minuteDigitalDisabled) {
            if (this._showHours) {
                this._showMinutesClock();
            }
            const { m } = this._selectedTime;
            const availableMinutes = [];
            this._generateMinutesDisable();
            this._disabledMinutes.map((disabled, i) => {
                if (!disabled) {
                    availableMinutes.push(i);
                }
            });
            let toChange;
            let value = key === 'ArrowUp'
                ? availableMinutes.indexOf(Number(m)) + 1
                : availableMinutes.indexOf(Number(m)) - 1;
            value = value < 0 ? availableMinutes.length - 1 : value;
            value = value > availableMinutes.length - 1 ? 0 : value;
            toChange = availableMinutes[value];
            this._setMinute(toChange);
            this._checkDraw();
        }
    }
    _generateMinutesDisable() {
        for (let i = 0; i < 60; i++) {
            const disableByRounding = this.rounding > 1 && i % this.rounding !== 0;
            const disabled = this._rangeMinute(i, 'min') || this._rangeMinute(i, 'max') || disableByRounding;
            this._disabledMinutes[i] = disabled;
        }
    }
    _setHour(hour) {
        if (Number(this._selectedTime.h) !== hour) {
            if (this.twelveHour) {
                hour = hour <= 0 ? 12 : hour;
                hour = hour > 12 ? 1 : hour;
            }
            else {
                hour = hour >= 24 ? 0 : hour;
                hour = hour <= -1 ? 23 : hour;
            }
            this._selectedTime.h = hour >= 10 ? `${hour}` : `0${hour}`;
            this._setMinuteDigitalDisabled();
        }
    }
    _setMinute(min) {
        if (Number(this._selectedTime.m) !== min) {
            min = min >= 60 ? 0 : min;
            min = min <= -1 ? 59 : min;
            this._selectedTime.m = min >= 10 ? `${min}` : `0${min}`;
            this._setOkBtnDisabled();
        }
    }
    _setAmPm(ampm) {
        this._selectedTime.ampm = ampm;
        this._generateTick();
        this._setOkBtnDisabled();
        this._setMinuteDigitalDisabled();
        this._checkDraw();
        this.picker._emitTimeChangeEvent(this._selectedTime);
    }
    _showHoursClock() {
        this._generateTick();
        this._showHours = true;
        this._setOkBtnDisabled();
        this._checkDraw();
    }
    _showMinutesClock() {
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
    }
    _generateTick() {
        if (this.twelveHour) {
            this._hoursTicks = [];
            for (let i = 1; i < 13; i++) {
                const radian = (i / 6) * Math.PI;
                const tick = {
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
            for (let i = 0; i < 24; i++) {
                const radian = (i / 6) * Math.PI;
                const inner = i > 0 && i < 13;
                const radius = inner ? this._radius.inner : this._radius.outer;
                const hour = i === 0 ? '0' + i.toString() : i.toString();
                const tick = {
                    hour,
                    left: this._radius.dial + Math.sin(radian) * radius - this._radius.tick,
                    top: this._radius.dial - Math.cos(radian) * radius - this._radius.tick,
                    disabled: this._rangeHour(i, 'min') || this._rangeHour(i, 'max'),
                };
                this._hoursTicks.push(tick);
            }
        }
        this._minutesTicks = [];
        for (let i = 0; i < 60; i += 5) {
            const radian = (i / 30) * Math.PI;
            const disableByRounding = this.rounding > 1 && i % this.rounding !== 0;
            const min = i < 10 ? '0' + i.toString() : i.toString();
            const tick = {
                min,
                left: this._radius.dial + Math.sin(radian) * this._radius.outer - this._radius.tick,
                top: this._radius.dial - Math.cos(radian) * this._radius.outer - this._radius.tick,
                disabled: this._rangeMinute(i, 'min') || this._rangeMinute(i, 'max') || disableByRounding,
            };
            this._minutesTicks.push(tick);
        }
    }
    setClockHand(x, y, roundBy) {
        let radian = Math.atan2(x, -y);
        const isHours = this._showHours;
        const unit = Math.PI / (isHours ? 6 : roundBy ? this._denominator[roundBy] : 30);
        const z = Math.sqrt(x * x + y * y);
        const inner = isHours && z < (this._radius.outer + this._radius.inner) / 2;
        let value = this._showHours
            ? parseInt(this._selectedTime.h, 0)
            : parseInt(this._selectedTime.m, 0);
        const radius = inner && !this.twelveHour ? this._radius.inner : this._radius.outer;
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
        const cx1 = Math.sin(radian) * (radius - this._radius.tick), cy1 = -Math.cos(radian) * (radius - this._radius.tick), cx2 = Math.sin(radian) * radius, cy2 = -Math.cos(radian) * radius;
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
    }
    _to24(time) {
        let hour = time.ampm === 'PM' ? Number(time.h) + 12 : Number(time.h);
        hour = hour === 12 ? 0 : hour;
        hour = hour === 24 ? 12 : hour;
        return Object.assign(Object.assign({}, time), { h: `${hour}` });
    }
    _rangeHour(index, range) {
        let status = false;
        const i = Number(this._to24(Object.assign(Object.assign({}, this._selectedTime), { h: `${index}` })).h);
        if (!this.twelveHour) {
            const minH = this.min && Number(this._min.h);
            const maxH = this.max && Number(this._max.h);
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
            const min = this._min && Number(this._to24(this._min).h);
            const max = this._max && Number(this._to24(this._max).h);
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
    }
    _rangeMinute(index, range) {
        let status = false;
        if (!this._showHours) {
            if (range === 'min' && this.min) {
                const isSameHour = this._min.h === this._selectedTime.h;
                const value = index < Number(this._min.m);
                status = value && isSameHour;
            }
            else if (range === 'max' && this.max) {
                const isSameHour = this._max.h === this._selectedTime.h;
                const value = index > Number(this._max.m);
                status = value && isSameHour;
            }
        }
        if (this.twelveHour) {
            const min = this._min && Number(this._to24(this._min).h);
            const max = this._max && Number(this._to24(this._max).h);
            const i = Number(this._to24(this._selectedTime).h);
            if (range === 'min' && min) {
                status = i === min && index < Number(this._min.m);
            }
            else if (range === 'max' && max) {
                status = i === max && index > Number(this._max.m);
            }
            status = status || this._disabledHours[i];
        }
        return status;
    }
    _setMinuteDigitalDisabled() {
        const { h } = this._to24(this._selectedTime);
        this._minuteDigitalDisabled = this._disabledHours[Number(h)];
    }
}
MdbTimePickerContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-timepicker-content',
                template: "<div class=\"mdb-timepicker-modal\" cdkTrapFocus>\n  <!-- HEADER -->\n  <div class=\"mdb-timepicker-header\">\n    <!-- TIME -->\n    <div class=\"mdb-timepicker-time\">\n      <span\n        (click)=\"_showHoursClock()\"\n        (keydown.arrowdown)=\"_arrowChangeHour($event.key)\"\n        (keydown.arrowup)=\"_arrowChangeHour($event.key)\"\n        (keydown.enter)=\"_showHoursClock()\"\n        [ngClass]=\"{ active: _showHours }\"\n        class=\"hour-digital\"\n        #focus\n        tabindex=\"0\"\n      >\n        {{ _selectedTime.h }}</span\n      >:<span\n        (click)=\"_showMinutesClock()\"\n        (keydown.arrowdown)=\"_arrowChangeMinute($event.key)\"\n        (keydown.arrowup)=\"_arrowChangeMinute($event.key)\"\n        (keydown.enter)=\"_showMinutesClock()\"\n        [ngClass]=\"{ 'active': !_showHours, 'disabled': _minuteDigitalDisabled }\"\n        class=\"minute-digital\"\n        #digitalMinute\n        tabindex=\"0\"\n        >{{ _selectedTime.m }}</span\n      >\n    </div>\n    <div class=\"mdb-timepicker-ampm\" *ngIf=\"twelveHour\">\n      <span\n        (click)=\"_setAmPm('AM')\"\n        (keydown.enter)=\"_setAmPm('AM')\"\n        [ngClass]=\"{ active: _selectedTime.ampm == 'AM' }\"\n        tabindex=\"0\"\n        >AM</span\n      >\n      <span\n        (click)=\"_setAmPm('PM')\"\n        (keydown.enter)=\"_setAmPm('PM')\"\n        [ngClass]=\"{ active: _selectedTime.ampm == 'PM' }\"\n        tabindex=\"0\"\n        >PM</span\n      >\n    </div>\n  </div>\n  <!-- /Header -->\n  <!-- Body -->\n  <div class=\"mdb-timepicker-body\">\n    <div class=\"mdb-timepicker-plate\" #plate>\n      <div class=\"mdb-timepicker-canvas\">\n        <svg class=\"mdb-timepicker-svg\" width=\"270\" height=\"270\" #svg>\n          <g transform=\"translate(135,135)\" #g>\n            <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"-90\" #hand></line>\n            <circle class=\"mdb-timepicker-canvas-fg\" r=\"5\" cx=\"0\" cy=\"-110\" #fg></circle>\n            <circle class=\"mdb-timepicker-canvas-bg\" r=\"20\" cx=\"0\" cy=\"-110\" #bg></circle>\n            <circle class=\"mdb-timepicker-canvas-bearing\" cx=\"0\" cy=\"0\" r=\"2\" #bearing></circle>\n          </g>\n        </svg>\n      </div>\n\n      <div\n        [ngClass]=\"{ 'mdb-timepicker-dial-out': !_showHours }\"\n        [ngStyle]=\"{ visibility: !_showHours ? 'hidden' : 'visible' }\"\n        #hoursPlate\n        class=\"mdb-timepicker-dial mdb-timepicker-hours\"\n      >\n        <div\n          [ngClass]=\"{ disabled: tick.disabled }\"\n          [ngStyle]=\"{ left: tick.left + 'px', top: tick.top + 'px' }\"\n          *ngFor=\"let tick of _hoursTicks\"\n          class=\"mdb-timepicker-tick\"\n          id=\"{{ tick.hour }}\"\n          style=\"font-size: 140%;\"\n        >\n          {{ tick.hour }}\n        </div>\n      </div>\n      <div\n        [ngClass]=\"{ 'mdb-timepicker-dial-out': _showHours }\"\n        [ngStyle]=\"{ visibility: _showHours ? 'hidden' : 'visible' }\"\n        #minutesPlate\n        class=\"mdb-timepicker-dial mdb-timepicker-minutes\"\n      >\n        <div\n          [ngClass]=\"{ disabled: tick.disabled }\"\n          [ngStyle]=\"{ left: tick.left + 'px', top: tick.top + 'px' }\"\n          *ngFor=\"let tick of _minutesTicks\"\n          class=\"mdb-timepicker-tick\"\n          style=\"font-size: 120%;\"\n        >\n          {{ tick.min }}\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- /Boody -->\n  <!-- Footer -->\n  <div class=\"mdb-timepicker-footer\">\n    <button\n      (click)=\"_clearBtnClicked()\"\n      *ngIf=\"clearButton\"\n      class=\"mdb-timepicker-btn mdb-timepicker-clear\"\n      mdbWavesEffect\n      type=\"button\"\n    >\n      {{ clearButton }}\n    </button>\n    <button\n      (click)=\"_closeBtnClicked()\"\n      *ngIf=\"closeButton\"\n      class=\"mdb-timepicker-btn mdb-timepicker-close\"\n      mdbWavesEffect\n      type=\"button\"\n    >\n      {{ closeButton }}\n    </button>\n    <button\n      (click)=\"_okBtnClicked()\"\n      [ngClass]=\"{ disabled: _okButtonDisabled }\"\n      class=\"mdb-timepicker-btn mdb-timepicker-ok\"\n      mdbWavesEffect\n      type=\"button\"\n    >\n      {{ okButton }}\n    </button>\n  </div>\n  <!-- /Footer -->\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["@-webkit-keyframes pulse{0%{transform:scaleX(1)}50%{transform:scale3d(1.1,1.1,1.1)}to{transform:scaleX(1)}}@keyframes pulse{0%{transform:scaleX(1)}50%{transform:scale3d(1.1,1.1,1.1)}to{transform:scaleX(1)}}.disabled{cursor:default;opacity:.5}.mdb-timepicker-modal{background:#fff;background-color:#fff;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);display:table-cell;min-width:328px;vertical-align:middle}@media (min-height:28.875em){.mdb-timepicker-modal{border-color:#898989 #777 #777;border-radius:5px 5px 0 0;border-style:solid;border-width:1px 1px 0;box-shadow:0 .75rem 2.25rem 1rem rgba(0,0,0,.24);display:block}}.mdb-timepicker-header{align-items:center;background-color:#4285f4;box-sizing:border-box;color:hsla(0,0%,100%,.55);display:flex;height:120px;justify-content:center;padding:24px}.mdb-timepicker-time{color:hsla(0,0%,100%,.65);font-size:70px}.mdb-timepicker-ampm{display:flex;flex-direction:column;font-size:18px;height:100%;justify-content:space-around;margin-left:15px}span{cursor:pointer}span.active{color:#fff}.mdb-timepicker-tick{background-color:rgba(0,150,136,0);border-radius:50%;color:#666;cursor:pointer;height:2.5rem;line-height:2.5rem;position:absolute;text-align:center;transition:background-color .3s;transition:.3s;width:2.5rem}.mdb-timepicker-tick:hover{background-color:rgba(0,150,136,.25)}.mdb-timepicker-footer{display:flex;justify-content:flex-end;padding:12px;width:100%}.mdb-timepicker-btn{background:transparent;border:0;border-radius:4px;min-width:64px;padding:6px 8px;text-transform:uppercase;transition:.3s}.mdb-timepicker-btn:not(.mdb-timepicker-btn.mdb-timepicker-clear){margin-left:8px}.mdb-timepicker-btn.mdb-timepicker-clear{margin-right:auto}.mdb-timepicker-btn:hover{background-color:rgba(0,150,136,.25)}.mdb-timepicker-plate{-moz-user-select:none;-webkit-user-select:none;background-color:#eee;border-radius:50%;height:270px;margin:20px auto auto;overflow:visible;position:relative;user-select:none;width:270px}.mdb-timepicker-plate .mdb-timepicker-minutes{visibility:hidden}.mdb-timepicker-plate .mdb-timepicker-dial-out{opacity:0}.mdb-timepicker-plate .mdb-timepicker-hours.mdb-timepicker-dial-out{transform:scale(1.2)}.mdb-timepicker-plate .mdb-timepicker-minutes.mdb-timepicker-dial-out{transform:scale(.8)}.mdb-timepicker-canvas,.mdb-timepicker-dial{height:270px;left:-1px;position:absolute;top:-1px;width:270px}.mdb-timepicker-dial{transition:transform .35s,opacity .35s}.mdb-timepicker-dial .mdb-timepicker-tick{background-color:rgba(0,150,136,0);border-radius:50%;color:#666;cursor:pointer;height:40px;line-height:2.5rem;position:absolute;text-align:center;transition:background-color .3s;width:40px}.mdb-timepicker-dial .mdb-timepicker-tick.active,.mdb-timepicker-dial .mdb-timepicker-tick:hover{background-color:rgba(0,150,136,.25)}.mdb-timepicker-canvas{transition:opacity .3s}.mdb-timepicker-canvas line{stroke:rgba(0,150,136,.25);stroke-width:1}.mdb-timepicker-canvas-out{opacity:.25}.mdb-timepicker-canvas-bearing{fill:rgba(0,77,64,.75);stroke:none}.mdb-timepicker-canvas-fg{fill:rgba(0,77,64,0);stroke:none}.mdb-timepicker-canvas-fg.active{fill:rgba(0,77,64,.5)}.mdb-timepicker-canvas-bg{fill:rgba(0,150,136,.25);stroke:none}.mdb-timepicker-canvas-bg-trans{fill:rgba(0,150,136,.25)}"]
            },] }
];
MdbTimePickerContentComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: FocusMonitor },
    { type: ElementRef },
    { type: Renderer2 },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
MdbTimePickerContentComponent.propDecorators = {
    plate: [{ type: ViewChild, args: ['plate', { static: false },] }],
    hand: [{ type: ViewChild, args: ['hand', { static: false },] }],
    fg: [{ type: ViewChild, args: ['fg', { static: false },] }],
    bg: [{ type: ViewChild, args: ['bg', { static: false },] }],
    focus: [{ type: ViewChild, args: ['focus', { static: false },] }],
    digitalMinute: [{ type: ViewChild, args: ['digitalMinute', { static: false },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb250ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctdWlraXQtcHJvLXN0YW5kYXJkL3NyYy9saWIvcHJvL3RpbWVwaWNrZXIvdGltZXBpY2tlci5jb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixNQUFNLEVBRU4sU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBb0JqRCxNQUFNLE9BQU8sNkJBQTZCO0lBb0R4QyxZQUNVLE1BQXlCLEVBQ3pCLE9BQWUsRUFDaEIsWUFBMEIsRUFDMUIsSUFBZ0IsRUFDaEIsUUFBbUIsRUFDQSxTQUFjO1FBTGhDLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3pCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ0EsY0FBUyxHQUFULFNBQVMsQ0FBSztRQW5DbEMsbUJBQWMsR0FBYyxFQUFFLENBQUM7UUFDL0IscUJBQWdCLEdBQWMsRUFBRSxDQUFDO1FBQ2pDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLDJCQUFzQixHQUFHLEtBQUssQ0FBQztRQUMvQixrQkFBYSxHQUFhLEVBQUUsQ0FBQztRQUM3QixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFFMUIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUVqQixZQUFPLEdBQVc7WUFD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QUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUF5Qk8seUJBQXlCO1FBQy9CLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7WUF4bEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxvcklBQXdDO2dCQUV4QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7WUE3QkMsaUJBQWlCO1lBSWpCLE1BQU07WUFNQyxZQUFZO1lBUm5CLFVBQVU7WUFJVixTQUFTOzRDQWtGTixNQUFNLFNBQUMsUUFBUTs7O29CQXpEakIsU0FBUyxTQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7bUJBQ3BDLFNBQVMsU0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2lCQUNuQyxTQUFTLFNBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtpQkFDakMsU0FBUyxTQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7b0JBQ2pDLFNBQVMsU0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzRCQUNwQyxTQUFTLFNBQUMsZUFBZSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIE5nWm9uZSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgQW1QbSxcbiAgQ2xlYXJCdXR0b24sXG4gIENsb3NlQnV0dG9uLFxuICBIb3VyLFxuICBNaW51dGUsXG4gIFJhZGl1cyxcbiAgUm91bmRpbmcsXG4gIFNlbGVjdGVkVGltZSxcbn0gZnJvbSAnLi90aW1lcGlja2VyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBNZGJUaW1lUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lcGlja2VyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi10aW1lcGlja2VyLWNvbnRlbnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGltZXBpY2tlci5jb250ZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90aW1lLXBpY2tlci1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWRiVGltZVBpY2tlckNvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdwbGF0ZScsIHsgc3RhdGljOiBmYWxzZSB9KSBwbGF0ZTogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnaGFuZCcsIHsgc3RhdGljOiBmYWxzZSB9KSBoYW5kOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdmZycsIHsgc3RhdGljOiBmYWxzZSB9KSBmZzogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnYmcnLCB7IHN0YXRpYzogZmFsc2UgfSkgYmc6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2ZvY3VzJywgeyBzdGF0aWM6IGZhbHNlIH0pIGZvY3VzOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdkaWdpdGFsTWludXRlJywgeyBzdGF0aWM6IGZhbHNlIH0pIGRpZ2l0YWxNaW51dGU6IEVsZW1lbnRSZWY7XG5cbiAgYXV0b0Nsb3NlOiBib29sZWFuO1xuICBjbGVhckJ1dHRvbjogQ2xlYXJCdXR0b247XG4gIGNsb3NlQnV0dG9uOiBDbG9zZUJ1dHRvbjtcbiAgbWF4OiBTZWxlY3RlZFRpbWU7XG4gIG1pbjogU2VsZWN0ZWRUaW1lO1xuICBva0J1dHRvbjogc3RyaW5nO1xuICBwaWNrZXI6IE1kYlRpbWVQaWNrZXJDb21wb25lbnQ7XG4gIHJvdW5kaW5nOiBSb3VuZGluZztcbiAgdHdlbHZlSG91cjogYm9vbGVhbjtcbiAgdmFsdWU6IFNlbGVjdGVkVGltZTtcblxuICBwcml2YXRlIF9tYXg6IFNlbGVjdGVkVGltZTtcbiAgcHJpdmF0ZSBfbWluOiBTZWxlY3RlZFRpbWU7XG4gIHByaXZhdGUgX3JldHVybkhvdXJzOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZWRIb3VyczogYm9vbGVhbltdID0gW107XG4gIHByaXZhdGUgX2Rpc2FibGVkTWludXRlczogYm9vbGVhbltdID0gW107XG4gIHByaXZhdGUgX2lzTW91c2VEb3duID0gZmFsc2U7XG4gIHB1YmxpYyBfaG91cnNUaWNrczogSG91cltdID0gW107XG4gIHB1YmxpYyBfbWludXRlRGlnaXRhbERpc2FibGVkID0gZmFsc2U7XG4gIHB1YmxpYyBfbWludXRlc1RpY2tzOiBNaW51dGVbXSA9IFtdO1xuICBwdWJsaWMgX29rQnV0dG9uRGlzYWJsZWQgPSBmYWxzZTtcbiAgcHVibGljIF9zZWxlY3RlZFRpbWU6IFNlbGVjdGVkVGltZTtcbiAgcHVibGljIF9zaG93SG91cnMgPSB0cnVlO1xuXG4gIHByaXZhdGUgX3JhZGl1czogUmFkaXVzID0ge1xuICAgIGRpYWw6IDEzNSxcbiAgICBpbm5lcjogODAsXG4gICAgb3V0ZXI6IDExMCxcbiAgICB0aWNrOiAyMCxcbiAgfTtcblxuICBwcml2YXRlIF9kZW5vbWluYXRvcjogeyBba2V5OiBudW1iZXJdOiBudW1iZXIgfSA9IHtcbiAgICAxOiAzMCxcbiAgICA1OiA2LFxuICAgIDEwOiAzLFxuICAgIDE1OiAyLFxuICAgIDIwOiAxLjUsXG4gICAgLy8gMzA6IDEsXG4gICAgLy8gNjA6IDAuNVxuICB9O1xuXG4gIHByaXZhdGUgdG91Y2hTdXBwb3J0ZWQ6IGJvb2xlYW4gPSAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3c7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgIHB1YmxpYyBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICBwdWJsaWMgZWxlbTogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55XG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9tYXggPSB0aGlzLm1heDtcbiAgICB0aGlzLl9taW4gPSB0aGlzLm1pbjtcbiAgICB0aGlzLl9zZWxlY3RlZFRpbWUgPSB0aGlzLnZhbHVlO1xuICAgIGNvbnN0IHsgYW1wbSB9ID0gdGhpcy5fc2VsZWN0ZWRUaW1lO1xuXG4gICAgLy8gQWRkIGRpc2FibGVkIGhvdXJzIHRvIGFycmF5IGZvciBQTSBhbmQgQU0gSG91cnNcbiAgICBpZiAodGhpcy50d2VsdmVIb3VyKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZFRpbWUuYW1wbSA9IGFtcG0gPT09ICdQTScgPyAnQU0nIDogJ1BNJztcbiAgICAgIHRoaXMuX2dlbmVyYXRlVGljaygpO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRUaW1lLmFtcG0gPSB0aGlzLl9zZWxlY3RlZFRpbWUuYW1wbSA9PT0gJ1BNJyA/ICdBTScgOiAnUE0nO1xuICAgIH1cbiAgICB0aGlzLl9nZW5lcmF0ZVRpY2soKTtcbiAgICB0aGlzLl9zZXRPa0J0bkRpc2FibGVkKCk7XG4gICAgdGhpcy5fc2V0TWludXRlRGlnaXRhbERpc2FibGVkKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgWydtb3VzZWRvd24nLCAnbW91c2V1cCcsICd0b3VjaGVuZCcsICd0b3VjaHN0YXJ0J10uZm9yRWFjaCgoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5wbGF0ZS5uYXRpdmVFbGVtZW50LCBldmVudCwgKGV2OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50ID09PSAnbW91c2Vkb3duJyB8fCBldmVudCA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgICAgICAgdGhpcy5fbW91c2Vkb3duKGV2LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuX2NoZWNrRHJhdygpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5mb2N1c01vbml0b3IuZm9jdXNWaWEodGhpcy5mb2N1cywgJ2tleWJvYXJkJyk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBwcml2YXRlIF9jaGVja0RyYXcoKSB7XG4gICAgY29uc3QgeyBoLCBtIH0gPSB0aGlzLl9zZWxlY3RlZFRpbWU7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLl9zaG93SG91cnMgPyBwYXJzZUludChoLCAwKSA6IHBhcnNlSW50KG0sIDApO1xuXG4gICAgY29uc3QgdW5pdCA9IE1hdGguUEkgLyAodGhpcy5fc2hvd0hvdXJzID8gNiA6IDMwKSxcbiAgICAgIHJhZGlhbiA9IHZhbHVlICogdW5pdCxcbiAgICAgIHJhZGl1cyA9IHRoaXMuX3Nob3dIb3VycyAmJiB2YWx1ZSA+IDAgJiYgdmFsdWUgPCAxMyA/IHRoaXMuX3JhZGl1cy5pbm5lciA6IHRoaXMuX3JhZGl1cy5vdXRlcixcbiAgICAgIHhkID0gTWF0aC5zaW4ocmFkaWFuKSAqIHJhZGl1cyxcbiAgICAgIHlkID0gLU1hdGguY29zKHJhZGlhbikgKiByYWRpdXM7XG5cbiAgICB0aGlzLnNldENsb2NrSGFuZCh4ZCwgeWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbW91c2Vkb3duKGU6IGFueSwgc3BhY2U/OiBhbnkpIHtcbiAgICB0aGlzLl9pc01vdXNlRG93biA9IHRydWU7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5wbGF0ZS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgaXNUb3VjaCA9IC9edG91Y2gvLnRlc3QoZS50eXBlKSxcbiAgICAgIHgwID0gb2Zmc2V0LmxlZnQgKyB0aGlzLl9yYWRpdXMuZGlhbCxcbiAgICAgIHkwID0gb2Zmc2V0LnRvcCArIHRoaXMuX3JhZGl1cy5kaWFsLFxuICAgICAgZHggPSAoaXNUb3VjaCA/IGUudG91Y2hlc1swXSA6IGUpLmNsaWVudFggLSB4MCxcbiAgICAgIGR5ID0gKGlzVG91Y2ggPyBlLnRvdWNoZXNbMF0gOiBlKS5jbGllbnRZIC0geTAsXG4gICAgICB6ID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICBsZXQgbW92ZWQgPSBmYWxzZTtcblxuICAgIGlmIChcbiAgICAgIHNwYWNlICYmXG4gICAgICAoeiA8IHRoaXMuX3JhZGl1cy5vdXRlciAtIHRoaXMuX3JhZGl1cy50aWNrIHx8IHogPiB0aGlzLl9yYWRpdXMub3V0ZXIgKyB0aGlzLl9yYWRpdXMudGljaylcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5fc2hvd0hvdXJzKSB7XG4gICAgICB0aGlzLnNldENsb2NrSGFuZChkeCwgZHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldENsb2NrSGFuZChkeCwgZHksIHRoaXMucm91bmRpbmcpO1xuICAgIH1cblxuICAgIGNvbnN0IG1vdXNlbW92ZUV2ZW50TWV0aG9kID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgIGlmICghdGhpcy50b3VjaFN1cHBvcnRlZCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc2hhZG93ZWQtdmFyaWFibGVcbiAgICAgIGNvbnN0IGlzVG91Y2ggPSAvXnRvdWNoLy50ZXN0KGV2ZW50LnR5cGUpLFxuICAgICAgICB4ID0gKGlzVG91Y2ggPyBldmVudC50b3VjaGVzWzBdIDogZXZlbnQpLmNsaWVudFggLSB4MCxcbiAgICAgICAgeSA9IChpc1RvdWNoID8gZXZlbnQudG91Y2hlc1swXSA6IGV2ZW50KS5jbGllbnRZIC0geTA7XG4gICAgICBpZiAoIW1vdmVkICYmIHggPT09IGR4ICYmIHkgPT09IGR5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIG1vdmVkID0gdHJ1ZTtcblxuICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0Q2xvY2tIYW5kKHgsIHksIHRoaXMucm91bmRpbmcpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG1vdXNldXBFdmVudE1ldGhvZCA9IChldmVudDogYW55KSA9PiB7XG4gICAgICB0aGlzLl9kb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmVFdmVudE1ldGhvZCk7XG4gICAgICBpZiAodGhpcy50b3VjaFN1cHBvcnRlZCkge1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBtb3VzZW1vdmVFdmVudE1ldGhvZCk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMudG91Y2hTdXBwb3J0ZWQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHggPSBldmVudC5jbGllbnRYIC0geDAsXG4gICAgICAgIHkgPSBldmVudC5jbGllbnRZIC0geTA7XG5cbiAgICAgIGlmICgoc3BhY2UgfHwgbW92ZWQpICYmIHggPT09IGR4ICYmIHkgPT09IGR5KSB7XG4gICAgICAgIHRoaXMuc2V0Q2xvY2tIYW5kKHgsIHkpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b0Nsb3NlICYmICF0aGlzLl9zaG93SG91cnMpIHtcbiAgICAgICAgICB0aGlzLl9va0J0bkNsaWNrZWQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX3Nob3dNaW51dGVzQ2xvY2soKTtcbiAgICAgIHRoaXMuZGlnaXRhbE1pbnV0ZS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgIHRoaXMuX2lzTW91c2VEb3duID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuX2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwRXZlbnRNZXRob2QpO1xuICAgICAgaWYgKHRoaXMudG91Y2hTdXBwb3J0ZWQpIHtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBtb3VzZXVwRXZlbnRNZXRob2QpO1xuICAgICAgfVxuICAgICAgdGhpcy5waWNrZXIuX2VtaXRUaW1lQ2hhbmdlRXZlbnQodGhpcy5fc2VsZWN0ZWRUaW1lKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlRXZlbnRNZXRob2QpO1xuICAgIGlmICh0aGlzLnRvdWNoU3VwcG9ydGVkKSB7XG4gICAgICB0aGlzLl9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBtb3VzZW1vdmVFdmVudE1ldGhvZCk7XG4gICAgfVxuICAgIHRoaXMuX2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwRXZlbnRNZXRob2QpO1xuICAgIGlmICh0aGlzLnRvdWNoU3VwcG9ydGVkKSB7XG4gICAgICB0aGlzLl9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG1vdXNldXBFdmVudE1ldGhvZCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIF9jbG9zZUJ0bkNsaWNrZWQoKSB7XG4gICAgLy8gdG9kbyB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIGNvbnN0IHsgYW1wbSwgaCwgbSB9ID0gdGhpcy5fc2VsZWN0ZWRUaW1lO1xuICAgIHRoaXMuX3JldHVybkhvdXJzID0gdGhpcy50d2VsdmVIb3VyID8gYCR7aH06JHttfSR7YW1wbX1gIDogYCR7aH06JHttfSR7YW1wbX1gO1xuXG4gICAgdGhpcy5waWNrZXIuY2xvc2UoZmFsc2UpO1xuICB9XG5cbiAgcHVibGljIF9jbGVhckJ0bkNsaWNrZWQoKSB7XG4gICAgdGhpcy5fc2V0QW1QbSgnQU0nKTtcbiAgICB0aGlzLl9zZXRIb3VyKDEyKTtcbiAgICB0aGlzLl9zZXRNaW51dGUoMCk7XG4gICAgdGhpcy5fZ2VuZXJhdGVUaWNrKCk7XG4gICAgdGhpcy5fc2hvd0hvdXJzQ2xvY2soKTtcbiAgICB0aGlzLnBpY2tlci5fc2V0VmFsdWUoJycpO1xuICAgIHRoaXMucGlja2VyLl9zZWxlY3Rpb25DaGFuZ2UkLm5leHQoJycpO1xuICB9XG5cbiAgcHVibGljIF9va0J0bkNsaWNrZWQoKSB7XG4gICAgaWYgKCF0aGlzLl9va0J1dHRvbkRpc2FibGVkKSB7XG4gICAgICBjb25zdCB7IGFtcG0sIGgsIG0gfSA9IHRoaXMuX3NlbGVjdGVkVGltZTtcbiAgICAgIHRoaXMuX3JldHVybkhvdXJzID0gdGhpcy50d2VsdmVIb3VyID8gYCR7aH06JHttfSR7YW1wbX1gIDogYCR7aH06JHttfSR7YW1wbX1gO1xuXG4gICAgICB0aGlzLnBpY2tlci5fc2V0VmFsdWUodGhpcy5fcmV0dXJuSG91cnMpO1xuICAgICAgdGhpcy5waWNrZXIuX2VtaXRUaW1lRG9uZUV2ZW50KHRoaXMuX3NlbGVjdGVkVGltZSk7XG4gICAgICB0aGlzLnBpY2tlci5vbkNoYW5nZUNiKHRoaXMuX3JldHVybkhvdXJzKTtcbiAgICAgIHRoaXMucGlja2VyLmNsb3NlKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBfYXJyb3dDaGFuZ2VIb3VyKGtleTogc3RyaW5nKSB7XG4gICAgY29uc3QgeyBoLCBhbXBtIH0gPSB0aGlzLl90bzI0KHRoaXMuX3NlbGVjdGVkVGltZSk7XG4gICAgY29uc3Qgc2VsZWN0ZWRIb3VyID0gTnVtYmVyKGgpO1xuICAgIGNvbnN0IGF2YWlsYWJsZUhvdXJzOiBudW1iZXJbXSA9IFtdO1xuICAgIHRoaXMuX2Rpc2FibGVkSG91cnMubWFwKChob3VyLCBpbmRleCkgPT4gIWhvdXIgJiYgYXZhaWxhYmxlSG91cnMucHVzaChpbmRleCkpO1xuXG4gICAgbGV0IHRvQ2hhbmdlO1xuICAgIGxldCB2YWx1ZSA9XG4gICAgICBrZXkgPT09ICdBcnJvd1VwJ1xuICAgICAgICA/IGF2YWlsYWJsZUhvdXJzLmluZGV4T2Yoc2VsZWN0ZWRIb3VyKSArIDFcbiAgICAgICAgOiBhdmFpbGFibGVIb3Vycy5pbmRleE9mKHNlbGVjdGVkSG91cikgLSAxO1xuXG4gICAgdmFsdWUgPSB2YWx1ZSA8IDAgPyBhdmFpbGFibGVIb3Vycy5sZW5ndGggLSAxIDogdmFsdWU7XG4gICAgdmFsdWUgPSB2YWx1ZSA+IGF2YWlsYWJsZUhvdXJzLmxlbmd0aCAtIDEgPyAwIDogdmFsdWU7XG4gICAgdG9DaGFuZ2UgPSBhdmFpbGFibGVIb3Vyc1t2YWx1ZV07XG4gICAgaWYgKHRoaXMudHdlbHZlSG91cikge1xuICAgICAgaWYgKHRvQ2hhbmdlID49IDEyKSB7XG4gICAgICAgIHRvQ2hhbmdlID0gdG9DaGFuZ2UgLSAxMjtcbiAgICAgICAgaWYgKGFtcG0gPT09ICdBTScpIHtcbiAgICAgICAgICB0aGlzLl9zZXRBbVBtKCdQTScpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRvQ2hhbmdlIDw9IDAgfHwgdG9DaGFuZ2UgPCAxMikge1xuICAgICAgICBpZiAoYW1wbSA9PT0gJ1BNJykge1xuICAgICAgICAgIHRoaXMuX3NldEFtUG0oJ0FNJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fc2hvd0hvdXJzQ2xvY2soKTtcbiAgICB0aGlzLl9zZXRIb3VyKHRvQ2hhbmdlKTtcbiAgICB0aGlzLl9jaGVja0RyYXcoKTtcbiAgfVxuXG4gIHB1YmxpYyBfYXJyb3dDaGFuZ2VNaW51dGUoa2V5OiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuX21pbnV0ZURpZ2l0YWxEaXNhYmxlZCkge1xuICAgICAgaWYgKHRoaXMuX3Nob3dIb3Vycykge1xuICAgICAgICB0aGlzLl9zaG93TWludXRlc0Nsb2NrKCk7XG4gICAgICB9XG4gICAgICBjb25zdCB7IG0gfSA9IHRoaXMuX3NlbGVjdGVkVGltZTtcbiAgICAgIGNvbnN0IGF2YWlsYWJsZU1pbnV0ZXM6IG51bWJlcltdID0gW107XG5cbiAgICAgIHRoaXMuX2dlbmVyYXRlTWludXRlc0Rpc2FibGUoKTtcbiAgICAgIHRoaXMuX2Rpc2FibGVkTWludXRlcy5tYXAoKGRpc2FibGVkLCBpKSA9PiB7XG4gICAgICAgIGlmICghZGlzYWJsZWQpIHtcbiAgICAgICAgICBhdmFpbGFibGVNaW51dGVzLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBsZXQgdG9DaGFuZ2U7XG4gICAgICBsZXQgdmFsdWUgPVxuICAgICAgICBrZXkgPT09ICdBcnJvd1VwJ1xuICAgICAgICAgID8gYXZhaWxhYmxlTWludXRlcy5pbmRleE9mKE51bWJlcihtKSkgKyAxXG4gICAgICAgICAgOiBhdmFpbGFibGVNaW51dGVzLmluZGV4T2YoTnVtYmVyKG0pKSAtIDE7XG5cbiAgICAgIHZhbHVlID0gdmFsdWUgPCAwID8gYXZhaWxhYmxlTWludXRlcy5sZW5ndGggLSAxIDogdmFsdWU7XG4gICAgICB2YWx1ZSA9IHZhbHVlID4gYXZhaWxhYmxlTWludXRlcy5sZW5ndGggLSAxID8gMCA6IHZhbHVlO1xuICAgICAgdG9DaGFuZ2UgPSBhdmFpbGFibGVNaW51dGVzW3ZhbHVlXTtcbiAgICAgIHRoaXMuX3NldE1pbnV0ZSh0b0NoYW5nZSk7XG4gICAgICB0aGlzLl9jaGVja0RyYXcoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9nZW5lcmF0ZU1pbnV0ZXNEaXNhYmxlKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjA7IGkrKykge1xuICAgICAgY29uc3QgZGlzYWJsZUJ5Um91bmRpbmcgPSB0aGlzLnJvdW5kaW5nID4gMSAmJiBpICUgdGhpcy5yb3VuZGluZyAhPT0gMDtcbiAgICAgIGNvbnN0IGRpc2FibGVkID1cbiAgICAgICAgdGhpcy5fcmFuZ2VNaW51dGUoaSwgJ21pbicpIHx8IHRoaXMuX3JhbmdlTWludXRlKGksICdtYXgnKSB8fCBkaXNhYmxlQnlSb3VuZGluZztcbiAgICAgIHRoaXMuX2Rpc2FibGVkTWludXRlc1tpXSA9IGRpc2FibGVkO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBfc2V0SG91cihob3VyOiBudW1iZXIpIHtcbiAgICBpZiAoTnVtYmVyKHRoaXMuX3NlbGVjdGVkVGltZS5oKSAhPT0gaG91cikge1xuICAgICAgaWYgKHRoaXMudHdlbHZlSG91cikge1xuICAgICAgICBob3VyID0gaG91ciA8PSAwID8gMTIgOiBob3VyO1xuICAgICAgICBob3VyID0gaG91ciA+IDEyID8gMSA6IGhvdXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBob3VyID0gaG91ciA+PSAyNCA/IDAgOiBob3VyO1xuICAgICAgICBob3VyID0gaG91ciA8PSAtMSA/IDIzIDogaG91cjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc2VsZWN0ZWRUaW1lLmggPSBob3VyID49IDEwID8gYCR7aG91cn1gIDogYDAke2hvdXJ9YDtcbiAgICAgIHRoaXMuX3NldE1pbnV0ZURpZ2l0YWxEaXNhYmxlZCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NldE1pbnV0ZShtaW46IG51bWJlcikge1xuICAgIGlmIChOdW1iZXIodGhpcy5fc2VsZWN0ZWRUaW1lLm0pICE9PSBtaW4pIHtcbiAgICAgIG1pbiA9IG1pbiA+PSA2MCA/IDAgOiBtaW47XG4gICAgICBtaW4gPSBtaW4gPD0gLTEgPyA1OSA6IG1pbjtcbiAgICAgIHRoaXMuX3NlbGVjdGVkVGltZS5tID0gbWluID49IDEwID8gYCR7bWlufWAgOiBgMCR7bWlufWA7XG4gICAgICB0aGlzLl9zZXRPa0J0bkRpc2FibGVkKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIF9zZXRBbVBtKGFtcG06IEFtUG0pIHtcbiAgICB0aGlzLl9zZWxlY3RlZFRpbWUuYW1wbSA9IGFtcG07XG4gICAgdGhpcy5fZ2VuZXJhdGVUaWNrKCk7XG4gICAgdGhpcy5fc2V0T2tCdG5EaXNhYmxlZCgpO1xuICAgIHRoaXMuX3NldE1pbnV0ZURpZ2l0YWxEaXNhYmxlZCgpO1xuICAgIHRoaXMuX2NoZWNrRHJhdygpO1xuICAgIHRoaXMucGlja2VyLl9lbWl0VGltZUNoYW5nZUV2ZW50KHRoaXMuX3NlbGVjdGVkVGltZSk7XG4gIH1cblxuICBwdWJsaWMgX3Nob3dIb3Vyc0Nsb2NrKCkge1xuICAgIHRoaXMuX2dlbmVyYXRlVGljaygpO1xuICAgIHRoaXMuX3Nob3dIb3VycyA9IHRydWU7XG4gICAgdGhpcy5fc2V0T2tCdG5EaXNhYmxlZCgpO1xuICAgIHRoaXMuX2NoZWNrRHJhdygpO1xuICB9XG5cbiAgcHVibGljIF9zaG93TWludXRlc0Nsb2NrKCkge1xuICAgIGlmICghdGhpcy5fbWludXRlRGlnaXRhbERpc2FibGVkKSB7XG4gICAgICB0aGlzLl9zaG93SG91cnMgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2dlbmVyYXRlVGljaygpO1xuICAgICAgdGhpcy5fc2V0T2tCdG5EaXNhYmxlZCgpO1xuXG4gICAgICB0aGlzLl9nZW5lcmF0ZU1pbnV0ZXNEaXNhYmxlKCk7XG4gICAgICBpZiAodGhpcy5fZGlzYWJsZWRNaW51dGVzW051bWJlcih0aGlzLl9zZWxlY3RlZFRpbWUubSldID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuX3NldE1pbnV0ZSh0aGlzLl9kaXNhYmxlZE1pbnV0ZXMuaW5kZXhPZihmYWxzZSkpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jaGVja0RyYXcoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9nZW5lcmF0ZVRpY2soKSB7XG4gICAgaWYgKHRoaXMudHdlbHZlSG91cikge1xuICAgICAgdGhpcy5faG91cnNUaWNrcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMzsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHJhZGlhbiA9IChpIC8gNikgKiBNYXRoLlBJO1xuXG4gICAgICAgIGNvbnN0IHRpY2sgPSB7XG4gICAgICAgICAgaG91cjogaS50b1N0cmluZygpLFxuICAgICAgICAgIGxlZnQ6IHRoaXMuX3JhZGl1cy5kaWFsICsgTWF0aC5zaW4ocmFkaWFuKSAqIHRoaXMuX3JhZGl1cy5vdXRlciAtIHRoaXMuX3JhZGl1cy50aWNrLFxuICAgICAgICAgIHRvcDogdGhpcy5fcmFkaXVzLmRpYWwgLSBNYXRoLmNvcyhyYWRpYW4pICogdGhpcy5fcmFkaXVzLm91dGVyIC0gdGhpcy5fcmFkaXVzLnRpY2ssXG4gICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuX3JhbmdlSG91cihpLCAnbWluJykgfHwgdGhpcy5fcmFuZ2VIb3VyKGksICdtYXgnKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5faG91cnNUaWNrcy5wdXNoKHRpY2spO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9ob3Vyc1RpY2tzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI0OyBpKyspIHtcbiAgICAgICAgY29uc3QgcmFkaWFuID0gKGkgLyA2KSAqIE1hdGguUEk7XG4gICAgICAgIGNvbnN0IGlubmVyID0gaSA+IDAgJiYgaSA8IDEzO1xuICAgICAgICBjb25zdCByYWRpdXMgPSBpbm5lciA/IHRoaXMuX3JhZGl1cy5pbm5lciA6IHRoaXMuX3JhZGl1cy5vdXRlcjtcbiAgICAgICAgY29uc3QgaG91ciA9IGkgPT09IDAgPyAnMCcgKyBpLnRvU3RyaW5nKCkgOiBpLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgY29uc3QgdGljayA9IHtcbiAgICAgICAgICBob3VyLFxuICAgICAgICAgIGxlZnQ6IHRoaXMuX3JhZGl1cy5kaWFsICsgTWF0aC5zaW4ocmFkaWFuKSAqIHJhZGl1cyAtIHRoaXMuX3JhZGl1cy50aWNrLFxuICAgICAgICAgIHRvcDogdGhpcy5fcmFkaXVzLmRpYWwgLSBNYXRoLmNvcyhyYWRpYW4pICogcmFkaXVzIC0gdGhpcy5fcmFkaXVzLnRpY2ssXG4gICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuX3JhbmdlSG91cihpLCAnbWluJykgfHwgdGhpcy5fcmFuZ2VIb3VyKGksICdtYXgnKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5faG91cnNUaWNrcy5wdXNoKHRpY2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX21pbnV0ZXNUaWNrcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjA7IGkgKz0gNSkge1xuICAgICAgY29uc3QgcmFkaWFuID0gKGkgLyAzMCkgKiBNYXRoLlBJO1xuICAgICAgY29uc3QgZGlzYWJsZUJ5Um91bmRpbmcgPSB0aGlzLnJvdW5kaW5nID4gMSAmJiBpICUgdGhpcy5yb3VuZGluZyAhPT0gMDtcbiAgICAgIGNvbnN0IG1pbiA9IGkgPCAxMCA/ICcwJyArIGkudG9TdHJpbmcoKSA6IGkudG9TdHJpbmcoKTtcblxuICAgICAgY29uc3QgdGljayA9IHtcbiAgICAgICAgbWluLFxuICAgICAgICBsZWZ0OiB0aGlzLl9yYWRpdXMuZGlhbCArIE1hdGguc2luKHJhZGlhbikgKiB0aGlzLl9yYWRpdXMub3V0ZXIgLSB0aGlzLl9yYWRpdXMudGljayxcbiAgICAgICAgdG9wOiB0aGlzLl9yYWRpdXMuZGlhbCAtIE1hdGguY29zKHJhZGlhbikgKiB0aGlzLl9yYWRpdXMub3V0ZXIgLSB0aGlzLl9yYWRpdXMudGljayxcbiAgICAgICAgZGlzYWJsZWQ6IHRoaXMuX3JhbmdlTWludXRlKGksICdtaW4nKSB8fCB0aGlzLl9yYW5nZU1pbnV0ZShpLCAnbWF4JykgfHwgZGlzYWJsZUJ5Um91bmRpbmcsXG4gICAgICB9O1xuICAgICAgdGhpcy5fbWludXRlc1RpY2tzLnB1c2godGljayk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRDbG9ja0hhbmQoeDogYW55LCB5OiBhbnksIHJvdW5kQnk/OiBudW1iZXIpIHtcbiAgICBsZXQgcmFkaWFuID0gTWF0aC5hdGFuMih4LCAteSk7XG4gICAgY29uc3QgaXNIb3VycyA9IHRoaXMuX3Nob3dIb3VycztcbiAgICBjb25zdCB1bml0ID0gTWF0aC5QSSAvIChpc0hvdXJzID8gNiA6IHJvdW5kQnkgPyB0aGlzLl9kZW5vbWluYXRvcltyb3VuZEJ5XSA6IDMwKTtcbiAgICBjb25zdCB6ID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xuICAgIGNvbnN0IGlubmVyID0gaXNIb3VycyAmJiB6IDwgKHRoaXMuX3JhZGl1cy5vdXRlciArIHRoaXMuX3JhZGl1cy5pbm5lcikgLyAyO1xuICAgIGxldCB2YWx1ZSA9IHRoaXMuX3Nob3dIb3Vyc1xuICAgICAgPyBwYXJzZUludCh0aGlzLl9zZWxlY3RlZFRpbWUuaCwgMClcbiAgICAgIDogcGFyc2VJbnQodGhpcy5fc2VsZWN0ZWRUaW1lLm0sIDApO1xuICAgIGNvbnN0IHJhZGl1cyA9IGlubmVyICYmICF0aGlzLnR3ZWx2ZUhvdXIgPyB0aGlzLl9yYWRpdXMuaW5uZXIgOiB0aGlzLl9yYWRpdXMub3V0ZXI7XG5cbiAgICBpZiAocmFkaWFuIDwgMCkge1xuICAgICAgcmFkaWFuID0gTWF0aC5QSSAqIDIgKyByYWRpYW47XG4gICAgfVxuXG4gICAgdmFsdWUgPSBNYXRoLnJvdW5kKHJhZGlhbiAvIHVuaXQpO1xuICAgIHJhZGlhbiA9IHZhbHVlICogdW5pdDtcblxuICAgIGlmICh0aGlzLnR3ZWx2ZUhvdXIgJiYgaXNIb3Vycykge1xuICAgICAgaWYgKHZhbHVlID09PSAwKSB7XG4gICAgICAgIHZhbHVlID0gMTI7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9pc01vdXNlRG93bikge1xuICAgICAgICBpZiAoaXNIb3VycyAmJiAodGhpcy5fcmFuZ2VIb3VyKHZhbHVlLCAnbWluJykgfHwgdGhpcy5fcmFuZ2VIb3VyKHZhbHVlLCAnbWF4JykpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghdGhpcy50d2VsdmVIb3VyICYmIGlzSG91cnMpIHtcbiAgICAgIHZhbHVlID0gIWlubmVyID8gdmFsdWUgKyAxMiA6IHZhbHVlO1xuICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gMjQgPyAwIDogdmFsdWU7XG4gICAgICB2YWx1ZSA9IGlubmVyICYmIHZhbHVlID09PSAwID8gMTIgOiB2YWx1ZTtcbiAgICAgIHZhbHVlID0gIWlubmVyICYmIHZhbHVlID09PSAxMiA/IDAgOiB2YWx1ZTtcblxuICAgICAgaWYgKHRoaXMuX2lzTW91c2VEb3duKSB7XG4gICAgICAgIGlmIChpc0hvdXJzICYmICh0aGlzLl9yYW5nZUhvdXIodmFsdWUsICdtaW4nKSB8fCB0aGlzLl9yYW5nZUhvdXIodmFsdWUsICdtYXgnKSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJvdW5kQnkpIHtcbiAgICAgICAgdmFsdWUgKj0gcm91bmRCeTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSA9PT0gNjApIHtcbiAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc0hvdXJzKSB7XG4gICAgICB0aGlzLmZnLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdtZGItdGltZXBpY2tlci1jYW52YXMtZmcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX3JhbmdlTWludXRlKHZhbHVlLCAnbWluJykgfHwgdGhpcy5fcmFuZ2VNaW51dGUodmFsdWUsICdtYXgnKSkge1xuICAgICAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodmFsdWUgJSA1ID09PSAwKSB7XG4gICAgICAgIHRoaXMuZmcubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ21kYi10aW1lcGlja2VyLWNhbnZhcy1mZycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mZy5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbWRiLXRpbWVwaWNrZXItY2FudmFzLWZnIGFjdGl2ZScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGN4MSA9IE1hdGguc2luKHJhZGlhbikgKiAocmFkaXVzIC0gdGhpcy5fcmFkaXVzLnRpY2spLFxuICAgICAgY3kxID0gLU1hdGguY29zKHJhZGlhbikgKiAocmFkaXVzIC0gdGhpcy5fcmFkaXVzLnRpY2spLFxuICAgICAgY3gyID0gTWF0aC5zaW4ocmFkaWFuKSAqIHJhZGl1cyxcbiAgICAgIGN5MiA9IC1NYXRoLmNvcyhyYWRpYW4pICogcmFkaXVzO1xuXG4gICAgdGhpcy5oYW5kLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd4MicsIGN4MSk7XG4gICAgdGhpcy5oYW5kLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd5MicsIGN5MSk7XG4gICAgdGhpcy5iZy5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnY3gnLCBjeDIpO1xuICAgIHRoaXMuYmcubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2N5JywgY3kyKTtcbiAgICB0aGlzLmZnLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjeCcsIGN4Mik7XG4gICAgdGhpcy5mZy5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnY3knLCBjeTIpO1xuXG4gICAgaWYgKHRoaXMuX3Nob3dIb3Vycykge1xuICAgICAgaWYgKHZhbHVlICE9PSBOdW1iZXIodGhpcy5fc2VsZWN0ZWRUaW1lLmgpKSB7XG4gICAgICAgIHRoaXMuX3NldEhvdXIodmFsdWUpO1xuICAgICAgICB0aGlzLl9zZXRNaW51dGVEaWdpdGFsRGlzYWJsZWQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHZhbHVlICE9PSBOdW1iZXIodGhpcy5fc2VsZWN0ZWRUaW1lLm0pKSB7XG4gICAgICAgIHRoaXMuX3NldE1pbnV0ZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdG8yNCh0aW1lOiBTZWxlY3RlZFRpbWUpOiBTZWxlY3RlZFRpbWUge1xuICAgIGxldCBob3VyID0gdGltZS5hbXBtID09PSAnUE0nID8gTnVtYmVyKHRpbWUuaCkgKyAxMiA6IE51bWJlcih0aW1lLmgpO1xuICAgIGhvdXIgPSBob3VyID09PSAxMiA/IDAgOiBob3VyO1xuICAgIGhvdXIgPSBob3VyID09PSAyNCA/IDEyIDogaG91cjtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGltZSxcbiAgICAgIGg6IGAke2hvdXJ9YCxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfcmFuZ2VIb3VyKGluZGV4OiBudW1iZXIsIHJhbmdlOiAnbWluJyB8ICdtYXgnKSB7XG4gICAgbGV0IHN0YXR1cyA9IGZhbHNlO1xuICAgIGNvbnN0IGkgPSBOdW1iZXIodGhpcy5fdG8yNCh7IC4uLnRoaXMuX3NlbGVjdGVkVGltZSwgaDogYCR7aW5kZXh9YCB9KS5oKTtcblxuICAgIGlmICghdGhpcy50d2VsdmVIb3VyKSB7XG4gICAgICBjb25zdCBtaW5IID0gdGhpcy5taW4gJiYgTnVtYmVyKHRoaXMuX21pbi5oKTtcbiAgICAgIGNvbnN0IG1heEggPSB0aGlzLm1heCAmJiBOdW1iZXIodGhpcy5fbWF4LmgpO1xuXG4gICAgICBpZiAocmFuZ2UgPT09ICdtaW4nICYmIHRoaXMubWluKSB7XG4gICAgICAgIHN0YXR1cyA9IGluZGV4IDwgbWluSDtcblxuICAgICAgICBpZiAoc3RhdHVzICYmIHRoaXMuX21heCAmJiB0aGlzLl9tYXguaCA8IHRoaXMuX21pbi5oKSB7XG4gICAgICAgICAgc3RhdHVzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocmFuZ2UgPT09ICdtYXgnICYmIHRoaXMubWF4KSB7XG4gICAgICAgIHN0YXR1cyA9IGluZGV4ID4gbWF4SDtcblxuICAgICAgICBpZiAoc3RhdHVzICYmIHRoaXMuX21pbiAmJiB0aGlzLl9taW4uaCA+IHRoaXMuX21heC5oICYmIG1pbkggPD0gaW5kZXgpIHtcbiAgICAgICAgICBzdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtaW4gPSB0aGlzLl9taW4gJiYgTnVtYmVyKHRoaXMuX3RvMjQodGhpcy5fbWluKS5oKTtcbiAgICAgIGNvbnN0IG1heCA9IHRoaXMuX21heCAmJiBOdW1iZXIodGhpcy5fdG8yNCh0aGlzLl9tYXgpLmgpO1xuICAgICAgaWYgKHJhbmdlID09PSAnbWluJyAmJiB0aGlzLm1pbikge1xuICAgICAgICBzdGF0dXMgPSBpIDwgbWluO1xuICAgICAgfVxuXG4gICAgICBpZiAocmFuZ2UgPT09ICdtYXgnICYmIHRoaXMubWF4KSB7XG4gICAgICAgIHN0YXR1cyA9IGkgPiBtYXg7XG4gICAgICB9XG5cbiAgICAgIGlmIChtaW4gPiBtYXgpIHtcbiAgICAgICAgc3RhdHVzID0gZmFsc2U7XG4gICAgICAgIHN0YXR1cyA9IG1pbiA+IGkgJiYgaSA+IG1heDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9kaXNhYmxlZEhvdXJzW2ldID0gc3RhdHVzO1xuXG4gICAgcmV0dXJuIHN0YXR1cztcbiAgfVxuXG4gIHByaXZhdGUgX3JhbmdlTWludXRlKGluZGV4OiBudW1iZXIsIHJhbmdlOiAnbWluJyB8ICdtYXgnKSB7XG4gICAgbGV0IHN0YXR1cyA9IGZhbHNlO1xuICAgIGlmICghdGhpcy5fc2hvd0hvdXJzKSB7XG4gICAgICBpZiAocmFuZ2UgPT09ICdtaW4nICYmIHRoaXMubWluKSB7XG4gICAgICAgIGNvbnN0IGlzU2FtZUhvdXIgPSB0aGlzLl9taW4uaCA9PT0gdGhpcy5fc2VsZWN0ZWRUaW1lLmg7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gaW5kZXggPCBOdW1iZXIodGhpcy5fbWluLm0pO1xuICAgICAgICBzdGF0dXMgPSB2YWx1ZSAmJiBpc1NhbWVIb3VyO1xuICAgICAgfSBlbHNlIGlmIChyYW5nZSA9PT0gJ21heCcgJiYgdGhpcy5tYXgpIHtcbiAgICAgICAgY29uc3QgaXNTYW1lSG91ciA9IHRoaXMuX21heC5oID09PSB0aGlzLl9zZWxlY3RlZFRpbWUuaDtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBpbmRleCA+IE51bWJlcih0aGlzLl9tYXgubSk7XG4gICAgICAgIHN0YXR1cyA9IHZhbHVlICYmIGlzU2FtZUhvdXI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudHdlbHZlSG91cikge1xuICAgICAgY29uc3QgbWluID0gdGhpcy5fbWluICYmIE51bWJlcih0aGlzLl90bzI0KHRoaXMuX21pbikuaCk7XG4gICAgICBjb25zdCBtYXggPSB0aGlzLl9tYXggJiYgTnVtYmVyKHRoaXMuX3RvMjQodGhpcy5fbWF4KS5oKTtcbiAgICAgIGNvbnN0IGkgPSBOdW1iZXIodGhpcy5fdG8yNCh0aGlzLl9zZWxlY3RlZFRpbWUpLmgpO1xuXG4gICAgICBpZiAocmFuZ2UgPT09ICdtaW4nICYmIG1pbikge1xuICAgICAgICBzdGF0dXMgPSBpID09PSBtaW4gJiYgaW5kZXggPCBOdW1iZXIodGhpcy5fbWluLm0pO1xuICAgICAgfSBlbHNlIGlmIChyYW5nZSA9PT0gJ21heCcgJiYgbWF4KSB7XG4gICAgICAgIHN0YXR1cyA9IGkgPT09IG1heCAmJiBpbmRleCA+IE51bWJlcih0aGlzLl9tYXgubSk7XG4gICAgICB9XG4gICAgICBzdGF0dXMgPSBzdGF0dXMgfHwgdGhpcy5fZGlzYWJsZWRIb3Vyc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdHVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0T2tCdG5EaXNhYmxlZCA9ICgpID0+IHtcbiAgICBjb25zdCBob3VyID0gTnVtYmVyKHRoaXMuX3RvMjQodGhpcy5fc2VsZWN0ZWRUaW1lKS5oKTtcbiAgICB0aGlzLl9va0J1dHRvbkRpc2FibGVkID0gdGhpcy5fZGlzYWJsZWRIb3Vyc1tob3VyXTtcblxuICAgIGlmICghdGhpcy5fb2tCdXR0b25EaXNhYmxlZCkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLl9taW4gJiZcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRUaW1lLmggPT09IHRoaXMuX21pbi5oICYmXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkVGltZS5hbXBtID09PSB0aGlzLl9taW4uYW1wbVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX29rQnV0dG9uRGlzYWJsZWQgPSB0aGlzLl9zZWxlY3RlZFRpbWUubSA8IHRoaXMuX21pbi5tO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuX21heCAmJlxuICAgICAgICB0aGlzLl9zZWxlY3RlZFRpbWUuaCA9PT0gdGhpcy5fbWF4LmggJiZcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRUaW1lLmFtcG0gPT09IHRoaXMuX21heC5hbXBtXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fb2tCdXR0b25EaXNhYmxlZCA9IHRoaXMuX3NlbGVjdGVkVGltZS5tID4gdGhpcy5fbWF4Lm07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHByaXZhdGUgX3NldE1pbnV0ZURpZ2l0YWxEaXNhYmxlZCgpIHtcbiAgICBjb25zdCB7IGggfSA9IHRoaXMuX3RvMjQodGhpcy5fc2VsZWN0ZWRUaW1lKTtcbiAgICB0aGlzLl9taW51dGVEaWdpdGFsRGlzYWJsZWQgPSB0aGlzLl9kaXNhYmxlZEhvdXJzW051bWJlcihoKV07XG4gIH1cbn1cbiJdfQ==