import { NEW_COMPONENT_TYPES } from '../../../../consts/newComponentTypes.enum'
import { NewComponentStylesContainer } from '../../../../interfaces/newComponentStylesContainer';
import { newButtonStylesContainer } from './newButtonStylesContainer';

type NewComponentContainer = {
  [key in NEW_COMPONENT_TYPES]?: NewComponentStylesContainer;
}

export const newComponentContainer: NewComponentContainer = {
  [NEW_COMPONENT_TYPES.BUTTON]: newButtonStylesContainer,
};
