import ComponentTraversalUtils, { ComponentTraversalState } from '../../componentTraversal/componentTraversalUtils';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateGenericComponentNames } from '../updateNestedComponentNames/updateGenericComponentNames';
import { UpdateLayerComponentNames } from '../updateNestedComponentNames/updateLayerComponentNames';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { InterconnectedSettings } from '../../interconnectedSettings/interconnectedSettings';
import { AlignedSections } from '../../../../../../interfaces/componentPreviewStructure';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';

type SelectNewSubcomponentCallback = (parentSubcomponentName: string) => void;
interface SubcomponentValues {
  selectNewSubcomponentCallback: SelectNewSubcomponentCallback;
  subcomponentName: string;
  parentComponent: WorkshopComponent;
  subcomponentProperties: SubcomponentProperties;
  parentLayerAlignedSections?: AlignedSections;
}

export class RemoveSubcomponent {

  private static updateSubcomponentNames(subcomponentValues: SubcomponentValues, subcomponentDropdownStructure: NestedDropdownStructure,
      removedSubcomponentDropdownIndex: number, alignedSections: AlignedSections): void {
    const { parentComponent, subcomponentProperties: { subcomponentType } } = subcomponentValues;
    if (subcomponentType !== SUBCOMPONENT_TYPES.LAYER) {
      UpdateGenericComponentNames.update(parentComponent, subcomponentDropdownStructure, alignedSections);
    } else {
      UpdateLayerComponentNames.update(parentComponent, removedSubcomponentDropdownIndex + 1);
    }
  }

  private static removeNestedComponentInPreviewStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentProperties, layers, alignedNestedComponents, index } = componentTraversalState;
    const { subcomponentProperties: targetSubcomponentProperties, parentComponent } = this as any as SubcomponentValues;
    if (targetSubcomponentProperties === subcomponentProperties) {
      if (layers) layers.splice(index, 1);
      if (alignedNestedComponents) {
        alignedNestedComponents.splice(index, 1);
        InterconnectedSettings.update(false, parentComponent, subcomponentProperties);
      }
      return componentTraversalState;
    }
    return null;
  }

  private static removeSubcomponents(componentTraversalState: ComponentTraversalState, parentComponent: WorkshopComponent): void {
    const { subcomponentName } = componentTraversalState;
    const activeSubcomponent = parentComponent.subcomponents[subcomponentName];
    Object.keys(activeSubcomponent?.nestedComponent?.ref.subcomponents|| {}).forEach((keyName) => {
      delete parentComponent.subcomponents[keyName];
    });
  }

  private static removeNestedComponentNestedComponents(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { parentComponent } = this as any as SubcomponentValues;
    RemoveSubcomponent.removeSubcomponents(componentTraversalState, parentComponent);
    return componentTraversalState;
  }

  private static updateOptions(subcomponentNameStack: string[], selectNewSubcomponentCallback?: SelectNewSubcomponentCallback): void {
    if (selectNewSubcomponentCallback) selectNewSubcomponentCallback(subcomponentNameStack[subcomponentNameStack.length - 2]);
  }

  private static removeNestedComponent(componentTraversalState: ComponentTraversalState, subcomponentValues: SubcomponentValues): void {
    const { subcomponentName, subcomponentDropdownStructure, subcomponentNameStack } = componentTraversalState;
    RemoveSubcomponent.updateOptions(subcomponentNameStack, subcomponentValues.selectNewSubcomponentCallback);
    RemoveSubcomponent.removeSubcomponents(componentTraversalState, subcomponentValues.parentComponent);
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      subcomponentDropdownStructure[subcomponentName] as NestedDropdownStructure,
      RemoveSubcomponent.removeNestedComponentNestedComponents.bind(subcomponentValues));
    delete subcomponentDropdownStructure[subcomponentName];
  }

  private static removeNestedComponentUsingDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): ComponentTraversalState {
    const { subcomponentName, subcomponentDropdownStructure } = componentTraversalState;
    const subcomponentValues = this as any as SubcomponentValues;
    if (subcomponentValues.subcomponentName === subcomponentName) {
      const removedSubcomponentDropdownIndex = Object.keys(subcomponentDropdownStructure).indexOf(subcomponentName);
      RemoveSubcomponent.removeNestedComponent(componentTraversalState, subcomponentValues);
      RemoveSubcomponent.updateSubcomponentNames(subcomponentValues, subcomponentDropdownStructure, removedSubcomponentDropdownIndex,
        subcomponentValues.parentLayerAlignedSections);
      return componentTraversalState;
    }
    return null;
  }
  
  public static remove(component: WorkshopComponent, subcomponentName: string, selectNewSubcomponentCallback?: SelectNewSubcomponentCallback): void {
    const subcomponentValues: SubcomponentValues = {
      subcomponentName,
      selectNewSubcomponentCallback,
      parentComponent: component,
      subcomponentProperties: component.subcomponents[subcomponentName],
    };
    const traversalResult = ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      component.componentPreviewStructure,
      RemoveSubcomponent.removeNestedComponentInPreviewStructureIfFound.bind(subcomponentValues));
    if (traversalResult) subcomponentValues.parentLayerAlignedSections = traversalResult.alignedSections;
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      component.componentPreviewStructure.subcomponentDropdownStructure,
      RemoveSubcomponent.removeNestedComponentUsingDropdownStructureIfFound.bind(subcomponentValues));
  }
}
