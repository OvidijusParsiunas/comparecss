import Border from '../../components/content/workshop/toolbar/settings/border';
import Color from '../../components/content/workshop/toolbar/settings/color';
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../consts/workshopToolbarOptions';

export default class SettingsManager {
  static getSettings(clickedOptionName: WORKSHOP_TOOLBAR_OPTIONS): any {
    switch (clickedOptionName) {
      case WORKSHOP_TOOLBAR_OPTIONS.BORDER:
        return Border;
      case WORKSHOP_TOOLBAR_OPTIONS.COLOR:
        return Color;
      default:
        return 'placeholder'
    }
  }
}
  