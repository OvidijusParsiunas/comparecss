import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../consts/layerSections.enum';
import { NestedDropdownStructure } from './nestedDropdownStructure';
import { Subcomponent } from './workshopComponent';

export interface SubcomponentNameToDropdownItemName {
  [subcomponentName: string]: string;
}

// the reason why aligned sections maps to a subcomponent instead of a workshop component is because
// their subcomponent names matter during traversals and when a component is used instead - we can't
// refer to the required subcomponent as it may not always be the base
export type AlignedSections = { [key in ALIGNED_SECTION_TYPES]: Subcomponent[] };

interface Sections {
  [LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS]?: AlignedSections;
}

export type Layer = {
  sections: Sections;
  subcomponent: Subcomponent;
}

export interface ComponentPreviewStructure {
  layers?: Layer[];
  subcomponentDropdownStructure?: NestedDropdownStructure;
  subcomponentNameToDropdownItemName: SubcomponentNameToDropdownItemName;
  // will be used in the future, can be horizontal or vertical
  layeringType?: string;
}

// current dropdown strategy:

// Each dropdown item has an actual object name which is the name of the subcomponent that it is representing, e.g. dropdown structure:
// Button: {
//  Text: {dropdownItemAuxiliaryDetailsReferenceObject: {…}}
//  dropdownItemAuxiliaryDetailsReferenceObject: {isEnabled: true, actualObjectName: "Button 7"}
// }

// SubcomponentNameToDropdownItemName is a map that tracks what dropdown item each subcomponent name corresponds to, e,g:
// subcomponentNameToDropdownItemName: {
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
