import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../consts/horizontalAlignmentSections';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';

let childComponnet: WorkshopComponent = null;
let initialAlignment: HORIZONTAL_ALIGNMENT_SECTIONS = null
let initialAlignmentIndex = -1;

function getChildComponent(): WorkshopComponent {
  return childComponnet;
}

function setChildComponent(newChildComponent: WorkshopComponent): void {
  childComponnet = newChildComponent;
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
  childComponnet = null;
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
