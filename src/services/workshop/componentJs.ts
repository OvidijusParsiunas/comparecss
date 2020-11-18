import { NEW_COMPONENT_TYPES } from '../../consts/newComponentTypes.enum';
import { componentTypeToJavascriptClasses } from '../../components/content/workshop/toolbar/settings/javascript/componentTypeToJavascriptClasses';
import { javascriptClassesToCode } from '../../components/content/workshop/toolbar/settings/javascript/javascriptClassToCode';
import { JAVASCRIPT_CLASSES } from '../../consts/javascriptClasses.enum';

export default class ComponentJs {

  static manipulateJSClasses(jsClasses: JAVASCRIPT_CLASSES[], componentType: NEW_COMPONENT_TYPES, classManipulationProperty: 'add'|'remove'): void {
    jsClasses.forEach((jsClass) => {
      document.getElementById(componentTypeToJavascriptClasses[componentType].componentId).classList[classManipulationProperty](jsClass);
    });
  }
  
  static manipulateJS(componentType: NEW_COMPONENT_TYPES, jsManipulationProperty: 'revokeJS' | 'executeJS'): void {
    componentTypeToJavascriptClasses[componentType].javascriptClasses.forEach((javascriptClass) => {
      javascriptClassesToCode[javascriptClass][jsManipulationProperty]();
    });
  }
}
