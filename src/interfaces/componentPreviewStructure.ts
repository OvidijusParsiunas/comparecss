import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../consts/layerSections';
import { CustomCss, SubcomponentProperties } from './workshopComponent';
import { NestedDropdownStructure } from './nestedDropdownStructure';
import { SUB_COMPONENTS } from '../consts/subcomponentModes.enum';

export type NestedSubcomponent = { 
  name: SUB_COMPONENTS;
  subcomponentProperties: SubcomponentProperties;
};

export type AlignedSections = { [key in ALIGNED_SECTION_TYPES]: NestedSubcomponent[] };

interface Sections {
  [LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS]?: AlignedSections;
  [LAYER_SECTIONS_TYPES.EQUAL_SPLIT_SECTIONS]?: NestedSubcomponent[];
}

export interface Layer {
  subcomponentType: SUB_COMPONENTS;
  customCss: CustomCss;
  sections: Sections;
}

export interface ComponentPreviewStructure {
  baseCss: SubcomponentProperties;
  // will be used in the future, can be horizontal or vertical
  layeringType?: string;
  layers?: Layer[];
  subcomponentDropdownStructure?: NestedDropdownStructure;
}
