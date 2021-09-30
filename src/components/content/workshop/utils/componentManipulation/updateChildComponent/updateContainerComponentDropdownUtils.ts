import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateDropdownItemNamesShared } from './updateDropdownItemNamesShared';
import { StringUtils } from '../../generic/stringUtils';
import { ArrayUtils } from '../../generic/arrayUtils';
import {
  SingleSubcomponentPrefixes, StateObjects, ItemNameInitializationObjects,
  SubcomponentPrefixToTotal, SubcomponentNameToPrefix, ItemDataMaps,
} from '../../../../../../interfaces/updateDropdownItemNames';

export class UpdateContainerComponentDropdownUtils extends UpdateDropdownItemNamesShared {

  public static removeOldItemNames(overwrittenItemNames: string[], newDrodpownNames: string[],
      subcomponentDropdownStructure: NestedDropdownStructure): void {
    const oldItemNames = ArrayUtils.differenceInArrays(overwrittenItemNames, newDrodpownNames);
    UpdateDropdownItemNamesShared.removeOverwrittenItemNames(oldItemNames, subcomponentDropdownStructure);
  }

  private static updateNewAndOlditemNames(containerComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure,
      subcomponentName: string, overwrittenItemNames: string[], newItemName: string, oldItemName: string,
      overwrittenDropdownStructures: NestedDropdownStructure): void {
    if (subcomponentDropdownStructure[newItemName] && oldItemName !== newItemName) {
      overwrittenDropdownStructures[newItemName] = subcomponentDropdownStructure[newItemName];
    }
    const oldDropdownStructure = overwrittenDropdownStructures[oldItemName] || subcomponentDropdownStructure[oldItemName];
    subcomponentDropdownStructure[newItemName] = oldDropdownStructure;
    containerComponent.componentPreviewStructure.subcomponentNameToDropdownItemName[subcomponentName] = newItemName;
    overwrittenItemNames.push(oldItemName);
  }

  private static getNewPostfix(subcomponentPrefixToTotal: SubcomponentPrefixToTotal, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentName: string): number {
    return subcomponentPrefixToTotal[subcomponentNameToPrefix[subcomponentName]] += 1;
  }

  public static updateItemNames(masterComponent: WorkshopComponent, itemDataMaps: ItemDataMaps, containerDropdownStructure: NestedDropdownStructure,
      overwrittenItemNames: string[], newDrodpownValues: string[], baseSubcomponentName: string, overwrittenDropdownStructures: NestedDropdownStructure): void {
    const { subcomponentNameToPrefix, subcomponentPrefixToTotal, singleSubcomponentPrefixes } = itemDataMaps;
    const newPostfix = UpdateContainerComponentDropdownUtils.getNewPostfix(subcomponentPrefixToTotal, subcomponentNameToPrefix, baseSubcomponentName);
    const { oldItemName, newItemName } = UpdateDropdownItemNamesShared
      .generateItemNames(baseSubcomponentName, newPostfix, masterComponent, singleSubcomponentPrefixes[subcomponentNameToPrefix[baseSubcomponentName]]);
    if (containerDropdownStructure[newItemName]) {
      UpdateDropdownItemNamesShared.moveExistingItemToTheBottom(containerDropdownStructure, newItemName);
    }
    UpdateContainerComponentDropdownUtils.updateNewAndOlditemNames(masterComponent, containerDropdownStructure, baseSubcomponentName,
      overwrittenItemNames, newItemName, oldItemName, overwrittenDropdownStructures);
    newDrodpownValues.push(newItemName);
  }

  private static setSinglePrefixesAndResetTotals(subcomponentPrefixToTotal: SubcomponentPrefixToTotal,
      singleSubcomponentPrefixes: SingleSubcomponentPrefixes): void {
    const subcomponentPrefixToTotalKeys = Object.keys(subcomponentPrefixToTotal);
    for (let i = 0; i < subcomponentPrefixToTotalKeys.length; i += 1) {
      if (subcomponentPrefixToTotal[subcomponentPrefixToTotalKeys[i]] === 1) {
        singleSubcomponentPrefixes[subcomponentPrefixToTotalKeys[i]] = true;
      }
      subcomponentPrefixToTotal[subcomponentPrefixToTotalKeys[i]] = 0;
    }
  }

  private static setTotals(subcomponentPrefixToTotal: SubcomponentPrefixToTotal, subcomponentNamePrefix: string): void {
    if (subcomponentPrefixToTotal[subcomponentNamePrefix] === undefined) {
      subcomponentPrefixToTotal[subcomponentNamePrefix] = 1;
    } else {
      subcomponentPrefixToTotal[subcomponentNamePrefix] += 1;
    }
  }

  private static setPrefixesAndTotals(containerDropdownStructure: NestedDropdownStructure, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal): void {
    const subcomponentNames = UpdateDropdownItemNamesShared.getSubcomponentNames(containerDropdownStructure);
    for (let i = 0; i < subcomponentNames.length; i += 1) {
      const subcomponentName = subcomponentNames[i];
      const subcomponentNamePrefix = StringUtils.getFirstWordInString(subcomponentName);
      subcomponentNameToPrefix[subcomponentName] = subcomponentNamePrefix;
      UpdateContainerComponentDropdownUtils.setTotals(subcomponentPrefixToTotal, subcomponentNamePrefix);
    }
  }

  private static generateItemDataMaps(containerDropdownStructure: NestedDropdownStructure): ItemDataMaps {
    const subcomponentNameToPrefix: SubcomponentNameToPrefix = {};
    const subcomponentPrefixToTotal: SubcomponentPrefixToTotal = {};
    const singleSubcomponentPrefixes: SingleSubcomponentPrefixes = {};
    UpdateContainerComponentDropdownUtils.setPrefixesAndTotals(containerDropdownStructure, subcomponentNameToPrefix, subcomponentPrefixToTotal);
    UpdateContainerComponentDropdownUtils.setSinglePrefixesAndResetTotals(subcomponentPrefixToTotal, singleSubcomponentPrefixes);
    return { subcomponentNameToPrefix, subcomponentPrefixToTotal, singleSubcomponentPrefixes };
  }

  private static generateStateObjects(): StateObjects {
    return { 
      overwrittenItemNames: [],
      newDrodpownNames: [],
      overwrittenDropdownStructures: {},
    };
  }

  public static generateItemUpdateInitializationObjects(containerDropdownStructure: NestedDropdownStructure): ItemNameInitializationObjects {
    const itemDataMaps = UpdateContainerComponentDropdownUtils.generateItemDataMaps(containerDropdownStructure);
    const stateObjects = UpdateContainerComponentDropdownUtils.generateStateObjects();
    return { itemDataMaps, stateObjects };
  }
}
