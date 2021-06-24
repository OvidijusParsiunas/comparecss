import { componentTypeToJavascriptClasses } from '../../components/content/workshop/toolbar/settings/javascript/componentTypeToJavascriptClasses';
import { javascriptClassesToCode } from '../../components/content/workshop/toolbar/settings/javascript/javascriptClassToCode';
import { COMPONENT_TYPES } from '../../consts/componentTypes.enum';

export default class ComponentJs {
  
  static manipulateJS(componentType: COMPONENT_TYPES, jsManipulationProperty: 'revokeJS' | 'executeJS'): void {
    if (!componentTypeToJavascriptClasses[componentType]) return;
    componentTypeToJavascriptClasses[componentType].forEach((javascriptClass) => {
      javascriptClassesToCode[javascriptClass][jsManipulationProperty]();
    });
  }
}
