import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLE } from '../../../../../../consts/componentStyles.enum'
import { defaultModal } from './generators/default';  

export const modalStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLE.DEFAULT]: defaultModal,
};
