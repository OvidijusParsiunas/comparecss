import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CustomFeaturesUtils } from '../../../utils/componentManipulation/utils/customFeaturesUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { Subcomponent } from '../../../../../../interfaces/workshopComponent';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { UpdateOtherRangesUtils } from './rangeUtils/updateOtherRangesUtils';
import { optionToSettings } from '../types/optionToSettings';
import { SetUtils } from '../../../utils/generic/setUtils';
import { UpdateRange } from './rangeUtils/updateRange';

export default class SettingsUtils {

  private static removeAuxiliaryPartialCss(subcomponent: Subcomponent, cssProperty: string): void {
    const { auxiliaryPartialCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    if (auxiliaryPartialCss && auxiliaryPartialCss[activeCssPseudoClassesDropdownItem] && auxiliaryPartialCss[activeCssPseudoClassesDropdownItem][cssProperty]) {
      delete auxiliaryPartialCss[activeCssPseudoClassesDropdownItem][cssProperty];
    }
  }

  private static resetCssProperties(subcomponent: Subcomponent, cssProperty: string): void {
    const { customCss, defaultCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    if (defaultCss[activeCssPseudoClassesDropdownItem]?.[cssProperty]) {
      const cssValue = defaultCss[activeCssPseudoClassesDropdownItem][cssProperty];
      SettingsUtils.setCssProperty(subcomponent, cssProperty, cssValue)
    } else if (customCss[activeCssPseudoClassesDropdownItem]) {
      delete customCss[activeCssPseudoClassesDropdownItem][cssProperty];
    }
  }
  
  private static setCssProperty(subcomponent: Subcomponent, cssProperty: string, cssValue: string): void {
    const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    if (!customCss[activeCssPseudoClassesDropdownItem]) {
      customCss[activeCssPseudoClassesDropdownItem] = { [cssProperty]: cssValue };
    } else {
      customCss[activeCssPseudoClassesDropdownItem][cssProperty] = cssValue;
    }
  }

  private static resetCustomCss(subcomponent: Subcomponent, cssProperty: string): void {
    const { defaultCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    if (activeCssPseudoClassesDropdownItem === CSS_PSEUDO_CLASSES.DEFAULT) {
      if (defaultCss[CSS_PSEUDO_CLASSES.DEFAULT][cssProperty] !== undefined) {
        const cssValue = defaultCss[CSS_PSEUDO_CLASSES.DEFAULT][cssProperty];
        SettingsUtils.setCssProperty(subcomponent, cssProperty, cssValue);
      }
    } else {
      SettingsUtils.resetCssProperties(subcomponent, cssProperty);
    }
  }
  
  private static resetSetObject(currentValue: Set<undefined>, defaultValue: Set<undefined>): void {
    currentValue.clear();
    SetUtils.addSetsToSet(currentValue, defaultValue);
  }

  private static resetAuxiliaryCustomFeature(auxiliaryCustomFeatureObjectKeys: string[], subcomponent: Subcomponent,
      defaultKey: 'defaultCustomFeatures'|'defaultCustomStaticFeatures'): void {
    const defaultValue = CustomFeaturesUtils.getCustomFeatureValue(auxiliaryCustomFeatureObjectKeys, subcomponent[defaultKey]);
    CustomFeaturesUtils.setCustomFeatureValue(auxiliaryCustomFeatureObjectKeys, subcomponent, defaultValue);
  }

  private static updateOtherOptionSettingViaTrigger(triggers: any, spec: any, subcomponent: Subcomponent): void {
    (triggers || []).forEach((trigger) => {
      if (trigger.otherOptionSettingPath) {
        // when resetting back to not auto, the lastSelectedValue is going to be reset to whatever it was set to originally
        // instead of the max value of the scale. If this is confusing users - will need to activate settings triggers
        // that have customFeatureObjectKeys within them.
        const rangeValue = UpdateRange.getCustomFeatureRangeNumberValue(spec, subcomponent);
        UpdateOtherRangesUtils.updateOtherOptionSettingAndCustomFeature(trigger, spec, rangeValue.toString(), subcomponent);
      }
    });
  }

  // Reason for using the method below:
  // when the animation duration custom feature is reset to default (setCustomFeatureValue) - it triggers change detection and the range is
  // updated on the screen accordingly, however when the updateSettings is run in RangeUtils (during refreshSettings) to update the value,
  // that update does not cause change detection to trigger again and the actual new value is visibile only after moving to a different
  // option and back. Hence for the resets that have their custom feature value controlled by another setting, this need to run first
  private static updateCurrentOptionSettingViaTrigger(triggers: any, subcomponent: Subcomponent): void {
    (triggers.true || []).forEach((trigger) => {
      if (trigger.currentOptionSettingSpec) {
        UpdateOtherRangesUtils.updateCurrentOptionSettingAndCustomFeature(trigger.currentOptionSettingSpec, subcomponent);
      }
    });
  }

  // currently only being used to reset other settings and their custom features
  private static activateTriggers(option: any, subcomponent: Subcomponent): void {
    const { triggers, spec } = option;
    if (triggers?.true) SettingsUtils.updateCurrentOptionSettingViaTrigger(triggers, subcomponent);
    if (Array.isArray(triggers)) SettingsUtils.updateOtherOptionSettingViaTrigger(triggers, spec, subcomponent);
  }

  private static resetCustomFeatures(option: any, subcomponent: Subcomponent, customFeatureObjectKeys: string[]): void {
    const { spec: { valueInSetObject, mouseClickItemCallback, auxiliaryCustomFeatureObjectKeys, resetCustomCss } } = option;
    const defaultKey = customFeatureObjectKeys[0] === 'customFeatures' ? 'defaultCustomFeatures' : 'defaultCustomStaticFeatures';
    const defaultValue = CustomFeaturesUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponent[defaultKey]);
    const currentValue = CustomFeaturesUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponent[customFeatureObjectKeys[0]]);
    if (valueInSetObject) {
      SettingsUtils.resetSetObject(currentValue as Set<undefined>, defaultValue as Set<undefined>);
    } else if (mouseClickItemCallback) {
      // only used for actions dropdown
      mouseClickItemCallback({subcomponent,
        previousItemName: currentValue as string, triggeredItemName: defaultValue as string, isCustomFeatureResetTriggered: true }); }
    else {
      CustomFeaturesUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponent, defaultValue);
      SettingsUtils.activateTriggers(option, subcomponent);
    }
    if (auxiliaryCustomFeatureObjectKeys) {
      SettingsUtils.resetAuxiliaryCustomFeature(auxiliaryCustomFeatureObjectKeys, subcomponent, defaultKey);
    }
    if (resetCustomCss) SettingsUtils.resetCustomCss(subcomponent, resetCustomCss);
  }

