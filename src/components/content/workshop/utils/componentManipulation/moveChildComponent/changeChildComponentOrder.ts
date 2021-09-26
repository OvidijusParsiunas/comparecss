import { TraverseComponentViaPreviewStructureParentFirst } from '../../componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { DropdownStructureTraversalState, SubcomponentPreviewTraversalState, TargetDetails } from '../../../../../../interfaces/componentTraversal';
import { BaseSubcomponentRef, Layer, SubcomponentNameToDropdownOptionName } from '../../../../../../interfaces/componentPreviewStructure';
import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { UpdateGenericComponentDropdownOptionNames } from '../updateChildComponent/updateGenericComponentDropdownOptionNames';
import { TraverseComponentViaDropdownStructure } from '../../componentTraversal/traverseComponentViaDropdownStructure';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/subcomponentOrderDirections.enum';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import ComponentTraversalUtils from '../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ArrayUtils } from '../../generic/arrayUtils';

type TraversalResultForChangeChildOrder = SubcomponentPreviewTraversalState & { childComponentOrderChanged: boolean };

type ChangeComponentTargetDetails = TargetDetails & { isLowerOrderDirection?: boolean };

export class ChangeChildComponentOrder {

  private static updateNames(targetDetails: ChangeComponentTargetDetails, subcomponentDropdownStructure: NestedDropdownStructure): void {
    const { masterComponent, parentLayerAlignedSections } = targetDetails;
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerDropdownStructure(masterComponent, subcomponentDropdownStructure, parentLayerAlignedSections);
  }

  private static swapSubcomponentDropdownStructure(subcomponentDropdownStructure: NestedDropdownStructure, currentOptionName: string,
      swappedOptionName: string): void {
    const temp = subcomponentDropdownStructure[swappedOptionName];
    subcomponentDropdownStructure[swappedOptionName] = subcomponentDropdownStructure[currentOptionName];
    subcomponentDropdownStructure[currentOptionName] = temp;
  }

  private static getActualObjectName(subcomponentDropdownStructure: NestedDropdownStructure, swappedOptionName: string): string {
    return (subcomponentDropdownStructure[swappedOptionName][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).actualObjectName;
  }

  private static swapSubcomponentNameToDropdownOptionNameMapDetails(subcomponentNameToDropdownOptionName: SubcomponentNameToDropdownOptionName,
      subcomponentDropdownStructure: NestedDropdownStructure, currentOptionName: string, swappedOptionName: string): void {
    subcomponentNameToDropdownOptionName[ChangeChildComponentOrder.getActualObjectName(subcomponentDropdownStructure, swappedOptionName)] = currentOptionName;
    subcomponentNameToDropdownOptionName[ChangeChildComponentOrder.getActualObjectName(subcomponentDropdownStructure, currentOptionName)] = swappedOptionName;
  }

  private static swapDropdownDetails(masterComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure,
      currentOptionName: string, swappedOptionName: string): void {
    ChangeChildComponentOrder.swapSubcomponentNameToDropdownOptionNameMapDetails(masterComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName,
      subcomponentDropdownStructure, currentOptionName, swappedOptionName);
    ChangeChildComponentOrder.swapSubcomponentDropdownStructure(subcomponentDropdownStructure, currentOptionName, swappedOptionName);
  }

  private static swapChildComponentInDropdown(targetDetails: ChangeComponentTargetDetails, traversalState: DropdownStructureTraversalState): void {
    const { dropdownOptionName: currentOptionName, subcomponentDropdownStructure, index } = traversalState;
    const dropdownOptionNames = Object.keys(subcomponentDropdownStructure);
    const swappedOptionIndex = targetDetails.isLowerOrderDirection ? index - 1 : index + 1;
    const swappedOptionName = dropdownOptionNames[swappedOptionIndex];
    ChangeChildComponentOrder.swapDropdownDetails(targetDetails.masterComponent, subcomponentDropdownStructure, currentOptionName, swappedOptionName);
    if (targetDetails.targetSubcomponentProperties.subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      ChangeChildComponentOrder.updateNames(targetDetails, subcomponentDropdownStructure);
    }
  }

  private static swapChildComponentInDropdownStructureIfFound(traversalState: DropdownStructureTraversalState): DropdownStructureTraversalState {
    const targetDetails = this as any as ChangeComponentTargetDetails;
    if (TraverseComponentViaDropdownStructure.isActualObjectNameMatching(targetDetails, traversalState)) {
      ChangeChildComponentOrder.swapChildComponentInDropdown(targetDetails, traversalState);
      return traversalState;
    }
    return null;
  }

  private static swapArrayElements(isLowerOrderDirection: boolean, index: number, componentsToSwap: BaseSubcomponentRef[] | Layer[]): boolean {
    if (isLowerOrderDirection && index !== 0) {
      ArrayUtils.changeElementPosition(componentsToSwap, index, index - 1);
      return true;
    } else if (!isLowerOrderDirection && index !== componentsToSwap.length - 1) {
      ArrayUtils.changeElementPosition(componentsToSwap, index, index + 1);
      return true;
    }
    return false;
  }

  private static swapChildComponentInPreviewStructureIfFound(traversalState: SubcomponentPreviewTraversalState): TraversalResultForChangeChildOrder {
    const { subcomponentProperties, alignedChildComponents, layers, index } = traversalState;
    const { targetSubcomponentProperties, isLowerOrderDirection } = this as any as ChangeComponentTargetDetails;
    if (targetSubcomponentProperties === subcomponentProperties) {
      const componentsToSwap = alignedChildComponents || layers;
      const isSwapped = ChangeChildComponentOrder.swapArrayElements(isLowerOrderDirection, index, componentsToSwap);
      return { ...traversalState, stopTraversal: true, childComponentOrderChanged: isSwapped };
    }
    return null;
  }

  public static change(direction: SUBCOMPONENT_ORDER_DIRECTIONS, masterComponent: WorkshopComponent): void {
    const targetDetails: ChangeComponentTargetDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent, masterComponent.activeSubcomponentName);
    targetDetails.isLowerOrderDirection = direction === SUBCOMPONENT_ORDER_DIRECTIONS.LEFT || direction === SUBCOMPONENT_ORDER_DIRECTIONS.UP;
    const traversalResult = TraverseComponentViaPreviewStructureParentFirst.traverseUsingComponent(
      ChangeChildComponentOrder.swapChildComponentInPreviewStructureIfFound.bind(targetDetails),
      masterComponent) as TraversalResultForChangeChildOrder;
    if (!traversalResult.childComponentOrderChanged) return;
    if (traversalResult) targetDetails.parentLayerAlignedSections = traversalResult.alignedSections;
    TraverseComponentViaDropdownStructure.traverse(
      masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      ChangeChildComponentOrder.swapChildComponentInDropdownStructureIfFound.bind(targetDetails));
  }
}
