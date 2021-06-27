import { NestedDropdownStructure } from '../../../../../interfaces/nestedDropdownStructure';
import { ENTITY_DISPLAY_STATUS_REF } from '../../../../../interfaces/entityDisplayStatus';
import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';

type TraverseSubcomponentsUsingDropdownStructureCallback = (activeSubcomponentName: string, activeComponent: WorkshopComponent) => void;

export default class ComponentTraversalUtils {

  private static traverseSubcomponentsUsingDropdownStructure(subcomponentDropdownStructure: NestedDropdownStructure, currentComponent: WorkshopComponent,
      callback: TraverseSubcomponentsUsingDropdownStructureCallback): void {
    const subcomponentDropdownStructureKeys = Object.keys(subcomponentDropdownStructure);
    for (let i = 0; i < subcomponentDropdownStructureKeys.length; i += 1) {
      const subcomponentName = subcomponentDropdownStructureKeys[i];
      if (subcomponentName === ENTITY_DISPLAY_STATUS_REF) return;
      callback(subcomponentName, currentComponent);
      if (Object.keys(subcomponentDropdownStructure[subcomponentName]).length && !currentComponent.subcomponents[subcomponentName].nestedComponent) {
        ComponentTraversalUtils.traverseSubcomponentsUsingDropdownStructure(subcomponentDropdownStructure[subcomponentName] as NestedDropdownStructure,
          currentComponent, callback);
      }
    }
  }

  public static traverseSubcomponentsUsingDropdownStructureStartingWithParticularChild(activeSubcomponentName: string,
      subcomponentDropdownStructure: NestedDropdownStructure, currentComponent: WorkshopComponent,
      callback: TraverseSubcomponentsUsingDropdownStructureCallback): void {
    const subcomponentDropdownStructureKeys = Object.keys(subcomponentDropdownStructure);
    for (let i = 0; i < subcomponentDropdownStructureKeys.length; i += 1) {
      const subcomponentName = subcomponentDropdownStructureKeys[i];
      if (activeSubcomponentName === subcomponentName) {
        ComponentTraversalUtils.traverseSubcomponentsUsingDropdownStructure(subcomponentDropdownStructure[subcomponentName] as NestedDropdownStructure,
          currentComponent, callback);
        break;
      } else if (Object.keys(subcomponentDropdownStructure[subcomponentName]).length > 0) {
        ComponentTraversalUtils.traverseSubcomponentsUsingDropdownStructureStartingWithParticularChild(activeSubcomponentName,
          subcomponentDropdownStructure[subcomponentName] as NestedDropdownStructure, currentComponent, callback);
      }
    }
  }
}
