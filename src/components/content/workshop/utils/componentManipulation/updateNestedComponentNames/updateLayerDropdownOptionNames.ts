import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { UpdateDropdownOptionNamesShared } from './updateDropdownOptionNamesShared';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../activeComponent/activeComponentUtils';
import { ArrayUtils } from '../../generic/arrayUtils';

export class UpdateLayerDropdownOptionNames extends UpdateDropdownOptionNamesShared {

  private static updateOptionName(parentComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, subcomponentName: string,
      overwrittenOptionNames: string[], newOptionName: string, oldOptionName: string): void {
    subcomponentDropdownStructure[newOptionName] = subcomponentDropdownStructure[oldOptionName];
    overwrittenOptionNames.push(oldOptionName); 
    parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[subcomponentName] = newOptionName;
  }

  private static updateLayerNamesStartingFromNumber(parentComponent: WorkshopComponent, layerSubcomponentsNames: string[],
      layersDropdownStructure: NestedDropdownStructure, startingLayerNumber: number): string[] {
    const overwrittenOptionNames = [];
    const newOptionNames = [];
    for (let i = startingLayerNumber; i < layerSubcomponentsNames.length; i += 1) {
      const subcomponentName = layerSubcomponentsNames[i];
      const { oldOptionName, newOptionName } = UpdateDropdownOptionNamesShared.generateOptionNames(layerSubcomponentsNames[i], i + 1, parentComponent, false);
      if (layersDropdownStructure[newOptionName]) {
        UpdateDropdownOptionNamesShared.moveExistingOptionToTheBottom(layersDropdownStructure, newOptionName);
      }
      UpdateLayerDropdownOptionNames.updateOptionName(parentComponent, layersDropdownStructure, subcomponentName,
        overwrittenOptionNames, newOptionName, oldOptionName);
      newOptionNames.push(newOptionName);
    }
    return ArrayUtils.differenceInArrays(overwrittenOptionNames, newOptionNames);
  }

  private static updateFirstLayerName(parentComponent: WorkshopComponent, layerSubcomponentsNames: string[],
      layersDropdownStructure: NestedDropdownStructure, overwrittenOptionNames: string[]): void {
    const subcomponentName = layerSubcomponentsNames[0];
    const { oldOptionName, newOptionName } = UpdateDropdownOptionNamesShared.generateOptionNames(subcomponentName, 1, parentComponent, true);
    UpdateLayerDropdownOptionNames.updateOptionName(parentComponent, layersDropdownStructure, subcomponentName, overwrittenOptionNames,
      newOptionName, oldOptionName);
  }

  public static update(parentComponent: WorkshopComponent, startingLayerNumber: number): void {
    const { componentPreviewStructure: { subcomponentDropdownStructure } } = parentComponent;
    const activeBaseComponent = ActiveComponentUtils.getActiveBaseComponent(parentComponent);
    const layersDropdownStructure = subcomponentDropdownStructure[activeBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name] as NestedDropdownStructure;
    const subcomponentNames = UpdateDropdownOptionNamesShared.getSubcomponentNames(layersDropdownStructure);
    let overwrittenOptionNames: string[] = [];
    if (subcomponentNames.length === 1) {
      UpdateLayerDropdownOptionNames.updateFirstLayerName(parentComponent, subcomponentNames, layersDropdownStructure,
        overwrittenOptionNames);
    } else {
      overwrittenOptionNames = UpdateLayerDropdownOptionNames.updateLayerNamesStartingFromNumber(parentComponent, subcomponentNames,
        layersDropdownStructure, startingLayerNumber);
    }
    UpdateDropdownOptionNamesShared.removeOverwrittenOptionNames(overwrittenOptionNames, layersDropdownStructure);
  }
}
