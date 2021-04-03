import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';

export default function getAlertSubcomponentDropdownStructure(
    closeComponent: SubcomponentProperties, textSubcomponent: SubcomponentProperties): NestedDropdownStructure {
  return {
    [SUB_COMPONENTS.BASE]: {
      [SUB_COMPONENTS.TEXT_1]: textSubcomponent.optionalSubcomponent,
      [SUB_COMPONENTS.CLOSE]: closeComponent.optionalSubcomponent,
    },
  };
}

