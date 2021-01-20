import { OptionalSubcomponent } from './workshopComponent';

export type NestedDropdownStructure = {
  [key in string]: NestedDropdownStructure | OptionalSubcomponent;
}
