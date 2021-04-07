import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';

export default function getAlertSubcomponentDropdownStructure(
    closeComponent: SubcomponentProperties, textSubcomponent: SubcomponentProperties): NestedDropdownStructure {
  return {
    [CORE_SUBCOMPONENTS_NAMES.BASE]: {
      [CORE_SUBCOMPONENTS_NAMES.TEXT_1]: textSubcomponent.optionalSubcomponent,
      [CORE_SUBCOMPONENTS_NAMES.CLOSE]: closeComponent.optionalSubcomponent,
    },
  };
}

