import ComponentTraversalUtils, { ComponentTraversalState } from '../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/subcomponentOrderDirections.enum';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateGenericComponentNames } from '../updateNestedComponentNames/updateGenericComponentNames';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { AlignedSections } from '../../../../../../interfaces/componentPreviewStructure';
import { ArrayUtils } from '../../generic/arrayUtils';

interface SubcomponentValues {
  direction: SUBCOMPONENT_ORDER_DIRECTIONS;
  subcomponentName: string;
  parentComponent: WorkshopComponent;
  subcomponentProperties: SubcomponentProperties;
  parentLayerAlignedSections?: AlignedSections;
}

type CompositeTraversalResult = ComponentTraversalState & { nestedComponentMovable: boolean } 

export class ChangeSubcomponentOrder {

  private static updateSubcomponentNames(subcomponentValues: SubcomponentValues, subcomponentDropdownStructure: NestedDropdownStructure): void {
    const { parentComponent, parentLayerAlignedSections } = subcomponentValues;
      UpdateGenericComponentNames.update(parentComponent, subcomponentDropdownStructure, parentLayerAlignedSections);
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

  private static getRightMoveIndexes(initialDropdownOptionNames: string[], dropdownOptionName: string): number[] {
    const currentIndex = initialDropdownOptionNames.indexOf(dropdownOptionName);
    const targetIndex = currentIndex + 1;
    return [currentIndex, targetIndex];
  }

  private static getLeftMoveIndexes(initialDropdownOptionNames: string[], dropdownOptionName: string): number[] {
    const currentIndex = initialDropdownOptionNames.indexOf(dropdownOptionName) - 1;
    const targetIndex = currentIndex;
    return [currentIndex, targetIndex];
  }

  private static getMoveIndexes(direction: string, initialDropdownOptionNames: string[], dropdownOptionName: string): number[] {
    if (direction === SUBCOMPONENT_ORDER_DIRECTIONS.RIGHT) {
      return ChangeSubcomponentOrder.getRightMoveIndexes(initialDropdownOptionNames, dropdownOptionName);
    }
    return ChangeSubcomponentOrder.getLeftMoveIndexes(initialDropdownOptionNames, dropdownOptionName);
  }

  private static moveNestedComponentInDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { dropdownOptionName, subcomponentDropdownStructure } = componentTraversalState;
    const subcomponentValues = this as any as SubcomponentValues;
    if (subcomponentValues.subcomponentName === dropdownOptionName) {
      const initialDropdownOptionNames = Object.keys(subcomponentDropdownStructure);
      const [currentIndex, targetIndex] = ChangeSubcomponentOrder.getMoveIndexes(subcomponentValues.direction, initialDropdownOptionNames, dropdownOptionName);
      ChangeSubcomponentOrder.moveObjectPropertyToEnd(subcomponentDropdownStructure, initialDropdownOptionNames[currentIndex]);
      ChangeSubcomponentOrder.moveObjectPropertiesAfterIndexToEnd(subcomponentDropdownStructure, currentIndex);
      ChangeSubcomponentOrder.updateSubcomponentNames(subcomponentValues, subcomponentDropdownStructure);
      ChangeSubcomponentOrder.setNewActiveSubcomponentName(subcomponentValues, subcomponentDropdownStructure, targetIndex);
      return componentTraversalState;
    }
    return null;
  }

  private static moveNestedComponentInPreviewStructureIfFound(componentTraversalState: ComponentTraversalState): CompositeTraversalResult {
    const { subcomponentProperties, alignedNestedComponents, index } = componentTraversalState;
    const { subcomponentProperties: targetSubcomponentProperties, direction } = this as any as SubcomponentValues;
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
      subcomponentName: parentComponent.activeSubcomponentName,
      parentComponent,
      subcomponentProperties: parentComponent.subcomponents[parentComponent.activeSubcomponentName],
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
