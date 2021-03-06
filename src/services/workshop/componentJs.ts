import { componentTypeToJavascriptClasses } from '../../components/content/workshop/toolbar/settings/javascript/componentTypeToJavascriptClasses';
import { javascriptClassesToCode } from '../../components/content/workshop/toolbar/settings/javascript/javascriptClassToCode';
import { NEW_COMPONENT_TYPES } from '../../consts/newComponentTypes.enum';

export default class ComponentJs {
  
  static manipulateJS(componentType: NEW_COMPONENT_TYPES, jsManipulationProperty: 'revokeJS' | 'executeJS'): void {
    if (!componentTypeToJavascriptClasses[componentType]) return;
    componentTypeToJavascriptClasses[componentType].forEach((javascriptClass) => {
      javascriptClassesToCode[javascriptClass][jsManipulationProperty]();
    });
  }
}
