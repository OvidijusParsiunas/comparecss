import { CustomFeaturesUtils } from '../../../../utils/componentManipulation/utils/customFeaturesUtils';
import { BORDER_WIDTH_CSS_PROPERTY_ALIAS } from '../../../../../../../consts/borderWidthAlias';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { Subcomponent } from '../../../../../../../interfaces/workshopComponent';
import { SETTINGS_TYPES } from '../../../../../../../consts/settingsTypes.enum';
import { SettingPaths } from '../../../../../../../interfaces/settingPaths';
import { UpdateOtherRangesUtils } from './updateOtherRangesUtils';
import { optionToSettings } from '../../types/optionToSettings';
import { FindSettings } from '../../types/utils/findSetting';
import BoxShadowUtils from '../boxShadowUtils';
import SettingsUtils from '../settingsUtils';
import { UpdateRange } from './updateRange';
import SharedUtils from '../sharedUtils';

export default class RangeUtils extends UpdateRange {

  private static readonly DEFAULT_RANGE_VALUE = 0;

  public static saveLastSelectedValue(event: MouseEvent, settingSpec: any, subcomponent: Subcomponent): void {
    const rangeValue = (event.target as HTMLInputElement).value;
    if (settingSpec.lastSelectedValueObjectKeys) {
      UpdateRange.updateRangeCustomFeature(rangeValue, settingSpec, subcomponent, settingSpec.lastSelectedValueObjectKeys);
    }
  }

