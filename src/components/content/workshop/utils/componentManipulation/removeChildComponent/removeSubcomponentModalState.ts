import { RemovalModalState } from '../../../../../../interfaces/removalModalState';

// WORK 2 - rename to remove child component

let isDoNotShowAgainState = false;

function getIsDoNotShowModalAgainState(): boolean {
  return isDoNotShowAgainState;
}

function setIsDoNotShowModalAgainState(state: boolean): void {
  isDoNotShowAgainState = state;
}

export const removeSubcomponentModalState: RemovalModalState = {
  getIsDoNotShowModalAgainState,
  setIsDoNotShowModalAgainState,
};
