import { Directive, ElementRef, HostListener } from '@angular/core';
export class WavesDirective {
    constructor(el) {
        this.el = el;
    }
    click(event) {
        if (!this.el.nativeElement.classList.contains('disabled')) {
            const button = this.el.nativeElement;
            if (!button.classList.contains('waves-effect')) {
                button.className += ' waves-effect';
            }
            const xPos = event.clientX - button.getBoundingClientRect().left;
            const yPos = event.clientY - button.getBoundingClientRect().top;
            const tmp = document.createElement('div');
            tmp.className += 'waves-ripple waves-rippling';
            const ripple = button.appendChild(tmp);
            const top = yPos + 'px';
            const left = xPos + 'px';
            tmp.style.top = top;
            tmp.style.left = left;
            const scale = 'scale(' + (button.clientWidth / 100) * 3 + ') translate(0,0)';
            // tslint:disable-next-line: deprecation
            tmp.style.webkitTransform = scale;
            tmp.style.transform = scale;
            tmp.style.opacity = '1';
            const duration = 750;
            // tslint:disable-next-line: deprecation
            tmp.style.webkitTransitionDuration = duration + 'ms';
            tmp.style.transitionDuration = duration + 'ms';
            this.removeRipple(button, ripple);
        }
    }
    removeRipple(button, ripple) {
        ripple.classList.remove('waves-rippling');
        setTimeout(() => {
            ripple.style.opacity = '0';
            setTimeout(() => {
                button.removeChild(ripple);
            }, 750);
        }, 200);
    }
}
WavesDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mdbWavesEffect]',
            },] }
];
WavesDirective.ctorParameters = () => [
    { type: ElementRef }
];
WavesDirective.propDecorators = {
    click: [{ type: HostListener, args: ['click', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F2ZXMtZWZmZWN0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXVpa2l0LXByby1zdGFuZGFyZC9zcmMvbGliL2ZyZWUvd2F2ZXMvd2F2ZXMtZWZmZWN0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJcEUsTUFBTSxPQUFPLGNBQWM7SUFDekIsWUFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7SUFBRyxDQUFDO0lBRzlCLEtBQUssQ0FBQyxLQUFVO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3pELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRTtnQkFDOUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxlQUFlLENBQUM7YUFDckM7WUFFRCxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksQ0FBQztZQUNqRSxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUVoRSxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLEdBQUcsQ0FBQyxTQUFTLElBQUksNkJBQTZCLENBQUM7WUFDL0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV2QyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7WUFFekIsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ3BCLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUV0QixNQUFNLEtBQUssR0FBRyxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxrQkFBa0IsQ0FBQztZQUU3RSx3Q0FBd0M7WUFDeEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUM1QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFFeEIsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDO1lBRXJCLHdDQUF3QztZQUN4QyxHQUFHLENBQUMsS0FBSyxDQUFDLHdCQUF3QixHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckQsR0FBRyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBRS9DLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUVELFlBQVksQ0FBQyxNQUFXLEVBQUUsTUFBVztRQUNuQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFFM0IsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNWLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUM7OztZQXRERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjthQUM3Qjs7O1lBSG1CLFVBQVU7OztvQkFPM0IsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWRiV2F2ZXNFZmZlY3RdJyxcbn0pXG5leHBvcnQgY2xhc3MgV2F2ZXNEaXJlY3RpdmUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBwdWJsaWMgY2xpY2soZXZlbnQ6IGFueSkge1xuICAgIGlmICghdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICAgY29uc3QgYnV0dG9uID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgaWYgKCFidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCd3YXZlcy1lZmZlY3QnKSkge1xuICAgICAgICBidXR0b24uY2xhc3NOYW1lICs9ICcgd2F2ZXMtZWZmZWN0JztcbiAgICAgIH1cblxuICAgICAgY29uc3QgeFBvcyA9IGV2ZW50LmNsaWVudFggLSBidXR0b24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgIGNvbnN0IHlQb3MgPSBldmVudC5jbGllbnRZIC0gYnV0dG9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgY29uc3QgdG1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0bXAuY2xhc3NOYW1lICs9ICd3YXZlcy1yaXBwbGUgd2F2ZXMtcmlwcGxpbmcnO1xuICAgICAgY29uc3QgcmlwcGxlID0gYnV0dG9uLmFwcGVuZENoaWxkKHRtcCk7XG5cbiAgICAgIGNvbnN0IHRvcCA9IHlQb3MgKyAncHgnO1xuICAgICAgY29uc3QgbGVmdCA9IHhQb3MgKyAncHgnO1xuXG4gICAgICB0bXAuc3R5bGUudG9wID0gdG9wO1xuICAgICAgdG1wLnN0eWxlLmxlZnQgPSBsZWZ0O1xuXG4gICAgICBjb25zdCBzY2FsZSA9ICdzY2FsZSgnICsgKGJ1dHRvbi5jbGllbnRXaWR0aCAvIDEwMCkgKiAzICsgJykgdHJhbnNsYXRlKDAsMCknO1xuXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICB0bXAuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gc2NhbGU7XG4gICAgICB0bXAuc3R5bGUudHJhbnNmb3JtID0gc2NhbGU7XG4gICAgICB0bXAuc3R5bGUub3BhY2l0eSA9ICcxJztcblxuICAgICAgY29uc3QgZHVyYXRpb24gPSA3NTA7XG5cbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgIHRtcC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbiArICdtcyc7XG4gICAgICB0bXAuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb24gKyAnbXMnO1xuXG4gICAgICB0aGlzLnJlbW92ZVJpcHBsZShidXR0b24sIHJpcHBsZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlUmlwcGxlKGJ1dHRvbjogYW55LCByaXBwbGU6IGFueSkge1xuICAgIHJpcHBsZS5jbGFzc0xpc3QucmVtb3ZlKCd3YXZlcy1yaXBwbGluZycpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByaXBwbGUuc3R5bGUub3BhY2l0eSA9ICcwJztcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGJ1dHRvbi5yZW1vdmVDaGlsZChyaXBwbGUpO1xuICAgICAgfSwgNzUwKTtcbiAgICB9LCAyMDApO1xuICB9XG59XG4iXX0=