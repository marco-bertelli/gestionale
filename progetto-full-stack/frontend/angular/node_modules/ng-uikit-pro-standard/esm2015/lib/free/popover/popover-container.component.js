import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation, } from '@angular/core';
import { PopoverConfig } from './popover.config';
import { isBs3 } from '../utils/ng2-bootstrap-config';
export class PopoverContainerComponent {
    constructor(config) {
        this.show = '!isBs3';
        this.role = 'tooltip';
        Object.assign(this, config);
    }
    get isBs3() {
        return isBs3();
    }
    ngOnInit() {
        this.class =
            'popover-fadeIn popover in popover-' +
                this.placement +
                ' ' +
                this.placement +
                ' bs-popover-' +
                this.placement +
                ' ' +
                this.containerClass;
    }
}
PopoverContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mdb-popover-container',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <h3 class="popover-header" [ngClass]="headerClass" *ngIf="title">{{ title }}</h3>
    <div class="popover-body" [ngClass]="bodyClass">
      <ng-content></ng-content>
    </div>
  `,
                encapsulation: ViewEncapsulation.None,
                styles: [".popover.bs-tether-element-attached-bottom,.popover.popover-top{margin-top:-10px}.popover.bs-tether-element-attached-bottom:after,.popover.bs-tether-element-attached-bottom:before,.popover.popover-top:after,.popover.popover-top:before{border-bottom-width:0;left:50%}.popover.bs-tether-element-attached-bottom:before,.popover.popover-top:before{border-top-color:rgba(0,0,0,.25);bottom:-11px;margin-left:-11px}.popover.bs-tether-element-attached-bottom:after,.popover.popover-top:after{border-top-color:#fff;bottom:-10px;margin-left:-10px}.popover.bs-tether-element-attached-left,.popover.popover-right{margin-left:10px}.popover.bs-tether-element-attached-left:after,.popover.bs-tether-element-attached-left:before,.popover.popover-right:after,.popover.popover-right:before{border-left-width:0;top:50%}.popover.bs-tether-element-attached-left:before,.popover.popover-right:before{border-right-color:rgba(0,0,0,.25);left:-11px;margin-top:-11px}.popover.bs-tether-element-attached-left:after,.popover.popover-right:after{border-right-color:#fff;left:-10px;margin-top:-10px}.popover.bs-tether-element-attached-top,.popover.popover-bottom{margin-top:10px}.popover.bs-tether-element-attached-top:after,.popover.bs-tether-element-attached-top:before,.popover.popover-bottom:after,.popover.popover-bottom:before{border-top-width:0;left:50%}.popover.bs-tether-element-attached-top:before,.popover.popover-bottom:before{border-bottom-color:rgba(0,0,0,.25);margin-left:-11px;top:-11px}.popover.bs-tether-element-attached-top:after,.popover.popover-bottom:after{border-bottom-color:#f7f7f7;margin-left:-10px;top:-10px}.popover.bs-tether-element-attached-top .popover-title:before,.popover.popover-bottom .popover-title:before{border-bottom:1px solid #f7f7f7;content:\"\";display:block;left:50%;margin-left:-10px;position:absolute;top:0;width:20px}.popover.bs-tether-element-attached-right,.popover.popover-left{margin-left:-10px}.popover.bs-tether-element-attached-right:after,.popover.bs-tether-element-attached-right:before,.popover.popover-left:after,.popover.popover-left:before{border-right-width:0;top:50%}.popover.bs-tether-element-attached-right:before,.popover.popover-left:before{border-left-color:rgba(0,0,0,.25);margin-top:-11px;right:-11px}.popover.bs-tether-element-attached-right:after,.popover.popover-left:after{border-left-color:#fff;margin-top:-10px;right:-10px}.popover:after,.popover:before{border-color:transparent;border-style:solid;display:block;height:0;position:absolute;width:0}.popover:before{border-width:11px;content:\"\"}.popover:after{border-width:10px;content:\"\"}@-webkit-keyframes fadeInPopover{0%{opacity:0}to{opacity:1}}@keyframes fadeInPopover{0%{opacity:0}to{opacity:1}}.popover-fadeIn{-webkit-animation-delay:.2s;-webkit-animation-duration:.2s;-webkit-animation-fill-mode:both;-webkit-animation-name:fadeInPopover;animation-delay:.2s;animation-duration:.2s;animation-fill-mode:both;animation-name:fadeInPopover}"]
            },] }
];
PopoverContainerComponent.ctorParameters = () => [
    { type: PopoverConfig }
];
PopoverContainerComponent.propDecorators = {
    placement: [{ type: Input }],
    title: [{ type: Input }],
    show: [{ type: HostBinding, args: ['class.show',] }],
    role: [{ type: HostBinding, args: ['attr.role',] }],
    class: [{ type: HostBinding, args: ['class',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctdWlraXQtcHJvLXN0YW5kYXJkL3NyYy9saWIvZnJlZS9wb3BvdmVyL3BvcG92ZXItY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxXQUFXLEVBQ1gsS0FBSyxFQUVMLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBY3RELE1BQU0sT0FBTyx5QkFBeUI7SUFjcEMsWUFBbUIsTUFBcUI7UUFSYixTQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ2pCLFNBQUksR0FBRyxTQUFTLENBQUM7UUFRekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQU5ELElBQVcsS0FBSztRQUNkLE9BQU8sS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQU1ELFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSztZQUNSLG9DQUFvQztnQkFDcEMsSUFBSSxDQUFDLFNBQVM7Z0JBQ2QsR0FBRztnQkFDSCxJQUFJLENBQUMsU0FBUztnQkFDZCxjQUFjO2dCQUNkLElBQUksQ0FBQyxTQUFTO2dCQUNkLEdBQUc7Z0JBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUN4QixDQUFDOzs7WUF4Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxRQUFRLEVBQUU7Ozs7O0dBS1Q7Z0JBRUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7WUFkUSxhQUFhOzs7d0JBZ0JuQixLQUFLO29CQUNMLEtBQUs7bUJBSUwsV0FBVyxTQUFDLFlBQVk7bUJBQ3hCLFdBQVcsU0FBQyxXQUFXO29CQUV2QixXQUFXLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb3BvdmVyQ29uZmlnIH0gZnJvbSAnLi9wb3BvdmVyLmNvbmZpZyc7XG5pbXBvcnQgeyBpc0JzMyB9IGZyb20gJy4uL3V0aWxzL25nMi1ib290c3RyYXAtY29uZmlnJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLXBvcG92ZXItY29udGFpbmVyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGgzIGNsYXNzPVwicG9wb3Zlci1oZWFkZXJcIiBbbmdDbGFzc109XCJoZWFkZXJDbGFzc1wiICpuZ0lmPVwidGl0bGVcIj57eyB0aXRsZSB9fTwvaDM+XG4gICAgPGRpdiBjbGFzcz1cInBvcG92ZXItYm9keVwiIFtuZ0NsYXNzXT1cImJvZHlDbGFzc1wiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9wb3BvdmVyLW1vZHVsZS5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBwdWJsaWMgcGxhY2VtZW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICBwdWJsaWMgY29udGFpbmVyQ2xhc3M6IHN0cmluZztcbiAgcHVibGljIGJvZHlDbGFzczogc3RyaW5nO1xuICBwdWJsaWMgaGVhZGVyQ2xhc3M6IHN0cmluZztcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaG93Jykgc2hvdyA9ICchaXNCczMnO1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpIHJvbGUgPSAndG9vbHRpcCc7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIGNsYXNzOiBhbnk7XG4gIHB1YmxpYyBnZXQgaXNCczMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzQnMzKCk7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBQb3BvdmVyQ29uZmlnKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWcpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jbGFzcyA9XG4gICAgICAncG9wb3Zlci1mYWRlSW4gcG9wb3ZlciBpbiBwb3BvdmVyLScgK1xuICAgICAgdGhpcy5wbGFjZW1lbnQgK1xuICAgICAgJyAnICtcbiAgICAgIHRoaXMucGxhY2VtZW50ICtcbiAgICAgICcgYnMtcG9wb3Zlci0nICtcbiAgICAgIHRoaXMucGxhY2VtZW50ICtcbiAgICAgICcgJyArXG4gICAgICB0aGlzLmNvbnRhaW5lckNsYXNzO1xuICB9XG59XG4iXX0=