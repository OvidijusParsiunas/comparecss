import { DROPDOWN_MENU_INDEX_ALIGNMENT } from '../consts/dropdownMenuAlignment.enum';
import { DROPDOWN_MENU_POSITIONS } from '../consts/dropdownMenuPositions.enum';
import { SubcomponentProperties } from './workshopComponent';

export interface DropdownMenuPosition {
  position: DROPDOWN_MENU_POSITIONS;
}

export interface SubcomponentMouseEventItemText {
  lastHoveredItemText: string;
  lastSelectedItemText: string;
}

export type SelectDropdown = {
  enabled: boolean;
  defaultText: string;
  callback: (subcomponentProperties: SubcomponentProperties) => void;
} & SubcomponentMouseEventItemText;

export interface DropdownFeatures {
  select?: SelectDropdown;
  menuPosition?: DropdownMenuPosition;
  indexAlignment?: DROPDOWN_MENU_INDEX_ALIGNMENT;
}
