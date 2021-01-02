import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import { CustomCss } from '../../../../../interfaces/workshopComponent';

interface BorderPropertiesStatus {
  areBorderPropertiesRetained: boolean;
}

export default class CleanCss {

  private static removeUnusedCssModes(cleanCss: CustomCss): void {
    Object.keys(cleanCss).forEach((cssMode: SUB_COMPONENT_CSS_MODES) => {
      console.log(`deleting ${cssMode}`);
      if (Object.keys(cleanCss[cssMode]).length === 0) delete cleanCss[cssMode];
    });
  }

  private static getCssValueAppropriateToMode(cssMode: SUB_COMPONENT_CSS_MODES, customCss: CustomCss, cssProperty: string): string | undefined {
    switch (cssMode) {
      case (SUB_COMPONENT_CSS_MODES.CLICK):
        if (customCss[SUB_COMPONENT_CSS_MODES.CLICK] && customCss[SUB_COMPONENT_CSS_MODES.CLICK].hasOwnProperty(cssProperty)) {
          return customCss[SUB_COMPONENT_CSS_MODES.CLICK][cssProperty];
        }
      case (SUB_COMPONENT_CSS_MODES.HOVER || SUB_COMPONENT_CSS_MODES.CLICK):
        if (customCss[SUB_COMPONENT_CSS_MODES.HOVER] && customCss[SUB_COMPONENT_CSS_MODES.HOVER].hasOwnProperty(cssProperty)) {
          return customCss[SUB_COMPONENT_CSS_MODES.HOVER][cssProperty];
        }
      case (SUB_COMPONENT_CSS_MODES.DEFAULT || SUB_COMPONENT_CSS_MODES.HOVER || SUB_COMPONENT_CSS_MODES.CLICK):
        if (customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] && customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].hasOwnProperty(cssProperty)) {
          return customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][cssProperty];
        }
      default:
        return undefined;
    }
  }

  private static cleanBorderPropertiesForCssMode(cleanedCss: CustomCss, customCss: CustomCss, cssMode: SUB_COMPONENT_CSS_MODES): void {
    if (!cleanedCss[cssMode]) return;
    // if borderWidth exists - then the border must be present and borderStyle is not set to 'none', this is enforced by the UI 
    if (cleanedCss[cssMode].hasOwnProperty('borderWidth')) {
      if (!cleanedCss[cssMode].hasOwnProperty('borderStyle') && !this.getCssValueAppropriateToMode(cssMode, cleanedCss, 'borderStyle')) {
        cleanedCss[cssMode].borderStyle = this.getCssValueAppropriateToMode(cssMode, customCss, 'borderStyle');
      }
      if (!cleanedCss[cssMode].hasOwnProperty('borderColor') && !this.getCssValueAppropriateToMode(cssMode, cleanedCss, 'borderColor')) {
        cleanedCss[cssMode].borderColor = this.getCssValueAppropriateToMode(cssMode, customCss, 'borderColor');
      }
    } else {
      delete cleanedCss[cssMode].borderColor;
    }
  }

  private static cleanBorderCss(cleanedCss: CustomCss, customCss: CustomCss): void {
    Object.values(SUB_COMPONENT_CSS_MODES).forEach((cssMode) => {
      this.cleanBorderPropertiesForCssMode(cleanedCss, customCss, cssMode);
    });
  }
  
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
      this.retainPseudoCss(customCss, cleanedCss, propertyName, SUB_COMPONENT_CSS_MODES.CLICK, SUB_COMPONENT_CSS_MODES.HOVER);
    } else {
      this.retainPseudoCss(customCss, cleanedCss, propertyName, SUB_COMPONENT_CSS_MODES.CLICK, SUB_COMPONENT_CSS_MODES.DEFAULT);
    }
  }

  private static shouldPropertyBeRetained(propertyName: string, propertyValue: string, borderPropertiesStatus: BorderPropertiesStatus): boolean {
    switch(propertyName) {
      case 'boxShadow':
        if (propertyValue.startsWith('0px 0px 0px 0px') || propertyValue === 'unset') {
          return false;
        }
        return true;
      case 'borderStyle':
        if (propertyValue === 'none') {
          borderPropertiesStatus.areBorderPropertiesRetained = false;
          return false;
        } else if (!borderPropertiesStatus.areBorderPropertiesRetained) {
          return false;
        }
        return true;
      case 'borderWidth':
        if (propertyValue === '0px') {
          borderPropertiesStatus.areBorderPropertiesRetained = false;
          return false;
        } else if (!borderPropertiesStatus.areBorderPropertiesRetained) {
          return false;
        }
        return true;
      default:
        if (propertyValue === '0px' || propertyValue === 'unset' || propertyValue === '0%') {
          return false;
        }
        return true;
    }
  }

  private static cleanDefaultCss(customCss: CustomCss, cleanedCss: CustomCss, propertyName: string, borderPropertiesStatus: BorderPropertiesStatus): void {
    const defaultPropertyValue = customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][propertyName];
    if (this.shouldPropertyBeRetained(propertyName, defaultPropertyValue, borderPropertiesStatus)) {
      cleanedCss[SUB_COMPONENT_CSS_MODES.DEFAULT][propertyName] = defaultPropertyValue;
    }
  }

  public static clean(customCss: CustomCss): CustomCss {
    const cleanedCss: CustomCss = {
      [SUB_COMPONENT_CSS_MODES.DEFAULT]: {},
      [SUB_COMPONENT_CSS_MODES.HOVER]: {},
      [SUB_COMPONENT_CSS_MODES.CLICK]: {},
    };
    const defultBorderPropertiesStatus: BorderPropertiesStatus = { areBorderPropertiesRetained: true };
    Object.keys(customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]).forEach((propertyName: string) => {
      this.cleanDefaultCss(customCss, cleanedCss, propertyName, defultBorderPropertiesStatus);
      this.cleanPseudoCss(customCss, cleanedCss, propertyName);
    });
    this.removeUnusedCssModes(cleanedCss);
    this.cleanBorderCss(cleanedCss, customCss);
    console.log(cleanedCss);
    // need to place padding/margin inside one property
    // remove the empty mode objects
    return cleanedCss;
  }
}
