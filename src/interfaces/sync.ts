import { WorkshopComponent } from './workshopComponent';

export interface Sync {
  componentThisIsSyncedTo: WorkshopComponent;
  lastSelectedComponentToSync?: WorkshopComponent;
  componentsSyncedToThis: Set<WorkshopComponent>;
}
