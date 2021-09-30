export const DROPDOWN_ITEM_AUX_DETAILS_REF = 'dropdownItemAuxiliaryDetailsReferenceObject';

export interface DropdownItemAuxDetailsRef {
  [DROPDOWN_ITEM_AUX_DETAILS_REF]: DropdownItemAuxDetails;
}

export interface DropdownItemAuxDetails {
  isEnabled: boolean;
  actualObjectName?: string;
}
