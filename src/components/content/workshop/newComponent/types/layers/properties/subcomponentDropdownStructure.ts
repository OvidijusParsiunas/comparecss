import { EntityDisplayStatusUtils } from '../../../../utils/entityDisplayStatus/entityDisplayStatusUtils';
import { CustomSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';

export default function getLayerSubcomponentDropdownStructure(subcomponentNames: CustomSubcomponentNames): NestedDropdownStructure {
  return {
    [subcomponentNames.base]: EntityDisplayStatusUtils.createEntityDisplayStatusReferenceObject(),
  };
}
