import { CustomCss, SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../consts/subcomponentCssModes.enum';

// the use of the auxiliary functionality and unset properties is mostly due to the fact that in firefox
// it has been identified that shadow values of 0px 0px 0px 0px still display a partial shadow
export default class BoxShadowUtils {

  private static DEFAULT_BOX_SHADOW_PIXEL_VALUES = '0px 0px 0px 0px';
  private static DEFAULT_BOX_SHADOW_UNSET_VALUE = 'unset';
  public static DEFAULT_BOX_SHADOW_COLOR_VALUE = '#000000';
  private static DEFAULT_BOX_SHADOW_SETTINGS_RANGE_VALUE = '0';
  
  public static setUnsetBoxShadowPropertiesToZero(customCss: CustomCss, auxiliaryPartialCss: CustomCss, customCssActiveMode: SUB_COMPONENT_CSS_MODES): void {
    if (customCss[customCssActiveMode].boxShadow === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      customCss[customCssActiveMode].boxShadow = auxiliaryPartialCss
        && auxiliaryPartialCss[customCssActiveMode] && auxiliaryPartialCss[customCssActiveMode].boxShadow
        ? auxiliaryPartialCss[customCssActiveMode].boxShadow : `${BoxShadowUtils.DEFAULT_BOX_SHADOW_PIXEL_VALUES} ${BoxShadowUtils.DEFAULT_BOX_SHADOW_COLOR_VALUE}`;
    }
  }

  public static setZeroBoxShadowPropertiesToUnset(subcomponentproperties: SubcomponentProperties): void {
    const { customCss, customCssActiveMode } = subcomponentproperties;
    if (customCss[customCssActiveMode].boxShadow.startsWith(BoxShadowUtils.DEFAULT_BOX_SHADOW_PIXEL_VALUES)) {
      BoxShadowUtils.setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponentproperties, customCss[customCssActiveMode]
        .boxShadow.split(' ').pop());
      customCss[customCssActiveMode].boxShadow = BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE;     
    }
  }

  public static setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponentproperties: SubcomponentProperties, colorPickerValue: string): void {
    if (!subcomponentproperties.auxiliaryPartialCss) {
      subcomponentproperties.auxiliaryPartialCss = {};
    }
    if (!subcomponentproperties.auxiliaryPartialCss[subcomponentproperties.customCssActiveMode]) {
      subcomponentproperties.auxiliaryPartialCss[subcomponentproperties.customCssActiveMode] = {};
    }
    subcomponentproperties.auxiliaryPartialCss[subcomponentproperties.customCssActiveMode]
      .boxShadow = `${BoxShadowUtils.DEFAULT_BOX_SHADOW_PIXEL_VALUES} ${colorPickerValue}`;
  }

  public static setBoxShadowSettingsRangeValue(cssPropertyValue: string, settingsSpec: any): boolean {
    if (cssPropertyValue === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      settingsSpec.default = BoxShadowUtils.DEFAULT_BOX_SHADOW_SETTINGS_RANGE_VALUE;
      return true;
    }
    return false;
  }
}
