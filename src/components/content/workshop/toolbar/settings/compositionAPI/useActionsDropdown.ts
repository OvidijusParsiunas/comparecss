import { MouseClickNewItemEvent, MouseClickItemEvent, MouseEnterItemEvent } from '../../../../../../interfaces/dropdownMenuMouseEvents';
import { TemporaryDropdownValue } from '../../../../../../interfaces/temporaryDropdownValue';
import { SubcomponentProperties, } from '../../../../../../interfaces/workshopComponent';
import { UseActionsDropdown } from '../../../../../../interfaces/useActionsDropdown';
import { animationState } from '../../../componentPreview/utils/animations/state';
import ActionsDropdownUtils from './utils/actionsDropdownUtils';
import CustomFeaturesUtils from './utils/customFeaturesUtils';
import GeneralUtils from './utils/generalUtils';
import { ComponentOptions } from 'vue';

export default function useActionsDropdown(): UseActionsDropdown {

  const temporaryDropdownValue: TemporaryDropdownValue = { new: ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED, initial: ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED };

  const getObjectContainingActiveOption = (settingSpec: any, subcomponentProperties: SubcomponentProperties): unknown => {
    const { customFeatureObjectKeys, cssProperty } = settingSpec;
    if (customFeatureObjectKeys) {
      return CustomFeaturesUtils.getObjectContainingActiveOption(customFeatureObjectKeys, subcomponentProperties[customFeatureObjectKeys[0]]);
    }
    return ActionsDropdownUtils.getObjectContainingActiveOption(subcomponentProperties, cssProperty);
  }

  const mouseEnterActionsDropdownButton = (settingsComponent: ComponentOptions, settingSpec: any,
      subcomponentProperties: SubcomponentProperties): void => {
    if (animationState.getIsModeToggleAnimationInProgressState()) return;
    const { mouseEnterButtonCallback, cssProperty } = settingSpec;
    if (cssProperty) ActionsDropdownUtils.mouseEnterActionsDropdownButton(temporaryDropdownValue,
      subcomponentProperties, settingSpec.cssProperty);
    if (mouseEnterButtonCallback) {
      const triggeredItemName = GeneralUtils.getTriggeredOptionName(subcomponentProperties, settingSpec);
      mouseEnterButtonCallback({subcomponentProperties, settingsComponent, triggeredItemName});
    }
  }
 
  const mouseLeaveActionsDropdownButton = (settingsComponent: ComponentOptions, settingSpec: any,
      subcomponentProperties: SubcomponentProperties): void => {
    if (animationState.getIsModeToggleAnimationInProgressState()) return;
    const { mouseLeaveButtonCallback } = settingSpec;
    if (mouseLeaveButtonCallback) {
      const triggeredItemName = GeneralUtils.getTriggeredOptionName(subcomponentProperties, settingSpec);
      mouseLeaveButtonCallback({subcomponentProperties, settingsComponent, triggeredItemName});
    }
  }

  // be aware that enter item can be called multiple times without leave dropdown having been activated due to bottom and top padding
  const mouseEnterActionsDropdownItem = (settingsComponent: ComponentOptions, mouseEnterItemEvent: MouseEnterItemEvent,
      settingSpec: any, subcomponentProperties: SubcomponentProperties): void => {
    const [triggeredItemName] = mouseEnterItemEvent;
    if (animationState.getIsModeToggleAnimationInProgressState()) return;
    const { cssProperty, customFeatureObjectKeys } = settingSpec;
    if (cssProperty) ActionsDropdownUtils.mouseEnterActionsDropdownItemCustomCss(temporaryDropdownValue,
      triggeredItemName, subcomponentProperties, settingSpec);
    if (customFeatureObjectKeys) ActionsDropdownUtils.mouseEnterActionsDropdownItemCustomFeature(temporaryDropdownValue,
      triggeredItemName, subcomponentProperties, settingSpec, settingsComponent);
  }
  
  const mouseLeaveActionsDropdown = (settingsComponent: ComponentOptions, settingSpec: any, subcomponentProperties: SubcomponentProperties,
      isDropdownHidden: boolean): void => {
    if (animationState.getIsModeToggleAnimationInProgressState()) return;
    const { cssProperty, customFeatureObjectKeys } = settingSpec;
    if (cssProperty) ActionsDropdownUtils.mouseLeaveActionsDropdownCustomCss(temporaryDropdownValue, subcomponentProperties, settingSpec);
    if (customFeatureObjectKeys) ActionsDropdownUtils.mouseLeaveActionsDropdownItemCustomFeature(temporaryDropdownValue,
      subcomponentProperties, settingSpec, settingsComponent, isDropdownHidden);
  }

  const mouseClickActionsDropdownItem = (settingsComponent: ComponentOptions, mouseClickItemEvent: MouseClickItemEvent, setting: any,
      allSettings: any, subcomponentProperties: SubcomponentProperties): void => {
    if (animationState.getIsModeToggleAnimationInProgressState()) return;
    ActionsDropdownUtils.mouseClickActionsDropdownItem(temporaryDropdownValue, mouseClickItemEvent, setting, allSettings, subcomponentProperties);
    const { mouseClickItemCallback } = setting.spec;
    if (mouseClickItemCallback) mouseClickItemCallback({
      subcomponentProperties, settingsComponent, previousItemName: mouseClickItemEvent[0], triggeredItemName: mouseClickItemEvent[1]});
  }
  
  const mouseClickActionsDropdownNewItem = (mouseClickNewItemEvent: MouseClickNewItemEvent, settingSpec: any,
      subcomponentProperties: SubcomponentProperties, activeOptionsObject: any): void => {
    const [triggeredItemName] = mouseClickNewItemEvent;
    if (animationState.getIsModeToggleAnimationInProgressState()) return;
    ActionsDropdownUtils.mouseClickActionsDropdownNewItem(triggeredItemName, subcomponentProperties, settingSpec, activeOptionsObject);
  }
  
  return {
    getObjectContainingActiveOption,
    mouseEnterActionsDropdownButton,
    mouseLeaveActionsDropdownButton,
    mouseEnterActionsDropdownItem,
    mouseLeaveActionsDropdown,
    mouseClickActionsDropdownItem,
    mouseClickActionsDropdownNewItem,
  };
}
