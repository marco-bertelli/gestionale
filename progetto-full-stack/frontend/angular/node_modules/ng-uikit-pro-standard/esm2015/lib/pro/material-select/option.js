export class Option {
    constructor(option) {
        this.wrappedOption = option;
        this.disabled = false;
        this.highlighted = false;
        this.selected = false;
        this.shown = true;
        this.group = false;
    }
    get value() {
        return this.wrappedOption.value;
    }
    get label() {
        return this.wrappedOption.label;
    }
    get icon() {
        if (this.wrappedOption.icon !== '' && this.wrappedOption.icon !== undefined) {
            return this.wrappedOption.icon;
        }
        else {
            return '';
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctdWlraXQtcHJvLXN0YW5kYXJkL3NyYy9saWIvcHJvL21hdGVyaWFsLXNlbGVjdC9vcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxPQUFPLE1BQU07SUFXakIsWUFBWSxNQUFlO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBRTVCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDM0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztTQUNoQzthQUFNO1lBQ0wsT0FBTyxFQUFFLENBQUM7U0FDWDtJQUVILENBQUM7Q0FFRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SU9wdGlvbn0gZnJvbSAnLi9vcHRpb24taW50ZXJmYWNlJztcblxuZXhwb3J0IGNsYXNzIE9wdGlvbiB7XG5cbiAgd3JhcHBlZE9wdGlvbjogSU9wdGlvbjtcblxuICBkaXNhYmxlZDogYm9vbGVhbjtcbiAgaGlnaGxpZ2h0ZWQ6IGJvb2xlYW47XG4gIHNlbGVjdGVkOiBib29sZWFuO1xuICBob3ZlcmVkPzogYm9vbGVhbjtcbiAgc2hvd246IGJvb2xlYW47XG4gIGdyb3VwOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbjogSU9wdGlvbikge1xuICAgIHRoaXMud3JhcHBlZE9wdGlvbiA9IG9wdGlvbjtcblxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmhpZ2hsaWdodGVkID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd24gPSB0cnVlO1xuICAgIHRoaXMuZ3JvdXAgPSBmYWxzZTtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLndyYXBwZWRPcHRpb24udmFsdWU7XG4gIH1cblxuICBnZXQgbGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy53cmFwcGVkT3B0aW9uLmxhYmVsO1xuICB9XG5cbiAgZ2V0IGljb24oKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy53cmFwcGVkT3B0aW9uLmljb24gIT09ICcnICYmIHRoaXMud3JhcHBlZE9wdGlvbi5pY29uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLndyYXBwZWRPcHRpb24uaWNvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICB9XG5cbn1cblxuIl19