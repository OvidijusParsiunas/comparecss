import { subcomponentAndOverlayElementIdsState } from '../../../../componentPreview/utils/elements/subcomponentAndOverlayElementIdsState';
import { CustomCss, SubcomponentProperties, UpdateOtherCssProperties } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SettingPaths } from '../../../../../../../interfaces/settingPaths';
import { optionToSettings } from '../../types/optionToSettings';
import { FindSettings } from '../../types/utils/findSetting';
import { UpdateRange } from './updateRange';
import SharedUtils from '../sharedUtils';

// Functionality here is currently being used for Range values, but it can be reutilized for other settings and their properties
export class UpdateOtherRangesUtils extends UpdateRange {

  private static setCssPropertyValue(postDivisionRangeValue: number, customCss: CustomCss, cssProperty: string, isScaleNegativeToPositive: boolean,
      currentCssPropertyValue: number): void {
    const newRangeValue = Math.round(postDivisionRangeValue);
    customCss[CSS_PSEUDO_CLASSES.DEFAULT][cssProperty] = `${
      isScaleNegativeToPositive && currentCssPropertyValue < 0 ? -newRangeValue : newRangeValue}px`;
  }

  private static updateOtherCustomFeatureValue(rangeValue: number|string, otherCssProperties: UpdateOtherCssProperties): void {
    const { customFeatures, customFeatureKeys, postfix } = otherCssProperties;
    const resultRangeValue = typeof rangeValue === 'string' ? rangeValue : `${rangeValue.toString()}${postfix}`;
    SharedUtils.setCustomFeatureValue(customFeatureKeys, customFeatures, resultRangeValue);
  }

  private static updateOtherCustomCssProperty(rangeValue: number, otherCssProperties: UpdateOtherCssProperties): void {
    const { divisor = 1, cssProperty, customCss, customFeatures, isScaleNegativeToPositive } = otherCssProperties;
    const currentCssPropertyValue = Number.parseFloat(customCss[CSS_PSEUDO_CLASSES.DEFAULT][cssProperty] as string);
    const postDivisionRangeValue = rangeValue / divisor;
    // reduce
    if (postDivisionRangeValue < Math.abs(currentCssPropertyValue)) {
      UpdateOtherRangesUtils.setCssPropertyValue(postDivisionRangeValue, customCss, cssProperty, isScaleNegativeToPositive,
        currentCssPropertyValue);
    } else {
      const keys = ['customFeatures', 'lastSelectedCssValues', cssProperty];
      const customFeatureValue = SharedUtils.getCustomFeatureValue(keys, customFeatures);
      const lastSelectedValue = UpdateRange.parseString(customFeatureValue as string, 1);
      // increase
      if (postDivisionRangeValue <= Math.abs(lastSelectedValue)) {
        UpdateOtherRangesUtils.setCssPropertyValue(postDivisionRangeValue, customCss, cssProperty, isScaleNegativeToPositive,
          currentCssPropertyValue);
      }
    }
  }

  private static updateOtherCustomProperty(rangeValue: number|string, otherCssProperties: UpdateOtherCssProperties) {
    const { cssProperty, customFeatureKeys } = otherCssProperties;
    if (cssProperty) {
      UpdateOtherRangesUtils.updateOtherCustomCssProperty(rangeValue as number, otherCssProperties);
    } else if (customFeatureKeys) {
      UpdateOtherRangesUtils.updateOtherCustomFeatureValue(rangeValue, otherCssProperties);
    }
  }

  public static updateOtherSubcomponentRanges(updateOtherCssProperties: UpdateOtherCssProperties[], rangeValue: number|string): void {
    updateOtherCssProperties.forEach((otherCssProperties) => {
      UpdateOtherRangesUtils.updateOtherCustomProperty(rangeValue, otherCssProperties);
    });
  }

  private static getAggregatedCssPropertiesTotalValue(aggregatedCssProperties: any, divisor: number): number {
    let totalAggregatedValue = 0;
    for (let i = 0; i < aggregatedCssProperties.length; i += 1) {
      const { subcomponentName, cssProperty } = aggregatedCssProperties[i];
      const subcomponentId = subcomponentAndOverlayElementIdsState.getSubcomponentIdViaSubcomponentName(subcomponentName);
      const element = document.getElementById(subcomponentId);
      totalAggregatedValue += Number.parseFloat(element.style[cssProperty]);
    }
    return totalAggregatedValue / divisor;
  }

  private static updateCurrentSetting(settingSpec: any): number {
    const { aggregatedCssProperties, isScaleNegativeToPositive, divisor = 1 } = settingSpec.updateSettingSpecViaOtherCssProperties;
    const totalAggregatedValue = UpdateOtherRangesUtils.getAggregatedCssPropertiesTotalValue(aggregatedCssProperties, divisor);
    settingSpec.scale[1] = totalAggregatedValue;
    settingSpec.scale[0] = isScaleNegativeToPositive ? -totalAggregatedValue : 0;
    return totalAggregatedValue;
  }

