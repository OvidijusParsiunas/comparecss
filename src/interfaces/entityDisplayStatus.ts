import { SubcomponentDisplayStatus } from './workshopComponent';

export const ENTITY_DISPLAY_STATUS_REF = 'optionalSubcomponentRef';

export interface EntityDisplayStatusRef {
  [ENTITY_DISPLAY_STATUS_REF]: EntityDisplayStatus | SubcomponentDisplayStatus;
}

export interface EntityDisplayStatus {
  currentlyDisplaying: boolean;
}