  private static activeTriggersForCustomCss(trigger: any, subcomponent: Subcomponent,
      actionsDropdownsObjects: unknown): void {
    const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, CSS_PSEUDO_CLASSES.CLICK, trigger.cssProperty);
    if (trigger.conditions.has(cssPropertyValue)) {
      customCss[activeCssPseudoClassesDropdownItem][trigger.cssProperty] = trigger.defaultValue;
      actionsDropdownsObjects[trigger.cssProperty] = trigger.defaultValue;
    }
  }

  private static activateTriggersForCustomFeature(trigger: any, subcomponent: Subcomponent,
      allSettings: any): void {
    const { conditions, customFeatureObjectKeys } = trigger;
    const customFeatureValue = CustomFeaturesUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponent[customFeatureObjectKeys[0]]);
    if (!conditions.has(customFeatureValue)) return;
    SharedUtils.setCustomFeatureSetting(trigger, subcomponent, allSettings);
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

  private static activateTriggers(rangeValue: string, updatedSetting: any, subcomponent: Subcomponent, allSettings: any,
      actionsDropdownsObjects: unknown, refreshSettingsCallback: () => void): void {
    const { triggers, spec } = updatedSetting;
    (triggers || []).forEach((trigger) => {
      if (trigger.customFeatureObjectKeys) {
        RangeUtils.activateTriggersForCustomFeature(trigger, subcomponent, allSettings);
      } else if (trigger.otherOptionSettingPath) {
        UpdateOtherRangesUtils.updateOtherOptionSettingAndCustomFeature(trigger, spec, rangeValue, subcomponent, refreshSettingsCallback);
      } else {
        RangeUtils.activeTriggersForCustomCss(trigger, subcomponent, actionsDropdownsObjects);
      }
    });
  }

  public static updateProperties(event: MouseEvent, updatedSetting: any, allSettings: any, subcomponent: Subcomponent, 
      actionsDropdownsObjects: unknown, refreshSettingsCallback: () => void): void {
    const { spec } = updatedSetting;
    const rangeValue = (event.target as HTMLInputElement).value;
    let realRangeValue = null;
    RangeUtils.activateTriggers(rangeValue, updatedSetting, subcomponent, allSettings, actionsDropdownsObjects, refreshSettingsCallback);
    if (spec.partialCss !== undefined) {
      if (spec.cssProperty === 'boxShadow') BoxShadowUtils.updateBoxShadowRangeValue(rangeValue, spec, subcomponent);
    } else if (spec.customFeatureObjectKeys) {
      UpdateRange.updateRangeCustomFeature(rangeValue, spec, subcomponent);
      if (spec.updateOtherCssProperties) {
        realRangeValue = Math.round(rangeValue as unknown as number / spec.smoothingDivisible);
      }
    } else {
      realRangeValue = UpdateRange.updateCustomCss(rangeValue, spec, subcomponent);
    }
    if (spec.updateOtherCssProperties) UpdateOtherRangesUtils.updateOtherSubcomponentRanges(spec.updateOtherCssProperties, realRangeValue);
    SettingsUtils.triggerComponentFunc(SETTINGS_TYPES.RANGE, subcomponent, updatedSetting.spec.cssProperty);
  }

  private static updateCustomFeatureSetting(settingToBeUpdated: any, subcomponent: Subcomponent): void {
    settingToBeUpdated.spec.default = UpdateRange.getCustomFeatureRangeNumberValue(settingToBeUpdated.spec, subcomponent);
    if (settingToBeUpdated.spec.updateSettingSpecViaOtherSettings) {
      UpdateOtherRangesUtils.updateCurrentOptionSettingAndCustomFeature(settingToBeUpdated.spec, subcomponent);
    }
    if (settingToBeUpdated.spec.updateOtherCssProperties) {
      // when resetting subcomponent, update other interconnected subcomponent features that depend on it
      const rangeStringValue = UpdateRange.getCustomFeatureStringRangeValue(settingToBeUpdated.spec.customFeatureObjectKeys, subcomponent);
      UpdateOtherRangesUtils.updateOtherSubcomponentRanges(settingToBeUpdated.spec.updateOtherCssProperties, rangeStringValue);
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

  private static updateCssPropertySetting(settingToBeUpdated: any, cssPropertyValue: string, subcomponent: Subcomponent): void {
    const hasBoxShadowBeenSet = settingToBeUpdated.spec.cssProperty === 'boxShadow' && BoxShadowUtils.setBoxShadowSettingsRangeValue(cssPropertyValue,
      settingToBeUpdated.spec);
    if (!hasBoxShadowBeenSet) {
      RangeUtils.updateCustomCssSetting(settingToBeUpdated, cssPropertyValue);
      if (settingToBeUpdated.spec.cssProperty === BORDER_WIDTH_CSS_PROPERTY_ALIAS) {
        UpdateRange.updateOtherBorderProperties(subcomponent);
      }
      // update setting and adjust css to boundaries if resetting
      if (settingToBeUpdated.spec.updateSettingSpecViaOtherCssProperties) UpdateOtherRangesUtils.updateOtherOptionSettingAndCssProperties(
        settingToBeUpdated.spec, subcomponent);
      // when resetting subcomponent, update other interconnected subcomponent css that depend on it
      if (settingToBeUpdated.spec.updateOtherCssProperties) UpdateOtherRangesUtils.updateOtherSubcomponentRanges(
        settingToBeUpdated.spec.updateOtherCssProperties, Number.parseFloat(cssPropertyValue));
    }
  }

  public static updateSettings(settingToBeUpdated: any, subcomponent: Subcomponent): void {
    const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, activeCssPseudoClassesDropdownItem, settingToBeUpdated.spec.cssProperty);
    if (cssPropertyValue !== undefined) {
      RangeUtils.updateCssPropertySetting(settingToBeUpdated, cssPropertyValue, subcomponent);
    } else if (settingToBeUpdated.spec.customFeatureObjectKeys) {
      RangeUtils.updateCustomFeatureSetting(settingToBeUpdated, subcomponent);
    } else {
      settingToBeUpdated.spec.default = RangeUtils.DEFAULT_RANGE_VALUE;
    }
    SettingsUtils.triggerComponentFunc(SETTINGS_TYPES.RANGE, subcomponent, settingToBeUpdated.spec.cssProperty);
  }
}
