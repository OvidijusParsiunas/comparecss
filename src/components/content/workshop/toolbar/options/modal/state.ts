let setIsDoNotShowAgainState = false;

function getIsDoNotShowModalAgainState(): boolean {
  return setIsDoNotShowAgainState;
}

function setIsDoNotShowModalAgainState(state: boolean): void {
  setIsDoNotShowAgainState = state;
}

export {
  getIsDoNotShowModalAgainState,
  setIsDoNotShowModalAgainState,
}
