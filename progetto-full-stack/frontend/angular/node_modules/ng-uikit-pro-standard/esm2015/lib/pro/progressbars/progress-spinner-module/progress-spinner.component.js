import { Component, HostBinding, ChangeDetectionStrategy, Input, ElementRef, NgZone, Renderer2, Directive, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
/** A single degree in radians. */
const DEGREE_IN_RADIANS = Math.PI / 180;
/** Duration of the indeterminate animation. */
const DURATION_INDETERMINATE = 667;
/** Duration of the indeterminate animation. */
const DURATION_DETERMINATE = 225;
/** Start animation value of the indeterminate animation */
const startIndeterminate = 3;
/** End animation value of the indeterminate animation */
const endIndeterminate = 80;
/* Maximum angle for the arc. The angle can't be exactly 360, because the arc becomes hidden. */
const MAX_ANGLE = 359.99 / 100;
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * @docs-private
 */
export class MdProgressSpinnerCssMatStylerDirective {
}
MdProgressSpinnerCssMatStylerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mdbSpinners], mat-progress-spinner',
            },] }
];
MdProgressSpinnerCssMatStylerDirective.propDecorators = {
    true: [{ type: HostBinding, args: ['class.mat-progress-spinner',] }]
};
/**
 * <md-progress-spinner> component.
 */
export class MdProgressSpinnerComponent {
    constructor(_ngZone, _elementRef, _renderer, platformId) {
        this._ngZone = _ngZone;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /** The id of the last requested animation. */
        this._lastAnimationId = 0;
        this._mode = 'determinate';
        this._color = 'primary';
        this.isBrowser = false;
        this.isBrowser = isPlatformBrowser(platformId);
    }
    /**
     * Values for aria max and min are only defined as numbers when in a determinate mode.  We do this
     * because voiceover does not report the progress indicator as indeterminate if the aria min
     * and/or max value are number values.
     */
    get _ariaValueMin() {
        return this.mode === 'determinate' ? 0 : null;
    }
    get _ariaValueMax() {
        return this.mode === 'determinate' ? 100 : null;
    }
    /** @docs-private */
    get interdeterminateInterval() {
        return this._interdeterminateInterval;
    }
    /** @docs-private */
    set interdeterminateInterval(interval) {
        clearInterval(this._interdeterminateInterval);
        this._interdeterminateInterval = interval;
    }
    /**
     * Clean up any animations that were running.
     */
    ngOnDestroy() {
        this._cleanupIndeterminateAnimation();
    }
    /** The color of the progress-spinner. Can be primary, accent, or warn. */
    get color() {
        return this._color;
    }
    set color(value) {
        this._updateColor(value);
    }
    /** Value of the progress circle. It is bound to the host as the attribute aria-valuenow. */
    get value() {
        if (this.mode === 'determinate') {
            return this._value;
        }
        return;
    }
    set value(v) {
        if (v != null && this.mode === 'determinate') {
            const newValue = clamp(v);
            this._animateCircle(this.value || 0, newValue);
            this._value = newValue;
        }
    }
    /**
     * Mode of the progress circle
     *
     * Input must be one of the values from ProgressMode, defaults to 'determinate'.
     * mode is bound to the host as the attribute host.
     */
    get mode() {
        return this._mode;
    }
    set mode(mode) {
        if (mode !== this._mode) {
            if (mode === 'indeterminate') {
                this._startIndeterminateAnimation();
            }
            else {
                this._cleanupIndeterminateAnimation();
                this._animateCircle(0, this._value);
            }
            this._mode = mode;
        }
    }
    /**
     * Animates the circle from one percentage value to another.
     *
     * @param animateFrom The percentage of the circle filled starting the animation.
     * @param animateTo The percentage of the circle filled ending the animation.
     * @param ease The easing function to manage the pace of change in the animation.
     * @param duration The length of time to show the animation, in milliseconds.
     * @param rotation The starting angle of the circle fill, with 0° represented at the top center
     *    of the circle.
     */
    _animateCircle(animateFrom, animateTo, ease = linearEase, duration = DURATION_DETERMINATE, rotation = 0) {
        const id = ++this._lastAnimationId;
        const startTime = Date.now();
        const changeInValue = animateTo - animateFrom;
        // No need to animate it if the values are the same
        if (animateTo === animateFrom) {
            this._renderArc(animateTo, rotation);
        }
        else {
            const animation = () => {
                const elapsedTime = Math.max(0, Math.min(Date.now() - startTime, duration));
                this._renderArc(ease(elapsedTime, animateFrom, changeInValue, duration), rotation);
                // Prevent overlapping animations by checking if a new animation has been called for and
                // if the animation has lasted longer than the animation duration.
                if (id === this._lastAnimationId && elapsedTime < duration) {
                    requestAnimationFrame(animation);
                }
            };
            // Run the animation outside of Angular's zone, in order to avoid
            // hitting ZoneJS and change detection on each frame.
            this._ngZone.runOutsideAngular(animation);
        }
    }
    /**
     * Starts the indeterminate animation interval, if it is not already running.
     */
    _startIndeterminateAnimation() {
        let rotationStartPoint = 0;
        let start = startIndeterminate;
        let end = endIndeterminate;
        const duration = DURATION_INDETERMINATE;
        const animate = () => {
            this._animateCircle(start, end, materialEase, duration, rotationStartPoint);
            // Prevent rotation from reaching Number.MAX_SAFE_INTEGER.
            rotationStartPoint = (rotationStartPoint + end) % 100;
            const temp = start;
            start = -end;
            end = -temp;
        };
        if (this.isBrowser) {
            if (!this.interdeterminateInterval) {
                this._ngZone.runOutsideAngular(() => {
                    this.interdeterminateInterval = setInterval(animate, duration + 50, 0, false);
                    animate();
                });
            }
        }
    }
    /**
     * Removes interval, ending the animation.
     */
    _cleanupIndeterminateAnimation() {
        this.interdeterminateInterval = null;
    }
    /**
     * Renders the arc onto the SVG element. Proxies `getArc` while setting the proper
     * DOM attribute on the `<path>`.
     */
    _renderArc(currentValue, rotation = 0) {
        // Caches the path reference so it doesn't have to be looked up every time.
        const path = (this._path = this._path || this._elementRef.nativeElement.querySelector('path'));
        // Ensure that the path was found. This may not be the case if the
        // animation function fires too early.
        if (path) {
            path.setAttribute('d', getSvgArc(currentValue, rotation));
        }
    }
    /**
     * Updates the color of the progress-spinner by adding the new palette class to the element
     * and removing the old one.
     */
    _updateColor(newColor) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    }
    /** Sets the given palette class on the component element. */
    _setElementColor(color, isAdd) {
        if (color != null && color !== '') {
            if (isAdd) {
                this._renderer.addClass(this._elementRef.nativeElement, `mat-${color}`);
            }
        }
    }
}
MdProgressSpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-Spinners, mat-progress-spinner',
                template: "<!--\n  preserveAspectRatio of xMidYMid meet as the center of the viewport is the circle's\n  center. The center of the circle will remain at the center of the md-progress-spinner\n  element containing the SVG.\n-->\n<svg viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid meet\">\n  <path></path>\n</svg>",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
MdProgressSpinnerComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: Renderer2 },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
MdProgressSpinnerComponent.propDecorators = {
    platformId: [{ type: Inject, args: [PLATFORM_ID,] }],
    color: [{ type: Input }],
    value: [{ type: Input }, { type: HostBinding, args: ['attr.aria-valuenow',] }],
    mode: [{ type: HostBinding, args: ['attr.mode',] }, { type: Input }]
};
/**
 * <md-spinner> component.
 *
 * This is a component definition to be used as a convenience reference to create an
 * indeterminate <md-progress-spinner> instance.
 */
export class MdSpinnerComponent extends MdProgressSpinnerComponent {
    constructor(elementRef, ngZone, renderer) {
        super(ngZone, elementRef, renderer);
        this.mode = 'indeterminate';
    }
    ngOnDestroy() {
        // The `ngOnDestroy` from `MdProgressSpinner` should be called explicitly, because
        // in certain cases Angular won't call it (e.g. when using AoT and in unit tests).
        super.ngOnDestroy();
    }
}
MdSpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-spinners, mat-spinner, mdb-progress-spinner',
                template: "<!--\n  preserveAspectRatio of xMidYMid meet as the center of the viewport is the circle's\n  center. The center of the circle will remain at the center of the md-progress-spinner\n  element containing the SVG.\n-->\n<svg viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid meet\">\n  <path></path>\n</svg>",
                styles: [":host{display:block;height:100px;overflow:hidden;width:100px}:host svg{height:100%;transform-origin:center;width:100%}:host path{fill:transparent;stroke-width:10px;transition:stroke .3s cubic-bezier(.35,0,.25,1)}:host[mode=indeterminate] svg{-webkit-animation-duration:5.25s,2.887s;-webkit-animation-iteration-count:infinite;-webkit-animation-name:mat-progress-spinner-sporadic-rotate,mat-progress-spinner-linear-rotate;-webkit-animation-timing-function:cubic-bezier(.35,0,.25,1),linear;animation-duration:5.25s,2.887s;animation-iteration-count:infinite;animation-name:mat-progress-spinner-sporadic-rotate,mat-progress-spinner-linear-rotate;animation-timing-function:cubic-bezier(.35,0,.25,1),linear;transition:none}@-webkit-keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0)}to{transform:rotate(1turn)}}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0)}to{transform:rotate(1turn)}}@-webkit-keyframes mat-progress-spinner-sporadic-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}to{transform:rotate(3turn)}}@keyframes mat-progress-spinner-sporadic-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}to{transform:rotate(3turn)}}"]
            },] }
];
MdSpinnerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 }
];
MdSpinnerComponent.propDecorators = {
    true: [{ type: HostBinding, args: ['class.mat-spinner',] }]
};
/**
 * Module functions.
 */
/** Clamps a value to be between 0 and 100. */
function clamp(v) {
    return Math.max(0, Math.min(100, v));
}
/**
 * Converts Polar coordinates to Cartesian.
 */
function polarToCartesian(radius, pathRadius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * DEGREE_IN_RADIANS;
    return (radius +
        pathRadius * Math.cos(angleInRadians) +
        ',' +
        (radius + pathRadius * Math.sin(angleInRadians)));
}
/**
 * Easing function for linear animation.
 */
function linearEase(currentTime, startValue, changeInValue, duration) {
    return (changeInValue * currentTime) / duration + startValue;
}
/**
 * Easing function to match material design indeterminate animation.
 */
