import { ClassNameEditState } from '../../../../../interfaces/classNameEditState';

let isClassNameEditingInProgress = false;

function getIsClassNameEditingInProgressState(): boolean {
  return isClassNameEditingInProgress;
}

function setIsClassNameEditingInProgressState(state: boolean): void {
  isClassNameEditingInProgress = state;
}

export const classNameEditState: ClassNameEditState = {
  getIsClassNameEditingInProgressState,
  setIsClassNameEditingInProgressState,
}
