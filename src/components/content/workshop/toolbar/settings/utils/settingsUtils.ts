import { ActionsDropdownMouseEventCallbackEvent } from '../../../../../../interfaces/actionsDropdownMouseEventCallbacks';
import { CSS_STATES } from '../../../../../../consts/subcomponentCssStates.enum';
import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import SharedUtils from './sharedUtils';

export default class SettingsUtils {

  private static removeAuxiliaryPartialCss(subcomponentProperties: SubcomponentProperties, cssProperty: string): void {
    const { auxiliaryPartialCss, activeCssState } = subcomponentProperties;
    if (auxiliaryPartialCss && auxiliaryPartialCss[activeCssState] && auxiliaryPartialCss[activeCssState][cssProperty]) {
      delete auxiliaryPartialCss[activeCssState][cssProperty];
    }
  }

  private static resetCssProperties(subcomponentProperties: SubcomponentProperties, cssProperty: string): void {
    const { customCss, initialCss, activeCssState } = subcomponentProperties;
    if (initialCss[activeCssState] && initialCss[activeCssState][cssProperty]) {
      const cssValue = initialCss[activeCssState][cssProperty];
      SettingsUtils.setCssProperty(subcomponentProperties, cssProperty, cssValue)
    } else if (customCss[activeCssState]) {
      delete customCss[activeCssState][cssProperty];
    }
  }
  
  private static setCssProperty(subcomponentProperties: SubcomponentProperties, cssProperty: string, cssValue: string): void {
    const { customCss, activeCssState } = subcomponentProperties;
    if (!customCss[activeCssState]) {
      customCss[activeCssState] = { [cssProperty]: cssValue };
    } else {
      customCss[activeCssState][cssProperty] = cssValue;
    }
  }

  private static resetCustomCss(subcomponentProperties: SubcomponentProperties, cssProperty: string): void {
    const { initialCss, activeCssState } = subcomponentProperties;
    if (activeCssState === CSS_STATES.DEFAULT) {
      if (initialCss[CSS_STATES.DEFAULT][cssProperty]) {
        const cssValue = initialCss[CSS_STATES.DEFAULT][cssProperty];
        SettingsUtils.setCssProperty(subcomponentProperties, cssProperty, cssValue);
      }
    } else {
      SettingsUtils.resetCssProperties(subcomponentProperties, cssProperty);
    }
  }

  private static resetCustomFeatures(customFeatureObjectKeys: string[], valueInSetObject: string, subcomponentProperties: SubcomponentProperties,
      mouseClickOptionCallback: (event: ActionsDropdownMouseEventCallbackEvent) => void): void {
    const defaultValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties.defaultCustomFeatures);
    const currentValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties.customFeatures);
    const appropriateTypeDefaultValue = valueInSetObject ? new Set([...(defaultValue as Set<undefined>)]) : defaultValue;
    SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties.customFeatures, appropriateTypeDefaultValue);
    if (mouseClickOptionCallback) { mouseClickOptionCallback({subcomponentProperties,
      previousOptionName: currentValue as string, triggeredOptionName: defaultValue as string, isCustomFeatureResetTriggered: true }); }
  }

  public static resetSubcomponentProperties(options: any, subcomponentProperties: SubcomponentProperties): void {
    options.forEach((option) => {
      const { cssProperty, valueInSetObject, customFeatureObjectKeys, mouseClickOptionCallback } = option.spec;
      if (customFeatureObjectKeys) {
        SettingsUtils.resetCustomFeatures(customFeatureObjectKeys, valueInSetObject, subcomponentProperties, mouseClickOptionCallback);
      } else {
        SettingsUtils.resetCustomCss(subcomponentProperties, cssProperty);
        SettingsUtils.removeAuxiliaryPartialCss(subcomponentProperties, cssProperty);
      }
    });
  }
}
