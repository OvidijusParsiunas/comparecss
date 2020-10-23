import Border from '../../components/content/workshop/toolbar/settings/border';
import Color from '../../components/content/workshop/toolbar/settings/color';
import Shadow from '../../components/content/workshop/toolbar/settings/shadow';
import Size from '../../components/content/workshop/toolbar/settings/size';
import Padding from '../../components/content/workshop/toolbar/settings/padding';
import Margin from '../../components/content/workshop/toolbar/settings/margin';
import Text from '../../components/content/workshop/toolbar/settings/text';
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../consts/workshopToolbarOptions';

export default class SettingsManager {
  static getSettings(clickedOptionName: WORKSHOP_TOOLBAR_OPTIONS): any {
    switch (clickedOptionName) {
      case WORKSHOP_TOOLBAR_OPTIONS.BORDER:
        return Border;
      case WORKSHOP_TOOLBAR_OPTIONS.COLOR:
        return Color;
      case WORKSHOP_TOOLBAR_OPTIONS.SHADOW:
        return Shadow;
      case WORKSHOP_TOOLBAR_OPTIONS.SIZE:
        return Size;
      case WORKSHOP_TOOLBAR_OPTIONS.PADDING:
        return Padding;
      case WORKSHOP_TOOLBAR_OPTIONS.MARGIN:
        return Margin;
      case WORKSHOP_TOOLBAR_OPTIONS.TEXT:
        return Text;
      default:
        return 'placeholder'
    }
  }
}
  