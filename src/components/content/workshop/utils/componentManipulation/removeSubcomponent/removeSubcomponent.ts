import ComponentTraversalUtils, { ComponentTraversalState } from '../../componentTraversal/componentTraversalUtils';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';

type SelectNewSubcomponentCallback = (parentSubcomponentName: string) => void;
interface SubcomponentValues {
  selectNewSubcomponentCallback: SelectNewSubcomponentCallback;
  subcomponentName: string;
  parentComponent: WorkshopComponent;
  subcomponentProperties: SubcomponentProperties;
}

export class RemoveSubcomponent {

  private static removeNestedComponentInPreviewStructureIfFound(componentTraversalState: ComponentTraversalState): boolean {
    const { subcomponentProperties, layers, alignedNestedComponents, index } = componentTraversalState;
    const { subcomponentProperties: targetSubcomponentProperties } = this as any;
    if (targetSubcomponentProperties === subcomponentProperties) {
      if (layers) layers.splice(index, 1);
      if (alignedNestedComponents) alignedNestedComponents.splice(index, 1);
      return true;
    }
    return false;
  }

  private static removeSubcomponents(componentTraversalState: ComponentTraversalState, parentComponent: WorkshopComponent): void {
    const { subcomponentName } = componentTraversalState;
    const activeSubcomponent = parentComponent.subcomponents[subcomponentName];
    Object.keys(activeSubcomponent?.nestedComponent?.ref.subcomponents|| {}).forEach((keyName) => {
      delete parentComponent.subcomponents[keyName];
    });
  }

  private static removeNestedComponentNestedComponents(componentTraversalState: ComponentTraversalState): boolean {
    const { parentComponent } = this as any;
    RemoveSubcomponent.removeSubcomponents(componentTraversalState, parentComponent);
    return true;
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

  private static removeNestedComponentUsingDropdownStructureIfFound(componentTraversalState: ComponentTraversalState): boolean {
    const { subcomponentName } = componentTraversalState;
    const subcomponentValues: SubcomponentValues = this as any;
    if (subcomponentValues.subcomponentName === subcomponentName) {
      RemoveSubcomponent.removeNestedComponent(componentTraversalState, subcomponentValues);
      return true;
    }
    return false;
  }
  
  public static remove(component: WorkshopComponent, subcomponentName: string, selectNewSubcomponentCallback?: SelectNewSubcomponentCallback): void {
    const subcomponentValues: SubcomponentValues = {
      subcomponentName,
      selectNewSubcomponentCallback,
      parentComponent: component,
      subcomponentProperties: component.subcomponents[subcomponentName],
    };
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      component.componentPreviewStructure.subcomponentDropdownStructure,
      RemoveSubcomponent.removeNestedComponentUsingDropdownStructureIfFound.bind(subcomponentValues));
    ComponentTraversalUtils.traverseComponentUsingPreviewStructure(
      component.componentPreviewStructure,
      RemoveSubcomponent.removeNestedComponentInPreviewStructureIfFound.bind(subcomponentValues));
  }
}
