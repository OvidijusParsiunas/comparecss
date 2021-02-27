import { ActionsDropdownMouseEventCallback } from '../../../../../../interfaces/ActionsDropdownMouseEventCallbacks';
import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import { UseActionsDropdown } from '../../../../../../interfaces/UseActionsDropdown';
import { ComponentOptions } from 'vue';
import SharedUtils from '../utils/sharedUtils';

export default function useActionsDropdown(): UseActionsDropdown {

  const getObjectContainingActiveOption = (subcomponentPropertyObjectKeys: any, subcomponentProperties: SubcomponentProperties): unknown => {
    return (subcomponentPropertyObjectKeys[2] && subcomponentProperties[subcomponentPropertyObjectKeys[0]][subcomponentPropertyObjectKeys[1]])
      || (subcomponentPropertyObjectKeys[1] && subcomponentProperties[subcomponentPropertyObjectKeys[0]]);
  }

  const mouseEnterActionsDropdownButton = (settingsComponent: ComponentOptions, settingSpec: any, subcomponentProperties: SubcomponentProperties): void => {
    const { subcomponentPropertyObjectKeys, mouseEnterButtonCallback } = settingSpec;
    const activeOption = SharedUtils.getSubcomponentPropertyValue(subcomponentPropertyObjectKeys, subcomponentProperties);
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
  
  const mouseClickActionsDropdownNewOption = (event: unknown, subcomponentPropertyObjectKeys: any[], subcomponentProperties: SubcomponentProperties): void => {
    SharedUtils.setSubcomponentPropertyValue(subcomponentPropertyObjectKeys, subcomponentProperties, event);
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
