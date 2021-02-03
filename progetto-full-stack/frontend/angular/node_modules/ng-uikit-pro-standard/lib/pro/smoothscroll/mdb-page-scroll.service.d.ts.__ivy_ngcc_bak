import { PageScrollInstance } from './mdb-page-scroll.instance';
export declare class PageScrollService {
    private static instanceCounter;
    private runningInstances;
    private onInterrupted;
    private stopInternal;
    /**
     * Start a scroll animation. All properties of the animation are stored in the given {@link PageScrollInstance} object.
     *
     * This is the core functionality of the whole library.
     *
     */
    start(pageScrollInstance: PageScrollInstance): void;
    /**
     * Stop all running scroll animations. Optionally limit to stop only the ones of specific namespace.
     *
     */
    stopAll(namespace?: string | any): boolean;
    stop(pageScrollInstance: PageScrollInstance): boolean;
    constructor();
}
