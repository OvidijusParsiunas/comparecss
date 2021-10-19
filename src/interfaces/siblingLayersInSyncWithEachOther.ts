import { WorkshopComponent } from './workshopComponent';

export interface SiblingLayersInSyncWithEachOther {
  containerSyncFunc?: (container: WorkshopComponent) => void;
}
