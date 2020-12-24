import { CustomCss, SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../consts/subcomponentCssModes.enum';

// this is mostly used for firefox as it has been identified that shadow values of 0px 0px 0px 0px still displays a partial shadow
export default class CssPolyfill {
  
  // use consts for 0px 0px 0px 0px;
  public static setUnsetBoxShadowPropertiesToZero(customCss: CustomCss, auxiliaryPartialCss: CustomCss, customCssActiveMode: SUB_COMPONENT_CSS_MODES): void {
    // try to retain the colour
    if (customCss[customCssActiveMode].boxShadow === 'unset') {
      customCss[customCssActiveMode].boxShadow = auxiliaryPartialCss && auxiliaryPartialCss[customCssActiveMode] && auxiliaryPartialCss[customCssActiveMode].boxShadow
        ? auxiliaryPartialCss[customCssActiveMode].boxShadow : '0px 0px 0px 0px #000000';
    }
  }

  public static setZeroBoxShadowPropertiesToUnset(subcomponentproperties: SubcomponentProperties): void {
    const { customCss, customCssActiveMode } = subcomponentproperties;
    if (customCss[customCssActiveMode].boxShadow.startsWith('0px 0px 0px 0px')) {
      if (!subcomponentproperties.auxiliaryPartialCss) {
        subcomponentproperties.auxiliaryPartialCss = {};
      }
      if (!subcomponentproperties.auxiliaryPartialCss[customCssActiveMode]) {
        subcomponentproperties.auxiliaryPartialCss[customCssActiveMode] = {};
      }
      subcomponentproperties.auxiliaryPartialCss[customCssActiveMode].boxShadow = customCss[customCssActiveMode].boxShadow;
      customCss[customCssActiveMode].boxShadow = 'unset';
      
    }
  }

  public static setBoxShadowSettingsRangeValue(cssPropertyValue: string, settingsSpec: any): boolean {
    if (cssPropertyValue === 'unset') {
      settingsSpec.default = '0';
      return true;
    }
    return false;
  }
}
