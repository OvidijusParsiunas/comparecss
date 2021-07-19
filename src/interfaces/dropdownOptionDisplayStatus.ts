export const DROPDOWN_OPTION_AUX_DETAILS_REF = 'dropdownOptionAuxiliaryDetailsReferenceObject';

export interface DropdownOptionAuxDetailsRef {
  [DROPDOWN_OPTION_AUX_DETAILS_REF]: DropdownOptionAuxDetails;
}

export interface DropdownOptionAuxDetails {
  isEnabled: boolean;
  actualObjectName?: string;
}
