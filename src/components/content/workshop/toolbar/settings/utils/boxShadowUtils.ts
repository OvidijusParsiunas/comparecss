import { CustomCss, SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import { CSS_STATES } from '../../../../../../consts/subcomponentCssStates.enum';
import SharedUtils from './sharedUtils';

// the use of the auxiliary functionality and unset properties is mostly due to the fact that in firefox
// it has been identified that shadow values of 0px 0px 0px 0px still display a partial shadow
export default class BoxShadowUtils {

  private static DEFAULT_BOX_SHADOW_PIXEL_VALUES = '0px 0px 0px 0px';
  private static DEFAULT_BOX_SHADOW_UNSET_VALUE = 'unset';
  private static DEFAULT_BOX_SHADOW_COLOR_VALUE = '#000000';
  private static DEFAULT_BOX_SHADOW_SETTINGS_RANGE_VALUE = '0';
  
  private static setUnsetBoxShadowPropertiesToZero(customCss: CustomCss, auxiliaryPartialCss: CustomCss, activeCssState: CSS_STATES): void {
    if (customCss[activeCssState].boxShadow === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      customCss[activeCssState].boxShadow = auxiliaryPartialCss
        && auxiliaryPartialCss[activeCssState] && auxiliaryPartialCss[activeCssState].boxShadow
        ? auxiliaryPartialCss[activeCssState].boxShadow : `${BoxShadowUtils.DEFAULT_BOX_SHADOW_PIXEL_VALUES} ${BoxShadowUtils.DEFAULT_BOX_SHADOW_COLOR_VALUE}`;
    }
  }

  private static setZeroBoxShadowPropertiesToUnset(subcomponentproperties: SubcomponentProperties): void {
    const { customCss, activeCssState } = subcomponentproperties;
    if (customCss[activeCssState].boxShadow.startsWith(BoxShadowUtils.DEFAULT_BOX_SHADOW_PIXEL_VALUES)) {
      BoxShadowUtils.setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponentproperties, customCss[activeCssState]
        .boxShadow.split(' ').pop());
      customCss[activeCssState].boxShadow = BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE;     
    }
  }

  private static setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponentproperties: SubcomponentProperties, colorPickerValue: string): void {
    if (!subcomponentproperties.auxiliaryPartialCss) {
      subcomponentproperties.auxiliaryPartialCss = {};
    }
    if (!subcomponentproperties.auxiliaryPartialCss[subcomponentproperties.activeCssState]) {
      subcomponentproperties.auxiliaryPartialCss[subcomponentproperties.activeCssState] = {};
    }
    subcomponentproperties.auxiliaryPartialCss[subcomponentproperties.activeCssState]
      .boxShadow = `${BoxShadowUtils.DEFAULT_BOX_SHADOW_PIXEL_VALUES} ${colorPickerValue}`;
  }

  public static updateBoxShadowRangeValue(rangeValue: string, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const {cssProperty, partialCss} = spec;
    const { customCss, activeCssState, auxiliaryPartialCss } = subcomponentProperties;
    if (customCss[activeCssState][cssProperty] === undefined) {
      const defaultValues = [ ...partialCss.fullDefaultValues ];
      defaultValues[partialCss.position] = rangeValue;
      customCss[activeCssState][cssProperty] = defaultValues.join(' ');
    } else {
      BoxShadowUtils.setUnsetBoxShadowPropertiesToZero(customCss, auxiliaryPartialCss, activeCssState);
      const cssPropertyValues = customCss[activeCssState][cssProperty].split(' ');
      cssPropertyValues[partialCss.position] = `${rangeValue}px`;
      customCss[activeCssState][cssProperty] = cssPropertyValues.join(' ');
    }
    BoxShadowUtils.setZeroBoxShadowPropertiesToUnset(subcomponentProperties);
  }

  public static updateBoxShadowColorValue(hexColor: string, updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { cssProperty, partialCss } = updatedSettingSpec;
    const { customCss, activeCssState } = subcomponentProperties;
    if (customCss[activeCssState][cssProperty] === undefined) {
      const defaultValues = [ ...partialCss.fullDefaultValues ];
      defaultValues[partialCss.position] = hexColor;
      if (customCss[activeCssState][cssProperty] === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
        BoxShadowUtils.setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponentProperties, hexColor);
      } else {
        customCss[activeCssState][cssProperty] = BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE;
      }
    } else if (customCss[activeCssState][cssProperty] !== BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      const cssPropertyValues = customCss[activeCssState][cssProperty].split(' ');
      cssPropertyValues[partialCss.position] = hexColor;
      customCss[activeCssState][cssProperty] = cssPropertyValues.join(' ');
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
    const { activeCssState, auxiliaryPartialCss } = subcomponentProperties;
    if (cssPropertyValue === BoxShadowUtils.DEFAULT_BOX_SHADOW_UNSET_VALUE) {
      cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(auxiliaryPartialCss, activeCssState, settingToBeUpdatedSpec.cssProperty)
        || BoxShadowUtils.DEFAULT_BOX_SHADOW_COLOR_VALUE;
    }
    settingToBeUpdatedSpec.default = cssPropertyValue.split(' ')[settingToBeUpdatedSpec.partialCss.position];
  }

}
