import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { Options } from '../../../../../../interfaces/options';
import { ButtonOptions } from './button/buttonOptions';
import { AlertOptions } from './alert/alertOptions';
import { ModalOptions } from './modal/modalOptions';
import { CardOptions } from './card/cardOptions';

export type ComponentTypeToOptions = {
  [key in COMPONENT_TYPES]?: (subcomponentType: SUBCOMPONENT_TYPES, component: WorkshopComponent) => Options;
}

export const componentTypeToOptions: ComponentTypeToOptions = {
  [COMPONENT_TYPES.BUTTON]: ButtonOptions.getButtonOptions,
  [COMPONENT_TYPES.ALERT]: AlertOptions.getAlertOptions,
  [COMPONENT_TYPES.MODAL]: ModalOptions.getModalOptions,
  [COMPONENT_TYPES.CARD]: CardOptions.getCardOptions,
};
