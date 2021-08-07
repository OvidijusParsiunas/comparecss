export type BASE_SUBCOMPONENT_NAMES = PARENT_COMPONENT_BASE_NAME | NESTED_COMPONENTS_BASE_NAMES;

export enum PARENT_COMPONENT_BASE_NAME {
  BASE = 'Base'
}

export type NESTED_COMPONENTS_BASE_NAMES = GENERIC_COMPONENTS_BASE_NAMES | LAYER_COMPONENTS_BASE_NAMES | TEMPORARY_COMPONENT_BASE_NAME;

export enum GENERIC_COMPONENTS_BASE_NAMES {
  BUTTON = 'Button',
  TEXT = 'Text',
  IMAGE = 'Image',
  CLOSE = 'Close',
}

export enum LAYER_COMPONENTS_BASE_NAMES {
  LAYER = 'Layer',
  DROPDOWN_MENU_ITEM = 'Item',
}

export enum TEMPORARY_COMPONENT_BASE_NAME {
  TEMPORARY = 'Temporary' // used for previewing a new subcomponent when hovering over a dropdown option
}
