import { ParentBasedPresetProperties } from './newChildComponents';
import { COMPONENT_STYLES } from '../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../consts/componentTypes.enum';
import { WorkshopComponent } from './workshopComponent';

export type PresetProperties = {
  baseName?: string;
  componentType?: COMPONENT_TYPES;
  componentStyle?: COMPONENT_STYLES;
  paddingComponent?: WorkshopComponent;
} & ParentBasedPresetProperties;

export type CreateNewComponent = (presetProperties: PresetProperties) => WorkshopComponent;

export interface ComponentGenerator {
  createNewComponent: CreateNewComponent;
}
