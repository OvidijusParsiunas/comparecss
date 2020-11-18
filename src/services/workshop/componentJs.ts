import { NEW_COMPONENT_TYPES } from '../../consts/newComponentTypes.enum';
import { javascriptContainer } from '../../components/content/workshop/toolbar/javascript/javascriptContainer';
import { javascriptClassesToCode } from '../../components/content/workshop/toolbar/javascript/javascriptClassToCode';
import { JAVASCRIPT_CLASSES } from '../../consts/javascriptClasses.enum';

export default class ComponentJs {

  static manipulateJSClasses(jsClasses: JAVASCRIPT_CLASSES[], componentType: NEW_COMPONENT_TYPES, classManipulationProperty: 'add'|'remove'): void {
    jsClasses.forEach((jsClass) => {
      document.getElementById(javascriptContainer[componentType].componentId).classList[classManipulationProperty](jsClass);
    });
  }
  
  static manipulateJS(componentType: NEW_COMPONENT_TYPES, jsManipulationProperty: 'revokeJS' | 'executeJS'): void {
    javascriptContainer[componentType].javascriptClasses.forEach((javascriptClass) => {
      javascriptClassesToCode[javascriptClass][jsManipulationProperty]();
    });
  }
}
