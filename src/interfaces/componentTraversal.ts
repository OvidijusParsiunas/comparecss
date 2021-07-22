import { AlignedSections, Layer, NestedComponent } from './componentPreviewStructure';
import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';
import { NestedDropdownStructure } from './nestedDropdownStructure';

export type ChangeOrderCallback = (param: string) => void;

export interface TargetDetails {
  targetSubcomponentName: string;
  targetDropdownOptionName: string;
  parentComponent: WorkshopComponent;
  targetSubcomponentProperties: SubcomponentProperties;
  parentLayerAlignedSections?: AlignedSections;
}

export interface ComponentTraversalState {
  dropdownOptionName?: string;
  dropdownOptionNamesStack?: string[];
  subcomponentDropdownStructure?: NestedDropdownStructure;
  subcomponentProperties?: SubcomponentProperties;
  alignedNestedComponents?: NestedComponent[];
  alignedSections?: AlignedSections;
  layers?: Layer[];
  index?: number;
}

