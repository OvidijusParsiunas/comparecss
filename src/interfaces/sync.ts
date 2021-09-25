import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';
import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';

export type CopyableSubcomponents = {
  [key in SUBCOMPONENT_TYPES]?: SubcomponentProperties;
}

export interface Copyables {
  subcomponents: CopyableSubcomponents;
  childComponents: WorkshopComponent[];
}

export interface Sync {
  componentThisIsSyncedTo: WorkshopComponent;
  componentsSyncedToThis: Set<WorkshopComponent>;
  copyables?: Copyables;
  lastSelectedComponentToSync?: WorkshopComponent;
}
