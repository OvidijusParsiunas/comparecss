import { ActionsDropdownMouseEventCallback } from './ActionsDropdownMouseEventCallbacks';
import { CustomFeatures } from './workshopComponent';
import { ComponentOptions } from 'vue';

export interface UseActionsDropdown {
  getObjectContainingActiveOption: (customFeatureObjectKeys: string[], customFeatures: CustomFeatures) => unknown;
  mouseEnterActionsDropdownButton: (settingsComponent: ComponentOptions, settingSpec: any, customFeatures: CustomFeatures) => void;
  mouseLeaveActionsDropdownButton: (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback) => void;
  mouseEnterActionsDropdownOption: (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback) => void;
  mouseLeaveActionsDropdown: (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback) => void;
  mouseClickActionsDropdownOption: (settingsComponent: ComponentOptions, event: unknown, callback: ActionsDropdownMouseEventCallback) => void;
  mouseClickActionsDropdownNewOption: (event: unknown, customFeatureObjectKeys: string[], customFeatures: CustomFeatures) => void;
}
