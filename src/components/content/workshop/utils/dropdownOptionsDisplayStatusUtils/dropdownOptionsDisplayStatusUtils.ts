import { DropdownOptionAuxDetails, DropdownOptionAuxDetailsRef, DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../interfaces/dropdownOptionDisplayStatus';

export class DropdownOptionsDisplayStatusUtils {

  public static createDefaultOptionDisplayStatus(actualObjectName?: string): DropdownOptionAuxDetails {
    const defaultOptionDisplayStatus: DropdownOptionAuxDetails = { isEnabled: true };
    if (actualObjectName) defaultOptionDisplayStatus.actualObjectName = actualObjectName;
    return defaultOptionDisplayStatus;
  }
  
  public static createDropdownOptionDisplayStatusReferenceObject(actualObjectName?: string): DropdownOptionAuxDetailsRef {
    return { [DROPDOWN_OPTION_AUX_DETAILS_REF]: DropdownOptionsDisplayStatusUtils.createDefaultOptionDisplayStatus(actualObjectName) };
  }
}
