import { NestedDropdownStructure } from './nestedDropdownStructure';

export interface OptionNames {
  oldOptionName: string;
  newOptionName: string;
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

export interface OptionDataMaps {
  subcomponentNameToPrefix: SubcomponentNameToPrefix;
  subcomponentPrefixToTotal: SubcomponentPrefixToTotal;
  singleSubcomponentPrefixes: SingleSubcomponentPrefixes;
}

export interface StateObjects {
  overwrittenOptionNames: string[];
  newDrodpownNames: string[];
  overwrittenDropdownStructures: NestedDropdownStructure;
}

export interface OptionNameInitializationObjects {
  optionDataMaps: OptionDataMaps;
  stateObjects: StateObjects;
}
