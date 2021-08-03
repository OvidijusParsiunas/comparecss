export type BASE_SUBCOMPONENT_NAMES = PARENT_COMPONENT_BASE_NAME | NESTED_COMPONENTS_BASE_NAMES;

export enum PARENT_COMPONENT_BASE_NAME {
  BASE = 'Base'
}

export enum NESTED_COMPONENTS_BASE_NAMES {
  LAYER = 'Layer',
  BUTTON = 'Button',
  TEXT = 'Text',
  IMAGE = 'Image',
  CLOSE = 'Close',
  DROPDOWN_MENU_ITEM = 'Item',
  TEMPORARY = 'Temporary' // used for previewing a new subcomponent when hovering over a dropdown option
}
