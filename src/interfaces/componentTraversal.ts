import { AlignmentSectionToComponents, Layer } from './componentPreviewStructure';
import { Subcomponent, WorkshopComponent } from './workshopComponent';
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
  // WORK 4 - refactor
  targetSubcomponent: Subcomponent;
  parentLayerAlignmentSectionToComponents?: AlignmentSectionToComponents;
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
  // WORK 4 - refactor
  subcomponent?: Subcomponent;
  alignedComponents?: WorkshopComponent[];
  alignmentSectionToComponents?: AlignmentSectionToComponents;
  layers?: Layer[];
  index?: number;
}

export type PreviewTraversalResult = {
  traversalState?: SubcomponentPreviewTraversalState;
} & StopTraversal;

export type PreviewTraversalCallback = (...activeSubcomponent: SubcomponentPreviewTraversalState[]) => PreviewTraversalResult;

// currently used for preview traversal callbacks only
export type AlignedComponentWithMeta = [WorkshopComponent[], AlignmentSectionToComponents];
