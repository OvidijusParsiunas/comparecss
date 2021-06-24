import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLE } from '../../../../../../consts/componentStyles.enum'
import { defaultAlert } from './generators/default';  

export const alertStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLE.DEFAULT]: defaultAlert,
};
