import { DROPDOWN_MENU_INDEX_ALIGNMENT } from '../consts/dropdownMenuAlignment.enum';
import { SubcomponentProperties } from './workshopComponent';

export interface SubcomponentMouseEventItemText {
  lastHoveredItemText: string;
  lastSelectedItemText: string;
}

export type SelectDropdown = {
  enabled: boolean;
  defaultText: string;
  callback: (subcomponentProperties: SubcomponentProperties) => void;
} & SubcomponentMouseEventItemText;

export interface DropdownStaticFeatures {
  select?: SelectDropdown;
  indexAlignment?: DROPDOWN_MENU_INDEX_ALIGNMENT;
}
