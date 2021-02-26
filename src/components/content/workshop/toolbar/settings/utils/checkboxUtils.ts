import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import SharedUtils from './sharedUtils';

export default class CheckboxUtils {

  private static updateHandlerValues(newCheckboxValue: boolean, spec: any, subcomponentProperties: SubcomponentProperties, allSettings: any): void {
    const { customCss, customCssActiveMode } = subcomponentProperties;
    const { handlers } = spec;
    if (handlers && handlers[newCheckboxValue.toString()]) {
      const handler = handlers[newCheckboxValue.toString()];
      customCss[customCssActiveMode][handler.cssProperty] = handler.newValue;
      for (let i = 0; i < allSettings.options.length; i += 1) {
        if (allSettings.options[i].spec.cssProperty && allSettings.options[i].spec.cssProperty === handler.cssProperty) {
          allSettings.options[i].spec.default = parseInt(handler.newValue) || 0;
        }
      }
    }
  }

  // these two methods may be extracted into sharedUtils if used by other utils
  private static getSubcomponentPropertyObject(subcomponentProperties: SubcomponentProperties, spec: any): any {
    const { subcomponentPropertiesObject, activeOptionPropertyKeyName } = spec;
    if (activeOptionPropertyKeyName) {
      return subcomponentProperties[subcomponentPropertiesObject][activeOptionPropertyKeyName];
    }
    return subcomponentProperties[subcomponentPropertiesObject];
  }

  private static setSubcomponentPropertyObject(newCheckboxValue: boolean, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const { subcomponentPropertiesObject, activeOptionPropertyKeyName } = spec;
    if (activeOptionPropertyKeyName) {
      subcomponentProperties[subcomponentPropertiesObject][activeOptionPropertyKeyName] = newCheckboxValue;
      return;
    }
    subcomponentProperties[subcomponentPropertiesObject] = newCheckboxValue;
    return;
  }

  private static setSetObject(newCheckboxValue: boolean, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const { setValue } = spec;
    const property = CheckboxUtils.getSubcomponentPropertyObject(subcomponentProperties, spec);
    if (newCheckboxValue) {
      property.add(setValue);
    } else {
      property.delete(setValue);
    }
  }

  private static updateCustomSubcomponentProperties(newCheckboxValue: boolean, spec: any, subcomponentProperties: SubcomponentProperties): void {
    if (spec.isSet) {
      CheckboxUtils.setSetObject(newCheckboxValue, spec, subcomponentProperties);
    } else {
      CheckboxUtils.setSubcomponentPropertyObject(newCheckboxValue, spec, subcomponentProperties);
    }
  }

  public static updateProperties(previousCheckboxValue: boolean, spec: any, subcomponentProperties: SubcomponentProperties, allSettings: any): void {
    const newCheckboxValue = !previousCheckboxValue;
    if (spec.subcomponentPropertiesObject) { CheckboxUtils.updateCustomSubcomponentProperties(newCheckboxValue, spec, subcomponentProperties); }
    CheckboxUtils.updateHandlerValues(newCheckboxValue, spec, subcomponentProperties, allSettings);
  }

  private static updateSettingThatUsesCustomCss(updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, customCssActiveMode } = subcomponentProperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, customCssActiveMode, updatedSettingSpec.cssProperty);
    if (cssPropertyValue) { updatedSettingSpec.default = (cssPropertyValue === updatedSettingSpec.conditionalStyle.truthy); }
  }

  public static updateSettings(updatedSettingSpec: any, subcomponentProperties: SubcomponentProperties): void {
    if (updatedSettingSpec.subcomponentPropertiesObject) {
      if (updatedSettingSpec.isSet) {
        updatedSettingSpec.default = CheckboxUtils.getSubcomponentPropertyObject(subcomponentProperties, updatedSettingSpec).has(updatedSettingSpec.setValue);
      } else {
        updatedSettingSpec.default = CheckboxUtils.getSubcomponentPropertyObject(subcomponentProperties, updatedSettingSpec);
      }
    } else {
      CheckboxUtils.updateSettingThatUsesCustomCss(updatedSettingSpec, subcomponentProperties);
    }
  }
}
