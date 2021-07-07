import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

export class UpdateNestedComponentNames {

  protected static removeOldSubcomponentNames(oldSubcomponentNames: string[], layersDropdownStructure: NestedDropdownStructure): void {
    oldSubcomponentNames.forEach((name) => {
      delete layersDropdownStructure[name];
    });
  }

  protected static replaceSubstringAtIndex(fullString: string, index: number, replacementSubstring: string | number): string {
    return `${fullString.substring(0, index)}${replacementSubstring}`;
  }

  protected static changeOldSubcomponentBaseNames(parentComponent: WorkshopComponent, currentSubcomponentName: string, newSubcomponentName: string): void {
    parentComponent.subcomponents[newSubcomponentName] = parentComponent.subcomponents[currentSubcomponentName];
    const parentLayerComponent: WorkshopComponent = parentComponent.subcomponents[currentSubcomponentName].nestedComponent.ref
    parentLayerComponent.activeSubcomponentName = newSubcomponentName;
    parentLayerComponent.defaultSubcomponentName = newSubcomponentName;
    parentLayerComponent.coreSubcomponentNames.base = newSubcomponentName;
    // double check if this is needed
    parentLayerComponent.componentPreviewStructure.subcomponentDropdownStructure[newSubcomponentName] = parentLayerComponent
      .componentPreviewStructure.subcomponentDropdownStructure[currentSubcomponentName];
    parentLayerComponent.subcomponents[newSubcomponentName] = parentComponent.subcomponents[currentSubcomponentName];
    delete parentComponent.subcomponents[currentSubcomponentName];
    delete parentLayerComponent.subcomponents[currentSubcomponentName];
  }
}
