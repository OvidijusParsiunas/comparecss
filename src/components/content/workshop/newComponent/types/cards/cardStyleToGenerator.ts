import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLE } from '../../../../../../consts/componentStyles.enum'
import { defaultCard } from './generators/default';  

export const cardStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLE.DEFAULT]: defaultCard,
};
