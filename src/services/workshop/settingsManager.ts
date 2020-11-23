import { WorkshopComponent, SubcomponentProperties } from '../../interfaces/workshopComponent';
import { NEW_COMPONENT_TYPES } from '../../consts/newComponentTypes.enum';
import { SUB_COMPONENT_CSS_MODES } from '../../consts/subcomponentCssModes.enum';
import ComponentJs from './componentJs';

export default class SettingsManager {

  private static resetJs(subcomponentProperties: SubcomponentProperties, type: NEW_COMPONENT_TYPES): void {
    const classesToBeRemoved = [ ...subcomponentProperties.jsClasses ].filter((jsClass) => !subcomponentProperties.initialJsClasses.has(jsClass));
    const classesToBeAdded = [ ...subcomponentProperties.jsClasses ].filter((jsClass) => !subcomponentProperties.jsClasses.has(jsClass));
    ComponentJs.manipulateJSClasses(classesToBeRemoved, type, 'remove');
    ComponentJs.manipulateJSClasses(classesToBeAdded, type, 'add');
    subcomponentProperties.jsClasses = new Set(subcomponentProperties.initialJsClasses);
  }

  private static resetCss(subcomponentProperties: SubcomponentProperties, activeMode: SUB_COMPONENT_CSS_MODES): void {
    subcomponentProperties.customCss[activeMode] = { ...subcomponentProperties.initialCss[activeMode] };
  }

  static resetComponentProperties(component: WorkshopComponent, activeMode: SUB_COMPONENT_CSS_MODES): void {
    const { type, subcomponents, subcomponentsActiveMode } = component;
    this.resetCss(subcomponents[subcomponentsActiveMode], activeMode);
    this.resetJs(subcomponents[subcomponentsActiveMode], type);
  }
}
  