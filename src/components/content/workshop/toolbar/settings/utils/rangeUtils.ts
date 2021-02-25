import { CustomCss, SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../consts/subcomponentCssModes.enum';
import BoxShadowUtils from './boxShadowUtils';
import SharedUtils from './sharedUtils';

export default class RangeUtils {

  private static DEFAULT_RANGE_VALUE = 0;

  private static activeTriggersForCustomCss(trigger: any, subcomponentProperties: SubcomponentProperties, selectorCurrentValues: unknown): void {
    const { customCss, customCssActiveMode } = subcomponentProperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, SUB_COMPONENT_CSS_MODES.CLICK, trigger.cssProperty);
    if (trigger.conditions.has(cssPropertyValue)) {
      customCss[customCssActiveMode][trigger.cssProperty] = trigger.defaultValue;
      if (trigger.selector) { selectorCurrentValues[trigger.cssProperty] = trigger.defaultValue; }
    }
  }

  private static activateTriggersForCustomSubcomponentProperties(trigger: any,
      subcomponentProperties: SubcomponentProperties, allSettings: any): void {
    const value = subcomponentProperties[trigger.subcomponentPropertiesObject][trigger.propertyKeyName];
    if (!trigger.conditions.has(value)) return;
    for (let i = 0; i < allSettings.options.length; i += 1) {
      if (allSettings.options[i].spec.subcomponentPropertiesObject
          && allSettings.options[i].spec.subcomponentPropertiesObject === trigger.subcomponentPropertiesObject) {
        allSettings.options[i].spec.default = trigger.defaultValue;
        subcomponentProperties[trigger.subcomponentPropertiesObject][trigger.propertyKeyName] = trigger.defaultValue;
      }
    }
  }

  private static activateTriggers(triggers: any, subcomponentProperties: SubcomponentProperties,
      allSettings: any, selectorCurrentValues: unknown): void {
    (triggers || []).forEach((trigger) => {
      if (trigger.subcomponentPropertiesObject) {
        RangeUtils.activateTriggersForCustomSubcomponentProperties(trigger, subcomponentProperties, allSettings);
      } else {
        RangeUtils.activeTriggersForCustomCss(trigger, subcomponentProperties, selectorCurrentValues);
      }
    });
  }

  private static updateCustomCss(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const { cssProperty, smoothingDivisible, isTime } = spec;
    const { customCss, customCssActiveMode } = subcomponentProperties;
    customCss[customCssActiveMode][cssProperty] = `${Math.floor(rangeValue as unknown as number / smoothingDivisible)}${isTime ? 's': 'px'}`;
  }

  private static updateCustomSubcomponentProperties(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const { subcomponentPropertiesObject, objectContainingActiveOption, activeOptionPropertyKeyName, smoothingDivisible, isTime } = spec;
    subcomponentProperties[subcomponentPropertiesObject][objectContainingActiveOption]
      [activeOptionPropertyKeyName] = `${rangeValue as unknown as number / smoothingDivisible}${isTime ? 's': 'px'}`;
  }

  private static updatePartialCss(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const {cssProperty, partialCss} = spec;
    const { customCss, customCssActiveMode, auxiliaryPartialCss } = subcomponentProperties;
    if (customCss[customCssActiveMode][cssProperty] === undefined) {
      const defaultValues = [ ...partialCss.fullDefaultValues ];
      defaultValues[partialCss.position] = rangeValue;
      customCss[customCssActiveMode][cssProperty] = defaultValues.join(' ');
    } else {
      if (cssProperty === 'boxShadow') BoxShadowUtils.setUnsetBoxShadowPropertiesToZero(customCss, auxiliaryPartialCss, customCssActiveMode);
      const cssPropertyValues = customCss[customCssActiveMode][cssProperty].split(' ');
      cssPropertyValues[partialCss.position] = `${rangeValue}px`;
      customCss[customCssActiveMode][cssProperty] = cssPropertyValues.join(' ');
    }
    if (cssProperty === 'boxShadow') BoxShadowUtils.setZeroBoxShadowPropertiesToUnset(subcomponentProperties);
  }

  public static updateProperties(event: MouseEvent, updatedSetting: any, allSettings: any,
      subcomponentProperties: SubcomponentProperties, selectorCurrentValues: unknown): void {
    const { triggers, spec } = updatedSetting;
    RangeUtils.activateTriggers(triggers, subcomponentProperties, allSettings, selectorCurrentValues);
    const rangeValue = (event.target as HTMLInputElement).value;
    if (spec.partialCss != undefined) {
      RangeUtils.updatePartialCss(rangeValue, spec, subcomponentProperties);
    } else if (spec.subcomponentPropertiesObject) {
      RangeUtils.updateCustomSubcomponentProperties(rangeValue, spec, subcomponentProperties);
    } else {
      RangeUtils.updateCustomCss(rangeValue, spec, subcomponentProperties);
    }
  }

  private static parseString(value: string, smoothingDivisible: number): number {
    return Number.parseFloat(value) * smoothingDivisible;
  }

  private static updateSettingThatUsesASubcomponentProperty(updatedSetting: any, subcomponentProperties: SubcomponentProperties): void {
    const rangeValue = subcomponentProperties[updatedSetting.spec.subcomponentPropertiesObject]
      [updatedSetting.spec.objectContainingActiveOption][updatedSetting.spec.activeOptionPropertyKeyName];
    updatedSetting.spec.default = RangeUtils.parseString(rangeValue, updatedSetting.spec.smoothingDivisible);
  }

  private static updateSettingThatUsesCustomCss(updatedSetting: any, cssPropertyValue: string): void {
    const singlePropertyValue = updatedSetting.spec.partialCss ? cssPropertyValue.split(' ')[updatedSetting.spec.partialCss.position] : cssPropertyValue;
    updatedSetting.spec.default = RangeUtils.parseString(singlePropertyValue, updatedSetting.spec.smoothingDivisible); 
  }

  public static updateSettings(updatedSetting: any, allSettings: any, customCss: CustomCss,
      customCssActiveMode: SUB_COMPONENT_CSS_MODES, subcomponentProperties: SubcomponentProperties, selectorCurrentValues: unknown): void {
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, customCssActiveMode, updatedSetting.spec.cssProperty);
    if (cssPropertyValue !== undefined) {
      if (customCss[customCssActiveMode]) RangeUtils.activateTriggers(updatedSetting.triggers, subcomponentProperties, allSettings, selectorCurrentValues);
      const hasBoxShadowBeenSet = updatedSetting.spec.cssProperty === 'boxShadow' && BoxShadowUtils.setBoxShadowSettingsRangeValue(cssPropertyValue, updatedSetting.spec);
      if (!hasBoxShadowBeenSet) { RangeUtils.updateSettingThatUsesCustomCss(updatedSetting, cssPropertyValue); }
    } else if (updatedSetting.spec.subcomponentPropertiesObject) {
      RangeUtils.updateSettingThatUsesASubcomponentProperty(updatedSetting, subcomponentProperties);
    } else {
      updatedSetting.spec.default = RangeUtils.DEFAULT_RANGE_VALUE;
    }
  }
}
