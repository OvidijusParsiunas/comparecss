import { EntityDisplayStatusRef, ENTITY_DISPLAY_STATUS_REF } from '../../../../../../../interfaces/entityDisplayStatus';
import { SubcomponentDisplayStatus } from '../../../../../../../interfaces/workshopComponent';

export class NestedDropdownUtils {
  
  public static createEntityDisplayStatusReferenceObject(optionalSubcomponent?: SubcomponentDisplayStatus): EntityDisplayStatusRef {
    const defaultIsEntityDisplayStatus = { currentlyDisplaying: true };
    return { [ENTITY_DISPLAY_STATUS_REF]: optionalSubcomponent || defaultIsEntityDisplayStatus };
  }
}
