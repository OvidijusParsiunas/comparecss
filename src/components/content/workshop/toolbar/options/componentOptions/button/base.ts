import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum';
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../../../consts/workshopToolbarOptions';
import { ComponentOptions } from '../../../../../../../interfaces/componentOptions';

type ButtonOptionsModes = SUB_COMPONENT_CSS_MODES.DEFAULT | SUB_COMPONENT_CSS_MODES.HOVER | SUB_COMPONENT_CSS_MODES.CLICK;

export const buttonBaseOptions: ComponentOptions<ButtonOptionsModes> = {
  [SUB_COMPONENT_CSS_MODES.DEFAULT]: [
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
      identifier: WORKSHOP_TOOLBAR_OPTIONS.TEXT_DEFAULT,
    },
  ],
  [SUB_COMPONENT_CSS_MODES.HOVER]: [
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
      identifier: WORKSHOP_TOOLBAR_OPTIONS.TEXT_DEFAULT,
    },
  ],
  [SUB_COMPONENT_CSS_MODES.CLICK]: [
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
      identifier: WORKSHOP_TOOLBAR_OPTIONS.TEXT_DEFAULT,
    },
    {
      buttonName: 'Design',
      identifier: WORKSHOP_TOOLBAR_OPTIONS.DESIGN,
    },
  ],
};
