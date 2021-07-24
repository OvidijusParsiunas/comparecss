import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import { UpdateOtherRangesUtils } from './rangeUtils/updateOtherRangesUtils';
import SharedUtils from './sharedUtils';

export default class CheckboxUtils {

  private static updateCustomFeatureViaTrigger(trigger: any, subcomponentProperties: SubcomponentProperties): void {
    if (trigger.updateUsingValueFromAnotherObjectKeys) {
      const keys = trigger.updateUsingValueFromAnotherObjectKeys;
      const valueFromAnotherObject = SharedUtils.getCustomFeatureValue(keys, subcomponentProperties[keys[0]]);
      SharedUtils.setCustomFeatureValue(trigger.customFeatureObjectKeys, subcomponentProperties, valueFromAnotherObject);
    }
  }

  private static updateCssProperty(trigger: any, subcomponentProperties: SubcomponentProperties, thisSettingSpec: any, allSettings: any): void {
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const { cssProperty, newValue, pseudoClass } = trigger;
    customCss[pseudoClass || activeCssPseudoClass][cssProperty] = newValue;
    for (let i = 0; i < allSettings.options.length; i += 1) {
      if (thisSettingSpec !== allSettings.options[i].spec && allSettings.options[i]?.spec?.cssProperty === cssProperty) {
        allSettings.options[i].spec.default = parseInt(newValue) || 0;
      }
    }
  }
  
  private static activateTriggers(newCheckboxValue: boolean, triggers: any, subcomponentProperties: SubcomponentProperties,
      thisSettingSpec: any, allSettings: any): void {
    (triggers[newCheckboxValue.toString()] || []).forEach((trigger) => {
      if (trigger.cssProperty) {
        CheckboxUtils.updateCssProperty(trigger, subcomponentProperties, thisSettingSpec, allSettings);
      } else if (trigger.customFeatureObjectKeys) {
        CheckboxUtils.updateCustomFeatureViaTrigger(trigger, subcomponentProperties)
      } else if (trigger.currentOptionSettingSpec && trigger.currentOptionSettingSpec.updateSettingSpecViaOtherSettings) {
        UpdateOtherRangesUtils.updateCurrentOptionSettingAndCustomFeature(trigger.currentOptionSettingSpec, subcomponentProperties);
      }
    });
  }

  private static setSetObject(newCheckboxValue: boolean, valueInSetObject: any, customFeatureObjectKeys: string[],
      subcomponentProperties: SubcomponentProperties): void {
    const property = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties[customFeatureObjectKeys[0]]) as Set<undefined>;
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
      SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties, newCheckboxValue);
    }
  }

  public static updateProperties(currentCheckboxValue: boolean, spec: any, triggers: any, subcomponentProperties: SubcomponentProperties, allSettings: any): void {
    // need to pass the currentCheckboxValue directly instead of using spec.default as its value will already have been
    // changed by the time this method is called by the following: this.$emit('remove-insync-option-button', callback as RemoveInSyncOptionButton);
    const newCheckboxValue = !currentCheckboxValue;
    if (spec.customFeatureObjectKeys) { CheckboxUtils.updateCustomFeature(newCheckboxValue, spec, subcomponentProperties); }
    if (triggers) { CheckboxUtils.activateTriggers(newCheckboxValue, triggers, subcomponentProperties, spec, allSettings); }
  }

  private static updateCustomCssSetting(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, activeCssPseudoClass, settingToBeUpdatedSpec.cssProperty);
    if (cssPropertyValue) { settingToBeUpdatedSpec.default = (cssPropertyValue === settingToBeUpdatedSpec.conditionalStyle.truthy); }
  }

  private static updateCustomFeatureSetting(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const keys = settingToBeUpdatedSpec.customFeatureObjectKeys
    if (settingToBeUpdatedSpec.valueInSetObject) {
      settingToBeUpdatedSpec.default = (
        SharedUtils.getCustomFeatureValue(keys, subcomponentProperties[keys[0]]) as Set<undefined>
      ).has(settingToBeUpdatedSpec.valueInSetObject);
    } else {
      settingToBeUpdatedSpec.default = SharedUtils.getCustomFeatureValue(keys, subcomponentProperties[keys[0]]);
    }
  }

  public static updateSettings(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    if (settingToBeUpdatedSpec.customFeatureObjectKeys) {
      CheckboxUtils.updateCustomFeatureSetting(settingToBeUpdatedSpec, subcomponentProperties);
    } else {
      CheckboxUtils.updateCustomCssSetting(settingToBeUpdatedSpec, subcomponentProperties);
    }
  }
}
