import ComponentTraversalUtils, { ComponentTraversalState } from '../../componentTraversal/componentTraversalUtils';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

export class RemoveSubcomponent {

  private static removeSubcomponents(componentTraversalState: ComponentTraversalState): void {
    const { subcomponentName, parentComponent } = componentTraversalState;
    const activeSubcomponent = parentComponent.subcomponents[subcomponentName];
    Object.keys(activeSubcomponent?.nestedComponent.ref.subcomponents|| {}).forEach((keyName) => {
      delete parentComponent.subcomponents[keyName];
    });
  }

  private static removeNestedComponentNestedComponents(componentTraversalState: ComponentTraversalState): boolean {
    RemoveSubcomponent.removeSubcomponents(componentTraversalState);
    return true;
  }

  private static removeNestedComponent(componentTraversalState: ComponentTraversalState): void {
    const { subcomponentName, subcomponentDropdownStructure, parentComponent, subcomponentNameStack } = componentTraversalState;
    const selectNewSubcomponentCallback = this as any;
    selectNewSubcomponentCallback(subcomponentNameStack[subcomponentNameStack.length - 2]);
    RemoveSubcomponent.removeSubcomponents(componentTraversalState);
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      subcomponentDropdownStructure[subcomponentName] as NestedDropdownStructure,
      parentComponent, RemoveSubcomponent.removeNestedComponentNestedComponents);
    delete subcomponentDropdownStructure[subcomponentName];
  }

  private static removeNestedComponentIfFound(componentTraversalState: ComponentTraversalState): boolean {
    const { subcomponentName, parentComponent: { activeSubcomponentName } } = componentTraversalState;
    if (activeSubcomponentName === subcomponentName) {
      RemoveSubcomponent.removeNestedComponent(componentTraversalState);
      return false;
    }
    return true;
  }
  
  public static remove(component: WorkshopComponent, selectNewSubcomponentCallback: () => void): void {
    const activeSubcomponent = component.subcomponents[component.activeSubcomponentName];
    ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      component.componentPreviewStructure.subcomponentDropdownStructure, component,
      RemoveSubcomponent.removeNestedComponentIfFound.bind(selectNewSubcomponentCallback));
    activeSubcomponent.subcomponentDisplayStatus.isDisplayed = false;
    console.log(component.subcomponents);
  }
}
