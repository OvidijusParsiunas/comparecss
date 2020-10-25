import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../consts/workshopToolbarOptions';
import { BUTTON_COMPONENT_MODES } from '../../../../../consts/buttonComponentModes.enum';

// use consts for Default, Hover, Click properties
export default {
  [BUTTON_COMPONENT_MODES.DEFAULT]: [
    {
      buttonName: 'Border',
      clickParams: [ WORKSHOP_TOOLBAR_OPTIONS.BORDER ]
    },
    {
      buttonName: 'Color',
      clickParams: [ WORKSHOP_TOOLBAR_OPTIONS.COLOR ]
    },
    {
      buttonName: 'Shadow',
      clickParams: [ WORKSHOP_TOOLBAR_OPTIONS.SHADOW ]
    },
    {
      buttonName: 'Size',
      clickParams: [ WORKSHOP_TOOLBAR_OPTIONS.SIZE ]
    },
    {
      buttonName: 'Padding',
      clickParams: [ WORKSHOP_TOOLBAR_OPTIONS.PADDING ]
    },
    {
      buttonName: 'Margin',
      clickParams: [ WORKSHOP_TOOLBAR_OPTIONS.MARGIN ]
    },
    {
      buttonName: 'Text',
      clickParams: [ WORKSHOP_TOOLBAR_OPTIONS.TEXT ]
    },
    {
      buttonName: 'Reset',
      clickParams: [ WORKSHOP_TOOLBAR_OPTIONS.RESET ]
    },
  ],
  [BUTTON_COMPONENT_MODES.HOVER]: [
    {
      buttonName: 'Border',
      clickParams: [ WORKSHOP_TOOLBAR_OPTIONS.BORDER ]
    },
    {
      buttonName: 'Color',
      clickParams: [ WORKSHOP_TOOLBAR_OPTIONS.COLOR ]
    },
    {
      buttonName: 'Shadow',
      clickParams: [ WORKSHOP_TOOLBAR_OPTIONS.SHADOW ]
    },
    {
      buttonName: 'Text',
      clickParams: [ WORKSHOP_TOOLBAR_OPTIONS.TEXT ]
    },
    {
      buttonName: 'Reset',
      clickParams: [ WORKSHOP_TOOLBAR_OPTIONS.RESET ]
    },
  ],
  [BUTTON_COMPONENT_MODES.CLICK]: [
    {
      buttonName: 'Border',
      clickParams: [ WORKSHOP_TOOLBAR_OPTIONS.BORDER ]
    },
    {
      buttonName: 'Color',
      clickParams: [ WORKSHOP_TOOLBAR_OPTIONS.COLOR ]
    },
    {
      buttonName: 'Shadow',
      clickParams: [ WORKSHOP_TOOLBAR_OPTIONS.SHADOW ]
    },
    {
      buttonName: 'Text',
      clickParams: [ WORKSHOP_TOOLBAR_OPTIONS.TEXT ]
    },
    {
      buttonName: 'Reset',
      clickParams: [ WORKSHOP_TOOLBAR_OPTIONS.RESET ]
    },
  ],
};
  