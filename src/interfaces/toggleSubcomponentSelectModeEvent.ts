import { SubcomponentSelectModeCallbackFunction } from '../components/content/workshop/toolbar/options/subcomponentSelectMode/subcomponentSelectModeService';
import { DOM_EVENT_TRIGGER_KEYS } from '../consts/domEventTriggerKeys.enum';
import { SUB_COMPONENTS } from '../consts/subcomponentModes.enum';

export type ToggleSubcomponentSelectModeEvent = [
  SubcomponentSelectModeCallbackFunction, Set<DOM_EVENT_TRIGGER_KEYS>, HTMLElement, (param1: SUB_COMPONENTS) => void];
