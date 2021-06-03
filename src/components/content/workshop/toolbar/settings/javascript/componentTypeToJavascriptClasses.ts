import { ComponentJavascriptClasses } from '../../../../../../interfaces/componentJavascriptClasses';
import { NEW_COMPONENT_TYPES } from '../../../../../../consts/newComponentTypes.enum'
import { JAVASCRIPT_CLASSES } from '../../../../../../consts/javascriptClasses.enum';

type ComponentTypeToJavascriptClasses = {
  [key in NEW_COMPONENT_TYPES]?: ComponentJavascriptClasses;
}

export const componentTypeToJavascriptClasses: ComponentTypeToJavascriptClasses = {
  [NEW_COMPONENT_TYPES.BUTTON]: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
  [NEW_COMPONENT_TYPES.ALERT]: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
  [NEW_COMPONENT_TYPES.MODAL]: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
  [NEW_COMPONENT_TYPES.CARD]: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
};
