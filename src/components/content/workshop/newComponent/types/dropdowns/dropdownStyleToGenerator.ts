import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum'
import { defaultDropdown } from './generators/default';
import { dropdownBase } from './generators/base';

export const dropdownStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLES.BASE]: dropdownBase,
  [DEFAULT_STYLES.DEFAULT]: defaultDropdown,
};
