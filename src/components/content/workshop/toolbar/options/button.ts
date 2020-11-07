import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../consts/workshopToolbarOptions';
import { BUTTON_COMPONENT_MODES } from '../../../../../consts/buttonComponentModes.enum';
import { ComponentOptions } from '../../../../../interfaces/componentOptions';

export default {
  [BUTTON_COMPONENT_MODES.DEFAULT]: [
    {
      buttonName: 'Border',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.BORDER,
    },
    {
      buttonName: 'Color',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.COLOR,
    },
    {
      buttonName: 'Shadow',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.SHADOW,
    },
    {
      buttonName: 'Size',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.SIZE,
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
      buttonName: 'Text',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.TEXT,
    },
    {
      buttonName: 'Reset',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.RESET,
    },
  ],
  [BUTTON_COMPONENT_MODES.HOVER]: [
    {
      buttonName: 'Border',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.BORDER,
    },
    {
      buttonName: 'Color',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.COLOR,
    },
    {
      buttonName: 'Shadow',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.SHADOW,
    },
    {
      buttonName: 'Text',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.TEXT,
    },
    {
      buttonName: 'Reset',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.RESET,
    },
  ],
  [BUTTON_COMPONENT_MODES.CLICK]: [
    {
      buttonName: 'Border',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.BORDER,
    },
    {
      buttonName: 'Color',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.COLOR,
    },
    {
      buttonName: 'Shadow',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.SHADOW,
    },
    {
      buttonName: 'Text',
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
} as ComponentOptions;
  