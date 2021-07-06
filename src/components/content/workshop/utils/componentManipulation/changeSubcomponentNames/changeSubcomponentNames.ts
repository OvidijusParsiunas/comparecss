import { DROPDOWN_OPTION_DISPLAY_STATUS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { Layer } from '../../../../../../interfaces/componentPreviewStructure';

export class ChangeSubcomponentNames {

  private static removeOldSubcomponentNames(oldSubcomponentNames: string[], layersDropdownStructure: NestedDropdownStructure): void {
    oldSubcomponentNames.forEach((name) => {
      delete layersDropdownStructure[name];
    });
  }

  private static replaceSubstringAtIndex(fullString: string, index: number, replacementSubstring: string | number): string {
    return `${fullString.substring(0, index)}${replacementSubstring}`;
  }

  private static changeOldSubcomponentBaseNames(parentComponent: WorkshopComponent, currentSubcomponentName: string, newSubcomponentName: string): void {
    parentComponent.subcomponents[newSubcomponentName] = parentComponent.subcomponents[currentSubcomponentName];
    const parentLayerComponent: WorkshopComponent = parentComponent.subcomponents[currentSubcomponentName].nestedComponent.ref
    parentLayerComponent.activeSubcomponentName = newSubcomponentName;
    parentLayerComponent.defaultSubcomponentName = newSubcomponentName;
    parentLayerComponent.coreSubcomponentNames.base = newSubcomponentName;
    // double check if this is needed
    parentLayerComponent.componentPreviewStructure.subcomponentDropdownStructure[newSubcomponentName] = parentLayerComponent
      .componentPreviewStructure.subcomponentDropdownStructure[currentSubcomponentName];
    parentLayerComponent.subcomponents[newSubcomponentName] = parentComponent.subcomponents[currentSubcomponentName];
    delete parentComponent.subcomponents[currentSubcomponentName];
    delete parentLayerComponent.subcomponents[currentSubcomponentName];
  }

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

  public static changeGenericSubcomponentBaseNames(parentComponent: WorkshopComponent, subcomponentDropdown: NestedDropdownStructure): void {
    const nestedSubcomponentsNames = Object.keys(subcomponentDropdown);
    // if (layerSubcomponentsNames.length === 1) return;
    const oldSubcomponentNames: string[] = [];
    const singleSubcomponents: {[subcomponentPrefix: string]: boolean } = {};
    const subcomponentPrefixToNumbers: {[subcomponentPrefix: string]: number} = {};
    const subcomponentNameToPrefixes: {[subcomponentName: string]: string} = {};
    for (let i = 0; i < nestedSubcomponentsNames.length; i += 1) {
      const nestedSubcomponentName = nestedSubcomponentsNames[i];
      ChangeSubcomponentNames.populateSubcomponentPrefixToNumbersMap(subcomponentPrefixToNumbers, subcomponentNameToPrefixes, nestedSubcomponentName);
    }
    ChangeSubcomponentNames.processMaps(subcomponentPrefixToNumbers, singleSubcomponents);
    for (let i = 0; i < nestedSubcomponentsNames.length; i += 1) {
      const nestedSubcomponentName = nestedSubcomponentsNames[i];
      if (nestedSubcomponentName !== DROPDOWN_OPTION_DISPLAY_STATUS_REF) {
        const newPostfix = ChangeSubcomponentNames.getNewPostfix(subcomponentPrefixToNumbers, subcomponentNameToPrefixes, singleSubcomponents, nestedSubcomponentName);
        const newSubcomponentName = ChangeSubcomponentNames.replaceSubstringAtIndex(nestedSubcomponentName, nestedSubcomponentName.length - 1, newPostfix);
        if (newSubcomponentName !== nestedSubcomponentName) {
          subcomponentDropdown[newSubcomponentName] = subcomponentDropdown[nestedSubcomponentName];
          ChangeSubcomponentNames.changeOldSubcomponentBaseNames(parentComponent, nestedSubcomponentName, newSubcomponentName);
          oldSubcomponentNames.push(nestedSubcomponentName);
        }
      }
    }
    ChangeSubcomponentNames.removeOldSubcomponentNames(oldSubcomponentNames, subcomponentDropdown);
  }

  private static changeName(parentComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, oldSubcomponentName: string,
      newSubcomponentName: string, oldSubcomponentNames: string[]): void {
    subcomponentDropdownStructure[newSubcomponentName] = subcomponentDropdownStructure[oldSubcomponentName];
    ChangeSubcomponentNames.changeOldSubcomponentBaseNames(parentComponent, oldSubcomponentName, newSubcomponentName);
    oldSubcomponentNames.push(oldSubcomponentName);
  }

  private static changeLayerName(parentComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure, oldSubcomponentName: string,
      newSubcomponentName: string, oldSubcomponentNames: string[], layer: Layer): void {
    if (newSubcomponentName !== DROPDOWN_OPTION_DISPLAY_STATUS_REF) {
      ChangeSubcomponentNames.changeName(parentComponent, subcomponentDropdownStructure, oldSubcomponentName, newSubcomponentName, oldSubcomponentNames);
      layer.name = newSubcomponentName;
    }
  }

  private static changeLayerNames(parentComponent: WorkshopComponent, layerSubcomponentsNames: string[], layersDropdownStructure: NestedDropdownStructure, oldSubcomponentNames: string[],
      startingLayerNumber: number, layers: Layer[]): void {
    for (let i = startingLayerNumber; i <= layerSubcomponentsNames.length; i += 1) {
      const layerSubcomponentName = layerSubcomponentsNames[i - 1];
      const currentLayerNumberLength = (i).toString().length;
      const nextLayerNumberLength = (i + 1).toString().length;
      // when removing layer number 9, need to make sure that the next 10 will get reduced to 9, hence more chars need to be removed
      const numberLengthToReplace = currentLayerNumberLength < nextLayerNumberLength ? nextLayerNumberLength : currentLayerNumberLength;
      const newSubcomponentName = ChangeSubcomponentNames.replaceSubstringAtIndex(layerSubcomponentName,
        layerSubcomponentName.length - numberLengthToReplace, i);
      ChangeSubcomponentNames.changeLayerName(parentComponent, layersDropdownStructure, layerSubcomponentName, newSubcomponentName,
        oldSubcomponentNames, layers[i - 1]);
    
    }
  }

  private static changeFirstLayerSubcomponentName(parentComponent: WorkshopComponent, layerSubcomponentsNames: string[], layersDropdownStructure: NestedDropdownStructure,
      oldSubcomponentNames: string[], layer: Layer): void {
    const number = Number.parseFloat(layerSubcomponentsNames[0].substring(layerSubcomponentsNames[0].length - 1));
    if (number === 1 || number === 2) {
      const oldSubcomponentName = layerSubcomponentsNames[0];
      const newSubcomponentName = ChangeSubcomponentNames.replaceSubstringAtIndex(oldSubcomponentName, oldSubcomponentName.length - 1, ' ');
      ChangeSubcomponentNames.changeLayerName(parentComponent, layersDropdownStructure, oldSubcomponentName, newSubcomponentName,
        oldSubcomponentNames, layer);
    }
  }

  public static changeLayerSubcomponentBaseNames(parentComponent: WorkshopComponent, startingLayerNumber: number): void {
    const { coreSubcomponentNames: { base }, componentPreviewStructure: { subcomponentDropdownStructure, layers } } = parentComponent;
    const layersDropdownStructure = subcomponentDropdownStructure[base] as NestedDropdownStructure;
    const layerSubcomponentsNames = Object.keys(layersDropdownStructure);
    const oldSubcomponentNames: string[] = [];
    if (layerSubcomponentsNames.length === 1) {
      ChangeSubcomponentNames.changeFirstLayerSubcomponentName(parentComponent, layerSubcomponentsNames, layersDropdownStructure, oldSubcomponentNames, layers[0]);
    } else {
      ChangeSubcomponentNames.changeLayerNames(parentComponent, layerSubcomponentsNames, layersDropdownStructure, oldSubcomponentNames, startingLayerNumber, layers);
    }
    ChangeSubcomponentNames.removeOldSubcomponentNames(oldSubcomponentNames, layersDropdownStructure);
  }
}
