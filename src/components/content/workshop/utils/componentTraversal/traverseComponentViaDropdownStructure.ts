import { DropdownStructureSearchFromStartCallback, DropdownStructureTraversalState, DropdownTraversalCallback, DropdownTraversalResult, TargetDetails } from '../../../../../interfaces/componentTraversal';
import { DropdownItemAuxDetails, DROPDOWN_ITEM_AUX_DETAILS_REF } from '../../../../../interfaces/dropdownItemDisplayStatus';
import { NestedDropdownStructure } from '../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import ComponentTraversalUtils from './componentTraversalUtils';

export class TraverseComponentViaDropdownStructure {

  private static inspectSubcomponent<T>(subcomponentDropdownStructure: NestedDropdownStructure, index: number,
      callback: DropdownTraversalCallback<T>, dropdownItemDetailsStack: DropdownItemAuxDetails[], dropdownItemName: string): DropdownTraversalResult<T> {
    if (dropdownItemName === DROPDOWN_ITEM_AUX_DETAILS_REF) return {};
    const callbackResult = callback({dropdownItemName, subcomponentDropdownStructure, dropdownItemDetailsStack, index});
    if (callbackResult.stopTraversal) return callbackResult;
    if (Object.keys(subcomponentDropdownStructure[dropdownItemName]).length > 0) {
      dropdownItemDetailsStack.push(null);
      const traversalResult = TraverseComponentViaDropdownStructure.traverse(
        subcomponentDropdownStructure[dropdownItemName] as NestedDropdownStructure, callback, dropdownItemDetailsStack);
      if (traversalResult) return traversalResult;
      dropdownItemDetailsStack.splice(dropdownItemDetailsStack.length - 1, 1);
    }
    return {};
  }

  public static traverse<T>(subcomponentDropdownStructure: NestedDropdownStructure, callback: DropdownTraversalCallback<T>,
      dropdownItemDetailsStack?: DropdownItemAuxDetails[]): DropdownTraversalResult<T> {
    if (!dropdownItemDetailsStack) dropdownItemDetailsStack = [null];
    const subcomponentDropdownStructureKeys = Object.keys(subcomponentDropdownStructure);
    for (let i = 0; i < subcomponentDropdownStructureKeys.length; i += 1) {
      const subcomponentName = subcomponentDropdownStructureKeys[i];
      dropdownItemDetailsStack[dropdownItemDetailsStack.length - 1] = subcomponentDropdownStructure
        [subcomponentName][DROPDOWN_ITEM_AUX_DETAILS_REF] as DropdownItemAuxDetails;
      const inspectionResult = TraverseComponentViaDropdownStructure.inspectSubcomponent(subcomponentDropdownStructure, i,
        callback, dropdownItemDetailsStack, subcomponentName);
      if (inspectionResult.stopTraversal) return inspectionResult;
    }
    return {};
  }

  public static isActualObjectNameMatching(targetDetails: TargetDetails, traversalState: DropdownStructureTraversalState): boolean {
    const { dropdownItemName, subcomponentDropdownStructure } = traversalState;
    const { targetDropdownItemName, targetSubcomponentName } = targetDetails;
    if (targetDropdownItemName !== dropdownItemName) return false;
    // if there is no DROPDOWN_ITEM_AUX_DETAILS_REF - the component can be considered as the base and return true
    const { actualObjectName } = subcomponentDropdownStructure[dropdownItemName]?.[DROPDOWN_ITEM_AUX_DETAILS_REF] as DropdownItemAuxDetails || {};
    if (actualObjectName) return targetSubcomponentName === actualObjectName;
    return true;
  }

  private static proceedToInvokeCallbackIfFound<T>(containerComponent: WorkshopComponent, callback: DropdownStructureSearchFromStartCallback<T>,
      args: unknown[], traversalState: DropdownStructureTraversalState): DropdownTraversalResult<T> {
    const targetDetails = this as any as TargetDetails;
    if (TraverseComponentViaDropdownStructure.isActualObjectNameMatching(targetDetails, traversalState)) {
      const { subcomponentDropdownStructure } = traversalState;
      return { stopTraversal: true, result: callback(containerComponent, subcomponentDropdownStructure, ...args) };
    }
    return {};
  }

  public static traverseUsingComponent<T>(parentItemComponent: WorkshopComponent, callback: DropdownStructureSearchFromStartCallback<T>, ...args: unknown[]): DropdownTraversalResult<T> {
    const masterComponent = parentItemComponent.masterComponent;
    const targetDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent, masterComponent.activeSubcomponentName);
    return TraverseComponentViaDropdownStructure.traverse(
      masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      TraverseComponentViaDropdownStructure.proceedToInvokeCallbackIfFound.bind(targetDetails,
        parentItemComponent, callback, args));
  }
}