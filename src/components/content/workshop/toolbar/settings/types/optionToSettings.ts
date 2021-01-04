import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../../consts/workshopToolbarOptions';
import border from './border';
import color from './color';
import shadow from './shadow';
import size from './size';
import padding from './padding';
import margin from './margin';
import text_default from './text-default';
import text_wth_align from './text-wth-align';
import textIcon from './textBasedIcon';
import design from './design';
import background from './background';

type OptionToSettings = {
  [key in WORKSHOP_TOOLBAR_OPTIONS]?: any;
}

export const optionToSettings: OptionToSettings = {
  [WORKSHOP_TOOLBAR_OPTIONS.BORDER]: border,
  [WORKSHOP_TOOLBAR_OPTIONS.COLOR]: color,
  [WORKSHOP_TOOLBAR_OPTIONS.SHADOW]: shadow,
  [WORKSHOP_TOOLBAR_OPTIONS.SIZE]: size,
  [WORKSHOP_TOOLBAR_OPTIONS.PADDING]: padding,
  [WORKSHOP_TOOLBAR_OPTIONS.MARGIN]: margin,
  [WORKSHOP_TOOLBAR_OPTIONS.TEXT_DEFAULT]: text_default,
  [WORKSHOP_TOOLBAR_OPTIONS.TEXT_WTH_ALIGN]: text_wth_align,
  [WORKSHOP_TOOLBAR_OPTIONS.TEXT_BASED_ICON]: textIcon,
  [WORKSHOP_TOOLBAR_OPTIONS.DESIGN]: design,
  [WORKSHOP_TOOLBAR_OPTIONS.BACKGROUND]: background,
};
