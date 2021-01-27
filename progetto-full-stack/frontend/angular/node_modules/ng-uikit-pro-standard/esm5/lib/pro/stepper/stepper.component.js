import { __decorate, __metadata, __param } from "tslib";
import { Component, ViewEncapsulation, ContentChildren, QueryList, AfterContentInit, Input, ElementRef, ViewChild, ViewChildren, AfterViewInit, Renderer2, PLATFORM_ID, Inject, AfterContentChecked, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, } from '@angular/core';
import { MdbStepComponent } from './step.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { WavesDirective } from '../../free/waves/waves-effect.directive';
import { FormControl } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { from, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
var StepChangeEvent = /** @class */ (function () {
    function StepChangeEvent() {
    }
    return StepChangeEvent;
}());
export { StepChangeEvent };
var MdbStepperComponent = /** @class */ (function () {
    function MdbStepperComponent(ripple, _renderer, _cdRef, platformId) {
        this.ripple = ripple;
        this._renderer = _renderer;
        this._cdRef = _cdRef;
        this.linear = false;
        this.disableWaves = false;
        this._vertical = false;
        this.stepChange = new EventEmitter();
        this._destroy = new Subject();
        this.horizontal = true;
        this.stepTextContent = '';
        this.stepChangeSubject = new Subject();
        this.isBrowser = isPlatformBrowser(platformId);
    }
    Object.defineProperty(MdbStepperComponent.prototype, "vertical", {
        get: function () {
            return this._vertical;
        },
        set: function (value) {
            if (value) {
                this._vertical = value;
                this.horizontal = false;
                this._renderer.removeStyle(this.container.nativeElement, 'height');
            }
            else {
                this._vertical = value;
                this.horizontal = true;
                if (this.container.nativeElement.children[this.activeStepIndex]) {
                    var stepElContent = this.container.nativeElement.children[this._activeStepIndex]
                        .lastElementChild;
                    this._updateHorizontalStepperHeight(this.activeStepIndex, stepElContent.clientHeight);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdbStepperComponent.prototype, "activeStepIndex", {
        get: function () {
            return this._activeStepIndex;
        },
        set: function (value) {
            this._activeStepIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    MdbStepperComponent.prototype.getStepChange$ = function () {
        return this.stepChangeSubject;
    };
    MdbStepperComponent.prototype.onClick = function (index, event) {
        if (!this.disableWaves) {
            var clickedEl = this.stepTitles.toArray()[index];
            this.ripple.el = clickedEl;
            this.ripple.click(event);
        }
    };
    MdbStepperComponent.prototype._isStepValid = function (step) {
        if (!step.stepForm) {
            return true;
        }
        if (step.stepForm && step.stepForm.valid) {
            return true;
        }
        return false;
    };
    MdbStepperComponent.prototype.getAnimationState = function (index) {
        var nextElPosition = index - this.activeStepIndex;
        if (nextElPosition < 0) {
            return 'previous';
        }
        else if (nextElPosition > 0) {
            return 'next';
        }
        return 'current';
    };
    MdbStepperComponent.prototype._getStepByIndex = function (index) {
        return this.steps.toArray()[index];
    };
    MdbStepperComponent.prototype.next = function () {
        if (this.activeStepIndex < this.steps.length - 1) {
            this.setNewActiveStep(this.activeStepIndex + 1);
            this._cdRef.markForCheck();
        }
    };
    MdbStepperComponent.prototype.previous = function () {
        if (this.activeStepIndex > 0) {
            this.setNewActiveStep(this.activeStepIndex - 1);
            this._cdRef.markForCheck();
        }
    };
    MdbStepperComponent.prototype.submit = function () {
        if (this.linear) {
            this._markCurrentAsDone();
            this._cdRef.markForCheck();
        }
    };
    MdbStepperComponent.prototype.setNewActiveStep = function (index) {
        var _this = this;
        setTimeout(function () {
            var currentStep = _this._activeStep;
            var currentStepIndex = _this._activeStepIndex;
            var newStep = _this._getStepByIndex(index);
            var newStepIndex = _this.steps
                .toArray()
                .findIndex(function (step) { return step === newStep; });
            if (_this.linear && !_this._isNewStepLinear(index)) {
                return;
            }
            if (newStepIndex < _this._activeStepIndex && !newStep.editable) {
                return;
            }
            _this._removeStepValidationClasses(newStep);
            if (_this.linear && index > _this.activeStepIndex) {
                if (_this._isStepValid(_this._activeStep)) {
                    _this._markCurrentAsDone();
                    _this._removeCurrentActiveStep();
                    _this._setActiveStep(index);
                    _this.stepChange.emit({
                        activeStep: newStep,
                        activeStepIndex: newStepIndex,
                        previousStep: currentStep,
                        previousStepIndex: currentStepIndex,
                    });
                }
                else {
                    _this._markCurrentAsWrong();
                    _this._markStepControlsAsDirty(_this._activeStep);
                }
            }
            else {
                if (index < _this.activeStepIndex) {
                    _this._removeStepValidationClasses(_this._activeStep);
                }
                _this._removeCurrentActiveStep();
                _this._setActiveStep(index);
                _this.stepChange.emit({
                    activeStep: newStep,
                    activeStepIndex: newStepIndex,
                    previousStep: currentStep,
                    previousStepIndex: currentStepIndex,
                });
            }
        }, 0);
    };
    MdbStepperComponent.prototype._markCurrentAsDone = function () {
        this._activeStep.isDone = true;
        this._activeStep.isWrong = false;
    };
    MdbStepperComponent.prototype._markCurrentAsWrong = function () {
        this._activeStep.isWrong = true;
        this._activeStep.isDone = false;
    };
    MdbStepperComponent.prototype._markStepControlsAsDirty = function (step) {
        var controls = step.stepForm.controls;
        if (step.stepForm.controls) {
            var keys = Object.keys(controls);
            for (var i = 0; i < keys.length; i++) {
                var control = controls[keys[i]];
                if (control instanceof FormControl) {
                    control.markAsTouched();
                }
            }
        }
    };
    MdbStepperComponent.prototype._removeStepValidationClasses = function (step) {
        step.isDone = false;
        step.isWrong = false;
    };
    MdbStepperComponent.prototype._isNewStepLinear = function (newStepIndex) {
        return this.activeStepIndex - newStepIndex === 1 || this.activeStepIndex - newStepIndex === -1;
    };
    MdbStepperComponent.prototype._setActiveStep = function (index) {
        this.steps.toArray()[index].isActive = true;
        this._updateHorizontalStepperHeight(index);
        this.activeStepIndex = index;
        this._activeStep = this._getStepByIndex(this.activeStepIndex);
        this._cdRef.markForCheck();
    };
    MdbStepperComponent.prototype._removeCurrentActiveStep = function () {
        var currentActiveStep = this.steps.find(function (activeStep) { return activeStep.isActive; });
        if (currentActiveStep) {
            currentActiveStep.isActive = false;
        }
    };
    MdbStepperComponent.prototype.resetAll = function () {
        var _this = this;
        this.steps.forEach(function (step) {
            step.reset();
            _this._setActiveStep(0);
            _this._cdRef.markForCheck();
        });
    };
    MdbStepperComponent.prototype._updateHorizontalStepperHeight = function (index, height) {
        var _this = this;
        if (this.horizontal && !this.vertical) {
            setTimeout(function () {
                var stepHeight = height
                    ? height + 50
                    : _this.stepContents.toArray()[index].nativeElement.scrollHeight + 50;
                _this._renderer.setStyle(_this.container.nativeElement, 'height', stepHeight + 'px');
            }, 0);
        }
        else {
            this._renderer.removeStyle(this.container.nativeElement, 'height');
        }
    };
    MdbStepperComponent.prototype._initStepperVariation = function () {
        var _this = this;
        if (this.isBrowser) {
            if (this.vertical) {
                setTimeout(function () {
                    _this.horizontal = false;
                    _this._renderer.removeStyle(_this.container.nativeElement, 'height');
                }, 0);
            }
        }
    };
    MdbStepperComponent.prototype.ngAfterViewInit = function () {
        this._initStepperVariation();
    };
    MdbStepperComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._setActiveStep(0);
        this.stepChange$ = from(this.steps.toArray());
        this.getStepChange$()
            .pipe(distinctUntilChanged(), takeUntil(this._destroy))
            .subscribe(function () {
            if (_this.container.nativeElement.children[_this.activeStepIndex]) {
                var stepElContent = _this.container.nativeElement.children[_this._activeStepIndex]
                    .lastElementChild;
                _this._updateHorizontalStepperHeight(_this.activeStepIndex, stepElContent.clientHeight);
            }
        });
        this.steps.changes.pipe(takeUntil(this._destroy)).subscribe(function () { return _this._cdRef.markForCheck(); });
    };
    MdbStepperComponent.prototype.ngAfterContentChecked = function () {
        var _this = this;
        if (this.stepContents) {
            var activeStep = this.stepContents
                .filter(function (el, index) { return el && index === _this.activeStepIndex; })
                .map(function (el) { return el.nativeElement; })[0];
            if (activeStep.innerHTMl !== this.stepTextContent) {
                this.stepChangeSubject.next(activeStep.innerHTML);
            }
            this.stepTextContent = activeStep.innerHTML;
        }
    };
    MdbStepperComponent.prototype.ngOnDestroy = function () {
        this._destroy.next();
        this._destroy.complete();
    };
    MdbStepperComponent.ctorParameters = function () { return [
        { type: WavesDirective },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    __decorate([
        ContentChildren(MdbStepComponent),
        __metadata("design:type", QueryList)
    ], MdbStepperComponent.prototype, "steps", void 0);
    __decorate([
        ViewChildren('stepTitle'),
        __metadata("design:type", QueryList)
    ], MdbStepperComponent.prototype, "stepTitles", void 0);
    __decorate([
        ViewChildren('stepContent'),
        __metadata("design:type", QueryList)
    ], MdbStepperComponent.prototype, "stepContents", void 0);
    __decorate([
        ViewChild('container', { static: true }),
        __metadata("design:type", ElementRef)
    ], MdbStepperComponent.prototype, "container", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbStepperComponent.prototype, "linear", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbStepperComponent.prototype, "disableWaves", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], MdbStepperComponent.prototype, "vertical", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MdbStepperComponent.prototype, "stepChange", void 0);
    MdbStepperComponent = __decorate([
        Component({
            selector: 'mdb-stepper',
            exportAs: 'mdbStepper',
            template: "<div class=\"card-body\">\n  <ul #container class=\"stepper\" [ngClass]=\"{ horizontal: !vertical && horizontal }\">\n    <li\n      [ngClass]=\"{ active: step.isActive, done: step.isDone, wrong: step.isWrong }\"\n      class=\"step\"\n      *ngFor=\"let step of steps; let i = index\"\n    >\n      <div\n        #stepTitle\n        class=\"step-title waves-effect waves-dark\"\n        (click)=\"setNewActiveStep(i); onClick(i, $event)\"\n      >\n        <span>{{ step.name }}</span>\n        <span class=\"step-label\">{{ step.label }}</span>\n      </div>\n      <div\n        #stepContent\n        class=\"step-new-content\"\n        [ngClass]=\"{ 'd-block': step.isActive }\"\n        [@stepContentTransition]=\"!vertical && getAnimationState(i)\"\n      >\n        <ng-container [ngTemplateOutlet]=\"step.content\"></ng-container>\n      </div>\n    </li>\n  </ul>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            animations: [
                trigger('stepContentTransition', [
                    state('previous', style({ transform: 'translateX(-100%)', display: 'none' })),
                    state('next', style({ transform: 'translateX(100%)', display: 'none' })),
                    state('current', style({ transform: 'none', display: 'block' })),
                    transition('* => *', animate('600ms ease')),
                ]),
            ],
            providers: [WavesDirective],
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["@charset \"UTF-8\";.stepper li a{padding:1.5rem;font-size:1em;text-align:center}.stepper li a .circle{display:inline-block;color:#fff;border-radius:50%;background:rgba(0,0,0,.38);width:1.75rem;height:1.75rem;text-align:center;line-height:1.75rem;margin-right:.5rem}.stepper li a .label{display:inline-block;color:rgba(0,0,0,.38)}.stepper li.active a .circle,.stepper li.completed a .circle{background-color:#4285f4}.stepper li.active a .label,.stepper li.completed a .label{font-weight:600;color:rgba(0,0,0,.87)}.stepper li.warning a .circle{background-color:#ff3547}.stepper-horizontal{position:relative;display:flex;justify-content:space-between}.stepper-horizontal li{transition:.5s;display:flex;align-items:center;flex:1;position:relative}.stepper-horizontal li a .label{margin-top:.63rem}.stepper-horizontal li:not(:first-child):before,.stepper-horizontal li:not(:last-child):after{content:\"\";position:relative;flex:1;margin:.5rem 0 0;height:1px;background-color:rgba(0,0,0,.1)}@media (max-width:47.9375rem){.stepper-horizontal{flex-direction:column}.stepper-horizontal li{align-items:flex-start;flex-direction:column}.stepper-horizontal li a .label{flex-flow:column nowrap;order:2;margin-top:.2rem}.stepper-horizontal li:not(:last-child):after{content:\"\";position:absolute;width:1px;height:calc(100% - 40px);left:2.19rem;top:3.75rem}}.stepper-vertical{position:relative;display:flex;flex-direction:column;justify-content:space-between}.stepper-vertical li{display:flex;align-items:flex-start;flex:1;flex-direction:column;position:relative}.stepper-vertical li a{align-self:flex-start;display:flex;position:relative}.stepper-vertical li a .circle{order:1}.stepper-vertical li a .label{flex-flow:column nowrap;order:2;margin-top:.2rem}.stepper-vertical li.completed a .label{font-weight:500}.stepper-vertical li .step-content{display:block;margin-top:0;margin-left:3.13rem;padding:.94rem}.stepper-vertical li .step-content p{font-size:.88rem}.stepper-vertical li:not(:last-child):after{content:\"\";position:absolute;width:1px;height:calc(100% - 40px);left:2.19rem;top:3.44rem;background-color:rgba(0,0,0,.1)}label.invalid{font-size:.8rem;font-weight:500;color:red!important;top:50px!important}label.invalid.active{transform:translateY(0)!important}ul.stepper .wait-feedback{left:0;right:0;top:0;z-index:2;position:absolute;width:100%;height:100%;text-align:center;display:flex;justify-content:center;align-items:center}ul.stepper .step{position:relative;list-style:none}ul.stepper .step.feedbacking .step-new-content>:not(.wait-feedback){opacity:.1}ul.stepper .step:not(:last-of-type).active{margin-bottom:2.25rem}ul.stepper .step:before{position:absolute;top:.75rem;counter-increment:section;content:counter(section);height:1.75rem;width:1.75rem;color:#fff;background-color:rgba(0,0,0,.3);border-radius:100%;text-align:center;line-height:1.75rem;font-weight:400}ul.stepper .step.active:before{background-color:#4285f4}ul.stepper .step.done:before{content:\"\uF00C\";background-color:#00c851}ul.stepper .step.wrong:before{content:\"\uF071\";background-color:#ff3547}ul.stepper>li:not(:last-of-type){margin-bottom:.625rem;transition:margin-bottom .4s}ul.stepper .step-title{margin:0 -1.3rem;cursor:pointer;padding:.9688rem 2.75rem 1.5rem 4rem;display:block;position:relative}ul.stepper .step-title:after{content:attr(data-step-label);display:block;position:absolute;font-size:.8rem;color:#424242;font-weight:400}ul.stepper .step-title:hover{background-color:rgba(0,0,0,.06)}ul.stepper .step-label{font-size:.8rem;color:#424242;font-weight:400;position:absolute;top:40px;left:65px}ul.stepper .step-new-content{position:relative;display:none;width:inherit;margin-left:41px;margin-right:24px}ul.stepper>.step:not(:last-of-type):after{content:\"\";position:absolute;top:3.125rem;left:.8438rem;width:.0625rem;height:40%;height:calc(100% - 38px);background-color:rgba(0,0,0,.1);transition:.4s}ul.stepper>.step.active:not(:last-child):after{height:93%;height:calc(100% - 12px)}ul.stepper>.step[data-last=true]{margin-bottom:0}ul.stepper>.step[data-last=true]:after{height:0;width:0}ul.stepper .step-actions{display:-webkit-box;-webkit-box-pack:start}ul.stepper .step-actions .btn-flat:not(:last-child),ul.stepper .step-actions .btn-large:not(:last-child),ul.stepper .step-actions .btn:not(:last-child){margin-right:.3125rem}ul.stepper .step-new-content .row{margin-bottom:.4375rem}ul.stepper .validate{margin-bottom:0}ul.stepper.horizontal{position:relative;display:flex;justify-content:space-between;min-height:20rem;margin-left:-1.5rem;margin-right:-1.5rem;padding-left:1.5rem;padding-right:1.5rem;overflow:hidden}ul.stepper.horizontal:before{content:\"\";background-color:transparent;width:100%;min-height:5.25rem;position:absolute;left:-3px;border-top-left-radius:2px}ul.stepper.horizontal:first-child{margin-top:-2.7rem}ul.stepper.horizontal .step{position:static;margin:0;width:100%;display:flex;align-items:center;height:5.25rem!important}ul.stepper.horizontal .step:not(:last-of-type):after{content:\"\";position:static;display:inline-block;width:100%;height:.0625rem}ul.stepper.horizontal>.step:last-of-type,ul.stepper.horizontal>.step[data-last=true]{width:auto!important}ul.stepper.horizontal>.step.active:not(:last-of-type):after{content:\"\";position:static;display:inline-block;width:100%;height:.0625rem}ul.stepper.horizontal .step.active .step-title:before{background-color:#4285f4}ul.stepper.horizontal .step.done .step-title:before{font-family:\"Font Awesome 5 Free\";font-weight:900;content:\"\uF00C\";font-size:1rem;background:#00c851}ul.stepper.horizontal .step.wrong .step-title:before{font-family:\"Font Awesome 5 Free\";font-weight:900;content:\"\uF071\";font-size:1.1rem;background-color:#ff3547}ul.stepper.horizontal .step-title{position:relative;line-height:5.25rem;height:5.25rem;margin:0;padding:0 1.5625rem 0 4.0625rem;display:inline-block;max-width:13.75rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex-shrink:0}ul.stepper.horizontal .step-label{position:absolute;top:20px;left:65px}ul.stepper.horizontal .step:before{content:none}ul.stepper.horizontal .step .step-title:before{position:absolute;top:1.7813rem;left:1.1875rem;counter-increment:section;content:counter(section);height:1.75rem;width:1.75rem;color:#fff;background-color:rgba(0,0,0,.3);border-radius:100%;text-align:center;line-height:1.75rem;font-weight:400}ul.stepper.horizontal .step-title:after{top:.9375rem}ul.stepper.horizontal .step-new-content{position:absolute;height:calc(100% - 84px);top:6rem;left:0;width:100%;overflow-y:auto;overflow-x:hidden;margin:0;padding:1.25rem 1.25rem 4.75rem}ul.stepper.horizontal .step-actions{position:absolute;bottom:0;left:0;width:100%;padding:20px;flex-direction:row-reverse}ul.stepper.horizontal .step-actions .btn-flat:not(:last-child),ul.stepper.horizontal .step-actions .btn-large:not(:last-child),ul.stepper.horizontal .step-actions .btn:not(:last-child){margin-left:.3125rem;margin-right:0}ul.stepper.horizontal .step-actions,ul.stepper.horizontal .step-new-content{padding-left:2.5rem;padding-right:2.5rem}ul.stepper .md-form label{left:0}ul.stepper .step.done:before{content:\"\uF00C\";font-family:\"Font Awesome 5 Pro\",\"Font Awesome 5 Free\"!important;font-weight:900;font-size:1rem}ul.stepper .step.wrong:before{content:\"\uF071\";font-family:\"Font Awesome 5 Pro\",\"Font Awesome 5 Free\"!important;font-weight:900;font-size:1.1rem}ul.stepper .step.active .step-title{font-weight:500}ul.stepper .step-new-content{overflow:hidden!important;height:auto!important}.card-body ul.stepper.horizontal li a:not(.picker__nav--prev):not(.picker__nav--next){padding:.84rem 2.14rem}.card-body ul.stepper.horizontal .step.active .step-title:before{background-color:#4285f4}.card-body ul.stepper.horizontal .step.done .step-title:before{content:\"\uF00C\";font-family:\"Font Awesome 5 Pro\",\"Font Awesome 5 Free\"!important;font-weight:900;font-size:1rem;background:#00c851}.card-body ul.stepper.horizontal .step.wrong .step-title:before{content:\"\uF071\";font-family:\"Font Awesome 5 Pro\",\"Font Awesome 5 Free\"!important;font-weight:900;font-size:1.1rem;background-color:#ff3547}.card-body ul.stepper.horizontal .step:before{content:none}@media (max-width:420px){ul.stepper.horizontal .step-title{padding-left:10px!important;padding-right:10px!important;line-height:9.25rem!important}}"]
        }),
        __param(3, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [WavesDirective,
            Renderer2,
            ChangeDetectorRef, String])
    ], MdbStepperComponent);
    return MdbStepperComponent;
}());
export { MdbStepperComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL3N0ZXBwZXIvc3RlcHBlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLEtBQUssRUFDTCxVQUFVLEVBQ1YsU0FBUyxFQUNULFlBQVksRUFDWixhQUFhLEVBQ2IsU0FBUyxFQUNULFdBQVcsRUFDWCxNQUFNLEVBQ04sbUJBQW1CLEVBQ25CLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULHVCQUF1QixFQUN2QixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxJQUFJLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRTtJQUFBO0lBS0EsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7O0FBbUJEO0lBZ0NFLDZCQUNTLE1BQXNCLEVBQ3JCLFNBQW9CLEVBQ3BCLE1BQXlCLEVBQ1osVUFBa0I7UUFIaEMsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7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QVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLDgzQkFBcUM7WUFFckMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsVUFBVSxFQUFFO2dCQUNWLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRTtvQkFDL0IsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7b0JBQzdFLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUN4RSxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ2hFLFVBQVUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUM1QyxDQUFDO2FBQ0g7WUFDRCxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDM0IsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7UUFxQ0csV0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7eUNBSEwsY0FBYztZQUNWLFNBQVM7WUFDWixpQkFBaUI7T0FuQ3hCLG1CQUFtQixDQW9TL0I7SUFBRCwwQkFBQztDQUFBLEFBcFNELElBb1NDO1NBcFNZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgUXVlcnlMaXN0LFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG4gIEFmdGVyVmlld0luaXQsXG4gIFJlbmRlcmVyMixcbiAgUExBVEZPUk1fSUQsXG4gIEluamVjdCxcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uRGVzdHJveSxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1kYlN0ZXBDb21wb25lbnQgfSBmcm9tICcuL3N0ZXAuY29tcG9uZW50JztcbmltcG9ydCB7IHRyaWdnZXIsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgYW5pbWF0ZSB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgV2F2ZXNEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9mcmVlL3dhdmVzL3dhdmVzLWVmZmVjdC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBmcm9tLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgU3RlcENoYW5nZUV2ZW50IHtcbiAgYWN0aXZlU3RlcDogTWRiU3RlcENvbXBvbmVudDtcbiAgYWN0aXZlU3RlcEluZGV4OiBudW1iZXI7XG4gIHByZXZpb3VzU3RlcDogTWRiU3RlcENvbXBvbmVudDtcbiAgcHJldmlvdXNTdGVwSW5kZXg6IG51bWJlcjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLXN0ZXBwZXInLFxuICBleHBvcnRBczogJ21kYlN0ZXBwZXInLFxuICB0ZW1wbGF0ZVVybDogJ3N0ZXBwZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zdGVwcGVyLW1vZHVsZS5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdzdGVwQ29udGVudFRyYW5zaXRpb24nLCBbXG4gICAgICBzdGF0ZSgncHJldmlvdXMnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTEwMCUpJywgZGlzcGxheTogJ25vbmUnIH0pKSxcbiAgICAgIHN0YXRlKCduZXh0Jywgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwMCUpJywgZGlzcGxheTogJ25vbmUnIH0pKSxcbiAgICAgIHN0YXRlKCdjdXJyZW50Jywgc3R5bGUoeyB0cmFuc2Zvcm06ICdub25lJywgZGlzcGxheTogJ2Jsb2NrJyB9KSksXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IConLCBhbmltYXRlKCc2MDBtcyBlYXNlJykpLFxuICAgIF0pLFxuICBdLFxuICBwcm92aWRlcnM6IFtXYXZlc0RpcmVjdGl2ZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJTdGVwcGVyQ29tcG9uZW50XG4gIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAgQENvbnRlbnRDaGlsZHJlbihNZGJTdGVwQ29tcG9uZW50KSBzdGVwczogUXVlcnlMaXN0PE1kYlN0ZXBDb21wb25lbnQ+O1xuICBAVmlld0NoaWxkcmVuKCdzdGVwVGl0bGUnKSBzdGVwVGl0bGVzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG4gIEBWaWV3Q2hpbGRyZW4oJ3N0ZXBDb250ZW50Jykgc3RlcENvbnRlbnRzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIGNvbnRhaW5lcjogRWxlbWVudFJlZjtcblxuICBASW5wdXQoKSBsaW5lYXIgPSBmYWxzZTtcbiAgQElucHV0KCkgZGlzYWJsZVdhdmVzID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIGdldCB2ZXJ0aWNhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmVydGljYWw7XG4gIH1cbiAgc2V0IHZlcnRpY2FsKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl92ZXJ0aWNhbCA9IHZhbHVlO1xuICAgICAgdGhpcy5ob3Jpem9udGFsID0gZmFsc2U7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3ZlcnRpY2FsID0gdmFsdWU7XG4gICAgICB0aGlzLmhvcml6b250YWwgPSB0cnVlO1xuICAgICAgaWYgKHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bdGhpcy5hY3RpdmVTdGVwSW5kZXhdKSB7XG4gICAgICAgIGNvbnN0IHN0ZXBFbENvbnRlbnQgPSB0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50LmNoaWxkcmVuW3RoaXMuX2FjdGl2ZVN0ZXBJbmRleF1cbiAgICAgICAgICAubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgdGhpcy5fdXBkYXRlSG9yaXpvbnRhbFN0ZXBwZXJIZWlnaHQodGhpcy5hY3RpdmVTdGVwSW5kZXgsIHN0ZXBFbENvbnRlbnQuY2xpZW50SGVpZ2h0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfdmVydGljYWwgPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgc3RlcENoYW5nZTogRXZlbnRFbWl0dGVyPFN0ZXBDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFN0ZXBDaGFuZ2VFdmVudD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcmlwcGxlOiBXYXZlc0RpcmVjdGl2ZSxcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy5pc0Jyb3dzZXIgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3k6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIGlzQnJvd3NlcjogYm9vbGVhbjtcbiAgaG9yaXpvbnRhbCA9IHRydWU7XG5cbiAgZ2V0IGFjdGl2ZVN0ZXBJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlU3RlcEluZGV4O1xuICB9XG5cbiAgc2V0IGFjdGl2ZVN0ZXBJbmRleCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fYWN0aXZlU3RlcEluZGV4ID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9hY3RpdmVTdGVwSW5kZXg6IG51bWJlcjtcbiAgcHJpdmF0ZSBfYWN0aXZlU3RlcDogTWRiU3RlcENvbXBvbmVudDtcbiAgcHJpdmF0ZSBzdGVwVGV4dENvbnRlbnQgPSAnJztcblxuICBzdGVwQ2hhbmdlU3ViamVjdDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcbiAgc3RlcENoYW5nZSQ6IE9ic2VydmFibGU8YW55PjtcblxuICBnZXRTdGVwQ2hhbmdlJCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnN0ZXBDaGFuZ2VTdWJqZWN0O1xuICB9XG5cbiAgb25DbGljayhpbmRleDogbnVtYmVyLCBldmVudDogYW55KSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVXYXZlcykge1xuICAgICAgY29uc3QgY2xpY2tlZEVsID0gdGhpcy5zdGVwVGl0bGVzLnRvQXJyYXkoKVtpbmRleF07XG4gICAgICB0aGlzLnJpcHBsZS5lbCA9IGNsaWNrZWRFbDtcbiAgICAgIHRoaXMucmlwcGxlLmNsaWNrKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pc1N0ZXBWYWxpZChzdGVwOiBNZGJTdGVwQ29tcG9uZW50KSB7XG4gICAgaWYgKCFzdGVwLnN0ZXBGb3JtKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc3RlcC5zdGVwRm9ybSAmJiBzdGVwLnN0ZXBGb3JtLnZhbGlkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRBbmltYXRpb25TdGF0ZShpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBuZXh0RWxQb3NpdGlvbiA9IGluZGV4IC0gdGhpcy5hY3RpdmVTdGVwSW5kZXg7XG4gICAgaWYgKG5leHRFbFBvc2l0aW9uIDwgMCkge1xuICAgICAgcmV0dXJuICdwcmV2aW91cyc7XG4gICAgfSBlbHNlIGlmIChuZXh0RWxQb3NpdGlvbiA+IDApIHtcbiAgICAgIHJldHVybiAnbmV4dCc7XG4gICAgfVxuICAgIHJldHVybiAnY3VycmVudCc7XG4gIH1cblxuICBwcml2YXRlIF9nZXRTdGVwQnlJbmRleChpbmRleDogbnVtYmVyKTogTWRiU3RlcENvbXBvbmVudCB7XG4gICAgcmV0dXJuIHRoaXMuc3RlcHMudG9BcnJheSgpW2luZGV4XTtcbiAgfVxuXG4gIG5leHQoKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlU3RlcEluZGV4IDwgdGhpcy5zdGVwcy5sZW5ndGggLSAxKSB7XG4gICAgICB0aGlzLnNldE5ld0FjdGl2ZVN0ZXAodGhpcy5hY3RpdmVTdGVwSW5kZXggKyAxKTtcbiAgICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHByZXZpb3VzKCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZVN0ZXBJbmRleCA+IDApIHtcbiAgICAgIHRoaXMuc2V0TmV3QWN0aXZlU3RlcCh0aGlzLmFjdGl2ZVN0ZXBJbmRleCAtIDEpO1xuICAgICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgc3VibWl0KCkge1xuICAgIGlmICh0aGlzLmxpbmVhcikge1xuICAgICAgdGhpcy5fbWFya0N1cnJlbnRBc0RvbmUoKTtcbiAgICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHNldE5ld0FjdGl2ZVN0ZXAoaW5kZXg6IG51bWJlcikge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudFN0ZXAgPSB0aGlzLl9hY3RpdmVTdGVwO1xuICAgICAgY29uc3QgY3VycmVudFN0ZXBJbmRleCA9IHRoaXMuX2FjdGl2ZVN0ZXBJbmRleDtcbiAgICAgIGNvbnN0IG5ld1N0ZXAgPSB0aGlzLl9nZXRTdGVwQnlJbmRleChpbmRleCk7XG4gICAgICBjb25zdCBuZXdTdGVwSW5kZXggPSB0aGlzLnN0ZXBzXG4gICAgICAgIC50b0FycmF5KClcbiAgICAgICAgLmZpbmRJbmRleCgoc3RlcDogTWRiU3RlcENvbXBvbmVudCkgPT4gc3RlcCA9PT0gbmV3U3RlcCk7XG5cbiAgICAgIGlmICh0aGlzLmxpbmVhciAmJiAhdGhpcy5faXNOZXdTdGVwTGluZWFyKGluZGV4KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdTdGVwSW5kZXggPCB0aGlzLl9hY3RpdmVTdGVwSW5kZXggJiYgIW5ld1N0ZXAuZWRpdGFibGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9yZW1vdmVTdGVwVmFsaWRhdGlvbkNsYXNzZXMobmV3U3RlcCk7XG5cbiAgICAgIGlmICh0aGlzLmxpbmVhciAmJiBpbmRleCA+IHRoaXMuYWN0aXZlU3RlcEluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLl9pc1N0ZXBWYWxpZCh0aGlzLl9hY3RpdmVTdGVwKSkge1xuICAgICAgICAgIHRoaXMuX21hcmtDdXJyZW50QXNEb25lKCk7XG4gICAgICAgICAgdGhpcy5fcmVtb3ZlQ3VycmVudEFjdGl2ZVN0ZXAoKTtcbiAgICAgICAgICB0aGlzLl9zZXRBY3RpdmVTdGVwKGluZGV4KTtcblxuICAgICAgICAgIHRoaXMuc3RlcENoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgIGFjdGl2ZVN0ZXA6IG5ld1N0ZXAsXG4gICAgICAgICAgICBhY3RpdmVTdGVwSW5kZXg6IG5ld1N0ZXBJbmRleCxcbiAgICAgICAgICAgIHByZXZpb3VzU3RlcDogY3VycmVudFN0ZXAsXG4gICAgICAgICAgICBwcmV2aW91c1N0ZXBJbmRleDogY3VycmVudFN0ZXBJbmRleCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9tYXJrQ3VycmVudEFzV3JvbmcoKTtcbiAgICAgICAgICB0aGlzLl9tYXJrU3RlcENvbnRyb2xzQXNEaXJ0eSh0aGlzLl9hY3RpdmVTdGVwKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGluZGV4IDwgdGhpcy5hY3RpdmVTdGVwSW5kZXgpIHtcbiAgICAgICAgICB0aGlzLl9yZW1vdmVTdGVwVmFsaWRhdGlvbkNsYXNzZXModGhpcy5fYWN0aXZlU3RlcCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZW1vdmVDdXJyZW50QWN0aXZlU3RlcCgpO1xuICAgICAgICB0aGlzLl9zZXRBY3RpdmVTdGVwKGluZGV4KTtcblxuICAgICAgICB0aGlzLnN0ZXBDaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgYWN0aXZlU3RlcDogbmV3U3RlcCxcbiAgICAgICAgICBhY3RpdmVTdGVwSW5kZXg6IG5ld1N0ZXBJbmRleCxcbiAgICAgICAgICBwcmV2aW91c1N0ZXA6IGN1cnJlbnRTdGVwLFxuICAgICAgICAgIHByZXZpb3VzU3RlcEluZGV4OiBjdXJyZW50U3RlcEluZGV4LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAwKTtcbiAgfVxuXG4gIHByaXZhdGUgX21hcmtDdXJyZW50QXNEb25lKCkge1xuICAgIHRoaXMuX2FjdGl2ZVN0ZXAuaXNEb25lID0gdHJ1ZTtcbiAgICB0aGlzLl9hY3RpdmVTdGVwLmlzV3JvbmcgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX21hcmtDdXJyZW50QXNXcm9uZygpIHtcbiAgICB0aGlzLl9hY3RpdmVTdGVwLmlzV3JvbmcgPSB0cnVlO1xuICAgIHRoaXMuX2FjdGl2ZVN0ZXAuaXNEb25lID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIF9tYXJrU3RlcENvbnRyb2xzQXNEaXJ0eShzdGVwOiBNZGJTdGVwQ29tcG9uZW50KSB7XG4gICAgY29uc3QgY29udHJvbHMgPSBzdGVwLnN0ZXBGb3JtLmNvbnRyb2xzO1xuICAgIGlmIChzdGVwLnN0ZXBGb3JtLmNvbnRyb2xzKSB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY29udHJvbHMpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2wgPSBjb250cm9sc1trZXlzW2ldXTtcblxuICAgICAgICBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XG4gICAgICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVTdGVwVmFsaWRhdGlvbkNsYXNzZXMoc3RlcDogTWRiU3RlcENvbXBvbmVudCkge1xuICAgIHN0ZXAuaXNEb25lID0gZmFsc2U7XG4gICAgc3RlcC5pc1dyb25nID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIF9pc05ld1N0ZXBMaW5lYXIobmV3U3RlcEluZGV4OiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVTdGVwSW5kZXggLSBuZXdTdGVwSW5kZXggPT09IDEgfHwgdGhpcy5hY3RpdmVTdGVwSW5kZXggLSBuZXdTdGVwSW5kZXggPT09IC0xO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0QWN0aXZlU3RlcChpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5zdGVwcy50b0FycmF5KClbaW5kZXhdLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLl91cGRhdGVIb3Jpem9udGFsU3RlcHBlckhlaWdodChpbmRleCk7XG4gICAgdGhpcy5hY3RpdmVTdGVwSW5kZXggPSBpbmRleDtcbiAgICB0aGlzLl9hY3RpdmVTdGVwID0gdGhpcy5fZ2V0U3RlcEJ5SW5kZXgodGhpcy5hY3RpdmVTdGVwSW5kZXgpO1xuICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlQ3VycmVudEFjdGl2ZVN0ZXAoKSB7XG4gICAgY29uc3QgY3VycmVudEFjdGl2ZVN0ZXAgPSB0aGlzLnN0ZXBzLmZpbmQoYWN0aXZlU3RlcCA9PiBhY3RpdmVTdGVwLmlzQWN0aXZlKTtcbiAgICBpZiAoY3VycmVudEFjdGl2ZVN0ZXApIHtcbiAgICAgIGN1cnJlbnRBY3RpdmVTdGVwLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmVzZXRBbGwoKSB7XG4gICAgdGhpcy5zdGVwcy5mb3JFYWNoKChzdGVwOiBNZGJTdGVwQ29tcG9uZW50KSA9PiB7XG4gICAgICBzdGVwLnJlc2V0KCk7XG4gICAgICB0aGlzLl9zZXRBY3RpdmVTdGVwKDApO1xuICAgICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVIb3Jpem9udGFsU3RlcHBlckhlaWdodChpbmRleDogbnVtYmVyLCBoZWlnaHQ/OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5ob3Jpem9udGFsICYmICF0aGlzLnZlcnRpY2FsKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RlcEhlaWdodCA9IGhlaWdodFxuICAgICAgICAgID8gaGVpZ2h0ICsgNTBcbiAgICAgICAgICA6IHRoaXMuc3RlcENvbnRlbnRzLnRvQXJyYXkoKVtpbmRleF0ubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQgKyA1MDtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIHN0ZXBIZWlnaHQgKyAncHgnKTtcbiAgICAgIH0sIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0Jyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFN0ZXBwZXJWYXJpYXRpb24oKSB7XG4gICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICBpZiAodGhpcy52ZXJ0aWNhbCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmhvcml6b250YWwgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0Jyk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9pbml0U3RlcHBlclZhcmlhdGlvbigpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX3NldEFjdGl2ZVN0ZXAoMCk7XG4gICAgdGhpcy5zdGVwQ2hhbmdlJCA9IGZyb20odGhpcy5zdGVwcy50b0FycmF5KCkpO1xuICAgIHRoaXMuZ2V0U3RlcENoYW5nZSQoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50LmNoaWxkcmVuW3RoaXMuYWN0aXZlU3RlcEluZGV4XSkge1xuICAgICAgICAgIGNvbnN0IHN0ZXBFbENvbnRlbnQgPSB0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50LmNoaWxkcmVuW3RoaXMuX2FjdGl2ZVN0ZXBJbmRleF1cbiAgICAgICAgICAgIC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAgIHRoaXMuX3VwZGF0ZUhvcml6b250YWxTdGVwcGVySGVpZ2h0KHRoaXMuYWN0aXZlU3RlcEluZGV4LCBzdGVwRWxDb250ZW50LmNsaWVudEhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgdGhpcy5zdGVwcy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCkpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIGlmICh0aGlzLnN0ZXBDb250ZW50cykge1xuICAgICAgY29uc3QgYWN0aXZlU3RlcCA9IHRoaXMuc3RlcENvbnRlbnRzXG4gICAgICAgIC5maWx0ZXIoKGVsOiBhbnksIGluZGV4OiBudW1iZXIpID0+IGVsICYmIGluZGV4ID09PSB0aGlzLmFjdGl2ZVN0ZXBJbmRleClcbiAgICAgICAgLm1hcCgoZWw6IGFueSkgPT4gZWwubmF0aXZlRWxlbWVudClbMF07XG4gICAgICBpZiAoYWN0aXZlU3RlcC5pbm5lckhUTWwgIT09IHRoaXMuc3RlcFRleHRDb250ZW50KSB7XG4gICAgICAgIHRoaXMuc3RlcENoYW5nZVN1YmplY3QubmV4dChhY3RpdmVTdGVwLmlubmVySFRNTCk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0ZXBUZXh0Q29udGVudCA9IGFjdGl2ZVN0ZXAuaW5uZXJIVE1MO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2Rlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kuY29tcGxldGUoKTtcbiAgfVxufVxuIl19