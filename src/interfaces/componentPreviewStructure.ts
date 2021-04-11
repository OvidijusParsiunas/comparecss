import { CustomCss, SubcomponentDisplayStatus, SubcomponentProperties } from './workshopComponent';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../consts/layerSections';
import { NestedDropdownStructure } from './nestedDropdownStructure';

export type NestedSubcomponent = {
  name: string;
  subcomponentProperties: SubcomponentProperties;
};

export type AlignedSections = { [key in ALIGNED_SECTION_TYPES]: NestedSubcomponent[] };

interface Sections {
  [LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS]?: AlignedSections;
  [LAYER_SECTIONS_TYPES.EQUAL_SPLIT_SECTIONS]?: NestedSubcomponent[];
}

export interface Layer {
  subcomponentType: string;
  customCss: CustomCss;
  sections: Sections;
  subcomponentDisplayStatus?: SubcomponentDisplayStatus;
}

export interface ComponentPreviewStructure {
  baseSubcomponentProperties: SubcomponentProperties;
  // will be used in the future, can be horizontal or vertical
  layeringType?: string;
  layers?: Layer[];
  subcomponentDropdownStructure?: NestedDropdownStructure;
}
