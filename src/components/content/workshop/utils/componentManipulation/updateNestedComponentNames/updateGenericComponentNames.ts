import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { AlignedSections, Layer, NestedSubcomponent } from '../../../../../../interfaces/componentPreviewStructure';
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

  private static updateComponentName(parentComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, subcomponentName: string,
      overwrittenDropdownNames: string[], newDropdownOptionName: string, oldDropdownOptionName: string, overwrittenDropdownStructures: any): void {
    if (subcomponentDropdownStructure[newDropdownOptionName] && oldDropdownOptionName !== newDropdownOptionName) {
      overwrittenDropdownStructures[newDropdownOptionName] = subcomponentDropdownStructure[newDropdownOptionName];
    } else {
      overwrittenDropdownNames.push(oldDropdownOptionName); 
    }
    const oldDropdownStructure = overwrittenDropdownStructures[oldDropdownOptionName] || subcomponentDropdownStructure[oldDropdownOptionName];
    subcomponentDropdownStructure[newDropdownOptionName] = oldDropdownStructure;
    parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[subcomponentName] = newDropdownOptionName;
  }

  private static getNewPostfix(subcomponentPrefixToTotal: SubcomponentPrefixToTotal, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      nestedSubcomponentName: string): string|number {
    return subcomponentPrefixToTotal[subcomponentNameToPrefix[nestedSubcomponentName]] += 1;
  }

  private static moveExistingDropdownOptionToTheBottom(containingDropdownStructure: NestedDropdownStructure, newBaseSubcomponentName: string): void {
    const temp = containingDropdownStructure[newBaseSubcomponentName];
    delete containingDropdownStructure[newBaseSubcomponentName];
    containingDropdownStructure[newBaseSubcomponentName] = temp;
  }

  private static generateDropdownOptionName(subcomponentName: string, newPostfix: number|string): string {
    const words = subcomponentName.trim().split(/\s+/);
    return words[0] + ' ' + newPostfix;
  }

  private static generateSingleDropdownOptionName(subcomponentName: string): string {
    return subcomponentName.trim().split(/\s+/)[0];
  }

  private static updateBaseSubcomponentName(parentComponent: WorkshopComponent, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal, singleSubcomponentPrefixes: SingleSubcomponentPrefixes, containingDropdownStructure: NestedDropdownStructure,
      overwrittenDropdownNames: string[], newDrodpownValues: string[], nestedSubcomponent: NestedSubcomponent, overwrittenDropdownStructures: any): void {
    const subcomponentName = nestedSubcomponent.name;
    const oldDropdownName = parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[subcomponentName];
    const newDropdownName = singleSubcomponentPrefixes[subcomponentNameToPrefix[subcomponentName]]
      ? UpdateGenericComponentNames.generateSingleDropdownOptionName(subcomponentName)
      : UpdateGenericComponentNames.generateDropdownOptionName(subcomponentName, UpdateGenericComponentNames.getNewPostfix(subcomponentPrefixToTotal, subcomponentNameToPrefix, subcomponentName));
    if (containingDropdownStructure[newDropdownName]) {
      UpdateGenericComponentNames.moveExistingDropdownOptionToTheBottom(containingDropdownStructure, newDropdownName);
    }
    UpdateGenericComponentNames.updateComponentName(parentComponent, containingDropdownStructure, subcomponentName,
      overwrittenDropdownNames, newDropdownName, oldDropdownName, overwrittenDropdownStructures);
    newDrodpownValues.push(newDropdownName);
  }

  private static updateAllComponentNames(parentComponent: WorkshopComponent, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal, singleSubcomponentPrefixes: SingleSubcomponentPrefixes, containingDropdownStructure: NestedDropdownStructure,
      alignedSections: AlignedSections): string[] {
    const overwrittenDropdownNames = [];
    const newDrodpownValues = [];
    const alignedSectionsKeys = Object.keys(alignedSections);
    const overwrittenDropdownStructures = {};
    for (let i = 0; i < alignedSectionsKeys.length; i += 1) {
      const section = alignedSections[alignedSectionsKeys[i]];
      for (let j = 0; j < section.length; j += 1) {
         UpdateGenericComponentNames.updateBaseSubcomponentName(parentComponent, subcomponentNameToPrefix, subcomponentPrefixToTotal,
          singleSubcomponentPrefixes, containingDropdownStructure, overwrittenDropdownNames, newDrodpownValues, section[j], overwrittenDropdownStructures);
      }
    }
    return overwrittenDropdownNames.filter(x => !newDrodpownValues.includes(x));
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

  private static generateDropdownOptionNames(containingDropdownStructure: NestedDropdownStructure): string[] {
    return Object.keys(containingDropdownStructure).filter((name) => name !== DROPDOWN_OPTION_AUX_DETAILS_REF);
  }

  private static setPrefixesAndTotals(containingDropdownStructure: NestedDropdownStructure, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal): void {
    const dropdownOptionNames = UpdateGenericComponentNames.generateDropdownOptionNames(containingDropdownStructure);
    for (let i = 0; i < dropdownOptionNames.length; i += 1) {
      const optionName = (containingDropdownStructure[dropdownOptionNames[i]][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails).actualObjectName;
      const subcomponentNamePrefix = UpdateGenericComponentNames.generateSingleDropdownOptionName(optionName);
      subcomponentNameToPrefix[optionName] = subcomponentNamePrefix;
      UpdateGenericComponentNames.setTotals(subcomponentPrefixToTotal, subcomponentNamePrefix);
    }
  }

  private static populateMaps(containingDropdownStructure: NestedDropdownStructure, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal, singleSubcomponentPrefixes: SingleSubcomponentPrefixes): void {
    UpdateGenericComponentNames.setPrefixesAndTotals(containingDropdownStructure, subcomponentNameToPrefix, subcomponentPrefixToTotal);
    UpdateGenericComponentNames.setSinglePrefixesAndResetTotals(subcomponentPrefixToTotal, singleSubcomponentPrefixes);
  }

  private static getBaseDropdownStructure(parentComponent: WorkshopComponent): NestedDropdownStructure {
    const baseName = parentComponent.coreSubcomponentNames.base;
    return parentComponent.componentPreviewStructure.subcomponentDropdownStructure[baseName] as NestedDropdownStructure;
  }

  public static update(parentComponent: WorkshopComponent, parentLayerDropdownStructure: NestedDropdownStructure, alignedSections: AlignedSections): void {
    const subcomponentNameToPrefix: SubcomponentNameToPrefix = {};
    const subcomponentPrefixToTotal: SubcomponentPrefixToTotal = {};
    const singleSubcomponentPrefixes: SingleSubcomponentPrefixes = {};
    const containingDropdownStructure = parentLayerDropdownStructure || UpdateGenericComponentNames.getBaseDropdownStructure(parentComponent);
    UpdateGenericComponentNames.populateMaps(containingDropdownStructure, subcomponentNameToPrefix, subcomponentPrefixToTotal, singleSubcomponentPrefixes);
    const overwrittenDropdownNames = UpdateGenericComponentNames.updateAllComponentNames(parentComponent, subcomponentNameToPrefix, subcomponentPrefixToTotal,
      singleSubcomponentPrefixes, containingDropdownStructure, alignedSections);
    UpdateComponentNamesShared.removeOverwrittenDropdownNames(overwrittenDropdownNames, containingDropdownStructure);
  }

  public static updateViaLayerObject(parentComponent: WorkshopComponent, layer: Layer): void {
    const { name, sections: { alignedSections }} = layer;
    const { subcomponentDropdownStructure } = parentComponent.componentPreviewStructure;
    const nestedComponents = subcomponentDropdownStructure[parentComponent.coreSubcomponentNames.base][parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[name]];
    UpdateGenericComponentNames.update(parentComponent, nestedComponents, alignedSections);
  }
}
