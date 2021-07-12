import { CustomCss, CustomFeatures, CustomStaticFeatures, SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import GeneralUtils from '../../../../../../services/workshop/exportFiles/contentBuilders/css/generalUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';

export default class SharedUtils {

  public static getActiveModeCssPropertyValue(customCss: CustomCss, activeMode: CSS_PSEUDO_CLASSES, cssProperty: string): string {
    // the following allows multiple cases to be checked in one execution
    if (!customCss) return undefined;
    switch (activeMode) {
      case (CSS_PSEUDO_CLASSES.CLICK):
        if (customCss[CSS_PSEUDO_CLASSES.CLICK] && customCss[CSS_PSEUDO_CLASSES.CLICK].hasOwnProperty(cssProperty)) {
          return customCss[CSS_PSEUDO_CLASSES.CLICK][cssProperty];
        }
      case (CSS_PSEUDO_CLASSES.HOVER):
        if (customCss[CSS_PSEUDO_CLASSES.HOVER] && customCss[CSS_PSEUDO_CLASSES.HOVER].hasOwnProperty(cssProperty)) {
          return customCss[CSS_PSEUDO_CLASSES.HOVER][cssProperty];
        }
      case (CSS_PSEUDO_CLASSES.DEFAULT):
        if (customCss[CSS_PSEUDO_CLASSES.DEFAULT] && customCss[CSS_PSEUDO_CLASSES.DEFAULT].hasOwnProperty(cssProperty)) {
          return customCss[CSS_PSEUDO_CLASSES.DEFAULT][cssProperty];
        }
      default:
        return undefined;
    }
  }

  private static traverseCustomFeatureValueObject(customFeatureObjectKeys: string[], customFeatures: CustomFeatures|CustomStaticFeatures,
      newValue?: unknown): unknown {
    if (newValue !== undefined) {
      if (customFeatureObjectKeys.length === 1) {
        return customFeatures[customFeatureObjectKeys[0]] = newValue;
      }
    } else {
      if (customFeatureObjectKeys.length === 0) {
        return customFeatures;
      }
    }
    const innerCustomFeaturesObject = customFeatures[customFeatureObjectKeys[0]];
    const newCustomFeatureObjectKeysArray = customFeatureObjectKeys.slice(1, customFeatureObjectKeys.length);
    return SharedUtils.traverseCustomFeatureValueObject(newCustomFeatureObjectKeysArray, innerCustomFeaturesObject, newValue);
  }

  public static getCustomFeatureValue(customFeatureObjectKeys: string[], customFeatures: CustomFeatures|CustomStaticFeatures): unknown {
    return SharedUtils.traverseCustomFeatureValueObject(customFeatureObjectKeys.slice(1, customFeatureObjectKeys.length), customFeatures);
  }

  public static setCustomFeatureValue(customFeatureObjectKeys: string[], subcomponentProperties: SubcomponentProperties|CustomFeatures,
      newValue: unknown): void {
    const keys = customFeatureObjectKeys;
    SharedUtils.traverseCustomFeatureValueObject(keys.slice(1, keys.length), subcomponentProperties[keys[0]], newValue);
  }

  public static setCustomFeatureSetting(trigger: any, subcomponentProperties: SubcomponentProperties, allSettings: any): void {
    const { customFeatureObjectKeys, defaultValue } = trigger;
    for (let i = 0; i < allSettings.options.length; i += 1) {
      if (GeneralUtils.areArraysEqual(allSettings.options[i].spec.customFeatureObjectKeys, customFeatureObjectKeys)) {
        allSettings.options[i].spec.default = defaultValue;
        SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties, defaultValue);
        return;
      }
    }
  }
  
  public static convertAlphaDecimalToHexString(decimaAlpha: number): string {
    const hexAlpha = Math.round(decimaAlpha * 255).toString(16);
    return hexAlpha.length === 1 ? '0' + hexAlpha : hexAlpha;
  }

  public static addDefaultValueIfCssModeMissing(cssPropertyName: string, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(subcomponentProperties.customCss, activeCssPseudoClass, cssPropertyName);
    if (!customCss[activeCssPseudoClass]) {
      customCss[activeCssPseudoClass] = { [cssPropertyName]: cssPropertyValue };
    } else if (!customCss[activeCssPseudoClass][cssPropertyName]) {
      customCss[activeCssPseudoClass][cssPropertyName] = cssPropertyValue;
    }
  }
}
