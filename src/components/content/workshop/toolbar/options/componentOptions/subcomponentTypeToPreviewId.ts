import { SUB_COMPONENT_PREVIEW_ELEMENT_IDS } from '../../../../../../consts/subcomponentPreviewElementIds.enum';
import { SUB_COMPONENTS } from '../../../../../../consts/subcomponentModes.enum';

type SubcomponentTypeToPreviewId = {
  [key in SUB_COMPONENTS]: SUB_COMPONENT_PREVIEW_ELEMENT_IDS;
}

export const subcomponentTypeToPreviewId: SubcomponentTypeToPreviewId = {
  [SUB_COMPONENTS.BASE]: SUB_COMPONENT_PREVIEW_ELEMENT_IDS.BASE,
  [SUB_COMPONENTS.CLOSE]: SUB_COMPONENT_PREVIEW_ELEMENT_IDS.CLOSE,
};
