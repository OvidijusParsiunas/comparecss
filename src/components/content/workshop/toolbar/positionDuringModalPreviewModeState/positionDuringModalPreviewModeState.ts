export enum TOOLBAR_POSITIONS_DURING_MODAL_PREVIEW { TOP, BOTTOM };

let currentToolbarPositionDuringModalPreviewState = TOOLBAR_POSITIONS_DURING_MODAL_PREVIEW.TOP;

function getToolbarPositionDuringModalPreviewState(): TOOLBAR_POSITIONS_DURING_MODAL_PREVIEW {
  return currentToolbarPositionDuringModalPreviewState;
}

function setToolbarPositionDuringModalPreviewState(state: TOOLBAR_POSITIONS_DURING_MODAL_PREVIEW): void {
  currentToolbarPositionDuringModalPreviewState = state;
}

export const toolbarPositionDuringModalPreviewState = {
  getToolbarPositionDuringModalPreviewState,
  setToolbarPositionDuringModalPreviewState,
}
