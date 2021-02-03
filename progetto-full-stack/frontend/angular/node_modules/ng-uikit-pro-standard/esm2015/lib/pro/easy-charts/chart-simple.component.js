import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, } from '@angular/core';
export class SimpleChartComponent {
    constructor() {
        this.options = {
            barColor: null,
            trackColor: null,
            scaleColor: null,
            scaleLength: '',
            lineCap: null,
            lineWidth: null,
            trackWidth: null,
            size: null,
            rotate: null,
            duration: null,
            enableAnimation: null,
            animate: {
                duration: 1000,
                enabled: true,
            },
        };
    }
    ngOnInit() {
        this.options.barColor = '#' + this.barColor;
        this.options.trackColor = '#' + this.trackColor;
        this.options.scaleColor = '#' + this.scaleColor;
        this.options.scaleLength = this.scaleLength;
        this.options.lineCap = this.lineCap;
        this.options.lineWidth = this.lineWidth;
        this.options.trackWidth = this.trackWidth;
        this.options.size = this.size;
        this.options.rotate = this.rotate;
        this.options.animate.duration = this.animate.duration;
        this.options.animate.enabled = this.animate.enabled;
    }
}
SimpleChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-simple-chart',
                template: "<span class=\"min-chart\">\n  <span \n  *ngIf=\"customText\"  \n  class=\"chart-custom-text\"\n  [ngStyle]=\"{\n  'line-height': size + 'px',\n  'width': size + 'px',\n  'height': size + 'px'}\">{{ customText }}</span>\n  <span \n  *ngIf=\"!customText\" \n  class=\"percent\">{{ percent }}</span>\n  <mdb-easy-pie-chart [percent]=\"percent\" [options]=\"options\"></mdb-easy-pie-chart>\n</span>",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".min-chart{display:inline-block;height:110px;margin-bottom:50px;margin-top:50px;position:relative;text-align:center;width:110px}.min-chart canvas{left:0;position:absolute;top:0}.min-chart .percent{display:inline-block;line-height:110px;z-index:2}.min-chart .percent:after{content:\"%\";font-size:.8rem;margin-left:.1em}.chart-custom-text{display:inline-block;overflow:hidden;z-index:2}"]
            },] }
];
SimpleChartComponent.ctorParameters = () => [];
SimpleChartComponent.propDecorators = {
    customText: [{ type: Input }],
    percent: [{ type: Input }],
    barColor: [{ type: Input }],
    trackColor: [{ type: Input }],
    scaleColor: [{ type: Input }],
    scaleLength: [{ type: Input }],
    lineCap: [{ type: Input }],
    lineWidth: [{ type: Input }],
    trackWidth: [{ type: Input }],
    size: [{ type: Input }],
    rotate: [{ type: Input }],
    animate: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtc2ltcGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXVpa2l0LXByby1zdGFuZGFyZC9zcmMvbGliL3Byby9lYXN5LWNoYXJ0cy9jaGFydC1zaW1wbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLGlCQUFpQixFQUNqQix1QkFBdUIsR0FDeEIsTUFBTSxlQUFlLENBQUM7QUFTdkIsTUFBTSxPQUFPLG9CQUFvQjtJQStCL0I7UUFsQk8sWUFBTyxHQUFRO1lBQ3BCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsVUFBVSxFQUFFLElBQUk7WUFDaEIsVUFBVSxFQUFFLElBQUk7WUFDaEIsV0FBVyxFQUFFLEVBQUU7WUFDZixPQUFPLEVBQUUsSUFBSTtZQUNiLFNBQVMsRUFBRSxJQUFJO1lBQ2YsVUFBVSxFQUFFLElBQUk7WUFDaEIsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsSUFBSTtZQUNaLFFBQVEsRUFBRSxJQUFJO1lBQ2QsZUFBZSxFQUFFLElBQUk7WUFDckIsT0FBTyxFQUFFO2dCQUNQLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxJQUFJO2FBQ2Q7U0FDRixDQUFDO0lBRWEsQ0FBQztJQUVoQixRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3RELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUN0RCxDQUFDOzs7WUFwREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLHNaQUE0QztnQkFFNUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7Ozt5QkFFRSxLQUFLO3NCQUNMLEtBQUs7dUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7MEJBQ0wsS0FBSztzQkFDTCxLQUFLO3dCQUNMLEtBQUs7eUJBQ0wsS0FBSzttQkFDTCxLQUFLO3FCQUNMLEtBQUs7c0JBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLXNpbXBsZS1jaGFydCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jaGFydC1zaW1wbGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9lYXN5LWNoYXJ0cy1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgU2ltcGxlQ2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBjdXN0b21UZXh0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBlcmNlbnQ6IG51bWJlcjtcbiAgQElucHV0KCkgYmFyQ29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgdHJhY2tDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSBzY2FsZUNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNjYWxlTGVuZ3RoOiBudW1iZXI7XG4gIEBJbnB1dCgpIGxpbmVDYXA6IHN0cmluZztcbiAgQElucHV0KCkgbGluZVdpZHRoOiBudW1iZXI7XG4gIEBJbnB1dCgpIHRyYWNrV2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgc2l6ZTogbnVtYmVyO1xuICBASW5wdXQoKSByb3RhdGU6IG51bWJlcjtcbiAgQElucHV0KCkgYW5pbWF0ZTogeyBkdXJhdGlvbjogc3RyaW5nOyBlbmFibGVkOiBib29sZWFuIH07XG4gIHB1YmxpYyBvcHRpb25zOiBhbnkgPSB7XG4gICAgYmFyQ29sb3I6IG51bGwsXG4gICAgdHJhY2tDb2xvcjogbnVsbCxcbiAgICBzY2FsZUNvbG9yOiBudWxsLFxuICAgIHNjYWxlTGVuZ3RoOiAnJyxcbiAgICBsaW5lQ2FwOiBudWxsLFxuICAgIGxpbmVXaWR0aDogbnVsbCxcbiAgICB0cmFja1dpZHRoOiBudWxsLFxuICAgIHNpemU6IG51bGwsXG4gICAgcm90YXRlOiBudWxsLFxuICAgIGR1cmF0aW9uOiBudWxsLFxuICAgIGVuYWJsZUFuaW1hdGlvbjogbnVsbCxcbiAgICBhbmltYXRlOiB7XG4gICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgfSxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zLmJhckNvbG9yID0gJyMnICsgdGhpcy5iYXJDb2xvcjtcbiAgICB0aGlzLm9wdGlvbnMudHJhY2tDb2xvciA9ICcjJyArIHRoaXMudHJhY2tDb2xvcjtcbiAgICB0aGlzLm9wdGlvbnMuc2NhbGVDb2xvciA9ICcjJyArIHRoaXMuc2NhbGVDb2xvcjtcbiAgICB0aGlzLm9wdGlvbnMuc2NhbGVMZW5ndGggPSB0aGlzLnNjYWxlTGVuZ3RoO1xuICAgIHRoaXMub3B0aW9ucy5saW5lQ2FwID0gdGhpcy5saW5lQ2FwO1xuICAgIHRoaXMub3B0aW9ucy5saW5lV2lkdGggPSB0aGlzLmxpbmVXaWR0aDtcbiAgICB0aGlzLm9wdGlvbnMudHJhY2tXaWR0aCA9IHRoaXMudHJhY2tXaWR0aDtcbiAgICB0aGlzLm9wdGlvbnMuc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgICB0aGlzLm9wdGlvbnMucm90YXRlID0gdGhpcy5yb3RhdGU7XG4gICAgdGhpcy5vcHRpb25zLmFuaW1hdGUuZHVyYXRpb24gPSB0aGlzLmFuaW1hdGUuZHVyYXRpb247XG4gICAgdGhpcy5vcHRpb25zLmFuaW1hdGUuZW5hYmxlZCA9IHRoaXMuYW5pbWF0ZS5lbmFibGVkO1xuICB9XG59XG4iXX0=