import { TempCustomCss } from '../../interfaces/tempCustomCss';
import { SUB_COMPONENT_CSS_MODES } from '../../consts/subcomponentCssModes.enum';
import { WorkshopComponent, CustomCss, DescendantCss } from '../../interfaces/workshopComponent';
import { WorkshopComponentCss } from '../../interfaces/workshopComponentCss';

enum pseudoClasses { HOVER = 'hover', ACTIVE = 'active' }

interface UniqueInheritedCssProperties {
  classes: string[],
  css: WorkshopComponentCss,
}

interface UniqueInheritedCss {
  [property: string]: UniqueInheritedCssProperties;
}

interface UniqueDescendantCssProperties {
  classes: string[],
  descendantElements: string[],
  descendantClasses: string[],
  css: WorkshopComponentCss,
}

interface UniqueDescendantCss {
  [property: string]: UniqueDescendantCssProperties;
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
    if (!cssModeProperties) return '';
    for (const cssProperty of tempCustomCss) { delete cssModeProperties[cssProperty]; }
    const hoverKeys = Object.keys(cssModeProperties);
    if (hoverKeys.length) {
      return `\r\n\r\n.${className}:${pseudoClassName} {\r\n${this.buildCssString(cssModeProperties)}\r\n}`
    }
    return '';
  }

  private static buildPseudoCss(className: string, customCss: CustomCss, tempCustomCss?: TempCustomCss): string {
    let pseudoCssString = '';
    pseudoCssString += this.buildPseudoClass(className, pseudoClasses.HOVER, customCss[SUB_COMPONENT_CSS_MODES.HOVER], tempCustomCss);
    pseudoCssString += this.buildPseudoClass(className, pseudoClasses.ACTIVE, customCss[SUB_COMPONENT_CSS_MODES.CLICK], tempCustomCss);
    return pseudoCssString;
  }

  private static buildDefaultCss(className: string, cssModeProperties: WorkshopComponentCss,
      tempCustomCss?: TempCustomCss): string {
    for (const cssProperty of tempCustomCss) { delete cssModeProperties[cssProperty]; }
    const customCssString = this.buildCssString(cssModeProperties);
    return `.${className} {\r\n${customCssString}\r\n}`;
  }

  private static buildCustomCss(className: string, customCss: CustomCss, tempCustomCss?: TempCustomCss): string {
    const defaultCss = this.buildDefaultCss(className, customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], tempCustomCss);
    const pseudoCss = this.buildPseudoCss(className, customCss, tempCustomCss);
    return (defaultCss + ' ' + pseudoCss).trim();
  }

  private static buildSharedDescendantCss(uniqueDescendantCss: UniqueDescendantCss): string {
    let sharedDescendantCss = '';
    Object.keys(uniqueDescendantCss).forEach((key) => {
      let descendantSelector = '';
      let descendantSelectorChilren = '';
      const { descendantElements, descendantClasses, css } = uniqueDescendantCss[key];
      if (descendantElements && descendantElements.length > 0) descendantSelectorChilren += ` ${descendantElements.join(' ')}`;
      if (descendantClasses && descendantClasses.length > 0) descendantSelectorChilren += ` .${descendantClasses.join(' .')}`;
      // uniqueDescendantCss[key].classes.forEach((rootClass) => {
      //   descendantSelector += `${rootClass}${descendantSelectorChilren}, `;
      // });
      descendantSelector += uniqueDescendantCss[key].classes.map((rootClass) => `${rootClass}${descendantSelectorChilren}, `).join('');
      const processedDescendantSelector = descendantSelector.substring(0, descendantSelector.length - 2);
      sharedDescendantCss += `${processedDescendantSelector} {\r\n${this.buildCssString(css)}\r\n}\r\n`;
      console.log(sharedDescendantCss);
    });
    return sharedDescendantCss;
  }

  private static buildSharedInheritedCss(uniqueInheritedCss: UniqueInheritedCss): string {
    let sharedInheritedCss = '';
    Object.keys(uniqueInheritedCss).forEach((key) => {
      const classes = uniqueInheritedCss[key].classes.join(', ');
      sharedInheritedCss += `${classes} {\r\n${this.buildCssString(uniqueInheritedCss[key].css)}\r\n}\r\n`;
    });
    return sharedInheritedCss;
  }

  private static buildDescendantCss(className: string, descendantCss: DescendantCss): string {
    let descendantSelector = '';
    if (descendantCss.elements && descendantCss.elements.size > 0) descendantSelector += `${[...descendantCss.elements].join(' ')}`;
    if (descendantCss.classes && descendantCss.classes.size > 0) descendantSelector += `.${[...descendantCss.classes].join(' .')}`;
    if (descendantSelector.length > 0) {
      const descendantCssString = this.buildCssString(descendantCss.css);
      return `.${className} ${descendantSelector} {\r\n${descendantCssString}\r\n}\r\n`;
    }
    return '';
  }

  private static buildCustomCssAndAggregateInheritedCss(components: WorkshopComponent[]): [string, UniqueInheritedCss, UniqueDescendantCss] {
    let customCss = '';
    const uniqueInheritedCss: UniqueInheritedCss = {};
    const uniqueDescendantCss: UniqueDescendantCss = {};
    components.forEach((component) => {
      const { className, subcomponents, subcomponentsActiveMode, type } = component;
      customCss += `${this.buildCustomCss(className, subcomponents[subcomponentsActiveMode].customCss, subcomponents[subcomponentsActiveMode].tempCustomCss)}\r\n\r\n`;
      // this will stop nestedcss logic from working
      if (!subcomponents[subcomponentsActiveMode].inheritedCss) return;
      // export to a different function
      if (!uniqueInheritedCss.hasOwnProperty(subcomponents[subcomponentsActiveMode].inheritedCss.typeName)) {
        uniqueInheritedCss[subcomponents[subcomponentsActiveMode].inheritedCss.typeName] = { classes: [`.${className}`], css: subcomponents[subcomponentsActiveMode].inheritedCss.css };
      } else {
        uniqueInheritedCss[subcomponents[subcomponentsActiveMode].inheritedCss.typeName].classes.push(`.${className}`);
      }
      // reduce redundant css for same components
      if (subcomponents[subcomponentsActiveMode].descendantCss && !uniqueDescendantCss.hasOwnProperty(type)) {
        const { elements, classes, css } = subcomponents[subcomponentsActiveMode].descendantCss;
        uniqueDescendantCss[type] = {
          classes: [`.${className}`],
          descendantElements: [...elements],
          descendantClasses: [...classes],
          css,
        }
      } else {
        uniqueDescendantCss[type].classes.push(`.${className}`);
      }
      if (subcomponents[subcomponentsActiveMode].descendantCss) { customCss += `${this.buildDescendantCss(className, subcomponents[subcomponentsActiveMode].descendantCss)}\r\n`; }
    });
    return [customCss, uniqueInheritedCss, uniqueDescendantCss];
  }

  static build(components: WorkshopComponent[]): string {
    // alternatively instead of using inherited css we can potentially use css variables
    const [customCss, uniqueInheritedCss, uniqueDescendantCss] = this.buildCustomCssAndAggregateInheritedCss(components);
    const sharedInhertedCss = this.buildSharedInheritedCss(uniqueInheritedCss);
    const sharedDescendantCss = this.buildSharedDescendantCss(uniqueDescendantCss);
    return `${customCss}${sharedInhertedCss}`;
  }
}
