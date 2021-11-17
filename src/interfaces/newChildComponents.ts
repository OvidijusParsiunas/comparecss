import { PropertyReferenceSharingFunc as PropertyReferenceSharingFunc } from './PropertyReferenceSharingFunc';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../consts/horizontalAlignmentSections';
import { ChildComponentCountLimitsState } from './childComponentCountLimitsState';
import { PropertyOverwritableFunc } from './removeChildComponentFunc';
import { NestedDropdownStructure } from './nestedDropdownStructure';
import { COMPONENT_TYPES } from '../consts/componentTypes.enum';
import { WorkshopComponent } from './workshopComponent';

export interface ParentBasedPresetProperties {
  horizontalSection?: HORIZONTAL_ALIGNMENT_SECTIONS;
}

export type PropertiesAddedOnBuild = {
  [key in COMPONENT_TYPES]?: ParentBasedPresetProperties;
}

export interface ReferenceSharingFuncType {
  container?: PropertyReferenceSharingFunc[];
  layer?: PropertyReferenceSharingFunc[];
}

// each property has an array of PropertyOverwritableFunc in order to allow further addition of functions after the base - e.g. default style
export type PostBuildPropertyOverwritableFuncs = {
  [key in COMPONENT_TYPES]?: PropertyOverwritableFunc[];
}

export interface PropertyOverwritables {
  postBuildFuncs?: PostBuildPropertyOverwritableFuncs;
  // this is mostly used for properties that are coupled to the parent and need to be applied before any further processing is done during the addition
  // e.g. the alignment of a button child component (text/icon) before the alignment property is read and the component is placed into a layer section
  onBuildProperties?: PropertiesAddedOnBuild;
  // this is very similar to postBuildFuncs however the difference here is the fact that it gets executed when the component is fully added and not at the
  // temp stage. This is done to optimise child component addition complexity and is currently focused on populating value references - e.g. jsClasses
  // executed for different types of child components - when they are added, copied or dereferenced
  propertyReferenceSharingFuncs?: ReferenceSharingFuncType;
}

export interface SharedDropdownItemsRefs {
  layer: NestedDropdownStructure;
}

interface NewChildComponentsDropdown {
  items?: NestedDropdownStructure;
  childComponentCountLimitsState?: ChildComponentCountLimitsState;
}

export interface NewChildComponents {
  dropdown?: NewChildComponentsDropdown;
  // this property is never used in the layer generator files and is instead set in the container component then appended when a new layer is created
  // this is done so that the same new component item list reference is shared across all layers and the enabled and disabled items would be in-sync
  sharedDropdownItemsRefs?: SharedDropdownItemsRefs;
  propertyOverwritables?: PropertyOverwritables;
  // this property references components that are automatically added to layer and removed a long with it
  // it additionally helps when container component is being copied
  childComponentsLockedToLayer?: WorkshopComponent[];
}
