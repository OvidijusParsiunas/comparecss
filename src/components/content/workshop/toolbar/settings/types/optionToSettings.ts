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
import background from './background';
import modalPosition from './modalPosition';
import nestedSubcomponentPosition from './nestedSubcomponentPosition';
import nestedSubcomponentMargin from './nestedSubcomponentMargin';
import backdrop from './backdrop';
import textSize from './textSize';
import textColor from './textColor';
import textPosition from './textPosition';
import textPositionNoAlign from './textPositionNoAlign';
import text from './text';
import buttonAnimations from './buttonAnimations';
import modalAnimations from './modalAnimations';
import modalActions from './modalActions';
import alertAnimations from './alertAnimations';
import image from './image';

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
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_COLOR]: textColor,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BACKGROUND]: background,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.MODAL_POSITION]: modalPosition,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_POSITION]: textPosition,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_POSITION_NO_ALIGN]: textPositionNoAlign,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_SIZE]: textSize,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.NESTED_SUBCOMPONENT_POSITION]: nestedSubcomponentPosition,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.NESTED_SUBCOMPONENT_MARGIN]: nestedSubcomponentMargin,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BACKDROP]: backdrop,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BUTTON_ANIMATIONS]: buttonAnimations,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.ALERT_ANIMATIONS]: alertAnimations,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.MODAL_ANIMATIONS]: modalAnimations,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.MODAL_ACTIONS]: modalActions,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.IMAGE]: image,
};
