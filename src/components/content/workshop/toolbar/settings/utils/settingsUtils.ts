import { SUB_COMPONENT_CSS_MODES } from '../../../../../../consts/subcomponentCssModes.enum';
import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import SharedUtils from './sharedUtils';

export default class SettingsUtils {

  private static removeAuxiliaryPartialCss(subcomponentProperties: SubcomponentProperties, cssProperty: string): void {
    const { auxiliaryPartialCss, activeCustomCssMode } = subcomponentProperties;
    if (auxiliaryPartialCss && auxiliaryPartialCss[activeCustomCssMode] && auxiliaryPartialCss[activeCustomCssMode][cssProperty]) {
      delete auxiliaryPartialCss[activeCustomCssMode][cssProperty];
    }
  }

  private static resetCssProperties(subcomponentProperties: SubcomponentProperties, cssProperty: string): void {
    const { customCss, initialCss, activeCustomCssMode } = subcomponentProperties;
    if (initialCss[activeCustomCssMode] && initialCss[activeCustomCssMode][cssProperty]) {
      const cssValue = initialCss[activeCustomCssMode][cssProperty];
      SettingsUtils.setCssProperty(subcomponentProperties, cssProperty, cssValue)
    } else if (customCss[activeCustomCssMode]) {
      delete customCss[activeCustomCssMode][cssProperty];
    }
  }
  
  private static setCssProperty(subcomponentProperties: SubcomponentProperties, cssProperty: string, cssValue: string): void {
    const { customCss, activeCustomCssMode } = subcomponentProperties;
    if (!customCss[activeCustomCssMode]) {
      customCss[activeCustomCssMode] = { [cssProperty]: cssValue };
    } else {
      customCss[activeCustomCssMode][cssProperty] = cssValue;
    }
  }

  private static resetCustomCss(subcomponentProperties: SubcomponentProperties, cssProperty: string): void {
    const { initialCss, activeCustomCssMode } = subcomponentProperties;
    if (activeCustomCssMode === SUB_COMPONENT_CSS_MODES.DEFAULT) {
      if (initialCss[SUB_COMPONENT_CSS_MODES.DEFAULT][cssProperty]) {
        const cssValue = initialCss[SUB_COMPONENT_CSS_MODES.DEFAULT][cssProperty];
        SettingsUtils.setCssProperty(subcomponentProperties, cssProperty, cssValue);
      }
    } else {
      SettingsUtils.resetCssProperties(subcomponentProperties, cssProperty);
    }
  }

  private static resetCustomFeatures(customFeatureObjectKeys, valueInSetObject, subcomponentProperties: SubcomponentProperties,
      triggers: any): void {
    const defaultValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties.defaultCustomFeatures);
    const currentValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties.customFeatures);
    const appropriateTypeDefaultValue = valueInSetObject ? new Set([...(defaultValue as Set<undefined>)]) : defaultValue;
    SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties.customFeatures, appropriateTypeDefaultValue);
    if (triggers[defaultValue as string]) {
      SharedUtils.activateCustomFeatureTriggerFunctions(triggers, currentValue as string, defaultValue as string, subcomponentProperties);
    }
  }

  public static resetSubcomponentProperties(options: any, subcomponentProperties: SubcomponentProperties): void {
    options.forEach((option) => {
      const { cssProperty, valueInSetObject, customFeatureObjectKeys } = option.spec;
      if (customFeatureObjectKeys) {
        SettingsUtils.resetCustomFeatures(customFeatureObjectKeys, valueInSetObject, subcomponentProperties, option.triggers);
      } else {
        SettingsUtils.resetCustomCss(subcomponentProperties, cssProperty);
        SettingsUtils.removeAuxiliaryPartialCss(subcomponentProperties, cssProperty);
      }
    });
  }
}
