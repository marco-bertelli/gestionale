import { __decorate } from "tslib";
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from './free/mdb-free.module';
import { MDBBootstrapModulePro } from './pro/mdb-pro.module';
export { MDBBootstrapModule } from './free/mdb-free.module';
export { MDBBootstrapModulePro } from './pro/mdb-pro.module';
var MODULES = [MDBBootstrapModule, MDBBootstrapModulePro];
var MDBRootModules = /** @class */ (function () {
    function MDBRootModules() {
    }
    MDBRootModules = __decorate([
        NgModule({
            imports: [MDBBootstrapModule.forRoot(), MDBBootstrapModulePro.forRoot()],
            exports: MODULES,
            providers: [],
            schemas: [NO_ERRORS_SCHEMA],
        })
    ], MDBRootModules);
    return MDBRootModules;
}());
export { MDBRootModules };
var MDBBootstrapModulesPro = /** @class */ (function () {
    function MDBBootstrapModulesPro() {
    }
    MDBBootstrapModulesPro.forRoot = function () {
        return { ngModule: MDBRootModules };
    };
    MDBBootstrapModulesPro = __decorate([
        NgModule({ exports: MODULES })
    ], MDBBootstrapModulesPro);
    return MDBBootstrapModulesPro;
}());
export { MDBBootstrapModulesPro };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9tZGIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU3RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU3RCxJQUFNLE9BQU8sR0FBRyxDQUFDLGtCQUFrQixFQUFFLHFCQUFxQixDQUFDLENBQUM7QUFRNUQ7SUFBQTtJQUE2QixDQUFDO0lBQWpCLGNBQWM7UUFOMUIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLEVBQUUscUJBQXFCLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEUsT0FBTyxFQUFFLE9BQU87WUFDaEIsU0FBUyxFQUFFLEVBQUU7WUFDYixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztTQUM1QixDQUFDO09BQ1csY0FBYyxDQUFHO0lBQUQscUJBQUM7Q0FBQSxBQUE5QixJQUE4QjtTQUFqQixjQUFjO0FBRzNCO0lBQUE7SUFJQSxDQUFDO0lBSGUsOEJBQU8sR0FBckI7UUFDRSxPQUFPLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFIVSxzQkFBc0I7UUFEbEMsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO09BQ2xCLHNCQUFzQixDQUlsQztJQUFELDZCQUFDO0NBQUEsQUFKRCxJQUlDO1NBSlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTURCQm9vdHN0cmFwTW9kdWxlIH0gZnJvbSAnLi9mcmVlL21kYi1mcmVlLm1vZHVsZSc7XG5pbXBvcnQgeyBNREJCb290c3RyYXBNb2R1bGVQcm8gfSBmcm9tICcuL3Byby9tZGItcHJvLm1vZHVsZSc7XG5cbmV4cG9ydCB7IE1EQkJvb3RzdHJhcE1vZHVsZSB9IGZyb20gJy4vZnJlZS9tZGItZnJlZS5tb2R1bGUnO1xuXG5leHBvcnQgeyBNREJCb290c3RyYXBNb2R1bGVQcm8gfSBmcm9tICcuL3Byby9tZGItcHJvLm1vZHVsZSc7XG5cbmNvbnN0IE1PRFVMRVMgPSBbTURCQm9vdHN0cmFwTW9kdWxlLCBNREJCb290c3RyYXBNb2R1bGVQcm9dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTURCQm9vdHN0cmFwTW9kdWxlLmZvclJvb3QoKSwgTURCQm9vdHN0cmFwTW9kdWxlUHJvLmZvclJvb3QoKV0sXG4gIGV4cG9ydHM6IE1PRFVMRVMsXG4gIHByb3ZpZGVyczogW10sXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcbn0pXG5leHBvcnQgY2xhc3MgTURCUm9vdE1vZHVsZXMge31cblxuQE5nTW9kdWxlKHsgZXhwb3J0czogTU9EVUxFUyB9KVxuZXhwb3J0IGNsYXNzIE1EQkJvb3RzdHJhcE1vZHVsZXNQcm8ge1xuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxNREJSb290TW9kdWxlcz4ge1xuICAgIHJldHVybiB7IG5nTW9kdWxlOiBNREJSb290TW9kdWxlcyB9O1xuICB9XG59XG4iXX0=