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
      currentCustomCssProperty.value = customCss[customCssActiveMode][cssProperty] || settingSpec.tempCustomCssObject[cssProperty];
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
      delete settingSpec.tempCustomCssObject;
    }
  }

  private static updateSettingAndPropertyValues(trigger: any, allSettings: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, customCssActiveMode } = subcomponentProperties;
    const { cssProperty: triggerCssProperty, defaultValue } = trigger;
    for (let i = 0; i < allSettings.options.length; i += 1) {
      if (allSettings.options[i].spec.cssProperty === triggerCssProperty) {
        const rawDefaultValue = typeof defaultValue === 'string' ? Number.parseInt(defaultValue) : defaultValue;
        allSettings.options[i].spec.default = rawDefaultValue;
        customCss[customCssActiveMode][triggerCssProperty] = defaultValue;
      }
    }
  }

  private static activateTriggers(trigger: any, allSettings: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, customCssActiveMode } = subcomponentProperties;
    const { conditions, negativeConditions, cssProperty: triggerCssProperty } = trigger;
    const extractedTriggerCssProperty = customCss[customCssActiveMode][triggerCssProperty];
    const conditionValue = typeof extractedTriggerCssProperty === 'string' ? Number.parseInt(extractedTriggerCssProperty) : extractedTriggerCssProperty;
    const conditionMet = (conditions && conditions.has(conditionValue)) || (negativeConditions && !negativeConditions.has(conditionValue));
    if (conditionMet) {
      CustomCssUtils.updateSettingAndPropertyValues(trigger, allSettings, subcomponentProperties);
    }
  }

  public static mouseClickActionsDropdownOption(triggeredOptionName: string, setting: any, allSettings: any,
      subcomponentProperties: SubcomponentProperties): void {
    const { triggers, spec } = setting;
    const { customCss, customCssActiveMode } = subcomponentProperties;
    customCss[customCssActiveMode][spec.cssProperty] = triggeredOptionName;
    if (triggers && triggers[triggeredOptionName]) {
      CustomCssUtils.activateTriggers(triggers[triggeredOptionName], allSettings, subcomponentProperties)
    }
  }

  public static mouseClickActionsDropdownNewOption(currentCustomCssProperty: any, triggeredOptionName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any): void {
    const { customCssActiveMode, customCss } = subcomponentProperties;
    customCss[customCssActiveMode][settingSpec.cssProperty] = triggeredOptionName;
    if (currentCustomCssProperty.value !== null) {
      currentCustomCssProperty.value = null;
      delete settingSpec.tempCustomCssObject;
    }
  }
}
