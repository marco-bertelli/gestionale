import { __values } from "tslib";
import { Option } from './option';
import { Diacritics } from './diacritics';
var OptionList = /** @class */ (function () {
    function OptionList(options, _multiple) {
        if (_multiple === void 0) { _multiple = false; }
        this._multiple = _multiple;
        this._highlightedOption = null;
        this.setToNullValue = null;
        if (typeof options === 'undefined' || options === null) {
            options = [];
        }
        this._options = options.map(function (option) {
            var o = new Option(option);
            if (option.disabled) {
                o.disabled = true;
            }
            if (option.group) {
                o.disabled = true;
                o.group = true;
            }
            return o;
        });
        this._hasShown = this._options.length > 0;
        this.highlight();
    }
    Object.defineProperty(OptionList.prototype, "highlightFirst", {
        get: function () {
            return this._highlightFirst;
        },
        set: function (value) {
            this._highlightFirst = value;
        },
        enumerable: true,
        configurable: true
    });
    // v0 and v1 are assumed not to be undefined or null.
    OptionList.equalValues = function (v0, v1) {
        if (v0.length !== v1.length) {
            return false;
        }
        var a = v0.slice().sort();
        var b = v1.slice().sort();
        return a.every(function (v, i) {
            return v === b[i];
        });
    };
    Object.defineProperty(OptionList.prototype, "options", {
        /** Options. **/
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    OptionList.prototype.getOptionsByValue = function (value) {
        return this.options.filter(function (option) {
            return option.value === value;
        });
    };
    Object.defineProperty(OptionList.prototype, "value", {
        /** Value. **/
        get: function () {
            return this.selection.map(function (selectedOption) {
                return selectedOption.value;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OptionList.prototype, "selection", {
        /** Selection. **/
        get: function () {
            return this.options.filter(function (option) {
                return option.selected;
            });
        },
        enumerable: true,
        configurable: true
    });
    OptionList.prototype.select = function (option) {
        if (!this._multiple) {
            this.clearSelection();
        }
        option.selected = true;
    };
    OptionList.prototype.deselect = function (option) {
        option.selected = false;
    };
    OptionList.prototype.clearSelection = function () {
        this.options.forEach(function (option) {
            option.selected = false;
        });
    };
    Object.defineProperty(OptionList.prototype, "filtered", {
        /** Filter. **/
        get: function () {
            return this.options.filter(function (option) {
                return option.shown;
            });
        },
        enumerable: true,
        configurable: true
    });
    OptionList.prototype.filter = function (term) {
        var anyShown = false;
        if (term.trim() === '') {
            this.resetFilter();
            anyShown = this.options.length > 0;
        }
        else {
            this.options.forEach(function (option) {
                var l = Diacritics.strip(option.label).toUpperCase();
                var t = Diacritics.strip(term).toUpperCase();
                option.shown = l.indexOf(t) > -1;
                if (option.shown) {
                    anyShown = true;
                }
            });
        }
        this.highlight();
        this._hasShown = anyShown;
        return anyShown;
    };
    OptionList.prototype.resetFilter = function () {
        this.options.forEach(function (option) {
            option.shown = true;
        });
    };
    Object.defineProperty(OptionList.prototype, "highlightedOption", {
        /** Highlight. **/
        get: function () {
            return this._highlightedOption;
        },
        enumerable: true,
        configurable: true
    });
    OptionList.prototype.highlight = function () {
        var firstShown = this.getFirstShown();
        var firstSelected = this.getFirstShownSelected();
        if (this.highlightFirst && firstShown && !firstSelected) {
            this.highlightOption(firstShown);
        }
        else {
            this.highlightOption(firstSelected);
        }
    };
    OptionList.prototype.highlightOption = function (option) {
        this.clearHighlightedOption();
        if (option !== null) {
            option.highlighted = true;
            this._highlightedOption = option;
        }
    };
    OptionList.prototype.highlightNextOption = function () {
        var shownOptions = this.filtered;
        var index = this.getHighlightedIndexFromList(shownOptions);
        if (index < shownOptions.length - 1) {
            this.highlightOption(shownOptions[index + 1]);
        }
    };
    OptionList.prototype.highlightPreviousOption = function () {
        var shownOptions = this.filtered;
        var index = this.getHighlightedIndexFromList(shownOptions);
        if (index > 0) {
            this.highlightOption(shownOptions[index - 1]);
        }
    };
    OptionList.prototype.clearHighlightedOption = function () {
        if (this.highlightedOption !== null) {
            this.highlightedOption.highlighted = false;
            this._highlightedOption = null;
        }
    };
    OptionList.prototype.getHighlightedIndexFromList = function (options) {
        for (var i = 0; i < options.length; i++) {
            if (options[i].highlighted) {
                return i;
            }
        }
        return -1;
    };
    OptionList.prototype.getHighlightedIndex = function () {
        return this.getHighlightedIndexFromList(this.filtered);
    };
    Object.defineProperty(OptionList.prototype, "hasShown", {
        /** Util. **/
        get: function () {
            return this._hasShown;
        },
        enumerable: true,
        configurable: true
    });
    OptionList.prototype.hasSelected = function () {
        return this.options.some(function (option) {
            return option.selected;
        });
    };
    OptionList.prototype.hasShownSelected = function () {
        return this.options.some(function (option) {
            return option.shown && option.selected;
        });
    };
    OptionList.prototype.getFirstShown = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                var option = _c.value;
                if (option.shown && !option.group && !option.disabled) {
                    return option;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this.setToNullValue;
    };
    OptionList.prototype.getFirstShownSelected = function () {
        var e_2, _a;
        try {
            for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                var option = _c.value;
                if (option.shown && option.selected) {
                    return option;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return this.setToNullValue;
    };
    return OptionList;
}());
export { OptionList };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLWxpc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy11aWtpdC1wcm8tc3RhbmRhcmQvIiwic291cmNlcyI6WyJsaWIvcHJvL21hdGVyaWFsLXNlbGVjdC9vcHRpb24tbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVsQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTFDO0lBNkJFLG9CQUFZLE9BQXVCLEVBQVUsU0FBaUI7UUFBakIsMEJBQUEsRUFBQSxpQkFBaUI7UUFBakIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQTNCdEQsdUJBQWtCLEdBQWlCLElBQUksQ0FBQztRQVd6QyxtQkFBYyxHQUFRLElBQUksQ0FBQztRQWlCaEMsSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUN0RCxPQUFPLEdBQUcsRUFBRSxDQUFDO1NBQ2Q7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNO1lBQ2hDLElBQU0sQ0FBQyxHQUFXLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDbkIsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDbkI7WUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hCLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzthQUNoQjtZQUNELE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIs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QUEsS0FBQSxTQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQTlCLElBQU0sTUFBTSxXQUFBO2dCQUNmLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO29CQUNuQyxPQUFPLE1BQU0sQ0FBQztpQkFDZjthQUNGOzs7Ozs7Ozs7UUFDRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0IsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQXhPRCxJQXdPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wdGlvbiB9IGZyb20gJy4vb3B0aW9uJztcbmltcG9ydCB7IElPcHRpb24gfSBmcm9tICcuL29wdGlvbi1pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGlhY3JpdGljcyB9IGZyb20gJy4vZGlhY3JpdGljcyc7XG5cbmV4cG9ydCBjbGFzcyBPcHRpb25MaXN0IHtcbiAgcHJpdmF0ZSBfb3B0aW9uczogQXJyYXk8T3B0aW9uPjtcbiAgcHJpdmF0ZSBfaGlnaGxpZ2h0ZWRPcHRpb246IE9wdGlvbiB8IGFueSA9IG51bGw7XG4gIHByaXZhdGUgX2hhc1Nob3duOiBib29sZWFuO1xuXG4gIHByaXZhdGUgX2hpZ2hsaWdodEZpcnN0OiBib29sZWFuO1xuICBnZXQgaGlnaGxpZ2h0Rmlyc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZ2hsaWdodEZpcnN0O1xuICB9XG4gIHNldCBoaWdobGlnaHRGaXJzdCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZ2hsaWdodEZpcnN0ID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgc2V0VG9OdWxsVmFsdWU6IGFueSA9IG51bGw7XG5cbiAgLy8gdjAgYW5kIHYxIGFyZSBhc3N1bWVkIG5vdCB0byBiZSB1bmRlZmluZWQgb3IgbnVsbC5cbiAgc3RhdGljIGVxdWFsVmFsdWVzKHYwOiBBcnJheTxzdHJpbmc+LCB2MTogQXJyYXk8c3RyaW5nPik6IGJvb2xlYW4ge1xuICAgIGlmICh2MC5sZW5ndGggIT09IHYxLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGE6IEFycmF5PHN0cmluZz4gPSB2MC5zbGljZSgpLnNvcnQoKTtcbiAgICBjb25zdCBiOiBBcnJheTxzdHJpbmc+ID0gdjEuc2xpY2UoKS5zb3J0KCk7XG5cbiAgICByZXR1cm4gYS5ldmVyeSgodiwgaSkgPT4ge1xuICAgICAgcmV0dXJuIHYgPT09IGJbaV07XG4gICAgfSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBBcnJheTxJT3B0aW9uPiwgcHJpdmF0ZSBfbXVsdGlwbGUgPSBmYWxzZSkge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3VuZGVmaW5lZCcgfHwgb3B0aW9ucyA9PT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IFtdO1xuICAgIH1cblxuICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zLm1hcChvcHRpb24gPT4ge1xuICAgICAgY29uc3QgbzogT3B0aW9uID0gbmV3IE9wdGlvbihvcHRpb24pO1xuICAgICAgaWYgKG9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICBvLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb24uZ3JvdXApIHtcbiAgICAgICAgby5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIG8uZ3JvdXAgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG87XG4gICAgfSk7XG5cbiAgICB0aGlzLl9oYXNTaG93biA9IHRoaXMuX29wdGlvbnMubGVuZ3RoID4gMDtcbiAgICB0aGlzLmhpZ2hsaWdodCgpO1xuICB9XG5cbiAgLyoqIE9wdGlvbnMuICoqL1xuXG4gIGdldCBvcHRpb25zKCk6IEFycmF5PE9wdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICB9XG5cbiAgZ2V0T3B0aW9uc0J5VmFsdWUodmFsdWU6IHN0cmluZyk6IEFycmF5PE9wdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB7XG4gICAgICByZXR1cm4gb3B0aW9uLnZhbHVlID09PSB2YWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBWYWx1ZS4gKiovXG5cbiAgZ2V0IHZhbHVlKCk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbi5tYXAoc2VsZWN0ZWRPcHRpb24gPT4ge1xuICAgICAgcmV0dXJuIHNlbGVjdGVkT3B0aW9uLnZhbHVlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFNlbGVjdGlvbi4gKiovXG5cbiAgZ2V0IHNlbGVjdGlvbigpOiBBcnJheTxPcHRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbHRlcihvcHRpb24gPT4ge1xuICAgICAgcmV0dXJuIG9wdGlvbi5zZWxlY3RlZDtcbiAgICB9KTtcbiAgfVxuXG4gIHNlbGVjdChvcHRpb246IE9wdGlvbikge1xuICAgIGlmICghdGhpcy5fbXVsdGlwbGUpIHtcbiAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICB9XG4gICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGRlc2VsZWN0KG9wdGlvbjogT3B0aW9uKSB7XG4gICAgb3B0aW9uLnNlbGVjdGVkID0gZmFsc2U7XG4gIH1cblxuICBjbGVhclNlbGVjdGlvbigpIHtcbiAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgb3B0aW9uLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICAvKiogRmlsdGVyLiAqKi9cblxuICBnZXQgZmlsdGVyZWQoKTogQXJyYXk8T3B0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maWx0ZXIob3B0aW9uID0+IHtcbiAgICAgIHJldHVybiBvcHRpb24uc2hvd247XG4gICAgfSk7XG4gIH1cblxuICBmaWx0ZXIodGVybTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgbGV0IGFueVNob3duID0gZmFsc2U7XG5cbiAgICBpZiAodGVybS50cmltKCkgPT09ICcnKSB7XG4gICAgICB0aGlzLnJlc2V0RmlsdGVyKCk7XG4gICAgICBhbnlTaG93biA9IHRoaXMub3B0aW9ucy5sZW5ndGggPiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgICBjb25zdCBsOiBzdHJpbmcgPSBEaWFjcml0aWNzLnN0cmlwKG9wdGlvbi5sYWJlbCkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgY29uc3QgdDogc3RyaW5nID0gRGlhY3JpdGljcy5zdHJpcCh0ZXJtKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBvcHRpb24uc2hvd24gPSBsLmluZGV4T2YodCkgPiAtMTtcblxuICAgICAgICBpZiAob3B0aW9uLnNob3duKSB7XG4gICAgICAgICAgYW55U2hvd24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmhpZ2hsaWdodCgpO1xuICAgIHRoaXMuX2hhc1Nob3duID0gYW55U2hvd247XG5cbiAgICByZXR1cm4gYW55U2hvd247XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RmlsdGVyKCkge1xuICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICBvcHRpb24uc2hvd24gPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEhpZ2hsaWdodC4gKiovXG5cbiAgZ2V0IGhpZ2hsaWdodGVkT3B0aW9uKCk6IE9wdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZ2hsaWdodGVkT3B0aW9uO1xuICB9XG5cbiAgaGlnaGxpZ2h0KCkge1xuICAgIGNvbnN0IGZpcnN0U2hvd246IE9wdGlvbiA9IHRoaXMuZ2V0Rmlyc3RTaG93bigpO1xuICAgIGNvbnN0IGZpcnN0U2VsZWN0ZWQ6IE9wdGlvbiA9IHRoaXMuZ2V0Rmlyc3RTaG93blNlbGVjdGVkKCk7XG5cbiAgICBpZiAodGhpcy5oaWdobGlnaHRGaXJzdCAmJiBmaXJzdFNob3duICYmICFmaXJzdFNlbGVjdGVkKSB7XG4gICAgICB0aGlzLmhpZ2hsaWdodE9wdGlvbihmaXJzdFNob3duKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oaWdobGlnaHRPcHRpb24oZmlyc3RTZWxlY3RlZCk7XG4gICAgfVxuICB9XG5cbiAgaGlnaGxpZ2h0T3B0aW9uKG9wdGlvbjogT3B0aW9uKSB7XG4gICAgdGhpcy5jbGVhckhpZ2hsaWdodGVkT3B0aW9uKCk7XG5cbiAgICBpZiAob3B0aW9uICE9PSBudWxsKSB7XG4gICAgICBvcHRpb24uaGlnaGxpZ2h0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5faGlnaGxpZ2h0ZWRPcHRpb24gPSBvcHRpb247XG4gICAgfVxuICB9XG5cbiAgaGlnaGxpZ2h0TmV4dE9wdGlvbigpIHtcbiAgICBjb25zdCBzaG93bk9wdGlvbnMgPSB0aGlzLmZpbHRlcmVkO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRIaWdobGlnaHRlZEluZGV4RnJvbUxpc3Qoc2hvd25PcHRpb25zKTtcblxuICAgIGlmIChpbmRleCA8IHNob3duT3B0aW9ucy5sZW5ndGggLSAxKSB7XG4gICAgICB0aGlzLmhpZ2hsaWdodE9wdGlvbihzaG93bk9wdGlvbnNbaW5kZXggKyAxXSk7XG4gICAgfVxuICB9XG5cbiAgaGlnaGxpZ2h0UHJldmlvdXNPcHRpb24oKSB7XG4gICAgY29uc3Qgc2hvd25PcHRpb25zID0gdGhpcy5maWx0ZXJlZDtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0SGlnaGxpZ2h0ZWRJbmRleEZyb21MaXN0KHNob3duT3B0aW9ucyk7XG5cbiAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICB0aGlzLmhpZ2hsaWdodE9wdGlvbihzaG93bk9wdGlvbnNbaW5kZXggLSAxXSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhckhpZ2hsaWdodGVkT3B0aW9uKCkge1xuICAgIGlmICh0aGlzLmhpZ2hsaWdodGVkT3B0aW9uICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmhpZ2hsaWdodGVkT3B0aW9uLmhpZ2hsaWdodGVkID0gZmFsc2U7XG4gICAgICB0aGlzLl9oaWdobGlnaHRlZE9wdGlvbiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRIaWdobGlnaHRlZEluZGV4RnJvbUxpc3Qob3B0aW9uczogQXJyYXk8T3B0aW9uPikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG9wdGlvbnNbaV0uaGlnaGxpZ2h0ZWQpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIGdldEhpZ2hsaWdodGVkSW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SGlnaGxpZ2h0ZWRJbmRleEZyb21MaXN0KHRoaXMuZmlsdGVyZWQpO1xuICB9XG5cbiAgLyoqIFV0aWwuICoqL1xuXG4gIGdldCBoYXNTaG93bigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGFzU2hvd247XG4gIH1cblxuICBoYXNTZWxlY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNvbWUob3B0aW9uID0+IHtcbiAgICAgIHJldHVybiBvcHRpb24uc2VsZWN0ZWQ7XG4gICAgfSk7XG4gIH1cblxuICBoYXNTaG93blNlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc29tZShvcHRpb24gPT4ge1xuICAgICAgcmV0dXJuIG9wdGlvbi5zaG93biAmJiBvcHRpb24uc2VsZWN0ZWQ7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldEZpcnN0U2hvd24oKTogT3B0aW9uIHtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb24uc2hvd24gJiYgIW9wdGlvbi5ncm91cCAmJiAhb3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNldFRvTnVsbFZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGaXJzdFNob3duU2VsZWN0ZWQoKTogT3B0aW9uIHtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb24uc2hvd24gJiYgb3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNldFRvTnVsbFZhbHVlO1xuICB9XG59XG4iXX0=