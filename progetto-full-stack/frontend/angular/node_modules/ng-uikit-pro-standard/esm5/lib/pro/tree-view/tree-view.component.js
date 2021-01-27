import { __decorate, __metadata, __read, __values } from "tslib";
import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding, } from '@angular/core';
import { SPACE, ENTER } from '../../free/utils/keyboard-navigation';
var MdbTreeComponent = /** @class */ (function () {
    function MdbTreeComponent(_cdRef) {
        this._cdRef = _cdRef;
        this.checked = new EventEmitter();
        this.checkedKeys = new EventEmitter();
        this.nodesChanged = new EventEmitter();
        this.checkboxes = false;
        this.toggleOnTitleClick = false;
        this._expandAll = false;
        this.checkedValues = [];
        this.toggle = {};
    }
    Object.defineProperty(MdbTreeComponent.prototype, "expandAll", {
        set: function (value) {
            if (this.nodes && this.nodes.entries()) {
                this._expandAll = value;
                this.toggleExpandAll();
            }
        },
        enumerable: true,
        configurable: true
    });
    MdbTreeComponent.prototype.ngOnInit = function () {
        if (this.nodes && this.nodes.entries()) {
            this._setInitialCheckedKeys();
        }
    };
    MdbTreeComponent.prototype.toggleExpandAll = function () {
        if (this._expandAll) {
            this.expandAllNodes();
        }
        else if (!this._expandAll) {
            this.closeAllNodes();
        }
    };
    MdbTreeComponent.prototype.expandAllNodes = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.nodes.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), index = _d[0], node = _d[1];
                var idx = index;
                this.toggle[idx] = true;
                if (node[this.childrenField] && node[this.childrenField].length > 0) {
                    this._expandAllChildren(node, idx);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    MdbTreeComponent.prototype.closeAllNodes = function () {
        var e_2, _a;
        try {
            for (var _b = __values(this.nodes.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), index = _d[0], node = _d[1];
                var idx = index;
                this.toggle[idx] = false;
                if (node[this.childrenField] && node[this.childrenField].length > 0) {
                    this._closeAllChildren(node, idx);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    MdbTreeComponent.prototype._expandAllChildren = function (node, idx) {
        var e_3, _a;
        try {
            for (var _b = __values(node[this.childrenField].entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), childIndex = _d[0], childNode = _d[1];
                var childIdx = idx + '_' + childIndex;
                this.toggle[childIdx] = true;
                if (childNode[this.childrenField] && childNode[this.childrenField].length > 0) {
                    this._expandAllChildren(childNode, childIdx);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    MdbTreeComponent.prototype._closeAllChildren = function (node, idx) {
        var e_4, _a;
        try {
            for (var _b = __values(node[this.childrenField].entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), childIndex = _d[0], childNode = _d[1];
                var childIdx = idx + '_' + childIndex;
                this.toggle[childIdx] = false;
                if (childNode[this.childrenField] && childNode[this.childrenField].length > 0) {
                    this._closeAllChildren(childNode, childIdx);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    MdbTreeComponent.prototype._setInitialCheckedKeys = function () {
        var e_5, _a;
        try {
            for (var _b = __values(this.nodes.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), index = _d[0], node = _d[1];
                if (node[this.checkboxesField]) {
                    var idx = index;
                    this.checkedValues.push(idx);
                    if (node[this.childrenField] && node[this.childrenField].length > 0) {
                        this._hasInitialCheckedKeysChildren(node[this.childrenField], idx);
                    }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    MdbTreeComponent.prototype._hasInitialCheckedKeysChildren = function (childrenNode, i) {
        var e_6, _a;
        try {
            for (var _b = __values(childrenNode.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), childrenIdx = _d[0], node = _d[1];
                var idx = childrenIdx + '_' + i;
                if (node[this.checkboxesField]) {
                    this.checkedValues.push(idx);
                }
                if (node[this.childrenField] && node[this.childrenField].length > 0) {
                    this._hasInitialCheckedKeysChildren(node[this.childrenField], idx);
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
    };
    MdbTreeComponent.prototype.toggleByNode = function (i) {
        var e_7, _a;
        try {
            for (var _b = __values(this.nodes.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), index = _d[0], node = _d[1];
                if (node[this.childrenField] && node[this.childrenField].length > 0) {
                    var idx = index;
                    var toggleIdx = i;
                    if (idx === toggleIdx) {
                        this.toggle[idx] = !this.toggle[idx];
                        this._cdRef.markForCheck();
                    }
                    else {
                        this._childrenToggleByNode(node, idx, toggleIdx);
                    }
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
    };
    MdbTreeComponent.prototype._childrenToggleByNode = function (node, i, toggleIdx) {
        var e_8, _a;
        try {
            for (var _b = __values(node[this.childrenField].entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), childIndex = _d[0], childNode = _d[1];
                var nodeHasChildren = childNode[this.childrenField] && childNode[this.childrenField].length > 0;
                if (nodeHasChildren) {
                    var idx = i + '_' + childIndex;
                    if (idx === toggleIdx) {
                        this.toggle[idx] = !this.toggle[idx];
                        this._cdRef.markForCheck();
                    }
                    else {
                        this._childrenToggleByNode(childNode, idx, toggleIdx);
                    }
                }
                else {
                    return;
                }
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_8) throw e_8.error; }
        }
    };
    MdbTreeComponent.prototype.onKeydownCheckbox = function (e, node, i) {
        // tslint:disable-next-line: deprecation
        if (e.keyCode === SPACE || e.keyCode === ENTER) {
            e.preventDefault();
            this.checkNodes(node);
            this.updateNodesCheckedValues(node, i);
        }
    };
    MdbTreeComponent.prototype.onKeydown = function (e, i) {
        // tslint:disable-next-line: deprecation
        if (e.keyCode === SPACE || e.keyCode === ENTER) {
            e.preventDefault();
            this.toggle[i] = !this.toggle[i];
        }
    };
    MdbTreeComponent.prototype.checkNodes = function (node) {
        var _this = this;
        setTimeout(function () {
            node[_this.checkboxesField] = !node[_this.checkboxesField];
            _this.checked.emit(node);
            _this.nodesChanged.emit(_this.nodes);
        }, 0);
        var nodeHasChildren = node[this.childrenField] && node[this.childrenField].length > 0;
        if (nodeHasChildren) {
            this._checkChildNodes(node[this.childrenField], !node[this.checkboxesField]);
        }
        this._cdRef.markForCheck();
    };
    MdbTreeComponent.prototype._checkChildNodes = function (children, checked) {
        var _this = this;
        children.forEach(function (childNode) {
            if (childNode[_this.checkboxesField] !== undefined) {
                childNode[_this.checkboxesField] = checked;
                var nodeHasChildren = childNode[_this.childrenField] && childNode[_this.childrenField].length > 0;
                if (nodeHasChildren) {
                    _this._checkChildNodes(childNode[_this.childrenField], checked);
                }
            }
        });
    };
    MdbTreeComponent.prototype.updateNodesCheckedValues = function (node, idx) {
        var _this = this;
        setTimeout(function () {
            if (node[_this.checkboxesField] && !_this.checkedValues.includes(idx)) {
                _this.checkedValues.push(idx);
            }
            else if (!node[_this.checkboxesField] && _this.checkedValues.includes(idx)) {
                var removeIndex = _this.checkedValues.findIndex(function (e) { return e === idx; });
                if (removeIndex !== -1) {
                    _this.checkedValues.splice(removeIndex, 1);
                }
            }
            var nodeHasChildren = node[_this.childrenField] && node[_this.childrenField].length > 0;
            if (nodeHasChildren) {
                _this._updateChildNodesCheckedValues(node[_this.childrenField], idx);
            }
            _this.checkedKeys.emit(_this.checkedValues);
        }, 0);
    };
    MdbTreeComponent.prototype._updateChildNodesCheckedValues = function (childrenNode, childrenIdx) {
        var e_9, _a;
        var _loop_1 = function (index, node) {
            var idx = childrenIdx + '_' + index;
            if (node[this_1.checkboxesField] && !this_1.checkedValues.includes(idx)) {
                this_1.checkedValues.push(idx);
            }
            else if (!node[this_1.checkboxesField] && this_1.checkedValues.includes(idx)) {
                var removeIndex = this_1.checkedValues.findIndex(function (e) { return e === idx; });
                if (removeIndex !== -1) {
                    this_1.checkedValues.splice(removeIndex, 1);
                }
            }
            var nodeHasChildren = node[this_1.childrenField] && node[this_1.childrenField].length > 0;
            if (nodeHasChildren) {
                this_1._updateChildNodesCheckedValues(node[this_1.childrenField], idx);
            }
        };
        var this_1 = this;
        try {
            for (var _b = __values(childrenNode.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), index = _d[0], node = _d[1];
                _loop_1(index, node);
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_9) throw e_9.error; }
        }
    };
    MdbTreeComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        HostBinding('class.mdb-tree'),
        Output(),
        __metadata("design:type", Object)
    ], MdbTreeComponent.prototype, "checked", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MdbTreeComponent.prototype, "checkedKeys", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MdbTreeComponent.prototype, "nodesChanged", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTreeComponent.prototype, "nodes", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbTreeComponent.prototype, "textField", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbTreeComponent.prototype, "childrenField", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MdbTreeComponent.prototype, "checkboxesField", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], MdbTreeComponent.prototype, "expandAll", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTreeComponent.prototype, "checkboxes", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MdbTreeComponent.prototype, "toggleOnTitleClick", void 0);
    MdbTreeComponent = __decorate([
        Component({
            // tslint:disable-next-line: component-selector
            selector: 'mdb-tree',
            template: "<!-- child nodes -->\n<ng-template #tree let-nodeChildren let-idx=\"idx\">\n  <ul class=\"mdb-tree-list\">\n    <li *ngFor=\"let node of nodeChildren; let n = index\" class=\"mdb-tree-list-node\">\n      <div class=\"mdb-tree-container\">\n        <div *ngIf=\"node[childrenField] && node[childrenField].length > 0; else emptyIcon\">\n          <span class=\"mdb-tree-icon-container\">\n            <i\n              tabindex=\"1\"\n              aria-hidden=\"true\"\n              [ngClass]=\"\n                toggle[idx + '_' + n] ? 'mdb-tree-rotate-icon-open' : 'mdb-tree-rotate-icon-closed'\n              \"\n              (keydown)=\"onKeydown($event, idx + '_' + n)\"\n              (click)=\"toggle[idx + '_' + n] = !toggle[idx + '_' + n]\"\n              class=\"mdb-tree-indicator \"\n            ></i>\n          </span>\n        </div>\n        <ng-template #emptyIcon\n          ><span class=\"mdb-tree-icon-container\"\n            ><i class=\"mdb-tree-empty-icon\" style=\"display: block\" aria-hidden=\"true\"></i\n          ></span>\n        </ng-template>\n        <div\n          class=\"mdb-tree-checkbox-container\"\n          *ngIf=\"checkboxes && node[checkboxesField] !== undefined\"\n        >\n          <mdb-checkbox\n            class=\"checkbox-filled\"\n            [filledIn]=\"true\"\n            [tabIndex]=\"1\"\n            [attr.id]=\"node[textField]\"\n            (keydown)=\"onKeydownCheckbox($event, node, idx + '_' + n)\"\n            (click)=\"checkNodes(node); updateNodesCheckedValues(node, idx + '_' + n)\"\n            [checked]=\"node[checkboxesField]\"\n          ></mdb-checkbox>\n        </div>\n        <div *ngIf=\"checkboxes && node[checkboxesField] === undefined\">\n          <div class=\"mdb-tree-checkbox-null-container\"></div>\n        </div>\n\n        <div\n          *ngIf=\"toggleOnTitleClick\"\n          class=\"mdb-tree-text-field\"\n          [ngStyle]=\"{\n            cursor: node[childrenField] && node[childrenField].length > 0 ? 'pointer' : 'default'\n          }\"\n          (click)=\"toggle[idx + '_' + n] = !toggle[idx + '_' + n]\"\n        >\n          {{ node[textField] }}\n        </div>\n\n        <div *ngIf=\"!toggleOnTitleClick\" class=\"mdb-tree-text-field mdb-tree-text-ellipsis\">\n          {{ node[textField] }}\n        </div>\n      </div>\n      <div *ngIf=\"node[childrenField] && toggle[idx + '_' + n]\">\n        <ng-container\n          *ngTemplateOutlet=\"tree; context: { $implicit: node[childrenField], idx: idx + '_' + n }\"\n        ></ng-container>\n      </div>\n    </li>\n  </ul>\n</ng-template>\n<!-- first nodes -->\n<ul class=\"mdb-tree-list\">\n  <li *ngFor=\"let node of nodes; let i = index\" class=\"mdb-tree-list-node\">\n    <div class=\"mdb-tree-container\">\n      <div *ngIf=\"node[childrenField] && node[childrenField].length > 0; else emptyIcon\">\n        <span class=\"mdb-tree-icon-container\">\n          <i\n            tabindex=\"1\"\n            aria-hidden=\"true\"\n            [ngClass]=\"toggle[i] ? 'mdb-tree-rotate-icon-open' : 'mdb-tree-rotate-icon-closed'\"\n            (keydown)=\"onKeydown($event, i)\"\n            (click)=\"toggle[i] = !toggle[i]\"\n            class=\"mdb-tree-indicator\"\n          ></i>\n        </span>\n      </div>\n      <ng-template #emptyIcon\n        ><span class=\"mdb-tree-icon-container\"\n          ><i class=\"mdb-tree-empty-icon\" style=\"display: block\" aria-hidden=\"true\"></i\n        ></span>\n      </ng-template>\n      <div\n        class=\"mdb-tree-checkbox-container\"\n        *ngIf=\"checkboxes && node[checkboxesField] !== undefined\"\n      >\n        <mdb-checkbox\n          class=\"checkbox-filled\"\n          [checked]=\"node[checkboxesField]\"\n          [filledIn]=\"true\"\n          [tabIndex]=\"1\"\n          [attr.id]=\"node[textField]\"\n          (keydown)=\"onKeydownCheckbox($event, node, i)\"\n          (click)=\"checkNodes(node); updateNodesCheckedValues(node, i)\"\n        ></mdb-checkbox>\n      </div>\n      <div *ngIf=\"checkboxes && node[checkboxesField] === undefined\">\n        <div class=\"mdb-tree-checkbox-null-container\"></div>\n      </div>\n\n      <div\n        *ngIf=\"toggleOnTitleClick\"\n        class=\"mdb-tree-text-field\"\n        [ngStyle]=\"{\n          cursor: node[childrenField] && node[childrenField].length > 0 ? 'pointer' : 'default'\n        }\"\n        (click)=\"toggle[i] = !toggle[i]\"\n      >\n        {{ node[textField] }}\n      </div>\n\n      <div *ngIf=\"!toggleOnTitleClick\" class=\"mdb-tree-text-field mdb-tree-text-ellipsis\">\n        {{ node[textField] }}\n      </div>\n    </div>\n    <div *ngIf=\"node[childrenField] && toggle[i]\">\n      <ng-container\n        *ngTemplateOutlet=\"tree; context: { $implicit: node[childrenField], idx: i }\"\n      ></ng-container>\n    </div>\n  </li>\n</ul>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".mdb-tree-list{list-style-type:none;margin:0;padding:0}.mdb-tree-list-node{list-style-type:none;margin:.8rem .8rem .8rem .95rem}.mdb-tree-container{display:flex;min-width:230px}.mdb-tree-icon-container{display:inline-block;width:2rem;height:auto}.mdb-tree-empty-icon{cursor:default}.mdb-tree-text-field{margin-top:.15rem;max-width:90%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdb-tree-checkbox-null-container{min-width:2.2rem}.mdb-tree-indicator{position:relative;right:0;transform-origin:50% 79%;display:inline-block;margin-right:0;margin-top:.025rem;cursor:pointer;font-size:1.3rem}.mdb-tree-indicator::after{content:\"\";display:block;border-style:solid;padding:5px;margin-top:.15rem;border-width:0 3px 3px 0;font-size:1.3rem;transform:rotate(45deg)}.mdb-tree-indicator:focus{color:#4285f4;outline:0}.mdb-tree-rotate-icon-open{transform:rotate(0)}.mdb-tree-rotate-icon-closed{transform:rotate(270deg)}.mdb-tree-checkbox-container{margin-top:.25rem}.mdb-tree-checkbox-container mdb-checkbox.checkbox-filled [type=checkbox][class*=filled-in]:checked+label:after{border-color:#4285f4;background-color:#4285f4}"]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], MdbTreeComponent);
    return MdbTreeComponent;
}());
export { MdbTreeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXVpa2l0LXByby1zdGFuZGFyZC8iLCJzb3VyY2VzIjpbImxpYi9wcm8vdHJlZS12aWV3L3RyZWUtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osTUFBTSxFQUNOLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBU3BFO0lBdUJFLDBCQUFvQixNQUF5QjtRQUF6QixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQXBCN0MsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVduQyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUU1QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzNCLGtCQUFhLEdBQWEsRUFBRSxDQUFDO1FBQzdCLFdBQU0sR0FBUSxFQUFFLENBQUM7SUFFK0IsQ0FBQztJQWJ4QyxzQkFBSSx1Q0FBUzthQUFiLFVBQWMsS0FBYztZQUNuQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUN4QjtRQUNILENBQUM7OztPQUFBO0lBVUQsbUNBQVEsR0FBUjtRQUNFLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENB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T3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uSW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgSG9zdEJpbmRpbmcsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTUEFDRSwgRU5URVIgfSBmcm9tICcuLi8uLi9mcmVlL3V0aWxzL2tleWJvYXJkLW5hdmlnYXRpb24nO1xuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnbWRiLXRyZWUnLFxuICB0ZW1wbGF0ZVVybDogJy4vdHJlZS12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdHJlZS12aWV3LmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tZGItdHJlZScpXG4gIEBPdXRwdXQoKVxuICBjaGVja2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY2hlY2tlZEtleXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBub2Rlc0NoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dCgpIG5vZGVzOiBhbnk7XG4gIEBJbnB1dCgpIHRleHRGaWVsZDogc3RyaW5nO1xuICBASW5wdXQoKSBjaGlsZHJlbkZpZWxkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNoZWNrYm94ZXNGaWVsZDogc3RyaW5nO1xuICBASW5wdXQoKSBzZXQgZXhwYW5kQWxsKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMubm9kZXMgJiYgdGhpcy5ub2Rlcy5lbnRyaWVzKCkpIHtcbiAgICAgIHRoaXMuX2V4cGFuZEFsbCA9IHZhbHVlO1xuICAgICAgdGhpcy50b2dnbGVFeHBhbmRBbGwoKTtcbiAgICB9XG4gIH1cbiAgQElucHV0KCkgY2hlY2tib3hlcyA9IGZhbHNlO1xuICBASW5wdXQoKSB0b2dnbGVPblRpdGxlQ2xpY2sgPSBmYWxzZTtcblxuICBwcml2YXRlIF9leHBhbmRBbGwgPSBmYWxzZTtcbiAgY2hlY2tlZFZhbHVlczogc3RyaW5nW10gPSBbXTtcbiAgdG9nZ2xlOiBhbnkgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubm9kZXMgJiYgdGhpcy5ub2Rlcy5lbnRyaWVzKCkpIHtcbiAgICAgIHRoaXMuX3NldEluaXRpYWxDaGVja2VkS2V5cygpO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZUV4cGFuZEFsbCgpIHtcbiAgICBpZiAodGhpcy5fZXhwYW5kQWxsKSB7XG4gICAgICB0aGlzLmV4cGFuZEFsbE5vZGVzKCk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5fZXhwYW5kQWxsKSB7XG4gICAgICB0aGlzLmNsb3NlQWxsTm9kZXMoKTtcbiAgICB9XG4gIH1cblxuICBleHBhbmRBbGxOb2RlcygpIHtcbiAgICBmb3IgKGNvbnN0IFtpbmRleCwgbm9kZV0gb2YgdGhpcy5ub2Rlcy5lbnRyaWVzKCkpIHtcbiAgICAgIGNvbnN0IGlkeCA9IGluZGV4O1xuICAgICAgdGhpcy50b2dnbGVbaWR4XSA9IHRydWU7XG4gICAgICBpZiAobm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdICYmIG5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuX2V4cGFuZEFsbENoaWxkcmVuKG5vZGUsIGlkeCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xvc2VBbGxOb2RlcygpIHtcbiAgICBmb3IgKGNvbnN0IFtpbmRleCwgbm9kZV0gb2YgdGhpcy5ub2Rlcy5lbnRyaWVzKCkpIHtcbiAgICAgIGNvbnN0IGlkeCA9IGluZGV4O1xuICAgICAgdGhpcy50b2dnbGVbaWR4XSA9IGZhbHNlO1xuICAgICAgaWYgKG5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXSAmJiBub2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0ubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLl9jbG9zZUFsbENoaWxkcmVuKG5vZGUsIGlkeCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZXhwYW5kQWxsQ2hpbGRyZW4obm9kZTogYW55LCBpZHg6IHN0cmluZykge1xuICAgIGZvciAoY29uc3QgW2NoaWxkSW5kZXgsIGNoaWxkTm9kZV0gb2Ygbm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdLmVudHJpZXMoKSkge1xuICAgICAgY29uc3QgY2hpbGRJZHggPSBpZHggKyAnXycgKyBjaGlsZEluZGV4O1xuICAgICAgdGhpcy50b2dnbGVbY2hpbGRJZHhdID0gdHJ1ZTtcbiAgICAgIGlmIChjaGlsZE5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXSAmJiBjaGlsZE5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuX2V4cGFuZEFsbENoaWxkcmVuKGNoaWxkTm9kZSwgY2hpbGRJZHgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Nsb3NlQWxsQ2hpbGRyZW4obm9kZTogYW55LCBpZHg6IHN0cmluZykge1xuICAgIGZvciAoY29uc3QgW2NoaWxkSW5kZXgsIGNoaWxkTm9kZV0gb2Ygbm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdLmVudHJpZXMoKSkge1xuICAgICAgY29uc3QgY2hpbGRJZHggPSBpZHggKyAnXycgKyBjaGlsZEluZGV4O1xuICAgICAgdGhpcy50b2dnbGVbY2hpbGRJZHhdID0gZmFsc2U7XG4gICAgICBpZiAoY2hpbGROb2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0gJiYgY2hpbGROb2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0ubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLl9jbG9zZUFsbENoaWxkcmVuKGNoaWxkTm9kZSwgY2hpbGRJZHgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NldEluaXRpYWxDaGVja2VkS2V5cygpIHtcbiAgICBmb3IgKGNvbnN0IFtpbmRleCwgbm9kZV0gb2YgdGhpcy5ub2Rlcy5lbnRyaWVzKCkpIHtcbiAgICAgIGlmIChub2RlW3RoaXMuY2hlY2tib3hlc0ZpZWxkXSkge1xuICAgICAgICBjb25zdCBpZHggPSBpbmRleDtcbiAgICAgICAgdGhpcy5jaGVja2VkVmFsdWVzLnB1c2goaWR4KTtcbiAgICAgICAgaWYgKG5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXSAmJiBub2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuX2hhc0luaXRpYWxDaGVja2VkS2V5c0NoaWxkcmVuKG5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXSwgaWR4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2hhc0luaXRpYWxDaGVja2VkS2V5c0NoaWxkcmVuKGNoaWxkcmVuTm9kZTogYW55LCBpOiBzdHJpbmcpIHtcbiAgICBmb3IgKGNvbnN0IFtjaGlsZHJlbklkeCwgbm9kZV0gb2YgY2hpbGRyZW5Ob2RlLmVudHJpZXMoKSkge1xuICAgICAgY29uc3QgaWR4ID0gY2hpbGRyZW5JZHggKyAnXycgKyBpO1xuXG4gICAgICBpZiAobm9kZVt0aGlzLmNoZWNrYm94ZXNGaWVsZF0pIHtcbiAgICAgICAgdGhpcy5jaGVja2VkVmFsdWVzLnB1c2goaWR4KTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0gJiYgbm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5faGFzSW5pdGlhbENoZWNrZWRLZXlzQ2hpbGRyZW4obm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdLCBpZHgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZUJ5Tm9kZShpOiBzdHJpbmcpIHtcbiAgICBmb3IgKGNvbnN0IFtpbmRleCwgbm9kZV0gb2YgdGhpcy5ub2Rlcy5lbnRyaWVzKCkpIHtcbiAgICAgIGlmIChub2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0gJiYgbm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgaWR4ID0gaW5kZXg7XG4gICAgICAgIGNvbnN0IHRvZ2dsZUlkeCA9IGk7XG4gICAgICAgIGlmIChpZHggPT09IHRvZ2dsZUlkeCkge1xuICAgICAgICAgIHRoaXMudG9nZ2xlW2lkeF0gPSAhdGhpcy50b2dnbGVbaWR4XTtcbiAgICAgICAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9jaGlsZHJlblRvZ2dsZUJ5Tm9kZShub2RlLCBpZHgsIHRvZ2dsZUlkeCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jaGlsZHJlblRvZ2dsZUJ5Tm9kZShub2RlOiBhbnksIGk6IHN0cmluZywgdG9nZ2xlSWR4OiBzdHJpbmcpIHtcbiAgICBmb3IgKGNvbnN0IFtjaGlsZEluZGV4LCBjaGlsZE5vZGVdIG9mIG5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXS5lbnRyaWVzKCkpIHtcbiAgICAgIGNvbnN0IG5vZGVIYXNDaGlsZHJlbiA9XG4gICAgICAgIGNoaWxkTm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdICYmIGNoaWxkTm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdLmxlbmd0aCA+IDA7XG4gICAgICBpZiAobm9kZUhhc0NoaWxkcmVuKSB7XG4gICAgICAgIGNvbnN0IGlkeCA9IGkgKyAnXycgKyBjaGlsZEluZGV4O1xuICAgICAgICBpZiAoaWR4ID09PSB0b2dnbGVJZHgpIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZVtpZHhdID0gIXRoaXMudG9nZ2xlW2lkeF07XG4gICAgICAgICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fY2hpbGRyZW5Ub2dnbGVCeU5vZGUoY2hpbGROb2RlLCBpZHgsIHRvZ2dsZUlkeCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbktleWRvd25DaGVja2JveChlOiBLZXlib2FyZEV2ZW50LCBub2RlOiBhbnksIGk6IHN0cmluZykge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICBpZiAoZS5rZXlDb2RlID09PSBTUEFDRSB8fCBlLmtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmNoZWNrTm9kZXMobm9kZSk7XG4gICAgICB0aGlzLnVwZGF0ZU5vZGVzQ2hlY2tlZFZhbHVlcyhub2RlLCBpKTtcbiAgICB9XG4gIH1cblxuICBvbktleWRvd24oZTogS2V5Ym9hcmRFdmVudCwgaTogc3RyaW5nKSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgIGlmIChlLmtleUNvZGUgPT09IFNQQUNFIHx8IGUua2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMudG9nZ2xlW2ldID0gIXRoaXMudG9nZ2xlW2ldO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrTm9kZXMobm9kZTogYW55KSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBub2RlW3RoaXMuY2hlY2tib3hlc0ZpZWxkXSA9ICFub2RlW3RoaXMuY2hlY2tib3hlc0ZpZWxkXTtcbiAgICAgIHRoaXMuY2hlY2tlZC5lbWl0KG5vZGUpO1xuICAgICAgdGhpcy5ub2Rlc0NoYW5nZWQuZW1pdCh0aGlzLm5vZGVzKTtcbiAgICB9LCAwKTtcbiAgICBjb25zdCBub2RlSGFzQ2hpbGRyZW4gPSBub2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0gJiYgbm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdLmxlbmd0aCA+IDA7XG4gICAgaWYgKG5vZGVIYXNDaGlsZHJlbikge1xuICAgICAgdGhpcy5fY2hlY2tDaGlsZE5vZGVzKG5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXSwgIW5vZGVbdGhpcy5jaGVja2JveGVzRmllbGRdKTtcbiAgICB9XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9jaGVja0NoaWxkTm9kZXMoY2hpbGRyZW46IGFueSwgY2hlY2tlZDogYm9vbGVhbikge1xuICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkTm9kZTogYW55KSA9PiB7XG4gICAgICBpZiAoY2hpbGROb2RlW3RoaXMuY2hlY2tib3hlc0ZpZWxkXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNoaWxkTm9kZVt0aGlzLmNoZWNrYm94ZXNGaWVsZF0gPSBjaGVja2VkO1xuICAgICAgICBjb25zdCBub2RlSGFzQ2hpbGRyZW4gPVxuICAgICAgICAgIGNoaWxkTm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdICYmIGNoaWxkTm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdLmxlbmd0aCA+IDA7XG4gICAgICAgIGlmIChub2RlSGFzQ2hpbGRyZW4pIHtcbiAgICAgICAgICB0aGlzLl9jaGVja0NoaWxkTm9kZXMoY2hpbGROb2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0sIGNoZWNrZWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVOb2Rlc0NoZWNrZWRWYWx1ZXMobm9kZTogYW55LCBpZHg6IHN0cmluZykge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKG5vZGVbdGhpcy5jaGVja2JveGVzRmllbGRdICYmICF0aGlzLmNoZWNrZWRWYWx1ZXMuaW5jbHVkZXMoaWR4KSkge1xuICAgICAgICB0aGlzLmNoZWNrZWRWYWx1ZXMucHVzaChpZHgpO1xuICAgICAgfSBlbHNlIGlmICghbm9kZVt0aGlzLmNoZWNrYm94ZXNGaWVsZF0gJiYgdGhpcy5jaGVja2VkVmFsdWVzLmluY2x1ZGVzKGlkeCkpIHtcbiAgICAgICAgY29uc3QgcmVtb3ZlSW5kZXggPSB0aGlzLmNoZWNrZWRWYWx1ZXMuZmluZEluZGV4KGUgPT4gZSA9PT0gaWR4KTtcblxuICAgICAgICBpZiAocmVtb3ZlSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5jaGVja2VkVmFsdWVzLnNwbGljZShyZW1vdmVJbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IG5vZGVIYXNDaGlsZHJlbiA9IG5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXSAmJiBub2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0ubGVuZ3RoID4gMDtcbiAgICAgIGlmIChub2RlSGFzQ2hpbGRyZW4pIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2hpbGROb2Rlc0NoZWNrZWRWYWx1ZXMobm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdLCBpZHgpO1xuICAgICAgfVxuICAgICAgdGhpcy5jaGVja2VkS2V5cy5lbWl0KHRoaXMuY2hlY2tlZFZhbHVlcyk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVDaGlsZE5vZGVzQ2hlY2tlZFZhbHVlcyhjaGlsZHJlbk5vZGU6IGFueSwgY2hpbGRyZW5JZHg6IHN0cmluZykge1xuICAgIGZvciAoY29uc3QgW2luZGV4LCBub2RlXSBvZiBjaGlsZHJlbk5vZGUuZW50cmllcygpKSB7XG4gICAgICBjb25zdCBpZHggPSBjaGlsZHJlbklkeCArICdfJyArIGluZGV4O1xuXG4gICAgICBpZiAobm9kZVt0aGlzLmNoZWNrYm94ZXNGaWVsZF0gJiYgIXRoaXMuY2hlY2tlZFZhbHVlcy5pbmNsdWRlcyhpZHgpKSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZFZhbHVlcy5wdXNoKGlkeCk7XG4gICAgICB9IGVsc2UgaWYgKCFub2RlW3RoaXMuY2hlY2tib3hlc0ZpZWxkXSAmJiB0aGlzLmNoZWNrZWRWYWx1ZXMuaW5jbHVkZXMoaWR4KSkge1xuICAgICAgICBjb25zdCByZW1vdmVJbmRleCA9IHRoaXMuY2hlY2tlZFZhbHVlcy5maW5kSW5kZXgoZSA9PiBlID09PSBpZHgpO1xuICAgICAgICBpZiAocmVtb3ZlSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5jaGVja2VkVmFsdWVzLnNwbGljZShyZW1vdmVJbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IG5vZGVIYXNDaGlsZHJlbiA9IG5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXSAmJiBub2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0ubGVuZ3RoID4gMDtcbiAgICAgIGlmIChub2RlSGFzQ2hpbGRyZW4pIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2hpbGROb2Rlc0NoZWNrZWRWYWx1ZXMobm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdLCBpZHgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19