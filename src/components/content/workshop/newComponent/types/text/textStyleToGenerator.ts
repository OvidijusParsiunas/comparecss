import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLES, TEXT_STYLES } from '../../../../../../consts/componentStyles.enum'
import { defaultText } from './generators/default';
import { textBase } from './generators/base';

export const textStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLES.BASE]: textBase,
  [DEFAULT_STYLES.DEFAULT]: defaultText,
  [TEXT_STYLES.CLOSE_BUTTON]: defaultText,
  [TEXT_STYLES.BUTTON]: defaultText,
};
