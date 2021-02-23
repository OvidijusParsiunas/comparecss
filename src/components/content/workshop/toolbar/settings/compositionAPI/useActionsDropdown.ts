import { ActionsDropdownMouseEventCallback } from '../../../../../../interfaces/ActionsDropdownMouseEventCallbacks';
import { UseActionsDropdown } from '../../../../../../interfaces/UseActionsDropdown';
import { ComponentOptions } from 'vue';

export default function useActionsDropdown(): UseActionsDropdown {

  const mouseEnterButton = (settingsComponent: ComponentOptions, activeOption: unknown, callback: ActionsDropdownMouseEventCallback): void => {
    callback(settingsComponent, activeOption);
  }
  
  const mouseLeaveButton = (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback): void => {
    callback(settingsComponent, event);
  }
  
  const mouseEnterOption = (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback): void => {
    callback(settingsComponent, event);
  }
  
  const mouseLeaveDropdown = (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback): void => {
    callback(settingsComponent, event);
  }

  const mouseClickOption = (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback): void => {
    callback(settingsComponent, event);
  }
  
  const optionMouseClickNewOption = (objectContainingActiveOption: unknown, activeOptionPropertyKeyName: string, event: unknown): void => {
    objectContainingActiveOption[activeOptionPropertyKeyName] = event;
  }
  
  return {
    mouseEnterButton,
    mouseLeaveButton,
    mouseEnterOption,
    mouseLeaveDropdown,
    mouseClickOption,
    optionMouseClickNewOption,
  };
}
