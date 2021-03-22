import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { CustomCss } from '../../../../../interfaces/workshopComponent';

interface BorderPropertiesStatus {
  areBorderPropertiesRetained: boolean;
}

interface ShorthandPropertyNames {
  top: string;
  right: string;
  bottom: string;
  left: string;
  shorthandProperty: string;
}

interface SubcomponentDimensions {
  width: number;
  paddingLeft: number;
  paddingRight: number;
  height: number;
  paddingTop: number;
  paddingBottom: number;
}

export default class CssCleaner {

  private static shorthandProperties(css: WorkshopComponentCss, properties: ShorthandPropertyNames): void {
    // if the property does not exist, cannot replace it with '0px' because it could be inheriting the value from the previous css mode
    // not shorthanding 3 css properties because the 4th one (left) would not be able to inherit from the previous css mode
    const { top, right, bottom, left, shorthandProperty } = properties;
    if (css[top] && css[right] && css[bottom] && css[left]) {
      if (css[top] === css[bottom] && css[left] === css[right]) {
        if (css[top] === css[right]) {
          css[shorthandProperty] = css[top];
        } else {
          css[shorthandProperty] = `${css[top]} ${css[right]}`;
        }
      } else {
        css[shorthandProperty] = `${css[top]} ${css[right]} ${css[bottom]} ${css[left]}`;
      }
      delete css[top];
      delete css[right];
      delete css[bottom];
      delete css[left];
    }
  }

  private static shorthandCss(cleanedCss: CustomCss): void {
    Object.keys(cleanedCss).forEach((cssMode: SUB_COMPONENT_CSS_MODES) => {
      // https://www.w3schools.com/css/css_margin.asp
      this.shorthandProperties(cleanedCss[cssMode], { top: 'marginTop', right: 'marginRight', bottom: 'marginBottom', left: 'marginLeft', shorthandProperty: 'margin' });
      // https://www.w3schools.com/css/css_padding.asp
      this.shorthandProperties(cleanedCss[cssMode], { top: 'paddingTop', right: 'paddingRight', bottom: 'paddingBottom', left: 'paddingLeft', shorthandProperty: 'padding' });
    });
  }

  private static removeUnusedCssModes(cleanedCss: CustomCss): void {
    Object.keys(cleanedCss).forEach((cssMode: SUB_COMPONENT_CSS_MODES) => {
      if (Object.keys(cleanedCss[cssMode]).length === 0) delete cleanedCss[cssMode];
    });
  }

  private static getCssValueAppropriateToMode(cssMode: SUB_COMPONENT_CSS_MODES, customCss: CustomCss, cssPropertyName: string): string | undefined {
    switch (cssMode) {
      case (SUB_COMPONENT_CSS_MODES.CLICK):
        if (customCss[SUB_COMPONENT_CSS_MODES.CLICK] && customCss[SUB_COMPONENT_CSS_MODES.CLICK].hasOwnProperty(cssPropertyName)) {
          return customCss[SUB_COMPONENT_CSS_MODES.CLICK][cssPropertyName];
        }
      case (SUB_COMPONENT_CSS_MODES.HOVER):
        if (customCss[SUB_COMPONENT_CSS_MODES.HOVER] && customCss[SUB_COMPONENT_CSS_MODES.HOVER].hasOwnProperty(cssPropertyName)) {
          return customCss[SUB_COMPONENT_CSS_MODES.HOVER][cssPropertyName];
        }
      case (SUB_COMPONENT_CSS_MODES.DEFAULT):
        if (customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] && customCss[SUB_COMPONENT_CSS_MODES.DEFAULT].hasOwnProperty(cssPropertyName)) {
          return customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][cssPropertyName];
        }
      default:
        return undefined;
    }
  }

  private static cleanBorderPropertiesForCssMode(cleanedCss: CustomCss, customCss: CustomCss, cssMode: SUB_COMPONENT_CSS_MODES): void {
    if (!cleanedCss[cssMode]) return;
    // if borderWidth exists then the border must be present and borderStyle is not set to 'none', this is enforced in the UI
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
    Object.keys(cleanedCss).forEach((cssMode: SUB_COMPONENT_CSS_MODES) => {
      this.cleanBorderPropertiesForCssMode(cleanedCss, customCss, cssMode);
    });
  }

  private static retrieveSubcomponentDimensions(customCss: CustomCss, cssMode: SUB_COMPONENT_CSS_MODES): SubcomponentDimensions {
    const subcomponentDimensions = { width: 0, paddingLeft: 0, paddingRight: 0, height: 0, paddingTop: 0, paddingBottom: 0 };
    Object.keys(subcomponentDimensions).map((key) => {
      subcomponentDimensions[key] = customCss[cssMode].hasOwnProperty[key] ? Number.parseInt(customCss[cssMode][key]) : Number.parseInt(this.getCssValueAppropriateToMode(cssMode, customCss, key));
    })
    return subcomponentDimensions;
  } 

  private static cleanBorderRadiusCss(customCss: CustomCss, cssMode: SUB_COMPONENT_CSS_MODES): string {
    // if the subcomponent's dimensions are short (less than 19px) and the border radius is large (more than half of the shortest dimension),
    // change it to 50% in order to fully smoothen it
    const { width, height, paddingLeft, paddingRight, paddingTop, paddingBottom } = this.retrieveSubcomponentDimensions(customCss, cssMode);
    const { borderRadius } = customCss[cssMode];
    const totalWidth = width + paddingLeft + paddingRight;
    const totalHeight = height + paddingTop + paddingBottom;
    if (totalWidth > 19 || totalHeight > 19) return;
    const shortestDimension = totalWidth < totalHeight ? totalWidth : totalHeight;
    return Number.parseInt(borderRadius) >= (Math.ceil(shortestDimension / 2)) ? '50%' : borderRadius;
  }
  
  private static retainPseudoCss(customCss: CustomCss, cleanedCss: CustomCss, propertyName: string,
    targetMode: SUB_COMPONENT_CSS_MODES, previousMode: SUB_COMPONENT_CSS_MODES): boolean {
    if (customCss[targetMode] && customCss[targetMode].hasOwnProperty(propertyName)
        && customCss[previousMode][propertyName] !== customCss[targetMode][propertyName]) {
          let customCssValue = customCss[targetMode][propertyName];
          if (propertyName === 'borderRadius') { customCssValue = this.cleanBorderRadiusCss(customCss, targetMode); }
          cleanedCss[targetMode][propertyName] = customCssValue;
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
      case 'paddingTop':
      case 'paddingRight':
      case 'paddingBottom':
      case 'paddingLeft':
        return true;
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
          return true;
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
    let defaultPropertyValue = customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][propertyName];
    if (this.shouldPropertyBeRetained(propertyName, defaultPropertyValue, borderPropertiesStatus)) {
      if (propertyName === 'borderRadius') { defaultPropertyValue = this.cleanBorderRadiusCss(customCss, SUB_COMPONENT_CSS_MODES.DEFAULT); }
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
    this.shorthandCss(cleanedCss);
    return cleanedCss;
  }
}
