import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum'
import { defaultButtonGroup } from './generators/default';
import { buttonGroupBase } from './generators/base';

export const buttonGroupStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLES.BASE]: buttonGroupBase,
  [DEFAULT_STYLES.DEFAULT]: defaultButtonGroup,
};
