import { ComponentOptions } from 'vue';

export type ActionsDropdownMouseEventCallback = (settingsComponent: ComponentOptions, event?: unknown) => void

export interface ActionsDropdownMouseEventCallbacks {
  mouseEnterButtonCallback: ActionsDropdownMouseEventCallback,
  mouseLeaveButtonCallback: ActionsDropdownMouseEventCallback,
  mouseEnterOptionCallback: ActionsDropdownMouseEventCallback,
  mouseLeaveDropdownCallback: ActionsDropdownMouseEventCallback,
}
