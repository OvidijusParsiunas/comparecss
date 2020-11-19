import { ComponentJavascriptClasses } from '../../../../../../interfaces/componentJavascriptClasses';
import { NEW_COMPONENT_TYPES } from '../../../../../../consts/newComponentTypes.enum'
import { buttonJavascriptClasses } from './componentsClasses/button';

type ComponentTypeToJavascriptClasses = {
  [key in NEW_COMPONENT_TYPES]: {
    javascriptClasses: ComponentJavascriptClasses,
    componentId: string,
  };
}

// may need to make the javascript for certain components optional
export const componentTypeToJavascriptClasses: ComponentTypeToJavascriptClasses = {
  [NEW_COMPONENT_TYPES.BUTTON]: {
    javascriptClasses: buttonJavascriptClasses,
    componentId: 'demoComponent',
  },
  [NEW_COMPONENT_TYPES.ALERT]: {
    javascriptClasses: buttonJavascriptClasses,
    componentId: 'demoComponent',
  },
};
