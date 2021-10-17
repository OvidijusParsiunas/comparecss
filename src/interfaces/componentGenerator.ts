import { PropertiesAddedOnGeneration } from './newChildComponents';
import { COMPONENT_TYPES } from '../consts/componentTypes.enum';
import { WorkshopComponent } from './workshopComponent';

export type PresetProperties = {
  baseName?: string;
  componentType?: COMPONENT_TYPES;
  paddingComponent?: WorkshopComponent;
} & PropertiesAddedOnGeneration;

export type CreateNewComponent = (presetProperties: PresetProperties) => WorkshopComponent;

export interface ComponentGenerator {
  createNewComponent: CreateNewComponent;
}
