import { SUB_COMPONENTS } from '../consts/subcomponentModes.enum';

export type SubcomponentAndOverlayElementIds = {
  [key in SUB_COMPONENTS]?: {
    subcomponentId: string;
    overlayId: string;
  }
}
