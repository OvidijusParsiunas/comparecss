import { AlignedSections, Layer, BaseSubcomponentRef } from './componentPreviewStructure';
import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';
import { DropdownItemAuxDetails } from './dropdownItemDisplayStatus';
import { NestedDropdownStructure } from './nestedDropdownStructure';

interface StopTraversal {
  stopTraversal?: boolean;
}

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

export type DropdownTraversalResult<T = unknown> = {
  result?: T;
} & StopTraversal;

export type DropdownTraversalCallback<T = unknown> = (traversalState: DropdownStructureTraversalState) => DropdownTraversalResult<T>;

export type DropdownStructureSearchFromStartCallback<T> = (
  containerComponent: WorkshopComponent,
  dropdownStructure: NestedDropdownStructure,
  ...args: unknown[]) => T;

export interface SubcomponentPreviewTraversalState {
  subcomponentProperties?: SubcomponentProperties;
  alignedChildComponents?: BaseSubcomponentRef[];
  alignedSections?: AlignedSections;
  layers?: Layer[];
  index?: number;
}

export type PreviewTraversalResult = {
  traversalState?: SubcomponentPreviewTraversalState;
} & StopTraversal;

export type PreviewTraversalCallback = (...activeSubcomponent: SubcomponentPreviewTraversalState[]) => PreviewTraversalResult;

// currently used for preview traversal callbacks only
export type AlignedComponentWithMeta = [BaseSubcomponentRef[], AlignedSections];
