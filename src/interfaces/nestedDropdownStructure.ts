import { DropdownOptionAuxDetailsRef } from './dropdownOptionDisplayStatus';

export type NestedDropdownStructure = {
  [subcomponentName: string]: NestedDropdownStructure | DropdownOptionAuxDetailsRef;
}
