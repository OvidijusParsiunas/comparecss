import { BaseSubcomponentRef } from '../../../../../../interfaces/componentPreviewStructure';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';

let component = null;
let initialAlignment = null
let initialAlignmentIndex = -1;

function getChildComponent(): BaseSubcomponentRef {
  return component;
}

function setChildComponent(seedComponent: BaseSubcomponentRef): void {
  component = seedComponent;
}

function getInitialAlignmentIndex(): number {
  return initialAlignmentIndex;
}

function setInitialAlignmentIndex(index: number): void {
  initialAlignmentIndex = index;
}

function getInitialAlignment(): ALIGNED_SECTION_TYPES {
  return initialAlignment;
}

function setInitialAlignment(initialAlignmentState: ALIGNED_SECTION_TYPES): void {
  initialAlignment = initialAlignmentState;
}

function reset(): void {
  component = null;
  initialAlignment = null;
  initialAlignmentIndex = -1;
}

export const childComponentAlignmentDropdownState = {
  setInitialAlignmentIndex,
  getInitialAlignmentIndex,
  setInitialAlignment,
  getInitialAlignment,
  setChildComponent,
  getChildComponent,
  reset,
}