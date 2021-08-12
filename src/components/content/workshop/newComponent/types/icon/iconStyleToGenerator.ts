import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum'
import { defaultIcon } from './generators/default';
import { iconBase } from './generators/base';

export const iconStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLES.BASE]: iconBase,
  [DEFAULT_STYLES.DEFAULT]: defaultIcon,
};
