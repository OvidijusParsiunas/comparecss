import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum';
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../../../consts/workshopToolbarOptions';
import { ComponentOptions } from '../../../../../../../interfaces/componentOptions';

type alertCloseOptionsModes = SUB_COMPONENT_CSS_MODES.DEFAULT | SUB_COMPONENT_CSS_MODES.HOVER | SUB_COMPONENT_CSS_MODES.CLICK;

export const alertCloseOptions: ComponentOptions<alertCloseOptionsModes> = {
  [SUB_COMPONENT_CSS_MODES.DEFAULT]: [
    {
      buttonName: 'Icon',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.TEXT_BASED_ICON,
    },
    {
      buttonName: 'Background',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.BACKGROUND,
    },
    {
      buttonName: 'Border',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.BORDER,
    },
    {
      buttonName: 'Padding',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.PADDING,
    },
    {
      buttonName: 'Margin',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.MARGIN,
    },
    {
      buttonName: 'Shadow',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.SHADOW,
    },
    {
      buttonName: 'Reset',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.RESET,
    },
  ],
  [SUB_COMPONENT_CSS_MODES.HOVER]: [
    {
      buttonName: 'Icon',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.TEXT_BASED_ICON,
    },
    {
      buttonName: 'Background',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.BACKGROUND,
    },
    {
      buttonName: 'Border',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.BORDER,
    },
    {
      buttonName: 'Padding',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.PADDING,
    },
    {
      buttonName: 'Margin',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.MARGIN,
    },
    {
      buttonName: 'Shadow',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.SHADOW,
    },
    {
      buttonName: 'Reset',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.RESET,
    },
  ],
  [SUB_COMPONENT_CSS_MODES.CLICK]: [
    {
      buttonName: 'Icon',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.TEXT_BASED_ICON,
    },
    {
      buttonName: 'Background',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.BACKGROUND,
    },
    {
      buttonName: 'Border',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.BORDER,
    },
    {
      buttonName: 'Padding',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.PADDING,
    },
    {
      buttonName: 'Margin',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.MARGIN,
    },
    {
      buttonName: 'Shadow',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.SHADOW,
    },
    {
      buttonName: 'Design',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.DESIGN,
    },
    {
      buttonName: 'Reset',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.RESET,
    },
  ],
};
