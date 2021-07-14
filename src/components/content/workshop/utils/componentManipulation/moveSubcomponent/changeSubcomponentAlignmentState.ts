import { NestedSubcomponent } from '../../../../../../interfaces/componentPreviewStructure';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';

// WORK2: rework
let subcomponent = null;
let lastSubcomponentIndex = -1;
let initialAlignment = null

function setSubcomponent(nestedSubcomponent: NestedSubcomponent): void {
  subcomponent = nestedSubcomponent;
}

function getSubcomponent(): NestedSubcomponent {
  return subcomponent;
}

function setLastSubcomponentIndex(index: number): void {
  lastSubcomponentIndex = index;
}

function getLastSubcomponentIndex(): number {
  return lastSubcomponentIndex;
}

function setInitialAlignment(initialAlignmentState: ALIGNED_SECTION_TYPES): void {
  initialAlignment = initialAlignmentState;
}

function getInitialAlignment(): ALIGNED_SECTION_TYPES {
  return initialAlignment;
}

function reset(): void {
  subcomponent = null;
  lastSubcomponentIndex = -1;
}

export const changeSubcomponentAlignmentState = {
  setLastSubcomponentIndex,
  getLastSubcomponentIndex,
  setInitialAlignment,
  getInitialAlignment,
  setSubcomponent,
  getSubcomponent,
  reset,
}
