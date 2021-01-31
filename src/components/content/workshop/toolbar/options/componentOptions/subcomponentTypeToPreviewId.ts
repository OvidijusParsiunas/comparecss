import { SUB_COMPONENTS } from '../../../../../../consts/subcomponentModes.enum';

type SubcomponentTypeToPreviewId = {
  [key in SUB_COMPONENTS]: string;
};

export const subcomponentTypeToPreviewId: SubcomponentTypeToPreviewId = {
  [SUB_COMPONENTS.BASE]: 'base-subcomponent-preview',
  [SUB_COMPONENTS.CLOSE]: 'close-subcomponent-preview',
  [SUB_COMPONENTS.LAYER_1]: 'layer_1-subcomponent-preview',
  [SUB_COMPONENTS.LAYER_2]: 'layer_2-subcomponent-preview',
  [SUB_COMPONENTS.LAYER_3]: 'layer_3-subcomponent-preview',
};
