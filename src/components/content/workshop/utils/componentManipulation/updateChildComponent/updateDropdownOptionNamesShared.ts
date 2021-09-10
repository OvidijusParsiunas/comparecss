import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { UpdateGenericComponentDropdownOptionNames } from './updateGenericComponentDropdownOptionNames';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { StringUtils } from '../../generic/stringUtils';
import {
  OptionDataMaps, OptionNameInitializationObjects, OptionNames, SingleSubcomponentPrefixes,
  StateObjects, SubcomponentNameToPrefix, SubcomponentPrefixToTotal,
 } from '../../../../../../interfaces/updateDropdownOptionNames';

export class UpdateDropdownOptionNamesShared {

  private static updateNewAndOldOptionNames(containerComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, subcomponentName: string,
      overwrittenOptionNames: string[], newOptionName: string, oldOptionName: string, overwrittenDropdownStructures: NestedDropdownStructure): void {
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

  protected static updateOptionNames(containerComponent: WorkshopComponent, optionDataMaps: OptionDataMaps, containerDropdownStructure: NestedDropdownStructure,
      overwrittenOptionNames: string[], newDrodpownValues: string[], baseSubcomponentName: string, overwrittenDropdownStructures: NestedDropdownStructure): void {
    const { subcomponentNameToPrefix, subcomponentPrefixToTotal, singleSubcomponentPrefixes } = optionDataMaps;
    const newPostfix = UpdateGenericComponentDropdownOptionNames.getNewPostfix(subcomponentPrefixToTotal, subcomponentNameToPrefix, baseSubcomponentName);
    const { oldOptionName, newOptionName } = UpdateDropdownOptionNamesShared
      .generateOptionNames(baseSubcomponentName, newPostfix, containerComponent, singleSubcomponentPrefixes[subcomponentNameToPrefix[baseSubcomponentName]]);
    if (containerDropdownStructure[newOptionName]) {
      UpdateDropdownOptionNamesShared.moveExistingOptionToTheBottom(containerDropdownStructure, newOptionName);
    }
    UpdateGenericComponentDropdownOptionNames.updateNewAndOldOptionNames(containerComponent, containerDropdownStructure, baseSubcomponentName,
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
      UpdateGenericComponentDropdownOptionNames.setTotals(subcomponentPrefixToTotal, subcomponentNamePrefix);
    }
  }

  private static generateOptionDataMaps(containerDropdownStructure: NestedDropdownStructure): OptionDataMaps {
    const subcomponentNameToPrefix: SubcomponentNameToPrefix = {};
    const subcomponentPrefixToTotal: SubcomponentPrefixToTotal = {};
    const singleSubcomponentPrefixes: SingleSubcomponentPrefixes = {};
    UpdateGenericComponentDropdownOptionNames.setPrefixesAndTotals(containerDropdownStructure, subcomponentNameToPrefix, subcomponentPrefixToTotal);
    UpdateGenericComponentDropdownOptionNames.setSinglePrefixesAndResetTotals(subcomponentPrefixToTotal, singleSubcomponentPrefixes);
    return { subcomponentNameToPrefix, subcomponentPrefixToTotal, singleSubcomponentPrefixes };
  }

  private static generateStateObjects(): StateObjects {
    return { 
      overwrittenOptionNames: [],
      newDrodpownNames: [],
      overwrittenDropdownStructures: {},
    };
  }

  protected static generateOptionUpdateInitializationObjects(containerDropdownStructure: NestedDropdownStructure): OptionNameInitializationObjects {
    const optionDataMaps = UpdateDropdownOptionNamesShared.generateOptionDataMaps(containerDropdownStructure);
    const stateObjects = UpdateDropdownOptionNamesShared.generateStateObjects();
    return { optionDataMaps, stateObjects };
  }

  protected static removeOverwrittenOptionNames(oldOptionNames: string[], dropdownStructure: NestedDropdownStructure): void {
    oldOptionNames.forEach((optionName) => {
      delete dropdownStructure[optionName];
    });
  }

  protected static moveExistingOptionToTheBottom(containingDropdownStructure: NestedDropdownStructure, newBaseSubcomponentName: string): void {
    const temp = containingDropdownStructure[newBaseSubcomponentName];
    delete containingDropdownStructure[newBaseSubcomponentName];
    containingDropdownStructure[newBaseSubcomponentName] = temp;
  }

  private static generateMultiOptionName(subcomponentName: string, newPostfix: number): string {
    const subcomponentNamePrefix = StringUtils.getFirstWordInString(subcomponentName);
    return subcomponentNamePrefix + ' ' + newPostfix;
  }

  protected static generateOptionNames(subcomponentName: string, newOptionNameIndex: number, containerComponent: WorkshopComponent,
      isSingleOption: boolean): OptionNames {
    const oldOptionName = containerComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[subcomponentName];
    const newOptionName = isSingleOption
      ? StringUtils.getFirstWordInString(subcomponentName)
      : UpdateDropdownOptionNamesShared.generateMultiOptionName(subcomponentName, newOptionNameIndex);
    return { oldOptionName, newOptionName };
  }

  protected static getSubcomponentNames(layersDropdownStructure: NestedDropdownStructure): string[] {
    return Object.keys(layersDropdownStructure)
      .map((optionName) => (layersDropdownStructure[optionName][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails)?.actualObjectName)
      .filter((optionName) => optionName !== undefined);
  }

  public static generateDropdownStructure(options: string[]): NestedDropdownStructure {
    return options.reduce((accummulator, currentValue) => Object.assign(accummulator, {[currentValue]: null}), {});
  }
}
