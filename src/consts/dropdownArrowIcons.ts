export enum DROPDOWN_ARROW_ICON_TYPES {
  CARET = 'caret',
  ANGLE = 'angle',
}

type DROPDOWN_ARROW_ICONS_TYPE = {
  [key in DROPDOWN_ARROW_ICON_TYPES]: string;
}

export const DROPDOWN_ARROW_ICON_TYPES_TO_FONT_AWESOME_NAMES: Readonly<DROPDOWN_ARROW_ICONS_TYPE> = {
  [DROPDOWN_ARROW_ICON_TYPES.CARET]: 'caret-down',
  [DROPDOWN_ARROW_ICON_TYPES.ANGLE]: 'angle-down',
};
