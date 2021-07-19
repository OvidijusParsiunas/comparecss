import { AlignedSections, Layer, NestedSubcomponent } from '../../../../../../interfaces/componentPreviewStructure';
import { DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateComponentNamesShared } from './updateComponentNamesShared';

interface SubcomponentNameToPrefix {
  [subcomponentName: string]: string;
}

interface SubcomponentPrefixToTotal {
  [subcomponentName: string]: number;
}

interface SingleSubcomponentPrefixes {
  [subcomponentPrefix: string]: boolean;
}

export class UpdateGenericComponentNames extends UpdateComponentNamesShared {

  private static getNewPostfix(subcomponentPrefixToTotal: SubcomponentPrefixToTotal, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      singleSubcomponentPrefixes: SingleSubcomponentPrefixes, nestedSubcomponentName: string): string|number {
    if (singleSubcomponentPrefixes[subcomponentNameToPrefix[nestedSubcomponentName]]) {
      return UpdateComponentNamesShared.SINGLE_SPACE_STRING;
    }
    return subcomponentPrefixToTotal[subcomponentNameToPrefix[nestedSubcomponentName]] += 1;
  }

  private static moveExistingDropdownOptionToTheBottom(parentLayerDropdown: NestedDropdownStructure, newBaseSubcomponentName: string): void {
    const temp = parentLayerDropdown[newBaseSubcomponentName];
    delete parentLayerDropdown[newBaseSubcomponentName];
    parentLayerDropdown[newBaseSubcomponentName] = temp;
  }

  private static updateBaseSubcomponentName(parentComponent: WorkshopComponent, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal, singleSubcomponentPrefixes: SingleSubcomponentPrefixes, parentLayerDropdown: NestedDropdownStructure,
      overwrittenDropdownNames: string[], nestedSubcomponent: NestedSubcomponent, isOptionUpdated: boolean): boolean {
    const oldBaseSubcomponentName = nestedSubcomponent.name;
    const newPostfix = UpdateGenericComponentNames.getNewPostfix(subcomponentPrefixToTotal, subcomponentNameToPrefix, singleSubcomponentPrefixes,
      oldBaseSubcomponentName);
    const newBaseSubcomponentName = UpdateComponentNamesShared.generateNewSubcomponentName(oldBaseSubcomponentName, newPostfix);
    if (newBaseSubcomponentName !== oldBaseSubcomponentName) {
      UpdateComponentNamesShared.updateName(parentComponent, parentLayerDropdown, oldBaseSubcomponentName, overwrittenDropdownNames);
      return true;
    } else if (isOptionUpdated) {
      // fix: when we have 2, 1, 3 - the above updates 2 and 1, and moves the option names to the bottom, however because 3 is the same it remains in the original position
      // which after the augmentations is now at the top of the dropdown. The following moves it down.
      // fix: when a subcomponent alignment has been changed, the previous alignment and the newAlignment need to be updated appropriately
      UpdateGenericComponentNames.moveExistingDropdownOptionToTheBottom(parentLayerDropdown, newBaseSubcomponentName);
      return true;
    }
    return false;
  }

  private static updateAllComponentNames(parentComponent: WorkshopComponent, dropdownOptionNames: string[], subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal, singleSubcomponentPrefixes: SingleSubcomponentPrefixes, parentLayerDropdown: NestedDropdownStructure,
      overwrittenDropdownNames: string[], alignedSections: AlignedSections): void {
    let isOptionUpdated = false;
    let dropdownOptionIndex = 0;
    const alignedSectionsKeys = Object.keys(alignedSections);
    for (let i = 0; i < alignedSectionsKeys.length; i += 1) {
      const section = alignedSections[alignedSectionsKeys[i]];
      for (let j = 0; j < section.length; j += 1) {
        // when a subcomponent has been moved to another alignment, e.g. from left to center - that option must be moved downards
        if (!isOptionUpdated && dropdownOptionNames[dropdownOptionIndex] !== section[j].name) isOptionUpdated = true;
        isOptionUpdated = UpdateGenericComponentNames.updateBaseSubcomponentName(parentComponent, subcomponentNameToPrefix,
          subcomponentPrefixToTotal, singleSubcomponentPrefixes, parentLayerDropdown, overwrittenDropdownNames, section[j], isOptionUpdated);
        dropdownOptionIndex += 1;
      }
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

  private static setPrefixesAndTotals(dropdownOptionNames: string[], subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal): void {
    for (let i = 0; i < dropdownOptionNames.length; i += 1) {
      const optionName = dropdownOptionNames[i];
      const subcomponentNamePrefix = optionName.substring(0, optionName.indexOf(' '));
      subcomponentNameToPrefix[optionName] = subcomponentNamePrefix;
      UpdateGenericComponentNames.setTotals(subcomponentPrefixToTotal, subcomponentNamePrefix);
    }
  }

  private static populateMaps(dropdownOptionNames: string[], subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal, singleSubcomponentPrefixes: SingleSubcomponentPrefixes): void {
    UpdateGenericComponentNames.setPrefixesAndTotals(dropdownOptionNames, subcomponentNameToPrefix, subcomponentPrefixToTotal);
    UpdateGenericComponentNames.setSinglePrefixesAndResetTotals(subcomponentPrefixToTotal, singleSubcomponentPrefixes);
  }

  private static generateDropdownOptionNames(parentLayerDropdown: NestedDropdownStructure): string[] {
    return Object.keys(parentLayerDropdown).filter((name) => name !== DROPDOWN_OPTION_AUX_DETAILS_REF);
  }

  public static update(parentComponent: WorkshopComponent, parentLayerDropdown: NestedDropdownStructure, alignedSections?: AlignedSections): void {
    const dropdownOptionNames = UpdateGenericComponentNames.generateDropdownOptionNames(parentLayerDropdown);
    const overwrittenDropdownNames: string[] = [];
    const subcomponentNameToPrefix: SubcomponentNameToPrefix = {};
    const subcomponentPrefixToTotal: SubcomponentPrefixToTotal = {};
    const singleSubcomponentPrefixes: SingleSubcomponentPrefixes = {};
    UpdateGenericComponentNames.populateMaps(dropdownOptionNames, subcomponentNameToPrefix, subcomponentPrefixToTotal, singleSubcomponentPrefixes);
    UpdateGenericComponentNames.updateAllComponentNames(parentComponent, dropdownOptionNames, subcomponentNameToPrefix, subcomponentPrefixToTotal,
      singleSubcomponentPrefixes, parentLayerDropdown, overwrittenDropdownNames, alignedSections);
    UpdateComponentNamesShared.removeOverwrittenDropdownNames(overwrittenDropdownNames, parentLayerDropdown);
  }

  public static updateViaLayerObject(newComponent: WorkshopComponent, layer: Layer): void {
    const { name, sections: { alignedSections }} = layer;
    const { subcomponentDropdownStructure } = newComponent.componentPreviewStructure;
    const nestedComponents = subcomponentDropdownStructure[newComponent.coreSubcomponentNames.base][name];
    UpdateGenericComponentNames.update(newComponent, nestedComponents, alignedSections);
  }
}
