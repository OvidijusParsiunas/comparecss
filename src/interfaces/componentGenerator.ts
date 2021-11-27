import { ParentBasedPresetProperties } from './childComponentHandlers';
import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';
import { COMPONENT_STYLES } from '../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../consts/componentTypes.enum';
import { WorkshopComponent } from './workshopComponent';

export type PresetProperties = {
  baseName?: string;
  componentType?: COMPONENT_TYPES;
  componentStyle?: COMPONENT_STYLES;
  paddingComponent?: WorkshopComponent;
  baseSubcomponentType?: SUBCOMPONENT_TYPES;
} & ParentBasedPresetProperties;

export type CreateNewComponent = (presetProperties: PresetProperties) => WorkshopComponent;

export interface ComponentGenerator {
  createNewComponent: CreateNewComponent;
}
