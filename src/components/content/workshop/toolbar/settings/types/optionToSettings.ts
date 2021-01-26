import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../consts/workshopToolbarOptionTypes.enum';
import border from './border';
import borderBottom from './borderBottom';
import borderTop from './borderTop';
import color from './color';
import shadow from './shadow';
import shadowVertical from './shadowVertical';
import size from './size';
import sizeWidth from './sizeWidth';
import sizeHeight from './sizeHeight';
import padding from './padding';
import margin from './margin';
import textDefault from './text-default';
import textWthAlign from './text-wth-align';
import textIcon from './textBasedIcon';
import design from './design';
import background from './background';

type OptionToSettings = {
  [key in WORKSHOP_TOOLBAR_OPTION_TYPES]?: any;
}

export const optionToSettings: OptionToSettings = {
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER]: border,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER_BOTTOM]: borderBottom,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER_TOP]: borderTop,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.COLOR]: color,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SHADOW]: shadow,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SHADOW_VERTICAL]: shadowVertical,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE]: size,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE_WIDTH]: sizeWidth,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE_HEIGHT]: sizeHeight,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.PADDING]: padding,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.MARGIN]: margin,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_DEFAULT]: textDefault,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_WTH_ALIGN]: textWthAlign,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_BASED_ICON]: textIcon,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.DESIGN]: design,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BACKGROUND]: background,
};
