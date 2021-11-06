import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../consts/workshopToolbarOptionTypes.enum';
import childComponentPositionVerticalOffset from './childComponentPositionVerticalOffset';
import childComponentPositionNoAlign from './childComponentPositionNoAlign';
import dropdownButtonPosition from './dropdownButtonPosition';
import childComponentPosition from './childComponentPosition';
import backgroundColorImage from './backgroundColorImage';
import dropdownMenuPosition from './dropdownMenuPosition';
import selectDropdownButtonSize from './dropdownButtonSize';
import dropdownButtonText from './dropdownButtonText';
import sizeWidthSizeName from './sizeWidthSizeName';
import buttonAnimations from './buttonAnimations';
import marginHorizontal from './marginHorizontal';
import modalAnimations from './modalAnimations';
import imageAnimations from './imageAnimations';
import backgroundColor from './backgroundColor';
import backgroundImage from './backgroundImage';
import paddingVertical from './paddingVertical';
import selectDropdown from './selectDropdown';
import closeAnimation from './closeAnimation';
import shadowVertical from './shadowVertical';
import modalPosition from './modalPosition';
import layerPosition from './layerPosition';
import fadeAnimation from './fadeAnimation';
import borderBottom from './borderBottom';
import circleBorder from './circleBorder';
import modalActions from './modalActions';
import borderRight from './borderRight';
import borderLeft from './borderLeft';
import sizeHeight from './sizeHeight';
import borderTop from './borderTop';
import sizeWidth from './sizeWidth';
import minWidth from './minWidth';
import backdrop from './backdrop';
import textSize from './textSize';
import padding from './padding';
import border from './border';
import shadow from './shadow';
import margin from './margin';
import color from './color';
import size from './size';
import font from './font';
import text from './text';
import icon from './icon';

type OptionToSettings = {
  [key in WORKSHOP_TOOLBAR_OPTION_TYPES]?: any;
}

export const optionToSettings: OptionToSettings = {
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER]: border,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER_BOTTOM]: borderBottom,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER_TOP]: borderTop,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER_LEFT]: borderLeft,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BORDER_RIGHT]: borderRight,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.CIRCLE_BORDER]: circleBorder,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SHADOW]: shadow,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SHADOW_VERTICAL]: shadowVertical,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE]: size,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE_WIDTH]: sizeWidth,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE_WIDTH_SIZE_NAME]: sizeWidthSizeName,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.MIN_WIDTH]: minWidth,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE_HEIGHT]: sizeHeight,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.PADDING]: padding,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.PADDING_VERTICAL]: paddingVertical,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.MARGIN]: margin,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.MARGIN_HORIZONTAL]: marginHorizontal,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT]: text,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_FONT]: font,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.COLOR]: color,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BACKGROUND_COLOR]: backgroundColor,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BACKGROUND_IMAGE]: backgroundImage,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BACKGROUND_COLOR_IMAGE]: backgroundColorImage,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.MODAL_POSITION]: modalPosition,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.TEXT_SIZE]: textSize,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.CHILD_COMPONENT_POSITION]: childComponentPosition,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.CHILD_COMPONENT_POSITION_VERTICAL_OFFSET]: childComponentPositionVerticalOffset,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.CHILD_COMPONENT_POSITION_NO_ALIGN]: childComponentPositionNoAlign,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BACKDROP]: backdrop,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.BUTTON_ANIMATIONS]: buttonAnimations,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.IMAGE_ANIMATIONS]: imageAnimations,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.MODAL_ANIMATIONS]: modalAnimations,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.CLOSE_ANIMATION]: closeAnimation,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.MODAL_ACTIONS]: modalActions,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.LAYER_POSITION]: layerPosition,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.DROPDOWN_MENU_POSITION]: dropdownMenuPosition,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.DROPDOWN_BUTTON_POSITION]: dropdownButtonPosition,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.FADE_ANIMATION]: fadeAnimation,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SELECT_DROPDOWN]: selectDropdown,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.SELECT_DROPDOWN_BUTTON_SIZE]: selectDropdownButtonSize,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.DROPDOWN_BUTTON_TEXT]: dropdownButtonText,
  [WORKSHOP_TOOLBAR_OPTION_TYPES.ICON]: icon,
};
