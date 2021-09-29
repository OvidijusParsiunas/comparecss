import { WorkshopEventCallback } from './workshopEventCallback';

export interface UseWorkshopEventCallbacks {
  triggerWorkshopEventCallbacks: () => void;
  getNumberOfPendingWorkshopEventCallbacks: () => number;
  addWorkshopEventCallback: (callback: WorkshopEventCallback) => void;
}
