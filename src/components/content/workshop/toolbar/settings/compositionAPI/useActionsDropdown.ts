import { ActionsDropdownMouseEventCallback } from '../../../../../../interfaces/ActionsDropdownMouseEventCallbacks';
import { UseActionsDropdown } from '../../../../../../interfaces/UseActionsDropdown';
import { CustomFeatures, } from '../../../../../../interfaces/workshopComponent';
import SharedUtils from '../utils/sharedUtils';
import { ComponentOptions } from 'vue';

export default function useActionsDropdown(): UseActionsDropdown {

  const getObjectContainingActiveOption = (customFeatureObjectKeys: string[], customFeatures: CustomFeatures): unknown => {
    return (customFeatureObjectKeys[2] && customFeatures[customFeatureObjectKeys[0]][customFeatureObjectKeys[1]])
      || (customFeatureObjectKeys[1] && customFeatures[customFeatureObjectKeys[0]]);
  }

  const mouseEnterActionsDropdownButton = (settingsComponent: ComponentOptions, settingSpec: any, customFeatures: CustomFeatures): void => {
    const { customFeatureObjectKeys, mouseEnterButtonCallback } = settingSpec;
    const activeOption = SharedUtils.getCustomFeatureValue(customFeatureObjectKeys, customFeatures);
    mouseEnterButtonCallback(settingsComponent, activeOption);
  }
  
  const mouseLeaveActionsDropdownButton = (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback): void => {
    callback(settingsComponent, event);
  }
  
  const mouseEnterActionsDropdownOption = (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback): void => {
    callback(settingsComponent, event);
  }
  
  const mouseLeaveActionsDropdown = (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback): void => {
    callback(settingsComponent, event);
  }

  const mouseClickActionsDropdownOption = (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback): void => {
    callback(settingsComponent, event);
  }
  
  const mouseClickActionsDropdownNewOption = (event: unknown, customFeatureObjectKeys: string[], customFeatures: CustomFeatures): void => {
    SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, customFeatures, event);
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
