import { NestedDropdownStructure } from '../../../../../interfaces/nestedDropdownStructure';
import { ENTITY_DISPLAY_STATUS_REF } from '../../../../../interfaces/entityDisplayStatus';
import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';

export interface ComponentTraversalState {
  subcomponentName: string;
  subcomponentDropdownStructure: NestedDropdownStructure;
  parentComponent: WorkshopComponent;
  subcomponentNameStack: string[];
}
type TraverseComponentUsingDropdownStructureCallback = (componentTraversalState: ComponentTraversalState) => boolean;

export default class ComponentTraversalUtils {

  public static traverseComponentUsingDropdownStructure(subcomponentDropdownStructure: NestedDropdownStructure, parentComponent: WorkshopComponent,
      callback: TraverseComponentUsingDropdownStructureCallback, subcomponentNameStack?: string[]): void {
    if (!subcomponentNameStack) subcomponentNameStack = [];
    const subcomponentDropdownStructureKeys = Object.keys(subcomponentDropdownStructure);
    for (let i = 0; i < subcomponentDropdownStructureKeys.length; i += 1) {
      const subcomponentName = subcomponentDropdownStructureKeys[i];
      if (subcomponentName === ENTITY_DISPLAY_STATUS_REF) {
        subcomponentNameStack.splice(subcomponentNameStack.length - 1, 1);
        return;
      }
      subcomponentNameStack.push(subcomponentName);
      if (!callback({subcomponentName, subcomponentDropdownStructure, parentComponent, subcomponentNameStack})) return;
      if (Object.keys(subcomponentDropdownStructure[subcomponentName]).length > 0) {
        ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
          subcomponentDropdownStructure[subcomponentName] as NestedDropdownStructure, parentComponent, callback, subcomponentNameStack);
      }
    }
  }
}
