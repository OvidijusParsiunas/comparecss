import { TraverseComponentViaDropdownStructure } from '../../componentTraversal/traverseComponentViaDropdownStructure';
import { SubcomponentNameToDropdownOptionName } from '../../../../../../interfaces/componentPreviewStructure';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { UpdateDropdownOptionNamesShared } from './updateDropdownOptionNamesShared';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
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

  // when it comes to updating layers, the user is either updating after adding when the container component is active (card/menu)
  // or when the actual layer subcomponent is active after removing
  // it is also worth noting that container component will always be master when a layer is removed
  private static getLayersDropdownStructure(containerComponent: WorkshopComponent, dropdownStructure: NestedDropdownStructure,
      subcomponentNameToDropdownOptionName: SubcomponentNameToDropdownOptionName): NestedDropdownStructure {
    const activeOptionName = subcomponentNameToDropdownOptionName[containerComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name];
    return dropdownStructure[activeOptionName] as NestedDropdownStructure || dropdownStructure;
  }

  private static updateIfActiveOptionFound(containerComponent: WorkshopComponent, dropdownStructure: NestedDropdownStructure,
      startingLayerNumber: number): boolean {
    const { masterComponent } = containerComponent;
    const layersDropdownStructure = UpdateLayerDropdownOptionNames.getLayersDropdownStructure(containerComponent, dropdownStructure,
        masterComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName);
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
    return true;
  }

  public static update(containerComponent: WorkshopComponent, startingLayerNumber: number): void {
    TraverseComponentViaDropdownStructure.traverseFromStart(containerComponent,
      UpdateLayerDropdownOptionNames.updateIfActiveOptionFound, startingLayerNumber);
  }
}
