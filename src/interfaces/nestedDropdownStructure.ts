import { EntityDisplayStatus } from './workshopComponent';

export const ENTITY_DISPLAY_STATUS_REF = 'optionalSubcomponentRef';

export interface EntityDisplayStatusRef {
  [ENTITY_DISPLAY_STATUS_REF]: EntityDisplayStatus;
}

export type NestedDropdownStructure = {
  [key in string]: NestedDropdownStructure | EntityDisplayStatusRef;
}
