import { EntityDisplayStatusUtils } from '../../../../utils/entityDisplayStatus/entityDisplayStatusUtils';
import { NestedComponentStructure } from '../../../../../../../interfaces/nestedComponentStructure';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';

export default function getModalSubcomponentDropdownStructure(
    layer2Subcomponent: SubcomponentProperties, layer3Subcomponent: SubcomponentProperties, textSubcomponent1: SubcomponentProperties,
    textSubcomponent2: SubcomponentProperties, nestedCloseButtonStructure: NestedComponentStructure,
    nestedButtonStructure1: NestedComponentStructure, nestedButtonStructure2: NestedComponentStructure): NestedDropdownStructure {
  return {
    [CORE_SUBCOMPONENTS_NAMES.BASE]: {
      [CORE_SUBCOMPONENTS_NAMES.LAYER_1]: {
        [CORE_SUBCOMPONENTS_NAMES.TEXT]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(textSubcomponent1.subcomponentDisplayStatus),
        [nestedCloseButtonStructure.baseName]: { ...nestedCloseButtonStructure.component[nestedCloseButtonStructure.baseName] },
      },
      [CORE_SUBCOMPONENTS_NAMES.LAYER_2]: {
        [CORE_SUBCOMPONENTS_NAMES.TEXT_2]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(textSubcomponent2.subcomponentDisplayStatus),
        ...EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(layer2Subcomponent.subcomponentDisplayStatus),
      },
      [CORE_SUBCOMPONENTS_NAMES.LAYER_3]: {
        [nestedButtonStructure1.baseName]: { ...nestedButtonStructure1.component[nestedButtonStructure1.baseName] },
        [nestedButtonStructure2.baseName]: { ...nestedButtonStructure2.component[nestedButtonStructure2.baseName] },
        ...EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(layer3Subcomponent.subcomponentDisplayStatus),
      },
    },
  };
}
