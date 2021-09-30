import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';
import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';

export type SyncableSubcomponents = {
  [key in SUBCOMPONENT_TYPES]?: SubcomponentProperties;
}

export interface Syncables {
  subcomponents: SyncableSubcomponents;
  childComponents: WorkshopComponent[];
}

export interface Sync {
  componentThisIsSyncedTo: WorkshopComponent;
  componentsSyncedToThis: Set<WorkshopComponent>;
  syncables?: Syncables;
  lastSelectedComponentToSync?: WorkshopComponent;
}
