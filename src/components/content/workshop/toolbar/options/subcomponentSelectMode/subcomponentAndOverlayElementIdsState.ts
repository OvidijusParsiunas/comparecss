import { SubcomponentAndOverlayElementIds } from '../../../../../../interfaces/subcomponentAndOverlayElementIds';
import { SUB_COMPONENTS } from '../../../../../../consts/subcomponentModes.enum';

let subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds = {};

function setSubcomponentAndOverlayElementIdsState(state: SubcomponentAndOverlayElementIds): SubcomponentAndOverlayElementIds {
  subcomponentAndOverlayElementIdsObject = {};
  return subcomponentAndOverlayElementIdsObject = state;
}

function getOverlayIdViaSubcomponentType(subcomponentType: SUB_COMPONENTS): string {
  return subcomponentAndOverlayElementIdsObject[subcomponentType] && subcomponentAndOverlayElementIdsObject[subcomponentType].overlayId;
}

function getSubcomponentTypeViaOverlayId(overlayId: string): SUB_COMPONENTS {
  return Object.keys(subcomponentAndOverlayElementIdsObject)
    .find((key) => { return subcomponentAndOverlayElementIdsObject[key].overlayId === overlayId; }) as SUB_COMPONENTS;
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
  getOverlayIdViaSubcomponentType,
  getSubcomponentTypeViaOverlayId,
  getOverlayIdViaSubcomponentId,
}
