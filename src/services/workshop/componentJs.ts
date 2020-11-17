import { NEW_COMPONENT_TYPES } from '../../consts/newComponentTypes.enum';
import { BUTTON_JAVASCRIPT_CLASSES } from '../../components/content/workshop/toolbar/javascript/buttonJavaScriptClasses.enum';
import { javaScriptContainer } from '../../components/content/workshop/toolbar/javascript/javascriptContainer';

export default class ComponentJs {

  static manipulateJSClasses(jsClasses: BUTTON_JAVASCRIPT_CLASSES[], componentType: NEW_COMPONENT_TYPES, classManipulationProperty: 'add'|'remove'): void {
    jsClasses.forEach((jsClass) => {
      document.getElementById(javaScriptContainer[componentType].componentId).classList[classManipulationProperty](jsClass);
    });
  }
  
  static manipulateJS(componentType: NEW_COMPONENT_TYPES, jsManipulationProperty: 'revokeJS' | 'executeJS'): void {
    javaScriptContainer[componentType].content.forEach((javascript) => {
      javascript.code[jsManipulationProperty]();
    });
  }
}
