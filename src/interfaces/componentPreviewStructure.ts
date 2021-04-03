import { CustomCss, SubcomponentProperties } from './workshopComponent';
import { NestedDropdownStructure } from './nestedDropdownStructure';
import { SUB_COMPONENTS } from '../consts/subcomponentModes.enum';

type NestedSubcomponents = { [key in SUB_COMPONENTS]?: SubcomponentProperties };

export interface AlignedSections {
  left: NestedSubcomponents;
  center: NestedSubcomponents;
  right: NestedSubcomponents;
}

interface Sections {
  alignedSections?: AlignedSections;
  equalSplitSections?: NestedSubcomponents;
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
