import { TemporaryDropdownValue } from '../../../../../../../interfaces/temporaryDropdownValue';
import { MouseClickOptionEvent } from '../../../../../../../interfaces/dropdownMenuMouseEvents';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';
import SharedUtils from '../../utils/sharedUtils';
import { ComponentOptions } from 'vue';

export default class ActionsDropdownUtils {

  public static TEMPORARY_VALUE_UNUSED = null;

  public static getObjectContainingActiveOption(subcomponentProperties: SubcomponentProperties, cssProperty: string): WorkshopComponentCss {
    const { activeCssPseudoClass, customCss } = subcomponentProperties;
    if (customCss[activeCssPseudoClass]?.[cssProperty]) {
      return customCss[activeCssPseudoClass];
    }
    return { [cssProperty] : SharedUtils.getActiveModeCssPropertyValue(customCss, activeCssPseudoClass, cssProperty) };
  }

  public static mouseEnterActionsDropdownButton(temporaryDropdownValue: TemporaryDropdownValue, subcomponentProperties: SubcomponentProperties,
      settingSpecCssProperty: string): void {
    if (temporaryDropdownValue.new === ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      const { activeCssPseudoClass, customCss } = subcomponentProperties;
      temporaryDropdownValue.new = customCss[activeCssPseudoClass]?.[settingSpecCssProperty]
        ? customCss[activeCssPseudoClass][settingSpecCssProperty]
        : SharedUtils.getActiveModeCssPropertyValue(customCss, activeCssPseudoClass, settingSpecCssProperty);
    }
  }

  public static mouseEnterActionsDropdownOptionCustomCss(temporaryDropdownValue: TemporaryDropdownValue, triggeredOptionName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any): void {
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const { cssProperty } = settingSpec;
    if (temporaryDropdownValue.initial === ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      temporaryDropdownValue.initial = (customCss[activeCssPseudoClass]?.[cssProperty]);
    }
    if (customCss[activeCssPseudoClass]) {
      customCss[activeCssPseudoClass][cssProperty] = triggeredOptionName;
    } else {
      customCss[activeCssPseudoClass] = { [cssProperty]: triggeredOptionName };
    }
  }

  // called third when selecting option (if statement to prevent logic from triggering on select)
  public static mouseLeaveActionsDropdownCustomCss(temporaryDropdownValue: TemporaryDropdownValue,
      subcomponentProperties: SubcomponentProperties, settingSpec: any): void {
    if (temporaryDropdownValue.initial !== ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      const { customCss, activeCssPseudoClass } = subcomponentProperties;
      customCss[activeCssPseudoClass][settingSpec.cssProperty] = temporaryDropdownValue.initial;
      temporaryDropdownValue.initial = ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED;
    }
  }

