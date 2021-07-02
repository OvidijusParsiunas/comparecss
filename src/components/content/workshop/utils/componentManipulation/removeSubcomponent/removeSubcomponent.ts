import ComponentTraversalUtils, { ComponentTraversalState } from '../../componentTraversal/componentTraversalUtils';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

type SelectNewSubcomponentCallback = (parentSubcomponentName: string) => void;
interface RemoveNestedComponentIfFoundObj {
  selectNewSubcomponentCallback: SelectNewSubcomponentCallback;
  subcomponentName: string;
}

export class RemoveSubcomponent {

  private static removeSubcomponents(componentTraversalState: ComponentTraversalState): void {
    const { subcomponentName, parentComponent } = componentTraversalState;
    const activeSubcomponent = parentComponent.subcomponents[subcomponentName];
    Object.keys(activeSubcomponent?.nestedComponent?.ref.subcomponents|| {}).forEach((keyName) => {
      delete parentComponent.subcomponents[keyName];
    });
  }

  private static removeNestedComponentNestedComponents(componentTraversalState: ComponentTraversalState): boolean {
    RemoveSubcomponent.removeSubcomponents(componentTraversalState);
    return true;
  }

  private static updateOptions(componentTraversalState: ComponentTraversalState,
      selectNewSubcomponentCallback?: SelectNewSubcomponentCallback): void {
    const { subcomponentName, parentComponent, subcomponentNameStack } = componentTraversalState;
    if (selectNewSubcomponentCallback) selectNewSubcomponentCallback(subcomponentNameStack[subcomponentNameStack.length - 2]);
    parentComponent.subcomponents[subcomponentName].subcomponentDisplayStatus.isDisplayed = false;
  }

  private static removeNestedComponent(componentTraversalState: ComponentTraversalState,
      selectNewSubcomponentCallback?: SelectNewSubcomponentCallback): void {
    const { subcomponentName, subcomponentDropdownStructure, parentComponent } = componentTraversalState;
    RemoveSubcomponent.updateOptions(componentTraversalState, selectNewSubcomponentCallback);
    RemoveSubcomponent.removeSubcomponents(componentTraversalState);
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      subcomponentDropdownStructure[subcomponentName] as NestedDropdownStructure,
      parentComponent, RemoveSubcomponent.removeNestedComponentNestedComponents);
    delete subcomponentDropdownStructure[subcomponentName];
  }

  private static removeNestedComponentIfFound(componentTraversalState: ComponentTraversalState): boolean {
    const { subcomponentName } = componentTraversalState;
    const { subcomponentName: targetSubcomponentName, selectNewSubcomponentCallback } = this as any;
    if (targetSubcomponentName === subcomponentName) {
      RemoveSubcomponent.removeNestedComponent(componentTraversalState, selectNewSubcomponentCallback);
      return false;
    }
    return true;
  }
  
  public static remove(component: WorkshopComponent, subcomponentName: string,
      selectNewSubcomponentCallback?: SelectNewSubcomponentCallback): void {
    const removeNestedComponentIfFoundObj: RemoveNestedComponentIfFoundObj = {
      subcomponentName,
      selectNewSubcomponentCallback,
    };
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      component.componentPreviewStructure.subcomponentDropdownStructure, component,
      RemoveSubcomponent.removeNestedComponentIfFound.bind(removeNestedComponentIfFoundObj));
  }
}
