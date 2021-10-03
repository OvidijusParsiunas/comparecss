import { TraverseComponentViaDropdownStructure } from '../../componentTraversal/traverseComponentViaDropdownStructure';
import { SubcomponentNameToDropdownItemName } from '../../../../../../interfaces/componentPreviewStructure';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { UpdateDropdownItemNamesShared } from './updateDropdownItemNamesShared';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ArrayUtils } from '../../generic/arrayUtils';

export class UpdateLayerDropdownItemNames extends UpdateDropdownItemNamesShared {

  private static updateItemName(masterComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, subcomponentName: string,
      overwrittenItemNames: string[], newItemName: string, oldItemName: string): void {
    subcomponentDropdownStructure[newItemName] = subcomponentDropdownStructure[oldItemName];
    overwrittenItemNames.push(oldItemName);
    masterComponent.componentPreviewStructure.subcomponentNameToDropdownItemName[subcomponentName] = newItemName;
  }

  private static updateLayerNamesStartingFromNumber(masterComponent: WorkshopComponent, layerSubcomponentsNames: string[],
      layersDropdownStructure: NestedDropdownStructure, startingLayerNumber: number): string[] {
    const overwrittenItemNames = [];
    const newItemNames = [];
    for (let i = startingLayerNumber; i < layerSubcomponentsNames.length; i += 1) {
      const subcomponentName = layerSubcomponentsNames[i];
      const { oldItemName, newItemName } = UpdateDropdownItemNamesShared.generateItemNames(subcomponentName, i + 1, masterComponent, false);
      if (layersDropdownStructure[newItemName]) {
        UpdateDropdownItemNamesShared.moveExistingItemToTheBottom(layersDropdownStructure, newItemName);
      }
      UpdateLayerDropdownItemNames.updateItemName(masterComponent, layersDropdownStructure, subcomponentName,
        overwrittenItemNames, newItemName, oldItemName);
      newItemNames.push(newItemName);
    }
    return ArrayUtils.differenceInArrays(overwrittenItemNames, newItemNames);
  }

  private static updateFirstLayerName(masterComponent: WorkshopComponent, layerSubcomponentsNames: string[],
      layersDropdownStructure: NestedDropdownStructure, overwrittenItemNames: string[]): void {
    const subcomponentName = layerSubcomponentsNames[0];
    const { oldItemName, newItemName } = UpdateDropdownItemNamesShared.generateItemNames(subcomponentName, 1, masterComponent, true);
    UpdateLayerDropdownItemNames.updateItemName(masterComponent, layersDropdownStructure, subcomponentName, overwrittenItemNames,
      newItemName, oldItemName);
  }

  // when it comes to updating layers, the user is either updating after adding when the container component is active (card/menu)
  // or when the actual layer subcomponent is active after removing
  // it is also worth noting that container component will always be master when a layer is removed
  private static getLayersDropdownStructure(containerComponent: WorkshopComponent, dropdownStructure: NestedDropdownStructure,
      subcomponentNameToDropdownItemName: SubcomponentNameToDropdownItemName): NestedDropdownStructure {
    const itemName = subcomponentNameToDropdownItemName[containerComponent.baseSubcomponent.name];
    return dropdownStructure[itemName] as NestedDropdownStructure || dropdownStructure;
  }

  private static updateIfActiveItemFound(containerComponent: WorkshopComponent, dropdownStructure: NestedDropdownStructure,
      startingLayerNumber: number): boolean {
    const { masterComponent } = containerComponent;
    const layersDropdownStructure = UpdateLayerDropdownItemNames.getLayersDropdownStructure(containerComponent, dropdownStructure,
      masterComponent.componentPreviewStructure.subcomponentNameToDropdownItemName);
    const subcomponentNames = UpdateDropdownItemNamesShared.getSubcomponentNames(layersDropdownStructure);
    let overwrittenItemNames: string[] = [];
    if (subcomponentNames.length === 1) {
      UpdateLayerDropdownItemNames.updateFirstLayerName(masterComponent, subcomponentNames, layersDropdownStructure,
        overwrittenItemNames);
    } else {
      overwrittenItemNames = UpdateLayerDropdownItemNames.updateLayerNamesStartingFromNumber(masterComponent, subcomponentNames,
        layersDropdownStructure, startingLayerNumber);
    }
    UpdateDropdownItemNamesShared.removeOverwrittenItemNames(overwrittenItemNames, layersDropdownStructure);
    return true;
  }

  public static update(containerComponent: WorkshopComponent, startingLayerNumber: number): void {
    TraverseComponentViaDropdownStructure.traverseUsingComponent(containerComponent,
      UpdateLayerDropdownItemNames.updateIfActiveItemFound, startingLayerNumber);
  }
}
