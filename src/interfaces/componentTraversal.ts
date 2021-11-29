import { AlignmentSectionToComponents, Layer } from './componentPreviewStructure';
import { DropdownItemAuxDetails } from './dropdownItemDisplayStatus';
import { NestedDropdownStructure } from './nestedDropdownStructure';
import { WorkshopComponent } from './workshopComponent';

interface StopTraversal {
  stopTraversal?: boolean;
}

export interface TargetDetails {
  targetSubcomponentName: string;
  targetDropdownItemName: string;
  masterComponent: WorkshopComponent;
  targetComponent: WorkshopComponent;
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

export interface ComponentPreviewTraversalState {
  component: WorkshopComponent;
  alignedComponents?: WorkshopComponent[];
  alignmentSectionToComponents?: AlignmentSectionToComponents;
  layers?: Layer[];
  index?: number;
}

export type PreviewTraversalResult = {
  traversalState?: ComponentPreviewTraversalState;
} & StopTraversal;

export type PreviewTraversalCallback = (...componentPreviewTraversalState: ComponentPreviewTraversalState[]) => PreviewTraversalResult;

// currently used for preview traversal callbacks only
export type AlignedComponentWithMeta = [WorkshopComponent[], AlignmentSectionToComponents];
