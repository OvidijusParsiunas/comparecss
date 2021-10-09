import { SUBCOMPONENT_TYPES } from '../consts/subcomponentTypes.enum';
import { NestedDropdownStructure } from './nestedDropdownStructure';
import { CustomCss } from './workshopComponent';

export interface SharedDropdownItemsRefs {
  layer: NestedDropdownStructure;
}

type NewChildComponentStyles = {
  [key in SUBCOMPONENT_TYPES]?: () => CustomCss;
}

export interface NewChildComponents {
  dropdownItems: NestedDropdownStructure;
  // this property is never used in the layer generator files and is instead set in the container component then appended when a new layer is created
  // this is done so that the same new component item list reference is shared across all layers and the enabled and disabled items would be in-sync
  sharedDropdownItemsRefs?: SharedDropdownItemsRefs;
  customCssOverwritables?: NewChildComponentStyles;
}
