import { javascriptInitializerClassesToCode } from './maps/javascriptInitializerClassesToCode';
import { componentTypeToJavascriptClasses } from './maps/componentTypeToJavascriptClasses';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';

export default class ComponentJs {
  
  public static manipulateJSClasses(componentType: COMPONENT_TYPES, jsManipulationProperty: 'initializeJS' | 'revokeJS'): void {
    if (!componentTypeToJavascriptClasses[componentType]) return;
    componentTypeToJavascriptClasses[componentType].forEach((javascriptClass) => {
      javascriptInitializerClassesToCode[javascriptClass][jsManipulationProperty]();
    });
  }
}
