import { AlignedSections, Layer, BaseSubcomponentRef } from './componentPreviewStructure';
import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';
import { DropdownItemAuxDetails } from './dropdownItemDisplayStatus';
import { NestedDropdownStructure } from './nestedDropdownStructure';

export type DropdownTraversalCallback<T> = (traversalState: T) => T;

export interface TraversalResult {
  stopTraversal?: boolean;
  traversalState?: SubcomponentPreviewTraversalState;
}

export type PreviewTraversalCallback = (...activeSubcomponent: SubcomponentPreviewTraversalState[]) => TraversalResult;

// currently used for preview traversal callback only
export type AlignedComponentWithMeta = [BaseSubcomponentRef[], AlignedSections];

export interface TargetDetails {
  targetSubcomponentName: string;
  targetDropdownItemName: string;
  containerComponent: WorkshopComponent;
  masterComponent: WorkshopComponent;
  targetSubcomponentProperties: SubcomponentProperties;
  parentLayerAlignedSections?: AlignedSections;
}

export interface DropdownStructureTraversalState {
  dropdownItemName?: string;
  dropdownItemDetailsStack?: DropdownItemAuxDetails[];
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
