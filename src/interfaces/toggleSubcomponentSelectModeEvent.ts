import { SubcomponentSelectModeCallbackFunction } from '../components/content/workshop/toolbar/options/subcomponentSelectMode/subcomponentSelectMode';
import { DOM_EVENT_TRIGGER_KEYS } from '../consts/domEventTriggerKeys.enum';

export type ToggleSubcomponentSelectModeEvent = [
  SubcomponentSelectModeCallbackFunction, Set<DOM_EVENT_TRIGGER_KEYS>, HTMLElement, (param1: string) => void,
];
