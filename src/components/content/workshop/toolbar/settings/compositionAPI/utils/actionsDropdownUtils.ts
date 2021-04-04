import { DropdownMouseClickOptionEvent } from '../../../../../../../interfaces/dropdownMouseClickOptionEvent';
import { DropdownCustomCssProperty } from '../../../../../../../interfaces/dropdownCustomCssProperty';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';
import SharedUtils from '../../utils/sharedUtils';

// use this type in the future if tempCustomCssObject will be used in the spec type of setting type
type TempCustomCssObject = {
  [cssProperty: string]: string;
}

export default class ActionsDropdownUtils {

  public static NULL_CUSTOM_CSS_VALUE = null;

  public static getObjectContainingActiveOption(subcomponentProperties: SubcomponentProperties, cssProperty: string): WorkshopComponentCss {
    const { activeCustomCssMode, customCss } = subcomponentProperties;
    if (customCss[activeCustomCssMode] && customCss[activeCustomCssMode][cssProperty]) {
      return customCss[activeCustomCssMode];
    }
    return { [cssProperty] : SharedUtils.getActiveModeCssPropertyValue(customCss, activeCustomCssMode, cssProperty) };
  }

  public static mouseEnterActionsDropdownButton(dropdownCustomCssProperty: DropdownCustomCssProperty, subcomponentProperties: SubcomponentProperties,
      settingSpecCssProperty: string): void {
    if (dropdownCustomCssProperty.value === ActionsDropdownUtils.NULL_CUSTOM_CSS_VALUE) {
      const { activeCustomCssMode, customCss } = subcomponentProperties;
      dropdownCustomCssProperty.value = customCss[activeCustomCssMode] && customCss[activeCustomCssMode][settingSpecCssProperty]
        ? customCss[activeCustomCssMode][settingSpecCssProperty]
        : SharedUtils.getActiveModeCssPropertyValue(customCss, activeCustomCssMode, settingSpecCssProperty);
    }
  }

  public static mouseEnterActionsDropdownOption(dropdownCustomCssProperty: DropdownCustomCssProperty, triggeredOptionName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any): void {
    const { customCss, activeCustomCssMode } = subcomponentProperties;
    const { cssProperty } = settingSpec;
    if (dropdownCustomCssProperty.value === ActionsDropdownUtils.NULL_CUSTOM_CSS_VALUE) {
      dropdownCustomCssProperty.value = (customCss[activeCustomCssMode] && customCss[activeCustomCssMode][cssProperty]) || settingSpec.tempCustomCssObject[cssProperty];
    }
    if (customCss[activeCustomCssMode]) {
      customCss[activeCustomCssMode][cssProperty] = triggeredOptionName;
    } else {
      customCss[activeCustomCssMode] = { [cssProperty]: triggeredOptionName };
    }
    settingSpec.tempCustomCssObject = { [cssProperty]: dropdownCustomCssProperty.value };
  }

  public static mouseLeaveActionsDropdown(dropdownCustomCssProperty: DropdownCustomCssProperty, subcomponentProperties: SubcomponentProperties,
      settingSpec: any): void {
    if (dropdownCustomCssProperty.value !== ActionsDropdownUtils.NULL_CUSTOM_CSS_VALUE) {
      const { customCss, activeCustomCssMode } = subcomponentProperties;
      customCss[activeCustomCssMode][settingSpec.cssProperty] = dropdownCustomCssProperty.value;
      dropdownCustomCssProperty.value = ActionsDropdownUtils.NULL_CUSTOM_CSS_VALUE;
      delete settingSpec.tempCustomCssObject;
    }
  }

  private static activateCustomFeatureTriggers(trigger: any, oldOptionName: string, newOptionName: string, subcomponentProperties: SubcomponentProperties): void {
    if (trigger[newOptionName].function) { trigger[newOptionName].function(subcomponentProperties, oldOptionName, newOptionName); }
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

  private static activateCustomCssTriggers(trigger: any, allSettings: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, activeCustomCssMode } = subcomponentProperties;
    const { conditions, negativeConditions, cssProperty: triggerCssProperty } = trigger;
    const extractedTriggerCssProperty = SharedUtils.getActiveModeCssPropertyValue(customCss, activeCustomCssMode, triggerCssProperty);
    const conditionValue = typeof extractedTriggerCssProperty === 'string' ? Number.parseInt(extractedTriggerCssProperty) : extractedTriggerCssProperty;
    const conditionMet = (conditions && conditions.has(conditionValue)) || (negativeConditions && !negativeConditions.has(conditionValue));
    if (conditionMet) {
      ActionsDropdownUtils.updateSettingAndPropertyValues(trigger, allSettings, subcomponentProperties);
    }
  }

  public static mouseClickActionsDropdownOption(mouseClickOptionEvent: DropdownMouseClickOptionEvent, setting: any, allSettings: any,
      subcomponentProperties: SubcomponentProperties): void {
    const [oldOptionName, newOptionName] = mouseClickOptionEvent;
    const { triggers, spec } = setting;
    if (spec.cssProperty) {
      const { customCss, activeCustomCssMode } = subcomponentProperties;
      customCss[activeCustomCssMode][spec.cssProperty] = newOptionName;
      if (triggers && triggers[newOptionName]) {
        ActionsDropdownUtils.activateCustomCssTriggers(triggers[newOptionName], allSettings, subcomponentProperties);
      }
    } else if (spec.customFeatureObjectKeys && triggers && triggers[newOptionName]) {
      ActionsDropdownUtils.activateCustomFeatureTriggers(triggers, oldOptionName, newOptionName, subcomponentProperties);
    }
  }

  public static mouseClickActionsDropdownNewOption(dropdownCustomCssProperty: DropdownCustomCssProperty, triggeredOptionName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any, activeOptionsObject: any): void {
    const { activeCustomCssMode, customCss } = subcomponentProperties;
    customCss[activeCustomCssMode][settingSpec.cssProperty] = triggeredOptionName;
    activeOptionsObject[settingSpec.cssProperty] = triggeredOptionName;
    if (dropdownCustomCssProperty.value !== null) {
      dropdownCustomCssProperty.value = null;
      delete settingSpec.tempCustomCssObject;
    }
  }
}
