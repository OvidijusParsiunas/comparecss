import { SubcomponentAndOverlayElementIds } from '../../../../../../interfaces/subcomponentAndOverlayElementIds';

let subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds = {};

function setSubcomponentAndOverlayElementIdsState(state: SubcomponentAndOverlayElementIds): SubcomponentAndOverlayElementIds {
  subcomponentAndOverlayElementIdsObject = {};
  return subcomponentAndOverlayElementIdsObject = state;
}

function getOverlayIdViaSubcomponentType(subcomponentType: string): string {
  return subcomponentAndOverlayElementIdsObject[subcomponentType] && subcomponentAndOverlayElementIdsObject[subcomponentType].overlayId;
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
  getSubcomponentNameViaOverlayId,
  getOverlayIdViaSubcomponentType,
  getOverlayIdViaSubcomponentId,
}
