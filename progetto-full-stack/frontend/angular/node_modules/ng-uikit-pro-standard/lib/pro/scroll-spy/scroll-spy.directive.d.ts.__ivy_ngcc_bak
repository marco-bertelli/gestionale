import { AfterContentInit, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { ScrollSpyLinkDirective } from './scroll-spy-link.directive';
import { ScrollSpyService } from './scroll-spy.service';
import { Subscription } from 'rxjs';
export declare class ScrollSpyDirective implements OnInit, AfterContentInit, OnDestroy {
    private scrollSpyService;
    links: QueryList<ScrollSpyLinkDirective>;
    get id(): string;
    set id(newId: string);
    private _id;
    activeLinkChange: EventEmitter<any>;
    activeSub: Subscription;
    constructor(scrollSpyService: ScrollSpyService);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
