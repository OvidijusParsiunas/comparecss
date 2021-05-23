// file is called actionsDropdownsMouseEventCallbacks.ts due to a bug with git as it automatically capitalizes actionDropdownsMouseEventCallbacks.ts
import { SubcomponentProperties } from './workshopComponent';
import { ComponentOptions } from 'vue';

export interface ActionsDropdownMouseEventCallbackEvent {
  subcomponentProperties: SubcomponentProperties;
  triggeredOptionName: string;
  previousOptionName?: string;
  settingsComponent?: ComponentOptions;
  isCustomFeatureResetTriggered?: boolean;
}

type ActionsDropdownMouseEventCallback = (event: ActionsDropdownMouseEventCallbackEvent) => void;

export interface ActionsDropdownMouseEventCallbacks {
  mouseEnterButtonCallback?: ActionsDropdownMouseEventCallback;
  mouseLeaveButtonCallback?: ActionsDropdownMouseEventCallback;
  mouseEnterOptionCallback?: ActionsDropdownMouseEventCallback;
  mouseLeaveDropdownCallback?: ActionsDropdownMouseEventCallback;
  mouseClickOptionCallback?: ActionsDropdownMouseEventCallback;
}
