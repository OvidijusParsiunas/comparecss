import { EntityDisplayStatusUtils } from '../../../../utils/entityDisplayStatus/entityDisplayStatusUtils';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';

export default function getAlertSubcomponentDropdownStructure(
    closeComponent: SubcomponentProperties, textSubcomponent: SubcomponentProperties): NestedDropdownStructure {
  return {
    [CORE_SUBCOMPONENTS_NAMES.BASE]: {
      [CORE_SUBCOMPONENTS_NAMES.TEXT_1]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(textSubcomponent.subcomponentDisplayStatus),
      [CORE_SUBCOMPONENTS_NAMES.CLOSE]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(closeComponent.subcomponentDisplayStatus),
    },
  };
}

