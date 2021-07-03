import { DropdownOptionDisplayStatus, DropdownOptionDisplayStatusRef, DROPDOWN_OPTION_DISPLAY_STATUS_REF } from '../../../../../interfaces/dropdownOptionDisplayStatus';

export class DropdownOptionsDisplayStatusUtils {

  public static createDefaultOptionDisplayStatus(): DropdownOptionDisplayStatus {
    return { isEnabled: true };
  }
  
  public static createDropdownOptionDisplayStatusReferenceObject(): DropdownOptionDisplayStatusRef {
    return { [DROPDOWN_OPTION_DISPLAY_STATUS_REF]: DropdownOptionsDisplayStatusUtils.createDefaultOptionDisplayStatus() };
  }
}