function materialEase(currentTime, startValue, changeInValue, duration) {
    const time = currentTime / duration;
    const timeCubed = Math.pow(time, 3);
    const timeQuad = Math.pow(time, 4);
    const timeQuint = Math.pow(time, 5);
    return startValue + changeInValue * (6 * timeQuint + -15 * timeQuad + 10 * timeCubed);
}
/**
 * Determines the path value to define the arc.  Converting percentage values to to polar
 * coordinates on the circle, and then to cartesian coordinates in the viewport.
 *
 * @param currentValue The current percentage value of the progress circle, the percentage of the
 *    circle to fill.
 * @param rotation The starting point of the circle with 0 being the 0 degree point.
 * @return A string for an SVG path representing a circle filled from the starting point to the
 *    percentage value provided.
 */
function getSvgArc(currentValue, rotation) {
    const startPoint = rotation || 0;
    const radius = 50;
    const pathRadius = 40;
    const startAngle = startPoint * MAX_ANGLE;
    const endAngle = currentValue * MAX_ANGLE;
    const start = polarToCartesian(radius, pathRadius, startAngle);
    const end = polarToCartesian(radius, pathRadius, endAngle + startAngle);
    const arcSweep = endAngle < 0 ? 0 : 1;
    let largeArcFlag;
    if (endAngle < 0) {
        largeArcFlag = endAngle >= -180 ? 0 : 1;
    }
    else {
        largeArcFlag = endAngle <= 180 ? 0 : 1;
    }
    return `M${start}A${pathRadius},${pathRadius} 0 ${largeArcFlag},${arcSweep} ${end}`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3Mtc3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy11aWtpdC1wcm8tc3RhbmRhcmQvc3JjL2xpYi9wcm8vcHJvZ3Jlc3NiYXJzL3Byb2dyZXNzLXNwaW5uZXItbW9kdWxlL3Byb2dyZXNzLXNwaW5uZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsV0FBVyxFQUNYLHVCQUF1QixFQUV2QixLQUFLLEVBQ0wsVUFBVSxFQUNWLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBELGtDQUFrQztBQUNsQyxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO0FBQ3hDLCtDQUErQztBQUMvQyxNQUFNLHNCQUFzQixHQUFHLEdBQUcsQ0FBQztBQUNuQywrQ0FBK0M7QUFDL0MsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUM7QUFDakMsMkRBQTJEO0FBQzNELE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLHlEQUF5RDtBQUN6RCxNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztBQUM1QixnR0FBZ0c7QUFDaEcsTUFBTSxTQUFTLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQVcvQjs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sc0NBQXNDOzs7WUFIbEQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQ0FBcUM7YUFDaEQ7OzttQkFFRSxXQUFXLFNBQUMsNEJBQTRCOztBQUczQzs7R0FFRztBQU1ILE1BQU0sT0FBTywwQkFBMEI7SUErRnJDLFlB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QUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDekM7U0FBTTtRQUNMLFlBQVksR0FBRyxRQUFRLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4QztJQUVELE9BQU8sSUFBSSxLQUFLLElBQUksVUFBVSxJQUFJLFVBQVUsTUFBTSxZQUFZLElBQUksUUFBUSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3RGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEhvc3RCaW5kaW5nLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgT25EZXN0cm95LFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgTmdab25lLFxuICBSZW5kZXJlcjIsXG4gIERpcmVjdGl2ZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQTEFURk9STV9JRCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKiBBIHNpbmdsZSBkZWdyZWUgaW4gcmFkaWFucy4gKi9cbmNvbnN0IERFR1JFRV9JTl9SQURJQU5TID0gTWF0aC5QSSAvIDE4MDtcbi8qKiBEdXJhdGlvbiBvZiB0aGUgaW5kZXRlcm1pbmF0ZSBhbmltYXRpb24uICovXG5jb25zdCBEVVJBVElPTl9JTkRFVEVSTUlOQVRFID0gNjY3O1xuLyoqIER1cmF0aW9uIG9mIHRoZSBpbmRldGVybWluYXRlIGFuaW1hdGlvbi4gKi9cbmNvbnN0IERVUkFUSU9OX0RFVEVSTUlOQVRFID0gMjI1O1xuLyoqIFN0YXJ0IGFuaW1hdGlvbiB2YWx1ZSBvZiB0aGUgaW5kZXRlcm1pbmF0ZSBhbmltYXRpb24gKi9cbmNvbnN0IHN0YXJ0SW5kZXRlcm1pbmF0ZSA9IDM7XG4vKiogRW5kIGFuaW1hdGlvbiB2YWx1ZSBvZiB0aGUgaW5kZXRlcm1pbmF0ZSBhbmltYXRpb24gKi9cbmNvbnN0IGVuZEluZGV0ZXJtaW5hdGUgPSA4MDtcbi8qIE1heGltdW0gYW5nbGUgZm9yIHRoZSBhcmMuIFRoZSBhbmdsZSBjYW4ndCBiZSBleGFjdGx5IDM2MCwgYmVjYXVzZSB0aGUgYXJjIGJlY29tZXMgaGlkZGVuLiAqL1xuY29uc3QgTUFYX0FOR0xFID0gMzU5Ljk5IC8gMTAwO1xuXG5leHBvcnQgdHlwZSBQcm9ncmVzc1NwaW5uZXJNb2RlID0gJ2RldGVybWluYXRlJyB8ICdpbmRldGVybWluYXRlJztcblxudHlwZSBFYXNpbmdGbiA9IChcbiAgY3VycmVudFRpbWU6IG51bWJlcixcbiAgc3RhcnRWYWx1ZTogbnVtYmVyLFxuICBjaGFuZ2VJblZhbHVlOiBudW1iZXIsXG4gIGR1cmF0aW9uOiBudW1iZXJcbikgPT4gbnVtYmVyO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB3aG9zZSBwdXJwb3NlIGlzIHRvIGFkZCB0aGUgbWF0LSBDU1Mgc3R5bGluZyB0byB0aGlzIHNlbGVjdG9yLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWRiU3Bpbm5lcnNdLCBtYXQtcHJvZ3Jlc3Mtc3Bpbm5lcicsXG59KVxuZXhwb3J0IGNsYXNzIE1kUHJvZ3Jlc3NTcGlubmVyQ3NzTWF0U3R5bGVyRGlyZWN0aXZlIHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tYXQtcHJvZ3Jlc3Mtc3Bpbm5lcicpIHRydWU6IGFueTtcbn1cblxuLyoqXG4gKiA8bWQtcHJvZ3Jlc3Mtc3Bpbm5lcj4gY29tcG9uZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItU3Bpbm5lcnMsIG1hdC1wcm9ncmVzcy1zcGlubmVyJyxcbiAgdGVtcGxhdGVVcmw6ICdwcm9ncmVzcy1zcGlubmVyLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kUHJvZ3Jlc3NTcGlubmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqIFRoZSBpZCBvZiB0aGUgbGFzdCByZXF1ZXN0ZWQgYW5pbWF0aW9uLiAqL1xuICBwcml2YXRlIF9sYXN0QW5pbWF0aW9uSWQgPSAwO1xuXG4gIC8qKiBUaGUgaWQgb2YgdGhlIGluZGV0ZXJtaW5hdGUgaW50ZXJ2YWwuICovXG4gIHByaXZhdGUgX2ludGVyZGV0ZXJtaW5hdGVJbnRlcnZhbDogYW55O1xuXG4gIC8qKiBUaGUgU1ZHIDxwYXRoPiBub2RlIHRoYXQgaXMgdXNlZCB0byBkcmF3IHRoZSBjaXJjbGUuICovXG4gIHByaXZhdGUgX3BhdGg6IFNWR1BhdGhFbGVtZW50O1xuXG4gIHByaXZhdGUgX21vZGU6IFByb2dyZXNzU3Bpbm5lck1vZGUgPSAnZGV0ZXJtaW5hdGUnO1xuICBwcml2YXRlIF92YWx1ZTogbnVtYmVyO1xuICBwcml2YXRlIF9jb2xvciA9ICdwcmltYXJ5JztcblxuICBpc0Jyb3dzZXI6IGFueSA9IGZhbHNlO1xuICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBWYWx1ZXMgZm9yIGFyaWEgbWF4IGFuZCBtaW4gYXJlIG9ubHkgZGVmaW5lZCBhcyBudW1iZXJzIHdoZW4gaW4gYSBkZXRlcm1pbmF0ZSBtb2RlLiAgV2UgZG8gdGhpc1xuICAgKiBiZWNhdXNlIHZvaWNlb3ZlciBkb2VzIG5vdCByZXBvcnQgdGhlIHByb2dyZXNzIGluZGljYXRvciBhcyBpbmRldGVybWluYXRlIGlmIHRoZSBhcmlhIG1pblxuICAgKiBhbmQvb3IgbWF4IHZhbHVlIGFyZSBudW1iZXIgdmFsdWVzLlxuICAgKi9cbiAgZ2V0IF9hcmlhVmFsdWVNaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kZSA9PT0gJ2RldGVybWluYXRlJyA/IDAgOiBudWxsO1xuICB9XG5cbiAgZ2V0IF9hcmlhVmFsdWVNYXgoKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kZSA9PT0gJ2RldGVybWluYXRlJyA/IDEwMCA6IG51bGw7XG4gIH1cblxuICAvKiogQGRvY3MtcHJpdmF0ZSAqL1xuICBnZXQgaW50ZXJkZXRlcm1pbmF0ZUludGVydmFsKCkge1xuICAgIHJldHVybiB0aGlzLl9pbnRlcmRldGVybWluYXRlSW50ZXJ2YWw7XG4gIH1cbiAgLyoqIEBkb2NzLXByaXZhdGUgKi9cbiAgc2V0IGludGVyZGV0ZXJtaW5hdGVJbnRlcnZhbChpbnRlcnZhbCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJkZXRlcm1pbmF0ZUludGVydmFsKTtcbiAgICB0aGlzLl9pbnRlcmRldGVybWluYXRlSW50ZXJ2YWwgPSBpbnRlcnZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhbiB1cCBhbnkgYW5pbWF0aW9ucyB0aGF0IHdlcmUgcnVubmluZy5cbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2NsZWFudXBJbmRldGVybWluYXRlQW5pbWF0aW9uKCk7XG4gIH1cblxuICAvKiogVGhlIGNvbG9yIG9mIHRoZSBwcm9ncmVzcy1zcGlubmVyLiBDYW4gYmUgcHJpbWFyeSwgYWNjZW50LCBvciB3YXJuLiAqL1xuICBASW5wdXQoKVxuICBnZXQgY29sb3IoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gIH1cbiAgc2V0IGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl91cGRhdGVDb2xvcih2YWx1ZSk7XG4gIH1cblxuICAvKiogVmFsdWUgb2YgdGhlIHByb2dyZXNzIGNpcmNsZS4gSXQgaXMgYm91bmQgdG8gdGhlIGhvc3QgYXMgdGhlIGF0dHJpYnV0ZSBhcmlhLXZhbHVlbm93LiAqL1xuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS12YWx1ZW5vdycpXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICdkZXRlcm1pbmF0ZScpIHtcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIHNldCB2YWx1ZSh2OiBudW1iZXIgfCBhbnkpIHtcbiAgICBpZiAodiAhPSBudWxsICYmIHRoaXMubW9kZSA9PT0gJ2RldGVybWluYXRlJykge1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSBjbGFtcCh2KTtcbiAgICAgIHRoaXMuX2FuaW1hdGVDaXJjbGUodGhpcy52YWx1ZSB8fCAwLCBuZXdWYWx1ZSk7XG4gICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb2RlIG9mIHRoZSBwcm9ncmVzcyBjaXJjbGVcbiAgICpcbiAgICogSW5wdXQgbXVzdCBiZSBvbmUgb2YgdGhlIHZhbHVlcyBmcm9tIFByb2dyZXNzTW9kZSwgZGVmYXVsdHMgdG8gJ2RldGVybWluYXRlJy5cbiAgICogbW9kZSBpcyBib3VuZCB0byB0aGUgaG9zdCBhcyB0aGUgYXR0cmlidXRlIGhvc3QuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2F0dHIubW9kZScpXG4gIEBJbnB1dCgpXG4gIGdldCBtb2RlKCkge1xuICAgIHJldHVybiB0aGlzLl9tb2RlO1xuICB9XG4gIHNldCBtb2RlKG1vZGU6IFByb2dyZXNzU3Bpbm5lck1vZGUpIHtcbiAgICBpZiAobW9kZSAhPT0gdGhpcy5fbW9kZSkge1xuICAgICAgaWYgKG1vZGUgPT09ICdpbmRldGVybWluYXRlJykge1xuICAgICAgICB0aGlzLl9zdGFydEluZGV0ZXJtaW5hdGVBbmltYXRpb24oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXBJbmRldGVybWluYXRlQW5pbWF0aW9uKCk7XG4gICAgICAgIHRoaXMuX2FuaW1hdGVDaXJjbGUoMCwgdGhpcy5fdmFsdWUpO1xuICAgICAgfVxuICAgICAgdGhpcy5fbW9kZSA9IG1vZGU7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ/OiBzdHJpbmcgfCBhbnlcbiAgKSB7XG4gICAgdGhpcy5pc0Jyb3dzZXIgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbmltYXRlcyB0aGUgY2lyY2xlIGZyb20gb25lIHBlcmNlbnRhZ2UgdmFsdWUgdG8gYW5vdGhlci5cbiAgICpcbiAgICogQHBhcmFtIGFuaW1hdGVGcm9tIFRoZSBwZXJjZW50YWdlIG9mIHRoZSBjaXJjbGUgZmlsbGVkIHN0YXJ0aW5nIHRoZSBhbmltYXRpb24uXG4gICAqIEBwYXJhbSBhbmltYXRlVG8gVGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIGNpcmNsZSBmaWxsZWQgZW5kaW5nIHRoZSBhbmltYXRpb24uXG4gICAqIEBwYXJhbSBlYXNlIFRoZSBlYXNpbmcgZnVuY3Rpb24gdG8gbWFuYWdlIHRoZSBwYWNlIG9mIGNoYW5nZSBpbiB0aGUgYW5pbWF0aW9uLlxuICAgKiBAcGFyYW0gZHVyYXRpb24gVGhlIGxlbmd0aCBvZiB0aW1lIHRvIHNob3cgdGhlIGFuaW1hdGlvbiwgaW4gbWlsbGlzZWNvbmRzLlxuICAgKiBAcGFyYW0gcm90YXRpb24gVGhlIHN0YXJ0aW5nIGFuZ2xlIG9mIHRoZSBjaXJjbGUgZmlsbCwgd2l0aCAwwrAgcmVwcmVzZW50ZWQgYXQgdGhlIHRvcCBjZW50ZXJcbiAgICogICAgb2YgdGhlIGNpcmNsZS5cbiAgICovXG4gIHByaXZhdGUgX2FuaW1hdGVDaXJjbGUoXG4gICAgYW5pbWF0ZUZyb206IG51bWJlcixcbiAgICBhbmltYXRlVG86IG51bWJlcixcbiAgICBlYXNlOiBFYXNpbmdGbiA9IGxpbmVhckVhc2UsXG4gICAgZHVyYXRpb24gPSBEVVJBVElPTl9ERVRFUk1JTkFURSxcbiAgICByb3RhdGlvbiA9IDBcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgaWQgPSArK3RoaXMuX2xhc3RBbmltYXRpb25JZDtcbiAgICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IGNoYW5nZUluVmFsdWUgPSBhbmltYXRlVG8gLSBhbmltYXRlRnJvbTtcblxuICAgIC8vIE5vIG5lZWQgdG8gYW5pbWF0ZSBpdCBpZiB0aGUgdmFsdWVzIGFyZSB0aGUgc2FtZVxuICAgIGlmIChhbmltYXRlVG8gPT09IGFuaW1hdGVGcm9tKSB7XG4gICAgICB0aGlzLl9yZW5kZXJBcmMoYW5pbWF0ZVRvLCByb3RhdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGFuaW1hdGlvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZWxhcHNlZFRpbWUgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihEYXRlLm5vdygpIC0gc3RhcnRUaW1lLCBkdXJhdGlvbikpO1xuXG4gICAgICAgIHRoaXMuX3JlbmRlckFyYyhlYXNlKGVsYXBzZWRUaW1lLCBhbmltYXRlRnJvbSwgY2hhbmdlSW5WYWx1ZSwgZHVyYXRpb24pLCByb3RhdGlvbik7XG5cbiAgICAgICAgLy8gUHJldmVudCBvdmVybGFwcGluZyBhbmltYXRpb25zIGJ5IGNoZWNraW5nIGlmIGEgbmV3IGFuaW1hdGlvbiBoYXMgYmVlbiBjYWxsZWQgZm9yIGFuZFxuICAgICAgICAvLyBpZiB0aGUgYW5pbWF0aW9uIGhhcyBsYXN0ZWQgbG9uZ2VyIHRoYW4gdGhlIGFuaW1hdGlvbiBkdXJhdGlvbi5cbiAgICAgICAgaWYgKGlkID09PSB0aGlzLl9sYXN0QW5pbWF0aW9uSWQgJiYgZWxhcHNlZFRpbWUgPCBkdXJhdGlvbikge1xuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRpb24pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyBSdW4gdGhlIGFuaW1hdGlvbiBvdXRzaWRlIG9mIEFuZ3VsYXIncyB6b25lLCBpbiBvcmRlciB0byBhdm9pZFxuICAgICAgLy8gaGl0dGluZyBab25lSlMgYW5kIGNoYW5nZSBkZXRlY3Rpb24gb24gZWFjaCBmcmFtZS5cbiAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcihhbmltYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgdGhlIGluZGV0ZXJtaW5hdGUgYW5pbWF0aW9uIGludGVydmFsLCBpZiBpdCBpcyBub3QgYWxyZWFkeSBydW5uaW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3RhcnRJbmRldGVybWluYXRlQW5pbWF0aW9uKCk6IHZvaWQge1xuICAgIGxldCByb3RhdGlvblN0YXJ0UG9pbnQgPSAwO1xuICAgIGxldCBzdGFydCA9IHN0YXJ0SW5kZXRlcm1pbmF0ZTtcbiAgICBsZXQgZW5kID0gZW5kSW5kZXRlcm1pbmF0ZTtcbiAgICBjb25zdCBkdXJhdGlvbiA9IERVUkFUSU9OX0lOREVURVJNSU5BVEU7XG4gICAgY29uc3QgYW5pbWF0ZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuX2FuaW1hdGVDaXJjbGUoc3RhcnQsIGVuZCwgbWF0ZXJpYWxFYXNlLCBkdXJhdGlvbiwgcm90YXRpb25TdGFydFBvaW50KTtcbiAgICAgIC8vIFByZXZlbnQgcm90YXRpb24gZnJvbSByZWFjaGluZyBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUi5cbiAgICAgIHJvdGF0aW9uU3RhcnRQb2ludCA9IChyb3RhdGlvblN0YXJ0UG9pbnQgKyBlbmQpICUgMTAwO1xuICAgICAgY29uc3QgdGVtcCA9IHN0YXJ0O1xuICAgICAgc3RhcnQgPSAtZW5kO1xuICAgICAgZW5kID0gLXRlbXA7XG4gICAgfTtcblxuICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgaWYgKCF0aGlzLmludGVyZGV0ZXJtaW5hdGVJbnRlcnZhbCkge1xuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW50ZXJkZXRlcm1pbmF0ZUludGVydmFsID0gc2V0SW50ZXJ2YWwoYW5pbWF0ZSwgZHVyYXRpb24gKyA1MCwgMCwgZmFsc2UpO1xuICAgICAgICAgIGFuaW1hdGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgaW50ZXJ2YWwsIGVuZGluZyB0aGUgYW5pbWF0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBfY2xlYW51cEluZGV0ZXJtaW5hdGVBbmltYXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5pbnRlcmRldGVybWluYXRlSW50ZXJ2YWwgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIGFyYyBvbnRvIHRoZSBTVkcgZWxlbWVudC4gUHJveGllcyBgZ2V0QXJjYCB3aGlsZSBzZXR0aW5nIHRoZSBwcm9wZXJcbiAgICogRE9NIGF0dHJpYnV0ZSBvbiB0aGUgYDxwYXRoPmAuXG4gICAqL1xuICBwcml2YXRlIF9yZW5kZXJBcmMoY3VycmVudFZhbHVlOiBudW1iZXIsIHJvdGF0aW9uID0gMCk6IHZvaWQge1xuICAgIC8vIENhY2hlcyB0aGUgcGF0aCByZWZlcmVuY2Ugc28gaXQgZG9lc24ndCBoYXZlIHRvIGJlIGxvb2tlZCB1cCBldmVyeSB0aW1lLlxuICAgIGNvbnN0IHBhdGggPSAodGhpcy5fcGF0aCA9IHRoaXMuX3BhdGggfHwgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BhdGgnKSk7XG5cbiAgICAvLyBFbnN1cmUgdGhhdCB0aGUgcGF0aCB3YXMgZm91bmQuIFRoaXMgbWF5IG5vdCBiZSB0aGUgY2FzZSBpZiB0aGVcbiAgICAvLyBhbmltYXRpb24gZnVuY3Rpb24gZmlyZXMgdG9vIGVhcmx5LlxuICAgIGlmIChwYXRoKSB7XG4gICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIGdldFN2Z0FyYyhjdXJyZW50VmFsdWUsIHJvdGF0aW9uKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGNvbG9yIG9mIHRoZSBwcm9ncmVzcy1zcGlubmVyIGJ5IGFkZGluZyB0aGUgbmV3IHBhbGV0dGUgY2xhc3MgdG8gdGhlIGVsZW1lbnRcbiAgICogYW5kIHJlbW92aW5nIHRoZSBvbGQgb25lLlxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlQ29sb3IobmV3Q29sb3I6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3NldEVsZW1lbnRDb2xvcih0aGlzLl9jb2xvciwgZmFsc2UpO1xuICAgIHRoaXMuX3NldEVsZW1lbnRDb2xvcihuZXdDb2xvciwgdHJ1ZSk7XG4gICAgdGhpcy5fY29sb3IgPSBuZXdDb2xvcjtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSBnaXZlbiBwYWxldHRlIGNsYXNzIG9uIHRoZSBjb21wb25lbnQgZWxlbWVudC4gKi9cbiAgcHJpdmF0ZSBfc2V0RWxlbWVudENvbG9yKGNvbG9yOiBzdHJpbmcsIGlzQWRkOiBib29sZWFuKSB7XG4gICAgaWYgKGNvbG9yICE9IG51bGwgJiYgY29sb3IgIT09ICcnKSB7XG4gICAgICBpZiAoaXNBZGQpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBgbWF0LSR7Y29sb3J9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogPG1kLXNwaW5uZXI+IGNvbXBvbmVudC5cbiAqXG4gKiBUaGlzIGlzIGEgY29tcG9uZW50IGRlZmluaXRpb24gdG8gYmUgdXNlZCBhcyBhIGNvbnZlbmllbmNlIHJlZmVyZW5jZSB0byBjcmVhdGUgYW5cbiAqIGluZGV0ZXJtaW5hdGUgPG1kLXByb2dyZXNzLXNwaW5uZXI+IGluc3RhbmNlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItc3Bpbm5lcnMsIG1hdC1zcGlubmVyLCBtZGItcHJvZ3Jlc3Mtc3Bpbm5lcicsXG4gIHRlbXBsYXRlVXJsOiAncHJvZ3Jlc3Mtc3Bpbm5lci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwcm9ncmVzcy1zcGlubmVyLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE1kU3Bpbm5lckNvbXBvbmVudCBleHRlbmRzIE1kUHJvZ3Jlc3NTcGlubmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tYXQtc3Bpbm5lcicpIHRydWU6IGFueTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBuZ1pvbmU6IE5nWm9uZSwgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHN1cGVyKG5nWm9uZSwgZWxlbWVudFJlZiwgcmVuZGVyZXIpO1xuICAgIHRoaXMubW9kZSA9ICdpbmRldGVybWluYXRlJztcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIC8vIFRoZSBgbmdPbkRlc3Ryb3lgIGZyb20gYE1kUHJvZ3Jlc3NTcGlubmVyYCBzaG91bGQgYmUgY2FsbGVkIGV4cGxpY2l0bHksIGJlY2F1c2VcbiAgICAvLyBpbiBjZXJ0YWluIGNhc2VzIEFuZ3VsYXIgd29uJ3QgY2FsbCBpdCAoZS5nLiB3aGVuIHVzaW5nIEFvVCBhbmQgaW4gdW5pdCB0ZXN0cykuXG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgfVxufVxuXG4vKipcbiAqIE1vZHVsZSBmdW5jdGlvbnMuXG4gKi9cblxuLyoqIENsYW1wcyBhIHZhbHVlIHRvIGJlIGJldHdlZW4gMCBhbmQgMTAwLiAqL1xuZnVuY3Rpb24gY2xhbXAodjogbnVtYmVyKSB7XG4gIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsIHYpKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBQb2xhciBjb29yZGluYXRlcyB0byBDYXJ0ZXNpYW4uXG4gKi9cbmZ1bmN0aW9uIHBvbGFyVG9DYXJ0ZXNpYW4ocmFkaXVzOiBudW1iZXIsIHBhdGhSYWRpdXM6IG51bWJlciwgYW5nbGVJbkRlZ3JlZXM6IG51bWJlcikge1xuICBjb25zdCBhbmdsZUluUmFkaWFucyA9IChhbmdsZUluRGVncmVlcyAtIDkwKSAqIERFR1JFRV9JTl9SQURJQU5TO1xuXG4gIHJldHVybiAoXG4gICAgcmFkaXVzICtcbiAgICBwYXRoUmFkaXVzICogTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpICtcbiAgICAnLCcgK1xuICAgIChyYWRpdXMgKyBwYXRoUmFkaXVzICogTWF0aC5zaW4oYW5nbGVJblJhZGlhbnMpKVxuICApO1xufVxuXG4vKipcbiAqIEVhc2luZyBmdW5jdGlvbiBmb3IgbGluZWFyIGFuaW1hdGlvbi5cbiAqL1xuZnVuY3Rpb24gbGluZWFyRWFzZShcbiAgY3VycmVudFRpbWU6IG51bWJlcixcbiAgc3RhcnRWYWx1ZTogbnVtYmVyLFxuICBjaGFuZ2VJblZhbHVlOiBudW1iZXIsXG4gIGR1cmF0aW9uOiBudW1iZXJcbikge1xuICByZXR1cm4gKGNoYW5nZUluVmFsdWUgKiBjdXJyZW50VGltZSkgLyBkdXJhdGlvbiArIHN0YXJ0VmFsdWU7XG59XG5cbi8qKlxuICogRWFzaW5nIGZ1bmN0aW9uIHRvIG1hdGNoIG1hdGVyaWFsIGRlc2lnbiBpbmRldGVybWluYXRlIGFuaW1hdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWF0ZXJpYWxFYXNlKFxuICBjdXJyZW50VGltZTogbnVtYmVyLFxuICBzdGFydFZhbHVlOiBudW1iZXIsXG4gIGNoYW5nZUluVmFsdWU6IG51bWJlcixcbiAgZHVyYXRpb246IG51bWJlclxuKSB7XG4gIGNvbnN0IHRpbWUgPSBjdXJyZW50VGltZSAvIGR1cmF0aW9uO1xuICBjb25zdCB0aW1lQ3ViZWQgPSBNYXRoLnBvdyh0aW1lLCAzKTtcbiAgY29uc3QgdGltZVF1YWQgPSBNYXRoLnBvdyh0aW1lLCA0KTtcbiAgY29uc3QgdGltZVF1aW50ID0gTWF0aC5wb3codGltZSwgNSk7XG4gIHJldHVybiBzdGFydFZhbHVlICsgY2hhbmdlSW5WYWx1ZSAqICg2ICogdGltZVF1aW50ICsgLTE1ICogdGltZVF1YWQgKyAxMCAqIHRpbWVDdWJlZCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB0aGUgcGF0aCB2YWx1ZSB0byBkZWZpbmUgdGhlIGFyYy4gIENvbnZlcnRpbmcgcGVyY2VudGFnZSB2YWx1ZXMgdG8gdG8gcG9sYXJcbiAqIGNvb3JkaW5hdGVzIG9uIHRoZSBjaXJjbGUsIGFuZCB0aGVuIHRvIGNhcnRlc2lhbiBjb29yZGluYXRlcyBpbiB0aGUgdmlld3BvcnQuXG4gKlxuICogQHBhcmFtIGN1cnJlbnRWYWx1ZSBUaGUgY3VycmVudCBwZXJjZW50YWdlIHZhbHVlIG9mIHRoZSBwcm9ncmVzcyBjaXJjbGUsIHRoZSBwZXJjZW50YWdlIG9mIHRoZVxuICogICAgY2lyY2xlIHRvIGZpbGwuXG4gKiBAcGFyYW0gcm90YXRpb24gVGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBjaXJjbGUgd2l0aCAwIGJlaW5nIHRoZSAwIGRlZ3JlZSBwb2ludC5cbiAqIEByZXR1cm4gQSBzdHJpbmcgZm9yIGFuIFNWRyBwYXRoIHJlcHJlc2VudGluZyBhIGNpcmNsZSBmaWxsZWQgZnJvbSB0aGUgc3RhcnRpbmcgcG9pbnQgdG8gdGhlXG4gKiAgICBwZXJjZW50YWdlIHZhbHVlIHByb3ZpZGVkLlxuICovXG5mdW5jdGlvbiBnZXRTdmdBcmMoY3VycmVudFZhbHVlOiBudW1iZXIsIHJvdGF0aW9uOiBudW1iZXIpIHtcbiAgY29uc3Qgc3RhcnRQb2ludCA9IHJvdGF0aW9uIHx8IDA7XG4gIGNvbnN0IHJhZGl1cyA9IDUwO1xuICBjb25zdCBwYXRoUmFkaXVzID0gNDA7XG5cbiAgY29uc3Qgc3RhcnRBbmdsZSA9IHN0YXJ0UG9pbnQgKiBNQVhfQU5HTEU7XG4gIGNvbnN0IGVuZEFuZ2xlID0gY3VycmVudFZhbHVlICogTUFYX0FOR0xFO1xuICBjb25zdCBzdGFydCA9IHBvbGFyVG9DYXJ0ZXNpYW4ocmFkaXVzLCBwYXRoUmFkaXVzLCBzdGFydEFuZ2xlKTtcbiAgY29uc3QgZW5kID0gcG9sYXJUb0NhcnRlc2lhbihyYWRpdXMsIHBhdGhSYWRpdXMsIGVuZEFuZ2xlICsgc3RhcnRBbmdsZSk7XG4gIGNvbnN0IGFyY1N3ZWVwID0gZW5kQW5nbGUgPCAwID8gMCA6IDE7XG4gIGxldCBsYXJnZUFyY0ZsYWc6IG51bWJlcjtcblxuICBpZiAoZW5kQW5nbGUgPCAwKSB7XG4gICAgbGFyZ2VBcmNGbGFnID0gZW5kQW5nbGUgPj0gLTE4MCA/IDAgOiAxO1xuICB9IGVsc2Uge1xuICAgIGxhcmdlQXJjRmxhZyA9IGVuZEFuZ2xlIDw9IDE4MCA/IDAgOiAxO1xuICB9XG5cbiAgcmV0dXJuIGBNJHtzdGFydH1BJHtwYXRoUmFkaXVzfSwke3BhdGhSYWRpdXN9IDAgJHtsYXJnZUFyY0ZsYWd9LCR7YXJjU3dlZXB9ICR7ZW5kfWA7XG59XG4iXX0=