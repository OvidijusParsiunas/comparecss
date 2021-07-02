import { OtherWorkshopEventCallbackDetails, WorkshopEventCallback } from '../../../../../interfaces/workshopEventCallback';
import { WorkshopEventCallbackReturn } from '../../../../../interfaces/workshopEventCallbackReturn';
import { UseWorkshopEventCallbacks } from '../../../../../interfaces/useWorkshopEventCallbacks';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../consts/domEventTriggerKeys.enum';

export default function useWorkshopEventCallbacks(): UseWorkshopEventCallbacks {

  const otherWorkshopEventCallbackDetails: OtherWorkshopEventCallbackDetails = { lastMouseDownTarget: null };
  let workshopEventCallbacks: WorkshopEventCallback[] = [];

  function trigger(callback: WorkshopEventCallback, eventKey: DOM_EVENT_TRIGGER_KEYS, remainingCallbacks: WorkshopEventCallback[]): void {
    if (callback.keyTriggers.has(eventKey)) {
      const callbackCompleted: WorkshopEventCallbackReturn = callback.func(event, otherWorkshopEventCallbackDetails);
      if (callbackCompleted.shouldRepeat) remainingCallbacks.push(callback);
      if (callbackCompleted.newCallback) remainingCallbacks.push(callbackCompleted.newCallback);
    } else {
      remainingCallbacks.push(callback);
    }
  }

  const triggerWorkshopEventCallbacks = (): void => {
    if (workshopEventCallbacks.length > 0) {
      const remainingCallbacks: WorkshopEventCallback[] = [];
      const eventKey = event instanceof KeyboardEvent ? event.key : event.type;
      if (eventKey === DOM_EVENT_TRIGGER_KEYS.MOUSE_DOWN) otherWorkshopEventCallbackDetails.lastMouseDownTarget = event.target as HTMLElement;
      workshopEventCallbacks.forEach((callback: WorkshopEventCallback) => {
        trigger(callback, eventKey as DOM_EVENT_TRIGGER_KEYS, remainingCallbacks);
      });
      workshopEventCallbacks = remainingCallbacks;
    }
  }

  const addWorkshopEventCallback = (callback: WorkshopEventCallback): void => {
    workshopEventCallbacks.push(callback);
  }

  return {
    triggerWorkshopEventCallbacks,
    addWorkshopEventCallback,
  }
}
