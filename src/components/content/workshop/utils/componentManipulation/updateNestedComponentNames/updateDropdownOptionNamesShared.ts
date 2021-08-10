import { DropdownOptionAuxDetails, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownOptionDisplayStatus';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { StringUtils } from '../../generic/stringUtils';

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
    const subcomponentNamePrefix = StringUtils.getFirstWordInString(subcomponentName);
    return subcomponentNamePrefix + ' ' + newPostfix;
  }

  protected static generateOptionNames(subcomponentName: string, newOptionNameIndex: number, parentComponent: WorkshopComponent,
      isSingleOption: boolean): OptionNames {
    const oldOptionName = parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[subcomponentName];
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

  public static generateNestedDropdownStructure(options: string[]): NestedDropdownStructure {
    return options.reduce((accummulator, currentValue) => Object.assign(accummulator, {[currentValue]: null}), {});
  }
}
