import { ALIGNED_SECTION_TYPES } from '../consts/layerSections.enum';
import { NestedDropdownStructure } from './nestedDropdownStructure';
import { COMPONENT_TYPES } from '../consts/componentTypes.enum';
import { WorkshopComponent } from './workshopComponent';

export interface SharedDropdownItemsRefs {
  layer: NestedDropdownStructure;
}

export interface ParentBasedPresetProperties {
  alignmentSection?: ALIGNED_SECTION_TYPES;
}

export type PropertiesAddedOnBuild = {
  [key in COMPONENT_TYPES]?: ParentBasedPresetProperties;
}

export type PostGenerationOverwritableCallbacks = {
  [key in COMPONENT_TYPES]?: (component: WorkshopComponent, containerComponent: WorkshopComponent) => void;
}

export interface PropertyOverwritables {
  // WORK 2 - need to have overwritables for all areas where child components are added
  // WORK 2 - should probably be required
  postBuildCallback?: PostGenerationOverwritableCallbacks;
  // this is mostly used for properties that are coupled to the parent and need to be applied before any further processing is done during the addition
  // e.g. the alignment of a button child component (text/icon) before the alignment property is read and the component is placed into a layer section
  propertiesAddedOnBuild?: PropertiesAddedOnBuild;
}

export interface NewChildComponents {
  dropdownItems?: NestedDropdownStructure;
  // this property is never used in the layer generator files and is instead set in the container component then appended when a new layer is created
  // this is done so that the same new component item list reference is shared across all layers and the enabled and disabled items would be in-sync
  sharedDropdownItemsRefs?: SharedDropdownItemsRefs;
  propertyOverwritables?: PropertyOverwritables;
  // this property references components that are automatically added to layer and removed a long with it
  // it additionally helps when container component is being copied
  childComponentsLockedToLayer?: WorkshopComponent[];
}
