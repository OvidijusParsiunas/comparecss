import { MouseClickNewItemEvent, MouseClickItemEvent, MouseEnterItemEvent } from '../../../../../../interfaces/dropdownMenuMouseEvents';
import { CustomFeaturesUtils } from '../../../utils/componentManipulation/utils/customFeaturesUtils';
import { UseActionsDropdown } from '../../../../../../interfaces/useActionsDropdownComposition';
import { TemporaryDropdownValue } from '../../../../../../interfaces/temporaryDropdownValue';
import { animationState } from '../../../componentPreview/utils/animations/state';
import { Subcomponent, } from '../../../../../../interfaces/workshopComponent';
import ActionsDropdownUtils from './utils/actionsDropdownUtils';
import GeneralUtils from './utils/generalUtils';
import { ComponentOptions } from 'vue';

export default function useActionsDropdown(): UseActionsDropdown {

  const temporaryDropdownValue: TemporaryDropdownValue = { new: ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED, initial: ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED };

  const getObjectContainingActiveOption = (settingSpec: any, subcomponent: Subcomponent): unknown => {
    const { customFeatureObjectKeys, cssProperty } = settingSpec;
    if (customFeatureObjectKeys) {
      return CustomFeaturesUtils.getObjectContainingCustomFeature(customFeatureObjectKeys, subcomponent[customFeatureObjectKeys[0]]);
    }
    return ActionsDropdownUtils.getObjectContainingActiveOption(subcomponent, cssProperty);
  }

  const mouseEnterActionsDropdownButton = (settingsComponent: ComponentOptions, settingSpec: any,
      subcomponent: Subcomponent): void => {
    if (animationState.getIsModeToggleAnimationInProgressState()) return;
    const { mouseEnterButtonCallback, cssProperty } = settingSpec;
    if (cssProperty) ActionsDropdownUtils.mouseEnterActionsDropdownButton(temporaryDropdownValue,
      subcomponent, settingSpec.cssProperty);
    if (mouseEnterButtonCallback) {
      const triggeredItemName = GeneralUtils.getTriggeredOptionName(subcomponent, settingSpec);
      mouseEnterButtonCallback({subcomponent, settingsComponent, triggeredItemName});
    }
  }
 
  const mouseLeaveActionsDropdownButton = (settingsComponent: ComponentOptions, settingSpec: any,
      subcomponent: Subcomponent): void => {
    if (animationState.getIsModeToggleAnimationInProgressState()) return;
    const { mouseLeaveButtonCallback } = settingSpec;
    if (mouseLeaveButtonCallback) {
      const triggeredItemName = GeneralUtils.getTriggeredOptionName(subcomponent, settingSpec);
      mouseLeaveButtonCallback({subcomponent, settingsComponent, triggeredItemName});
    }
  }

  // be aware that enter item can be called multiple times without leave dropdown having been activated due to bottom and top padding
  const mouseEnterActionsDropdownItem = (settingsComponent: ComponentOptions, mouseEnterItemEvent: MouseEnterItemEvent,
      settingSpec: any, subcomponent: Subcomponent): void => {
    const [triggeredItemName] = mouseEnterItemEvent;
    if (animationState.getIsModeToggleAnimationInProgressState()) return;
    const { cssProperty, customFeatureObjectKeys } = settingSpec;
    if (cssProperty) ActionsDropdownUtils.mouseEnterActionsDropdownItemCustomCss(temporaryDropdownValue,
      triggeredItemName, subcomponent, settingSpec);
    if (customFeatureObjectKeys) ActionsDropdownUtils.mouseEnterActionsDropdownItemCustomFeature(temporaryDropdownValue,
      triggeredItemName, subcomponent, settingSpec, settingsComponent);
  }
  
  const mouseLeaveActionsDropdown = (settingsComponent: ComponentOptions, settingSpec: any, subcomponent: Subcomponent,
      isDropdownHidden: boolean): void => {
    if (animationState.getIsModeToggleAnimationInProgressState()) return;
    const { cssProperty, customFeatureObjectKeys } = settingSpec;
    if (cssProperty) ActionsDropdownUtils.mouseLeaveActionsDropdownCustomCss(temporaryDropdownValue, subcomponent, settingSpec);
    if (customFeatureObjectKeys) ActionsDropdownUtils.mouseLeaveActionsDropdownItemCustomFeature(temporaryDropdownValue,
      subcomponent, settingSpec, settingsComponent, isDropdownHidden);
  }

  const mouseClickActionsDropdownItem = (settingsComponent: ComponentOptions, mouseClickItemEvent: MouseClickItemEvent, setting: any,
      allSettings: any, subcomponent: Subcomponent): void => {
    if (animationState.getIsModeToggleAnimationInProgressState()) return;
    ActionsDropdownUtils.mouseClickActionsDropdownItem(temporaryDropdownValue, mouseClickItemEvent, setting, allSettings, subcomponent);
    const { mouseClickItemCallback } = setting.spec;
    if (mouseClickItemCallback) mouseClickItemCallback({
      subcomponent, settingsComponent, previousItemName: mouseClickItemEvent[0], triggeredItemName: mouseClickItemEvent[1]});
  }
  
  const mouseClickActionsDropdownNewItem = (mouseClickNewItemEvent: MouseClickNewItemEvent, settingSpec: any,
      subcomponent: Subcomponent, activeOptionsObject: any): void => {
    const [triggeredItemName] = mouseClickNewItemEvent;
    if (animationState.getIsModeToggleAnimationInProgressState()) return;
    ActionsDropdownUtils.mouseClickActionsDropdownNewItem(triggeredItemName, subcomponent, settingSpec, activeOptionsObject);
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
