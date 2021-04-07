import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { NEW_COMPONENT_STYLES } from '../../../../../../consts/newComponentStyles.enum'
import { defaultModal } from './properties/default';  

export const modalStyleToGenerator: ComponentStyleToGenerator = {
  [NEW_COMPONENT_STYLES.DEFAULT]: defaultModal,
};
