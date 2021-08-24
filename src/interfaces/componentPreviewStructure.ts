import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../consts/layerSections.enum';
import { NestedDropdownStructure } from './nestedDropdownStructure';
import { SubcomponentProperties } from './workshopComponent';

export interface SubcomponentNameToDropdownOptionName {
  [subcomponentName: string]: string;
}

export type BaseSubcomponentRef = {
  subcomponentProperties: SubcomponentProperties;
};

export type AlignedSections = { [key in ALIGNED_SECTION_TYPES]: BaseSubcomponentRef[] };

interface Sections {
  [LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS]?: AlignedSections;
  [LAYER_SECTIONS_TYPES.EQUAL_SPLIT_SECTIONS]?: BaseSubcomponentRef[];
}

export type Layer = { sections: Sections; } & BaseSubcomponentRef;

export interface ComponentPreviewStructure {
  layers?: Layer[];
  subcomponentDropdownStructure?: NestedDropdownStructure;
  subcomponentNameToDropdownOptionName: SubcomponentNameToDropdownOptionName;
  // will be used in the future, can be horizontal or vertical
  layeringType?: string;
}

// current dropdown strategy:

// Each dropdown option has an actual object name which is the name of the subcomponent that it is representing, e.g. dropdown structure:
// Button: {
//  Text: {dropdownOptionAuxiliaryDetailsReferenceObject: {…}}
//  dropdownOptionAuxiliaryDetailsReferenceObject: {isEnabled: true, actualObjectName: "Button 7"}
// }

// SubcomponentNameToDropdownOptionName is a map that tracks what dropdown option each subcomponent name corresponds to, e,g:
// subcomponentNameToDropdownOptionName: {
//  Avatar 10: "Avatar"
//  Base: "Base"
//  Button 7: "Button"
//  Button 12: "Button 1"
//  Button 15: "Button 2"
//  Layer 3: "Layer 1"
//  Layer 4: "Layer 2"
//  Layer 5: "Layer 3"
//  Text 6: "Text"
// }
