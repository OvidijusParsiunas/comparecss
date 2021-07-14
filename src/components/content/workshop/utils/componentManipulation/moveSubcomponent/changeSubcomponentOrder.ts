import ComponentTraversalUtils, { ComponentTraversalState } from '../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/subcomponentOrderDirections.enum';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateGenericComponentNames } from '../updateNestedComponentNames/updateGenericComponentNames';
import { UpdateLayerComponentNames } from '../updateNestedComponentNames/updateLayerComponentNames';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { AlignedSections } from '../../../../../../interfaces/componentPreviewStructure';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { ArrayUtils } from '../../generic/arrayUtils';

interface SubcomponentValues {
  direction: SUBCOMPONENT_ORDER_DIRECTIONS;
  subcomponentName: string;
  parentComponent: WorkshopComponent;
  subcomponentProperties: SubcomponentProperties;
  parentLayerAlignedSections?: AlignedSections;
}

export class ChangeSubcomponentOrder {

  private static readonly OUT_OF_BOUNDS_INDEX = -1;

  private static updateSubcomponentNames(subcomponentValues: SubcomponentValues, subcomponentDropdownStructure: NestedDropdownStructure,
      removedSubcomponentDropdownIndex: number): void {
    const { parentComponent, subcomponentProperties: { subcomponentType }, parentLayerAlignedSections } = subcomponentValues;
    if (subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      UpdateGenericComponentNames.update(parentComponent, subcomponentDropdownStructure, parentLayerAlignedSections);
    } else {
      UpdateLayerComponentNames.update(parentComponent, removedSubcomponentDropdownIndex + 1);
    }
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
      ChangeSubcomponentOrder.moveObjectPropertyToEnd(subcomponentDropdownStructure, dropdownOptionNames[i]);
    }
  }

  private static getRightMoveIndexes(initialDropdownOptionNames: string[], subcomponentName: string): number[] {
    const currentIndex = initialDropdownOptionNames.indexOf(subcomponentName);
    if (currentIndex === initialDropdownOptionNames.length - 1) return [ChangeSubcomponentOrder.OUT_OF_BOUNDS_INDEX, ChangeSubcomponentOrder.OUT_OF_BOUNDS_INDEX];
    const targetIndex = currentIndex + 1;
    return [currentIndex, targetIndex];
  }

  private static getLeftMoveIndexes(initialDropdownOptionNames: string[], subcomponentName: string): number[] {
    const currentIndex = initialDropdownOptionNames.indexOf(subcomponentName) - 1;
    if (currentIndex === 0) return [ChangeSubcomponentOrder.OUT_OF_BOUNDS_INDEX, ChangeSubcomponentOrder.OUT_OF_BOUNDS_INDEX];
    const targetIndex = currentIndex;
    return [currentIndex, targetIndex];
  }

  private static getMoveIndexes(direction: string, initialDropdownOptionNames: string[], subcomponentName: string): number[] {
    if (direction === SUBCOMPONENT_ORDER_DIRECTIONS.RIGHT) {
      return ChangeSubcomponentOrder.getRightMoveIndexes(initialDropdownOptionNames, subcomponentName);
    }
    return ChangeSubcomponentOrder.getLeftMoveIndexes(initialDropdownOptionNames, subcomponentName);
  }

  private static moveNestedComponentInDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentName, subcomponentDropdownStructure } = componentTraversalState;
    const subcomponentValues = this as any as SubcomponentValues;
    if (subcomponentValues.subcomponentName === subcomponentName) {
      const initialDropdownOptionNames = Object.keys(subcomponentDropdownStructure);
      const [currentIndex, targetIndex] = ChangeSubcomponentOrder.getMoveIndexes(subcomponentValues.direction, initialDropdownOptionNames, subcomponentName);
      if (currentIndex === ChangeSubcomponentOrder.OUT_OF_BOUNDS_INDEX) return componentTraversalState;
      ChangeSubcomponentOrder.moveObjectPropertyToEnd(subcomponentDropdownStructure, initialDropdownOptionNames[currentIndex]);
      ChangeSubcomponentOrder.moveObjectPropertiesAfterIndexToEnd(subcomponentDropdownStructure, currentIndex);
      ChangeSubcomponentOrder.updateSubcomponentNames(subcomponentValues, subcomponentDropdownStructure, currentIndex);
      ChangeSubcomponentOrder.setNewActiveSubcomponentName(subcomponentValues, subcomponentDropdownStructure, targetIndex);
      return componentTraversalState;
    }
    return null;
  }

  private static moveNestedComponentInPreviewStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentProperties, alignedNestedComponents, index } = componentTraversalState;
    const { subcomponentProperties: targetSubcomponentProperties, direction } = this as any as SubcomponentValues;
    if (targetSubcomponentProperties === subcomponentProperties) {
      if (direction === SUBCOMPONENT_ORDER_DIRECTIONS.RIGHT && index !== alignedNestedComponents.length - 1) {
        ArrayUtils.changeElementPosition(alignedNestedComponents, index, index + 1);
      } else if (direction === SUBCOMPONENT_ORDER_DIRECTIONS.LEFT && index !== 0) {
        ArrayUtils.changeElementPosition(alignedNestedComponents, index, index - 1);
      }
      return componentTraversalState;
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
      ChangeSubcomponentOrder.moveNestedComponentInPreviewStructureIfFound.bind(subcomponentValues));
    if (traversalResult) subcomponentValues.parentLayerAlignedSections = traversalResult.alignedSections;
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      parentComponent.componentPreviewStructure.subcomponentDropdownStructure,
      ChangeSubcomponentOrder.moveNestedComponentInDropdownStructureIfFound.bind(subcomponentValues));
  }
}
