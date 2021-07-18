import { DROPDOWN_OPTION_DISPLAY_STATUS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { Layer, NestedSubcomponent } from '../../../../../../interfaces/componentPreviewStructure';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateComponentNamesShared } from './updateComponentNamesShared';

export class UpdateLayerComponentNames extends UpdateComponentNamesShared {

  private static updateLayerName(parentComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, oldSubcomponentName: string,
      newSubcomponentName: string, layer: NestedSubcomponent, overwrittenDropdownNames: string[]): void {
    if (newSubcomponentName !== DROPDOWN_OPTION_DISPLAY_STATUS_REF) {
      UpdateComponentNamesShared.updateName(parentComponent, subcomponentDropdownStructure, oldSubcomponentName, newSubcomponentName,
        layer, overwrittenDropdownNames);
    }
  }

  private static moveExistingDropdownOptionToTheBottom(parentLayerDropdown: NestedDropdownStructure, newBaseSubcomponentName: string): void {
    const temp = parentLayerDropdown[newBaseSubcomponentName];
    delete parentLayerDropdown[newBaseSubcomponentName];
    parentLayerDropdown[newBaseSubcomponentName] = temp;
  }

  // WORK2: alot of the logic is repeated
  private static parsePostfix2(subcomponentName: string): string {
    return subcomponentName.match(/\d+$/)?.[0];
  }

  // WORK 2 - may not be needed if we are changing how ids work, but if this is kept, make sure that it is correct
  private static generateNewSubcomponentName2(oldSubcomponentName: string, newPostfix: number|string): string {
    const oldPostfix = UpdateLayerComponentNames.parsePostfix2(oldSubcomponentName) || 1;
    const postfixLengthToReplace = oldPostfix.toString().length;
    return UpdateComponentNamesShared.replaceSubstringAtIndex(oldSubcomponentName, oldSubcomponentName.length - postfixLengthToReplace, newPostfix);
  }

  private static updateLayerNamesStartingFromNumber(parentComponent: WorkshopComponent, layerSubcomponentsNames: string[],
      layersDropdownStructure: NestedDropdownStructure, overwrittenDropdownNames: string[], layers: Layer[], startingLayerNumber: number): void {
    for (let i = startingLayerNumber; i < layerSubcomponentsNames.length; i += 1) {
      const oldSubcomponentName = layerSubcomponentsNames[i];
      const newSubcomponentName = UpdateLayerComponentNames.generateNewSubcomponentName2(oldSubcomponentName, i + 1);
      // WORK2 - for some reason when layer 10 is moved to top - layer 9 lose a space
      if (oldSubcomponentName !== newSubcomponentName) {
        UpdateLayerComponentNames.updateLayerName(parentComponent, layersDropdownStructure, oldSubcomponentName, newSubcomponentName,
          layers[i], overwrittenDropdownNames);
      } else {
        UpdateLayerComponentNames.moveExistingDropdownOptionToTheBottom(layersDropdownStructure, newSubcomponentName);
      }
    }
  }

  private static updateFirstLayerName(parentComponent: WorkshopComponent, layerSubcomponentsNames: string[],
      layersDropdownStructure: NestedDropdownStructure, overwrittenDropdownNames: string[], firstLayer: Layer): void {
    const firstLayerNumber = Number.parseFloat(layerSubcomponentsNames[0].substring(layerSubcomponentsNames[0].length - 1));
    if (firstLayerNumber === 1 || firstLayerNumber === 2) {
      const oldSubcomponentName = layerSubcomponentsNames[0];
      const newSubcomponentName = UpdateComponentNamesShared.replaceSubstringAtIndex(oldSubcomponentName, oldSubcomponentName.length - 1,
        UpdateComponentNamesShared.SINGLE_SPACE_STRING);
      UpdateLayerComponentNames.updateLayerName(parentComponent, layersDropdownStructure, oldSubcomponentName, newSubcomponentName,
        firstLayer, overwrittenDropdownNames);
    }
  }

  public static update(parentComponent: WorkshopComponent, startingLayerNumber: number): void {
    const { coreSubcomponentNames: { base }, componentPreviewStructure: { subcomponentDropdownStructure, layers } } = parentComponent;
    const layersDropdownStructure = subcomponentDropdownStructure[base] as NestedDropdownStructure;
    const layerSubcomponentsNames = Object.keys(layersDropdownStructure);
    const overwrittenDropdownNames: string[] = [];
    if (layerSubcomponentsNames.length === 1) {
      UpdateLayerComponentNames.updateFirstLayerName(parentComponent, layerSubcomponentsNames, layersDropdownStructure,
        overwrittenDropdownNames, layers[0]);
    } else {
      UpdateLayerComponentNames.updateLayerNamesStartingFromNumber(parentComponent, layerSubcomponentsNames, layersDropdownStructure,
        overwrittenDropdownNames, layers, startingLayerNumber);
    }
    UpdateComponentNamesShared.removeOverwrittenDropdownNames(overwrittenDropdownNames, layersDropdownStructure);
  }
}
