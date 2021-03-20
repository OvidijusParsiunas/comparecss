import { CustomCss, SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../consts/subcomponentCssModes.enum';
import SharedUtils from './sharedUtils';

// the use of the auxiliary functionality and unset properties is mostly due to the fact that in firefox
// it has been identified that shadow values of 0px 0px 0px 0px still display a partial shadow
export default class BoxShadowUtils {

  private static DEFAULT_BOX_SHADOW_PIXEL_VALUES = '0px 0px 0px 0px';
  private static DEFAULT_BOX_SHADOW_UNSET_VALUE = 'unset';
  private static DEFAULT_BOX_SHADOW_COLOR_VALUE = '#000000';
  private static DEFAULT_BOX_SHADOW_SETTINGS_RANGE_VALUE = '0';
  
  private static setUnsetBoxShadowPropertiesToZero(customCss: CustomCss, auxiliaryPartialCss: CustomCss, activeCustomCssMode: SUB_COMPONENT_CSS_MODES): void {
    if (customCss[activeCustomCssMode].boxShadow === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      customCss[activeCustomCssMode].boxShadow = auxiliaryPartialCss
        && auxiliaryPartialCss[activeCustomCssMode] && auxiliaryPartialCss[activeCustomCssMode].boxShadow
        ? auxiliaryPartialCss[activeCustomCssMode].boxShadow : `${BoxShadowUtils.DEFAULT_BOX_SHADOW_PIXEL_VALUES} ${BoxShadowUtils.DEFAULT_BOX_SHADOW_COLOR_VALUE}`;
    }
  }

  private static setZeroBoxShadowPropertiesToUnset(subcomponentproperties: SubcomponentProperties): void {
    const { customCss, activeCustomCssMode } = subcomponentproperties;
    if (customCss[activeCustomCssMode].boxShadow.startsWith(BoxShadowUtils.DEFAULT_BOX_SHADOW_PIXEL_VALUES)) {
      BoxShadowUtils.setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponentproperties, customCss[activeCustomCssMode]
        .boxShadow.split(' ').pop());
      customCss[activeCustomCssMode].boxShadow = BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE;     
    }
  }

  private static setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponentproperties: SubcomponentProperties, colorPickerValue: string): void {
    if (!subcomponentproperties.auxiliaryPartialCss) {
      subcomponentproperties.auxiliaryPartialCss = {};
    }
    if (!subcomponentproperties.auxiliaryPartialCss[subcomponentproperties.activeCustomCssMode]) {
      subcomponentproperties.auxiliaryPartialCss[subcomponentproperties.activeCustomCssMode] = {};
    }
    subcomponentproperties.auxiliaryPartialCss[subcomponentproperties.activeCustomCssMode]
      .boxShadow = `${BoxShadowUtils.DEFAULT_BOX_SHADOW_PIXEL_VALUES} ${colorPickerValue}`;
  }

  public static updateBoxShadowRangeValue(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const {cssProperty, partialCss} = spec;
    const { customCss, activeCustomCssMode, auxiliaryPartialCss } = subcomponentProperties;
    if (customCss[activeCustomCssMode][cssProperty] === undefined) {
      const defaultValues = [ ...partialCss.fullDefaultValues ];
      defaultValues[partialCss.position] = rangeValue;
      customCss[activeCustomCssMode][cssProperty] = defaultValues.join(' ');
    } else {
      BoxShadowUtils.setUnsetBoxShadowPropertiesToZero(customCss, auxiliaryPartialCss, activeCustomCssMode);
      const cssPropertyValues = customCss[activeCustomCssMode][cssProperty].split(' ');
      cssPropertyValues[partialCss.position] = `${rangeValue}px`;
      customCss[activeCustomCssMode][cssProperty] = cssPropertyValues.join(' ');
    }
    BoxShadowUtils.setZeroBoxShadowPropertiesToUnset(subcomponentProperties);
  }

  public static updateBoxShadowColorValue(hexColor: string, updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { cssProperty, partialCss } = updatedSettingSpec;
    const { customCss, activeCustomCssMode } = subcomponentProperties;
    if (customCss[activeCustomCssMode][cssProperty] === undefined) {
      const defaultValues = [ ...partialCss.fullDefaultValues ];
      defaultValues[partialCss.position] = hexColor;
      if (customCss[activeCustomCssMode][cssProperty] === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
        BoxShadowUtils.setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponentProperties, hexColor);
      } else {
        customCss[activeCustomCssMode][cssProperty] = BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE;
      }
    } else if (customCss[activeCustomCssMode][cssProperty] !== BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      const cssPropertyValues = customCss[activeCustomCssMode][cssProperty].split(' ');
      cssPropertyValues[partialCss.position] = hexColor;
      customCss[activeCustomCssMode][cssProperty] = cssPropertyValues.join(' ');
    } else {
      BoxShadowUtils.setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponentProperties, hexColor);
    }
  }

  public static setBoxShadowSettingsRangeValue(cssPropertyValue: string, settingsSpec: any): boolean {
    if (cssPropertyValue === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      settingsSpec.default = BoxShadowUtils.DEFAULT_BOX_SHADOW_SETTINGS_RANGE_VALUE;
      return true;
    }
    return false;
  }

  public static setBoxShadowSettingsColorValue(cssPropertyValue: string, settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { activeCustomCssMode, auxiliaryPartialCss } = subcomponentProperties;
    if (cssPropertyValue === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(auxiliaryPartialCss, activeCustomCssMode, settingToBeUpdatedSpec.cssProperty)
        || BoxShadowUtils.DEFAULT_BOX_SHADOW_COLOR_VALUE;
    }
    settingToBeUpdatedSpec.default = cssPropertyValue.split(' ')[settingToBeUpdatedSpec.partialCss.position];
  }

}
