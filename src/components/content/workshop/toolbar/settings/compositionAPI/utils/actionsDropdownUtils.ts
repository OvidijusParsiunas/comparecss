import { DropdownMouseClickOptionEvent } from '../../../../../../../interfaces/dropdownMouseClickOptionEvent';
import { TemporaryDropdownValue } from '../../../../../../../interfaces/temporaryDropdownValue';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';
import SharedUtils from '../../utils/sharedUtils';
import { ComponentOptions } from 'vue';

// use this type in the future if tempCustomCssObject will be used in the spec type of setting type
type TempCustomCssObject = {
  [cssProperty: string]: string;
}

export default class ActionsDropdownUtils {

  public static TEMPORARY_VALUE_UNUSED = null;

  public static getObjectContainingActiveOption(subcomponentProperties: SubcomponentProperties, cssProperty: string): WorkshopComponentCss {
    const { activeCustomCssMode, customCss } = subcomponentProperties;
    if (customCss[activeCustomCssMode] && customCss[activeCustomCssMode][cssProperty]) {
      return customCss[activeCustomCssMode];
    }
    return { [cssProperty] : SharedUtils.getActiveModeCssPropertyValue(customCss, activeCustomCssMode, cssProperty) };
  }

  public static mouseEnterActionsDropdownButton(temporaryDropdownValue: TemporaryDropdownValue, subcomponentProperties: SubcomponentProperties,
      settingSpecCssProperty: string): void {
    if (temporaryDropdownValue.value === ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      const { activeCustomCssMode, customCss } = subcomponentProperties;
      temporaryDropdownValue.value = customCss[activeCustomCssMode] && customCss[activeCustomCssMode][settingSpecCssProperty]
        ? customCss[activeCustomCssMode][settingSpecCssProperty]
        : SharedUtils.getActiveModeCssPropertyValue(customCss, activeCustomCssMode, settingSpecCssProperty);
    }
  }

  public static mouseEnterActionsDropdownOptionCustomCss(temporaryDropdownValue: TemporaryDropdownValue, triggeredOptionName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any): void {
    const { customCss, activeCustomCssMode } = subcomponentProperties;
    const { cssProperty } = settingSpec;
    if (temporaryDropdownValue.value === ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      temporaryDropdownValue.value = (customCss[activeCustomCssMode] && customCss[activeCustomCssMode][cssProperty]) || settingSpec.tempCustomCssObject[cssProperty];
    }
    if (customCss[activeCustomCssMode]) {
      customCss[activeCustomCssMode][cssProperty] = triggeredOptionName;
    } else {
      customCss[activeCustomCssMode] = { [cssProperty]: triggeredOptionName };
    }
    settingSpec.tempCustomCssObject = { [cssProperty]: temporaryDropdownValue.value };
  }

  public static mouseLeaveActionsDropdownCustomCss(temporaryDropdownValue: TemporaryDropdownValue,
      subcomponentProperties: SubcomponentProperties, settingSpec: any): void {
    if (temporaryDropdownValue.value !== ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      const { customCss, activeCustomCssMode } = subcomponentProperties;
      customCss[activeCustomCssMode][settingSpec.cssProperty] = temporaryDropdownValue.value;
      temporaryDropdownValue.value = ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED;
      delete settingSpec.tempCustomCssObject;
    }
  }

  public static mouseEnterActionsDropdownOptionCustomFeature(temporaryDropdownValue: TemporaryDropdownValue, triggeredOptionName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any, settingsComponent: ComponentOptions): void {
    const { customFeatureObjectKeys, mouseEnterOptionCallback } = settingSpec;
    if (temporaryDropdownValue.value === ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      temporaryDropdownValue.value = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties.customFeatures) as string;
    }
    if (mouseEnterOptionCallback) mouseEnterOptionCallback({subcomponentProperties, settingsComponent,
      previousOptionName: temporaryDropdownValue.value, triggeredOptionName});
    temporaryDropdownValue.value = triggeredOptionName;
  }

  public static mouseLeaveActionsDropdownOptionCustomFeature(temporaryDropdownValue: TemporaryDropdownValue,
      subcomponentProperties: SubcomponentProperties, settingSpec: any, settingsComponent: ComponentOptions): void {
    if (temporaryDropdownValue.value !== ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      const { customFeatureObjectKeys, mouseLeaveDropdownCallback } = settingSpec;
      const defaultValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties.customFeatures) as string;
      if (mouseLeaveDropdownCallback) mouseLeaveDropdownCallback({subcomponentProperties, settingsComponent,
        previousOptionName: temporaryDropdownValue.value, triggeredOptionName: defaultValue});
    }
    temporaryDropdownValue.value = ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED;
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
    const [newOptionName] = mouseClickOptionEvent;
    const { triggers, spec } = setting;
    if (spec.cssProperty) {
      const { customCss, activeCustomCssMode } = subcomponentProperties;
      customCss[activeCustomCssMode][spec.cssProperty] = newOptionName;
      if (triggers && triggers[newOptionName]) {
        ActionsDropdownUtils.activateCustomCssTriggers(triggers[newOptionName], allSettings, subcomponentProperties);
      }
    }
  }

  public static mouseClickActionsDropdownNewOption(temporaryDropdownValue: TemporaryDropdownValue, triggeredOptionName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any, activeOptionsObject: any): void {
    const { activeCustomCssMode, customCss } = subcomponentProperties;
    customCss[activeCustomCssMode][settingSpec.cssProperty] = triggeredOptionName;
    activeOptionsObject[settingSpec.cssProperty] = triggeredOptionName;
    if (temporaryDropdownValue.value !== null) {
      temporaryDropdownValue.value = null;
      delete settingSpec.tempCustomCssObject;
    }
  }
}
