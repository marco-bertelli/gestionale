import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, ViewContainerRef, ElementRef, ViewChild, TemplateRef, Output, EventEmitter, ContentChildren, QueryList, ChangeDetectorRef, Self, Optional, HostListener, Renderer2, ContentChild, HostBinding, } from '@angular/core';
import { dropdownAnimation } from './select-animations';
import { fromEvent, merge, Subject } from 'rxjs';
import { filter, takeUntil, startWith, switchMap, tap } from 'rxjs/operators';
import { MDB_OPTION_PARENT, OptionComponent } from '../option/option.component';
import { NgControl } from '@angular/forms';
import { OptionGroupComponent } from '../option/option-group.component';
import { SelectAllOptionComponent } from '../option/select-all-option';
import { Overlay, ViewportRuler, } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ESCAPE, UP_ARROW, HOME, END, ENTER, SPACE, DOWN_ARROW, } from '../../free/utils/keyboard-navigation';
import { MdbSelectFilterComponent } from './select-filter.component';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
// tslint:disable-next-line:component-class-suffix
export class MdbSelectComponent {
    constructor(_overlay, _viewportRuler, _vcr, _cdRef, _renderer, ngControl) {
        this._overlay = _overlay;
        this._viewportRuler = _viewportRuler;
        this._vcr = _vcr;
        this._cdRef = _cdRef;
        this._renderer = _renderer;
        this.ngControl = ngControl;
        this.allowClear = false;
        this.clearButtonTabindex = 0;
        this.disabled = false;
        this.highlightFirst = true;
        this.label = '';
        this.multiple = false;
        this.notFoundMsg = 'No results found';
        this.outline = false;
        this.tabindex = 0;
        this.required = false;
        this.ariaLabel = '';
        this._visibleOptions = 5;
        this._optionHeight = 48;
        this._dropdownHeight = this.visibleOptions * this.optionHeight;
        this.valueChange = new EventEmitter();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this.selected = new EventEmitter();
        // tslint:disable-next-line:max-line-length
        this.deselected = new EventEmitter();
        this.noOptionsFound = new EventEmitter();
        this._destroy = new Subject();
        this._isOpen = false;
        this._hasFocus = false;
        this._labelActive = false;
        this._showNoResultsMsg = false;
        this._selectAllChecked = false;
        this._compareWith = (o1, o2) => o1 === o2;
        /** ControlValueAccessor interface methods. **/
        this._onChange = (_) => { };
        this._onTouched = () => { };
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }
    get visibleOptions() {
        return this._visibleOptions;
    }
    set visibleOptions(value) {
        if (value !== 0) {
            this._visibleOptions = value;
            this.dropdownHeight = this.visibleOptions * this.optionHeight;
        }
    }
    get optionHeight() {
        return this._optionHeight;
    }
    set optionHeight(value) {
        if (value !== 0) {
            this._optionHeight = value;
            this.dropdownHeight = this.visibleOptions * this.optionHeight;
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
    get value() {
        return this._value;
    }
    set value(newValue) {
        if (newValue !== this._value) {
            if (this.options) {
                this._setSelection(newValue);
            }
            this._value = newValue;
        }
    }
    get compareWith() {
        return this._compareWith;
    }
    set compareWith(fn) {
        if (typeof fn === 'function') {
            this._compareWith = fn;
        }
    }
    get activeOption() {
        if (this._keyManager) {
            return this._keyManager.activeItem;
        }
        return null;
    }
    get selectionView() {
        if (this.multiple) {
            const selectedOptions = this._selectionModel.selected.map(option => option.label.trim());
            return selectedOptions.join(', ');
        }
        if (this._selectionModel.selected[0]) {
            return this._selectionModel.selected[0].label;
        }
        return '';
    }
    get hasSelection() {
        return this._selectionModel && !this._selectionModel.isEmpty();
    }
    get allChecked() {
        const selectionsNumber = this._selectionModel.selected.length;
        const optionsNumber = this.options.length;
        return selectionsNumber === optionsNumber;
    }
    handleKeydown(event) {
        if (!this.disabled) {
            this._handleClosedKeydown(event);
        }
    }
    get select() {
        return true;
    }
    get isOutline() {
        return this.outline;
    }
    get isMultiselectable() {
        return this.multiple;
    }
    get hasPopup() {
        return true;
    }
    get isDisabled() {
        return this.disabled;
    }
    get isExpanded() {
        return this._isOpen;
    }
    get role() {
        return this.filter ? 'combobox' : 'listbox';
    }
    ngAfterContentInit() {
        this._initKeyManager();
        this._setInitialValue();
        this._listenToOptionClick();
        if (this.selectAllOption) {
            this._listenToSelectAllClick();
        }
        if (this.filter) {
            this.filter.inputChange.pipe(takeUntil(this._destroy)).subscribe(() => {
                if (this.multiple && !this.filter.value) {
                    this.previousSelectedValues = this.options
                        .filter(option => option.selected)
                        .map(option => option.value);
                }
            });
        }
    }
    restoreMultipleOptions() {
        if (this.multiple && this.filter) {
            if (this.filter.value &&
                this.filter.value.length &&
                this.previousSelectedValues &&
                Array.isArray(this.previousSelectedValues)) {
                if (!this.value || !Array.isArray(this.value)) {
                    this.value = [];
                }
                const optionValues = this.options.map(option => option.value);
                this.previousSelectedValues.forEach(previousValue => {
                    if (!this.value.some((v) => this.compareWith(v, previousValue)) &&
                        !optionValues.some(v => this.compareWith(v, previousValue))) {
                        // if a value that was selected before is deselected and not found in the options, it was deselected
                        // due to the filtering, so we restore it.
                        this.value.push(previousValue);
                    }
                });
            }
            this.previousSelectedValues = this.value;
        }
    }
    _initKeyManager() {
        const options = this.selectAllOption ? [this.selectAllOption, ...this.options] : this.options;
        if (this.filter) {
            this._keyManager = new ActiveDescendantKeyManager(options).withVerticalOrientation();
        }
        else {
            this._keyManager = new ActiveDescendantKeyManager(options)
                .withTypeAhead(200)
                .withVerticalOrientation();
        }
    }
    _listenToOptionClick() {
        this.options.changes
            .pipe(startWith(this.options), tap(() => {
            this._setInitialValue();
            setTimeout(() => {
                this._showNoResultsMsg = this.options.length === 0;
                this._keyManager.setActiveItem(null);
                this._initKeyManager();
                if (this._isOpen) {
                    this._highlightFirstOption();
                    if (this._keyManager.activeItem) {
                        this._scrollToOption(this._keyManager.activeItem);
                    }
                }
            }, 0);
        }), switchMap((options) => {
            return merge(...options.map((option) => option.click$));
        }), takeUntil(this._destroy))
            .subscribe((clickedOption) => this._handleOptionClick(clickedOption));
    }
    _listenToSelectAllClick() {
        this.selectAllOption.click$
            .pipe(takeUntil(this._destroy))
            .subscribe((option) => {
            this.onSelectAll(option);
        });
    }
    _updateValue() {
        let updatedValue = null;
        if (this.multiple) {
            updatedValue = this._selectionModel.selected.map(option => option.value);
        }
        else {
            updatedValue = this._selectionModel.selected[0].value;
        }
        this._value = updatedValue;
        this.restoreMultipleOptions();
        this._cdRef.markForCheck();
    }
    _handleOptionClick(option) {
        if (option.disabled) {
            return;
        }
        if (this.multiple) {
            this._handleMultipleSelection(option);
        }
        else {
            this._handleSingleSelection(option);
        }
        this._updateLabeLPosition();
        this._cdRef.markForCheck();
    }
    _handleSingleSelection(option) {
        const currentSelection = this._selectionModel.selected[0];
        this._selectionModel.select(option);
        option.select();
        if (currentSelection && currentSelection !== option) {
            this._selectionModel.deselect(currentSelection);
            currentSelection.deselect();
            this.deselected.emit(currentSelection.value);
        }
        if (!currentSelection || (currentSelection && currentSelection !== option)) {
            this._updateValue();
            this.valueChange.emit(this.value);
            this._onChange(this.value);
            this.selected.emit(option.value);
        }
        this.close();
        this._focus();
        this._updateLabeLPosition();
    }
    _handleMultipleSelection(option) {
        const currentSelections = this._selectionModel.selected;
        if (option.selected) {
            this._selectionModel.deselect(option);
            option.deselect();
            this.deselected.emit(currentSelections);
        }
        else {
            this._selectionModel.select(option);
            option.select();
            this.selected.emit(option.value);
        }
        this._selectAllChecked = this.allChecked ? true : false;
        if (this.selectAllOption && !this._selectAllChecked) {
            this.selectAllOption.deselect();
        }
        this._updateValue();
        this._sortValues();
        this.valueChange.emit(this.value);
        this._onChange(this.value);
        this._cdRef.markForCheck();
    }
    _setSelection(selectValue) {
        const previousSelected = this._selectionModel.selected;
        previousSelected.forEach((selectedOption) => {
            selectedOption.deselect();
        });
        this._selectionModel.clear();
        if (selectValue) {
            if (this.multiple) {
                selectValue.forEach((value) => this._selectByValue(value));
                this._sortValues();
            }
            else {
                this._selectByValue(selectValue);
            }
        }
        this._updateLabeLPosition();
        this._cdRef.markForCheck();
    }
    _selectByValue(value) {
        const matchingOption = this.options
            .toArray()
            .find((option) => this._compareWith(option.value, value));
        if (matchingOption) {
            this._selectionModel.select(matchingOption);
            matchingOption.select();
            this.selected.emit(matchingOption.value);
        }
    }
    _setInitialValue() {
        Promise.resolve().then(() => {
            const value = this.ngControl ? this.ngControl.value : this._value;
            this._setSelection(value);
        });
    }
    onSelectAll(selectAlloption) {
        if (!selectAlloption.selected && !this._selectAllChecked) {
            this._selectAllChecked = true;
            this.options.forEach((option) => {
                if (!option.disabled) {
                    this._selectionModel.select(option);
                    option.select();
                }
            });
            this._updateValue();
            this._sortValues();
            this.valueChange.emit(this.value);
            this._onChange(this.value);
            this._updateLabeLPosition();
            selectAlloption.select();
        }
        else {
            this._selectAllChecked = false;
            this._selectionModel.clear();
            this.options.forEach((option) => {
                option.deselect();
            });
            selectAlloption.deselect();
            this._updateValue();
            this.valueChange.emit(this.value);
            this._onChange(this.value);
            this._updateLabeLPosition();
        }
    }
    open() {
        if (this.disabled) {
            return;
        }
        let overlayRef = this._overlayRef;
        if (!overlayRef) {
            this._portal = new TemplatePortal(this._dropdownTemplate, this._vcr);
            overlayRef = this._overlay.create({
                width: this._selectWrapper.nativeElement.offsetWidth,
                scrollStrategy: this._overlay.scrollStrategies.reposition(),
                positionStrategy: this._getOverlayPosition(),
            });
            this._overlayRef = overlayRef;
            overlayRef.keydownEvents().subscribe((event) => {
                // tslint:disable-next-line: deprecation
                const key = event.keyCode;
                if (key === ESCAPE || (key === UP_ARROW && event.altKey)) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.close();
                    this._focus();
                }
            });
        }
        if (overlayRef && !overlayRef.hasAttached()) {
            overlayRef.attach(this._portal);
            this._listenToOutSideCick(overlayRef, this._selectValue.nativeElement).subscribe(() => this.close());
            if (this.filter) {
                this.filter.focus();
            }
            this._highlightFirstOption();
        }
        if (this._viewportRuler) {
            this._viewportRuler
                .change()
                .pipe(takeUntil(this._destroy))
                .subscribe(() => {
                if (this._isOpen && overlayRef) {
                    overlayRef.updateSize({ width: this._selectWrapper.nativeElement.offsetWidth });
                }
            });
        }
        setTimeout(() => {
            const firstSelected = this._selectionModel.selected[0];
            if (firstSelected) {
                this._scrollToOption(firstSelected);
            }
        }, 0);
        this.opened.emit();
        setTimeout(() => {
            this._renderer.listen(this.dropdown.nativeElement, 'keydown', (event) => {
                this._handleOpenKeydown(event);
            });
        }, 0);
        this._updateLabeLPosition();
        if (!this.filter) {
            setTimeout(() => {
                this.dropdown.nativeElement.focus();
            }, 0);
        }
        this._isOpen = true;
        this._cdRef.markForCheck();
    }
    _sortValues() {
        if (this.multiple) {
            const options = this.options.toArray();
            this._selectionModel.sort((a, b) => {
                return this.sortComparator
                    ? this.sortComparator(a, b, options)
                    : options.indexOf(a) - options.indexOf(b);
            });
        }
    }
    _listenToOutSideCick(overlayRef, origin) {
        return fromEvent(document, 'click').pipe(filter((event) => {
            const target = event.target;
            const notOrigin = target !== origin;
            const notValue = !this._selectValue.nativeElement.contains(target);
            const notOverlay = !!overlayRef && overlayRef.overlayElement.contains(target) === false;
            return notOrigin && notValue && notOverlay;
        }), takeUntil(overlayRef.detachments()));
    }
    _getOverlayPosition() {
        const positionStrategy = this._overlay
            .position()
            .flexibleConnectedTo(this._selectWrapper)
            .withPositions(this._getPositions())
            .withFlexibleDimensions(false);
        return positionStrategy;
    }
    _getPositions() {
        const bottomOffset = this.outline ? 4 : 6;
        const topOffset = this.outline ? -7 : -3;
        if (!this.outline) {
            return [
                {
                    originX: 'start',
                    originY: 'top',
                    offsetY: bottomOffset,
                    overlayX: 'start',
                    overlayY: 'top',
                },
                {
                    originX: 'start',
                    originY: 'bottom',
                    offsetY: topOffset,
                    overlayX: 'start',
                    overlayY: 'bottom',
                },
            ];
        }
        else {
            return [
                {
                    originX: 'start',
                    originY: 'bottom',
                    offsetY: bottomOffset,
                    overlayX: 'start',
                    overlayY: 'top',
                },
                {
                    originX: 'start',
                    originY: 'top',
                    offsetY: topOffset,
                    overlayX: 'start',
                    overlayY: 'bottom',
                },
            ];
        }
    }
    close() {
        if (!this._isOpen) {
            return;
        }
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
            this._isOpen = false;
        }
        this.closed.emit();
        this._updateLabeLPosition();
        this._keyManager.setActiveItem(null);
        this._onTouched();
        this._cdRef.markForCheck();
    }
    toggle() {
        this._isOpen ? this.close() : this.open();
    }
    _updateLabeLPosition() {
        if (!this.placeholder && !this.hasSelected) {
            this._labelActive = false;
        }
        else {
            this._labelActive = true;
        }
    }
    get hasSelected() {
        return this._selectionModel.selected.length !== 0;
    }
    _scrollToOption(option) {
        let optionIndex;
        if (this.multiple && this.selectAllOption) {
            optionIndex = this.options.toArray().indexOf(option) + 1;
        }
        else {
            optionIndex = this.options.toArray().indexOf(option);
        }
        const groupsNumber = this._getNumberOfGroupsBeforeOption(optionIndex);
        const scrollToIndex = optionIndex + groupsNumber;
        const list = this._optionsWrapper.nativeElement;
        const listHeight = list.offsetHeight;
        if (optionIndex > -1) {
            const optionTop = scrollToIndex * this.optionHeight;
            const optionBottom = optionTop + this.optionHeight;
            const viewTop = list.scrollTop;
            const viewBottom = this.dropdownHeight;
            if (optionBottom > viewBottom) {
                list.scrollTop = optionBottom - listHeight;
            }
            else if (optionTop < viewTop) {
                list.scrollTop = optionTop;
            }
        }
    }
    _getNumberOfGroupsBeforeOption(optionIndex) {
        if (this.optionGroups.length) {
            const optionsList = this.options.toArray();
            const groupsList = this.optionGroups.toArray();
            const index = this.multiple ? optionIndex - 1 : optionIndex;
            let groupsNumber = 0;
            for (let i = 0; i <= index; i++) {
                if (optionsList[i].group && optionsList[i].group === groupsList[groupsNumber]) {
                    groupsNumber++;
                }
            }
            return groupsNumber;
        }
        return 0;
    }
    handleSelectionClear(event) {
        if (event.button === 2) {
            return;
        }
        this._selectionModel.clear();
        this.options.forEach((option) => {
            option.deselect();
        });
        if (this.selectAllOption && this._selectAllChecked) {
            this.selectAllOption.deselect();
            this._selectAllChecked = false;
        }
        this.value = null;
        this.valueChange.emit(null);
        this._onChange(null);
        this._updateLabeLPosition();
        this._selectAllChecked = false;
    }
    _handleOpenKeydown(event) {
        const key = event.keyCode;
        const manager = this._keyManager;
        const isUserTyping = manager.isTyping();
        const previousActiveItem = manager.activeItem;
        manager.onKeydown(event);
        if (key === HOME || key === END) {
            event.preventDefault();
            key === HOME ? manager.setFirstItemActive() : manager.setLastItemActive();
            if (manager.activeItem) {
                this._scrollToOption(manager.activeItem);
            }
        }
        else if (this._overlayRef &&
            this._overlayRef.hasAttached() &&
            !isUserTyping &&
            manager.activeItem &&
            (key === ENTER || (key === SPACE && !this.filter))) {
            event.preventDefault();
            if (this.multiple && this.selectAllOption && manager.activeItemIndex === 0) {
                this.onSelectAll(this.selectAllOption);
            }
            else {
                this._handleOptionClick(manager.activeItem);
            }
        }
        else if (key === UP_ARROW && event.altKey) {
            event.preventDefault();
            this.close();
            this._focus();
        }
        else if (key === UP_ARROW || key === DOWN_ARROW) {
            if (manager.activeItem && manager.activeItem !== previousActiveItem) {
                this._scrollToOption(manager.activeItem);
            }
        }
    }
    _handleClosedKeydown(event) {
        const key = event.keyCode;
        const manager = this._keyManager;
        if ((key === DOWN_ARROW && event.altKey) || key === ENTER) {
            event.preventDefault();
            this.open();
        }
        else if (!this.multiple && key === DOWN_ARROW) {
            event.preventDefault();
            manager.setNextItemActive();
            if (manager.activeItem) {
                this._handleOptionClick(manager.activeItem);
            }
        }
        else if (!this.multiple && key === UP_ARROW) {
            event.preventDefault();
            manager.setPreviousItemActive();
            if (manager.activeItem) {
                this._handleOptionClick(manager.activeItem);
            }
        }
        else if (!this.multiple && key === HOME) {
            event.preventDefault();
            manager.setFirstItemActive();
            if (manager.activeItem) {
                this._handleOptionClick(manager.activeItem);
            }
        }
        else if (!this.multiple && key === END) {
            event.preventDefault();
            manager.setLastItemActive();
            if (manager.activeItem) {
                this._handleOptionClick(manager.activeItem);
            }
        }
        else if (this.multiple && (key === DOWN_ARROW || key === UP_ARROW)) {
            event.preventDefault();
            this.open();
        }
    }
    handleOptionsWheel(event) {
        const optionsList = this._optionsWrapper.nativeElement;
        const atTop = optionsList.scrollTop === 0;
        const atBottom = optionsList.offsetHeight + optionsList.scrollTop === optionsList.scrollHeight;
        if (atTop && event.deltaY < 0) {
            event.preventDefault();
        }
        else if (atBottom && event.deltaY > 0) {
            event.preventDefault();
        }
    }
    _focus() {
        this._hasFocus = true;
        this._selectWrapper.nativeElement.focus();
    }
    _highlightFirstOption() {
        if (!this.hasSelection) {
            this._keyManager.setFirstItemActive();
        }
        else if (this.hasSelection && !this._selectionModel.selected[0].disabled) {
            this._keyManager.setActiveItem(this._selectionModel.selected[0]);
        }
    }
    onFocus() {
        if (!this.disabled) {
            this._focus();
        }
    }
    onBlur() {
        if (!this._isOpen && !this.disabled) {
            this._onTouched();
        }
        this._hasFocus = false;
    }
    ngOnInit() {
        this._selectionModel = new SelectionModel(this.multiple);
        if (this.label) {
            this._updateLabeLPosition();
        }
    }
    ngOnDestroy() {
        this._destroy.next();
        this._destroy.complete();
    }
    writeValue(value) {
        this.value = value;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._cdRef.markForCheck();
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
}
MdbSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-select-2',
                template: "<label\n  class=\"mdb-select-label\"\n  [ngClass]=\"{\n    active: _labelActive,\n    focused: _hasFocus || _isOpen,\n    outline: outline,\n    disabled: disabled\n  }\"\n  >{{ label }}</label\n>\n<div\n  #selectWrapper\n  [attr.tabindex]=\"disabled ? -1 : tabindex\"\n  (focus)=\"onFocus()\"\n  (blur)=\"onBlur()\"\n  class=\"mdb-select-wrapper\"\n  [ngClass]=\"{ disabled: disabled }\"\n  (click)=\"open()\"\n>\n  <div\n    #selectValue\n    class=\"mdb-select-value form-control\"\n    [ngClass]=\"{ focused: _hasFocus || _isOpen }\"\n  >\n    <span\n      *ngIf=\"placeholder && !selectionView\"\n      class=\"mdb-select-placeholder\"\n      [ngClass]=\"{ disabled: disabled }\"\n      >{{ placeholder }}</span\n    >\n    <span *ngIf=\"selectionView\" class=\"mdb-select-value-label\" [ngClass]=\"{ disabled: disabled }\">\n      <span>{{ selectionView }}</span>\n    </span>\n    <div class=\"mdb-select-icons-wrapper\">\n      <span\n        class=\"mdb-select-clear-btn\"\n        [ngClass]=\"{ disabled: disabled }\"\n        [attr.tabindex]=\"clearButtonTabindex\"\n        *ngIf=\"allowClear && hasSelected\"\n        (mousedown)=\"handleSelectionClear($event)\"\n        >&#x2715;</span\n      >\n      <span\n        class=\"mdb-select-arrow\"\n        [ngClass]=\"{ focused: _hasFocus || _isOpen, disabled: disabled }\"\n      ></span>\n    </div>\n  </div>\n</div>\n\n<ng-template #dropdownTemplate>\n  <div\n    #dropdown\n    [@dropdownAnimation]=\"'visible'\"\n    tabindex=\"-1\"\n    class=\"mdb-select-dropdown {{ dropdownClass }}\"\n  >\n    <ng-content select=\"mdb-select-filter\"></ng-content>\n    <div\n      #optionsWrapper\n      class=\"mdb-select-options-wrapper\"\n      [ngStyle]=\"{ 'max-height.px': dropdownHeight }\"\n    >\n      <div class=\"mdb-select-options\">\n        <ng-content select=\"mdb-select-all-option\"></ng-content>\n        <span class=\"mdb-select-no-results\" *ngIf=\"filter && _showNoResultsMsg && notFoundMsg\">{{\n          notFoundMsg\n        }}</span>\n        <ng-content select=\"mdb-select-option, mdb-option-group\"></ng-content>\n      </div>\n    </div>\n    <div #customContent class=\"mdb-select-custom-content\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</ng-template>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [dropdownAnimation],
                providers: [{ provide: MDB_OPTION_PARENT, useExisting: MdbSelectComponent }],
                styles: ["@charset \"UTF-8\";.md-form .mdb-select .mdb-select-label{color:#757575;max-width:95%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.md-form .mdb-select .mdb-select-label.outline{max-width:90%}.md-form .mdb-select .mdb-select-label.outline.active{font-weight:500;max-width:110%}.md-form .mdb-select .mdb-select-label.focused{color:#4285f4}.mdb-select{display:block}.mdb-select-label{color:#757575;cursor:text;font-size:1rem;margin:0;position:absolute;top:12px;transform:translateY(0);transition:.2s ease-out}.mdb-select-label.active{font-size:.8rem;transform:translateY(-22px)}.mdb-select-label.focused{color:#4285f4}.mdb-select-label.active.disabled,.mdb-select-label.disabled{color:#aaa}.mdb-select-label.outline{padding-left:13px}.mdb-select-label.outline.active{background-color:#fff;font-weight:500;left:10px;max-width:80%;padding-left:5px;padding-right:5px;z-index:1}.mdb-select-wrapper{display:flex;height:38px;outline:0;position:relative}.mdb-select-value{align-items:center;background-color:transparent;border:0;border-bottom:1px solid #ced4da;border-radius:0;box-sizing:content-box;cursor:pointer;display:flex;font-size:1rem;height:24px!important;justify-content:space-between;margin:0 0 .5rem;padding:.6rem 0 .4rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;width:100%}.mdb-select-value.focused{border-bottom:1px solid #4285f4;box-shadow:0 1px 0 0 #4285f4;outline:0}.mdb-select-value.disabled{color:#aaa}.mdb-select-outline .mdb-select-value{border:1px solid #ced4da;border-radius:4px}.mdb-select-outline .mdb-select-value.focused{border:1px solid #4285f4;box-shadow:inset 0 0 0 1px #4285f4}.mdb-select-placeholder{color:#6c757d;font-weight:400;max-width:90%;opacity:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}.mdb-select-placeholder.disabled{color:#aaa}.mdb-select-value-label{color:#495057;font-weight:400;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:90%}.mdb-select-value-label.disabled{color:#aaa}.mdb-select-icons-wrapper{align-items:center;display:flex;margin-top:4px}.mdb-select-clear-btn{color:#000;cursor:pointer;font-size:1rem;position:absolute;right:30px;top:13px}.mdb-select-clear-btn:focus{color:#4285f4;outline:none}.mdb-select-clear-btn.disabled{color:#aaa}.mdb-select-outline .mdb-select-clear-btn{right:30px;top:9px}.mdb-select-arrow{color:#000;font-size:.8rem;position:absolute;right:12px;text-align:center;top:14px}.mdb-select-arrow.focused{color:#4285f4}.mdb-select-arrow.disabled{color:#aaa}.mdb-select-arrow:before{content:\"\u25BC\"}.mdb-select-outline .mdb-select-arrow{right:12px;top:10px}.mdb-select-dropdown{background-color:#fff;box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);margin:0;min-width:100px;outline:none;position:relative;width:100%}.mdb-select-options-wrapper{overflow-y:auto}.mdb-select-options-wrapper::-webkit-scrollbar{height:4px;width:4px}.mdb-select-options-wrapper:focus{background-color:red}.mdb-select-options-wrapper::-webkit-scrollbar-button:end:increment,.mdb-select-options-wrapper::-webkit-scrollbar-button:start:decrement{background-color:transparent;display:block;height:0}.mdb-select-options-wrapper::-webkit-scrollbar-track-piece{background-color:transparent;border-bottom-left-radius:4px;border-bottom-right-radius:4px;border-radius:0}.mdb-select-options-wrapper::-webkit-scrollbar-thumb:vertical{background-color:#999;border-radius:4px;height:50px}.mdb-select-no-results{align-items:center;display:flex;height:48px;padding-left:16px;padding-right:16px}.mdb-select-filter{height:38px;margin-bottom:1rem}.mdb-select-custom-content{background-color:transparent;font-size:.9rem;padding:0 .5rem}.mdb-select-dropdown-colorful .mdb-option.selected:not(.active):not(.mdb-select-all-option):not(.disabled) .mdb-option-checkbox:checked+.mdb-option-checkbox-label:before,.mdb-select-dropdown-colorful .mdb-option:hover .mdb-option-checkbox:checked+.mdb-option-checkbox-label:before{border-color:transparent #fff #fff transparent}.mdb-select-dropdown-colorful .mdb-option:hover .mdb-option-checkbox+.mdb-option-checkbox-label:before{border-color:#fff}.mdb-select-dropdown-primary .mdb-option.selected{background-color:#4285f4;color:#fff}.mdb-select-dropdown-primary .mdb-option.mdb-select-all-option.selected{background-color:transparent;color:rgba(0,0,0,.87)}.mdb-select-dropdown-primary .mdb-option.active{background-color:#ddd;color:rgba(0,0,0,.87)}.mdb-select-dropdown-primary .mdb-option:hover{background-color:#4285f4!important;color:#fff!important}.mdb-select-dropdown-danger .mdb-option.selected{background-color:#c00;color:#fff}.mdb-select-dropdown-danger .mdb-option.mdb-select-all-option.selected{background-color:transparent;color:rgba(0,0,0,.87)}.mdb-select-dropdown-danger .mdb-option.active{background-color:#ddd;color:rgba(0,0,0,.87)}.mdb-select-dropdown-danger .mdb-option:hover{background-color:#c00!important;color:#fff!important}.mdb-select-dropdown-default .mdb-option.selected{background-color:#2bbbad;color:#fff}.mdb-select-dropdown-default .mdb-option.mdb-select-all-option.selected{background-color:transparent;color:rgba(0,0,0,.87)}.mdb-select-dropdown-default .mdb-option.active{background-color:#ddd;color:rgba(0,0,0,.87)}.mdb-select-dropdown-default .mdb-option:hover{background-color:#2bbbad!important;color:#fff!important}.mdb-select-dropdown-success .mdb-option.selected{background-color:#00c851;color:#fff}.mdb-select-dropdown-success .mdb-option.mdb-select-all-option.selected{background-color:transparent;color:rgba(0,0,0,.87)}.mdb-select-dropdown-success .mdb-option.active{background-color:#ddd;color:rgba(0,0,0,.87)}.mdb-select-dropdown-success .mdb-option:hover{background-color:#00c851!important;color:#fff!important}.mdb-select-dropdown-info .mdb-option.selected{background-color:#33b5e5;color:#fff}.mdb-select-dropdown-info .mdb-option.mdb-select-all-option.selected{background-color:transparent;color:rgba(0,0,0,.87)}.mdb-select-dropdown-info .mdb-option.active{background-color:#ddd;color:rgba(0,0,0,.87)}.mdb-select-dropdown-info .mdb-option:hover{background-color:#33b5e5!important;color:#fff!important}.mdb-select-dropdown-warning .mdb-option.selected{background-color:#fb3;color:#fff}.mdb-select-dropdown-warning .mdb-option.mdb-select-all-option.selected{background-color:transparent;color:rgba(0,0,0,.87)}.mdb-select-dropdown-warning .mdb-option.active{background-color:#ddd;color:rgba(0,0,0,.87)}.mdb-select-dropdown-warning .mdb-option:hover{background-color:#fb3!important;color:#fff!important}.mdb-select-dropdown-unique .mdb-option.selected{background-color:#3f729b;color:#fff}.mdb-select-dropdown-unique .mdb-option.mdb-select-all-option.selected{background-color:transparent;color:rgba(0,0,0,.87)}.mdb-select-dropdown-unique .mdb-option.active{background-color:#ddd;color:rgba(0,0,0,.87)}.mdb-select-dropdown-unique .mdb-option:hover{background-color:#3f729b!important;color:#fff!important}.mdb-select-dropdown-elegant .mdb-option.selected{background-color:#2e2e2e;color:#fff}.mdb-select-dropdown-elegant .mdb-option.mdb-select-all-option.selected{background-color:transparent;color:rgba(0,0,0,.87)}.mdb-select-dropdown-elegant .mdb-option.active{background-color:#ddd;color:rgba(0,0,0,.87)}.mdb-select-dropdown-elegant .mdb-option:hover{background-color:#2e2e2e!important;color:#fff!important}.mdb-select.validate-success.ng-valid.ng-touched .mdb-select-value{border-bottom:1px solid #00c851!important;box-shadow:0 1px 0 0 #00c851!important}.mdb-select.mdb-select-outline.validate-success.ng-valid.ng-touched .mdb-select-value{border:1px solid #00c851!important;box-shadow:inset 0 0 0 1px #00c851!important}.mdb-select.validate-success.ng-valid.ng-touched .mdb-select-label{color:#00c851!important}.mdb-select.mdb-select-outline.validate-success.ng-valid.ng-touched .mdb-select-label{font-weight:400!important}.form-submitted .mdb-select.validate-error.ng-invalid .mdb-select-value,.mdb-select.validate-error.ng-invalid.ng-touched .mdb-select-value{border-bottom:1px solid #f44336!important;box-shadow:0 1px 0 0 #f44336!important}.mdb-select.mdb-select-outline.validate-error.ng-invalid.ng-touched .mdb-select-value{border:1px solid #f44336!important;box-shadow:inset 0 0 0 1px #f44336!important}.form-submitted .mdb-select.validate-error.ng-invalid.ng-touched .mdb-select-label,.mdb-select.validate-error.ng-invalid.ng-touched .mdb-select-label{color:#f44336!important}.mdb-select.mdb-select-outline.validate-error.ng-invalid.ng-touched .mdb-select-label{font-weight:400!important}"]
            },] }
];
MdbSelectComponent.ctorParameters = () => [
    { type: Overlay },
    { type: ViewportRuler },
    { type: ViewContainerRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional }] }
];
MdbSelectComponent.propDecorators = {
    _selectWrapper: [{ type: ViewChild, args: ['selectWrapper',] }],
    _selectValue: [{ type: ViewChild, args: ['selectValue',] }],
    _dropdownTemplate: [{ type: ViewChild, args: ['dropdownTemplate',] }],
    dropdown: [{ type: ViewChild, args: ['dropdown',] }],
    filter: [{ type: ContentChild, args: [MdbSelectFilterComponent,] }],
    _optionsWrapper: [{ type: ViewChild, args: ['optionsWrapper',] }],
    _customContent: [{ type: ViewChild, args: ['customContent',] }],
    selectAllOption: [{ type: ContentChild, args: [SelectAllOptionComponent,] }],
    options: [{ type: ContentChildren, args: [OptionComponent, { descendants: true },] }],
    optionGroups: [{ type: ContentChildren, args: [OptionGroupComponent,] }],
    allowClear: [{ type: Input }],
    clearButtonTabindex: [{ type: Input }],
    disabled: [{ type: Input }],
    dropdownClass: [{ type: Input }],
    highlightFirst: [{ type: Input }],
    label: [{ type: Input }],
    multiple: [{ type: Input }],
    notFoundMsg: [{ type: Input }],
    outline: [{ type: Input }],
    placeholder: [{ type: Input }],
    tabindex: [{ type: Input }],
    required: [{ type: Input }],
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
    visibleOptions: [{ type: Input }],
    optionHeight: [{ type: Input }],
    dropdownHeight: [{ type: Input }],
    value: [{ type: Input }, { type: Input }],
    compareWith: [{ type: Input }],
    sortComparator: [{ type: Input }],
    valueChange: [{ type: Output }],
    opened: [{ type: Output }],
    closed: [{ type: Output }],
    selected: [{ type: Output }],
    deselected: [{ type: Output }],
    noOptionsFound: [{ type: Output }],
    handleKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    select: [{ type: HostBinding, args: ['class.mdb-select',] }],
    isOutline: [{ type: HostBinding, args: ['class.mdb-select-outline',] }],
    isMultiselectable: [{ type: HostBinding, args: ['attr.aria-multiselectable',] }],
    hasPopup: [{ type: HostBinding, args: ['attr.aria-haspopup',] }],
    isDisabled: [{ type: HostBinding, args: ['attr.aria-disabled',] }],
    isExpanded: [{ type: HostBinding, args: ['attr.aria-expanded',] }],
    role: [{ type: HostBinding, args: ['attr.aria-role',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXVpa2l0LXByby1zdGFuZGFyZC9zcmMvbGliL3Byby9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsS0FBSyxFQUNMLGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsU0FBUyxFQUNULFdBQVcsRUFDWCxNQUFNLEVBQ04sWUFBWSxFQUNaLGVBQWUsRUFDZixTQUFTLEVBSVQsaUJBQWlCLEVBQ2pCLElBQUksRUFDSixRQUFRLEVBQ1IsWUFBWSxFQUNaLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRixPQUFPLEVBQUUsU0FBUyxFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZFLE9BQU8sRUFHTCxPQUFPLEVBQ1AsYUFBYSxHQUVkLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8s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QVE7Ozs2QkFsTmxCLFNBQVMsU0FBQyxlQUFlOzJCQUN6QixTQUFTLFNBQUMsYUFBYTtnQ0FDdkIsU0FBUyxTQUFDLGtCQUFrQjt1QkFDNUIsU0FBUyxTQUFDLFVBQVU7cUJBQ3BCLFlBQVksU0FBQyx3QkFBd0I7OEJBQ3JDLFNBQVMsU0FBQyxnQkFBZ0I7NkJBQzFCLFNBQVMsU0FBQyxlQUFlOzhCQUN6QixZQUFZLFNBQUMsd0JBQXdCO3NCQUNyQyxlQUFlLFNBQUMsZUFBZSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTsyQkFDdEQsZUFBZSxTQUFDLG9CQUFvQjt5QkFFcEMsS0FBSztrQ0FDTCxLQUFLO3VCQUNMLEtBQUs7NEJBQ0wsS0FBSzs2QkFDTCxLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLO3NCQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7d0JBQ0wsS0FBSyxTQUFDLFlBQVk7NkJBQ2xCLEtBQUssU0FBQyxpQkFBaUI7NkJBQ3ZCLEtBQUs7MkJBYUwsS0FBSzs2QkFjTCxLQUFLO29CQVlMLEtBQUssWUFDTCxLQUFLOzBCQWVMLEtBQUs7NkJBVUwsS0FBSzswQkFNTCxNQUFNO3FCQUNOLE1BQU07cUJBQ04sTUFBTTt1QkFDTixNQUFNO3lCQUVOLE1BQU07NkJBR04sTUFBTTs0QkEwRE4sWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztxQkFPbEMsV0FBVyxTQUFDLGtCQUFrQjt3QkFLOUIsV0FBVyxTQUFDLDBCQUEwQjtnQ0FLdEMsV0FBVyxTQUFDLDJCQUEyQjt1QkFLdkMsV0FBVyxTQUFDLG9CQUFvQjt5QkFLaEMsV0FBVyxTQUFDLG9CQUFvQjt5QkFLaEMsV0FBVyxTQUFDLG9CQUFvQjttQkFLaEMsV0FBVyxTQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBJbnB1dCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgRWxlbWVudFJlZixcbiAgVmlld0NoaWxkLFxuICBUZW1wbGF0ZVJlZixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgUXVlcnlMaXN0LFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFNlbGYsXG4gIE9wdGlvbmFsLFxuICBIb3N0TGlzdGVuZXIsXG4gIFJlbmRlcmVyMixcbiAgQ29udGVudENoaWxkLFxuICBIb3N0QmluZGluZyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkcm9wZG93bkFuaW1hdGlvbiB9IGZyb20gJy4vc2VsZWN0LWFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNREJfT1BUSU9OX1BBUkVOVCwgT3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi4vb3B0aW9uL29wdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmdDb250cm9sLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9wdGlvbkdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi4vb3B0aW9uL29wdGlvbi1ncm91cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0QWxsT3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi4vb3B0aW9uL3NlbGVjdC1hbGwtb3B0aW9uJztcbmltcG9ydCB7XG4gIE92ZXJsYXlSZWYsXG4gIFBvc2l0aW9uU3RyYXRlZ3ksXG4gIE92ZXJsYXksXG4gIFZpZXdwb3J0UnVsZXIsXG4gIENvbm5lY3Rpb25Qb3NpdGlvblBhaXIsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICBFU0NBUEUsXG4gIFVQX0FSUk9XLFxuICBIT01FLFxuICBFTkQsXG4gIEVOVEVSLFxuICBTUEFDRSxcbiAgRE9XTl9BUlJPVyxcbn0gZnJvbSAnLi4vLi4vZnJlZS91dGlscy9rZXlib2FyZC1uYXZpZ2F0aW9uJztcbmltcG9ydCB7IE1kYlNlbGVjdEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1zZWxlY3QtMicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZWxlY3QtbW9kdWxlLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtkcm9wZG93bkFuaW1hdGlvbl0sXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTURCX09QVElPTl9QQVJFTlQsIHVzZUV4aXN0aW5nOiBNZGJTZWxlY3RDb21wb25lbnQgfV0sXG59KVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE1kYlNlbGVjdENvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBWaWV3Q2hpbGQoJ3NlbGVjdFdyYXBwZXInKSBwcml2YXRlIF9zZWxlY3RXcmFwcGVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzZWxlY3RWYWx1ZScpIHByaXZhdGUgX3NlbGVjdFZhbHVlOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdkcm9wZG93blRlbXBsYXRlJykgX2Ryb3Bkb3duVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBWaWV3Q2hpbGQoJ2Ryb3Bkb3duJykgZHJvcGRvd246IEVsZW1lbnRSZWY7XG4gIEBDb250ZW50Q2hpbGQoTWRiU2VsZWN0RmlsdGVyQ29tcG9uZW50KSBmaWx0ZXI6IE1kYlNlbGVjdEZpbHRlckNvbXBvbmVudDtcbiAgQFZpZXdDaGlsZCgnb3B0aW9uc1dyYXBwZXInKSBwcml2YXRlIF9vcHRpb25zV3JhcHBlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnY3VzdG9tQ29udGVudCcpIF9jdXN0b21Db250ZW50OiBFbGVtZW50UmVmO1xuICBAQ29udGVudENoaWxkKFNlbGVjdEFsbE9wdGlvbkNvbXBvbmVudCkgc2VsZWN0QWxsT3B0aW9uOiBTZWxlY3RBbGxPcHRpb25Db21wb25lbnQ7XG4gIEBDb250ZW50Q2hpbGRyZW4oT3B0aW9uQ29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG9wdGlvbnM6IFF1ZXJ5TGlzdDxPcHRpb25Db21wb25lbnQ+O1xuICBAQ29udGVudENoaWxkcmVuKE9wdGlvbkdyb3VwQ29tcG9uZW50KSBvcHRpb25Hcm91cHM6IFF1ZXJ5TGlzdDxPcHRpb25Hcm91cENvbXBvbmVudD47XG5cbiAgQElucHV0KCkgYWxsb3dDbGVhciA9IGZhbHNlO1xuICBASW5wdXQoKSBjbGVhckJ1dHRvblRhYmluZGV4ID0gMDtcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgZHJvcGRvd25DbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSBoaWdobGlnaHRGaXJzdCA9IHRydWU7XG4gIEBJbnB1dCgpIGxhYmVsID0gJyc7XG4gIEBJbnB1dCgpIG11bHRpcGxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIG5vdEZvdW5kTXNnID0gJ05vIHJlc3VsdHMgZm91bmQnO1xuICBASW5wdXQoKSBvdXRsaW5lID0gZmFsc2U7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRhYmluZGV4ID0gMDtcbiAgQElucHV0KCkgcmVxdWlyZWQgPSBmYWxzZTtcbiAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsID0gJyc7XG4gIEBJbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JykgYXJpYUxhYmVsbGVkYnk6IHN0cmluZztcbiAgQElucHV0KClcbiAgZ2V0IHZpc2libGVPcHRpb25zKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3Zpc2libGVPcHRpb25zO1xuICB9XG5cbiAgc2V0IHZpc2libGVPcHRpb25zKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgIT09IDApIHtcbiAgICAgIHRoaXMuX3Zpc2libGVPcHRpb25zID0gdmFsdWU7XG4gICAgICB0aGlzLmRyb3Bkb3duSGVpZ2h0ID0gdGhpcy52aXNpYmxlT3B0aW9ucyAqIHRoaXMub3B0aW9uSGVpZ2h0O1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF92aXNpYmxlT3B0aW9ucyA9IDU7XG5cbiAgQElucHV0KClcbiAgZ2V0IG9wdGlvbkhlaWdodCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25IZWlnaHQ7XG4gIH1cblxuICBzZXQgb3B0aW9uSGVpZ2h0KHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IDApIHtcbiAgICAgIHRoaXMuX29wdGlvbkhlaWdodCA9IHZhbHVlO1xuICAgICAgdGhpcy5kcm9wZG93bkhlaWdodCA9IHRoaXMudmlzaWJsZU9wdGlvbnMgKiB0aGlzLm9wdGlvbkhlaWdodDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9vcHRpb25IZWlnaHQgPSA0ODtcblxuICBASW5wdXQoKVxuICBnZXQgZHJvcGRvd25IZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZHJvcGRvd25IZWlnaHQ7XG4gIH1cblxuICBzZXQgZHJvcGRvd25IZWlnaHQodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh2YWx1ZSAhPT0gMCkge1xuICAgICAgdGhpcy5fZHJvcGRvd25IZWlnaHQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcHJvdGVjdGVkIF9kcm9wZG93bkhlaWdodCA9IHRoaXMudmlzaWJsZU9wdGlvbnMgKiB0aGlzLm9wdGlvbkhlaWdodDtcblxuICBASW5wdXQoKVxuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcbiAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX3ZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX3NldFNlbGVjdGlvbihuZXdWYWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX3ZhbHVlOiBhbnk7XG5cbiAgQElucHV0KClcbiAgZ2V0IGNvbXBhcmVXaXRoKCkge1xuICAgIHJldHVybiB0aGlzLl9jb21wYXJlV2l0aDtcbiAgfVxuICBzZXQgY29tcGFyZVdpdGgoZm46IChvMTogYW55LCBvMjogYW55KSA9PiBib29sZWFuKSB7XG4gICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5fY29tcGFyZVdpdGggPSBmbjtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBzb3J0Q29tcGFyYXRvcjogKFxuICAgIGE6IE9wdGlvbkNvbXBvbmVudCxcbiAgICBiOiBPcHRpb25Db21wb25lbnQsXG4gICAgb3B0aW9uczogT3B0aW9uQ29tcG9uZW50W11cbiAgKSA9PiBudW1iZXI7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgb3BlbmVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgY2xvc2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxPcHRpb25Db21wb25lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxPcHRpb25Db21wb25lbnQ+KCk7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgQE91dHB1dCgpIGRlc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxPcHRpb25Db21wb25lbnQgfCBPcHRpb25Db21wb25lbnRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIE9wdGlvbkNvbXBvbmVudCB8IE9wdGlvbkNvbXBvbmVudFtdXG4gID4oKTtcbiAgQE91dHB1dCgpIG5vT3B0aW9uc0ZvdW5kOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGdldCBhY3RpdmVPcHRpb24oKTogT3B0aW9uQ29tcG9uZW50IHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuX2tleU1hbmFnZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXQgc2VsZWN0aW9uVmlldygpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5tYXAob3B0aW9uID0+IG9wdGlvbi5sYWJlbC50cmltKCkpO1xuXG4gICAgICByZXR1cm4gc2VsZWN0ZWRPcHRpb25zLmpvaW4oJywgJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF0ubGFiZWw7XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgZ2V0IGhhc1NlbGVjdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uTW9kZWwgJiYgIXRoaXMuX3NlbGVjdGlvbk1vZGVsLmlzRW1wdHkoKTtcbiAgfVxuXG4gIGdldCBhbGxDaGVja2VkKCkge1xuICAgIGNvbnN0IHNlbGVjdGlvbnNOdW1iZXIgPSB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5sZW5ndGg7XG4gICAgY29uc3Qgb3B0aW9uc051bWJlciA9IHRoaXMub3B0aW9ucy5sZW5ndGg7XG5cbiAgICByZXR1cm4gc2VsZWN0aW9uc051bWJlciA9PT0gb3B0aW9uc051bWJlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2tleU1hbmFnZXI6IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE9wdGlvbkNvbXBvbmVudCB8IG51bGw+O1xuXG4gIHByaXZhdGUgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWYgfCBudWxsO1xuICBwcml2YXRlIF9wb3J0YWw6IFRlbXBsYXRlUG9ydGFsO1xuXG4gIHByaXZhdGUgX3NlbGVjdGlvbk1vZGVsOiBTZWxlY3Rpb25Nb2RlbDxPcHRpb25Db21wb25lbnQ+O1xuXG4gIHByZXZpb3VzU2VsZWN0ZWRWYWx1ZXM6IGFueTtcblxuICBwcml2YXRlIF9kZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBfaXNPcGVuID0gZmFsc2U7XG5cbiAgX2hhc0ZvY3VzID0gZmFsc2U7XG5cbiAgX2xhYmVsQWN0aXZlID0gZmFsc2U7XG5cbiAgX3Nob3dOb1Jlc3VsdHNNc2cgPSBmYWxzZTtcblxuICBwcml2YXRlIF9zZWxlY3RBbGxDaGVja2VkID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfY29tcGFyZVdpdGggPSAobzE6IGFueSwgbzI6IGFueSkgPT4gbzEgPT09IG8yO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBoYW5kbGVLZXlkb3duKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2hhbmRsZUNsb3NlZEtleWRvd24oZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubWRiLXNlbGVjdCcpXG4gIGdldCBzZWxlY3QoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1kYi1zZWxlY3Qtb3V0bGluZScpXG4gIGdldCBpc091dGxpbmUoKSB7XG4gICAgcmV0dXJuIHRoaXMub3V0bGluZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLW11bHRpc2VsZWN0YWJsZScpXG4gIGdldCBpc011bHRpc2VsZWN0YWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBsZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWhhc3BvcHVwJylcbiAgZ2V0IGhhc1BvcHVwKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtZGlzYWJsZWQnKVxuICBnZXQgaXNEaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWV4cGFuZGVkJylcbiAgZ2V0IGlzRXhwYW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzT3BlbjtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXJvbGUnKVxuICBnZXQgcm9sZSgpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIgPyAnY29tYm9ib3gnIDogJ2xpc3Rib3gnO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSxcbiAgICBwcml2YXRlIF92aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLFxuICAgIHByaXZhdGUgX3ZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBAU2VsZigpIEBPcHRpb25hbCgpIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbFxuICApIHtcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHtcbiAgICAgIHRoaXMubmdDb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9pbml0S2V5TWFuYWdlcigpO1xuICAgIHRoaXMuX3NldEluaXRpYWxWYWx1ZSgpO1xuICAgIHRoaXMuX2xpc3RlblRvT3B0aW9uQ2xpY2soKTtcblxuICAgIGlmICh0aGlzLnNlbGVjdEFsbE9wdGlvbikge1xuICAgICAgdGhpcy5fbGlzdGVuVG9TZWxlY3RBbGxDbGljaygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuICAgICAgdGhpcy5maWx0ZXIuaW5wdXRDaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlICYmICF0aGlzLmZpbHRlci52YWx1ZSkge1xuICAgICAgICAgIHRoaXMucHJldmlvdXNTZWxlY3RlZFZhbHVlcyA9IHRoaXMub3B0aW9uc1xuICAgICAgICAgICAgLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLnNlbGVjdGVkKVxuICAgICAgICAgICAgLm1hcChvcHRpb24gPT4gb3B0aW9uLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmVzdG9yZU11bHRpcGxlT3B0aW9ucygpIHtcbiAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLmZpbHRlcikge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmZpbHRlci52YWx1ZSAmJlxuICAgICAgICB0aGlzLmZpbHRlci52YWx1ZS5sZW5ndGggJiZcbiAgICAgICAgdGhpcy5wcmV2aW91c1NlbGVjdGVkVmFsdWVzICYmXG4gICAgICAgIEFycmF5LmlzQXJyYXkodGhpcy5wcmV2aW91c1NlbGVjdGVkVmFsdWVzKVxuICAgICAgKSB7XG4gICAgICAgIGlmICghdGhpcy52YWx1ZSB8fCAhQXJyYXkuaXNBcnJheSh0aGlzLnZhbHVlKSkge1xuICAgICAgICAgIHRoaXMudmFsdWUgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcHRpb25WYWx1ZXMgPSB0aGlzLm9wdGlvbnMubWFwKG9wdGlvbiA9PiBvcHRpb24udmFsdWUpO1xuICAgICAgICB0aGlzLnByZXZpb3VzU2VsZWN0ZWRWYWx1ZXMuZm9yRWFjaChwcmV2aW91c1ZhbHVlID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhdGhpcy52YWx1ZS5zb21lKCh2OiBhbnkpID0+IHRoaXMuY29tcGFyZVdpdGgodiwgcHJldmlvdXNWYWx1ZSkpICYmXG4gICAgICAgICAgICAhb3B0aW9uVmFsdWVzLnNvbWUodiA9PiB0aGlzLmNvbXBhcmVXaXRoKHYsIHByZXZpb3VzVmFsdWUpKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgLy8gaWYgYSB2YWx1ZSB0aGF0IHdhcyBzZWxlY3RlZCBiZWZvcmUgaXMgZGVzZWxlY3RlZCBhbmQgbm90IGZvdW5kIGluIHRoZSBvcHRpb25zLCBpdCB3YXMgZGVzZWxlY3RlZFxuICAgICAgICAgICAgLy8gZHVlIHRvIHRoZSBmaWx0ZXJpbmcsIHNvIHdlIHJlc3RvcmUgaXQuXG4gICAgICAgICAgICB0aGlzLnZhbHVlLnB1c2gocHJldmlvdXNWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcmV2aW91c1NlbGVjdGVkVmFsdWVzID0gdGhpcy52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbml0S2V5TWFuYWdlcigpIHtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5zZWxlY3RBbGxPcHRpb24gPyBbdGhpcy5zZWxlY3RBbGxPcHRpb24sIC4uLnRoaXMub3B0aW9uc10gOiB0aGlzLm9wdGlvbnM7XG5cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcbiAgICAgIHRoaXMuX2tleU1hbmFnZXIgPSBuZXcgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8T3B0aW9uQ29tcG9uZW50IHwgbnVsbD4oXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICkud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fa2V5TWFuYWdlciA9IG5ldyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxPcHRpb25Db21wb25lbnQgfCBudWxsPihvcHRpb25zKVxuICAgICAgICAud2l0aFR5cGVBaGVhZCgyMDApXG4gICAgICAgIC53aXRoVmVydGljYWxPcmllbnRhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RlblRvT3B0aW9uQ2xpY2soKSB7XG4gICAgdGhpcy5vcHRpb25zLmNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgodGhpcy5vcHRpb25zKSxcbiAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9zZXRJbml0aWFsVmFsdWUoKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dOb1Jlc3VsdHNNc2cgPSB0aGlzLm9wdGlvbnMubGVuZ3RoID09PSAwO1xuICAgICAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKG51bGwpO1xuICAgICAgICAgICAgdGhpcy5faW5pdEtleU1hbmFnZXIoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzT3Blbikge1xuICAgICAgICAgICAgICB0aGlzLl9oaWdobGlnaHRGaXJzdE9wdGlvbigpO1xuXG4gICAgICAgICAgICAgIGlmICh0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGxUb09wdGlvbih0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgMCk7XG4gICAgICAgIH0pLFxuICAgICAgICBzd2l0Y2hNYXAoKG9wdGlvbnM6IFF1ZXJ5TGlzdDxPcHRpb25Db21wb25lbnQ+KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG1lcmdlKC4uLm9wdGlvbnMubWFwKChvcHRpb246IE9wdGlvbkNvbXBvbmVudCkgPT4gb3B0aW9uLmNsaWNrJCkpO1xuICAgICAgICB9KSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChjbGlja2VkT3B0aW9uOiBPcHRpb25Db21wb25lbnQpID0+IHRoaXMuX2hhbmRsZU9wdGlvbkNsaWNrKGNsaWNrZWRPcHRpb24pKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RlblRvU2VsZWN0QWxsQ2xpY2soKSB7XG4gICAgdGhpcy5zZWxlY3RBbGxPcHRpb24uY2xpY2skXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSkpXG4gICAgICAuc3Vic2NyaWJlKChvcHRpb246IFNlbGVjdEFsbE9wdGlvbkNvbXBvbmVudCkgPT4ge1xuICAgICAgICB0aGlzLm9uU2VsZWN0QWxsKG9wdGlvbik7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVZhbHVlKCkge1xuICAgIGxldCB1cGRhdGVkVmFsdWU6IGFueSA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgdXBkYXRlZFZhbHVlID0gdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQubWFwKG9wdGlvbiA9PiBvcHRpb24udmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVkVmFsdWUgPSB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXS52YWx1ZTtcbiAgICB9XG5cbiAgICB0aGlzLl92YWx1ZSA9IHVwZGF0ZWRWYWx1ZTtcbiAgICB0aGlzLnJlc3RvcmVNdWx0aXBsZU9wdGlvbnMoKTtcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU9wdGlvbkNsaWNrKG9wdGlvbjogT3B0aW9uQ29tcG9uZW50KSB7XG4gICAgaWYgKG9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICB0aGlzLl9oYW5kbGVNdWx0aXBsZVNlbGVjdGlvbihvcHRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oYW5kbGVTaW5nbGVTZWxlY3Rpb24ob3B0aW9uKTtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVMYWJlTFBvc2l0aW9uKCk7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVTaW5nbGVTZWxlY3Rpb24ob3B0aW9uOiBPcHRpb25Db21wb25lbnQpIHtcbiAgICBjb25zdCBjdXJyZW50U2VsZWN0aW9uID0gdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF07XG5cbiAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3Qob3B0aW9uKTtcbiAgICBvcHRpb24uc2VsZWN0KCk7XG5cbiAgICBpZiAoY3VycmVudFNlbGVjdGlvbiAmJiBjdXJyZW50U2VsZWN0aW9uICE9PSBvcHRpb24pIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLmRlc2VsZWN0KGN1cnJlbnRTZWxlY3Rpb24pO1xuICAgICAgY3VycmVudFNlbGVjdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgdGhpcy5kZXNlbGVjdGVkLmVtaXQoY3VycmVudFNlbGVjdGlvbi52YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKCFjdXJyZW50U2VsZWN0aW9uIHx8IChjdXJyZW50U2VsZWN0aW9uICYmIGN1cnJlbnRTZWxlY3Rpb24gIT09IG9wdGlvbikpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZVZhbHVlKCk7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgIHRoaXMuc2VsZWN0ZWQuZW1pdChvcHRpb24udmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMuY2xvc2UoKTtcbiAgICB0aGlzLl9mb2N1cygpO1xuICAgIHRoaXMuX3VwZGF0ZUxhYmVMUG9zaXRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU11bHRpcGxlU2VsZWN0aW9uKG9wdGlvbjogT3B0aW9uQ29tcG9uZW50KSB7XG4gICAgY29uc3QgY3VycmVudFNlbGVjdGlvbnMgPSB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZDtcbiAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5kZXNlbGVjdChvcHRpb24pO1xuICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICB0aGlzLmRlc2VsZWN0ZWQuZW1pdChjdXJyZW50U2VsZWN0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdChvcHRpb24pO1xuICAgICAgb3B0aW9uLnNlbGVjdCgpO1xuICAgICAgdGhpcy5zZWxlY3RlZC5lbWl0KG9wdGlvbi52YWx1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fc2VsZWN0QWxsQ2hlY2tlZCA9IHRoaXMuYWxsQ2hlY2tlZCA/IHRydWUgOiBmYWxzZTtcblxuICAgIGlmICh0aGlzLnNlbGVjdEFsbE9wdGlvbiAmJiAhdGhpcy5fc2VsZWN0QWxsQ2hlY2tlZCkge1xuICAgICAgdGhpcy5zZWxlY3RBbGxPcHRpb24uZGVzZWxlY3QoKTtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVWYWx1ZSgpO1xuICAgIHRoaXMuX3NvcnRWYWx1ZXMoKTtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgdGhpcy5fb25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRTZWxlY3Rpb24oc2VsZWN0VmFsdWU6IGFueSB8IGFueVtdKSB7XG4gICAgY29uc3QgcHJldmlvdXNTZWxlY3RlZCA9IHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkO1xuXG4gICAgcHJldmlvdXNTZWxlY3RlZC5mb3JFYWNoKChzZWxlY3RlZE9wdGlvbjogT3B0aW9uQ29tcG9uZW50KSA9PiB7XG4gICAgICBzZWxlY3RlZE9wdGlvbi5kZXNlbGVjdCgpO1xuICAgIH0pO1xuICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG5cbiAgICBpZiAoc2VsZWN0VmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIHNlbGVjdFZhbHVlLmZvckVhY2goKHZhbHVlOiBhbnkpID0+IHRoaXMuX3NlbGVjdEJ5VmFsdWUodmFsdWUpKTtcbiAgICAgICAgdGhpcy5fc29ydFZhbHVlcygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0QnlWYWx1ZShzZWxlY3RWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlTGFiZUxQb3NpdGlvbigpO1xuICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0QnlWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgY29uc3QgbWF0Y2hpbmdPcHRpb24gPSB0aGlzLm9wdGlvbnNcbiAgICAgIC50b0FycmF5KClcbiAgICAgIC5maW5kKChvcHRpb246IE9wdGlvbkNvbXBvbmVudCkgPT4gdGhpcy5fY29tcGFyZVdpdGgob3B0aW9uLnZhbHVlLCB2YWx1ZSkpO1xuXG4gICAgaWYgKG1hdGNoaW5nT3B0aW9uKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3QobWF0Y2hpbmdPcHRpb24pO1xuICAgICAgbWF0Y2hpbmdPcHRpb24uc2VsZWN0KCk7XG4gICAgICB0aGlzLnNlbGVjdGVkLmVtaXQobWF0Y2hpbmdPcHRpb24udmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NldEluaXRpYWxWYWx1ZSgpIHtcbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5uZ0NvbnRyb2wgPyB0aGlzLm5nQ29udHJvbC52YWx1ZSA6IHRoaXMuX3ZhbHVlO1xuICAgICAgdGhpcy5fc2V0U2VsZWN0aW9uKHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uU2VsZWN0QWxsKHNlbGVjdEFsbG9wdGlvbjogU2VsZWN0QWxsT3B0aW9uQ29tcG9uZW50KSB7XG4gICAgaWYgKCFzZWxlY3RBbGxvcHRpb24uc2VsZWN0ZWQgJiYgIXRoaXMuX3NlbGVjdEFsbENoZWNrZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdEFsbENoZWNrZWQgPSB0cnVlO1xuICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbjogT3B0aW9uQ29tcG9uZW50KSA9PiB7XG4gICAgICAgIGlmICghb3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0KG9wdGlvbik7XG4gICAgICAgICAgb3B0aW9uLnNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX3VwZGF0ZVZhbHVlKCk7XG4gICAgICB0aGlzLl9zb3J0VmFsdWVzKCk7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgIHRoaXMuX3VwZGF0ZUxhYmVMUG9zaXRpb24oKTtcbiAgICAgIHNlbGVjdEFsbG9wdGlvbi5zZWxlY3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VsZWN0QWxsQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcbiAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb246IE9wdGlvbkNvbXBvbmVudCkgPT4ge1xuICAgICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgIH0pO1xuICAgICAgc2VsZWN0QWxsb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICB0aGlzLl91cGRhdGVWYWx1ZSgpO1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICAgICAgdGhpcy5fb25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICB0aGlzLl91cGRhdGVMYWJlTFBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbigpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBvdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheVJlZjtcblxuICAgIGlmICghb3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5fcG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuX2Ryb3Bkb3duVGVtcGxhdGUsIHRoaXMuX3Zjcik7XG5cbiAgICAgIG92ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZSh7XG4gICAgICAgIHdpZHRoOiB0aGlzLl9zZWxlY3RXcmFwcGVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLl9vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbigpLFxuICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLl9nZXRPdmVybGF5UG9zaXRpb24oKSxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9vdmVybGF5UmVmID0gb3ZlcmxheVJlZjtcblxuICAgICAgb3ZlcmxheVJlZi5rZXlkb3duRXZlbnRzKCkuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgaWYgKGtleSA9PT0gRVNDQVBFIHx8IChrZXkgPT09IFVQX0FSUk9XICYmIGV2ZW50LmFsdEtleSkpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICB0aGlzLl9mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAob3ZlcmxheVJlZiAmJiAhb3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICBvdmVybGF5UmVmLmF0dGFjaCh0aGlzLl9wb3J0YWwpO1xuICAgICAgdGhpcy5fbGlzdGVuVG9PdXRTaWRlQ2ljayhvdmVybGF5UmVmLCB0aGlzLl9zZWxlY3RWYWx1ZS5uYXRpdmVFbGVtZW50KS5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgdGhpcy5jbG9zZSgpXG4gICAgICApO1xuXG4gICAgICBpZiAodGhpcy5maWx0ZXIpIHtcbiAgICAgICAgdGhpcy5maWx0ZXIuZm9jdXMoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5faGlnaGxpZ2h0Rmlyc3RPcHRpb24oKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fdmlld3BvcnRSdWxlcikge1xuICAgICAgdGhpcy5fdmlld3BvcnRSdWxlclxuICAgICAgICAuY2hhbmdlKClcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5faXNPcGVuICYmIG92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIG92ZXJsYXlSZWYudXBkYXRlU2l6ZSh7IHdpZHRoOiB0aGlzLl9zZWxlY3RXcmFwcGVyLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IGZpcnN0U2VsZWN0ZWQgPSB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXTtcbiAgICAgIGlmIChmaXJzdFNlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbFRvT3B0aW9uKGZpcnN0U2VsZWN0ZWQpO1xuICAgICAgfVxuICAgIH0sIDApO1xuXG4gICAgdGhpcy5vcGVuZWQuZW1pdCgpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5saXN0ZW4odGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LCAna2V5ZG93bicsIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLl9oYW5kbGVPcGVuS2V5ZG93bihldmVudCk7XG4gICAgICB9KTtcbiAgICB9LCAwKTtcblxuICAgIHRoaXMuX3VwZGF0ZUxhYmVMUG9zaXRpb24oKTtcblxuICAgIGlmICghdGhpcy5maWx0ZXIpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIHRoaXMuX2lzT3BlbiA9IHRydWU7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zb3J0VmFsdWVzKCkge1xuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zLnRvQXJyYXkoKTtcblxuICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zb3J0Q29tcGFyYXRvclxuICAgICAgICAgID8gdGhpcy5zb3J0Q29tcGFyYXRvcihhLCBiLCBvcHRpb25zKVxuICAgICAgICAgIDogb3B0aW9ucy5pbmRleE9mKGEpIC0gb3B0aW9ucy5pbmRleE9mKGIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuVG9PdXRTaWRlQ2ljayhvdmVybGF5UmVmOiBPdmVybGF5UmVmLCBvcmlnaW46IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIGZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJykucGlwZShcbiAgICAgIGZpbHRlcigoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zdCBub3RPcmlnaW4gPSB0YXJnZXQgIT09IG9yaWdpbjtcbiAgICAgICAgY29uc3Qgbm90VmFsdWUgPSAhdGhpcy5fc2VsZWN0VmFsdWUubmF0aXZlRWxlbWVudC5jb250YWlucyh0YXJnZXQpO1xuICAgICAgICBjb25zdCBub3RPdmVybGF5ID0gISFvdmVybGF5UmVmICYmIG92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuY29udGFpbnModGFyZ2V0KSA9PT0gZmFsc2U7XG4gICAgICAgIHJldHVybiBub3RPcmlnaW4gJiYgbm90VmFsdWUgJiYgbm90T3ZlcmxheTtcbiAgICAgIH0pLFxuICAgICAgdGFrZVVudGlsKG92ZXJsYXlSZWYuZGV0YWNobWVudHMoKSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0T3ZlcmxheVBvc2l0aW9uKCk6IFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgIGNvbnN0IHBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLl9vdmVybGF5XG4gICAgICAucG9zaXRpb24oKVxuICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5fc2VsZWN0V3JhcHBlcilcbiAgICAgIC53aXRoUG9zaXRpb25zKHRoaXMuX2dldFBvc2l0aW9ucygpKVxuICAgICAgLndpdGhGbGV4aWJsZURpbWVuc2lvbnMoZmFsc2UpO1xuXG4gICAgcmV0dXJuIHBvc2l0aW9uU3RyYXRlZ3k7XG4gIH1cblxuICBwcml2YXRlIF9nZXRQb3NpdGlvbnMoKTogQ29ubmVjdGlvblBvc2l0aW9uUGFpcltdIHtcbiAgICBjb25zdCBib3R0b21PZmZzZXQgPSB0aGlzLm91dGxpbmUgPyA0IDogNjtcbiAgICBjb25zdCB0b3BPZmZzZXQgPSB0aGlzLm91dGxpbmUgPyAtNyA6IC0zO1xuICAgIGlmICghdGhpcy5vdXRsaW5lKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICB7XG4gICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgICAgICBvZmZzZXRZOiBib3R0b21PZmZzZXQsXG4gICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgb3ZlcmxheVk6ICd0b3AnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgICAgICBvZmZzZXRZOiB0b3BPZmZzZXQsXG4gICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgb3ZlcmxheVk6ICdib3R0b20nLFxuICAgICAgICB9LFxuICAgICAgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAge1xuICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgb2Zmc2V0WTogYm90dG9tT2Zmc2V0LFxuICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICAgIG92ZXJsYXlZOiAndG9wJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgICAgb2Zmc2V0WTogdG9wT2Zmc2V0LFxuICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJyxcbiAgICAgICAgfSxcbiAgICAgIF07XG4gICAgfVxuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgaWYgKCF0aGlzLl9pc09wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fb3ZlcmxheVJlZiAmJiB0aGlzLl9vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmNsb3NlZC5lbWl0KCk7XG4gICAgdGhpcy5fdXBkYXRlTGFiZUxQb3NpdGlvbigpO1xuICAgIHRoaXMuX2tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShudWxsKTtcbiAgICB0aGlzLl9vblRvdWNoZWQoKTtcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLl9pc09wZW4gPyB0aGlzLmNsb3NlKCkgOiB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUxhYmVMUG9zaXRpb24oKSB7XG4gICAgaWYgKCF0aGlzLnBsYWNlaG9sZGVyICYmICF0aGlzLmhhc1NlbGVjdGVkKSB7XG4gICAgICB0aGlzLl9sYWJlbEFjdGl2ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9sYWJlbEFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGhhc1NlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5sZW5ndGggIT09IDA7XG4gIH1cblxuICBwcml2YXRlIF9zY3JvbGxUb09wdGlvbihvcHRpb246IE9wdGlvbkNvbXBvbmVudCkge1xuICAgIGxldCBvcHRpb25JbmRleDogbnVtYmVyO1xuXG4gICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy5zZWxlY3RBbGxPcHRpb24pIHtcbiAgICAgIG9wdGlvbkluZGV4ID0gdGhpcy5vcHRpb25zLnRvQXJyYXkoKS5pbmRleE9mKG9wdGlvbikgKyAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25JbmRleCA9IHRoaXMub3B0aW9ucy50b0FycmF5KCkuaW5kZXhPZihvcHRpb24pO1xuICAgIH1cblxuICAgIGNvbnN0IGdyb3Vwc051bWJlciA9IHRoaXMuX2dldE51bWJlck9mR3JvdXBzQmVmb3JlT3B0aW9uKG9wdGlvbkluZGV4KTtcblxuICAgIGNvbnN0IHNjcm9sbFRvSW5kZXggPSBvcHRpb25JbmRleCArIGdyb3Vwc051bWJlcjtcblxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLl9vcHRpb25zV3JhcHBlci5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGxpc3RIZWlnaHQgPSBsaXN0Lm9mZnNldEhlaWdodDtcblxuICAgIGlmIChvcHRpb25JbmRleCA+IC0xKSB7XG4gICAgICBjb25zdCBvcHRpb25Ub3AgPSBzY3JvbGxUb0luZGV4ICogdGhpcy5vcHRpb25IZWlnaHQ7XG4gICAgICBjb25zdCBvcHRpb25Cb3R0b20gPSBvcHRpb25Ub3AgKyB0aGlzLm9wdGlvbkhlaWdodDtcblxuICAgICAgY29uc3Qgdmlld1RvcCA9IGxpc3Quc2Nyb2xsVG9wO1xuICAgICAgY29uc3Qgdmlld0JvdHRvbSA9IHRoaXMuZHJvcGRvd25IZWlnaHQ7XG5cbiAgICAgIGlmIChvcHRpb25Cb3R0b20gPiB2aWV3Qm90dG9tKSB7XG4gICAgICAgIGxpc3Quc2Nyb2xsVG9wID0gb3B0aW9uQm90dG9tIC0gbGlzdEhlaWdodDtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9uVG9wIDwgdmlld1RvcCkge1xuICAgICAgICBsaXN0LnNjcm9sbFRvcCA9IG9wdGlvblRvcDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9nZXROdW1iZXJPZkdyb3Vwc0JlZm9yZU9wdGlvbihvcHRpb25JbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5vcHRpb25Hcm91cHMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBvcHRpb25zTGlzdCA9IHRoaXMub3B0aW9ucy50b0FycmF5KCk7XG4gICAgICBjb25zdCBncm91cHNMaXN0ID0gdGhpcy5vcHRpb25Hcm91cHMudG9BcnJheSgpO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm11bHRpcGxlID8gb3B0aW9uSW5kZXggLSAxIDogb3B0aW9uSW5kZXg7XG4gICAgICBsZXQgZ3JvdXBzTnVtYmVyID0gMDtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gaW5kZXg7IGkrKykge1xuICAgICAgICBpZiAob3B0aW9uc0xpc3RbaV0uZ3JvdXAgJiYgb3B0aW9uc0xpc3RbaV0uZ3JvdXAgPT09IGdyb3Vwc0xpc3RbZ3JvdXBzTnVtYmVyXSkge1xuICAgICAgICAgIGdyb3Vwc051bWJlcisrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBncm91cHNOdW1iZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBoYW5kbGVTZWxlY3Rpb25DbGVhcihldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmIChldmVudC5idXR0b24gPT09IDIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb246IE9wdGlvbkNvbXBvbmVudCkgPT4ge1xuICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5zZWxlY3RBbGxPcHRpb24gJiYgdGhpcy5fc2VsZWN0QWxsQ2hlY2tlZCkge1xuICAgICAgdGhpcy5zZWxlY3RBbGxPcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgIHRoaXMuX3NlbGVjdEFsbENoZWNrZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KG51bGwpO1xuICAgIHRoaXMuX29uQ2hhbmdlKG51bGwpO1xuICAgIHRoaXMuX3VwZGF0ZUxhYmVMUG9zaXRpb24oKTtcbiAgICB0aGlzLl9zZWxlY3RBbGxDaGVja2VkID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVPcGVuS2V5ZG93bihldmVudDogYW55KSB7XG4gICAgY29uc3Qga2V5ID0gZXZlbnQua2V5Q29kZTtcbiAgICBjb25zdCBtYW5hZ2VyID0gdGhpcy5fa2V5TWFuYWdlcjtcbiAgICBjb25zdCBpc1VzZXJUeXBpbmcgPSBtYW5hZ2VyLmlzVHlwaW5nKCk7XG4gICAgY29uc3QgcHJldmlvdXNBY3RpdmVJdGVtID0gbWFuYWdlci5hY3RpdmVJdGVtO1xuICAgIG1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcblxuICAgIGlmIChrZXkgPT09IEhPTUUgfHwga2V5ID09PSBFTkQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBrZXkgPT09IEhPTUUgPyBtYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpIDogbWFuYWdlci5zZXRMYXN0SXRlbUFjdGl2ZSgpO1xuICAgICAgaWYgKG1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICB0aGlzLl9zY3JvbGxUb09wdGlvbihtYW5hZ2VyLmFjdGl2ZUl0ZW0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aGlzLl9vdmVybGF5UmVmICYmXG4gICAgICB0aGlzLl9vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkgJiZcbiAgICAgICFpc1VzZXJUeXBpbmcgJiZcbiAgICAgIG1hbmFnZXIuYWN0aXZlSXRlbSAmJlxuICAgICAgKGtleSA9PT0gRU5URVIgfHwgKGtleSA9PT0gU1BBQ0UgJiYgIXRoaXMuZmlsdGVyKSlcbiAgICApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMuc2VsZWN0QWxsT3B0aW9uICYmIG1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ID09PSAwKSB7XG4gICAgICAgIHRoaXMub25TZWxlY3RBbGwodGhpcy5zZWxlY3RBbGxPcHRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faGFuZGxlT3B0aW9uQ2xpY2sobWFuYWdlci5hY3RpdmVJdGVtKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gVVBfQVJST1cgJiYgZXZlbnQuYWx0S2V5KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgdGhpcy5fZm9jdXMoKTtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gVVBfQVJST1cgfHwga2V5ID09PSBET1dOX0FSUk9XKSB7XG4gICAgICBpZiAobWFuYWdlci5hY3RpdmVJdGVtICYmIG1hbmFnZXIuYWN0aXZlSXRlbSAhPT0gcHJldmlvdXNBY3RpdmVJdGVtKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbFRvT3B0aW9uKG1hbmFnZXIuYWN0aXZlSXRlbSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlQ2xvc2VkS2V5ZG93bihldmVudDogYW55KSB7XG4gICAgY29uc3Qga2V5ID0gZXZlbnQua2V5Q29kZTtcbiAgICBjb25zdCBtYW5hZ2VyID0gdGhpcy5fa2V5TWFuYWdlcjtcblxuICAgIGlmICgoa2V5ID09PSBET1dOX0FSUk9XICYmIGV2ZW50LmFsdEtleSkgfHwga2V5ID09PSBFTlRFUikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMubXVsdGlwbGUgJiYga2V5ID09PSBET1dOX0FSUk9XKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbWFuYWdlci5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuICAgICAgaWYgKG1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICB0aGlzLl9oYW5kbGVPcHRpb25DbGljayhtYW5hZ2VyLmFjdGl2ZUl0ZW0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMubXVsdGlwbGUgJiYga2V5ID09PSBVUF9BUlJPVykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1hbmFnZXIuc2V0UHJldmlvdXNJdGVtQWN0aXZlKCk7XG4gICAgICBpZiAobWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZU9wdGlvbkNsaWNrKG1hbmFnZXIuYWN0aXZlSXRlbSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghdGhpcy5tdWx0aXBsZSAmJiBrZXkgPT09IEhPTUUpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBtYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgICAgaWYgKG1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICB0aGlzLl9oYW5kbGVPcHRpb25DbGljayhtYW5hZ2VyLmFjdGl2ZUl0ZW0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMubXVsdGlwbGUgJiYga2V5ID09PSBFTkQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBtYW5hZ2VyLnNldExhc3RJdGVtQWN0aXZlKCk7XG4gICAgICBpZiAobWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZU9wdGlvbkNsaWNrKG1hbmFnZXIuYWN0aXZlSXRlbSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLm11bHRpcGxlICYmIChrZXkgPT09IERPV05fQVJST1cgfHwga2V5ID09PSBVUF9BUlJPVykpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVPcHRpb25zV2hlZWwoZXZlbnQ6IGFueSkge1xuICAgIGNvbnN0IG9wdGlvbnNMaXN0ID0gdGhpcy5fb3B0aW9uc1dyYXBwZXIubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBhdFRvcCA9IG9wdGlvbnNMaXN0LnNjcm9sbFRvcCA9PT0gMDtcbiAgICBjb25zdCBhdEJvdHRvbSA9IG9wdGlvbnNMaXN0Lm9mZnNldEhlaWdodCArIG9wdGlvbnNMaXN0LnNjcm9sbFRvcCA9PT0gb3B0aW9uc0xpc3Quc2Nyb2xsSGVpZ2h0O1xuXG4gICAgaWYgKGF0VG9wICYmIGV2ZW50LmRlbHRhWSA8IDApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSBlbHNlIGlmIChhdEJvdHRvbSAmJiBldmVudC5kZWx0YVkgPiAwKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZvY3VzKCkge1xuICAgIHRoaXMuX2hhc0ZvY3VzID0gdHJ1ZTtcbiAgICB0aGlzLl9zZWxlY3RXcmFwcGVyLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZ2hsaWdodEZpcnN0T3B0aW9uKCkge1xuICAgIGlmICghdGhpcy5oYXNTZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuX2tleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhhc1NlbGVjdGlvbiAmJiAhdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF0uZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbSh0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXSk7XG4gICAgfVxuICB9XG5cbiAgb25Gb2N1cygpIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2ZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgb25CbHVyKCkge1xuICAgIGlmICghdGhpcy5faXNPcGVuICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLl9vblRvdWNoZWQoKTtcbiAgICB9XG4gICAgdGhpcy5faGFzRm9jdXMgPSBmYWxzZTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsPE9wdGlvbkNvbXBvbmVudD4odGhpcy5tdWx0aXBsZSk7XG5cbiAgICBpZiAodGhpcy5sYWJlbCkge1xuICAgICAgdGhpcy5fdXBkYXRlTGFiZUxQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2Rlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKiBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UgbWV0aG9kcy4gKiovXG5cbiAgcHJpdmF0ZSBfb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cbn1cbiJdfQ==