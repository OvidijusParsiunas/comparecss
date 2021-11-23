import { CustomSettingTriggerFunction } from '../../../../../../interfaces/CustomSettingTriggerFunction';
import { Subcomponent } from '../../../../../../interfaces/workshopComponent';
import { UpdateOtherRangesUtils } from './rangeUtils/updateOtherRangesUtils';
import SharedUtils from './sharedUtils';

export default class CheckboxUtils {

  private static updateCustomFeatureViaTrigger(trigger: any, subcomponent: Subcomponent): void {
    if (trigger.updateUsingValueFromAnotherObjectKeys) {
      const keys = trigger.updateUsingValueFromAnotherObjectKeys;
      const valueFromAnotherObject = SharedUtils.getCustomFeatureValue(keys, subcomponent[keys[0]]);
      SharedUtils.setCustomFeatureValue(trigger.customFeatureObjectKeys, subcomponent, valueFromAnotherObject);
    }
  }

  private static updateCssProperty(trigger: any, subcomponent: Subcomponent, thisSettingSpec: any,
      allSettings: any, newCalculatedValue?: string): void {
    const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    const { cssProperty, newValue, pseudoClass } = trigger;
    const newResultValue = newCalculatedValue || newValue;
    customCss[pseudoClass || activeCssPseudoClassesDropdownItem][cssProperty] = newResultValue;
    for (let i = 0; i < allSettings.options.length; i += 1) {
      if (thisSettingSpec !== allSettings.options[i].spec && allSettings.options[i]?.spec?.cssProperty === cssProperty) {
        allSettings.options[i].spec.default = parseInt(newResultValue) || 0;
      }
    }
  }
  
  private static triggerCustomFunction(trigger: any, subcomponent: Subcomponent): void {
    const customFunction = SharedUtils.getCustomFeatureValue(
      trigger.customFunctionKeys, subcomponent[trigger.customFunctionKeys[0]]) as CustomSettingTriggerFunction;
    customFunction(subcomponent);
  }
  
  private static activateTriggers(newCheckboxValue: boolean, triggers: any, subcomponent: Subcomponent,
      thisSettingSpec: any, allSettings: any): void {
    (triggers[newCheckboxValue.toString()] || []).forEach((trigger) => {
      if (trigger.customFunctionKeys) {
        CheckboxUtils.triggerCustomFunction(trigger, subcomponent);
      } else if (trigger.cssProperty) {
        CheckboxUtils.updateCssProperty(trigger, subcomponent, thisSettingSpec, allSettings);
      } else if (trigger.customFeatureObjectKeys) {
        CheckboxUtils.updateCustomFeatureViaTrigger(trigger, subcomponent)
      } else if (trigger.currentOptionSettingSpec && trigger.currentOptionSettingSpec.updateSettingSpecViaOtherSettings) {
        UpdateOtherRangesUtils.updateCurrentOptionSettingAndCustomFeature(trigger.currentOptionSettingSpec, subcomponent);
      }
    });
  }

  private static setSetObject(newCheckboxValue: boolean, valueInSetObject: any, customFeatureObjectKeys: string[],
      subcomponent: Subcomponent): void {
    const property = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponent[customFeatureObjectKeys[0]]) as Set<undefined>;
    if (newCheckboxValue) {
      property.add(valueInSetObject);
    } else {
      property.delete(valueInSetObject);
    }
  }

  private static updateCustomFeature(newCheckboxValue: boolean, spec: any, subcomponent: Subcomponent): void {
    const { valueInSetObject, customFeatureObjectKeys } = spec;
    if (valueInSetObject) {
      CheckboxUtils.setSetObject(newCheckboxValue, valueInSetObject, customFeatureObjectKeys, subcomponent);
    } else {
      SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponent, newCheckboxValue);
    }
  }

  public static updateProperties(currentCheckboxValue: boolean, spec: any, triggers: any, subcomponent: Subcomponent,
      allSettings: any): void {
    // need to pass the currentCheckboxValue directly instead of using spec.default as its value will already have been
    // changed by the time this method is called by the following: this.$emit('remove-insync-option-button', callback as RemoveInSyncOptionButton);
    const newCheckboxValue = !currentCheckboxValue;
    if (spec.customFeatureObjectKeys) { CheckboxUtils.updateCustomFeature(newCheckboxValue, spec, subcomponent); }
    if (triggers) { CheckboxUtils.activateTriggers(newCheckboxValue, triggers, subcomponent, spec, allSettings); }
  }

  private static updateCustomCssSetting(settingToBeUpdatedSpec: any, subcomponent: Subcomponent): void {
    const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, activeCssPseudoClassesDropdownItem, settingToBeUpdatedSpec.cssProperty);
    if (cssPropertyValue) { settingToBeUpdatedSpec.default = (cssPropertyValue === settingToBeUpdatedSpec.conditionalStyle.truthy); }
  }

  private static updateCustomFeatureSetting(settingToBeUpdated: any, subcomponent: Subcomponent): void {
    const { spec, triggers } = settingToBeUpdated;
    const keys = spec.customFeatureObjectKeys
    if (spec.valueInSetObject) {
      spec.default = (SharedUtils.getCustomFeatureValue(keys, subcomponent[keys[0]]) as Set<undefined>).has(spec.valueInSetObject);
    } else {
      spec.default = SharedUtils.getCustomFeatureValue(keys, subcomponent[keys[0]]);
      (triggers?.[spec.default] || []).forEach((trigger) => {
        if (trigger.customFunctionKeys) { CheckboxUtils.triggerCustomFunction(trigger, subcomponent); }
      });
    }
  }

  public static updateSettings(settingToBeUpdated: any, subcomponent: Subcomponent): void {
    if (settingToBeUpdated.spec.customFeatureObjectKeys) {
      CheckboxUtils.updateCustomFeatureSetting(settingToBeUpdated, subcomponent);
    } else {
      CheckboxUtils.updateCustomCssSetting(settingToBeUpdated.spec, subcomponent);
    }
  }
}
