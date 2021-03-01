import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import SharedUtils from './sharedUtils';

export default class CheckboxUtils {
  
  private static activateTriggers(newCheckboxValue: boolean, triggers: any, subcomponentProperties: SubcomponentProperties, allSettings: any): void {
    const { customCss, customCssActiveMode } = subcomponentProperties;
    (triggers[newCheckboxValue.toString()] || []).forEach((trigger) => {
      const { cssProperty, newValue } = trigger;
      customCss[customCssActiveMode][cssProperty] = newValue;
      for (let i = 0; i < allSettings.options.length; i += 1) {
        if (allSettings.options[i].spec.cssProperty && allSettings.options[i].spec.cssProperty === cssProperty) {
          allSettings.options[i].spec.default = parseInt(newValue) || 0;
        }
      }
    });
  }

  private static setSetObject(newCheckboxValue: boolean, valueInSetObject: any, subcomponentPropertyObjectKeys: any[], subcomponentProperties: SubcomponentProperties): void {
    const property = SharedUtils.getSubcomponentPropertyValue(subcomponentPropertyObjectKeys, subcomponentProperties) as Set<undefined>;
    if (newCheckboxValue) {
      property.add(valueInSetObject);
    } else {
      property.delete(valueInSetObject);
    }
  }

  private static updateCustomSubcomponentProperties(newCheckboxValue: boolean, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const { valueInSetObject, subcomponentPropertyObjectKeys } = spec;
    if (valueInSetObject) {
      CheckboxUtils.setSetObject(newCheckboxValue, valueInSetObject, subcomponentPropertyObjectKeys, subcomponentProperties);
    } else {
      SharedUtils.setSubcomponentPropertyValue(subcomponentPropertyObjectKeys, subcomponentProperties, newCheckboxValue);
    }
  }

  public static updateProperties(spec: any, triggers: any, subcomponentProperties: SubcomponentProperties, allSettings: any): void {
    const newCheckboxValue = !spec.default;
    if (spec.subcomponentPropertyObjectKeys) { CheckboxUtils.updateCustomSubcomponentProperties(newCheckboxValue, spec, subcomponentProperties); }
    if (triggers) { CheckboxUtils.activateTriggers(newCheckboxValue, triggers, subcomponentProperties, allSettings) }
  }

  private static updateSettingThatUsesCustomCss(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, customCssActiveMode } = subcomponentProperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, customCssActiveMode, settingToBeUpdatedSpec.cssProperty);
    if (cssPropertyValue) { settingToBeUpdatedSpec.default = (cssPropertyValue === settingToBeUpdatedSpec.conditionalStyle.truthy); }
  }

  private static updateSettingThatUsesASubcomponentProperty(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    if (settingToBeUpdatedSpec.valueInSetObject) {
      settingToBeUpdatedSpec.default = (
        SharedUtils.getSubcomponentPropertyValue(settingToBeUpdatedSpec.subcomponentPropertyObjectKeys, subcomponentProperties) as Set<undefined>
      ).has(settingToBeUpdatedSpec.valueInSetObject);
    } else {
      settingToBeUpdatedSpec.default = SharedUtils.getSubcomponentPropertyValue(settingToBeUpdatedSpec.subcomponentPropertyObjectKeys, subcomponentProperties);
    }
  }

  public static updateSettings(settingToBeUpdatedSpec: any, subcomponentProperties: SubcomponentProperties): void {
    if (settingToBeUpdatedSpec.subcomponentPropertyObjectKeys) {
      CheckboxUtils.updateSettingThatUsesASubcomponentProperty(settingToBeUpdatedSpec, subcomponentProperties);
    } else {
      CheckboxUtils.updateSettingThatUsesCustomCss(settingToBeUpdatedSpec, subcomponentProperties);
    }
  }
}
