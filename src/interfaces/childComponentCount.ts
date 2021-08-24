import { CHILD_COMPONENTS_BASE_NAMES } from '../consts/baseSubcomponentNames.enum';

export type BaseNameCount = {
  [key in CHILD_COMPONENTS_BASE_NAMES]?: number;
}

export interface ChildComponentCount {
  current?: BaseNameCount;
  max: BaseNameCount;
}
