import { DROPDOWN_OPTION_DISPLAY_STATUS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateNestedComponentNames } from './updateNestedComponentNamesShared';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';

export class UpdateLayerComponentNames extends UpdateNestedComponentNames {

  private static changeName(parentComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, oldSubcomponentName: string,
      newSubcomponentName: string, oldSubcomponentNames: string[]): void {
    subcomponentDropdownStructure[newSubcomponentName] = subcomponentDropdownStructure[oldSubcomponentName];
    UpdateNestedComponentNames.changeOldSubcomponentBaseNames(parentComponent, oldSubcomponentName, newSubcomponentName);
    oldSubcomponentNames.push(oldSubcomponentName);
  }

  private static changeLayerName(parentComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, oldSubcomponentName: string,
      newSubcomponentName: string, oldSubcomponentNames: string[], layer: Layer): void {
    if (newSubcomponentName !== DROPDOWN_OPTION_DISPLAY_STATUS_REF) {
      UpdateLayerComponentNames.changeName(parentComponent, subcomponentDropdownStructure, oldSubcomponentName, newSubcomponentName, oldSubcomponentNames);
      layer.name = newSubcomponentName;
    }
  }

  private static changeLayerNames(parentComponent: WorkshopComponent, layerSubcomponentsNames: string[], layersDropdownStructure: NestedDropdownStructure, oldSubcomponentNames: string[],
      startingLayerNumber: number, layers: Layer[]): void {
    for (let i = startingLayerNumber; i <= layerSubcomponentsNames.length; i += 1) {
      const layerSubcomponentName = layerSubcomponentsNames[i - 1];
      const currentLayerNumberLength = (i).toString().length;
      const nextLayerNumberLength = (i + 1).toString().length;
      // when removing layer number 9, need to make sure that the next 10 will get reduced to 9, hence more chars need to be removed
      const numberLengthToReplace = currentLayerNumberLength < nextLayerNumberLength ? nextLayerNumberLength : currentLayerNumberLength;
      const newSubcomponentName = UpdateNestedComponentNames.replaceSubstringAtIndex(layerSubcomponentName,
        layerSubcomponentName.length - numberLengthToReplace, i);
      UpdateLayerComponentNames.changeLayerName(parentComponent, layersDropdownStructure, layerSubcomponentName, newSubcomponentName,
        oldSubcomponentNames, layers[i - 1]);
    
    }
  }

  private static changeFirstLayerSubcomponentName(parentComponent: WorkshopComponent, layerSubcomponentsNames: string[], layersDropdownStructure: NestedDropdownStructure,
      oldSubcomponentNames: string[], layer: Layer): void {
    const number = Number.parseFloat(layerSubcomponentsNames[0].substring(layerSubcomponentsNames[0].length - 1));
    if (number === 1 || number === 2) {
      const oldSubcomponentName = layerSubcomponentsNames[0];
      const newSubcomponentName = UpdateNestedComponentNames.replaceSubstringAtIndex(oldSubcomponentName, oldSubcomponentName.length - 1, ' ');
      UpdateLayerComponentNames.changeLayerName(parentComponent, layersDropdownStructure, oldSubcomponentName, newSubcomponentName,
        oldSubcomponentNames, layer);
    }
  }

  public static update(parentComponent: WorkshopComponent, startingLayerNumber: number): void {
    const { coreSubcomponentNames: { base }, componentPreviewStructure: { subcomponentDropdownStructure, layers } } = parentComponent;
    const layersDropdownStructure = subcomponentDropdownStructure[base] as NestedDropdownStructure;
    const layerSubcomponentsNames = Object.keys(layersDropdownStructure);
    const oldSubcomponentNames: string[] = [];
    if (layerSubcomponentsNames.length === 1) {
      UpdateLayerComponentNames.changeFirstLayerSubcomponentName(parentComponent, layerSubcomponentsNames, layersDropdownStructure, oldSubcomponentNames, layers[0]);
    } else {
      UpdateLayerComponentNames.changeLayerNames(parentComponent, layerSubcomponentsNames, layersDropdownStructure, oldSubcomponentNames, startingLayerNumber, layers);
    }
    UpdateNestedComponentNames.removeOldSubcomponentNames(oldSubcomponentNames, layersDropdownStructure);
  }
}
