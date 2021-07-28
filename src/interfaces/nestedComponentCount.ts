import { NESTED_COMPONENTS_BASE_NAMES } from '../consts/baseSubcomponentNames.enum';

export type BaseNameCount = {
  [key in NESTED_COMPONENTS_BASE_NAMES]?: number;
}

export interface NestedComponentCount {
  current?: BaseNameCount;
  max: BaseNameCount;
}
