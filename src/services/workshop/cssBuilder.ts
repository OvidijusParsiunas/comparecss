import { WorkshopComponent, CustomCss, DescendantCss, ChildCss, SubcomponentProperties } from '../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../consts/subcomponentCssModes.enum';
import { WorkshopComponentCss } from '../../interfaces/workshopComponentCss';
import { TempCustomCss } from '../../interfaces/tempCustomCss';
import { NEW_COMPONENT_TYPES } from '../../consts/newComponentTypes.enum';
import { SUB_COMPONENTS } from '../../consts/subcomponentModes.enum';

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

interface SharedChildCssProperties {
  classes: string[],
  css: WorkshopComponentCss,
}

interface SharedChildCss {
  [property: string]: SharedChildCssProperties;
}

interface SharedInheritedCssProperties {
  classes: string[],
  css: WorkshopComponentCss,
}

interface SharedInheritedCss {
  [property: string]: SharedInheritedCssProperties;
}

interface InitialCssBuild {
  customCss: string;
  sharedInheritedCss: SharedInheritedCss;
  uniqueDescendantCss: UniqueDescendantCss;
  sharedChildCss: SharedChildCss;
}

export default class CssBuilder {

  private static camelToKebabCase(propertyString: string): string {
    return propertyString.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
  }

  private static buildCssString(cssModeProperties: WorkshopComponentCss): string {
    return Object.keys(cssModeProperties).map((key) => `  ${this.camelToKebabCase(key)}: ${cssModeProperties[key]};`).join('\r\n');
  }

