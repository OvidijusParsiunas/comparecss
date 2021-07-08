import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum'
import { defaultModal } from './generators/default';  

export const modalStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLES.DEFAULT]: defaultModal,
};
