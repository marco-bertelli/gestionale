import { Injectable } from '@angular/core';
export class CarouselConfig {
    constructor() {
        /** Default interval of auto changing of slides */
        this.interval = 5000;
        /** Is loop of auto changing of slides can be paused */
        this.noPause = false;
        /** Is slides can wrap from the last to the first slide */
        this.noWrap = false;
        this.keyboard = false;
    }
}
CarouselConfig.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctdWlraXQtcHJvLXN0YW5kYXJkL3NyYy9saWIvZnJlZS9jYXJvdXNlbC9jYXJvdXNlbC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxNQUFNLE9BQU8sY0FBYztJQUQzQjtRQUVFLGtEQUFrRDtRQUMzQyxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBRXZCLHVEQUF1RDtRQUNoRCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXZCLDBEQUEwRDtRQUNuRCxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWYsYUFBUSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDOzs7WUFaQSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb25maWcge1xuICAvKiogRGVmYXVsdCBpbnRlcnZhbCBvZiBhdXRvIGNoYW5naW5nIG9mIHNsaWRlcyAqL1xuICBwdWJsaWMgaW50ZXJ2YWwgPSA1MDAwO1xuXG4gIC8qKiBJcyBsb29wIG9mIGF1dG8gY2hhbmdpbmcgb2Ygc2xpZGVzIGNhbiBiZSBwYXVzZWQgKi9cbiAgcHVibGljIG5vUGF1c2UgPSBmYWxzZTtcblxuICAvKiogSXMgc2xpZGVzIGNhbiB3cmFwIGZyb20gdGhlIGxhc3QgdG8gdGhlIGZpcnN0IHNsaWRlICovXG4gIHB1YmxpYyBub1dyYXAgPSBmYWxzZTtcblxuICBwdWJsaWMga2V5Ym9hcmQgPSBmYWxzZTtcbn1cbiJdfQ==