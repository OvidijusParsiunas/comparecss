import { ComponentStyleToGenerator } from '../../../../../interfaces/componentStyleToGenerator';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum'
import { buttonStyleToGenerator } from './buttons/buttonStyleToGenerator';
import { avatarStyleToGenerator } from './avatar/avatarStyleToGenerator';
import { alertStyleToGenerator } from './alerts/alertStyleToGenerator';
import { modalStyleToGenerator } from './modals/modalStyleToGenerator';
import { layerStyleToGenerator } from './layers/layerStyleToGenerator';
import { cardStyleToGenerator } from './cards/cardStyleToGenerator';
import { textStyleToGenerator } from './text/textStyleToGenerator';

type ComponentTypeToStyleGenerators = {
  [key in COMPONENT_TYPES]: ComponentStyleToGenerator;
}

export const componentTypeToStyleGenerators: ComponentTypeToStyleGenerators = {
  [COMPONENT_TYPES.MODAL]: modalStyleToGenerator,
  [COMPONENT_TYPES.CARD]: cardStyleToGenerator,
  [COMPONENT_TYPES.LAYER]: layerStyleToGenerator,
  [COMPONENT_TYPES.BUTTON]: buttonStyleToGenerator,
  [COMPONENT_TYPES.ALERT]: alertStyleToGenerator,
  [COMPONENT_TYPES.TEXT]: textStyleToGenerator,
  [COMPONENT_TYPES.AVATAR]: avatarStyleToGenerator,
};
