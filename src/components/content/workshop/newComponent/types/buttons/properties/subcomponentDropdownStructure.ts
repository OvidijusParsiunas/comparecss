import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';

// WORK2: need type
export default function getButtonSubcomponentDropdownStructure(subcomponentNames: any): NestedDropdownStructure {
  return {
    [subcomponentNames.base]: {
      [subcomponentNames.text]: { currentlyDisplaying: true },
    },
  };
}
