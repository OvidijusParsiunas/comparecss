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

  private static resetCustomFeatures(customFeatureObjectKeys: string[], valueInSetObject: string, subcomponentProperties: SubcomponentProperties,
      mouseClickOptionCallback: (event: ActionsDropdownMouseEventCallbackEvent) => void): void {
    const defaultValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties.defaultCustomFeatures);
    const currentValue = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties.customFeatures);
    if (valueInSetObject) {
      SettingsUtils.resetSetObject(currentValue as Set<undefined>, defaultValue as Set<undefined>)
    } else {
      SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties.customFeatures, defaultValue);
      // only used for actions dropdown
      if (mouseClickOptionCallback) { mouseClickOptionCallback({subcomponentProperties,
        previousOptionName: currentValue as string, triggeredOptionName: defaultValue as string, isCustomFeatureResetTriggered: true }); }
    }
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
