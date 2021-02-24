import { SUB_COMPONENT_CSS_MODES } from '../../../../../../consts/subcomponentCssModes.enum';
import { CustomCss } from '../../../../../../interfaces/workshopComponent';

export default class SharedUtils {
  
  public static getActiveModeCssPropertyValue(css: CustomCss, activeMode: SUB_COMPONENT_CSS_MODES, cssProperty: string): string {
    // the following allows multiple cases to be checked in one execution
    if (!css) return undefined;
    switch (activeMode) {
      case (SUB_COMPONENT_CSS_MODES.CLICK):
        if (css[SUB_COMPONENT_CSS_MODES.CLICK] && css[SUB_COMPONENT_CSS_MODES.CLICK].hasOwnProperty(cssProperty)) {
          return css[SUB_COMPONENT_CSS_MODES.CLICK][cssProperty];
        }
      case (SUB_COMPONENT_CSS_MODES.HOVER || SUB_COMPONENT_CSS_MODES.CLICK):
        if (css[SUB_COMPONENT_CSS_MODES.HOVER] && css[SUB_COMPONENT_CSS_MODES.HOVER].hasOwnProperty(cssProperty)) {
          return css[SUB_COMPONENT_CSS_MODES.HOVER][cssProperty];
        }
      case (SUB_COMPONENT_CSS_MODES.DEFAULT || SUB_COMPONENT_CSS_MODES.HOVER || SUB_COMPONENT_CSS_MODES.CLICK):
        if (css[SUB_COMPONENT_CSS_MODES.DEFAULT] && css[SUB_COMPONENT_CSS_MODES.DEFAULT].hasOwnProperty(cssProperty)) {
          return css[SUB_COMPONENT_CSS_MODES.DEFAULT][cssProperty];
        }
      default:
        return undefined;
    }
  }
}
