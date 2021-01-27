import { Option } from './option';
import { IOption } from './option-interface';
export declare class OptionList {
    private _multiple;
    private _options;
    private _highlightedOption;
    private _hasShown;
    private _highlightFirst;
    get highlightFirst(): boolean;
    set highlightFirst(value: boolean);
    setToNullValue: any;
    static equalValues(v0: Array<string>, v1: Array<string>): boolean;
    constructor(options: Array<IOption>, _multiple?: boolean);
    /** Options. **/
    get options(): Array<Option>;
    getOptionsByValue(value: string): Array<Option>;
    /** Value. **/
    get value(): Array<string>;
    /** Selection. **/
    get selection(): Array<Option>;
    select(option: Option): void;
    deselect(option: Option): void;
    clearSelection(): void;
    /** Filter. **/
    get filtered(): Array<Option>;
    filter(term: string): boolean;
    private resetFilter;
    /** Highlight. **/
    get highlightedOption(): Option;
    highlight(): void;
    highlightOption(option: Option): void;
    highlightNextOption(): void;
    highlightPreviousOption(): void;
    private clearHighlightedOption;
    private getHighlightedIndexFromList;
    getHighlightedIndex(): number;
    /** Util. **/
    get hasShown(): boolean;
    hasSelected(): boolean;
    hasShownSelected(): boolean;
    private getFirstShown;
    private getFirstShownSelected;
}
