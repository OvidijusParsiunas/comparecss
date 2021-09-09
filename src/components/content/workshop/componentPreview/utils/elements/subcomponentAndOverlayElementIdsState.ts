import { SubcomponentAndOverlayElementIds } from '../../../../../../interfaces/subcomponentAndOverlayElementIds';

let subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds = {};

function setSubcomponentAndOverlayElementIdsState(state: SubcomponentAndOverlayElementIds): SubcomponentAndOverlayElementIds {
  subcomponentAndOverlayElementIdsObject = {};
  return subcomponentAndOverlayElementIdsObject = state;
}

function getLastSubcomponentIdNumber(): number {
  const keys = Object.keys(subcomponentAndOverlayElementIdsObject);
  const lastSubcomponentAndOverlayElement = subcomponentAndOverlayElementIdsObject[keys[keys.length - 1]].subcomponentId;
  return Number.parseInt(lastSubcomponentAndOverlayElement.split('-').pop());
}

function addSubcomponentAndOverlayElementIdsState(state: SubcomponentAndOverlayElementIds): void {
  Object.assign(subcomponentAndOverlayElementIdsObject, state);
}

function getSubcomponentIdViaSubcomponentName(subcomponentName: string): string {
  return subcomponentAndOverlayElementIdsObject[subcomponentName]?.subcomponentId;
}

function getOverlayIdViaSubcomponentName(subcomponentName: string): string {
  return subcomponentAndOverlayElementIdsObject[subcomponentName]?.overlayId;
}

function getPaddingComponentOverlayIdsViaSubcomponentName(subcomponentName: string): string[] {
  return subcomponentAndOverlayElementIdsObject[subcomponentName]?.paddingComponentOverlayIds;
}

function getSubcomponentNameViaOverlayId(overlayId: string): string {
  return Object.keys(subcomponentAndOverlayElementIdsObject)
    .find((key) => { return subcomponentAndOverlayElementIdsObject[key].overlayId === overlayId; });
}

function getOverlayIdViaSubcomponentId(subcomponentId: string): string {
  const subcomponents = Object.keys(subcomponentAndOverlayElementIdsObject);
  for (let i = 0; i < subcomponents.length; i += 1) {
    if (subcomponentAndOverlayElementIdsObject[subcomponents[i]].subcomponentId ===  subcomponentId) {
      return subcomponentAndOverlayElementIdsObject[subcomponents[i]].overlayId;
    }
  }
  return ''; 
}

export const subcomponentAndOverlayElementIdsState = {
  getPaddingComponentOverlayIdsViaSubcomponentName,
  setSubcomponentAndOverlayElementIdsState,
  addSubcomponentAndOverlayElementIdsState,
  getSubcomponentIdViaSubcomponentName,
  getSubcomponentNameViaOverlayId,
  getOverlayIdViaSubcomponentName,
  getOverlayIdViaSubcomponentId,
  getLastSubcomponentIdNumber,
};
