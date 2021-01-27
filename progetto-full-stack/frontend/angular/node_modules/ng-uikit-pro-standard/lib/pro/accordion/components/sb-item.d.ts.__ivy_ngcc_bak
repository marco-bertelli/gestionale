import { AfterContentInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SBItemBodyComponent } from './sb-item.body';
import { MdbAccordionService } from '../mdb-accordion.service';
export declare class SBItemComponent implements AfterViewInit, AfterContentInit {
    private accordionService;
    private _cdRef;
    collapsed: boolean;
    customClass: string;
    autoExpand: boolean;
    idModifier: number;
    body: SBItemBodyComponent;
    constructor(accordionService: MdbAccordionService, _cdRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    toggle(collapsed: boolean): void;
    applyToggle(collapsed: boolean): void;
}
