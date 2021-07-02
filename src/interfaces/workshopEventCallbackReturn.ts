import { WorkshopEventCallback } from './workshopEventCallback';

export interface WorkshopEventCallbackReturn {
  shouldRepeat: boolean;
  newCallback?: WorkshopEventCallback;
}
