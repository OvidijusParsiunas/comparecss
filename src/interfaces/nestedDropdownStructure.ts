import { DropdownOptionDisplayStatusRef } from './dropdownOptionDisplayStatus';

export type NestedDropdownStructure = {
  [key in string]: NestedDropdownStructure | DropdownOptionDisplayStatusRef;
}
