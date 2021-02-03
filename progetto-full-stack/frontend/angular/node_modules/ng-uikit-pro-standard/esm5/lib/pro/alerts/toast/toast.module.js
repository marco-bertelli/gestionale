import { __decorate, __metadata, __param } from "tslib";
import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { TOAST_CONFIG } from './toast.token';
import { ToastService } from './toast.service';
import { OverlayContainer } from '../overlay/overlay-container';
import { Overlay } from '../overlay/overlay';
var ToastModule = /** @class */ (function () {
    function ToastModule(parentModule) {
        if (parentModule) {
            throw new Error(
            // tslint:disable-next-line: quotemark
            "ToastModule is already loaded. It should only be imported in your application's main module.");
        }
    }
    ToastModule_1 = ToastModule;
    ToastModule.forRoot = function (config) {
        return {
            ngModule: ToastModule_1,
            providers: [
                { provide: TOAST_CONFIG, useValue: config },
                OverlayContainer,
                Overlay,
                ToastService,
            ],
        };
    };
    var ToastModule_1;
    ToastModule.ctorParameters = function () { return [
        { type: ToastModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    ToastModule = ToastModule_1 = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [ToastComponent],
            declarations: [ToastComponent],
            entryComponents: [ToastComponent],
        }),
        __param(0, Optional()), __param(0, SkipSelf()),
        __metadata("design:paramtypes", [ToastModule])
    ], ToastModule);
    return ToastModule;
}());
export { ToastModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctdWlraXQtcHJvLXN0YW5kYXJkLyIsInNvdXJjZXMiOlsibGliL3Byby9hbGVydHMvdG9hc3QvdG9hc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBUTdDO0lBWUUscUJBQW9DLFlBQXlCO1FBQzNELElBQUksWUFBWSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLO1lBQ2Isc0NBQXNDO1lBQ3RDLDhGQUE4RixDQUMvRixDQUFDO1NBQ0g7SUFDSCxDQUFDO29CQW5CVSxXQUFXO0lBQ2YsbUJBQU8sR0FBZCxVQUFlLE1BQXFCO1FBQ2xDLE9BQU87WUFDTCxRQUFRLEVBQUUsYUFBVztZQUNyQixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7Z0JBQzNDLGdCQUFnQjtnQkFDaEIsT0FBTztnQkFDUCxZQUFZO2FBQ2I7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O2dCQUNpRCxXQUFXLHVCQUFoRCxRQUFRLFlBQUksUUFBUTs7SUFadEIsV0FBVztRQU52QixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ3pCLFlBQVksRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUM5QixlQUFlLEVBQUUsQ0FBQyxjQUFjLENBQUM7U0FDbEMsQ0FBQztRQWFhLFdBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLFFBQVEsRUFBRSxDQUFBO3lDQUFlLFdBQVc7T0FabEQsV0FBVyxDQW9CdkI7SUFBRCxrQkFBQztDQUFBLEFBcEJELElBb0JDO1NBcEJZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgU2tpcFNlbGYsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBUb2FzdENvbXBvbmVudCB9IGZyb20gJy4vdG9hc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFRPQVNUX0NPTkZJRyB9IGZyb20gJy4vdG9hc3QudG9rZW4nO1xuaW1wb3J0IHsgVG9hc3RTZXJ2aWNlIH0gZnJvbSAnLi90b2FzdC5zZXJ2aWNlJztcbmltcG9ydCB7IEdsb2JhbENvbmZpZyB9IGZyb20gJy4vdG9hc3QuY29uZmlnJztcbmltcG9ydCB7IE92ZXJsYXlDb250YWluZXIgfSBmcm9tICcuLi9vdmVybGF5L292ZXJsYXktY29udGFpbmVyJztcbmltcG9ydCB7IE92ZXJsYXkgfSBmcm9tICcuLi9vdmVybGF5L292ZXJsYXknO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW1RvYXN0Q29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbVG9hc3RDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtUb2FzdENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0TW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogR2xvYmFsQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxUb2FzdE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVG9hc3RNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBUT0FTVF9DT05GSUcsIHVzZVZhbHVlOiBjb25maWcgfSxcbiAgICAgICAgT3ZlcmxheUNvbnRhaW5lcixcbiAgICAgICAgT3ZlcmxheSxcbiAgICAgICAgVG9hc3RTZXJ2aWNlLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogVG9hc3RNb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogcXVvdGVtYXJrXG4gICAgICAgIFwiVG9hc3RNb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEl0IHNob3VsZCBvbmx5IGJlIGltcG9ydGVkIGluIHlvdXIgYXBwbGljYXRpb24ncyBtYWluIG1vZHVsZS5cIlxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==