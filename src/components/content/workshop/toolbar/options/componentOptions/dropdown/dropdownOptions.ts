import { SubcomponentTypeToOptions } from '../../../../../../../interfaces/subcomponentTypeToOptions';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { Options } from '../../../../../../../interfaces/options';
import { nestedButtonOptions } from '../button/nestedButton';
import { dropdownItemOptions } from '../layer/dropdownItem';
import { dropdownButtonTextOptions } from './buttonText';
import { menuItemTextOptions } from './menuItemText';
import { buttonTextOptions } from '../button/text';
import { menuOptions } from './menu';

export class DropdownOptions {

  private static readonly STATIC_DROPDOWN_OPTIONS: SubcomponentTypeToOptions = {
    [SUBCOMPONENT_TYPES.BUTTON]: nestedButtonOptions as Options,
    [SUBCOMPONENT_TYPES.DROPDOWN_MENU]: menuOptions as Options,
    [SUBCOMPONENT_TYPES.LAYER]: dropdownItemOptions as Options,
  };

  private static getTextOptions(component: WorkshopComponent): Options {
    const { parentBaseComponentRef, customStaticFeatures } = component.subcomponents[component.activeSubcomponentName];
    if (parentBaseComponentRef.coreBaseComponent) {
      return menuItemTextOptions;
    }
    if (customStaticFeatures.selectDropdown.enabled) {
      return dropdownButtonTextOptions;
    }
    return buttonTextOptions;
  }

  public static getDropdownOptions(subcomponentType: SUBCOMPONENT_TYPES, component: WorkshopComponent): Options {
    if (subcomponentType === SUBCOMPONENT_TYPES.TEXT) {
      return DropdownOptions.getTextOptions(component);
    }
    return DropdownOptions.STATIC_DROPDOWN_OPTIONS[subcomponentType];
  }
}
