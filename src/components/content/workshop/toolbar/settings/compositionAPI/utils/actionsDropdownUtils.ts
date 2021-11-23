import { CustomSettingTriggerFunction } from '../../../../../../../interfaces/CustomSettingTriggerFunction';
import { TemporaryDropdownValue } from '../../../../../../../interfaces/temporaryDropdownValue';
import { MouseClickItemEvent } from '../../../../../../../interfaces/dropdownMenuMouseEvents';
import { WorkshopComponentCss } from '../../../../../../../interfaces/workshopComponentCss';
import { Subcomponent } from '../../../../../../../interfaces/workshopComponent';
import { SETTINGS_TYPES } from '../../../../../../../consts/settingsTypes.enum';
import SettingsUtils from '../../utils/settingsUtils';
import SharedUtils from '../../utils/sharedUtils';
import { ComponentOptions } from 'vue';

export default class ActionsDropdownUtils {

  public static TEMPORARY_VALUE_UNUSED = null;

  public static getObjectContainingActiveOption(subcomponent: Subcomponent, cssProperty: string): WorkshopComponentCss {
    const { activeCssPseudoClassesDropdownItem, customCss } = subcomponent;
    if (customCss[activeCssPseudoClassesDropdownItem]?.[cssProperty]) {
      return customCss[activeCssPseudoClassesDropdownItem];
    }
    return { [cssProperty] : SharedUtils.getActiveModeCssPropertyValue(customCss, activeCssPseudoClassesDropdownItem, cssProperty) };
  }

  public static mouseEnterActionsDropdownButton(temporaryDropdownValue: TemporaryDropdownValue, subcomponent: Subcomponent,
      settingSpecCssProperty: string): void {
    if (temporaryDropdownValue.new === ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      const { activeCssPseudoClassesDropdownItem, customCss } = subcomponent;
      temporaryDropdownValue.new = customCss[activeCssPseudoClassesDropdownItem]?.[settingSpecCssProperty]
        ? customCss[activeCssPseudoClassesDropdownItem][settingSpecCssProperty]
        : SharedUtils.getActiveModeCssPropertyValue(customCss, activeCssPseudoClassesDropdownItem, settingSpecCssProperty);
    }
  }

  public static mouseEnterActionsDropdownItemCustomCss(temporaryDropdownValue: TemporaryDropdownValue, triggeredItemName: string,
      subcomponent: Subcomponent, settingSpec: any): void {
    const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    const { cssProperty } = settingSpec;
    if (temporaryDropdownValue.initial === ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      temporaryDropdownValue.initial = (customCss[activeCssPseudoClassesDropdownItem]?.[cssProperty]);
    }
    if (customCss[activeCssPseudoClassesDropdownItem]) {
      customCss[activeCssPseudoClassesDropdownItem][cssProperty] = triggeredItemName;
    } else {
      customCss[activeCssPseudoClassesDropdownItem] = { [cssProperty]: triggeredItemName };
    }
    SettingsUtils.triggerComponentFunc(SETTINGS_TYPES.ACTIONS_DROPDOWN, subcomponent, cssProperty);
  }

  // called third when selecting item (if statement to prevent logic from triggering on select)
  public static mouseLeaveActionsDropdownCustomCss(temporaryDropdownValue: TemporaryDropdownValue,
      subcomponent: Subcomponent, settingSpec: any): void {
    if (temporaryDropdownValue.initial !== ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
      customCss[activeCssPseudoClassesDropdownItem][settingSpec.cssProperty] = temporaryDropdownValue.initial;
      temporaryDropdownValue.initial = ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED;
      SettingsUtils.triggerComponentFunc(SETTINGS_TYPES.ACTIONS_DROPDOWN, subcomponent, settingSpec.cssProperty);
    }
  }

