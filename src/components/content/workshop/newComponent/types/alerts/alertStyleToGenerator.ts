import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { NEW_COMPONENT_STYLES } from '../../../../../../consts/newComponentStyles.enum'
import { defaultAlert } from './properties/default';  

export const alertStyleToGenerator: ComponentStyleToGenerator = {
  [NEW_COMPONENT_STYLES.DEFAULT]: defaultAlert,
};
