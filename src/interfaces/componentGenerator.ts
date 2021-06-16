import { SubcomponentProperties, WorkshopComponent } from './workshopComponent';
import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';

export interface ComponentGenerator {
  createNewComponent: (baseName?: string, subcomponentText?: string) => WorkshopComponent;
  createNewSubcomponent?: (subcomponentType: SUBCOMPONENT_TYPES) => SubcomponentProperties;
}
