import { ComponentStyleToProperties } from '../../../../../../interfaces/componentStyleToProperties'
import { NEW_COMPONENT_STYLES } from '../../../../../../consts/newComponentStyles.enum'
import { defaultModal } from './properties/default';  

export const modalStyleToProperties: ComponentStyleToProperties = {
  [NEW_COMPONENT_STYLES.DEFAULT]: defaultModal,
};
