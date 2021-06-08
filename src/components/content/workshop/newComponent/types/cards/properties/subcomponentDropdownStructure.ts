import { EntityDisplayStatusUtils } from '../../../../utils/entityDisplayStatus/entityDisplayStatusUtils';
import { ImportedComponentStructure } from '../../../../../../../interfaces/importedComponentStructure';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';

export default function getCardSubcomponentDropdownStructure(
    avatarSubcomponent: SubcomponentProperties, layer2Subcomponent: SubcomponentProperties, layer3Subcomponent: SubcomponentProperties,
    textSubcomponent1: SubcomponentProperties, textSubcomponent2: SubcomponentProperties, importedCloseButtonStructure: ImportedComponentStructure,
    importedButtonStructure1: ImportedComponentStructure, importedButtonStructure2: ImportedComponentStructure): NestedDropdownStructure {
  return {
    [CORE_SUBCOMPONENTS_NAMES.BASE]: {
      [CORE_SUBCOMPONENTS_NAMES.LAYER_1]: {
        [CORE_SUBCOMPONENTS_NAMES.TEXT_1]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(textSubcomponent1.subcomponentDisplayStatus),
        [CORE_SUBCOMPONENTS_NAMES.AVATAR]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(avatarSubcomponent.subcomponentDisplayStatus),
        [importedCloseButtonStructure.baseName]: { ...importedCloseButtonStructure.component[importedCloseButtonStructure.baseName] },
      },
      [CORE_SUBCOMPONENTS_NAMES.LAYER_2]: {
        [CORE_SUBCOMPONENTS_NAMES.TEXT_2]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(textSubcomponent2.subcomponentDisplayStatus),
        ...EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(layer2Subcomponent.subcomponentDisplayStatus),
      },
      [CORE_SUBCOMPONENTS_NAMES.LAYER_3]: {
        [importedButtonStructure1.baseName]: { ...importedButtonStructure1.component[importedButtonStructure1.baseName] },
        [importedButtonStructure2.baseName]: { ...importedButtonStructure2.component[importedButtonStructure2.baseName] },
        ...EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(layer3Subcomponent.subcomponentDisplayStatus),
      },
    },
  };
}
