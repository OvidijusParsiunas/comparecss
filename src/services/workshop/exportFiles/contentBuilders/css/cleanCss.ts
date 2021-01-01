import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import { WorkshopComponentCss } from '../../../../../interfaces/workshopComponentCss';
import { CustomCss } from '../../../../../interfaces/workshopComponent';

interface BorderPropertiesStatus {
  isBorderEmitted: boolean;
}

export default class CleanCss {
  
  // if default and (hover || click) are ALSO in the shouldBeRemoved list, remove the default
  private static shouldPropertyBeRemovedWhenUsedInPseudoClasses(propertyName: string, propertyValue: string, borderPropertiesStatus: BorderPropertiesStatus): boolean {
    if (propertyValue === '0px' || propertyValue === 'unset' || propertyValue === '0%') {
      if (customCss[SUB_COMPONENT_CSS_MODES.HOVER] && customCss[SUB_COMPONENT_CSS_MODES.HOVER][propertyName]) {
        if (customCss[SUB_COMPONENT_CSS_MODES.HOVER][propertyName] == propertyValue) {
          if (customCss[SUB_COMPONENT_CSS_MODES.CLICK] && customCss[SUB_COMPONENT_CSS_MODES.CLICK][propertyName]) {
            if (customCss[SUB_COMPONENT_CSS_MODES.CLICK][propertyName] == propertyValue) {
              return true;
            } else {
              return false;
            }
          } else {
            return true; 
          }
        } else {
          return false;
        }
      } else if (customCss[SUB_COMPONENT_CSS_MODES.CLICK] && customCss[SUB_COMPONENT_CSS_MODES.CLICK][propertyName]) {
        if (customCss[SUB_COMPONENT_CSS_MODES.CLICK][propertyName] == propertyValue) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  // the current strategy is to remove redundant properties only if they are not used in hover and click
  private static shouldPropertyBeRemoved(propertyName: string, propertyValue: string, borderPropertiesStatus: BorderPropertiesStatus): boolean {
    switch(propertyName) {
      case 'boxShadow':
        if (propertyValue.startsWith('0px 0px 0px 0px')) return true;
      case 'borderStyle':
        if (propertyValue === 'none') {
          borderPropertiesStatus.isBorderEmitted = true;
          return true;
        } else if (borderPropertiesStatus.isBorderEmitted) {
          return true;
        }
      case 'borderWidth':
        if (propertyValue === '0px') {
          borderPropertiesStatus.isBorderEmitted = true;
          return true;
        } else if (borderPropertiesStatus.isBorderEmitted) {
          return true;
        }
      default:
        if (propertyValue === '0px' || propertyValue === 'unset' || propertyValue === '0%') {
          return true;
        }
    }
    return false;
  }

  // can also get rid of redundant css in hover && click if the default is redundant - identified by the shouldPropertyBeRemovedWhenUsedInPseudoClassesd method
  public static clean(customCss: CustomCss): WorkshopComponentCss | undefined {
    const newCustomCss: WorkshopComponentCss = {};
    const borderPropertiesStatus: BorderPropertiesStatus = { isBorderEmitted: false };
    Object.keys(customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]).forEach((key: string) => {
      const css = customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][key];
      if ((customCss[SUB_COMPONENT_CSS_MODES.HOVER] && customCss[SUB_COMPONENT_CSS_MODES.HOVER][key])
        || (customCss[SUB_COMPONENT_CSS_MODES.CLICK] && customCss[SUB_COMPONENT_CSS_MODES.CLICK][key])) {
          
        } else if (!this.shouldPropertyBeRemoved(key, css, borderPropertiesStatus)) {
          newCustomCss[key] = css; 
        }
    });
    if (borderPropertiesStatus.isBorderEmitted && newCustomCss.hasOwnProperty('borderColor')) {
      delete newCustomCss.borderColor;
    }
    return Object.keys(newCustomCss).length > 0 ? newCustomCss : undefined;
  }
}