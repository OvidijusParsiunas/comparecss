import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../consts/workshopToolbarOptions';
import { NEW_COMPONENT_TYPES } from '../../../../../consts/newComponentTypes.enum';
import { ComponentOptions } from '../../../../../interfaces/componentOptions';
import { buttonOptions } from './button';
import { ComponentModes } from '../../../../../interfaces/componentModes';

type ComponentOptionsContainer = {
  [key in WORKSHOP_TOOLBAR_OPTIONS]?: ComponentOptions<keyof ComponentModes>;
}

export default {
  [NEW_COMPONENT_TYPES.BUTTON]: buttonOptions,
} as ComponentOptionsContainer;
