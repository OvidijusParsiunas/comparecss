import { ComponentStyleToGenerator } from '../../../../../interfaces/componentStyleToGenerator';
import { NEW_COMPONENT_TYPES } from '../../../../../consts/newComponentTypes.enum'
import { buttonStyleToGenerator } from './buttons/buttonStyleToGenerator';
import { avatarStyleToGenerator } from './avatar/avatarStyleToGenerator';
import { alertStyleToGenerator } from './alerts/alertStyleToGenerator';
import { modalStyleToGenerator } from './modals/modalStyleToGenerator';
import { layerStyleToGenerator } from './layers/layerStyleToGenerator';
import { cardStyleToGenerator } from './cards/cardStyleToGenerator';
import { textStyleToGenerator } from './text/textStyleToGenerator';

type ComponentTypeToStyleGenerators = {
  [key in NEW_COMPONENT_TYPES]: ComponentStyleToGenerator;
}

export const componentTypeToStyleGenerators: ComponentTypeToStyleGenerators = {
  [NEW_COMPONENT_TYPES.MODAL]: modalStyleToGenerator,
  [NEW_COMPONENT_TYPES.CARD]: cardStyleToGenerator,
  [NEW_COMPONENT_TYPES.LAYER]: layerStyleToGenerator,
  [NEW_COMPONENT_TYPES.BUTTON]: buttonStyleToGenerator,
  [NEW_COMPONENT_TYPES.ALERT]: alertStyleToGenerator,
  [NEW_COMPONENT_TYPES.TEXT]: textStyleToGenerator,
  [NEW_COMPONENT_TYPES.AVATAR]: avatarStyleToGenerator,
};
