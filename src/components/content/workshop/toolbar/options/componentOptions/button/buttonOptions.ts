import { SubcomponentTypeToOptions } from '../../../../../../../interfaces/subcomponentTypeToOptions';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { Options } from '../../../../../../../interfaces/options';
import { buttonTextOptions } from './text';
import { buttonBaseOptions } from './base';

const staticButtonOptions: SubcomponentTypeToOptions = {
  [SUBCOMPONENT_TYPES.BUTTON]: buttonBaseOptions as Options,
  [SUBCOMPONENT_TYPES.TEXT]: buttonTextOptions as Options,
}

export function getButtonOptions(subcomponentType: SUBCOMPONENT_TYPES): Options {
  return staticButtonOptions[subcomponentType];
}
