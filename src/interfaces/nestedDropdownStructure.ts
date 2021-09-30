import { DropdownItemAuxDetailsRef } from './dropdownItemDisplayStatus';

export type NestedDropdownStructure = {
  [subcomponentName: string]: NestedDropdownStructure | DropdownItemAuxDetailsRef;
}
