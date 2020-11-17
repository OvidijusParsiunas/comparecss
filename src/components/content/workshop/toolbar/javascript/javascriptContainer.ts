import { NEW_COMPONENT_TYPES } from '../../../../../consts/newComponentTypes.enum'
import { buttonJavascript } from './buttonJavascript';

type JavaScriptContainer = {
  [key in NEW_COMPONENT_TYPES]?: {
    content: any[], componentId: string,
  };
}

export const javaScriptContainer: JavaScriptContainer = {
  [NEW_COMPONENT_TYPES.BUTTON]: {
    content: buttonJavascript,
    componentId: 'demoComponent',
  },
};
