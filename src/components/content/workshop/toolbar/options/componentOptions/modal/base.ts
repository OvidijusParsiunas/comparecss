import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../..//consts/workshopToolbarOptionButtonNames.enum';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { CSS_STATES } from '../../../../../../../consts/subcomponentCssStates.enum';
import { SubcomponentOptions } from '../../../../../../../interfaces/componentOptions';

type ModalBaseOptionsModes = CSS_STATES.DEFAULT;

export const modalBaseOptions: SubcomponentOptions<ModalBaseOptionsModes> = {
  [CSS_STATES.DEFAULT]: [
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BORDER,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.COLOR,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.COLOR,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SHADOW,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.SHADOW,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.SIZE,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE_WIDTH,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.POSITION,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.MODAL_POSITION,
      enabledOnExpandedModalPreviewMode: true,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.BACKDROP,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.BACKDROP,
      enabledOnExpandedModalPreviewMode: true,
    },
    {
      buttonName: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES.TRANSITIONS,
      type: WORKSHOP_TOOLBAR_OPTION_TYPES.TRANSITIONS,
      enabledOnExpandedModalPreviewMode: true,
    },
  ],
};
