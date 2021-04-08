import { ActionsDropdownMouseEventCallbackEvent } from '../../../../../../interfaces/actionsDropdownMouseEventCallbacks';
import { CSS_PSEUDO_CLASSES } from '../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import SharedUtils from './sharedUtils';

export default class SettingsUtils {

  private static removeAuxiliaryPartialCss(subcomponentProperties: SubcomponentProperties, cssProperty: string): void {
    const { auxiliaryPartialCss, activeCssPseudoClass } = subcomponentProperties;
    if (auxiliaryPartialCss && auxiliaryPartialCss[activeCssPseudoClass] && auxiliaryPartialCss[activeCssPseudoClass][cssProperty]) {
      delete auxiliaryPartialCss[activeCssPseudoClass][cssProperty];
    }
  }

  private static resetCssProperties(subcomponentProperties: SubcomponentProperties, cssProperty: string): void {
    const { customCss, initialCss, activeCssPseudoClass } = subcomponentProperties;
    if (initialCss[activeCssPseudoClass] && initialCss[activeCssPseudoClass][cssProperty]) {
      const cssValue = initialCss[activeCssPseudoClass][cssProperty];
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
    const { initialCss, activeCssPseudoClass } = subcomponentProperties;
    if (activeCssPseudoClass === CSS_PSEUDO_CLASSES.DEFAULT) {
      if (initialCss[CSS_PSEUDO_CLASSES.DEFAULT][cssProperty]) {
        const cssValue = initialCss[CSS_PSEUDO_CLASSES.DEFAULT][cssProperty];
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
