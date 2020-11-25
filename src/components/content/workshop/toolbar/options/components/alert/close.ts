import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum';
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../../../consts/workshopToolbarOptions';
import { ComponentOptions } from '../../../../../../../interfaces/componentOptions';

type alertCloseOptionsModes = SUB_COMPONENT_CSS_MODES.DEFAULT | SUB_COMPONENT_CSS_MODES.HOVER | SUB_COMPONENT_CSS_MODES.CLICK;

export const alertCloseOptions: ComponentOptions<alertCloseOptionsModes> = {
  [SUB_COMPONENT_CSS_MODES.DEFAULT]: [
    {
      buttonName: 'Border',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.BORDER,
    },
    {
      buttonName: 'Background color',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.COLOR,
    },
    {
      buttonName: 'Shadow',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.SHADOW,
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
      buttonName: 'X Size',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.TEXT,
    },
    {
      buttonName: 'Button Size',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.SIZE,
    },
    {
      buttonName: 'Reset',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.RESET,
    },
  ],
  [SUB_COMPONENT_CSS_MODES.HOVER]: [
    {
      buttonName: 'Border',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.BORDER,
    },
    {
      buttonName: 'Background color',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.COLOR,
    },
    {
      buttonName: 'Shadow',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.SHADOW,
    },
    {
      buttonName: 'X Size',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.TEXT,
    },
    {
      buttonName: 'Reset',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.RESET,
    },
  ],
  [SUB_COMPONENT_CSS_MODES.CLICK]: [
    {
      buttonName: 'Border',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.BORDER,
    },
    {
      buttonName: 'Background color',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.COLOR,
    },
    {
      buttonName: 'Shadow',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.SHADOW,
    },
    {
      buttonName: 'X Size',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.TEXT,
    },
    {
      buttonName: 'Reset',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.RESET,
    },
    {
      buttonName: 'Design',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.DESIGN,
    },
  ],
};
