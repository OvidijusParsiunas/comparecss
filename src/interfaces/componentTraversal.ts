import { AlignedSections, Layer, NestedSubcomponent } from './componentPreviewStructure';
import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';
import { NestedDropdownStructure } from './nestedDropdownStructure';

export type ChangeOrderCallback = (param: string) => void;

export interface TargetDetails {
  targetSubcomponentName: string;
  targetDropdownOptionName: string;
  parentComponent: WorkshopComponent;
  targetSubcomponentProperties: SubcomponentProperties;
  parentLayerAlignedSections?: AlignedSections;
  // WORK2: will need to be removed from down here
  callback?: ChangeOrderCallback;
}

export interface ComponentTraversalState {
  dropdownOptionName?: string;
  dropdownOptionNamesStack?: string[];
  subcomponentDropdownStructure?: NestedDropdownStructure;
  subcomponentProperties?: SubcomponentProperties;
  alignedNestedComponents?: NestedSubcomponent[];
  alignedSections?: AlignedSections;
  layers?: Layer[];
  index?: number;
}

