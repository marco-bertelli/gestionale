import { Observable } from 'rxjs';
import { OverlayRef } from '../overlay/overlay-ref';
/**
 * Reference to a toast opened via the Toast service.
 */
export declare class ToastRef<T> {
    private _overlayRef;
    /** The instance of component opened into the toast. */
    componentInstance: T;
    /** Subject for notifying the user that the toast has finished closing. */
    private _afterClosed;
    private _activate;
    private _manualClose;
    constructor(_overlayRef: OverlayRef);
    manualClose(): void;
    manualClosed(): Observable<any>;
    /**
     * Close the toast.
     */
    close(): void;
    /** Gets an observable that is notified when the toast is finished closing. */
    afterClosed(): Observable<any>;
    isInactive(): boolean;
    activate(): void;
    /** Gets an observable that is notified when the toast has started opening. */
    afterActivate(): Observable<any>;
}
