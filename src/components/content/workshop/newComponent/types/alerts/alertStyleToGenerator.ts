import { ComponentStyleToGenerator } from '../../../../../../interfaces/componentStyleToGenerator'
import { DEFAULT_STYLES } from '../../../../../../consts/componentStyles.enum'
import { defaultAlert } from './generators/default';
import { alertBase } from './generators/base';

export const alertStyleToGenerator: ComponentStyleToGenerator = {
  [DEFAULT_STYLES.BASE]: alertBase,
  [DEFAULT_STYLES.DEFAULT]: defaultAlert,
};
