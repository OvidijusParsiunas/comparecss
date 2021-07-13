import { AlignedSections, Layer } from '../../../../../../interfaces/componentPreviewStructure';
import { DROPDOWN_OPTION_DISPLAY_STATUS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
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

  private static updateNameInAlignedSections(alignedSections: AlignedSections, oldBaseSubcomponentName: string, newBaseSubcomponentName: string): void {
    const alignedSectionsKeys = Object.keys(alignedSections);
    for (let i = 0; i < alignedSectionsKeys.length; i += 1) {
      const section = alignedSections[alignedSectionsKeys[i]];
      for (let j = 0; j < section.length; j += 1) {
        if (section[j].name === oldBaseSubcomponentName) {
          section[j].name = newBaseSubcomponentName;
          return;
        }
      }
    }
  }

  private static getPostfix(subcomponentPrefixToTotal: SubcomponentPrefixToTotal, subcomponentNameToPrefix: SubcomponentNameToPrefix,
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

  private static updateBaseSubcomponentName(oldBaseSubcomponentName: string, parentComponent: WorkshopComponent, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal, singleSubcomponentPrefixes: SingleSubcomponentPrefixes, parentLayerDropdown: NestedDropdownStructure,
      overwrittenDropdownNames: string[], alignedSections: AlignedSections, isOptionUpdated: boolean): boolean {
    if (oldBaseSubcomponentName === DROPDOWN_OPTION_DISPLAY_STATUS_REF) return;
    const postfix = UpdateGenericComponentNames.getPostfix(subcomponentPrefixToTotal, subcomponentNameToPrefix, singleSubcomponentPrefixes,
      oldBaseSubcomponentName);
    // when moving from 9 to 10, 9 has a space after it which continuously causes result name to be shorter
    const newBaseSubcomponentName = oldBaseSubcomponentName.charAt(oldBaseSubcomponentName.length - 1) === postfix.toString()
      ? oldBaseSubcomponentName : UpdateComponentNamesShared.getNewSubcomponentName(oldBaseSubcomponentName, postfix);
    if (newBaseSubcomponentName !== oldBaseSubcomponentName) {
      UpdateComponentNamesShared.updateName(parentComponent, parentLayerDropdown, oldBaseSubcomponentName, newBaseSubcomponentName, overwrittenDropdownNames);
      UpdateGenericComponentNames.updateNameInAlignedSections(alignedSections, oldBaseSubcomponentName, newBaseSubcomponentName);
      return true;
    } else if (isOptionUpdated) {
      // fix: when we have 2, 1, 3 - the updates above to 2 and 1 move those options to the bottom, however because 3 is the same it remains in the original position
      // which after the augmentations is now at the top of the dropdown. The following moves it down.
      UpdateGenericComponentNames.moveExistingDropdownOptionToTheBottom(parentLayerDropdown, newBaseSubcomponentName);
      return true;
    }
  }

  private static updateAllComponentNames(parentComponent: WorkshopComponent, nestedSubcomponentsNames: string[], subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal, singleSubcomponentPrefixes: SingleSubcomponentPrefixes, parentLayerDropdown: NestedDropdownStructure,
      overwrittenDropdownNames: string[], alignedSections: AlignedSections): void {
    let isOptionUpdated = false;
    for (let i = 0; i < nestedSubcomponentsNames.length; i += 1) {
      const oldBaseSubcomponentName = nestedSubcomponentsNames[i];
      isOptionUpdated = UpdateGenericComponentNames.updateBaseSubcomponentName(oldBaseSubcomponentName, parentComponent, subcomponentNameToPrefix,
        subcomponentPrefixToTotal, singleSubcomponentPrefixes, parentLayerDropdown, overwrittenDropdownNames, alignedSections, isOptionUpdated);
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

  public static update(parentComponent: WorkshopComponent, parentLayerDropdown: NestedDropdownStructure, alignedSections?: AlignedSections): void {
    const nestedSubcomponentsNames = Object.keys(parentLayerDropdown);
    const overwrittenDropdownNames: string[] = [];
    const subcomponentNameToPrefix: SubcomponentNameToPrefix = {};
    const subcomponentPrefixToTotal: SubcomponentPrefixToTotal = {};
    const singleSubcomponentPrefixes: SingleSubcomponentPrefixes = {};
    UpdateGenericComponentNames.populateMaps(nestedSubcomponentsNames, subcomponentNameToPrefix, subcomponentPrefixToTotal, singleSubcomponentPrefixes);
    UpdateGenericComponentNames.updateAllComponentNames(parentComponent, nestedSubcomponentsNames, subcomponentNameToPrefix, subcomponentPrefixToTotal,
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
