import { SubcomponentTypeToOptions } from '../../../../../../../interfaces/subcomponentTypeToOptions';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { Options } from '../../../../../../../interfaces/options';
import { dropdownButtonOptions } from '../button/dropdownButton';
import { dropdownItemOptions } from '../layer/dropdownItem';
import { dropdownButtonTextOptions } from './buttonText';
import { buttonTextOptions } from '../text/buttonText';
import { menuItemTextOptions } from './menuItemText';
import { iconOptions } from '../icon/icon';
import { menuOptions } from './menu';

export class DropdownOptions {

  private static readonly STATIC_DROPDOWN_OPTIONS: SubcomponentTypeToOptions = {
    [SUBCOMPONENT_TYPES.BUTTON]: dropdownButtonOptions as Options,
    [SUBCOMPONENT_TYPES.DROPDOWN_MENU]: menuOptions as Options,
    [SUBCOMPONENT_TYPES.LAYER]: dropdownItemOptions as Options,
    [SUBCOMPONENT_TYPES.ICON]: iconOptions as Options,
  };

  private static getTextOptions(component: WorkshopComponent): Options {
    const { seedComponent: { ref: { containerComponent }}, customStaticFeatures } = component.subcomponents[component.activeSubcomponentName];
    if (containerComponent.type === COMPONENT_TYPES.DROPDOWN_MENU) {
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
