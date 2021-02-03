import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { TabDirective } from './tab.directive';
import { TabsetConfig } from './tabset.config';
import { WavesDirective } from '../../free/waves/waves-effect.directive';
export declare class TabsetComponent implements OnDestroy, OnInit, AfterViewInit {
    ripple: WavesDirective;
    private cdRef;
    private renderer;
    tabs: TabDirective[];
    classMap: any;
    protected isDestroyed: boolean;
    protected _vertical: boolean;
    protected _justified: boolean;
    protected _type: string;
    listGetClass: String;
    tabsGetClass: String;
    isBrowser: any;
    clazz: boolean;
    disableWaves: boolean;
    buttonClass: String;
    contentClass: String;
    tabsButtonsClass: string;
    tabsContentClass: string;
    itemsList: ElementRef;
    tabEl: any;
    showBsTab: EventEmitter<any>;
    shownBsTab: EventEmitter<any>;
    hideBsTab: EventEmitter<any>;
    hiddenBsTab: EventEmitter<any>;
    getActiveTab: EventEmitter<any>;
    /** if true tabs will be placed vertically */
    get vertical(): boolean;
    set vertical(value: boolean);
    setActiveTab(index: number): void;
    /** if true tabs fill the container and have a consistent width */
    get justified(): boolean;
    set justified(value: boolean);
    /** navigation context class: 'tabs' or 'pills' */
    get type(): string;
    set type(value: string);
    constructor(platformId: string, config: TabsetConfig, ripple: WavesDirective, cdRef: ChangeDetectorRef, renderer: Renderer2);
    click(event: any, index: any): void;
    ngOnDestroy(): void;
    getActive(): any;
    addTab(tab: TabDirective): void;
    removeTab(tab: TabDirective): void;
    protected getClosestTabIndex(index: number): number;
    protected hasAvailableTabs(index: number): boolean;
    protected setClassMap(): void;
    listGet(): void;
    tabsGet(): void;
    getActiveElement(): any;
    showActiveIndex(): void;
    private getFirstActiveTabIndex;
    private removeActiveTabs;
    initActiveTab(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
