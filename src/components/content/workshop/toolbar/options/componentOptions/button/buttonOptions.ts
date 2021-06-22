import { SubcomponentTypeToOptions } from '../../../../../../../interfaces/subcomponentTypeToOptions';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { Options } from '../../../../../../../interfaces/options';
import { buttonTextOptions } from './text';
import { buttonBaseOptions } from './base';

export class ButtonOptions {

  private static readonly STATIC_BUTTON_OPTIONS: SubcomponentTypeToOptions = {
    [SUBCOMPONENT_TYPES.BUTTON]: buttonBaseOptions as Options,
    [SUBCOMPONENT_TYPES.TEXT]: buttonTextOptions as Options,
  }

  public static getButtonOptions(subcomponentType: SUBCOMPONENT_TYPES): Options {
    return ButtonOptions.STATIC_BUTTON_OPTIONS[subcomponentType];
  }
}