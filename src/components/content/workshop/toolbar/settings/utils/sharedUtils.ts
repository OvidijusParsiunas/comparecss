import GeneralUtils from '../../../../../../services/workshop/exportFiles/contentBuilders/css/generalUtils';
import { CustomCss, SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
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

  public static getSubcomponentPropertyValue(subcomponentPropertyObjectKeys: string[], currentObject: unknown): unknown {
    if (subcomponentPropertyObjectKeys.length === 0) {
      return currentObject;
    } else {
      const nestedObject = currentObject[subcomponentPropertyObjectKeys[0]];
      const newSubcomponentPropertiesObjectKeysArray = subcomponentPropertyObjectKeys.slice(1, subcomponentPropertyObjectKeys.length);
      return SharedUtils.getSubcomponentPropertyValue(newSubcomponentPropertiesObjectKeysArray, nestedObject);
    }
  }

  public static setSubcomponentPropertyValue(subcomponentPropertyObjectKeys: string[], currentObject: unknown, newValue: unknown): void {
    if (subcomponentPropertyObjectKeys.length === 1) {
      currentObject[subcomponentPropertyObjectKeys[0]] = newValue;
    } else {
      const nestedObject = currentObject[subcomponentPropertyObjectKeys[0]];
      const newSubcomponentPropertiesObjectKeysArray = subcomponentPropertyObjectKeys.slice(1, subcomponentPropertyObjectKeys.length);
      SharedUtils.setSubcomponentPropertyValue(newSubcomponentPropertiesObjectKeysArray, nestedObject, newValue);
    }
  }

  public static setSubcomponentPropertyValueSetting(trigger: any, subcomponentProperties: SubcomponentProperties, allSettings: any): void {
    const { subcomponentPropertyObjectKeys, defaultValue } = trigger;
    for (let i = 0; i < allSettings.options.length; i += 1) {
      if (GeneralUtils.areArraysEqual(allSettings.options[i].spec.subcomponentPropertyObjectKeys, subcomponentPropertyObjectKeys)) {
        allSettings.options[i].spec.default = defaultValue;
        SharedUtils.setSubcomponentPropertyValue(subcomponentPropertyObjectKeys, subcomponentProperties, defaultValue);
        return;
      }
    }
  }
  
  public static convertAlphaDecimalToHexString(decimaAlpha: number): string {
    const hexAlpha = Math.round(decimaAlpha * 255).toString(16);
    return hexAlpha.length === 1 ? '0' + hexAlpha : hexAlpha;
  }
}
