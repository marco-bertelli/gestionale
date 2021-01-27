/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
var Trigger = /** @class */ (function () {
    function Trigger(open, close) {
        this.open = open;
        this.close = close || open;
    }
    Trigger.prototype.isManual = function () {
        return this.open === 'manual' || this.close === 'manual';
    };
    return Trigger;
}());
export { Trigger };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlci5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9mcmVlL3V0aWxpdGllcy90cmlnZ2VyLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVIO0lBSUUsaUJBQVksSUFBWSxFQUFFLEtBQWM7UUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFRCwwQkFBUSxHQUFSO1FBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQztJQUMzRCxDQUFDO0lBQ0gsY0FBQztBQUFELENBQUMsQUFaRCxJQVlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAY29weXJpZ2h0IFZhbG9yIFNvZnR3YXJlXG4gKiBAY29weXJpZ2h0IEFuZ3VsYXIgbmctYm9vdHN0cmFwIHRlYW1cbiAqL1xuXG5leHBvcnQgY2xhc3MgVHJpZ2dlciB7XG4gIG9wZW46IHN0cmluZztcbiAgY2xvc2U/OiBhbnk7XG5cbiAgY29uc3RydWN0b3Iob3Blbjogc3RyaW5nLCBjbG9zZT86IHN0cmluZykge1xuICAgIHRoaXMub3BlbiA9IG9wZW47XG4gICAgdGhpcy5jbG9zZSA9IGNsb3NlIHx8IG9wZW47XG4gIH1cblxuICBpc01hbnVhbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vcGVuID09PSAnbWFudWFsJyB8fCB0aGlzLmNsb3NlID09PSAnbWFudWFsJztcbiAgfVxufVxuIl19