import { EntityDisplayStatusUtils } from '../../../../utils/entityDisplayStatus/entityDisplayStatusUtils';
import { ImportedComponentStructure } from '../../../../../../../interfaces/importedComponentStructure';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';

export default function getAlertSubcomponentDropdownStructure(textSubcomponent: SubcomponentProperties,
    importedCloseButtonStructure: ImportedComponentStructure): NestedDropdownStructure {
  return {
    [CORE_SUBCOMPONENTS_NAMES.BASE]: {
      [CORE_SUBCOMPONENTS_NAMES.NO_SIBLING_TEXT_1]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(textSubcomponent.subcomponentDisplayStatus),
      [importedCloseButtonStructure.baseName]: { ...importedCloseButtonStructure.component[importedCloseButtonStructure.baseName] },
    },
  };
}

