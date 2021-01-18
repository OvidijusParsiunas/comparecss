export type NestedDropdownStructure = {
  [key in string]: NestedDropdownStructure | null;
}