  public static resetSubcomponent(options: any, subcomponent: Subcomponent): void {
    options.forEach((option) => {
      if (!option.spec) return;
      const { cssProperty, customFeatureObjectKeys, lastSelectedValueObjectKeys } = option.spec;
      if (customFeatureObjectKeys) {
        SettingsUtils.resetCustomFeatures(option, subcomponent, customFeatureObjectKeys);
      } else {
        SettingsUtils.resetCustomCss(subcomponent, cssProperty);
        SettingsUtils.removeAuxiliaryPartialCss(subcomponent, cssProperty);
        if (lastSelectedValueObjectKeys) SettingsUtils.resetCustomFeatures(option, subcomponent, lastSelectedValueObjectKeys);
      }
    });
  }

  public static triggerComponentFunc(settingType: SETTINGS_TYPES, subcomponent: Subcomponent, cssProperty?: string): void {
    const { seedComponent } = subcomponent;
    const containerComponent = seedComponent;
    const funcs = containerComponent.triggerFuncOnSettingChange;
    funcs?.[settingType]?.(subcomponent, cssProperty);
  }

  private static isSettingDisplayed(settingSpec: any, subcomponent: Subcomponent): boolean {
    const { displayIfValueActive } = settingSpec;
    if (!displayIfValueActive) return true;
    const keys = displayIfValueActive.customFeatureObjectKeys;
    const currentValue = CustomFeaturesUtils.getCustomFeatureValue(keys, subcomponent[keys[0]]);
    return displayIfValueActive.value === currentValue;
  }

  public static filterSettings(optionType: WORKSHOP_TOOLBAR_OPTION_TYPES, subcomponent: Subcomponent): any {
    return { options: optionToSettings[optionType].options.filter(
      (option) => SettingsUtils.isSettingDisplayed(option.spec, subcomponent)),
    };
  }
}
