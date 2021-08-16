import { AlignedSections, Layer, NestedComponent } from '../../../../../../interfaces/componentPreviewStructure';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { MultiBaseComponentUtils } from '../../multiBaseComponent/multiBaseComponentUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { UpdateDropdownOptionNamesShared } from './updateDropdownOptionNamesShared';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { StringUtils } from '../../generic/stringUtils';
import { ArrayUtils } from '../../generic/arrayUtils';

interface SubcomponentNameToPrefix {
  [subcomponentName: string]: string;
}

interface SubcomponentPrefixToTotal {
  [subcomponentName: string]: number;
}

interface SingleSubcomponentPrefixes {
  [subcomponentPrefix: string]: boolean;
}

export class UpdateGenericComponentDropdownOptionNames extends UpdateDropdownOptionNamesShared {

  private static updateNewAndOldOptionNames(parentComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, subcomponentName: string,
      overwrittenOptionNames: string[], newOptionName: string, oldOptionName: string, overwrittenDropdownStructures: NestedDropdownStructure): void {
    if (subcomponentDropdownStructure[newOptionName] && oldOptionName !== newOptionName) {
      overwrittenDropdownStructures[newOptionName] = subcomponentDropdownStructure[newOptionName];
    }
    const oldDropdownStructure = overwrittenDropdownStructures[oldOptionName] || subcomponentDropdownStructure[oldOptionName];
    subcomponentDropdownStructure[newOptionName] = oldDropdownStructure;
    parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[subcomponentName] = newOptionName;
    overwrittenOptionNames.push(oldOptionName); 
  }

  private static getNewPostfix(subcomponentPrefixToTotal: SubcomponentPrefixToTotal, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentName: string): number {
    return subcomponentPrefixToTotal[subcomponentNameToPrefix[subcomponentName]] += 1;
  }

  private static updateOptionNames(parentComponent: WorkshopComponent, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal, singleSubcomponentPrefixes: SingleSubcomponentPrefixes, containerDropdownStructure: NestedDropdownStructure,
      overwrittenOptionNames: string[], newDrodpownValues: string[], nestedComponent: NestedComponent, overwrittenDropdownStructures: NestedDropdownStructure): void {
    const subcomponentName = nestedComponent.name;
    const newPostfix = UpdateGenericComponentDropdownOptionNames.getNewPostfix(subcomponentPrefixToTotal, subcomponentNameToPrefix, subcomponentName);
    const { oldOptionName, newOptionName } = UpdateDropdownOptionNamesShared
      .generateOptionNames(nestedComponent.name, newPostfix, parentComponent, singleSubcomponentPrefixes[subcomponentNameToPrefix[subcomponentName]]);
    if (containerDropdownStructure[newOptionName]) {
      UpdateDropdownOptionNamesShared.moveExistingOptionToTheBottom(containerDropdownStructure, newOptionName);
    }
    UpdateGenericComponentDropdownOptionNames.updateNewAndOldOptionNames(parentComponent, containerDropdownStructure, subcomponentName,
      overwrittenOptionNames, newOptionName, oldOptionName, overwrittenDropdownStructures);
    newDrodpownValues.push(newOptionName);
  }

  private static updateAllOptionNames(parentComponent: WorkshopComponent, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal, singleSubcomponentPrefixes: SingleSubcomponentPrefixes, containerDropdownStructure: NestedDropdownStructure,
      alignedSections: AlignedSections): string[] {
    const overwrittenOptionNames = [];
    const newDrodpownNames = [];
    const alignedSectionsKeys = Object.keys(alignedSections);
    const overwrittenDropdownStructures = {};
    for (let i = 0; i < alignedSectionsKeys.length; i += 1) {
      const section = alignedSections[alignedSectionsKeys[i]];
      for (let j = 0; j < section.length; j += 1) {
         UpdateGenericComponentDropdownOptionNames.updateOptionNames(parentComponent, subcomponentNameToPrefix, subcomponentPrefixToTotal,
          singleSubcomponentPrefixes, containerDropdownStructure, overwrittenOptionNames, newDrodpownNames, section[j], overwrittenDropdownStructures);
      }
    }
    return ArrayUtils.differenceInArrays(overwrittenOptionNames, newDrodpownNames);
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

  private static populateMaps(containerDropdownStructure: NestedDropdownStructure, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal, singleSubcomponentPrefixes: SingleSubcomponentPrefixes): void {
    UpdateGenericComponentDropdownOptionNames.setPrefixesAndTotals(containerDropdownStructure, subcomponentNameToPrefix, subcomponentPrefixToTotal);
    UpdateGenericComponentDropdownOptionNames.setSinglePrefixesAndResetTotals(subcomponentPrefixToTotal, singleSubcomponentPrefixes);
  }

  private static getBaseDropdownStructure(parentComponent: WorkshopComponent): NestedDropdownStructure {
    const activeBaseComponent = MultiBaseComponentUtils.getCurrentlyActiveBaseComponent(parentComponent);
    const baseName = activeBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
    return parentComponent.componentPreviewStructure.subcomponentDropdownStructure[baseName] as NestedDropdownStructure;
  }

  public static updateViaParentLayerDropdownStructure(parentComponent: WorkshopComponent, parentLayerDropdownStructure: NestedDropdownStructure,
      alignedSections: AlignedSections): void {
    const subcomponentNameToPrefix: SubcomponentNameToPrefix = {};
    const subcomponentPrefixToTotal: SubcomponentPrefixToTotal = {};
    const singleSubcomponentPrefixes: SingleSubcomponentPrefixes = {};
    // some nested components do not have a parent layer dropdown structure and their parent is the base (e.g. button -> text)
    const containerDropdownStructure = parentLayerDropdownStructure || UpdateGenericComponentDropdownOptionNames.getBaseDropdownStructure(parentComponent);
    UpdateGenericComponentDropdownOptionNames.populateMaps(containerDropdownStructure, subcomponentNameToPrefix, subcomponentPrefixToTotal, singleSubcomponentPrefixes);
    const overwrittenOptionNames = UpdateGenericComponentDropdownOptionNames.updateAllOptionNames(parentComponent, subcomponentNameToPrefix, subcomponentPrefixToTotal,
      singleSubcomponentPrefixes, containerDropdownStructure, alignedSections);
    UpdateDropdownOptionNamesShared.removeOverwrittenOptionNames(overwrittenOptionNames, containerDropdownStructure);
  }

  public static updateViaParentLayerPreviewStructure(parentComponent: WorkshopComponent, layer: Layer): void {
    const { name, sections: { alignedSections }} = layer;
    const activeBaseComponent = MultiBaseComponentUtils.getCurrentlyActiveBaseComponent(parentComponent);
    const { subcomponentDropdownStructure } = parentComponent.componentPreviewStructure;
    const nestedComponents = subcomponentDropdownStructure[activeBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name]
      [parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[name]];
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerDropdownStructure(parentComponent, nestedComponents, alignedSections);
  }
}
