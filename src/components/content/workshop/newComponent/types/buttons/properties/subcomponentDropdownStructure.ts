import { NestedDropdownUtils } from '../../../../toolbar/options/dropdown/utils/nestedDropdownsUtils';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';

export default function getButtonSubcomponentDropdownStructure(subcomponentNames: CustomSubcomponentNames): NestedDropdownStructure {
  return {
    [subcomponentNames.base]: {
      [subcomponentNames.text]: NestedDropdownUtils.createEntityDisplayStatusReferenceObject(),
    },
  };
}
