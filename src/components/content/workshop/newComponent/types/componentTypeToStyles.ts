import { ComponentStyleToProperties } from '../../../../../interfaces/componentStyleToProperties';
import { NEW_COMPONENT_TYPES } from '../../../../../consts/newComponentTypes.enum'
import { buttonStyleToProperties } from './buttons/buttonStyleToProperties';
import { alertStyleToProperties } from './alerts/alertStyleToProperties';
import { modalStyleToProperties } from './modals/modalStyleToProperties';

type ComponentTypeToStyles = {
  [key in NEW_COMPONENT_TYPES]: ComponentStyleToProperties;
}

export const componentTypeToStyles: ComponentTypeToStyles = {
  [NEW_COMPONENT_TYPES.BUTTON]: buttonStyleToProperties,
  [NEW_COMPONENT_TYPES.ALERT]: alertStyleToProperties,
  [NEW_COMPONENT_TYPES.MODAL]: modalStyleToProperties,
};
