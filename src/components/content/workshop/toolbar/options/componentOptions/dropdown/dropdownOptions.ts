import { SubcomponentTypeToOptions } from '../../../../../../../interfaces/subcomponentTypeToOptions';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { selectDropdownButtonOptions } from './selectDropdownButtonOptions';
import { Options } from '../../../../../../../interfaces/options';
import { dropdownItemOptions } from '../layer/dropdownItem';
import { dropdownButtonOptions } from './dropdownButton';
import { dropdownButtonTextOptions } from './buttonText';
import { selectMenuOptions } from './selectMenuOptions';
import { buttonTextOptions } from '../text/buttonText';
import { menuItemTextOptions } from './menuItemText';
import { iconOptions } from '../icon/icon';
import { menuOptions } from './menu';

export class DropdownOptions {

  private static readonly STATIC_DROPDOWN_OPTIONS: SubcomponentTypeToOptions = {
    [SUBCOMPONENT_TYPES.BUTTON]: dropdownButtonOptions as Options,
    [SUBCOMPONENT_TYPES.LAYER]: dropdownItemOptions as Options,
    [SUBCOMPONENT_TYPES.ICON]: iconOptions as Options,
  };

  private static getTextOptions(component: WorkshopComponent): Options {
    const { seedComponent: { containerComponent }, customStaticFeatures } = component.subcomponents[component.activeSubcomponentName];
    if (containerComponent.type === COMPONENT_TYPES.DROPDOWN_MENU) {
      return menuItemTextOptions;
    }
    if (customStaticFeatures.selectDropdown.enabled) {
      return dropdownButtonTextOptions;
    }
    return buttonTextOptions;
  }

  private static isSelectDropdownEnabled(component: WorkshopComponent): boolean {
    return component.linkedComponents.auxiliary[0].coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE]
      .customStaticFeatures?.selectDropdown?.enabled;
  }

  public static getDropdownOptions(subcomponentType: SUBCOMPONENT_TYPES, component: WorkshopComponent): Options {
    if (subcomponentType === SUBCOMPONENT_TYPES.TEXT) {
      return DropdownOptions.getTextOptions(component);
    }
    if (subcomponentType === SUBCOMPONENT_TYPES.DROPDOWN_MENU) {
      return (DropdownOptions.isSelectDropdownEnabled(component) ? selectMenuOptions : menuOptions) as Options;
    }
    if (subcomponentType === SUBCOMPONENT_TYPES.BUTTON) {
      return (DropdownOptions.isSelectDropdownEnabled(component) ? selectDropdownButtonOptions : dropdownButtonOptions) as Options;
    }
    return DropdownOptions.STATIC_DROPDOWN_OPTIONS[subcomponentType];
  }
}
