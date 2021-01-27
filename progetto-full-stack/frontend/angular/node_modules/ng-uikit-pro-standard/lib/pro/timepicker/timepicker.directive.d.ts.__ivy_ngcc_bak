import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { MdbTimePickerComponent } from './timepicker.component';
import { ControlValueAccessor } from '@angular/forms';
export declare const MDB_TIMEPICKER_VALUE_ACCESSOR: any;
export declare class MdbTimePickerDirective implements ControlValueAccessor, OnInit {
    private el;
    mdbTimePicker: MdbTimePickerComponent;
    set value(value: string);
    get value(): string;
    private _value;
    _valueChange: EventEmitter<string>;
    constructor(el: ElementRef);
    handleInput(event: any): void;
    ngOnInit(): void;
    onChange: (value: any) => void;
    onTouched: () => void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
