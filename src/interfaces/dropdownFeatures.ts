import { DROPDOWN_MENU_INDEX_ALIGNMENT } from '../consts/dropdownMenuAlignment.enum';
import { DROPDOWN_MENU_POSITIONS } from '../consts/dropdownMenuPositions.enum';
import { Subcomponent } from './workshopComponent';

export interface SelectDropdownText {
  defaultText: string;
  lastHoveredItemText: string;
  lastSelectedItemText: string;
}

export interface DropdownMenuData {
  itemTextOptionIndex: number;
}

export interface DropdownMenuPosition {
  position: DROPDOWN_MENU_POSITIONS;
}

export type SelectDropdown = {
  enabled: boolean;
  callback: (subcomponent: Subcomponent) => void;
};

export interface DropdownFeatures {
  select?: SelectDropdown;
  menuPosition?: DropdownMenuPosition;
  indexAlignment?: DROPDOWN_MENU_INDEX_ALIGNMENT;
}
