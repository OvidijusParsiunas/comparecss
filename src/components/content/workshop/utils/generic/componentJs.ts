import { javascriptInitializerClassesToCode } from '../../toolbar/settings/javascript/javascriptInitializerClassesToCode';
import { componentTypeToJavascriptClasses } from '../../toolbar/settings/javascript/componentTypeToJavascriptClasses';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';

export default class ComponentJs {
  
  public static manipulateJSClasses(componentType: COMPONENT_TYPES, jsManipulationProperty: 'initializeJS' | 'revokeJS'): void {
    if (!componentTypeToJavascriptClasses[componentType]) return;
    componentTypeToJavascriptClasses[componentType].forEach((javascriptClass) => {
      javascriptInitializerClassesToCode[javascriptClass][jsManipulationProperty]();
    });
  }
}
