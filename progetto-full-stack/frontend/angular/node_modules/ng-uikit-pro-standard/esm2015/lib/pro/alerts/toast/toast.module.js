import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { TOAST_CONFIG } from './toast.token';
import { ToastService } from './toast.service';
import { OverlayContainer } from '../overlay/overlay-container';
import { Overlay } from '../overlay/overlay';
export class ToastModule {
    constructor(parentModule) {
        if (parentModule) {
            throw new Error(
            // tslint:disable-next-line: quotemark
            "ToastModule is already loaded. It should only be imported in your application's main module.");
        }
    }
    static forRoot(config) {
        return {
            ngModule: ToastModule,
            providers: [
                { provide: TOAST_CONFIG, useValue: config },
                OverlayContainer,
                Overlay,
                ToastService,
            ],
        };
    }
}
ToastModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [ToastComponent],
                declarations: [ToastComponent],
                entryComponents: [ToastComponent],
            },] }
];
ToastModule.ctorParameters = () => [
    { type: ToastModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctdWlraXQtcHJvLXN0YW5kYXJkL3NyYy9saWIvcHJvL2FsZXJ0cy90b2FzdC90b2FzdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQVE3QyxNQUFNLE9BQU8sV0FBVztJQVl0QixZQUFvQyxZQUF5QjtRQUMzRCxJQUFJLFlBQVksRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSztZQUNiLHNDQUFzQztZQUN0Qyw4RkFBOEYsQ0FDL0YsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQWxCRCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQXFCO1FBQ2xDLE9BQU87WUFDTCxRQUFRLEVBQUUsV0FBVztZQUNyQixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7Z0JBQzNDLGdCQUFnQjtnQkFDaEIsT0FBTztnQkFDUCxZQUFZO2FBQ2I7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBakJGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQztnQkFDekIsWUFBWSxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUM5QixlQUFlLEVBQUUsQ0FBQyxjQUFjLENBQUM7YUFDbEM7OztZQWFtRCxXQUFXLHVCQUFoRCxRQUFRLFlBQUksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBTa2lwU2VsZiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFRvYXN0Q29tcG9uZW50IH0gZnJvbSAnLi90b2FzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVE9BU1RfQ09ORklHIH0gZnJvbSAnLi90b2FzdC50b2tlbic7XG5pbXBvcnQgeyBUb2FzdFNlcnZpY2UgfSBmcm9tICcuL3RvYXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgR2xvYmFsQ29uZmlnIH0gZnJvbSAnLi90b2FzdC5jb25maWcnO1xuaW1wb3J0IHsgT3ZlcmxheUNvbnRhaW5lciB9IGZyb20gJy4uL292ZXJsYXkvb3ZlcmxheS1jb250YWluZXInO1xuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gJy4uL292ZXJsYXkvb3ZlcmxheSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbVG9hc3RDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtUb2FzdENvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1RvYXN0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3RNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBHbG9iYWxDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFRvYXN0TW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBUb2FzdE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IFRPQVNUX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyB9LFxuICAgICAgICBPdmVybGF5Q29udGFpbmVyLFxuICAgICAgICBPdmVybGF5LFxuICAgICAgICBUb2FzdFNlcnZpY2UsXG4gICAgICBdLFxuICAgIH07XG4gIH1cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBUb2FzdE1vZHVsZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBxdW90ZW1hcmtcbiAgICAgICAgXCJUb2FzdE1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSXQgc2hvdWxkIG9ubHkgYmUgaW1wb3J0ZWQgaW4geW91ciBhcHBsaWNhdGlvbidzIG1haW4gbW9kdWxlLlwiXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19