  public static mouseEnterActionsDropdownOptionCustomFeature(temporaryDropdownValue: TemporaryDropdownValue, triggeredOptionName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any, settingsComponent: ComponentOptions): void {
    const { customFeatureObjectKeys, mouseEnterOptionCallback } = settingSpec;
    const previousOptionName = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties[customFeatureObjectKeys[0]]) as string;
    if (temporaryDropdownValue.initial === ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      temporaryDropdownValue.initial = previousOptionName;
    }
    if (mouseEnterOptionCallback) mouseEnterOptionCallback({subcomponentProperties, settingsComponent, previousOptionName, triggeredOptionName});
    SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties, triggeredOptionName);
    temporaryDropdownValue.new = triggeredOptionName;
  }

  // called third when selecting option (if statement to prevent logic from triggering on select)
  public static mouseLeaveActionsDropdownOptionCustomFeature(temporaryDropdownValue: TemporaryDropdownValue,
      subcomponentProperties: SubcomponentProperties, settingSpec: any, settingsComponent: ComponentOptions, isDropdownHidden: boolean): void {
    if (temporaryDropdownValue.new !== ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      const { customFeatureObjectKeys, mouseLeaveDropdownCallback } = settingSpec;
      if (mouseLeaveDropdownCallback) mouseLeaveDropdownCallback({subcomponentProperties, settingsComponent,
        previousOptionName: temporaryDropdownValue.new, triggeredOptionName: temporaryDropdownValue.initial, isDropdownHidden});
      SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties, temporaryDropdownValue.initial);
    }
    temporaryDropdownValue.new = ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED;
    temporaryDropdownValue.initial = ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED;
  }

  private static updateSettingAndPropertyValues(trigger: any, allSettings: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const { cssProperty: triggerCssProperty, defaultValue } = trigger;
    for (let i = 0; i < allSettings.options.length; i += 1) {
      if (allSettings.options[i].spec.cssProperty === triggerCssProperty) {
        const rawDefaultValue = typeof defaultValue === 'string' ? Number.parseInt(defaultValue) : defaultValue;
        allSettings.options[i].spec.default = rawDefaultValue;
        customCss[activeCssPseudoClass][triggerCssProperty] = defaultValue;
      }
    }
  }

  private static activateCustomCssTriggers(trigger: any, allSettings: any, subcomponentProperties: SubcomponentProperties): void {
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const { conditions, negativeConditions, cssProperty: triggerCssProperty } = trigger;
    const extractedTriggerCssProperty = SharedUtils.getActiveModeCssPropertyValue(customCss, activeCssPseudoClass, triggerCssProperty);
    const conditionValue = typeof extractedTriggerCssProperty === 'string' ? Number.parseInt(extractedTriggerCssProperty) : extractedTriggerCssProperty;
    const conditionMet = (conditions && conditions.has(conditionValue)) || (negativeConditions && !negativeConditions.has(conditionValue));
    if (conditionMet) {
      ActionsDropdownUtils.updateSettingAndPropertyValues(trigger, allSettings, subcomponentProperties);
    }
  }

  // called first when selecting option
  public static mouseClickActionsDropdownNewOption(triggeredOptionName: string, subcomponentProperties: SubcomponentProperties,
      settingSpec: any, activeOptionsObject: any): void {
    const { cssProperty, customFeatureObjectKeys } = settingSpec;
    if (cssProperty) {
      const { activeCssPseudoClass, customCss } = subcomponentProperties;
      customCss[activeCssPseudoClass][cssProperty] = triggeredOptionName;
      activeOptionsObject[cssProperty] = triggeredOptionName;
    } else if (customFeatureObjectKeys) {
      SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties, triggeredOptionName);
    }
  }

  // called second when selecting option
  public static mouseClickActionsDropdownOption(temporaryDropdownValue: TemporaryDropdownValue, mouseClickOptionEvent: MouseClickOptionEvent,
      setting: any, allSettings: any, subcomponentProperties: SubcomponentProperties): void {
    const newOptionName = mouseClickOptionEvent[1];
    const { triggers, spec } = setting;
    if (spec.cssProperty) {
      const { customCss, activeCssPseudoClass } = subcomponentProperties;
      customCss[activeCssPseudoClass][spec.cssProperty] = newOptionName;
      if (triggers && triggers[newOptionName]) {
        ActionsDropdownUtils.activateCustomCssTriggers(triggers[newOptionName], allSettings, subcomponentProperties);
      }
    }
    temporaryDropdownValue.new = ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED;
    temporaryDropdownValue.initial = ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED;
  }

  public static setConsistentButtonContent(settingsComponent: ComponentOptions, spec: any, subcomponentProperties: SubcomponentProperties): void {
    const { cssProperty, customFeatureObjectKeys, name } = spec;
    if (cssProperty) {
      const { customCss, activeCssPseudoClass } = subcomponentProperties;
      settingsComponent.actionsDropdownsButtonText[name] = customCss[activeCssPseudoClass][cssProperty];
    } else if (customFeatureObjectKeys) {
      settingsComponent.actionsDropdownsButtonText[name] = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys,
        subcomponentProperties[customFeatureObjectKeys[0]]);
    }
  }
}
