import { CustomCss, CustomFeatures, SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import GeneralUtils from '../../../../../../services/workshop/exportFiles/contentBuilders/css/generalUtils';
import { CSS_STATES } from '../../../../../../consts/subcomponentCssStates.enum';

export default class SharedUtils {
  
  public static getActiveModeCssPropertyValue(css: CustomCss, activeMode: CSS_STATES, cssProperty: string): string {
    // the following allows multiple cases to be checked in one execution
    if (!css) return undefined;
    switch (activeMode) {
      case (CSS_STATES.CLICK):
        if (css[CSS_STATES.CLICK] && css[CSS_STATES.CLICK].hasOwnProperty(cssProperty)) {
          return css[CSS_STATES.CLICK][cssProperty];
        }
      case (CSS_STATES.HOVER):
        if (css[CSS_STATES.HOVER] && css[CSS_STATES.HOVER].hasOwnProperty(cssProperty)) {
          return css[CSS_STATES.HOVER][cssProperty];
        }
      case (CSS_STATES.DEFAULT):
        if (css[CSS_STATES.DEFAULT] && css[CSS_STATES.DEFAULT].hasOwnProperty(cssProperty)) {
          return css[CSS_STATES.DEFAULT][cssProperty];
        }
      default:
        return undefined;
    }
  }

  public static getCustomFeatureValue(customFeatureObjectKeys: string[], customFeatures: CustomFeatures): unknown {
    if (customFeatureObjectKeys.length === 0) {
      return customFeatures;
    }
    const innerCustomFeaturesObject = customFeatures[customFeatureObjectKeys[0]];
    const newCustomFeatureObjectKeysArray = customFeatureObjectKeys.slice(1, customFeatureObjectKeys.length);
    return SharedUtils.getCustomFeatureValue(newCustomFeatureObjectKeysArray, innerCustomFeaturesObject);
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
    const { customCss, activeCssState } = subcomponentProperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(subcomponentProperties.customCss, activeCssState, cssPropertyName);
    if (!customCss[activeCssState]) {
      customCss[activeCssState] = { [cssPropertyName]: cssPropertyValue };
    } else if (!customCss[activeCssState][cssPropertyName]) {
      customCss[activeCssState][cssPropertyName] = cssPropertyValue;
    }
  }
}
