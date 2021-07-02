import { EntityDisplayStatus, EntityDisplayStatusRef, ENTITY_DISPLAY_STATUS_REF } from '../../../../../interfaces/entityDisplayStatus';

export class EntityDisplayStatusUtils {

  public static createDefaultEntityDisplayStatus(): EntityDisplayStatus {
    return { isDisplayed: true };
  }
  
  public static createEntityDisplayStatusReferenceObject(): EntityDisplayStatusRef {
    return { [ENTITY_DISPLAY_STATUS_REF]: EntityDisplayStatusUtils.createDefaultEntityDisplayStatus() };
  }
}
