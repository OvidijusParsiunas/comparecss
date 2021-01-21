import { SUB_COMPONENTS } from '../../../../../../consts/subcomponentModes.enum';

type SubcomponentPreviewZIndexes = {
  [key in SUB_COMPONENTS]: number;
}

export const subcomponentPreviewZIndexes: SubcomponentPreviewZIndexes = {
  [SUB_COMPONENTS.BASE]: 10000,
  [SUB_COMPONENTS.CLOSE]: 10002,
  [SUB_COMPONENTS.LAYER_1]: 10001,
  [SUB_COMPONENTS.LAYER_2]: 10001,
  [SUB_COMPONENTS.LAYER_3]: 10001,
};
