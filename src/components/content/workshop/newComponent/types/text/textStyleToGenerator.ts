import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { NEW_COMPONENT_STYLES } from '../../../../../../consts/newComponentStyles.enum'
import { defaultText } from './properties/default';  

export const textStyleToGenerator: ComponentStyleToGenerator = {
  [NEW_COMPONENT_STYLES.DEFAULT]: defaultText,
};
