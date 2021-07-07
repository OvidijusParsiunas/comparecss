import { DROPDOWN_OPTION_DISPLAY_STATUS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateNestedComponentNames } from './updateNestedComponentNamesShared';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';

export class UpdateLayerComponentNames extends UpdateNestedComponentNames {

  private static updateLayerName(parentComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, oldSubcomponentName: string,
      newSubcomponentName: string, layer: Layer, overwrittenDropdownNames: string[]): void {
    if (newSubcomponentName !== DROPDOWN_OPTION_DISPLAY_STATUS_REF) {
      UpdateNestedComponentNames.updateName(parentComponent, subcomponentDropdownStructure, oldSubcomponentName, newSubcomponentName, overwrittenDropdownNames);
      layer.name = newSubcomponentName;
    }
  }

  private static updateLayerNamesStartingFromNumber(parentComponent: WorkshopComponent, layerSubcomponentsNames: string[],
      layersDropdownStructure: NestedDropdownStructure, overwrittenDropdownNames: string[], layers: Layer[], startingLayerNumber: number): void {
    for (let i = startingLayerNumber; i <= layerSubcomponentsNames.length; i += 1) {
      const layerSubcomponentName = layerSubcomponentsNames[i - 1];
      const newSubcomponentName = UpdateNestedComponentNames.getNewSubcomponentName(layerSubcomponentName, i);
      UpdateLayerComponentNames.updateLayerName(parentComponent, layersDropdownStructure, layerSubcomponentName, newSubcomponentName,
        layers[i - 1], overwrittenDropdownNames);
    }
  }

  private static updateFirstLayerName(parentComponent: WorkshopComponent, layerSubcomponentsNames: string[],
      layersDropdownStructure: NestedDropdownStructure, overwrittenDropdownNames: string[], firstLayer: Layer): void {
    const firstLayerNumber = Number.parseFloat(layerSubcomponentsNames[0].substring(layerSubcomponentsNames[0].length - 1));
    if (firstLayerNumber === 1 || firstLayerNumber === 2) {
      const oldSubcomponentName = layerSubcomponentsNames[0];
      const newSubcomponentName = UpdateNestedComponentNames.replaceSubstringAtIndex(oldSubcomponentName, oldSubcomponentName.length - 1,
        UpdateNestedComponentNames.SINGLE_SPACE_STRING);
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
    UpdateNestedComponentNames.removeOverwrittenDropdownNames(overwrittenDropdownNames, layersDropdownStructure);
  }
}
