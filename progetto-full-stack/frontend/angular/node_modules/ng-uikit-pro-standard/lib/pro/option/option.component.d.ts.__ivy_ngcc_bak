import { ElementRef, InjectionToken, OnInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { OptionGroupComponent } from './option-group.component';
export interface MdbOptionParent {
    optionHeight: number;
    visibleOptions: number;
    multiple: boolean;
}
export interface MdbOptionGroup {
    disabled?: boolean;
}
export declare const MDB_OPTION_PARENT: InjectionToken<MdbOptionParent>;
export declare const MDB_OPTION_GROUP: InjectionToken<OptionGroupComponent>;
export declare class OptionComponent implements OnInit {
    private _el;
    private _cdRef;
    private _parent;
    group: MdbOptionGroup;
    value: any;
    get label(): string;
    set label(newValue: string);
    private _label;
    disabled: boolean;
    readonly selectionChange: EventEmitter<OptionComponent>;
    _optionHeight: number;
    private _selected;
    private _active;
    _multiple: boolean;
    clicked: boolean;
    clickSource: Subject<OptionComponent>;
    click$: Observable<OptionComponent>;
    constructor(_el: ElementRef, _cdRef: ChangeDetectorRef, _parent: MdbOptionParent, group: MdbOptionGroup);
    option: boolean;
    get active(): boolean;
    get selected(): boolean;
    get optionHeight(): number;
    get role(): string;
    get isDisabled(): boolean;
    get isSelected(): boolean;
    onClick(): void;
    getLabel(): any;
    get offsetHeight(): any;
    ngOnInit(): void;
    select(): void;
    deselect(): void;
    setActiveStyles(): void;
    setInactiveStyles(): void;
}
