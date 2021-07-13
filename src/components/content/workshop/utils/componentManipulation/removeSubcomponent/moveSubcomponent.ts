import ComponentTraversalUtils, { ComponentTraversalState } from '../../componentTraversal/componentTraversalUtils';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateGenericComponentNames } from '../updateNestedComponentNames/updateGenericComponentNames';
import { UpdateLayerComponentNames } from '../updateNestedComponentNames/updateLayerComponentNames';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { AlignedSections } from '../../../../../../interfaces/componentPreviewStructure';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { ArrayUtils } from '../../generic/arrayUtils';

interface SubcomponentValues {
  subcomponentName: string;
  parentComponent: WorkshopComponent;
  subcomponentProperties: SubcomponentProperties;
  direction?: string;
  parentLayerAlignedSections?: AlignedSections;
}

// WORK2
export class MoveSubcomponent {

  private static updateSubcomponentNames(subcomponentValues: SubcomponentValues, subcomponentDropdownStructure: NestedDropdownStructure,
      removedSubcomponentDropdownIndex: number, alignedSections: AlignedSections): void {
    const { parentComponent, subcomponentProperties: { subcomponentType } } = subcomponentValues;
    if (subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      UpdateGenericComponentNames.update(parentComponent, subcomponentDropdownStructure, alignedSections);
    } else {
      UpdateLayerComponentNames.update(parentComponent, removedSubcomponentDropdownIndex + 1);
    }
  }


  private static moveNestedComponentInDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentName, subcomponentDropdownStructure } = componentTraversalState;
    const subcomponentValues: SubcomponentValues = this as any;
    if (subcomponentValues.subcomponentName === subcomponentName) {
      const keys = Object.keys(subcomponentDropdownStructure);
      const startingIndex = subcomponentValues.direction === 'Right' ? keys.indexOf(subcomponentName) : 0;
      const finalIndex = subcomponentValues.direction === 'Right' ? keys.length : keys.indexOf(subcomponentName);
      for (let i = startingIndex; i < finalIndex; i += 1) {
        const tempProp = subcomponentDropdownStructure[keys[1]];
        delete subcomponentDropdownStructure[keys[1]];
        subcomponentDropdownStructure[keys[1]] = tempProp;
      }
      MoveSubcomponent.updateSubcomponentNames(subcomponentValues, subcomponentDropdownStructure, keys.indexOf(subcomponentName), subcomponentValues.parentLayerAlignedSections);
      subcomponentValues.parentComponent.activeSubcomponentName = Object.keys(subcomponentDropdownStructure)[2];
      return componentTraversalState;
    }
    return null;
  }

  private static moveNestedComponentInPreviewStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentProperties, alignedNestedComponents, index } = componentTraversalState;
    const { subcomponentProperties: targetSubcomponentProperties, direction } = this as any;
    if (targetSubcomponentProperties === subcomponentProperties) {
      if (direction === 'Right' && index !== alignedNestedComponents.length - 1) {
        ArrayUtils.changeElementPosition(alignedNestedComponents, index, index + 1);
      } else if (direction === 'Left' && index !== 0) {
        ArrayUtils.changeElementPosition(alignedNestedComponents, index, index - 1);
      }
      return componentTraversalState;
    }
    return null;
  }

  public static moveSubcomponent(optionName: string, parentComponent: WorkshopComponent, subcomponentProperties: SubcomponentProperties): void {
    const subcomponentValues: SubcomponentValues = {
        subcomponentName: parentComponent.activeSubcomponentName,
        parentComponent,
        subcomponentProperties: parentComponent.subcomponents[parentComponent.activeSubcomponentName],
        direction: optionName,
      };
    const traversalResult = ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      parentComponent.componentPreviewStructure,
      MoveSubcomponent.moveNestedComponentInPreviewStructureIfFound.bind(subcomponentValues));
    if (traversalResult) subcomponentValues.parentLayerAlignedSections = traversalResult.alignedSections;
    // WORK2, causes changeElementPosition in right to be executed multiple times
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      parentComponent.componentPreviewStructure.subcomponentDropdownStructure,
      MoveSubcomponent.moveNestedComponentInDropdownStructureIfFound.bind(subcomponentValues));
  }
}
