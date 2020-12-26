import { CustomCss, SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../consts/subcomponentCssModes.enum';

// this is mostly used for firefox as it has been identified that shadow values of 0px 0px 0px 0px still displays a partial shadow
export default class BoxShadowUtils {

  private static DEFAULT_BOX_SHADOW_PIXEL_VALUES = '0px 0px 0px 0px';
  private static DEFAULT_BOX_SHADOW_UNSET_VALUE = 'unset';
  public static DEFAULT_BOX_SHADOW_COLOR_VALUE = '#000000';
  private static DEFAULT_BOX_SHADOW_SETTINGS_RANGE_VALUE = '0';
  
  public static setUnsetBoxShadowPropertiesToZero(customCss: CustomCss, auxiliaryPartialCss: CustomCss, customCssActiveMode: SUB_COMPONENT_CSS_MODES): void {
    if (customCss[customCssActiveMode].boxShadow === this.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      customCss[customCssActiveMode].boxShadow = auxiliaryPartialCss && auxiliaryPartialCss[customCssActiveMode] && auxiliaryPartialCss[customCssActiveMode].boxShadow
        ? auxiliaryPartialCss[customCssActiveMode].boxShadow : `${this.DEFAULT_BOX_SHADOW_PIXEL_VALUES} ${this.DEFAULT_BOX_SHADOW_COLOR_VALUE}`;
    }
  }

  public static setZeroBoxShadowPropertiesToUnset(subcomponentproperties: SubcomponentProperties): void {
    const { customCss, customCssActiveMode } = subcomponentproperties;
    if (customCss[customCssActiveMode].boxShadow.startsWith(this.DEFAULT_BOX_SHADOW_PIXEL_VALUES)) {
      this.setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponentproperties, customCss[customCssActiveMode].boxShadow.split(' ').pop());
      customCss[customCssActiveMode].boxShadow = this.DEFAULT_BOX_SHADOW_UNSET_VALUE;     
    }
  }

  public static setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponentproperties: SubcomponentProperties, colorPickerValue: string): void {
    if (!subcomponentproperties.auxiliaryPartialCss) {
      subcomponentproperties.auxiliaryPartialCss = {};
    }
    if (!subcomponentproperties.auxiliaryPartialCss[subcomponentproperties.customCssActiveMode]) {
      subcomponentproperties.auxiliaryPartialCss[subcomponentproperties.customCssActiveMode] = {};
    }
    subcomponentproperties.auxiliaryPartialCss[subcomponentproperties.customCssActiveMode].boxShadow = `${this.DEFAULT_BOX_SHADOW_PIXEL_VALUES} ${colorPickerValue}`;
  }

  public static setBoxShadowSettingsRangeValue(cssPropertyValue: string, settingsSpec: any): boolean {
    if (cssPropertyValue === this.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      settingsSpec.default = this.DEFAULT_BOX_SHADOW_SETTINGS_RANGE_VALUE;
      return true;
    }
    return false;
  }
}
