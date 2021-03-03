import { CustomCss, CustomFeatures, SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import GeneralUtils from '../../../../../../services/workshop/exportFiles/contentBuilders/css/generalUtils';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../consts/subcomponentCssModes.enum';

export default class SharedUtils {
  
  public static getActiveModeCssPropertyValue(css: CustomCss, activeMode: SUB_COMPONENT_CSS_MODES, cssProperty: string): string {
    // the following allows multiple cases to be checked in one execution
    if (!css) return undefined;
    switch (activeMode) {
      case (SUB_COMPONENT_CSS_MODES.CLICK):
        if (css[SUB_COMPONENT_CSS_MODES.CLICK] && css[SUB_COMPONENT_CSS_MODES.CLICK].hasOwnProperty(cssProperty)) {
          return css[SUB_COMPONENT_CSS_MODES.CLICK][cssProperty];
        }
      case (SUB_COMPONENT_CSS_MODES.HOVER || SUB_COMPONENT_CSS_MODES.CLICK):
        if (css[SUB_COMPONENT_CSS_MODES.HOVER] && css[SUB_COMPONENT_CSS_MODES.HOVER].hasOwnProperty(cssProperty)) {
          return css[SUB_COMPONENT_CSS_MODES.HOVER][cssProperty];
        }
      case (SUB_COMPONENT_CSS_MODES.DEFAULT || SUB_COMPONENT_CSS_MODES.HOVER || SUB_COMPONENT_CSS_MODES.CLICK):
        if (css[SUB_COMPONENT_CSS_MODES.DEFAULT] && css[SUB_COMPONENT_CSS_MODES.DEFAULT].hasOwnProperty(cssProperty)) {
          return css[SUB_COMPONENT_CSS_MODES.DEFAULT][cssProperty];
        }
      default:
        return undefined;
    }
  }

  public static getCustomFeatureValue(customFeatureObjectKeys: string[], customFeatures: CustomFeatures): unknown {
    if (customFeatureObjectKeys.length === 0) {
      return customFeatures;
    } else {
      const innerCustomFeaturesObject = customFeatures[customFeatureObjectKeys[0]];
      const newCustomFeatureObjectKeysArray = customFeatureObjectKeys.slice(1, customFeatureObjectKeys.length);
      return SharedUtils.getCustomFeatureValue(newCustomFeatureObjectKeysArray, innerCustomFeaturesObject);
    }
  }

  public static setCustomFeatureValue(customFeatureObjectKeys: string[], customFeatures: CustomFeatures, newValue: unknown): void {
    if (customFeatureObjectKeys.length === 1) {
      customFeatures[customFeatureObjectKeys[0]] = newValue;
    } else {
      const innerCustomFeaturesObject = customFeatures[customFeatureObjectKeys[0]];
      const newCustomFeatureObjectKeysArray = customFeatureObjectKeys.slice(1, customFeatureObjectKeys.length);
      SharedUtils.setCustomFeatureValue(newCustomFeatureObjectKeysArray, innerCustomFeaturesObject, newValue);
    }
  }

  public static setCustomFeatureSetting(trigger: any, customFeatures: CustomFeatures, allSettings: any): void {
    const { customFeatureObjectKeys, defaultValue } = trigger;
    for (let i = 0; i < allSettings.options.length; i += 1) {
      if (GeneralUtils.areArraysEqual(allSettings.options[i].spec.customFeatureObjectKeys, customFeatureObjectKeys)) {
        allSettings.options[i].spec.default = defaultValue;
        SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, customFeatures, defaultValue);
        return;
      }
    }
  }
  
  public static convertAlphaDecimalToHexString(decimaAlpha: number): string {
    const hexAlpha = Math.round(decimaAlpha * 255).toString(16);
    return hexAlpha.length === 1 ? '0' + hexAlpha : hexAlpha;
  }

  public static addDefaultValueIfCssModeMissing(cssPropertyName: string, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, customCssActiveMode } = subcomponentProperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(subcomponentProperties.customCss, customCssActiveMode, cssPropertyName);
    if (!customCss[customCssActiveMode]) {
      customCss[customCssActiveMode] = { [cssPropertyName]: cssPropertyValue };
    } else if (!customCss[customCssActiveMode][cssPropertyName]) {
      customCss[customCssActiveMode][cssPropertyName] = cssPropertyValue;
    }
  }
}
