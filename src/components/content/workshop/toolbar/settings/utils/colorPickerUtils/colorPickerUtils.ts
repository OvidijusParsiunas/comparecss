import { CustomFeaturesUtils } from '../../../../utils/componentManipulation/utils/customFeaturesUtils';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { Subcomponent } from '../../../../../../../interfaces/workshopComponent';
import { UpdateOtherColorsUtils } from './updateOtherColorsUtils';
import BoxShadowUtils from '../boxShadowUtils';
import SharedUtils from '../sharedUtils';

export class ColorPickerUtils {

  private static updateCustomCss(hexColor: string, updatedSettingSpec: any, subcomponent: Subcomponent): void {
    const { cssProperty, partialCss } = updatedSettingSpec;
    const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    if (partialCss !== undefined) {
      if (cssProperty === 'boxShadow') BoxShadowUtils.updateBoxShadowColorValue(hexColor, updatedSettingSpec, subcomponent);
    } else {
      customCss[activeCssPseudoClassesDropdownItem][cssProperty] = hexColor;
      UpdateOtherColorsUtils.updateOtherCssProperties(updatedSettingSpec.updateOtherCssProperties, activeCssPseudoClassesDropdownItem, hexColor);
    }
  }

  private static updateCustomFeature(hexColor: string, updatedSettingSpec: any, subcomponent: Subcomponent): void {
    const { customFeatureObjectKeys, alphaValueCustomFeatureObjectKeys } = updatedSettingSpec;
    if (alphaValueCustomFeatureObjectKeys) {
      const keys = alphaValueCustomFeatureObjectKeys;
      const alphaValue = CustomFeaturesUtils.getCustomFeatureValue(keys, subcomponent[keys[0]]) as number;
      hexColor += SharedUtils.convertAlphaDecimalToHexString(alphaValue);
    }
    CustomFeaturesUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponent, hexColor);
  }

  public static updateProperties(event: MouseEvent, updatedSettingSpec: any, subcomponent: Subcomponent): void {
    const hexColor = (event.target as HTMLInputElement).value;
    if (updatedSettingSpec.customFeatureObjectKeys) {
      ColorPickerUtils.updateCustomFeature(hexColor, updatedSettingSpec, subcomponent);
    } else {
      ColorPickerUtils.updateCustomCss(hexColor, updatedSettingSpec, subcomponent);
    }
  }

  private static activateRemoveColorTriggers(removeColorTriggers: any, subcomponent: Subcomponent, allSettings: any): void {
    (removeColorTriggers || []).forEach((trigger) => {
      if (trigger.customFeatureObjectKeys) {
        SharedUtils.setCustomFeatureSetting(trigger, subcomponent, allSettings);
      }
    });
  }

  private static updateCustomCssSetting(settingToBeUpdatedSpec: any, subcomponent: Subcomponent): void {
    const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, activeCssPseudoClassesDropdownItem, settingToBeUpdatedSpec.cssProperty);
    if (settingToBeUpdatedSpec.cssProperty === 'boxShadow') {
      BoxShadowUtils.setBoxShadowSettingsColorValue(cssPropertyValue, settingToBeUpdatedSpec, subcomponent);
    } else {
      settingToBeUpdatedSpec.default = cssPropertyValue;
      UpdateOtherColorsUtils.updateOtherCssProperties(settingToBeUpdatedSpec.updateOtherCssProperties, activeCssPseudoClassesDropdownItem, cssPropertyValue);
    }
  }

  private static updateCustomFeatureSetting(settingToBeUpdatedSpec: any, subcomponent: Subcomponent): void {
    const keys = settingToBeUpdatedSpec.customFeatureObjectKeys;
    const hexColorValue = CustomFeaturesUtils.getCustomFeatureValue(keys, subcomponent[keys[0]]) as string;
    settingToBeUpdatedSpec.default = settingToBeUpdatedSpec.alphaValueCustomFeatureObjectKeys && hexColorValue !== CSS_PROPERTY_VALUES.UNSET
      ? hexColorValue.substring(0, hexColorValue.length - 2) : hexColorValue;
  }

  public static updateSettings(settingToBeUpdatedSpec: any, subcomponent: Subcomponent): void {
    if (settingToBeUpdatedSpec.customFeatureObjectKeys) {
      ColorPickerUtils.updateCustomFeatureSetting(settingToBeUpdatedSpec, subcomponent);
    } else {
      ColorPickerUtils.updateCustomCssSetting(settingToBeUpdatedSpec, subcomponent);
    }
  }

  private static setCustomCssColorToInherit(updatedSettingSpec: any, subcomponent: Subcomponent): void {
    const { cssProperty } = updatedSettingSpec;
    updatedSettingSpec.default = '';
    if (!subcomponent.customCss[subcomponent.activeCssPseudoClassesDropdownItem]) {
      subcomponent.customCss[subcomponent.activeCssPseudoClassesDropdownItem] = {
        [cssProperty]: CSS_PROPERTY_VALUES.INHERIT };
    } else {
      subcomponent.customCss[subcomponent.activeCssPseudoClassesDropdownItem]
        [cssProperty] = CSS_PROPERTY_VALUES.INHERIT;
    }
  }

  private static setCustomFeatureToUnset(updatedSettingSpec: any, subcomponent: Subcomponent): void {
    const { customFeatureObjectKeys } = updatedSettingSpec;
    updatedSettingSpec.default = CSS_PROPERTY_VALUES.UNSET;
    CustomFeaturesUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponent, CSS_PROPERTY_VALUES.UNSET);
  }

  public static removeColor(updatedSettingSpec: any, removeColorTriggers: any,
      subcomponent: Subcomponent, allSettings: any): void {
    const { customFeatureObjectKeys } = updatedSettingSpec;
    if (customFeatureObjectKeys) {
      ColorPickerUtils.setCustomFeatureToUnset(updatedSettingSpec, subcomponent);
    } else {
      ColorPickerUtils.setCustomCssColorToInherit(updatedSettingSpec, subcomponent);
    }
    ColorPickerUtils.activateRemoveColorTriggers(removeColorTriggers, subcomponent, allSettings);
  }
}
