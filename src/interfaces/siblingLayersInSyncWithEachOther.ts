import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';
import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';

interface SubcomponentState {
  currentCount: number;
  subcomponentProperties: SubcomponentProperties;
}

export type SiblingSubcomponents = {
  [key in SUBCOMPONENT_TYPES]?: SubcomponentState;
};

export interface SiblingLayersInSyncWithEachOther {
  containerSyncFunc?: (container: WorkshopComponent) => void;
  subcomponents?: SiblingSubcomponents;
}
