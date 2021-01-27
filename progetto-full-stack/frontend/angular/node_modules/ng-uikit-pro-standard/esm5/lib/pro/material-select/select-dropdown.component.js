import { __decorate, __metadata } from "tslib";
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, ViewEncapsulation, ElementRef, HostListener, Renderer2, ChangeDetectorRef, ChangeDetectionStrategy, SimpleChanges, OnDestroy, } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { OptionList } from './option-list';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap, map } from 'rxjs/operators';
import { A, NINE, Z, ZERO } from '../../free/utils/keyboard-navigation';
var SelectDropdownComponent = /** @class */ (function () {
    function SelectDropdownComponent(_elementRef, _renderer, cdRef) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.cdRef = cdRef;
        this.customClass = '';
        this.visibleOptions = 4;
        this.selectAllLabel = 'Select all';
        this.outline = false;
        this.close = new EventEmitter();
        this.optionClicked = new EventEmitter();
        this.singleFilterClick = new EventEmitter();
        this.singleFilterInput = new EventEmitter();
        this.singleFilterKeydown = new EventEmitter();
        this.animationDone = new EventEmitter();
        this.animationStart = new EventEmitter();
        this.selectAll = new EventEmitter();
        this.disabledColor = '#fff';
        this.disabledTextColor = '9e9e9e';
        // Used in sliding-down animation
        this.state = 'invisible';
        this.startHeight = 0;
        this.endHeight = 45;
        this.hasOptionsItems = true;
        this._destroy = new Subject();
        this._pressedKeysStream = new Subject();
        this._pressedKeys = [];
        this.selectAllSelected = false;
        this.searchIndex = 0;
        this.previousKey = '';
    }
    SelectDropdownComponent.prototype.onWindowKeydown = function (event) {
        if ((event.keyCode >= A && event.keyCode <= Z) ||
            (event.keyCode >= ZERO && event.keyCode <= NINE)) {
            this._pressedKeysStream.next(String.fromCharCode(event.keyCode));
        }
    };
    SelectDropdownComponent.prototype.highlightOptionByTyping = function () {
        var _this = this;
        this._pressedKeysStream
            .pipe(tap(function (key) { return _this._pressedKeys.push(key); }), map(function () { return _this._pressedKeys.join('').toLocaleLowerCase(); }), debounceTime(200), takeUntil(this._destroy))
            .subscribe(function (searchKey) {
            var items = Array.from(_this.optionList['_options'])
                .filter(function (elem) { return !elem.group; })
                .filter(function (elem) { return !elem.disabled; })
                .map(function (el) { return el.wrappedOption.label || el.wrappedOption.value; });
            _this.navigateThroughArray(searchKey, items);
            _this.previousKey = searchKey;
        });
    };
    SelectDropdownComponent.prototype.navigateThroughArray = function (key, itemSource) {
        var _this = this;
        var items = itemSource.filter(function (el) {
            return el
                .toString()
                .toLowerCase()
                .startsWith(key.toString().toLowerCase());
        });
        if (this.searchIndex > items.length - 1 || key !== this.previousKey) {
            this.searchIndex = 0;
        }
        this.highlightedItem = this.optionList.filtered.find(function (el) { return el.wrappedOption.label === items[_this.searchIndex]; });
        this.searchIndex++;
        if (this.highlightedItem) {
            this.optionList.highlightOption(this.highlightedItem);
            this.cdRef.markForCheck();
        }
        this.moveHighlightedIntoView();
        this._pressedKeys = [];
    };
    /** Event handlers. **/
    SelectDropdownComponent.prototype.onkeyup = function () {
        this.hasOptionsItems = this.optionList.filtered.length > 0;
        this.updateSelectAllState();
    };
    SelectDropdownComponent.prototype.onkeydown = function () {
        this.setOptionHeight();
    };
    SelectDropdownComponent.prototype.ngOnInit = function () {
        this.updateSelectAllState();
        this.optionsReset();
        this.setDropdownHeight();
        this.setVisibleOptionsNumber();
        this.highlightOptionByTyping();
    };
    SelectDropdownComponent.prototype.setDropdownHeight = function () {
        var _this = this;
        this.optionList.options.filter(function (el) { return function () {
            if (el.icon) {
                _this._renderer.setStyle(_this.optionsList.nativeElement, 'height', _this.dropdownHeight + 8 + 'px');
            }
            else {
                _this._renderer.setStyle(_this.optionsList.nativeElement, 'height', _this.dropdownHeight + 'px');
            }
        }; });
    };
    SelectDropdownComponent.prototype.setVisibleOptionsNumber = function () {
        this._renderer.setStyle(this.optionsList.nativeElement, 'max-height', this.dropdownMaxHeight + 'px');
    };
    SelectDropdownComponent.prototype.setOptionHeight = function () {
        var _this = this;
        var optionsItems = Array.from(this.optionsList.nativeElement.firstElementChild.children);
        optionsItems.forEach(function (el) {
            var isCustomElement = el.classList.contains('custom-select-content');
            if (el.firstElementChild) {
                if (_this.optionHeight && el.firstElementChild.tagName !== 'IMG' && !isCustomElement) {
                    _this._renderer.setStyle(el.firstElementChild, 'height', _this.optionHeight + "px");
                }
                if (el.firstElementChild.tagName !== 'IMG' && !isCustomElement) {
                    _this._renderer.setStyle(el.firstElementChild, 'line-height', _this.optionHeight + "px");
                }
            }
        });
    };
    SelectDropdownComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('optionList')) {
            this.optionsReset();
        }
        if (changes.hasOwnProperty('dropdownHeight')) {
            this.setDropdownHeight();
        }
        var container = this._elementRef.nativeElement.classList;
        setTimeout(function () {
            container.add('fadeInSelect');
        }, 200);
    };
    SelectDropdownComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Sliding-down animation
        this.endHeight = this.dropdownContent.nativeElement.clientHeight;
        this.state = this.state === 'invisible' ? 'visible' : 'invisible';
        this.cdRef.detectChanges();
        if (this.multiple) {
            var disabledElements = this._elementRef.nativeElement.querySelectorAll('.disabled.optgroup');
            for (var i = 0; i < disabledElements.length; i++) {
                this._renderer.setStyle(disabledElements[i].firstElementChild.lastElementChild, 'display', 'none');
            }
        }
        this.setOptionHeight();
        this.moveHighlightedIntoView();
        if (this.filterEnabled) {
            setTimeout(function () {
                _this.filterInput.nativeElement.focus();
            }, 0);
        }
    };
    // Filter input (single select).
    SelectDropdownComponent.prototype.onSingleFilterClick = function () {
        this.singleFilterClick.emit(null);
    };
    SelectDropdownComponent.prototype.onSingleFilterInput = function (event) {
        this.singleFilterInput.emit(event.target.value);
    };
    SelectDropdownComponent.prototype.onSingleFilterKeydown = function (event) {
        this.singleFilterKeydown.emit(event);
    };
    // Options list.
    SelectDropdownComponent.prototype.onOptionsWheel = function (event) {
        this.handleOptionsWheel(event);
    };
    SelectDropdownComponent.prototype.onOptionClick = function (option) {
        this.optionClicked.emit(option);
        this.updateSelectAllState();
    };
    /** Initialization. **/
    SelectDropdownComponent.prototype.optionsReset = function () {
        this.optionList.filter('');
        this.optionList.highlight();
    };
    /** View. **/
    SelectDropdownComponent.prototype.getOptionStyle = function (option) {
        if (option.highlighted || option.hovered) {
            var optionStyle = {};
            optionStyle['height.px'] = this.optionHeight;
            if (typeof this.highlightColor !== 'undefined') {
                optionStyle['background-color'] = this.highlightColor;
            }
            if (typeof this.highlightTextColor !== 'undefined') {
                optionStyle['color'] = this.highlightTextColor;
            }
            return optionStyle;
        }
        else {
            return {};
        }
    };
    SelectDropdownComponent.prototype.onSelectAllClick = function () {
        this.selectAllSelected = !this.selectAllSelected;
        this.selectAll.emit(this.selectAllSelected);
    };
    SelectDropdownComponent.prototype.updateSelectAllState = function () {
        var areAllSelected = this.optionList.filtered
            .filter(function (option) { return !option.disabled; })
            .every(function (option) {
            return option.selected ? true : false;
        });
        areAllSelected ? (this.selectAllSelected = true) : (this.selectAllSelected = false);
        this.cdRef.detectChanges();
    };
    SelectDropdownComponent.prototype.clearFilterInput = function () {
        if (this.filterEnabled) {
            this.filterInput.nativeElement.value = '';
        }
    };
    SelectDropdownComponent.prototype.onAnimationDone = function () {
        this.animationDone.emit();
    };
    SelectDropdownComponent.prototype.onAnimationStart = function () {
        this.animationStart.emit();
    };
    SelectDropdownComponent.prototype.moveHighlightedIntoView = function () {
        var listHeight;
        var list = this.optionsList.nativeElement;
        listHeight =
            this.multiple && this.enableSelectAll
                ? list.offsetHeight - this.optionHeight
                : list.offsetHeight;
        var itemIndex = this.optionList.getHighlightedIndex();
        if (itemIndex > -1) {
            var item = list.children[0].children[itemIndex];
            var itemHeight = item.offsetHeight;
            var itemTop = itemIndex * itemHeight;
            var itemBottom = itemTop + itemHeight;
            var viewTop = list.scrollTop;
            var viewBottom = viewTop + listHeight;
            if (itemBottom > viewBottom) {
                list.scrollTop = itemBottom - listHeight;
            }
            else if (itemTop < viewTop) {
                list.scrollTop = itemTop;
            }
        }
    };
    SelectDropdownComponent.prototype.handleOptionsWheel = function (e) {
        var div = this.optionsList.nativeElement;
        var atTop = div.scrollTop === 0;
        var atBottom = div.offsetHeight + div.scrollTop === div.scrollHeight;
        if (atTop && e.deltaY < 0) {
            e.preventDefault();
        }
        else if (atBottom && e.deltaY > 0) {
            e.preventDefault();
        }
    };
    SelectDropdownComponent.prototype.ngOnDestroy = function () {
        this._destroy.next();
        this._destroy.complete();
    };
    SelectDropdownComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectDropdownComponent.prototype, "filterEnabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectDropdownComponent.prototype, "filterAutocomplete", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectDropdownComponent.prototype, "highlightColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectDropdownComponent.prototype, "highlightTextColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SelectDropdownComponent.prototype, "left", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectDropdownComponent.prototype, "multiple", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectDropdownComponent.prototype, "notFoundMsg", void 0);
    __decorate([
        Input(),
        __metadata("design:type", OptionList)
    ], SelectDropdownComponent.prototype, "optionList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SelectDropdownComponent.prototype, "top", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SelectDropdownComponent.prototype, "width", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectDropdownComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "customClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "visibleOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SelectDropdownComponent.prototype, "dropdownHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SelectDropdownComponent.prototype, "dropdownMaxHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SelectDropdownComponent.prototype, "optionHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectDropdownComponent.prototype, "enableSelectAll", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "selectAllLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "outline", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "close", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "optionClicked", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "singleFilterClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "singleFilterInput", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "singleFilterKeydown", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "animationDone", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "animationStart", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "selectAll", void 0);
    __decorate([
        ViewChild('filterInput'),
        __metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "filterInput", void 0);
    __decorate([
        ViewChild('optionsList', { static: true }),
        __metadata("design:type", Object)
    ], SelectDropdownComponent.prototype, "optionsList", void 0);
    __decorate([
        ViewChild('dropdownContent', { static: true }),
        __metadata("design:type", ElementRef)
    ], SelectDropdownComponent.prototype, "dropdownContent", void 0);
    __decorate([
        ViewChild('customContent', { static: true }),
        __metadata("design:type", ElementRef)
    ], SelectDropdownComponent.prototype, "customContent", void 0);
    __decorate([
        HostListener('window: keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SelectDropdownComponent.prototype, "onWindowKeydown", null);
    __decorate([
        HostListener('keyup'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SelectDropdownComponent.prototype, "onkeyup", null);
    __decorate([
        HostListener('input'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SelectDropdownComponent.prototype, "onkeydown", null);
    SelectDropdownComponent = __decorate([
        Component({
            selector: 'mdb-select-dropdown',
            template: "<div\n  (click)=\"$event.stopPropagation()\"\n  class=\"dropdown-content\"\n  #dropdownContent\n  [ngStyle]=\"{ 'top.px': top, 'left.px': left, 'width.px': width }\"\n  [@dropdownAnimation]=\"{\n    value: state,\n    params: { startHeight: startHeight, endHeight: endHeight }\n  }\"\n  (@dropdownAnimation.done)=\"onAnimationDone()\"\n  (@dropdownAnimation.start)=\"onAnimationStart()\"\n>\n  <div class=\"filter md-form px-2\" *ngIf=\"filterEnabled\">\n    <input\n      type=\"text\"\n      class=\"search form-control w-100 d-block\"\n      #filterInput\n      [attr.autocomplete]=\"filterAutocomplete ? 'on' : 'off'\"\n      [attr.role]=\"'searchbox'\"\n      [placeholder]=\"placeholder\"\n      (input)=\"onSingleFilterInput($event)\"\n      (keydown)=\"onSingleFilterKeydown($event)\"\n    />\n  </div>\n\n  <div class=\"options\" #optionsList>\n    <ul\n      class=\"select-dropdown\"\n      [ngClass]=\"{ 'multiple-select-dropdown': multiple }\"\n      (wheel)=\"onOptionsWheel($event)\"\n    >\n      <li\n        [ngStyle]=\"{ 'height.px': optionHeight }\"\n        *ngIf=\"multiple && enableSelectAll && this.hasOptionsItems\"\n        (click)=\"onSelectAllClick()\"\n      >\n        <span class=\"filtrable\" *ngIf=\"multiple\">\n          <input\n            type=\"checkbox\"\n            [checked]=\"selectAllSelected\"\n            class=\"form-check-input {{ customClass }}\"\n          />\n          <label></label>\n          {{ selectAllLabel }}\n        </span>\n      </li>\n      <li\n        *ngFor=\"let option of optionList.filtered\"\n        [ngClass]=\"{\n          'heavy-rain-gradient': option.highlighted && !highlightColor,\n          active: option.highlighted,\n          selected: option.selected,\n          disabled: option.disabled,\n          optgroup: option.group,\n          'd-flex justify-content-between flex-row-reverse align-items-center': option.icon\n        }\"\n        [ngStyle]=\"{\n          'height.px': optionHeight,\n          'line-height.px': optionHeight,\n          'background-color': getOptionStyle(option)['background-color'],\n          color: getOptionStyle(option)['color']\n        }\"\n        [attr.role]=\"'option'\"\n        [attr.aria-selected]=\"option.selected\"\n        [attr.aria-disabled]=\"option.disabled\"\n        (click)=\"onOptionClick(option)\"\n        (mouseover)=\"option.hovered = true\"\n        (mouseleave)=\"option.hovered = false\"\n      >\n        <img class=\"rounded-circle\" [src]=\"option.icon\" *ngIf=\"option.icon !== ''\" />\n        <span\n          class=\"deselect-option\"\n          *ngIf=\"!multiple\"\n          [ngStyle]=\"{\n            'background-color': getOptionStyle(option)['background-color'],\n            color: getOptionStyle(option)['color']\n          }\"\n          >{{ option.label }}</span\n        >\n        <span\n          class=\"deselect-option\"\n          [ngStyle]=\"{\n            'background-color': getOptionStyle(option)['background-color'],\n            color: getOptionStyle(option)['color']\n          }\"\n          *ngIf=\"multiple\"\n        >\n          <input\n            type=\"checkbox\"\n            [checked]=\"option.selected\"\n            class=\"form-check-input {{ customClass }}\"\n            [disabled]=\"option.disabled\"\n          />\n          <label></label>\n          {{ option.label }}\n        </span>\n      </li>\n      <li\n        *ngIf=\"!this.hasOptionsItems\"\n        class=\"message disabled\"\n        [ngStyle]=\"{ 'height.px': optionHeight }\"\n      >\n        <span>{{ notFoundMsg }}</span>\n      </li>\n      <li #customContent class=\"custom-select-content\">\n        <ng-content></ng-content>\n      </li>\n    </ul>\n  </div>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('dropdownAnimation', [
                    state('invisible', style({ opacity: 0, height: '0px' })),
                    state('visible', style({ opacity: 1, height: '*' })),
                    transition('invisible => visible', animate('300ms ease')),
                    transition('visible => invisible', animate('300ms ease')),
                ]),
            ]
        }),
        __metadata("design:paramtypes", [ElementRef,
            Renderer2,
            ChangeDetectorRef])
    ], SelectDropdownComponent);
    return SelectDropdownComponent;
}());
export { SelectDropdownComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vbWF0ZXJpYWwtc2VsZWN0L3NlbGVjdC1kcm9wZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxhQUFhLEVBQ2IsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNqQixVQUFVLEVBQ1YsWUFBWSxFQUNaLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLGFBQWEsRUFDYixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVqRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQWdCeEU7SUFtREUsaUNBQ1MsV0FBdUIsRUFDdkIsU0FBb0IsRUFDbkIsS0FBd0I7UUFGekIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNuQixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQTFDekIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFLbkIsbUJBQWMsR0FBRyxZQUFZ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LFVBQVUsRUFBRTtnQkFDVixPQUFPLENBQUMsbUJBQW1CLEVBQUU7b0JBQzNCLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDeEQsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUNwRCxVQUFVLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN6RCxVQUFVLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUMxRCxDQUFDO2FBQ0g7U0FDRixDQUFDO3lDQXFEc0IsVUFBVTtZQUNaLFNBQVM7WUFDWixpQkFBaUI7T0F0RHZCLHVCQUF1QixDQXdWbkM7SUFBRCw4QkFBQztDQUFBLEFBeFZELElBd1ZDO1NBeFZZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBSZW5kZXJlcjIsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRyaWdnZXIsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgYW5pbWF0ZSB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnLi9vcHRpb24nO1xuaW1wb3J0IHsgT3B0aW9uTGlzdCB9IGZyb20gJy4vb3B0aW9uLWxpc3QnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCB0YWtlVW50aWwsIHRhcCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQSwgTklORSwgWiwgWkVSTyB9IGZyb20gJy4uLy4uL2ZyZWUvdXRpbHMva2V5Ym9hcmQtbmF2aWdhdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1zZWxlY3QtZHJvcGRvd24nLFxuICB0ZW1wbGF0ZVVybDogJ3NlbGVjdC1kcm9wZG93bi5jb21wb25lbnQuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZHJvcGRvd25BbmltYXRpb24nLCBbXG4gICAgICBzdGF0ZSgnaW52aXNpYmxlJywgc3R5bGUoeyBvcGFjaXR5OiAwLCBoZWlnaHQ6ICcwcHgnIH0pKSxcbiAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoeyBvcGFjaXR5OiAxLCBoZWlnaHQ6ICcqJyB9KSksXG4gICAgICB0cmFuc2l0aW9uKCdpbnZpc2libGUgPT4gdmlzaWJsZScsIGFuaW1hdGUoJzMwMG1zIGVhc2UnKSksXG4gICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IGludmlzaWJsZScsIGFuaW1hdGUoJzMwMG1zIGVhc2UnKSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdERyb3Bkb3duQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGZpbHRlckVuYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZpbHRlckF1dG9jb21wbGV0ZTogYm9vbGVhbjtcbiAgQElucHV0KCkgaGlnaGxpZ2h0Q29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgaGlnaGxpZ2h0VGV4dENvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGxlZnQ6IG51bWJlcjtcbiAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG5vdEZvdW5kTXNnOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG9wdGlvbkxpc3Q6IE9wdGlvbkxpc3Q7XG4gIEBJbnB1dCgpIHRvcDogbnVtYmVyO1xuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBjdXN0b21DbGFzcyA9ICcnO1xuICBASW5wdXQoKSB2aXNpYmxlT3B0aW9ucyA9IDQ7XG4gIEBJbnB1dCgpIGRyb3Bkb3duSGVpZ2h0OiBudW1iZXI7XG4gIEBJbnB1dCgpIGRyb3Bkb3duTWF4SGVpZ2h0OiBudW1iZXI7XG4gIEBJbnB1dCgpIG9wdGlvbkhlaWdodDogbnVtYmVyO1xuICBASW5wdXQoKSBlbmFibGVTZWxlY3RBbGw6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNlbGVjdEFsbExhYmVsID0gJ1NlbGVjdCBhbGwnO1xuICBASW5wdXQoKSBvdXRsaW5lID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgb3B0aW9uQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8T3B0aW9uPigpO1xuICBAT3V0cHV0KCkgc2luZ2xlRmlsdGVyQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XG4gIEBPdXRwdXQoKSBzaW5nbGVGaWx0ZXJJbnB1dCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgc2luZ2xlRmlsdGVyS2V5ZG93biA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgYW5pbWF0aW9uRG9uZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgYW5pbWF0aW9uU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHNlbGVjdEFsbCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBAVmlld0NoaWxkKCdmaWx0ZXJJbnB1dCcpIGZpbHRlcklucHV0OiBhbnk7XG4gIEBWaWV3Q2hpbGQoJ29wdGlvbnNMaXN0JywgeyBzdGF0aWM6IHRydWUgfSkgb3B0aW9uc0xpc3Q6IGFueTtcbiAgQFZpZXdDaGlsZCgnZHJvcGRvd25Db250ZW50JywgeyBzdGF0aWM6IHRydWUgfSkgZHJvcGRvd25Db250ZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdjdXN0b21Db250ZW50JywgeyBzdGF0aWM6IHRydWUgfSkgY3VzdG9tQ29udGVudDogRWxlbWVudFJlZjtcblxuICBkaXNhYmxlZENvbG9yID0gJyNmZmYnO1xuICBkaXNhYmxlZFRleHRDb2xvciA9ICc5ZTllOWUnO1xuXG4gIC8vIFVzZWQgaW4gc2xpZGluZy1kb3duIGFuaW1hdGlvblxuICBzdGF0ZSA9ICdpbnZpc2libGUnO1xuICBzdGFydEhlaWdodDogYW55ID0gMDtcbiAgZW5kSGVpZ2h0OiBhbnkgPSA0NTtcblxuICBwdWJsaWMgaGFzT3B0aW9uc0l0ZW1zID0gdHJ1ZTtcblxuICBwcml2YXRlIF9kZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfcHJlc3NlZEtleXNTdHJlYW0gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gIHByaXZhdGUgX3ByZXNzZWRLZXlzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHNlbGVjdEFsbFNlbGVjdGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgaGlnaGxpZ2h0ZWRJdGVtOiBhbnk7XG4gIHNlYXJjaEluZGV4ID0gMDtcbiAgcHJldmlvdXNLZXkgPSAnJztcblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6IGtleWRvd24nLCBbJyRldmVudCddKVxuICBvbldpbmRvd0tleWRvd24oZXZlbnQ6IGFueSkge1xuICAgIGlmIChcbiAgICAgIChldmVudC5rZXlDb2RlID49IEEgJiYgZXZlbnQua2V5Q29kZSA8PSBaKSB8fFxuICAgICAgKGV2ZW50LmtleUNvZGUgPj0gWkVSTyAmJiBldmVudC5rZXlDb2RlIDw9IE5JTkUpXG4gICAgKSB7XG4gICAgICB0aGlzLl9wcmVzc2VkS2V5c1N0cmVhbS5uZXh0KFN0cmluZy5mcm9tQ2hhckNvZGUoZXZlbnQua2V5Q29kZSkpO1xuICAgIH1cbiAgfVxuXG4gIGhpZ2hsaWdodE9wdGlvbkJ5VHlwaW5nKCkge1xuICAgIHRoaXMuX3ByZXNzZWRLZXlzU3RyZWFtXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKChrZXk6IHN0cmluZykgPT4gdGhpcy5fcHJlc3NlZEtleXMucHVzaChrZXkpKSxcbiAgICAgICAgbWFwKCgpID0+IHRoaXMuX3ByZXNzZWRLZXlzLmpvaW4oJycpLnRvTG9jYWxlTG93ZXJDYXNlKCkpLFxuICAgICAgICBkZWJvdW5jZVRpbWUoMjAwKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChzZWFyY2hLZXk6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCBpdGVtcyA9IEFycmF5LmZyb20odGhpcy5vcHRpb25MaXN0Wydfb3B0aW9ucyddKVxuICAgICAgICAgIC5maWx0ZXIoKGVsZW06IGFueSkgPT4gIWVsZW0uZ3JvdXApXG4gICAgICAgICAgLmZpbHRlcigoZWxlbTogYW55KSA9PiAhZWxlbS5kaXNhYmxlZClcbiAgICAgICAgICAubWFwKChlbDogYW55KSA9PiBlbC53cmFwcGVkT3B0aW9uLmxhYmVsIHx8IGVsLndyYXBwZWRPcHRpb24udmFsdWUpO1xuXG4gICAgICAgIHRoaXMubmF2aWdhdGVUaHJvdWdoQXJyYXkoc2VhcmNoS2V5LCBpdGVtcyk7XG4gICAgICAgIHRoaXMucHJldmlvdXNLZXkgPSBzZWFyY2hLZXk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5hdmlnYXRlVGhyb3VnaEFycmF5KGtleTogc3RyaW5nLCBpdGVtU291cmNlOiBhbnkpIHtcbiAgICBjb25zdCBpdGVtcyA9IGl0ZW1Tb3VyY2UuZmlsdGVyKChlbDogYW55KSA9PlxuICAgICAgZWxcbiAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgLnN0YXJ0c1dpdGgoa2V5LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSlcbiAgICApO1xuICAgIGlmICh0aGlzLnNlYXJjaEluZGV4ID4gaXRlbXMubGVuZ3RoIC0gMSB8fCBrZXkgIT09IHRoaXMucHJldmlvdXNLZXkpIHtcbiAgICAgIHRoaXMuc2VhcmNoSW5kZXggPSAwO1xuICAgIH1cbiAgICB0aGlzLmhpZ2hsaWdodGVkSXRlbSA9IHRoaXMub3B0aW9uTGlzdC5maWx0ZXJlZC5maW5kKFxuICAgICAgKGVsOiBhbnkpID0+IGVsLndyYXBwZWRPcHRpb24ubGFiZWwgPT09IGl0ZW1zW3RoaXMuc2VhcmNoSW5kZXhdXG4gICAgKTtcblxuICAgIHRoaXMuc2VhcmNoSW5kZXgrKztcblxuICAgIGlmICh0aGlzLmhpZ2hsaWdodGVkSXRlbSkge1xuICAgICAgdGhpcy5vcHRpb25MaXN0LmhpZ2hsaWdodE9wdGlvbih0aGlzLmhpZ2hsaWdodGVkSXRlbSk7XG4gICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHRoaXMubW92ZUhpZ2hsaWdodGVkSW50b1ZpZXcoKTtcbiAgICB0aGlzLl9wcmVzc2VkS2V5cyA9IFtdO1xuICB9XG5cbiAgLyoqIEV2ZW50IGhhbmRsZXJzLiAqKi9cblxuICBASG9zdExpc3RlbmVyKCdrZXl1cCcpIG9ua2V5dXAoKSB7XG4gICAgdGhpcy5oYXNPcHRpb25zSXRlbXMgPSB0aGlzLm9wdGlvbkxpc3QuZmlsdGVyZWQubGVuZ3RoID4gMDtcbiAgICB0aGlzLnVwZGF0ZVNlbGVjdEFsbFN0YXRlKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcpIG9ua2V5ZG93bigpIHtcbiAgICB0aGlzLnNldE9wdGlvbkhlaWdodCgpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy51cGRhdGVTZWxlY3RBbGxTdGF0ZSgpO1xuICAgIHRoaXMub3B0aW9uc1Jlc2V0KCk7XG4gICAgdGhpcy5zZXREcm9wZG93bkhlaWdodCgpO1xuICAgIHRoaXMuc2V0VmlzaWJsZU9wdGlvbnNOdW1iZXIoKTtcbiAgICB0aGlzLmhpZ2hsaWdodE9wdGlvbkJ5VHlwaW5nKCk7XG4gIH1cblxuICBzZXREcm9wZG93bkhlaWdodCgpIHtcbiAgICB0aGlzLm9wdGlvbkxpc3Qub3B0aW9ucy5maWx0ZXIoZWwgPT4gKCkgPT4ge1xuICAgICAgaWYgKGVsLmljb24pIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgdGhpcy5vcHRpb25zTGlzdC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICdoZWlnaHQnLFxuICAgICAgICAgIHRoaXMuZHJvcGRvd25IZWlnaHQgKyA4ICsgJ3B4J1xuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgdGhpcy5vcHRpb25zTGlzdC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICdoZWlnaHQnLFxuICAgICAgICAgIHRoaXMuZHJvcGRvd25IZWlnaHQgKyAncHgnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRWaXNpYmxlT3B0aW9uc051bWJlcigpIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgIHRoaXMub3B0aW9uc0xpc3QubmF0aXZlRWxlbWVudCxcbiAgICAgICdtYXgtaGVpZ2h0JyxcbiAgICAgIHRoaXMuZHJvcGRvd25NYXhIZWlnaHQgKyAncHgnXG4gICAgKTtcbiAgfVxuXG4gIHNldE9wdGlvbkhlaWdodCgpIHtcbiAgICBjb25zdCBvcHRpb25zSXRlbXMgPSBBcnJheS5mcm9tKHRoaXMub3B0aW9uc0xpc3QubmF0aXZlRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZHJlbik7XG4gICAgb3B0aW9uc0l0ZW1zLmZvckVhY2goKGVsOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IGlzQ3VzdG9tRWxlbWVudCA9IGVsLmNsYXNzTGlzdC5jb250YWlucygnY3VzdG9tLXNlbGVjdC1jb250ZW50Jyk7XG4gICAgICBpZiAoZWwuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uSGVpZ2h0ICYmIGVsLmZpcnN0RWxlbWVudENoaWxkLnRhZ05hbWUgIT09ICdJTUcnICYmICFpc0N1c3RvbUVsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbC5maXJzdEVsZW1lbnRDaGlsZCwgJ2hlaWdodCcsIGAke3RoaXMub3B0aW9uSGVpZ2h0fXB4YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsLmZpcnN0RWxlbWVudENoaWxkLnRhZ05hbWUgIT09ICdJTUcnICYmICFpc0N1c3RvbUVsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbC5maXJzdEVsZW1lbnRDaGlsZCwgJ2xpbmUtaGVpZ2h0JywgYCR7dGhpcy5vcHRpb25IZWlnaHR9cHhgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdvcHRpb25MaXN0JykpIHtcbiAgICAgIHRoaXMub3B0aW9uc1Jlc2V0KCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ2Ryb3Bkb3duSGVpZ2h0JykpIHtcbiAgICAgIHRoaXMuc2V0RHJvcGRvd25IZWlnaHQoKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0O1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29udGFpbmVyLmFkZCgnZmFkZUluU2VsZWN0Jyk7XG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBTbGlkaW5nLWRvd24gYW5pbWF0aW9uXG4gICAgdGhpcy5lbmRIZWlnaHQgPSB0aGlzLmRyb3Bkb3duQ29udGVudC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5zdGF0ZSA9PT0gJ2ludmlzaWJsZScgPyAndmlzaWJsZScgOiAnaW52aXNpYmxlJztcbiAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcblxuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICBjb25zdCBkaXNhYmxlZEVsZW1lbnRzID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICcuZGlzYWJsZWQub3B0Z3JvdXAnXG4gICAgICApO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpc2FibGVkRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgZGlzYWJsZWRFbGVtZW50c1tpXS5maXJzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkLFxuICAgICAgICAgICdkaXNwbGF5JyxcbiAgICAgICAgICAnbm9uZSdcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldE9wdGlvbkhlaWdodCgpO1xuXG4gICAgdGhpcy5tb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldygpO1xuICAgIGlmICh0aGlzLmZpbHRlckVuYWJsZWQpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZpbHRlciBpbnB1dCAoc2luZ2xlIHNlbGVjdCkuXG5cbiAgb25TaW5nbGVGaWx0ZXJDbGljaygpIHtcbiAgICB0aGlzLnNpbmdsZUZpbHRlckNsaWNrLmVtaXQobnVsbCk7XG4gIH1cblxuICBvblNpbmdsZUZpbHRlcklucHV0KGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnNpbmdsZUZpbHRlcklucHV0LmVtaXQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgfVxuXG4gIG9uU2luZ2xlRmlsdGVyS2V5ZG93bihldmVudDogYW55KSB7XG4gICAgdGhpcy5zaW5nbGVGaWx0ZXJLZXlkb3duLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLy8gT3B0aW9ucyBsaXN0LlxuXG4gIG9uT3B0aW9uc1doZWVsKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmhhbmRsZU9wdGlvbnNXaGVlbChldmVudCk7XG4gIH1cblxuICBvbk9wdGlvbkNsaWNrKG9wdGlvbjogT3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25DbGlja2VkLmVtaXQob3B0aW9uKTtcbiAgICB0aGlzLnVwZGF0ZVNlbGVjdEFsbFN0YXRlKCk7XG4gIH1cblxuICAvKiogSW5pdGlhbGl6YXRpb24uICoqL1xuXG4gIHByaXZhdGUgb3B0aW9uc1Jlc2V0KCkge1xuICAgIHRoaXMub3B0aW9uTGlzdC5maWx0ZXIoJycpO1xuICAgIHRoaXMub3B0aW9uTGlzdC5oaWdobGlnaHQoKTtcbiAgfVxuXG4gIC8qKiBWaWV3LiAqKi9cblxuICBnZXRPcHRpb25TdHlsZShvcHRpb246IE9wdGlvbik6IGFueSB7XG4gICAgaWYgKG9wdGlvbi5oaWdobGlnaHRlZCB8fCBvcHRpb24uaG92ZXJlZCkge1xuICAgICAgY29uc3Qgb3B0aW9uU3R5bGU6IGFueSA9IHt9O1xuICAgICAgb3B0aW9uU3R5bGVbJ2hlaWdodC5weCddID0gdGhpcy5vcHRpb25IZWlnaHQ7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuaGlnaGxpZ2h0Q29sb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG9wdGlvblN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ10gPSB0aGlzLmhpZ2hsaWdodENvbG9yO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmhpZ2hsaWdodFRleHRDb2xvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgb3B0aW9uU3R5bGVbJ2NvbG9yJ10gPSB0aGlzLmhpZ2hsaWdodFRleHRDb2xvcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvcHRpb25TdHlsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgfVxuXG4gIG9uU2VsZWN0QWxsQ2xpY2soKSB7XG4gICAgdGhpcy5zZWxlY3RBbGxTZWxlY3RlZCA9ICF0aGlzLnNlbGVjdEFsbFNlbGVjdGVkO1xuICAgIHRoaXMuc2VsZWN0QWxsLmVtaXQodGhpcy5zZWxlY3RBbGxTZWxlY3RlZCk7XG4gIH1cblxuICB1cGRhdGVTZWxlY3RBbGxTdGF0ZSgpIHtcbiAgICBjb25zdCBhcmVBbGxTZWxlY3RlZCA9IHRoaXMub3B0aW9uTGlzdC5maWx0ZXJlZFxuICAgICAgLmZpbHRlcigob3B0aW9uOiBPcHRpb24pID0+ICFvcHRpb24uZGlzYWJsZWQpXG4gICAgICAuZXZlcnkoKG9wdGlvbjogT3B0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcHRpb24uc2VsZWN0ZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgICB9KTtcblxuICAgIGFyZUFsbFNlbGVjdGVkID8gKHRoaXMuc2VsZWN0QWxsU2VsZWN0ZWQgPSB0cnVlKSA6ICh0aGlzLnNlbGVjdEFsbFNlbGVjdGVkID0gZmFsc2UpO1xuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgY2xlYXJGaWx0ZXJJbnB1dCgpIHtcbiAgICBpZiAodGhpcy5maWx0ZXJFbmFibGVkKSB7XG4gICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB9XG4gIH1cblxuICBvbkFuaW1hdGlvbkRvbmUoKSB7XG4gICAgdGhpcy5hbmltYXRpb25Eb25lLmVtaXQoKTtcbiAgfVxuXG4gIG9uQW5pbWF0aW9uU3RhcnQoKSB7XG4gICAgdGhpcy5hbmltYXRpb25TdGFydC5lbWl0KCk7XG4gIH1cblxuICBtb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldygpIHtcbiAgICBsZXQgbGlzdEhlaWdodDogbnVtYmVyO1xuICAgIGNvbnN0IGxpc3QgPSB0aGlzLm9wdGlvbnNMaXN0Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGlzdEhlaWdodCA9XG4gICAgICB0aGlzLm11bHRpcGxlICYmIHRoaXMuZW5hYmxlU2VsZWN0QWxsXG4gICAgICAgID8gbGlzdC5vZmZzZXRIZWlnaHQgLSB0aGlzLm9wdGlvbkhlaWdodFxuICAgICAgICA6IGxpc3Qub2Zmc2V0SGVpZ2h0O1xuXG4gICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5vcHRpb25MaXN0LmdldEhpZ2hsaWdodGVkSW5kZXgoKTtcblxuICAgIGlmIChpdGVtSW5kZXggPiAtMSkge1xuICAgICAgY29uc3QgaXRlbSA9IGxpc3QuY2hpbGRyZW5bMF0uY2hpbGRyZW5baXRlbUluZGV4XTtcbiAgICAgIGNvbnN0IGl0ZW1IZWlnaHQgPSBpdGVtLm9mZnNldEhlaWdodDtcblxuICAgICAgY29uc3QgaXRlbVRvcCA9IGl0ZW1JbmRleCAqIGl0ZW1IZWlnaHQ7XG4gICAgICBjb25zdCBpdGVtQm90dG9tID0gaXRlbVRvcCArIGl0ZW1IZWlnaHQ7XG5cbiAgICAgIGNvbnN0IHZpZXdUb3AgPSBsaXN0LnNjcm9sbFRvcDtcbiAgICAgIGNvbnN0IHZpZXdCb3R0b20gPSB2aWV3VG9wICsgbGlzdEhlaWdodDtcblxuICAgICAgaWYgKGl0ZW1Cb3R0b20gPiB2aWV3Qm90dG9tKSB7XG4gICAgICAgIGxpc3Quc2Nyb2xsVG9wID0gaXRlbUJvdHRvbSAtIGxpc3RIZWlnaHQ7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW1Ub3AgPCB2aWV3VG9wKSB7XG4gICAgICAgIGxpc3Quc2Nyb2xsVG9wID0gaXRlbVRvcDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZU9wdGlvbnNXaGVlbChlOiBhbnkpIHtcbiAgICBjb25zdCBkaXYgPSB0aGlzLm9wdGlvbnNMaXN0Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgYXRUb3AgPSBkaXYuc2Nyb2xsVG9wID09PSAwO1xuICAgIGNvbnN0IGF0Qm90dG9tID0gZGl2Lm9mZnNldEhlaWdodCArIGRpdi5zY3JvbGxUb3AgPT09IGRpdi5zY3JvbGxIZWlnaHQ7XG5cbiAgICBpZiAoYXRUb3AgJiYgZS5kZWx0YVkgPCAwKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSBlbHNlIGlmIChhdEJvdHRvbSAmJiBlLmRlbHRhWSA+IDApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kZXN0cm95Lm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==