  public static updateOtherOptionSettingAndCssProperties(settingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const scaleBoundaryValue = UpdateOtherRangesUtils.updateCurrentSetting(settingSpec);
    const currentValue = Number.parseFloat(subcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT][settingSpec.cssProperty]);
    // if the current value is greater than scaleBoundaryValue, reduce its size to within the bounds
    if (Math.abs(currentValue) > scaleBoundaryValue) {
      const realRangeValue = UpdateRange.updateCustomCss(scaleBoundaryValue.toString(), settingSpec, subcomponentProperties);
      if (settingSpec.updateOtherCssProperties) UpdateOtherRangesUtils.updateOtherSubcomponentRanges(
        settingSpec.updateOtherCssProperties, realRangeValue);
    }
  }

  private static resetLastSelectedCustomFeatureValue(scaleBoundaryValue: number, targetSettingRangeValue: number,
      targetSettingSpec: any, subcomponentProperties: SubcomponentProperties, refreshSettingsCallback?: () => void): void {
    const keys = targetSettingSpec.lastSelectedValueObjectKeys;
    const customFeatureValue = SharedUtils.getCustomFeatureValue(keys, subcomponentProperties[keys[0]]);
    const lastSelectedValue = UpdateRange.parseString(customFeatureValue as string, targetSettingSpec.smoothingDivisible);
    // Remember that this gets called when the scaleBoundaryValue is higher than the targetSettingRangeValue
    if (targetSettingRangeValue < lastSelectedValue) {
      // instead of using scaleBoundaryValue as the new value, the following line is used to prevent an issue where upon
      // selecting a high range value in the current setting (e.g. entrance delay duration), the scaleBoundaryValue would
      // be higher than lastSelectedValue
      const minRangeValue = Math.min(scaleBoundaryValue, lastSelectedValue);
      UpdateRange.updateRangeCustomFeature(minRangeValue.toString(), targetSettingSpec, subcomponentProperties);
      if (refreshSettingsCallback) refreshSettingsCallback();
    }
  }

  private static updateCustomFeatureValue(scaleBoundaryValue: number, targetSettingSpec: any,
      subcomponentProperties: SubcomponentProperties, refreshSettingsCallback?: () => void): void {
    const targetSettingRangeValue = UpdateRange.getCustomFeatureRangeNumberValue(targetSettingSpec, subcomponentProperties);
    if (scaleBoundaryValue < targetSettingRangeValue) {
      UpdateRange.updateRangeCustomFeature(scaleBoundaryValue.toString(), targetSettingSpec, subcomponentProperties);
    } else if (targetSettingSpec.isAutoObjectKeys) {
      const keys = targetSettingSpec.isAutoObjectKeys;
      const isAuto = SharedUtils.getCustomFeatureValue(keys, subcomponentProperties[keys[0]]);
      if (isAuto) {
        UpdateRange.updateRangeCustomFeature(scaleBoundaryValue.toString(), targetSettingSpec, subcomponentProperties);
        if (refreshSettingsCallback) refreshSettingsCallback();
      } else {
        UpdateOtherRangesUtils.resetLastSelectedCustomFeatureValue(scaleBoundaryValue, targetSettingRangeValue,
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
      const rangeValue = UpdateRange.getCustomFeatureRangeNumberValue(aggregateSettingSpecs[i], subcomponentProperties);
      total += UpdateOtherRangesUtils.convertRangeValueNumberViaTargetSmoothingDivisible(
        rangeValue, aggregateSettingSpecs[i].smoothingDivisible, targetSettingSmoothingDivisible);
    }
    return total;
  }

  private static getAggregatedSettingSpecs(aggregatedSettingsPaths: SettingPaths): any {
    const settingsSpecs = [];
    for (let i = 0; i < aggregatedSettingsPaths.length; i += 1) {
      const {optionName, settingName } = aggregatedSettingsPaths[i];
      const option = optionToSettings[optionName];
      settingsSpecs.push(FindSettings.findSettingInOptionsArray(option.options, settingName).spec);
    }
    return settingsSpecs;
  }

  // need to pass down the current range value as obtaining it through spec does not give the most up to date value
  private static updateSettingAndCustomFeature(currentSettingRangeValue: string, aggregateSettingSpecs: any, targetSettingSpec: any,
      currentSmoothingDivisible: number, subcomponentProperties: SubcomponentProperties, refreshSettingsCallback?: () => void): void {
    const totalAggregateSettingValue = UpdateOtherRangesUtils.getAggregateSettingsTotalValue(aggregateSettingSpecs,
      targetSettingSpec.smoothingDivisible, subcomponentProperties);
    const totalAggregateAndCurrentSettingRangeValue = UpdateOtherRangesUtils.convertRangeValueNumberViaTargetSmoothingDivisible(
      Number.parseFloat(currentSettingRangeValue), currentSmoothingDivisible, targetSettingSpec.smoothingDivisible) + totalAggregateSettingValue;
    targetSettingSpec.scale[1] = totalAggregateAndCurrentSettingRangeValue;
    UpdateOtherRangesUtils.updateCustomFeatureValue(totalAggregateAndCurrentSettingRangeValue, targetSettingSpec,
      subcomponentProperties, refreshSettingsCallback);
  }

  public static updateCurrentOptionSettingAndCustomFeature(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { updateSettingSpecViaOtherSettings, smoothingDivisible } = settingToBeUpdatedSpec;
    const aggregateSettingSpecs = UpdateOtherRangesUtils.getAggregatedSettingSpecs(updateSettingSpecViaOtherSettings.aggregatedSettingPaths);
    UpdateOtherRangesUtils.updateSettingAndCustomFeature('0', aggregateSettingSpecs, settingToBeUpdatedSpec, smoothingDivisible,
      subcomponentProperties);
  }

  public static updateOtherOptionSettingAndCustomFeature(trigger: any, spec: any, rangeValue: string, subcomponentProperties: SubcomponentProperties,
      refreshSettingsCallback?: () => void): void {
    const { otherOptionSettingPath, aggregateSettingSpecs } = trigger;
    const [otherOptionSettingSpecs] = UpdateOtherRangesUtils.getAggregatedSettingSpecs(otherOptionSettingPath);
    UpdateOtherRangesUtils.updateSettingAndCustomFeature(rangeValue, aggregateSettingSpecs, otherOptionSettingSpecs, spec.smoothingDivisible,
      subcomponentProperties, refreshSettingsCallback);
  }
}
