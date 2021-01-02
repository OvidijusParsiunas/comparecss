import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import { CustomCss } from '../../../../../interfaces/workshopComponent';

interface BorderPropertiesStatus {
  isBorderEmitted: boolean;
}

export default class CleanCss {

  private static retainPseudoCss(customCss: CustomCss, cleanedCss: CustomCss, propertyName: string,
    targetMode: SUB_COMPONENT_CSS_MODES, previousMode: SUB_COMPONENT_CSS_MODES): boolean {
    if (customCss[targetMode] && customCss[targetMode].hasOwnProperty(propertyName)
        && customCss[previousMode][propertyName] !== customCss[targetMode][propertyName]) {
          cleanedCss[targetMode][propertyName] = customCss[targetMode][propertyName];
          return true;
    }
    return false;
  }

  private static cleanPseudoCss(customCss: CustomCss, cleanedCss: CustomCss, propertyName: string): void {
    // attempt to retain the hover value
    if (this.retainPseudoCss(customCss, cleanedCss, propertyName, SUB_COMPONENT_CSS_MODES.HOVER, SUB_COMPONENT_CSS_MODES.DEFAULT)) {
      // if hover value retained, attempt to retain the click value if it is different to hover
      this.retainPseudoCss(customCss, cleanedCss, propertyName, SUB_COMPONENT_CSS_MODES.CLICK, SUB_COMPONENT_CSS_MODES.HOVER)
    } else {
      // if hover value has not been retained, attempt to retain click value if it is different to default
      this.retainPseudoCss(customCss, cleanedCss, propertyName, SUB_COMPONENT_CSS_MODES.CLICK, SUB_COMPONENT_CSS_MODES.DEFAULT)
    }
  }

  private static shouldPropertyBeRemoved(propertyName: string, propertyValue: string, borderPropertiesStatus: BorderPropertiesStatus): boolean {
    switch(propertyName) {
      case 'boxShadow':
        if (propertyValue.startsWith('0px 0px 0px 0px') || propertyValue === 'unset') {
          return true;
        }
        return false;
      case 'borderStyle':
        if (propertyValue === 'none') {
          borderPropertiesStatus.isBorderEmitted = true;
          return true;
        } else if (borderPropertiesStatus.isBorderEmitted) {
          return true;
        }
        return false;
      case 'borderWidth':
        if (propertyValue === '0px') {
          borderPropertiesStatus.isBorderEmitted = true;
          return true;
        } else if (borderPropertiesStatus.isBorderEmitted) {
          return true;
        }
        return false;
      default:
        if (propertyValue === '0px' || propertyValue === 'unset' || propertyValue === '0%') {
          return true;
        }
        return false;
    }
  }

  public static clean(customCss: CustomCss): CustomCss {
    const cleanedCss: CustomCss = {
      [SUB_COMPONENT_CSS_MODES.DEFAULT]: {},
      [SUB_COMPONENT_CSS_MODES.HOVER]: {},
      [SUB_COMPONENT_CSS_MODES.CLICK]: {},
    };
    const borderPropertiesStatus: BorderPropertiesStatus = { isBorderEmitted: false };
    Object.keys(customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]).forEach((propertyName: string) => {
      const defaultPropertyValue = customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][propertyName];
      if (!this.shouldPropertyBeRemoved(propertyName, defaultPropertyValue, borderPropertiesStatus)) {
        cleanedCss[SUB_COMPONENT_CSS_MODES.DEFAULT][propertyName] = defaultPropertyValue;
      }
      this.cleanPseudoCss(customCss, cleanedCss, propertyName);
    });
    // need to do this for other pseudo classes
    if (borderPropertiesStatus.isBorderEmitted && cleanedCss[SUB_COMPONENT_CSS_MODES.DEFAULT].hasOwnProperty('borderColor')) {
      delete cleanedCss[SUB_COMPONENT_CSS_MODES.DEFAULT].borderColor;
    }
    // need to place padding/margin inside one property
    // remove the empty mode objects
    return cleanedCss;
  }
}