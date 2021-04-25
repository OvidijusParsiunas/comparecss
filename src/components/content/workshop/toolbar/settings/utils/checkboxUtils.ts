import { CustomFeatures, SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import SharedUtils from './sharedUtils';

export default class CheckboxUtils {
  
  private static activateTriggers(newCheckboxValue: boolean, triggers: any, subcomponentProperties: SubcomponentProperties,
      thisSettingSpec: any, allSettings: any): void {
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    (triggers[newCheckboxValue.toString()] || []).forEach((trigger) => {
      const { cssProperty, newValue } = trigger;
      customCss[activeCssPseudoClass][cssProperty] = newValue;
      for (let i = 0; i < allSettings.options.length; i += 1) {
        if (thisSettingSpec !== allSettings.options[i].spec && allSettings.options[i].spec.cssProperty
            && allSettings.options[i].spec.cssProperty === cssProperty) {
          allSettings.options[i].spec.default = parseInt(newValue) || 0;
        }
      }
    });
  }

  private static setSetObject(newCheckboxValue: boolean, valueInSetObject: any, customFeatureObjectKeys: string[], subcomponentProperties: SubcomponentProperties): void {
    const property = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties.customFeatures) as Set<undefined>;
    if (newCheckboxValue) {
      property.add(valueInSetObject);
    } else {
      property.delete(valueInSetObject);
    }
  }

  private static updateCustomFeature(newCheckboxValue: boolean, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const { valueInSetObject, customFeatureObjectKeys } = spec;
    if (valueInSetObject) {
      CheckboxUtils.setSetObject(newCheckboxValue, valueInSetObject, customFeatureObjectKeys, subcomponentProperties);
    } else {
      SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties.customFeatures, newCheckboxValue);
    }
  }

  public static updateProperties(currentCheckboxValue: boolean, spec: any, triggers: any, subcomponentProperties: SubcomponentProperties, allSettings: any): void {
    // need to pass the currentCheckboxValue directly instead of using spec.default as its value will already have been
    // changed by the time this method is called by the following: this.$emit('remove-insync-option-button', callback);
    const newCheckboxValue = !currentCheckboxValue;
    if (spec.customFeatureObjectKeys) { CheckboxUtils.updateCustomFeature(newCheckboxValue, spec, subcomponentProperties); }
    if (triggers) { CheckboxUtils.activateTriggers(newCheckboxValue, triggers, subcomponentProperties, spec, allSettings) }
  }

  private static updateCustomCssSetting(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, activeCssPseudoClass, settingToBeUpdatedSpec.cssProperty);
    if (cssPropertyValue) { settingToBeUpdatedSpec.default = (cssPropertyValue === settingToBeUpdatedSpec.conditionalStyle.truthy); }
  }

  private static updateCustomFeatureSetting(settingToBeUpdatedSpec: any, customFeatures: CustomFeatures): void {
    if (settingToBeUpdatedSpec.valueInSetObject) {
      settingToBeUpdatedSpec.default = (
        SharedUtils.getCustomFeatureValue(settingToBeUpdatedSpec.customFeatureObjectKeys, customFeatures) as Set<undefined>
      ).has(settingToBeUpdatedSpec.valueInSetObject);
    } else {
      settingToBeUpdatedSpec.default = SharedUtils.getCustomFeatureValue(settingToBeUpdatedSpec.customFeatureObjectKeys, customFeatures);
    }
  }

  public static updateSettings(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    if (settingToBeUpdatedSpec.customFeatureObjectKeys) {
      CheckboxUtils.updateCustomFeatureSetting(settingToBeUpdatedSpec, subcomponentProperties.customFeatures);
    } else {
      CheckboxUtils.updateCustomCssSetting(settingToBeUpdatedSpec, subcomponentProperties);
    }
  }
}
