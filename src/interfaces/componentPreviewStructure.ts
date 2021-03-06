import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../consts/layerSections.enum';
import { NestedDropdownStructure } from './nestedDropdownStructure';
import { SubcomponentProperties } from './workshopComponent';

export type NestedSubcomponent = {
  name: string;
  subcomponentProperties: SubcomponentProperties;
};

export type AlignedSections = { [key in ALIGNED_SECTION_TYPES]: NestedSubcomponent[] };

interface Sections {
  [LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS]?: AlignedSections;
  [LAYER_SECTIONS_TYPES.EQUAL_SPLIT_SECTIONS]?: NestedSubcomponent[];
}

export type Layer = { sections: Sections; } & NestedSubcomponent;

export interface ComponentPreviewStructure {
  baseSubcomponentProperties: SubcomponentProperties;
  // will be used in the future, can be horizontal or vertical
  layeringType?: string;
  layers?: Layer[];
  subcomponentDropdownStructure?: NestedDropdownStructure;
}
