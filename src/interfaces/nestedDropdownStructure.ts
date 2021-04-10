import { EntityDisplayStatusRef } from './entityDisplayStatus';

export type NestedDropdownStructure = {
  [key in string]: NestedDropdownStructure | EntityDisplayStatusRef;
}
