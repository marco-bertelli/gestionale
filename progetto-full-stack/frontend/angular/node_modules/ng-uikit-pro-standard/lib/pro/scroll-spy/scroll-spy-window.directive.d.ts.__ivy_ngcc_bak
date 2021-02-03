import { ElementRef, OnInit, Renderer2, NgZone, AfterViewInit } from '@angular/core';
import { ScrollSpyService } from './scroll-spy.service';
export declare class ScrollSpyWindowDirective implements OnInit, AfterViewInit {
    private document;
    private el;
    private renderer;
    private ngZone;
    private scrollSpyService;
    private id;
    get scrollSpyId(): string;
    set scrollSpyId(newId: string);
    private _scrollSpyId;
    offset: number;
    constructor(document: any, el: ElementRef, renderer: Renderer2, ngZone: NgZone, scrollSpyService: ScrollSpyService);
    isElementInViewport(): boolean;
    updateActiveState(scrollSpyId: string, id: string): void;
    onScroll(): void;
    listenToScroll(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
