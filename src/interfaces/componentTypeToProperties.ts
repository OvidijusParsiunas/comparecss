import { COMPONENT_TYPES } from '../consts/componentTypes.enum';
import { WorkshopComponent } from './workshopComponent';

export type ComponentTypeToProperties = {
  [key in COMPONENT_TYPES]?: WorkshopComponent;
};
