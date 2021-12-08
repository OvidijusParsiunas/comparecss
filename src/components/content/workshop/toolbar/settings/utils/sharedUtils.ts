import GeneralUtils from '../../../../../../services/workshop/exportFiles/contentBuilders/css/generalUtils';
import { CustomFeaturesUtils } from '../../../utils/componentManipulation/utils/customFeaturesUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { CustomCss, Subcomponent } from '../../../../../../interfaces/workshopComponent';
import { CSS_PROPERTY_VALUES } from '../../../../../../consts/cssPropertyValues.enum';

export default class SharedUtils {

  public static getActiveModeCssPropertyValue(customCss: CustomCss, activeMode: CSS_PSEUDO_CLASSES, cssProperty: string): string {
    // the following allows multiple cases to be checked in one execution
    if (!customCss) return undefined;
    switch (activeMode) {
      case (CSS_PSEUDO_CLASSES.CLICK):
        if (customCss[CSS_PSEUDO_CLASSES.CLICK] && customCss[CSS_PSEUDO_CLASSES.CLICK].hasOwnProperty(cssProperty)
            && customCss[CSS_PSEUDO_CLASSES.CLICK][cssProperty] !== CSS_PROPERTY_VALUES.INHERIT) {
          return customCss[CSS_PSEUDO_CLASSES.CLICK][cssProperty];
        }
      case (CSS_PSEUDO_CLASSES.HOVER):
        if (customCss[CSS_PSEUDO_CLASSES.HOVER] && customCss[CSS_PSEUDO_CLASSES.HOVER].hasOwnProperty(cssProperty)
            && customCss[CSS_PSEUDO_CLASSES.HOVER][cssProperty] !== CSS_PROPERTY_VALUES.INHERIT) {
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

  public static setCustomFeatureSetting(trigger: any, subcomponent: Subcomponent, allSettings: any): void {
    const { customFeatureObjectKeys, defaultValue } = trigger;
    for (let i = 0; i < allSettings.options.length; i += 1) {
      if (GeneralUtils.areArraysEqual(allSettings.options[i].spec.customFeatureObjectKeys, customFeatureObjectKeys)) {
        allSettings.options[i].spec.default = defaultValue;
        CustomFeaturesUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponent, defaultValue);
        return;
      }
    }
  }

  public static convertAlphaDecimalToHexString(decimaAlpha: number): string {
    const hexAlpha = Math.round(decimaAlpha * 255).toString(16);
    return hexAlpha.length === 1 ? '0' + hexAlpha : hexAlpha;
  }

  public static addDefaultValueIfCssModeMissing(cssPropertyName: string, subcomponent: Subcomponent): void {
    const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(subcomponent.customCss, activeCssPseudoClassesDropdownItem, cssPropertyName);
    if (!customCss[activeCssPseudoClassesDropdownItem]) {
      customCss[activeCssPseudoClassesDropdownItem] = { [cssPropertyName]: cssPropertyValue };
    } else if (!customCss[activeCssPseudoClassesDropdownItem][cssPropertyName]) {
      customCss[activeCssPseudoClassesDropdownItem][cssPropertyName] = cssPropertyValue;
    }
  }
}
