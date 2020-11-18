import { TempCustomCss } from '../../interfaces/tempCustomCss';
import { COMPONENT_MODES } from '../../consts/componentModes.enum';
import { WorkshopComponent, CustomCss } from '../../interfaces/workshopComponent';
import { WorkshopComponentCss } from '../../interfaces/workshopComponentCss';

enum pseudoClasses { HOVER = 'hover', ACTIVE = 'active' }

interface UniqueInheritedCssProperties {
  classes: string[],
  css: WorkshopComponentCss,
}

interface UniqueInheritedCss {
  [property: string]: UniqueInheritedCssProperties;
}

export default class CssBuilder {

  private static camelToKebabCase(propertyString: string): string {
    return propertyString.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
  }

  private static buildCssString(cssModeProperties: WorkshopComponentCss): string {
    return Object.keys(cssModeProperties).map((key) => `  ${this.camelToKebabCase(key)}: ${cssModeProperties[key]};`).join('\r\n');
  }

  private static buildPseudoClass(className: string, pseudoClassName: string,
      cssModeProperties: WorkshopComponentCss, tempCustomCss?: TempCustomCss): string {
    for (const cssProperty of tempCustomCss) { delete cssModeProperties[cssProperty]; }
    const hoverKeys = Object.keys(cssModeProperties);
    if (hoverKeys.length) {
      return `\r\n\r\n.${className}:${pseudoClassName} {\r\n${this.buildCssString(cssModeProperties)}\r\n}`
    }
    return '';
  }

  private static buildPseudoCss(className: string, customCss: CustomCss,
      tempCustomCss?: TempCustomCss): string {
    let pseudoCssString = '';
    pseudoCssString += this.buildPseudoClass(className, pseudoClasses.HOVER, customCss[COMPONENT_MODES.HOVER], tempCustomCss);
    pseudoCssString += this.buildPseudoClass(className, pseudoClasses.ACTIVE, customCss[COMPONENT_MODES.CLICK], tempCustomCss);
    return pseudoCssString;
  }

  private static buildDefaultCss(className: string, cssModeProperties: WorkshopComponentCss,
      tempCustomCss?: TempCustomCss): string {
    for (const cssProperty of tempCustomCss) { delete cssModeProperties[cssProperty]; }
    const customCssString = this.buildCssString(cssModeProperties);
    return `.${className} {\r\n${customCssString}\r\n}`;
  }

  private static buildCustomCss(className: string, customCss: CustomCss, tempCustomCss?: TempCustomCss): string {
    const defaultCss = this.buildDefaultCss(className, customCss[COMPONENT_MODES.DEFAULT], tempCustomCss);
    const pseudoCss = this.buildPseudoCss(className, customCss, tempCustomCss);
    return (defaultCss + ' ' + pseudoCss).trim();
  }
  
  private static buildSharedInheritedCss(uniqueInheritedCss: any): string {
    let sharedInheritedCss = '';
    Object.keys(uniqueInheritedCss).forEach((key) => {
      const classes = uniqueInheritedCss[key].classes.join(', ');
      sharedInheritedCss += `${classes} {\r\n${this.buildCssString(uniqueInheritedCss[key].css)}\r\n}\r\n`;
    });
    return sharedInheritedCss;
  }

  private static buildCustomCssAndAggregateInheritedCss(components: WorkshopComponent[]): [string, UniqueInheritedCss] {
    let customCss = '';
    const uniqueInheritedCss: UniqueInheritedCss = {};
    components.forEach((component) => {
      const { className, componentProperties } = component;
      customCss += `${this.buildCustomCss(className, componentProperties.customCss, componentProperties.tempCustomCss)}\r\n`;
      if (!componentProperties.inheritedCss) return;
      if (!uniqueInheritedCss.hasOwnProperty(componentProperties.inheritedCss.typeName)) {
        uniqueInheritedCss[componentProperties.inheritedCss.typeName] = { classes: [`.${className}`], css: componentProperties.inheritedCss.css };
      } else {
        uniqueInheritedCss[componentProperties.inheritedCss.typeName].classes.push(`.${className}`);
      }
    });
    return [customCss, uniqueInheritedCss];
  }

  static build(components: WorkshopComponent[]): string {
    // alternatively instead of using inherited css we can potentially use css variables
    const [customCss, uniqueInheritedCss] = this.buildCustomCssAndAggregateInheritedCss(components);
    const sharedInhertiedCss = this.buildSharedInheritedCss(uniqueInheritedCss);
    return `${customCss}\r\n${sharedInhertiedCss}`;
  }
}
