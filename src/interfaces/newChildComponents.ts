import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';
import { NestedDropdownStructure } from './nestedDropdownStructure';
import { CustomCss, WorkshopComponent } from './workshopComponent';
import { COMPONENT_TYPES } from '../consts/componentTypes.enum';

export interface SharedDropdownItemsRefs {
  layer: NestedDropdownStructure;
}

type NewChildComponentStyles = {
  [key in SUBCOMPONENT_TYPES]?: () => CustomCss;
}

type PropertyOverwritables = {
  [key in COMPONENT_TYPES]?: (component: WorkshopComponent, containerComponent: WorkshopComponent) => void;
}

export interface NewChildComponents {
  dropdownItems?: NestedDropdownStructure;
  // this property is never used in the layer generator files and is instead set in the container component then appended when a new layer is created
  // this is done so that the same new component item list reference is shared across all layers and the enabled and disabled items would be in-sync
  sharedDropdownItemsRefs?: SharedDropdownItemsRefs;
  // WORK 2 - need to have overwritables for all areas where child components are added
  // WORK 2 - should probably be required
  propertyOverwritables?: PropertyOverwritables;
  // WORK 2 - remove
  customCssOverwritables?: NewChildComponentStyles;
  // this property references components that are automatically added to layer and removed a long with it
  // it additionally helps when container component is being copied
  childComponentsLockedToLayer?: WorkshopComponent[];
}
