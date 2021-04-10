import { NestedDropdownUtils } from '../../../../toolbar/options/dropdown/utils/nestedDropdownsUtils';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../consts/coreSubcomponentNames.enum';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';

export default function getAlertSubcomponentDropdownStructure(
    closeComponent: SubcomponentProperties, textSubcomponent: SubcomponentProperties): NestedDropdownStructure {
  return {
    [CORE_SUBCOMPONENTS_NAMES.BASE]: {
      [CORE_SUBCOMPONENTS_NAMES.TEXT_1]: NestedDropdownUtils.createEntityDisplayStatusReferenceObject(textSubcomponent.optionalSubcomponent),
      [CORE_SUBCOMPONENTS_NAMES.CLOSE]: NestedDropdownUtils.createEntityDisplayStatusReferenceObject(closeComponent.optionalSubcomponent),
    },
  };
}

