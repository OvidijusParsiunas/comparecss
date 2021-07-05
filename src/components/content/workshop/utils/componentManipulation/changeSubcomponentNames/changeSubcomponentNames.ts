import { DROPDOWN_OPTION_DISPLAY_STATUS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

export class ChangeSubcomponentNames {

  private static removeOldSubcomponentNames(oldSubcomponentNames: string[], layersDropdownStructure: NestedDropdownStructure): void {
    oldSubcomponentNames.forEach((name) => {
      delete layersDropdownStructure[name];
    });
  }

  private static changeOldNestedSubcomponentBaseNames(parentComponent: WorkshopComponent, currentSubcomponentName: string, newSubcomponentName: string): void {
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

  private static replaceSubstringAtIndex(fullString: string, index: number, replacementSubstring: string | number): string {
    return `${fullString.substring(0, index)}${replacementSubstring}${fullString.substring(index + 1)}`;
  }

  public static changeGenericSubcomponentBaseNames(parentComponent: WorkshopComponent, subcomponentDropdown: NestedDropdownStructure, newComponentIndex: number): void {
    const nestedSubcomponentsNames = Object.keys(subcomponentDropdown);
    // if (layerSubcomponentsNames.length === 1) return;
    const oldSubcomponentNames: string[] = [];
    for (let i = newComponentIndex; i < nestedSubcomponentsNames.length; i += 1) {
      const nestedSubcomponentName = nestedSubcomponentsNames[i];
      if (nestedSubcomponentName !== DROPDOWN_OPTION_DISPLAY_STATUS_REF) {
        const newSubcomponentName = ChangeSubcomponentNames.replaceSubstringAtIndex(nestedSubcomponentName, nestedSubcomponentName.length - 1, i);
        if (newSubcomponentName !== nestedSubcomponentName) {
          subcomponentDropdown[newSubcomponentName] = subcomponentDropdown[nestedSubcomponentName];
          ChangeSubcomponentNames.changeOldNestedSubcomponentBaseNames(parentComponent, nestedSubcomponentName, newSubcomponentName);
          oldSubcomponentNames.push(nestedSubcomponentName);
        }
      }
    }
    ChangeSubcomponentNames.removeOldSubcomponentNames(oldSubcomponentNames, subcomponentDropdown);
  }

  private static changeOldSubcomponentBaseNames(parentComponent: WorkshopComponent, currentSubcomponentName: string, newSubcomponentName: string): void {
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

  // issue when layer removed with double digits
  private static addLayerWithNewName(layerSubcomponentsNames: string[], index: number,
      parentComponent: WorkshopComponent, oldSubcomponentNames: string[]): void {
    const {
      coreSubcomponentNames: { base: baseName },
      componentPreviewStructure: { subcomponentDropdownStructure, layers } } = parentComponent;
    const layersDropdownStructure = subcomponentDropdownStructure[baseName] as NestedDropdownStructure;
    const layerSubcomponentName = layerSubcomponentsNames[index];
    if (layerSubcomponentName !== DROPDOWN_OPTION_DISPLAY_STATUS_REF) {
      const newSubcomponentName = ChangeSubcomponentNames.replaceSubstringAtIndex(layerSubcomponentName, layerSubcomponentName.length - 1, index + 1);
      if (newSubcomponentName !== layerSubcomponentName) {
        subcomponentDropdownStructure[baseName][newSubcomponentName] = layersDropdownStructure[layerSubcomponentName];
        ChangeSubcomponentNames.changeOldSubcomponentBaseNames(parentComponent, layerSubcomponentName, newSubcomponentName);
        layers[index].name = newSubcomponentName;
        oldSubcomponentNames.push(layerSubcomponentName);
      }
    }
  }

  public static changeLayerSubcomponentBaseNames(parentComponent: WorkshopComponent, newComponentIndex: number): void {
    const { coreSubcomponentNames: { base }, componentPreviewStructure: { subcomponentDropdownStructure } } = parentComponent;
    const layersDropdownStructure = subcomponentDropdownStructure[base] as NestedDropdownStructure;
    const layerSubcomponentsNames = Object.keys(layersDropdownStructure);
    const oldSubcomponentNames: string[] = [];
    if (layerSubcomponentsNames.length === 1) {
      if (layerSubcomponentsNames[0] !== DROPDOWN_OPTION_DISPLAY_STATUS_REF && Number.parseFloat(layerSubcomponentsNames[0].substring(layerSubcomponentsNames[0].length - 1)) === 1) {
        const oldSubcomponentName = layerSubcomponentsNames[0];
        const {
          coreSubcomponentNames: { base: baseName },
          componentPreviewStructure: { subcomponentDropdownStructure, layers } } = parentComponent;
        const newSubcomponentName = ChangeSubcomponentNames.replaceSubstringAtIndex(oldSubcomponentName, oldSubcomponentName.length - 1, ' ');
        subcomponentDropdownStructure[baseName][newSubcomponentName] = layersDropdownStructure[oldSubcomponentName];
        ChangeSubcomponentNames.changeOldSubcomponentBaseNames(parentComponent, oldSubcomponentName, newSubcomponentName);
        layers[0].name = newSubcomponentName;
        oldSubcomponentNames.push(oldSubcomponentName);
      }
    } else {
      for (let i = newComponentIndex; i < layerSubcomponentsNames.length; i += 1) {
        ChangeSubcomponentNames.addLayerWithNewName(layerSubcomponentsNames, i, parentComponent, oldSubcomponentNames)
      }
    }
    ChangeSubcomponentNames.removeOldSubcomponentNames(oldSubcomponentNames, layersDropdownStructure);
  }
}
