import { CustomFeatures, SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { SettingPaths } from '../../../../../../interfaces/settingPaths';
import { optionToSettings } from '../types/optionToSettings';
import { FindSettings } from '../types/utils/findSetting';
import BoxShadowUtils from './boxShadowUtils';
import SharedUtils from './sharedUtils';

export default class RangeUtils {

  private static readonly DEFAULT_RANGE_VALUE = 0;

  private static activeTriggersForCustomCss(trigger: any, subcomponentProperties: SubcomponentProperties,
      actionsDropdownsObjects: unknown): void {
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, CSS_PSEUDO_CLASSES.CLICK, trigger.cssProperty);
    if (trigger.conditions.has(cssPropertyValue)) {
      customCss[activeCssPseudoClass][trigger.cssProperty] = trigger.defaultValue;
      actionsDropdownsObjects[trigger.cssProperty][trigger.cssProperty] = trigger.defaultValue;
    }
  }

  private static activateTriggersForCustomSubcomponentProperties(trigger: any, customFeatures: CustomFeatures,
      allSettings: any): void {
    const { conditions, customFeatureObjectKeys } = trigger;
    const customFeatureValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, customFeatures);
    if (!conditions.has(customFeatureValue)) return;
    SharedUtils.setCustomFeatureSetting(trigger, customFeatures, allSettings);
  }

  private static parseString(value: string, smoothingDivisible: number): number {
    return Number.parseFloat(value) * smoothingDivisible;
  }

  public static getCustomFeatureRangeNumberValue(spec: any, subcomponentProperties: SubcomponentProperties): number {
    const { customFeatureObjectKeys, smoothingDivisible } = spec;
    const customFeatureValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties.customFeatures);
    return RangeUtils.parseString(customFeatureValue as string, smoothingDivisible);
  }

  private static convertRangeValueNumberViaTargetSmoothingDivisible(rangeValue: number, currentSmoothingDivisible: number,
      targetSmoothingDivisible: number): number {
    return rangeValue / (currentSmoothingDivisible / targetSmoothingDivisible);
  }

  private static getAggregateSettingsTotalValue(aggregateSettingSpecs: any, targetSettingSmoothingDivisible: number,
      subcomponentProperties: SubcomponentProperties): number {
    let total = 0;
    for (let i = 0; i < aggregateSettingSpecs.length; i += 1) {
      const rangeValue = RangeUtils.getCustomFeatureRangeNumberValue(aggregateSettingSpecs[i], subcomponentProperties);
      total += RangeUtils.convertRangeValueNumberViaTargetSmoothingDivisible(
        rangeValue, aggregateSettingSpecs[i].smoothingDivisible, targetSettingSmoothingDivisible);
    }
    return total;
  }

  public static updateSetting(aggregateSettingSpecs: any, targetSettingSpec: any, updateIfLower: boolean,
      subcomponentProperties: SubcomponentProperties): void {
    const aggregateSettingsTotal = RangeUtils.getAggregateSettingsTotalValue(aggregateSettingSpecs,
      targetSettingSpec.smoothingDivisible, subcomponentProperties);
    targetSettingSpec.scale[1] = aggregateSettingsTotal;
    if (!updateIfLower) return;
    const settingRangeValue = RangeUtils.getCustomFeatureRangeNumberValue(targetSettingSpec, subcomponentProperties);
    if (aggregateSettingsTotal < settingRangeValue) {
      RangeUtils.updateCustomFeature(aggregateSettingsTotal.toString(), targetSettingSpec, subcomponentProperties.customFeatures);
    }
  }

  public static getAggregatedSettingSpecs(aggregatedSettingsPaths: SettingPaths): any {
    const settingsSpecs = [];
    for (let i = 0; i < aggregatedSettingsPaths.length; i += 1) {
      const {optionName, settingName } = aggregatedSettingsPaths[i];
      const option = optionToSettings[optionName];
      settingsSpecs.push(FindSettings.findSettingInOptionsArray(option.options, settingName).spec);
    }
    return settingsSpecs;
  }

  private static activateTriggers(updatedSetting: any, subcomponentProperties: SubcomponentProperties, allSettings: any,
      actionsDropdownsObjects: unknown): void {
    const { triggers, spec } = updatedSetting;
    (triggers || []).forEach((trigger) => {
      if (trigger.customFeatureObjectKeys) {
        RangeUtils.activateTriggersForCustomSubcomponentProperties(trigger, subcomponentProperties.customFeatures, allSettings);
      } else if (trigger.setting) {
        const { setting, aggregateSettingSpecs } = trigger;
        const [targetSettingSpecs] = RangeUtils.getAggregatedSettingSpecs(setting);
        RangeUtils.updateSetting(aggregateSettingSpecs.concat(spec), targetSettingSpecs, true, subcomponentProperties);
      } else {
        RangeUtils.activeTriggersForCustomCss(trigger, subcomponentProperties, actionsDropdownsObjects);
      }
    });
  }

  private static updateCustomCss(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const { cssProperty, smoothingDivisible, postfix } = spec;
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    customCss[activeCssPseudoClass][cssProperty] = `${Math.floor(rangeValue as unknown as number / smoothingDivisible)}${postfix}`;
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
    const { spec } = updatedSetting;
    const rangeValue = (event.target as HTMLInputElement).value;
    RangeUtils.activateTriggers(updatedSetting, subcomponentProperties, allSettings, actionsDropdownsObjects);
    if (spec.partialCss != undefined) {
      if (spec.cssProperty === 'boxShadow') BoxShadowUtils.updateBoxShadowRangeValue(rangeValue, spec, subcomponentProperties);
    } else if (spec.customFeatureObjectKeys) {
      RangeUtils.updateCustomFeature(rangeValue, spec, subcomponentProperties.customFeatures);
    } else {
      RangeUtils.updateCustomCss(rangeValue, spec, subcomponentProperties);
    }
  }

  private static updateSettingSpec(otherSettingsProperties: any, settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { aggregatedSettingPaths, updateIfLower } = otherSettingsProperties;
    const aggregateSettingSpecs = RangeUtils.getAggregatedSettingSpecs(aggregatedSettingPaths);
    RangeUtils.updateSetting(aggregateSettingSpecs, settingToBeUpdatedSpec, updateIfLower, subcomponentProperties);
  }

  private static updateCustomCssSetting(settingToBeUpdated: any, cssPropertyValue: string): void {
    const singlePropertyValue = settingToBeUpdated.spec.partialCss
      ? cssPropertyValue.split(' ')[settingToBeUpdated.spec.partialCss.position] : cssPropertyValue;
    const newRangeValue = RangeUtils.parseString(singlePropertyValue, settingToBeUpdated.spec.smoothingDivisible);
    if (Number.isNaN(newRangeValue)) { settingToBeUpdated.spec.default = RangeUtils.DEFAULT_RANGE_VALUE; }
    else if (Math.abs(Number.parseFloat(settingToBeUpdated.spec.default) - newRangeValue) >= settingToBeUpdated.spec.smoothingDivisible) {
      settingToBeUpdated.spec.default = RangeUtils.parseString(singlePropertyValue, settingToBeUpdated.spec.smoothingDivisible); 
    }
  }

  public static updateSettings(settingToBeUpdated: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, activeCssPseudoClass, settingToBeUpdated.spec.cssProperty);
    if (cssPropertyValue !== undefined) {
      const hasBoxShadowBeenSet = settingToBeUpdated.spec.cssProperty === 'boxShadow' && BoxShadowUtils.setBoxShadowSettingsRangeValue(cssPropertyValue, settingToBeUpdated.spec);
      if (!hasBoxShadowBeenSet) { RangeUtils.updateCustomCssSetting(settingToBeUpdated, cssPropertyValue); }
    } else if (settingToBeUpdated.spec.customFeatureObjectKeys) {
      settingToBeUpdated.spec.default = RangeUtils.getCustomFeatureRangeNumberValue(settingToBeUpdated.spec, subcomponentProperties);
      if (settingToBeUpdated.spec.updateSettingSpecViaOtherSettings) {
        RangeUtils.updateSettingSpec(settingToBeUpdated.spec.updateSettingSpecViaOtherSettings, settingToBeUpdated.spec, subcomponentProperties);
      }
    } else {
      settingToBeUpdated.spec.default = RangeUtils.DEFAULT_RANGE_VALUE;
    }
  }
}
