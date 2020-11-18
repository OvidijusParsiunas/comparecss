import { defaultButton } from './properties/default';  
import { NEW_COMPONENT_STYLES } from '../../../../../../consts/newComponentStyles.enum'
import { ComponentStyleToProperties } from '../../../../../../interfaces/ComponentStyleToProperties'

export const buttonStyleToProperties: ComponentStyleToProperties = {
  [NEW_COMPONENT_STYLES.DEFAULT]: defaultButton,
};
