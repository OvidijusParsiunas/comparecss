import { SpecificComponentModes } from './specificComponentModes';
import { COMPONENT_MODES } from '../consts/componentModes.enum';
import { ComponentModes } from './componentModes';

type keys = COMPONENT_MODES.DEFAULT | COMPONENT_MODES.HOVER | COMPONENT_MODES.CLICK;

const buttonComponentModes: ComponentModes = {
  [COMPONENT_MODES.DEFAULT]: COMPONENT_MODES.DEFAULT,
  [COMPONENT_MODES.HOVER]: COMPONENT_MODES.HOVER,
  [COMPONENT_MODES.CLICK]: COMPONENT_MODES.CLICK,
}

export default buttonComponentModes as SpecificComponentModes<keys>;
