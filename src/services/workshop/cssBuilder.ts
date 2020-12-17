import { WorkshopComponent, CustomCss, DescendantCss, ChildCss } from '../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../consts/subcomponentCssModes.enum';
import { WorkshopComponentCss } from '../../interfaces/workshopComponentCss';
import { TempCustomCss } from '../../interfaces/tempCustomCss';

enum pseudoClasses { HOVER = 'hover', ACTIVE = 'active' }

interface UniqueDescendantCssProperties {
  classes: string[],
  descendantElements: string[],
  descendantClasses: string[],
  css: WorkshopComponentCss,
}

interface UniqueDescendantCss {
  [property: string]: UniqueDescendantCssProperties;
}

interface UniqueInheritedCssProperties {
  classes: string[],
  css: WorkshopComponentCss,
}

interface UniqueInheritedCss {
  [property: string]: UniqueInheritedCssProperties;
}

interface InitialCssBuild {
  customCss: string;
  uniqueInheritedCss: UniqueInheritedCss;
  uniqueDescendantCss: UniqueDescendantCss;
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
    if (tempCustomCss) {
      for (const cssProperty of tempCustomCss) { delete cssModeProperties[cssProperty]; }
    }
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
      const { descendantElements, descendantClasses, css } = uniqueDescendantCss[key];
      let descendantSelectorChilren = '';
      if (descendantElements && descendantElements.length > 0) descendantSelectorChilren += ` ${descendantElements.join(' ')}`;
      if (descendantClasses && descendantClasses.length > 0) descendantSelectorChilren += ` .${descendantClasses.join(' .')}`;
      const descendantSelector = uniqueDescendantCss[key].classes.map((rootClass) => `${rootClass}${descendantSelectorChilren}, `).join('');
      const processedDescendantSelector = descendantSelector.substring(0, descendantSelector.length - 2);
      sharedDescendantCss += `${processedDescendantSelector} {\r\n${this.buildCssString(css)}\r\n}\r\n`;
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

  private static buildChildCss(nestedChildCss: ChildCss[], classCombinator: string, subcomponentCustomCss: CustomCss): string {
    let resultCss = '';
    nestedChildCss.forEach((childCssContents) => {
      const { elementTag, childNumber, customCss, inheritedCss, nestedChildCss } = childCssContents;
      const uniqueClassCombinator =  `${classCombinator} > ${elementTag}:nth-child(${childNumber})`;
      if (customCss) { resultCss += `${this.buildCustomCss(uniqueClassCombinator, subcomponentCustomCss)}\r\n\r\n` }
      if (inheritedCss) { resultCss += `.${uniqueClassCombinator} {\r\n${this.buildCssString(inheritedCss)}\r\n}\r\n\r\n`; }
      if (nestedChildCss) { resultCss += this.buildChildCss(nestedChildCss, uniqueClassCombinator, subcomponentCustomCss); }
    });
    return resultCss;
  }

  private static buildCustomCssAndAggregateInheritedCss(components: WorkshopComponent[]): InitialCssBuild {
    let customCss = '';
    const uniqueInheritedCss: UniqueInheritedCss = {};
    const uniqueDescendantCss: UniqueDescendantCss = {};
    components.forEach((component) => {
      const { className, subcomponents, subcomponentsActiveMode, type } = component;
      Object.keys(subcomponents).forEach((key) => {
        const subcomponent = subcomponents[key];
        if (subcomponent.optionalSubcomponent && !subcomponent.optionalSubcomponent.currentlyDisplaying) {
          return;
        }
        if (subcomponent.childCss) {
          customCss += this.buildChildCss(subcomponent.childCss, className, subcomponent.customCss);
          return;
        }
        customCss += `${this.buildCustomCss(className, subcomponent.customCss, subcomponent.tempCustomCss)}\r\n\r\n`;
        // export to a different function
        if (subcomponent.inheritedCss) {
          if (!uniqueInheritedCss.hasOwnProperty(subcomponent.inheritedCss.typeName)) {
            uniqueInheritedCss[subcomponent.inheritedCss.typeName] = { classes: [`.${className}`], css: subcomponent.inheritedCss.css };
          } else {
            uniqueInheritedCss[subcomponent.inheritedCss.typeName].classes.push(`.${className}`);
          }
        }
        // reduce redundant css for same components
        // if (subcomponent.descendantCss && !uniqueDescendantCss.hasOwnProperty(type)) {
        //   const { elements, classes, css } = subcomponent.descendantCss;
        //   uniqueDescendantCss[type] = {
        //     classes: [`.${className}`],
        //     descendantElements: [...elements],
        //     descendantClasses: [...classes],
        //     css,
        //   }
        // } else {
        //   uniqueDescendantCss[type].classes.push(`.${className}`);
        // }
        // if (subcomponents[subcomponentsActiveMode].descendantCss) { customCss += `${this.buildDescendantCss(className, subcomponents[subcomponentsActiveMode].descendantCss)}\r\n`; }
      });
    });
    return { customCss, uniqueInheritedCss, uniqueDescendantCss };
  }

  // private static identifyIfInheritedAndDescendantCssCanBeShared(components: WorkshopComponent[]) {
  //   const inheritedCss = {};
  //   components.forEach((component) => {
  //     const { className, subcomponents, subcomponentsActiveMode, type } = component;
  //     if (!inheritedCss[])
  //   })
  // }

  static build(components: WorkshopComponent[]): string {
    // build shared css classes
    // if there is only one, will need to append to a string
      // maybe can build the shared ones first then append them

      // if inherited add type
      // iterate through types to see if any have more than 1 class
      // if they do, do not append in the actual class css and do after, if they don't, append to the class
    // alternatively instead of using inherited css we can potentially use css variables
    
    const { customCss, uniqueInheritedCss, uniqueDescendantCss } = this.buildCustomCssAndAggregateInheritedCss(components);
    const sharedInhertedCss = this.buildSharedInheritedCss(uniqueInheritedCss);
    const sharedDescendantCss = this.buildSharedDescendantCss(uniqueDescendantCss);
    return `${customCss}${sharedInhertedCss}`;
  }
}
