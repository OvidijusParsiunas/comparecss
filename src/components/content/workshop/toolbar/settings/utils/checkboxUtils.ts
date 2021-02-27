import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import SharedUtils from './sharedUtils';

export default class CheckboxUtils {

  private static updateOtherProperties(newCheckboxValue: boolean, spec: any, subcomponentProperties: SubcomponentProperties, allSettings: any): void {
    const { customCss, customCssActiveMode } = subcomponentProperties;
    const { changeOtherProperties } = spec;
    if (changeOtherProperties && changeOtherProperties[newCheckboxValue.toString()]) {
      const handler = changeOtherProperties[newCheckboxValue.toString()];
      customCss[customCssActiveMode][handler.cssProperty] = handler.newValue;
      for (let i = 0; i < allSettings.options.length; i += 1) {
        if (allSettings.options[i].spec.cssProperty && allSettings.options[i].spec.cssProperty === handler.cssProperty) {
          allSettings.options[i].spec.default = parseInt(handler.newValue) || 0;
        }
      }
    }
  }

  private static setSetObject(newCheckboxValue: boolean, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const { setValue } = spec;
    const property = SharedUtils.getSubcomponentPropertyValue(spec.subcomponentPropertyObjectKeys, subcomponentProperties) as Set<undefined>;
    if (newCheckboxValue) {
      property.add(setValue);
    } else {
      property.delete(setValue);
    }
  }

  private static updateCustomSubcomponentProperties(newCheckboxValue: boolean, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const { subcomponentPropertyObjectKeys, isSet } = spec;
    if (isSet) {
      CheckboxUtils.setSetObject(newCheckboxValue, spec, subcomponentProperties);
    } else {
      SharedUtils.setSubcomponentPropertyValue(subcomponentPropertyObjectKeys, subcomponentProperties, newCheckboxValue);
    }
  }

  public static updateProperties(previousCheckboxValue: boolean, spec: any, subcomponentProperties: SubcomponentProperties, allSettings: any): void {
    const newCheckboxValue = !previousCheckboxValue;
    if (spec.subcomponentPropertyObjectKeys) { CheckboxUtils.updateCustomSubcomponentProperties(newCheckboxValue, spec, subcomponentProperties); }
    CheckboxUtils.updateOtherProperties(newCheckboxValue, spec, subcomponentProperties, allSettings);
  }

  private static updateSettingThatUsesCustomCss(updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, customCssActiveMode } = subcomponentProperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, customCssActiveMode, updatedSettingSpec.cssProperty);
    if (cssPropertyValue) { updatedSettingSpec.default = (cssPropertyValue === updatedSettingSpec.conditionalStyle.truthy); }
  }

  private static updateSettingThatUsesASubcomponentProperty(updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    if (updatedSettingSpec.isSet) {
      updatedSettingSpec.default = (
        SharedUtils.getSubcomponentPropertyValue(updatedSettingSpec.subcomponentPropertyObjectKeys, subcomponentProperties) as Set<undefined>
      ).has(updatedSettingSpec.setValue);
    } else {
      updatedSettingSpec.default = SharedUtils.getSubcomponentPropertyValue(updatedSettingSpec.subcomponentPropertyObjectKeys, subcomponentProperties);
    }
  }

  public static updateSettings(updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    if (updatedSettingSpec.subcomponentPropertyObjectKeys) {
      CheckboxUtils.updateSettingThatUsesASubcomponentProperty(updatedSettingSpec, subcomponentProperties);
    } else {
      CheckboxUtils.updateSettingThatUsesCustomCss(updatedSettingSpec, subcomponentProperties);
    }
  }
}
