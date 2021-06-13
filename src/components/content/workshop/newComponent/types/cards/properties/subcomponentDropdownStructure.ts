import { EntityDisplayStatusUtils } from '../../../../utils/entityDisplayStatus/entityDisplayStatusUtils';
import { ImportedComponentStructure } from '../../../../../../../interfaces/importedComponentStructure';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';

export default function getCardSubcomponentDropdownStructure(
    avatarSubcomponent: SubcomponentProperties, layer2Subcomponent: SubcomponentProperties, layer3Subcomponent: SubcomponentProperties,
    layer4Subcomponent: SubcomponentProperties, noSiblingTextSubcomponent: SubcomponentProperties, textSubcomponent1Layer2: SubcomponentProperties,
    textSubcomponent2Layer2: SubcomponentProperties, textSubcomponent3Layer2: SubcomponentProperties, textSubcomponent1Layer3: SubcomponentProperties,
    textSubcomponent2Layer3: SubcomponentProperties, textSubcomponent3Layer3: SubcomponentProperties, textSubcomponent1Layer4: SubcomponentProperties,
    textSubcomponent2Layer4: SubcomponentProperties, textSubcomponent3Layer4: SubcomponentProperties, importedCloseButtonStructure: ImportedComponentStructure,
    importedButtonLayer1Structure: ImportedComponentStructure, importedButton1Layer2Structure: ImportedComponentStructure,
    importedButton2Layer2Structure: ImportedComponentStructure, importedButton3Layer2Structure: ImportedComponentStructure,
    importedButton1Layer3Structure: ImportedComponentStructure, importedButton2Layer3Structure: ImportedComponentStructure, 
    importedButton3Layer3Structure: ImportedComponentStructure, importedButton1Layer4Structure: ImportedComponentStructure,
    importedButton2Layer4Structure: ImportedComponentStructure, importedButton3Layer4Structure: ImportedComponentStructure): NestedDropdownStructure {
  return {
    [CORE_SUBCOMPONENTS_NAMES.BASE]: {
      [CORE_SUBCOMPONENTS_NAMES.LAYER_1]: {
        [CORE_SUBCOMPONENTS_NAMES.AVATAR]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(avatarSubcomponent.subcomponentDisplayStatus),
        [CORE_SUBCOMPONENTS_NAMES.NO_SIBLING_TEXT_1]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(noSiblingTextSubcomponent.subcomponentDisplayStatus),
        [importedCloseButtonStructure.baseName]: { ...importedCloseButtonStructure.component[importedCloseButtonStructure.baseName] },
        [importedButtonLayer1Structure.baseName]: { ...importedButtonLayer1Structure.component[importedButtonLayer1Structure.baseName] },
      },
      [CORE_SUBCOMPONENTS_NAMES.LAYER_2]: {
        [CORE_SUBCOMPONENTS_NAMES.TEXT_1_LAYER_2]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(textSubcomponent1Layer2.subcomponentDisplayStatus),
        [CORE_SUBCOMPONENTS_NAMES.TEXT_2_LAYER_2]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(textSubcomponent2Layer2.subcomponentDisplayStatus),
        [CORE_SUBCOMPONENTS_NAMES.TEXT_3_LAYER_2]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(textSubcomponent3Layer2.subcomponentDisplayStatus),
        [importedButton1Layer2Structure.baseName]: { ...importedButton1Layer2Structure.component[importedButton1Layer2Structure.baseName] },
        [importedButton2Layer2Structure.baseName]: { ...importedButton2Layer2Structure.component[importedButton2Layer2Structure.baseName] },
        [importedButton3Layer2Structure.baseName]: { ...importedButton3Layer2Structure.component[importedButton3Layer2Structure.baseName] },
        ...EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(layer2Subcomponent.subcomponentDisplayStatus),
      },
      [CORE_SUBCOMPONENTS_NAMES.LAYER_3]: {
        [CORE_SUBCOMPONENTS_NAMES.TEXT_1_LAYER_3]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(textSubcomponent1Layer3.subcomponentDisplayStatus),
        [CORE_SUBCOMPONENTS_NAMES.TEXT_2_LAYER_3]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(textSubcomponent2Layer3.subcomponentDisplayStatus),
        [CORE_SUBCOMPONENTS_NAMES.TEXT_3_LAYER_3]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(textSubcomponent3Layer3.subcomponentDisplayStatus),
        [importedButton1Layer3Structure.baseName]: { ...importedButton1Layer3Structure.component[importedButton1Layer3Structure.baseName] },
        [importedButton2Layer3Structure.baseName]: { ...importedButton2Layer3Structure.component[importedButton2Layer3Structure.baseName] },
        [importedButton3Layer3Structure.baseName]: { ...importedButton3Layer3Structure.component[importedButton3Layer3Structure.baseName] },
        ...EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(layer3Subcomponent.subcomponentDisplayStatus),
      },
      [CORE_SUBCOMPONENTS_NAMES.LAYER_4]: {
        [CORE_SUBCOMPONENTS_NAMES.TEXT_1_LAYER_4]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(textSubcomponent1Layer4.subcomponentDisplayStatus),
        [CORE_SUBCOMPONENTS_NAMES.TEXT_2_LAYER_4]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(textSubcomponent2Layer4.subcomponentDisplayStatus),
        [CORE_SUBCOMPONENTS_NAMES.TEXT_3_LAYER_4]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(textSubcomponent3Layer4.subcomponentDisplayStatus),
        [importedButton1Layer4Structure.baseName]: { ...importedButton1Layer4Structure.component[importedButton1Layer4Structure.baseName] },
        [importedButton2Layer4Structure.baseName]: { ...importedButton2Layer4Structure.component[importedButton2Layer4Structure.baseName] },
        [importedButton3Layer4Structure.baseName]: { ...importedButton3Layer4Structure.component[importedButton3Layer4Structure.baseName] },
        ...EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(layer4Subcomponent.subcomponentDisplayStatus),
      },
    },
  };
}
