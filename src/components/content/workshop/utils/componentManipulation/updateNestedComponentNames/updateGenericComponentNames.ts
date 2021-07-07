import { DROPDOWN_OPTION_DISPLAY_STATUS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateNestedComponentNames } from './updateNestedComponentNamesShared';

interface SubcomponentNameToPrefix {
  [subcomponentName: string]: string;
}

interface SubcomponentPrefixToTotal {
  [subcomponentName: string]: number;
}

interface SingleSubcomponentPrefixes {
  [subcomponentPrefix: string]: boolean;
}

export class UpdateGenericComponentNames extends UpdateNestedComponentNames {

  private static getPostfix(subcomponentPrefixToTotal: SubcomponentPrefixToTotal, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      singleSubcomponentPrefixes: SingleSubcomponentPrefixes, nestedSubcomponentName: string): string|number {
    if (singleSubcomponentPrefixes[subcomponentNameToPrefix[nestedSubcomponentName]]) {
      return UpdateNestedComponentNames.SINGLE_SPACE_STRING;
    }
    return subcomponentPrefixToTotal[subcomponentNameToPrefix[nestedSubcomponentName]] += 1;
  }

  private static updateComponentName(oldSubcomponentName: string, parentComponent: WorkshopComponent, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal, singleSubcomponentPrefixes: SingleSubcomponentPrefixes, subcomponentDropdown: NestedDropdownStructure,
      overwrittenDropdownNames: string[]): void {
    if (oldSubcomponentName === DROPDOWN_OPTION_DISPLAY_STATUS_REF) return;
    const postfix = UpdateGenericComponentNames.getPostfix(subcomponentPrefixToTotal, subcomponentNameToPrefix, singleSubcomponentPrefixes,
      oldSubcomponentName);
    const newSubcomponentName = oldSubcomponentName.charAt(oldSubcomponentName.length - 1) === postfix.toString()
      ? oldSubcomponentName : UpdateNestedComponentNames.getNewSubcomponentName(oldSubcomponentName, postfix);
    if (newSubcomponentName !== oldSubcomponentName) {
      UpdateNestedComponentNames.updateName(parentComponent, subcomponentDropdown, oldSubcomponentName, newSubcomponentName, overwrittenDropdownNames);
    } else {
    }
  }

  private static updateAllComponentNames(parentComponent: WorkshopComponent, nestedSubcomponentsNames: string[], subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal, singleSubcomponentPrefixes: SingleSubcomponentPrefixes, subcomponentDropdown: NestedDropdownStructure,
      overwrittenDropdownNames: string[]): void {
    for (let i = 0; i < nestedSubcomponentsNames.length; i += 1) {
      const oldSubcomponentName = nestedSubcomponentsNames[i];
      UpdateGenericComponentNames.updateComponentName(oldSubcomponentName, parentComponent, subcomponentNameToPrefix,
        subcomponentPrefixToTotal, singleSubcomponentPrefixes, subcomponentDropdown, overwrittenDropdownNames);
    }
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

  private static setPrefixesAndTotals(nestedSubcomponentsNames: string[], subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal): void {
    for (let i = 0; i < nestedSubcomponentsNames.length; i += 1) {
      const nestedSubcomponentName = nestedSubcomponentsNames[i];
      if (nestedSubcomponentName !== DROPDOWN_OPTION_DISPLAY_STATUS_REF) {
        const subcomponentNamePrefix = nestedSubcomponentName.substring(0, nestedSubcomponentName.indexOf(' '));
        subcomponentNameToPrefix[nestedSubcomponentName] = subcomponentNamePrefix;
        UpdateGenericComponentNames.setTotals(subcomponentPrefixToTotal, subcomponentNamePrefix);
      }
    }
  }

  private static populateMaps(nestedSubcomponentsNames: string[], subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal, singleSubcomponentPrefixes: SingleSubcomponentPrefixes): void {
    UpdateGenericComponentNames.setPrefixesAndTotals(nestedSubcomponentsNames, subcomponentNameToPrefix, subcomponentPrefixToTotal);
    UpdateGenericComponentNames.setSinglePrefixesAndResetTotals(subcomponentPrefixToTotal, singleSubcomponentPrefixes);
  }

  public static update(parentComponent: WorkshopComponent, subcomponentDropdown: NestedDropdownStructure): void {
    const nestedSubcomponentsNames = Object.keys(subcomponentDropdown);
    const overwrittenDropdownNames: string[] = [];
    const subcomponentNameToPrefix: SubcomponentNameToPrefix = {};
    const subcomponentPrefixToTotal: SubcomponentPrefixToTotal = {};
    const singleSubcomponentPrefixes: SingleSubcomponentPrefixes = {};
    UpdateGenericComponentNames.populateMaps(nestedSubcomponentsNames, subcomponentNameToPrefix, subcomponentPrefixToTotal, singleSubcomponentPrefixes);
    UpdateGenericComponentNames.updateAllComponentNames(parentComponent, nestedSubcomponentsNames, subcomponentNameToPrefix, subcomponentPrefixToTotal,
      singleSubcomponentPrefixes, subcomponentDropdown, overwrittenDropdownNames)
    UpdateNestedComponentNames.removeOverwrittenDropdownNames(overwrittenDropdownNames, subcomponentDropdown);
  }
}
