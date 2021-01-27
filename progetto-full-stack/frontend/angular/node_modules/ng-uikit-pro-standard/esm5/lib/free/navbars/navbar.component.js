import { __decorate, __metadata, __param } from "tslib";
import { NavbarService } from './navbar.service';
import { AfterContentChecked, AfterViewInit, Component, ContentChild, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild, ViewEncapsulation, ChangeDetectorRef, ChangeDetectionStrategy, Inject, NgZone, OnDestroy, } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { LinksComponent } from './links.component';
import { DOCUMENT } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(renderer, _navbarService, _cdRef, _ngZone, _document) {
        var _this = this;
        this.renderer = renderer;
        this._navbarService = _navbarService;
        this._cdRef = _cdRef;
        this._ngZone = _ngZone;
        this._document = _document;
        this.containerInside = true;
        this.collapseId = 'navbarCollapse';
        this.scrollSensitivity = 120;
        this.scrollableNavbar = false;
        this._destroy$ = new Subject();
        this.shown = false;
        this.duration = 350; // ms
        this.collapse = true;
        this.showClass = false;
        this.collapsing = false;
        this._itemsLength = 0;
        this.ariaExpanded = false;
        this._navbarService
            .getNavbarLinkClicks()
            .pipe(takeUntil(this._destroy$))
            .subscribe(function (navbarLinkClicks) {
            _this.closeNavbarOnClick(navbarLinkClicks);
        });
    }
    NavbarComponent.prototype.closeNavbarOnClick = function (navbarLinkClicks) {
        this.navbarLinkClicks = navbarLinkClicks;
        if (this.showClass) {
            this.hide();
        }
    };
    NavbarComponent.prototype.addTogglerIconClasses = function () {
        var _this = this;
        if (this.iconBackground) {
            if (Array.isArray(this.iconBackground)) {
                this.iconBackground.forEach(function (iconClass) {
                    _this.renderer.addClass(_this.toggler.nativeElement, iconClass);
                });
            }
            else {
                this.renderer.addClass(this.toggler.nativeElement, this.iconBackground);
            }
        }
    };
    NavbarComponent.prototype._listenToScroll = function () {
        var _this = this;
        this._ngZone.runOutsideAngular(function () {
            fromEvent(_this._document, 'scroll')
                .pipe(takeUntil(_this._destroy$))
                .subscribe(function () {
                if (window.pageYOffset > _this.scrollSensitivity) {
                    _this.renderer.addClass(_this.navbar.nativeElement, 'top-nav-collapse');
                }
                else {
                    _this.renderer.removeClass(_this.navbar.nativeElement, 'top-nav-collapse');
                }
            });
        });
    };
    NavbarComponent.prototype.ngOnInit = function () {
        var isDoubleNav = this.SideClass.split(' ');
        this.doubleNav = isDoubleNav.indexOf('double-nav') !== -1;
    };
    NavbarComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.containerInside) {
            var childrens = Array.from(this.container.nativeElement.children);
            childrens.forEach(function (child) {
                _this.renderer.appendChild(_this.navbar.nativeElement, child);
                _this.container.nativeElement.remove();
            });
        }
        if (this.el.nativeElement.children.length === 0) {
            this.el.nativeElement.remove();
        }
        this.addTogglerIconClasses();
        if (this.scrollableNavbar) {
            this.renderer.addClass(this.el.nativeElement, 'collapsed-navbar-scroll');
        }
        if (this.navbar.nativeElement.classList.contains('scrolling-navbar')) {
            this._listenToScroll();
        }
    };
    NavbarComponent.prototype.toggle = function () {
        if (!this.collapsing) {
            if (this.shown) {
                this.hide();
            }
            else {
                this.show();
            }
        }
    };
    NavbarComponent.prototype.show = function () {
        var _this = this;
        this.shown = true;
        this.collapse = false;
        this.collapsing = true;
        this.ariaExpanded = true;
        setTimeout(function () {
            _this.height = _this.el.nativeElement.scrollHeight;
            _this.renderer.setStyle(_this.el.nativeElement, 'height', _this.height + 'px');
        }, 0);
        setTimeout(function () {
            _this.collapsing = false;
            _this.collapse = true;
            _this.showClass = true;
        }, this.duration);
        this._cdRef.markForCheck();
    };
    NavbarComponent.prototype.hide = function () {
        var _this = this;
        if (this.shown) {
            this.shown = false;
            this.collapse = false;
            this.showClass = false;
            this.collapsing = true;
            this.ariaExpanded = false;
            setTimeout(function () {
                _this.renderer.setStyle(_this.el.nativeElement, 'height', '0px');
            }, 0);
            setTimeout(function () {
                _this.collapsing = false;
                _this.collapse = true;
            }, this.duration);
        }
        this._cdRef.markForCheck();
    };
    Object.defineProperty(NavbarComponent.prototype, "displayStyle", {
        get: function () {
            if (!this.containerInside) {
                return 'flex';
            }
            else {
                return '';
            }
        },
        enumerable: true,
        configurable: true
    });
    NavbarComponent.prototype.onResize = function (event) {
        var _this = this;
        var breakpoint = 0;
        if (this.SideClass.includes('navbar-expand-xl')) {
            breakpoint = 1200;
        }
        else if (this.SideClass.includes('navbar-expand-lg')) {
            breakpoint = 992;
        }
        else if (this.SideClass.includes('navbar-expand-md')) {
            breakpoint = 768;
        }
        else if (this.SideClass.includes('navbar-expand-sm')) {
            breakpoint = 576;
        }
        else {
            breakpoint = event.target.innerWidth + 1;
        }
        if (event.target.innerWidth < breakpoint) {
            if (!this.shown) {
                this.collapse = false;
                this.renderer.setStyle(this.el.nativeElement, 'height', '0px');
                this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
                setTimeout(function () {
                    _this.height = _this.el.nativeElement.scrollHeight;
                    _this.collapse = true;
                    _this.renderer.setStyle(_this.el.nativeElement, 'opacity', '');
                }, 4);
            }
        }
        else {
            this.collapsing = false;
            this.shown = false;
            this.showClass = false;
            this.collapse = true;
            this.ariaExpanded = false;
            this.renderer.setStyle(this.el.nativeElement, 'height', '');
        }
    };
    NavbarComponent.prototype.ngAfterContentChecked = function () {
        if (this.el.nativeElement.firstElementChild) {
            if (this._itemsLength !==
                this.el.nativeElement.firstElementChild.firstElementChild.children.length) {
                this.height = this.el.nativeElement.firstElementChild.firstElementChild.clientHeight;
                this.renderer.setStyle(this.el.nativeElement, 'height', this.height + 'px');
            }
            this._itemsLength = this.el.nativeElement.firstElementChild.firstElementChild.children.length;
        }
        this._cdRef.markForCheck();
    };
    NavbarComponent.prototype.ngOnDestroy = function () {
        this._destroy$.next();
        this._destroy$.complete();
    };
    NavbarComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: NavbarService },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NavbarComponent.prototype, "iconBackground", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NavbarComponent.prototype, "SideClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NavbarComponent.prototype, "containerInside", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NavbarComponent.prototype, "collapseId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NavbarComponent.prototype, "scrollSensitivity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NavbarComponent.prototype, "scrollableNavbar", void 0);
    __decorate([
        ViewChild('navbar', { static: true }),
        __metadata("design:type", ElementRef)
    ], NavbarComponent.prototype, "el", void 0);
    __decorate([
        ViewChild('mobile'),
        __metadata("design:type", ElementRef)
    ], NavbarComponent.prototype, "mobile", void 0);
    __decorate([
        ViewChild('nav', { static: true }),
        __metadata("design:type", ElementRef)
    ], NavbarComponent.prototype, "navbar", void 0);
    __decorate([
        ViewChild('container', { static: true }),
        __metadata("design:type", ElementRef)
    ], NavbarComponent.prototype, "container", void 0);
    __decorate([
        ViewChild('toggler'),
        __metadata("design:type", ElementRef)
    ], NavbarComponent.prototype, "toggler", void 0);
    __decorate([
        ContentChild(LinksComponent),
        __metadata("design:type", LinksComponent)
    ], NavbarComponent.prototype, "links", void 0);
    __decorate([
        HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NavbarComponent.prototype, "onResize", null);
    NavbarComponent = __decorate([
        Component({
            selector: 'mdb-navbar',
            template: "<nav class=\"{{ SideClass }}\" #nav>\n  <div [ngClass]=\"{ container: containerInside }\" [ngStyle]=\"{ display: displayStyle }\" #container>\n    <ng-content select=\"mdb-navbar-brand\"></ng-content>\n    <ng-content select=\"logo\"></ng-content>\n    <ng-content></ng-content>\n    <ng-content *ngIf=\"this.doubleNav == true\" select=\"navlinks\"></ng-content>\n    <div *ngIf=\"this.doubleNav == false\">\n      <button\n        #toggler\n        class=\"navbar-toggler\"\n        type=\"button\"\n        [attr.aria-controls]=\"collapseId\"\n        [attr.aria-expanded]=\"ariaExpanded\"\n        aria-label=\"Toggle navigation\"\n        (click)=\"toggle(); $event.preventDefault()\"\n        mdbWavesEffect\n        *ngIf=\"this.el.nativeElement.children.length !== 0\"\n      >\n        <span class=\"navbar-toggler-icon\"> </span>\n      </button>\n    </div>\n    <div\n      #navbar\n      [attr.id]=\"collapseId\"\n      [style.height]=\"height\"\n      class=\"navbar-collapse collapse\"\n      [ngClass]=\"{ collapse: collapse, show: showClass, collapsing: collapsing }\"\n    >\n      <ng-content select=\"links\"></ng-content>\n    </div>\n  </div>\n</nav>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".navbar{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);font-weight:300}.navbar form .md-form input{margin:0 5px 1px 8px}.navbar .breadcrumb{margin:0;padding:.3rem 0 0 1rem;background-color:inherit;font-size:15px;font-weight:300}.navbar .breadcrumb .breadcrumb-item{color:#fff}.navbar .breadcrumb .breadcrumb-item.active,.navbar .breadcrumb .breadcrumb-item:before{color:rgba(255,255,255,.65)}.navbar .navbar-toggler{outline:0;border-width:0}.navbar .nav-flex-icons{flex-direction:row}.navbar .nav-item .nav-link{display:block}.navbar .nav-item .nav-link.disabled:active{pointer-events:none}.navbar .nav-item .nav-link .fab,.navbar .nav-item .nav-link .far,.navbar .nav-item .nav-link .fas{padding-right:3px;padding-left:3px}@media (max-width:992px){.navbar .container{width:100%}.navbar .container .navbar-toggler-right{right:0}.navbar .nav-item .nav-link{padding-right:6px;padding-left:6px}.double-nav{padding-top:4px;padding-bottom:4px}}.navbar .dropdown-menu{position:absolute!important;margin-top:0}.navbar .dropdown-menu a{padding:10px;font-size:.9375rem;font-weight:300;color:#000}@media (max-width:600px){.navbar .dropdown-menu form{width:17rem}}.navbar.navbar-light .navbar-nav .nav-item .nav-link.disbled,.navbar.navbar-light .navbar-nav .nav-item .nav-link.disbled:hover{color:rgba(0,0,0,.5)}.navbar.navbar-light .navbar-toggler-icon{background-image:url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.9)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\");cursor:pointer}.navbar.navbar-light .breadcrumb .nav-item .nav-link,.navbar.navbar-light .navbar-nav .nav-item .nav-link{color:#000;transition:.35s}.navbar.navbar-light .breadcrumb .nav-item .nav-link:hover,.navbar.navbar-light .navbar-nav .nav-item .nav-link:hover{color:rgba(0,0,0,.75)}.navbar.navbar-light .breadcrumb .nav-item.active>.nav-link,.navbar.navbar-light .navbar-nav .nav-item.active>.nav-link{background-color:rgba(0,0,0,.1)}.navbar.navbar-light .breadcrumb .nav-item.active>.nav-link:hover,.navbar.navbar-light .navbar-nav .nav-item.active>.nav-link:hover,.navbar.navbar-light .navbar-toggler{color:#000}.navbar.navbar-light form .md-form input{border-bottom:1px solid #000}.navbar.navbar-light form .md-form input:focus:not([readonly]){border-color:#4285f4}.navbar.navbar-light form .md-form .form-control{color:#000}.navbar.navbar-light form .md-form .form-control::-webkit-input-placeholder{color:#000;font-weight:300}.navbar.navbar-light form .md-form .form-control::-moz-placeholder{color:#000;font-weight:300}.navbar.navbar-light form .md-form .form-control::-ms-input-placeholder{color:#000;font-weight:300}.navbar.navbar-light form .md-form .form-control::placeholder{color:#000;font-weight:300}.navbar.navbar-dark .navbar-nav .nav-item .nav-link.disbled,.navbar.navbar-dark .navbar-nav .nav-item .nav-link.disbled:hover{color:rgba(255,255,255,.5)}.navbar.navbar-dark .navbar-toggler-icon{background-image:url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.9)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\");cursor:pointer}.navbar.navbar-dark .breadcrumb .nav-item .nav-link,.navbar.navbar-dark .navbar-nav .nav-item .nav-link{color:#fff;transition:.35s}.navbar.navbar-dark .breadcrumb .nav-item .nav-link:hover,.navbar.navbar-dark .navbar-nav .nav-item .nav-link:hover{color:rgba(255,255,255,.75)}.navbar.navbar-dark .breadcrumb .nav-item.active>.nav-link,.navbar.navbar-dark .navbar-nav .nav-item.active>.nav-link{background-color:rgba(255,255,255,.1)}.navbar.navbar-dark .breadcrumb .nav-item.active>.nav-link:hover,.navbar.navbar-dark .navbar-nav .nav-item.active>.nav-link:hover,.navbar.navbar-dark .navbar-toggler{color:#fff}.navbar.navbar-dark form .md-form input{border-bottom:1px solid #fff}.navbar.navbar-dark form .md-form input:focus:not([readonly]){border-color:#4285f4}.navbar.navbar-dark form .md-form .form-control{color:#fff}.navbar.navbar-dark form .md-form .form-control::-webkit-input-placeholder{color:#fff;font-weight:300}.navbar.navbar-dark form .md-form .form-control::-moz-placeholder{color:#fff;font-weight:300}.navbar.navbar-dark form .md-form .form-control::-ms-input-placeholder{color:#fff;font-weight:300}.navbar.navbar-dark form .md-form .form-control::placeholder{color:#fff;font-weight:300}@media (min-width:600px){.navbar .dropdown-menu form{width:22rem}.navbar.scrolling-navbar{transition:background .5s ease-in-out,padding .5s ease-in-out;padding-top:12px;padding-bottom:12px}.navbar.scrolling-navbar .navbar-nav>li{transition-duration:1s}.navbar.scrolling-navbar.top-nav-collapse{padding-top:5px;padding-bottom:5px}}@media (min-width:1200px){.navbar.navbar-expand-xl links,.navbar.navbar-expand-xl navlinks{display:flex;flex-direction:row;align-items:center!important;align-self:center!important;width:100%}}@media (min-width:992px){.navbar>logo>div>a img{margin-left:20px}.navbar.navbar-expand-lg links,.navbar.navbar-expand-lg navlinks{display:flex;flex-direction:row;align-items:center!important;align-self:center!important;width:100%}}@media (min-width:768px){.navbar.navbar-expand-md links,.navbar.navbar-expand-md navlinks{display:flex;flex-direction:row;width:100%}}@media (min-width:576px){.navbar.navbar-expand-sm links,.navbar.navbar-expand-sm navlinks{display:flex;flex-direction:row;width:100%}}@media all and (max-width:992px){.collapsed-navbar-scroll{max-height:calc(100vh - 40px);overflow-y:scroll}}.navbar-container{order:-1;width:50px!important;padding-left:5px;padding-right:5px}.navbar-nav .dropdown-menu-right.dropdown-menu{left:unset}.navbar-nav .dropdown-menu{top:100%!important;transform:translate3d(0,0,0)!important}.breadcrumbs{display:flex;padding-left:5px;padding-right:5px;order:0;align-items:center}@media (min-width:1441px){.breadcrumbs{margin-left:-.6rem}}@supports (-ms-ime-align:auto){.ie-nav .navbar-toggler{position:absolute;margin-top:-40px;right:0}@media all and (min-width:992px){.ie-nav .navbar-nav.nav-flex-icons{position:absolute;top:30%;right:0}.ie-nav .navbar-nav{position:absolute;top:30%;margin-left:88px}.ie-nav .navbar-brand>img{margin-top:-2px;padding-right:16px}.intro-non-fixed-nav>links .navbar-collapse{display:inline-flex!important;align-items:center!important;justify-content:space-between!important}.intro-fixed-nav .navbar-nav.nav-flex-icons{position:absolute;top:30%;right:0}.intro-fixed-nav .navbar-nav{position:absolute;top:30%;margin-left:88px}.intro-fixed-nav .navbar-brand img{margin-top:-2px;padding-right:16px}}.intro-fixed-nav .navbar-toggler{position:absolute;margin-top:-40px;right:0}}@media all and (-ms-high-contrast:none) and (min-width:992px),(-ms-high-contrast:active) and (min-width:992px){.ie-nav .navbar-nav.nav-flex-icons{position:absolute;top:30%;right:0}.ie-nav .navbar-nav{position:absolute;top:30%;margin-left:88px}.ie-nav .navbar-brand>img{margin-top:-2px;padding-right:16px}.intro-non-fixed-nav>links .navbar-collapse{display:inline-flex!important;align-items:center!important;justify-content:space-between!important}.intro-fixed-nav .navbar-nav.nav-flex-icons{position:absolute;top:30%;right:0}.intro-fixed-nav .navbar-nav{position:absolute;top:30%;margin-left:88px}.intro-fixed-nav .navbar-brand img{margin-top:-2px;padding-right:16px}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.ie-nav .navbar-toggler,.intro-fixed-nav .navbar-toggler{position:absolute;margin-top:-40px;right:0}}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:none}.navbar .nav-item.avatar{padding:0}.navbar .nav-item.avatar.active{background-color:transparent!important}.navbar .nav-item.avatar .dropdown-toggle{padding:0}.navbar .nav-item.avatar .dropdown-toggle img{height:35px}.navbar .nav-item.avatar .dropdown-toggle:after{display:none}@media (max-width:768px){.double-nav .container{padding-left:0;padding-right:0}}.double-nav a{font-size:15px;color:#fff}.double-nav .breadcrumb-dn p{margin:0;padding-top:0;padding-left:1rem}@media (max-width:993px){.double-nav .breadcrumb-dn{display:none}}.double-nav .button-collapse{left:10px;font-size:1.5rem}@media (min-width:1440px){.double-nav .button-collapse{display:none}}@media (max-width:1440px){.double-nav .button-collapse{display:block;position:relative;font-size:1.4rem;margin-right:10px;margin-left:10px}}"]
        }),
        __param(4, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Renderer2,
            NavbarService,
            ChangeDetectorRef,
            NgZone, Object])
    ], NavbarComponent);
    return NavbarComponent;
}());
export { NavbarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9mcmVlL25hdmJhcnMvbmF2YmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFDTCxtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFTM0M7SUFnQ0UseUJBQ1MsUUFBbUIsRUFDbEIsY0FBNkIsRUFDN0IsTUFBeUIsRUFDekIsT0FBZSxFQUNHLFNBQWM7UUFMMUMsaUJBYUM7UUFaUSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ2xCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3pCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDRyxjQUFTLEdBQVQsU0FBUyxDQUFLO1FBbENqQyxvQkFBZSxHQUFHLElBQUksQ0FBQztRQUN2QixlQUFVLEdBQUcsZ0JBQWdCLENBQUM7UUFDOUIsc0JBQWlCLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLHFCQUFnQixHQUFHLEtB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U0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztrQ0FBWSxVQUFVO3NEQUFDO0lBQzFDO1FBQXJCLFNBQVMsQ0FBQyxTQUFTLENBQUM7a0NBQVUsVUFBVTtvREFBQztJQUNaO1FBQTdCLFlBQVksQ0FBQyxjQUFjLENBQUM7a0NBQVEsY0FBYztrREFBQztJQXNJVDtRQUExQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7bURBa0N6QztJQXRNVSxlQUFlO1FBUDNCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxZQUFZO1lBQ3RCLGlxQ0FBb0M7WUFFcEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7UUFzQ0csV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7eUNBSkEsU0FBUztZQUNGLGFBQWE7WUFDckIsaUJBQWlCO1lBQ2hCLE1BQU07T0FwQ2QsZUFBZSxDQTJOM0I7SUFBRCxzQkFBQztDQUFBLEFBM05ELElBMk5DO1NBM05ZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYXZiYXJTZXJ2aWNlIH0gZnJvbSAnLi9uYXZiYXIuc2VydmljZSc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgSW5qZWN0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IExpbmtzQ29tcG9uZW50IH0gZnJvbSAnLi9saW5rcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItbmF2YmFyJyxcbiAgdGVtcGxhdGVVcmw6ICduYXZiYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uYXZiYXJzLW1vZHVsZS5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOYXZiYXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGljb25CYWNrZ3JvdW5kOiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgQElucHV0KCkgU2lkZUNsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbnRhaW5lckluc2lkZSA9IHRydWU7XG4gIEBJbnB1dCgpIGNvbGxhcHNlSWQgPSAnbmF2YmFyQ29sbGFwc2UnO1xuICBASW5wdXQoKSBzY3JvbGxTZW5zaXRpdml0eSA9IDEyMDtcbiAgQElucHV0KCkgc2Nyb2xsYWJsZU5hdmJhciA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX2Rlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICBuYXZiYXJMaW5rQ2xpY2tzOiBhbnk7XG4gIHNob3duID0gZmFsc2U7XG5cbiAgcHVibGljIGRvdWJsZU5hdjogYm9vbGVhbjtcbiAgcHVibGljIGhlaWdodDogbnVtYmVyO1xuICBwdWJsaWMgZHVyYXRpb24gPSAzNTA7IC8vIG1zXG5cbiAgcHVibGljIGNvbGxhcHNlID0gdHJ1ZTtcbiAgcHVibGljIHNob3dDbGFzcyA9IGZhbHNlO1xuICBwdWJsaWMgY29sbGFwc2luZyA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX2l0ZW1zTGVuZ3RoID0gMDtcblxuICBhcmlhRXhwYW5kZWQgPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKCduYXZiYXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBlbDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnbW9iaWxlJykgbW9iaWxlOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCduYXYnLCB7IHN0YXRpYzogdHJ1ZSB9KSBuYXZiYXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIGNvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgndG9nZ2xlcicpIHRvZ2dsZXI6IEVsZW1lbnRSZWY7XG4gIEBDb250ZW50Q2hpbGQoTGlua3NDb21wb25lbnQpIGxpbmtzOiBMaW5rc0NvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9uYXZiYXJTZXJ2aWNlOiBOYXZiYXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55XG4gICkge1xuICAgIHRoaXMuX25hdmJhclNlcnZpY2VcbiAgICAgIC5nZXROYXZiYXJMaW5rQ2xpY2tzKClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKG5hdmJhckxpbmtDbGlja3MgPT4ge1xuICAgICAgICB0aGlzLmNsb3NlTmF2YmFyT25DbGljayhuYXZiYXJMaW5rQ2xpY2tzKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgY2xvc2VOYXZiYXJPbkNsaWNrKG5hdmJhckxpbmtDbGlja3M6IGFueSkge1xuICAgIHRoaXMubmF2YmFyTGlua0NsaWNrcyA9IG5hdmJhckxpbmtDbGlja3M7XG4gICAgaWYgKHRoaXMuc2hvd0NsYXNzKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBhZGRUb2dnbGVySWNvbkNsYXNzZXMoKSB7XG4gICAgaWYgKHRoaXMuaWNvbkJhY2tncm91bmQpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuaWNvbkJhY2tncm91bmQpKSB7XG4gICAgICAgIHRoaXMuaWNvbkJhY2tncm91bmQuZm9yRWFjaChpY29uQ2xhc3MgPT4ge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy50b2dnbGVyLm5hdGl2ZUVsZW1lbnQsIGljb25DbGFzcyk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnRvZ2dsZXIubmF0aXZlRWxlbWVudCwgdGhpcy5pY29uQmFja2dyb3VuZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuVG9TY3JvbGwoKSB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGZyb21FdmVudCh0aGlzLl9kb2N1bWVudCwgJ3Njcm9sbCcpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGlmICh3aW5kb3cucGFnZVlPZmZzZXQgPiB0aGlzLnNjcm9sbFNlbnNpdGl2aXR5KSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMubmF2YmFyLm5hdGl2ZUVsZW1lbnQsICd0b3AtbmF2LWNvbGxhcHNlJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5uYXZiYXIubmF0aXZlRWxlbWVudCwgJ3RvcC1uYXYtY29sbGFwc2UnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3QgaXNEb3VibGVOYXYgPSB0aGlzLlNpZGVDbGFzcy5zcGxpdCgnICcpO1xuICAgIHRoaXMuZG91YmxlTmF2ID0gaXNEb3VibGVOYXYuaW5kZXhPZignZG91YmxlLW5hdicpICE9PSAtMTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVySW5zaWRlKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbnMgPSBBcnJheS5mcm9tKHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW4pO1xuICAgICAgY2hpbGRyZW5zLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMubmF2YmFyLm5hdGl2ZUVsZW1lbnQsIGNoaWxkKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudC5yZW1vdmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZSgpO1xuICAgIH1cbiAgICB0aGlzLmFkZFRvZ2dsZXJJY29uQ2xhc3NlcygpO1xuICAgIGlmICh0aGlzLnNjcm9sbGFibGVOYXZiYXIpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnY29sbGFwc2VkLW5hdmJhci1zY3JvbGwnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5uYXZiYXIubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3Njcm9sbGluZy1uYXZiYXInKSkge1xuICAgICAgdGhpcy5fbGlzdGVuVG9TY3JvbGwoKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgaWYgKCF0aGlzLmNvbGxhcHNpbmcpIHtcbiAgICAgIGlmICh0aGlzLnNob3duKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2hvdygpIHtcbiAgICB0aGlzLnNob3duID0gdHJ1ZTtcbiAgICB0aGlzLmNvbGxhcHNlID0gZmFsc2U7XG4gICAgdGhpcy5jb2xsYXBzaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmFyaWFFeHBhbmRlZCA9IHRydWU7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodDtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgdGhpcy5oZWlnaHQgKyAncHgnKTtcbiAgICB9LCAwKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jb2xsYXBzaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmNvbGxhcHNlID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2hvd0NsYXNzID0gdHJ1ZTtcbiAgICB9LCB0aGlzLmR1cmF0aW9uKTtcblxuICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICBpZiAodGhpcy5zaG93bikge1xuICAgICAgdGhpcy5zaG93biA9IGZhbHNlO1xuICAgICAgdGhpcy5jb2xsYXBzZSA9IGZhbHNlO1xuICAgICAgdGhpcy5zaG93Q2xhc3MgPSBmYWxzZTtcbiAgICAgIHRoaXMuY29sbGFwc2luZyA9IHRydWU7XG4gICAgICB0aGlzLmFyaWFFeHBhbmRlZCA9IGZhbHNlO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgJzBweCcpO1xuICAgICAgfSwgMCk7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbGxhcHNpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb2xsYXBzZSA9IHRydWU7XG4gICAgICB9LCB0aGlzLmR1cmF0aW9uKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBkaXNwbGF5U3R5bGUoKSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lckluc2lkZSkge1xuICAgICAgcmV0dXJuICdmbGV4JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKSBvblJlc2l6ZShldmVudDogYW55KSB7XG4gICAgbGV0IGJyZWFrcG9pbnQgPSAwO1xuXG4gICAgaWYgKHRoaXMuU2lkZUNsYXNzLmluY2x1ZGVzKCduYXZiYXItZXhwYW5kLXhsJykpIHtcbiAgICAgIGJyZWFrcG9pbnQgPSAxMjAwO1xuICAgIH0gZWxzZSBpZiAodGhpcy5TaWRlQ2xhc3MuaW5jbHVkZXMoJ25hdmJhci1leHBhbmQtbGcnKSkge1xuICAgICAgYnJlYWtwb2ludCA9IDk5MjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuU2lkZUNsYXNzLmluY2x1ZGVzKCduYXZiYXItZXhwYW5kLW1kJykpIHtcbiAgICAgIGJyZWFrcG9pbnQgPSA3Njg7XG4gICAgfSBlbHNlIGlmICh0aGlzLlNpZGVDbGFzcy5pbmNsdWRlcygnbmF2YmFyLWV4cGFuZC1zbScpKSB7XG4gICAgICBicmVha3BvaW50ID0gNTc2O1xuICAgIH0gZWxzZSB7XG4gICAgICBicmVha3BvaW50ID0gZXZlbnQudGFyZ2V0LmlubmVyV2lkdGggKyAxO1xuICAgIH1cblxuICAgIGlmIChldmVudC50YXJnZXQuaW5uZXJXaWR0aCA8IGJyZWFrcG9pbnQpIHtcbiAgICAgIGlmICghdGhpcy5zaG93bikge1xuICAgICAgICB0aGlzLmNvbGxhcHNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgJzBweCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ29wYWNpdHknLCAnMCcpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgdGhpcy5jb2xsYXBzZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5JywgJycpO1xuICAgICAgICB9LCA0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb2xsYXBzaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnNob3duID0gZmFsc2U7XG4gICAgICB0aGlzLnNob3dDbGFzcyA9IGZhbHNlO1xuICAgICAgdGhpcy5jb2xsYXBzZSA9IHRydWU7XG4gICAgICB0aGlzLmFyaWFFeHBhbmRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCAnJyk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIGlmICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5faXRlbXNMZW5ndGggIT09XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZHJlbi5sZW5ndGhcbiAgICAgICkge1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgdGhpcy5oZWlnaHQgKyAncHgnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5faXRlbXNMZW5ndGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2Rlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=