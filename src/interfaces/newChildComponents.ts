import { PropertyReferenceSharingFunc as PropertyReferenceSharingFunc } from './PropertyReferenceSharingFunc';
import { ALIGNED_SECTION_TYPES } from '../consts/layerSections.enum';
import { NestedDropdownStructure } from './nestedDropdownStructure';
import { COMPONENT_TYPES } from '../consts/componentTypes.enum';
import { WorkshopComponent } from './workshopComponent';

export interface ParentBasedPresetProperties {
  alignmentSection?: ALIGNED_SECTION_TYPES;
}

export type PropertiesAddedOnBuild = {
  [key in COMPONENT_TYPES]?: ParentBasedPresetProperties;
}

export interface ReferenceSharingFunType {
  container?: PropertyReferenceSharingFunc[];
  layer?: PropertyReferenceSharingFunc[];
}

export type PostBuildPropertyOverwritableFuncs = {
  [key in COMPONENT_TYPES]?: (component: WorkshopComponent, containerComponent: WorkshopComponent) => void;
}

export interface PropertyOverwritables {
  postBuildFuncs?: PostBuildPropertyOverwritableFuncs;
  // WORK 2 - try to replace this with postBuildFuncs
  // executed for different types of child components - when they are added, copied or dereferenced
  propertyReferenceSharingFuncsOnComponentChange?: ReferenceSharingFunType;
  // this is mostly used for properties that are coupled to the parent and need to be applied before any further processing is done during the addition
  // e.g. the alignment of a button child component (text/icon) before the alignment property is read and the component is placed into a layer section
  onBuildProperties?: PropertiesAddedOnBuild;
}

export interface SharedDropdownItemsRefs {
  layer: NestedDropdownStructure;
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
