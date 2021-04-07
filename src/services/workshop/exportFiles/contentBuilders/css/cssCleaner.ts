import { CSS_STATES } from '../../../../../consts/subcomponentCssStates.enum';
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
    Object.keys(cleanedCss).forEach((cssState: CSS_STATES) => {
      // https://www.w3schools.com/css/css_margin.asp
      this.shorthandProperties(cleanedCss[cssState], { top: 'marginTop', right: 'marginRight', bottom: 'marginBottom', left: 'marginLeft', shorthandProperty: 'margin' });
      // https://www.w3schools.com/css/css_padding.asp
      this.shorthandProperties(cleanedCss[cssState], { top: 'paddingTop', right: 'paddingRight', bottom: 'paddingBottom', left: 'paddingLeft', shorthandProperty: 'padding' });
    });
  }

  private static removeUnusedCssStates(cleanedCss: CustomCss): void {
    Object.keys(cleanedCss).forEach((cssState: CSS_STATES) => {
      if (Object.keys(cleanedCss[cssState]).length === 0) delete cleanedCss[cssState];
    });
  }

  private static getCssValueAppropriateToMode(cssState: CSS_STATES, customCss: CustomCss, cssPropertyName: string): string | undefined {
    switch (cssState) {
      case (CSS_STATES.CLICK):
        if (customCss[CSS_STATES.CLICK] && customCss[CSS_STATES.CLICK].hasOwnProperty(cssPropertyName)) {
          return customCss[CSS_STATES.CLICK][cssPropertyName];
        }
      case (CSS_STATES.HOVER):
        if (customCss[CSS_STATES.HOVER] && customCss[CSS_STATES.HOVER].hasOwnProperty(cssPropertyName)) {
          return customCss[CSS_STATES.HOVER][cssPropertyName];
        }
      case (CSS_STATES.DEFAULT):
        if (customCss[CSS_STATES.DEFAULT] && customCss[CSS_STATES.DEFAULT].hasOwnProperty(cssPropertyName)) {
          return customCss[CSS_STATES.DEFAULT][cssPropertyName];
        }
      default:
        return undefined;
    }
  }

  private static cleanBorderPropertiesForCssState(cleanedCss: CustomCss, customCss: CustomCss, cssState: CSS_STATES): void {
    if (!cleanedCss[cssState]) return;
    // if borderWidth exists then the border must be present and borderStyle is not set to 'none', this is enforced in the UI
    if (cleanedCss[cssState].hasOwnProperty('borderWidth')) {
      if (!cleanedCss[cssState].hasOwnProperty('borderStyle') && !this.getCssValueAppropriateToMode(cssState, cleanedCss, 'borderStyle')) {
        cleanedCss[cssState].borderStyle = this.getCssValueAppropriateToMode(cssState, customCss, 'borderStyle');
      }
      if (!cleanedCss[cssState].hasOwnProperty('borderColor') && !this.getCssValueAppropriateToMode(cssState, cleanedCss, 'borderColor')) {
        cleanedCss[cssState].borderColor = this.getCssValueAppropriateToMode(cssState, customCss, 'borderColor');
      }
    } else {
      delete cleanedCss[cssState].borderColor;
    }
  }

  private static cleanBorderCss(cleanedCss: CustomCss, customCss: CustomCss): void {
    Object.keys(cleanedCss).forEach((cssState: CSS_STATES) => {
      this.cleanBorderPropertiesForCssState(cleanedCss, customCss, cssState);
    });
  }

  private static retrieveSubcomponentDimensions(customCss: CustomCss, cssState: CSS_STATES): SubcomponentDimensions {
    const subcomponentDimensions = { width: 0, paddingLeft: 0, paddingRight: 0, height: 0, paddingTop: 0, paddingBottom: 0 };
    Object.keys(subcomponentDimensions).map((key) => {
      subcomponentDimensions[key] = customCss[cssState].hasOwnProperty[key] ? Number.parseInt(customCss[cssState][key]) : Number.parseInt(this.getCssValueAppropriateToMode(cssState, customCss, key));
    })
    return subcomponentDimensions;
  } 

  private static cleanBorderRadiusCss(customCss: CustomCss, cssState: CSS_STATES): string {
    // if the subcomponent's dimensions are short (less than 19px) and the border radius is large (more than half of the shortest dimension),
    // change it to 50% in order to fully smoothen it
    const { width, height, paddingLeft, paddingRight, paddingTop, paddingBottom } = this.retrieveSubcomponentDimensions(customCss, cssState);
    const { borderRadius } = customCss[cssState];
    const totalWidth = width + paddingLeft + paddingRight;
    const totalHeight = height + paddingTop + paddingBottom;
    if (totalWidth > 19 || totalHeight > 19) return;
    const shortestDimension = totalWidth < totalHeight ? totalWidth : totalHeight;
    return Number.parseInt(borderRadius) >= (Math.ceil(shortestDimension / 2)) ? '50%' : borderRadius;
  }
  
  private static retainPseudoCss(customCss: CustomCss, cleanedCss: CustomCss, propertyName: string,
    targetMode: CSS_STATES, previousMode: CSS_STATES): boolean {
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
    if (this.retainPseudoCss(customCss, cleanedCss, propertyName, CSS_STATES.HOVER, CSS_STATES.DEFAULT)) {
      // if hover value retained, attempt to retain the click value if it is different to hover
      this.retainPseudoCss(customCss, cleanedCss, propertyName, CSS_STATES.CLICK, CSS_STATES.HOVER);
    } else {
      this.retainPseudoCss(customCss, cleanedCss, propertyName, CSS_STATES.CLICK, CSS_STATES.DEFAULT);
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
    let defaultPropertyValue = customCss[CSS_STATES.DEFAULT][propertyName];
    if (this.shouldPropertyBeRetained(propertyName, defaultPropertyValue, borderPropertiesStatus)) {
      if (propertyName === 'borderRadius') { defaultPropertyValue = this.cleanBorderRadiusCss(customCss, CSS_STATES.DEFAULT); }
      cleanedCss[CSS_STATES.DEFAULT][propertyName] = defaultPropertyValue;
    }
  }

  public static clean(customCss: CustomCss): CustomCss {
    const cleanedCss: CustomCss = {
      [CSS_STATES.DEFAULT]: {},
      [CSS_STATES.HOVER]: {},
      [CSS_STATES.CLICK]: {},
    };
    const defultBorderPropertiesStatus: BorderPropertiesStatus = { areBorderPropertiesRetained: true };
    Object.keys(customCss[CSS_STATES.DEFAULT]).forEach((propertyName: string) => {
      this.cleanDefaultCss(customCss, cleanedCss, propertyName, defultBorderPropertiesStatus);
      this.cleanPseudoCss(customCss, cleanedCss, propertyName);
    });
    this.removeUnusedCssStates(cleanedCss);
    this.cleanBorderCss(cleanedCss, customCss);
    this.shorthandCss(cleanedCss);
    return cleanedCss;
  }
}