  public static mouseEnterActionsDropdownItemCustomFeature(temporaryDropdownValue: TemporaryDropdownValue, triggeredItemName: string,
      subcomponent: Subcomponent, settingSpec: any, settingsComponent: ComponentOptions): void {
    const { customFeatureObjectKeys, mouseEnterItemCallback } = settingSpec;
    const previousItemName = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, subcomponent[customFeatureObjectKeys[0]]) as string;
    if (temporaryDropdownValue.initial === ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      temporaryDropdownValue.initial = previousItemName;
    }
    if (mouseEnterItemCallback) mouseEnterItemCallback({subcomponent, settingsComponent, previousItemName, triggeredItemName});
    SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponent, triggeredItemName);
    temporaryDropdownValue.new = triggeredItemName;
  }

  // called third when selecting item (if statement to prevent logic from triggering on select)
  public static mouseLeaveActionsDropdownItemCustomFeature(temporaryDropdownValue: TemporaryDropdownValue,
      subcomponent: Subcomponent, settingSpec: any, settingsComponent: ComponentOptions, isDropdownHidden: boolean): void {
    if (temporaryDropdownValue.new !== ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED) {
      const { customFeatureObjectKeys, mouseLeaveDropdownCallback } = settingSpec;
      if (mouseLeaveDropdownCallback) mouseLeaveDropdownCallback({subcomponent, settingsComponent,
        previousItemName: temporaryDropdownValue.new, triggeredItemName: temporaryDropdownValue.initial, isDropdownHidden});
      SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponent, temporaryDropdownValue.initial);
    }
    temporaryDropdownValue.new = ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED;
    temporaryDropdownValue.initial = ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED;
  }

  private static updateSettingAndPropertyValues(trigger: any, allSettings: any, subcomponent: Subcomponent): void {
    const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    const { cssProperty: triggerCssProperty, defaultValue } = trigger;
    for (let i = 0; i < allSettings.options.length; i += 1) {
      if (allSettings.options[i].spec.cssProperty === triggerCssProperty) {
        const rawDefaultValue = typeof defaultValue === 'string' ? Number.parseInt(defaultValue) : defaultValue;
        allSettings.options[i].spec.default = rawDefaultValue;
        customCss[activeCssPseudoClassesDropdownItem][triggerCssProperty] = defaultValue;
      }
    }
  }

  private static activateCustomCssTriggers(trigger: any, allSettings: any, subcomponent: Subcomponent): void {
    const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
    const { conditions, negativeConditions, cssProperty: triggerCssProperty } = trigger;
    const extractedTriggerCssProperty = SharedUtils.getActiveModeCssPropertyValue(customCss, activeCssPseudoClassesDropdownItem, triggerCssProperty);
    const conditionValue = typeof extractedTriggerCssProperty === 'string' ? Number.parseInt(extractedTriggerCssProperty) : extractedTriggerCssProperty;
    const conditionMet = (conditions && conditions.has(conditionValue)) || (negativeConditions && !negativeConditions.has(conditionValue));
    if (conditionMet) {
      ActionsDropdownUtils.updateSettingAndPropertyValues(trigger, allSettings, subcomponent);
    }
  }

  // called first when selecting item
  public static mouseClickActionsDropdownNewItem(triggeredItemName: string, subcomponent: Subcomponent,
      settingSpec: any, activeOptionsObject: any): void {
    const { cssProperty, customFeatureObjectKeys } = settingSpec;
    if (cssProperty) {
      const { activeCssPseudoClassesDropdownItem, customCss } = subcomponent;
      customCss[activeCssPseudoClassesDropdownItem][cssProperty] = triggeredItemName;
      activeOptionsObject[cssProperty] = triggeredItemName;
    } else if (customFeatureObjectKeys) {
      SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, subcomponent, triggeredItemName);
    }
  }

  // called second when selecting item
  public static mouseClickActionsDropdownItem(temporaryDropdownValue: TemporaryDropdownValue, mouseClickItemEvent: MouseClickItemEvent,
      setting: any, allSettings: any, subcomponent: Subcomponent): void {
    const newItemName = mouseClickItemEvent[1];
    const { triggers, spec } = setting;
    if (spec.cssProperty) {
      const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
      customCss[activeCssPseudoClassesDropdownItem][spec.cssProperty] = newItemName;
      if (triggers && triggers[newItemName]) {
        ActionsDropdownUtils.activateCustomCssTriggers(triggers[newItemName], allSettings, subcomponent);
      }
    }
    temporaryDropdownValue.new = ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED;
    temporaryDropdownValue.initial = ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED;
  }

  public static setConsistentButtonContent(settingsComponent: ComponentOptions, spec: any, subcomponent: Subcomponent): void {
    const { cssProperty, customFeatureObjectKeys, name } = spec;
    if (cssProperty) {
      const { customCss, activeCssPseudoClassesDropdownItem } = subcomponent;
      settingsComponent.actionsDropdownsButtonText[name] = customCss[activeCssPseudoClassesDropdownItem][cssProperty];
    } else if (customFeatureObjectKeys) {
      settingsComponent.actionsDropdownsButtonText[name] = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys,
        subcomponent[customFeatureObjectKeys[0]]);
    }
  }

  // called when setting is reset
  public static callSettingCustomFunction(settingSpec: any, subcomponent: Subcomponent, newValue: string): void {
    if (settingSpec.customFunctionKeys) {
      const customFunction = SharedUtils.getCustomFeatureValue(
        settingSpec.customFunctionKeys, subcomponent[settingSpec.customFunctionKeys[0]]) as CustomSettingTriggerFunction;
      customFunction(subcomponent, newValue);
    }
  }
}
