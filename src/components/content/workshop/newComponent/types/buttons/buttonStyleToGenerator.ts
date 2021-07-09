import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { BUTTON_STYLES, DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum'
import { closeButton } from './generators/closeButton';
import { defaultButton } from './generators/default';
import { buttonBase } from './generators/base';

export const buttonStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLES.BASE]: buttonBase,
  [DEFAULT_STYLES.DEFAULT]: defaultButton,
  [BUTTON_STYLES.CLOSE]: closeButton,
};
