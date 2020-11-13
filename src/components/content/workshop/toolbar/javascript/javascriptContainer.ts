import { NEW_COMPONENT_TYPES } from '../../../../../consts/newComponentTypes.enum'
import buttonJavascript from './buttonJavascript';

type JavaScriptContainer = {
  [key in NEW_COMPONENT_TYPES]?: {
    content: any[], componentId: string,
  };
}

export default {
  [NEW_COMPONENT_TYPES.BUTTON]: {
    content: buttonJavascript,
    componentId: 'demoComponent',
  }
} as JavaScriptContainer;
