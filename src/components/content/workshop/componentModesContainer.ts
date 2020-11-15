import buttonComponentModes from '../../../interfaces/buttonComponentModes';
import { NEW_COMPONENT_TYPES } from '../../../consts/newComponentTypes.enum';
import { ComponentModes } from '../../../interfaces/componentModes'

type ComponentModesContainer = {
  [key in NEW_COMPONENT_TYPES]?: ComponentModes;
}

export default {
  [NEW_COMPONENT_TYPES.BUTTON]: buttonComponentModes,
} as ComponentModesContainer;
