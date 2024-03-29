import { RemovalModalState } from '../../../../../../interfaces/removalModalState';

let isDoNotShowAgainState = false;

function getIsDoNotShowModalAgainState(): boolean {
  return isDoNotShowAgainState;
}

function setIsDoNotShowModalAgainState(state: boolean): void {
  isDoNotShowAgainState = state;
}

export const removeChildComponentModalState: RemovalModalState = {
  getIsDoNotShowModalAgainState,
  setIsDoNotShowModalAgainState,
};
