import { TemporaryDropdownValue } from '../../../../../../../interfaces/temporaryDropdownValue';
import { MouseClickOptionEvent } from '../../../../../../../interfaces/dropdownMenuMouseEvents';
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
    const { activeCssPseudoClass, customCss } = subcomponentProperties;
    if (customCss[activeCssPseudoClass] && customCss[activeCssPseudoClass][cssProperty]) {
      return customCss[activeCssPseudoClass];
    }
    return { [cssProperty] : SharedUtils.getActiveModeCssPropertyValue(customCss, activeCssPseudoClass, cssProperty) };
  }

  public static mouseEnterActionsDropdownButton(temporaryDropdownValue: TemporaryDropdownValue, subcomponentProperties: SubcomponentProperties,
      settingSpecCssProperty: string): void {
    if (temporaryDropdownValue.value === ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      const { activeCssPseudoClass, customCss } = subcomponentProperties;
      temporaryDropdownValue.value = customCss[activeCssPseudoClass] && customCss[activeCssPseudoClass][settingSpecCssProperty]
        ? customCss[activeCssPseudoClass][settingSpecCssProperty]
        : SharedUtils.getActiveModeCssPropertyValue(customCss, activeCssPseudoClass, settingSpecCssProperty);
    }
  }

  public static mouseEnterActionsDropdownOptionCustomCss(temporaryDropdownValue: TemporaryDropdownValue, triggeredOptionName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any): void {
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const { cssProperty } = settingSpec;
    if (temporaryDropdownValue.value === ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      temporaryDropdownValue.value = (customCss[activeCssPseudoClass] && customCss[activeCssPseudoClass][cssProperty]) || settingSpec.tempCustomCssObject[cssProperty];
    }
    if (customCss[activeCssPseudoClass]) {
      customCss[activeCssPseudoClass][cssProperty] = triggeredOptionName;
    } else {
      customCss[activeCssPseudoClass] = { [cssProperty]: triggeredOptionName };
    }
    settingSpec.tempCustomCssObject = { [cssProperty]: temporaryDropdownValue.value };
  }

  public static mouseLeaveActionsDropdownCustomCss(temporaryDropdownValue: TemporaryDropdownValue,
      subcomponentProperties: SubcomponentProperties, settingSpec: any): void {
    if (temporaryDropdownValue.value !== ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      const { customCss, activeCssPseudoClass } = subcomponentProperties;
      customCss[activeCssPseudoClass][settingSpec.cssProperty] = temporaryDropdownValue.value;
      temporaryDropdownValue.value = ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED;
      delete settingSpec.tempCustomCssObject;
    }
  }

  public static mouseEnterActionsDropdownOptionCustomFeature(temporaryDropdownValue: TemporaryDropdownValue, triggeredOptionName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any, settingsComponent: ComponentOptions): void {
    const { customFeatureObjectKeys, mouseEnterOptionCallback } = settingSpec;
    if (temporaryDropdownValue.value === ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      temporaryDropdownValue.value = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties[customFeatureObjectKeys[0]]) as string;
    }
    if (mouseEnterOptionCallback) mouseEnterOptionCallback({subcomponentProperties, settingsComponent,
      previousOptionName: temporaryDropdownValue.value, triggeredOptionName});
    temporaryDropdownValue.value = triggeredOptionName;
  }

  public static mouseLeaveActionsDropdownOptionCustomFeature(temporaryDropdownValue: TemporaryDropdownValue,
      subcomponentProperties: SubcomponentProperties, settingSpec: any, settingsComponent: ComponentOptions, isDropdownHidden: boolean): void {
    if (temporaryDropdownValue.value !== ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      const { customFeatureObjectKeys, mouseLeaveDropdownCallback } = settingSpec;
      const defaultValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties[customFeatureObjectKeys[0]]) as string;
      if (mouseLeaveDropdownCallback) mouseLeaveDropdownCallback({subcomponentProperties, settingsComponent,
        previousOptionName: temporaryDropdownValue.value, triggeredOptionName: defaultValue, isDropdownHidden});
    }
    temporaryDropdownValue.value = ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED;
  }

  private static updateSettingAndPropertyValues(trigger: any, allSettings: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const { cssProperty: triggerCssProperty, defaultValue } = trigger;
    for (let i = 0; i < allSettings.options.length; i += 1) {
      if (allSettings.options[i].spec.cssProperty === triggerCssProperty) {
        const rawDefaultValue = typeof defaultValue === 'string' ? Number.parseInt(defaultValue) : defaultValue;
        allSettings.options[i].spec.default = rawDefaultValue;
        customCss[activeCssPseudoClass][triggerCssProperty] = defaultValue;
      }
    }
  }

  private static activateCustomCssTriggers(trigger: any, allSettings: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const { conditions, negativeConditions, cssProperty: triggerCssProperty } = trigger;
    const extractedTriggerCssProperty = SharedUtils.getActiveModeCssPropertyValue(customCss, activeCssPseudoClass, triggerCssProperty);
    const conditionValue = typeof extractedTriggerCssProperty === 'string' ? Number.parseInt(extractedTriggerCssProperty) : extractedTriggerCssProperty;
    const conditionMet = (conditions && conditions.has(conditionValue)) || (negativeConditions && !negativeConditions.has(conditionValue));
    if (conditionMet) {
      ActionsDropdownUtils.updateSettingAndPropertyValues(trigger, allSettings, subcomponentProperties);
    }
  }

  public static mouseClickActionsDropdownOption(mouseClickOptionEvent: MouseClickOptionEvent, setting: any, allSettings: any,
      subcomponentProperties: SubcomponentProperties): void {
    const newOptionName = mouseClickOptionEvent[1];
    const { triggers, spec } = setting;
    if (spec.cssProperty) {
      const { customCss, activeCssPseudoClass } = subcomponentProperties;
      customCss[activeCssPseudoClass][spec.cssProperty] = newOptionName;
      if (triggers && triggers[newOptionName]) {
        ActionsDropdownUtils.activateCustomCssTriggers(triggers[newOptionName], allSettings, subcomponentProperties);
      }
    }
  }

  public static mouseClickActionsDropdownNewOption(temporaryDropdownValue: TemporaryDropdownValue, triggeredOptionName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any, activeOptionsObject: any): void {
    const { activeCssPseudoClass, customCss } = subcomponentProperties;
    customCss[activeCssPseudoClass][settingSpec.cssProperty] = triggeredOptionName;
    activeOptionsObject[settingSpec.cssProperty] = triggeredOptionName;
    if (temporaryDropdownValue.value !== null) {
      temporaryDropdownValue.value = null;
      delete settingSpec.tempCustomCssObject;
    }
  }
}
