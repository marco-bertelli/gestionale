import { Injectable, isDevMode } from '@angular/core';
import { PageScrollConfig } from './mdb-page-scroll.config';
import { PageScrollUtilService as Util } from './mdb-page-scroll-util.service';
export class PageScrollService {
    constructor() {
        this.runningInstances = [];
        this.onInterrupted = {
            report: (event, pageScrollInstance) => {
                if (!pageScrollInstance.interruptible) {
                    // Non-interruptible anyway, so do not stop anything
                    return;
                }
                let shouldStop = true;
                if (event.type === 'keyup') {
                    // Only stop if specific keys have been pressed, for all others don't stop anything
                    // tslint:disable-next-line: deprecation
                    if (PageScrollConfig._interruptKeys.indexOf(event.keyCode) === -1) {
                        // The pressed key is not in the list of interrupting keys
                        shouldStop = false;
                    }
                }
                else if (event.type === 'mousedown') {
                    // For mousedown events we only stop the scroll animation of the mouse has
                    // been clicked inside the scrolling container
                    if (!pageScrollInstance.scrollingViews.some(scrollingView => scrollingView.contains(event.target))) {
                        // Mouse clicked an element which is not inside any of the the scrolling containers
                        shouldStop = false;
                    }
                }
                if (shouldStop) {
                    this.stopAll(pageScrollInstance.namespace);
                }
            },
        };
        if (PageScrollService.instanceCounter > 0 && isDevMode()) {
            console.warn('An instance of PageScrollService already exists, usually ' +
                'including one provider should be enough, so double check.');
        }
        PageScrollService.instanceCounter++;
    }
    stopInternal(interrupted, pageScrollInstance) {
        const index = this.runningInstances.indexOf(pageScrollInstance);
        if (index >= 0) {
            this.runningInstances.splice(index, 1);
        }
        if (pageScrollInstance.interruptListenersAttached) {
            pageScrollInstance.detachInterruptListeners();
        }
        if (pageScrollInstance.timer) {
            // Clear/Stop the timer
            clearInterval(pageScrollInstance.timer);
            // Clear the reference to this timer
            pageScrollInstance.timer = undefined;
            pageScrollInstance.fireEvent(!interrupted);
            return true;
        }
        return false;
    }
    /**
     * Start a scroll animation. All properties of the animation are stored in the given {@link PageScrollInstance} object.
     *
     * This is the core functionality of the whole library.
     *
     */
    start(pageScrollInstance) {
        // Stop all possibly running scroll animations in the same namespace
        this.stopAll(pageScrollInstance.namespace);
        if (pageScrollInstance.scrollingViews === null ||
            pageScrollInstance.scrollingViews.length === 0) {
            // No scrollingViews specified, thus we can't animate anything
            if (isDevMode()) {
                console.warn('No scrollingViews specified, this ng2-page-scroll does not know which DOM elements to scroll');
            }
            return;
        }
        let startScrollPositionFound = false;
        // Reset start scroll position to 0. If any of the scrollingViews has a different one, it will be extracted next
        pageScrollInstance.startScrollPosition = 0;
        // Get the start scroll position from the scrollingViews (e.g. if the user already scrolled down the content)
        pageScrollInstance.scrollingViews.forEach((scrollingView) => {
            if (Util.isUndefinedOrNull(scrollingView)) {
                return;
            }
            // Get the scrollTop or scrollLeft value of the first scrollingView that returns a value for its "scrollTop"
            // or "scrollLeft" property that is not undefined and unequal to 0
            const scrollPosition = pageScrollInstance.getScrollPropertyValue(scrollingView);
            if (!startScrollPositionFound && scrollPosition) {
                // We found a scrollingView that does not have scrollTop or scrollLeft 0
                // Return the scroll position value, as this will be our startScrollPosition
                pageScrollInstance.startScrollPosition = scrollPosition;
                startScrollPositionFound = true;
            }
        });
        const pageScrollOffset = pageScrollInstance.getCurrentOffset();
        // Calculate the target position that the scroll animation should go to
        const scrollTargetPosition = pageScrollInstance.extractScrollTargetPosition();
        pageScrollInstance.targetScrollPosition = Math.round((pageScrollInstance.verticalScrolling
            ? scrollTargetPosition.top
            : scrollTargetPosition.left) - pageScrollOffset);
        // Calculate the distance we need to go in total
        pageScrollInstance.distanceToScroll =
            pageScrollInstance.targetScrollPosition - pageScrollInstance.startScrollPosition;
        if (isNaN(pageScrollInstance.distanceToScroll)) {
            // We weren't able to find the target position, maybe the element does not exist?
            if (isDevMode()) {
                // console.log('Scrolling not possible, as we can\'t find the specified target');
            }
            pageScrollInstance.fireEvent(false);
            return;
        }
        // We're at the final destination already
        // OR we need to scroll down but are already at the end
        // OR we need to scroll up but are at the top already
        const allReadyAtDestination = Math.abs(pageScrollInstance.distanceToScroll) < PageScrollConfig._minScrollDistance;
        // Check how long we need to scroll if a speed option is given
        // Default executionDuration is the specified duration
        pageScrollInstance.executionDuration = pageScrollInstance.duration;
        // Maybe we need to pay attention to the speed option?
        if (!Util.isUndefinedOrNull(pageScrollInstance.speed) &&
            Util.isUndefinedOrNull(pageScrollInstance.duration)) {
            // Speed option is set and no duration => calculate duration based on speed and scroll distance
            pageScrollInstance.executionDuration =
                (pageScrollInstance.distanceToScroll / pageScrollInstance.speed) * 1000;
        }
        // We should go there directly, as our "animation" would have one big step
        // only anyway and this way we save the interval stuff
        const tooShortInterval = pageScrollInstance.executionDuration <= PageScrollConfig._interval;
        if (allReadyAtDestination || tooShortInterval) {
            if (isDevMode()) {
                if (allReadyAtDestination) {
                    // console.log('Scrolling not possible, as we can\'t get any closer to the destination');
                }
                else {
                    // console.log('Scroll duration shorter that interval length, jumping to target');
                }
            }
            pageScrollInstance.setScrollPosition(pageScrollInstance.targetScrollPosition);
            pageScrollInstance.fireEvent(true);
            return;
        }
        // Register the interrupt listeners if we want an interruptible scroll animation
        if (pageScrollInstance.interruptible ||
            (Util.isUndefinedOrNull(pageScrollInstance.interruptible) &&
                PageScrollConfig.defaultInterruptible)) {
            pageScrollInstance.attachInterruptListeners(this.onInterrupted);
        }
        // Let's get started, get the start time...
        pageScrollInstance.startTime = new Date().getTime();
        // .. and calculate the end time (when we need to finish at last)
        pageScrollInstance.endTime =
            pageScrollInstance.startTime + pageScrollInstance.executionDuration;
        pageScrollInstance.timer = setInterval((_pageScrollInstance) => {
            // Take the current time
            const currentTime = new Date().getTime();
            // Determine the new scroll position
            let newScrollPosition;
            let stopNow = false;
            if (_pageScrollInstance.endTime <= currentTime) {
                // We're over the time already, so go the targetScrollPosition (aka destination)
                newScrollPosition = _pageScrollInstance.targetScrollPosition;
                stopNow = true;
            }
            else {
                // Calculate the scroll position based on the current time using the easing function
                newScrollPosition = Math.round(_pageScrollInstance.easingLogic.ease(currentTime - _pageScrollInstance.startTime, _pageScrollInstance.startScrollPosition, _pageScrollInstance.distanceToScroll, _pageScrollInstance.executionDuration));
            }
            // Set the new scrollPosition to all scrollingViews elements
            if (!_pageScrollInstance.setScrollPosition(newScrollPosition)) {
                // Setting the new scrollTop/scrollLeft value failed for all ScrollingViews
                // early stop the scroll animation to save resources
                stopNow = true;
            }
            // At the end do the internal stop maintenance and fire the pageScrollFinish event
            // (otherwise the event might arrive at "too early")
            if (stopNow) {
                this.stopInternal(false, _pageScrollInstance);
            }
        }, PageScrollConfig._interval, pageScrollInstance);
        // Register the instance as running one
        this.runningInstances.push(pageScrollInstance);
    }
    /**
     * Stop all running scroll animations. Optionally limit to stop only the ones of specific namespace.
     *
     */
    stopAll(namespace) {
        if (this.runningInstances.length > 0) {
            let stoppedSome = false;
            for (let i = 0; i < this.runningInstances.length; ++i) {
                const pageScrollInstance = this.runningInstances[i];
                if (Util.isUndefinedOrNull(namespace) ||
                    namespace.length === 0 ||
                    pageScrollInstance.namespace === namespace) {
                    stoppedSome = true;
                    this.stopInternal(true, pageScrollInstance);
                    // Decrease the counter, as we removed an item from the array we iterate over
                    i--;
                }
            }
            return stoppedSome;
        }
        return false;
    }
    stop(pageScrollInstance) {
        return this.stopInternal(true, pageScrollInstance);
    }
}
PageScrollService.instanceCounter = 0;
PageScrollService.decorators = [
    { type: Injectable }
];
PageScrollService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXBhZ2Utc2Nyb2xsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy11aWtpdC1wcm8tc3RhbmRhcmQvc3JjL2xpYi9wcm8vc21vb3Roc2Nyb2xsL21kYi1wYWdlLXNjcm9sbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTVELE9BQU8sRUFBRSxxQkFBcUIsSUFBSSxJQUFJLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUcvRSxNQUFNLE9BQU8saUJBQWlCO0lBZ1E1QjtRQTdQUSxxQkFBZ0IsR0FBeUIsRUFBRSxDQUFDO1FBRTVDLGtCQUFhLEdBQXNCO1lBQ3pDLE1BQU0sRUFBRSxDQUFDLEtBQVksRUFBRSxrQkFBc0MsRUFBUSxFQUFFO2dCQUNyRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFO29CQUNyQyxvREFBb0Q7b0JBQ3BELE9BQU87aUJBQ1I7Z0JBRUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUV0QixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO29CQUMxQixtRkFBbUY7b0JBQ25GLHdDQUF3QztvQkFDeEMsSUFBSSxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFpQixLQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7d0JBQ2xGLDBEQUEwRDt3QkFDMUQsVUFBVSxHQUFHLEtBQUssQ0FBQztxQkFDcEI7aUJBQ0Y7cUJBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTtvQkFDckMsMEVBQTBFO29CQUMxRSw4Q0FBOEM7b0JBQzlDLElBQ0UsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsSUFB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QUFFO2dCQUNyRCxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsSUFDRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDO29CQUNqQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUM7b0JBQ3RCLGtCQUFrQixDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQzFDO29CQUNBLFdBQVcsR0FBRyxJQUFJLENBQUM7b0JBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7b0JBQzVDLDZFQUE2RTtvQkFDN0UsQ0FBQyxFQUFFLENBQUM7aUJBQ0w7YUFDRjtZQUNELE9BQU8sV0FBVyxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU0sSUFBSSxDQUFDLGtCQUFzQztRQUNoRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDckQsQ0FBQzs7QUE3UGMsaUNBQWUsR0FBRyxDQUFDLENBQUM7O1lBRnBDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGFnZVNjcm9sbENvbmZpZyB9IGZyb20gJy4vbWRiLXBhZ2Utc2Nyb2xsLmNvbmZpZyc7XG5pbXBvcnQgeyBQYWdlU2Nyb2xsSW5zdGFuY2UsIEludGVycnVwdFJlcG9ydGVyIH0gZnJvbSAnLi9tZGItcGFnZS1zY3JvbGwuaW5zdGFuY2UnO1xuaW1wb3J0IHsgUGFnZVNjcm9sbFV0aWxTZXJ2aWNlIGFzIFV0aWwgfSBmcm9tICcuL21kYi1wYWdlLXNjcm9sbC11dGlsLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFnZVNjcm9sbFNlcnZpY2Uge1xuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZUNvdW50ZXIgPSAwO1xuXG4gIHByaXZhdGUgcnVubmluZ0luc3RhbmNlczogUGFnZVNjcm9sbEluc3RhbmNlW10gPSBbXTtcblxuICBwcml2YXRlIG9uSW50ZXJydXB0ZWQ6IEludGVycnVwdFJlcG9ydGVyID0ge1xuICAgIHJlcG9ydDogKGV2ZW50OiBFdmVudCwgcGFnZVNjcm9sbEluc3RhbmNlOiBQYWdlU2Nyb2xsSW5zdGFuY2UpOiB2b2lkID0+IHtcbiAgICAgIGlmICghcGFnZVNjcm9sbEluc3RhbmNlLmludGVycnVwdGlibGUpIHtcbiAgICAgICAgLy8gTm9uLWludGVycnVwdGlibGUgYW55d2F5LCBzbyBkbyBub3Qgc3RvcCBhbnl0aGluZ1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBzaG91bGRTdG9wID0gdHJ1ZTtcblxuICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdrZXl1cCcpIHtcbiAgICAgICAgLy8gT25seSBzdG9wIGlmIHNwZWNpZmljIGtleXMgaGF2ZSBiZWVuIHByZXNzZWQsIGZvciBhbGwgb3RoZXJzIGRvbid0IHN0b3AgYW55dGhpbmdcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBpZiAoUGFnZVNjcm9sbENvbmZpZy5faW50ZXJydXB0S2V5cy5pbmRleE9mKCg8S2V5Ym9hcmRFdmVudD5ldmVudCkua2V5Q29kZSkgPT09IC0xKSB7XG4gICAgICAgICAgLy8gVGhlIHByZXNzZWQga2V5IGlzIG5vdCBpbiB0aGUgbGlzdCBvZiBpbnRlcnJ1cHRpbmcga2V5c1xuICAgICAgICAgIHNob3VsZFN0b3AgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50eXBlID09PSAnbW91c2Vkb3duJykge1xuICAgICAgICAvLyBGb3IgbW91c2Vkb3duIGV2ZW50cyB3ZSBvbmx5IHN0b3AgdGhlIHNjcm9sbCBhbmltYXRpb24gb2YgdGhlIG1vdXNlIGhhc1xuICAgICAgICAvLyBiZWVuIGNsaWNrZWQgaW5zaWRlIHRoZSBzY3JvbGxpbmcgY29udGFpbmVyXG4gICAgICAgIGlmIChcbiAgICAgICAgICAhcGFnZVNjcm9sbEluc3RhbmNlLnNjcm9sbGluZ1ZpZXdzLnNvbWUoc2Nyb2xsaW5nVmlldyA9PlxuICAgICAgICAgICAgc2Nyb2xsaW5nVmlldy5jb250YWlucyhldmVudC50YXJnZXQpXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBNb3VzZSBjbGlja2VkIGFuIGVsZW1lbnQgd2hpY2ggaXMgbm90IGluc2lkZSBhbnkgb2YgdGhlIHRoZSBzY3JvbGxpbmcgY29udGFpbmVyc1xuICAgICAgICAgIHNob3VsZFN0b3AgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc2hvdWxkU3RvcCkge1xuICAgICAgICB0aGlzLnN0b3BBbGwocGFnZVNjcm9sbEluc3RhbmNlLm5hbWVzcGFjZSk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcblxuICBwcml2YXRlIHN0b3BJbnRlcm5hbChpbnRlcnJ1cHRlZDogYm9vbGVhbiwgcGFnZVNjcm9sbEluc3RhbmNlOiBQYWdlU2Nyb2xsSW5zdGFuY2UpOiBib29sZWFuIHtcbiAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy5ydW5uaW5nSW5zdGFuY2VzLmluZGV4T2YocGFnZVNjcm9sbEluc3RhbmNlKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5ydW5uaW5nSW5zdGFuY2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHBhZ2VTY3JvbGxJbnN0YW5jZS5pbnRlcnJ1cHRMaXN0ZW5lcnNBdHRhY2hlZCkge1xuICAgICAgcGFnZVNjcm9sbEluc3RhbmNlLmRldGFjaEludGVycnVwdExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIGlmIChwYWdlU2Nyb2xsSW5zdGFuY2UudGltZXIpIHtcbiAgICAgIC8vIENsZWFyL1N0b3AgdGhlIHRpbWVyXG4gICAgICBjbGVhckludGVydmFsKHBhZ2VTY3JvbGxJbnN0YW5jZS50aW1lcik7XG4gICAgICAvLyBDbGVhciB0aGUgcmVmZXJlbmNlIHRvIHRoaXMgdGltZXJcbiAgICAgIHBhZ2VTY3JvbGxJbnN0YW5jZS50aW1lciA9IHVuZGVmaW5lZDtcbiAgICAgIHBhZ2VTY3JvbGxJbnN0YW5jZS5maXJlRXZlbnQoIWludGVycnVwdGVkKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgYSBzY3JvbGwgYW5pbWF0aW9uLiBBbGwgcHJvcGVydGllcyBvZiB0aGUgYW5pbWF0aW9uIGFyZSBzdG9yZWQgaW4gdGhlIGdpdmVuIHtAbGluayBQYWdlU2Nyb2xsSW5zdGFuY2V9IG9iamVjdC5cbiAgICpcbiAgICogVGhpcyBpcyB0aGUgY29yZSBmdW5jdGlvbmFsaXR5IG9mIHRoZSB3aG9sZSBsaWJyYXJ5LlxuICAgKlxuICAgKi9cbiAgcHVibGljIHN0YXJ0KHBhZ2VTY3JvbGxJbnN0YW5jZTogUGFnZVNjcm9sbEluc3RhbmNlKTogdm9pZCB7XG4gICAgLy8gU3RvcCBhbGwgcG9zc2libHkgcnVubmluZyBzY3JvbGwgYW5pbWF0aW9ucyBpbiB0aGUgc2FtZSBuYW1lc3BhY2VcbiAgICB0aGlzLnN0b3BBbGwocGFnZVNjcm9sbEluc3RhbmNlLm5hbWVzcGFjZSk7XG5cbiAgICBpZiAoXG4gICAgICBwYWdlU2Nyb2xsSW5zdGFuY2Uuc2Nyb2xsaW5nVmlld3MgPT09IG51bGwgfHxcbiAgICAgIHBhZ2VTY3JvbGxJbnN0YW5jZS5zY3JvbGxpbmdWaWV3cy5sZW5ndGggPT09IDBcbiAgICApIHtcbiAgICAgIC8vIE5vIHNjcm9sbGluZ1ZpZXdzIHNwZWNpZmllZCwgdGh1cyB3ZSBjYW4ndCBhbmltYXRlIGFueXRoaW5nXG4gICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdObyBzY3JvbGxpbmdWaWV3cyBzcGVjaWZpZWQsIHRoaXMgbmcyLXBhZ2Utc2Nyb2xsIGRvZXMgbm90IGtub3cgd2hpY2ggRE9NIGVsZW1lbnRzIHRvIHNjcm9sbCdcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgc3RhcnRTY3JvbGxQb3NpdGlvbkZvdW5kID0gZmFsc2U7XG4gICAgLy8gUmVzZXQgc3RhcnQgc2Nyb2xsIHBvc2l0aW9uIHRvIDAuIElmIGFueSBvZiB0aGUgc2Nyb2xsaW5nVmlld3MgaGFzIGEgZGlmZmVyZW50IG9uZSwgaXQgd2lsbCBiZSBleHRyYWN0ZWQgbmV4dFxuICAgIHBhZ2VTY3JvbGxJbnN0YW5jZS5zdGFydFNjcm9sbFBvc2l0aW9uID0gMDtcblxuICAgIC8vIEdldCB0aGUgc3RhcnQgc2Nyb2xsIHBvc2l0aW9uIGZyb20gdGhlIHNjcm9sbGluZ1ZpZXdzIChlLmcuIGlmIHRoZSB1c2VyIGFscmVhZHkgc2Nyb2xsZWQgZG93biB0aGUgY29udGVudClcbiAgICBwYWdlU2Nyb2xsSW5zdGFuY2Uuc2Nyb2xsaW5nVmlld3MuZm9yRWFjaCgoc2Nyb2xsaW5nVmlldzogYW55KSA9PiB7XG4gICAgICBpZiAoVXRpbC5pc1VuZGVmaW5lZE9yTnVsbChzY3JvbGxpbmdWaWV3KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBHZXQgdGhlIHNjcm9sbFRvcCBvciBzY3JvbGxMZWZ0IHZhbHVlIG9mIHRoZSBmaXJzdCBzY3JvbGxpbmdWaWV3IHRoYXQgcmV0dXJucyBhIHZhbHVlIGZvciBpdHMgXCJzY3JvbGxUb3BcIlxuICAgICAgLy8gb3IgXCJzY3JvbGxMZWZ0XCIgcHJvcGVydHkgdGhhdCBpcyBub3QgdW5kZWZpbmVkIGFuZCB1bmVxdWFsIHRvIDBcblxuICAgICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSBwYWdlU2Nyb2xsSW5zdGFuY2UuZ2V0U2Nyb2xsUHJvcGVydHlWYWx1ZShzY3JvbGxpbmdWaWV3KTtcbiAgICAgIGlmICghc3RhcnRTY3JvbGxQb3NpdGlvbkZvdW5kICYmIHNjcm9sbFBvc2l0aW9uKSB7XG4gICAgICAgIC8vIFdlIGZvdW5kIGEgc2Nyb2xsaW5nVmlldyB0aGF0IGRvZXMgbm90IGhhdmUgc2Nyb2xsVG9wIG9yIHNjcm9sbExlZnQgMFxuXG4gICAgICAgIC8vIFJldHVybiB0aGUgc2Nyb2xsIHBvc2l0aW9uIHZhbHVlLCBhcyB0aGlzIHdpbGwgYmUgb3VyIHN0YXJ0U2Nyb2xsUG9zaXRpb25cbiAgICAgICAgcGFnZVNjcm9sbEluc3RhbmNlLnN0YXJ0U2Nyb2xsUG9zaXRpb24gPSBzY3JvbGxQb3NpdGlvbjtcbiAgICAgICAgc3RhcnRTY3JvbGxQb3NpdGlvbkZvdW5kID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHBhZ2VTY3JvbGxPZmZzZXQgPSBwYWdlU2Nyb2xsSW5zdGFuY2UuZ2V0Q3VycmVudE9mZnNldCgpO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSB0YXJnZXQgcG9zaXRpb24gdGhhdCB0aGUgc2Nyb2xsIGFuaW1hdGlvbiBzaG91bGQgZ28gdG9cblxuICAgIGNvbnN0IHNjcm9sbFRhcmdldFBvc2l0aW9uID0gcGFnZVNjcm9sbEluc3RhbmNlLmV4dHJhY3RTY3JvbGxUYXJnZXRQb3NpdGlvbigpO1xuICAgIHBhZ2VTY3JvbGxJbnN0YW5jZS50YXJnZXRTY3JvbGxQb3NpdGlvbiA9IE1hdGgucm91bmQoXG4gICAgICAocGFnZVNjcm9sbEluc3RhbmNlLnZlcnRpY2FsU2Nyb2xsaW5nXG4gICAgICAgID8gc2Nyb2xsVGFyZ2V0UG9zaXRpb24udG9wXG4gICAgICAgIDogc2Nyb2xsVGFyZ2V0UG9zaXRpb24ubGVmdCkgLSBwYWdlU2Nyb2xsT2Zmc2V0XG4gICAgKTtcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZGlzdGFuY2Ugd2UgbmVlZCB0byBnbyBpbiB0b3RhbFxuICAgIHBhZ2VTY3JvbGxJbnN0YW5jZS5kaXN0YW5jZVRvU2Nyb2xsID1cbiAgICAgIHBhZ2VTY3JvbGxJbnN0YW5jZS50YXJnZXRTY3JvbGxQb3NpdGlvbiAtIHBhZ2VTY3JvbGxJbnN0YW5jZS5zdGFydFNjcm9sbFBvc2l0aW9uO1xuXG4gICAgaWYgKGlzTmFOKHBhZ2VTY3JvbGxJbnN0YW5jZS5kaXN0YW5jZVRvU2Nyb2xsKSkge1xuICAgICAgLy8gV2Ugd2VyZW4ndCBhYmxlIHRvIGZpbmQgdGhlIHRhcmdldCBwb3NpdGlvbiwgbWF5YmUgdGhlIGVsZW1lbnQgZG9lcyBub3QgZXhpc3Q/XG5cbiAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnU2Nyb2xsaW5nIG5vdCBwb3NzaWJsZSwgYXMgd2UgY2FuXFwndCBmaW5kIHRoZSBzcGVjaWZpZWQgdGFyZ2V0Jyk7XG4gICAgICB9XG4gICAgICBwYWdlU2Nyb2xsSW5zdGFuY2UuZmlyZUV2ZW50KGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBXZSdyZSBhdCB0aGUgZmluYWwgZGVzdGluYXRpb24gYWxyZWFkeVxuICAgIC8vIE9SIHdlIG5lZWQgdG8gc2Nyb2xsIGRvd24gYnV0IGFyZSBhbHJlYWR5IGF0IHRoZSBlbmRcbiAgICAvLyBPUiB3ZSBuZWVkIHRvIHNjcm9sbCB1cCBidXQgYXJlIGF0IHRoZSB0b3AgYWxyZWFkeVxuICAgIGNvbnN0IGFsbFJlYWR5QXREZXN0aW5hdGlvbiA9XG4gICAgICBNYXRoLmFicyhwYWdlU2Nyb2xsSW5zdGFuY2UuZGlzdGFuY2VUb1Njcm9sbCkgPCBQYWdlU2Nyb2xsQ29uZmlnLl9taW5TY3JvbGxEaXN0YW5jZTtcblxuICAgIC8vIENoZWNrIGhvdyBsb25nIHdlIG5lZWQgdG8gc2Nyb2xsIGlmIGEgc3BlZWQgb3B0aW9uIGlzIGdpdmVuXG4gICAgLy8gRGVmYXVsdCBleGVjdXRpb25EdXJhdGlvbiBpcyB0aGUgc3BlY2lmaWVkIGR1cmF0aW9uXG4gICAgcGFnZVNjcm9sbEluc3RhbmNlLmV4ZWN1dGlvbkR1cmF0aW9uID0gcGFnZVNjcm9sbEluc3RhbmNlLmR1cmF0aW9uO1xuICAgIC8vIE1heWJlIHdlIG5lZWQgdG8gcGF5IGF0dGVudGlvbiB0byB0aGUgc3BlZWQgb3B0aW9uP1xuICAgIGlmIChcbiAgICAgICFVdGlsLmlzVW5kZWZpbmVkT3JOdWxsKHBhZ2VTY3JvbGxJbnN0YW5jZS5zcGVlZCkgJiZcbiAgICAgIFV0aWwuaXNVbmRlZmluZWRPck51bGwocGFnZVNjcm9sbEluc3RhbmNlLmR1cmF0aW9uKVxuICAgICkge1xuICAgICAgLy8gU3BlZWQgb3B0aW9uIGlzIHNldCBhbmQgbm8gZHVyYXRpb24gPT4gY2FsY3VsYXRlIGR1cmF0aW9uIGJhc2VkIG9uIHNwZWVkIGFuZCBzY3JvbGwgZGlzdGFuY2VcbiAgICAgIHBhZ2VTY3JvbGxJbnN0YW5jZS5leGVjdXRpb25EdXJhdGlvbiA9XG4gICAgICAgIChwYWdlU2Nyb2xsSW5zdGFuY2UuZGlzdGFuY2VUb1Njcm9sbCAvIHBhZ2VTY3JvbGxJbnN0YW5jZS5zcGVlZCkgKiAxMDAwO1xuICAgIH1cblxuICAgIC8vIFdlIHNob3VsZCBnbyB0aGVyZSBkaXJlY3RseSwgYXMgb3VyIFwiYW5pbWF0aW9uXCIgd291bGQgaGF2ZSBvbmUgYmlnIHN0ZXBcbiAgICAvLyBvbmx5IGFueXdheSBhbmQgdGhpcyB3YXkgd2Ugc2F2ZSB0aGUgaW50ZXJ2YWwgc3R1ZmZcbiAgICBjb25zdCB0b29TaG9ydEludGVydmFsID0gcGFnZVNjcm9sbEluc3RhbmNlLmV4ZWN1dGlvbkR1cmF0aW9uIDw9IFBhZ2VTY3JvbGxDb25maWcuX2ludGVydmFsO1xuXG4gICAgaWYgKGFsbFJlYWR5QXREZXN0aW5hdGlvbiB8fCB0b29TaG9ydEludGVydmFsKSB7XG4gICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgaWYgKGFsbFJlYWR5QXREZXN0aW5hdGlvbikge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTY3JvbGxpbmcgbm90IHBvc3NpYmxlLCBhcyB3ZSBjYW5cXCd0IGdldCBhbnkgY2xvc2VyIHRvIHRoZSBkZXN0aW5hdGlvbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTY3JvbGwgZHVyYXRpb24gc2hvcnRlciB0aGF0IGludGVydmFsIGxlbmd0aCwganVtcGluZyB0byB0YXJnZXQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcGFnZVNjcm9sbEluc3RhbmNlLnNldFNjcm9sbFBvc2l0aW9uKHBhZ2VTY3JvbGxJbnN0YW5jZS50YXJnZXRTY3JvbGxQb3NpdGlvbik7XG4gICAgICBwYWdlU2Nyb2xsSW5zdGFuY2UuZmlyZUV2ZW50KHRydWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFJlZ2lzdGVyIHRoZSBpbnRlcnJ1cHQgbGlzdGVuZXJzIGlmIHdlIHdhbnQgYW4gaW50ZXJydXB0aWJsZSBzY3JvbGwgYW5pbWF0aW9uXG4gICAgaWYgKFxuICAgICAgcGFnZVNjcm9sbEluc3RhbmNlLmludGVycnVwdGlibGUgfHxcbiAgICAgIChVdGlsLmlzVW5kZWZpbmVkT3JOdWxsKHBhZ2VTY3JvbGxJbnN0YW5jZS5pbnRlcnJ1cHRpYmxlKSAmJlxuICAgICAgICBQYWdlU2Nyb2xsQ29uZmlnLmRlZmF1bHRJbnRlcnJ1cHRpYmxlKVxuICAgICkge1xuICAgICAgcGFnZVNjcm9sbEluc3RhbmNlLmF0dGFjaEludGVycnVwdExpc3RlbmVycyh0aGlzLm9uSW50ZXJydXB0ZWQpO1xuICAgIH1cblxuICAgIC8vIExldCdzIGdldCBzdGFydGVkLCBnZXQgdGhlIHN0YXJ0IHRpbWUuLi5cbiAgICBwYWdlU2Nyb2xsSW5zdGFuY2Uuc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgLy8gLi4gYW5kIGNhbGN1bGF0ZSB0aGUgZW5kIHRpbWUgKHdoZW4gd2UgbmVlZCB0byBmaW5pc2ggYXQgbGFzdClcbiAgICBwYWdlU2Nyb2xsSW5zdGFuY2UuZW5kVGltZSA9XG4gICAgICBwYWdlU2Nyb2xsSW5zdGFuY2Uuc3RhcnRUaW1lICsgcGFnZVNjcm9sbEluc3RhbmNlLmV4ZWN1dGlvbkR1cmF0aW9uO1xuXG4gICAgcGFnZVNjcm9sbEluc3RhbmNlLnRpbWVyID0gc2V0SW50ZXJ2YWwoXG4gICAgICAoX3BhZ2VTY3JvbGxJbnN0YW5jZTogUGFnZVNjcm9sbEluc3RhbmNlKSA9PiB7XG4gICAgICAgIC8vIFRha2UgdGhlIGN1cnJlbnQgdGltZVxuICAgICAgICBjb25zdCBjdXJyZW50VGltZTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBuZXcgc2Nyb2xsIHBvc2l0aW9uXG4gICAgICAgIGxldCBuZXdTY3JvbGxQb3NpdGlvbjogbnVtYmVyO1xuICAgICAgICBsZXQgc3RvcE5vdyA9IGZhbHNlO1xuICAgICAgICBpZiAoX3BhZ2VTY3JvbGxJbnN0YW5jZS5lbmRUaW1lIDw9IGN1cnJlbnRUaW1lKSB7XG4gICAgICAgICAgLy8gV2UncmUgb3ZlciB0aGUgdGltZSBhbHJlYWR5LCBzbyBnbyB0aGUgdGFyZ2V0U2Nyb2xsUG9zaXRpb24gKGFrYSBkZXN0aW5hdGlvbilcbiAgICAgICAgICBuZXdTY3JvbGxQb3NpdGlvbiA9IF9wYWdlU2Nyb2xsSW5zdGFuY2UudGFyZ2V0U2Nyb2xsUG9zaXRpb247XG4gICAgICAgICAgc3RvcE5vdyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBzY3JvbGwgcG9zaXRpb24gYmFzZWQgb24gdGhlIGN1cnJlbnQgdGltZSB1c2luZyB0aGUgZWFzaW5nIGZ1bmN0aW9uXG4gICAgICAgICAgbmV3U2Nyb2xsUG9zaXRpb24gPSBNYXRoLnJvdW5kKFxuICAgICAgICAgICAgX3BhZ2VTY3JvbGxJbnN0YW5jZS5lYXNpbmdMb2dpYy5lYXNlKFxuICAgICAgICAgICAgICBjdXJyZW50VGltZSAtIF9wYWdlU2Nyb2xsSW5zdGFuY2Uuc3RhcnRUaW1lLFxuICAgICAgICAgICAgICBfcGFnZVNjcm9sbEluc3RhbmNlLnN0YXJ0U2Nyb2xsUG9zaXRpb24sXG4gICAgICAgICAgICAgIF9wYWdlU2Nyb2xsSW5zdGFuY2UuZGlzdGFuY2VUb1Njcm9sbCxcbiAgICAgICAgICAgICAgX3BhZ2VTY3JvbGxJbnN0YW5jZS5leGVjdXRpb25EdXJhdGlvblxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2V0IHRoZSBuZXcgc2Nyb2xsUG9zaXRpb24gdG8gYWxsIHNjcm9sbGluZ1ZpZXdzIGVsZW1lbnRzXG4gICAgICAgIGlmICghX3BhZ2VTY3JvbGxJbnN0YW5jZS5zZXRTY3JvbGxQb3NpdGlvbihuZXdTY3JvbGxQb3NpdGlvbikpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIHRoZSBuZXcgc2Nyb2xsVG9wL3Njcm9sbExlZnQgdmFsdWUgZmFpbGVkIGZvciBhbGwgU2Nyb2xsaW5nVmlld3NcbiAgICAgICAgICAvLyBlYXJseSBzdG9wIHRoZSBzY3JvbGwgYW5pbWF0aW9uIHRvIHNhdmUgcmVzb3VyY2VzXG4gICAgICAgICAgc3RvcE5vdyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBdCB0aGUgZW5kIGRvIHRoZSBpbnRlcm5hbCBzdG9wIG1haW50ZW5hbmNlIGFuZCBmaXJlIHRoZSBwYWdlU2Nyb2xsRmluaXNoIGV2ZW50XG4gICAgICAgIC8vIChvdGhlcndpc2UgdGhlIGV2ZW50IG1pZ2h0IGFycml2ZSBhdCBcInRvbyBlYXJseVwiKVxuICAgICAgICBpZiAoc3RvcE5vdykge1xuICAgICAgICAgIHRoaXMuc3RvcEludGVybmFsKGZhbHNlLCBfcGFnZVNjcm9sbEluc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFBhZ2VTY3JvbGxDb25maWcuX2ludGVydmFsLFxuICAgICAgcGFnZVNjcm9sbEluc3RhbmNlXG4gICAgKTtcblxuICAgIC8vIFJlZ2lzdGVyIHRoZSBpbnN0YW5jZSBhcyBydW5uaW5nIG9uZVxuICAgIHRoaXMucnVubmluZ0luc3RhbmNlcy5wdXNoKHBhZ2VTY3JvbGxJbnN0YW5jZSk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcCBhbGwgcnVubmluZyBzY3JvbGwgYW5pbWF0aW9ucy4gT3B0aW9uYWxseSBsaW1pdCB0byBzdG9wIG9ubHkgdGhlIG9uZXMgb2Ygc3BlY2lmaWMgbmFtZXNwYWNlLlxuICAgKlxuICAgKi9cbiAgcHVibGljIHN0b3BBbGwobmFtZXNwYWNlPzogc3RyaW5nIHwgYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucnVubmluZ0luc3RhbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgc3RvcHBlZFNvbWUgPSBmYWxzZTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJ1bm5pbmdJbnN0YW5jZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3QgcGFnZVNjcm9sbEluc3RhbmNlID0gdGhpcy5ydW5uaW5nSW5zdGFuY2VzW2ldO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgVXRpbC5pc1VuZGVmaW5lZE9yTnVsbChuYW1lc3BhY2UpIHx8XG4gICAgICAgICAgbmFtZXNwYWNlLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgIHBhZ2VTY3JvbGxJbnN0YW5jZS5uYW1lc3BhY2UgPT09IG5hbWVzcGFjZVxuICAgICAgICApIHtcbiAgICAgICAgICBzdG9wcGVkU29tZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy5zdG9wSW50ZXJuYWwodHJ1ZSwgcGFnZVNjcm9sbEluc3RhbmNlKTtcbiAgICAgICAgICAvLyBEZWNyZWFzZSB0aGUgY291bnRlciwgYXMgd2UgcmVtb3ZlZCBhbiBpdGVtIGZyb20gdGhlIGFycmF5IHdlIGl0ZXJhdGUgb3ZlclxuICAgICAgICAgIGktLTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHN0b3BwZWRTb21lO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgc3RvcChwYWdlU2Nyb2xsSW5zdGFuY2U6IFBhZ2VTY3JvbGxJbnN0YW5jZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0b3BJbnRlcm5hbCh0cnVlLCBwYWdlU2Nyb2xsSW5zdGFuY2UpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKFBhZ2VTY3JvbGxTZXJ2aWNlLmluc3RhbmNlQ291bnRlciA+IDAgJiYgaXNEZXZNb2RlKCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ0FuIGluc3RhbmNlIG9mIFBhZ2VTY3JvbGxTZXJ2aWNlIGFscmVhZHkgZXhpc3RzLCB1c3VhbGx5ICcgK1xuICAgICAgICAgICdpbmNsdWRpbmcgb25lIHByb3ZpZGVyIHNob3VsZCBiZSBlbm91Z2gsIHNvIGRvdWJsZSBjaGVjay4nXG4gICAgICApO1xuICAgIH1cbiAgICBQYWdlU2Nyb2xsU2VydmljZS5pbnN0YW5jZUNvdW50ZXIrKztcbiAgfVxufVxuIl19