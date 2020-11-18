import { ComponentJavascriptClasses } from '../../../../../interfaces/componentJavascriptClasses';
import { NEW_COMPONENT_TYPES } from '../../../../../consts/newComponentTypes.enum'
import { buttonJavascriptClasses } from './buttonJavascript';

type JavascriptContainer = {
  [key in NEW_COMPONENT_TYPES]?: {
    javascriptClasses: ComponentJavascriptClasses,
    componentId: string,
  };
}

export const javascriptContainer: JavascriptContainer = {
  [NEW_COMPONENT_TYPES.BUTTON]: {
    javascriptClasses: buttonJavascriptClasses,
    componentId: 'demoComponent',
  },
};
