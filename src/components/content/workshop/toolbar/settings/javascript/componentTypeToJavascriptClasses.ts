import { ComponentJavascriptClasses } from '../../../../../../interfaces/componentJavascriptClasses';
import { NEW_COMPONENT_TYPES } from '../../../../../../consts/newComponentTypes.enum'
import { buttonJavascriptClasses } from './componentsClasses/button';

type ComponentTypeToJavascriptClasses = {
  [key in NEW_COMPONENT_TYPES]?: ComponentJavascriptClasses;
}

export const componentTypeToJavascriptClasses: ComponentTypeToJavascriptClasses = {
  [NEW_COMPONENT_TYPES.BUTTON]: buttonJavascriptClasses,
  [NEW_COMPONENT_TYPES.ALERT]: buttonJavascriptClasses,
};
