import { SubcomponentTypeToProperties } from './subcomponentTypeToProperties';
import { WorkshopComponent } from './workshopComponent';

// in sync terminology refers to the component that is currently synced to another component

export interface Syncables {
  subcomponents: SubcomponentTypeToProperties;
  childComponents: WorkshopComponent[];
}

export interface Sync {
  componentThisIsSyncedTo: WorkshopComponent;
  componentsSyncedToThis: Set<WorkshopComponent>;
  // WORK 2 - document this
  syncables?: Syncables;
  lastSelectedComponentToSync?: WorkshopComponent;
}
