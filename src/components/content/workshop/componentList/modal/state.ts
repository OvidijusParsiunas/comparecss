import { RemovalModalState } from '../../../../../interfaces/removalModalState';

let setIsDoNotShowAgainState = false;

function getIsDoNotShowModalAgainState(): boolean {
  return setIsDoNotShowAgainState;
}

function setIsDoNotShowModalAgainState(state: boolean): void {
  setIsDoNotShowAgainState = state;
}

export const removeComponentModalState: RemovalModalState = {
  getIsDoNotShowModalAgainState,
  setIsDoNotShowModalAgainState,
}
