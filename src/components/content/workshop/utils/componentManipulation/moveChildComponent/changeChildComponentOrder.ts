import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { UpdateGenericComponentDropdownOptionNames } from '../updateChildComponent/updateGenericComponentDropdownOptionNames';
import { SubcomponentNameToDropdownOptionName } from '../../../../../../interfaces/componentPreviewStructure';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/subcomponentOrderDirections.enum';
import { ComponentTraversalState, TargetDetails } from '../../../../../../interfaces/componentTraversal';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import ComponentTraversalUtils from '../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ArrayUtils } from '../../generic/arrayUtils';

type CompositeTraversalResult = ComponentTraversalState & { childComponentMovable: boolean } 
type ChangeComponentTargetDetails = TargetDetails & { isLowerOrderDirection?: boolean }

export class ChangeChildComponentOrder {

  private static updateNames(targetDetails: TargetDetails, subcomponentDropdownStructure: NestedDropdownStructure): void {
    const { containerComponent, parentLayerAlignedSections } = targetDetails;
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerDropdownStructure(containerComponent, subcomponentDropdownStructure, parentLayerAlignedSections);
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

  private static swapDropdownDetails(containerComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure,
      currentOptionName: string, swappedOptionName: string): void {
    ChangeChildComponentOrder.swapSubcomponentNameToDropdownOptionNameMapDetails(containerComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName,
      subcomponentDropdownStructure, currentOptionName, swappedOptionName);
    ChangeChildComponentOrder.swapSubcomponentDropdownStructure(subcomponentDropdownStructure, currentOptionName, swappedOptionName);
  }

  private static swapChildComponentInDropdown(targetDetails: ChangeComponentTargetDetails, componentTraversalState: ComponentTraversalState): void {
    const { dropdownOptionName: currentOptionName, subcomponentDropdownStructure, index } = componentTraversalState;
    const dropdownOptionNames = Object.keys(subcomponentDropdownStructure);
    const swappedOptionIndex = targetDetails.isLowerOrderDirection ? index - 1 : index + 1;
    const swappedOptionName = dropdownOptionNames[swappedOptionIndex];
    ChangeChildComponentOrder.swapDropdownDetails(targetDetails.containerComponent, subcomponentDropdownStructure, currentOptionName, swappedOptionName);
    if (targetDetails.targetSubcomponentProperties.subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      ChangeChildComponentOrder.updateNames(targetDetails, subcomponentDropdownStructure);
    }
  }

  private static swapChildComponentInDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const targetDetails = this as any as ChangeComponentTargetDetails;
    if (ComponentTraversalUtils.isActualObjectNameMatching(targetDetails, componentTraversalState)) {
      ChangeChildComponentOrder.swapChildComponentInDropdown(targetDetails, componentTraversalState);
      return componentTraversalState;
    }
    return null;
  }

  private static swapChildComponentInPreviewStructureIfFound(componentTraversalState: ComponentTraversalState): CompositeTraversalResult {
    const { subcomponentProperties, alignedChildComponents, layers, index } = componentTraversalState;
    const { targetSubcomponentProperties, isLowerOrderDirection } = this as any as ChangeComponentTargetDetails;
    if (targetSubcomponentProperties === subcomponentProperties) {
      const componentPreviewContainer = alignedChildComponents || layers;
      if (isLowerOrderDirection && index !== 0) {
        ArrayUtils.changeElementPosition(componentPreviewContainer, index, index - 1);
        return { ...componentTraversalState, childComponentMovable: true };
      } else if (!isLowerOrderDirection && index !== componentPreviewContainer.length - 1) {
        ArrayUtils.changeElementPosition(componentPreviewContainer, index, index + 1);
        return { ...componentTraversalState, childComponentMovable: true };
      }
      return { ...componentTraversalState, childComponentMovable: false };
    }
    return null;
  }

  public static change(masterComponent: WorkshopComponent, direction: SUBCOMPONENT_ORDER_DIRECTIONS): void {
    const targetDetails: ChangeComponentTargetDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent, masterComponent.activeSubcomponentName);
    targetDetails.isLowerOrderDirection = direction === SUBCOMPONENT_ORDER_DIRECTIONS.LEFT || direction === SUBCOMPONENT_ORDER_DIRECTIONS.UP;
    const traversalResult = ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      masterComponent.componentPreviewStructure,
      ChangeChildComponentOrder.swapChildComponentInPreviewStructureIfFound.bind(targetDetails)) as CompositeTraversalResult;
    if (!traversalResult.childComponentMovable) return;
    if (traversalResult) targetDetails.parentLayerAlignedSections = traversalResult.alignedSections;
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      ChangeChildComponentOrder.swapChildComponentInDropdownStructureIfFound.bind(targetDetails));
  }
}
