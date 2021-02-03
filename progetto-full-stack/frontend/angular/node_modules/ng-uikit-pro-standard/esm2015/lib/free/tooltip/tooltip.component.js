import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, ViewChild, ViewEncapsulation, } from '@angular/core';
import { TooltipConfig } from './tooltip.service';
import { isBs3 } from '../utils/ng2-bootstrap-config';
export class TooltipContainerComponent {
    constructor(config, elem) {
        this.elem = elem;
        this.containerClass = '';
        this.show = !this.isBs3;
        Object.assign(this, config);
    }
    get tooltipClasses() {
        return `tooltip-fadeIn tooltip in tooltip-${this.placement} bs-tooltip-${this.placement} ${this.placement} ${this.containerClass}`;
    }
    get isBs3() {
        return isBs3();
    }
    ngAfterViewInit() {
        this.classMap = { in: false, fade: false };
        this.classMap[this.placement] = true;
        this.classMap['tooltip-' + this.placement] = true;
        this.classMap.in = true;
        if (this.animation) {
            this.classMap.fade = true;
        }
        if (this.popupClass) {
            this.classMap[this.popupClass] = true;
        }
    }
}
TooltipContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-tooltip-container',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div #tooltipArrow class="tooltip-arrow arrow"></div>
    <div #tooltipInner class="tooltip-inner">
      <ng-content></ng-content>
    </div>
  `,
                encapsulation: ViewEncapsulation.None,
                styles: ["a .tooltip{display:block;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-size:.875rem;font-style:normal;font-weight:400;letter-spacing:normal;line-break:auto;line-height:1.5;opacity:0;position:absolute;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;white-space:normal;word-break:normal;word-spacing:normal;word-wrap:break-word;z-index:1070}a .tooltip.show{opacity:.9}a .tooltip.bs-tether-element-attached-bottom,a .tooltip.tooltip-top{margin-top:0;padding:.8rem 0}a .tooltip.bs-tether-element-attached-bottom .tooltip-inner:before,a .tooltip.tooltip-top .tooltip-inner:before{border-width:.8rem .8rem 0;bottom:0;content:\"\";left:50%;margin-left:-.8rem}a .tooltip.bs-tether-element-attached-left,a .tooltip.tooltip-right{margin-left:0;padding:0 .8rem}a .tooltip.bs-tether-element-attached-left .tooltip-inner:before,a .tooltip.tooltip-right .tooltip-inner:before{border-width:.8rem .8rem .8rem 0;content:\"\";left:0;margin-top:-.8rem;top:50%}a .tooltip.bs-tether-element-attached-top,a .tooltip.tooltip-bottom{margin-top:0;padding:.8rem 0}a .tooltip.bs-tether-element-attached-top .tooltip-inner:before,a .tooltip.tooltip-bottom .tooltip-inner:before{border-width:0 .8rem .8rem;content:\"\";left:50%;margin-left:-.8rem;top:0}a .tooltip.bs-tether-element-attached-right,a .tooltip.tooltip-left{margin-left:0;padding:0 .8rem}a .tooltip.bs-tether-element-attached-right .tooltip-inner:before,a .tooltip.tooltip-left .tooltip-inner:before{border-width:.8rem 0 .8rem .8rem;content:\"\";margin-top:-.8rem;right:0;top:50%}.tooltip-inner{border-radius:.25rem;box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);max-width:200px;padding:.2rem .4rem;text-align:center}.tooltip-inner:before{border-color:transparent;border-style:solid;height:0;position:absolute;width:0}@-webkit-keyframes fadeInTooltip{0%{opacity:0}to{opacity:1}}@keyframes fadeInTooltip{0%{opacity:0}to{opacity:1}}.tooltip-fadeIn{-webkit-animation-delay:.2s;-webkit-animation-duration:.2s;-webkit-animation-fill-mode:both;-webkit-animation-name:fadeInTooltip;animation-delay:.2s;animation-duration:.2s;animation-fill-mode:both;animation-name:fadeInTooltip}.single-tooltip{padding:.75rem 0 0}.single-tooltip a{padding:0!important}a[tooltip]{margin-left:0!important;padding:0 .5rem}.tooltip-arrow.left{margin-right:-.6rem;position:relative;transform:rotate(90deg)}.tooltip-arrow.right{margin-left:-.6rem;position:relative;transform:rotate(-90deg)}.tooltip-arrow.top{position:relative;transform:rotate(-180deg)}.tooltip-top{padding:.4rem 0}.tooltip-top .arrow{bottom:0}.tooltip-top .arrow:before{border-top-color:#000;border-width:.4rem .4rem 0;top:0}.tooltip-right{padding:0 .4rem}.tooltip-right .arrow{left:0}.tooltip-right .arrow:before{border-right-color:#000;border-width:.4rem .4rem .4rem 0;right:0}.tooltip-bottom{padding:.4rem 0}.tooltip-bottom .arrow{top:0}.tooltip-bottom .arrow:before{border-bottom-color:#000;border-width:0 .4rem .4rem;bottom:0}.tooltip-left{padding:0 .4rem}.tooltip-left .arrow{right:0}.tooltip-left .arrow:before{border-left-color:#000;border-width:.4rem 0 .4rem .4rem;left:0}.md-tooltip-email.show,.md-tooltip-main.show,.md-tooltip.show{opacity:1!important}.md-inner{background:rgba(97,97,97,.9)!important;border-radius:4px;font-size:10px;min-height:24px!important;padding:7px 8px}.md-arrow{display:none}.md-inner-main{background:rgba(97,97,97,.9)!important;border-radius:4px;font-size:14px;min-height:32px!important;padding:9px 16px}.md-tooltip,.md-tooltip-main{line-height:1}.md-inner-email{background-color:#232f34!important;border-radius:25px;font-size:12px;padding-left:12px;padding-right:12px}"]
            },] }
];
TooltipContainerComponent.ctorParameters = () => [
    { type: TooltipConfig },
    { type: ElementRef }
];
TooltipContainerComponent.propDecorators = {
    containerClass: [{ type: Input }],
    tooltipInner: [{ type: ViewChild, args: ['tooltipInner', { static: true },] }],
    tooltipArrow: [{ type: ViewChild, args: ['tooltipArrow', { static: true },] }],
    show: [{ type: HostBinding, args: ['class.show',] }],
    tooltipClasses: [{ type: HostBinding, args: ['class',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy11aWtpdC1wcm8tc3RhbmRhcmQvc3JjL2xpYi9mcmVlL3Rvb2x0aXAvdG9vbHRpcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFdBQVcsRUFDWCxLQUFLLEVBQ0wsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBY3RELE1BQU0sT0FBTyx5QkFBeUI7SUFtQnBDLFlBQW1CLE1BQXFCLEVBQVMsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQWJ4RCxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUdGLFNBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFXNUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQVhELElBQ0ksY0FBYztRQUNoQixPQUFPLHFDQUFxQyxJQUFJLENBQUMsU0FBUyxlQUFlLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDckksQ0FBQztJQUVELElBQVcsS0FBSztRQUNkLE9BQU8sS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQU1NLGVBQWU7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRWxELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQzNCO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUN2QztJQUNILENBQUM7OztZQWhERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7Ozs7R0FLVDtnQkFFRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7OztZQWRRLGFBQWE7WUFOcEIsVUFBVTs7OzZCQTJCVCxLQUFLOzJCQUNMLFNBQVMsU0FBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzJCQUMxQyxTQUFTLFNBQUMsY0FBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTttQkFDMUMsV0FBVyxTQUFDLFlBQVk7NkJBQ3hCLFdBQVcsU0FBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRvb2x0aXBDb25maWcgfSBmcm9tICcuL3Rvb2x0aXAuc2VydmljZSc7XG5pbXBvcnQgeyBpc0JzMyB9IGZyb20gJy4uL3V0aWxzL25nMi1ib290c3RyYXAtY29uZmlnJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLXRvb2x0aXAtY29udGFpbmVyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAjdG9vbHRpcEFycm93IGNsYXNzPVwidG9vbHRpcC1hcnJvdyBhcnJvd1wiPjwvZGl2PlxuICAgIDxkaXYgI3Rvb2x0aXBJbm5lciBjbGFzcz1cInRvb2x0aXAtaW5uZXJcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJ3Rvb2x0aXAtbW9kdWxlLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcENvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBwdWJsaWMgY2xhc3NNYXA6IGFueTtcbiAgcHVibGljIHBsYWNlbWVudDogc3RyaW5nO1xuICBwdWJsaWMgcG9wdXBDbGFzczogc3RyaW5nO1xuICBwdWJsaWMgYW5pbWF0aW9uOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGNvbnRhaW5lckNsYXNzID0gJyc7XG4gIEBWaWV3Q2hpbGQoJ3Rvb2x0aXBJbm5lcicsIHsgc3RhdGljOiB0cnVlIH0pIHRvb2x0aXBJbm5lcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgndG9vbHRpcEFycm93JywgeyBzdGF0aWM6IHRydWUgfSkgdG9vbHRpcEFycm93OiBFbGVtZW50UmVmO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNob3cnKSBzaG93ID0gIXRoaXMuaXNCczM7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgdG9vbHRpcENsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGB0b29sdGlwLWZhZGVJbiB0b29sdGlwIGluIHRvb2x0aXAtJHt0aGlzLnBsYWNlbWVudH0gYnMtdG9vbHRpcC0ke3RoaXMucGxhY2VtZW50fSAke3RoaXMucGxhY2VtZW50fSAke3RoaXMuY29udGFpbmVyQ2xhc3N9YDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNCczMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzQnMzKCk7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBUb29sdGlwQ29uZmlnLCBwdWJsaWMgZWxlbTogRWxlbWVudFJlZikge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29uZmlnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jbGFzc01hcCA9IHsgaW46IGZhbHNlLCBmYWRlOiBmYWxzZSB9O1xuICAgIHRoaXMuY2xhc3NNYXBbdGhpcy5wbGFjZW1lbnRdID0gdHJ1ZTtcbiAgICB0aGlzLmNsYXNzTWFwWyd0b29sdGlwLScgKyB0aGlzLnBsYWNlbWVudF0gPSB0cnVlO1xuXG4gICAgdGhpcy5jbGFzc01hcC5pbiA9IHRydWU7XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uKSB7XG4gICAgICB0aGlzLmNsYXNzTWFwLmZhZGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBvcHVwQ2xhc3MpIHtcbiAgICAgIHRoaXMuY2xhc3NNYXBbdGhpcy5wb3B1cENsYXNzXSA9IHRydWU7XG4gICAgfVxuICB9XG59XG4iXX0=