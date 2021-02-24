import { CustomCss, SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../consts/subcomponentCssModes.enum';
import BoxShadowUtils from './boxShadowUtils';
import SharedUtils from './sharedUtils';

export default class RangeUtils {

  private static DEFAULT_RANGE_VALUE = 0;

  private static activeTriggersForCustomCss(trigger: any, subcomponentproperties: SubcomponentProperties, selectorCurrentValues: unknown): void {
    const { customCss, customCssActiveMode } = subcomponentproperties;
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, SUB_COMPONENT_CSS_MODES.CLICK, trigger.cssProperty);
    if (trigger.conditions.has(cssPropertyValue)) {
      customCss[customCssActiveMode][trigger.cssProperty] = trigger.defaultValue;
      if (trigger.selector) { selectorCurrentValues[trigger.cssProperty] = trigger.defaultValue; }
    }
  }

  private static activateTriggersForCustomSubcomponentProperties(trigger: any,
      subcomponentproperties: SubcomponentProperties, allSettings: any): void {
    const value = subcomponentproperties[trigger.subcomponentPropertiesObject][trigger.propertyKeyName];
    if (!trigger.conditions.has(value)) return;
    for (let i = 0; i < allSettings.options.length; i += 1) {
      if (allSettings.options[i].spec.subcomponentPropertiesObject
          && allSettings.options[i].spec.subcomponentPropertiesObject === trigger.subcomponentPropertiesObject) {
        allSettings.options[i].spec.default = trigger.defaultValue;
        subcomponentproperties[trigger.subcomponentPropertiesObject][trigger.propertyKeyName] = trigger.defaultValue;
      }
    }
  }

  private static activateTriggers(triggers: any, subcomponentproperties: SubcomponentProperties,
      allSettings: any, selectorCurrentValues: unknown): void {
    (triggers || []).forEach((trigger) => {
      if (trigger.subcomponentPropertiesObject) {
        RangeUtils.activateTriggersForCustomSubcomponentProperties(trigger, subcomponentproperties, allSettings);
      } else {
        RangeUtils.activeTriggersForCustomCss(trigger, subcomponentproperties, selectorCurrentValues);
      }
    });
  }

  private static updateCustomCss(rangeValue: string, spec: any, subcomponentproperties: SubcomponentProperties): void {
    const { cssProperty, smoothingDivisible, isTime } = spec;
    const { customCss, customCssActiveMode } = subcomponentproperties;
    customCss[customCssActiveMode][cssProperty] = `${Math.floor(rangeValue as unknown as number / smoothingDivisible)}${isTime ? 's': 'px'}`;
  }

  private static updateCustomSubcomponentProperties(rangeValue: string, spec: any, subcomponentproperties: SubcomponentProperties): void {
    const { subcomponentPropertiesObject, objectContainingActiveOption, activeOptionPropertyKeyName, smoothingDivisible, isTime } = spec;
    subcomponentproperties[subcomponentPropertiesObject][objectContainingActiveOption]
      [activeOptionPropertyKeyName] = `${rangeValue as unknown as number / smoothingDivisible}${isTime ? 's': 'px'}`;
  }

  private static updatePartialCss(rangeValue: string, spec: any, subcomponentproperties: SubcomponentProperties): void {
    const {cssProperty, partialCss} = spec;
    const { customCss, customCssActiveMode, auxiliaryPartialCss } = subcomponentproperties;
    if (customCss[customCssActiveMode][cssProperty] === undefined) {
      const defaultValues = [ ...partialCss.fullDefaultValues ];
      defaultValues[partialCss.position] = rangeValue;
      customCss[customCssActiveMode][cssProperty] = defaultValues.join(' ');
    } else {
      if (cssProperty === 'boxShadow') BoxShadowUtils.setUnsetBoxShadowPropertiesToZero(customCss, auxiliaryPartialCss, customCssActiveMode);
      const cssPropertyValues = customCss[customCssActiveMode][cssProperty].split(' ');
      cssPropertyValues[partialCss.position] = `${rangeValue}px`;
      customCss[customCssActiveMode][cssProperty] = cssPropertyValues.join(' ');
    }
    if (cssProperty === 'boxShadow') BoxShadowUtils.setZeroBoxShadowPropertiesToUnset(subcomponentproperties);
  }

  public static updateProperties(event: MouseEvent, updatedSetting: any, allSettings: any,
      subcomponentproperties: SubcomponentProperties, selectorCurrentValues: unknown): void {
    const { triggers, spec } = updatedSetting;
    RangeUtils.activateTriggers(triggers, subcomponentproperties, allSettings, selectorCurrentValues);
    const rangeValue = (event.target as HTMLInputElement).value;
    if (spec.partialCss != undefined) {
      RangeUtils.updatePartialCss(rangeValue, spec, subcomponentproperties);
    } else if (spec.subcomponentPropertiesObject) {
      RangeUtils.updateCustomSubcomponentProperties(rangeValue, spec, subcomponentproperties);
    } else {
      RangeUtils.updateCustomCss(rangeValue, spec, subcomponentproperties);
    }
  }

  private static parseString(value: string, smoothingDivisible: number, postfixLength: number): number {
    // may need to remove the used postfixLength
    return Number.parseFloat(value.substring(0, value.length - postfixLength)) * smoothingDivisible;
  }

  private static updateSettingThatUsesASubcomponentProperty(updatedSetting: any, subcomponentproperties: SubcomponentProperties): void {
    const rangeValue = subcomponentproperties[updatedSetting.spec.subcomponentPropertiesObject]
      [updatedSetting.spec.objectContainingActiveOption][updatedSetting.spec.activeOptionPropertyKeyName];
    updatedSetting.spec.default = RangeUtils.parseString(rangeValue, updatedSetting.spec.smoothingDivisible, 1);
  }

  private static updateSettingThatUsesCustomCss(updatedSetting: any, cssPropertyValue: string): void {
    const singlePropertyValue = updatedSetting.spec.partialCss ? cssPropertyValue.split(' ')[updatedSetting.spec.partialCss.position] : cssPropertyValue;
    updatedSetting.spec.default = RangeUtils.parseString(singlePropertyValue, updatedSetting.spec.smoothingDivisible, 2); 
  }

  public static updateSettings(updatedSetting: any, allSettings: any, customCss: CustomCss,
      customCssActiveMode: SUB_COMPONENT_CSS_MODES, subcomponentproperties: SubcomponentProperties, selectorCurrentValues: unknown): void {
    const cssPropertyValue = SharedUtils.getActiveModeCssPropertyValue(customCss, customCssActiveMode, updatedSetting.spec.cssProperty);
    if (cssPropertyValue !== undefined) {
      if (customCss[customCssActiveMode]) RangeUtils.activateTriggers(updatedSetting.triggers, subcomponentproperties, allSettings, selectorCurrentValues);
      const hasBoxShadowBeenSet = updatedSetting.spec.cssProperty === 'boxShadow' && BoxShadowUtils.setBoxShadowSettingsRangeValue(cssPropertyValue, updatedSetting.spec);
      if (!hasBoxShadowBeenSet) { RangeUtils.updateSettingThatUsesCustomCss(updatedSetting, cssPropertyValue); }
    } else if (updatedSetting.spec.subcomponentPropertiesObject) {
      RangeUtils.updateSettingThatUsesASubcomponentProperty(updatedSetting, subcomponentproperties);
    } else {
      updatedSetting.spec.default = RangeUtils.DEFAULT_RANGE_VALUE;
    }
  }
}
