import { AlignedSections, Layer, NestedComponent } from '../../../../../../interfaces/componentPreviewStructure';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { UpdateDropdownOptionNamesShared } from './updateDropdownOptionNamesShared';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../activeComponent/activeComponentUtils';
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

  private static updateNewAndOldOptionNames(component: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, subcomponentName: string,
      overwrittenOptionNames: string[], newOptionName: string, oldOptionName: string, overwrittenDropdownStructures: NestedDropdownStructure): void {
    if (subcomponentDropdownStructure[newOptionName] && oldOptionName !== newOptionName) {
      overwrittenDropdownStructures[newOptionName] = subcomponentDropdownStructure[newOptionName];
    }
    const oldDropdownStructure = overwrittenDropdownStructures[oldOptionName] || subcomponentDropdownStructure[oldOptionName];
    subcomponentDropdownStructure[newOptionName] = oldDropdownStructure;
    component.componentPreviewStructure.subcomponentNameToDropdownOptionName[subcomponentName] = newOptionName;
    overwrittenOptionNames.push(oldOptionName); 
  }

  private static getNewPostfix(subcomponentPrefixToTotal: SubcomponentPrefixToTotal, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentName: string): number {
    return subcomponentPrefixToTotal[subcomponentNameToPrefix[subcomponentName]] += 1;
  }

  private static updateOptionNames(component: WorkshopComponent, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal, singleSubcomponentPrefixes: SingleSubcomponentPrefixes, containerDropdownStructure: NestedDropdownStructure,
      overwrittenOptionNames: string[], newDrodpownValues: string[], nestedComponent: NestedComponent, overwrittenDropdownStructures: NestedDropdownStructure): void {
    const subcomponentName = nestedComponent.name;
    const newPostfix = UpdateGenericComponentDropdownOptionNames.getNewPostfix(subcomponentPrefixToTotal, subcomponentNameToPrefix, subcomponentName);
    const { oldOptionName, newOptionName } = UpdateDropdownOptionNamesShared
      .generateOptionNames(nestedComponent.name, newPostfix, component, singleSubcomponentPrefixes[subcomponentNameToPrefix[subcomponentName]]);
    if (containerDropdownStructure[newOptionName]) {
      UpdateDropdownOptionNamesShared.moveExistingOptionToTheBottom(containerDropdownStructure, newOptionName);
    }
    UpdateGenericComponentDropdownOptionNames.updateNewAndOldOptionNames(component, containerDropdownStructure, subcomponentName,
      overwrittenOptionNames, newOptionName, oldOptionName, overwrittenDropdownStructures);
    newDrodpownValues.push(newOptionName);
  }

  private static updateAllOptionNames(component: WorkshopComponent, subcomponentNameToPrefix: SubcomponentNameToPrefix,
      subcomponentPrefixToTotal: SubcomponentPrefixToTotal, singleSubcomponentPrefixes: SingleSubcomponentPrefixes, containerDropdownStructure: NestedDropdownStructure,
      alignedSections: AlignedSections): string[] {
    const overwrittenOptionNames = [];
    const newDrodpownNames = [];
    const alignedSectionsKeys = Object.keys(alignedSections);
    const overwrittenDropdownStructures = {};
    for (let i = 0; i < alignedSectionsKeys.length; i += 1) {
      const section = alignedSections[alignedSectionsKeys[i]];
      for (let j = 0; j < section.length; j += 1) {
         UpdateGenericComponentDropdownOptionNames.updateOptionNames(component, subcomponentNameToPrefix, subcomponentPrefixToTotal,
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

  public static updateViaParentLayerDropdownStructure(component: WorkshopComponent, containerDropdownStructure: NestedDropdownStructure,
      alignedSections: AlignedSections): void {
    const subcomponentNameToPrefix: SubcomponentNameToPrefix = {};
    const subcomponentPrefixToTotal: SubcomponentPrefixToTotal = {};
    const singleSubcomponentPrefixes: SingleSubcomponentPrefixes = {};
    UpdateGenericComponentDropdownOptionNames.populateMaps(containerDropdownStructure, subcomponentNameToPrefix, subcomponentPrefixToTotal, singleSubcomponentPrefixes);
    const overwrittenOptionNames = UpdateGenericComponentDropdownOptionNames.updateAllOptionNames(component, subcomponentNameToPrefix, subcomponentPrefixToTotal,
      singleSubcomponentPrefixes, containerDropdownStructure, alignedSections);
    UpdateDropdownOptionNamesShared.removeOverwrittenOptionNames(overwrittenOptionNames, containerDropdownStructure);
  }

  private static getNestedDropdownStructure(component: WorkshopComponent, layerName: string, useArgComponentDropdownStructure: boolean): NestedDropdownStructure {
    const { subcomponentDropdownStructure, subcomponentNameToDropdownOptionName } = component.componentPreviewStructure;
    const activeComponent = useArgComponentDropdownStructure ? component : ActiveComponentUtils.getActiveNestedComponentParent(component);
    const activeComponentName = activeComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
    const activeComponentDropdownStructure = subcomponentDropdownStructure[activeComponentName];
    // if there is no dropdown structure for layer, use the parent dropdown structure (e.g. button)
    return activeComponentDropdownStructure[subcomponentNameToDropdownOptionName[layerName]] || activeComponentDropdownStructure;
  }

  // for shallow component updates only
  public static updateViaParentLayerPreviewStructure(baseComponent: WorkshopComponent, layer: Layer, useArgComponentStructure = false): void {
    const { name: layerName, sections: { alignedSections }} = layer;
    const coreBaseComponent = baseComponent.coreBaseComponent || baseComponent;
    const nestedStructure = UpdateGenericComponentDropdownOptionNames.getNestedDropdownStructure(coreBaseComponent, layerName, useArgComponentStructure);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerDropdownStructure(coreBaseComponent, nestedStructure, alignedSections);
  }
}
