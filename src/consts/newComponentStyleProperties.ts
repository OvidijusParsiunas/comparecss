import { CoreSubcomponentRefs } from '../interfaces/coreSubcomponentRefs';
import { COMPONENT_TYPES } from './componentTypes.enum';

export interface NewComponentStyleProperties {
  componentType?: COMPONENT_TYPES;
  baseName?: string;
  coreSubcomponentRefs?: CoreSubcomponentRefs;
}
