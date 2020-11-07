import Border from '../../components/content/workshop/toolbar/settings/border';
import Color from '../../components/content/workshop/toolbar/settings/color';
import Shadow from '../../components/content/workshop/toolbar/settings/shadow';
import Size from '../../components/content/workshop/toolbar/settings/size';
import Padding from '../../components/content/workshop/toolbar/settings/padding';
import Margin from '../../components/content/workshop/toolbar/settings/margin';
import Text from '../../components/content/workshop/toolbar/settings/text';
import Design from '../../components/content/workshop/toolbar/settings/design';
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../consts/workshopToolbarOptions';
import { BUTTON_COMPONENT_MODES } from '../../consts/buttonComponentModes.enum';
import { ComponentProperties } from '../../interfaces/workshopComponent';

export default class SettingsManager {
  
  // should be refactored into a container
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
      case WORKSHOP_TOOLBAR_OPTIONS.DESIGN:
        return Design;
      default:
        return 'placeholder'
    }
  }

  static resetComponentProperties(componentProperties: ComponentProperties, activeMode: BUTTON_COMPONENT_MODES): any {
    componentProperties.customCss[activeMode] = { ...componentProperties.initialCss[activeMode] };
  }
}
  