import { SubcomponentAndOverlayElementIds } from '../../../../../../interfaces/subcomponentAndOverlayElementIds';

let subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds = {};

function setSubcomponentAndOverlayElementIdsState(state: SubcomponentAndOverlayElementIds): SubcomponentAndOverlayElementIds {
  subcomponentAndOverlayElementIdsObject = {};
  return subcomponentAndOverlayElementIdsObject = state;
}

function getSubcomponentIdViaSubcomponentName(subcomponentName: string): string {
  return subcomponentAndOverlayElementIdsObject[subcomponentName].subcomponentId;
}

function getOverlayIdViaSubcomponentName(subcomponentName: string): string {
  return subcomponentAndOverlayElementIdsObject[subcomponentName] && subcomponentAndOverlayElementIdsObject[subcomponentName].overlayId;
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
  setSubcomponentAndOverlayElementIdsState,
  getSubcomponentIdViaSubcomponentName,
  getSubcomponentNameViaOverlayId,
  getOverlayIdViaSubcomponentName,
  getOverlayIdViaSubcomponentId,
}
