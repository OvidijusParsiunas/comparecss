import { NestedSubcomponent } from '../../../../../../interfaces/componentPreviewStructure';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';

let subcomponent = null;
let initialAlignment = null
let initialAlignmentIndex = -1;

function getNestedSubcomponent(): NestedSubcomponent {
  return subcomponent;
}

function setNestedSubcomponent(nestedSubcomponent: NestedSubcomponent): void {
  subcomponent = nestedSubcomponent;
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
  subcomponent = null;
  initialAlignment = null;
  initialAlignmentIndex = -1;
}

export const subcomponentAlignmentDropdownState = {
  setInitialAlignmentIndex,
  getInitialAlignmentIndex,
  setInitialAlignment,
  getInitialAlignment,
  setNestedSubcomponent,
  getNestedSubcomponent,
  reset,
}
