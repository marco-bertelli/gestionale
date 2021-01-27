import { Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, Renderer2, ViewChild, ViewEncapsulation, QueryList, } from '@angular/core';
import { MdbOptionComponent, MDB_OPTION_PARENT } from './mdb-option.component';
import { Subject, merge } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { document, window } from '../../../free/utils/facade/browser';
import { Utils } from './../../../free/utils/utils.class';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { DOWN_ARROW, ENTER, ESCAPE, UP_ARROW } from '../../../free/utils/keyboard-navigation';
export class MdbAutoCompleterComponent {
    constructor(renderer, el, platformId) {
        this.renderer = renderer;
        this.el = el;
        this.clearButton = true;
        this.clearButtonTabIndex = 0;
        this.dropdownPosition = 'auto';
        this._optionHeight = 45;
        // equal to 4 * optionHeight (which is 45 by default)
        this._dropdownHeight = 180;
        this.select = new EventEmitter();
        this.selected = new EventEmitter();
        this._destroy = new Subject();
        this.utils = new Utils();
        this._isDropdownOpen = new Subject();
        this._allItems = [];
        this._isOpen = false;
        this._selectedItemIndex = -1;
        this._selectedItemChanged = new Subject();
        this._isBrowser = false;
        this._isBrowser = isPlatformBrowser(platformId);
        this.renderer.addClass(this.el.nativeElement, 'mdb-auto-completer');
    }
    get visibleOptions() {
        return this._visibleOptions;
    }
    set visibleOptions(value) {
        if (value !== 0) {
            this._visibleOptions = value;
        }
    }
    get optionHeight() {
        return this._optionHeight;
    }
    set optionHeight(value) {
        if (value !== 0) {
            this._optionHeight = value;
        }
    }
    get dropdownHeight() {
        return this._dropdownHeight;
    }
    set dropdownHeight(value) {
        if (value !== 0) {
            this._dropdownHeight = value;
        }
    }
    _listenToOptionClick() {
        this.mdbOptions.changes
            .pipe(startWith(this.mdbOptions), switchMap((options) => {
            return merge(...options.map((option) => option.click$));
        }), takeUntil(this._destroy))
            .subscribe((clickedOption) => this._handleOptionClick(clickedOption));
    }
    _handleOptionClick(option) {
        this.setSelectedItem({ text: option.value, element: option });
        this.highlightRow(0);
        this.select.emit({ text: option.value, element: option });
        this.selected.emit({ text: option.value, element: option });
    }
    setSelectedItem(item) {
        this._selectedItem = item;
        this._selectedItemChanged.next(this.getSelectedItem());
    }
    getSelectedItem() {
        return this._selectedItem;
    }
    selectedItemChanged() {
        return this._selectedItemChanged;
    }
    isOpen() {
        return this._isOpen;
    }
    _calculatePosition() {
        const modalEl = this.utils.getClosestEl(this.el.nativeElement, '.modal-dialog');
        const style = document.querySelector('.completer-dropdown')
            ? window.getComputedStyle(document.querySelector('.completer-dropdown'))
            : null;
        if (!style) {
            return;
        }
        const height = ['height', 'padding-top', 'padding-bottom', 'margin-top', 'margin-bottom']
            .map(key => parseInt(style.getPropertyValue(key), 10))
            .reduce((prev, cur) => prev + cur);
        const topRect = document.querySelector('.completer-dropdown').getBoundingClientRect().top;
        const bottom = modalEl ? window.innerHeight - height - topRect : this.parameters.bottom;
        const canOpenBelow = this.dropdown.nativeElement.clientHeight <= bottom;
        const belowPosition = this.parameters.inputHeight + 3;
        const abovePosition = `-${this.dropdown.nativeElement.clientHeight}`;
        let top;
        if (this.dropdownPosition === 'auto') {
            top = canOpenBelow ? belowPosition : abovePosition;
        }
        else if (this.dropdownPosition === 'below') {
            top = belowPosition;
        }
        else if (this.dropdownPosition === 'above') {
            top = abovePosition;
        }
        this.renderer.setStyle(this.dropdown.nativeElement, 'top', top + 'px');
        this.renderer.setStyle(this.dropdown.nativeElement, 'left', 0 + 'px');
        this.renderer.setStyle(this.dropdown.nativeElement, 'width', this.parameters.width + 'px');
    }
    _calculateAppendPosition() {
        if (this._isBrowser) {
            setTimeout(() => {
                const originRect = this.origin.nativeElement.getBoundingClientRect();
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const offsetTop = originRect.top + scrollTop;
                const height = originRect.height;
                const dropdownHeight = this.dropdown.nativeElement.offsetHeight;
                const inputMargin = 8;
                let top = 0;
                let left = 0;
                left = originRect.left;
                const canOpenBelow = offsetTop + dropdownHeight + height + inputMargin <=
                    scrollTop + document.documentElement.clientHeight;
                const belowPosition = offsetTop + height + inputMargin;
                const abovePosition = (top = offsetTop - dropdownHeight - inputMargin);
                if (this.dropdownPosition === 'auto') {
                    top = canOpenBelow ? belowPosition : abovePosition;
                }
                else if (this.dropdownPosition === 'below') {
                    top = belowPosition;
                }
                else if (this.dropdownPosition === 'above') {
                    top = abovePosition;
                }
                this.renderer.setStyle(this.dropdown.nativeElement, 'top', top + 'px');
                this.renderer.setStyle(this.dropdown.nativeElement, 'left', left + 'px');
                this.renderer.setStyle(this.dropdown.nativeElement, 'width', this.parameters.width + 'px');
            }, 0);
        }
    }
    show() {
        if (!this.disabled) {
            this._isOpen = true;
            this._isDropdownOpen.next(this.isOpen());
        }
        setTimeout(() => {
            if (this.dropdown && !this.appendToBody) {
                this._calculatePosition();
            }
            if (this.dropdown && this.appendToBody) {
                this._calculateAppendPosition();
            }
        }, 0);
    }
    hide() {
        if (!this.disabled) {
            this._isOpen = false;
            this._isDropdownOpen.next(this.isOpen());
        }
    }
    isDropdownOpen() {
        return this._isDropdownOpen;
    }
    removeHighlight(index) {
        setTimeout(() => {
            this.optionList.forEach((el, i) => {
                const completerRow = el.nativeElement.querySelectorAll('.completer-row');
                if (i === index) {
                    this.renderer.addClass(el.nativeElement.firstElementChild, 'highlight-row');
                }
                else if (i !== index) {
                    completerRow.forEach((elem) => {
                        this.renderer.removeClass(elem, 'highlight-row');
                    });
                }
            });
        }, 0);
    }
    highlightRow(index) {
        this._allItems = this.optionList
            .filter(el => el.nativeElement.firstElementChild.classList.contains('completer-row'))
            .map(elem => elem.nativeElement);
        if (this._allItems[index]) {
            this.optionList.forEach((el, i) => {
                const completerRow = el.nativeElement.querySelectorAll('.completer-row');
                if (index === i) {
                    this.removeHighlight(index);
                    this.renderer.addClass(completerRow[completerRow.length - 1], 'highlight-row');
                }
            });
        }
        this._selectedItemIndex = index;
    }
    navigateUsingKeyboard(event) {
        if (this.dropdown) {
            switch (event.keyCode) {
                case DOWN_ARROW:
                    event.preventDefault();
                    this.moveHighlightedIntoView(event.key);
                    if (!this.isOpen()) {
                        this.show();
                    }
                    if (this._selectedItemIndex + 1 <= this._allItems.length - 1) {
                        this.highlightRow(++this._selectedItemIndex);
                    }
                    else if (this._selectedItemIndex + 1 === this._allItems.length) {
                        this.highlightRow(0);
                    }
                    if (this._selectedItemIndex === 0) {
                        this.highlightRow(0);
                    }
                    const selectedElement = this.mdbOptions.find((el, index) => el && index === this._selectedItemIndex);
                    if (selectedElement) {
                        this.select.emit({ text: selectedElement.value, element: selectedElement });
                    }
                    break;
                case UP_ARROW:
                    event.preventDefault();
                    this.moveHighlightedIntoView(event.key);
                    if (this._selectedItemIndex === -1 || this._selectedItemIndex === 0) {
                        const lastItemIndex = this.mdbOptions.length;
                        this.highlightRow(lastItemIndex);
                    }
                    this.highlightRow(--this._selectedItemIndex);
                    const selectedItem = this.mdbOptions.find((el, index) => el && index === this._selectedItemIndex);
                    if (selectedItem) {
                        this.select.emit({ text: selectedItem.value, element: selectedItem });
                    }
                    break;
                case ESCAPE:
                    event.preventDefault();
                    this.hide();
                    break;
                case ENTER:
                    event.preventDefault();
                    const selectedOption = this.mdbOptions.map(el => el)[this._selectedItemIndex];
                    if (selectedOption) {
                        this.setSelectedItem({ text: selectedOption.value, element: selectedOption });
                        this.select.emit({ text: selectedOption.value, element: selectedOption });
                        this.selected.emit({ text: selectedOption.value, element: selectedOption });
                    }
                    this.hide();
                    break;
            }
        }
    }
    moveHighlightedIntoView(type) {
        let listHeight = 0;
        let itemIndex = this._selectedItemIndex;
        this.optionList.forEach((el) => {
            listHeight += el.nativeElement.offsetHeight;
        });
        if (itemIndex > -1) {
            let itemHeight = 0;
            this.optionList.forEach((el, i) => {
                if (i === itemIndex + 1) {
                    itemHeight = el.nativeElement.firstElementChild.clientHeight;
                }
            });
            const itemTop = (itemIndex + 1) * itemHeight;
            const viewTop = this.dropdown.nativeElement.scrollTop;
            const viewBottom = viewTop + listHeight;
            if (type === 'ArrowDown') {
                this.renderer.setProperty(this.dropdown.nativeElement, 'scrollTop', itemTop - itemHeight);
            }
            else if (type === 'ArrowUp') {
                if (itemIndex === 0) {
                    itemIndex = this.optionList.length - 1;
                }
                else {
                    itemIndex--;
                }
                if (itemIndex === this._allItems.length - 2) {
                    this.renderer.setProperty(this.dropdown.nativeElement, 'scrollTop', viewBottom - itemHeight);
                }
                else {
                    this.renderer.setProperty(this.dropdown.nativeElement, 'scrollTop', itemIndex * itemHeight);
                }
            }
        }
    }
    updatePosition(parameters) {
        setTimeout(() => {
            if (this.dropdown) {
                const top = this.dropdown.nativeElement.clientHeight > parameters.bottom
                    ? parameters.top - this.dropdown.nativeElement.clientHeight
                    : parameters.top;
                this.renderer.setStyle(this.dropdown.nativeElement, 'top', top + 'px');
                this.renderer.setStyle(this.dropdown.nativeElement, 'left', parameters.left + 'px');
                this.renderer.setStyle(this.dropdown.nativeElement, 'width', parameters.width + 'px');
            }
        }, 0);
    }
    appendDropdown() {
        if (this._isBrowser && this.appendToBody) {
            const body = document.querySelector('body');
            const dropdown = this.el.nativeElement;
            if (body) {
                this.renderer.appendChild(body, dropdown);
                this._calculateAppendPosition();
            }
        }
    }
    setSingleOptionHeight() {
        this.mdbOptions.forEach(option => {
            option._optionHeight = this._optionHeight;
        });
    }
    ngAfterContentInit() {
        this._listenToOptionClick();
        this.highlightRow(0);
    }
    ngOnDestroy() {
        this._destroy.next();
        this._destroy.complete();
    }
}
MdbAutoCompleterComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-auto-completer',
                template: "<div class=\"completer-dropdown-holder\" *ngIf=\"isOpen()\">\n  <div\n    class=\"completer-dropdown\"\n    #dropdown\n    [ngStyle]=\"{\n      'pointer-events': optionList.length === 0 ? 'none' : 'auto',\n      'max-height.px': _visibleOptions ? _visibleOptions * _optionHeight : _dropdownHeight\n    }\"\n  >\n    <div class=\"completer-row-wrapper\">\n      <div *ngIf=\"textNoResults && optionList.length === 0\" class=\"completer-no-results\" #noResults>\n        {{ textNoResults }}\n      </div>\n      <ng-content #content></ng-content>\n    </div>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                exportAs: 'mdbAutoCompleter',
                providers: [{ provide: MDB_OPTION_PARENT, useExisting: MdbAutoCompleterComponent }],
                styles: ["@charset \"UTF-8\";.mdb-autocomplete{margin-bottom:1px}.mdb-autocomplete::-webkit-search-cancel-button,.mdb-autocomplete::-webkit-search-decoration,.mdb-autocomplete::-webkit-search-results-button,.mdb-autocomplete::-webkit-search-results-decoration{-webkit-appearance:none}button:focus{outline:0!important}button.mdb-autocomplete-clear{background-color:transparent;border:none;color:#000;cursor:pointer;font-size:1rem;outline:none;position:absolute;right:4px;top:13px}button.mdb-autocomplete-clear:focus{color:#4285f4;outline:none}button.mdb-autocomplete-clear:before{content:\"\u2715\"}.md-outline .mdb-autocomplete-clear{top:8px}.mdb-autocomplete-wrap{background:#fff;box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);left:0;list-style-type:none;max-height:210px;overflow-y:auto;padding-left:0;position:absolute;right:0;z-index:100}.mdb-autocomplete-wrap li{cursor:pointer;font-size:.875rem;padding:12px 15px}.mdb-autocomplete-wrap li:hover{background:#eee}.mdb-autocomplete-wrap li.selected{background-color:#eee}.form-inline .md-form .form-control.mdb-autocomplete{width:15rem}ng2-completer .completer-dropdown-holder{margin-top:-1rem}ng2-completer .md-form label{z-index:-1}.mdb-autocomplete-clear:hover,.mdb-autocomplete:hover,mdb-auto-completer:hover{cursor:pointer}.completer-dropdown{background:#fff;box-shadow:0 2px 5px rgba(0,0,0,.25);left:0;margin-top:1px;overflow-x:hidden;overflow-y:auto;position:absolute;right:0;width:100%;z-index:110}.completer-dropdown .completer-row{align-items:center;display:flex;font-size:.875rem;justify-content:space-between;outline:none;padding:12px 15px;width:100%}.completer-dropdown .completer-row .completer-description{font-size:14px}.completer-dropdown .completer-row .completer-image-holder .completer-image-default{height:16px;width:16px}.completer-dropdown .completer-no-results,.completer-dropdown .completer-searching{font-size:.875rem;padding:12px 15px}.completer-selected-row{background-color:#eee}.completer-image{border-radius:50%;height:32px;width:32px}.validate-success.ng-valid .completer-input{border-bottom:1px solid #00c851!important;box-shadow:0 1px 0 0 #00c851!important}.validate-success.ng-valid .completer-holder label{color:#00c851!important}.form-submitted .validate-error.ng-invalid .completer-input,.validate-error.ng-invalid.ng-touched .completer-input{border-bottom:1px solid #f44336!important;box-shadow:0 1px 0 0 #f44336!important}.form-submitted .validate-error.ng-invalid .completer-holder label,.validate-error.ng-invalid.ng-touched .completer-holder label{color:#f44336!important}.completer-row:hover,.highlight-row{background-color:#eee}"]
            },] }
];
MdbAutoCompleterComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
MdbAutoCompleterComponent.propDecorators = {
    textNoResults: [{ type: Input }],
    clearButton: [{ type: Input }],
    clearButtonTabIndex: [{ type: Input }],
    appendToBody: [{ type: Input }],
    dropdownPosition: [{ type: Input }],
    disabled: [{ type: Input }],
    visibleOptions: [{ type: Input }],
    optionHeight: [{ type: Input }],
    dropdownHeight: [{ type: Input }],
    displayValue: [{ type: Input }],
    select: [{ type: Output }],
    selected: [{ type: Output }],
    optionList: [{ type: ContentChildren, args: [MdbOptionComponent, { descendants: true, read: ElementRef },] }],
    mdbOptions: [{ type: ContentChildren, args: [MdbOptionComponent, { descendants: true },] }],
    dropdown: [{ type: ViewChild, args: ['dropdown',] }],
    noResultsEl: [{ type: ViewChild, args: ['noResults',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLWF1dG8tY29tcGxldGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXVpa2l0LXByby1zdGFuZGFyZC9zcmMvbGliL3Byby9hdXRvLWNvbXBsZXRlci9jb21wb25lbnRzL21kYi1hdXRvLWNvbXBsZXRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsU0FBUyxHQUVWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRS9FLE9BQU8sRUFBYyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQVk5RixNQUFNLE9BQU8seUJBQXlCO0lBd0ZwQyxZQUNVLFFBQW1CLEVBQ25CLEVBQWMsRUFDRCxVQUFrQjtRQUYvQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLE9BQUUsR0FBRixFQUFFLENBQVk7UUF4RmYsZ0JBQVcsR0FBRyxJ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QVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSx5QkFBeUIsRUFBRSxDQUFDOzthQUNwRjs7O1lBeEJDLFNBQVM7WUFOVCxVQUFVO3lDQTBIUCxNQUFNLFNBQUMsV0FBVzs7OzRCQTFGcEIsS0FBSzswQkFDTCxLQUFLO2tDQUNMLEtBQUs7MkJBQ0wsS0FBSzsrQkFDTCxLQUFLO3VCQUNMLEtBQUs7NkJBRUwsS0FBSzsyQkFhTCxLQUFLOzZCQWFMLEtBQUs7MkJBY0wsS0FBSztxQkFDTCxNQUFNO3VCQUlOLE1BQU07eUJBSU4sZUFBZSxTQUFDLGtCQUFrQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO3lCQUUzRSxlQUFlLFNBQUMsa0JBQWtCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO3VCQUd6RCxTQUFTLFNBQUMsVUFBVTswQkFDcEIsU0FBUyxTQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFF1ZXJ5TGlzdCxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1kYk9wdGlvbkNvbXBvbmVudCwgTURCX09QVElPTl9QQVJFTlQgfSBmcm9tICcuL21kYi1vcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IElTZWxlY3RlZE9wdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2VsZWN0ZWQtb3B0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBtZXJnZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgZG9jdW1lbnQsIHdpbmRvdyB9IGZyb20gJy4uLy4uLy4uL2ZyZWUvdXRpbHMvZmFjYWRlL2Jyb3dzZXInO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLy4uLy4uLy4uL2ZyZWUvdXRpbHMvdXRpbHMuY2xhc3MnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERPV05fQVJST1csIEVOVEVSLCBFU0NBUEUsIFVQX0FSUk9XIH0gZnJvbSAnLi4vLi4vLi4vZnJlZS91dGlscy9rZXlib2FyZC1uYXZpZ2F0aW9uJztcblxuZXhwb3J0IHR5cGUgQXV0b2NvbXBsZXRlRHJvcGRvd25Qb3NpdGlvbiA9ICdiZWxvdycgfCAnYWJvdmUnIHwgJ2F1dG8nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItYXV0by1jb21wbGV0ZXInLFxuICB0ZW1wbGF0ZVVybDogJ21kYi1hdXRvLWNvbXBsZXRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuLy4uL2F1dG8tY29tcGxldGVyLW1vZHVsZS5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGV4cG9ydEFzOiAnbWRiQXV0b0NvbXBsZXRlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTURCX09QVElPTl9QQVJFTlQsIHVzZUV4aXN0aW5nOiBNZGJBdXRvQ29tcGxldGVyQ29tcG9uZW50IH1dLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJBdXRvQ29tcGxldGVyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgdGV4dE5vUmVzdWx0czogc3RyaW5nO1xuICBASW5wdXQoKSBjbGVhckJ1dHRvbiA9IHRydWU7XG4gIEBJbnB1dCgpIGNsZWFyQnV0dG9uVGFiSW5kZXggPSAwO1xuICBASW5wdXQoKSBhcHBlbmRUb0JvZHk6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRyb3Bkb3duUG9zaXRpb246IEF1dG9jb21wbGV0ZURyb3Bkb3duUG9zaXRpb24gPSAnYXV0byc7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGdldCB2aXNpYmxlT3B0aW9ucygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl92aXNpYmxlT3B0aW9ucztcbiAgfVxuXG4gIHNldCB2aXNpYmxlT3B0aW9ucyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlICE9PSAwKSB7XG4gICAgICB0aGlzLl92aXNpYmxlT3B0aW9ucyA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIF92aXNpYmxlT3B0aW9uczogbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBvcHRpb25IZWlnaHQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uSGVpZ2h0O1xuICB9XG5cbiAgc2V0IG9wdGlvbkhlaWdodCh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSAwKSB7XG4gICAgICB0aGlzLl9vcHRpb25IZWlnaHQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBfb3B0aW9uSGVpZ2h0ID0gNDU7XG5cbiAgQElucHV0KClcbiAgZ2V0IGRyb3Bkb3duSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2Ryb3Bkb3duSGVpZ2h0O1xuICB9XG5cbiAgc2V0IGRyb3Bkb3duSGVpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgIT09IDApIHtcbiAgICAgIHRoaXMuX2Ryb3Bkb3duSGVpZ2h0ID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLy8gZXF1YWwgdG8gNCAqIG9wdGlvbkhlaWdodCAod2hpY2ggaXMgNDUgYnkgZGVmYXVsdClcbiAgX2Ryb3Bkb3duSGVpZ2h0ID0gMTgwO1xuXG4gIEBJbnB1dCgpIGRpc3BsYXlWYWx1ZTogKCh2YWx1ZTogYW55KSA9PiBzdHJpbmcpIHwgbnVsbDtcbiAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPHsgdGV4dDogc3RyaW5nOyBlbGVtZW50OiBhbnkgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICB0ZXh0OiBzdHJpbmc7XG4gICAgZWxlbWVudDogYW55O1xuICB9PigpO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjx7IHRleHQ6IHN0cmluZzsgZWxlbWVudDogYW55IH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgdGV4dDogc3RyaW5nO1xuICAgIGVsZW1lbnQ6IGFueTtcbiAgfT4oKTtcbiAgQENvbnRlbnRDaGlsZHJlbihNZGJPcHRpb25Db21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUsIHJlYWQ6IEVsZW1lbnRSZWYgfSlcbiAgb3B0aW9uTGlzdDogQXJyYXk8YW55PjtcbiAgQENvbnRlbnRDaGlsZHJlbihNZGJPcHRpb25Db21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgbWRiT3B0aW9uczogUXVlcnlMaXN0PE1kYk9wdGlvbkNvbXBvbmVudD47XG5cbiAgQFZpZXdDaGlsZCgnZHJvcGRvd24nKSBkcm9wZG93bjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnbm9SZXN1bHRzJykgbm9SZXN1bHRzRWw6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSBfZGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSB1dGlsczogVXRpbHMgPSBuZXcgVXRpbHMoKTtcblxuICBvcmlnaW46IEVsZW1lbnRSZWY7XG5cbiAgcHVibGljIHBhcmFtZXRlcnM6IHtcbiAgICBsZWZ0OiBudW1iZXI7XG4gICAgdG9wOiBudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBib3R0b206IG51bWJlcjtcbiAgICBpbnB1dEhlaWdodDogbnVtYmVyO1xuICB9O1xuXG4gIHByaXZhdGUgX2lzRHJvcGRvd25PcGVuOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfYWxsSXRlbXM6IEFycmF5PGFueT4gPSBbXTtcbiAgcHJpdmF0ZSBfaXNPcGVuID0gZmFsc2U7XG4gIHByaXZhdGUgX3NlbGVjdGVkSXRlbUluZGV4ID0gLTE7XG4gIHByaXZhdGUgX3NlbGVjdGVkSXRlbTogSVNlbGVjdGVkT3B0aW9uO1xuICBwcml2YXRlIF9zZWxlY3RlZEl0ZW1DaGFuZ2VkOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHByaXZhdGUgX2lzQnJvd3NlciA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IHN0cmluZ1xuICApIHtcbiAgICB0aGlzLl9pc0Jyb3dzZXIgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ21kYi1hdXRvLWNvbXBsZXRlcicpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuVG9PcHRpb25DbGljaygpIHtcbiAgICB0aGlzLm1kYk9wdGlvbnMuY2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCh0aGlzLm1kYk9wdGlvbnMpLFxuICAgICAgICBzd2l0Y2hNYXAoKG9wdGlvbnM6IFF1ZXJ5TGlzdDxNZGJPcHRpb25Db21wb25lbnQ+KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG1lcmdlKC4uLm9wdGlvbnMubWFwKChvcHRpb246IE1kYk9wdGlvbkNvbXBvbmVudCkgPT4gb3B0aW9uLmNsaWNrJCkpO1xuICAgICAgICB9KSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChjbGlja2VkT3B0aW9uOiBNZGJPcHRpb25Db21wb25lbnQpID0+IHRoaXMuX2hhbmRsZU9wdGlvbkNsaWNrKGNsaWNrZWRPcHRpb24pKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU9wdGlvbkNsaWNrKG9wdGlvbjogTWRiT3B0aW9uQ29tcG9uZW50KSB7XG4gICAgdGhpcy5zZXRTZWxlY3RlZEl0ZW0oeyB0ZXh0OiBvcHRpb24udmFsdWUsIGVsZW1lbnQ6IG9wdGlvbiB9KTtcbiAgICB0aGlzLmhpZ2hsaWdodFJvdygwKTtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KHsgdGV4dDogb3B0aW9uLnZhbHVlLCBlbGVtZW50OiBvcHRpb24gfSk7XG4gICAgdGhpcy5zZWxlY3RlZC5lbWl0KHsgdGV4dDogb3B0aW9uLnZhbHVlLCBlbGVtZW50OiBvcHRpb24gfSk7XG4gIH1cblxuICBwdWJsaWMgc2V0U2VsZWN0ZWRJdGVtKGl0ZW06IElTZWxlY3RlZE9wdGlvbikge1xuICAgIHRoaXMuX3NlbGVjdGVkSXRlbSA9IGl0ZW07XG4gICAgdGhpcy5fc2VsZWN0ZWRJdGVtQ2hhbmdlZC5uZXh0KHRoaXMuZ2V0U2VsZWN0ZWRJdGVtKCkpO1xuICB9XG5cbiAgcHVibGljIGdldFNlbGVjdGVkSXRlbSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJdGVtO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdGVkSXRlbUNoYW5nZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJdGVtQ2hhbmdlZDtcbiAgfVxuXG4gIHB1YmxpYyBpc09wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzT3BlbjtcbiAgfVxuXG4gIHB1YmxpYyBfY2FsY3VsYXRlUG9zaXRpb24oKSB7XG4gICAgY29uc3QgbW9kYWxFbCA9IHRoaXMudXRpbHMuZ2V0Q2xvc2VzdEVsKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy5tb2RhbC1kaWFsb2cnKTtcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wbGV0ZXItZHJvcGRvd24nKVxuICAgICAgPyB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcGxldGVyLWRyb3Bkb3duJykpXG4gICAgICA6IG51bGw7XG4gICAgaWYgKCFzdHlsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBoZWlnaHQgPSBbJ2hlaWdodCcsICdwYWRkaW5nLXRvcCcsICdwYWRkaW5nLWJvdHRvbScsICdtYXJnaW4tdG9wJywgJ21hcmdpbi1ib3R0b20nXVxuICAgICAgLm1hcChrZXkgPT4gcGFyc2VJbnQoc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShrZXkpLCAxMCkpXG4gICAgICAucmVkdWNlKChwcmV2LCBjdXIpID0+IHByZXYgKyBjdXIpO1xuXG4gICAgY29uc3QgdG9wUmVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wbGV0ZXItZHJvcGRvd24nKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgY29uc3QgYm90dG9tID0gbW9kYWxFbCA/IHdpbmRvdy5pbm5lckhlaWdodCAtIGhlaWdodCAtIHRvcFJlY3QgOiB0aGlzLnBhcmFtZXRlcnMuYm90dG9tO1xuICAgIGNvbnN0IGNhbk9wZW5CZWxvdyA9IHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQgPD0gYm90dG9tO1xuXG4gICAgY29uc3QgYmVsb3dQb3NpdGlvbiA9IHRoaXMucGFyYW1ldGVycy5pbnB1dEhlaWdodCArIDM7XG4gICAgY29uc3QgYWJvdmVQb3NpdGlvbiA9IGAtJHt0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0fWA7XG5cbiAgICBsZXQgdG9wO1xuXG4gICAgaWYgKHRoaXMuZHJvcGRvd25Qb3NpdGlvbiA9PT0gJ2F1dG8nKSB7XG4gICAgICB0b3AgPSBjYW5PcGVuQmVsb3cgPyBiZWxvd1Bvc2l0aW9uIDogYWJvdmVQb3NpdGlvbjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZHJvcGRvd25Qb3NpdGlvbiA9PT0gJ2JlbG93Jykge1xuICAgICAgdG9wID0gYmVsb3dQb3NpdGlvbjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZHJvcGRvd25Qb3NpdGlvbiA9PT0gJ2Fib3ZlJykge1xuICAgICAgdG9wID0gYWJvdmVQb3NpdGlvbjtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudCwgJ3RvcCcsIHRvcCArICdweCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIDAgKyAncHgnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgdGhpcy5wYXJhbWV0ZXJzLndpZHRoICsgJ3B4Jyk7XG4gIH1cblxuICBwcml2YXRlIF9jYWxjdWxhdGVBcHBlbmRQb3NpdGlvbigpIHtcbiAgICBpZiAodGhpcy5faXNCcm93c2VyKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3Qgb3JpZ2luUmVjdDogQ2xpZW50UmVjdCA9IHRoaXMub3JpZ2luLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IHNjcm9sbFRvcCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgICAgIGNvbnN0IG9mZnNldFRvcCA9IG9yaWdpblJlY3QudG9wICsgc2Nyb2xsVG9wO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSBvcmlnaW5SZWN0LmhlaWdodDtcbiAgICAgICAgY29uc3QgZHJvcGRvd25IZWlnaHQgPSB0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBjb25zdCBpbnB1dE1hcmdpbiA9IDg7XG5cbiAgICAgICAgbGV0IHRvcCA9IDA7XG4gICAgICAgIGxldCBsZWZ0ID0gMDtcblxuICAgICAgICBsZWZ0ID0gb3JpZ2luUmVjdC5sZWZ0O1xuXG4gICAgICAgIGNvbnN0IGNhbk9wZW5CZWxvdyA9XG4gICAgICAgICAgb2Zmc2V0VG9wICsgZHJvcGRvd25IZWlnaHQgKyBoZWlnaHQgKyBpbnB1dE1hcmdpbiA8PVxuICAgICAgICAgIHNjcm9sbFRvcCArIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IGJlbG93UG9zaXRpb24gPSBvZmZzZXRUb3AgKyBoZWlnaHQgKyBpbnB1dE1hcmdpbjtcbiAgICAgICAgY29uc3QgYWJvdmVQb3NpdGlvbiA9ICh0b3AgPSBvZmZzZXRUb3AgLSBkcm9wZG93bkhlaWdodCAtIGlucHV0TWFyZ2luKTtcblxuICAgICAgICBpZiAodGhpcy5kcm9wZG93blBvc2l0aW9uID09PSAnYXV0bycpIHtcbiAgICAgICAgICB0b3AgPSBjYW5PcGVuQmVsb3cgPyBiZWxvd1Bvc2l0aW9uIDogYWJvdmVQb3NpdGlvbjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRyb3Bkb3duUG9zaXRpb24gPT09ICdiZWxvdycpIHtcbiAgICAgICAgICB0b3AgPSBiZWxvd1Bvc2l0aW9uO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHJvcGRvd25Qb3NpdGlvbiA9PT0gJ2Fib3ZlJykge1xuICAgICAgICAgIHRvcCA9IGFib3ZlUG9zaXRpb247XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudCwgJ3RvcCcsIHRvcCArICdweCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudCwgJ2xlZnQnLCBsZWZ0ICsgJ3B4Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCB0aGlzLnBhcmFtZXRlcnMud2lkdGggKyAncHgnKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzaG93KCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5faXNPcGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2lzRHJvcGRvd25PcGVuLm5leHQodGhpcy5pc09wZW4oKSk7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5kcm9wZG93biAmJiAhdGhpcy5hcHBlbmRUb0JvZHkpIHtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlUG9zaXRpb24oKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZHJvcGRvd24gJiYgdGhpcy5hcHBlbmRUb0JvZHkpIHtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlQXBwZW5kUG9zaXRpb24oKTtcbiAgICAgIH1cbiAgICB9LCAwKTtcbiAgfVxuXG4gIHB1YmxpYyBoaWRlKCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XG4gICAgICB0aGlzLl9pc0Ryb3Bkb3duT3Blbi5uZXh0KHRoaXMuaXNPcGVuKCkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0Ryb3Bkb3duT3BlbigpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9pc0Ryb3Bkb3duT3BlbjtcbiAgfVxuXG4gIHJlbW92ZUhpZ2hsaWdodChpbmRleDogbnVtYmVyKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm9wdGlvbkxpc3QuZm9yRWFjaCgoZWw6IGFueSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlclJvdyA9IGVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbXBsZXRlci1yb3cnKTtcbiAgICAgICAgaWYgKGkgPT09IGluZGV4KSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhlbC5uYXRpdmVFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLCAnaGlnaGxpZ2h0LXJvdycpO1xuICAgICAgICB9IGVsc2UgaWYgKGkgIT09IGluZGV4KSB7XG4gICAgICAgICAgY29tcGxldGVyUm93LmZvckVhY2goKGVsZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhlbGVtLCAnaGlnaGxpZ2h0LXJvdycpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIGhpZ2hsaWdodFJvdyhpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fYWxsSXRlbXMgPSB0aGlzLm9wdGlvbkxpc3RcbiAgICAgIC5maWx0ZXIoZWwgPT4gZWwubmF0aXZlRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbXBsZXRlci1yb3cnKSlcbiAgICAgIC5tYXAoZWxlbSA9PiBlbGVtLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgaWYgKHRoaXMuX2FsbEl0ZW1zW2luZGV4XSkge1xuICAgICAgdGhpcy5vcHRpb25MaXN0LmZvckVhY2goKGVsOiBhbnksIGk6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBjb21wbGV0ZXJSb3cgPSBlbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21wbGV0ZXItcm93Jyk7XG5cbiAgICAgICAgaWYgKGluZGV4ID09PSBpKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVIaWdobGlnaHQoaW5kZXgpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoY29tcGxldGVyUm93W2NvbXBsZXRlclJvdy5sZW5ndGggLSAxXSwgJ2hpZ2hsaWdodC1yb3cnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX3NlbGVjdGVkSXRlbUluZGV4ID0gaW5kZXg7XG4gIH1cblxuICBuYXZpZ2F0ZVVzaW5nS2V5Ym9hcmQoZXZlbnQ6IGFueSkge1xuICAgIGlmICh0aGlzLmRyb3Bkb3duKSB7XG4gICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5tb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldyhldmVudC5rZXkpO1xuXG4gICAgICAgICAgaWYgKCF0aGlzLmlzT3BlbigpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXggKyAxIDw9IHRoaXMuX2FsbEl0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Um93KCsrdGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXggKyAxID09PSB0aGlzLl9hbGxJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Um93KDApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEl0ZW1JbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRSb3coMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRFbGVtZW50OiBhbnkgPSB0aGlzLm1kYk9wdGlvbnMuZmluZChcbiAgICAgICAgICAgIChlbDogYW55LCBpbmRleDogbnVtYmVyKSA9PiBlbCAmJiBpbmRleCA9PT0gdGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChzZWxlY3RlZEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0LmVtaXQoeyB0ZXh0OiBzZWxlY3RlZEVsZW1lbnQudmFsdWUsIGVsZW1lbnQ6IHNlbGVjdGVkRWxlbWVudCB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMubW92ZUhpZ2hsaWdodGVkSW50b1ZpZXcoZXZlbnQua2V5KTtcbiAgICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXggPT09IC0xIHx8IHRoaXMuX3NlbGVjdGVkSXRlbUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0SXRlbUluZGV4ID0gdGhpcy5tZGJPcHRpb25zLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Um93KGxhc3RJdGVtSW5kZXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmhpZ2hsaWdodFJvdygtLXRoaXMuX3NlbGVjdGVkSXRlbUluZGV4KTtcblxuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbTogYW55ID0gdGhpcy5tZGJPcHRpb25zLmZpbmQoXG4gICAgICAgICAgICAoZWw6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gZWwgJiYgaW5kZXggPT09IHRoaXMuX3NlbGVjdGVkSXRlbUluZGV4XG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdC5lbWl0KHsgdGV4dDogc2VsZWN0ZWRJdGVtLnZhbHVlLCBlbGVtZW50OiBzZWxlY3RlZEl0ZW0gfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgRVNDQVBFOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gdGhpcy5tZGJPcHRpb25zLm1hcChlbCA9PiBlbClbdGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXhdO1xuICAgICAgICAgIGlmIChzZWxlY3RlZE9wdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZEl0ZW0oeyB0ZXh0OiBzZWxlY3RlZE9wdGlvbi52YWx1ZSwgZWxlbWVudDogc2VsZWN0ZWRPcHRpb24gfSk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdC5lbWl0KHsgdGV4dDogc2VsZWN0ZWRPcHRpb24udmFsdWUsIGVsZW1lbnQ6IHNlbGVjdGVkT3B0aW9uIH0pO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5lbWl0KHsgdGV4dDogc2VsZWN0ZWRPcHRpb24udmFsdWUsIGVsZW1lbnQ6IHNlbGVjdGVkT3B0aW9uIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldyh0eXBlOiBzdHJpbmcpIHtcbiAgICBsZXQgbGlzdEhlaWdodCA9IDA7XG4gICAgbGV0IGl0ZW1JbmRleCA9IHRoaXMuX3NlbGVjdGVkSXRlbUluZGV4O1xuXG4gICAgdGhpcy5vcHRpb25MaXN0LmZvckVhY2goKGVsOiBhbnkpID0+IHtcbiAgICAgIGxpc3RIZWlnaHQgKz0gZWwubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgfSk7XG5cbiAgICBpZiAoaXRlbUluZGV4ID4gLTEpIHtcbiAgICAgIGxldCBpdGVtSGVpZ2h0ID0gMDtcblxuICAgICAgdGhpcy5vcHRpb25MaXN0LmZvckVhY2goKGVsOiBFbGVtZW50UmVmLCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYgKGkgPT09IGl0ZW1JbmRleCArIDEpIHtcbiAgICAgICAgICBpdGVtSGVpZ2h0ID0gZWwubmF0aXZlRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBpdGVtVG9wID0gKGl0ZW1JbmRleCArIDEpICogaXRlbUhlaWdodDtcbiAgICAgIGNvbnN0IHZpZXdUb3AgPSB0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgY29uc3Qgdmlld0JvdHRvbSA9IHZpZXdUb3AgKyBsaXN0SGVpZ2h0O1xuXG4gICAgICBpZiAodHlwZSA9PT0gJ0Fycm93RG93bicpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQsICdzY3JvbGxUb3AnLCBpdGVtVG9wIC0gaXRlbUhlaWdodCk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdBcnJvd1VwJykge1xuICAgICAgICBpZiAoaXRlbUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgaXRlbUluZGV4ID0gdGhpcy5vcHRpb25MaXN0Lmxlbmd0aCAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbUluZGV4LS07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbUluZGV4ID09PSB0aGlzLl9hbGxJdGVtcy5sZW5ndGggLSAyKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICdzY3JvbGxUb3AnLFxuICAgICAgICAgICAgdmlld0JvdHRvbSAtIGl0ZW1IZWlnaHRcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAnc2Nyb2xsVG9wJyxcbiAgICAgICAgICAgIGl0ZW1JbmRleCAqIGl0ZW1IZWlnaHRcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlUG9zaXRpb24ocGFyYW1ldGVyczogeyBsZWZ0OiBudW1iZXI7IHRvcDogbnVtYmVyOyB3aWR0aDogbnVtYmVyOyBib3R0b206IG51bWJlciB9KSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5kcm9wZG93bikge1xuICAgICAgICBjb25zdCB0b3AgPVxuICAgICAgICAgIHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQgPiBwYXJhbWV0ZXJzLmJvdHRvbVxuICAgICAgICAgICAgPyBwYXJhbWV0ZXJzLnRvcCAtIHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICAgICAgICAgIDogcGFyYW1ldGVycy50b3A7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LCAndG9wJywgdG9wICsgJ3B4Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIHBhcmFtZXRlcnMubGVmdCArICdweCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgcGFyYW1ldGVycy53aWR0aCArICdweCcpO1xuICAgICAgfVxuICAgIH0sIDApO1xuICB9XG5cbiAgcHVibGljIGFwcGVuZERyb3Bkb3duKCkge1xuICAgIGlmICh0aGlzLl9pc0Jyb3dzZXIgJiYgdGhpcy5hcHBlbmRUb0JvZHkpIHtcbiAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICBjb25zdCBkcm9wZG93biA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcblxuICAgICAgaWYgKGJvZHkpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChib2R5LCBkcm9wZG93bik7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZUFwcGVuZFBvc2l0aW9uKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldFNpbmdsZU9wdGlvbkhlaWdodCgpIHtcbiAgICB0aGlzLm1kYk9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgb3B0aW9uLl9vcHRpb25IZWlnaHQgPSB0aGlzLl9vcHRpb25IZWlnaHQ7XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5fbGlzdGVuVG9PcHRpb25DbGljaygpO1xuICAgIHRoaXMuaGlnaGxpZ2h0Um93KDApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=