import { EntityDisplayStatusUtils } from '../../../../utils/entityDisplayStatus/entityDisplayStatusUtils';
import { ImportedComponentStructure } from '../../../../../../../interfaces/importedComponentStructure';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';

export default function getCardSubcomponentDropdownStructure(
    avatarSubcomponent: SubcomponentProperties, layer2Subcomponent: SubcomponentProperties, layer3Subcomponent: SubcomponentProperties,
    textSubcomponent1Layer2: SubcomponentProperties, importedTextStructure: ImportedComponentStructure,
    importedCloseButtonStructure: ImportedComponentStructure,
    importedButtonLayer1Structure: ImportedComponentStructure, importedButton1Layer2Structure: ImportedComponentStructure,
    importedButton2Layer2Structure: ImportedComponentStructure, importedButton3Layer2Structure: ImportedComponentStructure,
    importedButton1Layer3Structure: ImportedComponentStructure, importedButton2Layer3Structure: ImportedComponentStructure, 
    importedButton3Layer3Structure: ImportedComponentStructure): NestedDropdownStructure {
  return {
    [CORE_SUBCOMPONENTS_NAMES.BASE]: {
      [CORE_SUBCOMPONENTS_NAMES.LAYER_1]: {
        [CORE_SUBCOMPONENTS_NAMES.AVATAR]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(avatarSubcomponent.subcomponentDisplayStatus),
        [importedTextStructure.baseName]: { ...importedTextStructure.component[importedTextStructure.baseName] },
        [importedCloseButtonStructure.baseName]: { ...importedCloseButtonStructure.component[importedCloseButtonStructure.baseName] },
        [importedButtonLayer1Structure.baseName]: { ...importedButtonLayer1Structure.component[importedButtonLayer1Structure.baseName] },
      },
      [CORE_SUBCOMPONENTS_NAMES.LAYER_2]: {
        [CORE_SUBCOMPONENTS_NAMES.TEXT_1_LAYER_2]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(textSubcomponent1Layer2.subcomponentDisplayStatus),
        [importedButton1Layer2Structure.baseName]: { ...importedButton1Layer2Structure.component[importedButton1Layer2Structure.baseName] },
        [importedButton2Layer2Structure.baseName]: { ...importedButton2Layer2Structure.component[importedButton2Layer2Structure.baseName] },
        [importedButton3Layer2Structure.baseName]: { ...importedButton3Layer2Structure.component[importedButton3Layer2Structure.baseName] },
        ...EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(layer2Subcomponent.subcomponentDisplayStatus),
      },
      [CORE_SUBCOMPONENTS_NAMES.LAYER_3]: {
        [importedButton1Layer3Structure.baseName]: { ...importedButton1Layer3Structure.component[importedButton1Layer3Structure.baseName] },
        [importedButton2Layer3Structure.baseName]: { ...importedButton2Layer3Structure.component[importedButton2Layer3Structure.baseName] },
        [importedButton3Layer3Structure.baseName]: { ...importedButton3Layer3Structure.component[importedButton3Layer3Structure.baseName] },
        ...EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(layer3Subcomponent.subcomponentDisplayStatus),
      },
    },
  };
}
