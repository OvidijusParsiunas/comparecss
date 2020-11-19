import { NEW_COMPONENT_TYPES } from '../../../../../consts/newComponentTypes.enum'
import { ComponentStyleToProperties } from '../../../../../interfaces/componentStyleToProperties';
import { alertStyleToProperties } from './alerts/alertStyleToProperties';
import { buttonStyleToProperties } from './buttons/buttonStyleToProperties';

type ComponentTypeToStyles = {
  [key in NEW_COMPONENT_TYPES]: ComponentStyleToProperties;
}

export const componentTypeToStyles: ComponentTypeToStyles = {
  [NEW_COMPONENT_TYPES.BUTTON]: buttonStyleToProperties,
  [NEW_COMPONENT_TYPES.ALERT]: alertStyleToProperties,
};
