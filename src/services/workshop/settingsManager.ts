import Border from '../../components/content/workshop/toolbar/settings/border';
import Color from '../../components/content/workshop/toolbar/settings/color';
import Shadow from '../../components/content/workshop/toolbar/settings/shadow';
import Size from '../../components/content/workshop/toolbar/settings/size';
import Padding from '../../components/content/workshop/toolbar/settings/padding';
import Margin from '../../components/content/workshop/toolbar/settings/margin';
import Text from '../../components/content/workshop/toolbar/settings/text';
import Design from '../../components/content/workshop/toolbar/settings/design';
import { NEW_COMPONENT_TYPES } from '../../consts/newComponentTypes.enum';
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../consts/workshopToolbarOptions';
import { BUTTON_COMPONENT_MODES } from '../../consts/buttonComponentModes.enum';
import { WorkshopComponent, ComponentProperties } from '../../interfaces/workshopComponent';
import ComponentJs from './componentJs';

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

  private static resetJs(componentProperties: ComponentProperties, type: NEW_COMPONENT_TYPES): void {
    const classesToBeRemoved = componentProperties.jsClasses.filter((jsClass) => !componentProperties.initialJsClasses.includes(jsClass));
    const classesToBeAdded = componentProperties.initialJsClasses.filter((jsClass) => !componentProperties.jsClasses.includes(jsClass));
    ComponentJs.manipulateJSClasses(classesToBeRemoved, type, 'remove');
    ComponentJs.manipulateJSClasses(classesToBeAdded, type, 'add');
    componentProperties.jsClasses = [ ...componentProperties.initialJsClasses ];
  }

  private static resetCss(componentProperties: ComponentProperties, activeMode: BUTTON_COMPONENT_MODES): void {
    componentProperties.customCss[activeMode] = { ...componentProperties.initialCss[activeMode] };
  }

  static resetComponentProperties(component: WorkshopComponent, activeMode: BUTTON_COMPONENT_MODES): void {
    const { type, componentProperties } = component;
    this.resetCss(componentProperties, activeMode);
    this.resetJs(componentProperties, type);
  }
}
  