import { SubcomponentTypeToOptions } from '../../../../../../../interfaces/subcomponentTypeToOptions';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { Options } from '../../../../../../../interfaces/options';
import { buttonGroupButtonOptions } from './buttonGroupButton';
import { buttonTextOptions } from '../text/buttonText';
import { buttonGroupBaseOptions } from './base';
import { iconOptions } from '../icon/icon';

export class ButtonGroupOptions {

  private static readonly STATIC_BUTTON_GROUP_OPTIONS: SubcomponentTypeToOptions = {
    [SUBCOMPONENT_TYPES.BASE]: buttonGroupBaseOptions as Options,
    [SUBCOMPONENT_TYPES.BUTTON]: buttonGroupButtonOptions as Options,
    [SUBCOMPONENT_TYPES.TEXT]: buttonTextOptions as Options,
    [SUBCOMPONENT_TYPES.ICON]: iconOptions as Options,
  };

  public static get(subcomponentType: SUBCOMPONENT_TYPES): Options {
    return ButtonGroupOptions.STATIC_BUTTON_GROUP_OPTIONS[subcomponentType];
  }
}
