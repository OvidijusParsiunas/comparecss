import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { ButtonGroupOptions } from './buttonGroup/buttonGroupOptions';
import { Options } from '../../../../../../interfaces/options';
import { DropdownOptions } from './dropdown/dropdownOptions';
import { ButtonOptions } from './button/buttonOptions';
import { AlertOptions } from './alert/alertOptions';
import { ModalOptions } from './modal/modalOptions';
import { CardOptions } from './card/cardOptions';

export type ComponentTypeToOptions = {
  [key in COMPONENT_TYPES]?: (subcomponentType: SUBCOMPONENT_TYPES, component: WorkshopComponent) => Options;
};

export const componentTypeToOptions: ComponentTypeToOptions = {
  [COMPONENT_TYPES.BUTTON]: ButtonOptions.get,
  [COMPONENT_TYPES.BUTTON_GROUP]: ButtonGroupOptions.get,
  [COMPONENT_TYPES.ALERT]: AlertOptions.get,
  [COMPONENT_TYPES.MODAL]: ModalOptions.get,
  [COMPONENT_TYPES.CARD]: CardOptions.get,
  [COMPONENT_TYPES.DROPDOWN]: DropdownOptions.get,
};
