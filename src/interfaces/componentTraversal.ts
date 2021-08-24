import { AlignedSections, Layer, BaseSubcomponentRef } from './componentPreviewStructure';
import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';
import { DropdownOptionAuxDetails } from './dropdownOptionDisplayStatus';
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
  dropdownOptionDetailsStack?: DropdownOptionAuxDetails[];
  subcomponentDropdownStructure?: NestedDropdownStructure;
  subcomponentProperties?: SubcomponentProperties;
  alignedNestedComponents?: BaseSubcomponentRef[];
  alignedSections?: AlignedSections;
  layers?: Layer[];
  index?: number;
}

