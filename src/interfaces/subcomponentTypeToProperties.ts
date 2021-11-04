import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';
import { SubcomponentProperties } from './workshopComponent';

export type SubcomponentTypeToProperties = {
  [key in SUBCOMPONENT_TYPES]?: SubcomponentProperties;
};
