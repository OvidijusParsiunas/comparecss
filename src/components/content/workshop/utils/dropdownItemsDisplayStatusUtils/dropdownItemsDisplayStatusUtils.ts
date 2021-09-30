import { DropdownItemAuxDetails, DropdownItemAuxDetailsRef, DROPDOWN_ITEM_AUX_DETAILS_REF } from '../../../../../interfaces/dropdownItemDisplayStatus';

export class DropdownItemsDisplayStatusUtils {

  public static createDefaultItemDisplayStatus(actualObjectName?: string): DropdownItemAuxDetails {
    const defaultItemDisplayStatus: DropdownItemAuxDetails = { isEnabled: true };
    if (actualObjectName) defaultItemDisplayStatus.actualObjectName = actualObjectName;
    return defaultItemDisplayStatus;
  }
  
  public static createDropdownItemDisplayStatusReferenceObject(actualObjectName?: string): DropdownItemAuxDetailsRef {
    return { [DROPDOWN_ITEM_AUX_DETAILS_REF]: DropdownItemsDisplayStatusUtils.createDefaultItemDisplayStatus(actualObjectName) };
  }
}
