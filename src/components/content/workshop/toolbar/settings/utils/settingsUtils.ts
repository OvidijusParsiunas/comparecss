import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import SharedUtils from './sharedUtils';
import RangeUtils from './rangeUtils';

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
      if (defaultCss[CSS_PSEUDO_CLASSES.DEFAULT][cssProperty]) {
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

  private static updateSetting(option: any, subcomponentProperties: SubcomponentProperties): void {
    // currently only being used for range values - hence functionality is currently there
    const { triggers, spec } = option;
    (triggers || []).forEach((trigger) => {
      if (trigger.setting) {
        const rangeValue = RangeUtils.getCustomFeatureRangeNumberValue(spec, subcomponentProperties);
        const { setting: {spec: targetSettingSpec}, aggregateSettingSpecs } = trigger;
        RangeUtils.updateSetting(rangeValue.toString(), aggregateSettingSpecs, targetSettingSpec, true,
          spec.smoothingDivisible, subcomponentProperties);
      }
    });
  }

  private static resetCustomFeatures(option: any, subcomponentProperties: SubcomponentProperties): void {
    const { spec: { valueInSetObject, customFeatureObjectKeys, mouseClickOptionCallback } } = option;
    const defaultValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties.defaultCustomFeatures);
    const currentValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties.customFeatures);
    if (valueInSetObject) {
      SettingsUtils.resetSetObject(currentValue as Set<undefined>, defaultValue as Set<undefined>);
    } else {
      SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties.customFeatures, defaultValue);
      SettingsUtils.updateSetting(option, subcomponentProperties);
      // only used for actions dropdown
      if (mouseClickOptionCallback) { mouseClickOptionCallback({subcomponentProperties,
        previousOptionName: currentValue as string, triggeredOptionName: defaultValue as string, isCustomFeatureResetTriggered: true }); }
    }
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
