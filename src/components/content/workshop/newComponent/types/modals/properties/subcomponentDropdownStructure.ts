import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';

// WORK2: type
export default function getModalSubcomponentDropdownStructure(
    closeComponent: SubcomponentProperties, textSubcomponent1: SubcomponentProperties, textSubcomponent2: SubcomponentProperties,
    importedButtonStructure1: any, importedButtonStructure2: any): NestedDropdownStructure {
  return {
    [SUB_COMPONENTS.BASE]: {
      [SUB_COMPONENTS.LAYER_1]: {
        [SUB_COMPONENTS.TEXT_1]: textSubcomponent1.optionalSubcomponent,
        [SUB_COMPONENTS.CLOSE]: closeComponent.optionalSubcomponent,
      },
      [SUB_COMPONENTS.LAYER_2]: { 
        [SUB_COMPONENTS.TEXT_2]: textSubcomponent2.optionalSubcomponent,
      },
      [SUB_COMPONENTS.LAYER_3]: {
        [importedButtonStructure1.baseName]: { ...importedButtonStructure1.component[importedButtonStructure1.baseName] },
        [importedButtonStructure2.baseName]: { ...importedButtonStructure2.component[importedButtonStructure2.baseName] },
      },
    },
  };
}
