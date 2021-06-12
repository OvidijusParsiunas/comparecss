import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import { UpdateOtherRangesUtils } from './rangeUtils/updateOtherRangesUtils';
import { SharedRangeUtils } from './rangeUtils/sharedRangeUtils';
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

  // currently only being used to reset other settings and their custom features
  private static activateTriggers(option: any, subcomponentProperties: SubcomponentProperties): void {
    const { triggers, spec } = option;
    if (!Array.isArray(triggers)) return;
    (triggers || []).forEach((trigger) => {
      if (trigger.setting) {
        // when resetting back to not auto, the lastSelectedValue is going to be reset to whatever it was set to originally
        // instead of the max value of the scale. If this is confusing users - will need to activate settings triggers
        // that have customFeatureObjectKeys within them. 
        const rangeValue = SharedRangeUtils.getCustomFeatureRangeNumberValue(spec, subcomponentProperties);
        UpdateOtherRangesUtils.updateOtherSettingAndCustomFeature(trigger, spec, rangeValue.toString(), subcomponentProperties);
      }
    });
  }

  private static resetCustomFeatures(option: any, subcomponentProperties: SubcomponentProperties): void {
    const { spec: { valueInSetObject, customFeatureObjectKeys, mouseClickOptionCallback, auxiliaryCustomFeatureObjectKeys, resetCustomCss } } = option;
    const defaultKey = customFeatureObjectKeys[0] === 'customFeatures' ? 'defaultCustomFeatures' : 'defaultCustomStaticFeatures';
    const defaultValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties[defaultKey]);
    const currentValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties[customFeatureObjectKeys[0]]);
    if (valueInSetObject) {
      SettingsUtils.resetSetObject(currentValue as Set<undefined>, defaultValue as Set<undefined>);
    } else {
      SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties, defaultValue);
      SettingsUtils.activateTriggers(option, subcomponentProperties);
      // only used for actions dropdown
      if (mouseClickOptionCallback) { mouseClickOptionCallback({subcomponentProperties,
        previousOptionName: currentValue as string, triggeredOptionName: defaultValue as string, isCustomFeatureResetTriggered: true }); }
    }
    if (auxiliaryCustomFeatureObjectKeys) {
      SettingsUtils.resetAuxiliaryCustomFeature(auxiliaryCustomFeatureObjectKeys, subcomponentProperties, defaultKey);
    }
    if (resetCustomCss) SettingsUtils.resetCustomCss(subcomponentProperties, resetCustomCss);
  }

  public static resetSubcomponentProperties(options: any, subcomponentProperties: SubcomponentProperties): void {
    options.forEach((option) => {
      const { cssProperty, customFeatureObjectKeys } = option.spec;
      if (customFeatureObjectKeys) {
        SettingsUtils.resetCustomFeatures(option, subcomponentProperties);
      } else {
        SettingsUtils.resetCustomCss(subcomponentProperties, cssProperty);
        SettingsUtils.removeAuxiliaryPartialCss(subcomponentProperties, cssProperty);
      }
    });
  }
}
