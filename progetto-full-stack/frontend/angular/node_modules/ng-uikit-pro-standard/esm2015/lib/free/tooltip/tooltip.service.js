import { Injectable } from '@angular/core';
/** Default values provider for tooltip */
export class TooltipConfig {
    constructor() {
        /** tooltip placement, supported positions: 'top', 'bottom', 'left', 'right' */
        this.placement = 'top';
        /** array of event names which triggers tooltip opening */
        this.triggers = 'hover focus';
    }
}
TooltipConfig.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctdWlraXQtcHJvLXN0YW5kYXJkL3NyYy9saWIvZnJlZS90b29sdGlwL3Rvb2x0aXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLDBDQUEwQztBQUUxQyxNQUFNLE9BQU8sYUFBYTtJQUQxQjtRQUVFLCtFQUErRTtRQUN4RSxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLDBEQUEwRDtRQUNuRCxhQUFRLEdBQUcsYUFBYSxDQUFDO0lBR2xDLENBQUM7OztZQVJBLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKiBEZWZhdWx0IHZhbHVlcyBwcm92aWRlciBmb3IgdG9vbHRpcCAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBDb25maWcge1xuICAvKiogdG9vbHRpcCBwbGFjZW1lbnQsIHN1cHBvcnRlZCBwb3NpdGlvbnM6ICd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnICovXG4gIHB1YmxpYyBwbGFjZW1lbnQgPSAndG9wJztcbiAgLyoqIGFycmF5IG9mIGV2ZW50IG5hbWVzIHdoaWNoIHRyaWdnZXJzIHRvb2x0aXAgb3BlbmluZyAqL1xuICBwdWJsaWMgdHJpZ2dlcnMgPSAnaG92ZXIgZm9jdXMnO1xuICAvKiogYSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSB0b29sdGlwIHNob3VsZCBiZSBhcHBlbmRlZCB0by4gQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgXCJib2R5XCIgKi9cbiAgcHVibGljIGNvbnRhaW5lcjogc3RyaW5nO1xufVxuIl19