// these are components that can be generated as standalone components
export enum MASTER_COMPONENT_TYPES {
  BUTTON = 'Button',
  BUTTON_GROUP = 'Button group',
  DROPDOWN = 'Dropdown',
  ALERT = 'Alert',
  MODAL = 'Modal',
  CARD = 'Card',
}

// these are components that can be added to other components as children
export enum CHILD_COMPONENT_TYPES {
  BUTTON = 'Button',
  DROPDOWN = 'Dropdown',
  TEXT = 'Text',
  ICON = 'Icon',
  IMAGE = 'Image',
  LAYER = 'Layer',
}

// these are components that are coupled (incl. styling) and instantiated with other components
// e.g. dropdown menu belongs to dropdown 
enum SUPPLEMENTARY_COMPONENT_TYES {
  DROPDOWN_MENU = 'Menu',
}

export const COMPONENT_TYPES = { ...MASTER_COMPONENT_TYPES, ...CHILD_COMPONENT_TYPES, ...SUPPLEMENTARY_COMPONENT_TYES };

export type COMPONENT_TYPES = MASTER_COMPONENT_TYPES | CHILD_COMPONENT_TYPES | SUPPLEMENTARY_COMPONENT_TYES;

