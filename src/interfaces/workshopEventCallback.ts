import { WorkshopEventCallbackReturn } from './workshopEventCallbackReturn';
import { DOM_EVENT_TRIGGER_KEYS } from '../consts/domEventTriggerKeys.enum';

export interface WorkshopEventCallback {
  keyTriggers: Set<DOM_EVENT_TRIGGER_KEYS>;
  func: (event: Event|KeyboardEvent) => WorkshopEventCallbackReturn;
}
