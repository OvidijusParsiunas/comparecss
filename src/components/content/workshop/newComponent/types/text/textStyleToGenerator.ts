import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLE, TEXT_STYLES } from '../../../../../../consts/componentStyles.enum'
import { closeButtonText } from './generators/closeButtonText';
import { buttonText } from './generators/buttonText';
import { defaultText } from './generators/default';

export const textStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLE.DEFAULT]: defaultText,
  [TEXT_STYLES.BUTTON]: buttonText,
  [TEXT_STYLES.CLOSE_BUTTON]: closeButtonText,
};
