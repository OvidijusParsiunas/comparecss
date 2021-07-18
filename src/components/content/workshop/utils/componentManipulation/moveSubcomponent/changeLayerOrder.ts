import ComponentTraversalUtils, { ComponentTraversalState } from '../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/subcomponentOrderDirections.enum';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateGenericComponentNames } from '../updateNestedComponentNames/updateGenericComponentNames';
import { UpdateLayerComponentNames } from '../updateNestedComponentNames/updateLayerComponentNames';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { AlignedSections } from '../../../../../../interfaces/componentPreviewStructure';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { ArrayUtils } from '../../generic/arrayUtils';
import { layer } from '@fortawesome/fontawesome-svg-core';

interface SubcomponentValues {
  direction: SUBCOMPONENT_ORDER_DIRECTIONS;
  subcomponentName: string;
  parentComponent: WorkshopComponent;
  subcomponentProperties: SubcomponentProperties;
  // parentLayerAlignedSections?: AlignedSections;
}

// WORK2
type CompositeTraversalResult = ComponentTraversalState & { nestedComponentMovable: boolean } 

export class ChangeLayerOrder {

  private static updateSubcomponentNames(subcomponentValues: SubcomponentValues, subcomponentDropdownStructure: NestedDropdownStructure,
      removedSubcomponentDropdownIndex: number): void {
    const { parentComponent } = subcomponentValues;
    UpdateLayerComponentNames.update(parentComponent, removedSubcomponentDropdownIndex);
  }

  private static setNewActiveSubcomponentName(subcomponentValues: SubcomponentValues, subcomponentDropdownStructure: NestedDropdownStructure,
      targetIndex: number): void {
    const dropdownOptionNames = Object.keys(subcomponentDropdownStructure);
    subcomponentValues.parentComponent.activeSubcomponentName = dropdownOptionNames[targetIndex];
  }

  private static moveObjectPropertyToEnd(subcomponentDropdownStructure: NestedDropdownStructure, propertyKey: string): void {
    const tempProp = subcomponentDropdownStructure[propertyKey];
    delete subcomponentDropdownStructure[propertyKey];
    subcomponentDropdownStructure[propertyKey] = tempProp;
  }

  private static moveObjectPropertiesAfterIndexToEnd(subcomponentDropdownStructure: NestedDropdownStructure, currentIndex: number): void {
    const dropdownOptionNames = Object.keys(subcomponentDropdownStructure);
    for (let i = currentIndex + 1; i < dropdownOptionNames.length - 1; i += 1) {
      ChangeLayerOrder.moveObjectPropertyToEnd(subcomponentDropdownStructure, dropdownOptionNames[i]);
    }
  }

  private static getRightMoveIndexes(initialDropdownOptionNames: string[], subcomponentName: string): number[] {
    const currentIndex = initialDropdownOptionNames.indexOf(subcomponentName);
    const targetIndex = currentIndex + 1;
    return [currentIndex, targetIndex];
  }

  private static getLeftMoveIndexes(initialDropdownOptionNames: string[], subcomponentName: string): number[] {
    const currentIndex = initialDropdownOptionNames.indexOf(subcomponentName) - 1;
    const targetIndex = currentIndex;
    return [currentIndex, targetIndex];
  }

  private static getMoveIndexes(direction: string, initialDropdownOptionNames: string[], subcomponentName: string): number[] {
    if (direction === SUBCOMPONENT_ORDER_DIRECTIONS.RIGHT) {
      return ChangeLayerOrder.getRightMoveIndexes(initialDropdownOptionNames, subcomponentName);
    }
    return ChangeLayerOrder.getLeftMoveIndexes(initialDropdownOptionNames, subcomponentName);
  }

  private static moveNestedComponentInDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentName, subcomponentDropdownStructure, index } = componentTraversalState;
    const subcomponentValues = this as any as SubcomponentValues;
    if (subcomponentValues.subcomponentName === subcomponentName) {
      const moveIndex = subcomponentValues.direction === SUBCOMPONENT_ORDER_DIRECTIONS.UP ? index - 1: index;
      const initialDropdownOptionNames = Object.keys(subcomponentDropdownStructure);
      ChangeLayerOrder.moveObjectPropertyToEnd(subcomponentDropdownStructure, initialDropdownOptionNames[moveIndex]);
      ChangeLayerOrder.moveObjectPropertiesAfterIndexToEnd(subcomponentDropdownStructure, moveIndex);
      ChangeLayerOrder.updateSubcomponentNames(subcomponentValues, subcomponentDropdownStructure, moveIndex);
      const newIndex = subcomponentValues.direction === SUBCOMPONENT_ORDER_DIRECTIONS.UP ? index - 1 : index + 1;
      subcomponentValues.parentComponent.activeSubcomponentName = subcomponentValues.parentComponent.componentPreviewStructure.layers[newIndex].name;
      return componentTraversalState;
    }
    return null;
  }

  private static moveNestedComponentInPreviewStructureIfFound(componentTraversalState: ComponentTraversalState): CompositeTraversalResult {
    const { subcomponentProperties, layers, index } = componentTraversalState;
    const { subcomponentProperties: targetSubcomponentProperties, direction } = this as any as SubcomponentValues;
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
    const subcomponentValues: SubcomponentValues = {
      subcomponentName: parentComponent.activeSubcomponentName,
      parentComponent,
      subcomponentProperties: parentComponent.subcomponents[parentComponent.activeSubcomponentName],
      direction,
    };
    const traversalResult = ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      parentComponent.componentPreviewStructure,
      ChangeLayerOrder.moveNestedComponentInPreviewStructureIfFound.bind(subcomponentValues)) as CompositeTraversalResult;
    if (!traversalResult.nestedComponentMovable) return;
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      parentComponent.componentPreviewStructure.subcomponentDropdownStructure,
      ChangeLayerOrder.moveNestedComponentInDropdownStructureIfFound.bind(subcomponentValues));
  }
}
