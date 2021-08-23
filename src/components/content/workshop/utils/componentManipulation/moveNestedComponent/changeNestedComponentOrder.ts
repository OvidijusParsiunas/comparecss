import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { UpdateGenericComponentDropdownOptionNames } from '../updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { SubcomponentNameToDropdownOptionName } from '../../../../../../interfaces/componentPreviewStructure';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/subcomponentOrderDirections.enum';
import { ComponentTraversalState, TargetDetails } from '../../../../../../interfaces/componentTraversal';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import ComponentTraversalUtils from '../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../activeComponent/activeComponentUtils';
import { ArrayUtils } from '../../generic/arrayUtils';

type CompositeTraversalResult = ComponentTraversalState & { nestedComponentMovable: boolean } 
type ChangeComponentTargetDetails = TargetDetails & { isLowerOrderDirection?: boolean }

export class ChangeNestedComponentOrder {

  private static updateNames(targetDetails: TargetDetails, subcomponentDropdownStructure: NestedDropdownStructure): void {
    const { parentComponent, parentLayerAlignedSections } = targetDetails;
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerDropdownStructure(parentComponent, subcomponentDropdownStructure, parentLayerAlignedSections);
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
    subcomponentNameToDropdownOptionName[ChangeNestedComponentOrder.getActualObjectName(subcomponentDropdownStructure, swappedOptionName)] = currentOptionName;
    subcomponentNameToDropdownOptionName[ChangeNestedComponentOrder.getActualObjectName(subcomponentDropdownStructure, currentOptionName)] = swappedOptionName;
  }

  private static swapDropdownDetails(parentComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure,
      currentOptionName: string, swappedOptionName: string): void {
    ChangeNestedComponentOrder.swapSubcomponentNameToDropdownOptionNameMapDetails(parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName,
      subcomponentDropdownStructure, currentOptionName, swappedOptionName);
    ChangeNestedComponentOrder.swapSubcomponentDropdownStructure(subcomponentDropdownStructure, currentOptionName, swappedOptionName);
  }

  private static swapNestedComponentInDropdown(targetDetails: ChangeComponentTargetDetails, componentTraversalState: ComponentTraversalState): void {
    const { dropdownOptionName: currentOptionName, subcomponentDropdownStructure, index } = componentTraversalState;
    const dropdownOptionNames = Object.keys(subcomponentDropdownStructure);
    const swappedOptionIndex = targetDetails.isLowerOrderDirection ? index - 1 : index + 1;
    const swappedOptionName = dropdownOptionNames[swappedOptionIndex];
    ChangeNestedComponentOrder.swapDropdownDetails(targetDetails.parentComponent, subcomponentDropdownStructure, currentOptionName, swappedOptionName);
    if (targetDetails.targetSubcomponentProperties.subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      ChangeNestedComponentOrder.updateNames(targetDetails, subcomponentDropdownStructure);
    }
  }

  private static swapNestedComponentInDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const targetDetails = this as any as ChangeComponentTargetDetails;
    if (ComponentTraversalUtils.isActualObjectNameMatching(targetDetails, componentTraversalState)) {
      ChangeNestedComponentOrder.swapNestedComponentInDropdown(targetDetails, componentTraversalState);
      return componentTraversalState;
    }
    return null;
  }

  private static swapNestedComponentInPreviewStructureIfFound(componentTraversalState: ComponentTraversalState): CompositeTraversalResult {
    const { subcomponentProperties, alignedNestedComponents, layers, index } = componentTraversalState;
    const { targetSubcomponentProperties, isLowerOrderDirection } = this as any as ChangeComponentTargetDetails;
    if (targetSubcomponentProperties === subcomponentProperties) {
      const componentPreviewContainer = alignedNestedComponents || layers;
      if (isLowerOrderDirection && index !== 0) {
        ArrayUtils.changeElementPosition(componentPreviewContainer, index, index - 1);
        return { ...componentTraversalState, nestedComponentMovable: true };
      } else if (!isLowerOrderDirection && index !== componentPreviewContainer.length - 1) {
        ArrayUtils.changeElementPosition(componentPreviewContainer, index, index + 1);
        return { ...componentTraversalState, nestedComponentMovable: true };
      }
      return { ...componentTraversalState, nestedComponentMovable: false };
    }
    return null;
  }

  public static change(parentComponent: WorkshopComponent, direction: SUBCOMPONENT_ORDER_DIRECTIONS): void {
    const { masterComponent } = ActiveComponentUtils.getBaseComponents(parentComponent);
    const targetDetails: ChangeComponentTargetDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent, masterComponent.activeSubcomponentName);
    targetDetails.isLowerOrderDirection = direction === SUBCOMPONENT_ORDER_DIRECTIONS.LEFT || direction === SUBCOMPONENT_ORDER_DIRECTIONS.UP;
    const traversalResult = ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      parentComponent.componentPreviewStructure,
      ChangeNestedComponentOrder.swapNestedComponentInPreviewStructureIfFound.bind(targetDetails)) as CompositeTraversalResult;
    if (!traversalResult.nestedComponentMovable) return;
    if (traversalResult) targetDetails.parentLayerAlignedSections = traversalResult.alignedSections;
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      ChangeNestedComponentOrder.swapNestedComponentInDropdownStructureIfFound.bind(targetDetails));
  }
}
