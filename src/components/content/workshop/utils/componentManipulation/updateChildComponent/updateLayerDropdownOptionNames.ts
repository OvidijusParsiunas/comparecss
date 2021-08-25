import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { UpdateDropdownOptionNamesShared } from './updateDropdownOptionNamesShared';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../activeComponent/activeComponentUtils';
import { ArrayUtils } from '../../generic/arrayUtils';

export class UpdateLayerDropdownOptionNames extends UpdateDropdownOptionNamesShared {

  private static updateOptionName(masterComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, subcomponentName: string,
      overwrittenOptionNames: string[], newOptionName: string, oldOptionName: string): void {
    subcomponentDropdownStructure[newOptionName] = subcomponentDropdownStructure[oldOptionName];
    overwrittenOptionNames.push(oldOptionName);
    masterComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[subcomponentName] = newOptionName;
  }

  private static updateLayerNamesStartingFromNumber(masterComponent: WorkshopComponent, layerSubcomponentsNames: string[],
      layersDropdownStructure: NestedDropdownStructure, startingLayerNumber: number): string[] {
    const overwrittenOptionNames = [];
    const newOptionNames = [];
    for (let i = startingLayerNumber; i < layerSubcomponentsNames.length; i += 1) {
      const subcomponentName = layerSubcomponentsNames[i];
      const { oldOptionName, newOptionName } = UpdateDropdownOptionNamesShared.generateOptionNames(subcomponentName, i + 1, masterComponent, false);
      if (layersDropdownStructure[newOptionName]) {
        UpdateDropdownOptionNamesShared.moveExistingOptionToTheBottom(layersDropdownStructure, newOptionName);
      }
      UpdateLayerDropdownOptionNames.updateOptionName(masterComponent, layersDropdownStructure, subcomponentName,
        overwrittenOptionNames, newOptionName, oldOptionName);
      newOptionNames.push(newOptionName);
    }
    return ArrayUtils.differenceInArrays(overwrittenOptionNames, newOptionNames);
  }

  private static updateFirstLayerName(masterComponent: WorkshopComponent, layerSubcomponentsNames: string[],
      layersDropdownStructure: NestedDropdownStructure, overwrittenOptionNames: string[]): void {
    const subcomponentName = layerSubcomponentsNames[0];
    const { oldOptionName, newOptionName } = UpdateDropdownOptionNamesShared.generateOptionNames(subcomponentName, 1, masterComponent, true);
    UpdateLayerDropdownOptionNames.updateOptionName(masterComponent, layersDropdownStructure, subcomponentName, overwrittenOptionNames,
      newOptionName, oldOptionName);
  }

  // only works for adding layers to the top level parent component
  public static update(parentComponent: WorkshopComponent, startingLayerNumber: number): void {
    // WORK1: fix
    const { activeComponentParent, masterComponent } = ActiveComponentUtils.getComponentParents(parentComponent);
    const { componentPreviewStructure: { subcomponentDropdownStructure } } = masterComponent;
    const layersDropdownStructure = subcomponentDropdownStructure[activeComponentParent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name] as NestedDropdownStructure;
    const subcomponentNames = UpdateDropdownOptionNamesShared.getSubcomponentNames(layersDropdownStructure);
    let overwrittenOptionNames: string[] = [];
    if (subcomponentNames.length === 1) {
      UpdateLayerDropdownOptionNames.updateFirstLayerName(masterComponent, subcomponentNames, layersDropdownStructure,
        overwrittenOptionNames);
    } else {
      overwrittenOptionNames = UpdateLayerDropdownOptionNames.updateLayerNamesStartingFromNumber(masterComponent, subcomponentNames,
        layersDropdownStructure, startingLayerNumber);
    }
    UpdateDropdownOptionNamesShared.removeOverwrittenOptionNames(overwrittenOptionNames, layersDropdownStructure);
  }
}
