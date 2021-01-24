let isSubcomponentSelectModeActiveState = false;

function getIsSubcomponentSelectModeActiveState(): boolean {
  return isSubcomponentSelectModeActiveState;
}

function setIsSubcomponentSelectModeActiveState(state: boolean): void {
  isSubcomponentSelectModeActiveState = state;
}

export const subcomponentSelectModeState = {
  getIsSubcomponentSelectModeActiveState,
  setIsSubcomponentSelectModeActiveState,
}
