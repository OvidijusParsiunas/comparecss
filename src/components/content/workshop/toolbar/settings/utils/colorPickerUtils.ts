import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import BoxShadowUtils from './boxShadowUtils';
import SharedUtils from './sharedUtils';

export default class ColorPickerUtils {

  public static UNSET_SUBCOMPONENT_PROPERTY_COLOR_VALUE = 'unset';
  public static INHERIT_SUBCOMPONENT_PROPERTY_COLOR_VALUE = 'inherit';

  private static updatePartialCustomCss(hexColor: string, updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { cssProperty, partialCss } = updatedSettingSpec;
    const { customCss, customCssActiveMode } = subcomponentProperties;
    if (customCss[customCssActiveMode][cssProperty] === undefined) {
      const defaultValues = [ ...partialCss.fullDefaultValues ];
      defaultValues[partialCss.position] = hexColor;
      if (cssProperty === 'boxShadow' && customCss[customCssActiveMode][cssProperty] === 'unset') {
        BoxShadowUtils.setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponentProperties, hexColor);
      } else {
        customCss[customCssActiveMode][cssProperty] = cssProperty === 'boxShadow' ? 'unset' : defaultValues.join(' ');
      }
    } else {
      if (cssProperty !== 'boxShadow' || (cssProperty === 'boxShadow' && customCss[customCssActiveMode][cssProperty] !== 'unset')) {
        const cssPropertyValues = customCss[customCssActiveMode][cssProperty].split(' ');
        cssPropertyValues[partialCss.position] = hexColor;
        customCss[customCssActiveMode][cssProperty] = cssPropertyValues.join(' ');
      } else if (cssProperty === 'boxShadow') {
        BoxShadowUtils.setAuxiliaryBoxShadowPropertyWithCustomColor(subcomponentProperties, hexColor);
      }
    }
  }

  private static updateCustomCss(hexColor: string, updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { cssProperty, partialCss } = updatedSettingSpec;
    const { customCss, customCssActiveMode } = subcomponentProperties;
    if (partialCss !== undefined) {
      ColorPickerUtils.updatePartialCustomCss(hexColor, updatedSettingSpec, subcomponentProperties);
    } else {
      customCss[customCssActiveMode][cssProperty] = hexColor;
    }
  }

  private static updateCustomSubcomponentProperties(hexColor: string, updatedSettingSpec: any,
      subcomponentProperties: SubcomponentProperties): void {
    const { subcomponentPropertyObjectKeys, alphaValueSubcomponentPropertyObjectKeys } = updatedSettingSpec;
    if (alphaValueSubcomponentPropertyObjectKeys) {
      const alphaValue = SharedUtils.getSubcomponentPropertyValue(alphaValueSubcomponentPropertyObjectKeys, subcomponentProperties) as number;
      hexColor += SharedUtils.convertAlphaDecimalToHexString(alphaValue);
    }
    SharedUtils.setSubcomponentPropertyValue(subcomponentPropertyObjectKeys, subcomponentProperties, hexColor);
  }

  public static updateProperties(event: MouseEvent, updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const hexColor = (event.target as HTMLInputElement).value;
    if (updatedSettingSpec.subcomponentPropertyObjectKeys) {
      ColorPickerUtils.updateCustomSubcomponentProperties(hexColor, updatedSettingSpec, subcomponentProperties);
    } else {
      ColorPickerUtils.updateCustomCss(hexColor, updatedSettingSpec, subcomponentProperties);
    }
  }

  private static activateRemoveColorTriggers(removeColorTriggers: any, subcomponentProperties: SubcomponentProperties,
      allSettings: any): void {
    (removeColorTriggers || []).forEach((trigger) => {
      if (trigger.subcomponentPropertyObjectKeys) {
        SharedUtils.setSubcomponentPropertyValueSetting(trigger, subcomponentProperties, allSettings);
      }
    });
  }

  private static setCustomCssColorToInherit(updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { cssProperty } = updatedSettingSpec;
    updatedSettingSpec.default = '';
    if (!subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode]) {
      subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode] = {
        [cssProperty]: ColorPickerUtils.INHERIT_SUBCOMPONENT_PROPERTY_COLOR_VALUE};
    } else {
      subcomponentProperties.customCss[subcomponentProperties.customCssActiveMode]
        [cssProperty] = ColorPickerUtils.INHERIT_SUBCOMPONENT_PROPERTY_COLOR_VALUE;
    }
  }

  private static setCustomSubcomponentPropertyToUnset(updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { subcomponentPropertyObjectKeys } = updatedSettingSpec;
    updatedSettingSpec.default = ColorPickerUtils.UNSET_SUBCOMPONENT_PROPERTY_COLOR_VALUE;
    SharedUtils.setSubcomponentPropertyValue(subcomponentPropertyObjectKeys, subcomponentProperties,
      ColorPickerUtils.UNSET_SUBCOMPONENT_PROPERTY_COLOR_VALUE);
  }

  public static removeColor(updatedSettingSpec: any, removeColorTriggers: any,
      subcomponentProperties: SubcomponentProperties, allSettings: any): void {
    const { subcomponentPropertyObjectKeys } = updatedSettingSpec;
    if (subcomponentPropertyObjectKeys) {
      ColorPickerUtils.setCustomSubcomponentPropertyToUnset(updatedSettingSpec, subcomponentProperties);
    } else {
      ColorPickerUtils.setCustomCssColorToInherit(updatedSettingSpec, subcomponentProperties);
    }
    ColorPickerUtils.activateRemoveColorTriggers(removeColorTriggers, subcomponentProperties, allSettings);
  }

  private static updateSettingThatUsesCustomCss(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, customCssActiveMode, auxiliaryPartialCss } = subcomponentProperties;
    let cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, customCssActiveMode, settingToBeUpdatedSpec.cssProperty);
    if (settingToBeUpdatedSpec.cssProperty === 'boxShadow' && cssPropertyValue === 'unset') {
      cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(auxiliaryPartialCss, customCssActiveMode, settingToBeUpdatedSpec.cssProperty) || BoxShadowUtils.DEFAULT_BOX_SHADOW_COLOR_VALUE;
    }
    if (cssPropertyValue) { settingToBeUpdatedSpec.default = settingToBeUpdatedSpec.partialCss
      ? cssPropertyValue.split(' ')[settingToBeUpdatedSpec.partialCss.position] : cssPropertyValue; }
  }

  private static updateSettingThatUsesASubcomponentProperty(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const hexColorValue = SharedUtils.getSubcomponentPropertyValue(settingToBeUpdatedSpec.subcomponentPropertyObjectKeys, subcomponentProperties) as string;
    settingToBeUpdatedSpec.default = settingToBeUpdatedSpec.alphaValueSubcomponentPropertyObjectKeys && hexColorValue !== 'unset'
      ? hexColorValue.substring(0, hexColorValue.length - 2) : hexColorValue;
  }

  public static updateSettings(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    if (settingToBeUpdatedSpec.subcomponentPropertyObjectKeys) {
      ColorPickerUtils.updateSettingThatUsesASubcomponentProperty(settingToBeUpdatedSpec, subcomponentProperties);
    } else {
      ColorPickerUtils.updateSettingThatUsesCustomCss(settingToBeUpdatedSpec, subcomponentProperties);
    }
  }
}
