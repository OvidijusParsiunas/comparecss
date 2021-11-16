import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { Subcomponent } from '../../../../../../interfaces/workshopComponent';

let baseSubcomponent: Subcomponent = null;
let initialAlignment: ALIGNED_SECTION_TYPES = null
let initialAlignmentIndex = -1;

function getChildBaseSubcomponent(): Subcomponent {
  return baseSubcomponent;
}

function setChildBaseComponent(newBaseSubcomponent: Subcomponent): void {
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
