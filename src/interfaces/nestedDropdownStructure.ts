import { DropdownOptionDisplayStatusRef } from './dropdownOptionDisplayStatus';

export type NestedDropdownStructure = {
  [subcomponentName: string]: NestedDropdownStructure | DropdownOptionDisplayStatusRef;
}
