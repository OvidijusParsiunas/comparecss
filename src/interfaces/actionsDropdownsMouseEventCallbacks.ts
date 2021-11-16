// file is called actionsDropdownsMouseEventCallbacks.ts due to a bug with git as it automatically capitalizes actionDropdownsMouseEventCallbacks.ts
import { Subcomponent } from './workshopComponent';
import { ComponentOptions } from 'vue';

export interface ActionsDropdownMouseEventCallbackEvent {
  subcomponent?: Subcomponent;
  triggeredItemName?: string;
  previousItemName?: string;
  settingsComponent?: ComponentOptions;
  isCustomFeatureResetTriggered?: boolean;
  isDropdownHidden?: boolean;
}

type ActionsDropdownMouseEventCallback = (event: ActionsDropdownMouseEventCallbackEvent) => void;

export interface ActionsDropdownMouseEventCallbacks {
  mouseEnterButtonCallback?: ActionsDropdownMouseEventCallback;
  mouseLeaveButtonCallback?: ActionsDropdownMouseEventCallback;
  mouseEnterItemCallback?: ActionsDropdownMouseEventCallback;
  mouseLeaveDropdownCallback?: ActionsDropdownMouseEventCallback;
  mouseClickItemCallback?: ActionsDropdownMouseEventCallback;
}
