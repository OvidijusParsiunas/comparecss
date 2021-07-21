import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import ComponentTraversalUtils, { ComponentTraversalState } from '../../componentTraversal/componentTraversalUtils';
import { SubcomponentNameToDropdownOptionName } from '../../../../../../interfaces/componentPreviewStructure';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/subcomponentOrderDirections.enum';
import { ChangeOrderTargetDetails } from '../../../../../../interfaces/changeOrderTargetDetails';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ChangeLayerOrderShared } from './changeLayerOrderShared';
import { ArrayUtils } from '../../generic/arrayUtils';

type CompositeTraversalResult = ComponentTraversalState & { nestedComponentMovable: boolean } 

export class ChangeLayerOrder extends ChangeLayerOrderShared {

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
    subcomponentNameToDropdownOptionName[ChangeLayerOrder.getActualObjectName(subcomponentDropdownStructure, destinationName)] = currentName;
    subcomponentNameToDropdownOptionName[ChangeLayerOrder.getActualObjectName(subcomponentDropdownStructure, currentName)] = destinationName;
  }

  private static swapDetails(parentComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure,
      destinationIndex: number, currentIndex: number): void {
    const dropdownNames = Object.keys(subcomponentDropdownStructure);
    const currentName = dropdownNames[currentIndex];
    const destinationName = dropdownNames[destinationIndex];
    ChangeLayerOrder.swapSubcomponentNameToDropdownOptionNameDetails(parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName,
      subcomponentDropdownStructure, currentName, destinationName);
    ChangeLayerOrder.swapSubcomponentDropdownStructure(subcomponentDropdownStructure, currentName, destinationName);
  }

  private static moveNestedComponentInDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentDropdownStructure, index: currentIndex } = componentTraversalState;
    const targetDetails = this as any as ChangeOrderTargetDetails;
    if (ComponentTraversalUtils.isActualObjectNameMatching(targetDetails, componentTraversalState)) {
      const destinationIndex = targetDetails.direction === SUBCOMPONENT_ORDER_DIRECTIONS.UP ? currentIndex - 1 : currentIndex + 1;
      ChangeLayerOrder.swapDetails(targetDetails.parentComponent, subcomponentDropdownStructure, destinationIndex, currentIndex)
      return componentTraversalState;
    }
    return null;
  }

  private static moveNestedComponentInPreviewStructureIfFound(componentTraversalState: ComponentTraversalState): CompositeTraversalResult {
    const { subcomponentProperties, layers, index } = componentTraversalState;
    const { targetSubcomponentProperties, direction } = this as any as ChangeOrderTargetDetails;
    if (targetSubcomponentProperties === subcomponentProperties) {
      if (direction === SUBCOMPONENT_ORDER_DIRECTIONS.UP && index !== 0) {
        ArrayUtils.changeElementPosition(layers, index, index - 1);
        return { ...componentTraversalState, nestedComponentMovable: true };
      } else if (direction === SUBCOMPONENT_ORDER_DIRECTIONS.DOWN && index !== layers.length - 1) {
        ArrayUtils.changeElementPosition(layers, index, index + 1);
        return { ...componentTraversalState, nestedComponentMovable: true };
      }
      return { ...componentTraversalState, nestedComponentMovable: false };
    }
    return null;
  }

  public static change(direction: SUBCOMPONENT_ORDER_DIRECTIONS, parentComponent: WorkshopComponent): void {
    const targetDetails = ChangeLayerOrderShared.generateTargetSubcomponent(direction, parentComponent);
    const traversalResult = ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      parentComponent.componentPreviewStructure,
      ChangeLayerOrder.moveNestedComponentInPreviewStructureIfFound.bind(targetDetails)) as CompositeTraversalResult;
    if (!traversalResult.nestedComponentMovable) return;
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      parentComponent.componentPreviewStructure.subcomponentDropdownStructure,
      ChangeLayerOrder.moveNestedComponentInDropdownStructureIfFound.bind(targetDetails));
  }
}
