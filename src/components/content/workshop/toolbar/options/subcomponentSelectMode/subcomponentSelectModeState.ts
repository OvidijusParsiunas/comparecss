let isSubcomponentSelectModeActiveState = false;
let currentlyHighlightedOverlayElementsState: HTMLElement[] = [];

function getIsSubcomponentSelectModeActiveState(): boolean {
  return isSubcomponentSelectModeActiveState;
}

function setIsSubcomponentSelectModeActiveState(state: boolean): void {
  isSubcomponentSelectModeActiveState = state;
}

function getLastHighlightedOverlayElementState(): HTMLElement {
  return currentlyHighlightedOverlayElementsState[currentlyHighlightedOverlayElementsState.length - 1];
}

function addNewHighlightedOverlayElementToState(newHighlightedOverlayElement: HTMLElement): void {
  currentlyHighlightedOverlayElementsState.push(newHighlightedOverlayElement);
}

function removeLastHighlightedOverlayElementFromState(): void {
  currentlyHighlightedOverlayElementsState.pop();
}

function removeAllHighlightedOverlayElementsFromState(): void {
  currentlyHighlightedOverlayElementsState = [];
}

export const subcomponentSelectModeState = {
  getIsSubcomponentSelectModeActiveState,
  setIsSubcomponentSelectModeActiveState,
  getLastHighlightedOverlayElementState,
  addNewHighlightedOverlayElementToState,
  removeLastHighlightedOverlayElementFromState,
  removeAllHighlightedOverlayElementsFromState,
}
