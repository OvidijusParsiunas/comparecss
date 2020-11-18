import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../../consts/workshopToolbarOptions';
import Border from './border';
import Color from './color';
import Shadow from './shadow';
import Size from './size';
import Padding from './padding';
import Margin from './margin';
import Text from './text';
import Design from './design';

type OptionToSettings = {
  [key in WORKSHOP_TOOLBAR_OPTIONS]?: any;
}

export const optionToSettings: OptionToSettings = {
  [WORKSHOP_TOOLBAR_OPTIONS.BORDER]: Border,
  [WORKSHOP_TOOLBAR_OPTIONS.COLOR]: Color,
  [WORKSHOP_TOOLBAR_OPTIONS.SHADOW]: Shadow,
  [WORKSHOP_TOOLBAR_OPTIONS.SIZE]: Size,
  [WORKSHOP_TOOLBAR_OPTIONS.PADDING]: Padding,
  [WORKSHOP_TOOLBAR_OPTIONS.MARGIN]: Margin,
  [WORKSHOP_TOOLBAR_OPTIONS.TEXT]: Text,
  [WORKSHOP_TOOLBAR_OPTIONS.DESIGN]: Design,
};
