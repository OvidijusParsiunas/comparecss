import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';
import { SubcomponentProperties } from './workshopComponent';

export interface CoreSubcomponentRefs {
  [SUBCOMPONENT_TYPES.BASE]?: SubcomponentProperties;
  [SUBCOMPONENT_TYPES.TEXT]?: SubcomponentProperties;
  [SUBCOMPONENT_TYPES.ICON]?: SubcomponentProperties;
}
