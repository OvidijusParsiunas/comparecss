import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateComponentNamesShared } from './updateComponentNamesShared';

export class UpdateLayerComponentNames extends UpdateComponentNamesShared {

  private static updateLayerName(parentComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, subcomponentName: string,
      overwrittenDropdownNames: string[], newDropdownOptionName: string, oldDropdownOptionName: string): void {
    subcomponentDropdownStructure[newDropdownOptionName] = subcomponentDropdownStructure[oldDropdownOptionName];
    overwrittenDropdownNames.push(oldDropdownOptionName); 
    parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[subcomponentName] = newDropdownOptionName;
  }

  private static moveExistingDropdownOptionToTheBottom(parentLayerDropdown: NestedDropdownStructure, newBaseSubcomponentName: string): void {
    const temp = parentLayerDropdown[newBaseSubcomponentName];
    delete parentLayerDropdown[newBaseSubcomponentName];
    parentLayerDropdown[newBaseSubcomponentName] = temp;
  }

  private static generateDropdownOptionName(subcomponentName: string, newPostfix: number|string): string {
    const words = subcomponentName.trim().split(/\s+/);
    return words[0] + ' ' + newPostfix;
  }

  private static generateNames(layerSubcomponentsNames: string[], subcomponentIndex: number, parentComponent: WorkshopComponent,
      generateDropdownOptionName: (subcomponetnName: string, index?: number) => string): {subcomponentName: string, oldDropdownName: string, newDropdownName: string } {
    const subcomponentName = layerSubcomponentsNames[subcomponentIndex];
    const oldDropdownName = parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[subcomponentName];
    const newDropdownName = generateDropdownOptionName(subcomponentName, subcomponentIndex + 1);
    return { subcomponentName, oldDropdownName, newDropdownName };
  }

  private static updateLayerNamesStartingFromNumber(parentComponent: WorkshopComponent, layerSubcomponentsNames: string[],
      layersDropdownStructure: NestedDropdownStructure, startingLayerNumber: number): string[] {
    const overwrittenDropdownNames = [];
    const newDrodpownValues = [];
    for (let i = startingLayerNumber; i < layerSubcomponentsNames.length; i += 1) {
      const { subcomponentName, oldDropdownName, newDropdownName } = UpdateLayerComponentNames
        .generateNames(layerSubcomponentsNames, i, parentComponent, UpdateLayerComponentNames.generateDropdownOptionName);
      if (layersDropdownStructure[newDropdownName]) {
        UpdateLayerComponentNames.moveExistingDropdownOptionToTheBottom(layersDropdownStructure, newDropdownName);
      }
      // WORK2: the if statement is currently not required
      if (subcomponentName !== newDropdownName) {
        UpdateLayerComponentNames.updateLayerName(parentComponent, layersDropdownStructure, subcomponentName,
          overwrittenDropdownNames, newDropdownName, oldDropdownName);
      }
      newDrodpownValues.push(newDropdownName);
    }
    return overwrittenDropdownNames.filter(x => !newDrodpownValues.includes(x));
  }

  private static generateSingleDropdownOptionName(subcomponentName: string): string {
    return subcomponentName.trim().split(/\s+/)[0];
  }

  private static updateFirstLayerName(parentComponent: WorkshopComponent, layerSubcomponentsNames: string[],
      layersDropdownStructure: NestedDropdownStructure, overwrittenDropdownNames: string[]): void {
    const { subcomponentName, oldDropdownName, newDropdownName } = UpdateLayerComponentNames
      .generateNames(layerSubcomponentsNames, 0, parentComponent, UpdateLayerComponentNames.generateSingleDropdownOptionName);
    UpdateLayerComponentNames.updateLayerName(parentComponent, layersDropdownStructure, subcomponentName,
      overwrittenDropdownNames, newDropdownName, oldDropdownName);
  }

  private static getLayerSubcomponentNames(layersDropdownStructure: NestedDropdownStructure): string[] {
    return Object.keys(layersDropdownStructure).map(
      (optionName) => (layersDropdownStructure[optionName][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).actualObjectName);
  }

  public static update(parentComponent: WorkshopComponent, startingLayerNumber: number): void {
    const { coreSubcomponentNames: { base }, componentPreviewStructure: { subcomponentDropdownStructure } } = parentComponent;
    const layersDropdownStructure = subcomponentDropdownStructure[base] as NestedDropdownStructure;
    const layerSubcomponentsNames = UpdateLayerComponentNames.getLayerSubcomponentNames(layersDropdownStructure);
    let overwrittenDropdownNames: string[] = [];
    if (layerSubcomponentsNames.length === 1) {
      UpdateLayerComponentNames.updateFirstLayerName(parentComponent, layerSubcomponentsNames, layersDropdownStructure,
        overwrittenDropdownNames);
    } else {
      overwrittenDropdownNames = UpdateLayerComponentNames.updateLayerNamesStartingFromNumber(parentComponent, layerSubcomponentsNames,
        layersDropdownStructure, startingLayerNumber);
    }
    UpdateComponentNamesShared.removeOverwrittenDropdownNames(overwrittenDropdownNames, layersDropdownStructure);
  }
}
