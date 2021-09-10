import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { UpdateDropdownOptionNamesShared } from './updateDropdownOptionNamesShared';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { StringUtils } from '../../generic/stringUtils';
import {
  SingleSubcomponentPrefixes, StateObjects, OptionNameInitializationObjects,
  SubcomponentPrefixToTotal, SubcomponentNameToPrefix, OptionDataMaps,
} from '../../../../../../interfaces/updateDropdownOptionNames';

export class UpdateContainerComponentDropdownUtils extends UpdateDropdownOptionNamesShared {

  private static updateNewAndOldOptionNames(containerComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure,
      subcomponentName: string, overwrittenOptionNames: string[], newOptionName: string, oldOptionName: string,
      overwrittenDropdownStructures: NestedDropdownStructure): void {
    if (subcomponentDropdownStructure[newOptionName] && oldOptionName !== newOptionName) {
      overwrittenDropdownStructures[newOptionName] = subcomponentDropdownStructure[newOptionName];
    }
    const oldDropdownStructure = overwrittenDropdownStructures[oldOptionName] || subcomponentDropdownStructure[oldOptionName];
    subcomponentDropdownStructure[newOptionName] = oldDropdownStructure;
    containerComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[subcomponentName] = newOptionName;
    overwrittenOptionNames.push(oldOptionName);
  }

  private static getNewPostfix(subcomponentPrefixToTotal: SubcomponentPrefixToTotal, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentName: string): number {
    return subcomponentPrefixToTotal[subcomponentNameToPrefix[subcomponentName]] += 1;
  }

  public static updateOptionNames(containerComponent: WorkshopComponent, optionDataMaps: OptionDataMaps, containerDropdownStructure: NestedDropdownStructure,
      overwrittenOptionNames: string[], newDrodpownValues: string[], baseSubcomponentName: string, overwrittenDropdownStructures: NestedDropdownStructure): void {
    const { subcomponentNameToPrefix, subcomponentPrefixToTotal, singleSubcomponentPrefixes } = optionDataMaps;
    const newPostfix = UpdateContainerComponentDropdownUtils.getNewPostfix(subcomponentPrefixToTotal, subcomponentNameToPrefix, baseSubcomponentName);
    const { oldOptionName, newOptionName } = UpdateDropdownOptionNamesShared
      .generateOptionNames(baseSubcomponentName, newPostfix, containerComponent, singleSubcomponentPrefixes[subcomponentNameToPrefix[baseSubcomponentName]]);
    if (containerDropdownStructure[newOptionName]) {
      UpdateDropdownOptionNamesShared.moveExistingOptionToTheBottom(containerDropdownStructure, newOptionName);
    }
    UpdateContainerComponentDropdownUtils.updateNewAndOldOptionNames(containerComponent, containerDropdownStructure, baseSubcomponentName,
      overwrittenOptionNames, newOptionName, oldOptionName, overwrittenDropdownStructures);
    newDrodpownValues.push(newOptionName);
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
    const subcomponentNames = UpdateDropdownOptionNamesShared.getSubcomponentNames(containerDropdownStructure);
    for (let i = 0; i < subcomponentNames.length; i += 1) {
      const subcomponentName = subcomponentNames[i];
      const subcomponentNamePrefix = StringUtils.getFirstWordInString(subcomponentName);
      subcomponentNameToPrefix[subcomponentName] = subcomponentNamePrefix;
      UpdateContainerComponentDropdownUtils.setTotals(subcomponentPrefixToTotal, subcomponentNamePrefix);
    }
  }

  private static generateOptionDataMaps(containerDropdownStructure: NestedDropdownStructure): OptionDataMaps {
    const subcomponentNameToPrefix: SubcomponentNameToPrefix = {};
    const subcomponentPrefixToTotal: SubcomponentPrefixToTotal = {};
    const singleSubcomponentPrefixes: SingleSubcomponentPrefixes = {};
    UpdateContainerComponentDropdownUtils.setPrefixesAndTotals(containerDropdownStructure, subcomponentNameToPrefix, subcomponentPrefixToTotal);
    UpdateContainerComponentDropdownUtils.setSinglePrefixesAndResetTotals(subcomponentPrefixToTotal, singleSubcomponentPrefixes);
    return { subcomponentNameToPrefix, subcomponentPrefixToTotal, singleSubcomponentPrefixes };
  }

  private static generateStateObjects(): StateObjects {
    return { 
      overwrittenOptionNames: [],
      newDrodpownNames: [],
      overwrittenDropdownStructures: {},
    };
  }

  public static generateOptionUpdateInitializationObjects(containerDropdownStructure: NestedDropdownStructure): OptionNameInitializationObjects {
    const optionDataMaps = UpdateContainerComponentDropdownUtils.generateOptionDataMaps(containerDropdownStructure);
    const stateObjects = UpdateContainerComponentDropdownUtils.generateStateObjects();
    return { optionDataMaps, stateObjects };
  }
}
