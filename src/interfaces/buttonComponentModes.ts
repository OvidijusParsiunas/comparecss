import { SpecificComponentModes } from './specificComponentModes';
import { COMPONENT_MODES } from '../consts/componentModes.enum';
import { ComponentModes } from './componentModes';

type keys = 'default' | 'hover' | 'click';

const buttonComponentModes: ComponentModes = {
  default: COMPONENT_MODES.DEFAULT,
  hover: COMPONENT_MODES.HOVER,
  click: COMPONENT_MODES.CLICK,
}

export default buttonComponentModes as SpecificComponentModes<keys>;
