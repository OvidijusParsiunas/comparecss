import { WorkshopComponent } from './workshopComponent';

export interface Sync {
  syncedComponent: WorkshopComponent;
  lastSelectedComponentToSync?: WorkshopComponent;
}
