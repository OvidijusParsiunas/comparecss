import { DROPDOWN_OPTION_DISPLAY_STATUS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

export class ChangeSubcomponentNames {

  private static removeOldSubcomponentNames(oldSubcomponentNames: string[], layersDropdownStructure: NestedDropdownStructure): void {
    oldSubcomponentNames.forEach((name) => {
      delete layersDropdownStructure[name];
    });
  }

  private static replaceSubstringAtIndex(fullString: string, index: number, replacementSubstring: string | number): string {
    return `${fullString.substring(0, index)}${replacementSubstring}${fullString.substring(index + 1)}`;
  }

  private static changeOldSubcomponentBaseNames(parentComponent: WorkshopComponent, currentSubcomponentName: string, newSubcomponentName: string): void {
    parentComponent.subcomponents[newSubcomponentName] = parentComponent.subcomponents[currentSubcomponentName];
    const parentLayerComponent: WorkshopComponent = parentComponent.subcomponents[currentSubcomponentName].nestedComponent.ref
    parentLayerComponent.activeSubcomponentName = newSubcomponentName;
    parentLayerComponent.defaultSubcomponentName = newSubcomponentName;
    parentLayerComponent.coreSubcomponentNames.base = newSubcomponentName;
    // double check if this is needed
    parentLayerComponent.componentPreviewStructure.subcomponentDropdownStructure[newSubcomponentName] = parentLayerComponent.componentPreviewStructure.subcomponentDropdownStructure[currentSubcomponentName];
    parentLayerComponent.subcomponents[newSubcomponentName] = parentComponent.subcomponents[currentSubcomponentName];
    delete parentComponent.subcomponents[currentSubcomponentName];
    delete parentLayerComponent.subcomponents[currentSubcomponentName];
  }

  private static addLayerWithNewName(layersDropdownStructure: NestedDropdownStructure, layerSubcomponentsNames: string[], index: number,
      parentComponent: WorkshopComponent, parentComponentDropdownStructure: NestedDropdownStructure, oldSubcomponentNames: string[]): void {
    const { base } = parentComponent.coreSubcomponentNames;
    const layerSubcomponentName = layerSubcomponentsNames[index];
    if (layerSubcomponentName !== DROPDOWN_OPTION_DISPLAY_STATUS_REF) {
      const newSubcomponentName = ChangeSubcomponentNames.replaceSubstringAtIndex(layerSubcomponentName, layerSubcomponentName.length - 1, index + 1);
      if (newSubcomponentName !== layerSubcomponentName) {
        parentComponentDropdownStructure[base][newSubcomponentName] = layersDropdownStructure[layerSubcomponentName];
        ChangeSubcomponentNames.changeOldSubcomponentBaseNames(parentComponent, layerSubcomponentName, newSubcomponentName);
        parentComponent.componentPreviewStructure.layers[index].name = newSubcomponentName;
        oldSubcomponentNames.push(layerSubcomponentName);
      }
    }
  }

  public static changeLayerSubcomponentBaseNames(parentComponent: WorkshopComponent, newComponentIndex: number): void {
    const { coreSubcomponentNames: { base }, componentPreviewStructure: { subcomponentDropdownStructure, layers } } = parentComponent;
    const layersDropdownStructure = subcomponentDropdownStructure[base] as NestedDropdownStructure;
    const layerSubcomponentsNames = Object.keys(layersDropdownStructure);
    if (layerSubcomponentsNames.length === 1) return;
    const oldSubcomponentNames: string[] = [];
    for (let i = newComponentIndex; i < layerSubcomponentsNames.length; i += 1) {
      ChangeSubcomponentNames.addLayerWithNewName(layersDropdownStructure, layerSubcomponentsNames, i,
        parentComponent, subcomponentDropdownStructure, oldSubcomponentNames)
    }
    ChangeSubcomponentNames.removeOldSubcomponentNames(layerSubcomponentsNames, layersDropdownStructure);
  }
}
