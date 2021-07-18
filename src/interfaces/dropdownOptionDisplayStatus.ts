export const DROPDOWN_OPTION_DISPLAY_STATUS_REF = 'dropdownOptionDisplayStatusReferenceObject';

export interface DropdownOptionDisplayStatusRef {
  [DROPDOWN_OPTION_DISPLAY_STATUS_REF]: DropdownOptionDisplayStatus;
}

export interface DropdownOptionDisplayStatus {
  isEnabled: boolean;
  hiddenText?: string;
}
