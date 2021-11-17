import { DropdownStructureTraversalState, DropdownTraversalResult, PreviewTraversalResult, SubcomponentPreviewTraversalState, TargetDetails } from '../../../../../../interfaces/componentTraversal';
import { TraverseComponentViaPreviewStructureParentFirst } from '../../componentTraversal/traverseComponentsViaPreviewStructure/traverseComponentsViaPreviewStructureParentFirst';
import { DropdownItemAuxDetails, DROPDOWN_ITEM_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownItemDisplayStatus';
import { UpdateContainerComponentDropdownItemNames } from '../updateChildComponent/updateContainerComponentDropdownItemNames';
import { TraverseComponentViaDropdownStructure } from '../../componentTraversal/traverseComponentViaDropdownStructure';
import { Layer, SubcomponentNameToDropdownItemName } from '../../../../../../interfaces/componentPreviewStructure';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/subcomponentOrderDirections.enum';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import ComponentTraversalUtils from '../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ArrayUtils } from '../../generic/arrayUtils';

type TraversalResultForChangeChildOrder = PreviewTraversalResult & { childComponentOrderChanged?: boolean };

type ChangeComponentTargetDetails = TargetDetails & { isLowerOrderDirection?: boolean };

export class ChangeChildComponentOrder {

  private static updateNames(targetDetails: ChangeComponentTargetDetails, subcomponentDropdownStructure: NestedDropdownStructure): void {
    const { masterComponent, parentLayerAlignmentSectionToComponents } = targetDetails;
    UpdateContainerComponentDropdownItemNames.updateViaParentLayerDropdownStructure(masterComponent,
      subcomponentDropdownStructure, parentLayerAlignmentSectionToComponents);
  }

  private static swapSubcomponentDropdownStructure(subcomponentDropdownStructure: NestedDropdownStructure, currentItemName: string,
      swappedItemName: string): void {
    const temp = subcomponentDropdownStructure[swappedItemName];
    subcomponentDropdownStructure[swappedItemName] = subcomponentDropdownStructure[currentItemName];
    subcomponentDropdownStructure[currentItemName] = temp;
  }

  private static getActualObjectName(subcomponentDropdownStructure: NestedDropdownStructure, swappedItemName: string): string {
    return (subcomponentDropdownStructure[swappedItemName][DROPDOWN_ITEM_AUX_DETAILS_REF] as DropdownItemAuxDetails).actualObjectName;
  }

  private static swapSubcomponentNameToDropdownItemNameMapDetails(subcomponentNameToDropdownItemName: SubcomponentNameToDropdownItemName,
      subcomponentDropdownStructure: NestedDropdownStructure, currentItemName: string, swappedItemName: string): void {
    subcomponentNameToDropdownItemName[ChangeChildComponentOrder.getActualObjectName(subcomponentDropdownStructure, swappedItemName)] = currentItemName;
    subcomponentNameToDropdownItemName[ChangeChildComponentOrder.getActualObjectName(subcomponentDropdownStructure, currentItemName)] = swappedItemName;
  }

  private static swapDropdownDetails(masterComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure,
      currentItemName: string, swappedItemName: string): void {
    ChangeChildComponentOrder.swapSubcomponentNameToDropdownItemNameMapDetails(masterComponent.componentPreviewStructure.subcomponentNameToDropdownItemName,
      subcomponentDropdownStructure, currentItemName, swappedItemName);
    ChangeChildComponentOrder.swapSubcomponentDropdownStructure(subcomponentDropdownStructure, currentItemName, swappedItemName);
  }

  private static swapChildComponentInDropdown(targetDetails: ChangeComponentTargetDetails, traversalState: DropdownStructureTraversalState): void {
    const { dropdownItemName: currentItemName, subcomponentDropdownStructure, index } = traversalState;
    const dropdownItemNames = Object.keys(subcomponentDropdownStructure);
    const swappedItemIndex = targetDetails.isLowerOrderDirection ? index - 1 : index + 1;
    const swappedItemName = dropdownItemNames[swappedItemIndex];
    ChangeChildComponentOrder.swapDropdownDetails(targetDetails.masterComponent, subcomponentDropdownStructure, currentItemName, swappedItemName);
    if (targetDetails.targetSubcomponent.subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      ChangeChildComponentOrder.updateNames(targetDetails, subcomponentDropdownStructure);
    }
  }

  private static swapChildComponentInDropdownStructureIfFound(traversalState: DropdownStructureTraversalState): DropdownTraversalResult {
    const targetDetails = this as any as ChangeComponentTargetDetails;
    if (TraverseComponentViaDropdownStructure.isActualObjectNameMatching(targetDetails, traversalState)) {
      ChangeChildComponentOrder.swapChildComponentInDropdown(targetDetails, traversalState);
      return { stopTraversal: true };
    }
    return {};
  }

  private static swapArrayElements(isLowerOrderDirection: boolean, index: number, componentsToSwap: WorkshopComponent[] | Layer[]): boolean {
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
    const { subcomponent, alignedComponents, layers, index } = traversalState;
    const { targetSubcomponent, isLowerOrderDirection } = this as any as ChangeComponentTargetDetails;
    if (targetSubcomponent === subcomponent) {
      const componentsToSwap = alignedComponents || layers;
      const isSwapped = ChangeChildComponentOrder.swapArrayElements(isLowerOrderDirection, index, componentsToSwap);
      return { stopTraversal: true, traversalState, childComponentOrderChanged: isSwapped };
    }
    return {};
  }

  public static change(direction: SUBCOMPONENT_ORDER_DIRECTIONS, masterComponent: WorkshopComponent): void {
    const targetDetails: ChangeComponentTargetDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent, masterComponent.activeSubcomponentName);
    targetDetails.isLowerOrderDirection = direction === SUBCOMPONENT_ORDER_DIRECTIONS.LEFT || direction === SUBCOMPONENT_ORDER_DIRECTIONS.UP;
    const traversalResult = TraverseComponentViaPreviewStructureParentFirst.traverse(
      ChangeChildComponentOrder.swapChildComponentInPreviewStructureIfFound.bind(targetDetails),
      masterComponent) as TraversalResultForChangeChildOrder;
    if (!traversalResult.childComponentOrderChanged) return;
    if (traversalResult.traversalState) targetDetails.parentLayerAlignmentSectionToComponents = traversalResult.traversalState.alignmentSectionToComponents;
    TraverseComponentViaDropdownStructure.traverse(
      masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      ChangeChildComponentOrder.swapChildComponentInDropdownStructureIfFound.bind(targetDetails));
  }
}
