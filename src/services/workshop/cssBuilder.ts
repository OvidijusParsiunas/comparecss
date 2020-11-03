import { BUTTON_COMPONENT_MODES } from '../../consts/buttonComponentModes.enum';
import { WorkshopComponent } from '../../interfaces/workshopComponent';
import { WorkshopComponentCss } from '../../interfaces/workshopComponentCss';
enum pseudoClasses { HOVER = 'hover', ACTIVE = 'active' }

export default class CssBuilder {

  private static camelToKebabCase(propertyString: string): string {
    return propertyString.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
  }

  private static buildCssString(cssModeProperties: WorkshopComponentCss): string {
    return Object.keys(cssModeProperties).map((key) => `  ${this.camelToKebabCase(key)}: ${cssModeProperties[key]};`).join('\r\n');
  }

  private static buildPseudoClass(className: string, pseudoClassName: string, cssModeProperties: WorkshopComponentCss): string {
    const hoverKeys = Object.keys(cssModeProperties);
    if (hoverKeys.length) {
      return `\r\n\r\n.${className}:${pseudoClassName} {\r\n${this.buildCssString(cssModeProperties)}\r\n}`
    }
    return '';
  }

  private static buildPseudoCss(className: string, customCss: WorkshopComponent): string {
    let pseudoCssString = '';
    pseudoCssString += this.buildPseudoClass(className, pseudoClasses.HOVER, customCss[BUTTON_COMPONENT_MODES.HOVER]);
    pseudoCssString += this.buildPseudoClass(className, pseudoClasses.ACTIVE, customCss[BUTTON_COMPONENT_MODES.CLICK]);
    return pseudoCssString;
  }

  private static buildDefaultCss(className: string, inherentCss: WorkshopComponentCss, cssModeProperties: WorkshopComponentCss): string {
    const inherentCssString = this.buildCssString(inherentCss);
    const customCssString = this.buildCssString(cssModeProperties);
    return `.${className} {\r\n${customCssString} ${inherentCssString}\r\n}`;
  }

  static build(className: string, inherentCss: WorkshopComponentCss, customCss: WorkshopComponent): string {
    const defaultCss = this.buildDefaultCss(className, inherentCss, customCss[BUTTON_COMPONENT_MODES.DEFAULT]);
    const pseudoCss = this.buildPseudoCss(className, customCss);
    return (defaultCss + ' ' + pseudoCss).trim();
  }
}