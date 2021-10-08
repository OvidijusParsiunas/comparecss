import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum'
import { defaultDropdownPadding } from './generators/padding/default';
import { dropdownPaddingBase } from './generators/padding/base';

export const dropdownStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLES.BASE]: dropdownPaddingBase,
  [DEFAULT_STYLES.DEFAULT]: defaultDropdownPadding,
};
