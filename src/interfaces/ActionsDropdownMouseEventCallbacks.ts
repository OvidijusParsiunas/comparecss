import { SubcomponentProperties } from './workshopComponent';
import { ComponentOptions } from 'vue';

export interface ActionsDropdownMouseEventCallbackEvent {
  subcomponentProperties: SubcomponentProperties;
  settingsComponent: ComponentOptions;
  triggeredOptionName: string;
}

export type ActionsDropdownMouseEventCallback = (event: ActionsDropdownMouseEventCallbackEvent) => void;

export interface ActionsDropdownMouseEventCallbacks {
  mouseEnterButtonCallback?: ActionsDropdownMouseEventCallback;
  mouseLeaveButtonCallback?: ActionsDropdownMouseEventCallback;
  mouseEnterOptionCallback?: ActionsDropdownMouseEventCallback;
  mouseLeaveDropdownCallback?: ActionsDropdownMouseEventCallback;
  mouseClickOptionCallback?: ActionsDropdownMouseEventCallback;
}
