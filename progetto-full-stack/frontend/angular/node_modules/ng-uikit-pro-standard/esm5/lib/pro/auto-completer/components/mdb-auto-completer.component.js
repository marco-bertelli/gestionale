import { __decorate, __metadata, __param, __read, __spread } from "tslib";
import { AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, Renderer2, ViewChild, ViewEncapsulation, QueryList, OnDestroy, } from '@angular/core';
import { MdbOptionComponent, MDB_OPTION_PARENT } from './mdb-option.component';
import { Subject, merge } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { document, window } from '../../../free/utils/facade/browser';
import { Utils } from './../../../free/utils/utils.class';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { DOWN_ARROW, ENTER, ESCAPE, UP_ARROW } from '../../../free/utils/keyboard-navigation';
var MdbAutoCompleterComponent = /** @class */ (function () {
    function MdbAutoCompleterComponent(renderer, el, platformId) {
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
    MdbAutoCompleterComponent_1 = MdbAutoCompleterComponent;
    Object.defineProperty(MdbAutoCompleterComponent.prototype, "visibleOptions", {
        get: function () {
            return this._visibleOptions;
        },
        set: function (value) {
            if (value !== 0) {
                this._visibleOptions = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdbAutoCompleterComponent.prototype, "optionHeight", {
        get: function () {
            return this._optionHeight;
        },
        set: function (value) {
            if (value !== 0) {
                this._optionHeight = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdbAutoCompleterComponent.prototype, "dropdownHeight", {
        get: function () {
            return this._dropdownHeight;
        },
        set: function (value) {
            if (value !== 0) {
                this._dropdownHeight = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    MdbAutoCompleterComponent.prototype._listenToOptionClick = function () {
        var _this = this;
        this.mdbOptions.changes
            .pipe(startWith(this.mdbOptions), switchMap(function (options) {
            return merge.apply(void 0, __spread(options.map(function (option) { return option.click$; })));
        }), takeUntil(this._destroy))
            .subscribe(function (clickedOption) { return _this._handleOptionClick(clickedOption); });
    };
    MdbAutoCompleterComponent.prototype._handleOptionClick = function (option) {
        this.setSelectedItem({ text: option.value, element: option });
        this.highlightRow(0);
        this.select.emit({ text: option.value, element: option });
        this.selected.emit({ text: option.value, element: option });
    };
    MdbAutoCompleterComponent.prototype.setSelectedItem = function (item) {
        this._selectedItem = item;
        this._selectedItemChanged.next(this.getSelectedItem());
    };
    MdbAutoCompleterComponent.prototype.getSelectedItem = function () {
        return this._selectedItem;
    };
    MdbAutoCompleterComponent.prototype.selectedItemChanged = function () {
        return this._selectedItemChanged;
    };
    MdbAutoCompleterComponent.prototype.isOpen = function () {
        return this._isOpen;
    };
    MdbAutoCompleterComponent.prototype._calculatePosition = function () {
        var modalEl = this.utils.getClosestEl(this.el.nativeElement, '.modal-dialog');
        var style = document.querySelector('.completer-dropdown')
            ? window.getComputedStyle(document.querySelector('.completer-dropdown'))
            : null;
        if (!style) {
            return;
        }
        var height = ['height', 'padding-top', 'padding-bottom', 'margin-top', 'margin-bottom']
            .map(function (key) { return parseInt(style.getPropertyValue(key), 10); })
            .reduce(function (prev, cur) { return prev + cur; });
        var topRect = document.querySelector('.completer-dropdown').getBoundingClientRect().top;
        var bottom = modalEl ? window.innerHeight - height - topRect : this.parameters.bottom;
        var canOpenBelow = this.dropdown.nativeElement.clientHeight <= bottom;
        var belowPosition = this.parameters.inputHeight + 3;
        var abovePosition = "-" + this.dropdown.nativeElement.clientHeight;
        var top;
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
    };
    MdbAutoCompleterComponent.prototype._calculateAppendPosition = function () {
        var _this = this;
        if (this._isBrowser) {
            setTimeout(function () {
                var originRect = _this.origin.nativeElement.getBoundingClientRect();
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var offsetTop = originRect.top + scrollTop;
                var height = originRect.height;
                var dropdownHeight = _this.dropdown.nativeElement.offsetHeight;
                var inputMargin = 8;
                var top = 0;
                var left = 0;
                left = originRect.left;
                var canOpenBelow = offsetTop + dropdownHeight + height + inputMargin <=
                    scrollTop + document.documentElement.clientHeight;
                var belowPosition = offsetTop + height + inputMargin;
                var abovePosition = (top = offsetTop - dropdownHeight - inputMargin);
                if (_this.dropdownPosition === 'auto') {
                    top = canOpenBelow ? belowPosition : abovePosition;
                }
                else if (_this.dropdownPosition === 'below') {
                    top = belowPosition;
                }
                else if (_this.dropdownPosition === 'above') {
                    top = abovePosition;
                }
                _this.renderer.setStyle(_this.dropdown.nativeElement, 'top', top + 'px');
                _this.renderer.setStyle(_this.dropdown.nativeElement, 'left', left + 'px');
                _this.renderer.setStyle(_this.dropdown.nativeElement, 'width', _this.parameters.width + 'px');
            }, 0);
        }
    };
    MdbAutoCompleterComponent.prototype.show = function () {
        var _this = this;
        if (!this.disabled) {
            this._isOpen = true;
            this._isDropdownOpen.next(this.isOpen());
        }
        setTimeout(function () {
            if (_this.dropdown && !_this.appendToBody) {
                _this._calculatePosition();
            }
            if (_this.dropdown && _this.appendToBody) {
                _this._calculateAppendPosition();
            }
        }, 0);
    };
    MdbAutoCompleterComponent.prototype.hide = function () {
        if (!this.disabled) {
            this._isOpen = false;
            this._isDropdownOpen.next(this.isOpen());
        }
    };
    MdbAutoCompleterComponent.prototype.isDropdownOpen = function () {
        return this._isDropdownOpen;
    };
    MdbAutoCompleterComponent.prototype.removeHighlight = function (index) {
        var _this = this;
        setTimeout(function () {
            _this.optionList.forEach(function (el, i) {
                var completerRow = el.nativeElement.querySelectorAll('.completer-row');
                if (i === index) {
                    _this.renderer.addClass(el.nativeElement.firstElementChild, 'highlight-row');
                }
                else if (i !== index) {
                    completerRow.forEach(function (elem) {
                        _this.renderer.removeClass(elem, 'highlight-row');
                    });
                }
            });
        }, 0);
    };
    MdbAutoCompleterComponent.prototype.highlightRow = function (index) {
        var _this = this;
        this._allItems = this.optionList
            .filter(function (el) { return el.nativeElement.firstElementChild.classList.contains('completer-row'); })
            .map(function (elem) { return elem.nativeElement; });
        if (this._allItems[index]) {
            this.optionList.forEach(function (el, i) {
                var completerRow = el.nativeElement.querySelectorAll('.completer-row');
                if (index === i) {
                    _this.removeHighlight(index);
                    _this.renderer.addClass(completerRow[completerRow.length - 1], 'highlight-row');
                }
            });
        }
        this._selectedItemIndex = index;
    };
    MdbAutoCompleterComponent.prototype.navigateUsingKeyboard = function (event) {
        var _this = this;
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
                    var selectedElement = this.mdbOptions.find(function (el, index) { return el && index === _this._selectedItemIndex; });
                    if (selectedElement) {
                        this.select.emit({ text: selectedElement.value, element: selectedElement });
                    }
                    break;
                case UP_ARROW:
                    event.preventDefault();
                    this.moveHighlightedIntoView(event.key);
                    if (this._selectedItemIndex === -1 || this._selectedItemIndex === 0) {
                        var lastItemIndex = this.mdbOptions.length;
                        this.highlightRow(lastItemIndex);
                    }
                    this.highlightRow(--this._selectedItemIndex);
                    var selectedItem = this.mdbOptions.find(function (el, index) { return el && index === _this._selectedItemIndex; });
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
                    var selectedOption = this.mdbOptions.map(function (el) { return el; })[this._selectedItemIndex];
                    if (selectedOption) {
                        this.setSelectedItem({ text: selectedOption.value, element: selectedOption });
                        this.select.emit({ text: selectedOption.value, element: selectedOption });
                        this.selected.emit({ text: selectedOption.value, element: selectedOption });
                    }
                    this.hide();
                    break;
            }
        }
    };
    MdbAutoCompleterComponent.prototype.moveHighlightedIntoView = function (type) {
        var listHeight = 0;
        var itemIndex = this._selectedItemIndex;
        this.optionList.forEach(function (el) {
            listHeight += el.nativeElement.offsetHeight;
        });
        if (itemIndex > -1) {
            var itemHeight_1 = 0;
            this.optionList.forEach(function (el, i) {
                if (i === itemIndex + 1) {
                    itemHeight_1 = el.nativeElement.firstElementChild.clientHeight;
                }
            });
            var itemTop = (itemIndex + 1) * itemHeight_1;
            var viewTop = this.dropdown.nativeElement.scrollTop;
            var viewBottom = viewTop + listHeight;
            if (type === 'ArrowDown') {
                this.renderer.setProperty(this.dropdown.nativeElement, 'scrollTop', itemTop - itemHeight_1);
            }
            else if (type === 'ArrowUp') {
                if (itemIndex === 0) {
                    itemIndex = this.optionList.length - 1;
                }
                else {
                    itemIndex--;
                }
                if (itemIndex === this._allItems.length - 2) {
                    this.renderer.setProperty(this.dropdown.nativeElement, 'scrollTop', viewBottom - itemHeight_1);
                }
                else {
                    this.renderer.setProperty(this.dropdown.nativeElement, 'scrollTop', itemIndex * itemHeight_1);
                }
            }
        }
    };
    MdbAutoCompleterComponent.prototype.updatePosition = function (parameters) {
        var _this = this;
        setTimeout(function () {
            if (_this.dropdown) {
                var top_1 = _this.dropdown.nativeElement.clientHeight > parameters.bottom
                    ? parameters.top - _this.dropdown.nativeElement.clientHeight
                    : parameters.top;
                _this.renderer.setStyle(_this.dropdown.nativeElement, 'top', top_1 + 'px');
                _this.renderer.setStyle(_this.dropdown.nativeElement, 'left', parameters.left + 'px');
                _this.renderer.setStyle(_this.dropdown.nativeElement, 'width', parameters.width + 'px');
            }
        }, 0);
    };
    MdbAutoCompleterComponent.prototype.appendDropdown = function () {
        if (this._isBrowser && this.appendToBody) {
            var body = document.querySelector('body');
            var dropdown = this.el.nativeElement;
            if (body) {
                this.renderer.appendChild(body, dropdown);
                this._calculateAppendPosition();
            }
        }
    };
    MdbAutoCompleterComponent.prototype.setSingleOptionHeight = function () {
        var _this = this;
        this.mdbOptions.forEach(function (option) {
            option._optionHeight = _this._optionHeight;
        });
    };
    MdbAutoCompleterComponent.prototype.ngAfterContentInit = function () {
        this._listenToOptionClick();
        this.highlightRow(0);
    };
    MdbAutoCompleterComponent.prototype.ngOnDestroy = function () {
        this._destroy.next();
        this._destroy.complete();
    };
    var MdbAutoCompleterComponent_1;
    MdbAutoCompleterComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbAutoCompleterComponent.prototype, "textNoResults", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbAutoCompleterComponent.prototype, "clearButton", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbAutoCompleterComponent.prototype, "clearButtonTabIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MdbAutoCompleterComponent.prototype, "appendToBody", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbAutoCompleterComponent.prototype, "dropdownPosition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MdbAutoCompleterComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], MdbAutoCompleterComponent.prototype, "visibleOptions", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], MdbAutoCompleterComponent.prototype, "optionHeight", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], MdbAutoCompleterComponent.prototype, "dropdownHeight", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbAutoCompleterComponent.prototype, "displayValue", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MdbAutoCompleterComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MdbAutoCompleterComponent.prototype, "selected", void 0);
    __decorate([
        ContentChildren(MdbOptionComponent, { descendants: true, read: ElementRef }),
        __metadata("design:type", Array)
    ], MdbAutoCompleterComponent.prototype, "optionList", void 0);
    __decorate([
        ContentChildren(MdbOptionComponent, { descendants: true }),
        __metadata("design:type", QueryList)
    ], MdbAutoCompleterComponent.prototype, "mdbOptions", void 0);
    __decorate([
        ViewChild('dropdown'),
        __metadata("design:type", ElementRef)
    ], MdbAutoCompleterComponent.prototype, "dropdown", void 0);
    __decorate([
        ViewChild('noResults'),
        __metadata("design:type", ElementRef)
    ], MdbAutoCompleterComponent.prototype, "noResultsEl", void 0);
    MdbAutoCompleterComponent = MdbAutoCompleterComponent_1 = __decorate([
        Component({
            selector: 'mdb-auto-completer',
            template: "<div class=\"completer-dropdown-holder\" *ngIf=\"isOpen()\">\n  <div\n    class=\"completer-dropdown\"\n    #dropdown\n    [ngStyle]=\"{\n      'pointer-events': optionList.length === 0 ? 'none' : 'auto',\n      'max-height.px': _visibleOptions ? _visibleOptions * _optionHeight : _dropdownHeight\n    }\"\n  >\n    <div class=\"completer-row-wrapper\">\n      <div *ngIf=\"textNoResults && optionList.length === 0\" class=\"completer-no-results\" #noResults>\n        {{ textNoResults }}\n      </div>\n      <ng-content #content></ng-content>\n    </div>\n  </div>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            exportAs: 'mdbAutoCompleter',
            providers: [{ provide: MDB_OPTION_PARENT, useExisting: MdbAutoCompleterComponent_1 }],
            styles: [".mdb-autocomplete{margin-bottom:1px}.mdb-autocomplete::-webkit-search-cancel-button,.mdb-autocomplete::-webkit-search-decoration,.mdb-autocomplete::-webkit-search-results-button,.mdb-autocomplete::-webkit-search-results-decoration{-webkit-appearance:none}button:focus{outline:0!important}button.mdb-autocomplete-clear{position:absolute;z-index:2;top:.5rem;right:0;visibility:hidden;border:none;background:0 0;cursor:pointer}button.mdb-autocomplete-clear svg{fill:#a6a6a6}.mdb-autocomplete-wrap{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);position:absolute;z-index:100;left:0;right:0;list-style-type:none;overflow-y:auto;max-height:210px;padding-left:0;background:#fff}.mdb-autocomplete-wrap li{padding:12px 15px;cursor:pointer;font-size:.875rem}.mdb-autocomplete-wrap li:hover{background:#eee}.mdb-autocomplete-wrap li.selected{background-color:#eee}.form-inline .md-form .form-control.mdb-autocomplete{width:15rem}ng2-completer .completer-dropdown-holder{margin-top:-1rem}ng2-completer .md-form label{z-index:-1}.mdb-autocomplete-clear:hover,.mdb-autocomplete:hover,mdb-auto-completer:hover{cursor:pointer}.completer-dropdown{margin-top:1px;position:absolute;left:0;right:0;width:100%;background:#fff;box-shadow:0 2px 5px rgba(0,0,0,.25);z-index:110;overflow-y:auto;overflow-x:hidden}.completer-dropdown .completer-row{width:100%;display:flex;align-items:center;justify-content:space-between;padding:12px 15px;outline:0;font-size:.875rem}.completer-dropdown .completer-row .completer-description{font-size:14px}.completer-dropdown .completer-row .completer-image-holder .completer-image-default{width:16px;height:16px}.completer-dropdown .completer-no-results,.completer-dropdown .completer-searching{padding:12px 15px;font-size:.875rem}.completer-selected-row{background-color:#eee}.completer-image{width:32px;height:32px;border-radius:50%}.validate-success.ng-valid .completer-input{border-bottom:1px solid #00c851!important;box-shadow:0 1px 0 0 #00c851!important}.validate-success.ng-valid .completer-holder label{color:#00c851!important}.form-submitted .validate-error.ng-invalid .completer-input,.validate-error.ng-invalid.ng-touched .completer-input{border-bottom:1px solid #f44336!important;box-shadow:0 1px 0 0 #f44336!important}.form-submitted .validate-error.ng-invalid .completer-holder label,.validate-error.ng-invalid.ng-touched .completer-holder label{color:#f44336!important}.completer-row:hover,.highlight-row{background-color:#eee}"]
        }),
        __param(2, Inject(PLATFORM_ID)),
        __metadata("design:paramtypes", [Renderer2,
            ElementRef, String])
    ], MdbAutoCompleterComponent);
    return MdbAutoCompleterComponent;
}());
export { MdbAutoCompleterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLWF1dG8tY29tcGxldGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vYXV0by1jb21wbGV0ZXIvY29tcG9uZW50cy9tZGItYXV0by1jb21wbGV0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUvRSxPQUFPLEVBQWMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFZOUY7SUF3RkUsbUNBQ1UsUUFBbUIsRUFDbkIsRUFBYyxFQUNELFVBQWtCO1FBRi9CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQXhGZixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQix3QkFBbUIs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QzVCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSwyQkFBeUIsRUFBRSxDQUFDOztTQUNwRixDQUFDO1FBNEZHLFdBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO3lDQUZGLFNBQVM7WUFDZixVQUFVO09BMUZiLHlCQUF5QixDQWlhckM7SUFBRCxnQ0FBQztDQUFBLEFBamFELElBaWFDO1NBamFZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgUXVlcnlMaXN0LFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWRiT3B0aW9uQ29tcG9uZW50LCBNREJfT1BUSU9OX1BBUkVOVCB9IGZyb20gJy4vbWRiLW9wdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgSVNlbGVjdGVkT3B0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zZWxlY3RlZC1vcHRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBkb2N1bWVudCwgd2luZG93IH0gZnJvbSAnLi4vLi4vLi4vZnJlZS91dGlscy9mYWNhZGUvYnJvd3Nlcic7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4vLi4vLi4vLi4vZnJlZS91dGlscy91dGlscy5jbGFzcyc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRE9XTl9BUlJPVywgRU5URVIsIEVTQ0FQRSwgVVBfQVJST1cgfSBmcm9tICcuLi8uLi8uLi9mcmVlL3V0aWxzL2tleWJvYXJkLW5hdmlnYXRpb24nO1xuXG5leHBvcnQgdHlwZSBBdXRvY29tcGxldGVEcm9wZG93blBvc2l0aW9uID0gJ2JlbG93JyB8ICdhYm92ZScgfCAnYXV0byc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1hdXRvLWNvbXBsZXRlcicsXG4gIHRlbXBsYXRlVXJsOiAnbWRiLWF1dG8tY29tcGxldGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vLi4vYXV0by1jb21wbGV0ZXItbW9kdWxlLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgZXhwb3J0QXM6ICdtZGJBdXRvQ29tcGxldGVyJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBNREJfT1BUSU9OX1BBUkVOVCwgdXNlRXhpc3Rpbmc6IE1kYkF1dG9Db21wbGV0ZXJDb21wb25lbnQgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1kYkF1dG9Db21wbGV0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSB0ZXh0Tm9SZXN1bHRzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNsZWFyQnV0dG9uID0gdHJ1ZTtcbiAgQElucHV0KCkgY2xlYXJCdXR0b25UYWJJbmRleCA9IDA7XG4gIEBJbnB1dCgpIGFwcGVuZFRvQm9keTogYm9vbGVhbjtcbiAgQElucHV0KCkgZHJvcGRvd25Qb3NpdGlvbjogQXV0b2NvbXBsZXRlRHJvcGRvd25Qb3NpdGlvbiA9ICdhdXRvJztcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZ2V0IHZpc2libGVPcHRpb25zKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3Zpc2libGVPcHRpb25zO1xuICB9XG5cbiAgc2V0IHZpc2libGVPcHRpb25zKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgIT09IDApIHtcbiAgICAgIHRoaXMuX3Zpc2libGVPcHRpb25zID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgX3Zpc2libGVPcHRpb25zOiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgZ2V0IG9wdGlvbkhlaWdodCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25IZWlnaHQ7XG4gIH1cblxuICBzZXQgb3B0aW9uSGVpZ2h0KHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IDApIHtcbiAgICAgIHRoaXMuX29wdGlvbkhlaWdodCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIF9vcHRpb25IZWlnaHQgPSA0NTtcblxuICBASW5wdXQoKVxuICBnZXQgZHJvcGRvd25IZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZHJvcGRvd25IZWlnaHQ7XG4gIH1cblxuICBzZXQgZHJvcGRvd25IZWlnaHQodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh2YWx1ZSAhPT0gMCkge1xuICAgICAgdGhpcy5fZHJvcGRvd25IZWlnaHQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBlcXVhbCB0byA0ICogb3B0aW9uSGVpZ2h0ICh3aGljaCBpcyA0NSBieSBkZWZhdWx0KVxuICBfZHJvcGRvd25IZWlnaHQgPSAxODA7XG5cbiAgQElucHV0KCkgZGlzcGxheVZhbHVlOiAoKHZhbHVlOiBhbnkpID0+IHN0cmluZykgfCBudWxsO1xuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8eyB0ZXh0OiBzdHJpbmc7IGVsZW1lbnQ6IGFueSB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIHRleHQ6IHN0cmluZztcbiAgICBlbGVtZW50OiBhbnk7XG4gIH0+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPHsgdGV4dDogc3RyaW5nOyBlbGVtZW50OiBhbnkgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICB0ZXh0OiBzdHJpbmc7XG4gICAgZWxlbWVudDogYW55O1xuICB9PigpO1xuICBAQ29udGVudENoaWxkcmVuKE1kYk9wdGlvbkNvbXBvbmVudCwgeyBkZXNjZW5kYW50czogdHJ1ZSwgcmVhZDogRWxlbWVudFJlZiB9KVxuICBvcHRpb25MaXN0OiBBcnJheTxhbnk+O1xuICBAQ29udGVudENoaWxkcmVuKE1kYk9wdGlvbkNvbXBvbmVudCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBtZGJPcHRpb25zOiBRdWVyeUxpc3Q8TWRiT3B0aW9uQ29tcG9uZW50PjtcblxuICBAVmlld0NoaWxkKCdkcm9wZG93bicpIGRyb3Bkb3duOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdub1Jlc3VsdHMnKSBub1Jlc3VsdHNFbDogRWxlbWVudFJlZjtcblxuICBwcml2YXRlIF9kZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBwcml2YXRlIHV0aWxzOiBVdGlscyA9IG5ldyBVdGlscygpO1xuXG4gIG9yaWdpbjogRWxlbWVudFJlZjtcblxuICBwdWJsaWMgcGFyYW1ldGVyczoge1xuICAgIGxlZnQ6IG51bWJlcjtcbiAgICB0b3A6IG51bWJlcjtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGJvdHRvbTogbnVtYmVyO1xuICAgIGlucHV0SGVpZ2h0OiBudW1iZXI7XG4gIH07XG5cbiAgcHJpdmF0ZSBfaXNEcm9wZG93bk9wZW46IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBwcml2YXRlIF9hbGxJdGVtczogQXJyYXk8YW55PiA9IFtdO1xuICBwcml2YXRlIF9pc09wZW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRJdGVtSW5kZXggPSAtMTtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRJdGVtOiBJU2VsZWN0ZWRPcHRpb247XG4gIHByaXZhdGUgX3NlbGVjdGVkSXRlbUNoYW5nZWQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHJpdmF0ZSBfaXNCcm93c2VyID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogc3RyaW5nXG4gICkge1xuICAgIHRoaXMuX2lzQnJvd3NlciA9IGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnbWRiLWF1dG8tY29tcGxldGVyJyk7XG4gIH1cblxuICBwcml2YXRlIF9saXN0ZW5Ub09wdGlvbkNsaWNrKCkge1xuICAgIHRoaXMubWRiT3B0aW9ucy5jaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKHRoaXMubWRiT3B0aW9ucyksXG4gICAgICAgIHN3aXRjaE1hcCgob3B0aW9uczogUXVlcnlMaXN0PE1kYk9wdGlvbkNvbXBvbmVudD4pID0+IHtcbiAgICAgICAgICByZXR1cm4gbWVyZ2UoLi4ub3B0aW9ucy5tYXAoKG9wdGlvbjogTWRiT3B0aW9uQ29tcG9uZW50KSA9PiBvcHRpb24uY2xpY2skKSk7XG4gICAgICAgIH0pLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5fZGVzdHJveSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGNsaWNrZWRPcHRpb246IE1kYk9wdGlvbkNvbXBvbmVudCkgPT4gdGhpcy5faGFuZGxlT3B0aW9uQ2xpY2soY2xpY2tlZE9wdGlvbikpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlT3B0aW9uQ2xpY2sob3B0aW9uOiBNZGJPcHRpb25Db21wb25lbnQpIHtcbiAgICB0aGlzLnNldFNlbGVjdGVkSXRlbSh7IHRleHQ6IG9wdGlvbi52YWx1ZSwgZWxlbWVudDogb3B0aW9uIH0pO1xuICAgIHRoaXMuaGlnaGxpZ2h0Um93KDApO1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoeyB0ZXh0OiBvcHRpb24udmFsdWUsIGVsZW1lbnQ6IG9wdGlvbiB9KTtcbiAgICB0aGlzLnNlbGVjdGVkLmVtaXQoeyB0ZXh0OiBvcHRpb24udmFsdWUsIGVsZW1lbnQ6IG9wdGlvbiB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTZWxlY3RlZEl0ZW0oaXRlbTogSVNlbGVjdGVkT3B0aW9uKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWRJdGVtID0gaXRlbTtcbiAgICB0aGlzLl9zZWxlY3RlZEl0ZW1DaGFuZ2VkLm5leHQodGhpcy5nZXRTZWxlY3RlZEl0ZW0oKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U2VsZWN0ZWRJdGVtKCkge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEl0ZW07XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0ZWRJdGVtQ2hhbmdlZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEl0ZW1DaGFuZ2VkO1xuICB9XG5cbiAgcHVibGljIGlzT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5faXNPcGVuO1xuICB9XG5cbiAgcHVibGljIF9jYWxjdWxhdGVQb3NpdGlvbigpIHtcbiAgICBjb25zdCBtb2RhbEVsID0gdGhpcy51dGlscy5nZXRDbG9zZXN0RWwodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnLm1vZGFsLWRpYWxvZycpO1xuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbXBsZXRlci1kcm9wZG93bicpXG4gICAgICA/IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wbGV0ZXItZHJvcGRvd24nKSlcbiAgICAgIDogbnVsbDtcbiAgICBpZiAoIXN0eWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGhlaWdodCA9IFsnaGVpZ2h0JywgJ3BhZGRpbmctdG9wJywgJ3BhZGRpbmctYm90dG9tJywgJ21hcmdpbi10b3AnLCAnbWFyZ2luLWJvdHRvbSddXG4gICAgICAubWFwKGtleSA9PiBwYXJzZUludChzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKGtleSksIDEwKSlcbiAgICAgIC5yZWR1Y2UoKHByZXYsIGN1cikgPT4gcHJldiArIGN1cik7XG5cbiAgICBjb25zdCB0b3BSZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbXBsZXRlci1kcm9wZG93bicpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICBjb25zdCBib3R0b20gPSBtb2RhbEVsID8gd2luZG93LmlubmVySGVpZ2h0IC0gaGVpZ2h0IC0gdG9wUmVjdCA6IHRoaXMucGFyYW1ldGVycy5ib3R0b207XG4gICAgY29uc3QgY2FuT3BlbkJlbG93ID0gdGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCA8PSBib3R0b207XG5cbiAgICBjb25zdCBiZWxvd1Bvc2l0aW9uID0gdGhpcy5wYXJhbWV0ZXJzLmlucHV0SGVpZ2h0ICsgMztcbiAgICBjb25zdCBhYm92ZVBvc2l0aW9uID0gYC0ke3RoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHR9YDtcblxuICAgIGxldCB0b3A7XG5cbiAgICBpZiAodGhpcy5kcm9wZG93blBvc2l0aW9uID09PSAnYXV0bycpIHtcbiAgICAgIHRvcCA9IGNhbk9wZW5CZWxvdyA/IGJlbG93UG9zaXRpb24gOiBhYm92ZVBvc2l0aW9uO1xuICAgIH0gZWxzZSBpZiAodGhpcy5kcm9wZG93blBvc2l0aW9uID09PSAnYmVsb3cnKSB7XG4gICAgICB0b3AgPSBiZWxvd1Bvc2l0aW9uO1xuICAgIH0gZWxzZSBpZiAodGhpcy5kcm9wZG93blBvc2l0aW9uID09PSAnYWJvdmUnKSB7XG4gICAgICB0b3AgPSBhYm92ZVBvc2l0aW9uO1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LCAndG9wJywgdG9wICsgJ3B4Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgMCArICdweCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCB0aGlzLnBhcmFtZXRlcnMud2lkdGggKyAncHgnKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NhbGN1bGF0ZUFwcGVuZFBvc2l0aW9uKCkge1xuICAgIGlmICh0aGlzLl9pc0Jyb3dzZXIpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBvcmlnaW5SZWN0OiBDbGllbnRSZWN0ID0gdGhpcy5vcmlnaW4ubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICAgICAgY29uc3Qgb2Zmc2V0VG9wID0gb3JpZ2luUmVjdC50b3AgKyBzY3JvbGxUb3A7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IG9yaWdpblJlY3QuaGVpZ2h0O1xuICAgICAgICBjb25zdCBkcm9wZG93bkhlaWdodCA9IHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IGlucHV0TWFyZ2luID0gODtcblxuICAgICAgICBsZXQgdG9wID0gMDtcbiAgICAgICAgbGV0IGxlZnQgPSAwO1xuXG4gICAgICAgIGxlZnQgPSBvcmlnaW5SZWN0LmxlZnQ7XG5cbiAgICAgICAgY29uc3QgY2FuT3BlbkJlbG93ID1cbiAgICAgICAgICBvZmZzZXRUb3AgKyBkcm9wZG93bkhlaWdodCArIGhlaWdodCArIGlucHV0TWFyZ2luIDw9XG4gICAgICAgICAgc2Nyb2xsVG9wICsgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgY29uc3QgYmVsb3dQb3NpdGlvbiA9IG9mZnNldFRvcCArIGhlaWdodCArIGlucHV0TWFyZ2luO1xuICAgICAgICBjb25zdCBhYm92ZVBvc2l0aW9uID0gKHRvcCA9IG9mZnNldFRvcCAtIGRyb3Bkb3duSGVpZ2h0IC0gaW5wdXRNYXJnaW4pO1xuXG4gICAgICAgIGlmICh0aGlzLmRyb3Bkb3duUG9zaXRpb24gPT09ICdhdXRvJykge1xuICAgICAgICAgIHRvcCA9IGNhbk9wZW5CZWxvdyA/IGJlbG93UG9zaXRpb24gOiBhYm92ZVBvc2l0aW9uO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHJvcGRvd25Qb3NpdGlvbiA9PT0gJ2JlbG93Jykge1xuICAgICAgICAgIHRvcCA9IGJlbG93UG9zaXRpb247XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kcm9wZG93blBvc2l0aW9uID09PSAnYWJvdmUnKSB7XG4gICAgICAgICAgdG9wID0gYWJvdmVQb3NpdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LCAndG9wJywgdG9wICsgJ3B4Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIGxlZnQgKyAncHgnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIHRoaXMucGFyYW1ldGVycy53aWR0aCArICdweCcpO1xuICAgICAgfSwgMCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNob3coKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLl9pc09wZW4gPSB0cnVlO1xuICAgICAgdGhpcy5faXNEcm9wZG93bk9wZW4ubmV4dCh0aGlzLmlzT3BlbigpKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmRyb3Bkb3duICYmICF0aGlzLmFwcGVuZFRvQm9keSkge1xuICAgICAgICB0aGlzLl9jYWxjdWxhdGVQb3NpdGlvbigpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kcm9wZG93biAmJiB0aGlzLmFwcGVuZFRvQm9keSkge1xuICAgICAgICB0aGlzLl9jYWxjdWxhdGVBcHBlbmRQb3NpdGlvbigpO1xuICAgICAgfVxuICAgIH0sIDApO1xuICB9XG5cbiAgcHVibGljIGhpZGUoKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuX2lzRHJvcGRvd25PcGVuLm5leHQodGhpcy5pc09wZW4oKSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzRHJvcGRvd25PcGVuKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzRHJvcGRvd25PcGVuO1xuICB9XG5cbiAgcmVtb3ZlSGlnaGxpZ2h0KGluZGV4OiBudW1iZXIpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMub3B0aW9uTGlzdC5mb3JFYWNoKChlbDogYW55LCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgY29tcGxldGVyUm93ID0gZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tcGxldGVyLXJvdycpO1xuICAgICAgICBpZiAoaSA9PT0gaW5kZXgpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsLm5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQsICdoaWdobGlnaHQtcm93Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaSAhPT0gaW5kZXgpIHtcbiAgICAgICAgICBjb21wbGV0ZXJSb3cuZm9yRWFjaCgoZWxlbTogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGVsZW0sICdoaWdobGlnaHQtcm93Jyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIDApO1xuICB9XG5cbiAgaGlnaGxpZ2h0Um93KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9hbGxJdGVtcyA9IHRoaXMub3B0aW9uTGlzdFxuICAgICAgLmZpbHRlcihlbCA9PiBlbC5uYXRpdmVFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5jb250YWlucygnY29tcGxldGVyLXJvdycpKVxuICAgICAgLm1hcChlbGVtID0+IGVsZW0ubmF0aXZlRWxlbWVudCk7XG5cbiAgICBpZiAodGhpcy5fYWxsSXRlbXNbaW5kZXhdKSB7XG4gICAgICB0aGlzLm9wdGlvbkxpc3QuZm9yRWFjaCgoZWw6IGFueSwgaTogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlclJvdyA9IGVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbXBsZXRlci1yb3cnKTtcblxuICAgICAgICBpZiAoaW5kZXggPT09IGkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUhpZ2hsaWdodChpbmRleCk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhjb21wbGV0ZXJSb3dbY29tcGxldGVyUm93Lmxlbmd0aCAtIDFdLCAnaGlnaGxpZ2h0LXJvdycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXggPSBpbmRleDtcbiAgfVxuXG4gIG5hdmlnYXRlVXNpbmdLZXlib2FyZChldmVudDogYW55KSB7XG4gICAgaWYgKHRoaXMuZHJvcGRvd24pIHtcbiAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLm1vdmVIaWdobGlnaHRlZEludG9WaWV3KGV2ZW50LmtleSk7XG5cbiAgICAgICAgICBpZiAoIXRoaXMuaXNPcGVuKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEl0ZW1JbmRleCArIDEgPD0gdGhpcy5fYWxsSXRlbXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRSb3coKyt0aGlzLl9zZWxlY3RlZEl0ZW1JbmRleCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3RlZEl0ZW1JbmRleCArIDEgPT09IHRoaXMuX2FsbEl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRSb3coMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSXRlbUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFJvdygwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBzZWxlY3RlZEVsZW1lbnQ6IGFueSA9IHRoaXMubWRiT3B0aW9ucy5maW5kKFxuICAgICAgICAgICAgKGVsOiBhbnksIGluZGV4OiBudW1iZXIpID0+IGVsICYmIGluZGV4ID09PSB0aGlzLl9zZWxlY3RlZEl0ZW1JbmRleFxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKHNlbGVjdGVkRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3QuZW1pdCh7IHRleHQ6IHNlbGVjdGVkRWxlbWVudC52YWx1ZSwgZWxlbWVudDogc2VsZWN0ZWRFbGVtZW50IH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5tb3ZlSGlnaGxpZ2h0ZWRJbnRvVmlldyhldmVudC5rZXkpO1xuICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZEl0ZW1JbmRleCA9PT0gLTEgfHwgdGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RJdGVtSW5kZXggPSB0aGlzLm1kYk9wdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRSb3cobGFzdEl0ZW1JbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Um93KC0tdGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXgpO1xuXG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtOiBhbnkgPSB0aGlzLm1kYk9wdGlvbnMuZmluZChcbiAgICAgICAgICAgIChlbDogYW55LCBpbmRleDogbnVtYmVyKSA9PiBlbCAmJiBpbmRleCA9PT0gdGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChzZWxlY3RlZEl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0LmVtaXQoeyB0ZXh0OiBzZWxlY3RlZEl0ZW0udmFsdWUsIGVsZW1lbnQ6IHNlbGVjdGVkSXRlbSB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBFU0NBUEU6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBFTlRFUjpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSB0aGlzLm1kYk9wdGlvbnMubWFwKGVsID0+IGVsKVt0aGlzLl9zZWxlY3RlZEl0ZW1JbmRleF07XG4gICAgICAgICAgaWYgKHNlbGVjdGVkT3B0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkSXRlbSh7IHRleHQ6IHNlbGVjdGVkT3B0aW9uLnZhbHVlLCBlbGVtZW50OiBzZWxlY3RlZE9wdGlvbiB9KTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0LmVtaXQoeyB0ZXh0OiBzZWxlY3RlZE9wdGlvbi52YWx1ZSwgZWxlbWVudDogc2VsZWN0ZWRPcHRpb24gfSk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkLmVtaXQoeyB0ZXh0OiBzZWxlY3RlZE9wdGlvbi52YWx1ZSwgZWxlbWVudDogc2VsZWN0ZWRPcHRpb24gfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdmVIaWdobGlnaHRlZEludG9WaWV3KHR5cGU6IHN0cmluZykge1xuICAgIGxldCBsaXN0SGVpZ2h0ID0gMDtcbiAgICBsZXQgaXRlbUluZGV4ID0gdGhpcy5fc2VsZWN0ZWRJdGVtSW5kZXg7XG5cbiAgICB0aGlzLm9wdGlvbkxpc3QuZm9yRWFjaCgoZWw6IGFueSkgPT4ge1xuICAgICAgbGlzdEhlaWdodCArPSBlbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICB9KTtcblxuICAgIGlmIChpdGVtSW5kZXggPiAtMSkge1xuICAgICAgbGV0IGl0ZW1IZWlnaHQgPSAwO1xuXG4gICAgICB0aGlzLm9wdGlvbkxpc3QuZm9yRWFjaCgoZWw6IEVsZW1lbnRSZWYsIGk6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiAoaSA9PT0gaXRlbUluZGV4ICsgMSkge1xuICAgICAgICAgIGl0ZW1IZWlnaHQgPSBlbC5uYXRpdmVFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLmNsaWVudEhlaWdodDtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGl0ZW1Ub3AgPSAoaXRlbUluZGV4ICsgMSkgKiBpdGVtSGVpZ2h0O1xuICAgICAgY29uc3Qgdmlld1RvcCA9IHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICBjb25zdCB2aWV3Qm90dG9tID0gdmlld1RvcCArIGxpc3RIZWlnaHQ7XG5cbiAgICAgIGlmICh0eXBlID09PSAnQXJyb3dEb3duJykge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudCwgJ3Njcm9sbFRvcCcsIGl0ZW1Ub3AgLSBpdGVtSGVpZ2h0KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICAgIGlmIChpdGVtSW5kZXggPT09IDApIHtcbiAgICAgICAgICBpdGVtSW5kZXggPSB0aGlzLm9wdGlvbkxpc3QubGVuZ3RoIC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtSW5kZXgtLTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtSW5kZXggPT09IHRoaXMuX2FsbEl0ZW1zLmxlbmd0aCAtIDIpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgJ3Njcm9sbFRvcCcsXG4gICAgICAgICAgICB2aWV3Qm90dG9tIC0gaXRlbUhlaWdodFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICdzY3JvbGxUb3AnLFxuICAgICAgICAgICAgaXRlbUluZGV4ICogaXRlbUhlaWdodFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVQb3NpdGlvbihwYXJhbWV0ZXJzOiB7IGxlZnQ6IG51bWJlcjsgdG9wOiBudW1iZXI7IHdpZHRoOiBudW1iZXI7IGJvdHRvbTogbnVtYmVyIH0pIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmRyb3Bkb3duKSB7XG4gICAgICAgIGNvbnN0IHRvcCA9XG4gICAgICAgICAgdGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCA+IHBhcmFtZXRlcnMuYm90dG9tXG4gICAgICAgICAgICA/IHBhcmFtZXRlcnMudG9wIC0gdGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodFxuICAgICAgICAgICAgOiBwYXJhbWV0ZXJzLnRvcDtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCB0b3AgKyAncHgnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgcGFyYW1ldGVycy5sZWZ0ICsgJ3B4Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBwYXJhbWV0ZXJzLndpZHRoICsgJ3B4Jyk7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH1cblxuICBwdWJsaWMgYXBwZW5kRHJvcGRvd24oKSB7XG4gICAgaWYgKHRoaXMuX2lzQnJvd3NlciAmJiB0aGlzLmFwcGVuZFRvQm9keSkge1xuICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgIGNvbnN0IGRyb3Bkb3duID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICBpZiAoYm9keSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGJvZHksIGRyb3Bkb3duKTtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlQXBwZW5kUG9zaXRpb24oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0U2luZ2xlT3B0aW9uSGVpZ2h0KCkge1xuICAgIHRoaXMubWRiT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICBvcHRpb24uX29wdGlvbkhlaWdodCA9IHRoaXMuX29wdGlvbkhlaWdodDtcbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9saXN0ZW5Ub09wdGlvbkNsaWNrKCk7XG4gICAgdGhpcy5oaWdobGlnaHRSb3coMCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9kZXN0cm95Lm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95LmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==