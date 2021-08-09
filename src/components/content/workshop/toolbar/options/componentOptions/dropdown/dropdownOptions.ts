import { SubcomponentTypeToOptions } from '../../../../../../../interfaces/subcomponentTypeToOptions';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { Options } from '../../../../../../../interfaces/options';
import { nestedButtonOptions } from '../button/nestedButton';
import { dropdownItemOptions } from '../layer/dropdownItem';
import { menuItemTextOptions } from './menuItemText';
import { buttonTextOptions } from '../button/text';
import { imageOptions } from '../image/image';
import { cardBaseOptions } from './base';
import { menuOptions } from './menu';

export class DropdownOptions {

  private static readonly STATIC_CARD_OPTIONS: SubcomponentTypeToOptions = {
    [SUBCOMPONENT_TYPES.BASE]: cardBaseOptions as Options,
    [SUBCOMPONENT_TYPES.IMAGE]: imageOptions as Options,
    [SUBCOMPONENT_TYPES.DROPDOWN_MENU]: menuOptions as Options,
    [SUBCOMPONENT_TYPES.LAYER]: dropdownItemOptions as Options,
    [SUBCOMPONENT_TYPES.BUTTON]: nestedButtonOptions as Options,
  };

  private static getTextOptions(component: WorkshopComponent): Options {
    if (component.subcomponents[component.activeSubcomponentName].parentAuxiliaryComponent) {
      return menuItemTextOptions;
    }
    return buttonTextOptions;
  }

  public static getDropdownOptions(subcomponentType: SUBCOMPONENT_TYPES, component: WorkshopComponent): Options {
    if (subcomponentType === SUBCOMPONENT_TYPES.TEXT) {
      return DropdownOptions.getTextOptions(component);
    }
    return DropdownOptions.STATIC_CARD_OPTIONS[subcomponentType];
  }
}
