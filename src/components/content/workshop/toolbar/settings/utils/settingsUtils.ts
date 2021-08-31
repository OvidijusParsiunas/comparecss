import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import { UpdateOtherRangesUtils } from './rangeUtils/updateOtherRangesUtils';
import { UpdateRange } from './rangeUtils/updateRange';
import SharedUtils from './sharedUtils';

export default class SettingsUtils {

  private static removeAuxiliaryPartialCss(subcomponentProperties: SubcomponentProperties, cssProperty: string): void {
    const { auxiliaryPartialCss, activeCssPseudoClass } = subcomponentProperties;
    if (auxiliaryPartialCss && auxiliaryPartialCss[activeCssPseudoClass] && auxiliaryPartialCss[activeCssPseudoClass][cssProperty]) {
      delete auxiliaryPartialCss[activeCssPseudoClass][cssProperty];
    }
  }

  private static resetCssProperties(subcomponentProperties: SubcomponentProperties, cssProperty: string): void {
    const { customCss, defaultCss, activeCssPseudoClass } = subcomponentProperties;
    if (defaultCss[activeCssPseudoClass] && defaultCss[activeCssPseudoClass][cssProperty]) {
      const cssValue = defaultCss[activeCssPseudoClass][cssProperty];
      SettingsUtils.setCssProperty(subcomponentProperties, cssProperty, cssValue)
    } else if (customCss[activeCssPseudoClass]) {
      delete customCss[activeCssPseudoClass][cssProperty];
    }
  }
  
  private static setCssProperty(subcomponentProperties: SubcomponentProperties, cssProperty: string, cssValue: string): void {
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    if (!customCss[activeCssPseudoClass]) {
      customCss[activeCssPseudoClass] = { [cssProperty]: cssValue };
    } else {
      customCss[activeCssPseudoClass][cssProperty] = cssValue;
    }
  }

  private static resetCustomCss(subcomponentProperties: SubcomponentProperties, cssProperty: string): void {
    const { defaultCss, activeCssPseudoClass } = subcomponentProperties;
    if (activeCssPseudoClass === CSS_PSEUDO_CLASSES.DEFAULT) {
      if (defaultCss[CSS_PSEUDO_CLASSES.DEFAULT][cssProperty] !== undefined) {
        const cssValue = defaultCss[CSS_PSEUDO_CLASSES.DEFAULT][cssProperty];
        SettingsUtils.setCssProperty(subcomponentProperties, cssProperty, cssValue);
      }
    } else {
      SettingsUtils.resetCssProperties(subcomponentProperties, cssProperty);
    }
  }
  
  private static resetSetObject(currentValue: Set<undefined>, defaultValue: Set<undefined>): void {
    currentValue.clear();
    defaultValue.forEach((value) => currentValue.add(value));
  }

  private static resetAuxiliaryCustomFeature(auxiliaryCustomFeatureObjectKeys: string[], subcomponentProperties: SubcomponentProperties,
      defaultKey: 'defaultCustomFeatures'|'defaultCustomStaticFeatures'): void {
    const defaultValue = SharedUtils.getCustomFeatureValue(auxiliaryCustomFeatureObjectKeys, subcomponentProperties[defaultKey]);
    SharedUtils.setCustomFeatureValue(auxiliaryCustomFeatureObjectKeys, subcomponentProperties, defaultValue);
  }

  private static updateOtherOptionSettingViaTrigger(triggers: any, spec: any, subcomponentProperties: SubcomponentProperties): void {
    (triggers || []).forEach((trigger) => {
      if (trigger.otherOptionSettingPath) {
        // when resetting back to not auto, the lastSelectedValue is going to be reset to whatever it was set to originally
        // instead of the max value of the scale. If this is confusing users - will need to activate settings triggers
        // that have customFeatureObjectKeys within them.
        const rangeValue = UpdateRange.getCustomFeatureRangeNumberValue(spec, subcomponentProperties);
        UpdateOtherRangesUtils.updateOtherOptionSettingAndCustomFeature(trigger, spec, rangeValue.toString(), subcomponentProperties);
      }
    });
  }

