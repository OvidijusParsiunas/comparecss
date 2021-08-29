import { BaseSubcomponentRef } from '../../../../../../interfaces/componentPreviewStructure';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';

let baseSubcomponent: BaseSubcomponentRef = null;
let initialAlignment: ALIGNED_SECTION_TYPES = null
let initialAlignmentIndex = -1;

function getChildBaseSubcomponent(): BaseSubcomponentRef {
  return baseSubcomponent;
}

function setChildBaseComponent(newBaseSubcomponent: BaseSubcomponentRef): void {
  baseSubcomponent = newBaseSubcomponent;
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
  baseSubcomponent = null;
  initialAlignment = null;
  initialAlignmentIndex = -1;
}

export const childComponentAlignmentDropdownState = {
  setInitialAlignmentIndex,
  getInitialAlignmentIndex,
  setInitialAlignment,
  getInitialAlignment,
  setChildBaseComponent,
  getChildBaseSubcomponent,
  reset,
}
