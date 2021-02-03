import { __decorate, __metadata } from "tslib";
import { Directive, HostListener, Input, HostBinding } from '@angular/core';
var MdbCreditCardDirective = /** @class */ (function () {
    function MdbCreditCardDirective() {
        this.standardPattern = /(\d{1,4})/g;
        this.defaultCard = {
            name: '',
            fullName: '',
            re: /\d{0,16}/,
            pattern: this.standardPattern,
            maxLength: 19,
            cvvLength: 3,
        };
        this.cards = [
            {
                name: 'visa',
                fullName: 'Visa',
                re: /^4\d{0,15}/,
                pattern: this.standardPattern,
                maxLength: 16,
                cvvLength: 3,
            },
            {
                name: 'mastercard',
                fullName: 'Mastercard',
                re: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
                pattern: this.standardPattern,
                maxLength: 16,
                cvvLength: 3,
            },
            {
                name: 'amex',
                fullName: 'American Express',
                re: /^3[47]\d{0,13}/,
                pattern: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
                maxLength: 15,
                cvvLength: 4,
            },
            {
                name: 'jcb',
                fullName: 'JCB',
                re: /^(?:35\d{0,2})\d{0,12}/,
                pattern: this.standardPattern,
                maxLength: 16,
                cvvLength: 3,
            },
            {
                name: 'discover',
                fullName: 'Discover',
                re: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
                pattern: this.standardPattern,
                maxLength: 16,
                cvvLength: 3,
            },
            {
                name: 'diners-club',
                fullName: 'Diners Club',
                re: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
                pattern: this.standardPattern,
                maxLength: 14,
                cvvLength: 3,
            },
        ];
        this._separator = ' ';
    }
    Object.defineProperty(MdbCreditCardDirective.prototype, "additionalCards", {
        get: function () {
            return this._additionalCards;
        },
        set: function (cards) {
            this._additionalCards = cards;
            this.addCards(cards);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdbCreditCardDirective.prototype, "separator", {
        get: function () {
            return this._separator;
        },
        set: function (separator) {
            this._separator = separator;
        },
        enumerable: true,
        configurable: true
    });
    MdbCreditCardDirective.prototype.onInput = function (event) {
        this.formatInput(event);
    };
    MdbCreditCardDirective.prototype.formatInput = function (event) {
        var input = event.target.value;
        var formattedInput = this.getFormattedInput(input);
        event.target.value = formattedInput;
    };
    MdbCreditCardDirective.prototype.getFormattedInput = function (value) {
        value = this.removeNonDigits(value);
        var card = this.findCardByNumber(value);
        this.updateCurrentCardNames(card.name, card.fullName);
        var cardNumMaxLength;
        if (this.hasStandardPattern(card)) {
            var matches = value.match(card.pattern);
            if (matches === null) {
                return value;
            }
            cardNumMaxLength = card.maxLength + matches.length - 1;
            this.maxLength = cardNumMaxLength.toString();
            return matches.join(this.separator);
        }
        else {
            var results = card.pattern.exec(value);
            if (results === null) {
                return value;
            }
            results.shift();
            cardNumMaxLength = card.maxLength + results.length - 1;
            this.maxLength = cardNumMaxLength.toString();
            return results.filter(this.isMatch).join(this.separator);
        }
    };
    MdbCreditCardDirective.prototype.removeNonDigits = function (value) {
        return value.replace(/\D/g, '');
    };
    MdbCreditCardDirective.prototype.hasStandardPattern = function (card) {
        return card.pattern.toString() === this.standardPattern.toString();
    };
    MdbCreditCardDirective.prototype.isMatch = function (match) {
        return match !== undefined;
    };
    MdbCreditCardDirective.prototype.updateCurrentCardNames = function (name, fullName) {
        this.cardName = name;
        this.cardFullName = fullName;
    };
    MdbCreditCardDirective.prototype.findCardByNumber = function (value) {
        var cardType = this.cards.find(function (card) {
            return card.re.test(value);
        });
        if (!cardType) {
            return this.defaultCard;
        }
        return cardType;
    };
    MdbCreditCardDirective.prototype.addCards = function (newCards) {
        var _this = this;
        newCards.forEach(function (card) {
            _this.cards.push(card);
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], MdbCreditCardDirective.prototype, "additionalCards", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], MdbCreditCardDirective.prototype, "separator", null);
    __decorate([
        HostBinding('attr.maxLength'),
        __metadata("design:type", String)
    ], MdbCreditCardDirective.prototype, "maxLength", void 0);
    __decorate([
        HostListener('input', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MdbCreditCardDirective.prototype, "onInput", null);
    MdbCreditCardDirective = __decorate([
        Directive({
            selector: '[mdbCreditCard]',
            exportAs: 'mdbCreditCard',
        }),
        __metadata("design:paramtypes", [])
    ], MdbCreditCardDirective);
    return MdbCreditCardDirective;
}());
export { MdbCreditCardDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLWNyZWRpdC1jYXJkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vYXV0by1mb3JtYXQvbWRiLWNyZWRpdC1jYXJkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWU1RTtJQW9GRTtRQW5GUSxvQkFBZSxHQUFHLFlBQVksQ0FBQztRQUkvQixnQkFBVyxHQUFlO1lBQ2hDLElBQUksRUFBRSxFQUFFO1lBQ1IsUUFBUSxFQUFFLEVBQUU7WUFDWixFQUFFLEVBQUUsVUFBVTtZQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsZUFBZTtZQUM3QixTQUFTLEVBQUUsRUFBRTtZQUNiLFNBQVMsRUFBRSxDQUFDO1NBQ2IsQ0FBQztRQUVNLFVBQUssR0FBaUI7WUFDNUI7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLEVBQUUsRUFBRSxZQUFZO2dCQUNoQixPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWU7Z0JBQzdCLFNBQVMsRUFBRSxFQUFFO2dCQUNiLFNBQVMsRUFBRSxDQUFDO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLEVBQUUsRUFBRSx1REFBdUQ7Z0JBQzNELE9BQU8sRUFBRSxJQUFJLENBQUMsZUFBZTtnQkFDN0IsU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsU0FBUyxFQUFFLENBQUM7YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxNQUFNO2dCQUNaLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLEVBQUUsRUFBRSxnQkFBZ0I7Z0JBQ3BCLE9BQU8sRUFBRSwrQkFBK0I7Z0JBQ3hDLFNBQVMsRUFBRSxFQUFFO2dCQUNiLFNBQVMsRUFB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LENBQUM7U0FDekI7UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRU0seUNBQVEsR0FBZixVQUFnQixRQUFzQjtRQUF0QyxpQkFJQztRQUhDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ25CLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQWpHRDtRQURDLEtBQUssRUFBRTs7O2lFQUdQO0lBUUQ7UUFEQyxLQUFLLEVBQUU7OzsyREFHUDtJQVE4QjtRQUE5QixXQUFXLENBQUMsZ0JBQWdCLENBQUM7OzZEQUFtQjtJQUdqRDtRQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozt5REFHakM7SUEzRlUsc0JBQXNCO1FBSmxDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsUUFBUSxFQUFFLGVBQWU7U0FDMUIsQ0FBQzs7T0FDVyxzQkFBc0IsQ0FvS2xDO0lBQUQsNkJBQUM7Q0FBQSxBQXBLRCxJQW9LQztTQXBLWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3JlZGl0Q2FyZCB7XG4gIG5hbWU6IHN0cmluZztcbiAgZnVsbE5hbWU6IHN0cmluZztcbiAgcmU6IFJlZ0V4cDtcbiAgcGF0dGVybjogUmVnRXhwO1xuICBtYXhMZW5ndGg6IG51bWJlcjtcbiAgY3Z2TGVuZ3RoOiBudW1iZXI7XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZGJDcmVkaXRDYXJkXScsXG4gIGV4cG9ydEFzOiAnbWRiQ3JlZGl0Q2FyZCcsXG59KVxuZXhwb3J0IGNsYXNzIE1kYkNyZWRpdENhcmREaXJlY3RpdmUge1xuICBwcml2YXRlIHN0YW5kYXJkUGF0dGVybiA9IC8oXFxkezEsNH0pL2c7XG4gIGNhcmROYW1lOiBzdHJpbmc7XG4gIGNhcmRGdWxsTmFtZTogc3RyaW5nO1xuXG4gIHByaXZhdGUgZGVmYXVsdENhcmQ6IENyZWRpdENhcmQgPSB7XG4gICAgbmFtZTogJycsXG4gICAgZnVsbE5hbWU6ICcnLFxuICAgIHJlOiAvXFxkezAsMTZ9LyxcbiAgICBwYXR0ZXJuOiB0aGlzLnN0YW5kYXJkUGF0dGVybixcbiAgICBtYXhMZW5ndGg6IDE5LFxuICAgIGN2dkxlbmd0aDogMyxcbiAgfTtcblxuICBwcml2YXRlIGNhcmRzOiBDcmVkaXRDYXJkW10gPSBbXG4gICAge1xuICAgICAgbmFtZTogJ3Zpc2EnLFxuICAgICAgZnVsbE5hbWU6ICdWaXNhJyxcbiAgICAgIHJlOiAvXjRcXGR7MCwxNX0vLFxuICAgICAgcGF0dGVybjogdGhpcy5zdGFuZGFyZFBhdHRlcm4sXG4gICAgICBtYXhMZW5ndGg6IDE2LFxuICAgICAgY3Z2TGVuZ3RoOiAzLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ21hc3RlcmNhcmQnLFxuICAgICAgZnVsbE5hbWU6ICdNYXN0ZXJjYXJkJyxcbiAgICAgIHJlOiAvXig1WzEtNV1cXGR7MCwyfXwyMlsyLTldXFxkezAsMX18MlszLTddXFxkezAsMn0pXFxkezAsMTJ9LyxcbiAgICAgIHBhdHRlcm46IHRoaXMuc3RhbmRhcmRQYXR0ZXJuLFxuICAgICAgbWF4TGVuZ3RoOiAxNixcbiAgICAgIGN2dkxlbmd0aDogMyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdhbWV4JyxcbiAgICAgIGZ1bGxOYW1lOiAnQW1lcmljYW4gRXhwcmVzcycsXG4gICAgICByZTogL14zWzQ3XVxcZHswLDEzfS8sXG4gICAgICBwYXR0ZXJuOiAvKFxcZHsxLDR9KShcXGR7MSw2fSk/KFxcZHsxLDV9KT8vLFxuICAgICAgbWF4TGVuZ3RoOiAxNSxcbiAgICAgIGN2dkxlbmd0aDogNCxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdqY2InLFxuICAgICAgZnVsbE5hbWU6ICdKQ0InLFxuICAgICAgcmU6IC9eKD86MzVcXGR7MCwyfSlcXGR7MCwxMn0vLFxuICAgICAgcGF0dGVybjogdGhpcy5zdGFuZGFyZFBhdHRlcm4sXG4gICAgICBtYXhMZW5ndGg6IDE2LFxuICAgICAgY3Z2TGVuZ3RoOiAzLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2Rpc2NvdmVyJyxcbiAgICAgIGZ1bGxOYW1lOiAnRGlzY292ZXInLFxuICAgICAgcmU6IC9eKD86NjAxMXw2NVxcZHswLDJ9fDY0WzQtOV1cXGQ/KVxcZHswLDEyfS8sXG4gICAgICBwYXR0ZXJuOiB0aGlzLnN0YW5kYXJkUGF0dGVybixcbiAgICAgIG1heExlbmd0aDogMTYsXG4gICAgICBjdnZMZW5ndGg6IDMsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnZGluZXJzLWNsdWInLFxuICAgICAgZnVsbE5hbWU6ICdEaW5lcnMgQ2x1YicsXG4gICAgICByZTogL14zKD86MChbMC01XXw5KXxbNjg5XVxcZD8pXFxkezAsMTF9LyxcbiAgICAgIHBhdHRlcm46IHRoaXMuc3RhbmRhcmRQYXR0ZXJuLFxuICAgICAgbWF4TGVuZ3RoOiAxNCxcbiAgICAgIGN2dkxlbmd0aDogMyxcbiAgICB9LFxuICBdO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBhZGRpdGlvbmFsQ2FyZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FkZGl0aW9uYWxDYXJkcztcbiAgfVxuICBzZXQgYWRkaXRpb25hbENhcmRzKGNhcmRzOiBDcmVkaXRDYXJkW10pIHtcbiAgICB0aGlzLl9hZGRpdGlvbmFsQ2FyZHMgPSBjYXJkcztcbiAgICB0aGlzLmFkZENhcmRzKGNhcmRzKTtcbiAgfVxuICBwcml2YXRlIF9hZGRpdGlvbmFsQ2FyZHM6IENyZWRpdENhcmRbXTtcblxuICBASW5wdXQoKVxuICBnZXQgc2VwYXJhdG9yKCkge1xuICAgIHJldHVybiB0aGlzLl9zZXBhcmF0b3I7XG4gIH1cbiAgc2V0IHNlcGFyYXRvcihzZXBhcmF0b3I6IHN0cmluZykge1xuICAgIHRoaXMuX3NlcGFyYXRvciA9IHNlcGFyYXRvcjtcbiAgfVxuICBwcml2YXRlIF9zZXBhcmF0b3IgPSAnICc7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5tYXhMZW5ndGgnKSBtYXhMZW5ndGg6IHN0cmluZztcblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gIG9uSW5wdXQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuZm9ybWF0SW5wdXQoZXZlbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXRJbnB1dChldmVudDogYW55KSB7XG4gICAgY29uc3QgaW5wdXQgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgY29uc3QgZm9ybWF0dGVkSW5wdXQgPSB0aGlzLmdldEZvcm1hdHRlZElucHV0KGlucHV0KTtcbiAgICBldmVudC50YXJnZXQudmFsdWUgPSBmb3JtYXR0ZWRJbnB1dDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Rm9ybWF0dGVkSW5wdXQodmFsdWU6IHN0cmluZykge1xuICAgIHZhbHVlID0gdGhpcy5yZW1vdmVOb25EaWdpdHModmFsdWUpO1xuICAgIGNvbnN0IGNhcmQgPSB0aGlzLmZpbmRDYXJkQnlOdW1iZXIodmFsdWUpO1xuXG4gICAgdGhpcy51cGRhdGVDdXJyZW50Q2FyZE5hbWVzKGNhcmQubmFtZSwgY2FyZC5mdWxsTmFtZSk7XG5cbiAgICBsZXQgY2FyZE51bU1heExlbmd0aDogbnVtYmVyO1xuXG4gICAgaWYgKHRoaXMuaGFzU3RhbmRhcmRQYXR0ZXJuKGNhcmQpKSB7XG4gICAgICBjb25zdCBtYXRjaGVzOiBSZWdFeHBNYXRjaEFycmF5IHwgbnVsbCA9IHZhbHVlLm1hdGNoKGNhcmQucGF0dGVybik7XG5cbiAgICAgIGlmIChtYXRjaGVzID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgY2FyZE51bU1heExlbmd0aCA9IGNhcmQubWF4TGVuZ3RoICsgbWF0Y2hlcy5sZW5ndGggLSAxO1xuICAgICAgdGhpcy5tYXhMZW5ndGggPSBjYXJkTnVtTWF4TGVuZ3RoLnRvU3RyaW5nKCk7XG4gICAgICByZXR1cm4gbWF0Y2hlcy5qb2luKHRoaXMuc2VwYXJhdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVzdWx0czogUmVnRXhwRXhlY0FycmF5IHwgbnVsbCA9IGNhcmQucGF0dGVybi5leGVjKHZhbHVlKTtcblxuICAgICAgaWYgKHJlc3VsdHMgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgICAgcmVzdWx0cy5zaGlmdCgpO1xuICAgICAgY2FyZE51bU1heExlbmd0aCA9IGNhcmQubWF4TGVuZ3RoICsgcmVzdWx0cy5sZW5ndGggLSAxO1xuICAgICAgdGhpcy5tYXhMZW5ndGggPSBjYXJkTnVtTWF4TGVuZ3RoLnRvU3RyaW5nKCk7XG4gICAgICByZXR1cm4gcmVzdWx0cy5maWx0ZXIodGhpcy5pc01hdGNoKS5qb2luKHRoaXMuc2VwYXJhdG9yKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZU5vbkRpZ2l0cyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIH1cblxuICBwcml2YXRlIGhhc1N0YW5kYXJkUGF0dGVybihjYXJkOiBDcmVkaXRDYXJkKSB7XG4gICAgcmV0dXJuIGNhcmQucGF0dGVybi50b1N0cmluZygpID09PSB0aGlzLnN0YW5kYXJkUGF0dGVybi50b1N0cmluZygpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc01hdGNoKG1hdGNoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbWF0Y2ggIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ3VycmVudENhcmROYW1lcyhuYW1lOiBzdHJpbmcsIGZ1bGxOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNhcmROYW1lID0gbmFtZTtcbiAgICB0aGlzLmNhcmRGdWxsTmFtZSA9IGZ1bGxOYW1lO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kQ2FyZEJ5TnVtYmVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjYXJkVHlwZSA9IHRoaXMuY2FyZHMuZmluZChjYXJkID0+IHtcbiAgICAgIHJldHVybiBjYXJkLnJlLnRlc3QodmFsdWUpO1xuICAgIH0pO1xuXG4gICAgaWYgKCFjYXJkVHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdENhcmQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhcmRUeXBlO1xuICB9XG5cbiAgcHVibGljIGFkZENhcmRzKG5ld0NhcmRzOiBDcmVkaXRDYXJkW10pIHtcbiAgICBuZXdDYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgdGhpcy5jYXJkcy5wdXNoKGNhcmQpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=