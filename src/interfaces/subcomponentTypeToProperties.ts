import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';
import { Subcomponent } from './workshopComponent';

export type SubcomponentTypeToProperties = {
  [key in SUBCOMPONENT_TYPES]?: Subcomponent;
};
