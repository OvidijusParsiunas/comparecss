import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../consts/workshopToolbarOptionTypes.enum';
import nestedComponentPositionNoAlign from './nestedComponentPositionNoAlign';
import nestedComponentPosition from './nestedComponentPosition';
import backgroundColorImage from './backgroundColorImage';
import buttonAnimations from './buttonAnimations';
import dropdownPosition from './dropdownPosition';
import modalAnimations from './modalAnimations';
import imageAnimations from './imageAnimations';
import backgroundColor from './backgroundColor';
import backgroundImage from './backgroundImage';
import closeAnimation from './closeAnimation';
import shadowVertical from './shadowVertical';
import sizeWidthAuto from './sizeWidthAuto';
import modalPosition from './modalPosition';
import layerPosition from './layerPosition';
import borderBottom from './borderBottom';
import circleBorder from './circleBorder';
import modalActions from './modalActions';
import sizeHeight from './sizeHeight';
import borderTop from './borderTop';
import sizeWidth from './sizeWidth';
import textColor from './textColor';
import backdrop from './backdrop';
import textSize from './textSize';
import padding from './padding';
import border from './border';
import shadow from './shadow';
import margin from './margin';
import size from './size';
import font from './font';
import text from './text';

type OptionToSettings = {
  [key in WORKSHOP_TOOLBAR_OPTION_TYPES]?: any;
}

export const optionToSettings: OptionToSettings = {
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER]: border,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER_BOTTOM]: borderBottom,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER_TOP]: borderTop,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.CIRCLE_BORDER]: circleBorder,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SHADOW]: shadow,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SHADOW_VERTICAL]: shadowVertical,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE]: size,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE_WIDTH]: sizeWidth,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE_WIDTH_AUTO]: sizeWidthAuto,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE_HEIGHT]: sizeHeight,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.PADDING]: padding,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.MARGIN]: margin,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT]: text,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_FONT]: font,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_COLOR]: textColor,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BACKGROUND_COLOR]: backgroundColor,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BACKGROUND_IMAGE]: backgroundImage,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BACKGROUND_COLOR_IMAGE]: backgroundColorImage,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.MODAL_POSITION]: modalPosition,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.NESTED_COMPONENT_POSITION_NO_ALIGN]: nestedComponentPositionNoAlign,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_SIZE]: textSize,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.NESTED_COMPONENT_POSITION]: nestedComponentPosition,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BACKDROP]: backdrop,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BUTTON_ANIMATIONS]: buttonAnimations,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.IMAGE_ANIMATIONS]: imageAnimations,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.MODAL_ANIMATIONS]: modalAnimations,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.CLOSE_ANIMATION]: closeAnimation,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.MODAL_ACTIONS]: modalActions,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.LAYER_POSITION]: layerPosition,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.DROPDOWN_POSITIONS]: dropdownPosition,
};
