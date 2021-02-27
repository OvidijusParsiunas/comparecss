import { ActionsDropdownMouseEventCallback } from './ActionsDropdownMouseEventCallbacks';
import { SubcomponentProperties } from './workshopComponent';
import { ComponentOptions } from 'vue';

export interface UseActionsDropdown {
  getObjectContainingActiveOption: (subcomponentPropertyObjectKeys: any, subcomponentProperties: SubcomponentProperties) => unknown;
  mouseEnterActionsDropdownButton: (settingsComponent: ComponentOptions, settingSpec: any, subcomponentProperties: SubcomponentProperties) => void;
  mouseLeaveActionsDropdownButton: (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback) => void;
  mouseEnterActionsDropdownOption: (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback) => void;
  mouseLeaveActionsDropdown: (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback) => void;
  mouseClickActionsDropdownOption: (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback) => void;
  mouseClickActionsDropdownNewOption: (event: unknown, subcomponentPropertyObjectKeys: any[], subcomponentProperties: SubcomponentProperties) => void;
}
