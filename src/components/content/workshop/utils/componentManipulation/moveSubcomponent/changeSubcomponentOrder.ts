import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { AlignedSections, SubcomponentNameToDropdownOptionName } from '../../../../../../interfaces/componentPreviewStructure';
import ComponentTraversalUtils, { ComponentTraversalState } from '../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/subcomponentOrderDirections.enum';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { ArrayUtils } from '../../generic/arrayUtils';

interface SubcomponentValues {
  direction: SUBCOMPONENT_ORDER_DIRECTIONS;
  targetSubcomponentName: string;
  targetDropdownOptionName: string;
  parentComponent: WorkshopComponent;
  targetSubcomponentProperties: SubcomponentProperties;
  parentLayerAlignedSections?: AlignedSections;
}

type CompositeTraversalResult = ComponentTraversalState & { nestedComponentMovable: boolean } 

export class ChangeSubcomponentOrder {

  private static swapSubcomponentDropdownStructure(subcomponentDropdownStructure: NestedDropdownStructure, currentName: string,
      destinationName: string): void {
    const temp = subcomponentDropdownStructure[destinationName];
    subcomponentDropdownStructure[destinationName] = subcomponentDropdownStructure[currentName];
    subcomponentDropdownStructure[currentName] = temp;
  }

  private static getActualObjectName(subcomponentDropdownStructure: NestedDropdownStructure, destinationName: string): string {
    return (subcomponentDropdownStructure[destinationName][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).actualObjectName;
  }

  private static swapSubcomponentNameToDropdownOptionNameDetails(subcomponentNameToDropdownOptionName: SubcomponentNameToDropdownOptionName,
      subcomponentDropdownStructure: NestedDropdownStructure, currentName: string, destinationName: string): void {
    subcomponentNameToDropdownOptionName[ChangeSubcomponentOrder.getActualObjectName(subcomponentDropdownStructure, destinationName)] = currentName;
    subcomponentNameToDropdownOptionName[ChangeSubcomponentOrder.getActualObjectName(subcomponentDropdownStructure, currentName)] = destinationName;
  }

  private static swapDetails(parentComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure,
      currentDropdownName: string, swappedDropdownName: string): void {
    ChangeSubcomponentOrder.swapSubcomponentNameToDropdownOptionNameDetails(parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName,
      subcomponentDropdownStructure, currentDropdownName, swappedDropdownName);
    ChangeSubcomponentOrder.swapSubcomponentDropdownStructure(subcomponentDropdownStructure, currentDropdownName, swappedDropdownName);
  }

  private static isActualObjectNameMatching(subcomponentValues: SubcomponentValues, componentTraversalState: ComponentTraversalState): boolean {
    const { dropdownOptionName, subcomponentDropdownStructure } = componentTraversalState;
    const { targetDropdownOptionName, targetSubcomponentName } = subcomponentValues;
    if (targetDropdownOptionName !== dropdownOptionName) return false;
    const { actualObjectName } = subcomponentDropdownStructure[dropdownOptionName][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails;
    if (actualObjectName) return targetSubcomponentName === actualObjectName;
    return true;
  }

  private static moveNestedComponentInDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { dropdownOptionName, subcomponentDropdownStructure } = componentTraversalState;
    const subcomponentValues = this as any as SubcomponentValues;
    if (ChangeSubcomponentOrder.isActualObjectNameMatching(subcomponentValues, componentTraversalState)) {
      const initialDropdownOptionNames = Object.keys(subcomponentDropdownStructure);
      const currentIndex = initialDropdownOptionNames.indexOf(dropdownOptionName);
      const swappedDropdownName = subcomponentValues.direction === SUBCOMPONENT_ORDER_DIRECTIONS.LEFT
        ? initialDropdownOptionNames[currentIndex - 1] : initialDropdownOptionNames[currentIndex + 1];
      ChangeSubcomponentOrder.swapDetails(subcomponentValues.parentComponent, subcomponentDropdownStructure, dropdownOptionName, swappedDropdownName);
      return componentTraversalState;
    }
    return null;
  }

  private static moveNestedComponentInPreviewStructureIfFound(componentTraversalState: ComponentTraversalState): CompositeTraversalResult {
    const { subcomponentProperties, alignedNestedComponents, index } = componentTraversalState;
    const { targetSubcomponentProperties, direction } = this as any as SubcomponentValues;
    if (targetSubcomponentProperties === subcomponentProperties) {
      if (direction === SUBCOMPONENT_ORDER_DIRECTIONS.RIGHT && index !== alignedNestedComponents.length - 1) {
        ArrayUtils.changeElementPosition(alignedNestedComponents, index, index + 1);
        return { ...componentTraversalState, nestedComponentMovable: true };
      } else if (direction === SUBCOMPONENT_ORDER_DIRECTIONS.LEFT && index !== 0) {
        ArrayUtils.changeElementPosition(alignedNestedComponents, index, index - 1);
        return { ...componentTraversalState, nestedComponentMovable: true };
      }
      return { ...componentTraversalState, nestedComponentMovable: false };
    }
    return null;
  }

  public static change(direction: SUBCOMPONENT_ORDER_DIRECTIONS, parentComponent: WorkshopComponent): void {
    const subcomponentValues: SubcomponentValues = {
      targetSubcomponentName: parentComponent.activeSubcomponentName,
      targetDropdownOptionName: parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[parentComponent.activeSubcomponentName],
      parentComponent,
      targetSubcomponentProperties: parentComponent.subcomponents[parentComponent.activeSubcomponentName],
      direction,
    };
    const traversalResult = ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      parentComponent.componentPreviewStructure,
      ChangeSubcomponentOrder.moveNestedComponentInPreviewStructureIfFound.bind(subcomponentValues)) as CompositeTraversalResult;
    if (!traversalResult.nestedComponentMovable) return;
    if (traversalResult) subcomponentValues.parentLayerAlignedSections = traversalResult.alignedSections;
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      parentComponent.componentPreviewStructure.subcomponentDropdownStructure,
      ChangeSubcomponentOrder.moveNestedComponentInDropdownStructureIfFound.bind(subcomponentValues));
  }
}
