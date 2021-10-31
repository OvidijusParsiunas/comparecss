import { SubcomponentTypeToOptions } from '../../../../../../../interfaces/subcomponentTypeToOptions';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { Options } from '../../../../../../../interfaces/options';
import { childButtonOptions } from '../button/childButton';
import { buttonTextOptions } from '../text/buttonText';
import { buttonGroupBaseOptions } from './base';

export class ButtonGroupOptions {

  private static readonly STATIC_BUTTON_GROUP_OPTIONS: SubcomponentTypeToOptions = {
    [SUBCOMPONENT_TYPES.BASE]: buttonGroupBaseOptions as Options,
    [SUBCOMPONENT_TYPES.BUTTON]: childButtonOptions as Options,
    [SUBCOMPONENT_TYPES.TEXT]: buttonTextOptions as Options,
  };

  // WORK 2 - refactor getButtonGroupOptions options to get
  public static getButtonGroupOptions(subcomponentType: SUBCOMPONENT_TYPES): Options {
    return ButtonGroupOptions.STATIC_BUTTON_GROUP_OPTIONS[subcomponentType];
  }
}
