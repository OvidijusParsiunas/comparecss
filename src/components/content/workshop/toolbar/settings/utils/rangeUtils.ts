import { subcomponentAndOverlayElementIdsState } from '../../options/subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { SubcomponentProperties, DetailsToUpdateOtherCssProperties } from '../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { SettingPaths } from '../../../../../../interfaces/settingPaths';
import { optionToSettings } from '../types/optionToSettings';
import { FindSettings } from '../types/utils/findSetting';
import BoxShadowUtils from './boxShadowUtils';
import SharedUtils from './sharedUtils';

export default class RangeUtils {

  private static readonly DEFAULT_RANGE_VALUE = 0;

  public static saveLastSelectedValue(event: MouseEvent, settingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const rangeValue = (event.target as HTMLInputElement).value;
    if (settingSpec.lastSelectedValueObjectKeys) {
      RangeUtils.updateCustomFeature(rangeValue, settingSpec, subcomponentProperties, settingSpec.lastSelectedValueObjectKeys);
    }
  }

  private static activeTriggersForCustomCss(trigger: any, subcomponentProperties: SubcomponentProperties,
      actionsDropdownsObjects: unknown): void {
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, CSS_PSEUDO_CLASSES.CLICK, trigger.cssProperty);
    if (trigger.conditions.has(cssPropertyValue)) {
      customCss[activeCssPseudoClass][trigger.cssProperty] = trigger.defaultValue;
      actionsDropdownsObjects[trigger.cssProperty][trigger.cssProperty] = trigger.defaultValue;
    }
  }

  private static activateTriggersForCustomSubcomponentProperties(trigger: any, subcomponentProperties: SubcomponentProperties,
      allSettings: any): void {
    const { conditions, customFeatureObjectKeys } = trigger;
    const customFeatureValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties[customFeatureObjectKeys[0]]);
    if (!conditions.has(customFeatureValue)) return;
    SharedUtils.setCustomFeatureSetting(trigger, subcomponentProperties, allSettings);
  }

  private static parseString(value: string, smoothingDivisible: number): number {
    return Number.parseFloat(value) * smoothingDivisible;
  }

  public static getCustomFeatureRangeNumberValue(spec: any, subcomponentProperties: SubcomponentProperties): number {
    const { customFeatureObjectKeys, smoothingDivisible } = spec;
    const customFeatureValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties[customFeatureObjectKeys[0]]);
    return RangeUtils.parseString(customFeatureValue as string, smoothingDivisible);
  }

  private static attemptToResetLastSelectedValue(totalAggregateAndCurrentSettingRangeValue: number, targetSettingRangeValue: number,
      targetSettingSpec: any, subcomponentProperties: SubcomponentProperties, refreshSettingsCallback?: () => void): void {
    const keys = targetSettingSpec.lastSelectedValueObjectKeys;
    const customFeatureValue = SharedUtils.getCustomFeatureValue(keys, subcomponentProperties[keys[0]]);
    const lastSelectedValue = RangeUtils.parseString(customFeatureValue as string, targetSettingSpec.smoothingDivisible);
    // Remember that this gets called when the totalAggregateAndCurrentSettingRangeValue is higher than the targetSettingRangeValue
    if (targetSettingRangeValue < lastSelectedValue) {
      // instead of using totalAggregateAndCurrentSettingRangeValue as the new value, the following line is used to prevent
      // an issue where upon selecting a high range value in the current setting (e.g. entrance delay duration),
      // the totalAggregateAndCurrentSettingRangeValue would be higher than lastSelectedValue
      const minRangeValue = Math.min(totalAggregateAndCurrentSettingRangeValue, lastSelectedValue);
      RangeUtils.updateCustomFeature(minRangeValue.toString(), targetSettingSpec, subcomponentProperties);
      if (refreshSettingsCallback) refreshSettingsCallback();
    }
  }

  private static attemptToUpdateOtherSettingFeatureValueViaScaleMax(totalAggregateAndCurrentSettingRangeValue: number, targetSettingSpec: any,
      subcomponentProperties: SubcomponentProperties, refreshSettingsCallback?: () => void): void {
    const targetSettingRangeValue = RangeUtils.getCustomFeatureRangeNumberValue(targetSettingSpec, subcomponentProperties);
    if (totalAggregateAndCurrentSettingRangeValue < targetSettingRangeValue) {
      RangeUtils.updateCustomFeature(totalAggregateAndCurrentSettingRangeValue.toString(), targetSettingSpec, subcomponentProperties);
    } else if (targetSettingSpec.isAutoObjectKeys) {
      const keys = targetSettingSpec.isAutoObjectKeys;
      const isAuto = SharedUtils.getCustomFeatureValue(keys, subcomponentProperties[keys[0]]);
      if (isAuto) {
        RangeUtils.updateCustomFeature(totalAggregateAndCurrentSettingRangeValue.toString(), targetSettingSpec, subcomponentProperties);
        if (refreshSettingsCallback) refreshSettingsCallback();
      } else {
        RangeUtils.attemptToResetLastSelectedValue(totalAggregateAndCurrentSettingRangeValue, targetSettingRangeValue,
          targetSettingSpec, subcomponentProperties, refreshSettingsCallback);
      }
    }
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

  // need to pass down the current range value as obtaining it through spec does not give the most up to date value
  public static updateSetting(currentSettingRangeValue: string, aggregateSettingSpecs: any, targetSettingSpec: any, updateUsingScaleMax: boolean,
      currentSmoothingDivisible: number, subcomponentProperties: SubcomponentProperties, refreshSettingsCallback?: () => void): void {
    const totalAggregateSettingValue = RangeUtils.getAggregateSettingsTotalValue(aggregateSettingSpecs,
      targetSettingSpec.smoothingDivisible, subcomponentProperties);
    const totalAggregateAndCurrentSettingRangeValue = RangeUtils.convertRangeValueNumberViaTargetSmoothingDivisible(
      Number.parseFloat(currentSettingRangeValue), currentSmoothingDivisible, targetSettingSpec.smoothingDivisible) + totalAggregateSettingValue;
    targetSettingSpec.scale[1] = totalAggregateAndCurrentSettingRangeValue;
    if (!updateUsingScaleMax) return;
    RangeUtils.attemptToUpdateOtherSettingFeatureValueViaScaleMax(totalAggregateAndCurrentSettingRangeValue, targetSettingSpec,
      subcomponentProperties, refreshSettingsCallback);
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

  private static activateTriggers(rangeValue: string, updatedSetting: any, subcomponentProperties: SubcomponentProperties, allSettings: any,
      actionsDropdownsObjects: unknown, refreshSettingsCallback: () => void): void {
    const { triggers, spec } = updatedSetting;
    (triggers || []).forEach((trigger) => {
      if (trigger.customFeatureObjectKeys) {
        RangeUtils.activateTriggersForCustomSubcomponentProperties(trigger, subcomponentProperties, allSettings);
      } else if (trigger.setting) {
        const { setting, updateUsingScaleMax, aggregateSettingSpecs } = trigger;
        const [targetSettingSpecs] = RangeUtils.getAggregatedSettingSpecs(setting);
        RangeUtils.updateSetting(rangeValue, aggregateSettingSpecs, targetSettingSpecs, updateUsingScaleMax,
          spec.smoothingDivisible, subcomponentProperties, refreshSettingsCallback);
      } else {
        RangeUtils.activeTriggersForCustomCss(trigger, subcomponentProperties, actionsDropdownsObjects);
      }
    });
  }

  // WORK1: lift out!
  private static updateCssProperty(realRangeValue: number, otherCssProperties: DetailsToUpdateOtherCssProperties) {
    const { divisor = 1, cssProperty, customCss, customFeatures, isScaleNegativeToPositive } = otherCssProperties;
    const currentSubcomponentLeft = Number.parseFloat(customCss[CSS_PSEUDO_CLASSES.DEFAULT][cssProperty] as string);
    const dividedRangeValue = realRangeValue / divisor;
    if (dividedRangeValue < Math.abs(currentSubcomponentLeft)) {
      const newRangeValue = Math.round(dividedRangeValue);
      (customCss[CSS_PSEUDO_CLASSES.DEFAULT][cssProperty] as string) = `${
        isScaleNegativeToPositive && currentSubcomponentLeft < 0 ? -newRangeValue : newRangeValue}px`;
        console.log('updating to');
        console.log(customCss[CSS_PSEUDO_CLASSES.DEFAULT][cssProperty]);
    } else {
      const keys = ['customFeatures', 'lastSelectedCssValues', cssProperty];
      const customFeatureValue = SharedUtils.getCustomFeatureValue(keys, customFeatures);
      const lastSelectedValue = RangeUtils.parseString(customFeatureValue as string, 1);
      if (dividedRangeValue <= Math.abs(lastSelectedValue)) {
        const newRangeValue = Math.round(dividedRangeValue);
        (customCss[CSS_PSEUDO_CLASSES.DEFAULT][cssProperty] as string) = `${
          isScaleNegativeToPositive && currentSubcomponentLeft < 0 ? -newRangeValue : newRangeValue}px`;
      }
    }
  }

  private static updateOtherCssProperties(detailsToUpdateOtherCssProperties: DetailsToUpdateOtherCssProperties[], realRangeValue: number): void {
    detailsToUpdateOtherCssProperties.forEach((otherCssProperties) => {
      RangeUtils.updateCssProperty(realRangeValue, otherCssProperties);
    })
  }

  private static updateCustomCss(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const { cssProperty, smoothingDivisible, postfix, detailsToUpdateOtherCssProperties } = spec;
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const realRangeValue = Math.round(rangeValue as unknown as number / smoothingDivisible);
    customCss[activeCssPseudoClass][cssProperty] = `${realRangeValue}${postfix}`;
    if (detailsToUpdateOtherCssProperties) RangeUtils.updateOtherCssProperties(detailsToUpdateOtherCssProperties, realRangeValue);
  }

  private static updateColorValueInCustomFeatureProperties(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const keys = spec.colorValueCustomFeatureObjectKeys;
    const colorValue = SharedUtils.getCustomFeatureValue(keys, subcomponentProperties[keys[0]]) as string;
    const alphaHexStringValue = SharedUtils.convertAlphaDecimalToHexString(rangeValue as unknown as number / spec.smoothingDivisible);
    const newColorvalue = `${colorValue.substring(0, colorValue.length - alphaHexStringValue.length)}${alphaHexStringValue}`;
    SharedUtils.setCustomFeatureValue(keys, subcomponentProperties, newColorvalue);
  }

  private static updateCustomFeature(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties, lastSelectedValueObjectKeys?: string[]): void {
    const { smoothingDivisible, postfix, customFeatureObjectKeys } = spec;
    const newRangeValue = `${rangeValue as unknown as number / smoothingDivisible}${postfix}`;
    SharedUtils.setCustomFeatureValue(lastSelectedValueObjectKeys || customFeatureObjectKeys, subcomponentProperties, newRangeValue);
    if (spec.colorValueCustomFeatureObjectKeys) {
      RangeUtils.updateColorValueInCustomFeatureProperties(rangeValue, spec, subcomponentProperties);
    }
  }

  public static updateProperties(event: MouseEvent, updatedSetting: any, allSettings: any, subcomponentProperties: SubcomponentProperties, 
      actionsDropdownsObjects: unknown, refreshSettingsCallback: () => void): void {
    const { spec } = updatedSetting;
    const rangeValue = (event.target as HTMLInputElement).value;
    RangeUtils.activateTriggers(rangeValue, updatedSetting, subcomponentProperties, allSettings, actionsDropdownsObjects, refreshSettingsCallback);
    if (spec.partialCss !== undefined) {
      if (spec.cssProperty === 'boxShadow') BoxShadowUtils.updateBoxShadowRangeValue(rangeValue, spec, subcomponentProperties);
    } else if (spec.customFeatureObjectKeys) {
      RangeUtils.updateCustomFeature(rangeValue, spec, subcomponentProperties);
    } else {
      RangeUtils.updateCustomCss(rangeValue, spec, subcomponentProperties);
    }
  }

  public static updateSettingSpec(otherSettingsProperties: any, settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { aggregatedSettingPaths, updateUsingScaleMax } = otherSettingsProperties;
    const aggregateSettingSpecs = RangeUtils.getAggregatedSettingSpecs(aggregatedSettingPaths);
    RangeUtils.updateSetting('0', aggregateSettingSpecs, settingToBeUpdatedSpec, updateUsingScaleMax,
      settingToBeUpdatedSpec.smoothingDivisible, subcomponentProperties);
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
      if (!hasBoxShadowBeenSet) {
        // WORK1: lift out!
        RangeUtils.updateCustomCssSetting(settingToBeUpdated, cssPropertyValue);
        if (settingToBeUpdated.spec.updateSettingSpecViaOtherCssProperties) {
          const { aggregatedProperties, isScaleNegativeToPositive, divisor } = settingToBeUpdated.spec.updateSettingSpecViaOtherCssProperties;
          let totalAggregatedValue = 0;
          for (let i = 0; i < aggregatedProperties.length; i += 1) {
            const { subcomponentName, cssProperty } = aggregatedProperties[i];
            const subcomponentId = subcomponentAndOverlayElementIdsState.getSubcomponentIdViaSubcomponentName(subcomponentName);
            const element = document.getElementById(subcomponentId);
            totalAggregatedValue += Number.parseFloat(element.style[cssProperty]);
          }
          if (divisor) {
            totalAggregatedValue = totalAggregatedValue / divisor;
          }
          settingToBeUpdated.spec.scale[1] = totalAggregatedValue;
          settingToBeUpdated.spec.scale[0] = isScaleNegativeToPositive ? -totalAggregatedValue : 0;
          const currentValue = Number.parseFloat(subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT][settingToBeUpdated.spec.cssProperty]);
          // when resetting need to make sure that not resetting to an out of bounds value
          if (Math.abs(currentValue) > totalAggregatedValue) {
            RangeUtils.updateCustomCss(totalAggregatedValue.toString(), settingToBeUpdated.spec, subcomponentProperties);
          }
        }
        // when resetting the base subcomponent
        if (settingToBeUpdated.spec.detailsToUpdateOtherCssProperties) RangeUtils.updateOtherCssProperties(
          settingToBeUpdated.spec.detailsToUpdateOtherCssProperties, Number.parseFloat(cssPropertyValue));
      }
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
