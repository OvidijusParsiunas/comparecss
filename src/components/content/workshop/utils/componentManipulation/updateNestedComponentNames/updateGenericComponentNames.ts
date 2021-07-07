import { DROPDOWN_OPTION_DISPLAY_STATUS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateNestedComponentNames } from './updateNestedComponentNamesShared';

export class UpdateGenericComponentNames extends UpdateNestedComponentNames {

  private static getNewPostfix(subcomponentPrefixToNumbers: {[subcomponentName: string]: number}, subcomponentNameToPrefixes: {[subcomponentName: string]: string},
      singleSubcomponents: {[subcomponentPrefix: string]: boolean}, nestedSubcomponentName: string): string {
    if (singleSubcomponents[subcomponentNameToPrefixes[nestedSubcomponentName]]) {
      return '';
    }
    return (subcomponentPrefixToNumbers[subcomponentNameToPrefixes[nestedSubcomponentName]] += 1).toString();
  }

  private static processMaps(subcomponentPrefixToNumbers: {[subcomponentName: string]: number},
      singleSubcomponents: {[subcomponentPrefix: string]: boolean}): void {
    const subcomponentPrefixToNumbersKeys = Object.keys(subcomponentPrefixToNumbers);
    for (let i = 0; i < subcomponentPrefixToNumbersKeys.length; i += 1) {
      if (subcomponentPrefixToNumbers[subcomponentPrefixToNumbersKeys[i]] === 1) {
        singleSubcomponents[subcomponentPrefixToNumbersKeys[i]] = true;
      }
      subcomponentPrefixToNumbers[subcomponentPrefixToNumbersKeys[i]] = 0;
    }
  }

  private static populateSubcomponentPrefixToNumbersMap(subcomponentPrefixToNumbers: {[subcomponentName: string]: number}, subcomponentNameToPrefixes: {[subcomponentName: string]: string},
      subcomponentName: string): void {
    if (subcomponentName !== DROPDOWN_OPTION_DISPLAY_STATUS_REF) {
      const subcomponentNamePrefix = subcomponentName.substring(0, subcomponentName.indexOf(' '));
      if (subcomponentPrefixToNumbers[subcomponentNamePrefix] === undefined) {
        subcomponentPrefixToNumbers[subcomponentNamePrefix] = 1;
      } else {
        subcomponentPrefixToNumbers[subcomponentNamePrefix] += 1;
      }
      subcomponentNameToPrefixes[subcomponentName] = subcomponentNamePrefix;
    }
  }

  public static update(parentComponent: WorkshopComponent, subcomponentDropdown: NestedDropdownStructure): void {
    const nestedSubcomponentsNames = Object.keys(subcomponentDropdown);
    // if (layerSubcomponentsNames.length === 1) return;
    const oldSubcomponentNames: string[] = [];
    const singleSubcomponents: {[subcomponentPrefix: string]: boolean } = {};
    const subcomponentPrefixToNumbers: {[subcomponentPrefix: string]: number} = {};
    const subcomponentNameToPrefixes: {[subcomponentName: string]: string} = {};
    for (let i = 0; i < nestedSubcomponentsNames.length; i += 1) {
      const nestedSubcomponentName = nestedSubcomponentsNames[i];
      UpdateGenericComponentNames.populateSubcomponentPrefixToNumbersMap(subcomponentPrefixToNumbers, subcomponentNameToPrefixes, nestedSubcomponentName);
    }
    UpdateGenericComponentNames.processMaps(subcomponentPrefixToNumbers, singleSubcomponents);
    for (let i = 0; i < nestedSubcomponentsNames.length; i += 1) {
      const nestedSubcomponentName = nestedSubcomponentsNames[i];
      if (nestedSubcomponentName !== DROPDOWN_OPTION_DISPLAY_STATUS_REF) {
        const newPostfix = UpdateGenericComponentNames.getNewPostfix(subcomponentPrefixToNumbers, subcomponentNameToPrefixes, singleSubcomponents, nestedSubcomponentName);
        const newSubcomponentName = UpdateNestedComponentNames.replaceSubstringAtIndex(nestedSubcomponentName, nestedSubcomponentName.length - 1, newPostfix);
        if (newSubcomponentName !== nestedSubcomponentName) {
          subcomponentDropdown[newSubcomponentName] = subcomponentDropdown[nestedSubcomponentName];
          UpdateNestedComponentNames.changeOldSubcomponentBaseNames(parentComponent, nestedSubcomponentName, newSubcomponentName);
          oldSubcomponentNames.push(nestedSubcomponentName);
        }
      }
    }
    UpdateNestedComponentNames.removeOldSubcomponentNames(oldSubcomponentNames, subcomponentDropdown);
  }
}
