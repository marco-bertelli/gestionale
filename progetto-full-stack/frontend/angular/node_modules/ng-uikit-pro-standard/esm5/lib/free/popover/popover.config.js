import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
/**
 * Configuration service for the Popover directive.
 * You can inject this service, typically in your root component, and customize
 * the values of its properties in order to provide default values for all the
 * popovers used in the application.
 */
var PopoverConfig = /** @class */ (function () {
    function PopoverConfig() {
        /**
         * Placement of a popover. Accepts: "top", "bottom", "left", "right"
         */
        this.placement = 'top';
        /**
         * Specifies events that should trigger. Supports a space separated list of
         * event names.
         */
        this.triggers = 'click';
    }
    PopoverConfig = __decorate([
        Injectable()
    ], PopoverConfig);
    return PopoverConfig;
}());
export { PopoverConfig };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvZnJlZS9wb3BvdmVyL3BvcG92ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDOzs7OztHQUtHO0FBRUY7SUFBQTtRQUNDOztXQUVHO1FBQ0ssY0FBUyxHQUFHLEtBQUssQ0FBQztRQUMxQjs7O1dBR0c7UUFDSyxhQUFRLEdBQUcsT0FBTyxDQUFDO0lBTTVCLENBQUM7SUFmWSxhQUFhO1FBRHpCLFVBQVUsRUFBRTtPQUNBLGFBQWEsQ0FlekI7SUFBRCxvQkFBQztDQUFBLEFBZkQsSUFlQztTQWZZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgUG9wb3ZlciBkaXJlY3RpdmUuXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplXG4gKiB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGVcbiAqIHBvcG92ZXJzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICovXG4gQEluamVjdGFibGUoKVxuIGV4cG9ydCBjbGFzcyBQb3BvdmVyQ29uZmlnIHtcbiAgLyoqXG4gICAqIFBsYWNlbWVudCBvZiBhIHBvcG92ZXIuIEFjY2VwdHM6IFwidG9wXCIsIFwiYm90dG9tXCIsIFwibGVmdFwiLCBcInJpZ2h0XCJcbiAgICovXG4gICBwdWJsaWMgcGxhY2VtZW50ID0gJ3RvcCc7XG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgZXZlbnRzIHRoYXQgc2hvdWxkIHRyaWdnZXIuIFN1cHBvcnRzIGEgc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2ZcbiAgICogZXZlbnQgbmFtZXMuXG4gICAqL1xuICAgcHVibGljIHRyaWdnZXJzID0gJ2NsaWNrJztcbiAgLyoqXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgcG9wb3ZlciBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxuICAgKi9cbiAgIHB1YmxpYyBjb250YWluZXI6IHN0cmluZztcbiB9XG4iXX0=