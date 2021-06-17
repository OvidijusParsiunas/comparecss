import { ComponentStyleToGenerator } from '../../../../../interfaces/componentStyleToGenerator';
import { NEW_COMPONENT_TYPES } from '../../../../../consts/newComponentTypes.enum'
import { buttonStyleToGenerator } from './buttons/buttonStyleToGenerator';
import { alertStyleToGenerator } from './alerts/alertStyleToGenerator';
import { modalStyleToGenerator } from './modals/modalStyleToGenerator';
import { cardStyleToGenerator } from './cards/cardStyleToGenerator';
import { textStyleToGenerator } from './text/textStyleToGenerator';

type ComponentTypeToStyles = {
  [key in NEW_COMPONENT_TYPES]: ComponentStyleToGenerator;
}

export const componentTypeToStyles: ComponentTypeToStyles = {
  [NEW_COMPONENT_TYPES.BUTTON]: buttonStyleToGenerator,
  [NEW_COMPONENT_TYPES.ALERT]: alertStyleToGenerator,
  [NEW_COMPONENT_TYPES.MODAL]: modalStyleToGenerator,
  [NEW_COMPONENT_TYPES.CARD]: cardStyleToGenerator,
  [NEW_COMPONENT_TYPES.TEXT]: textStyleToGenerator,
};
