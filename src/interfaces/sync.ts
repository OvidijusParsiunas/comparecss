import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';
import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';

// in sync terminology refers to the component that is currently synced to another component

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
