import { ComponentStyleToProperties } from '../../../../../../interfaces/ComponentStyleToProperties'
import { NEW_COMPONENT_STYLES } from '../../../../../../consts/newComponentStyles.enum'
import { defaultAlert } from './properties/default';  

export const alertStyleToProperties: ComponentStyleToProperties = {
  [NEW_COMPONENT_STYLES.DEFAULT]: defaultAlert,
};
