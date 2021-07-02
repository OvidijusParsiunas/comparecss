import { WorkshopEventCallback } from './workshopEventCallback';

export interface UseWorkshopEventCallbacks {
  triggerWorkshopEventCallbacks: () => void;
  addWorkshopEventCallback: (callback: WorkshopEventCallback) => void;
}
