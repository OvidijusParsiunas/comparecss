import { SubcomponentTypeToOptions } from '../../../../../../../interfaces/subcomponentTypeToOptions';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { dropdownMenuItemTextOptions } from './dropdownMenuItemText';
import { selectDropdownButtonOptions } from './selectDropdownButton';
import { Options } from '../../../../../../../interfaces/options';
import { dropdownItemOptions } from '../layer/dropdownItem';
import { dropdownButtonTextOptions } from './buttonText';
import { dropdownButtonOptions } from './dropdownButton';
import { buttonTextOptions } from '../text/buttonText';
import { dropdownMenuOptions } from './dropdownMenu';
import { dropdownOptions } from './dropdown';
import { iconOptions } from '../icon/icon';

export class DropdownOptions {

  private static readonly STATIC_DROPDOWN_OPTIONS: SubcomponentTypeToOptions = {
    [SUBCOMPONENT_TYPES.DROPDOWN_MENU]: dropdownMenuOptions as Options,
    [SUBCOMPONENT_TYPES.LAYER]: dropdownItemOptions as Options,
    [SUBCOMPONENT_TYPES.DROPDOWN]: dropdownOptions as Options,
    [SUBCOMPONENT_TYPES.ICON]: iconOptions as Options,
  };

  private static getTextOptions(component: WorkshopComponent): Options {
    const { seedComponent: { containerComponent }, customFeatures } = component.subcomponents[component.activeSubcomponentName];
    if (containerComponent.type === COMPONENT_TYPES.DROPDOWN_MENU) {
      return dropdownMenuItemTextOptions;
    }
    if (customFeatures.dropdown.select.enabled) {
      return dropdownButtonTextOptions;
    }
    return buttonTextOptions;
  }

  private static isSelectDropdownEnabled(component: WorkshopComponent): boolean {
    return component.baseSubcomponent.customFeatures?.dropdown?.select?.enabled;
  }

  public static getDropdownOptions(subcomponentType: SUBCOMPONENT_TYPES, component: WorkshopComponent): Options {
    if (subcomponentType === SUBCOMPONENT_TYPES.TEXT) {
      return DropdownOptions.getTextOptions(component);
    }
    if (subcomponentType === SUBCOMPONENT_TYPES.BUTTON) {
      return (DropdownOptions.isSelectDropdownEnabled(component) ? selectDropdownButtonOptions : dropdownButtonOptions) as Options;
    }
    return DropdownOptions.STATIC_DROPDOWN_OPTIONS[subcomponentType];
  }
}
