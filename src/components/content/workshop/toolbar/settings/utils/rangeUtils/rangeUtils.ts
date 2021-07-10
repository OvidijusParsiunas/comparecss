import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';
import { SettingPaths } from '../../../../../../../interfaces/settingPaths';
import { UpdateOtherRangesUtils } from './updateOtherRangesUtils';
import { optionToSettings } from '../../types/optionToSettings';
import { FindSettings } from '../../types/utils/findSetting';
import BoxShadowUtils from '../boxShadowUtils';
import { UpdateRange } from './updateRange';
import SharedUtils from '../sharedUtils';

export default class RangeUtils extends UpdateRange {

  private static readonly DEFAULT_RANGE_VALUE = 0;

  public static saveLastSelectedValue(event: MouseEvent, settingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const rangeValue = (event.target as HTMLInputElement).value;
    if (settingSpec.lastSelectedValueObjectKeys) {
      UpdateRange.updateRangeCustomFeature(rangeValue, settingSpec, subcomponentProperties, settingSpec.lastSelectedValueObjectKeys);
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
      } else if (trigger.otherOptionSettingPath) {
        UpdateOtherRangesUtils.updateOtherOptionSettingAndCustomFeature(trigger, spec, rangeValue, subcomponentProperties, refreshSettingsCallback);
      } else {
        RangeUtils.activeTriggersForCustomCss(trigger, subcomponentProperties, actionsDropdownsObjects);
      }
    });
  }

  public static updateProperties(event: MouseEvent, updatedSetting: any, allSettings: any, subcomponentProperties: SubcomponentProperties, 
      actionsDropdownsObjects: unknown, refreshSettingsCallback: () => void): void {
    const { spec } = updatedSetting;
    const rangeValue = (event.target as HTMLInputElement).value;
    RangeUtils.activateTriggers(rangeValue, updatedSetting, subcomponentProperties, allSettings, actionsDropdownsObjects, refreshSettingsCallback);
    if (spec.partialCss !== undefined) {
      if (spec.cssProperty === 'boxShadow') BoxShadowUtils.updateBoxShadowRangeValue(rangeValue, spec, subcomponentProperties);
    } else if (spec.customFeatureObjectKeys) {
      UpdateRange.updateRangeCustomFeature(rangeValue, spec, subcomponentProperties);
    } else {
      const realRangeValue = UpdateRange.updateCustomCss(rangeValue, spec, subcomponentProperties);
      if (spec.updateOtherCssProperties) UpdateOtherRangesUtils.updateOtherCustomCss(spec.updateOtherCssProperties, realRangeValue);
    }
  }

  private static updateCustomCssSetting(settingToBeUpdated: any, cssPropertyValue: string): void {
    const singlePropertyValue = settingToBeUpdated.spec.partialCss
      ? cssPropertyValue.split(' ')[settingToBeUpdated.spec.partialCss.position] : cssPropertyValue;
    const newRangeValue = UpdateRange.parseString(singlePropertyValue, settingToBeUpdated.spec.smoothingDivisible);
    if (Number.isNaN(newRangeValue)) { settingToBeUpdated.spec.default = RangeUtils.DEFAULT_RANGE_VALUE; }
    else if (Math.abs(Number.parseFloat(settingToBeUpdated.spec.default) - newRangeValue) >= settingToBeUpdated.spec.smoothingDivisible) {
      settingToBeUpdated.spec.default = UpdateRange.parseString(singlePropertyValue, settingToBeUpdated.spec.smoothingDivisible); 
    }
  }

  public static updateSettings(settingToBeUpdated: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, activeCssPseudoClass, settingToBeUpdated.spec.cssProperty);
    if (cssPropertyValue !== undefined) {
      const hasBoxShadowBeenSet = settingToBeUpdated.spec.cssProperty === 'boxShadow' && BoxShadowUtils.setBoxShadowSettingsRangeValue(cssPropertyValue,
        settingToBeUpdated.spec);
      if (!hasBoxShadowBeenSet) {
        RangeUtils.updateCustomCssSetting(settingToBeUpdated, cssPropertyValue);
        // update setting and adjust css to boundaries if resetting
        if (settingToBeUpdated.spec.updateSettingSpecViaOtherCssProperties) UpdateOtherRangesUtils.updateOtherOptionSettingAndCssProperties(
          settingToBeUpdated.spec, subcomponentProperties);
        // when resetting subcomponent, update other interconnected subcomponent css that depend on it
        if (settingToBeUpdated.spec.updateOtherCssProperties) UpdateOtherRangesUtils.updateOtherCustomCss(
          settingToBeUpdated.spec.updateOtherCssProperties, Number.parseFloat(cssPropertyValue));
      }
    } else if (settingToBeUpdated.spec.customFeatureObjectKeys) {
      settingToBeUpdated.spec.default = UpdateRange.getCustomFeatureRangeNumberValue(settingToBeUpdated.spec, subcomponentProperties);
      if (settingToBeUpdated.spec.updateSettingSpecViaOtherSettings) {
        UpdateOtherRangesUtils.updateCurrentOptionSettingAndCustomFeature(settingToBeUpdated.spec, subcomponentProperties);
      }
    } else {
      settingToBeUpdated.spec.default = RangeUtils.DEFAULT_RANGE_VALUE;
    }
  }
}
