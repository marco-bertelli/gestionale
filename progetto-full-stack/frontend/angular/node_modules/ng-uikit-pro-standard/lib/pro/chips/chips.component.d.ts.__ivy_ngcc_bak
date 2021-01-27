import { EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
export declare const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class MaterialChipsComponent {
    private _cdRef;
    chipsInput: ElementRef;
    initialInput: ElementRef;
    placeholder: string;
    addAreaDisplayed: boolean;
    isTagsFocused: boolean;
    values: string[];
    labelToAdd: string;
    focused: string;
    selected: string;
    keyCodes: {
        backspace: number;
        delete: number;
    };
    tagsfocusedChange: EventEmitter<any>;
    labelsChange: EventEmitter<string[]>;
    get tagsfocused(): boolean;
    constructor(_cdRef: ChangeDetectorRef);
    removeValue(value: string): void;
    handleKeydown(event: any): void;
    private _removeLast;
    addValue(value: string, event: any): void;
    _onChange: (_: any) => void;
    _onTouched: () => void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    writeValue(value: string[]): void;
    onFocus(): void;
    focusOutFunction(): void;
}
