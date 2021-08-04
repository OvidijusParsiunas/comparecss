import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';

type TextWithNoBackgroundOptions = CSS_PSEUDO_CLASSES.DEFAULT | CSS_PSEUDO_CLASSES.HOVER | CSS_PSEUDO_CLASSES.CLICK;

export const buttonTextOptions: SubcomponentOptions<TextWithNoBackgroundOptions> = {
  [CSS_PSEUDO_CLASSES.DEFAULT]: [
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.TEXT_FONT,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_FONT,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.COLOR,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_COLOR,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.PADDING,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.PADDING,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.POSITION,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.NESTED_COMPONENT_POSITION_NO_ALIGN,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.TEXT,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT,
    },
  ],
  [CSS_PSEUDO_CLASSES.HOVER]: [
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.COLOR,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_COLOR,
    },
  ],
  [CSS_PSEUDO_CLASSES.CLICK]: [
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.COLOR,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_COLOR,
    },
  ],
};