  private static buildPseudoClass(className: string, pseudoClassName: string,
      cssModeProperties: WorkshopComponentCss, tempCustomCss: TempCustomCss): string {
    if (!cssModeProperties) return '';
    if (tempCustomCss) for (const cssProperty of tempCustomCss) { delete cssModeProperties[cssProperty]; }
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

  private static buildDefaultCss(className: string, cssModeProperties: [WorkshopComponentCss, WorkshopComponentCss?],
    tempCustomCss: TempCustomCss): string {
    if (tempCustomCss) for (const cssProperty of tempCustomCss) { delete cssModeProperties[cssProperty]; }
    let customCssString = this.buildCssString(cssModeProperties[0]);
    if (cssModeProperties[1]) { customCssString += this.buildCssString(cssModeProperties[1]); }
    return `.${className} {\r\n${customCssString}\r\n}`;
  }

  private static buildCustomCss(className: string, customCss: [CustomCss, WorkshopComponentCss?], tempCustomCss: TempCustomCss): string {
    const defaultCss = this.buildDefaultCss(className, [customCss[0][SUB_COMPONENT_CSS_MODES.DEFAULT], customCss[1]], tempCustomCss);
    const pseudoCss = this.buildPseudoCss(className, customCss[0], tempCustomCss);
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

  private static buildSharedInheritedCss(sharedInheritedCss: SharedInheritedCss, numberOfNewLines: number): string {
    let resultCss = '';
    Object.keys(sharedInheritedCss).forEach((key) => {
      const classes = sharedInheritedCss[key].classes.join(', ');
      resultCss += `${classes} {\r\n${this.buildCssString(sharedInheritedCss[key].css)}\r\n}${'\r\n'.repeat(numberOfNewLines)}`;
    });
    return resultCss;
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

  private static allocateSharedCss2(childCssContents: ChildCss, subcomponentCustomCss: CustomCss, isCssShared: boolean,
    sharedChildCss: SharedInheritedCss, classCombinator: string, uniqueClassCombinator: string, inheritedCss: WorkshopComponentCss): [CustomCss, WorkshopComponentCss?] {
    if (childCssContents.inheritedCss) {
      if (isCssShared) {
        if (!sharedChildCss.hasOwnProperty(classCombinator)) {
          sharedChildCss[classCombinator] = { classes: [`.${uniqueClassCombinator}`], css: inheritedCss };
        } else {
          sharedChildCss[classCombinator].classes.push(`.${uniqueClassCombinator}`);
        }
      } else {
        return [subcomponentCustomCss, inheritedCss];
      }
    }
    return [subcomponentCustomCss];
  }

  private static buildChildCss(nestedChildCss: ChildCss[], classCombinator: string, subcomponentCustomCss: CustomCss,
    isCssShared: boolean, sharedChildCss: SharedChildCss, tempCustomCss: TempCustomCss): string {
    let resultCss = '';
    nestedChildCss.forEach((childCssContents) => {
      const { elementTag, childNumber, customCss, inheritedCss, nestedChildCss } = childCssContents;
      const uniqueClassCombinator =  `${classCombinator} > ${elementTag}:nth-child(${childNumber})`;
      const uniqueClassCombinatorPostfix = uniqueClassCombinator.substring(uniqueClassCombinator.indexOf(' ') + 1, uniqueClassCombinator.length);
      if (customCss) {
        const processedCustomCss: [CustomCss, WorkshopComponentCss?] = this.allocateSharedCss2(childCssContents, subcomponentCustomCss, isCssShared,
          sharedChildCss, uniqueClassCombinatorPostfix, uniqueClassCombinator, inheritedCss);
        resultCss += `${this.buildCustomCss(uniqueClassCombinator, processedCustomCss, tempCustomCss)}\r\n\r\n` }
      else if (inheritedCss) {
        if (isCssShared) {
          if (!sharedChildCss.hasOwnProperty(uniqueClassCombinatorPostfix)) {
            sharedChildCss[uniqueClassCombinatorPostfix] = { classes: [`.${uniqueClassCombinator}`], css: inheritedCss };
          } else {
            sharedChildCss[uniqueClassCombinatorPostfix].classes.push(`.${uniqueClassCombinator}`);
          }
        } else {
          resultCss += `.${uniqueClassCombinator} {\r\n${this.buildCssString(inheritedCss)}\r\n}\r\n\r\n`;
        }
      }
      if (nestedChildCss) { resultCss += this.buildChildCss(nestedChildCss, uniqueClassCombinator,
        subcomponentCustomCss, isCssShared, sharedChildCss, tempCustomCss); }
    });
    return resultCss;
  }

  private static allocateSharedCss(subcomponent: SubcomponentProperties, isCssShared: boolean,
    sharedInheritedCss: SharedInheritedCss, className: string): [CustomCss, WorkshopComponentCss?] {
    if (subcomponent.inheritedCss) {
      if (isCssShared) {
        if (!sharedInheritedCss.hasOwnProperty(subcomponent.inheritedCss.typeName)) {
          sharedInheritedCss[subcomponent.inheritedCss.typeName] = { classes: [`.${className}`], css: subcomponent.inheritedCss.css };
        } else {
          sharedInheritedCss[subcomponent.inheritedCss.typeName].classes.push(`.${className}`);
        }
      } else {
        return [subcomponent.customCss, subcomponent.inheritedCss.css];
      }
    }
    return [subcomponent.customCss];
  }

  private static generateComponentToSubcomponentId = (componentType: NEW_COMPONENT_TYPES, subcomponentType: SUB_COMPONENTS): string => componentType + subcomponentType;

  private static buildCustomCssAndAggregateInheritedCss(components: WorkshopComponent[], repeatedSubcomponents: unknown): InitialCssBuild {
    let customCss = '';
    const sharedInheritedCss: SharedInheritedCss = {};
    const sharedChildCss: SharedChildCss = {};
    const uniqueDescendantCss: UniqueDescendantCss = {};
    components.forEach((component) => {
      const { className, subcomponents, type } = component;
      Object.keys(subcomponents).forEach((key: SUB_COMPONENTS) => {
        const subcomponent: SubcomponentProperties = subcomponents[key];
        if (subcomponent.optionalSubcomponent && !subcomponent.optionalSubcomponent.currentlyDisplaying) {
          return;
        }
        if (subcomponent.childCss) {
          const componentToSubcomponentId = this.generateComponentToSubcomponentId(type, key);
          customCss += this.buildChildCss(subcomponent.childCss, className, subcomponent.customCss, repeatedSubcomponents[componentToSubcomponentId],
            sharedChildCss, subcomponent.tempCustomCss);
          return;
        }
        const componentToSubcomponentId = this.generateComponentToSubcomponentId(type, key);
        const processedCustomCss: [CustomCss, WorkshopComponentCss?] = this.allocateSharedCss(subcomponent, repeatedSubcomponents[componentToSubcomponentId],
          sharedInheritedCss, className);
        customCss += `${this.buildCustomCss(className, processedCustomCss, subcomponent.tempCustomCss)}\r\n\r\n`;
        // export to a different function
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
    return { customCss, sharedInheritedCss, uniqueDescendantCss, sharedChildCss };
  }

  private static purgeUniqueSubcomponents = (subcomponent: unknown): void => { Object.keys(subcomponent).map((key) => { if (subcomponent[key] < 2) delete subcomponent[key] })};

  private static identifyRepeatedSubcomponents(components: WorkshopComponent[]): unknown {
    const repeatedSubcomponents = {};
    components.forEach((component) => {
      const { subcomponents, type } = component;
      Object.keys(subcomponents).forEach((key: SUB_COMPONENTS) => {
        const subcomponent: SubcomponentProperties = subcomponents[key];
        if (subcomponent.optionalSubcomponent && !subcomponent.optionalSubcomponent.currentlyDisplaying) return;
        const componentToSubcomponentId = this.generateComponentToSubcomponentId(type, key);
        // check if + 1 works
        repeatedSubcomponents[componentToSubcomponentId] = repeatedSubcomponents[componentToSubcomponentId] ? repeatedSubcomponents[componentToSubcomponentId]+=1 : 1;
      });
    });
    this.purgeUniqueSubcomponents(repeatedSubcomponents);
    return repeatedSubcomponents;
  }

  static build(components: WorkshopComponent[]): string {
    const repeatedSubcomponents = this.identifyRepeatedSubcomponents(components);
    const { customCss, sharedInheritedCss, uniqueDescendantCss, sharedChildCss } = this.buildCustomCssAndAggregateInheritedCss(components, repeatedSubcomponents);
    const sharedInhertedCss = this.buildSharedInheritedCss(sharedInheritedCss, 1);
    const sharedChildCssString =  this.buildSharedInheritedCss(sharedChildCss, 2);
    const sharedDescendantCss = this.buildSharedDescendantCss(uniqueDescendantCss);
    return `${customCss}${sharedInhertedCss}\r\n${sharedChildCssString}`;
  }
}
