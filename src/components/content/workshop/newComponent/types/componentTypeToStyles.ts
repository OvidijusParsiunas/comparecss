import { NEW_COMPONENT_TYPES } from '../../../../../consts/newComponentTypes.enum'
import { ComponentStyleToProperties } from '../../../../../interfaces/componentStyleToProperties';
import { buttonStyleToProperties } from './buttons/buttonStyleToProperties';

type ComponentTypeToStyles = {
  [key in NEW_COMPONENT_TYPES]?: ComponentStyleToProperties;
}

export const componentTypeToStyles: ComponentTypeToStyles = {
  [NEW_COMPONENT_TYPES.BUTTON]: buttonStyleToProperties,
};
