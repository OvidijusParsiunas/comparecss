import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { NEW_COMPONENT_STYLES } from '../../../../../../consts/newComponentStyles.enum'
import { defaultButton } from './properties/default';  

export const buttonStyleToGenerator: ComponentStyleToGenerator = {
  [NEW_COMPONENT_STYLES.DEFAULT]: defaultButton,
};
