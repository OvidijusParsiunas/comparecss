import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { NEW_COMPONENT_STYLES } from '../../../../../../consts/newComponentStyles.enum'
import { closeButton } from './generators/closeButton';
import { defaultButton } from './generators/default';  

export const buttonStyleToGenerator: ComponentStyleToGenerator = {
  [NEW_COMPONENT_STYLES.DEFAULT]: defaultButton,
  [NEW_COMPONENT_STYLES.BUTTON_CLOSE]: closeButton,
};
