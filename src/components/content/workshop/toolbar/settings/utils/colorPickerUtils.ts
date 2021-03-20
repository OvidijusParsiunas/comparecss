import { CustomFeatures, SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import BoxShadowUtils from './boxShadowUtils';
import SharedUtils from './sharedUtils';

export default class ColorPickerUtils {

  public static UNSET_CUSTOM_FEATURE_COLOR_VALUE = 'unset';
  public static INHERIT_CUSTOM_FEATURE_COLOR_VALUE = 'inherit';

  private static updateCustomCss(hexColor: string, updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { cssProperty, partialCss } = updatedSettingSpec;
    const { customCss, activeCustomCssMode } = subcomponentProperties;
    if (partialCss !== undefined) {
      if (cssProperty === 'boxShadow') BoxShadowUtils.updateBoxShadowColorValue(hexColor, updatedSettingSpec, subcomponentProperties);
    } else {
      customCss[activeCustomCssMode][cssProperty] = hexColor;
    }
  }

  private static updateCustomFeature(hexColor: string, updatedSettingSpec: any, customFeatures: CustomFeatures): void {
    const { customFeatureObjectKeys, alphaValueCustomFeatureObjectKeys } = updatedSettingSpec;
    if (alphaValueCustomFeatureObjectKeys) {
      const alphaValue = SharedUtils.getCustomFeatureValue(alphaValueCustomFeatureObjectKeys, customFeatures) as number;
      hexColor += SharedUtils.convertAlphaDecimalToHexString(alphaValue);
    }
    SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, customFeatures, hexColor);
  }

  public static updateProperties(event: MouseEvent, updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const hexColor = (event.target as HTMLInputElement).value;
    if (updatedSettingSpec.customFeatureObjectKeys) {
      ColorPickerUtils.updateCustomFeature(hexColor, updatedSettingSpec, subcomponentProperties.customFeatures);
    } else {
      ColorPickerUtils.updateCustomCss(hexColor, updatedSettingSpec, subcomponentProperties);
    }
  }

  private static activateRemoveColorTriggers(removeColorTriggers: any, customFeatures: CustomFeatures, allSettings: any): void {
    (removeColorTriggers || []).forEach((trigger) => {
      if (trigger.customFeatureObjectKeys) {
        SharedUtils.setCustomFeatureSetting(trigger, customFeatures, allSettings);
      }
    });
  }

  private static updateCustomCssSetting(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, activeCustomCssMode } = subcomponentProperties;
    let cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, activeCustomCssMode, settingToBeUpdatedSpec.cssProperty);
    if (settingToBeUpdatedSpec.cssProperty === 'boxShadow') {
      BoxShadowUtils.setBoxShadowSettingsColorValue(cssPropertyValue, settingToBeUpdatedSpec, subcomponentProperties);
    } else {
      settingToBeUpdatedSpec.default = cssPropertyValue;
    }
  }

  private static updateCustomFeatureSetting(settingToBeUpdatedSpec: any, customFeatures: CustomFeatures): void {
    const hexColorValue = SharedUtils.getCustomFeatureValue(settingToBeUpdatedSpec.customFeatureObjectKeys, customFeatures) as string;
    settingToBeUpdatedSpec.default = settingToBeUpdatedSpec.alphaValueCustomFeatureObjectKeys && hexColorValue !== 'unset'
      ? hexColorValue.substring(0, hexColorValue.length - 2) : hexColorValue;
  }

  public static updateSettings(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    if (settingToBeUpdatedSpec.customFeatureObjectKeys) {
      ColorPickerUtils.updateCustomFeatureSetting(settingToBeUpdatedSpec, subcomponentProperties.customFeatures);
    } else {
      ColorPickerUtils.updateCustomCssSetting(settingToBeUpdatedSpec, subcomponentProperties);
    }
  }

  private static setCustomCssColorToInherit(updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { cssProperty } = updatedSettingSpec;
    updatedSettingSpec.default = '';
    if (!subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode]) {
      subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode] = {
        [cssProperty]: ColorPickerUtils.INHERIT_CUSTOM_FEATURE_COLOR_VALUE};
    } else {
      subcomponentProperties.customCss[subcomponentProperties.activeCustomCssMode]
        [cssProperty] = ColorPickerUtils.INHERIT_CUSTOM_FEATURE_COLOR_VALUE;
    }
  }

  private static setCustomFeatureToUnset(updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { customFeatureObjectKeys } = updatedSettingSpec;
    updatedSettingSpec.default = ColorPickerUtils.UNSET_CUSTOM_FEATURE_COLOR_VALUE;
    SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties.customFeatures,
      ColorPickerUtils.UNSET_CUSTOM_FEATURE_COLOR_VALUE);
  }

  public static removeColor(updatedSettingSpec: any, removeColorTriggers: any,
      subcomponentProperties: SubcomponentProperties, allSettings: any): void {
    const { customFeatureObjectKeys } = updatedSettingSpec;
    if (customFeatureObjectKeys) {
      ColorPickerUtils.setCustomFeatureToUnset(updatedSettingSpec, subcomponentProperties);
    } else {
      ColorPickerUtils.setCustomCssColorToInherit(updatedSettingSpec, subcomponentProperties);
    }
    ColorPickerUtils.activateRemoveColorTriggers(removeColorTriggers, subcomponentProperties.customFeatures, allSettings);
  }
}
