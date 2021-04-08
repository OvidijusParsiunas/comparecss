import { WorkshopComponent, CustomCss, ChildCss, SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import { CustomCssWithInheritedCss, InitialCssBuild, SharedInheritedCss } from '../../../../../interfaces/cssBuilder';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { TempCustomCss } from '../../../../../interfaces/tempCustomCss';
import SharedCssUtils from './sharedCssUtils';
import GeneralUtils from './generalUtils';
import CssCleaner from './cssCleaner';

enum pseudoClasses { HOVER = 'hover', ACTIVE = 'active' }

export default class CssBuilder {

  private static buildFinalString(customCss: string, sharedInheritedParentCssStr: string, sharedInheritedChildCssStr: string): string {
    let finalString = '';
    if (customCss) finalString += customCss;
    if (sharedInheritedParentCssStr) finalString += sharedInheritedParentCssStr;
    if (sharedInheritedChildCssStr) finalString += `\r\n${sharedInheritedChildCssStr}`;
    return finalString;
  }

  private static buildPseudoClass(className: string, pseudoClassName: string,
      cssProperties: WorkshopComponentCss, tempCustomCss: TempCustomCss): string {
    if (!cssProperties) return '';
    if (tempCustomCss) for (const cssProperty of tempCustomCss) { delete cssProperties[cssProperty]; }
    const hoverKeys = Object.keys(cssProperties);
    if (hoverKeys.length) {
      return `\r\n\r\n.${className}:${pseudoClassName} {\r\n${GeneralUtils.buildCssString(cssProperties)}\r\n}`
    }
    return '';
  }

  private static buildPseudoCss(className: string, customCss: CustomCss, tempCustomCss?: TempCustomCss): string {
    let pseudoCssString = '';
    pseudoCssString += this.buildPseudoClass(className, pseudoClasses.HOVER, customCss[CSS_PSEUDO_CLASSES.HOVER], tempCustomCss);
    pseudoCssString += this.buildPseudoClass(className, pseudoClasses.ACTIVE, customCss[CSS_PSEUDO_CLASSES.CLICK], tempCustomCss);
    return pseudoCssString;
  }

  private static buildDefaultCss(className: string, cssProperties: [WorkshopComponentCss, WorkshopComponentCss?],
    tempCustomCss: TempCustomCss): string {
    if (tempCustomCss) for (const cssProperty of tempCustomCss) { delete cssProperties[0][cssProperty]; }
    let customCssString = GeneralUtils.buildCssString(cssProperties[0]);
    if (cssProperties[1]) { customCssString += GeneralUtils.buildCssString(cssProperties[1]); }
    return `.${className} {\r\n${customCssString}\r\n}`;
  }

  private static buildCustomCss(className: string, customCss: CustomCssWithInheritedCss, tempCustomCss: TempCustomCss): string {
    const cleanedCustomCss = CssCleaner.clean(customCss[0]);
    const defaultCss = this.buildDefaultCss(className, [cleanedCustomCss[CSS_PSEUDO_CLASSES.DEFAULT], customCss[1]], tempCustomCss);
    const pseudoCss = this.buildPseudoCss(className, cleanedCustomCss, tempCustomCss);
    return (defaultCss + ' ' + pseudoCss).trim();
  }

  private static buildChildCss(nestedChildCss: ChildCss[], classCombinator: string, componentToSubcomponentId: string,
    subcomponentCustomCss: CustomCss, isCssShared: boolean, sharedInhertedChildCss: SharedInheritedCss, tempCustomCss: TempCustomCss): string {
    let resultCss = '';
    nestedChildCss.forEach((childCssContents: ChildCss) => {
      const { elementTag, childNumber, hasCustomCss, inheritedCss, nestedChildCss } = childCssContents;
      const childClassCombinator =  `${classCombinator} > ${elementTag}:nth-child(${childNumber})`;
      const childClassCombinatorPostfix = childClassCombinator.substring(childClassCombinator.indexOf(' ') + 1, childClassCombinator.length);
      const processedCustomCss: CustomCssWithInheritedCss = SharedCssUtils.allocateSharedInheritedCss(subcomponentCustomCss, inheritedCss,
        isCssShared, sharedInhertedChildCss, componentToSubcomponentId + childClassCombinatorPostfix, childClassCombinator);
      if (hasCustomCss) {
        resultCss += `${this.buildCustomCss(childClassCombinator, processedCustomCss, tempCustomCss)}\r\n\r\n` }
      else if (inheritedCss) {
        resultCss += `.${childClassCombinator} {\r\n${GeneralUtils.buildCssString(inheritedCss)}\r\n}\r\n\r\n`;
      }
      if (nestedChildCss) { resultCss += this.buildChildCss(nestedChildCss, childClassCombinator, componentToSubcomponentId,
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
      Object.keys(subcomponents).forEach((subcomponentName: string) => {
        const subcomponent: SubcomponentProperties = subcomponents[subcomponentName];
        if (!subcomponent.optionalSubcomponent) {
          const componentToSubcomponentId = SharedCssUtils.generateComponentToSubcomponentId(type, subcomponentName);
          const processedCustomCss: CustomCssWithInheritedCss = SharedCssUtils.allocateSharedInheritedCss(subcomponent.customCss,
            (subcomponent.inheritedCss ? subcomponent.inheritedCss.css : undefined), repeatedSubcomponents[componentToSubcomponentId], sharedInheritedParentCss, type, className);
          customCss += `${this.buildCustomCss(className, processedCustomCss, subcomponent.tempCustomCss)}\r\n\r\n`;
        }
        if (subcomponent.optionalSubcomponent && !subcomponent.optionalSubcomponent.currentlyDisplaying) return;
        if (subcomponent.childCss) {
          const componentToSubcomponentId = SharedCssUtils.generateComponentToSubcomponentId(type, subcomponentName);
          customCss += this.buildChildCss(subcomponent.childCss, className, componentToSubcomponentId, subcomponent.customCss,
            repeatedSubcomponents[componentToSubcomponentId], sharedInhertedChildCss, subcomponent.tempCustomCss);
          return;
        }
      });
    });
    return { customCss, sharedInheritedParentCss, sharedInhertedChildCss };
  }
  
  static build(components: WorkshopComponent[]): string {
    const repeatedSubcomponents = SharedCssUtils.identifyRepeatedSubcomponents(components);
    const { customCss, sharedInheritedParentCss, sharedInhertedChildCss } = this.buildCss(components, repeatedSubcomponents);
    const sharedInheritedParentCssStr = SharedCssUtils.buildSharedInheritedCss(sharedInheritedParentCss, 1);
    const sharedInheritedChildCssStr =  SharedCssUtils.buildSharedInheritedCss(sharedInhertedChildCss, 2);
    return this.buildFinalString(customCss, sharedInheritedParentCssStr, sharedInheritedChildCssStr);
  }
}
