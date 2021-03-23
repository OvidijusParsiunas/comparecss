import { CustomFeatures, SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../consts/subcomponentCssModes.enum';
import BoxShadowUtils from './boxShadowUtils';
import SharedUtils from './sharedUtils';

export default class RangeUtils {

  private static DEFAULT_RANGE_VALUE = 0;

  private static activeTriggersForCustomCss(trigger: any, subcomponentProperties: SubcomponentProperties,
      actionsDropdownsObjects: unknown): void {
    const { customCss, activeCustomCssMode } = subcomponentProperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, SUB_COMPONENT_CSS_MODES.CLICK, trigger.cssProperty);
    if (trigger.conditions.has(cssPropertyValue)) {
      customCss[activeCustomCssMode][trigger.cssProperty] = trigger.defaultValue;
      actionsDropdownsObjects[trigger.cssProperty][trigger.cssProperty] = trigger.defaultValue;
    }
  }

  private static activateTriggersForCustomSubcomponentProperties(trigger: any, customFeatures: CustomFeatures,
      allSettings: any): void {
    const { conditions, customFeatureObjectKeys } = trigger;
    const scustomFeatureValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, customFeatures);
    if (!conditions.has(scustomFeatureValue)) return;
    SharedUtils.setCustomFeatureSetting(trigger, customFeatures, allSettings);
  }

  private static activateTriggers(triggers: any, subcomponentProperties: SubcomponentProperties,
      allSettings: any, actionsDropdownsObjects: unknown): void {
    (triggers || []).forEach((trigger) => {
      if (trigger.customFeatureObjectKeys) {
        RangeUtils.activateTriggersForCustomSubcomponentProperties(trigger, subcomponentProperties.customFeatures, allSettings);
      } else {
        RangeUtils.activeTriggersForCustomCss(trigger, subcomponentProperties, actionsDropdownsObjects);
      }
    });
  }

  private static updateCustomCss(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const { cssProperty, smoothingDivisible, postfix } = spec;
    const { customCss, activeCustomCssMode } = subcomponentProperties;
    customCss[activeCustomCssMode][cssProperty] = `${Math.floor(rangeValue as unknown as number / smoothingDivisible)}${postfix}`;
  }

  private static updateColorValueInCustomFeatureProperties(rangeValue: string, spec: any, customFeatures: CustomFeatures): void {
    const colorValue = SharedUtils.getCustomFeatureValue(spec.colorValueCustomFeatureObjectKeys, customFeatures) as string;
    const alphaHexStringValue = SharedUtils.convertAlphaDecimalToHexString(rangeValue as unknown as number / spec.smoothingDivisible);
    const newColorvalue = `${colorValue.substring(0, colorValue.length - alphaHexStringValue.length)}${alphaHexStringValue}`;
    SharedUtils.setCustomFeatureValue(spec.colorValueCustomFeatureObjectKeys, customFeatures, newColorvalue);
  }

  private static updateCustomFeature(rangeValue: string, spec: any, customFeatures: CustomFeatures): void {
    const { smoothingDivisible, postfix, customFeatureObjectKeys } = spec;
    const newRangeValue = `${rangeValue as unknown as number / smoothingDivisible}${postfix}`;
    SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, customFeatures, newRangeValue);
    if (spec.colorValueCustomFeatureObjectKeys) {
      RangeUtils.updateColorValueInCustomFeatureProperties(rangeValue, spec, customFeatures);
    }
  }

  public static updateProperties(event: MouseEvent, updatedSetting: any, allSettings: any,
      subcomponentProperties: SubcomponentProperties, actionsDropdownsObjects: unknown): void {
    const { triggers, spec } = updatedSetting;
    RangeUtils.activateTriggers(triggers, subcomponentProperties, allSettings, actionsDropdownsObjects);
    const rangeValue = (event.target as HTMLInputElement).value;
    if (spec.partialCss != undefined) {
      if (spec.cssProperty === 'boxShadow') BoxShadowUtils.updateBoxShadowRangeValue(rangeValue, spec, subcomponentProperties);
    } else if (spec.customFeatureObjectKeys) {
      RangeUtils.updateCustomFeature(rangeValue, spec, subcomponentProperties.customFeatures);
    } else {
      RangeUtils.updateCustomCss(rangeValue, spec, subcomponentProperties);
    }
  }

  private static parseString(value: string, smoothingDivisible: number): number {
    return Number.parseFloat(value) * smoothingDivisible;
  }

  private static updateCustomFeatureSetting(settingToBeUpdated: any, customFeatures: CustomFeatures): void {
    const rangeValue = SharedUtils.getCustomFeatureValue(settingToBeUpdated.spec.customFeatureObjectKeys, customFeatures) as string;
    settingToBeUpdated.spec.default = RangeUtils.parseString(rangeValue, settingToBeUpdated.spec.smoothingDivisible);
  }

  private static updateCustomCssSetting(settingToBeUpdated: any, cssPropertyValue: string): void {
    const singlePropertyValue = settingToBeUpdated.spec.partialCss
      ? cssPropertyValue.split(' ')[settingToBeUpdated.spec.partialCss.position] : cssPropertyValue;
    const newRangeValue = RangeUtils.parseString(singlePropertyValue, settingToBeUpdated.spec.smoothingDivisible);
    if (Math.abs(Number.parseFloat(settingToBeUpdated.spec.default) - newRangeValue) >= settingToBeUpdated.spec.smoothingDivisible) {
      settingToBeUpdated.spec.default = RangeUtils.parseString(singlePropertyValue, settingToBeUpdated.spec.smoothingDivisible); 
    }
  }

  public static updateSettings(settingToBeUpdated: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, activeCustomCssMode } = subcomponentProperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, activeCustomCssMode, settingToBeUpdated.spec.cssProperty);
    if (cssPropertyValue !== undefined) {
      const hasBoxShadowBeenSet = settingToBeUpdated.spec.cssProperty === 'boxShadow' && BoxShadowUtils.setBoxShadowSettingsRangeValue(cssPropertyValue, settingToBeUpdated.spec);
      if (!hasBoxShadowBeenSet) { RangeUtils.updateCustomCssSetting(settingToBeUpdated, cssPropertyValue); }
    } else if (settingToBeUpdated.spec.customFeatureObjectKeys) {
      RangeUtils.updateCustomFeatureSetting(settingToBeUpdated, subcomponentProperties.customFeatures);
    } else {
      settingToBeUpdated.spec.default = RangeUtils.DEFAULT_RANGE_VALUE;
    }
  }
}
