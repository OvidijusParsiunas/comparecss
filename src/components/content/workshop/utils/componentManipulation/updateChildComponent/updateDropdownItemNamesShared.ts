import { DropdownItemAuxDetails, DROPDOWN_ITEM_AUX_DETAILS_REF } from '../../../../../../interfaces/dropdownItemDisplayStatus';
import { NestedDropdownStructure } from '../../../../../../interfaces/nestedDropdownStructure';
import { ItemNames } from '../../../../../../interfaces/updateDropdownItemNames';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { StringUtils } from '../../generic/stringUtils';

export class UpdateDropdownItemNamesShared {

  protected static removeOverwrittenItemNames(oldItemNames: string[], dropdownStructure: NestedDropdownStructure): void {
    oldItemNames.forEach((itemName) => {
      delete dropdownStructure[itemName];
    });
  }

  protected static moveExistingItemToTheBottom(containingDropdownStructure: NestedDropdownStructure, newBaseSubcomponentName: string): void {
    const temp = containingDropdownStructure[newBaseSubcomponentName];
    delete containingDropdownStructure[newBaseSubcomponentName];
    containingDropdownStructure[newBaseSubcomponentName] = temp;
  }

  private static generateMultiItemName(subcomponentName: string, newPostfix: number): string {
    const subcomponentNamePrefix = StringUtils.getFirstWordInString(subcomponentName);
    return subcomponentNamePrefix + ' ' + newPostfix;
  }

  protected static generateItemNames(subcomponentName: string, newItemNameIndex: number, masterComponent: WorkshopComponent,
      isSingleItem: boolean): ItemNames {
    const oldItemName = masterComponent.componentPreviewStructure.subcomponentNameToDropdownItemName[subcomponentName];
    const newItemName = isSingleItem
      ? StringUtils.getFirstWordInString(subcomponentName)
      : UpdateDropdownItemNamesShared.generateMultiItemName(subcomponentName, newItemNameIndex);
    return { oldItemName, newItemName };
  }

  protected static getSubcomponentNames(layersDropdownStructure: NestedDropdownStructure): string[] {
    return Object.keys(layersDropdownStructure)
      .map((itemName) => (layersDropdownStructure[itemName][DROPDOWN_ITEM_AUX_DETAILS_REF] as DropdownItemAuxDetails)?.actualObjectName)
      .filter((itemName) => itemName !== undefined);
  }
}
