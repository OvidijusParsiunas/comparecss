import { EntityDisplayStatusRef, ENTITY_DISPLAY_STATUS_REF } from '../../../../../../../interfaces/nestedDropdownStructure';
import { EntityDisplayStatus } from '../../../../../../../interfaces/workshopComponent';

export class NestedDropdownUtils {
  
  public static createEntityDisplayStatusReferenceObject(optionalSubcomponent?: EntityDisplayStatus): EntityDisplayStatusRef {
    const defaultIsEntityDisplayStatus = { currentlyDisplaying: true };
    return { [ENTITY_DISPLAY_STATUS_REF]: optionalSubcomponent || defaultIsEntityDisplayStatus };
  }
}
