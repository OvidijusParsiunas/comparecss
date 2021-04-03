import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';

export default function getButtonSubcomponentDropdownStructure(): NestedDropdownStructure {
  return {
    [SUB_COMPONENTS.BASE]: {
      [SUB_COMPONENTS.TEXT_1]: { currentlyDisplaying: true },
    },
  };
}

