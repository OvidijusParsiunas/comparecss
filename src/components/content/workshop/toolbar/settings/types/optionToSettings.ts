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
import font from './font';
import textIcon from './textBasedIcon';
import design from './design';
import background from './background';
import modalPosition from './modalPosition';
import nestedSubcomponentPosition from './nestedSubcomponentPosition';
import nestedSubcomponentMargin from './nestedSubcomponentMargin';
import transitions from './transitions';
import backdrop from './backdrop';
import textSize from './textSize';
import textPosition from './textPosition';
import textPositionNoAlign from './textPositionNoAlign';
import text from './text';

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
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT]: text,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_FONT]: font,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_BASED_ICON]: textIcon,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.DESIGN]: design,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BACKGROUND]: background,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.MODAL_POSITION]: modalPosition,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_POSITION]: textPosition,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_POSITION_NO_ALIGN]: textPositionNoAlign,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_SIZE]: textSize,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.NESTED_SUBCOMPONENT_POSITION]: nestedSubcomponentPosition,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.NESTED_SUBCOMPONENT_MARGIN]: nestedSubcomponentMargin,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TRANSITIONS]: transitions,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BACKDROP]: backdrop,
};
