import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../consts/horizontalAlignmentSections';
import { Subcomponent } from '../../../../../../interfaces/workshopComponent';

let baseSubcomponent: Subcomponent = null;
let initialAlignment: HORIZONTAL_ALIGNMENT_SECTIONS = null
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

function getInitialAlignment(): HORIZONTAL_ALIGNMENT_SECTIONS {
  return initialAlignment;
}

function setInitialAlignment(initialAlignmentState: HORIZONTAL_ALIGNMENT_SECTIONS): void {
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
