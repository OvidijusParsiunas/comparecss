import { componentTypeToJavascriptClasses } from '../../toolbar/settings/javascript/componentTypeToJavascriptClasses';
import { javascriptClassesToCode } from '../../toolbar/settings/javascript/javascriptClassToCode';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';

export default class ComponentJs {
  
  public static manipulateJSClasses(componentType: COMPONENT_TYPES, jsManipulationProperty: 'initializeJS' | 'revokeJS'): void {
    if (!componentTypeToJavascriptClasses[componentType]) return;
    componentTypeToJavascriptClasses[componentType].forEach((javascriptClass) => {
      javascriptClassesToCode[javascriptClass][jsManipulationProperty]();
    });
  }
}
