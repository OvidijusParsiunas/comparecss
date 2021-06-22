import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';
import { Options } from './options';

export type SubcomponentTypeToOptions = {
  [key in SUBCOMPONENT_TYPES]?: Options;
}
