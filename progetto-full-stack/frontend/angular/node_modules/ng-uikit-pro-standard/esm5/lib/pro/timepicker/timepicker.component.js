import { __decorate, __metadata } from "tslib";
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ViewContainerRef, ComponentRef, Input, Output, EventEmitter, OnDestroy, } from '@angular/core';
import { OverlayRef, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ESCAPE } from '../../free/utils/keyboard-navigation';
import { MdbTimePickerContentComponent } from './timepicker.content';
import { Subject } from 'rxjs';
var MdbTimePickerComponent = /** @class */ (function () {
    function MdbTimePickerComponent(_overlay, _vcr // private _cdRef: ChangeDetectorRef
    ) {
        this._overlay = _overlay;
        this._vcr = _vcr;
        this.autoClose = false;
        this.clearButton = 'clear';
        this.closeButton = 'close';
        this.okButton = 'ok';
        this.rounding = 1;
        this.twelveHour = true;
        this.timeChange = new EventEmitter();
        this.cancel = new EventEmitter();
        this.done = new EventEmitter();
        this.show = new EventEmitter();
        this._value = '12:00AM';
        this._selectionChange$ = new Subject();
        this.onChangeCb = function () { };
        this.onTouchedCb = function () { };
    }
    MdbTimePickerComponent.prototype._patchInputValues = function () {
        this._contentRef.instance.picker = this;
        this._contentRef.instance.autoClose = this.autoClose;
        this._contentRef.instance.clearButton = this.clearButton;
        this._contentRef.instance.closeButton = this.closeButton;
        this._contentRef.instance.okButton = this.okButton;
        this._contentRef.instance.rounding = this.rounding;
        this._contentRef.instance.twelveHour = this.twelveHour;
        this._contentRef.instance.value = this._timeToObj(this._value);
        if (this.max) {
            this._contentRef.instance.max = this._timeToObj(this.max);
        }
        if (this.min) {
            this._contentRef.instance.min = this._timeToObj(this.min);
        }
    };
    MdbTimePickerComponent.prototype._timeToObj = function (time) {
        var round = function (x, roundBy) {
            return x % roundBy < Math.round(roundBy / 2)
                ? x % roundBy === 0
                    ? x
                    : Math.ceil(x / roundBy) * roundBy
                : Math.floor(x / roundBy) * roundBy;
        };
        function toString(val) {
            return val < 10 ? "0" + val : "" + val;
        }
        var hour = Number(time.split(':')[0]);
        var minute = Number(time.split(':')[1].match(/\d+/g));
        var ampm = time.match(/AM|PM/) || [''];
        if (this.rounding) {
            minute = round(minute, this.rounding);
        }
        return {
            h: toString(hour),
            m: toString(minute),
            ampm: ampm[0],
        };
    };
    MdbTimePickerComponent.prototype.open = function () {
        var overlayRef = this._overlayRef;
        if (!overlayRef) {
            this._portal = new ComponentPortal(MdbTimePickerContentComponent, this._vcr);
            overlayRef = this._overlay.create(this._getOverlayConfig());
            this._overlayRef = overlayRef;
        }
        if (overlayRef && this._overlayRef && !overlayRef.hasAttached()) {
            this._contentRef = this._overlayRef.attach(this._portal);
            this._patchInputValues();
            this._listenToOutsideClick();
        }
        this._emitTimeShowEvent(this._timeToObj(this._value));
    };
    MdbTimePickerComponent.prototype.close = function (doneClicked, value) {
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            if (!doneClicked) {
                this._emitTimeCancelEvent(value || this._timeToObj(this._value));
            }
        }
        this._destroyOverlay();
    };
    MdbTimePickerComponent.prototype._emitTimeChangeEvent = function (value) {
        this.timeChange.emit({ status: 'change', value: value });
    };
    MdbTimePickerComponent.prototype._emitTimeCancelEvent = function (value) {
        this.cancel.emit({ status: 'cancel', value: value });
    };
    MdbTimePickerComponent.prototype._emitTimeDoneEvent = function (value) {
        var h = value.h, m = value.m, ampm = value.ampm;
        this.done.emit({ status: 'done', value: value });
        this._selectionChange$.next(this.twelveHour ? h + ":" + m + ampm : h + ":" + m);
    };
    MdbTimePickerComponent.prototype._emitTimeShowEvent = function (value) {
        this.show.emit({ status: 'open', value: value });
    };
    MdbTimePickerComponent.prototype._setValue = function (value) {
        if (value) {
            this._value = value;
        }
        else {
            this._value = '12:00AM';
        }
    };
    MdbTimePickerComponent.prototype.setInput = function (input) {
        var _this = this;
        this.input = input;
        input._valueChange.subscribe(function (val) {
            var match = val.match(/\d\d:\d\d(AM|PM)?/gi);
            if (match) {
                _this._value = match[0];
            }
            else {
                _this._value = '12:00AM';
            }
        });
    };
    MdbTimePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCb = fn;
    };
    MdbTimePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCb = fn;
    };
    MdbTimePickerComponent.prototype._getOverlayConfig = function () {
        var positionStrategy = this._overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();
        var overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: positionStrategy,
        });
        return overlayConfig;
    };
    MdbTimePickerComponent.prototype._destroyOverlay = function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    };
    MdbTimePickerComponent.prototype._listenToOutsideClick = function () {
        var _this = this;
        if (this._overlayRef) {
            merge(this._overlayRef.backdropClick(), this._overlayRef.detachments(), this._overlayRef.keydownEvents().pipe(filter(function (event) {
                // Closing on alt + up is only valid when there's an input associated with the datepicker.
                // tslint:disable-next-line: deprecation
                return event.keyCode === ESCAPE;
            }))).subscribe(function (event) {
                if (event) {
                    event.preventDefault();
                }
                _this.close();
                _this._destroyOverlay();
            });
        }
    };
    MdbTimePickerComponent.prototype.ngOnDestroy = function () {
        this._destroyOverlay();
    };
    MdbTimePickerComponent.ctorParameters = function () { return [
        { type: Overlay },
        { type: ViewContainerRef // private _cdRef: ChangeDetectorRef
         }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTimePickerComponent.prototype, "autoClose", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTimePickerComponent.prototype, "clearButton", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTimePickerComponent.prototype, "closeButton", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbTimePickerComponent.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbTimePickerComponent.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTimePickerComponent.prototype, "okButton", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], MdbTimePickerComponent.prototype, "rounding", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTimePickerComponent.prototype, "twelveHour", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MdbTimePickerComponent.prototype, "timeChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MdbTimePickerComponent.prototype, "cancel", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MdbTimePickerComponent.prototype, "done", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MdbTimePickerComponent.prototype, "show", void 0);
    MdbTimePickerComponent = __decorate([
        Component({
            template: '',
            selector: 'mdb-timepicker',
            exportAs: 'mdbTimePicker',
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [Overlay,
            ViewContainerRef // private _cdRef: ChangeDetectorRef
        ])
    ], MdbTimePickerComponent);
    return MdbTimePickerComponent;
}());
export { MdbTimePickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL3RpbWVwaWNrZXIvdGltZXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixnQkFBZ0IsRUFDaEIsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXJFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFTL0I7SUF1QkUsZ0NBQ1UsUUFBaUIsRUFDakIsSUFBc0IsQ0FBQyxvQ0FBb0M7O1FBRDNELGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsU0FBSSxHQUFKLElBQUksQ0FBa0I7UUF4QnZCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZ0JBQVcsR0FBZ0IsT0FBTyxDQUFDO1FBQ25DLGdCQUFXLEdBQWdCLE9BQU8sQ0FBQztRQUduQyxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGFBQVEsR0FBYSxDQUFDLENBQUM7UUFDdkIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUVqQixlQUFVLEdBQXlCLElB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QWE7SUFDWjtRQUFSLEtBQUssRUFBRTs7dURBQWE7SUFDWjtRQUFSLEtBQUssRUFBRTs7NERBQWlCO0lBQ2hCO1FBQVIsS0FBSyxFQUFFOzs0REFBd0I7SUFDdkI7UUFBUixLQUFLLEVBQUU7OzhEQUFtQjtJQUVqQjtRQUFULE1BQU0sRUFBRTtrQ0FBYSxZQUFZOzhEQUFzQztJQUM5RDtRQUFULE1BQU0sRUFBRTtrQ0FBUyxZQUFZOzBEQUFzQztJQUMxRDtRQUFULE1BQU0sRUFBRTtrQ0FBTyxZQUFZO3dEQUFzQztJQUN4RDtRQUFULE1BQU0sRUFBRTtrQ0FBTyxZQUFZO3dEQUFzQztJQWJ2RCxzQkFBc0I7UUFQbEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLEVBQUU7WUFDWixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7eUNBeUJvQixPQUFPO1lBQ1gsZ0JBQWdCLENBQUMsb0NBQW9DOztPQXpCMUQsc0JBQXNCLENBb01sQztJQUFELDZCQUFDO0NBQUEsQUFwTUQsSUFvTUM7U0FwTVksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgVmlld0NvbnRhaW5lclJlZixcclxuICBDb21wb25lbnRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkRlc3Ryb3ksXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE92ZXJsYXlSZWYsIE92ZXJsYXksIE92ZXJsYXlDb25maWcgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xyXG5pbXBvcnQgeyBtZXJnZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEVTQ0FQRSB9IGZyb20gJy4uLy4uL2ZyZWUvdXRpbHMva2V5Ym9hcmQtbmF2aWdhdGlvbic7XHJcbmltcG9ydCB7IE1kYlRpbWVQaWNrZXJDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi90aW1lcGlja2VyLmNvbnRlbnQnO1xyXG5pbXBvcnQgeyBDbGVhckJ1dHRvbiwgUm91bmRpbmcsIFNlbGVjdGVkVGltZSwgQ2xvc2VCdXR0b24gfSBmcm9tICcuL3RpbWVwaWNrZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGU6ICcnLFxyXG4gIHNlbGVjdG9yOiAnbWRiLXRpbWVwaWNrZXInLFxyXG4gIGV4cG9ydEFzOiAnbWRiVGltZVBpY2tlcicsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1kYlRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIGF1dG9DbG9zZSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGNsZWFyQnV0dG9uOiBDbGVhckJ1dHRvbiA9ICdjbGVhcic7XHJcbiAgQElucHV0KCkgY2xvc2VCdXR0b246IENsb3NlQnV0dG9uID0gJ2Nsb3NlJztcclxuICBASW5wdXQoKSBtYXg6IHN0cmluZztcclxuICBASW5wdXQoKSBtaW46IHN0cmluZztcclxuICBASW5wdXQoKSBva0J1dHRvbiA9ICdvayc7XHJcbiAgQElucHV0KCkgcm91bmRpbmc6IFJvdW5kaW5nID0gMTtcclxuICBASW5wdXQoKSB0d2VsdmVIb3VyID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIHRpbWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxvYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XHJcbiAgQE91dHB1dCgpIGNhbmNlbDogRXZlbnRFbWl0dGVyPG9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyPG9iamVjdD4oKTtcclxuICBAT3V0cHV0KCkgZG9uZTogRXZlbnRFbWl0dGVyPG9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyPG9iamVjdD4oKTtcclxuICBAT3V0cHV0KCkgc2hvdzogRXZlbnRFbWl0dGVyPG9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyPG9iamVjdD4oKTtcclxuXHJcbiAgcHJpdmF0ZSBfdmFsdWUgPSAnMTI6MDBBTSc7XHJcbiAgcHJpdmF0ZSBfY29udGVudFJlZjogQ29tcG9uZW50UmVmPE1kYlRpbWVQaWNrZXJDb250ZW50Q29tcG9uZW50PjtcclxuICBwcml2YXRlIF9vdmVybGF5UmVmOiBPdmVybGF5UmVmIHwgbnVsbDtcclxuICBwcml2YXRlIF9wb3J0YWw6IENvbXBvbmVudFBvcnRhbDxNZGJUaW1lUGlja2VyQ29udGVudENvbXBvbmVudD47XHJcbiAgcHVibGljIGlucHV0OiBhbnk7XHJcblxyXG4gIHB1YmxpYyBfc2VsZWN0aW9uQ2hhbmdlJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxyXG4gICAgcHJpdmF0ZSBfdmNyOiBWaWV3Q29udGFpbmVyUmVmIC8vIHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICkge31cclxuXHJcbiAgcHJvdGVjdGVkIF9wYXRjaElucHV0VmFsdWVzKCkge1xyXG4gICAgdGhpcy5fY29udGVudFJlZi5pbnN0YW5jZS5waWNrZXIgPSB0aGlzO1xyXG4gICAgdGhpcy5fY29udGVudFJlZi5pbnN0YW5jZS5hdXRvQ2xvc2UgPSB0aGlzLmF1dG9DbG9zZTtcclxuICAgIHRoaXMuX2NvbnRlbnRSZWYuaW5zdGFuY2UuY2xlYXJCdXR0b24gPSB0aGlzLmNsZWFyQnV0dG9uO1xyXG4gICAgdGhpcy5fY29udGVudFJlZi5pbnN0YW5jZS5jbG9zZUJ1dHRvbiA9IHRoaXMuY2xvc2VCdXR0b247XHJcbiAgICB0aGlzLl9jb250ZW50UmVmLmluc3RhbmNlLm9rQnV0dG9uID0gdGhpcy5va0J1dHRvbjtcclxuICAgIHRoaXMuX2NvbnRlbnRSZWYuaW5zdGFuY2Uucm91bmRpbmcgPSB0aGlzLnJvdW5kaW5nO1xyXG4gICAgdGhpcy5fY29udGVudFJlZi5pbnN0YW5jZS50d2VsdmVIb3VyID0gdGhpcy50d2VsdmVIb3VyO1xyXG4gICAgdGhpcy5fY29udGVudFJlZi5pbnN0YW5jZS52YWx1ZSA9IHRoaXMuX3RpbWVUb09iaih0aGlzLl92YWx1ZSk7XHJcblxyXG4gICAgaWYgKHRoaXMubWF4KSB7XHJcbiAgICAgIHRoaXMuX2NvbnRlbnRSZWYuaW5zdGFuY2UubWF4ID0gdGhpcy5fdGltZVRvT2JqKHRoaXMubWF4KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm1pbikge1xyXG4gICAgICB0aGlzLl9jb250ZW50UmVmLmluc3RhbmNlLm1pbiA9IHRoaXMuX3RpbWVUb09iaih0aGlzLm1pbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX3RpbWVUb09iaih0aW1lOiBhbnkpOiBTZWxlY3RlZFRpbWUge1xyXG4gICAgY29uc3Qgcm91bmQgPSAoeDogbnVtYmVyLCByb3VuZEJ5OiBudW1iZXIpID0+IHtcclxuICAgICAgcmV0dXJuIHggJSByb3VuZEJ5IDwgTWF0aC5yb3VuZChyb3VuZEJ5IC8gMilcclxuICAgICAgICA/IHggJSByb3VuZEJ5ID09PSAwXHJcbiAgICAgICAgICA/IHhcclxuICAgICAgICAgIDogTWF0aC5jZWlsKHggLyByb3VuZEJ5KSAqIHJvdW5kQnlcclxuICAgICAgICA6IE1hdGguZmxvb3IoeCAvIHJvdW5kQnkpICogcm91bmRCeTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcodmFsOiBudW1iZXIpIHtcclxuICAgICAgcmV0dXJuIHZhbCA8IDEwID8gYDAke3ZhbH1gIDogYCR7dmFsfWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaG91ciA9IE51bWJlcih0aW1lLnNwbGl0KCc6JylbMF0pO1xyXG4gICAgbGV0IG1pbnV0ZSA9IE51bWJlcih0aW1lLnNwbGl0KCc6JylbMV0ubWF0Y2goL1xcZCsvZykpO1xyXG4gICAgY29uc3QgYW1wbSA9IHRpbWUubWF0Y2goL0FNfFBNLykgfHwgWycnXTtcclxuXHJcbiAgICBpZiAodGhpcy5yb3VuZGluZykge1xyXG4gICAgICBtaW51dGUgPSByb3VuZChtaW51dGUsIHRoaXMucm91bmRpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGg6IHRvU3RyaW5nKGhvdXIpLFxyXG4gICAgICBtOiB0b1N0cmluZyhtaW51dGUpLFxyXG4gICAgICBhbXBtOiBhbXBtWzBdLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIG9wZW4oKTogdm9pZCB7XHJcbiAgICBsZXQgb3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXlSZWY7XHJcbiAgICBpZiAoIW92ZXJsYXlSZWYpIHtcclxuICAgICAgdGhpcy5fcG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChNZGJUaW1lUGlja2VyQ29udGVudENvbXBvbmVudCwgdGhpcy5fdmNyKTtcclxuICAgICAgb3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKHRoaXMuX2dldE92ZXJsYXlDb25maWcoKSk7XHJcblxyXG4gICAgICB0aGlzLl9vdmVybGF5UmVmID0gb3ZlcmxheVJlZjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3ZlcmxheVJlZiAmJiB0aGlzLl9vdmVybGF5UmVmICYmICFvdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkpIHtcclxuICAgICAgdGhpcy5fY29udGVudFJlZiA9IHRoaXMuX292ZXJsYXlSZWYuYXR0YWNoKHRoaXMuX3BvcnRhbCk7XHJcbiAgICAgIHRoaXMuX3BhdGNoSW5wdXRWYWx1ZXMoKTtcclxuICAgICAgdGhpcy5fbGlzdGVuVG9PdXRzaWRlQ2xpY2soKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9lbWl0VGltZVNob3dFdmVudCh0aGlzLl90aW1lVG9PYmoodGhpcy5fdmFsdWUpKTtcclxuICB9XHJcblxyXG4gIGNsb3NlKGRvbmVDbGlja2VkPzogYm9vbGVhbiwgdmFsdWU/OiBTZWxlY3RlZFRpbWUpIHtcclxuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmICYmIHRoaXMuX292ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xyXG4gICAgICBpZiAoIWRvbmVDbGlja2VkKSB7XHJcbiAgICAgICAgdGhpcy5fZW1pdFRpbWVDYW5jZWxFdmVudCh2YWx1ZSB8fCB0aGlzLl90aW1lVG9PYmoodGhpcy5fdmFsdWUpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5fZGVzdHJveU92ZXJsYXkoKTtcclxuICB9XHJcblxyXG4gIF9lbWl0VGltZUNoYW5nZUV2ZW50KHZhbHVlOiBTZWxlY3RlZFRpbWUpIHtcclxuICAgIHRoaXMudGltZUNoYW5nZS5lbWl0KHsgc3RhdHVzOiAnY2hhbmdlJywgdmFsdWUgfSk7XHJcbiAgfVxyXG5cclxuICBfZW1pdFRpbWVDYW5jZWxFdmVudCh2YWx1ZTogU2VsZWN0ZWRUaW1lKSB7XHJcbiAgICB0aGlzLmNhbmNlbC5lbWl0KHsgc3RhdHVzOiAnY2FuY2VsJywgdmFsdWUgfSk7XHJcbiAgfVxyXG5cclxuICBfZW1pdFRpbWVEb25lRXZlbnQodmFsdWU6IFNlbGVjdGVkVGltZSkge1xyXG4gICAgY29uc3QgeyBoLCBtLCBhbXBtIH0gPSB2YWx1ZTtcclxuICAgIHRoaXMuZG9uZS5lbWl0KHsgc3RhdHVzOiAnZG9uZScsIHZhbHVlIH0pO1xyXG4gICAgdGhpcy5fc2VsZWN0aW9uQ2hhbmdlJC5uZXh0KHRoaXMudHdlbHZlSG91ciA/IGAke2h9OiR7bX0ke2FtcG19YCA6IGAke2h9OiR7bX1gKTtcclxuICB9XHJcblxyXG4gIF9lbWl0VGltZVNob3dFdmVudCh2YWx1ZTogU2VsZWN0ZWRUaW1lKSB7XHJcbiAgICB0aGlzLnNob3cuZW1pdCh7IHN0YXR1czogJ29wZW4nLCB2YWx1ZSB9KTtcclxuICB9XHJcblxyXG4gIF9zZXRWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3ZhbHVlID0gJzEyOjAwQU0nO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0SW5wdXQoaW5wdXQ6IGFueSkge1xyXG4gICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgaW5wdXQuX3ZhbHVlQ2hhbmdlLnN1YnNjcmliZSgodmFsOiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgbWF0Y2ggPSB2YWwubWF0Y2goL1xcZFxcZDpcXGRcXGQoQU18UE0pPy9naSk7XHJcbiAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gbWF0Y2hbMF07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSAnMTI6MDBBTSc7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2VDYjogKF86IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xyXG4gIG9uVG91Y2hlZENiOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkNoYW5nZUNiID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZENiID0gZm47XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRPdmVybGF5Q29uZmlnKCk6IE92ZXJsYXlDb25maWcge1xyXG4gICAgY29uc3QgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMuX292ZXJsYXlcclxuICAgICAgLnBvc2l0aW9uKClcclxuICAgICAgLmdsb2JhbCgpXHJcbiAgICAgIC5jZW50ZXJIb3Jpem9udGFsbHkoKVxyXG4gICAgICAuY2VudGVyVmVydGljYWxseSgpO1xyXG4gICAgY29uc3Qgb3ZlcmxheUNvbmZpZyA9IG5ldyBPdmVybGF5Q29uZmlnKHtcclxuICAgICAgaGFzQmFja2Ryb3A6IHRydWUsXHJcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLl9vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuYmxvY2soKSxcclxuICAgICAgcG9zaXRpb25TdHJhdGVneSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG92ZXJsYXlDb25maWc7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9kZXN0cm95T3ZlcmxheSgpIHtcclxuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmKSB7XHJcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGlzcG9zZSgpO1xyXG4gICAgICB0aGlzLl9vdmVybGF5UmVmID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2xpc3RlblRvT3V0c2lkZUNsaWNrKCkge1xyXG4gICAgaWYgKHRoaXMuX292ZXJsYXlSZWYpIHtcclxuICAgICAgbWVyZ2UoXHJcbiAgICAgICAgdGhpcy5fb3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCksXHJcbiAgICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kZXRhY2htZW50cygpLFxyXG4gICAgICAgIHRoaXMuX292ZXJsYXlSZWYua2V5ZG93bkV2ZW50cygpLnBpcGUoXHJcbiAgICAgICAgICBmaWx0ZXIoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIENsb3Npbmcgb24gYWx0ICsgdXAgaXMgb25seSB2YWxpZCB3aGVuIHRoZXJlJ3MgYW4gaW5wdXQgYXNzb2NpYXRlZCB3aXRoIHRoZSBkYXRlcGlja2VyLlxyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXHJcbiAgICAgICAgICAgIHJldHVybiBldmVudC5rZXlDb2RlID09PSBFU0NBUEU7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgKS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lPdmVybGF5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9kZXN0cm95T3ZlcmxheSgpO1xyXG4gIH1cclxufVxyXG4iXX0=