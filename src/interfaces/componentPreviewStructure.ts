import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../consts/horizontalAlignmentSections';
import { NestedDropdownStructure } from './nestedDropdownStructure';
import { Subcomponent } from './workshopComponent';

export interface SubcomponentNameToDropdownItemName {
  [subcomponentName: string]: string;
}

// the reason why alignment section maps to a subcomponent instead of a workshop component is because
// subcomponent names matter during traversals and when a component is used we can't always refer
// to the required subcomponent as we may not require the base
// WORK 2 - if this was always the base subcomponent then the API should be valid
export type AlignmentSectionToSubcomponents = { [key in HORIZONTAL_ALIGNMENT_SECTIONS]: Subcomponent[] };

export type Layer = {
  alignmentSectionToSubcomponents: AlignmentSectionToSubcomponents;
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
