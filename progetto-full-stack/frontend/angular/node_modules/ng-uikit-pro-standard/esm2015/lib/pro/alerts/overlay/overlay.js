import { ComponentFactoryResolver, Injectable, ApplicationRef } from '@angular/core';
import { DomPortalHost } from '../portal/dom-portal-host';
import { OverlayRef } from './overlay-ref';
import { OverlayContainer } from './overlay-container';
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
export class Overlay {
    constructor(_overlayContainer, _componentFactoryResolver, _appRef) {
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._paneElements = {};
    }
    /**
     * Creates an overlay.
     * @returns A reference to the created overlay.
     */
    create(positionClass, overlayContainer) {
        // get existing pane if possible
        return this._createOverlayRef(this.getPaneElement(positionClass, overlayContainer));
    }
    getPaneElement(positionClass, overlayContainer) {
        if (!this._paneElements[positionClass]) {
            this._paneElements[positionClass] = this._createPaneElement(positionClass, overlayContainer);
        }
        return this._paneElements[positionClass];
    }
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @returns Newly-created pane element
     */
    _createPaneElement(positionClass, overlayContainer) {
        const pane = document.createElement('div');
        pane.id = 'toast-container';
        pane.classList.add(positionClass);
        if (!overlayContainer) {
            this._overlayContainer.getContainerElement().appendChild(pane);
        }
        else {
            overlayContainer.getContainerElement().appendChild(pane);
        }
        return pane;
    }
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param pane The DOM element to turn into a portal host.
     * @returns A portal host for the given DOM element.
     */
    _createPortalHost(pane) {
        return new DomPortalHost(pane, this._componentFactoryResolver, this._appRef);
    }
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param pane DOM element for the overlay
     */
    _createOverlayRef(pane) {
        return new OverlayRef(this._createPortalHost(pane));
    }
}
Overlay.decorators = [
    { type: Injectable }
];
Overlay.ctorParameters = () => [
    { type: OverlayContainer },
    { type: ComponentFactoryResolver },
    { type: ApplicationRef }
];
/** Providers for Overlay and its related injectables. */
export const OVERLAY_PROVIDERS = [
    Overlay,
    OverlayContainer,
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXVpa2l0LXByby1zdGFuZGFyZC9zcmMvbGliL3Byby9hbGVydHMvb3ZlcmxheS9vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSXZEOzs7Ozs7O0dBT0c7QUFFRCxNQUFNLE9BQU8sT0FBTztJQUVsQixZQUFvQixpQkFBbUMsRUFDbkMseUJBQW1ELEVBQ25ELE9BQXVCO1FBRnZCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEwQjtRQUNuRCxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUhuQyxrQkFBYSxHQUFRLEVBQUUsQ0FBQztJQUdjLENBQUM7SUFDakQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLGFBQXFCLEVBQUUsZ0JBQTBDO1FBQ3RFLGdDQUFnQztRQUNoQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVELGNBQWMsQ0FBQyxhQUFxQixFQUFFLGdCQUEwQztRQUM5RSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztTQUM5RjtRQUNELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssa0JBQWtCLENBQUMsYUFBcUIsRUFBRSxnQkFBMEM7UUFDMUYsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsRUFBRSxHQUFHLGlCQUFpQixDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRWxDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUNyQixJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEU7YUFBTTtZQUNMLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGlCQUFpQixDQUFDLElBQWlCO1FBQ3pDLE9BQU8sSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGlCQUFpQixDQUFDLElBQWlCO1FBQ3pDLE9BQU8sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7O1lBdERELFVBQVU7OztZQVpILGdCQUFnQjtZQUpoQix3QkFBd0I7WUFBYyxjQUFjOztBQTBFN0QseURBQXlEO0FBQ3pELE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHO0lBQy9CLE9BQU87SUFDUCxnQkFBZ0I7Q0FDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5qZWN0YWJsZSwgQXBwbGljYXRpb25SZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVBvcnRhbEhvc3QgfSBmcm9tICcuLi9wb3J0YWwvZG9tLXBvcnRhbC1ob3N0JztcbmltcG9ydCB7IE92ZXJsYXlSZWYgfSBmcm9tICcuL292ZXJsYXktcmVmJztcblxuaW1wb3J0IHsgT3ZlcmxheUNvbnRhaW5lciB9IGZyb20gJy4vb3ZlcmxheS1jb250YWluZXInO1xuaW1wb3J0IHsgVG9hc3RDb250YWluZXJEaXJlY3RpdmUgfSBmcm9tICcuLi90b2FzdC90b2FzdC5kaXJlY3RpdmUnO1xuXG5cbi8qKlxuICogU2VydmljZSB0byBjcmVhdGUgT3ZlcmxheXMuIE92ZXJsYXlzIGFyZSBkeW5hbWljYWxseSBhZGRlZCBwaWVjZXMgb2YgZmxvYXRpbmcgVUksIG1lYW50IHRvIGJlXG4gKiB1c2VkIGFzIGEgbG93LWxldmVsIGJ1aWxkaW5nIGJ1aWxkaW5nIGJsb2NrIGZvciBvdGhlciBjb21wb25lbnRzLiBEaWFsb2dzLCB0b29sdGlwcywgbWVudXMsXG4gKiBzZWxlY3RzLCBldGMuIGNhbiBhbGwgYmUgYnVpbHQgdXNpbmcgb3ZlcmxheXMuIFRoZSBzZXJ2aWNlIHNob3VsZCBwcmltYXJpbHkgYmUgdXNlZCBieSBhdXRob3JzXG4gKiBvZiByZS11c2FibGUgY29tcG9uZW50cyByYXRoZXIgdGhhbiBkZXZlbG9wZXJzIGJ1aWxkaW5nIGVuZC11c2VyIGFwcGxpY2F0aW9ucy5cbiAqXG4gKiBBbiBvdmVybGF5ICppcyogYSBQb3J0YWxIb3N0LCBzbyBhbnkga2luZCBvZiBQb3J0YWwgY2FuIGJlIGxvYWRlZCBpbnRvIG9uZS5cbiAqL1xuIEBJbmplY3RhYmxlKClcbiAgZXhwb3J0IGNsYXNzIE92ZXJsYXkge1xuICAgIHByaXZhdGUgX3BhbmVFbGVtZW50czogYW55ID0ge307XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfb3ZlcmxheUNvbnRhaW5lcjogT3ZlcmxheUNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9hcHBSZWY6IEFwcGxpY2F0aW9uUmVmKSB7fVxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBvdmVybGF5LlxuICAgKiBAcmV0dXJucyBBIHJlZmVyZW5jZSB0byB0aGUgY3JlYXRlZCBvdmVybGF5LlxuICAgKi9cbiAgY3JlYXRlKHBvc2l0aW9uQ2xhc3M6IHN0cmluZywgb3ZlcmxheUNvbnRhaW5lcj86IFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlKTogT3ZlcmxheVJlZiB7XG4gICAgLy8gZ2V0IGV4aXN0aW5nIHBhbmUgaWYgcG9zc2libGVcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlT3ZlcmxheVJlZih0aGlzLmdldFBhbmVFbGVtZW50KHBvc2l0aW9uQ2xhc3MsIG92ZXJsYXlDb250YWluZXIpKTtcbiAgfVxuXG4gIGdldFBhbmVFbGVtZW50KHBvc2l0aW9uQ2xhc3M6IHN0cmluZywgb3ZlcmxheUNvbnRhaW5lcj86IFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlKTogSFRNTEVsZW1lbnQge1xuICAgIGlmICghdGhpcy5fcGFuZUVsZW1lbnRzW3Bvc2l0aW9uQ2xhc3NdKSB7XG4gICAgICB0aGlzLl9wYW5lRWxlbWVudHNbcG9zaXRpb25DbGFzc10gPSB0aGlzLl9jcmVhdGVQYW5lRWxlbWVudChwb3NpdGlvbkNsYXNzLCBvdmVybGF5Q29udGFpbmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3BhbmVFbGVtZW50c1twb3NpdGlvbkNsYXNzXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIHRoZSBET00gZWxlbWVudCBmb3IgYW4gb3ZlcmxheSBhbmQgYXBwZW5kcyBpdCB0byB0aGUgb3ZlcmxheSBjb250YWluZXIuXG4gICAqIEByZXR1cm5zIE5ld2x5LWNyZWF0ZWQgcGFuZSBlbGVtZW50XG4gICAqL1xuICBwcml2YXRlIF9jcmVhdGVQYW5lRWxlbWVudChwb3NpdGlvbkNsYXNzOiBzdHJpbmcsIG92ZXJsYXlDb250YWluZXI/OiBUb2FzdENvbnRhaW5lckRpcmVjdGl2ZSk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCBwYW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcGFuZS5pZCA9ICd0b2FzdC1jb250YWluZXInO1xuICAgIHBhbmUuY2xhc3NMaXN0LmFkZChwb3NpdGlvbkNsYXNzKTtcblxuICAgIGlmICghb3ZlcmxheUNvbnRhaW5lcikge1xuICAgICAgdGhpcy5fb3ZlcmxheUNvbnRhaW5lci5nZXRDb250YWluZXJFbGVtZW50KCkuYXBwZW5kQ2hpbGQocGFuZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG92ZXJsYXlDb250YWluZXIuZ2V0Q29udGFpbmVyRWxlbWVudCgpLmFwcGVuZENoaWxkKHBhbmUpO1xuICAgIH1cbiAgICByZXR1cm4gcGFuZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBEb21Qb3J0YWxIb3N0IGludG8gd2hpY2ggdGhlIG92ZXJsYXkgY29udGVudCBjYW4gYmUgbG9hZGVkLlxuICAgKiBAcGFyYW0gcGFuZSBUaGUgRE9NIGVsZW1lbnQgdG8gdHVybiBpbnRvIGEgcG9ydGFsIGhvc3QuXG4gICAqIEByZXR1cm5zIEEgcG9ydGFsIGhvc3QgZm9yIHRoZSBnaXZlbiBET00gZWxlbWVudC5cbiAgICovXG4gIHByaXZhdGUgX2NyZWF0ZVBvcnRhbEhvc3QocGFuZTogSFRNTEVsZW1lbnQpOiBEb21Qb3J0YWxIb3N0IHtcbiAgICByZXR1cm4gbmV3IERvbVBvcnRhbEhvc3QocGFuZSwgdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCB0aGlzLl9hcHBSZWYpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gT3ZlcmxheVJlZiBmb3IgYW4gb3ZlcmxheSBpbiB0aGUgZ2l2ZW4gRE9NIGVsZW1lbnQuXG4gICAqIEBwYXJhbSBwYW5lIERPTSBlbGVtZW50IGZvciB0aGUgb3ZlcmxheVxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlT3ZlcmxheVJlZihwYW5lOiBIVE1MRWxlbWVudCk6IE92ZXJsYXlSZWYge1xuICAgIHJldHVybiBuZXcgT3ZlcmxheVJlZih0aGlzLl9jcmVhdGVQb3J0YWxIb3N0KHBhbmUpKTtcbiAgfVxufVxuXG5cbi8qKiBQcm92aWRlcnMgZm9yIE92ZXJsYXkgYW5kIGl0cyByZWxhdGVkIGluamVjdGFibGVzLiAqL1xuZXhwb3J0IGNvbnN0IE9WRVJMQVlfUFJPVklERVJTID0gW1xuICBPdmVybGF5LFxuICBPdmVybGF5Q29udGFpbmVyLFxuXTtcbiJdfQ==