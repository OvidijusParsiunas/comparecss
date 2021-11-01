import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';
import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';

export interface SiblingLayersInSyncWithEachOther {
  containerSyncFunc?: (container: WorkshopComponent) => void;
  subcomponents?: { [key in SUBCOMPONENT_TYPES]?: SubcomponentProperties };
}
