import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum'
import { defaultModal } from './generators/default';  
import { modalBase } from './generators/base';

export const modalStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLES.BASE]: modalBase,
  [DEFAULT_STYLES.DEFAULT]: defaultModal,
};
