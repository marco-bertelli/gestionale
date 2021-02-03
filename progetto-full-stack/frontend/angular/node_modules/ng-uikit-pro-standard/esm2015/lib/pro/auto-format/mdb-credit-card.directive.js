import { Directive, HostListener, Input, HostBinding } from '@angular/core';
export class MdbCreditCardDirective {
    constructor() {
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
    get additionalCards() {
        return this._additionalCards;
    }
    set additionalCards(cards) {
        this._additionalCards = cards;
        this.addCards(cards);
    }
    get separator() {
        return this._separator;
    }
    set separator(separator) {
        this._separator = separator;
    }
    onInput(event) {
        this.formatInput(event);
    }
    formatInput(event) {
        const input = event.target.value;
        const formattedInput = this.getFormattedInput(input);
        event.target.value = formattedInput;
    }
    getFormattedInput(value) {
        value = this.removeNonDigits(value);
        const card = this.findCardByNumber(value);
        this.updateCurrentCardNames(card.name, card.fullName);
        let cardNumMaxLength;
        if (this.hasStandardPattern(card)) {
            const matches = value.match(card.pattern);
            if (matches === null) {
                return value;
            }
            cardNumMaxLength = card.maxLength + matches.length - 1;
            this.maxLength = cardNumMaxLength.toString();
            return matches.join(this.separator);
        }
        else {
            const results = card.pattern.exec(value);
            if (results === null) {
                return value;
            }
            results.shift();
            cardNumMaxLength = card.maxLength + results.length - 1;
            this.maxLength = cardNumMaxLength.toString();
            return results.filter(this.isMatch).join(this.separator);
        }
    }
    removeNonDigits(value) {
        return value.replace(/\D/g, '');
    }
    hasStandardPattern(card) {
        return card.pattern.toString() === this.standardPattern.toString();
    }
    isMatch(match) {
        return match !== undefined;
    }
    updateCurrentCardNames(name, fullName) {
        this.cardName = name;
        this.cardFullName = fullName;
    }
    findCardByNumber(value) {
        const cardType = this.cards.find(card => {
            return card.re.test(value);
        });
        if (!cardType) {
            return this.defaultCard;
        }
        return cardType;
    }
    addCards(newCards) {
        newCards.forEach(card => {
            this.cards.push(card);
        });
    }
}
MdbCreditCardDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mdbCreditCard]',
                exportAs: 'mdbCreditCard',
            },] }
];
MdbCreditCardDirective.ctorParameters = () => [];
MdbCreditCardDirective.propDecorators = {
    additionalCards: [{ type: Input }],
    separator: [{ type: Input }],
    maxLength: [{ type: HostBinding, args: ['attr.maxLength',] }],
    onInput: [{ type: HostListener, args: ['input', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLWNyZWRpdC1jYXJkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXVpa2l0LXByby1zdGFuZGFyZC9zcmMvbGliL3Byby9hdXRvLWZvcm1hdC9tZGItY3JlZGl0LWNhcmQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFlNUUsTUFBTSxPQUFPLHNCQUFzQjtJQW9GakM7UUFuRlEsb0JBQWUsR0FBRyxZQUFZLENBQUM7UUFJL0IsZ0JBQVcsR0FBZTtZQUNoQyxJQUFJLEVBQUUsRUFBRTtZQUNSLFFBQVEsRUFBRSxFQUFFO1lBQ1osRUFBRSxFQUFFLFVBQVU7WUFDZCxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDN0IsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsQ0FBQztTQUNiLENBQUM7UUFFTSxVQUFLLEdBQWlCO1lBQzVCO2dCQUNFLElBQUksRUFBRSxNQUFNO2dCQUNaLFFBQVEsRUFBRSxNQUFNO2dCQUNoQixFQUFFLEVBQUUsWUFBWTtnQkFDaEIsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlO2dCQUM3QixTQUFTLEVBQUUsRUFBRTtnQkFDYixTQUFTLEVBQUUsQ0FBQzthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixFQUFFLEVBQUUsdURBQXVEO2dCQUMzRCxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWU7Z0JBQzdCLFNBQVMsRUFBRSxFQUFFO2dCQUNiLFNBQVMsRUFBRSxDQUFDO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixFQUFFLEVBQUUsZ0JBQWdCO2dCQUNwQixPQUFPLEVBQUUs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QUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRU0sUUFBUSxDQUFDLFFBQXNCO1FBQ3BDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUF2S0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRSxlQUFlO2FBQzFCOzs7OzhCQWtFRSxLQUFLO3dCQVVMLEtBQUs7d0JBV0wsV0FBVyxTQUFDLGdCQUFnQjtzQkFFNUIsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBDcmVkaXRDYXJkIHtcbiAgbmFtZTogc3RyaW5nO1xuICBmdWxsTmFtZTogc3RyaW5nO1xuICByZTogUmVnRXhwO1xuICBwYXR0ZXJuOiBSZWdFeHA7XG4gIG1heExlbmd0aDogbnVtYmVyO1xuICBjdnZMZW5ndGg6IG51bWJlcjtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21kYkNyZWRpdENhcmRdJyxcbiAgZXhwb3J0QXM6ICdtZGJDcmVkaXRDYXJkJyxcbn0pXG5leHBvcnQgY2xhc3MgTWRiQ3JlZGl0Q2FyZERpcmVjdGl2ZSB7XG4gIHByaXZhdGUgc3RhbmRhcmRQYXR0ZXJuID0gLyhcXGR7MSw0fSkvZztcbiAgY2FyZE5hbWU6IHN0cmluZztcbiAgY2FyZEZ1bGxOYW1lOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBkZWZhdWx0Q2FyZDogQ3JlZGl0Q2FyZCA9IHtcbiAgICBuYW1lOiAnJyxcbiAgICBmdWxsTmFtZTogJycsXG4gICAgcmU6IC9cXGR7MCwxNn0vLFxuICAgIHBhdHRlcm46IHRoaXMuc3RhbmRhcmRQYXR0ZXJuLFxuICAgIG1heExlbmd0aDogMTksXG4gICAgY3Z2TGVuZ3RoOiAzLFxuICB9O1xuXG4gIHByaXZhdGUgY2FyZHM6IENyZWRpdENhcmRbXSA9IFtcbiAgICB7XG4gICAgICBuYW1lOiAndmlzYScsXG4gICAgICBmdWxsTmFtZTogJ1Zpc2EnLFxuICAgICAgcmU6IC9eNFxcZHswLDE1fS8sXG4gICAgICBwYXR0ZXJuOiB0aGlzLnN0YW5kYXJkUGF0dGVybixcbiAgICAgIG1heExlbmd0aDogMTYsXG4gICAgICBjdnZMZW5ndGg6IDMsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnbWFzdGVyY2FyZCcsXG4gICAgICBmdWxsTmFtZTogJ01hc3RlcmNhcmQnLFxuICAgICAgcmU6IC9eKDVbMS01XVxcZHswLDJ9fDIyWzItOV1cXGR7MCwxfXwyWzMtN11cXGR7MCwyfSlcXGR7MCwxMn0vLFxuICAgICAgcGF0dGVybjogdGhpcy5zdGFuZGFyZFBhdHRlcm4sXG4gICAgICBtYXhMZW5ndGg6IDE2LFxuICAgICAgY3Z2TGVuZ3RoOiAzLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2FtZXgnLFxuICAgICAgZnVsbE5hbWU6ICdBbWVyaWNhbiBFeHByZXNzJyxcbiAgICAgIHJlOiAvXjNbNDddXFxkezAsMTN9LyxcbiAgICAgIHBhdHRlcm46IC8oXFxkezEsNH0pKFxcZHsxLDZ9KT8oXFxkezEsNX0pPy8sXG4gICAgICBtYXhMZW5ndGg6IDE1LFxuICAgICAgY3Z2TGVuZ3RoOiA0LFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2pjYicsXG4gICAgICBmdWxsTmFtZTogJ0pDQicsXG4gICAgICByZTogL14oPzozNVxcZHswLDJ9KVxcZHswLDEyfS8sXG4gICAgICBwYXR0ZXJuOiB0aGlzLnN0YW5kYXJkUGF0dGVybixcbiAgICAgIG1heExlbmd0aDogMTYsXG4gICAgICBjdnZMZW5ndGg6IDMsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnZGlzY292ZXInLFxuICAgICAgZnVsbE5hbWU6ICdEaXNjb3ZlcicsXG4gICAgICByZTogL14oPzo2MDExfDY1XFxkezAsMn18NjRbNC05XVxcZD8pXFxkezAsMTJ9LyxcbiAgICAgIHBhdHRlcm46IHRoaXMuc3RhbmRhcmRQYXR0ZXJuLFxuICAgICAgbWF4TGVuZ3RoOiAxNixcbiAgICAgIGN2dkxlbmd0aDogMyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdkaW5lcnMtY2x1YicsXG4gICAgICBmdWxsTmFtZTogJ0RpbmVycyBDbHViJyxcbiAgICAgIHJlOiAvXjMoPzowKFswLTVdfDkpfFs2ODldXFxkPylcXGR7MCwxMX0vLFxuICAgICAgcGF0dGVybjogdGhpcy5zdGFuZGFyZFBhdHRlcm4sXG4gICAgICBtYXhMZW5ndGg6IDE0LFxuICAgICAgY3Z2TGVuZ3RoOiAzLFxuICAgIH0sXG4gIF07XG5cbiAgQElucHV0KClcbiAgZ2V0IGFkZGl0aW9uYWxDYXJkcygpIHtcbiAgICByZXR1cm4gdGhpcy5fYWRkaXRpb25hbENhcmRzO1xuICB9XG4gIHNldCBhZGRpdGlvbmFsQ2FyZHMoY2FyZHM6IENyZWRpdENhcmRbXSkge1xuICAgIHRoaXMuX2FkZGl0aW9uYWxDYXJkcyA9IGNhcmRzO1xuICAgIHRoaXMuYWRkQ2FyZHMoY2FyZHMpO1xuICB9XG4gIHByaXZhdGUgX2FkZGl0aW9uYWxDYXJkczogQ3JlZGl0Q2FyZFtdO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBzZXBhcmF0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlcGFyYXRvcjtcbiAgfVxuICBzZXQgc2VwYXJhdG9yKHNlcGFyYXRvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fc2VwYXJhdG9yID0gc2VwYXJhdG9yO1xuICB9XG4gIHByaXZhdGUgX3NlcGFyYXRvciA9ICcgJztcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLm1heExlbmd0aCcpIG1heExlbmd0aDogc3RyaW5nO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgb25JbnB1dChldmVudDogYW55KSB7XG4gICAgdGhpcy5mb3JtYXRJbnB1dChldmVudCk7XG4gIH1cblxuICBwcml2YXRlIGZvcm1hdElucHV0KGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBpbnB1dCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICBjb25zdCBmb3JtYXR0ZWRJbnB1dCA9IHRoaXMuZ2V0Rm9ybWF0dGVkSW5wdXQoaW5wdXQpO1xuICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9IGZvcm1hdHRlZElucHV0O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGb3JtYXR0ZWRJbnB1dCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdmFsdWUgPSB0aGlzLnJlbW92ZU5vbkRpZ2l0cyh2YWx1ZSk7XG4gICAgY29uc3QgY2FyZCA9IHRoaXMuZmluZENhcmRCeU51bWJlcih2YWx1ZSk7XG5cbiAgICB0aGlzLnVwZGF0ZUN1cnJlbnRDYXJkTmFtZXMoY2FyZC5uYW1lLCBjYXJkLmZ1bGxOYW1lKTtcblxuICAgIGxldCBjYXJkTnVtTWF4TGVuZ3RoOiBudW1iZXI7XG5cbiAgICBpZiAodGhpcy5oYXNTdGFuZGFyZFBhdHRlcm4oY2FyZCkpIHtcbiAgICAgIGNvbnN0IG1hdGNoZXM6IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsID0gdmFsdWUubWF0Y2goY2FyZC5wYXR0ZXJuKTtcblxuICAgICAgaWYgKG1hdGNoZXMgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuXG4gICAgICBjYXJkTnVtTWF4TGVuZ3RoID0gY2FyZC5tYXhMZW5ndGggKyBtYXRjaGVzLmxlbmd0aCAtIDE7XG4gICAgICB0aGlzLm1heExlbmd0aCA9IGNhcmROdW1NYXhMZW5ndGgudG9TdHJpbmcoKTtcbiAgICAgIHJldHVybiBtYXRjaGVzLmpvaW4odGhpcy5zZXBhcmF0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByZXN1bHRzOiBSZWdFeHBFeGVjQXJyYXkgfCBudWxsID0gY2FyZC5wYXR0ZXJuLmV4ZWModmFsdWUpO1xuXG4gICAgICBpZiAocmVzdWx0cyA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgICByZXN1bHRzLnNoaWZ0KCk7XG4gICAgICBjYXJkTnVtTWF4TGVuZ3RoID0gY2FyZC5tYXhMZW5ndGggKyByZXN1bHRzLmxlbmd0aCAtIDE7XG4gICAgICB0aGlzLm1heExlbmd0aCA9IGNhcmROdW1NYXhMZW5ndGgudG9TdHJpbmcoKTtcbiAgICAgIHJldHVybiByZXN1bHRzLmZpbHRlcih0aGlzLmlzTWF0Y2gpLmpvaW4odGhpcy5zZXBhcmF0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlTm9uRGlnaXRzKHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFzU3RhbmRhcmRQYXR0ZXJuKGNhcmQ6IENyZWRpdENhcmQpIHtcbiAgICByZXR1cm4gY2FyZC5wYXR0ZXJuLnRvU3RyaW5nKCkgPT09IHRoaXMuc3RhbmRhcmRQYXR0ZXJuLnRvU3RyaW5nKCk7XG4gIH1cblxuICBwcml2YXRlIGlzTWF0Y2gobWF0Y2g6IHN0cmluZykge1xuICAgIHJldHVybiBtYXRjaCAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDdXJyZW50Q2FyZE5hbWVzKG5hbWU6IHN0cmluZywgZnVsbE5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuY2FyZE5hbWUgPSBuYW1lO1xuICAgIHRoaXMuY2FyZEZ1bGxOYW1lID0gZnVsbE5hbWU7XG4gIH1cblxuICBwcml2YXRlIGZpbmRDYXJkQnlOdW1iZXIodmFsdWU6IHN0cmluZykge1xuICAgIGNvbnN0IGNhcmRUeXBlID0gdGhpcy5jYXJkcy5maW5kKGNhcmQgPT4ge1xuICAgICAgcmV0dXJuIGNhcmQucmUudGVzdCh2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWNhcmRUeXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWZhdWx0Q2FyZDtcbiAgICB9XG5cbiAgICByZXR1cm4gY2FyZFR5cGU7XG4gIH1cblxuICBwdWJsaWMgYWRkQ2FyZHMobmV3Q2FyZHM6IENyZWRpdENhcmRbXSkge1xuICAgIG5ld0NhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICB0aGlzLmNhcmRzLnB1c2goY2FyZCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==