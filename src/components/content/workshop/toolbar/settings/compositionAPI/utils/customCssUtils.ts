import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';

export default class CustomCssUtils {

  public static getObjectContainingActiveOption(subcomponentProperties: SubcomponentProperties): WorkshopComponentCss {
    const { customCssActiveMode, customCss } = subcomponentProperties;
    return customCss[customCssActiveMode];
  }

  public static mouseEnterActionsDropdownButton(currentCustomCssProperty: any, subcomponentProperties: SubcomponentProperties,
      settingSpecCssProperty: string): void {
    if (currentCustomCssProperty.value === null) {
      const { customCssActiveMode, customCss } = subcomponentProperties;
      currentCustomCssProperty = customCss[customCssActiveMode][settingSpecCssProperty];
    }
  }

  public static mouseEnterActionsDropdownOption(currentCustomCssProperty: any, triggeredOptionName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any): void {
    const { customCss, customCssActiveMode } = subcomponentProperties;
    const { cssProperty } = settingSpec;
    if (currentCustomCssProperty.value === null) {
      currentCustomCssProperty.value = customCss[customCssActiveMode][cssProperty];
    }
    customCss[customCssActiveMode][cssProperty] = triggeredOptionName;
    settingSpec.tempCustomCssObject = { [cssProperty]: currentCustomCssProperty.value };
  }

  public static mouseLeaveActionsDropdown(currentCustomCssProperty: any, subcomponentProperties: SubcomponentProperties,
      settingSpec: any): void {
    if (currentCustomCssProperty.value !== null) {
      const { customCss, customCssActiveMode } = subcomponentProperties;
      customCss[customCssActiveMode][settingSpec.cssProperty] = currentCustomCssProperty.value;
      currentCustomCssProperty.value = null;
      settingSpec.tempCustomCssObject = undefined;
    }
  }

  public static mouseClickActionsDropdownNewOption(currentCustomCssProperty: any, triggeredOptionName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any): void {
    const { customCssActiveMode, customCss } = subcomponentProperties;
    customCss[customCssActiveMode][settingSpec.cssProperty] = triggeredOptionName;
    if (currentCustomCssProperty.value !== null) {
      currentCustomCssProperty.value = null;
      settingSpec.tempCustomCssObject = undefined;
    }
  }
}