  // Reason for using the method below:
  // when the animation duration custom feature is reset to default (setCustomFeatureValue) - it triggers change detection and the range is
  // updated on the screen accordingly, however when the updateSettings is run in RangeUtils (during refreshSettings) to update the value,
  // that update does not cause change detection to trigger again and the actual new value is visibile only after moving to a different
  // option and back. Hence for the resets that have their custom feature value controlled by another setting, this need to run first
  private static updateCurrentOptionSettingViaTrigger(triggers: any, subcomponentProperties: SubcomponentProperties): void {
    (triggers.true || []).forEach((trigger) => {
      if (trigger.currentOptionSettingSpec) {
        UpdateOtherRangesUtils.updateCurrentOptionSettingAndCustomFeature(trigger.currentOptionSettingSpec, subcomponentProperties);
      }
    });
  }

  // currently only being used to reset other settings and their custom features
  private static activateTriggers(option: any, subcomponentProperties: SubcomponentProperties): void {
    const { triggers, spec } = option;
    if (triggers?.true) SettingsUtils.updateCurrentOptionSettingViaTrigger(triggers, subcomponentProperties);
    if (Array.isArray(triggers)) SettingsUtils.updateOtherOptionSettingViaTrigger(triggers, spec, subcomponentProperties);
  }

  private static resetCustomFeatures(option: any, subcomponentProperties: SubcomponentProperties, customFeatureObjectKeys: string[]): void {
    const { spec: { valueInSetObject, mouseClickOptionCallback, auxiliaryCustomFeatureObjectKeys, resetCustomCss } } = option;
    const defaultKey = customFeatureObjectKeys[0] === 'customFeatures' ? 'defaultCustomFeatures' : 'defaultCustomStaticFeatures';
    const defaultValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties[defaultKey]);
    const currentValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties[customFeatureObjectKeys[0]]);
    if (valueInSetObject) {
      SettingsUtils.resetSetObject(currentValue as Set<undefined>, defaultValue as Set<undefined>);
    } else if (mouseClickOptionCallback) {
      // only used for actions dropdown
      mouseClickOptionCallback({subcomponentProperties,
        previousOptionName: currentValue as string, triggeredOptionName: defaultValue as string, isCustomFeatureResetTriggered: true }); }
    else {
      SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties, defaultValue);
      SettingsUtils.activateTriggers(option, subcomponentProperties);
    }
    if (auxiliaryCustomFeatureObjectKeys) {
      SettingsUtils.resetAuxiliaryCustomFeature(auxiliaryCustomFeatureObjectKeys, subcomponentProperties, defaultKey);
    }
    if (resetCustomCss) SettingsUtils.resetCustomCss(subcomponentProperties, resetCustomCss);
  }

  public static resetSubcomponentProperties(options: any, subcomponentProperties: SubcomponentProperties): void {
    options.forEach((option) => {
      if (!option.spec) return;
      const { cssProperty, customFeatureObjectKeys, lastSelectedValueObjectKeys } = option.spec;
      if (customFeatureObjectKeys) {
        SettingsUtils.resetCustomFeatures(option, subcomponentProperties, customFeatureObjectKeys);
      } else {
        SettingsUtils.resetCustomCss(subcomponentProperties, cssProperty);
        SettingsUtils.removeAuxiliaryPartialCss(subcomponentProperties, cssProperty);
        if (lastSelectedValueObjectKeys) SettingsUtils.resetCustomFeatures(option, subcomponentProperties, lastSelectedValueObjectKeys);
      }
    });
  }

  public static triggerComponentFunc(settingType: SETTINGS_TYPES, subcomponentProperties: SubcomponentProperties, cssProperty?: string): void {
    const { seedComponent } = subcomponentProperties;
    const containerComponent = seedComponent.containerComponent || seedComponent;
    const funcs = containerComponent.triggerFuncOnSettingChange;
    funcs?.[settingType]?.(subcomponentProperties, cssProperty);
  }
}
