import { ALIGNED_SECTION_TYPES } from '../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../consts/componentTypes.enum';
import { WorkshopComponent } from './workshopComponent';

export interface PresetProperties {
  baseName?: string;
  componentType?: COMPONENT_TYPES;
  paddingComponent?: WorkshopComponent;
  alignmentSection?: ALIGNED_SECTION_TYPES;
}

export type CreateNewComponent = (presetProperties: PresetProperties) => WorkshopComponent;

export interface ComponentGenerator {
  createNewComponent: CreateNewComponent;
}
