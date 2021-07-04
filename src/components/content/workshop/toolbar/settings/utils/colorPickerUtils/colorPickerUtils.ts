import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import BoxShadowUtils from '../boxShadowUtils';
import SharedUtils from '../sharedUtils';

export class ColorPickerUtils {

  private static updateCustomCss(hexColor: string, updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { cssProperty, partialCss } = updatedSettingSpec;
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    if (partialCss !== undefined) {
      if (cssProperty === 'boxShadow') BoxShadowUtils.updateBoxShadowColorValue(hexColor, updatedSettingSpec, subcomponentProperties);
    } else {
      customCss[activeCssPseudoClass][cssProperty] = hexColor;
    }
  }

  private static updateCustomFeature(hexColor: string, updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { customFeatureObjectKeys, alphaValueCustomFeatureObjectKeys } = updatedSettingSpec;
    if (alphaValueCustomFeatureObjectKeys) {
      const keys = alphaValueCustomFeatureObjectKeys;
      const alphaValue = SharedUtils.getCustomFeatureValue(keys, subcomponentProperties[keys[0]]) as number;
      hexColor += SharedUtils.convertAlphaDecimalToHexString(alphaValue);
    }
    SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties, hexColor);
  }

  public static updateProperties(event: MouseEvent, updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const hexColor = (event.target as HTMLInputElement).value;
    if (updatedSettingSpec.customFeatureObjectKeys) {
      ColorPickerUtils.updateCustomFeature(hexColor, updatedSettingSpec, subcomponentProperties);
    } else {
      ColorPickerUtils.updateCustomCss(hexColor, updatedSettingSpec, subcomponentProperties);
    }
  }

  private static activateRemoveColorTriggers(removeColorTriggers: any, subcomponentProperties: SubcomponentProperties, allSettings: any): void {
    (removeColorTriggers || []).forEach((trigger) => {
      if (trigger.customFeatureObjectKeys) {
        SharedUtils.setCustomFeatureSetting(trigger, subcomponentProperties, allSettings);
      }
    });
  }

  private static updateCustomCssSetting(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, activeCssPseudoClass, settingToBeUpdatedSpec.cssProperty);
    if (settingToBeUpdatedSpec.cssProperty === 'boxShadow') {
      BoxShadowUtils.setBoxShadowSettingsColorValue(cssPropertyValue, settingToBeUpdatedSpec, subcomponentProperties);
    } else {
      settingToBeUpdatedSpec.default = cssPropertyValue;
    }
  }

  private static updateCustomFeatureSetting(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const keys = settingToBeUpdatedSpec.customFeatureObjectKeys;
    const hexColorValue = SharedUtils.getCustomFeatureValue(keys, subcomponentProperties[keys[0]]) as string;
    settingToBeUpdatedSpec.default = settingToBeUpdatedSpec.alphaValueCustomFeatureObjectKeys && hexColorValue !== CSS_PROPERTY_VALUES.UNSET
      ? hexColorValue.substring(0, hexColorValue.length - 2) : hexColorValue;
  }

  public static updateSettings(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    if (settingToBeUpdatedSpec.customFeatureObjectKeys) {
      ColorPickerUtils.updateCustomFeatureSetting(settingToBeUpdatedSpec, subcomponentProperties);
    } else {
      ColorPickerUtils.updateCustomCssSetting(settingToBeUpdatedSpec, subcomponentProperties);
    }
  }

  private static setCustomCssColorToInherit(updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { cssProperty } = updatedSettingSpec;
    updatedSettingSpec.default = '';
    if (!subcomponentProperties.customCss[subcomponentProperties.activeCssPseudoClass]) {
      subcomponentProperties.customCss[subcomponentProperties.activeCssPseudoClass] = {
        [cssProperty]: CSS_PROPERTY_VALUES.INHERIT};
    } else {
      subcomponentProperties.customCss[subcomponentProperties.activeCssPseudoClass]
        [cssProperty] = CSS_PROPERTY_VALUES.INHERIT;
    }
  }

  private static setCustomFeatureToUnset(updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { customFeatureObjectKeys } = updatedSettingSpec;
    updatedSettingSpec.default = CSS_PROPERTY_VALUES.UNSET;
    SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties, CSS_PROPERTY_VALUES.UNSET);
  }

  public static removeColor(updatedSettingSpec: any, removeColorTriggers: any,
      subcomponentProperties: SubcomponentProperties, allSettings: any): void {
    const { customFeatureObjectKeys } = updatedSettingSpec;
    if (customFeatureObjectKeys) {
      ColorPickerUtils.setCustomFeatureToUnset(updatedSettingSpec, subcomponentProperties);
    } else {
      ColorPickerUtils.setCustomCssColorToInherit(updatedSettingSpec, subcomponentProperties);
    }
    ColorPickerUtils.activateRemoveColorTriggers(removeColorTriggers, subcomponentProperties, allSettings);
  }
}
