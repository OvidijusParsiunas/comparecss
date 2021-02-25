import { ComponentJavascriptClasses } from '../../../../../../interfaces/componentJavascriptClasses';
import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import SharedUtils from './sharedUtils';

export default class CheckboxUtils {

  private static activateTriggers(newCheckboxValue: boolean, triggers: any, subcomponentProperties: SubcomponentProperties, allSettings: any): void {
    const { customCss, customCssActiveMode } = subcomponentProperties;
    if (triggers && triggers[newCheckboxValue.toString()]) {
      const trigger = triggers[newCheckboxValue.toString()];
      customCss[customCssActiveMode][trigger.cssProperty] = trigger.defaultValue;
      for (let i = 0; i < allSettings.options.length; i += 1) {
        if (allSettings.options[i].spec.cssProperty && allSettings.options[i].spec.cssProperty === trigger.cssProperty) {
          allSettings.options[i].spec.default = parseInt(trigger.defaultValue) || 0;
        }
      }
    }
  }

  private static updateCustomSubcomponentProperties(newCheckboxValue: boolean, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const { subcomponentPropertiesObject, propertyKeyName } = spec;
    subcomponentProperties[subcomponentPropertiesObject][propertyKeyName] = newCheckboxValue;
  }

  private static updateJavscriptClasses(newCheckboxValue: boolean, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const { jsClassName } = spec;
    const { jsClasses } = subcomponentProperties;
    if (newCheckboxValue) {
      jsClasses.add(jsClassName);
    } else {
      jsClasses.delete(jsClassName);
    }
  }

  public static updateProperties(previousCheckboxValue: boolean, spec: any, triggers: any,
      subcomponentProperties: SubcomponentProperties, allSettings: any): void {
    const newCheckboxValue = !previousCheckboxValue;
    if (spec.javascript) {
      CheckboxUtils.updateJavscriptClasses(newCheckboxValue, spec, subcomponentProperties);
    } else if (spec.subcomponentPropertiesObject) {
      CheckboxUtils.updateCustomSubcomponentProperties(newCheckboxValue, spec, subcomponentProperties);
    }
    CheckboxUtils.activateTriggers(newCheckboxValue, triggers, subcomponentProperties, allSettings);
  }

  private static updateSettingThatUsesCustomCss(updatedSetting: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, customCssActiveMode } = subcomponentProperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, customCssActiveMode, updatedSetting.spec.cssProperty);
    if (cssPropertyValue) { updatedSetting.spec.default = (cssPropertyValue === updatedSetting.spec.conditionalStyle.truthy); }
  }

  public static updateSettings(updatedSetting: any, jsClasses: ComponentJavascriptClasses, subcomponentProperties: SubcomponentProperties): void {
    if (updatedSetting.spec.javascript) {
      updatedSetting.spec.default = jsClasses.has(updatedSetting.spec.jsClassName);
    } else if (updatedSetting.spec.subcomponentPropertiesObject) {
      updatedSetting.spec.default = subcomponentProperties[updatedSetting.spec.subcomponentPropertiesObject][updatedSetting.spec.propertyKeyName];
    } else {
      CheckboxUtils.updateSettingThatUsesCustomCss(updatedSetting, subcomponentProperties);
    }
  }
}
