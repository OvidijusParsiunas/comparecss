import { DropdownCustomCssProperty } from '../../../../../../../interfaces/dropdownCustomCssProperty';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';

// use this type in the future if tempCustomCssObject will be used in the spec type of setting type
type TempCustomCssObject = {
  [cssProperty: string]: string;
}

export default class CustomCssUtils {

  public static NULL_CUSTOM_CSS_VALUE = null;

  public static getObjectContainingActiveOption(subcomponentProperties: SubcomponentProperties): WorkshopComponentCss {
    const { activeCustomCssMode, customCss } = subcomponentProperties;
    return customCss[activeCustomCssMode];
  }

  public static mouseEnterActionsDropdownButton(dropdownCustomCssProperty: DropdownCustomCssProperty, subcomponentProperties: SubcomponentProperties,
      settingSpecCssProperty: string): void {
    if (dropdownCustomCssProperty.value === CustomCssUtils.NULL_CUSTOM_CSS_VALUE) {
      const { activeCustomCssMode, customCss } = subcomponentProperties;
      dropdownCustomCssProperty = customCss[activeCustomCssMode][settingSpecCssProperty];
    }
  }

  public static mouseEnterActionsDropdownOption(dropdownCustomCssProperty: DropdownCustomCssProperty, triggeredOptionName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any): void {
    const { customCss, activeCustomCssMode } = subcomponentProperties;
    const { cssProperty } = settingSpec;
    if (dropdownCustomCssProperty.value === CustomCssUtils.NULL_CUSTOM_CSS_VALUE) {
      dropdownCustomCssProperty.value = customCss[activeCustomCssMode][cssProperty] || settingSpec.tempCustomCssObject[cssProperty];
    }
    customCss[activeCustomCssMode][cssProperty] = triggeredOptionName;
    settingSpec.tempCustomCssObject = { [cssProperty]: dropdownCustomCssProperty.value };
  }

  public static mouseLeaveActionsDropdown(dropdownCustomCssProperty: DropdownCustomCssProperty, subcomponentProperties: SubcomponentProperties,
      settingSpec: any): void {
    if (dropdownCustomCssProperty.value !== CustomCssUtils.NULL_CUSTOM_CSS_VALUE) {
      const { customCss, activeCustomCssMode } = subcomponentProperties;
      customCss[activeCustomCssMode][settingSpec.cssProperty] = dropdownCustomCssProperty.value;
      dropdownCustomCssProperty.value = CustomCssUtils.NULL_CUSTOM_CSS_VALUE;
      delete settingSpec.tempCustomCssObject;
    }
  }

  private static updateSettingAndPropertyValues(trigger: any, allSettings: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, activeCustomCssMode } = subcomponentProperties;
    const { cssProperty: triggerCssProperty, defaultValue } = trigger;
    for (let i = 0; i < allSettings.options.length; i += 1) {
      if (allSettings.options[i].spec.cssProperty === triggerCssProperty) {
        const rawDefaultValue = typeof defaultValue === 'string' ? Number.parseInt(defaultValue) : defaultValue;
        allSettings.options[i].spec.default = rawDefaultValue;
        customCss[activeCustomCssMode][triggerCssProperty] = defaultValue;
      }
    }
  }

  private static activateTriggers(trigger: any, allSettings: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, activeCustomCssMode } = subcomponentProperties;
    const { conditions, negativeConditions, cssProperty: triggerCssProperty } = trigger;
    const extractedTriggerCssProperty = customCss[activeCustomCssMode][triggerCssProperty];
    const conditionValue = typeof extractedTriggerCssProperty === 'string' ? Number.parseInt(extractedTriggerCssProperty) : extractedTriggerCssProperty;
    const conditionMet = (conditions && conditions.has(conditionValue)) || (negativeConditions && !negativeConditions.has(conditionValue));
    if (conditionMet) {
      CustomCssUtils.updateSettingAndPropertyValues(trigger, allSettings, subcomponentProperties);
    }
  }

  public static mouseClickActionsDropdownOption(triggeredOptionName: string, setting: any, allSettings: any,
      subcomponentProperties: SubcomponentProperties): void {
    const { triggers, spec } = setting;
    const { customCss, activeCustomCssMode } = subcomponentProperties;
    customCss[activeCustomCssMode][spec.cssProperty] = triggeredOptionName;
    if (triggers && triggers[triggeredOptionName]) {
      CustomCssUtils.activateTriggers(triggers[triggeredOptionName], allSettings, subcomponentProperties)
    }
  }

  public static mouseClickActionsDropdownNewOption(dropdownCustomCssProperty: DropdownCustomCssProperty, triggeredOptionName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any): void {
    const { activeCustomCssMode, customCss } = subcomponentProperties;
    customCss[activeCustomCssMode][settingSpec.cssProperty] = triggeredOptionName;
    if (dropdownCustomCssProperty.value !== null) {
      dropdownCustomCssProperty.value = null;
      delete settingSpec.tempCustomCssObject;
    }
  }
}
