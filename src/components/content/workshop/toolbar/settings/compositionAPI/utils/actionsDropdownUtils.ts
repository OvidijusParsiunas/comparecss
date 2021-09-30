import { CustomSettingTriggerFunction } from '../../../../../../../interfaces/CustomSettingTriggerFunction';
import { TemporaryDropdownValue } from '../../../../../../../interfaces/temporaryDropdownValue';
import { MouseClickItemEvent } from '../../../../../../../interfaces/dropdownMenuMouseEvents';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';
import { SETTINGS_TYPES } from '../../../../../../../consts/settingsTypes.enum';
import SettingsUtils from '../../utils/settingsUtils';
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

  public static mouseEnterActionsDropdownItemCustomCss(temporaryDropdownValue: TemporaryDropdownValue, triggeredItemName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any): void {
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    const { cssProperty } = settingSpec;
    if (temporaryDropdownValue.initial === ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      temporaryDropdownValue.initial = (customCss[activeCssPseudoClass]?.[cssProperty]);
    }
    if (customCss[activeCssPseudoClass]) {
      customCss[activeCssPseudoClass][cssProperty] = triggeredItemName;
    } else {
      customCss[activeCssPseudoClass] = { [cssProperty]: triggeredItemName };
    }
    SettingsUtils.triggerComponentFunc(SETTINGS_TYPES.ACTIONS_DROPDOWN, subcomponentProperties, cssProperty);
  }

  // called third when selecting item (if statement to prevent logic from triggering on select)
  public static mouseLeaveActionsDropdownCustomCss(temporaryDropdownValue: TemporaryDropdownValue,
      subcomponentProperties: SubcomponentProperties, settingSpec: any): void {
    if (temporaryDropdownValue.initial !== ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      const { customCss, activeCssPseudoClass } = subcomponentProperties;
      customCss[activeCssPseudoClass][settingSpec.cssProperty] = temporaryDropdownValue.initial;
      temporaryDropdownValue.initial = ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED;
      SettingsUtils.triggerComponentFunc(SETTINGS_TYPES.ACTIONS_DROPDOWN, subcomponentProperties, settingSpec.cssProperty);
    }
  }

  public static mouseEnterActionsDropdownItemCustomFeature(temporaryDropdownValue: TemporaryDropdownValue, triggeredItemName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any, settingsComponent: ComponentOptions): void {
    const { customFeatureObjectKeys, mouseEnterItemCallback } = settingSpec;
    const previousItemName = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties[customFeatureObjectKeys[0]]) as string;
    if (temporaryDropdownValue.initial === ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      temporaryDropdownValue.initial = previousItemName;
    }
    if (mouseEnterItemCallback) mouseEnterItemCallback({subcomponentProperties, settingsComponent, previousItemName, triggeredItemName});
    SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties, triggeredItemName);
    temporaryDropdownValue.new = triggeredItemName;
  }

  // called third when selecting item (if statement to prevent logic from triggering on select)
  public static mouseLeaveActionsDropdownItemCustomFeature(temporaryDropdownValue: TemporaryDropdownValue,
      subcomponentProperties: SubcomponentProperties, settingSpec: any, settingsComponent: ComponentOptions, isDropdownHidden: boolean): void {
    if (temporaryDropdownValue.new !== ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      const { customFeatureObjectKeys, mouseLeaveDropdownCallback } = settingSpec;
      if (mouseLeaveDropdownCallback) mouseLeaveDropdownCallback({subcomponentProperties, settingsComponent,
        previousItemName: temporaryDropdownValue.new, triggeredItemName: temporaryDropdownValue.initial, isDropdownHidden});
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

  // called first when selecting item
  public static mouseClickActionsDropdownNewItem(triggeredItemName: string, subcomponentProperties: SubcomponentProperties,
      settingSpec: any, activeOptionsObject: any): void {
    const { cssProperty, customFeatureObjectKeys } = settingSpec;
    if (cssProperty) {
      const { activeCssPseudoClass, customCss } = subcomponentProperties;
      customCss[activeCssPseudoClass][cssProperty] = triggeredItemName;
      activeOptionsObject[cssProperty] = triggeredItemName;
    } else if (customFeatureObjectKeys) {
      SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponentProperties, triggeredItemName);
    }
  }

  // called second when selecting item
  public static mouseClickActionsDropdownItem(temporaryDropdownValue: TemporaryDropdownValue, mouseClickItemEvent: MouseClickItemEvent,
      setting: any, allSettings: any, subcomponentProperties: SubcomponentProperties): void {
    const newItemName = mouseClickItemEvent[1];
    const { triggers, spec } = setting;
    if (spec.cssProperty) {
      const { customCss, activeCssPseudoClass } = subcomponentProperties;
      customCss[activeCssPseudoClass][spec.cssProperty] = newItemName;
      if (triggers && triggers[newItemName]) {
        ActionsDropdownUtils.activateCustomCssTriggers(triggers[newItemName], allSettings, subcomponentProperties);
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

  // called when setting is reset
  public static callSettingCustomFunction(settingSpec: any, subcomponentProperties: SubcomponentProperties, newValue: string): void {
    if (settingSpec.customFunctionKeys) {
      const customFunction = SharedUtils.getCustomFeatureValue(
        settingSpec.customFunctionKeys, subcomponentProperties[settingSpec.customFunctionKeys[0]]) as CustomSettingTriggerFunction;
      customFunction(subcomponentProperties, newValue);
    }
  }
}
