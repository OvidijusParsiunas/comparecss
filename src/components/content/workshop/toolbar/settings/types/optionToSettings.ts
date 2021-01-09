import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../../consts/workshopToolbarOptions';
import border from './border';
import borderBottom from './borderBottom';
import borderTop from './borderTop';
import color from './color';
import shadow from './shadow';
import shadowVertical from './shadowVertical';
import size from './size';
import sizeHeight from './sizeHeight';
import padding from './padding';
import margin from './margin';
import textDefault from './text-default';
import textWthAlign from './text-wth-align';
import textIcon from './textBasedIcon';
import design from './design';
import background from './background';

type OptionToSettings = {
  [key in WORKSHOP_TOOLBAR_OPTIONS]?: any;
}

export const optionToSettings: OptionToSettings = {
  [WORKSHOP_TOOLBAR_OPTIONS.BORDER]: border,
  [WORKSHOP_TOOLBAR_OPTIONS.BORDER_BOTTOM]: borderBottom,
  [WORKSHOP_TOOLBAR_OPTIONS.BORDER_TOP]: borderTop,
  [WORKSHOP_TOOLBAR_OPTIONS.COLOR]: color,
  [WORKSHOP_TOOLBAR_OPTIONS.SHADOW]: shadow,
  [WORKSHOP_TOOLBAR_OPTIONS.SHADOW_VERTICAL]: shadowVertical,
  [WORKSHOP_TOOLBAR_OPTIONS.SIZE]: size,
  [WORKSHOP_TOOLBAR_OPTIONS.SIZE_HEIGHT]: sizeHeight,
  [WORKSHOP_TOOLBAR_OPTIONS.PADDING]: padding,
  [WORKSHOP_TOOLBAR_OPTIONS.MARGIN]: margin,
  [WORKSHOP_TOOLBAR_OPTIONS.TEXT_DEFAULT]: textDefault,
  [WORKSHOP_TOOLBAR_OPTIONS.TEXT_WTH_ALIGN]: textWthAlign,
  [WORKSHOP_TOOLBAR_OPTIONS.TEXT_BASED_ICON]: textIcon,
  [WORKSHOP_TOOLBAR_OPTIONS.DESIGN]: design,
  [WORKSHOP_TOOLBAR_OPTIONS.BACKGROUND]: background,
};
