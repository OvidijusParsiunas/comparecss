import { WorkshopComponent, CustomCss, ChildCss, SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { SUB_COMPONENTS } from '../../../../../consts/subcomponentModes.enum';
import { TempCustomCss } from '../../../../../interfaces/tempCustomCss';
import CssBuilderUtils from './cssBuilderUtils';
import SharedCssUtils from './sharedCssUtils';

enum pseudoClasses { HOVER = 'hover', ACTIVE = 'active' }

interface SharedCssProperties {
  classes: string[],
  css: WorkshopComponentCss,
}

export interface SharedInheritedCss {
  [property: string]: SharedCssProperties;
}

interface InitialCssBuild {
  customCss: string;
  sharedInheritedParentCss: SharedInheritedCss;
  sharedInhertedChildCss: SharedInheritedCss;
}

export default class CssBuilder {

  private static buildPseudoClass(className: string, pseudoClassName: string,
      cssModeProperties: WorkshopComponentCss, tempCustomCss: TempCustomCss): string {
    if (!cssModeProperties) return '';
    if (tempCustomCss) for (const cssProperty of tempCustomCss) { delete cssModeProperties[cssProperty]; }
    const hoverKeys = Object.keys(cssModeProperties);
    if (hoverKeys.length) {
      return `\r\n\r\n.${className}:${pseudoClassName} {\r\n${CssBuilderUtils.buildCssString(cssModeProperties)}\r\n}`
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
    if (tempCustomCss) for (const cssProperty of tempCustomCss) { delete cssModeProperties[0][cssProperty]; }
    let customCssString = CssBuilderUtils.buildCssString(cssModeProperties[0]);
    if (cssModeProperties[1]) { customCssString += CssBuilderUtils.buildCssString(cssModeProperties[1]); }
    return `.${className} {\r\n${customCssString}\r\n}`;
  }

  private static buildCustomCss(className: string, customCss: [CustomCss, WorkshopComponentCss?], tempCustomCss: TempCustomCss): string {
    const defaultCss = this.buildDefaultCss(className, [customCss[0][SUB_COMPONENT_CSS_MODES.DEFAULT], customCss[1]], tempCustomCss);
    const pseudoCss = this.buildPseudoCss(className, customCss[0], tempCustomCss);
    return (defaultCss + ' ' + pseudoCss).trim();
  }

  private static buildChildCss(nestedChildCss: ChildCss[], classCombinator: string, subcomponentCustomCss: CustomCss,
    isCssShared: boolean, sharedInhertedChildCss: SharedInheritedCss, tempCustomCss: TempCustomCss): string {
    let resultCss = '';
    nestedChildCss.forEach((childCssContents: ChildCss) => {
      const { elementTag, childNumber, hasCustomCss, inheritedCss, nestedChildCss } = childCssContents;
      const childClassCombinator =  `${classCombinator} > ${elementTag}:nth-child(${childNumber})`;
      const childClassCombinatorPostfix = childClassCombinator.substring(childClassCombinator.indexOf(' ') + 1, childClassCombinator.length);
      const processedCustomCss: [CustomCss, WorkshopComponentCss?] = SharedCssUtils.allocateSharedInheritedCss(subcomponentCustomCss, inheritedCss,
        isCssShared, sharedInhertedChildCss, childClassCombinatorPostfix, childClassCombinator);
      if (hasCustomCss) {
        resultCss += `${this.buildCustomCss(childClassCombinator, processedCustomCss, tempCustomCss)}\r\n\r\n` }
      else if (inheritedCss) {
        resultCss += `.${childClassCombinator} {\r\n${CssBuilderUtils.buildCssString(inheritedCss)}\r\n}\r\n\r\n`;
      }
      if (nestedChildCss) { resultCss += this.buildChildCss(nestedChildCss, childClassCombinator,
        subcomponentCustomCss, isCssShared, sharedInhertedChildCss, tempCustomCss); }
    });
    return resultCss;
  }

  private static buildCss(components: WorkshopComponent[], repeatedSubcomponents: unknown): InitialCssBuild {
    let customCss = '';
    const sharedInheritedParentCss: SharedInheritedCss = {};
    const sharedInhertedChildCss: SharedInheritedCss = {};
    components.forEach((component) => {
      const { className, subcomponents, type } = component;
      Object.keys(subcomponents).forEach((key: SUB_COMPONENTS) => {
        const subcomponent: SubcomponentProperties = subcomponents[key];
        if (subcomponent.optionalSubcomponent && !subcomponent.optionalSubcomponent.currentlyDisplaying) {
          return;
        }
        if (subcomponent.childCss) {
          const componentToSubcomponentId = CssBuilderUtils.generateComponentToSubcomponentId(type, key);
          customCss += this.buildChildCss(subcomponent.childCss, className, subcomponent.customCss, repeatedSubcomponents[componentToSubcomponentId],
            sharedInhertedChildCss, subcomponent.tempCustomCss);
          return;
        }
        const componentToSubcomponentId = CssBuilderUtils.generateComponentToSubcomponentId(type, key);
        const processedCustomCss: [CustomCss, WorkshopComponentCss?] = SharedCssUtils.allocateSharedInheritedCss(subcomponent.customCss,
          (subcomponent.inheritedCss ? subcomponent.inheritedCss.css : undefined), repeatedSubcomponents[componentToSubcomponentId], sharedInheritedParentCss, type, className);
        customCss += `${this.buildCustomCss(className, processedCustomCss, subcomponent.tempCustomCss)}\r\n\r\n`;
      });
    });
    return { customCss, sharedInheritedParentCss, sharedInhertedChildCss };
  }
  
  static build(components: WorkshopComponent[]): string {
    const repeatedSubcomponents = CssBuilderUtils.identifyRepeatedSubcomponents(components);
    const { customCss, sharedInheritedParentCss, sharedInhertedChildCss } = this.buildCss(components, repeatedSubcomponents);
    const finalSharedInhertedParentCss = SharedCssUtils.buildSharedInheritedCss(sharedInheritedParentCss, 1);
    const finalSharedInheritedChildCssString =  SharedCssUtils.buildSharedInheritedCss(sharedInhertedChildCss, 2);
    return `${customCss}${finalSharedInhertedParentCss}\r\n${finalSharedInheritedChildCssString}`;
  }
}
