import { DropdownStructureTraversalState, TargetDetails, DropdownTraversalCallback } from '../../../../../interfaces/componentTraversal';
import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../interfaces/dropdownOptionDisplayStatus';
import { NestedDropdownStructure } from '../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import ComponentTraversalUtils from './componentTraversalUtils';

type TraversalCallback = DropdownTraversalCallback<DropdownStructureTraversalState>

type DropdownStructureSearchFromStartCallback = (
  containerComponent: WorkshopComponent,
  dropdownStructure: NestedDropdownStructure,
  ...args: unknown[]) => unknown;

export class TraverseComponentViaDropdownStructure {

  private static inspectSubcomponent(subcomponentDropdownStructure: NestedDropdownStructure, index: number,
      callback: TraversalCallback, dropdownOptionDetailsStack: DropdownOptionAuxDetails[], dropdownOptionName: string): DropdownStructureTraversalState {
    if (dropdownOptionName === DROPDOWN_OPTION_AUX_DETAILS_REF) return null;
    const callbackResult = callback({dropdownOptionName, subcomponentDropdownStructure, dropdownOptionDetailsStack, index});
    if (callbackResult) return callbackResult;
    if (Object.keys(subcomponentDropdownStructure[dropdownOptionName]).length > 0) {
      dropdownOptionDetailsStack.push(null);
      const traversalResult = TraverseComponentViaDropdownStructure.traverse(
        subcomponentDropdownStructure[dropdownOptionName] as NestedDropdownStructure, callback, dropdownOptionDetailsStack);
      if (traversalResult) return traversalResult;
      dropdownOptionDetailsStack.splice(dropdownOptionDetailsStack.length - 1, 1);
    }
    return null;
  }

  public static traverse(subcomponentDropdownStructure: NestedDropdownStructure, callback: TraversalCallback,
      dropdownOptionDetailsStack?: DropdownOptionAuxDetails[]): DropdownStructureTraversalState {
    if (!dropdownOptionDetailsStack) dropdownOptionDetailsStack = [null];
    const subcomponentDropdownStructureKeys = Object.keys(subcomponentDropdownStructure);
    for (let i = 0; i < subcomponentDropdownStructureKeys.length; i += 1) {
      const subcomponentName = subcomponentDropdownStructureKeys[i];
      dropdownOptionDetailsStack[dropdownOptionDetailsStack.length - 1] = subcomponentDropdownStructure
        [subcomponentName][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails;
      const inspectionResult = TraverseComponentViaDropdownStructure.inspectSubcomponent(subcomponentDropdownStructure, i,
        callback, dropdownOptionDetailsStack, subcomponentName);
      if (inspectionResult) return inspectionResult;
    }
    return null;
  }

  public static isActualObjectNameMatching(targetDetails: TargetDetails, traversalState: DropdownStructureTraversalState): boolean {
    const { dropdownOptionName, subcomponentDropdownStructure } = traversalState;
    const { targetDropdownOptionName, targetSubcomponentName } = targetDetails;
    if (targetDropdownOptionName !== dropdownOptionName) return false;
    // if there is no DROPDOWN_OPTION_AUX_DETAILS_REF - the component can be considered as the base and return true
    const { actualObjectName } = subcomponentDropdownStructure[dropdownOptionName]?.[DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails || {};
    if (actualObjectName) return targetSubcomponentName === actualObjectName;
    return true;
  }

  private static proceedToInvokeCallbackIfFound(containerComponent: WorkshopComponent, callback: DropdownStructureSearchFromStartCallback,
      args: unknown[], traversalState: DropdownStructureTraversalState): unknown {
    const targetDetails = this as any as TargetDetails;
    if (TraverseComponentViaDropdownStructure.isActualObjectNameMatching(targetDetails, traversalState)) {
      const { subcomponentDropdownStructure } = traversalState;
      return callback(containerComponent, subcomponentDropdownStructure, ...args);
    }
    return null;
  }

  public static traverseUsingComponent(parentOptionComponent: WorkshopComponent, callback: DropdownStructureSearchFromStartCallback, ...args: unknown[]): unknown {
    const masterComponent = parentOptionComponent.masterComponent;
    const targetDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent, masterComponent.activeSubcomponentName);
    return TraverseComponentViaDropdownStructure.traverse(
      masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      TraverseComponentViaDropdownStructure.proceedToInvokeCallbackIfFound.bind(targetDetails,
        parentOptionComponent, callback, args)) as WorkshopComponent;
  }
}