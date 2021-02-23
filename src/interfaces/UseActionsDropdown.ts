import { ActionsDropdownMouseEventCallback } from './ActionsDropdownMouseEventCallbacks';
import { ComponentOptions } from 'vue';

export interface UseActionsDropdown {
  mouseEnterButton: (settingsComponent: ComponentOptions, activeOption: unknown, callback: ActionsDropdownMouseEventCallback) => void;
  mouseLeaveButton: (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback) => void;
  mouseEnterOption: (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback) => void;
  mouseLeaveDropdown: (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback) => void;
  mouseClickOption: (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback) => void;
  optionMouseClickNewOption: (objectContainingActiveOption: unknown, activeOptionPropertyKeyName: string, event: unknown) => void;
}
