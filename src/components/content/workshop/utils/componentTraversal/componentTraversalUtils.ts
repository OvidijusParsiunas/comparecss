import { NestedDropdownStructure } from '../../../../../interfaces/nestedDropdownStructure';
import { ENTITY_DISPLAY_STATUS_REF } from '../../../../../interfaces/entityDisplayStatus';
import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';

// WORK2: refactor
type TraverseSubcomponentsUsingDropdownStructureCallback = (
  activeSubcomponentName: string, activeComponent: WorkshopComponent, subcomponentNameStack: string[], structure: any) => boolean;

export default class ComponentTraversalUtils {

  public static traverseSubcomponentsUsingDropdownStructure(subcomponentDropdownStructure: NestedDropdownStructure, currentComponent: WorkshopComponent,
      callback: TraverseSubcomponentsUsingDropdownStructureCallback, subcomponentNameStack?: string[]): void {
    if (!subcomponentNameStack) subcomponentNameStack = [];
    const subcomponentDropdownStructureKeys = Object.keys(subcomponentDropdownStructure);
    for (let i = 0; i < subcomponentDropdownStructureKeys.length; i += 1) {
      const subcomponentName = subcomponentDropdownStructureKeys[i];
      if (subcomponentName === ENTITY_DISPLAY_STATUS_REF) {
        subcomponentNameStack.splice(subcomponentNameStack.length - 1, 1);
        return;
      }
      subcomponentNameStack.push(subcomponentName);
      if (!callback(subcomponentName, currentComponent, subcomponentNameStack, subcomponentDropdownStructure)) return;
      if (Object.keys(subcomponentDropdownStructure[subcomponentName]).length > 0) {
        ComponentTraversalUtils.traverseSubcomponentsUsingDropdownStructure(subcomponentDropdownStructure[subcomponentName] as NestedDropdownStructure,
          currentComponent, callback, subcomponentNameStack);
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
