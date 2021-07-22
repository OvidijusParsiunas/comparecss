import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

interface OptionNames {
  oldOptionName: string;
  newOptionName: string;
}

export class UpdateDropdownOptionNamesShared {

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
    const words = subcomponentName.trim().split(/\s+/);
    return words[0] + ' ' + newPostfix;
  }

  protected static generateSingleOptionName(subcomponentName: string): string {
    return subcomponentName.trim().split(/\s+/)[0];
  }

  protected static generateOptionNames(subcomponentName: string, newOptionNameIndex: number, parentComponent: WorkshopComponent,
      isSingleOption: boolean): OptionNames {
    const oldOptionName = parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[subcomponentName];
    const newOptionName = isSingleOption
      ? UpdateDropdownOptionNamesShared.generateSingleOptionName(subcomponentName)
      : UpdateDropdownOptionNamesShared.generateMultiOptionName(subcomponentName, newOptionNameIndex);
    return { oldOptionName, newOptionName };
  }

  protected static generateSubcomponentNames(layersDropdownStructure: NestedDropdownStructure): string[] {
    return Object.keys(layersDropdownStructure)
      .map((optionName) => (layersDropdownStructure[optionName][DROPDOWN_OPTION_AUX_DETAILS_REF] as DropdownOptionAuxDetails)?.actualObjectName)
      .filter((optionName) => optionName !== undefined);
  }
}
