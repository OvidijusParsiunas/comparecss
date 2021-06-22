import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { NEW_COMPONENT_STYLES } from '../../../../../../consts/newComponentStyles.enum'
import { closeButtonText } from './properties/closeButtonText';
import { buttonText } from './properties/buttonText';
import { defaultText } from './properties/default';

export const textStyleToGenerator: ComponentStyleToGenerator = {
  [NEW_COMPONENT_STYLES.DEFAULT]: defaultText,
  [NEW_COMPONENT_STYLES.TEXT_BUTTON]: buttonText,
  [NEW_COMPONENT_STYLES.CLOSE_BUTTON_TEXT]: closeButtonText,
};
