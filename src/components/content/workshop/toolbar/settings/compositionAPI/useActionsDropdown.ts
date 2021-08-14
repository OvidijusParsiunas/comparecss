import { MouseClickNewOptionEvent, MouseClickOptionEvent, MouseEnterOptionEvent } from '../../../../../../interfaces/dropdownMenuMouseEvents';
import { TemporaryDropdownValue } from '../../../../../../interfaces/temporaryDropdownValue';
import { SubcomponentProperties, } from '../../../../../../interfaces/workshopComponent';
import { UseActionsDropdown } from '../../../../../../interfaces/UseActionsDropdown';
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
      const triggeredOptionName = GeneralUtils.getTriggeredOptionName(subcomponentProperties, settingSpec);
      mouseEnterButtonCallback({subcomponentProperties, settingsComponent, triggeredOptionName});
    }
  }
 
  const mouseLeaveActionsDropdownButton = (settingsComponent: ComponentOptions, settingSpec: any,
      subcomponentProperties: SubcomponentProperties): void => {
    if (animationState.getIsModeToggleAnimationInProgressState()) return;
    const { mouseLeaveButtonCallback } = settingSpec;
    if (mouseLeaveButtonCallback) {
      const triggeredOptionName = GeneralUtils.getTriggeredOptionName(subcomponentProperties, settingSpec);
      mouseLeaveButtonCallback({subcomponentProperties, settingsComponent, triggeredOptionName});
    }
  }
  
  const mouseEnterActionsDropdownOption = (settingsComponent: ComponentOptions, mouseEnterOptionEvent: MouseEnterOptionEvent,
      settingSpec: any, subcomponentProperties: SubcomponentProperties): void => {
    const [triggeredOptionName] = mouseEnterOptionEvent;
    if (animationState.getIsModeToggleAnimationInProgressState()) return;
    const { cssProperty, customFeatureObjectKeys } = settingSpec;
    if (cssProperty) ActionsDropdownUtils.mouseEnterActionsDropdownOptionCustomCss(temporaryDropdownValue,
      triggeredOptionName, subcomponentProperties, settingSpec);
    if (customFeatureObjectKeys) ActionsDropdownUtils.mouseEnterActionsDropdownOptionCustomFeature(temporaryDropdownValue,
      triggeredOptionName, subcomponentProperties, settingSpec, settingsComponent);
  }
  
  const mouseLeaveActionsDropdown = (settingsComponent: ComponentOptions, settingSpec: any, subcomponentProperties: SubcomponentProperties,
      isDropdownHidden: boolean): void => {
    if (animationState.getIsModeToggleAnimationInProgressState()) return;
    const { cssProperty, customFeatureObjectKeys } = settingSpec;
    if (cssProperty) ActionsDropdownUtils.mouseLeaveActionsDropdownCustomCss(temporaryDropdownValue, subcomponentProperties, settingSpec);
    if (customFeatureObjectKeys) ActionsDropdownUtils.mouseLeaveActionsDropdownOptionCustomFeature(temporaryDropdownValue,
      subcomponentProperties, settingSpec, settingsComponent, isDropdownHidden);
  }

  const mouseClickActionsDropdownOption = (settingsComponent: ComponentOptions, mouseClickOptionEvent: MouseClickOptionEvent, setting: any,
      allSettings: any, subcomponentProperties: SubcomponentProperties): void => {
    if (animationState.getIsModeToggleAnimationInProgressState()) return;
    ActionsDropdownUtils.mouseClickActionsDropdownOption(temporaryDropdownValue, mouseClickOptionEvent, setting, allSettings, subcomponentProperties);
    const { mouseClickOptionCallback } = setting.spec;
    if (mouseClickOptionCallback) mouseClickOptionCallback({
      subcomponentProperties, settingsComponent, previousOptionName: mouseClickOptionEvent[0], triggeredOptionName: mouseClickOptionEvent[1]});
  }
  
  const mouseClickActionsDropdownNewOption = (mouseClickNewOptionEvent: MouseClickNewOptionEvent, settingSpec: any,
      subcomponentProperties: SubcomponentProperties, activeOptionsObject: any): void => {
    const [triggeredOptionName] = mouseClickNewOptionEvent;
    if (animationState.getIsModeToggleAnimationInProgressState()) return;
    ActionsDropdownUtils.mouseClickActionsDropdownNewOption(triggeredOptionName, subcomponentProperties, settingSpec, activeOptionsObject);
  }
  
  return {
    getObjectContainingActiveOption,
    mouseEnterActionsDropdownButton,
    mouseLeaveActionsDropdownButton,
    mouseEnterActionsDropdownOption,
    mouseLeaveActionsDropdown,
    mouseClickActionsDropdownOption,
    mouseClickActionsDropdownNewOption,
  };
}
