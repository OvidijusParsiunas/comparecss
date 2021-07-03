export const ENTITY_DISPLAY_STATUS_REF = 'optionalSubcomponentRef';

export interface EntityDisplayStatusRef {
  [ENTITY_DISPLAY_STATUS_REF]: EntityDisplayStatus;
}

export interface EntityDisplayStatus {
  isDisplayed: boolean;
}
