var EasingLogic = /** @class */ (function () {
    function EasingLogic() {
    }
    return EasingLogic;
}());
export { EasingLogic };
// @dynamic
var PageScrollConfig = /** @class */ (function () {
    function PageScrollConfig() {
    }
    Object.defineProperty(PageScrollConfig, "defaultEasingLogic", {
        // Getter and setter to avoid auto completion to suggest calling the method
        get: function () {
            return PageScrollConfig._easingLogic;
        },
        set: function (easingLogic) {
            PageScrollConfig._easingLogic = easingLogic;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The number of milliseconds to wait till updating the scroll position again.
     * Small amounts may produce smoother animations but require more processing power.
     */
    PageScrollConfig._interval = 10;
    /**
     * The amount of pixels that need to be between the current scrollTop/scrollLeft position
     * and the target position the cause a scroll animation. In case distance is below
     * this threshold, an immediate jump will be performed.
     * Due to dpi or rounding irregularities in browsers floating point numbers for scrollTop/scrollLeft values
     * are possible, making a === comparison of current scrollTop or scrollLeft and target scrollPosition error-prone.
     */
    PageScrollConfig._minScrollDistance = 2;
    /**
     * Name of the default namespace.
     */
    PageScrollConfig._defaultNamespace = 'default';
    /**
     * Whether by default the scrolling should happen in vertical direction (by manipulating the scrollTop property)
     * (= true; default) or in horizontal direction (by manipulating the scrollLeft property) (= false
     */
    PageScrollConfig.defaultIsVerticalScrolling = true;
    /**
     * How many console logs should be emitted.
     * 0: None
     * 2: If animation could not be started due to missing target, "already at destination" or similar reasons
     * 5: All scroll position values that get set
     */
    PageScrollConfig._logLevel = 2;
    /**
     * The duration how long a scrollTo animation should last by default.
     * May be overridden using the page-scroll-duration attribute on a single ng2PageScroll instance.
     */
    PageScrollConfig.defaultDuration = 1250;
    /**
     * The distance in pixels above scroll target where the animation should stop. Setting a positive number results in
     * the scroll target being more in the middle of the screen, negative numbers will produce scrolling "too far"
     */
    PageScrollConfig.defaultScrollOffset = 0;
    /**
     * Whether by default for inline scroll animations the advanced offset calculation should take place (true) or
     * not (false). Default is false.
     * The advanced offset calculation will traverse the DOM tree upwards, starting at the scrollTarget, until it finds
     * the scrollingView container element. Along the way the offset positions of the relative positioned
     * (position: relative) elements will be taken into account for calculating the target elements position.
     */
    PageScrollConfig.defaultAdvancedInlineOffsetCalculation = false;
    /**
     * The events that are listened to on the body to decide whether a scroll animation has been interfered/interrupted by the user
     */
    PageScrollConfig._interruptEvents = [
        'mousedown',
        'wheel',
        'DOMMouseScroll',
        'mousewheel',
        'keyup',
        'touchmove',
    ];
    /**
     * The keys that are considered to interrupt a scroll animation (mainly the arrow keys). All other key presses will not stop the
     * scroll animation.
     */
    PageScrollConfig._interruptKeys = [33, 34, 35, 36, 38, 40];
    /**
     * Whether a scroll animation should be interruptible by user interaction (true) or not (false). If the user performs an
     * interrupting event while a scroll animation takes place, the scroll animation stops.
     */
    PageScrollConfig.defaultInterruptible = true;
    PageScrollConfig._easingLogic = {
        ease: function (t, b, c, d) {
            // Linear easing
            return (c * t) / d + b;
        },
    };
    return PageScrollConfig;
}());
export { PageScrollConfig };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLXBhZ2Utc2Nyb2xsLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vc21vb3Roc2Nyb2xsL21kYi1wYWdlLXNjcm9sbC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFBQTtJQVVBLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFWRCxJQVVDOztBQUtELFdBQVc7QUFDWDtJQUFBO0lBK0ZBLENBQUM7SUFQQyxzQkFBa0Isc0NBQWtCO1FBRHBDLDJFQUEyRTthQUMzRTtZQUNFLE9BQU8sZ0JBQWdCLENBQUMsWUFBWSxDQUFDO1FBQ3ZDLENBQUM7YUFFRCxVQUFxQyxXQUF3QjtZQUMzRCxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQzlDLENBQUM7OztPQUpBO0lBekZEOzs7T0FHRztJQUNXLDBCQUFTLEdBQUcsRUFBRSxDQUFDO0lBRTdCOzs7Ozs7T0FNRztJQUNXLG1DQUFrQixHQUFHLENBQUMsQ0FBQztJQUVyQzs7T0FFRztJQUNXLGtDQUFpQixHQUFHLFNBQVMsQ0FBQztJQUU1Qzs7O09BR0c7SUFDVywyQ0FBMEIsR0FBRyxJQUFJLENBQUM7SUFFaEQ7Ozs7O09BS0c7SUFDVywwQkFBUyxHQUFHLENBQUMsQ0FBQztJQUU1Qjs7O09BR0c7SUFDVyxnQ0FBZSxHQUFHLElBQUksQ0FBQztJQUVyQzs7O09BR0c7SUFDVyxvQ0FBbUIsR0FBRyxDQUFDLENBQUM7SUFFdEM7Ozs7OztPQU1HO0lBQ1csdURBQXNDLEdBQUcsS0FBSyxDQUFDO0lBRTdEOztPQUVHO0lBQ1csaUNBQWdCLEdBQWE7UUFDekMsV0FBVztRQUNYLE9BQU87UUFDUCxnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLE9BQU87UUFDUCxXQUFXO0tBQ1osQ0FBQztJQUVGOzs7T0FHRztJQUNXLCtCQUFjLEdBQWEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRWxFOzs7T0FHRztJQUNXLHFDQUFvQixHQUFHLElBQUksQ0FBQztJQUUzQiw2QkFBWSxHQUFnQjtRQUN6QyxJQUFJLEVBQUUsVUFBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO1lBQy9DLGdCQUFnQjtZQUNoQixPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsQ0FBQztLQUNGLENBQUM7SUFVSix1QkFBQztDQUFBLEFBL0ZELElBK0ZDO1NBL0ZZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBhYnN0cmFjdCBjbGFzcyBFYXNpbmdMb2dpYyB7XG4gIC8qKlxuICAgKiBFeGFtcGxlcyBtYXkgYmUgZm91bmQgYXQgaHR0cHM6Ly9naXRodWIuY29tL2dkc21pdGgvanF1ZXJ5LmVhc2luZy9ibG9iL21hc3Rlci9qcXVlcnkuZWFzaW5nLmpzXG4gICAqIG9yIGh0dHA6Ly9naXptYS5jb20vZWFzaW5nL1xuICAgKiBAcGFyYW0gdCBjdXJyZW50IHRpbWVcbiAgICogQHBhcmFtIGIgYmVnaW5uaW5nIHZhbHVlXG4gICAqIEBwYXJhbSBjIGNoYW5nZSBJbiB2YWx1ZVxuICAgKiBAcGFyYW0gZCBkdXJhdGlvblxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGVhc2UodDogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlciwgZDogbnVtYmVyKTogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVjbGFyZSB0eXBlIFBhZ2VTY3JvbGxUYXJnZXQgPSBIVE1MRWxlbWVudCB8IHN0cmluZztcblxuZXhwb3J0IGRlY2xhcmUgdHlwZSBQYWdlU2Nyb2xsaW5nVmlld3MgPSBIVE1MRWxlbWVudCB8IERvY3VtZW50IHwgSFRNTEJvZHlFbGVtZW50IHwgTm9kZTtcbi8vIEBkeW5hbWljXG5leHBvcnQgY2xhc3MgUGFnZVNjcm9sbENvbmZpZyB7XG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IHRpbGwgdXBkYXRpbmcgdGhlIHNjcm9sbCBwb3NpdGlvbiBhZ2Fpbi5cbiAgICogU21hbGwgYW1vdW50cyBtYXkgcHJvZHVjZSBzbW9vdGhlciBhbmltYXRpb25zIGJ1dCByZXF1aXJlIG1vcmUgcHJvY2Vzc2luZyBwb3dlci5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgX2ludGVydmFsID0gMTA7XG5cbiAgLyoqXG4gICAqIFRoZSBhbW91bnQgb2YgcGl4ZWxzIHRoYXQgbmVlZCB0byBiZSBiZXR3ZWVuIHRoZSBjdXJyZW50IHNjcm9sbFRvcC9zY3JvbGxMZWZ0IHBvc2l0aW9uXG4gICAqIGFuZCB0aGUgdGFyZ2V0IHBvc2l0aW9uIHRoZSBjYXVzZSBhIHNjcm9sbCBhbmltYXRpb24uIEluIGNhc2UgZGlzdGFuY2UgaXMgYmVsb3dcbiAgICogdGhpcyB0aHJlc2hvbGQsIGFuIGltbWVkaWF0ZSBqdW1wIHdpbGwgYmUgcGVyZm9ybWVkLlxuICAgKiBEdWUgdG8gZHBpIG9yIHJvdW5kaW5nIGlycmVndWxhcml0aWVzIGluIGJyb3dzZXJzIGZsb2F0aW5nIHBvaW50IG51bWJlcnMgZm9yIHNjcm9sbFRvcC9zY3JvbGxMZWZ0IHZhbHVlc1xuICAgKiBhcmUgcG9zc2libGUsIG1ha2luZyBhID09PSBjb21wYXJpc29uIG9mIGN1cnJlbnQgc2Nyb2xsVG9wIG9yIHNjcm9sbExlZnQgYW5kIHRhcmdldCBzY3JvbGxQb3NpdGlvbiBlcnJvci1wcm9uZS5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgX21pblNjcm9sbERpc3RhbmNlID0gMjtcblxuICAvKipcbiAgICogTmFtZSBvZiB0aGUgZGVmYXVsdCBuYW1lc3BhY2UuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIF9kZWZhdWx0TmFtZXNwYWNlID0gJ2RlZmF1bHQnO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIGJ5IGRlZmF1bHQgdGhlIHNjcm9sbGluZyBzaG91bGQgaGFwcGVuIGluIHZlcnRpY2FsIGRpcmVjdGlvbiAoYnkgbWFuaXB1bGF0aW5nIHRoZSBzY3JvbGxUb3AgcHJvcGVydHkpXG4gICAqICg9IHRydWU7IGRlZmF1bHQpIG9yIGluIGhvcml6b250YWwgZGlyZWN0aW9uIChieSBtYW5pcHVsYXRpbmcgdGhlIHNjcm9sbExlZnQgcHJvcGVydHkpICg9IGZhbHNlXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGRlZmF1bHRJc1ZlcnRpY2FsU2Nyb2xsaW5nID0gdHJ1ZTtcblxuICAvKipcbiAgICogSG93IG1hbnkgY29uc29sZSBsb2dzIHNob3VsZCBiZSBlbWl0dGVkLlxuICAgKiAwOiBOb25lXG4gICAqIDI6IElmIGFuaW1hdGlvbiBjb3VsZCBub3QgYmUgc3RhcnRlZCBkdWUgdG8gbWlzc2luZyB0YXJnZXQsIFwiYWxyZWFkeSBhdCBkZXN0aW5hdGlvblwiIG9yIHNpbWlsYXIgcmVhc29uc1xuICAgKiA1OiBBbGwgc2Nyb2xsIHBvc2l0aW9uIHZhbHVlcyB0aGF0IGdldCBzZXRcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgX2xvZ0xldmVsID0gMjtcblxuICAvKipcbiAgICogVGhlIGR1cmF0aW9uIGhvdyBsb25nIGEgc2Nyb2xsVG8gYW5pbWF0aW9uIHNob3VsZCBsYXN0IGJ5IGRlZmF1bHQuXG4gICAqIE1heSBiZSBvdmVycmlkZGVuIHVzaW5nIHRoZSBwYWdlLXNjcm9sbC1kdXJhdGlvbiBhdHRyaWJ1dGUgb24gYSBzaW5nbGUgbmcyUGFnZVNjcm9sbCBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZGVmYXVsdER1cmF0aW9uID0gMTI1MDtcblxuICAvKipcbiAgICogVGhlIGRpc3RhbmNlIGluIHBpeGVscyBhYm92ZSBzY3JvbGwgdGFyZ2V0IHdoZXJlIHRoZSBhbmltYXRpb24gc2hvdWxkIHN0b3AuIFNldHRpbmcgYSBwb3NpdGl2ZSBudW1iZXIgcmVzdWx0cyBpblxuICAgKiB0aGUgc2Nyb2xsIHRhcmdldCBiZWluZyBtb3JlIGluIHRoZSBtaWRkbGUgb2YgdGhlIHNjcmVlbiwgbmVnYXRpdmUgbnVtYmVycyB3aWxsIHByb2R1Y2Ugc2Nyb2xsaW5nIFwidG9vIGZhclwiXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGRlZmF1bHRTY3JvbGxPZmZzZXQgPSAwO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIGJ5IGRlZmF1bHQgZm9yIGlubGluZSBzY3JvbGwgYW5pbWF0aW9ucyB0aGUgYWR2YW5jZWQgb2Zmc2V0IGNhbGN1bGF0aW9uIHNob3VsZCB0YWtlIHBsYWNlICh0cnVlKSBvclxuICAgKiBub3QgKGZhbHNlKS4gRGVmYXVsdCBpcyBmYWxzZS5cbiAgICogVGhlIGFkdmFuY2VkIG9mZnNldCBjYWxjdWxhdGlvbiB3aWxsIHRyYXZlcnNlIHRoZSBET00gdHJlZSB1cHdhcmRzLCBzdGFydGluZyBhdCB0aGUgc2Nyb2xsVGFyZ2V0LCB1bnRpbCBpdCBmaW5kc1xuICAgKiB0aGUgc2Nyb2xsaW5nVmlldyBjb250YWluZXIgZWxlbWVudC4gQWxvbmcgdGhlIHdheSB0aGUgb2Zmc2V0IHBvc2l0aW9ucyBvZiB0aGUgcmVsYXRpdmUgcG9zaXRpb25lZFxuICAgKiAocG9zaXRpb246IHJlbGF0aXZlKSBlbGVtZW50cyB3aWxsIGJlIHRha2VuIGludG8gYWNjb3VudCBmb3IgY2FsY3VsYXRpbmcgdGhlIHRhcmdldCBlbGVtZW50cyBwb3NpdGlvbi5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZGVmYXVsdEFkdmFuY2VkSW5saW5lT2Zmc2V0Q2FsY3VsYXRpb24gPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIGV2ZW50cyB0aGF0IGFyZSBsaXN0ZW5lZCB0byBvbiB0aGUgYm9keSB0byBkZWNpZGUgd2hldGhlciBhIHNjcm9sbCBhbmltYXRpb24gaGFzIGJlZW4gaW50ZXJmZXJlZC9pbnRlcnJ1cHRlZCBieSB0aGUgdXNlclxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBfaW50ZXJydXB0RXZlbnRzOiBzdHJpbmdbXSA9IFtcbiAgICAnbW91c2Vkb3duJyxcbiAgICAnd2hlZWwnLFxuICAgICdET01Nb3VzZVNjcm9sbCcsXG4gICAgJ21vdXNld2hlZWwnLFxuICAgICdrZXl1cCcsXG4gICAgJ3RvdWNobW92ZScsXG4gIF07XG5cbiAgLyoqXG4gICAqIFRoZSBrZXlzIHRoYXQgYXJlIGNvbnNpZGVyZWQgdG8gaW50ZXJydXB0IGEgc2Nyb2xsIGFuaW1hdGlvbiAobWFpbmx5IHRoZSBhcnJvdyBrZXlzKS4gQWxsIG90aGVyIGtleSBwcmVzc2VzIHdpbGwgbm90IHN0b3AgdGhlXG4gICAqIHNjcm9sbCBhbmltYXRpb24uXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIF9pbnRlcnJ1cHRLZXlzOiBudW1iZXJbXSA9IFszMywgMzQsIDM1LCAzNiwgMzgsIDQwXTtcblxuICAvKipcbiAgICogV2hldGhlciBhIHNjcm9sbCBhbmltYXRpb24gc2hvdWxkIGJlIGludGVycnVwdGlibGUgYnkgdXNlciBpbnRlcmFjdGlvbiAodHJ1ZSkgb3Igbm90IChmYWxzZSkuIElmIHRoZSB1c2VyIHBlcmZvcm1zIGFuXG4gICAqIGludGVycnVwdGluZyBldmVudCB3aGlsZSBhIHNjcm9sbCBhbmltYXRpb24gdGFrZXMgcGxhY2UsIHRoZSBzY3JvbGwgYW5pbWF0aW9uIHN0b3BzLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBkZWZhdWx0SW50ZXJydXB0aWJsZSA9IHRydWU7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2Vhc2luZ0xvZ2ljOiBFYXNpbmdMb2dpYyA9IHtcbiAgICBlYXNlOiAodDogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlciwgZDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICAgIC8vIExpbmVhciBlYXNpbmdcbiAgICAgIHJldHVybiAoYyAqIHQpIC8gZCArIGI7XG4gICAgfSxcbiAgfTtcblxuICAvLyBHZXR0ZXIgYW5kIHNldHRlciB0byBhdm9pZCBhdXRvIGNvbXBsZXRpb24gdG8gc3VnZ2VzdCBjYWxsaW5nIHRoZSBtZXRob2RcbiAgcHVibGljIHN0YXRpYyBnZXQgZGVmYXVsdEVhc2luZ0xvZ2ljKCk6IEVhc2luZ0xvZ2ljIHtcbiAgICByZXR1cm4gUGFnZVNjcm9sbENvbmZpZy5fZWFzaW5nTG9naWM7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNldCBkZWZhdWx0RWFzaW5nTG9naWMoZWFzaW5nTG9naWM6IEVhc2luZ0xvZ2ljKSB7XG4gICAgUGFnZVNjcm9sbENvbmZpZy5fZWFzaW5nTG9naWMgPSBlYXNpbmdMb2dpYztcbiAgfVxufVxuIl19