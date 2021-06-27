import { EntityDisplayStatusUtils } from '../../../../utils/entityDisplayStatus/entityDisplayStatusUtils';
import { NestedComponentStructure } from '../../../../../../../interfaces/nestedComponentStructure';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';

export default function getAlertSubcomponentDropdownStructure(textSubcomponent: SubcomponentProperties,
    nestedCloseButtonStructure: NestedComponentStructure): NestedDropdownStructure {
  return {
    [CORE_SUBCOMPONENTS_NAMES.BASE]: {
      [CORE_SUBCOMPONENTS_NAMES.TEXT]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(textSubcomponent.subcomponentDisplayStatus),
      [nestedCloseButtonStructure.baseName]: { ...nestedCloseButtonStructure.component[nestedCloseButtonStructure.baseName] },
    },
  };
}

