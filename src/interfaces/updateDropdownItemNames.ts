import { NestedDropdownStructure } from './nestedDropdownStructure';

export interface ItemNames {
  oldItemName: string;
  newItemName: string;
}

export interface SubcomponentNameToPrefix {
  [subcomponentName: string]: string;
}

export interface SubcomponentPrefixToTotal {
  [subcomponentName: string]: number;
}

export interface SingleSubcomponentPrefixes {
  [subcomponentPrefix: string]: boolean;
}

export interface ItemDataMaps {
  subcomponentNameToPrefix: SubcomponentNameToPrefix;
  subcomponentPrefixToTotal: SubcomponentPrefixToTotal;
  singleSubcomponentPrefixes: SingleSubcomponentPrefixes;
}

export interface StateObjects {
  overwrittenItemNames: string[];
  newDrodpownNames: string[];
  overwrittenDropdownStructures: NestedDropdownStructure;
}

export interface ItemNameInitializationObjects {
  itemDataMaps: ItemDataMaps;
  stateObjects: StateObjects;
}
