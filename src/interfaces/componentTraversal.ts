import { AlignedSections, Layer, BaseSubcomponentRef } from './componentPreviewStructure';
import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';
import { DropdownOptionAuxDetails } from './dropdownOptionDisplayStatus';
import { NestedDropdownStructure } from './nestedDropdownStructure';

export type TraverseComponentCallback<T> = (traversalState: T) => T;

export type ChangeOrderCallback = (param: string) => void;

export interface TargetDetails {
  targetSubcomponentName: string;
  targetDropdownOptionName: string;
  containerComponent: WorkshopComponent;
  masterComponent: WorkshopComponent;
  targetSubcomponentProperties: SubcomponentProperties;
  parentLayerAlignedSections?: AlignedSections;
}

export interface DropdownStructureTraversalState {
  dropdownOptionName?: string;
  dropdownOptionDetailsStack?: DropdownOptionAuxDetails[];
  subcomponentDropdownStructure?: NestedDropdownStructure;
  index?: number;
}

export interface SubcomponentPreviewTraversalState {
  subcomponentProperties?: SubcomponentProperties;
  alignedChildComponents?: BaseSubcomponentRef[];
  alignedSections?: AlignedSections;
  layers?: Layer[];
  index?: number;
}
