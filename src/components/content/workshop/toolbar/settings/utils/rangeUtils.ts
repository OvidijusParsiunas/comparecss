import { SUB_COMPONENT_CSS_MODES } from '../../../../../../consts/subcomponentCssModes.enum';
import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
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

  private static activateTriggersForCustomSubcomponentProperties(trigger: any, subcomponentProperties: SubcomponentProperties,
      allSettings: any): void {
    const { conditions, subcomponentPropertyObjectKeys } = trigger;
    const subcomponentPropertyValue = SharedUtils.getSubcomponentPropertyValue(subcomponentPropertyObjectKeys, subcomponentProperties);
    if (!conditions.has(subcomponentPropertyValue)) return;
    SharedUtils.setSubcomponentPropertyValueSetting(trigger, subcomponentProperties, allSettings);
  }

  private static activateTriggers(triggers: any, subcomponentProperties: SubcomponentProperties,
      allSettings: any, selectorCurrentValues: unknown): void {
    (triggers || []).forEach((trigger) => {
      if (trigger.subcomponentPropertyObjectKeys) {
        RangeUtils.activateTriggersForCustomSubcomponentProperties(trigger, subcomponentProperties, allSettings);
      } else {
        RangeUtils.activeTriggersForCustomCss(trigger, subcomponentProperties, selectorCurrentValues);
      }
    });
  }

  private static updateCustomCss(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const { cssProperty, smoothingDivisible, postfix } = spec;
    const { customCss, customCssActiveMode } = subcomponentProperties;
    customCss[customCssActiveMode][cssProperty] = `${Math.floor(rangeValue as unknown as number / smoothingDivisible)}${postfix}`;
  }

  private static updateColorValueinCustomSubcomponentProperties(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const colorValue = SharedUtils.getSubcomponentPropertyValue(spec.colorValueSubcomponentPropertyObjectKeys, subcomponentProperties) as string;
    const alphaHexStringValue = SharedUtils.convertAlphaDecimalToHexString(rangeValue as unknown as number / spec.smoothingDivisible);
    const newColorvalue = `${colorValue.substring(0, colorValue.length - alphaHexStringValue.length)}${alphaHexStringValue}`;
    SharedUtils.setSubcomponentPropertyValue(spec.colorValueSubcomponentPropertyObjectKeys, subcomponentProperties, newColorvalue);
  }

  private static updateCustomSubcomponentProperties(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const { smoothingDivisible, postfix, subcomponentPropertyObjectKeys } = spec;
    const newRangeValue = `${rangeValue as unknown as number / smoothingDivisible}${postfix}`;
    SharedUtils.setSubcomponentPropertyValue(subcomponentPropertyObjectKeys, subcomponentProperties, newRangeValue);
    if (spec.colorValueSubcomponentPropertyObjectKeys) {
      RangeUtils.updateColorValueinCustomSubcomponentProperties(rangeValue, spec, subcomponentProperties);
    }
  }

  public static updateProperties(event: MouseEvent, updatedSetting: any, allSettings: any,
      subcomponentProperties: SubcomponentProperties, selectorCurrentValues: unknown): void {
    const { triggers, spec } = updatedSetting;
    RangeUtils.activateTriggers(triggers, subcomponentProperties, allSettings, selectorCurrentValues);
    const rangeValue = (event.target as HTMLInputElement).value;
    if (spec.partialCss != undefined) {
      if (spec.cssProperty === 'boxShadow') BoxShadowUtils.updateBoxShadowRangeValue(rangeValue, spec, subcomponentProperties);
    } else if (spec.subcomponentPropertyObjectKeys) {
      RangeUtils.updateCustomSubcomponentProperties(rangeValue, spec, subcomponentProperties);
    } else {
      RangeUtils.updateCustomCss(rangeValue, spec, subcomponentProperties);
    }
  }

  private static parseString(value: string, smoothingDivisible: number): number {
    return Number.parseFloat(value) * smoothingDivisible;
  }

  private static updateSettingThatUsesASubcomponentProperty(settingToBeUpdated: any, subcomponentProperties: SubcomponentProperties): void {
    const rangeValue = SharedUtils.getSubcomponentPropertyValue(settingToBeUpdated.spec.subcomponentPropertyObjectKeys, subcomponentProperties) as string;
    settingToBeUpdated.spec.default = RangeUtils.parseString(rangeValue, settingToBeUpdated.spec.smoothingDivisible);
  }

  private static updateSettingThatUsesCustomCss(settingToBeUpdated: any, cssPropertyValue: string): void {
    const singlePropertyValue = settingToBeUpdated.spec.partialCss
      ? cssPropertyValue.split(' ')[settingToBeUpdated.spec.partialCss.position] : cssPropertyValue;
    settingToBeUpdated.spec.default = RangeUtils.parseString(singlePropertyValue, settingToBeUpdated.spec.smoothingDivisible); 
  }

  public static updateSettings(settingToBeUpdated: any, allSettings: any, subcomponentProperties: SubcomponentProperties, selectorCurrentValues: unknown): void {
    const { customCss, customCssActiveMode } = subcomponentProperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, customCssActiveMode, settingToBeUpdated.spec.cssProperty);
    if (cssPropertyValue !== undefined) {
      if (customCss[customCssActiveMode]) RangeUtils.activateTriggers(settingToBeUpdated.triggers, subcomponentProperties, allSettings, selectorCurrentValues);
      const hasBoxShadowBeenSet = settingToBeUpdated.spec.cssProperty === 'boxShadow' && BoxShadowUtils.setBoxShadowSettingsRangeValue(cssPropertyValue, settingToBeUpdated.spec);
      if (!hasBoxShadowBeenSet) { RangeUtils.updateSettingThatUsesCustomCss(settingToBeUpdated, cssPropertyValue); }
    } else if (settingToBeUpdated.spec.subcomponentPropertyObjectKeys) {
      RangeUtils.updateSettingThatUsesASubcomponentProperty(settingToBeUpdated, subcomponentProperties);
    } else {
      settingToBeUpdated.spec.default = RangeUtils.DEFAULT_RANGE_VALUE;
    }
  }
}
