import { ComponentJavascriptClasses } from '../../../../../../../interfaces/componentJavascriptClasses';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum'

type ComponentTypeToJavascriptClasses = {
  [key in COMPONENT_TYPES]?: ComponentJavascriptClasses;
};

export const componentTypeToJavascriptClasses: ComponentTypeToJavascriptClasses = {
  [COMPONENT_TYPES.DROPDOWN]: new Set([JAVASCRIPT_CLASSES.RIPPLES, JAVASCRIPT_CLASSES.DROPDOWN_BUTTON]),
  [COMPONENT_TYPES.BUTTON]: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
  [COMPONENT_TYPES.BUTTON_GROUP]: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
  [COMPONENT_TYPES.ALERT]: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
  [COMPONENT_TYPES.MODAL]: new Set([JAVASCRIPT_CLASSES.RIPPLES]),
  // WORK 2 - JAVASCRIPT_CLASSES.DROPDOWN_BUTTON may need to be removed from Card
  [COMPONENT_TYPES.CARD]: new Set([JAVASCRIPT_CLASSES.RIPPLES, JAVASCRIPT_CLASSES.DROPDOWN_BUTTON]),
};
