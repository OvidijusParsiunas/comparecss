import { ImportedComponentStructure } from '../../../../../../../interfaces/importedComponentStructure';
import { NestedDropdownUtils } from '../../../../toolbar/options/dropdown/utils/nestedDropdownsUtils';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';

export default function getModalSubcomponentDropdownStructure(
    closeComponent: SubcomponentProperties, textSubcomponent1: SubcomponentProperties, textSubcomponent2: SubcomponentProperties,
    importedButtonStructure1: ImportedComponentStructure, importedButtonStructure2: ImportedComponentStructure): NestedDropdownStructure {
  return {
    [CORE_SUBCOMPONENTS_NAMES.BASE]: {
      [CORE_SUBCOMPONENTS_NAMES.LAYER_1]: {
        [CORE_SUBCOMPONENTS_NAMES.TEXT_1]: NestedDropdownUtils.createEntityDisplayStatusReferenceObject(textSubcomponent1.optionalSubcomponent),
        [CORE_SUBCOMPONENTS_NAMES.CLOSE]: NestedDropdownUtils.createEntityDisplayStatusReferenceObject(closeComponent.optionalSubcomponent),
      },
      [CORE_SUBCOMPONENTS_NAMES.LAYER_2]: { 
        [CORE_SUBCOMPONENTS_NAMES.TEXT_2]: NestedDropdownUtils.createEntityDisplayStatusReferenceObject(textSubcomponent2.optionalSubcomponent),
      },
      [CORE_SUBCOMPONENTS_NAMES.LAYER_3]: {
        [importedButtonStructure1.baseName]: { ...importedButtonStructure1.component[importedButtonStructure1.baseName] },
        [importedButtonStructure2.baseName]: { ...importedButtonStructure2.component[importedButtonStructure2.baseName] },
      },
    },
  };
}
