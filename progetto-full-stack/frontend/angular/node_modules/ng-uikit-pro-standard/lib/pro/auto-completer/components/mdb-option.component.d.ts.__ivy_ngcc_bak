import { ElementRef, InjectionToken, OnInit } from '@angular/core';
import { ISelectedOption } from '../interfaces/selected-option.interface';
import { Subject, Observable } from 'rxjs';
export interface MdbOptionParent {
    optionHeight: number;
    visibleOptions: number;
}
export declare const MDB_OPTION_PARENT: InjectionToken<MdbOptionParent>;
export declare class MdbOptionComponent implements OnInit {
    el: ElementRef;
    private _parent;
    value: string;
    disabled: boolean;
    _optionHeight: any;
    get optionHeight(): any;
    clicked: boolean;
    selectedItem: ISelectedOption;
    clickSource: Subject<MdbOptionComponent>;
    click$: Observable<MdbOptionComponent>;
    constructor(el: ElementRef, _parent: MdbOptionParent);
    onClick(): void;
    get label(): any;
    ngOnInit(): void;
}
