import { EntityDisplayStatus, EntityDisplayStatusRef, ENTITY_DISPLAY_STATUS_REF } from '../../../../../interfaces/entityDisplayStatus';
import { SubcomponentDisplayStatus } from '../../../../../interfaces/workshopComponent';

export class EntityDisplayStatusUtils {

  public static createDefaultEntityDisplayStatus(): EntityDisplayStatus {
    return { isDisplayed: true };
  }
  
  public static createEntityDisplayStatusReferenceObject(subcomponentDisplayStatus?: SubcomponentDisplayStatus): EntityDisplayStatusRef {
    return { [ENTITY_DISPLAY_STATUS_REF]: subcomponentDisplayStatus || EntityDisplayStatusUtils.createDefaultEntityDisplayStatus() };
  }
}
