import { NEW_COMPONENT_TYPES } from '../../consts/newComponentTypes.enum';
import { WorkshopComponent, ComponentProperties } from '../../interfaces/workshopComponent';
import { COMPONENT_MODES } from '../../consts/componentModes.enum';
import ComponentJs from './componentJs';

export default class SettingsManager {

  private static resetJs(componentProperties: ComponentProperties, type: NEW_COMPONENT_TYPES): void {
    const classesToBeRemoved = [ ...componentProperties.jsClasses ].filter((jsClass) => !componentProperties.initialJsClasses.has(jsClass));
    const classesToBeAdded = [ ...componentProperties.jsClasses ].filter((jsClass) => !componentProperties.jsClasses.has(jsClass));
    ComponentJs.manipulateJSClasses(classesToBeRemoved, type, 'remove');
    ComponentJs.manipulateJSClasses(classesToBeAdded, type, 'add');
    componentProperties.jsClasses = new Set(componentProperties.initialJsClasses);
  }

  private static resetCss(componentProperties: ComponentProperties, activeMode: COMPONENT_MODES): void {
    componentProperties.customCss[activeMode] = { ...componentProperties.initialCss[activeMode] };
  }

  static resetComponentProperties(component: WorkshopComponent, activeMode: COMPONENT_MODES): void {
    const { type, componentProperties } = component;
    this.resetCss(componentProperties, activeMode);
    this.resetJs(componentProperties, type);
  }
}
  