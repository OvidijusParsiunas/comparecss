import { DROPDOWN_OPTION_DISPLAY_STATUS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';

export class ChangeSubcomponentNames {

  private static removeOldSubcomponentNames(oldSubcomponentNames: string[], layersDropdownStructure: NestedDropdownStructure): void {
    oldSubcomponentNames.forEach((name) => {
      delete layersDropdownStructure[name];
    });
  }

  private static replaceSubstringAtIndex(fullString: string, index: number, replacementSubstring: string | number): string {
    return `${fullString.substring(0, index)}${replacementSubstring}`;
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

  public static changeGenericSubcomponentBaseNames(parentComponent: WorkshopComponent, subcomponentDropdown: NestedDropdownStructure, startingLayerNumber: number): void {
    const nestedSubcomponentsNames = Object.keys(subcomponentDropdown);
    // if (layerSubcomponentsNames.length === 1) return;
    const oldSubcomponentNames: string[] = [];
    for (let i = startingLayerNumber; i < nestedSubcomponentsNames.length; i += 1) {
      const nestedSubcomponentName = nestedSubcomponentsNames[i];
      if (nestedSubcomponentName !== DROPDOWN_OPTION_DISPLAY_STATUS_REF) {
        const newSubcomponentName = ChangeSubcomponentNames.replaceSubstringAtIndex(nestedSubcomponentName, nestedSubcomponentName.length - 1, i);
        if (newSubcomponentName !== nestedSubcomponentName) {
          subcomponentDropdown[newSubcomponentName] = subcomponentDropdown[nestedSubcomponentName];
          ChangeSubcomponentNames.changeOldSubcomponentBaseNames(parentComponent, nestedSubcomponentName, newSubcomponentName);
          oldSubcomponentNames.push(nestedSubcomponentName);
        }
      }
    }
    ChangeSubcomponentNames.removeOldSubcomponentNames(oldSubcomponentNames, subcomponentDropdown);
  }

  private static changeName(parentComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, oldSubcomponentName: string,
      newSubcomponentName: string, oldSubcomponentNames: string[]): void {
    subcomponentDropdownStructure[newSubcomponentName] = subcomponentDropdownStructure[oldSubcomponentName];
    ChangeSubcomponentNames.changeOldSubcomponentBaseNames(parentComponent, oldSubcomponentName, newSubcomponentName);
    oldSubcomponentNames.push(oldSubcomponentName);
  }

  private static changeLayerName(parentComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, oldSubcomponentName: string,
      newSubcomponentName: string, oldSubcomponentNames: string[], layer: Layer): void {
    if (newSubcomponentName !== oldSubcomponentName && newSubcomponentName !== DROPDOWN_OPTION_DISPLAY_STATUS_REF) {
      ChangeSubcomponentNames.changeName(parentComponent, subcomponentDropdownStructure, oldSubcomponentName, newSubcomponentName, oldSubcomponentNames);
      layer.name = newSubcomponentName;
    }
  }

  // issue when layer removed with double digits
  private static changeLayerNames(parentComponent: WorkshopComponent, layerSubcomponentsNames: string[], layersDropdownStructure: NestedDropdownStructure, oldSubcomponentNames: string[],
      startingLayerNumber: number, layers: Layer[]): void {
    for (let i = startingLayerNumber; i <= layerSubcomponentsNames.length; i += 1) {
      const layerSubcomponentName = layerSubcomponentsNames[i - 1];
      const currentLayerNumberLength = (i).toString().length;
      const nextLayerNumberLength = (i + 1).toString().length;
      // when removing layer number 9, need to make sure that the next 10 will get reduced to 9, hence more chars need to be removed
      const numberLengthToReplace = currentLayerNumberLength < nextLayerNumberLength ? nextLayerNumberLength : currentLayerNumberLength;
      const newSubcomponentName = ChangeSubcomponentNames.replaceSubstringAtIndex(layerSubcomponentName,
        layerSubcomponentName.length - numberLengthToReplace, i);
      ChangeSubcomponentNames.changeLayerName(parentComponent, layersDropdownStructure, layerSubcomponentName, newSubcomponentName,
        oldSubcomponentNames, layers[i - 1]);
    
    }
  }

  private static changeFirstLayerSubcomponentName(parentComponent: WorkshopComponent, layerSubcomponentsNames: string[], layersDropdownStructure: NestedDropdownStructure,
      oldSubcomponentNames: string[], layer: Layer): void {
    const number = Number.parseFloat(layerSubcomponentsNames[0].substring(layerSubcomponentsNames[0].length - 1));
    if (number === 1 || number === 2) {
      const oldSubcomponentName = layerSubcomponentsNames[0];
      const newSubcomponentName = ChangeSubcomponentNames.replaceSubstringAtIndex(oldSubcomponentName, oldSubcomponentName.length - 1, ' ');
      ChangeSubcomponentNames.changeLayerName(parentComponent, layersDropdownStructure, oldSubcomponentName, newSubcomponentName,
        oldSubcomponentNames, layer);
    }
  }

  public static changeLayerSubcomponentBaseNames(parentComponent: WorkshopComponent, startingLayerNumber: number): void {
    const { coreSubcomponentNames: { base }, componentPreviewStructure: { subcomponentDropdownStructure, layers } } = parentComponent;
    const layersDropdownStructure = subcomponentDropdownStructure[base] as NestedDropdownStructure;
    const layerSubcomponentsNames = Object.keys(layersDropdownStructure);
    const oldSubcomponentNames: string[] = [];
    if (layerSubcomponentsNames.length === 1) {
      ChangeSubcomponentNames.changeFirstLayerSubcomponentName(parentComponent, layerSubcomponentsNames, layersDropdownStructure, oldSubcomponentNames, layers[0]);
    } else {
      ChangeSubcomponentNames.changeLayerNames(parentComponent, layerSubcomponentsNames, layersDropdownStructure, oldSubcomponentNames, startingLayerNumber, layers);
    }
    ChangeSubcomponentNames.removeOldSubcomponentNames(oldSubcomponentNames, layersDropdownStructure);
  }
}
