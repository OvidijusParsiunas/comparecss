import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { CSS_PROPERTY_VALUES } from '../../../../../consts/cssPropertyValues.enum';
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
    // if the property does not exist, cannot replace it with '0px' because it could be inheriting the value from the previous css pseudo class
    // not shorthanding 3 css properties because the 4th one (left) would not be able to inherit from the previous css pseudo class
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
    Object.keys(cleanedCss).forEach((cssPseudoClass: CSS_PSEUDO_CLASSES) => {
      // https://www.w3schools.com/css/css_margin.asp
      this.shorthandProperties(cleanedCss[cssPseudoClass], { top: 'marginTop', right: 'marginRight', bottom: 'marginBottom', left: 'marginLeft', shorthandProperty: 'margin' });
      // https://www.w3schools.com/css/css_padding.asp
      this.shorthandProperties(cleanedCss[cssPseudoClass], { top: 'paddingTop', right: 'paddingRight', bottom: 'paddingBottom', left: 'paddingLeft', shorthandProperty: 'padding' });
    });
  }

  private static removeUnusedCssPseudoClass(cleanedCss: CustomCss): void {
    Object.keys(cleanedCss).forEach((cssPseudoClass: CSS_PSEUDO_CLASSES) => {
      if (Object.keys(cleanedCss[cssPseudoClass]).length === 0) delete cleanedCss[cssPseudoClass];
    });
  }

  private static getCssValueAppropriateToState(cssPseudoClass: CSS_PSEUDO_CLASSES, customCss: CustomCss, cssPropertyName: string): string | undefined {
    switch (cssPseudoClass) {
      case (CSS_PSEUDO_CLASSES.CLICK):
        if (customCss[CSS_PSEUDO_CLASSES.CLICK] && customCss[CSS_PSEUDO_CLASSES.CLICK].hasOwnProperty(cssPropertyName)) {
          return customCss[CSS_PSEUDO_CLASSES.CLICK][cssPropertyName];
        }
      case (CSS_PSEUDO_CLASSES.HOVER):
        if (customCss[CSS_PSEUDO_CLASSES.HOVER] && customCss[CSS_PSEUDO_CLASSES.HOVER].hasOwnProperty(cssPropertyName)) {
          return customCss[CSS_PSEUDO_CLASSES.HOVER][cssPropertyName];
        }
      case (CSS_PSEUDO_CLASSES.DEFAULT):
        if (customCss[CSS_PSEUDO_CLASSES.DEFAULT] && customCss[CSS_PSEUDO_CLASSES.DEFAULT].hasOwnProperty(cssPropertyName)) {
          return customCss[CSS_PSEUDO_CLASSES.DEFAULT][cssPropertyName];
        }
      default:
        return undefined;
    }
  }

  private static cleanBorderPropertiesForCssPseudoClass(cleanedCss: CustomCss, customCss: CustomCss, cssPseudoClass: CSS_PSEUDO_CLASSES): void {
    if (!cleanedCss[cssPseudoClass]) return;
    // if borderWidth exists then the border must be present and borderStyle is not set to 'none', this is enforced in the UI
    if (cleanedCss[cssPseudoClass].hasOwnProperty('borderWidth')) {
      if (!cleanedCss[cssPseudoClass].hasOwnProperty('borderStyle') && !this.getCssValueAppropriateToState(cssPseudoClass, cleanedCss, 'borderStyle')) {
        cleanedCss[cssPseudoClass].borderStyle = this.getCssValueAppropriateToState(cssPseudoClass, customCss, 'borderStyle');
      }
      if (!cleanedCss[cssPseudoClass].hasOwnProperty('borderColor') && !this.getCssValueAppropriateToState(cssPseudoClass, cleanedCss, 'borderColor')) {
        cleanedCss[cssPseudoClass].borderColor = this.getCssValueAppropriateToState(cssPseudoClass, customCss, 'borderColor');
      }
    } else {
      delete cleanedCss[cssPseudoClass].borderColor;
    }
  }

  private static cleanBorderCss(cleanedCss: CustomCss, customCss: CustomCss): void {
    Object.keys(cleanedCss).forEach((cssPseudoClass: CSS_PSEUDO_CLASSES) => {
      this.cleanBorderPropertiesForCssPseudoClass(cleanedCss, customCss, cssPseudoClass);
    });
  }

  private static retrieveSubcomponentDimensions(customCss: CustomCss, cssPseudoClass: CSS_PSEUDO_CLASSES): SubcomponentDimensions {
    const subcomponentDimensions = { width: 0, paddingLeft: 0, paddingRight: 0, height: 0, paddingTop: 0, paddingBottom: 0 };
    Object.keys(subcomponentDimensions).map((key) => {
      subcomponentDimensions[key] = customCss[cssPseudoClass].hasOwnProperty[key] ? Number.parseInt(customCss[cssPseudoClass][key]) : Number.parseInt(this.getCssValueAppropriateToState(cssPseudoClass, customCss, key));
    })
    return subcomponentDimensions;
  } 

  private static cleanBorderRadiusCss(customCss: CustomCss, cssPseudoClass: CSS_PSEUDO_CLASSES): string {
    // if the subcomponent's dimensions are short (less than 19px) and the border radius is large (more than half of the shortest dimension),
    // change it to 50% in order to fully smoothen it
    const { width, height, paddingLeft, paddingRight, paddingTop, paddingBottom } = this.retrieveSubcomponentDimensions(customCss, cssPseudoClass);
    const { borderRadius } = customCss[cssPseudoClass];
    const totalWidth = width + paddingLeft + paddingRight;
    const totalHeight = height + paddingTop + paddingBottom;
    if (totalWidth > 19 || totalHeight > 19) return;
    const shortestDimension = totalWidth < totalHeight ? totalWidth : totalHeight;
    return Number.parseInt(borderRadius) >= (Math.ceil(shortestDimension / 2)) ? '50%' : borderRadius;
  }
  
  private static retainPseudoCss(customCss: CustomCss, cleanedCss: CustomCss, propertyName: string,
    targetPseudoClass: CSS_PSEUDO_CLASSES, previousPseudoClass: CSS_PSEUDO_CLASSES): boolean {
    if (customCss[targetPseudoClass] && customCss[targetPseudoClass].hasOwnProperty(propertyName)
        && customCss[previousPseudoClass][propertyName] !== customCss[targetPseudoClass][propertyName]) {
          let customCssValue = customCss[targetPseudoClass][propertyName];
          if (propertyName === 'borderRadius') { customCssValue = this.cleanBorderRadiusCss(customCss, targetPseudoClass); }
          cleanedCss[targetPseudoClass][propertyName] = customCssValue;
          return true;
    }
    return false;
  }

  private static cleanPseudoCss(customCss: CustomCss, cleanedCss: CustomCss, propertyName: string): void {
    // attempt to retain the hover value
    if (this.retainPseudoCss(customCss, cleanedCss, propertyName, CSS_PSEUDO_CLASSES.HOVER, CSS_PSEUDO_CLASSES.DEFAULT)) {
      // if hover value retained, attempt to retain the click value if it is different to hover
      this.retainPseudoCss(customCss, cleanedCss, propertyName, CSS_PSEUDO_CLASSES.CLICK, CSS_PSEUDO_CLASSES.HOVER);
    } else {
      this.retainPseudoCss(customCss, cleanedCss, propertyName, CSS_PSEUDO_CLASSES.CLICK, CSS_PSEUDO_CLASSES.DEFAULT);
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
        if (propertyValue.startsWith('0px 0px 0px 0px') || propertyValue === CSS_PROPERTY_VALUES.UNSET) {
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
        if (propertyValue === '0px' || propertyValue === CSS_PROPERTY_VALUES.UNSET || propertyValue === '0%') {
          return false;
        }
        return true;
    }
  }

  private static cleanDefaultCss(customCss: CustomCss, cleanedCss: CustomCss, propertyName: string, borderPropertiesStatus: BorderPropertiesStatus): void {
    let defaultPropertyValue = customCss[CSS_PSEUDO_CLASSES.DEFAULT][propertyName];
    if (this.shouldPropertyBeRetained(propertyName, defaultPropertyValue, borderPropertiesStatus)) {
      if (propertyName === 'borderRadius') { defaultPropertyValue = this.cleanBorderRadiusCss(customCss, CSS_PSEUDO_CLASSES.DEFAULT); }
      cleanedCss[CSS_PSEUDO_CLASSES.DEFAULT][propertyName] = defaultPropertyValue;
    }
  }

  public static clean(customCss: CustomCss): CustomCss {
    const cleanedCss: CustomCss = {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {},
      [CSS_PSEUDO_CLASSES.HOVER]: {},
      [CSS_PSEUDO_CLASSES.CLICK]: {},
    };
    const defultBorderPropertiesStatus: BorderPropertiesStatus = { areBorderPropertiesRetained: true };
    Object.keys(customCss[CSS_PSEUDO_CLASSES.DEFAULT]).forEach((propertyName: string) => {
      this.cleanDefaultCss(customCss, cleanedCss, propertyName, defultBorderPropertiesStatus);
      this.cleanPseudoCss(customCss, cleanedCss, propertyName);
    });
    this.removeUnusedCssPseudoClass(cleanedCss);
    this.cleanBorderCss(cleanedCss, customCss);
    this.shorthandCss(cleanedCss);
    return cleanedCss;
  }
}
