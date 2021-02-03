import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding, } from '@angular/core';
import { SPACE, ENTER } from '../../free/utils/keyboard-navigation';
export class MdbTreeComponent {
    constructor(_cdRef) {
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
    set expandAll(value) {
        if (this.nodes && this.nodes.entries()) {
            this._expandAll = value;
            this.toggleExpandAll();
        }
    }
    ngOnInit() {
        if (this.nodes && this.nodes.entries()) {
            this._setInitialCheckedKeys();
        }
    }
    toggleExpandAll() {
        if (this._expandAll) {
            this.expandAllNodes();
        }
        else if (!this._expandAll) {
            this.closeAllNodes();
        }
    }
    expandAllNodes() {
        for (const [index, node] of this.nodes.entries()) {
            const idx = index;
            this.toggle[idx] = true;
            if (node[this.childrenField] && node[this.childrenField].length > 0) {
                this._expandAllChildren(node, idx);
            }
        }
    }
    closeAllNodes() {
        for (const [index, node] of this.nodes.entries()) {
            const idx = index;
            this.toggle[idx] = false;
            if (node[this.childrenField] && node[this.childrenField].length > 0) {
                this._closeAllChildren(node, idx);
            }
        }
    }
    _expandAllChildren(node, idx) {
        for (const [childIndex, childNode] of node[this.childrenField].entries()) {
            const childIdx = idx + '_' + childIndex;
            this.toggle[childIdx] = true;
            if (childNode[this.childrenField] && childNode[this.childrenField].length > 0) {
                this._expandAllChildren(childNode, childIdx);
            }
        }
    }
    _closeAllChildren(node, idx) {
        for (const [childIndex, childNode] of node[this.childrenField].entries()) {
            const childIdx = idx + '_' + childIndex;
            this.toggle[childIdx] = false;
            if (childNode[this.childrenField] && childNode[this.childrenField].length > 0) {
                this._closeAllChildren(childNode, childIdx);
            }
        }
    }
    _setInitialCheckedKeys() {
        for (const [index, node] of this.nodes.entries()) {
            if (node[this.checkboxesField]) {
                const idx = index;
                this.checkedValues.push(idx);
                if (node[this.childrenField] && node[this.childrenField].length > 0) {
                    this._hasInitialCheckedKeysChildren(node[this.childrenField], idx);
                }
            }
        }
    }
    _hasInitialCheckedKeysChildren(childrenNode, i) {
        for (const [childrenIdx, node] of childrenNode.entries()) {
            const idx = childrenIdx + '_' + i;
            if (node[this.checkboxesField]) {
                this.checkedValues.push(idx);
            }
            if (node[this.childrenField] && node[this.childrenField].length > 0) {
                this._hasInitialCheckedKeysChildren(node[this.childrenField], idx);
            }
        }
    }
    toggleByNode(i) {
        for (const [index, node] of this.nodes.entries()) {
            if (node[this.childrenField] && node[this.childrenField].length > 0) {
                const idx = index;
                const toggleIdx = i;
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
    _childrenToggleByNode(node, i, toggleIdx) {
        for (const [childIndex, childNode] of node[this.childrenField].entries()) {
            const nodeHasChildren = childNode[this.childrenField] && childNode[this.childrenField].length > 0;
            if (nodeHasChildren) {
                const idx = i + '_' + childIndex;
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
    onKeydownCheckbox(e, node, i) {
        // tslint:disable-next-line: deprecation
        if (e.keyCode === SPACE || e.keyCode === ENTER) {
            e.preventDefault();
            this.checkNodes(node);
            this.updateNodesCheckedValues(node, i);
        }
    }
    onKeydown(e, i) {
        // tslint:disable-next-line: deprecation
        if (e.keyCode === SPACE || e.keyCode === ENTER) {
            e.preventDefault();
            this.toggle[i] = !this.toggle[i];
        }
    }
    checkNodes(node) {
        setTimeout(() => {
            node[this.checkboxesField] = !node[this.checkboxesField];
            this.checked.emit(node);
            this.nodesChanged.emit(this.nodes);
        }, 0);
        const nodeHasChildren = node[this.childrenField] && node[this.childrenField].length > 0;
        if (nodeHasChildren) {
            this._checkChildNodes(node[this.childrenField], !node[this.checkboxesField]);
        }
        this._cdRef.markForCheck();
    }
    _checkChildNodes(children, checked) {
        children.forEach((childNode) => {
            if (childNode[this.checkboxesField] !== undefined) {
                childNode[this.checkboxesField] = checked;
                const nodeHasChildren = childNode[this.childrenField] && childNode[this.childrenField].length > 0;
                if (nodeHasChildren) {
                    this._checkChildNodes(childNode[this.childrenField], checked);
                }
            }
        });
    }
    updateNodesCheckedValues(node, idx) {
        setTimeout(() => {
            if (node[this.checkboxesField] && !this.checkedValues.includes(idx)) {
                this.checkedValues.push(idx);
            }
            else if (!node[this.checkboxesField] && this.checkedValues.includes(idx)) {
                const removeIndex = this.checkedValues.findIndex(e => e === idx);
                if (removeIndex !== -1) {
                    this.checkedValues.splice(removeIndex, 1);
                }
            }
            const nodeHasChildren = node[this.childrenField] && node[this.childrenField].length > 0;
            if (nodeHasChildren) {
                this._updateChildNodesCheckedValues(node[this.childrenField], idx);
            }
            this.checkedKeys.emit(this.checkedValues);
        }, 0);
    }
    _updateChildNodesCheckedValues(childrenNode, childrenIdx) {
        for (const [index, node] of childrenNode.entries()) {
            const idx = childrenIdx + '_' + index;
            if (node[this.checkboxesField] && !this.checkedValues.includes(idx)) {
                this.checkedValues.push(idx);
            }
            else if (!node[this.checkboxesField] && this.checkedValues.includes(idx)) {
                const removeIndex = this.checkedValues.findIndex(e => e === idx);
                if (removeIndex !== -1) {
                    this.checkedValues.splice(removeIndex, 1);
                }
            }
            const nodeHasChildren = node[this.childrenField] && node[this.childrenField].length > 0;
            if (nodeHasChildren) {
                this._updateChildNodesCheckedValues(node[this.childrenField], idx);
            }
        }
    }
}
MdbTreeComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line: component-selector
                selector: 'mdb-tree',
                template: "<!-- child nodes -->\n<ng-template #tree let-nodeChildren let-idx=\"idx\">\n  <ul class=\"mdb-tree-list\">\n    <li *ngFor=\"let node of nodeChildren; let n = index\" class=\"mdb-tree-list-node\">\n      <div class=\"mdb-tree-container\">\n        <div *ngIf=\"node[childrenField] && node[childrenField].length > 0; else emptyIcon\">\n          <span class=\"mdb-tree-icon-container\">\n            <i\n              tabindex=\"1\"\n              aria-hidden=\"true\"\n              [ngClass]=\"\n                toggle[idx + '_' + n] ? 'mdb-tree-rotate-icon-open' : 'mdb-tree-rotate-icon-closed'\n              \"\n              (keydown)=\"onKeydown($event, idx + '_' + n)\"\n              (click)=\"toggle[idx + '_' + n] = !toggle[idx + '_' + n]\"\n              class=\"mdb-tree-indicator \"\n            ></i>\n          </span>\n        </div>\n        <ng-template #emptyIcon\n          ><span class=\"mdb-tree-icon-container\"\n            ><i class=\"mdb-tree-empty-icon\" style=\"display: block\" aria-hidden=\"true\"></i\n          ></span>\n        </ng-template>\n        <div\n          class=\"mdb-tree-checkbox-container\"\n          *ngIf=\"checkboxes && node[checkboxesField] !== undefined\"\n        >\n          <mdb-checkbox\n            class=\"checkbox-filled\"\n            [filledIn]=\"true\"\n            [tabIndex]=\"1\"\n            [attr.id]=\"node[textField]\"\n            (keydown)=\"onKeydownCheckbox($event, node, idx + '_' + n)\"\n            (click)=\"checkNodes(node); updateNodesCheckedValues(node, idx + '_' + n)\"\n            [checked]=\"node[checkboxesField]\"\n          ></mdb-checkbox>\n        </div>\n        <div *ngIf=\"checkboxes && node[checkboxesField] === undefined\">\n          <div class=\"mdb-tree-checkbox-null-container\"></div>\n        </div>\n\n        <div\n          *ngIf=\"toggleOnTitleClick\"\n          class=\"mdb-tree-text-field\"\n          [ngStyle]=\"{\n            cursor: node[childrenField] && node[childrenField].length > 0 ? 'pointer' : 'default'\n          }\"\n          (click)=\"toggle[idx + '_' + n] = !toggle[idx + '_' + n]\"\n        >\n          {{ node[textField] }}\n        </div>\n\n        <div *ngIf=\"!toggleOnTitleClick\" class=\"mdb-tree-text-field mdb-tree-text-ellipsis\">\n          {{ node[textField] }}\n        </div>\n      </div>\n      <div *ngIf=\"node[childrenField] && toggle[idx + '_' + n]\">\n        <ng-container\n          *ngTemplateOutlet=\"tree; context: { $implicit: node[childrenField], idx: idx + '_' + n }\"\n        ></ng-container>\n      </div>\n    </li>\n  </ul>\n</ng-template>\n<!-- first nodes -->\n<ul class=\"mdb-tree-list\">\n  <li *ngFor=\"let node of nodes; let i = index\" class=\"mdb-tree-list-node\">\n    <div class=\"mdb-tree-container\">\n      <div *ngIf=\"node[childrenField] && node[childrenField].length > 0; else emptyIcon\">\n        <span class=\"mdb-tree-icon-container\">\n          <i\n            tabindex=\"1\"\n            aria-hidden=\"true\"\n            [ngClass]=\"toggle[i] ? 'mdb-tree-rotate-icon-open' : 'mdb-tree-rotate-icon-closed'\"\n            (keydown)=\"onKeydown($event, i)\"\n            (click)=\"toggle[i] = !toggle[i]\"\n            class=\"mdb-tree-indicator\"\n          ></i>\n        </span>\n      </div>\n      <ng-template #emptyIcon\n        ><span class=\"mdb-tree-icon-container\"\n          ><i class=\"mdb-tree-empty-icon\" style=\"display: block\" aria-hidden=\"true\"></i\n        ></span>\n      </ng-template>\n      <div\n        class=\"mdb-tree-checkbox-container\"\n        *ngIf=\"checkboxes && node[checkboxesField] !== undefined\"\n      >\n        <mdb-checkbox\n          class=\"checkbox-filled\"\n          [checked]=\"node[checkboxesField]\"\n          [filledIn]=\"true\"\n          [tabIndex]=\"1\"\n          [attr.id]=\"node[textField]\"\n          (keydown)=\"onKeydownCheckbox($event, node, i)\"\n          (click)=\"checkNodes(node); updateNodesCheckedValues(node, i)\"\n        ></mdb-checkbox>\n      </div>\n      <div *ngIf=\"checkboxes && node[checkboxesField] === undefined\">\n        <div class=\"mdb-tree-checkbox-null-container\"></div>\n      </div>\n\n      <div\n        *ngIf=\"toggleOnTitleClick\"\n        class=\"mdb-tree-text-field\"\n        [ngStyle]=\"{\n          cursor: node[childrenField] && node[childrenField].length > 0 ? 'pointer' : 'default'\n        }\"\n        (click)=\"toggle[i] = !toggle[i]\"\n      >\n        {{ node[textField] }}\n      </div>\n\n      <div *ngIf=\"!toggleOnTitleClick\" class=\"mdb-tree-text-field mdb-tree-text-ellipsis\">\n        {{ node[textField] }}\n      </div>\n    </div>\n    <div *ngIf=\"node[childrenField] && toggle[i]\">\n      <ng-container\n        *ngTemplateOutlet=\"tree; context: { $implicit: node[childrenField], idx: i }\"\n      ></ng-container>\n    </div>\n  </li>\n</ul>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mdb-tree-list{list-style-type:none;margin:0;padding:0}.mdb-tree-list-node{list-style-type:none;margin:.8rem .8rem .8rem .95rem}.mdb-tree-container{display:flex;min-width:230px}.mdb-tree-icon-container{display:inline-block;height:auto;width:2rem}.mdb-tree-empty-icon{cursor:default}.mdb-tree-text-field{margin-top:.15rem;max-width:90%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mdb-tree-checkbox-null-container{min-width:2.2rem}.mdb-tree-indicator{cursor:pointer;display:inline-block;font-size:1.3rem;margin-right:0;margin-top:.025rem;position:relative;right:0;transform-origin:50% 79%}.mdb-tree-indicator:after{border-style:solid;border-width:0 3px 3px 0;content:\"\";display:block;font-size:1.3rem;margin-top:.15rem;padding:5px;transform:rotate(45deg)}.mdb-tree-indicator:focus{color:#4285f4;outline:none}.mdb-tree-rotate-icon-open{transform:rotate(0deg)}.mdb-tree-rotate-icon-closed{transform:rotate(270deg)}.mdb-tree-checkbox-container{margin-top:.25rem}.mdb-tree-checkbox-container mdb-checkbox.checkbox-filled [type=checkbox][class*=filled-in]:checked+label:after{background-color:#4285f4;border-color:#4285f4}"]
            },] }
];
MdbTreeComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
MdbTreeComponent.propDecorators = {
    checked: [{ type: HostBinding, args: ['class.mdb-tree',] }, { type: Output }],
    checkedKeys: [{ type: Output }],
    nodesChanged: [{ type: Output }],
    nodes: [{ type: Input }],
    textField: [{ type: Input }],
    childrenField: [{ type: Input }],
    checkboxesField: [{ type: Input }],
    expandAll: [{ type: Input }],
    checkboxes: [{ type: Input }],
    toggleOnTitleClick: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXVpa2l0LXByby1zdGFuZGFyZC9zcmMvbGliL3Byby90cmVlLXZpZXcvdHJlZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUVaLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBU3BFLE1BQU0sT0FBTyxnQkFBZ0I7SUF1QjNCLFlBQW9CLE1BQXlCO1FBQXpCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBcEI3QyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNuQixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBV25DLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBRTVCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDM0Isa0JBQWEsR0FBYSxFQUFFLENBQUM7UUFDN0IsV0FBTSxHQUFRLEVBQUUsQ0FBQztJQUUrQixDQUFDO0lBYmpELElBQWEsU0FBUyxDQUFDLEtBQWM7UUFDbkMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQVVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxLQUFLLElB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Q0wsS0FBSzs0QkFDTCxLQUFLOzhCQUNMLEtBQUs7d0JBQ0wsS0FBSzt5QkFNTCxLQUFLO2lDQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25Jbml0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBIb3N0QmluZGluZyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNQQUNFLCBFTlRFUiB9IGZyb20gJy4uLy4uL2ZyZWUvdXRpbHMva2V5Ym9hcmQtbmF2aWdhdGlvbic7XG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdtZGItdHJlZScsXG4gIHRlbXBsYXRlVXJsOiAnLi90cmVlLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90cmVlLXZpZXcuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kYlRyZWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1kYi10cmVlJylcbiAgQE91dHB1dCgpXG4gIGNoZWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjaGVja2VkS2V5cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG5vZGVzQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQElucHV0KCkgbm9kZXM6IGFueTtcbiAgQElucHV0KCkgdGV4dEZpZWxkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNoaWxkcmVuRmllbGQ6IHN0cmluZztcbiAgQElucHV0KCkgY2hlY2tib3hlc0ZpZWxkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNldCBleHBhbmRBbGwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5ub2RlcyAmJiB0aGlzLm5vZGVzLmVudHJpZXMoKSkge1xuICAgICAgdGhpcy5fZXhwYW5kQWxsID0gdmFsdWU7XG4gICAgICB0aGlzLnRvZ2dsZUV4cGFuZEFsbCgpO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKSBjaGVja2JveGVzID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvZ2dsZU9uVGl0bGVDbGljayA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX2V4cGFuZEFsbCA9IGZhbHNlO1xuICBjaGVja2VkVmFsdWVzOiBzdHJpbmdbXSA9IFtdO1xuICB0b2dnbGU6IGFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5ub2RlcyAmJiB0aGlzLm5vZGVzLmVudHJpZXMoKSkge1xuICAgICAgdGhpcy5fc2V0SW5pdGlhbENoZWNrZWRLZXlzKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlRXhwYW5kQWxsKCkge1xuICAgIGlmICh0aGlzLl9leHBhbmRBbGwpIHtcbiAgICAgIHRoaXMuZXhwYW5kQWxsTm9kZXMoKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9leHBhbmRBbGwpIHtcbiAgICAgIHRoaXMuY2xvc2VBbGxOb2RlcygpO1xuICAgIH1cbiAgfVxuXG4gIGV4cGFuZEFsbE5vZGVzKCkge1xuICAgIGZvciAoY29uc3QgW2luZGV4LCBub2RlXSBvZiB0aGlzLm5vZGVzLmVudHJpZXMoKSkge1xuICAgICAgY29uc3QgaWR4ID0gaW5kZXg7XG4gICAgICB0aGlzLnRvZ2dsZVtpZHhdID0gdHJ1ZTtcbiAgICAgIGlmIChub2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0gJiYgbm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5fZXhwYW5kQWxsQ2hpbGRyZW4obm9kZSwgaWR4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjbG9zZUFsbE5vZGVzKCkge1xuICAgIGZvciAoY29uc3QgW2luZGV4LCBub2RlXSBvZiB0aGlzLm5vZGVzLmVudHJpZXMoKSkge1xuICAgICAgY29uc3QgaWR4ID0gaW5kZXg7XG4gICAgICB0aGlzLnRvZ2dsZVtpZHhdID0gZmFsc2U7XG4gICAgICBpZiAobm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdICYmIG5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuX2Nsb3NlQWxsQ2hpbGRyZW4obm9kZSwgaWR4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9leHBhbmRBbGxDaGlsZHJlbihub2RlOiBhbnksIGlkeDogc3RyaW5nKSB7XG4gICAgZm9yIChjb25zdCBbY2hpbGRJbmRleCwgY2hpbGROb2RlXSBvZiBub2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0uZW50cmllcygpKSB7XG4gICAgICBjb25zdCBjaGlsZElkeCA9IGlkeCArICdfJyArIGNoaWxkSW5kZXg7XG4gICAgICB0aGlzLnRvZ2dsZVtjaGlsZElkeF0gPSB0cnVlO1xuICAgICAgaWYgKGNoaWxkTm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdICYmIGNoaWxkTm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5fZXhwYW5kQWxsQ2hpbGRyZW4oY2hpbGROb2RlLCBjaGlsZElkeCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2xvc2VBbGxDaGlsZHJlbihub2RlOiBhbnksIGlkeDogc3RyaW5nKSB7XG4gICAgZm9yIChjb25zdCBbY2hpbGRJbmRleCwgY2hpbGROb2RlXSBvZiBub2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0uZW50cmllcygpKSB7XG4gICAgICBjb25zdCBjaGlsZElkeCA9IGlkeCArICdfJyArIGNoaWxkSW5kZXg7XG4gICAgICB0aGlzLnRvZ2dsZVtjaGlsZElkeF0gPSBmYWxzZTtcbiAgICAgIGlmIChjaGlsZE5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXSAmJiBjaGlsZE5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuX2Nsb3NlQWxsQ2hpbGRyZW4oY2hpbGROb2RlLCBjaGlsZElkeCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0SW5pdGlhbENoZWNrZWRLZXlzKCkge1xuICAgIGZvciAoY29uc3QgW2luZGV4LCBub2RlXSBvZiB0aGlzLm5vZGVzLmVudHJpZXMoKSkge1xuICAgICAgaWYgKG5vZGVbdGhpcy5jaGVja2JveGVzRmllbGRdKSB7XG4gICAgICAgIGNvbnN0IGlkeCA9IGluZGV4O1xuICAgICAgICB0aGlzLmNoZWNrZWRWYWx1ZXMucHVzaChpZHgpO1xuICAgICAgICBpZiAobm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdICYmIG5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhpcy5faGFzSW5pdGlhbENoZWNrZWRLZXlzQ2hpbGRyZW4obm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdLCBpZHgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaGFzSW5pdGlhbENoZWNrZWRLZXlzQ2hpbGRyZW4oY2hpbGRyZW5Ob2RlOiBhbnksIGk6IHN0cmluZykge1xuICAgIGZvciAoY29uc3QgW2NoaWxkcmVuSWR4LCBub2RlXSBvZiBjaGlsZHJlbk5vZGUuZW50cmllcygpKSB7XG4gICAgICBjb25zdCBpZHggPSBjaGlsZHJlbklkeCArICdfJyArIGk7XG5cbiAgICAgIGlmIChub2RlW3RoaXMuY2hlY2tib3hlc0ZpZWxkXSkge1xuICAgICAgICB0aGlzLmNoZWNrZWRWYWx1ZXMucHVzaChpZHgpO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXSAmJiBub2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0ubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLl9oYXNJbml0aWFsQ2hlY2tlZEtleXNDaGlsZHJlbihub2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0sIGlkeCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlQnlOb2RlKGk6IHN0cmluZykge1xuICAgIGZvciAoY29uc3QgW2luZGV4LCBub2RlXSBvZiB0aGlzLm5vZGVzLmVudHJpZXMoKSkge1xuICAgICAgaWYgKG5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXSAmJiBub2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0ubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBpZHggPSBpbmRleDtcbiAgICAgICAgY29uc3QgdG9nZ2xlSWR4ID0gaTtcbiAgICAgICAgaWYgKGlkeCA9PT0gdG9nZ2xlSWR4KSB7XG4gICAgICAgICAgdGhpcy50b2dnbGVbaWR4XSA9ICF0aGlzLnRvZ2dsZVtpZHhdO1xuICAgICAgICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2NoaWxkcmVuVG9nZ2xlQnlOb2RlKG5vZGUsIGlkeCwgdG9nZ2xlSWR4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NoaWxkcmVuVG9nZ2xlQnlOb2RlKG5vZGU6IGFueSwgaTogc3RyaW5nLCB0b2dnbGVJZHg6IHN0cmluZykge1xuICAgIGZvciAoY29uc3QgW2NoaWxkSW5kZXgsIGNoaWxkTm9kZV0gb2Ygbm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdLmVudHJpZXMoKSkge1xuICAgICAgY29uc3Qgbm9kZUhhc0NoaWxkcmVuID1cbiAgICAgICAgY2hpbGROb2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0gJiYgY2hpbGROb2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0ubGVuZ3RoID4gMDtcbiAgICAgIGlmIChub2RlSGFzQ2hpbGRyZW4pIHtcbiAgICAgICAgY29uc3QgaWR4ID0gaSArICdfJyArIGNoaWxkSW5kZXg7XG4gICAgICAgIGlmIChpZHggPT09IHRvZ2dsZUlkeCkge1xuICAgICAgICAgIHRoaXMudG9nZ2xlW2lkeF0gPSAhdGhpcy50b2dnbGVbaWR4XTtcbiAgICAgICAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9jaGlsZHJlblRvZ2dsZUJ5Tm9kZShjaGlsZE5vZGUsIGlkeCwgdG9nZ2xlSWR4KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uS2V5ZG93bkNoZWNrYm94KGU6IEtleWJvYXJkRXZlbnQsIG5vZGU6IGFueSwgaTogc3RyaW5nKSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgIGlmIChlLmtleUNvZGUgPT09IFNQQUNFIHx8IGUua2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuY2hlY2tOb2Rlcyhub2RlKTtcbiAgICAgIHRoaXMudXBkYXRlTm9kZXNDaGVja2VkVmFsdWVzKG5vZGUsIGkpO1xuICAgIH1cbiAgfVxuXG4gIG9uS2V5ZG93bihlOiBLZXlib2FyZEV2ZW50LCBpOiBzdHJpbmcpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gU1BBQ0UgfHwgZS5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy50b2dnbGVbaV0gPSAhdGhpcy50b2dnbGVbaV07XG4gICAgfVxuICB9XG5cbiAgY2hlY2tOb2Rlcyhub2RlOiBhbnkpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIG5vZGVbdGhpcy5jaGVja2JveGVzRmllbGRdID0gIW5vZGVbdGhpcy5jaGVja2JveGVzRmllbGRdO1xuICAgICAgdGhpcy5jaGVja2VkLmVtaXQobm9kZSk7XG4gICAgICB0aGlzLm5vZGVzQ2hhbmdlZC5lbWl0KHRoaXMubm9kZXMpO1xuICAgIH0sIDApO1xuICAgIGNvbnN0IG5vZGVIYXNDaGlsZHJlbiA9IG5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXSAmJiBub2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0ubGVuZ3RoID4gMDtcbiAgICBpZiAobm9kZUhhc0NoaWxkcmVuKSB7XG4gICAgICB0aGlzLl9jaGVja0NoaWxkTm9kZXMobm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdLCAhbm9kZVt0aGlzLmNoZWNrYm94ZXNGaWVsZF0pO1xuICAgIH1cbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NoZWNrQ2hpbGROb2RlcyhjaGlsZHJlbjogYW55LCBjaGVja2VkOiBib29sZWFuKSB7XG4gICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGROb2RlOiBhbnkpID0+IHtcbiAgICAgIGlmIChjaGlsZE5vZGVbdGhpcy5jaGVja2JveGVzRmllbGRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2hpbGROb2RlW3RoaXMuY2hlY2tib3hlc0ZpZWxkXSA9IGNoZWNrZWQ7XG4gICAgICAgIGNvbnN0IG5vZGVIYXNDaGlsZHJlbiA9XG4gICAgICAgICAgY2hpbGROb2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0gJiYgY2hpbGROb2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0ubGVuZ3RoID4gMDtcbiAgICAgICAgaWYgKG5vZGVIYXNDaGlsZHJlbikge1xuICAgICAgICAgIHRoaXMuX2NoZWNrQ2hpbGROb2RlcyhjaGlsZE5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXSwgY2hlY2tlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZU5vZGVzQ2hlY2tlZFZhbHVlcyhub2RlOiBhbnksIGlkeDogc3RyaW5nKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAobm9kZVt0aGlzLmNoZWNrYm94ZXNGaWVsZF0gJiYgIXRoaXMuY2hlY2tlZFZhbHVlcy5pbmNsdWRlcyhpZHgpKSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZFZhbHVlcy5wdXNoKGlkeCk7XG4gICAgICB9IGVsc2UgaWYgKCFub2RlW3RoaXMuY2hlY2tib3hlc0ZpZWxkXSAmJiB0aGlzLmNoZWNrZWRWYWx1ZXMuaW5jbHVkZXMoaWR4KSkge1xuICAgICAgICBjb25zdCByZW1vdmVJbmRleCA9IHRoaXMuY2hlY2tlZFZhbHVlcy5maW5kSW5kZXgoZSA9PiBlID09PSBpZHgpO1xuXG4gICAgICAgIGlmIChyZW1vdmVJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICB0aGlzLmNoZWNrZWRWYWx1ZXMuc3BsaWNlKHJlbW92ZUluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3Qgbm9kZUhhc0NoaWxkcmVuID0gbm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdICYmIG5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXS5sZW5ndGggPiAwO1xuICAgICAgaWYgKG5vZGVIYXNDaGlsZHJlbikge1xuICAgICAgICB0aGlzLl91cGRhdGVDaGlsZE5vZGVzQ2hlY2tlZFZhbHVlcyhub2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0sIGlkeCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNoZWNrZWRLZXlzLmVtaXQodGhpcy5jaGVja2VkVmFsdWVzKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUNoaWxkTm9kZXNDaGVja2VkVmFsdWVzKGNoaWxkcmVuTm9kZTogYW55LCBjaGlsZHJlbklkeDogc3RyaW5nKSB7XG4gICAgZm9yIChjb25zdCBbaW5kZXgsIG5vZGVdIG9mIGNoaWxkcmVuTm9kZS5lbnRyaWVzKCkpIHtcbiAgICAgIGNvbnN0IGlkeCA9IGNoaWxkcmVuSWR4ICsgJ18nICsgaW5kZXg7XG5cbiAgICAgIGlmIChub2RlW3RoaXMuY2hlY2tib3hlc0ZpZWxkXSAmJiAhdGhpcy5jaGVja2VkVmFsdWVzLmluY2x1ZGVzKGlkeCkpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkVmFsdWVzLnB1c2goaWR4KTtcbiAgICAgIH0gZWxzZSBpZiAoIW5vZGVbdGhpcy5jaGVja2JveGVzRmllbGRdICYmIHRoaXMuY2hlY2tlZFZhbHVlcy5pbmNsdWRlcyhpZHgpKSB7XG4gICAgICAgIGNvbnN0IHJlbW92ZUluZGV4ID0gdGhpcy5jaGVja2VkVmFsdWVzLmZpbmRJbmRleChlID0+IGUgPT09IGlkeCk7XG4gICAgICAgIGlmIChyZW1vdmVJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICB0aGlzLmNoZWNrZWRWYWx1ZXMuc3BsaWNlKHJlbW92ZUluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3Qgbm9kZUhhc0NoaWxkcmVuID0gbm9kZVt0aGlzLmNoaWxkcmVuRmllbGRdICYmIG5vZGVbdGhpcy5jaGlsZHJlbkZpZWxkXS5sZW5ndGggPiAwO1xuICAgICAgaWYgKG5vZGVIYXNDaGlsZHJlbikge1xuICAgICAgICB0aGlzLl91cGRhdGVDaGlsZE5vZGVzQ2hlY2tlZFZhbHVlcyhub2RlW3RoaXMuY2hpbGRyZW5GaWVsZF0sIGlkeCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=